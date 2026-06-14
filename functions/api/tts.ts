// functions/api/tts.ts
import { Client } from '@gradio/client';
// ── Engine priority ─────────────────────────────────────────────────────────
//  1. MisoTTS  — 7.7B backbone + 300M decoder, ~110ms latency, one-shot clone
//               Open weights (MIT-adjacent). Set MISO_TTS_API_KEY to activate.
//               Swap-in target: POST https://api.misotts.ai/v1/synthesize
//  2. ElevenLabs Turbo v2.5 — current production engine (~1–3s, high fidelity)
//  3. Web Speech API — client-side fallback (no server call)
// ────────────────────────────────────────────────────────────────────────────

interface Env {
  ELEVENLABS_API_KEY?: string;
  MISO_TTS_API_KEY?: string;    // Set this once MisoTTS API ships — auto-activates
  AI?: {
    run: (model: string, options: Record<string, unknown>) => Promise<{ audio?: string } | unknown>;
  };
}

// ── Default deep male voice ──────────────────────────────────────────────────
// ElevenLabs voice_id — no recording needed, TTS works out of the box.
// To use an African-accent voice: browse https://elevenlabs.io/voice-library
//   → filter: Male · Deep · African / South African → copy voice_id below.
// MisoTTS voice swap: replace this with the MisoTTS voice handle when API ships.
const DEFAULT_VOICE_ID = 'f5_clone'; // Default to Bright's F5-TTS Voice

function jsonResp(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as {
      text: string;
      voiceId?: string;  // Optional — server uses DEFAULT_VOICE_ID if absent
    };

    const { text, voiceId } = body;

    if (!text?.trim()) {
      return jsonResp({ error: 'text is required' }, 400);
    }

    // Strip markdown → clean speech
    const plain = text
      .replace(/#{1,6}\s+/g, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/^\s*[-*]\s+/gm, '')
      .replace(/^\s*\d+\.\s+/gm, '')
      .replace(/\*\*\*/g, '.')
      .replace(/---/g, '.')
      .replace(/\n{2,}/g, '. ')
      .replace(/\n/g, ' ')
      .trim()
      .slice(0, 500);

    const effectiveVoiceId = voiceId || DEFAULT_VOICE_ID;

    // ── Engine 1: MisoTTS ───────────────────────────────────────────────────
    // Activates automatically when MISO_TTS_API_KEY is set in Cloudflare Pages.
    // Architecture: 7.7B backbone (time) + 300M decoder (depth)
    //               32 RVQ codebooks × 2,048-way vectors, ~110ms latency
    //               One-shot voice clone from ~10s clip, MIT-adjacent license
    if (context.env.MISO_TTS_API_KEY) {
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 15000);

        // ── TODO: replace with confirmed MisoTTS endpoint when API ships ──
        const misoRes = await fetch('https://api.misotts.ai/v1/synthesize', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${context.env.MISO_TTS_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: plain,
            voice_id: effectiveVoiceId,
            language: 'en',
            // Emotive conditioning — MisoTTS conditions on prior audio context
            style: 'professional',
          }),
          signal: controller.signal,
        });

        clearTimeout(tid);

        if (misoRes.ok) {
          const arrayBuffer = await misoRes.arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);
          let binary = '';
          const chunkSize = 8192;
          for (let i = 0; i < bytes.byteLength; i += chunkSize) {
            binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
          }
          const audioData = `data:audio/mpeg;base64,${btoa(binary)}`;
          return jsonResp({ audioData, provider: 'misotts' });
        }
        // Fall through to ElevenLabs if MisoTTS fails
      } catch {
        // MisoTTS unavailable — fall through to ElevenLabs
      }
    }

    // ── Engine 2: ElevenLabs Turbo v2.5 ────────────────────────────────────
    if (context.env.ELEVENLABS_API_KEY && effectiveVoiceId !== 'f5_clone') {
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 20000);

        const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${effectiveVoiceId}`, {
          method: 'POST',
          headers: {
            'xi-api-key': context.env.ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg',
          },
          body: JSON.stringify({
            text: plain,
            model_id: 'eleven_turbo_v2_5',
            voice_settings: {
              stability: 0.60,         // Consistent authoritative tone
              similarity_boost: 0.85,  // High fidelity to voice character
              style: 0.25,             // Slight expressiveness for natural delivery
              use_speaker_boost: true,
            },
          }),
          signal: controller.signal,
        });

        clearTimeout(tid);

        if (res.ok) {
          // Convert binary MP3 → base64 data-URL (chunked to avoid call-stack overflow)
          const arrayBuffer = await res.arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);
          let binary = '';
          const chunkSize = 8192;
          for (let i = 0; i < bytes.byteLength; i += chunkSize) {
            binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
          }
          const audioData = `data:audio/mpeg;base64,${btoa(binary)}`;
          return jsonResp({ audioData, provider: 'elevenlabs-turbo-v2.5' });
        }
      } catch {
        // Fall through to MeloTTS if ElevenLabs fails or throws
      }
    }

    // ── Engine 3: F5-TTS on Hugging Face (Keyless Voice Clone) ──────────────
    // Clones Bright's actual voice from /bright_voice_ref.wav without API keys!
    if (effectiveVoiceId === 'f5_clone' || !context.env.ELEVENLABS_API_KEY) {
      try {
        const origin = new URL(context.request.url).origin;
        const audioUrl = `${origin}/bright_voice_ref.wav`;
        const audioRes = await fetch(audioUrl);
        if (audioRes.ok) {
          const audioBlob = await audioRes.blob();
          const app = await Client.connect('mrfakename/E2-F5-TTS');
          const result = await app.predict('/predict', [
            audioBlob, // ref_audio
            '', // ref_text (Whisper auto-transcribe)
            plain, // gen_text
            false, // remove_silence
          ]);

          if (result && result.data && result.data[0]) {
            const fileInfo = result.data[0] as { url: string };
            const soundRes = await fetch(fileInfo.url);
            if (soundRes.ok) {
              const arrayBuffer = await soundRes.arrayBuffer();
              const bytes = new Uint8Array(arrayBuffer);
              let binary = '';
              const chunkSize = 8192;
              for (let i = 0; i < bytes.byteLength; i += chunkSize) {
                binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
              }
              const audioData = `data:audio/wav;base64,${btoa(binary)}`;
              return jsonResp({ audioData, provider: 'huggingface-f5tts' });
            }
          }
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.error('F5-TTS Error:', errMsg);
        adkLogs.push(`[ADK Error] F5-TTS failed: ${errMsg}`);
      }
    }

    // ── Engine 4: Cloudflare Workers AI MeloTTS ─────────────────────────────
    // Keyless server-side fallback running directly on Cloudflare Edge GPUs
    if (context.env.AI) {
      try {
        const result = await context.env.AI.run('@cf/myshell-ai/melotts', {
          prompt: plain,
          lang: 'en',
        });

        if (result && result.audio) {
          const audioData = `data:audio/mpeg;base64,${result.audio}`;
          return jsonResp({ audioData, provider: 'cloudflare-melotts' });
        }
      } catch {
        // Fall through to error
      }
    }

    return jsonResp({ error: 'No TTS API key configured and Cloudflare Workers AI is unavailable', fallback: true }, 503);

  } catch (err: unknown) {
    const errorName = err instanceof Error ? err.name : '';
    const errorMessage = err instanceof Error ? err.message : 'Internal error';
    if (errorName === 'AbortError') {
      return jsonResp({ error: 'TTS request timed out', fallback: true }, 504);
    }
    return jsonResp({ error: errorMessage, fallback: true }, 500);
  }
};

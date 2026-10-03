// functions/api/tts.ts
import { Client } from '@gradio/client';
// ── Bright's voice only ─────────────────────────────────────────────────────
// The Digital Twin must never speak in anyone else's voice. Both engines clone
// Bright's real voice; if neither is available the client shows text only.
//  1. ElevenLabs — Instant Voice Clone of Bright, created once from
//     public/bright_voice_ref.wav. Active when BRIGHT_ELEVENLABS_VOICE_ID and
//     ELEVENLABS_API_KEY are set. Fast and reliable.
//  2. F5-TTS on Hugging Face — zero-shot clone from /bright_voice_ref.wav on
//     every request. Free; set HF_TOKEN for a dedicated ZeroGPU quota.
// ────────────────────────────────────────────────────────────────────────────

interface Env {
  ELEVENLABS_API_KEY?: string;
  BRIGHT_ELEVENLABS_VOICE_ID?: string;
  HF_TOKEN?: string;
  HF_API_KEY?: string;
}

// Transcription of public/bright_voice_ref.wav (F5-TTS reference text).
const REF_TEXT = "if it's a five agent system which helps you forensic check and if it didn't manage issues it plays devil's advocate agents where they work against each other to cut friend the surface these issues so as long as there's a signal in the market";

const MAX_CHARS = 500;

function jsonResp(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 8192;
  for (let i = 0; i < bytes.byteLength; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

// Strip markdown and cut at a sentence boundary so speech never stops mid-word.
function toSpeech(text: string): string {
  const plain = text
    .split(/\n\s*\*\*\*\s*\n|###\s*Suggested Follow-up/i)[0]
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, ' ')
    .trim();
  if (plain.length <= MAX_CHARS) return plain;
  const cut = plain.slice(0, MAX_CHARS);
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  return lastStop > 100 ? cut.slice(0, lastStop + 1) : cut;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: { text?: string };
  try {
    body = await context.request.json();
  } catch {
    return jsonResp({ error: 'Invalid JSON body' }, 400);
  }
  if (!body.text?.trim()) {
    return jsonResp({ error: 'text is required' }, 400);
  }
  const plain = toSpeech(body.text);
  const { env } = context;

  // ── Engine 1: ElevenLabs clone of Bright ─────────────────────────────────
  if (env.ELEVENLABS_API_KEY && env.BRIGHT_ELEVENLABS_VOICE_ID) {
    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${env.BRIGHT_ELEVENLABS_VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({
          text: plain,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: { stability: 0.6, similarity_boost: 0.9, style: 0.2, use_speaker_boost: true },
        }),
        signal: AbortSignal.timeout(20000),
      });
      if (res.ok) {
        return jsonResp({ audioData: `data:audio/mpeg;base64,${toBase64(await res.arrayBuffer())}`, provider: 'elevenlabs-bright-clone' });
      }
    } catch {
      // Fall through to F5-TTS
    }
  }

  // ── Engine 2: F5-TTS zero-shot clone of Bright ───────────────────────────
  try {
    const origin = new URL(context.request.url).origin;
    const refRes = await fetch(`${origin}/bright_voice_ref.wav`);
    if (!refRes.ok) {
      return jsonResp({ error: `Reference voice file unavailable (${refRes.status})`, fallback: true }, 502);
    }
    const hfToken = env.HF_TOKEN || env.HF_API_KEY;
    const app = await Client.connect('mrfakename/E2-F5-TTS', hfToken ? { token: hfToken as `hf_${string}` } : undefined);
    const result = await app.predict('/predict', [await refRes.blob(), REF_TEXT, plain, false]);
    const fileInfo = (result?.data as { url?: string }[] | undefined)?.[0];
    if (!fileInfo?.url) {
      return jsonResp({ error: 'Voice clone returned no audio', fallback: true }, 502);
    }
    const soundRes = await fetch(fileInfo.url);
    if (!soundRes.ok) {
      return jsonResp({ error: `Voice clone audio fetch failed (${soundRes.status})`, fallback: true }, 502);
    }
    return jsonResp({ audioData: `data:audio/wav;base64,${toBase64(await soundRes.arrayBuffer())}`, provider: 'huggingface-f5tts' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('F5-TTS error:', msg);
    const quota = /zerogpu|quota/i.test(msg);
    return jsonResp({
      error: quota ? 'Voice clone quota exceeded — set HF_TOKEN or BRIGHT_ELEVENLABS_VOICE_ID in Cloudflare Pages.' : 'Voice clone unavailable',
      fallback: true,
    }, 503);
  }
};

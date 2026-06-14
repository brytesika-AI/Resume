// functions/api/voice-clone.ts
// ElevenLabs Instant Voice Clone — accepts a base64 audio sample,
// uploads to ElevenLabs, and returns a reusable voice_id.

interface Env {
  ELEVENLABS_API_KEY: string;
}

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
    if (!context.env.ELEVENLABS_API_KEY) {
      return jsonResp({ error: 'ELEVENLABS_API_KEY not configured in Cloudflare Pages settings', fallback: true }, 503);
    }

    const body = await context.request.json() as { voiceSample?: string; useReferenceFile?: boolean };
    const { voiceSample, useReferenceFile } = body;

    let audioBlob: Blob;
    let mimeType = 'audio/wav';

    if (useReferenceFile) {
      const origin = new URL(context.request.url).origin;
      const audioUrl = `${origin}/bright_voice_ref.wav`;
      const audioRes = await fetch(audioUrl);
      if (!audioRes.ok) {
        return jsonResp({ error: 'Failed to retrieve reference voice file from server.' }, 500);
      }
      audioBlob = await audioRes.blob();
    } else {
      if (!voiceSample) {
        return jsonResp({ error: 'voiceSample is required' }, 400);
      }

      const commaIdx = voiceSample.indexOf(',');
      const base64Data = commaIdx >= 0 ? voiceSample.slice(commaIdx + 1) : voiceSample;
      mimeType = voiceSample.match(/data:([^;]+);/)?.[1] ?? 'audio/webm';

      const binaryStr = atob(base64Data);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      audioBlob = new Blob([bytes], { type: mimeType });
    }

    const formData = new FormData();
    formData.append('name', 'Bright Sikazwe Digital Twin');
    formData.append('description', 'AI Digital Twin voice — Bright C. Sikazwe, Acting Principal Engineer @ MultiChoice Group');
    formData.append('files', audioBlob, useReferenceFile ? 'bright_voice_ref.wav' : 'voice_sample.webm');
    formData.append('labels', JSON.stringify({ use: 'digital-twin', owner: 'bright-sikazwe' }));

    const res = await fetch('https://api.elevenlabs.io/v1/voices/add', {
      method: 'POST',
      headers: {
        'xi-api-key': context.env.ELEVENLABS_API_KEY,
      },
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      return jsonResp({ error: `ElevenLabs clone failed (${res.status}): ${errText}`, fallback: true }, res.status);
    }

    const data = await res.json() as { voice_id: string };
    return jsonResp({ voiceId: data.voice_id, provider: 'elevenlabs-instant-voice-clone' });

  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Internal error';
    return jsonResp({ error: errMsg, fallback: true }, 500);
  }
};

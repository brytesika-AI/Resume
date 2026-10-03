# Bright C. Sikazwe — AI Digital Twin CV

> **Live interactive CV and AI Digital Twin** for Bright C. Sikazwe — Executive AI, Data & Digital Leader, Founder & Principal of brytesika-AI (independent consulting), Acting Principal Engineer at MultiChoice Group (a Canal+ company), and PhD Candidate at the University of Johannesburg.
>
> Live: https://bright-sikazwe-cv.pages.dev/

---

## Overview

This is a production-grade interactive CV built as a **3-column AI dashboard** powered by:

- **React 19 + TypeScript** on Vite
- **Cloudflare Pages** for edge deployment
- **Cloudflare Workers AI** — `@cf/meta/llama-3.1-8b-instruct` for the Digital Twin chat
- **F5-TTS** (via HuggingFace Spaces) and optional **ElevenLabs** for voice cloning
- **Web Speech API** as TTS fallback

### Features

| Feature | Description |
|---|---|
| 🤖 **AI Digital Twin Chat** | Llama-3.1-8b-instruct responds as Bright in first-person with STAR-format answers |
| 🧠 **Agent Thought Terminal** | Live ADK-style observability logs — tool selection, safety checks, synthesis steps |
| 📁 **Live AI Product Portfolio** | 25+ AI systems with sector filters, tech stack tags, and GitHub/live links |
| 💼 **Work With Me** | Consulting offer — services, case studies, engagement models and a discovery-call CTA; the Digital Twin also answers consulting enquiries |
| 📋 **CV Tabs Panel** | Summary, Experience timeline, Competencies, Certifications, Posts, Research, Hobbies |
| 🎯 **AI Job Spec Matcher** | Paste a JD and get a % match score + STAR-format strategic justification |
| 🎤 **Voice Cloning Studio** | F5-TTS clone of a reference sample (default), ElevenLabs instant clone when a key is set, Web Speech API fallback |
| 🔒 **Safety Guardrails** | Politics, inappropriate content, and hallucination guards built into the Worker |

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Vanilla CSS (glassmorphism dark-mode design)
- **Fonts**: Inter (body), Lora (headings), Space Grotesk (mono/terminal)
- **Icons**: Lucide React
- **Backend**: Cloudflare Pages Functions (Workers)
- **AI**: Cloudflare Workers AI — `@cf/meta/llama-3.1-8b-instruct`
- **Voice**: F5-TTS via HuggingFace Spaces (`HF_TOKEN` recommended) → ElevenLabs (`ELEVENLABS_API_KEY`, optional) → Web Speech API fallback
- **Deployment**: Cloudflare Pages

---

## Local Development

```bash
# Install dependencies
npm install

# Start Vite dev server (frontend only)
npm run dev

# Start Cloudflare Pages dev server (frontend + Workers AI binding)
npm run pages:dev
```

> **Note**: The `/api/chat` and `/api/tts` Cloudflare Workers AI bindings require `npm run pages:dev` (via Wrangler). Without the binding, the app automatically falls back to client-side simulation mode.

---

## Deployment

```bash
# Build and deploy to Cloudflare Pages
npm run pages:deploy
```

Ensure your Cloudflare account has the **Workers AI** binding configured. The `wrangler.toml` already sets:

```toml
[ai]
binding = "AI"
```

---

## Project Structure

```
├── src/
│   ├── App.tsx          # Main 3-column dashboard UI
│   ├── index.css        # Glassmorphism design system & all styles
│   ├── main.tsx         # React entry point
│   └── data/
│       └── cvData.ts    # Single source of truth: CV, consulting offer, projects, certs (also feeds the chat Worker)
├── functions/
│   └── api/
│       ├── chat.ts      # Cloudflare Worker — Digital Twin chat + Job Matcher
│       ├── tts.ts       # Cloudflare Worker — F5-TTS / ElevenLabs / MisoTTS speech proxy
│       └── voice-clone.ts # Cloudflare Worker — ElevenLabs instant voice clone
├── public/
│   ├── profile.png      # Profile photo
│   ├── bright_voice_ref.wav # Reference sample for voice cloning
│   └── favicon.svg      # Site favicon
└── index.html           # HTML shell with SEO/OG meta tags
```

---

## Author

**Bright C. Sikazwe**
- 🌐 [LinkedIn](https://www.linkedin.com/in/brytesika/)
- 💻 [GitHub](https://github.com/brytesika-AI)
- 📧 Bryte.sika@gmail.com

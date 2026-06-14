# Bright C. Sikazwe — AI Digital Twin CV

> **Live interactive CV and AI Digital Twin** for Bright C. Sikazwe — AI Strategist, Data Platforms & Engineering Leader, Acting Principal Engineer at MultiChoice Group (a Canal+ company), and PhD Candidate at the University of Johannesburg.

---

## Overview

This is a production-grade interactive CV built as a **3-column AI dashboard** powered by:

- **React 19 + TypeScript** on Vite
- **Cloudflare Pages** for edge deployment
- **Cloudflare Workers AI** — `@cf/meta/llama-3.1-8b-instruct` for the Digital Twin chat
- **Coqui XTTS-v2** (via HuggingFace Spaces) for optional voice cloning
- **Web Speech API** as TTS fallback

### Features

| Feature | Description |
|---|---|
| 🤖 **AI Digital Twin Chat** | Llama-3.1-8b-instruct responds as Bright in first-person with STAR-format answers |
| 🧠 **Agent Thought Terminal** | Live ADK-style observability logs — tool selection, safety checks, synthesis steps |
| 📁 **Live AI Product Portfolio** | 8 production AI systems with sector filters, tech stack tags, and GitHub/live links |
| 📋 **CV Tabs Panel** | Summary, Experience timeline, Competencies, Certifications, Posts, Research, Hobbies |
| 🎯 **AI Job Spec Matcher** | Paste a JD and get a % match score + STAR-format strategic justification |
| 🎤 **Voice Cloning Studio** | Record 10–15s voice sample → Coqui XTTS-v2 clones it for TTS responses |
| 🔒 **Safety Guardrails** | Politics, inappropriate content, and hallucination guards built into the Worker |

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Vanilla CSS (glassmorphism dark-mode design)
- **Fonts**: Inter (body), Lora (headings), Space Grotesk (mono/terminal)
- **Icons**: Lucide React
- **Backend**: Cloudflare Pages Functions (Workers)
- **AI**: Cloudflare Workers AI — `@cf/meta/llama-3.1-8b-instruct`
- **Voice**: Coqui XTTS-v2 (open-source) via HuggingFace Spaces → Web Speech API fallback
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
│       └── cvData.ts    # All CV data (projects, experience, certs, etc.)
├── functions/
│   └── api/
│       ├── chat.ts      # Cloudflare Worker — Digital Twin chat + Job Matcher
│       └── tts.ts       # Cloudflare Worker — Coqui XTTS-v2 voice cloning proxy
├── public/
│   ├── profile.png      # Profile photo
│   └── favicon.svg      # Site favicon
└── index.html           # HTML shell with SEO/OG meta tags
```

---

## Author

**Bright C. Sikazwe**
- 🌐 [LinkedIn](https://www.linkedin.com/in/brytesika/)
- 💻 [GitHub](https://github.com/brytesika-AI)
- 📧 Bryte.sika@gmail.com

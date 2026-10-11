# Interviewly — voice AI interview practice

Voice-first mock interviews using **Groq Free** or **local Ollama**. Includes spoken questions, browser speech recognition, editable transcripts, adaptive AI follow-ups, feedback, searchable practice questions, and browser-local progress.

## Run locally

Requires Node.js 22 or newer.

```sh
npm run dev
```

Open http://127.0.0.1:4173 in Chrome or Edge. No npm dependencies are required.

## Groq (free tier)

Create a key at https://console.groq.com/keys using a **Free plan organization**. Paste it into Voice studio. The key remains in browser memory, passes through `/api/groq` to Groq, and is never stored or logged by this app. Refresh clears it. Each visitor supplies their own key; there is no shared paid key. The app cannot determine your billing plan: use a Free organization, not a paid one. Rate-limit errors stop requests; no automatic provider or billing upgrade occurs.

## Ollama (local)

Install Ollama and download a local text model suited to your hardware. `ollama list` shows installed models. Cloud models are excluded. Quit the Ollama tray app and start it with the website's exact origin allowed:

```powershell
$env:OLLAMA_ORIGINS='http://127.0.0.1:4173'
ollama serve
```

For Vercel, replace the origin with the deployed HTTPS origin. Select Ollama in Voice studio, enter the local model name, and check the connection. The browser connects directly to `127.0.0.1:11434`; the Vercel server cannot reach your computer. Browser local-network permissions or policy may block this. If so, run the app locally. Do not expose Ollama publicly.

## Voice and data

Microphone access requires user permission and localhost or HTTPS. Speech recognition uses the browser's Web Speech implementation, which may send audio to its vendor; it is not guaranteed offline. Speech playback uses available system/browser voices. No audio files are saved. Transcripts are sent only when you press Send answer and are saved in localStorage alongside feedback. You can edit or type transcripts if speech is unavailable. Ollama generates interview responses but is not a speech-to-text engine.

AI-generated scores assess transcript content, not voice, personality, or hiring suitability. Original text practice history may contain older heuristic scores.

## Deploy to Vercel

Import this GitHub repository at https://vercel.com/new, select framework **Other**, build command `npm run build`, and output directory `public`. `vercel.json` configures the API function. No environment secrets or paid AI service are required. Each visitor brings a Groq Free key or local Ollama.

CLI: `npx vercel login`, then `npx vercel --prod` from the repo.

## Validate

```sh
npm run build
npm test
```

Provider tests use mocks. Live AI and microphone testing requires a provider key/local model and microphone permission.

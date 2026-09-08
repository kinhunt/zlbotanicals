# Bilingual extraction explainer

Original conceptual text animation, not real facility imagery or a validated universal manufacturing route. The current version is 62.7 seconds with English / Mandarin narration reading the approved headings and descriptions. Native controls, optional WebVTT and an HTML transcript remain available; no autoplay.

## Reproducible narration and render

Read upstream https://github.com/rany2/edge-tts (README: installation, `--list-voices`, voice selection and rate options). Edge is an online Microsoft service: only this repository's public educational text is sent. Never substitute customer documents or private text. No API credentials are required. Network availability and future voice/service changes are outside this repository's control; failures stop generation, never produce substitute audio.

From this folder, install Python 3.11+, Node, ffmpeg/ffprobe and Noto Sans CJK SC (`apt-get install fonts-noto-cjk ffmpeg` on Debian), then:

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
npm ci
.venv/bin/edge-tts --list-voices
.venv/bin/python narrate.py --render
npm run lint
cd ../..
node scripts/verify-extraction-media.mjs
npm test
```

The successful live voice listing included `en-US-AriaNeural` (News/Novel) and `zh-CN-XiaoxiaoNeural` (News/Novel). We use their default rate, pitch and volume, without expressive styles. `narrate.py` synthesizes 16 separate real MP3 segments, retrying transient errors at most twice with backoff. Each segment records its voice, text hash and Edge package version in a JSON sidecar. Approved narration is read solely from root `src/data/extraction-video.json`.

Each scene uses the longer language's measured speech duration, plus 400 ms lead-in and at least 600 ms tail, rounded up to a 30 fps frame. No speech is sped up or cut. The script builds aligned mono 48 kHz AAC tracks, shared timing metadata, Remotion captions, WebVTT and source-text mirrors. Remotion imports the actual narration via `Audio`, renders H.264/AAC, and ffmpeg remuxes the rendered video with the original aligned mono AAC track using `+faststart` (avoiding Remotion's unnecessary 320 kbps stereo upmix). Never use `-an` on these narrated deliverables.

Committed segments and sidecars support offline re-rendering without resynthesis:

```sh
.venv/bin/python narrate.py --reuse --render
```

Reuse checks text/voice hashes before using existing segments. Re-synthesis may vary with Microsoft's service; committed segments preserve the approved performance. The metadata version refreshes MP4/caption URL queries while keeping `/media/extraction-en.mp4` and `/media/extraction-zh.mp4` stable. After changing text or voices regenerate all outputs together and review both languages. Existing posters show the unchanged first-scene artwork.

## Verification

The root media verifier requires H.264 1280×720 30fps, audible AAC throughout all eight scenes, matching audio/video duration, faststart, bounded sizes, caption timing/text parity and speech fitting the scene. It runs ffmpeg volume and silence checks per scene, not just the existence of an audio stream. Browser smoke verifies opt-in, unmuted playback and caption loading on both languages. `requirements.txt` pins the successfully used Edge version; Remotion dependencies stay isolated here, never in the Astro root. Vercel serves committed assets without rendering or contacting TTS.

## Original workflow provenance

The initial release used a 40-second animation without narration. Its historical release review remains unchanged. It was scaffolded with `npx create-video@latest --yes --blank --no-tailwind media/plant-extraction`, following https://www.remotion.dev/docs/ai/skills. Remotion is pinned to 4.0.522 in the lockfile. Commercial users should review https://www.remotion.pro/license for their team.

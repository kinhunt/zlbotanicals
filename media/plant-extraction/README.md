# Bilingual extraction explainer

Original 40-second conceptual text animation, not real facility imagery or a validated universal manufacturing route. No voiceover; all meaning is in visible text, WebVTT and the HTML transcript.

## Documented workflow used

Read https://www.remotion.dev/docs/ai/skills, installed with `npx skills add remotion-dev/skills --yes`, then read remotion-create, remotion-markup, video-layout, remotion-render and remotion-captions. Scaffolded with:

```sh
npx create-video@latest --yes --blank --no-tailwind media/plant-extraction
cd media/plant-extraction
npm ci
npx remotion studio --no-open
```

The installed skills were project-local to the agent host; their files are not required to build this repository. Remotion version is pinned in package-lock.json. Commercial users should review Remotion licensing for their team at https://www.remotion.pro/license.

## Re-render

Install Noto Sans CJK SC (Debian: `apt-get install fonts-noto-cjk`) before rendering Chinese. From this folder:

```sh
npx remotion render src/index.ts ExtractionEN /tmp/extraction-en-raw.mp4 --codec=h264 --crf=28 --concurrency=2
npx remotion render src/index.ts ExtractionZH /tmp/extraction-zh-raw.mp4 --codec=h264 --crf=28 --concurrency=2
ffmpeg -y -i /tmp/extraction-en-raw.mp4 -c:v copy -an -movflags +faststart ../../public/media/extraction-en.mp4
ffmpeg -y -i /tmp/extraction-zh-raw.mp4 -c:v copy -an -movflags +faststart ../../public/media/extraction-zh.mp4
npx remotion still src/index.ts ExtractionEN /tmp/extraction-en.png --frame=60
npx remotion still src/index.ts ExtractionZH /tmp/extraction-zh.png --frame=60
npm run lint
```

Convert the PNG stills to WebP (quality 82) with the root project's Sharp dependency. Root `node scripts/verify-extraction-media.mjs` checks codecs, duration, dimensions, 30fps, faststart, file size, captions and source-text parity. Captions are represented in `captions.json` using the Remotion Caption fields; authored silent text does not need speech transcription.

`src/steps.json` mirrors root `src/data/extraction-video.json`; change both and regenerate captions, videos and posters together. Each of eight scenes lasts five seconds. WebVTT contains the exact scene text. The root HTML video component supplies native controls, `preload="none"`, no autoplay, a localized poster and a visible expandable transcript.

The media project is isolated from the Astro deployment: Vercel builds the static website and serves the committed optimized assets, without installing or running Remotion.

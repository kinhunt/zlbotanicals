# Extraction narration verification

2026-09-08; branched from clean main `7425a05`. Historical `plant-extracts-release-review.md` describes the original silent release and is intentionally unchanged.

## Delivered changes

- Real online edge-tts 7.2.8 synthesis succeeded for all 16 approved public-script segments. Live voice listing verified en-US-AriaNeural and zh-CN-XiaoxiaoNeural. Default rate/pitch/volume; no customer data, substitute speech or fabricated responses.
- Eight shared scenes now total 1881 frames / 62.7 seconds, extending the original 40 seconds to fit speech naturally. Timed AAC source, individual MP3s with provenance sidecars, captions, VTT, HTML transcript timing, Remotion Audio and cache version `819c2ac2f20c` are committed.
- EN MP4: 1,442,093 bytes. ZH MP4: 1,241,969 bytes. Both H.264 1280×720 30fps + AAC mono 48 kHz, faststart, 62.7 seconds. Aligned M4A: EN 779,041 bytes; ZH 693,099 bytes.

## Actual verification

- TDD RED: `node --test tests/extraction-narration.test.mjs` failed with `en: AAC narration required` against the original files.
- GREEN: targeted test passes; media verifier passes every scene's volume/silence, exact text/caption alignment, duration, codec, faststart and size checks. EN scene mean levels −23.1 to −21.8 dB; ZH −21.6 to −20.5 dB. No all-silent scene; normal pauses retained.
- Two consecutive complete `npm test` runs: 44 tests, 44 pass, 0 fail; 148 Astro pages. Test durations 2611.8 ms / 2705.5 ms (excluding builds). Remotion `npm run lint` (eslint + tsc) passes. `git diff --check` passes.
- Local preview: http://127.0.0.1:4330 (HTTP 200). Dedicated browser smoke passes EN/ZH opt-in unmuted playback, actual decoded WebAudio energy (peak 0.5083 / 0.5448), eight loaded cues ending at 62.7, and no JS errors.
- Existing broad browser smoke passed eight language/width combinations, 176 route visits and no-JS check on rerun. First run hit transient overflow at 1024px EN; no layout code was changed. Do not conceal that first failure.
- Screenshots reviewed: main headings and explicit not-a-real-facility disclaimer readable; native controls/captions overlap the smaller persistent footer at the bottom, as in the original artwork. HTML and main ending-card disclaimer remain clear. This is not a human listening/accent-quality review.

## Reproduction / evidence on implementation host

- `/tmp/zl-narration-render.log`, `/tmp/zl-narration-media.json`, `/tmp/zl-narration-test.log`, `/tmp/zl-narration-test-repeat.log`
- `/tmp/zl-narration-qa/results.json`, `video-en.png`, `video-zh.png`; `/tmp/zl-plant-qa/results.json`
- Local Python isolation: `/tmp/zl-edge-tts`; no root Astro dependency additions.

Upstream README fetch via web extraction failed at its Firecrawl backend (403); GitHub's live raw README succeeded. Edge voice listing and synthesis had no service errors. Remotion defaults produced unnecessarily large stereo AAC; final explicit mux uses the aligned original mono track instead, without deleting narration. Remote deployment/protected-preview status must be reported separately from local content QA. Independent review and merge belong to the parent agent.

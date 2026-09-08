# Plant extracts release evidence

Date: 2026-09-08. Implementation branch: `feat/plant-extracts-encyclopedia`.

## Baseline and regression checks

- Started clean on latest origin/main (a6a2357); baseline `npm ci && npm test`: 104 pages, 37/37 tests.
- RED: missing encyclopedia hub route; GREEN after hub/seven-section implementation.
- RED: expected fourteen topics, found zero; GREEN with 14 bilingual original topics, expanded short Chinese bodies to meet the substantive-content assertion.
- RED: missing shared navigation and topic-specific existing-resource links; GREEN after localized navigation/crosslinks.
- RED: missing accessible video; GREEN after actual Remotion render and native-player embed.
- Final `npm test`: **148 pages, 43/43 tests**, no failures. Test log: `/tmp/plant-final-tests.log` on implementation host.
- Existing full-build internal-link validation passes across pages and linked assets. Every page retains one H1, title, description and canonical. New routes have reciprocal EN/ZH/x-default links, sitemap entries and valid BreadcrumbList JSON.
- `npm --prefix media/plant-extraction run lint`: ESLint and TypeScript pass.
- `git diff --cached --check`: pass after removing excess VTT trailing blank lines.
- Added-line static security scan: no hardcoded credential assignments, eval, shell=True/os.system or pickle patterns. Static Astro output; no new API endpoints, forms, trackers or external scripts.

## Browser checks (local build)

- `plant-extracts-browser-smoke.mjs`: **8 language/viewport combinations, 176 route visits**, widths 390/1024/1280/1440, zero page errors, no horizontal overflow, localized content links, correct metadata, native playback, loaded eight-caption tracks, transcript, mobile menu and no-JavaScript access.
- Screenshots: `/tmp/zl-plant-qa/hub-{en,zh}-{390,1024,1280,1440}.png` and corresponding `processes-*`; results `/tmp/zl-plant-qa/results.json`.
- Visual inspection: EN desktop 1440 and 1024 header fits without overlap; ZH mobile text and cards fit; EN/ZH actual rendered posters have no clipped text or missing Chinese glyphs. Header spacing is compact and section tabs wrap; these are nonblocking design limitations.
- Existing `browser-smoke.mjs`: **14 views pass**. No external sales submission or inbox claim.
- Existing `resource-browser-smoke.mjs`: **8 combinations pass**, including filters and no-JS route access.

## Real rendered media

Used documented Remotion scaffold/markup/render workflow; two 1200-frame compositions rendered with CLI 4.0.522. ffmpeg removed unused silent audio and applied faststart without re-encoding the rendered frames.

| Asset | Duration | Dimensions / rate | Codec | Bytes |
|---|---|---|---|---:|
| public/media/extraction-en.mp4 | 40.000s | 1280×720 / 30fps | H.264, no audio | 497253 |
| public/media/extraction-zh.mp4 | 40.000s | 1280×720 / 30fps | H.264, no audio | 385108 |
| public/media/extraction-en.webp | poster | 1280×720 | WebP | 23880 |
| public/media/extraction-zh.webp | poster | 1280×720 | WebP | 20290 |

`node scripts/verify-extraction-media.mjs` passes metadata, faststart, sizes and caption/source-text parity; exact output `/tmp/plant-media-verification.json`. Original rendered PNG posters are also retained. All animations are explicitly conceptual; no generated facility photo or image-model claim.

## Review and publication boundary

Self-review checked routes, source scopes, claim strength, localized crosslinks, static data rendering, JSON-LD escaping and media load behavior. No independent review is claimed: this child agent cannot delegate a reviewer. Parent must inspect the PR/diff before final merge. Passing preview deployment checks and actual public production content verification are separate; final deployment status/URL are returned to parent rather than guessed here.

No existing product/resource URL was removed. Root dependency advisories are unchanged (14); isolated Remotion scaffold reported two low advisories. SAMR final terminology standard status remains explicitly unverified. FormSubmit/inbox delivery remains outside this release verification.

# PR13 final localized editorial corrections

Date: 2026-09-09. Starting commit: `0b571f2cc0ec0e6c4247f0f9ac25066dcbb59781`.

## Evidence and exact changes

Independent audit: `/data/hermes/research/deep-ingredients/editorial-review.md`, B1 and integration notes 1/3. This follow-up edits the published JSON directly; the one-time importer was **not** rerun. Original draft packs remain historical evidence, not the corrected publication source.

### Goji — group-c source 39

Evidence: `/data/hermes/research/deep-ingredients/group-c/page-10.txt:30–35`, specifically abstract line 32; DOI https://doi.org/10.1590/1678-457x.14417 . Retained access remains abstract/introduction, not full independently verified methods.

- Traditional single-frequency optimization: **30 min, 60°C, 20 g/600 mL, 300 W/L, 28 kHz**.
- Separate apparatus comparison: **energy-aggregation counterflow dual-frequency 38.93%; opposite-sit dual-frequency 33.60%; energy-aggregation counterflow single-frequency 26.38%** crude-polysaccharide yields.
- Removed the unsupported **20/40 kHz** pair and asserted **controlled/fixed pulsing**. Removed the erroneous assignment of 26.38% to the traditional 28 kHz apparatus.
- EN/ZH process paragraphs and both equipment/research table rows now distinguish the optimization context from incomplete per-configuration settings. Duty cycle remains only a clearly labeled proposed engineering variable, not an established source setting.
- Preserved crude yield versus purified-polysaccharide composition and research versus industrial-scale boundaries.

### Monk fruit — group-a source 8

Audit note 1, with retained abstract `/data/hermes/research/deep-ingredients/group-a/evidence/source-8.txt` supporting the III E conversion/resin research. In both insight introductions, the EFSA/FDA/FSA sentence ends with `[5][6][7]`; a separate III E structural-conversion/resin-purification sentence ends with `[8]`. No new source or upgraded access level.

### Stevia — already corrected in publication JSON

The historical draft has mojibake; **the starting published JSON already has clean titles** `JECFA — Steviol glycosides` (6), the A1222 application title (7), and `Approval report – Application A1268` (8). No redundant production edit or reimport was made. Added a regression retaining clean Unicode, IDs and the A1268 URL; checked EN/ZH built pages.

## Verification

- TDD: goji regression failed on unsupported frequency/pulsing before its correction, then passed. Monk-fruit regression failed on misplaced regulatory citations before its correction, then passed. Stevia preservation regression passed immediately because the published defect was already absent.
- Fresh `npm ci` and full `npm test`: **83/83 passed**, zero failures; build included. Complete local output: `/data/hermes/research/deep-ingredients/pr13-editorial-npm-test.log`.
- Rendered EN/ZH goji, monk-fruit and stevia pages checked after the build; corrected goji yields/context and clean source titles present, unsupported frequency absent. English monk-fruit research sentence links to `research-a-monk-fruit-source-8`.
- `git diff --check` passed. Only published content, targeted regression tests and this evidence note changed; no image or dependency files changed.
- Dependency installation reports **14 existing advisories: 1 low, 2 moderate, 10 high, 1 critical**, plus install-script approval warnings. No unrelated dependency upgrade attempted; this is not a claim those advisories are resolved.
- Prior 80-test/browser reports are historical, not approval of these corrections. Parent must independently review this exact patch before merging. No production deployment/public-content pass is claimed here.

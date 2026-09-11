# Turmeric correction evidence

Base: `d6f8302a6b0132245ef45df116835d4c74839cf3` (PR #18), clean at branch creation and equal to origin/main after fetch.

## Source review

WO2007143635A1 is a distinct upstream purification family, not a carrier formulation. Published claim 1 requires up to about 75 wt% starting curcumin, phenol protection of at least one curcuminoid and organic-solvent crystallization to at least about 99 wt% curcumin crystals.[1]

Retrieved the original WIPO PDF from the Download PDF link; the saved PDF has 24 pages and no text layer. Read its cover and PDF page 18 (printed page 17, claim 1) with vision. The cover lists applicant/inventor “KIM, Darick, S.” whereas the index spells Darrick. Display uses cover spelling with the index variation identified. Cover confirms PCT/US2007/070379, priority US60/811041 dated 2006-06-05, filing 2007-06-05, publication 2007-12-13. This is an application publication, not a grant. The HTML claims text and quote-checked task ledger are saved alongside the original PDF and page images. The existing three scoped entries and prior evidence remain unchanged. Only one additional family was selected; no quantity padding or valuation claim.

Source number 1 in this task ledger maps to source 5 in the site's existing formulation namespace (4 remains reserved to avoid colliding with the inherited MCT citation routing). Existing source IDs remain stable.

## Images

Actual image_generate result: provider claw-max, model gpt-image-2-high. Tool reported 1024x1024 but the real PNG decoded as 1536x1024; crops use decoded dimensions. No claim of Gemini 2.5 provenance. Four independent quadrant crops, each 762x506 WebP, 30,870–64,654 bytes. Original contact sheet and crop/hash manifest retained. No brand, certificate or efficacy text appears in the artwork. Localized captions briefly identify AI application concepts.

Vision inspected the source contact sheet, actual food WebP, EN mobile latte/capsules, ZH mobile powder/food, and ZH desktop patents. Main objects and captions are legible. The mobile table above the latte was horizontally scrolled by the keyboard test: contained scroll is intentional, has a visible instruction when its caption is in view, and passed actual keyboard movement and page-overflow assertions. No layout change is needed for that screenshot observation.

## Checks

- RED: 2 patent-order tests failed on the baseline, then passed after implementation.
- RED: 2 image tests failed because cards lacked images, then passed after implementation.
- npm ci succeeded; npm test built 200 pages and passed 101/101 tests.
- Updated current turmeric browser suite passed 12 cases: EN/ZH, 390/768/1440px, JS on/off. It decodes all four distinct images, verifies dimensions/lazy loading and centered cards <=820px, tests patent source journeys including source 5, checks exact final section order and duplicate IDs, and confirms no page overflow.
- Original 12 product WebPs and shared deep12/overview data are byte-identical to base (preserved-sha256.json); other 11 ingredient texts were not edited.
- git diff --check passed. Static diff contains no new secrets, remote scripts, eval or unsafe execution; production changes are static data and Astro markup.
- npm ci reports 14 dependency vulnerabilities (1 low, 1 moderate, 11 high, 1 critical) with unchanged lockfile. Also reports pending allow-scripts notices for esbuild/sharp. No dependency update or claim that advisories are harmless.

Independent review and merge are assigned to the parent agent; this implementation PR does not claim release or public-domain verification.

## Sources

[1] https://patents.google.com/patent/WO2007143635A1/en — WO2007143635A1 — purification

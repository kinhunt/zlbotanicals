# Elderberry material-selection integration (not published)

Base: b842a492a415abe0b0362a92d9494b6a1063ac3a. Single bilingual resource article at `/resources/blog/elderberry-material-selection` and `/zh/resources/blog/elderberry-material-selection`; no product, encyclopedia or split-grade doorway pages.

## Editorial disposition
Read `independent-editorial/final-review.md` before integration. Implemented required E1 Chinese fiber paragraph, E2 bilingual Food to Live prose, E3 bilingual Bulk Essentials headings and the finite optional Chinese wording edits. `editorial-only.en.diff` and `editorial-only.zh.diff` are the exact prose-only deltas against byte-preserved `original/` drafts. `editorial-revised.*.md` precedes markup integration. Original article remains complete, including substantive three-brand Amazon section and direct ASIN links. No assertion of Food to Live's actual composition or fraud. Final editorial acceptance of these deltas remains an independent review gate.

Rendering adds collection metadata, original-ID native citations, two semantic tables, localized application/quote links and an explicit nutraceuticals inbound entry. Category/archive discovery uses existing collection metadata. No invented elderberry product link or brand dealership offer. Source 1/2/5/7/8/9/10/11 retain original meanings. Source list titles remain original document titles.

## Per-table presentation decisions
1. Four-grade composition comparison: native table on desktop; mobile row cards preserve grade, both explicit constituent labels, ≥ anthocyanins and approximate fiber percentages. No composition chart: these incomplete supplier declarations mix minimums and approximations.
2. Two-method specification ranges: native table on desktop; mobile cards preserve grade+product ID, method, g/100 g and each interval. Caption states ranges are not batch results. No chart implying measured differences.

Actual 390px visual QA found a collapsed mobile caption despite passing geometry of data cells. Added a failing caption-width browser assertion, changed mobile caption to display:block/width:100%, rebuilt and froze v2. Final actual viewports show readable captions, all method fields, and composition last-row/source context. Initial failed artifact and logs retained outside repo. Desktop initial element crops intersected the sticky header; actual viewport captures with table top at 110px confirmed intact headings. No CSS hiding of header for testing.

## Tests and boundaries
Baseline npm test 292/292. New static assertions first failed because both articles were absent. First candidate 291/294: three historical inventory assertions needed the exact new article pair excluded from historical subsets (original sitemap hash preserved). Final npm test 294/294; 218 HTML pages. Final frozen browser 8/8 EN/ZH ×390/1440×JS on/off, 64 native keyboard source journeys, 24 actual application/quote link clicks, two inbound paths each condition; no inquiry submissions or JS errors. Review exact receipts in `/data/hermes/research/seo-growth/2026-09-21-elderberry-release/`.

141 original public files and 53 original research-package files byte-preserved. No new public assets, images, image processing, dependency/config changes or AVIF processing. Existing npm audit remains 14 affected package entries (1 critical,11 high,1 moderate,1 low), not fixed or dismissed by static output. Conditional text-only risk triage remains separate from Astro migration.

Source/dist freeze and independent technical review must precede any PR/push/merge. This integration task did none of those and makes no production verification claim.

# Editorial landscape correction — review gate

Baseline: `8af5d9be8907310a5c1981a2ffa34ecb68e1986a` (verified origin/main before branch).

## Scope and preservation
- 33 previously portrait formulation illustrations replaced **by references to new derivatives**, never overwritten. All new files decode to 768×512 (3:2), WebP quality 88.
- 65 original public rasters inventoried individually in `baseline-public-rasters.json`, with original SHA-256 and decoded dimensions. All remain byte-identical, including all 12 original product WebPs, 33 portrait sources and 20 other images.
- Other public artwork: 6 turmeric concept figures (4 at 762×506, applications 1672×941, material-forms 2172×724), 7 solutions, 5 blog, 1 ODM and 1 hero. Already landscape; retained without crop or padding. The 3:1 turmeric material comparison intentionally retains its full four-material composition rather than cutting it to 3:2.
- Archival PDFs, patent-page screenshots, prior QA screenshots and source compositions under docs/media are not rendered editorial illustrations. They are preserved, not blanket-converted.
- Every new image has its own ID, old/new source path, hashes, crop coordinates and actual tool provenance in `manifest.json`. Captions, bilingual alt text, content paragraphs and reference links are unchanged. No public AI labels added.

## Generation and visual inspection
Actual supported `image_generate` results: provider claw-max, model gpt-image-2-high; 11 complete 1536×1024 2×2 compositions with independently arranged 3:2 scenes plus one refined single scene. Complete returned PNGs are preserved in `sources/`. Quadrants are landscape at generation, not portrait crops. Bottom-right spare panels are not published.

Inspected contact sheets in three chunks covering every one of the 33 IDs, then mobile green-tea and desktop ginseng screenshots. Initial whole-sheet vision call timed out; smaller chunks succeeded. Inspection caught a clipped blister package in licorice DGL; regenerated that scene independently, re-exported and visually confirmed complete pack, all ten cavities and bowl. Peripheral botanical/utensil ends may meet frame edges; main products are intact. No blank pillarboxing, stretching or portrait compositional workaround.

## Actual checks
- RED: decoded regression failed on green-tea/citrus-tea 554×941.
- GREEN: all 33 files decode 768×512, exact metadata.
- `npm test`: **143 tests passed**, 200 pages built.
- Expanded ingredient image browser: **144 cases**, all 24 EN/ZH science routes × 390/820/1440 × JS on/off; all article img files and rendered frames landscape, no oversized frames, page overflow or JS errors; 33 unique plan images decoded.
- Other editorial browser: **152 cases**, 38 EN/ZH blog, solution and ODM detail routes × 390/1440 × JS on/off; opened concept disclosures, decoded images and checked actual rendered landscape frames and no overflow/errors.
- Turmeric reader: **12 cases passed**.
- Original product imagery: **56 checks passed** (48 product-detail checks).
- `git diff --check`: clean.

## Remaining gate
Independent parent review is mandatory before merge. This implementer cannot spawn an independent child; no independent approval is claimed. Do not merge or schedule publication based on this implementation report alone.

Re-export, if needed: run `python scripts/prepare-landscape-plans.py` then `python scripts/refine-landscape-plans.py`; both use preserved repository PNG sources. Re-run visual inspection and tests after re-export.

# Deep ingredient research integration — 2026-09-09

## Release scope

Baseline `80a53da` (PR #12), branch `feat/deep-ingredient-research`.
All twelve supplied packs are integrated into existing canonical pages, in both EN and ZH. No new route, product artwork, audio, procurement form, or commercial specification is introduced. `deep-ingredient-coverage.json` accounts for each pack, source namespace, five sections, text volume and table count. Retained Chinese body content is 3,037–3,947 Han characters per ingredient (headings excluded by this measurement); English counterparts remain longform rather than summaries. There are 26 tables per locale.

| Pack | Site product ID | Canonical location |
|---|---|---|
| group-a/green-tea.md | green-tea | /plant-extracts/ingredients/green-tea |
| group-a/centella.md | centella-asiatica | /plant-extracts/ingredients/centella-asiatica |
| group-a/monk-fruit.md | monk-fruit | /plant-extracts/ingredients/monk-fruit |
| group-b/turmeric.md | turmeric | /products/turmeric |
| group-b/reishi.md | reishi-mushroom | /products/reishi-mushroom |
| group-b/ginseng.md | ginseng | /products/ginseng |
| group-c/ginkgo-biloba.md | ginkgo-biloba | /products/ginkgo-biloba |
| group-c/grape-seed.md | grape-seed | /products/grape-seed |
| group-c/goji-berry.md | goji-berry | /products/goji-berry |
| group-d/licorice-root.md | licorice-root | /products/licorice-root |
| group-d/stevia.md | stevia | /products/stevia |
| group-d/resveratrol.md | resveratrol | /products/resveratrol |

## Data and rendering

`src/data/deep-ingredients.json` is the actual published body. Zod validates all product IDs, dimensions/order, table rectangularity, source URL schemes and every bracketed source ID at build time. The renderer accepts typed paragraphs, headings, lists and tables; inline support is limited to bold text and numeric source references. Everything is escaped by Astro, without `set:html`, runtime Markdown, arbitrary attributes or embedded scripts.

Source numbers retain their research-group numbering and use fragment namespace `research-{group}-{productId}-source-{number}`. This prevents collisions with research cards and existing encyclopedia references. Sources are filtered to the actual citations, not all search discoveries. The scope ledger archives retrieved evidence quotations and original access limitations; it is not a new independent scientific approval.

Chinese and English bodies are separately split and parsed; no bilingual Markdown is placed into a single locale. Introductory pack boilerplate is replaced by one shared reading guide. Five earlier shallow science-profile sections are replaced, retaining their `identity`, `process`, `application`, `specification`, `evidence` fragments as aliases at the corresponding substantive section. Existing five-dimensional product navigation and canonical paths remain. Procurement/ODM context remains outside the longform renderer.

`import-deep-ingredients.py` records the strict one-time conversion path. It is not part of the build and does not retrieve or auto-publish research. Future content corrections should edit the structured body and coverage; rerunning against the original packs would overwrite editorial corrections.

## Evidence concerns for independent review

Research agents supplied retrieval ledgers and citation-presence checks, not independent peer review. Group B did not supply a README; its validation.json and detailed sources.json carry its handoff scope. Original retrieved excerpts and pack claims were inspected, with the following essential distinctions retained:

- Tea: processing waste, not spent infusion leaves; 1:50 not the overall highest yield; EGC/C co-elution; absolute batch charge unavailable.
- Centella: five-solvent experiment contains no ethanol; methanol result is analytical research, not a food/cosmetic process recommendation. EMA's 6% definition is cited from its historical pharmacopoeial version.
- Monk fruit: EFSA applicant enriched extracts, FDA GRN 301 and England/Wales non-selective decoctions are different materials/jurisdictions. Biotransformation evidence is abstract-level.
- Turmeric: 100 mg analytical extraction differs from crystallization and delivery engineering. The MCT model contains **sodium azide and is not an edible beverage recipe**; batch mass is not stated. JECFA 90% total colouring matter is not 90% single curcumin.
- Reishi: 1 g joint optimization has lower individual yields than the conventional controls; fractions and colorimetric equivalents must not become beta-glucan/HPLC claims.
- Ginseng: sealed 0.5 g/3 mL and microcapillary acid/heat models are not whole-root industrial steaming. EMA preparation-specific ginsenoside sums do not authorize beverages.
- Ginkgo: feed-additive ethanol/resin description is not pharmaceutical equivalence; magnetic isolation enriches ginkgolic acids for research, not demonstrated food detoxification. Current full pharmacopoeia not independently accessed.
- Grape seed: 1 g/50 mL-tube optimization and catechin-equivalent assay; historical sampled adulteration is not current prevalence.
- Goji: fruit/juice powder versus fractionated polysaccharides; discard/retain ethanol precipitation streams kept explicit; membrane cutoff differs from measured molecular mass. Single-droplet drying evidence is sugar/acid model, not goji juice.
- Licorice: DGL dynamic-column paper only abstract/excerpts; no industrial zero-residual claim. Glabridin recovery is secondary review evidence. 2010 EMA monograph is superseded. Glabridin dilution/crystallization demonstrates exposure error, not clinical whitening.
- Stevia: A1222 is an applicant technical dossier, not an approval; A1268 is separate enzyme approval. Abstract-only 2025 leaf extraction lacks validated batch/denominator; yield percentages omitted. Molecular-weight examples are not dosing advice.
- Resveratrol: 100 g knotweed experiment, polydatin conversion not 400% recovery, 73.8% product not high-purity batch. Abstract-only pH 6.8 observation is not a universal limit. 2016 authorization is historical; complete current Union-list annex remains unverified. Mercury reporting threshold cannot prove compliance with a lower limit.

These pages deliberately do not claim exhaustive 2026 regulatory clearance, supplier capacity, an actual COA or verified finished-formula efficacy. Parent independent content/code review is required before merge.

## Verification

- `npm ci`: dependency baseline remains 14 advisories, now reported as 1 critical / 10 high / 2 moderate / 1 low. No dependency upgrade in this content change.
- TDD: initial deep-render/data tests failed before implementation; duplicate shallow-profile test also failed before replacement.
- `npm test`: 182 static pages; 80 tests passed, including all static links, image mappings, audio/AAC regression, bilingual source-content rendering and retained anchor behavior.
- Original twelve WebP byte contents compared against `git show 80a53da:...`; all identical. SHA-256 manifest is `deep-ingredient-artwork-baseline.json`. No public media files changed.
- Product imagery browser smoke: 56 page checks, including all 48 EN/ZH product/width cases passed.
- Narration browser smoke: both 62.7-second videos passed unmuted decoded-audio energy and all eight caption cues.
- Final longform browser sweep: 192 cases passed (12 ingredients × EN/ZH × 360/390/768/1440 × JS on/off), checking actual rendered table counts, captions/headers, focusable scroll regions, citation/TOC targets and no page overflow. Screenshots inspected; mobile scroll hints added.
- Final anchor browser: 120 route checks and 600 actual dimension-link journeys passed (EN/ZH, 390/1440, JS on/off). Earlier harness navigation abort/crash was resolved by awaiting page load and releasing each ingredient page; final suites ran serially.
- PR #13 Vercel checks passed; preview deployment 6346680189 succeeded for `8e3c65eb5a7a53f1e9ac595d800d77146036f407`. Protected preview returned SSO HTTP 302, not content. Local preview tests are not production deployment verification. Parent independent review/merge and production verification remain outstanding.

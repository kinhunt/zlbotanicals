# Independent consolidation review

## Verdict

Corrected EN/ZH pair is suitable for research handoff and website integration, not yet approved as a rendered publication. The three original Amazon detail examples remain the substantive opening and commercial argument. The added label section explains serving conventions and processing language rather than manufacturing a protein-purity ranking. The scientific comparisons were checked against original XML cells and methods, suppliers against original HTML/PDF, and key label images individually with vision. Citation matching alone was not treated as factual approval.

Exact accepted files and SHA-256 values are in `review-manifest.json`; every article block is additionally bound in `claim-ledger.json`. `independent_check.py` is read-only and must be rerun after integration inputs are copied; `verification.json` records actual execution. The upstream read-only verifier passed 185 checks; `build_evidence.py` was never run. All writes are confined to this review directory.

## Must-fix issues resolved in the corrected pair

1. **Obsolete missing-label claims:** original EN “Serving masses were not established in this text-only sample” and ZH “此次文字样本没有确认对应的每份质量” no longer describe the combined evidence. Replaced with exact label serving bases: Sprout 32.5 g / 20 g protein; Anthony 8 g / 5 g; Micro approximately 30 g / 18 g. Kept two-scoop, tablespoon and approximate conventions.
2. **Anthony discrepancy:** original structured field has 30 servings; two gallery views have 56. Neither silently overwrites the other. Toasted ingredient and toast → press → mill copy coexist with cold-pressed front wording; they are not automatically contradictory. No claim of fraud, verified pressing temperature or entirely unheated powder.
3. **Sprout discrepancy:** original Blend field conflicts with one-ingredient/single-source front and Organic Pressed Pumpkin Seed Powder ingredient artwork. This is a listing-description conflict, not proof of blended physical contents or independently measured purity.
4. **Scientific denominator:** added supernatant protein / initial sample protein explicitly. Retail label portion, analytical solubility denominator, supplier percentage limit and protein yield are not interchangeable.
5. **Milling wording:** tightened “higher protein recovery” to higher protein concentrations in recovered isolates. Original Frontiers HTML supports the authors’ concentration/profile statement; grinding and cooling changed together. No particle-only causal or food-grade inference.
6. **Reader context:** direct contextual links now point to all three ASINs, the two Austrade grades, historical Cambridge PDF and three primary papers. No substitution of official-brand examples for Amazon evidence.

## Source-level semantic findings

- **2022 Table 1:** protein 60.24 ± 0.05 → 68.68 ± 0.13 g/100 g; fat 13.38 ± 0.12 → 0.77 ± 0.14. Table footnote is half deviation range, n=2; comparison letters apply within rows. Not SD, isolate purity or commercial grades.
- **2022 Table 3:** at pH 5 UAE 6.59(d) exceeds AE+US 4.90(c); pH 7 reverses to 18.80(b) versus 23.07(c); pH 9 46.87(c) and 46.93(c) share a group. No universal best treatment. Reported mean±SD n=4 retained, alongside daily pooling; do not call this four independent commercial batches. Methods specify ANOVA/Duncan and 5 mg/mL, 2 h, room-temperature agitation, centrifugation and Kjeldahl supernatant assay.
- **2022 Table 2:** AE+US d90 is smallest (179.93 μm), but d10 rises to 8.05 from control 4.82 μm. Volume distribution of post-extraction dispersions at pH 7 after one day at 6°C; n=12 represents triplicates across four extractions, not 12 manufactured batches. No dry mesh or entire-distribution shrinkage claim.
- **2025 Table 4:** rowspan=3 binds Alkali to UT/CH/MH. PS is 10.32±0.05(c), 9.75±0.02(d), 15.99±0.04(a), mean±SE n=3. Conventional preheat is lower, contrary to generalized prose; retained the original cells instead. Salt rows all share f, further caution against blanket preheating superiority. WSI preparation uses 1:4 w/w and a day of shaking; no instant-dispersibility inference. Statistical methods use ANOVA/Tukey. Table footnote calls letters upper case although visible letters are lower case; corrected article simply calls them significance letters.
- **Austrade:** actual composition cells are unroasted protein ≥60%, moisture ≤10%, fat ≤10%; roasted ≥57%, ≤8%, ≤17%. Roasted name ending 60 does not supersede ≥57. Original HTML contains all five cells for each grade. Percent basis and assay method are not established in these page specifications. Bounds cannot rank batches. Species/process differences defeat roasting-only causality.
- **Cambridge:** vision confirms page 1 effective 2/19/2020, name 60%, specification ≥80%; page 4 nutrition protein 65 under Amount per 100g without its own unit. Page 3 flow has machine sieving BEFORE expression. The text layer loses the equals stroke. Kept as an attributed historical inconsistency, not a current purchasable grade. Page 3 is the flowchart; page 4 is nutrition (do not transpose these image locators).
- **Labels:** selected original gallery images were independently viewed: Sprout front/nutrition/ingredient; Anthony front/back/nutrition closeup; Micro front/back. Sprout protein DV 28% and Micro 18% read literally but omitted from the article because they add no necessary argument; no inferred reason or corrected DV. Micro warning is not a lead assay or an independent safety verdict and is not sensationalized in this article. All 18 original gallery JPEG hashes are checked, but this reviewer did not independently transcribe small text in the other ten images.
- **Identity:** gallery `canonical` fields are `/clp/ASIN`, not the article’s `/dp/ASIN` links. Identity rests on requested/observed input ASIN, live `/dp/` URL, title and initial gallery together, not canonical alone. No label sticker was treated as a verified UPC or ASIN.

## Independent bilingual reader judgment

The English now leads with an understandable product-choice question and uses evidence where it explains the promise. The Chinese was reviewed as an argument, not solely numerical parity: “一汤匙，还是两勺？” gives a concrete entry point; “厨房用量” and “日常食材” explain positioning without translating industry abstractions word-for-word. The ingredient names remain literal English inside the table for auditability, with natural Chinese interpretation in adjacent brand paragraphs. “约30克” and “两满勺” preserve the difference between approximate mass and the rounded-scoop direction. Both versions retain seller attribution for raw/cold-pressed/fine-milled.

The pair is intentionally substantive: retail positioning → portions and brand interpretation → processing/supplier contrast → scoped experiments → application trials → compact methods. Science is deeper than the opening and receives subheads; it must not visually eclipse the original Amazon research. Repeated missing-label disclaimers were removed. Necessary qualifications remain adjacent to the specific claim, not repeated at the start of every section. No efficacy, market-share, price-per-protein, protein-quality or certification conclusion was added.

## Every display type: independent verdict and reading plan

| Exhibit/type | Verdict | Rationale and acceptance requirement |
|---|---|---|
| Three-brand positioning matrix | Keep, adapt | Analytical core; three rows are observations, not rank order. On mobile use three labeled cards or persist brand identity while scrolling. Product links remain contextual and keyboard accessible. |
| New label serving/ingredient matrix | Keep, adapt | Denominator comparison is meaningful. Show all three brands, serving mass and protein together; retain approx./about and caption 30-vs-56. Long ingredient strings favor per-brand cards on mobile. Do not create normalized protein bars. |
| Austrade specification matrix | Keep | Side-by-side supplier limits with comparator symbols, not actual composition. Short localized headers with full names nearby. Do not sum upper/lower limits into a composition stack or use a batch-purity bar ranking. |
| 2022 selected solubility table | Keep, subordinate | Small exact table preserves uncertainty and significance groups better than a winner chart. Headers must say % and pH explicitly, not only in a distant note. Caption: selected treatments/pH, mean±SD, n=4, pooled isolates, same-column letters. Original full table remains source evidence. |
| Optional solubility chart | Defer, not needed | If required, separate pH panels with discrete treatment dots/error bars and letter groups; same scale, accurate SD, accessible table. No interpolated pH curve from selected points, no claims of equivalence from shared group, no retail brand labels. |
| Particle-size chart | Do not add | Three quantiles are not a complete distribution. No fake histogram/density curve or “all particles smaller” arrows. Current prose retains d10 counterexample and d90 context. |
| 2025 preheat chart | Do not add now | Concise three-value prose suffices. If added later, restrict to Alkali, mean±SE (not SD), letters c/d/a and source rowspan binding; do not combine with 2022 solubility as a common assay. |
| Cambridge process diagram | Prose sufficient | Optional historical-only diagram must put sieving before expression and separate conflicting composition fields. Never infer this is the three retailers’ actual process. |
| Generic qualitative process illustration | Optional, unproduced | Pressing/milling/isolation can be explained in native text. A square conceptual graphic may support it, but no quantitative claims or universal manufacturing route. No asset currently generated or approved. |
| Purity rankings, retail protein magnitude bars, radar scores, market-share pie, Sankey/yield funnel | Reject | Unequal portions, rounded declarations, incompatible bounds or absent market/flow data cannot support these formats. |

Render all four tables as semantic HTML, not screenshots. Set captions at readable body-adjacent size; keep numeric value–unit pairs intact in Chinese. Desktop reading column should be centered with left-aligned prose. Provide a concise chapter navigator; do not repeat every cell in a chart, table and prose. Mobile tests must show the rightmost data with its brand/treatment identity, not merely no page overflow. Preserve links in card transformations; tables need row/column headers. No forced heatmaps, green winner cells or tiny chart-source fonts.

## Remaining publication gates

- Apply the four-table reading plan and make solubility percentage units explicit in rendered headers. Test English and Chinese at 375/390 px and desktop, keyboard table navigation/card links, zoom, contrast, numeric wrapping and actual rightmost-row identity. No rendered/browser/layout test was performed here.
- Bind integrated prose, cells, captions and references to these exact draft hashes. Preserve the complete original-byte evidence and label provenance, not capped excerpts. Changes after this review require a focused semantic recheck, not a citation-only pass.
- Keep current COA/TDS, certification, actual pressing temperature, measured particle distribution, dispersion/sensory trials and corrected Cambridge specification as unknowns. They are needed only if publication expands into verified performance/current procurement claims; they are not reasons to block the scoped observational article.
- Confirm publication-facing reference links and gallery-image use/licensing if reproducing package artwork. Text comparison does not require reproducing all label images. No repository integration, deployment, new browser collection, backlog edit or publication was done.

## Reproduction

Run `python /data/hermes/research/seo-growth/2026-09-28-afternoon-pumpkin-review/independent_check.py`.
The checker validates immutable original bytes, complete original table cells/spans, semantic numerical relationships, supplier parsed cells, exact gallery identity/image URLs, manual vision record bindings, every draft block and final artifact hashes. Its pass is regression evidence supporting this human-style semantic review, not automated visual/OCR proof or deployment approval.

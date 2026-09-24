# Independent verdict and integration handoff

## Decision

**PASS for consolidated content, subject only to the finite integration checks below.** Publish neither original candidate as a second article. The approved content artifact is ONE substantive bilingual work (`article.en.md` + `article.zh.md`), revision `schisandra-consolidated-r1`. This reviewer was independent of both candidate authors, re-fetched original sources, inspected their content, then edited the consolidated revision. This is not a claim of a further independent reviewer after this editor, rendered-site approval or publication authority.

The article retains the distinctive evidence from both packages: Euromed's actual >9% row; the retailer's sugar-steeped omija format; seven-lignan plant-part and time-series research; extraction versus downstream deacidification; and the independently verified USP/paper panel difference. Three compact tables support the argument. The text is not a safety checklist or a supplier-question catalogue.

## Frozen article SHA256

- `article.en.md`: `1ae7b8fef2593f16a2bc3cfdd5a23c7fa3f26f9f8e09a063cdf10e1fc9fe89f6`
- `article.zh.md`: `eead94ea09668475cd5ebd620b15921856d566a4985940c4121ad058c480b220`

`input-hashes.json` freezes all 75 inherited package files, not just the four candidate drafts. `revision.json` identifies this article revision. `SHA256SUMS.json` covers this isolated revision's artifacts except itself and the final execution log. No git commit, website release or remote revision was created.

## What was independently checked

Fresh successful HTTP retrieval on 2026-09-24: both complete Europe PMC JATS XML papers, Euromed's actual PDF, retailer HTML and USP's actual public preview HTML. All eight original table-wrap objects were independently parsed, retaining cell boundaries, captions and footnotes. The article uses the 2020 Tables 1–2 and 2021 Tables 2–3; the other tables were reviewed but not selected. Source tables and methods, not abstract wording or figure heights, support the numbers.

A new crop rendered from the fresh Euromed PDF was visually inspected. The Schisandra entry reads `SCHISANDRA FRUIT / Schisandra chinensis Turcz. Baillon / > 9% schisandrins`; the adjacent fatty-acid and spinach specifications do not belong to it. The image is `sources/euromed-schisandra-row.png`. This confirms the printed catalogue row, not an independent batch assay or compliance audit.

The USP preview explicitly supplies the four analytes and parenthetical aliases. It differs from the study by schisantherin A versus schisandrol B. Its 90–110% applies to labelled content on a dried basis, not lignan purity. Its bibliographic year is 2019; no claim is made that this is a newly issued or fully reviewed current monograph.

All five source IDs have literal supporting quotations verified against fresh local source text. `ledger.json` is isolated; no inherited or shared citation ledger was overwritten. `claim-review.json` maps retained claims to specific locations and decisions. `EXHIBIT-REVIEW.md` reviews every inherited and final exhibit type, not merely arithmetic.

## Substantive editorial corrections

1. **Consolidated overlapping narratives.** Ingredient format → tissue distribution → sugar steeping → extraction/deacidification → assay definitions → practical formulation comparison. Neither headline promises human benefits or treats every Schisandra material as a capsule extract.
2. **Replaced the mixed-denominator table.** Concentrations now carry original SD in a four-sample table. Author-reported process rates remain separately attributed in prose. Rounded table means do not reproduce those rates exactly: audit-only calculations are in `recovery-audit.json`; no reconstructed recovery, Sankey or industrial yield claim is published.
3. **Added the full time-series table with significance letters.** Later means all belong to group a. No successive significant rise, optimal twelve-month duration, recovery curve or low-sugar shortcut is claimed. Table 4's distinct white-sugar preparation is not merged with Table 3.
4. **Retained precise analytical definitions.** Seven-, four- and USP four-analyte sums remain distinct; Euromed's plural remains undefined. Original spellings are preserved. The 2021 discussion's inconsistent `schisandrin A (1)` and gomisin G alias are not repeated.
5. **Removed the VNBiotech section from final copy.** Its ambiguous specifications are a legitimate inherited observation, but add a third commercial digression rather than a new formulation finding. No new claim of fraud or current mislabelling is made. Its inherited evidence remains hashed in the input record, not part of the five-source publication ledger.
6. **Excluded unsupported extrapolations.** No human dose/safety, liver or disease benefit, probiotic/selected-microbe mechanism, ethanol-free claim, sensory superiority, solubility, shelf-life, current stock/certification/manufacturing ownership or guaranteed supply. The paper's questionable bicarbonate explanation is not adopted. No fabricated optimum recipe or addition sequence.
7. **Natural Chinese revision.** 中文围绕原液、去籽、糖浸和脱酸的实际差别展开，不照搬英语句序；把限制集中到必要位置和一条证据范围说明，没有反复用“请供应商确认”代替解释。英语与中文保留相同的数值、研究尺度和限定强度。

## Evidence boundaries and issues

- Commercial examples are attributed first-party catalogue/retailer descriptions, not purchased-product tests. The retailer is not the manufacturer and establishes no industrial supply capability. Package images were not independently assessed; no package-label claim depends on them.
- Two laboratory studies do not establish the wider literature consensus or universal processing results. Repeats are reported as the source describes them, not recast as independent harvest batches.
- Primary plotted figures were not digitized. The relative-profile statement comes from explicit Results prose. Numerical claims come from parsed tables.
- No source was blocked. The first strict Chinese citation pass flagged a paragraph as >3 citations because its sentence splitter does not segment Chinese punctuation reliably; splitting two distinct points into separate paragraphs resolved it without dropping evidence. Both final strict/evidence passes succeeded. Automated English/Chinese coverage percentages are not semantic-quality scores.
- Dedup is inherited at pinned PR67/main `448b91baf7b222f4b90122cce04d9a09a17f9c06` (both original inventories report no Schisandra). This reviewer did not inspect a newer site state or rerun current dedup. No BrowserMan, site, shared backlog or publication writes occurred.

## Finite integration requirements — no new research cycle required

1. Recheck current site content for a Schisandra article added since the pinned inventory. Integrate this as one ENZH pair, not alongside either original candidate. Suggested single topic slug: `schisandra-beverage-materials`; final route follows the site's existing Research structure. Do not create a second deacidification synonym page or a new commercial product promise.
2. Carry the complete approved prose, three tables, scope paragraph and five clickable source references into the actual renderer. Preserve numeric cells, SD, units, letters, literal > sign and source identity. Any substantive cut or claim change needs a targeted fidelity review; do not silently shorten this to a procurement checklist.
3. Resolve contextual internal links to the actual localized beverage and botanical-ingredient/application destinations. Do not invent a Schisandra SKU, availability badge, certification, sales route or legacy URL. This article needs no new illustration or chart to be complete.
4. Run the integration's normal build/content tests, localized canonical/hreflang and reference-link checks. Independently inspect rendered desktop/mobile tables, source text and row identity during scrolling, following `EXHIBIT-REVIEW.md`. Compare the integrated content against these frozen hashes or an explicit transformation diff.
5. Obtain/use the parent's actual publication authority and normal release gates. This task grants none. Record any eventual commit, deployed SHA and live verification separately from this editorial pass.

## Deliverable map

- `article.en.md`, `article.zh.md`: complete consolidated reader-facing article.
- `ledger.json`, `claim-review.json`: literal source evidence and claim decisions.
- `sources/`: original XML/PDF/HTML, derived readable text, parsed tables and actual PDF crop.
- `retrieval.json`, `source-revision-comparison.json`: fresh source bytes/URLs/status and inherited-original comparison.
- `EXHIBIT-REVIEW.md`, `recovery-audit.json`: whole-exhibit review and rejected reconstruction arithmetic.
- `citation-verification.en.txt`, `citation-verification.zh.txt`: actual final citation checks.
- `verify_readonly.py`: rerunnable read-only original-table, bilingual-number, citation and hash validation.
- `revision.json`, `input-hashes.json`, `SHA256SUMS.json`, `verification-run.txt`: revision freeze and real execution evidence.

# Independent hops review — corrected bilingual candidate

## Verdict

**Accept the corrected EN/ZH copies for subsequent integration review, not publication.** The core material-choice argument survives original-source checking. The discovery drafts were factually cautious but editorially too defensive, and the displayed analytical table lacked a complete source unit. Corrected copies remove that public table, retain the compound-specific finding, add a useful material-function matrix and precisely scoped supplier dose examples. No website, backlog, source directory or repository edits were made.

Read DISCOVERY.md, both complete drafts, source-claim-ledger.json, ledger.json, table-conditions.json, retrieval-manifest.json and all four claim-bearing original sources (three supplier HTML responses and the four-page scientific PDF). Supplier landing-page/product-index response hashes were also checked; these discovery sources are not performance evidence. This review uses the archived retrieval, not fresh HTTP or current product availability verification.

## Evidence and execution

- The original verifier writes output files beside itself. To preserve originals, copied the discovery package into `original-verifier-run/` and reran the unchanged script there: **68/68 passed**, exit 0. See `original-verifier-rerun.txt` and the copied verification output.
- Independent script `verify-independent.py`: **57/57 passed**, exit 0; report in `independent-verification.json`. It checks the initial hash inventory against every original file, all seven raw-response hashes and sizes, original PDF rows including base n.d. cells, 15 exact claim/evidence quotes, supplier quotes against independently parsed raw HTML, dosage arithmetic and corrected citations.
- Both corrected drafts pass citation evidence verification. Warnings for unused discovery sources [1], [2], [4] are expected. The English sentence heuristic reports 23% and the Chinese heuristic 100%; neither measures substantive factual coverage. Manual source review, not those percentages, determines acceptance.
- Visually inspected `aroma-table-page.png` against the source table. Independently extracted the PDF and rendered page index 2 into `paper-table.independent-render.png`. Original image inspection confirms Table 3 versus prose Table 4, the incomplete `μG/` heading, base 0.4% ABV and the four dry-hop groups, all 16 selected treatment cells, and all four base n.d. entries. n.d. is not converted to zero.
- Original-file inventory in `original-hashes.before.json`; corrected draft SHA-256 values are recorded by the independent verifier. Original discovery files remain unchanged.

## Findings and finite corrections

### Matrix, ethanol and study design

The source base is thermally dealcoholized commercial wheat beer, not water. Base 0.4% ABV; dry-hopped treatments 0.5/3.5/7.0/10.5% ABV, three samples each, four alcohol-adjusted unhopped controls and one unadjusted base. All 17 received Nagardo. Solero Type 90, 250 g/hL = 2.5 g/L, loose pellets in 20-litre NC kegs, semi-static 14 days at 5°C. Do not multiply vessel capacity into a claimed actual fill mass. The article's own alcohol-free definition is ≤0.50% ABV, not a universal labeling rule; corrected copy expressly distinguishes the studied 0.5% beer from 0.0% beer and sparkling water.

The 2023 article is an excerpt of the 2022 model study, not a second independent experiment. Supplier and TU Munich affiliations are now visible in the reader-facing study section. Full 2022 results are unavailable in this package; they are needed before adding statistical comparisons, error bars or broader mechanistic claims, but not before retaining the bounded qualitative comparison supported by this original excerpt.

### Aroma, bitterness and light stability

SELECTED FREE is supplier-described fractionated oil diluted in propylene glycol, mainly polar components, bittering substances “not detectable” without a stated detection limit. Positioning is not independent validation. The pellet experiment cannot substantiate this commercial product's effectiveness or near-100% recovery assertion. That recovery assertion remains omitted.

Iso-Extract is conventional iso-alpha-acid potassium salts in water; 30.0 ± 2.0% w/w by HPLC is an active concentration specification, not an addition rate. Tetra is tetrahydro iso-alpha-acid potassium salts: a chemically distinct reduced bitter-acid material, not a stronger aroma oil or generic name for all hydrogenated hop extracts. The whole-process absence of alpha and ordinary iso-alpha acids remains explicit, including equipment and yeast carryover. Partial replacement may have other supplier-described functions, but does not satisfy the complete lightstruck-protection condition. Lightstruck resistance is not general aroma, color or microbiological stability.

The Iso-Extract beer-predilution warning applies to concentrate handling, not a ban on properly mixed addition to bulk beer and not a finished-beverage pH target. Preserved this useful distinction without expanding into an unvalidated process recipe.

### Units, doses and source defects

The aroma-table heading genuinely ends at μG/. Adjacent prose gives µg/L context, but a precise reader-facing concentration display would still require repairing the original. **Removed the numeric exhibit rather than asking the reader to navigate a long disclaimer below unitless values.** Exact cells and source defect remain in the evidence, and qualitative comparisons remain in prose.

The new dose examples are direct supplier entries, specifically before/during filtration: up to 3 mL/hL bottom-fermented and 6 mL/hL top-fermented beer, equivalent to 0.03 and 0.06 mL/L of the supplied diluted product. They are not validated doses for every alcohol-free beer, a pure-oil specification or a water formula. Pellet dose has its separate g/L basis.

Geraniol H=198.4 stays lower than M=250.0; no sampling-error correction is made. Myrcene concentrations near 14,000 are exceptional under the authors' closed-system/low-yeast explanation; no recovery or sensory multiplier is derived. Added the source's ±10% analytical-tolerance qualification with exceptions; it is not a standard deviation or error bar. Excluded beta-acid strict “below 6.4%,” generalized humulinone independence and limonene identity claims because source prose/table discrepancies do not support clean extension.

### Reader usefulness and Chinese editing

Original: “Research draft — not publication-approved…” / “研究初稿，尚未获得发布批准…” — internal approval workflow, removed from public copy and retained here.

Original: “The useful next step is not to rank those products…” and “这些原料不宜按‘提取物浓度越高越好’排成一条线。” — replaced with direct missing-attribute selection plus a functional matrix.

Original: “证据档案保留了不完整表头，没有将其悄悄改正。” — internal evidence narration, removed with the unsuitable table.

Original final paragraphs repeated what the work could not support, ending with “现有证据足以支撑有边界的技术讨论…”. Replaced with practical separation of aroma trials, bitterness adjustment and packaged storage evaluation. Supplier-ranking, health-claim and publishing caveats belong in this review, not a repeated public conclusion.

Chinese is independently rewritten around 补香、调苦、光照异味, not mechanically translated workflow instructions. β-月桂烯, 芳樟醇, 香叶醇, 异丁酸异丁酯 and 丙二醇 retain their correct identities. “耐光” is qualified by the specific lightstruck endpoint in the body; it is not an unrestricted shelf-life promise. Both languages retain equivalent supplier attribution, matrix, dosage and experimental limitations.

Final outline: missing sensory attribute → functional material matrix → oil composition and usable dosage basis → scoped ethanol experiment → bitter-extract mixing distinction → whole-process lightstruck protection and development implications.

## Explicit display-type decisions

| Display/type | Decision | Reason and scope |
|---|---|---|
| Original four-compound numeric concentration table | Remove from both reader drafts; preserve in review evidence | Incomplete original unit; exact values add a source-repair detour and encourage overreading sparse means. |
| New three-row material-function table | Keep | Qualitative mapping of ingredient function, carrier/chemistry and use condition; attributed per row. Not a ranking or demonstrated efficacy comparison. |
| Original source table image | Evidence only, not article artwork | Useful for direct verification; journal page, tiny text and ambiguous heading are unsuitable as a reader-facing substitute. |
| Line chart | Do not create | Would imply an interpolated dose-response over four discrete alcohol groups; individual data/uncertainty unavailable. |
| Bar chart or small multiples | Do not create | Numeric unit unresolved; no need to visualize concentration magnitude for the chosen argument. |
| Heatmap/source color coding | Do not reproduce | Source color legend's “significant” wording is not independently backed by tests in the excerpt; cannot confer statistical significance. |
| Normalized recovery/percentage/ratio graphic | Reject | Compound concentrations are not sensory scores or extract utilization; deriving ratios would overstate transferability. |
| Error bars | Reject | ±10% is described analytical tolerance, not per-group SD/SE/CI. |
| Dose chart/calculator | No; retain scoped inline examples | Two supplier use examples are not dose-response evidence; dilution basis and process scope fit prose better. |
| Shelf-life/light-exposure graph | Reject | No finished-beer time series, light dose or packaging challenge evidence. Ingredient storage shelf life is a different endpoint. |
| Generated image, mechanism infographic or decision-flow diagram | Not required or produced | The native-text matrix already communicates the bounded choice without decorative or mechanistically unsupported graphics. |

## Remaining scope

This is a finite factual/editorial correction, not an integration or publication result. No rendered mobile/desktop layout, table scrolling, production citation links, site dedup refresh, deployment or legal labeling review was performed. Future integration should preserve citation identity, keep the functional table accessible and avoid restoring the removed quantitative exhibit without resolving the original-unit problem. No new experimental, safety, health, supplier-capability or finished-beverage performance claims are approved by this review.

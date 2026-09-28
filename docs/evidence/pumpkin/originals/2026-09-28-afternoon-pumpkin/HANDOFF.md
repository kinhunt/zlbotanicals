# Handoff — pumpkin original-sample article candidate

## Deliverable

- `draft.en.md` / `draft.zh.md`: complete natural-language article pair, retaining original Amazon analysis as the opening/core commercial argument.
- `DECISION.md`: multiple angles considered, selected reader task, source conflicts, exclusions and exact evidence gaps.
- `source-manifest.json`: original downloaded response bytes and inherited wrapper URL/hash/date/provenance mapping. 11 records including one explicitly blocked response, NOT11successful substantive sources.
- `sources/`: 2original scientific full JATS, 1original publisher scientific fullHTML, 2supplier original HTML pages, 29page supplierPDF, derived full text and original-cell JSON,3visually inspected rendered supplierPDF pages. Supplier website specs are primary supplier assertions, not batchCOAs.
- `inherited/`: all14files from original8search/3ASIN package, unchanged copies. Original observation and wrappers read, nested JSON decoded. No new BrowserMan calls.
- `claims.json` / `citations.json`: claim–source–quote/table-cell mapping and fixed citation registry. Citation7 is failed GreenSpring response retained for discovery audit and never cited.
- `artifact-manifest.json`: frozen deliverable/derived/inherited file hashes.
- `verify.py`: read-only, offline, stdlib-only verifier. `build_evidence.py` is a separate MUTATING authoring utility; reviewers should not run it.

## Checks actually executed

`python research/seo-growth/2026-09-28-afternoon-pumpkin/verify.py`

Original run PASS184 checks: source/archive hashes, exact inherited bytes, literal quotations, original JATS table rows, specific numeric/statistical regressions, supplier limits, bilingual numeric presence, contextual links and blocked-source exclusion. Final run after handoff/source-date binding is recorded in `verification.json` (count may increase with newly bound handoff file).

Both drafts passed grounded-citations `verify --evidence`, recorded in `citation-verification.txt`; expected warning is unused blockedsource7. No minimum citation-coverage threshold was imposed: the tool reports22% English and100% Chinese under its sentence heuristic, which is not a meaningful bilingual parity measure. Most experimental/supplier paragraphs carry end citations plus claim-level literal/cell locators. This is mechanical integrity, not blanket factual/editorial approval. Cambridge visual claim is separately image/page-bound; its generic citation quote alone is not proof of the comparator.

## Findings parent should retain

- Eight rows include two Sprout sizes; three distinct-brand details. Preserve cold-pressed/protein-serving vs simple-kitchen vs fine-milled/everyday positioning; do not replace with market reports.
- Austrade roasted name60 but actual minimum57%; unroasted60%. Method and percentage basis unknown. No batch ranking from bounds, no roasting-only causal inference.
- Cambridge2020PDF visible≥80% conflicts name60%; nutrition65 lacks its own unit. Rendered comparator differs from lossy text >80%. Flowchart order is machine sieving BEFORE expression. Historical illustration only.
- 2022Table3 UAE beatsAE+US atpH5; both sharec atpH9. Table2 AE+USd10 increases despite reducedd90. Table1±half-range, Table3±SD; pooled isolates, not4commercial batches.
- 2025Table4 alkali conventional preheat9.75<untreated10.32 despite generalized prose; microwave15.99. Preserve rowspans. WSI1day hydration is not instant dispersibility.
- Milling/cooling changed together in cell-media study. No food-grade implication or retail texture validation.

## Pending gates / exact gaps

Parent exact-ASIN labels remain uninspected. Serving masses, ingredient panel identity and Sprout Blend mismatch unresolved. No18vs20nutrition ranking. No original retail wetting/dispersion/stability test or particle distribution. Primary research covers experimental solubility and upstream milling, not shaker performance of the3products. No batchCOA, signedcurrentTDS, verified certification, currentCambridge correction, recipe trial, shelf-life or supply promise. No independent factual/bilingual reader review, repository integration, layout test, artwork or publication completed.

Recommended next action: merge parent label supplement only after identity/denominator review; keep this pair isolated for independent source-and-reader review. It can remain text-sample analysis without adding an unsupported nutrition table. No new sunflower rewrite needed.

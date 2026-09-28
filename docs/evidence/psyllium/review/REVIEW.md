# Independent review: PASS after bounded revisions

**Scope:** factual review against archived original JATS/XML cells, English and Chinese reader-oriented editing, and a bounded original ecommerce material-identity section. No website changes, BrowserMan use, publication or label-image inspection.

## Decision

- **Input drafts: REVISE for contextual precision and presentation, not a reversal of their central finding.** C01–C14 and the application synthesis were supported. Original numerical values and significance conclusions survived direct cell review.
- **Corrected full copies: PASS for this research/editorial scope.** Use `corrected.en.md` and `corrected.zh.md`, with exact hashes in `artifact-manifest.json`. Final acceptance is bound to those files, not any subsequent integrated revision.
- **Publication: not performed or authorized by this review.** Parent retains placement/dedup, route, rendered accessibility, build, deployment and public verification gates.

## Findings and explicit PASS/REVISE ledger

`review-ledger.json` contains 26 records: 15 original claims/synthesis (PASS), eight revision records (REVISE → PASS), and three added retail records (NEW → PASS). It retains full original supporting paragraphs, cell rows, original sentences/states and remedies.

| Check | Verdict | Result |
|---|---|---|
| S1 original Table 1 numbers and statistics | PASS | Specific volume: 1.41/2.15/2.06/2.08 cm³/g; SD 0.02/0.12/0.04/0.05; letters c/b/b/b. Firmness: 24.72/8.27/8.33/6.12 N; SD 2.10/0.89/0.71/0.58; letters a/b/b/c. No monotonic volume benefit or equal-to-wheat claim. |
| S1 formulation denominators | PASS | Psyllium 0/2.86/7.14/17.14 and water 100/82.14/91.10/117.86 g per100g flour/starch base. Egg and milk present; added water is not total ingredient water. |
| S1 measurement replication and handling | REVISE → PASS | Added six firmness measurements from three loaves; added scraped-versus-moulded handling. Joint water/ingredient/handling comparison is not an isolated dose experiment. |
| S1 prose versus cells | PASS with cell precedence | Original Results broadly says fresh psyllium breads did not significantly differ in physical properties; firmness letters b/b/c in Table1 are more specific. Corrected copy retains lowest firmness at17.14%, not broad equivalence. |
| S1 storage | PASS |72hours, calcium propionate plus sprayed mould inhibitors, polypropylene bags22–25°C/50–70%RH. No preservative-free life or antimicrobial substitution claim. |
| S2 Tables1/6 | PASS | FC9.8/159.7 versus F2 13.2/173.6g; HPMC3.6/xanthan3.2 unchanged. Gumminess35.3±4.9b versus40.7±7.5c N; hardness58.9±7.9b versus64.7±13.8b N. Gumminess significant, hardness not significant. |
| S2 recipe identity | REVISE → PASS | Define HPMC and add maize-starch-dominant base plus extra commercial premix.100g base does not mean total dry mixture. Visual consistency adjustment remains explicitly subjective. |
| S3 species/fraction/hydration | PASS | Seed/seed/husk all<300µm, not particle-size-controlled trial.9% substitution:74.9/75.8/98.1% versus61.2%, target1.1±0.05N·m. Seed hydration values share a group letter; no claim that every pair differs significantly. |
| S3 output denominators | PASS | Volume per100g flour blend differs from mL/g finished bread. Higher retained mass is author interpretation, not independently proven mechanism or production-yield forecast. |
| S3 sensory | PASS | Ten19–24-year-old students, nine-point scale; fresh scores nonsignificant. No consumer-wide preference ranking. |
| Chinese terminology and voice | REVISE → PASS | Preserve 比容/粉料基准 and 胶着性/黏附性 distinctions. Remove internal editorial wording, improve sandwich-bread wording and replace repetitive defensive closing with practical formulation conclusion. |
| Ecommerce contribution | NEW → PASS | Three selected ASINs from two8-result searches. Record-level whole/powder mismatch and shared NOW bullets are useful identity observations, not physical equivalence. Anthony’s finely-ground wording is qualitative. |
| Evidence completeness | REVISE → PASS | Inherited C02/C07 evidence was truncated. Full XML paragraphs recovered; all bread tables parsed from cells independently. |
| Tables and visual choice | PASS | Keep two tables per language: qualitative material-identity matrix and quantitative S1 formulation/outcome table. No market ranking, cross-study effect-size chart or unsupported particle-size chart. See exhibit review below. |

## Exhibit review

1. **Retail identity matrix: KEEP.** Qualitative titles/attributes do not justify a chart. ASIN and clickable product name identify each row. No price, fibre, health or certification ranking. The observed records—not independently re-fetched DOM or inspected packaging—are the evidence. Both NOW bullet arrays contain internal duplicates and closely shared wording across listings (minor punctuation differs); the derived matrix does not multiply observations by bullet count.
2. **S1 formulation/results table: KEEP with clarified note.** Four gluten-free formulations are a selected subset of original Table1, alongside water amounts from Methods. Units and denominators are visible in headers. Different superscripts are explained in adjacent prose rather than recreated incompletely. Mean±SD retained. Do not convert into a dose-response line chart: water and handling also changed. No claim of cross-study numerical comparability.
3. **No new quantitative chart.** S3 volume and sensory figures are discussed from explicit original author narrative, without inventing chart-point precision or extracting unsupported values. S2 gumminess comparison fits a paragraph; adding another table would repeat it.

## Finite acceptance gate

Completed editorial/factual gates:
1. Match the three XML hashes to the original source manifest; archive immutable local copies and input revisions.
2. Parse original table cells and verify the exact values/letters used in both languages.
3. Review full study methods/results supporting all15 inherited claim records; preserve complete load-bearing quotations and study limitations.
4. Inspect all5 ecommerce result files; preserve search/detail separation, ASIN identity, missing mesh evidence and no-label-image boundary.
5. Read full EN/ZH corrected copies for terminology, naturalness and equal claim strength; no workflow prose in article body, no duplicate health/supplier disclaimer tail.
6. Run strict evidence-backed citation validation, read-only artifact hash checks and exact numerical/source assertions. See `verification.json` for actual results and `verify.py` to reproduce integrity checks.

The citation CLI's English sentence-provenance statistic is low because citations terminate multi-sentence study paragraphs; its Chinese word segmentation is not a meaningful quality score. No coverage threshold is claimed. Semantic acceptance rests on the explicit claim ledger and original source review, not merely on a green citation command.

## Source and access boundaries

The reviewer independently inspected the parent's archived original XML, not a fresh network retrieval. S1–S3 constitute all load-bearing study sources. The discovery package's flaxseed candidate and general psyllium review were not used to support the article and are outside this claim review. Retail evidence was collected by the parent in the real browser and independently read here; no duplicate BrowserMan collection was attempted. The material mismatch remains a captured-record observation, not a diagnosis of brand error or extraction cause. No label images, batch samples, measured mesh specifications or certificates were examined. No network/tool failure blocked the assigned review.

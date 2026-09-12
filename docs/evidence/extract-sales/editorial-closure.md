# PR27 editorial closure

2026-09-12. Base review head: `a27de3765b243dbe038d89551fec90ed104acc0e`. Branch: `feat/eleven-extract-procurement`. PR27 remains OPEN; no merge or production release authorized by this work.

## Blocker-to-change ledger

All record locations below are `src/data/extract-sales.ts` keyed by ingredient ID and field; the shared renderer is `src/components/ExtractSales.astro`. The former single-line data is now readable multiline typed data.

| Review item | Exact implemented location / change | Verification |
|---|---|---|
| A shared 1: generic benefits; all three product benefit sets | Required four-element bilingual `benefits` tuple on all eleven records; shared benefit titles render per-record bodies. A's green-tea, Centella and monk-fruit four bodies adopted verbatim. C's grape/goji/licorice bodies adopted, five other records have material-specific bodies. | Editorial test 1: 44 distinct benefit paragraphs per language on 22 actual pages; independent review PASS. |
| A shared 2 / D C1: tutorial forms introduction | `#material-selection` uses A's exact quotation-range introduction, equivalent to D's alternative, with one available-grade/concentration/sample qualification. | Editorial test 2 rejects old instructions/internal literature rule. |
| A shared 3: repeated technical dossier | `reading` records contain five concise, distinct explanations; `#processing-dossier` has compact links to components, formulations, standards and processes. Five meaningful legacy section IDs retained, no repeated assay/application/quality paragraphs. The specification assay now appears once in its table. | Editorial test 3 checks substantive short paragraphs, nonduplication and exact localized same-ingredient targets; 44 actual standards round trips. |
| A shared terms / D C3 | `#supply-terms` uses D's written-quotation sentence; rhetorical stock/fixed-day ending deleted in both languages. | Editorial test 2; independent review. |
| A green-tea hero / assay / FAQ | `green-tea.offer` exact replacement, assay states dry/as-supplied basis, FAQ exact supplier-led replacement after No/不是. | Editorial test 2; source/dist independent comparison. |
| A Centella hero / supplied-liquid assay | `centella-asiatica.offer` exact replacement; assay separately reports native-extract solids and each marker in supplied liquid, not dry-extract assay as liquid assay. Clinical-equivalence and oral-suitability boundaries retained. | Editorial test 2; independent bilingual review. |
| A monk-fruit hero / tabletop / sugar structure | `monk-fruit.offer` exact replacement; form use is 餐桌用甜味剂; application uses sucrose sweetness vs solids/structure wording in EN/ZH. | Editorial test 2; independent review. |
| B ginseng optional offer and assay | Supplier-led second offer sentence adopted; assay names individual ginsenosides and their sum, agreed chromatography such as HPLC, plant part, processing history and dry/as-is basis; colour assay separate. | Editorial test 2; independent review. |
| B reishi optional offer, assay and citation | Exact offer adopted; assay names agreed mushroom-method version, alpha-glucan/starch controls, reporting basis and separate triterpenoids. `sources:[15,23,28]` exposes existing local method source 23. | Build source namespace validator; editorial test 2; independent review. |
| B ginkgo optional offer / 24/6 explanation | Capsule/tablet offer with material/market qualification adopted; supplier-led quotation second sentence. 24/6 identified as flavonoid-glycoside/terpene-lactone group targets, methods/basis/ginkgolic-acid limit separate; quote and nonclinical-equivalence scope retained. | Editorial test 2; independent review. B found no blockers; explicit 24%/6% expansion remains optional and was not imported as a ZL assay. |
| B shared bilingual precision | Hero says 稳定品质承诺, matching EN commitment scope. | Independent review. |
| D S1 | `stevia.offer` exact product-led replacement, intended formats and composition/route/carrier quotation basis. | Editorial test 2; independent review. |
| D S2 | `stevia.forms[1].form`: Reb D / Reb M glycoside options / 糖苷选项; production route and proportions preserved. | Editorial test 2; independent review. |
| D S3 | `stevia.assay` exact HPLC/composition/basis/blend replacement; reading standards explicitly include constituents beyond A/D/M. | Editorial test 2; independent review. |
| D S4 | `stevia.application`: body and dissolved solids / 口感厚度与可溶性固形物. | Independent source/dist review. |
| D R1 | `resveratrol.offer` exact capsule/topical, trans/source/impurity and powder/carrier replacement. | Editorial test 2; independent review. |
| D R2 | `resveratrol.forms[1]`: knotweed-derived extract option, botanical ingredient formulas; `[2]`: carrier-based formulation option. Polydatin and source impurities unchanged. | Editorial test 2; independent review. |
| D R3 | `resveratrol.identity` source-neutral exact replacement; assay exact HPLC cis/related-substance and dry/as-is replacement, separate polydatin reporting. | Editorial test 2; independent review. |
| D C2 | Specification identity row now states ingredient composition, source route, carriers and relevant processing aids, not generic native extract for every molecule. | Independent source/dist review. |
| D C4 | Stevia/resveratrol legacy modules use Processing routes / 生产路线 and Processing equipment / 加工设备. Exact route-aware process sentences adopted; short equipment-specific explanations. Single scope note preserves no-equipment-ownership boundary. | Editorial test 3; independent review; real science journeys. |

## C preservation and claim scope

Grape OPC polymerization/method/reference-standard non-equivalence, goji free-sugar correction/carriers vs fractions, and licorice acid/salt/glabridin/DGL distinctions remain. DGL nonzero residue and blood-pressure/potassium/drug risks, cosmetic precipitation and no blanket safety guarantee remain visible. Editorial test 4 explicitly protects these EN/ZH boundaries (added in parallel with the independent review, satisfying its first suggestion). Grape/goji leads are supplier-led without changing their assay or safety records. No assay percentages, certificate IDs, inventory, fixed lead times or efficacy promises added.

## Actual execution and preservation

- Final `npm test`: **156 passed, 0 failed, 0 skipped**; fresh **200 HTML pages**. Narrow imported sales TypeScript graph: **0 diagnostics**.
- Three vertical red/green runs recorded before implementation: duplicate benefits; missing supplier-led/assay replacements; duplicated technical paragraphs. Fourth test protects existing C invariants.
- Existing encyclopedia test initially rejected short Chinese summaries by aggregate character count. Changed it to require actual explanatory paragraph content and exact same-ingredient link, rather than heading/link padding; new editorial tests additionally require nonduplication and bounded length. No scientific prose padded to meet arbitrary English length.
- Preview process inspected at `http://127.0.0.1:4321`; HTTP200 and current stevia HPLC wording verified. Browser suites ran serially after build, not against a concurrently rebuilding dist.
- **88/88 browser cases**, **176 quote/sample editable journeys**, **0 POST**, **0 uncaught page errors**; EN/ZH, 390/1440, JS on/off. All original hero and application images decoded and all linked ingredient fragments checked.
- **44/44 real science round trips**, **44/44 keyboard table checks**, **0 POST**. Research-local copy of the read original journey script redirects its output to closure QA and adds POST-abort/count; repository script unchanged.
- **124/124 public files byte-identical** to PR26 baseline fa9dd234; **24/24 existing science data files unchanged**; all product Markdown and Turmeric-prefixed components unchanged. No scientific renderer, quote form or turmeric page code changed in this closure. Existing turmeric tests pass.
- Actual inspection of fresh 22-mobile/22-desktop hero contact sheets: no obvious overlap, clipped heading or missing art. Apparent Chinese ginkgo button clipping in reduced contact sheet disproved by full-resolution screenshot: all corners, margins and label intact. Browser measurements and image decoding supplement visual inspection. No claim of a fresh exhaustive 33-panel artistic audit.
- `git diff --check` clean; added-line security scan found no concerns.

## Independent review and final gate

Fresh independent Hermes process (session `20260912_151938_daa974`) read all A/B/C/D reports, actual diff, source and 22 generated pages. Verdict **PASS**, empty security/logic/editorial blocker arrays. It independently checked 110 meaningful dimension IDs, all same-ingredient targets and 66 application links. It did not rerun build/browser suites; those were executed by the sole writer above.

Nonblocking suggestions: explicitly expand optional ginkgo 24/6 percentages; future polish of older comparison/project labels; optionally name susceptible heart/kidney populations alongside retained licorice risks; use a DOM parser for more robust tests. C regression suggestion is now implemented. None requires inventing a new commercial specification.

Gate: **editorial and technical closure PASS; parent final exact-SHA release review remains required. DO NOT MERGE.** No production verification, form submission/receipt, actual batch assay or certificate verification claimed.

Own QA outputs: `/data/hermes/research/pr27-closure/` (`npm-test-final.log`, `typecheck.log`, `browser.log`, `browser/summary.json`, `science.log`, `journeys.json`, `preservation.json`, `security-scan.json`, `independent-review.json`, red logs and visual contact sheets). Prior review files were not overwritten. A/B/D source reports are copied with trailing-whitespace normalization under `docs/evidence/extract-sales/editorial-review-{a,b,d}.md`.

Implementation notes: an early build caught a truncated tool-display line during component transformation; the complete original git blob was used and all subsequent builds passed. Imported report excerpts contained four trailing spaces; repository copies normalize trailing whitespace while external originals remain unchanged.

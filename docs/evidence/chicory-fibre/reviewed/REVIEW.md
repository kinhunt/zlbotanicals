# Independent chicory-fibre review

## Verdict

**PASS — factual and EN/ZH editorial review of the reviewed copies; publication acceptance remains CONDITIONAL on rendered desktop/mobile screenshots and integration checks.** No substantive evidence gap blocks the retained claims. This is not a deployment, visual-accessibility or finished-food validation pass.

Reviewed files: `chicory-fibre-selection.en.md` and `chicory-fibre-selection.zh.md`. Exact SHA-256 values are in `verification.json` and `SHA256SUMS.json`. Originals and website files were not changed. All output is confined to this reviewed directory.

## Findings and bounded corrections

- The core distinction is supported: dispersibility, solubility and texture development are different selection criteria. BENEO's actual HP/HPX descriptions retain low/high processing-temperature distinctions; no absolute temperature threshold was invented.
- The long-chain inulin study supports the qualitative warmer-preparation/softer-developed-gel observation in its own system. The reviewed copy explicitly defines 20% as inulin dry matter divided by total suspension mass. Average DP 23, preparation at 25/40/60°C and texture after 24 hours are supported by methods §§2.1–2.2.4. No figure values, effect sizes or transferable rpm recommendations were created.
- The four COSUCRA composition values are correct and retain separate denominators: XL approximately 99.5% inulin on dry matter versus 94.5% dietary fibre as supplied; LCF approximately 90% oligofructose on dry matter versus 65.5% dietary fibre as supplied. DP≥3 belongs to the manufacturer's fibre definition. Explicit mass bases and decimal inputs 0.945/0.655 now make the quotation formula usable without confusing dry-basis content with delivered fibre.
- FOS evidence remains abstract-only, explicitly called an abstract in both languages. pH 3.5 and the three matrices are supported. The copy does not import the abstract's retention figures, apply short-chain findings quantitatively to long-chain inulin, or claim a universal thermal limit.
- FDA wording accurately describes proposed additions and enforcement discretion in the archived official Q&A. It is not converted into a product approval or worldwide claim permission.
- Removed draft/intent labels, retrieval diary prose, redundant concluding recap and repeated defensive lists. Retained narrow material-specific limitations. Added contextual links to manufacturer descriptions, both papers and FDA without changing citation identities.
- Chinese now defines the reduced-fat food context as lowering the food's fat content in the opening, rather than implying a weight-loss benefit. Replaced awkward phrases including “低稠感”, “水分收支” and “工艺后的实际交付”; clarified the sample enquiry and process record wording.
- Sourcing language follows owner-confirmed broad botanical sourcing scope while keeping named-brand availability separate. No distribution rights, stock, certificates or batch performance are asserted.

Examples with exact original and replacement text are preserved in `changes.en.diff` and `changes.zh.diff`.

## Exhibit-by-exhibit verdict

There is **one five-row, three-column qualitative comparison table per language**; these are localized versions of the same exhibit. There are no quantitative charts, market shares, price observations or performance rankings.

| Exhibit/row | Type and source | Value/denominator/comparison check | Verdict |
|---|---|---|---|
| ST-Gel | Qualitative manufacturer descriptor, source 1 | High dispersibility/instant, not demonstrated final clarity; no numeric denominator | KEEP; contextual manufacturer link added |
| HSI | Qualitative manufacturer descriptor, source 1 | Highly soluble; does not guarantee permanent clarity; no numeric denominator | KEEP |
| HP and HPX | Paired qualitative grade descriptions, source 1 | HP low versus HPX high processing temperatures; not equivalent grades or an absolute temperature ranking | KEEP |
| XL | Qualitative manufacturer descriptor, source 7 | Longer-chain texturizing/fat-mimetic positioning in higher-moisture systems, not independently measured superiority | KEEP; contextual manufacturer link added |
| LCF | Qualitative manufacturer descriptor, source 7 | Liquid oligofructose/binding/low-moisture positioning; supplied water/solids prevent a simple powder-for-liquid weight comparison | KEEP |
| Whole matrix | Product-description and application-check matrix | Last column is editorial guidance, not supplier test output. Unequal functional jobs are deliberately compared by suitability, not scored. Five rows contain six named grades because HP/HPX share a row; not a representative market sample. | ADJUST caption/header, then KEEP as a table; do not convert to bars, radar or ranking |
| Composition paragraph | Attributed mass percentages, source 7 | 99.5% and 90% have dry-matter denominators; 94.5% and 65.5% have supplied-material denominators. These are not additive, not a common purity ranking, and do not imply a water-content calculation. | ADJUST explicit bases; KEEP as prose |
| Incoming-fibre formula | Editorial dimensional calculation | Currency/kg supplied material divided by kg fibre/kg supplied material gives currency/kg incoming fibre. Decimal examples match supplied values. No actual prices or comparative cost winner supplied. | KEEP; decimal clarification added |
| Study conditions | Scoped research description, source 8 | 20 g inulin dry matter per 100 g total suspension; temperatures in °C, DP dimensionless, 24 h holding time. Not inclusion advice or a quantitative performance plot. | KEEP; denominator clarified |

## Existing-content distinction and PR56 baseline

Inspected both complete vanilla-authentication language files. Local HEAD is `a878eb4f0ce689bb8f220397e801b546e3d92e34`; the locally available PR56 merge is `6a15ea935c4aad848f62dc512ffc5d0c2e843d1b`. `git diff PR56 HEAD -- src` returned empty, establishing source-content parity despite different commit IDs. This is stronger than assuming the worktree itself is the merge revision; it is not a fresh live-production check.

A read-only search of tracked PR56 source text found no inulin/chicory/菊粉/菊苣 coverage. The new article addresses fibre grade selection, process-dependent texture and supplied-fibre cost. PR56 addresses vanilla analytical authentication and origin-inference limits. Shared insistence on correct denominators is an editorial principle, not duplicated subject matter. A distinct populated research article is justified; no existing article needs replacement or URL migration. English/Chinese food and request-quote route source files exist locally.

Retained outline: food-task opening → material/source terminology → manufacturer comparison → scoped gel study → four application comparisons → supplied-fibre cost and US labelling → example enquiry and localized sourcing links.

## Evidence integrity and limitations

Read the complete article bodies, original task ledger, evidence map, retrieval manifest, discovery rationale, and claim-bearing manufacturer, FDA, gel-study and FOS-abstract captures. Checked Crossref identity for the gel paper. The gel extraction preserves methods/results/summary but not original figures/layout and has extraction gaps in mathematical prose. Its internally awkward above-60°C dissolution wording is excluded. This capture should not be called a fully preserved publisher article. All retained claims have intact relevant passages.

Independent literal checks matched all 14 quotes in the original ledger, including discovery-only sources, to their archived texts. All 17 recorded retrieval-manifest hashes matched. The reviewed article-local ledger keeps original IDs 1, 2, 3, 7, 8 and 9; omitted IDs 4–6 were discovery-only and are preserved unchanged in the original package. No new research source or evidence quotation was invented.

Citation verification with `--evidence` returns exit 0 for both files. English emits a warning about more than three citations in a sentence: the checker aggregates the three sentences in the “Chicory describes the source” opening paragraph because citations follow sentence-ending punctuation. The actual sentences carry one, one and two citations respectively; no prose sentence has more than three. The earlier strict run also flagged unused discovery IDs, resolved by the local ledger subset. Do not describe this as an unqualified strict-verifier pass. Chinese sentence coverage statistics are unsuitable as a quality metric because this checker is not a Chinese sentence segmenter. Manual sentence/row support review, not that percentage, establishes the content verdict.

## Required rendering gate

Before publication, integrate article-specific clickable numbered references without changing IDs or destinations; localize the Chinese reference heading and readable reference titles, and add normal site metadata. The provided Markdown retains the verified source list for integration rather than pretending to be the site's frontmatter-complete page.

Inspect actual EN and ZH desktop/mobile screenshots. Check the entire five-row matrix: readable headings, product identity visible with the rightmost column, keyboard-accessible horizontal scrolling if needed, no clipped text and clear links. Check the percentage bases, 0.945/0.655 decimal example, 20% total-suspension denominator, °C/pH/DP tokens and formula at native mobile size. Verify reference navigation and localized food/quote destinations. Screenshots and browser interactions were deliberately not performed in this review; publication readiness remains conditional on this gate.

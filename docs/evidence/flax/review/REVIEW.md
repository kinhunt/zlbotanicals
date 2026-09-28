# Flax EN/ZH independent review — PASS after finite corrections

## Exact reviewed artifacts

- `draft.en.md` SHA-256 `a3d1045df96e224157fcfec314639fe2c25287eaed1d6397cbe42a33a3b76a36`
- `draft.zh.md` SHA-256 `50d99b84892d9a44004854badc1f16cc716a63fbb27ba5d38e6e824df12aa789`

PASS is scientific/source and natural-language editorial acceptance for these exact corrected copies. It is not acceptance of the discovery originals, food-product safety approval, current-law certification, site integration, or publication approval. No outstanding content blockers remain for this bounded material-selection article.

Executed `python verify.py`: **58 checks PASS, zero failures**, exit 0. Full output, citation verifier messages and exact draft binding are in `verification.json`.

## Defects corrected

1. **EFSA threshold was materially misstated in both originals.** Section 3.3.2 prose says “below 11” after treatment, but original Table 1 cells give batches 1/2/4/5 as `<10` and batch 3 as **11 mg/kg**, not `<11`. Both copies now give the individual pattern and explicitly retain the text–table disagreement. The five mixtures and the separate 178-sample series (mean 12, maximum 32 mg/kg) remain distinct. The discovery verifier never checked this table; an evidence quote reproducing the paper's prose did not validate the inequality.
2. **English implied 31.5 mg/kg was the lowest extrusion value.** Original Table 1 also has **26.4 ± 0.3 mg/kg** for the separate 10% feed-moisture row. Both copies now disclose that row without combining settings into a new process or manufacturing recipe. Oil yield is explicitly tied back to 140 °C to avoid an ambiguous antecedent.
3. **Presentation cleanup.** Removed “individual cells/逐格读取” audit narration from reader-facing prose, clarified that extraction ranges are ranges of reported means, and removed the closing internal-sounding no-stock/no-qualification disclaimer. The closing supplier questions and substantive safety boundaries remain.

## Independent source findings

Read archived original bytes: extrusion, fermentation, extraction and EFSA XML; BfR HTML. Generated fresh paragraph and cell parses in this directory, rather than relying on the discovery text extracts, flattened table strings or passed checks. All five original byte hashes match the discovery manifest; `source-manifest.json` records the five cited sources and their URLs/hashes. The two uncited discovery background papers are not factual support for this approval and were not imported.

- **Extrusion:** Chandni, industrial single-screw extruder, one factor varied with others at mean settings; alkaline titration, not a chromatographic glycoside panel. Untreated 198.4 ± 0.6 and temperature-row 31.5 ± 0.6 mg/kg support rounded 84%. Oil figures 32.2 ± 0.4 and 29.8 ± 0.2 g/100 g match original text/cells. Fatty acids are % total fatty acids. Polypropylene, 20–25 °C, uncontrolled light and 90-day sensory decline support the bounded storage passage, not commercial shelf life.
- **Extraction:** hexane-defatted meals; aqueous versus 60% aqueous ethanol; freeze-dried outputs. Table 4 total-glycoside means are [11.09, 11.59, 9.11], [0.60, 0.62, 0.56], [89.83, 79.23, 71.25] μmol/g. Corresponding HCN-equivalent means are [300, 313, 246], [16, 17, 15], [2428, 2141, 1926] mg/kg. Multiplication by approximately 27.03 agrees within rounding, but this is calculated potential, not free-HCN measurement. The abstract really prints mmol/g; retain the conflict rather than changing source units. The table's parenthesized individual-glycoside masses are mg/100 g, not mg/kg and not HCN equivalents. Recovery percentages 69.8/66.4/69.8 refer to starting-meal glycosides; they coexist with extract enrichment. Tables 1/2 support the qualitative phenolic/assay comparison, not human efficacy.
- **Fermentation:** Table 2 has two distinct ND(<500 mg/kg) glycoside results and a separate <10 mg/kg total-HCN result. Methods detail NMR and an internal standard for glycosides but do not supply an equally explicit independent HCN method. The two ND limits cannot establish the separate HCN threshold or zero glycosides. Preparation includes fermentation, gum/hull removal and drying; not kimchi alone. One-kilogram scale, seasoning denominator and abstract eight weeks versus body six weeks are retained. No imported Japanese/international approval or complete-removal claim.
- **EFSA:** methods hydrolyse glycosides and distil/titrate released HCN. The paired samples are 50–70% linseed with wheat bran and sunflower cake, not pure meal. The opinion concerns animal feed, excludes linseed cake, calls for finished-product analysis, and addresses atmospheric emissions. It cannot authorize human food or establish home detoxification.
- **BfR:** original page gives 16/06/2026, cooking/baking-related risk reduction by HCN evaporation and enzyme inactivation, and separate cadmium concerns. Drafts do not generalize enzyme inactivation to complete chemical destruction of glycosides or provide a universal safe dose.

Additional original inconsistencies are not silently repaired or promoted: extraction body calls Szafir the highest starting TCG, whereas Table 4 has Oliwin 11.59 > Szafir 11.09; its SDG body range omits Oliwin's 77.96 mg/g table value. Neither claim appears in the drafts. Minor discrepancies between rounded individual compounds and printed totals are retained as author-reported totals, not recomputed away. Fermentation's grinding descriptions and inferred antioxidant mechanisms are not used as a reproducible recipe or efficacy proof.

## Every draft table: presentation decision

There is **one table per language**, five Markdown lines including header/separator, with the same three material rows. Retain it: the shared concentration denominators make the contrast between starting meal, aqueous extract and ethanolic extract easier to compare than six numerical ranges embedded in prose. Each column names its own unit and material basis. Ranges are explicitly reported means across three varieties, not commercial limits, confidence intervals, processing guarantees or uncertainty bounds. Full mean ± SD cells remain in `independent-evidence.json`; no significance ranking is inferred from the compressed display.

Do not add technology rankings, fermentation ND-to-zero conversion tables, or food-versus-feed limit tables. Extrusion trade-offs, fermentation limitations and the EFSA contradiction are more intelligible in their existing short prose passages. Both complete language copies were read for meaning and naturalness, not approved merely through numeric parity. Technical terms, useful sourcing questions and the material-selection focus are aligned.

## Evidence and verification deliverables

- `sources/`: five original XML/HTML files, unchanged bytes.
- `*.independent.txt`: newly extracted methods/body/table-cell reading aids.
- `independent-evidence.json`: 26 original paragraph/table/HTML evidence records, checked against original bytes.
- `ledger.json`: original citation IDs preserved; original EFSA table added as evidence. No new IDs allocated into the existing namespace.
- `verify.py`: independently written runnable source/cell/inequality/unit/arithmetic/citation/bilingual structure verifier.
- `verification.json`: actual 58-check output, exact corrected draft hashes.
- `SHA256SUMS.json`: final package hashes.

Reusable lesson recorded locally under the exclusive-directory instruction: validate inequalities against each original cell even in official assessments; the prose may itself say “below” where one measured cell equals the boundary. Verify global minimum language against all process-factor rows, and do not mix concentration, recovery and HCN-equivalent denominators. No shared skill, repository, browser or publication operations were performed.

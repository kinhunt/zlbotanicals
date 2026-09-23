# Cocoa EN/ZH independent content review — PASS

Reviewed 2026-09-23. **PASS for the two exact revised Markdown drafts below**, including factual and bilingual editorial review. This is not publication, website-rendering, product qualification, regulatory clearance or current-stock approval. No original discovery file or website file was modified.

## Approved artifacts (SHA-256)

- `draft-en.md`: `d501e2cc12cfa1e56052b544b021c01b025f017fd0b06e9c90b49feeace3d751`
- `draft-zh.md`: `9919d19e5100e38c80b24f882c1a0694523c516150e69febc53e5e8a2848d755`

## Independent source findings

I read both complete original articles and the archived primary-source text, not just the author's claim ledger. I rendered and visually inspected the D-11-A technical and nutrition pages and all three FSAI pages. Images are retained under `visual/`; original PDFs and relevant archived source text are copied unchanged under `evidence/`.

1. D-11-A fat **10.0–12.0%**, pH **7.0–7.4 in 10% solution**, and **99.5% minimum through 75 µm** are correctly aligned on the actual table. Water suspension is the fineness method, not a separately established pH solvent. TDS is dated **1 January 2024**, nutrition sheet **1 January 2025**. Nutrition uses decimal commas: **26.5 g insoluble fibre, 2.1 g theobromine, 0.2 g caffeine per 100 g**. These are indicative values, not lot results. No certification or allergen assertion was imported.
2. S8 archived supplier product section gives **10–12% fat, pH 7.9–8.3, Red**. Its nearby categorical “Highly Dutched (>8)” does not justify replacing the actual numeric range with >8. The captured product section does not specify pH sample preparation. No price, shipping promise or stock text is used.
3. Acticoa is the named **100-F017906-AC-722** powder. The successful archived extraction explicitly states preserved cocoa flavanols, slightly bitter flavour, light brown colour and **6.8–7.5 (Light alkalized)**. Its ambiguous “Fineness 1” is not converted into units. No numerical flavanol minimum is disclosed there. Raw direct HTTP was 403; the usable source is `acticoa-extracted.txt`, not `acticoa.html` or its failed raw response. This review did not claim a new live fetch.
4. FSAI is **August 2015**, not 1 August: the leading 1/2/3 in text extraction are page numbers, verified visually. It compares this Mars extract with Mars' own defatted natural cocoa powder. Aqueous-acetone extraction, maximum 1% silicon dioxide as processing aid, higher relative caffeine/theobromine/flavanols and slightly lower matrix components are supported. This is not a generic extract recipe. The actual conclusion is substantial equivalence **under proposed uses and use levels**. No current authorization or health benefit follows from it.
5. Miller et al. (2008), DOI **10.1021/jf801670p**, is supported by the archived Europe PMC abstract and metadata, not by unavailable full methods. All four means and ± values match. The abstract does not identify the ± statistic; the article does not label it SD/SE/CI. Its light/medium/heavy pH boundaries differ from the Acticoa supplier label: this crucial comparison is now explicit. Survey associations are not current SKU guarantees or clinical evidence.

## Finite fixes applied

| Issue in original | Exact example / diagnosis | Revised treatment |
|---|---|---|
| Cross-source alkalization classification | “The current Acticoa SKU description … a light-alkalized pH category.” Omitted differing category boundaries. | Scoped to archived SKU; added Miller 6.50–7.20 / 7.21–7.60 / ≥7.61 ranges and prohibited transferring group averages to Acticoa. |
| Incomplete historical use context | “proposed serving of up to 730 mg extract providing 375 mg cocoa flavanols.” | Retained paired amounts; added historical 1.2 g/day extract proposal and advice to avoid >600 mg/day flavanols, attributed to applicant, not general intake guidance. |
| Ratio could look like analytical specification | “imply about 51.4% flavanols” | Explicitly calculation from serving quantities, not a batch assay. No false precision or current 10:1 specification. |
| Source comparison overreach | Chinese “色泽与pH仍不同” could imply a documented D-11-A colour contrast. | S8 is a red-colour alternative with higher listed pH; no unsupported numerical colour comparison. Added pH-method comparability note. |
| Opaque drink endpoint mismatch | “Neither an extract name nor a small bench sample establishes shelf-stable clarity.” | Replaced with uniform suspension, acceptable sediment and shelf-life stability; clarity is not the target for this opaque drink. |
| Unnatural or ambiguous Chinese | “原料质量” meant mass but could mean quality; “定量提取物”, “提取物含量更高”, “受控的一部分液体”. | Replaced with 装量, 黄烷醇含量经检测的提取物, 黄烷醇浓度更高, 定量液体. Completed reader-facing sentences throughout. |
| Dates and conclusion scope | Broad 2024/2025 dates; FSAI conclusion mostly described negatively. | Exact document dates; explicit affirmative, narrowly scoped equivalence conclusion. |
| Reader links and evidence exports | Named supplier URLs appeared only in bibliography; imported quotes included long boilerplate. | Contextual links on all three named supplier examples; stable IDs 1–5 retained, concise complete literal support passages stored locally. |

## Editorial verdict

**English PASS:** coherent argument from material choice → substitution → alkalization/assay distinction → methylxanthine exposure → drink/supplement pilots → accepted-formulation cost. Four real examples support three practical buying categories. Recommendations remain identified as development proposals, not supplier-tested recipes.

**Chinese PASS:** complete natural article rather than citation-only approval or literal word substitution. Reader intent, useful specifications, numerical interpretation and application decisions match the English. The clarified 装量/含量 wording removes a meaningful ambiguity. Remaining scope notes are bounded and do not replace the buyer argument.

**Health/commercial PASS:** neither language claims disease prevention, blood-flow efficacy, a clinical dose, decaffeination, guaranteed dissolution, current ZL supply, certificates, stock, factory ownership or validated end-product stability. The Acticoa source's blood-vessel marketing statement is deliberately not republished as verified health evidence. Broad sourcing capability is not converted into a claim that ZL supplies these named third-party SKUs.

## Verification and remaining limits

`python verify.py` returned exit 0: citations OK for both languages with strict/evidence gates; five distinct IDs, all with complete literal quotes matching copied archives; three supplier links retained; all discovery files unchanged; calculations 105 mg theobromine, 10 mg caffeine, 51.4% ratio passed. Automated sentence coverage is not editorial approval: the tool reports EN 22% and ZH 100% because its word-based sentence counter handles Chinese differently. Factual/table support was checked manually; recommendations and arithmetic are not disguised as externally validated findings.

Remaining limits are disclosed, not blockers for this historical educational comparison: Miller full methods not read; live supplier availability and current regulatory status not established; website rendering and inquiry/backend behaviour not tested. No publication performed. `revise.py` records the initial revision pass; later finite patches are reflected in the approved hashes above. Do not rerun that mutating script to validate approval—use the read-only `verify.py`.

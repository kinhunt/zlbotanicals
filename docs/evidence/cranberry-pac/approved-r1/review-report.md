# Independent review of the original cranberry package; proposed revision R1

## Verdict and ownership

**Original drafts: revise, not accept unchanged.** The central procurement argument and selected Table 2 calculations are sound. Required corrections concern the one-laboratory insoluble-PAC result, the 2020 replication/calibration basis, misleading percentage terminology, and identity-method scope. Repetitive caveats and research-diary language weaken both versions, especially Chinese.

**R1 drafts in this directory: substantial reviewer-authored rewrites, self-checked but NOT independently accepted.** My independence applies to review of the original author’s package. Having rewritten the articles, I cannot supply independent acceptance of my own new text. A different reviewer must approve the bounded changes below against the final hashes. No website edits, commits, publication or BrowserMan use occurred.

## Evidence actually inspected

Read both complete original drafts and the five archived source texts; inspected original HTML/JSON/XML, the original claim map, retrieval manifest, decision and calculations. Parsed all 24 Table 2 rows directly from original XML rather than trusting the previous derived JSON. Copied all five raw/text source pairs byte-for-byte here; original files remain untouched. Primary papers 3 (vanilla) and 5 (inulin) concern rejected discovery candidates and do not support cranberry claims.[3][5]

Fresh retrievals: Europe PMC’s indexed 2026 article record, Crossref’s 2026 and validation-study records, and the publisher’s Elsevier API metadata. Full 2026 journal text was **not** obtained. Publisher HTML returned 403; the Elsevier API returned HTTP 200 but only 471 characters of flattened core metadata, not a methods/results body. The first publisher URL attempt used an incorrect guessed PII; it is retained in the manifest as a failed attempt, not evidence. Correct PII S0022316626002312 came from Crossref. Failed URLs are registered only for provenance, never cited as factual evidence.

This review did not retrieve new supplements or interpret supplementary chromatogram images. The 2020 full paper’s text, table XML and figure captions were sufficient for the narrowed purchasing claims; this is not an independent laboratory authentication of its products.

## 1. Chronology verified, not inferred from the page clock

- USDA records acceptance **May 4, 2026** and publication **May 6, 2026**; its archived “Last Modified 09/21/2026” is a page date, not publication.[1]
- Europe PMC independently indexes the same DOI and title, with `electronicPublicationDate` and `firstPublicationDate` **2026-05-06**, and a **July 2026** issue, volume 156, issue 7, article 101582.[6]
- Crossref confirms volume 156(7), article 101582 and July 2026 print publication; its May 6 DOI creation timestamp is consistent with, but not by itself proof of, first publication.[7]
- The publisher API metadata gives July 31 as a cover date; that does not displace the verified May 6 online date. R1 says “published online in May 2026,” not “new this September.”
- The 2020 QC paper’s XML publication date is **April 3, 2020**.[2]
- The validation paper is not to be dated from the “2019.06” method identifier: Crossref records online publication **June 24, 2020** and print **March 5, 2021**, whereas Europe PMC presents the 2021 issue.[4][11] R1 deliberately avoids choosing a misleading single publication year or claiming current AOAC status.

These metadata providers corroborate bibliographic dates, not independently replicated scientific results.

## 2. Laboratory and sample bases

| Claim | Checked evidence | Editorial decision |
|---|---|---|
| 53 products, four commercial labs | USDA Methods; indexed abstract agrees | Retain, explicitly finished US supplements, not 53 raw materials or batches |
| Standards | A2 in four labs; cranberry PAC standard in two, explicitly given by USDA | Retain; do not multiply to six labs or imply all labs used both |
| Extraction | Harmonized extraction solvents, laboratory-specific DMAC workflows | Retain; do not say a single standardized complete method |
| Insoluble PAC | Butanol–hydrochloric acid, **one lab** | Add omitted boundary adjacent to finding, not buried at the end |
| Material-group comparison | Extract mean 18.4 mg/day (95% CI 3.94–32.8); concentrate 3.87 (2.41–5.34), p=.032; whole-fruit powder 6.01 (.93–11.1), p=.082 | Keep direction and significance, not numerical clutter; explicitly daily finished-product intake, not equal-weight ingredient comparison |
| Interlab RSD | 22.1–31.6%, for in-house controls and products **>3.3 mg/day** in Results | Retain exact subgroup; not all products, within-lab CV or acceptable contract tolerance |
| Label comparison | Mean ± SD −32 ± 51.4%, **n=14** | Retain, attributed to USDA record; not 53-product mean, confidence interval, degradation rate or individual loss |
| 36 mg/day | 3/53 at or above comparison value, also 13/16 extract products below it | Verified but remove from article: adds a clinical-dose detour without improving the purchasing task |
| Disintegration | USDA says 77.8% passed but abstract does not clearly give denominator | Exclude; no inference about absorption or bodily release |

All quantitative study details in this table derive from the institutional technical abstract, not unseen full-text methods.[1] The indexed journal abstract confirms core design/results but omits several detailed figures present on USDA; this is not a numerical contradiction.[6]

The accessible abstracts do not establish acquisition dates, independent lots, the complete missing-result structure, per-lab inclusion in every statistic, or the −32% aggregation formula. R1 neither invents these details nor reverse-engineers raw results.

## 3. Independent Table 2 calculation and statistical terminology

Parsed all 24 data rows from `source-2.raw`, Table 2. There are **16 numerical PAC declarations, eight without a declaration, and nine BL-DMAC method labels in the table**.[2] All 16 published percentage values reproduce `measured mean / declared × 100`, rounded to two decimals. Missing declarations were not converted to zero. Full results are in `table2-independent-recalculation.json`.

| Sample | Declared | Mean ± SD | Mean / declaration × 100 | Calculated shortfall % | SD / mean × 100 (approximate replicate CV %) |
|---|---:|---:|---:|---:|---:|
| 4 | 36 | 34.86 ± 1.73 | 96.83 | 3.17 | 4.96 |
| 6 | 36 | 4.91 ± 0.22 | 13.64 | 86.36 | 4.48 |
| 24 | 36 | 37.17 ± 1.53 | 103.25 | −3.25 | 4.12 |
| 9 | 45 | 37.89 ± 1.59 | 84.20 | 15.80 | 4.20 |

Inputs are mg per pharmaceutical form/dosage unit; calculations above use the published rounded values.[2] The original three selected ratios were correct. The problem is the source’s **header AND caption**: “%CV” is not conventional CV, and “percentage differences” is not what the numbers calculate. The old drafts corrected the header but did not fully expose the caption’s misleading terminology. R1 does both and adds one concrete conventional-CV comparison.

Table 2 says means of three replicates ± SD and external calibration with an **A-type PAC dimer**; Methods says extraction and quantification in triplicate.[2] R1 adds those facts without converting them into three lots or naming a standard more precisely than this paper establishes. “Real” in the original column becomes “Measured,” since an assay result is not a method-independent true content.

### Source-internal conflicts—not editorial errors to silently repair

1. Methods-labelled count: narrative list has eight (#4,5,6,8,9,10,19,24); table additionally labels #20, giving nine.[2]
2. #9: text says “85% lower”; table gives 37.89/45=84.20% of declaration, therefore 15.80% lower.[2]
3. Mass uniformity: abstract and conclusion say 17 did not comply, but Results and Table 1 show seven failures on Criteria 1/2 and 17 satisfying them.[2] Not used in either revised article.
4. Table 4’s “Correct Dosage” has five checkmarks (#3,4,5,19,24), while conclusion says six; Table 2’s 95–105% arithmetic gives those same five if applied across the 16 declarations.[2] This is not a basis for a regulatory compliance rate, especially where label assay methods are unspecified.
5. Daily 36 mg: narrative includes #20 in the qualifying list but Table 4 marks #20 as failing that column.[2] No reconstructed daily-dose pass rate used.
6. Identity-method scope: Methods mentions atypical profiles for additional UHPLC analysis, while Results says high-resolution UHPLC-MS was used for **all 24**.[2] R1 removes the old selective-only implication and simply states both analytical approaches.

The additional conflicts reinforce the decision to use individual table values as explicitly historical illustrations rather than quote global failure or counterfeit prevalence. They do not justify dismissing every measurement in the paper.

## 4. Sentence-level editorial disposition

`sentence-review.json` anchors every original body sentence to its exact original text, language and paragraph block, with the applied review disposition; original table rows and headers are separately preserved in the paragraph audit. This report uses original blank-line block numbers, not the parent’s paragraph-renderer numbering. Both language versions were reviewed in full.

| Original blocks (same EN/ZH structure) | Decision and reason |
|---|---|
| 2–4: opening, design, purpose | Replace rhetorical offer story with five concrete information requests. Add online timing and separate laboratory bases. Keep three-part procurement task. |
| 6–8: material categories | Retain sourced differences; replace broad “better composition” discussion with explicit material/manufacture/carrier questions. Remove “not a claim about stock” after a plainly advisory paragraph. |
| 10–13: methods | Preserve abstract-limited validation, name the repeatability/HorRat distinction, keep RSD subgroup and no-universal-conversion boundary. Replace repeated procedural cautions with a usable five-item agreement list. Move access notes to one evidence box. |
| 15–19: historical table | Keep correct numbers; add three-replicate and dimer calibration basis; explain header/caption/ratio/CV distinction. Replace “inconsistencies worth retaining” and “our reanalysis is not ecommerce sampling” diary language with direct source facts and one historical-sample boundary. |
| 21–23: identity | Correct selective-only UHPLC implication; keep material-appropriate interpretation and structural-evidence request. Delete repeated “this is only a proposed safeguard” sentence. |
| 25–27: price and sequence | Keep hypothetical 100 USD/kg, 10%, 1 USD/g. Display arithmetic and distinguish assay quantity from absorption once. Move per-day unit conversion next to Table 2. |
| 29: −32% | Preserve n=14 and SD 51.4%; integrate with finished-product verification, rather than end-of-article study recap. |
| 30: 3/53 at 36 mg/day | Remove factual but off-task clinical-threshold detour and its following disclaimer. No replacement dose advice. |
| 31: conclusion | End with an actionable sourcing brief and qualification sequence; remove inventory/certification/availability disclaimer pile-up. No stock or certification assertion added. |

Chinese specifically: replaced “有了具体的商业参照,” “对采购真正有用的,” “结论可以更收敛,” “不是我们新做的实验或电商抽样,” and repeatedly self-labelled “审慎建议” with direct procurement language. Kept targeted boundaries where they prevent real misunderstanding: fraction/lab basis, daily-unit basis, method tolerance, historical samples, hypothetical cost, and nonclinical scope. The EN/ZH versions share facts and structure but are not mechanically literal translations.

## 5. Bounded next gate—review R1, not the old draft

A different factual/language reviewer should inspect the exact hashed EN/ZH R1 files and accept or correct these changes:

1. May-online chronology and newly explicit one-lab insoluble-PAC sentence.
2. Daily-intake versus equal-weight-ingredient interpretation; no material superiority claim.
3. Table calibration/three replicates and the new 4.96% CV example, with Chinese “平行测定” meaning no independent batches.
4. Identity paragraph no longer implying MS was used only on atypical samples; process-appropriate advice remains advisory, not a newly validated identity test.
5. Removal of 36 mg/day detour and repeated disclaimers; no hidden clinical/regulatory claims introduced by compression.
6. Expanded procurement list and final EN/ZH naturalness, especially standard terminology and cost units.

No fresh discovery or full-topic rewrite is needed for this gate. Full 2026 text becomes necessary only if adding stronger sampling, method implementation, causal, dose or clinical statements. Current R1 is deliberately bounded to retrieved abstracts. Website dedup, locale routing, rendering, release tests and publication acceptance are outside this task and remain undone.

## Verification limits

Citation verification checks IDs, source URLs and attached verbatim evidence—not scientific truth, translation quality or independent acceptance. Per-sentence original audit is a review record, not an automated correctness score. All original source quotes were replayed against the actual archived text. Source IDs 3/5 remain only because the copied discovery ledger preserves its original mapping; failed retrieval IDs carry no claims. See `verification.json`, individual verifier outputs, `original-integrity.json` and `SHA256.json` for actual checks.

## Sources

[1] https://www.ars.usda.gov/research/publications/publication?seqNo115=431482 — USDA ARS 2026 multi-lab cranberry PAC study
[2] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC7230672/fullTextXML — 2020 cranberry supplement QC primary study
[3] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11858005/fullTextXML — 2025 vanilla authentic aroma and isotope primary study
[4] https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:33251544%20AND%20SRC:MED&format=json&resultType=core — Cranberry DMAC inter-laboratory validation: abstract
[5] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11049111/fullTextXML — Inulin analytical acid hydrolysis primary study
[6] https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1016/j.tjnut.2026.101582&format=json&resultType=core — 2026-europepmc
[7] https://api.crossref.org/works/10.1016/j.tjnut.2026.101582 — 2026-crossref
[11] https://api.crossref.org/works/10.1093/jaoacint/qsaa084 — validation-crossref

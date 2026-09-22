# FINAL independent editorial gate — cranberry R1 EN/ZH

**Verdict: ACCEPT R1 CONTENT. All six bounded changes pass. No factual or editorial blockers.**

This is independent acceptance of the two exact drafts identified below, not acceptance of the original pre-R1 draft, not rendered-page approval and not publication authorization. Neither draft was edited.

## Exact accepted artifacts

| File | SHA256 |
|---|---|
| `cranberry-pac-purchasing.en.md` | `c756c689068c80e1d3343fef800b6ecac74e4d9d6dae49ac8d3d620382c88ec5` |
| `cranberry-pac-purchasing.zh.md` | `1a0238378c1742c4bde92d90d0b8b3a165966c5d508e7eea332e6a581c952d4f` |

## What was actually verified

Read README, review-report and both complete drafts. Inspected `recheck.py` before executing it: it reads source files and prints results, with no writes. Re-ran it successfully (exit 0): 35 original files unchanged, 24 Table 2 rows, all 16 declared-content ratios correct, nine BL-DMAC table labels, sample #4 CV 4.96%, hypothetical cost USD 1/g. Checked all 40 entries in the supplied SHA256 manifest; all match.

Independent of that script, parsed original `source-2.raw` XML, read the relevant Methods/Results and Table 2 caption, recalculated every numeric ratio with Decimal, and compared the three exact data rows between languages. Also parsed original USDA HTML and Europe PMC JSON for dates, laboratory scope, results and validation abstract. These are archived original-source records, not a fresh network fetch. Re-ran the evidence citation verifier on both drafts: exit 0, citations OK. Warnings concern unused ledger entries; automated Chinese sentence coverage is not meaningful as a quality score.

## Six bounded R1 decisions

### 1. May online chronology and one-laboratory insoluble PAC — PASS

**Location:** EN 9–11; ZH 9. Raw USDA publication date 5/6/2026; raw Europe PMC electronicPublicationDate 2026-05-06 (July issue); USDA Methods and indexed abstract explicitly one laboratory for butanol–hydrochloric acid.

### 2. Daily intake, not equal-weight material superiority — PASS

**Location:** EN 13–17; ZH 11–13. USDA Results: extract 18.4 versus concentrate 3.87 mg/day, p=.032; whole-fruit powder 6.01 mg/day, p=.082. Both drafts retain nonsignificance and the finished-supplement denominator.

### 3. Three replicates, A-type dimer, ratios and CV — PASS

**Location:** EN 41–60; ZH 35–49. Original XML Table 2 caption explicitly three replicates ± SD and external dimer PAC-A calibration; Methods extraction/quantification triplicate. Independently recalculated all 16 numeric ratios; 1.73/34.86×100 rounds to 4.96. 平行测定 does not imply independent lots and the next sentence explicitly excludes that interpretation.

### 4. Identity-method scope and advisory boundaries — PASS

**Location:** EN 66–69; ZH 55–57. Original XML Methods authentic V. macrocarpon comparison and HPLC-UV/Vis/UHPLC-MS; Results explicitly all 24 DS. Draft no longer claims selective-only MS; process-specific interpretation and structural evidence are requests, not validated new tests.

### 5. Clinical detour and repetitive disclaimer removal — PASS

**Location:** Both complete bodies. No 36 mg/day threshold recommendation remains (36 mg per unit retained correctly in table). No therapeutic, regulatory-compliance or supplier-capability claim added. Essential fraction, sample, assay and hypothetical-cost qualifications remain near relevant claims.

### 6. Procurement list, cost units and bilingual reader quality — PASS

**Location:** EN 19, 23–37, 73–91; ZH 15, 19–31, 61–76. Validation abstract distinguishes repeatability and interlaboratory HorRat. Contract checklist specifies preparation/version, reference standard, fraction, units/moisture basis, limits, sampling/replication and discrepancy procedure. USD100/(1000g×10%)=USD1/g; both languages explicitly hypothetical, as supplied, assay reported.

## Natural reader quality

**English: pass.** The headline and opening promise a procurement comparison, and the article delivers it: material → testing agreement → worked historical comparison → identity → qualified cost → finished-product check. Technical detail supports decisions rather than becoming a research diary. The historical contradiction paragraph is dense but justified by the misleading original table header/caption. This is an educational procurement article, not a sales page, so the concrete supplier/laboratory checklist is appropriate here.

**中文：通过。** 标题、材料分类、方法约定、历史样品、鉴别证据和成本演算衔接清楚，读者能够据此整理采购和检测要求。没有把成品每日摄入量偷换成原料纯度，也没有把平行测定说成独立批次。中英文的结论强度一致。少数表达稍显书面，但不影响理解，不构成退回重写的理由。

Optional, nonblocking polish only: ZH lines 63–64 “每公斤原料对应的检测报告PAC量” and “每克检测报告PAC对应的原料成本” stack nouns; “按检测结果计算，每公斤原料含PAC：…” and “按检测结果折算，每克PAC的原料成本：…” read more smoothly. ZH line 55 “真实的北美蔓越莓…果实” could read “北美蔓越莓…真实果实样品”. These are suggestions, not required changes, and have not been applied. Existing technical boundaries remain clear.

## Numerical exhibit type: KEEP

One numerical exhibit in each draft: the same three-row comparison table. A table is the right type for exact lookup of sample identity, declared quantity, measured mean ± SD and calculated ratio. It is not a time series, distribution estimate, market-share ranking or representative failure-rate sample. A pie/stack would be wrong because the ratios do not share a total and can exceed 100%; a chart is unnecessary for three worked examples. Mean ± SD is clearly labelled, not presented as a confidence interval. The mg denominator is per dosage unit in each quantitative column; adjacent prose distinguishes daily use. Ratios 96.83%, 13.64%, 103.25% and means/SDs match original XML in both languages.

KEEP the source caption, explicit recalculation statement, historical-sample label and nearby replicate/calibration explanation. In later integration, retain semantic table headers, readable unit/mean±SD tokens and visible sample identity when horizontally scrolled; verify numeric columns and source links at desktop/mobile widths. **No screenshots or rendering checks were performed here.** Their pending status does not invalidate the table-type/content verdict.

## Evidence and limits

- `[1]` `source-1.raw`: USDA original HTML, Publication Date and Technical Abstract Methods/Results. Direct support for one-lab insoluble PAC, 53 products/four laboratories, daily-intake comparison, >3.3 mg/day RSD subgroup and n=14 mean −32% ± SD 51.4%.
- `[2]` `source-2.raw`: original full-text XML, Table 2 (`nutrients-12-00992-t002`), extraction/quantification Methods and identity Results. Conflicting source descriptions are not silently repaired into market prevalence claims.
- `[4]` `source-4.raw`: original indexed validation abstract; repeatability and HorRat findings checked separately.
- `[6]` `2026-europepmc.raw`: original indexed journal record, electronic publication 2026-05-06 versus July issue, and journal abstract.

IDs and URLs are preserved from `source-ledger.json` and the drafts. Exact supporting input hashes and machine-readable results are in `FINAL-verdict.json`. Full 2026 text was not inspected and is not required for the explicitly bounded abstract claims retained here. No inference about acquisition dates, independent batches, causal degradation, clinical efficacy, regulatory compliance or current supplier quality was added.

**Blockers: none within this finite content gate.** Website integration, localized routes/anchors, clickable citations, rendered/mobile accessibility, release checks and publication remain separate, unperformed tasks. No BrowserMan or publication action occurred.

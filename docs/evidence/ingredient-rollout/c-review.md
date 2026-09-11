# Independent source/editorial review: C packs

Reviewed 2026-09-11. Scope: actual English and Chinese prose, JSON content/formulation records, saved primary-study text and patent claims in `c/grape-seed`, `c/licorice-root` and `c/goji-berry-recovery`. No pack, repository, generator or validation file was edited. This is a source/editorial release review, not a legal clearance, regulatory approval or laboratory validation. Citations below use this review's numbering, not the packs' numbering.

## Release decision

| Ingredient | Decision | Blocking scope |
| --- | --- | --- |
| Grape seed | Conditional editorial pass | Clean corrupted source titles before public rendering. No substantive factual blocker found in the sampled load-bearing claims. Formulations are development outlines, not numerical recipes. |
| Licorice root | Hold for targeted edits | Source-list contamination; historical flavor fraction needs its defining lack of licorice flavor stated; clarify the ambiguous wording of published glabridin claim 1. Preserve fraction-specific safety controls. |
| Goji berry recovery | Hold | Ultrasound “settings unavailable” statements are contradicted by the saved primary full text. Correct the narrative, both tables, FAQ and JSON together. Label 27 explicitly as analyzed in the study tables. |

## Grape seed

### What survives source review

The 450 mg extract + 50 mg silica, size-0 hard-gelatin capsule is actually documented, not an invented formulation. That is a 9:1 extract:silica mass ratio (10% silica in the 500 mg fill), distinct from the proposed low-level flow-aid concept. Keep the existing warning against copying this study's silica fraction.[2]

The laboratory extraction methods support 1.0 g in 50 mL tubes, 47% aqueous ethanol, 10:1 solvent:solid v/w, 53 minutes and 60 °C. The paper's conclusion also prints 10.14:1, so the article's 10:1 is defensible as the methods value, not an arithmetic error. The 25.3 ± 1.26 mg CE/g FW is an assay-defined recovery, not pure OPC mass.[1]

The blood-pressure paragraph correctly resists the positive paper title: 80 randomized, specified extract, overall comparable systolic response, with subgroup qualifications. Do not upgrade this to general antihypertensive efficacy.[3]

The issued patent claim summaries match the inspected claim text: US6544581B1 separates the hot-water/dual-pH independent claim from dependent enzyme/resin provisions; US7767235B2 defines oligomer weight ranges and terminal epicatechin-gallate content. Neither is a patent for all grape seed products.[4][5]

### Formulation and translation assessment

All three plans identify ingredient roles, sequence and compatibility decisions. Beverage acid comes after extract dispersion; protein/mineral additions are separate screens. The capsule separates fill mass from marker uniformity. The gel keeps humectant, thickener and preservative roles distinct. English and Chinese agree on these substantive points. No fixed inclusion rates, ratio basis or complete batch balance is supplied; retain the label “development plans.” If the parent brief requires executable formula percentages, that deliverable remains unmet: do not fill the gap with guessed ratios.

### Required/editorial changes

1. Source titles at EN/ZH lines 99–107 contain XML metadata and JSON fragments. Replace display titles with verified article titles/authors/year; keep the retrieved URLs and identities. This is a public-rendering blocker, not evidence that the underlying studies are missing.
2. Shorten the opening caveat at line 9 and remove repeated generic negations where the specific assay, compatibility or safety control already carries the point.

Exact replacement, EN:
> These are pilot-development plans. Set ingredient levels and acceptance criteria for the selected market, then verify compatibility, safety and stability in the finished product.

Exact replacement, ZH:
> 以下为小试开发方案。按目标市场确定添加量和验收标准，再验证成品的相容性、安全性与稳定性。

Optional precision at line 55, EN:
> The methods report a 10:1 solvent-to-solid ratio (v/w); the conclusion gives 10.14:1.[1]

ZH:
> 方法部分报告液固比为10:1（体积/质量），结论部分写为10.14:1。[1]

## Licorice root

### What survives source review

The functional-dyspepsia study's GutGard specification really includes glabridin ≥3.5%, glycyrrhizin ≤0.5% and total flavonoids ≥10%. The 75 mg twice-daily, 30-day intervention belongs to that specified extract, not every DGL product.[6]

The draft correctly separates glycyrrhizin, its aglycone, DGL mixtures and glabridin; it does not treat extract ratio as assay. Preserve residual glycyrrhizin per maximum daily serving, aggregate exposure, potassium/blood-pressure/cardiac concerns, corticosteroid interactions and pregnancy/breastfeeding distinctions. NCCIH's glycyrrhizin-free safety wording is conditional, not proof that any DGL residual specification is safe indefinitely.[9]

The 2025 precipitation discussion is appropriately a laboratory failure example, not a cosmetic solvent recipe. DMSO/PBS must remain laboratory media. The resin-purity and enrichment numbers are explicitly identified as abstract-level or secondary-reported evidence rather than independently verified industrial performance.

### Blockers and exact changes

**L1. Historical flavor fraction identity.** EN/ZH lines 61 and 139–141 distinguish it from ordinary extract but omit a defining claim limitation: the recovered fractions lack licorice's characteristic flavor. A reader could still mistake the cocoa/vanilla patent example for a source of the proposed licorice note. Do not present these fractions as generic food ingredients or interchange them with conventional extract.[7]

Replace the historical-example sentence at line 61, EN:
> The historical patent combines cocoa and vanilla with essentially glycyrrhizin-free fractions that lack licorice's characteristic flavor. Those fractions are distinct from the conventional extract used here for a licorice note.[7]

ZH:
> 历史专利将可可、香草与基本不含甘草酸、且不具甘草特征风味的组分配合使用。该组分不同于本方案用于提供甘草风味的常规提取物。[7]

Add to the claim summary, EN:
> Claim 1 also specifies that the recovered fractions lack licorice's characteristic flavor.[7]

ZH:
> 权利要求1还限定所得组分不具甘草特征风味。[7]

**L2. Do not silently regularize ambiguous claim language.** EN/ZH line 147 makes claim 1's range sound cleaner than the primary text. The application literally says “a minimum of 4-90%”; claim 2 gives “4% to 90%.” This is a published application, not a verified grant.[8]

Replacement, EN:
> Published claim 1 concerns glabridin or a licorice extract as a metalloprotease-inhibiting component in topical cosmetic or oral formulations. It uses the ambiguous wording “a minimum of 4-90% of glabridin”; claim 2 separately states 4% to 90% for an extract. These are extract-composition statements, not finished-product loading recommendations.[8]

ZH:
> 公开权利要求1涉及以光甘草定或甘草提取物作为外用化妆品或口服配方中的金属蛋白酶抑制组分。原文使用含义不清的“a minimum of 4-90% of glabridin”，权利要求2另写提取物含4%至90%光甘草定。这些是提取物组成表述，不是成品添加量建议。[8]

**L3. Sources are not publishable as rendered.** EN/ZH lines 160–167 expose “Account / Logged in as / username / Dashboard” navigation text. Other titles contain XML/JSON fragments. Replace source display metadata; confirm that the cited NCBI Bookshelf body, not its navigation, supports each retained claim. The separate NCCIH source supplies a usable safety basis.[9]

### Trim without weakening safety

Keep the safety section and fraction-eligibility check. Cut repeated “not product approval / not synergy / not efficacy” tags in each role bullet after one opening scope statement. Replace line 34:

EN:
> These are bench-development plans. Set ratios, pH, processing conditions and shelf life through testing of the specified ingredient and finished product.

ZH:
> 以下为小试开发方案。针对所选原料和成品，通过试验确定配比、pH、加工条件与保质期。

Chinese “馏分” is better rendered “组分” or “分离组分” for adsorption/acid-base fractions, rather than suggesting distillation. Change the lotion heading to “光甘草定、甘油与润肤油的水包油乳液” for easier parsing. Do not insert numerical DGL, glycyrrhizin or glabridin food-use levels without an applicable permission and exposure basis.

## Goji berry recovery

### Corrections already present and worth preserving

The opening now accurately distinguishes 31 randomized, 28 completed and the figure caption's reported 27 analyzed (13 goji, 14 comparator). The source's Results exclusion arithmetic is inconsistent with its caption; do not invent a reconciliation or call 27 randomized. MPOD changes are within-group changes at selected eccentricities, with no significant treatment-by-time interaction reported; disease prevention was not measured.[10]

The three actual product plans are now present, with roles, sequence and compatibility checks. Juice powder, whole fruit, sugar-depleted polysaccharide fractions and patented glycopeptides remain distinct. Pectin is the gummy gelling ingredient, not an assumed property of goji powder. These remain non-numerical development plans, not reproducible commercial recipes.

The 50% ethanol precipitate is discarded and the 85% final-ethanol precipitate retained; 10 g/60 mL and 1/3/10 kDa ultrafiltration tubes are correctly distinguished from industrial filtration and measured molecular weights.[12]

### G1. Major source-access regression: ultrasound details exist

The pack says it retained only abstract/introduction information and lacks frequencies/pulse settings. But `c/sources/18.txt` already includes Methods with 5 s on/2 s off and frequency options, and explicitly points to the complete saved extraction: `/data/hermes/cache/web/doi.org-5e76c811c4.md`. I read that full text. It reports all three modes at 300 W/L and 5 s on/2 s off; the winning counterflow dual mode is 20/40 kHz, opposite-sit dual is 16/20 kHz, and the conclusion explicitly connects 26.38% to single-frequency 28 kHz. Thus the old caution against automatically assigning 26.38% to 28 kHz was reasonable for an abstract-only read, but is no longer the best supported account.[11]

Affected locations: EN lines 57, 63, 78 and 105; ZH lines 181, 187, 202 and 229; corresponding JSON processing/equipment/study/FAQ blocks. The retained-ledger evidence should be expanded by the parent; no existing pack was changed here.

Exact replacement for Route C, EN:
> The study compared three ultrasound modes at 20 g fruit powder/600 mL water, 60 °C for 30 minutes, 300 W/L, and 5 seconds on/2 seconds off. Reported crude-polysaccharide yields were 38.93% for energy-aggregation counterflow dual-frequency ultrasound at 20/40 kHz, 33.60% for opposite-sit dual-frequency ultrasound at 16/20 kHz, and 26.38% for energy-aggregation counterflow single-frequency ultrasound at 28 kHz. These are laboratory crude-recovery values, not purified-polysaccharide content or industrial capacity.[11]

ZH:
> 研究在20 g果粉/600 mL水、60 °C、30分钟、300 W/L及开启5秒／关闭2秒条件下比较三种超声模式。报告粗多糖得率分别为：20/40 kHz能量聚集逆流双频38.93%，16/20 kHz对置双频33.60%，28 kHz能量聚集逆流单频26.38%。这些是实验室粗提回收值，不是纯多糖含量或工业产能。[11]

Use those same values in both tables. Exact FAQ replacement, EN:
> No. The 38.93% value is a crude recovery reported for 20/40 kHz counterflow dual-frequency ultrasound. The paper reports 26.38% for the 28 kHz counterflow single-frequency mode.[11]

ZH:
> 不是。38.93%是20/40 kHz逆流双频超声的报告粗提回收值；论文将26.38%对应于28 kHz逆流单频模式。[11]

Do not copy the same paper's “ethanol final concentration, 100%” into a process recipe: it describes adding four volumes of ethanol to aqueous concentrate, making that wording internally suspect. Keep this source limitation in the evidence notes, not as an invented corrected operating concentration.[11]

### G2. Study-table count must match the corrected lead

EN line 80 and ZH line 204 still say merely “27 adults / 27人.” Replace the material/scale cell:

EN:
> 31 randomized; 28 completed; 27 reportedly analyzed (13 goji, 14 comparator), aged 45–65; 28 g whole berries five times/week for 90 days.[10]

ZH:
> 31人随机分组，28人完成，报告分析27人（枸杞13人、对照14人），45–65岁；每次28 g整果，每周五次，持续90天。[10]

Replace the outcome cell:

EN:
> Within-goji-group MPOD increases at selected retinal eccentricities; no significant treatment-by-time interaction.[10]

ZH:
> 枸杞组部分视网膜偏心位置的MPOD较基线增加；治疗与时间的交互作用不显著。[10]

### Patents and scope

The US granted-claim summary accurately retains water-only preparation, 400 nm transmittance, 1000–2000 Da membrane and dependent conductivity/sugar conditions. English “cut-off solution” should be explained as retentate to match Chinese 截留液. Neither it nor the CN enzymatic application proves human benefit.[13][14]

CN claim 3 really uses the incompletely defined phrase “0.01%浓度的纤维素酶”; do not silently turn this into enzyme mass per fruit mass. Claim 4 also specifies 1:2 additional water and contains the genuine “酶解茶多糖溶解液” inconsistency. Existing text correctly flags that error, but a fuller summary should add the 1:2 with its basis left as stated.[14]

Suggested EN:
> Claim 3 states powder:water 1:15 and “0.01% concentration” cellulase without an explicit concentration basis. Claim 4 states a further 1:2 water-addition step; its “tea-polysaccharide solution” wording is an internal source inconsistency.[14]

ZH:
> 权利要求3写粉水比1:15及“0.01%浓度的纤维素酶”，未明确浓度计量基础；权利要求4另写按1:2加水，其中“酶解茶多糖溶解液”为原文内部不一致。[14]

### Remove editorial scaffolding

Keep one development-plan notice at lines 23/147; shorten repeated status sentences in the three product headings. Replace “a universal legal standard was not obtained, so numerical legal limits are not invented” with:

EN:
> Set contaminant, microbiological and labeling requirements for the defined material and destination market.

ZH:
> 按明确的原料类别和目标市场制定污染物、微生物与标签要求。

Retain genuine unresolved limits (food eligibility of a refined fraction, assay selectivity and non-equivalence to whole-fruit clinical evidence). Delete repeated narration about what the writer did not invent.

## Verification and limits

I checked primary claims and saved paper bodies, not only the packs' validation results. I recovered the omitted ultrasound body from its existing cache footer; no network-access blocker prevented that review. Patent legal-status assertions were not refreshed against official registers, so this report does not independently certify current status or freedom to operate. Grape and licorice full-text patent PDFs support the inspected technical claims; goji claims were checked in saved Google Patents text, including the original Chinese. No numerical formula, physical mixing trial, shelf-life study or finished-product efficacy test was performed.

Final anti-AI pass: the main remaining problems are repetitive prohibition clauses, duplicated scope labels, malformed source titles and Chinese process jargon. The replacements above keep the specific evidence limits and safety controls while removing generic disclaimer repetition.

## Sources

[1] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8877132/fullTextXML — grape-seed source 10
[2] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8716858/fullTextXML — grape-seed source 11
[3] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC7922661/fullTextXML — grape-seed source 15
[4] https://patentimages.storage.googleapis.com/b8/09/e2/7759f7bfd2bc61/US6544581.pdf — grape-seed source 8
[5] https://patentimages.storage.googleapis.com/07/01/99/a7af160fae34e7/US7767235.pdf — grape-seed source 9
[6] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC3123991/fullTextXML — licorice-root source 4
[7] https://patentimages.storage.googleapis.com/aa/16/0e/16a36ef9c0a3d5/US4163067.pdf — licorice-root source 9
[8] https://patentimages.storage.googleapis.com/20/43/f3/a4c7c97381686c/US20040121031A1.pdf — licorice-root source 10
[9] https://www.nccih.nih.gov/health/licorice-root — licorice-root source 8
[10] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8708314/fullTextXML — goji-berry-recovery source 13
[11] https://doi.org/10.1590/1678-457x.14417 — goji-berry-recovery source 18
[12] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC9867462/fullTextXML — goji-berry-recovery source 24
[13] https://patents.google.com/patent/US11110144B2/en — goji-berry-recovery source 7
[14] https://patents.google.com/patent/CN105367678A/zh — goji-berry-recovery source 8

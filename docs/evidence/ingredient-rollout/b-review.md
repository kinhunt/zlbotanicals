# Independent editorial/evidence review: batch b

Review date: 2026-09-11. Scope: complete English and Chinese final copy, structured article data, three development plans per ingredient, retained evidence and actual patent claims. Packs were read-only. This is an editorial publication decision, not a product-launch authorization or legal opinion.

## Decisions

| Ingredient | Verdict | Required action |
|---|---|---|
| ginseng | **PASS** | No material factual blocker found. Apply the concise wording edits below before final polish. |
| reishi-mushroom | **BLOCK** | Add the omitted nonsignificant fatigue interaction result to the clinical account; correct the English MWCO explanation. The patent MWCO and yogurt discrepancy are already handled correctly. |
| ginkgo-biloba | **BLOCK** | Correct the inventor/applicant metadata conflation; remove recovery-process language from final copy. Keep the market eligibility hold explicit. Add the preparation-specific efavirenz warning while revising safety. |

BLOCK means the current final copy needs the specified edits, not that the ingredient is inherently unsuitable. Unverified China/EU food eligibility is a commercial hold, not evidence that those uses are prohibited.

## What was actually checked

- Read all of `ginseng/article.en.md`, `ginseng/article.zh.md`, `reishi-mushroom/article.en.md`, `reishi-mushroom/article.zh.md`, and both languages in `ginkgo-biloba/article.md`.
- Independently ran `jsonschema.validate` against each local schema: all three passed. Confirmed 8/8, 17/17 and 10/10 EN/ZH section counts respectively, matching section IDs, three plans and two patent-family records in each pack.
- Independently compared recorded file hashes against existing files: no stale recorded hashes found in any of the three validation manifests. Did not execute pack build/validation scripts, which could write into the packs.
- Read retained clinical evidence, patent claims and relevant EMA text. Reopened the scanned Chinese patent claims image independently; did not rely solely on the pack's previous visual-verification statement.
- No live registry, current pharmacopoeia subscription or destination-market authorization search was performed. The review checks the retained research against what the copy says, not current freedom to operate.

### Three-plan audit

| Ingredient | Plans | Roles / order / quality | Numeric status |
|---|---|---|---|
| Ginseng | Citrus drink; ginger sachet; single-botanical capsule | All present. Liquid premixing/acid addition and full preservation trial; geometric dry premix; capsule handling and uniformity. Haze, sediment, sensory, moisture and marker recovery are product-specific. | No fabricated formulation dose or shelf-life target. Trial doses remain study descriptions. |
| Reishi | Cocoa–oat powder; cultured yogurt; extract capsule | All present. Matrix blanks address oat/fungal glucan attribution. Yogurt separates botanical decontamination from culture inoculation. Capsule covers marker uniformity, disintegration and moisture. | No adopted yogurt dose. Extraction yields and device settings are reported as laboratory conditions, not scaled factory performance. |
| Ginkgo | Capsule; coated tablet; measured suspension | All present in readable copy. Structured capsule/tablet `roles` fields contain masses while functional roles occur in `processOrder`; move roles into their proper fields if the renderer labels those fields. Tablet silica/lubricant roles can be made explicit rather than inherited from the capsule. | Capsule 120+174+3+3=300 mg; tablet 120+150+24+3+3=300 mg; 2.4 g/100 mL gives 120 mg/5 mL. Screening gum, glycerol and pH values are labeled proposals, not literature results. |

These are credible development briefs, not validated recipes. The stated ginkgo 24 mg croscarmellose is 8% of the tablet core: not an arithmetic error, but a screening choice needing comparative disintegration/dissolution work, not a qualified optimum.

### Order and completeness

English and Chinese sections align within each pack. Reishi and ginkgo put patents last; ginseng inserts patents between processing and quality, with the FAQ incorrectly saying the two families are “below” / “下列”. Fix that locator to “described above” / “上述”. If the parent publication template requires patents last, move ginseng's patent section; the supplied task does not independently establish that as a universal publication rule. No finished illustrations were verified; ginseng/reishi contain briefs, and ginkgo explicitly supplies text only.

## Ginseng — PASS

### Evidence and patents

The fatigue account accurately retains 90 adults, a particular 20% ethanol extract, 1 or 2 g/day and four weeks; it distinguishes the nonsignificant total NRS result from the mental-score and high-dose VAS findings. The conclusion does not convert idiopathic chronic fatigue into proof for chronic fatigue syndrome or healthy consumers.[6]

Retained `sources/us9011940.txt` lines 589–598 confirm granted US9011940B2 claim 1 requires **both indigestible maltodextrin and citrus extract**, in the defined ginseng food. The manuscript is correct, and does not substitute the abstract's maltodextrin-only emphasis. Its primary cover supports the PCT filing date, grant date and Amorepacific assignee. `sources/2.txt`, actual Korean/translated claims, confirms WO2012074159A1 combines steaming, edible coating, further steaming/UV, hot-water extraction, alpha-amylase/cellulase and yeast fermentation. The two priority applications are different; A1 and B2 are not counted as separate inventions within one family. No legal enforceability claim is made.

EMA's preparation-specific/traditional-use distinction is maintained. Quality covers identity, processing, solvent, carrier, assay basis, markers and contaminants. There is no need to add a numerical commercial dose merely to make the plans look more complete.

### Exact editorial rewrites (nonblocking)

Locations use the identical line numbers in `article.en.md` and `article.zh.md`.

- **L17**, replace the scolding sentence “Reporting only the favourable measures…” / “只摘取有利指标…”:
  - EN: “The outcomes were mixed: total fatigue scores did not differ significantly from placebo, although some secondary measures improved.”
  - ZH: “结果并不一致：总疲劳评分与安慰剂无显著差异，但部分分项指标有所改善。”
  - Keep the surrounding extract, population, time and endpoint limitations; this replacement can be merged with the preceding sentences to avoid repetition.
- **L37**, replace “without inventing a passing specification” / “不虚构合格限值”:
  - EN: “Set acceptance criteria before making trial batches; the checks below identify the measurements needed.”
  - ZH: “试制前先制定接受标准；下列检查列出需要测定的项目。”
- **L145**, delete only the final editorial instruction about not burying cautions. Retain the complete under-18, pregnancy/lactation, adverse-effect and frequency statements.
- **L158**, “below” → “described above”; “下列两个家族” → “上述两个家族”.

## Reishi — BLOCK

### R1. Clinical account omits a material conflicting analysis

**Location:** both language articles L11–13; `article.json` → `content.en/zh`, section `effects`.

The reported 28.3% and 20.1% baseline reductions, 132 randomized, 62/61 analyzed and 5.4 g/day are supported. However, retained `sources/7.txt` L43 reports that the drug-by-time interaction was **not significant for fatigue (P=0.1590) or CGI severity (P=0.1644)**, while well-being was significant (P=0.0002). L45 also reports lower day-56 scores and an improved CGI outcome distribution. The current “signal” account preserves the percentages but omits this statistical tension. A clinical-specificity review should require the mixed analysis, not just generic short-duration cautions.[1]

**Final EN replacement for the L11 result portion:**

> The trial randomized 132 patients and reported improvement analyses for 62 Ganopoly recipients and 61 placebo recipients. Fatigue scores fell 28.3% and 20.1% from baseline, respectively. Although the paper reported lower day-56 fatigue scores with Ganopoly, its drug-by-time interaction for fatigue was not significant (P=0.1590). The interaction was significant for well-being (P=0.0002). These mixed analyses warrant caution when interpreting symptom benefit.

**Final ZH:**

> 试验随机分配132名患者，改善分析涉及灵芝组62人和安慰剂组61人。两组疲劳评分较基线分别下降28.3%和20.1%。论文虽报告灵芝组第56天疲劳评分较低，但疲劳评分的治疗与时间交互作用未达统计学显著（P=0.1590）；幸福感评分的交互作用则显著（P=0.0002）。解释症状获益时应同时考虑这些并不一致的分析。

Retain the existing formulation, 1,800 mg three times daily, eight-week duration, 25% crude-polysaccharide specification and transfer limitations. Cite the pack's source 7 on the replacement. Do not substitute the paper's historical neurasthenia diagnosis for modern ME/CFS.

### R2. English MWCO explanation says “mass” where it means molecular mass

**Location:** EN L70, “nominal molecular-weight cutoff is not a direct measurement of polysaccharide mass”. Chinese L70 says “真实分子量” and is conceptually closer. The English phrase can mean total polysaccharide amount, rather than the molecular-size selectivity under discussion.

- EN: “A membrane's nominal molecular-weight cutoff does not directly determine the molecular-mass distribution of the recovered polysaccharides. Aggregation, molecular shape and fouling can affect transmission.”
- ZH: “膜的名义截留分子量不能直接确定回收多糖的分子量分布；聚集、分子形状与膜污染都会影响透过行为。”

This is a terminology/parity correction, not a demand to change the patent range.

### Critical issues already resolved: keep them resolved

- **CN102219866A L153:** independent image review confirms claim 3 literally prints “10万道尔顿－100万道尔顿”: **100,000–1,000,000 Da = 100–1,000 kDa**. Do not revert to 10–100 kDa. Claims 1/2 give papain:cellulase mass ratio 1:2 to 4:1; claim 4 requires weak-base anion-exchange resin; claim 5 names A103S, A100 or A105 and freeze-drying. Claim 1 itself only says drying.[3]
- **US9758595B2 L145:** primary final claims confirm mycelial polysaccharide, >135 kDa, at least mannose/glucose/galactose, and the obesity-treatment method. Claims 6/7 carry 135–5,364 kDa, polydispersity 6.25 and average 846 kDa. It is not a generic extraction claim. The Chinese fruiting-body process and US mycelial treatment are distinct families.
- **Yogurt L48/L121/L135:** retained methods really say powder and extract at 0.1% and 0.2%, **respectively**, while Table 1 lists 1% and 2% for both materials. This is both a tenfold conflict and a treatment-assignment ambiguity. Current refusal to inherit a dose is correct; publication can discuss the study without resolving its recipe. The 1.4 log CFU/g statement is in the abstract, not a human outcome.[2]

**More exact, shorter yogurt wording:**

- EN: “The methods assign 0.1% to powder and 0.2% to extract, respectively, while Table 1 lists 1% and 2% for both. The treatment levels remain unresolved; obtain author clarification before replication.”
- ZH: “方法部分将菌粉和提取物添加量分别写为0.1%与0.2%，表1却为两种材料均列1%和2%。处理水平尚不明确，复现前需向作者核实。”

Use the pack's source 31. Keep the contradiction once in the application case and one short cross-reference in the plan; repeating it four times makes the page read like an internal audit.

### Other humanizing edits

- **L40:** “The cocoa–oat pairing is a flavour and texture choice. Reported reishi adverse effects, including insomnia, are discussed under Safety.” / “可可与燕麦用于风味和质构设计。灵芝已有失眠等不良反应报告，详见安全部分。” Retain actual safety warnings in L106–110.
- **L72:** “The following equipment framework is proposed for pilot development.” / “下表为中试开发建议的设备框架。” Remove “without assuming any supplier has an installed line” / “没有假定任何供应商已拥有相应生产线”.
- **L96 ZH:** remove “这不是苛求命名”; begin “采购合同若将显色法总当量和色谱特定化合物直接比较…”.
- **L135:** remove “No factory validation or commercial sales case was verified” from public prose; label the section “Published laboratory application” / “已发表实验室应用” instead. Preserve the yogurt dose hold.

## Ginkgo — BLOCK

### G1. Structured patent metadata conflates inventor with applicant/assignee

**Location:** `article.json` → `patentFamilies[1].applicantOrOriginalAssignee`: “Beng-Poon Teng; original-assignee field: Individual”. The readable article L150–151/L313 correctly distinguishes inventor, original-assignee field and current assignee, but the structured applicant field puts the inventor's name into that field without qualifying it as inventor. The retained page lists those as separate roles.[4]

Required correction: set the applicant/original-assignee field to “Not established from the retrieved original-assignee field (listed as ‘Individual’)” or verify the original applicant from the primary publication cover. Store “Beng-Poon Teng” only as inventor unless primary evidence establishes another role. Do not assert that Ipsen's current aggregator field proves the original applicant.

- EN readable replacement: “The retrieved page identifies Beng-Poon Teng as inventor. It lists ‘Individual’ as original assignee and Ipsen Pharma SAS as current assignee; the original applicant has not been independently confirmed.”
- ZH: “所取页面将Beng-Poon Teng列为发明人，原始权利人字段写为‘Individual’，当前权利人字段列Ipsen Pharma SAS；原始申请人尚未经独立确认。”

The two families themselves pass: EP0431535A1 and CA2443302A1 have distinct priority families. Actual EP claims support the low-alkylphenol composition and lead/polyamide history. Actual CA claims support the solvent sequence, dependent no-chromatography condition and distinct 34–46% lactone/18–30% glycoside versus approximately 52%/13% compositions. Those are patent descriptions, not product targets.

### G2. Publication copy contains internal recovery language and overstates citation scope

**Location:** EN L54–56 / ZH L217–219. “No China ordinary-food or health-food permission … was established in this recovery” / “本次恢复未确认…” is internal work-log language. Its FDA citation cannot verify Chinese or EU eligibility. The statement is an honest research limitation, not an FDA-sourced regulatory finding. Keep the unresolved eligibility gate, but separate it from sourced US rules.

**Final EN:**

> Confirm the exact extract's eligibility, permitted presentation and claims in each destination market before human-use testing or sale. The proposals below assume neither China food/health-food approval nor EU food eligibility. Those routes require a separate material-specific authorization review. In the United States, assess any new-dietary-ingredient notification requirement and the applicable supplement or beverage rules.

**Final ZH:**

> 人体使用试验或销售前，应按目的市场确认具体提取物的准入、允许的产品形式及声称。下列方案不以已取得中国普通食品或保健食品许可、或欧盟食品资格为前提；这些路径须另行完成针对具体材料的准入审查。美国市场还应评估新膳食成分通知义务及适用的补充剂或饮料规则。

Cite the FDA source only on the US sentence; describe the China/EU hold as scope of these proposals, not as a finding that the ingredient is banned. Do not add unsupported permission, GRAS status or maximum dose. This fix permits an encyclopedia discussion; it does not clear a commercial launch.

### G3. Safety revision should retain a named interaction rather than generic deflection

**Location:** EN L42–44 / ZH L205–207. The current preparation-specific pregnancy, lactation, bleeding, surgery and epilepsy cautions are supported and must stay. EMA also explicitly says concomitant efavirenz use is not recommended. Add that high-salience named warning instead of the unhelpful “product page is not a prescribing service”.[5]

- EN: “EMA does not recommend combining ginkgo preparations with efavirenz. Ask the treating clinician or pharmacist to review the exact product and medicines, including any planned surgery.”
- ZH: “EMA不建议银杏制剂与依非韦伦合用。应请治疗医生或药师结合具体产品、用药清单及拟定手术安排进行评估。”

This is an evidence-based safety addition, not a claim that the current page misquotes the warnings it does include. Keep the 3–4 day surgery precaution attributed to EMA and clinician-directed; do not tell readers to stop prescribed anticoagulants.

### Clinical specificity and other polish

GEM numbers pass against `evidence/abstract-3.txt`: 3,069 adults aged ≥75, 120 mg twice daily, median 6.1 years, all-cause dementia HR 1.12 (95% CI 0.94–1.33), no reduction. Prevention, symptomatic dementia treatment and healthy-person memory are kept separate. EMA's preparation is explicitly DER 35–67:1, extraction solvent 60% m/m acetone; solvent is not misrepresented as residual solvent. These details should remain.

- **L34/L197:** replace “The assessments should both remain visible…” with “The negative prevention trial does not answer the same question as treatment of existing symptoms.” / “预防发病的阴性试验与既有症状的治疗评价回答不同问题。”
- **L23/L187:** “Use the current pharmacopoeial edition and destination-market requirements when setting release limits.” / “制定放行限度时，应采用现行适用药典版本及目的市场要求。” Delete self-certification rhetoric.
- **FAQ L106–122/L269–285:** remove citations from questions and isolated “No” lines; combine answer into one paragraph with citations attached to supported factual sentences. Keep seed toxicity and the disease-claim boundary.

## Editing rule for the parent

Update bilingual content and any duplicated `formulationPlans`/`patentFamilies` fields together, regenerate readable artifacts, and rerun schema, parity, citation and hash checks. Do not remove real safety advice to make prose sound more positive. Remove process narration, repeated denials and warnings aimed at imagined careless editors; retain exact population/extract limits, microbiological validation, drug interactions, unresolved doses and market-entry gates.

All suggested rewrites above are final after a humanizer pass. Remaining necessary caution is tied to a specific study, process hazard or legal gate rather than a generic disclaimer.

## Sources

[1] https://pubmed.ncbi.nlm.nih.gov/15857210
    > "However, this interaction was statistically insignificant for CGI severity score and sense of fatigue [CGI: F(1,121) ϭ 1.957, P ϭ .1644; VASf: F(1,121) ϭ 2.009, P ϭ .1590].

As shown in Table 2, Ganopoly treatment for 8 weeks resulted in significantl"
[2] https://pmc.ncbi.nlm.nih.gov/articles/PMC11914407
    > "0.1% and 0.2% (w/v, %), respectively, and allowed to incubation. Within the scope of the research, samples and their codes are given in Table 1.

##### Table 1.

| Codes | Sample |
|---|---|
| C | Control |
| AC | Control with *L. acidophilus* |
| 1E"
[3] https://patentimages.storage.googleapis.com/e2/66/0f/9faeeba8ca140f/CN102219866A.pdf
    > "CN 102219866 A
申请公布日 2011.10.19
申请号 201110161167.2
申请日 2011.06.15
申请人 浙江工业大学
木瓜蛋白酶和纤维素酶质量比1∶2～4∶1的混合
超滤膜截留分子量10万-100万道尔顿
径向流色谱柱的填料为弱碱性阴离子交换树脂"
[4] https://patents.google.com/patent/CA2443302A1/en
    > "Claims (
16
)
Translated from
French
1. Procédé de préparation d'un extrait de feuilles de Ginkgo biloba, lequel comprend les étapes successives suivantes:
i. extraction de fragments secs de feuilles de Ginkgo biloba dans de l'éthanol contenant au ma"
[5] https://www.ema.europa.eu/en/documents/herbal-monograph/final-european-union-herbal-monograph-ginkgo-biloba-l-folium_en.pdf
    > "Concomitant use of Ginkgo biloba containing 
products and efavirenz is not recommended (see 
section 4.5). 
4.5.  Interactions with other medicinal products and other forms of 
interaction 
Well-established use  
Traditional use  
If the medicinal pr"
[6] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC3629193/fullTextXML
    > "total NRS score, but they were not statistically significant compared with placebo (P>0.05). Mental NRS score was significantly improved by 
P. ginseng
 administrations as 20.4±5.0 to 15.1±6.5 [95% CI 2.3∼8.2] for 1 g and 20.7±6.3 to 13.8±6.2 [95% CI"

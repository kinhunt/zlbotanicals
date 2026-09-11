# Independent review: A ingredient packs

Reviewed 2026-09-11. Scope: `a/green-tea`, `a/centella-asiatica`, and `a/monk-fruit`. Read both language articles, article JSON plan/family fields, ingredient ledgers and evidence exports; compared claims with the archived source bodies and patent claims, including the WO monk-fruit cover image. This is an audit of the supplied evidence, not a fresh systematic literature search or a legal-status opinion. No pack or repository files were changed.

## Release verdict

| Ingredient | Source accuracy | Three plans / two families | Publication verdict |
|---|---|---|---|
| Green tea | Key health, extraction and patent numbers pass | Pass: 3 distinct plans, 2 distinct families | HOLD for the requested editorial standard and evidence-chain repairs; no major numerical error found |
| Centella asiatica | Key health and extraction numbers pass; patent summary needs a scope qualifier | Pass: 3 distinct plans, 2 distinct families | HOLD for the scope wording, editorial cleanup and evidence-chain repairs |
| Monk fruit | Human study and patent ratios pass; scale-up product mass is ambiguously reported | Pass: 3 distinct plans, 2 distinct families | HOLD: clarify product mass before release; editorial cleanup and evidence-chain repairs also needed |

The drafts are substantive and formulation-specific. Their recurring weakness is the frequency of sentences explaining what something does **not** prove. Retain specific safety findings and one clear development-concept statement; remove repetitive rebuttals, imagined misuse and patent/clinical disclaimers from individual plan endings.

## Verification shared by all three

- Independently counted exactly three `formulationPlans` and two `patentFamilies` in each article JSON. Every plan's EN/ZH `roles`, `processOrder` and `compatibilityQuality` text appears in its corresponding Markdown article.
- All nine plans name ingredient roles, a proposed addition sequence and relevant compatibility/quality checks. None supplies an invented clinical dose, commercial formula percentage or validated replacement ratio. These are plausible development sequences, not demonstrated compatibility or validated manufacturing procedures.
- Ran the grounded-citations verifier against each article's own ledger with `--evidence`: all six articles returned exit code 0, `citations OK`. This checks source IDs and the presence of at least one quote per source, **not whether that quote supports every attached claim**. English declared-provenance coverage reported 21–22%; Chinese sentence counts were only 2–5, so their reported 100% is not a meaningful coverage assessment.
- Ledger/source-evidence exports frequently cut quotes mid-sentence. The supporting body often exists in `a/sources/`, but the exported quote does not carry the load-bearing fact. Examples: green tea source 25 stops before the 800 mg finding; source 10 quotes later dependent claims rather than claim 1; Centella source 19 cuts off before the four triterpenoid values; source 11 cuts off before the >95% second-extract threshold; monk fruit source 22 quotes methods only, omitting 65 g and all outcomes; source 26 stops at “England and”. Add complete, claim-specific excerpts from the existing source files and regenerate the exports before calling these evidence packs complete.
- Split long multi-claim paragraphs into sentence-level citations where source responsibility would otherwise be unclear. Keep conceptual formulation recommendations identified as editorial proposals rather than implying they were tested by the cited extraction study.
- Clean source titles: EMA's title is currently its URL; patent titles retain embedded line breaks and “- Google Patents” fragments. These are presentation issues, not broken-source findings.

## Green tea

### What passed

Cochrane's archived review supports 15 weight-loss and 3 maintenance studies, 1,945 completers, 12–13 weeks, and the outside-Japan pooled result of −0.04 kg (95% CI −0.5 to 0.4; 532 participants). The article does not turn the result into a weight-loss promise. The EFSA body supports the supplemental ≥800 mg EGCG/day transaminase finding and its inability to identify a safe extract dose. This is a safety observation, not a recommended intake.[15][25]

The extraction case matches the archived primary methods and table: processing fines rather than brewed residue; 0.425 mm screen; hot water/ultrasound at 80°C for 20 minutes; 20 kHz, 120 W; 80% ethanol at reported 70°C; 1:100, 1:50, 1:20; and 1:50 yields 25.98 ± 0.75%, 24.16 ± 0.95%, 22.59 ± 0.26%. The source itself confusingly links 70°C with ethanol's boiling temperature. Keeping “reported 70°C” is appropriate. The article avoids copying the abstract's misleading implication that 1:50 was the highest yield across all ratios.[18]

Distinct patent families verified from archived family sections: WO2001056586A1, family ID 26680102, priority 1999-01-07; WO2015144495A1, family ID 50687004, priority 2014-03-26. Publication kinds, filing/publication dates and assignees match the archived records. Claim summaries correctly distinguish catechin retention/caffeine washout from caffeine adsorption/tea-liquid return to leaves.[9][10]

### Plan checks

| Plan | Roles and addition order | Compatibility verdict |
|---|---|---|
| Citrus tea | Water extract for tea character, citrus aroma, acid/sweetener balance; dissolve, blend, add diluted acid, qualify flavour addition against heat treatment | Pass as proposal: haze, minerals, catechin retention and package exposure are relevant |
| Oat latte | Tea powder/extract plus oat body; slurry leaf powder or separately dissolve extract, then disperse and process | Pass as proposal: protein/salt/pH controls, sediment and flocculation; no claim that EFSA tested this oat formula |
| Instant stick | Soluble tea, declared carrier and flavour; premix, expand blend, test uniformity and pack | Pass as proposal: wetting, segregation, moisture, caffeine/EGCG per pack |

### Required editorial rewrites

Apply in both Markdown and the corresponding JSON fields during the later authoring pass.

1. `article.en.md:15`, final clause. Replace “this evidence does not support presenting a tea drink as a fat-burning treatment” with **“the observed weight differences were too small to be clinically important”**. ZH: **“观察到的体重差异很小，缺乏临床重要性”**. Keep the study population and review citation.[15]
2. `:17`, replace the two sentences beginning “That observation…” with: **“EFSA could not identify a safe EGCG dose for green tea extracts. Define EGCG and caffeine per serving and intended daily consumption before supplement development.[25]”** ZH: **“EFSA未能确定绿茶提取物中EGCG的安全摄入剂量。开发补充剂前，应明确每份EGCG、咖啡因及预期每日摄入量。[25]”** This preserves the safety finding without arguing against an imagined interpretation.
3. `:32`, replace the introduction with: **“These pilot-development concepts set out ingredient roles, addition order and test points. Establish flavour and analytical targets in the intended product matrix.”** ZH: **“以下中试开发方案列出原料作用、加入顺序与检测项目。风味和分析目标应在预定产品基底中确定。”**
4. `:57`, delete **“a purchased instant extract does not need to be extracted again”** / **“采购的速溶提取物不需要再次提取”**. End the sentence after the uniformity/packing step.
5. `:59`, delete **“A drying carrier improves neither clinical efficacy nor catechin purity by itself.”** / **“干燥载体本身既不提高临床效果，也不提高儿茶素纯度。”** Carrier accounting is already explained; a clinical rebuttal adds nothing to stick-pack testing.
6. `:77`, replace the full paragraph with: **“At 1:50, extract yields were 25.98 ± 0.75% for hot water, 24.16 ± 0.95% for ultrasound and 22.59 ± 0.26% for ethanol. Hot water gave the highest extract yield at this ratio. The study reports ethanol extraction at 70°C and ultrasound power of 120 W; production-scale comparison would require batch mass and energy input per unit feed.[18]”** ZH: **“在1:50条件下，热水、超声和乙醇的提取得率分别为25.98 ± 0.75%、24.16 ± 0.95%及22.59 ± 0.26%。该料液比下，热水提取得率最高。研究报告乙醇提取温度为70°C、超声功率为120 W；生产规模比较还需明确单批投料量及单位原料能量输入。[18]”** Keep the source's boiling-temperature inconsistency in the research notes, not as an extended rebuttal in the article.

## Centella asiatica

### What passed

EMA supports the traditional topical minor-wound framing, insufficient evidence for well-established use, and the omission of oral therapeutic indications because of safety concerns and other therapeutic options. The cognitive review supports five Centella-only RCTs plus six combination-product RCTs and no significant pooled benefit across cognitive domains. The article appropriately separates combination products and cosmetic claims.[4][16]

Primary extraction methods and Table 2 support 2 g leaf/50 mL solvent, 100 mL flask, the five named solvents, 40 kHz, 25°C, 15 minutes, theoretical 250 W, and the four reported methanol-extract values 8.21, 7.82, 4.44 and 3.38 mg/g. Ethanol was not tested. No formula concentration is inferred from these results.[19]

Two independent families verified: US8486900B2, family ID 32320170, priority 2002-12-10; US10980851B2, family ID 67003736, priority 2018-06-08. Metadata matches. Bayer's granted claim is a human skin-use method incorporating a specific prepared extract; the ≥75% and >95% thresholds are correctly separated. P&G's claim includes oat, ceramide, a lipid-bilayer structurant, preservative and an oil-in-water carrier, not just two botanicals.[11][12]

### Plan checks

| Plan | Roles and addition order | Compatibility verdict |
|---|---|---|
| Humectant serum | Glycerol/panthenol for humectancy, polymer for rheology, defined Centella liquid; hydrate, premix/dilute, incorporate, set pH, qualify preservative | Pass as proposal; crystals, marker recovery, challenge/package tests and finished-product claim testing are specified |
| Oat/ceramide cream | Lipid/emulsion structure plus characterized botanicals; separate phases, form-specific ceramide addition, emulsify, cool, add compatible Centella | Pass as proposal; oat form distinguished, storage/crystals/marker recovery and base controls specified |
| Rinse-off mask | Broad extract, glycerol and washable gel; hydrate, dilute/add, adjust, deaerate, package | Pass as proposal; rinse protocol, syneresis, preservation and tolerability specified. Add glycerol's humectant role explicitly for parity with the serum |

### Required scope and editorial rewrites

1. `article.en.md:107` and matching ZH/JSON: preserve **“about”** when reproducing P&G's ranges. Replace the first sentence with: **“Granted claim 1 combines a Centella extract consisting essentially of about 20–60% asiaticoside and about 40–80% combined asiatic and madecassic acids, measured by extract weight, with oat extract, ceramide, a lipid-bilayer structurant, preservative and an oil-in-water carrier, each at its stated concentration.[12]”** ZH: **“授权权利要求1组合了主要由约20–60%积雪草苷及约40–80%积雪草酸与羟基积雪草酸混合物构成的积雪草提取物（均按提取物质量计），以及燕麦提取物、神经酰胺、脂质双层结构成分、防腐剂和水包油载体，各有规定浓度。[12]”** The current exact-looking endpoints lose a claim qualifier.
2. `:6`, EN only: replace **“their corresponding aglycone families”** with **“their corresponding aglycones”**. These names identify compounds, not families.[4][19]
3. `:8`, replace **“A water/glycol ingredient is a prepared solution with its own carrier and preservative”** with **“For a prepared water/glycol ingredient, check the carrier composition and any declared preservative.”** ZH: **“对于预制水／多元醇原料，应核对载体组成及已声明的防腐剂。”** Avoid asserting that every such commercial ingredient contains preservative.
4. `:15`, replace the opening sentence with: **“A 2017 systematic review examined oral Centella preparations for cognition and mood.”** ZH: **“2017年一项系统综述评价了口服积雪草制剂对认知与情绪的影响。”** Remove the unsourced “brain tonic” foil; retain the trial counts and findings.[16]
5. `:55`, replace the final sentence with: **“Glycerol contributes humectancy, while the gel controls spread and contact during use.”** ZH: **“甘油提供保湿作用，凝胶控制使用时的铺展与接触。”** This completes the roles and removes the unsolicited transdermal-delivery rebuttal.
6. `:70`, replace the last sentence with: **“The cited two-gram study evaluates an ultrasonic extraction step; drying and finished-product manufacture require separate process development.[19]”** ZH: **“所引两克级研究评价了超声提取步骤；干燥与终端产品制造需另行开发工艺。[19]”**
7. `:100`, replace the paragraph with: **“The family illustrates selective glycoside recovery and the analytical separation of madecassoside and terminoloside within a defined skin-use method.[11]”** ZH: **“该家族展示了特定皮肤用途方法中的选择性糖苷回收，以及羟基积雪草苷与terminoloside的分析分离。[11]”** Keep one general patent-evidence statement at the section opening instead of repeating the clinical/FTO distinction in every entry.

## Monk fruit

### What passed

The archived primary trial abstract supports the 30 healthy men, crossover design, four beverages, 65 g sucrose comparator, breakfast/preload/lunch schedule, no significant total three-hour glucose/insulin AUC differences, and no total daily energy difference. The body of the article reports the abstract accurately. The supplied source is an abstract, not a retrieved full clinical paper; it supports these summary facts but not additional protocol or dose detail.[22]

EFSA supports the dossier-specific nominal 25% V purification route, 3–6% saccharides versus <1% for the higher grades, the absence of an assay supplied for mogroside V in food, and the 2019 insufficient-to-conclude safety finding. FSA supports the 26 June 2024 decision and its explicit England/Wales and non-selective decoction scope.[20][26]

Two independent families verified: WO2015168779A1, family ID 51141567, priority 2014-05-08; BR112015002139B1, family ID 47225618, priority 2012-08-01. The WO cover visually confirms Zhang and Li as applicants/inventors, with GLG as the c/o address organization. The related US publication is correctly not counted again. Brazilian claim 1 supports extract:(A+B) 51:49–99:1, V:A 41:59–99:1 and B ≥2% on the defined component denominator; the EN/ZH article preserves that distinction.[13][14]

### Plan checks

| Plan | Roles and addition order | Compatibility verdict |
|---|---|---|
| Citrus sparkling | Concentrated sweetener, citrus/acid and optional second sweetener; separate stocks, blend, process, cool/carbonate | Pass as proposal; tests actual carbonation and temporal sweetness, haze and analytical recovery |
| Cultured dairy dessert | Sweetness separated from dairy solids/structure; develop and heat base, compare pre-/post-fermentation additions under hygiene control | Pass as proposal; acidification, cultures, whey separation, refrigerated sensory and nutrition accounting |
| Oat cookie | Sweetness separated from bulk/humectancy and retained sugar; low-dose premix, dough mixing, bake, cool/package | Pass as proposal; spread, browning, water activity, fracture and stored crispness. Quantified mixing/uniformity criteria remain future development work |

### Blocking numerical wording

`article.en.md:78` / ZH `:78` / corresponding JSON study block say “17.38 g III E at 55.14% purity”. The source's abstract uses similar shorthand, but its purification table labels **17.38 ± 0.44 g as Product Weight**, with **55.14 ± 2.44% III E purity** and **74.71 ± 1.41% recovery**. The current wording can be mistaken for 17.38 g of pure III E; use the table's explicit mass basis.[21]

Exact replacement:

> **Reported III E purity rose from 11.71% to 54.19%, with 70–76% recovery. At the larger scale, the study's purification table reports 17.38 ± 0.44 g of product containing 55.14 ± 2.44% III E, with 74.71 ± 1.41% recovery. The resin charge was 150 g. Further scale-up would need to control the culture medium, microbial quality and conversion by-products as well as adsorption and fraction collection.[21]**

ZH:

> **研究报告III E纯度由11.71%提高到54.19%，回收率为70–76%。较大规模试验的纯化表报告获得17.38 ± 0.44 g产品，其中III E纯度为55.14 ± 2.44%，回收率为74.71 ± 1.41%；树脂用量为150 g。进一步放大还需控制培养基、微生物质量和转化副产物，以及吸附和分段收集过程。[21]**

Use the same table excerpt in the ledger, rather than relying solely on the ambiguous abstract wording.

### Other required editorial rewrites

1. `:13–15`: delete the opening two-sentence generic rebuttal. Start with the named study. Replace the closing sentence with **“This acute study measured responses in healthy men; longer-term outcomes and people with diabetes were outside its scope.[22]”** ZH: **“该急性研究测量了健康男性的反应，未评价长期结局或糖尿病人群。[22]”** Keep the actual glucose, insulin and energy results intact.
2. `:33`: **“These pilot concepts separate sweetness replacement from the bulk and texture functions of sugar. Compare each finished product with a sucrose control at the same serving temperature.”** ZH: **“以下中试方案分别处理甜度替代与糖的填充、质构作用。各成品应与蔗糖对照在相同食用温度下比较。”**
3. `:38`, final sentence: **“The Tate & Lyle family below describes a specified blend of monk fruit extract, Reb A and Reb B.[14]”** ZH: **“下述Tate & Lyle家族描述了罗汉果提取物、莱鲍迪苷A与莱鲍迪苷B的特定复配。[14]”**
4. `:101`: **“The WO cover names Yong Luke Zhang and Cunbiao Kevin Li as applicants, each at a c/o GLG Life Tech Corporation address. US20170150745A1 is a national member of the same family. The process illustrates serial adsorption and fraction selection.[13]”** ZH: **“WO首页列Yong Luke Zhang与Cunbiao Kevin Li为申请人，二者地址均为转交GLG Life Tech Corporation。US20170150745A1是同一家族的国家阶段成员。该工艺展示了串联吸附与分段选择。[13]”**

## Author handoff

1. Repair the monk-fruit product-mass wording and Centella patent qualifier first.
2. Apply the specified editorial trims in both languages and JSON; retain the dose/safety findings and material-specific legal boundaries.
3. Add complete quotes for the load-bearing claims, especially study methods/outcomes and full patent claim elements; regenerate source-evidence exports and rerun citation checks.
4. Recheck JSON/Markdown parity after editing. This review does not authorize release by itself and does not claim laboratory validation of any proposal.

Citation numbers below reuse the existing `a/ledger.json` mapping; no source IDs were invented or reassigned. Source bodies reviewed are the corresponding numbered files under `a/sources/`.

## Sources

[4] https://www.ema.europa.eu/en/documents/herbal-report/assessment-report-centella-asiatica-l-urb-herba-revision-1_en.pdf — https://www.ema.europa.eu/en/documents/herbal-report/assessment-report-centella-asiatica-l-urb-herba-revision-1_en.pdf
[9] https://patents.google.com/patent/WO2001056586A1/en — WO2001056586A1 - Method for the isolation of caffeine-free catechins from green tea
        - Google Patents
[10] https://patents.google.com/patent/WO2015144495A1/en — WO2015144495A1 - Decaffeination methods and systems
        - Google Patents
[11] https://patents.google.com/patent/US8486900B2/en — US8486900B2 - Method for preparing a Centella asiatica extract rich in madecassoside and in terminoloside
        - Google Patents
[12] https://patents.google.com/patent/US10980851B2/en — US10980851B2 - Topical skincare compositions comprising Centella asiatica selected triterpenes
        - Google Patents
[13] https://patents.google.com/patent/WO2015168779A1/en — WO2015168779A1 - Methods of extraction and purification of luo han guo mogroside v, natural sweetener compositions therewith and uses of said composition
        - Google Patents
[14] https://patents.google.com/patent/BR112015002139B1/en — BR112015002139B1 -
        Sweetening composition comprising monk fruit extract comprising mogroside v, rebaudioside a and rebaudioside b, and food or drink composition

      - Google Patents
[15] https://www.cochrane.org/evidence/CD008650_green-tea-weight-loss-and-weight-maintenance-overweight-or-obese-adults — Green tea for weight loss and weight maintenance in overweight or obese adults | Cochrane
[16] https://doi.org/10.1038/s41598-017-09823-9 — Effects of Centella asiatica (L.) Urb. on cognitive function and mood related outcomes: A Systematic Review and Meta-analysis | Scientific Reports
[18] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11266887/fullTextXML — Green tea extraction primary full text
[19] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11490722/fullTextXML — Centella extraction primary full text
[20] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC7008860/fullTextXML — EFSA monk fruit safety assessment full text
[21] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC13521049/fullTextXML — Mogroside III E biotransformation primary full text
[22] https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:27956737&format=json&resultType=core — Tey 2017 randomized crossover trial abstract
[25] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC7009618/fullTextXML — EFSA 2018 green tea catechins safety full text
[26] https://www.gov.uk/government/publications/non-selective-aqueous-decoctions-of-monk-fruit-consultation-request-to-determine-novel-food-status-pursuant-to-article-42-of-retained-regulation-eu-20/non-selective-aqueous-decoctions-of-monk-fruit-determination-of-the-status-of-a-novel-food-pursuant-to-article-42-of-assimilated-regulation-eu-2 — FSA Article 4 decision: non-selective monk fruit decoctions

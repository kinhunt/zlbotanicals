# Independent review: stevia and resveratrol

Reviewed 11 September 2026. Scope: read-only review of `d/stevia/`, `d/resveratrol/` and their retained sources. No article, pack, generator or repository edits. Citations below use this review's numbering, not either article's numbering.

## Decision

**Hold stevia for one factual correction; hold resveratrol for a publication-cleanup pass.** Both are useful technical drafts, with three distinct development plans and two genuinely distinct patent families each. Neither needs wholesale replacement. The clinical sections report actual human findings rather than passing off patent claims, physicochemical measurements or safety opinions as efficacy trials.

Required before publication:

1. Correct the stevia trial's randomized/enrolled population: the Methods report 31 randomized, not 28; 28 is the reported analysis/completer population, 14 per group.[1]
2. Name the materials actually tested in the longer stevia trial and the resveratrol trial. “Daily stevia extract” and “oral resveratrol” are unnecessarily vague in articles whose central rule is matching evidence to material.
3. Remove resveratrol's illustration-production instructions from reader-facing prose, and repair substantive EN/ZH differences. Keep the instructions and their safety constraints in the existing illustration brief, not the encyclopedia body.
4. Give resveratrol's three plans an explicit instruction to set written acceptance limits and sampling conditions before testing. The tests are useful, but “release on retained trans plus physical stability” is not an acceptance specification.

These are publication-quality issues, not a finding that either article proves unsafe use. Current national patent status/FTO, current country-by-country ingredient permissions, final formula safety and shelf life remain **commercialization gates**, not reasons to erase the articles' qualified research summaries.

## Evidence and clinical scope

### Stevia

**Acute meal comparison: pass for the facts currently reported.** `stevia/article.en.md:11` and ZH line 11 accurately reflect the retained Anton abstract: 19 lean and 12 obese adults; three test days; 290 kcal stevia/aspartame preloads versus 493 kcal sucrose; no compensatory increase at the subsequent meals; lower postprandial glucose versus sucrose and lower insulin versus both comparators.[2] The unequal-energy caveat is essential. Do not rewrite this as an equal-calorie intervention, a purified Reb M study, or a diabetes treatment trial. The retained file is an abstract excerpt, not full Methods; it does not justify a glycoside identity or dosage beyond what it actually reports.

**Twelve-week trial: numerical outcomes pass, participant-flow wording fails.** `stevia/article.en.md:13` says “enrolled 28”; ZH line 13 says “纳入28名.” Methods section 2.2 says “Thirty-one participants were randomised to the 2 study groups”; the abstract and reported baseline/result groups contain 28 participants, 14 per group.[1] Report these stages separately. The unchanged OGTT responses, −0.22 kg versus +0.89 kg week-12 changes, and reduced self-reported energy intake are supported.[1] Preserve “reported” for energy intake and avoid calling −0.22 kg demonstrated weight loss: its reported confidence interval includes zero.[1]

The intervention was SweetLeaf Stevia Sweet Drops Clear, five drops twice daily with habitual drinks; the authors describe stevia leaf extract in water, rather than a carrier-bulked powder.[1] This is not an assay-defined Reb M/D intervention. Naming it makes the evidence boundary more useful than repeatedly saying that every glycoside may differ.

**Function versus health:** the article correctly leads with sweetening, distinguishes sugar-content substantiation from therapeutic claims, and keeps the ADI in steviol equivalents. The regulatory ADI is currently attributed through the applicant's A1222 dossier, not a directly retrieved JECFA opinion; preserve that attribution or add a direct authoritative ADI source before elevating it to an independently checked regulatory statement.[10] A1222 is a dated applicant manufacturing/sensory dossier, while A1268 is a regulatory approval report addressing particular enzyme processing aids; neither establishes general clinical benefit.[10][11]

### Resveratrol

**Clinical outcomes: pass, with a material-identity addition.** `resveratrol/article.en.md:26–30` and ZH lines 26–30 accurately report Turner: 119 randomized patients with mild-to-moderate Alzheimer disease, 52 weeks, escalation from 500 mg/day to 1,000 mg twice daily, measured plasma/CSF exposure, reported gastrointestinal symptoms and weight loss, greater brain-volume loss, and uncertain biomarker interpretation.[3] The null CDR-SOB/ADAS-cog/MMSE/NPI findings and the secondary ADCS-ADL result (p=0.03), losing significance in the post-hoc amyloid-defined subset (p=0.055), match the full text.[3]

Add that the study used synthesized, encapsulated trans-resveratrol supplied under current Good Manufacturing Practices, not knotweed extract or either proposed carrier formulation.[3] Do not imply the Turner material is the same as EFSA's dossier material merely because both are synthetic. The current prose does not make that false identity claim; an explicit sentence would prevent it.

The outcomes subsection of the paper lists biomarkers/MRI as primary, safety/tolerability/PK as additional, and clinical scales as secondary.[3] The article's “primary outcomes included safety” follows the abstract's broader framing but can be made more exact: “The trial assessed safety and tolerability; its specified primary outcomes were biomarkers and MRI measures, with clinical scales as secondary outcomes.”

**Absorption versus benefit: pass.** The article does not claim that a smaller particle, inclusion complex, clearer liquid, measured CSF exposure or higher pharmacokinetic exposure establishes a health benefit. No comparative human PK trial for the proposed formulations is supplied. Do not add “better absorbed” or a numeric oral bioavailability claim from the present evidence set. Solubility, dissolution, intact systemic exposure, brain exposure and patient benefit are different endpoints; the stability abstract and Turner trial address only parts of that chain.[3][9]

**Safety scope: retain.** EFSA's 2016 opinion concerns a specified synthetic ≥99% trans material, adult capsule/tablet use at the intended 150 mg/day, and possible medicine interactions involving CYP2C9; it is not a general efficacy endorsement or worldwide current permission.[8] The current warning against extrapolating to children, pregnancy, other sources or arbitrary doses should survive editing. The mercury reporting-limit example is accurately distinguished from an exact measured mercury concentration of 1 mg/kg.[8]

**Process scope: pass on the checked material.** The knotweed study distinguishes root mass, dried extract and resveratrol content; its polydatin conversion explains increased free-resveratrol output, not 400% recovery of the initial free compound. The final reported product is around/over 73.8%, not a demonstrated 99% whole-batch trans grade.[12] The stability source is explicitly abstract-only, so the pH 6.8 observation must remain study-specific.[9] Neither source validates industrial equipment sizing or the new product plans.

## Six formulation plans

All six have identifiable ingredient roles, a sensible proposed addition sequence and product-relevant compatibility tests. This satisfies the requested plan structure. None is a performed experiment or executable production recipe; missing exact concentrations are acceptable for concept plans, but not for plant transfer. Assessments below are editorial/engineering recommendations based on the text, not claims of experimental validation.

| Plan and location | Roles and order | Quality controls | Required or useful change |
| --- | --- | --- | --- |
| Stevia citrus, EN/ZH 25–31 | M/D-rich glycosides, retained sugar, acid/citrate, flavour and water; diluted stock before final adjustment, carbonate after chilling | Matched sweetness, fixed acid/flavour, controls, heat/storage profile, stock and drink precipitation; explicit predefined limits | Pass. In a later protocol, specify pH target, stock concentration, heat process, storage points and microbial validation separately. |
| Stevia protein drink, 33–39 | Protein hydration, separately hydrated stabilizer, dissolved sweetener, optional oil/emulsifier, homogenization and heat | Sediment/creaming, viscosity, particle size, sensory comparison, fixed mineral load and heat history; written targets | Pass as a screening plan. Select one protein and a named stabilizer before treating the sequence as reproducible. Keep the hygienic late-flavour requirement. |
| Stevia tabletop sachet, 41–47 | Glycoside sweetness, erythritol bulk, optional locally permitted allulose; geometric preblend before bulk blending and filling | Powder properties, vibration segregation, individual sachet assay, hot/cold dissolution and cooling sensation | Pass. Retain carrier tolerance, full ingredient declaration and allulose eligibility. Example 8 is composition precedent only.[4] |
| Resveratrol capsule, 34–44 | Assayed trans, cellulose diluent, late silica, shell; assay basis → sieve → geometric dilution → blend → silica → fill | Segregation, blend uniformity, fill mass, chromatographic dissolution, moisture and compatibility | Add written acceptance criteria and individual finished-unit content checks; blend uniformity plus fill mass alone should not stand in for them. Keep dose review. |
| Resveratrol topical, 46–56 | DMI solvent, oil, glyceryl stearate/PEG-100 stearate, water; phase preparation → emulsification → compatible-temperature premix → cooling | Crystals, microscopy, droplets, separation, preservative efficacy, tolerability, packaging and trans retention | Pass as proposal. Define target loading, solvent level, pH and temperature window in the test protocol. Specify that raw-ingredient/unformulated controls are analytical/physical controls, not automatically suitable for human skin application. Patent precedent supports ingredient selection, not tolerability of this new formula.[6] |
| Resveratrol reconstitution, 58–68 | Qualify an actual complex or develop a separate complexation process before drying, bulking and packing | Free/total trans, loading basis, residues, water, redispersion, timed supernatant; carrier eligibility | Add predefined retained-trans/physical limits and a justified way to distinguish inclusion from a simple physical mixture if claiming an inclusion complex. Clarify that an already dry supplied complex is not automatically dried again. The patent requires a specific preparation sequence, not mere dry blending.[7] |

Suggested shared addition to resveratrol's plan introduction:

- **EN:** “These are proposed bench studies. Before testing, set the target loading, sampling times and written acceptance limits for assay, uniformity, dissolution or redispersion, and storage stability. Establish microbial safety for aqueous products and skin tolerability for the topical formula separately.”
- **ZH:** “以下为建议开展的小试。试验前应明确目标载量、取样时间，以及含量、均匀度、溶出或再分散和储存稳定性的书面判定限值。水性产品的微生物安全及外用成品的皮肤耐受性须另行验证。”

## Four patent checks

Independently read the two US primary-PDF text extractions, including covers and cited claims; independently inspected the two WO cover and claim-1 images. The thumbnail contact sheets were inadequate for bibliographic details, so conclusions below rely on the full cover/claim images instead. No current ownership, grant maintenance or FTO opinion was attempted.

| Family | Dates and applicant | Publication type and actual claim boundary | Result |
| --- | --- | --- | --- |
| US20140342043A1 | PepsiCo, Inc.; filed 2013-05-14; published 2014-11-20. The cover supports these fields. The article properly labels 2013-05-14 priority as coming from the retained index rather than a separate primary priority claim.[4] | US application publication, not a grant. Claim 1: food with sweetening amount of Reb M and another ingredient; claim 9: water/flavour/Reb M beverage; claim 25: sweetener composition. Claim 14 adds acidulant, carbonated diet cola, pH >3 and <4, and 50–600 ppm Reb M.[4] | Pass. Example 8 Table 10 quantities and approximately 0.499% Reb M arithmetic agree. No independent sensory superiority or current allulose permission follows. |
| US11274328B2 | Sichuan Ingia Biosynthetic Co., Ltd.; four CN priority applications dated 2018-09-29, US filing 2019-09-30, A1 publication 2020-04-02, B2 grant 2022-03-15.[5] | Granted US B2. Claims 1/2 retain Reb A/stevioside substrate, EUGT11/UGT76G1, specified E. coli/Pichia hosts and gene changes. Claim 21 depends on 19, which depends on 17, 3 and ultimately 1; membrane operations cannot be detached from those restrictions.[5] | Pass. The article retains the extraordinary printed claim-25 inlet 80°C/outlet 120°C rather than silently “fixing” it. It is a textual issue to investigate, not an operating recommendation. |
| WO2009129627A1 | Priority 2008-04-25; filed 2009-04-24; published 2009-10-29. Pharmascience Inc. for designated states except US; Pascale Clément and Mikaela Teris as US-only inventor/applicants, confirmed on cover.[6] | PCT international application publication A1. Claim 1 requires topical solubilized resveratrol in a stable emulsion, a solvent system comprising DMI, and non-irritation.[6] | Pass for the expressly identified claim-1 summary. Add the companies' “except US” qualifier if normalizing bibliographic precision. Non-irritation is a claimed limitation, not independently proven safety of the proposed formula. |
| WO2009012551A1 | Priority 2007-07-23; filed 2008-07-23; published 2009-01-29. União Brasileira de Educação e Assistencia-Mantenedora da PUCRS and Eurofarma Laboratórios Ltda. for states except US; André Arigony Souto as US-only inventor/applicant, confirmed on cover.[7] | PCT application publication A1. Claim 1: saturated aqueous cyclodextrin at 50–80°C; add acceptable water-miscible organic solvent to solvent:water 1:1–1:5; then add resveratrol solution and heat at 50–80°C; slowly cool and separate crystals.[7] | Pass. The ratio belongs to the solvent-addition step, not necessarily the final mixture after resveratrol solution addition. The article does not invent a v/v basis. EP2178525A1 is retained as the related family publication, not counted as another invention. |

The two resveratrol claim summaries are **not exhaustive descriptions of every independent claim in their applications**. Keep the phrase “claim 1”; do not relabel the paragraph “complete family scope.” Their publications also contain additional composition/use claims. This is a limitation of the summary, not a reason to replace the correct claim-1 summaries with broad patent promises.[6][7]

## Precise EN/ZH edits

### 1. Stevia trial correction and material specificity — required

Replace the opening of EN/ZH line 13, keeping the existing supported result sentences and limitations:

**Draft EN:** “The 12-week study analyzed 28 healthy adults using stevia drops rather than a purified glycoside.”

**Draft ZH:** “这项12周研究分析了28名健康成年人，使用的是甜菊滴剂而非纯化单体糖苷。”

**Anti-AI/editorial check:** This is shorter but still hides the 31 randomized participants and omits the product and regimen. “Rather than a purified glycoside” also states more about purity than necessary. Replace vague contrast with actual material details.

**Final EN:** “The 12-week randomized, open-label trial randomized 31 healthy adults and reported results for 28 completers, 14 per group. The intervention group used SweetLeaf Stevia Sweet Drops Clear, five drops twice daily with habitual drinks; the authors describe the product as stevia leaf extract in water.”[1]

**Final ZH:** “这项12周随机开放标签试验将31名健康成年人随机分组，报告了28名完成者的结果，每组14人。干预组随日常饮品使用SweetLeaf Stevia Sweet Drops Clear，每次5滴、每日两次；作者将该产品描述为甜菊叶提取物的水溶液。”[1]

When applying this edit, use the article's stevia source 6, not review source 1. The cited study regimen describes research exposure; it is not a consumer dosage recommendation.

### 2. Resveratrol tested material and endpoints — required specificity

After the dose sentence at EN/ZH line 26:

**EN:** “The study used synthesized, encapsulated trans-resveratrol supplied under current Good Manufacturing Practices. It did not test knotweed extract or the topical and cyclodextrin formulations proposed here. The trial assessed safety and tolerability; its specified primary outcomes were biomarkers and MRI measures, with clinical scales as secondary outcomes.”[3]

**ZH:** “研究使用按现行药品生产质量管理要求合成并制成胶囊的反式白藜芦醇，未测试虎杖提取物或本文建议的外用、环糊精配方。试验评估了安全性和耐受性；预设主要终点为生物标志物与MRI指标，临床量表为次要终点。”[3]

Retain the sentence that these were supervised investigational doses, not supplement instructions. Use article source 6 when applying.

### 3. Repeated defensive prose — consolidate without deleting safeguards

Locations: resveratrol EN/ZH 36, 48 and 60 repeat the same unvalidated-plan sentence; roles, process and quality paragraphs often repeat it again. Stevia EN/ZH 5 already establishes proposal status, then lines 27, 43, 55, 61 and 63 repeatedly explain what the text is not.

**EN shared heading note:** “The following plans are proposals for bench testing, not validated production formulas. Ingredient roles are formulation hypotheses; the cited patents provide precedents, not evidence of clinical benefit or permission to commercialize.”

**ZH shared heading note:** “以下方案供小试筛选，尚未验证为生产配方。原料分工属于配方假设；所引专利提供技术先例，不证明临床获益或商业化许可。”

Then delete only the identical per-plan status sentences in the rendered article. Keep per-plan status metadata for standalone cards. Retain locally relevant constraints: microbial shelf-life validation, hygienic flavour addition, carrier tolerance and permissions, topical preservation/tolerability, residues, dose review, EFSA population limits/interactions, solvent safety, and current patent review.

More economical replacements:

- **Stevia EN 63:** “Size equipment and set hold, cleaning and sampling procedures from product trials and mass balances.” **ZH:** “设备规格及暂存、清洗、取样程序应依据产品试验和物料衡算确定。” This replaces the long list of unspecified tank size, membrane area, solvent consumption and cost savings without supplying invented design values.
- **Resveratrol EN 64:** “For a supplied dry complex, verify loading before blending. For an in-house process, complete complexation, isolation, drying and assay first.” **ZH:** “外购干燥复合物应先核实载量再混配；自制路线则先完成包合、分离、干燥及含量检测。” Keep the following warning that dry blending does not demonstrate complexation.[7]
- **Resveratrol ZH 108 heading:** Replace “QA的真实案例比空泛‘符合标准’更有用” with “汞检测报告限与规格不匹配.” EN equivalent: “Mercury reporting limits did not match the specification.” The paragraph already supplies the useful evidence.[8]

### 4. Reader-facing production instructions and parity — required cleanup

- `resveratrol/article.en.md:44,56,68` and ZH same lines are instructions to the illustrator (“Draw…”, “Show…”, “绘制…”), not article prose. Remove them from the public article and retain the complete briefs, including “no absorption arrows” and “schematic, not measured binding geometry,” in illustration metadata.
- EN role-handover table includes Procurement at line 122; ZH lines 118–123 omit it. Add **采购 | 来源、含量基准、载体及杂质谱 | 避免仅凭相同主峰比较不同物料**. A section-count parity flag does not catch this omission.
- ZH opening heading claims that a solid supplement has one fewer dissolution difficulty; EN says only “physical form first.” Use **“应用：先确定剂型与物态” / “Applications: physical form first.”** A capsule still needs dissolution testing.
- ZH line 106 promises discussion of old authorization and current entries that the section does not actually deliver. Use **“质量与法规” / “Quality and regulation.”** Keep current-permission limitations in the body.
- ZH line 14 says these are not completed “本公司” formulas, implying a company identity absent from EN. Use **“这些是建议开展的开发试验，尚未验证为生产配方。”**
- Translate WO metadata labels in ZH: **“PCT国际申请公开文本（A1）”**, **“仅对美国指定的发明人兼申请人”**, and **“除美国外各指定国的申请人.”** Preserve legal entity names rather than inventing Chinese registered names.

Final humanizer assessment: the remaining biggest tells are repeated “not proof/not validated” contrasts, instructions accidentally rendered as content, and the more rhetorical Chinese headings. The final replacements above remove those patterns without removing safety content or manufacturing evidence limits.

## Source coverage and verification limits

- Independently validated both `article.json` files against their local schemas using `jsonschema`; both pass. Each has exactly three formulation plans and two patent-family records. I did not run the pack `validate.py` scripts because they can rewrite artifacts.
- Read both complete EN/ZH articles and structured plans. Section order is application-first in both; roles → process order → compatibility/quality is present within each plan. No supplied role-order specification requires a different sequence.
- Coverage is uneven by evidence type, not fraudulent: stevia's first two formulation plans have empty `sourceLinks` and are proposed engineering work; the tabletop plan has an actual patent composition precedent. Resveratrol's capsule uses regulatory/stability background; topical and reconstitution choices have patent precedents. None has finished-product clinical or stability results.
- The stored coverage reports (stevia EN 23%; resveratrol EN 35%) measure cited sentence fragments, not factual correctness. Chinese segmentation makes the stored ZH percentages especially uninformative. They do not establish bilingual semantic parity or claim-by-claim support.
- Stevia: retained Anton abstract only; longer trial full text; A1222 applicant dossier; A1268 official assessment; FDA import-alert material; two primary patent PDFs. Resveratrol: Turner and knotweed full texts; EFSA opinion; stability abstract only; primary WO PDFs/images. This mix is adequate for the qualified claims actually made, not a comprehensive clinical review or current authorization crosswalk.
- Priority for the PepsiCo application and the EP family-member chronology were not independently rechecked in an official prosecution register. The article already identifies the priority index source; retain that qualification. No live registry freshness claim is made by this review.
- Full-image inspection confirmed the WO bibliographic fields and claim 1 text. Small contact-sheet readings were not used for exact dates, identifiers or ratios. US PDF text has OCR spacing/column artifacts, but the cited cover fields, operative claim limitations and Example 8 quantities were readable and consistent with the retained claim extracts.

## Completion record

Created this review only in the rollout research directory. A separate citation ledger was created at `/data/hermes/cache/citations/d-independent-review.json`; no pack ledger was reset or edited. Final checks passed: all 75 files under `d/` match the captured hashes; citation verification returned `citations OK`, with all 12 cited sources carrying evidence quotes. The 16% sentence-fragment citation statistic includes substantial original editorial recommendations and is not a medical claim-coverage score. Remaining work is the parent editor's targeted corrections and final publication review, not a rebuild of either article.

## Sources

[1] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC7600789/fullTextXML — stevia-long
[2] https://pmc.ncbi.nlm.nih.gov/articles/PMC2900484 — stevia-clinical
[3] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC4626244/fullTextXML — Turner et al. 2015 full text
[4] https://patentimages.storage.googleapis.com/bd/56/75/1263269efe3ddf/US20140342043A1.pdf — USPTO published application US20140342043A1 primary PDF
[5] https://patentimages.storage.googleapis.com/a8/bc/9a/616811c76219fd/US11274328.pdf — USPTO granted patent US11274328B2 primary PDF
[6] https://patentimages.storage.googleapis.com/bd/08/cb/b0053cccc82778/WO2009129627A1.pdf
[7] https://patentimages.storage.googleapis.com/83/a2/11/343f9ebf0e6f19/WO2009012551A1.pdf
[8] https://www.bfr.bund.de/cm/343/efsa-opinion-on-the-safety-of-synthetic-resveratrol.pdf — efsa
[9] https://pubmed.ncbi.nlm.nih.gov/25864442 — stability
[10] https://www.foodstandards.gov.au/sites/default/files/food-standards-code/applications/Documents/A1222%20Application_Redacted.pdf — a1222
[11] https://www.foodstandards.gov.au/sites/default/files/2023-11/A1268%20Approval%20Report.pdf — a1268
[12] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC5760951/fullTextXML — knotweed

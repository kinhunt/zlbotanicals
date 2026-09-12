# Independent review D: stevia and resveratrol

Snapshot: PR27, `a27de3765b243dbe038d89551fec90ed104acc0e`; reviewed 2026-09-12. Repository: `/data/hermes/workspaces/zlbotanicals`. Read-only review; no repository edits, builds, publication or inquiry submissions.

## Verdicts

| Product | Scientific / claim boundary | Complete EN/ZH sales-page gate | Overall |
|---|---|---|---|
| stevia | PASS: composition, route, carrier and crude-leaf distinctions retained; no invented ZL assay or health promise found | BLOCK: hero and option table still read partly as instructions; missing named assay method; repeated internal caveats dilute the offer | BLOCK |
| resveratrol | PASS: trans/cis, polydatin, emodin and dispersion/clinical distinction retained; no invented ZL purity or efficacy found | BLOCK: “assay-led ingredient projects,” “extract comparison” and generic extraction language do not present a coherent product offer | BLOCK |

These are editorial release blocks under the requested **strong product page, not procurement tutorial** standard, not findings of fabricated COAs or unsafe numerical specifications. Do not solve them by copying competitor purity, certificates, origin, inventory or delivery claims. Existing high-level owner-confirmed pricing, quality, certification-document and delivery positioning can stay.

## What was actually checked

- Read the retained failed transcript `cache/delegation/live/deleg_f27f0a58/task-4.log` (76 lines), its citation ledger and retained stevia/resveratrol reader packs. The prior run failed before writing the requested final brief; its live source and artwork work was not discarded or represented as my new retrieval.
- Read actual sales source `src/data/extract-sales.ts`, especially lines 18–19; the complete shared `src/components/ExtractSales.astro`; current ingredient-local sources, plans and bilingual content in `src/data/ingredient-reader-packs.json`; and `docs/extract-sales-rollout.md`.
- Confirmed HEAD is the requested commit, with no diff in the inspected sales source/component. Existing generated HTML for all four EN/ZH product routes contains the sales template. Inspected its headings, body copy, source links and quote/sample/TDS URL values. Existing HTML is supplementary evidence, not a newly verified build.
- Independently decoded all six existing application images: each is 768 × 512 (3:2). Stevia: citrus-beverage, protein-drink, tabletop-sachet. Resveratrol: capsule, topical, reconstitution. No artwork change requested.
- Freshly fetched FDA, FSANZ A1268 and Howtian Chinese supplier text. Europe PMC returned 503 for both attempted resveratrol endpoints; the retained same-day full-text knotweed and stability-abstract evidence is explicitly used instead. The supplier extraction service failed, but direct HTTP recovered real Chinese product content.
- This is a complete source/text editorial check of the four pages, not a fresh browser, visual-layout, keyboard, form-delivery, certificate-validity or laboratory audit. Existing rollout test claims were read, not independently rerun.

## Source checks and usable boundaries

1. **Route is not molecular name.** The freshly read FSANZ report assesses specified enzyme processing aids for bioconversion of steviol glycosides. It supports separating processing-aid/route identity from the final glycoside, not asserting that every Reb M is directly extracted from leaves or that a ZL grade is approved everywhere.[1]
2. **Crude leaf is not the refined sweetener.** FDA's alert explicitly distinguishes conventional-food use of leaf/crude extract from highly purified glycosides and relevant GRAS-notice documentation. This is a US-specific distinction, not a global approval badge or a ZL certification.[2]
3. **A real sales model names materials before explaining diligence.** Howtian's Chinese page organizes leaf extracts, rare glycosides and blends as products, with named Reb A and other product entries. This supports the editorial recommendation to name forms and intended products. Its purity ranges, sweetness multipliers, cost savings, brands and manufacturing claims belong to Howtian, not ZL.[3]
4. **Polydatin conversion and impurity control are separate from trans assay.** The retained knotweed full text names polydatin and anthraquinones including emodin and describes conversion of polydatin into resveratrol. Its experimental final content over 73.8% and roughly fourfold increase are research outcomes, not ZL specifications or recovery promises.[4]
5. **Chromatographic identity matters.** The retained 2015 abstract reports HPLC/UPLC specificity while UV/VIS overestimated trans-resveratrol under tested unstable conditions. It supports naming a suitable chromatographic assay and separating stability/dispersion from potency. It is abstract-level evidence, not proof of clinical absorption or a universal pH cutoff.[5]

The prior supplier listing for Veri-te was read in the retained ledger but is not adopted as scientific or regulatory proof. Its >98%, “free from impurities,” EFSA/500 mg and clinical-count wording must not migrate into ZL copy. This review does not independently renew the EFSA synthetic-material opinion or establish a current worldwide regulatory crosswalk.

## Required exact-line edits: stevia

All strings below refer to `src/data/extract-sales.ts:18`; the file stores the entire product on one physical line. Quoted substrings identify the edit precisely. Replacements are recommended public copy, not edits already made.

### S1 — Product-led hero (BLOCK)

Original EN: “ZL Botanicals supplies stevia glycoside ingredients for reduced-sugar products. Set the Reb A, Reb D or Reb M profile around sweetness quality, dissolution and cost in use rather than a total assay alone.”

Original ZH: “振隆供应甜菊糖苷原料，服务减糖产品。围绕甜味表现、溶解性及使用成本确定 Reb A、Reb D 或 Reb M 组成，而非只看总含量。”

Diagnosis: first sentence is usable, but the main selling sentence tells the buyer how to select rather than describing the offer. “服务减糖产品” is compressed institutional Chinese.

Replace EN: “ZL Botanicals supplies stevia glycoside ingredients for reduced-sugar drinks, protein beverages and dry sweetener blends. Quotations cover the named glycoside profile, production route and carrier composition, with grade and sample options matched to your formula.”

Replace ZH: “振隆供应甜菊糖苷原料，用于减糖饮料、蛋白饮品及干粉甜味剂配方。报价列明糖苷组成、生产路线和载体成分，并按配方需求确认规格与样品选项。”

This offers composition-specific quotation without promising that every Reb A/D/M form is in stock or manufactured by ZL.

### S2 — Name options as materials (BLOCK)

Original EN / ZH: “Reb D / Reb M project” / “Reb D／Reb M 项目”.

Replace EN / ZH: “Reb D / Reb M glycoside options” / “Reb D／Reb M 糖苷选项”.

Retain the separate composition field “Production route and individual proportions declared” / “声明生产路线及单体比例”. Do not call all three rows leaf extracts. The existing enquiry-option scope remains necessary; a rare glycoside name alone does not establish manufacturing route.[1]

### S3 — Give the specification section an actual method (BLOCK)

Original EN: “Total steviol glycosides and individual Reb A/D/M values are separate fields. Carrier-containing blends use their own concentration basis.”

Original ZH: “总甜菊糖苷与 Reb A／D／M 单体含量分别列示；含载体复配粉采用自身浓度基准。”

Replace EN: “The requested specification lists total steviol glycosides, the individual glycoside profile and an HPLC method suited to that composition. The quotation identifies dry or as-is assay basis; blends also state the glycoside concentration and carrier or co-sweetener composition.”

Replace ZH: “需求规格分别列明总甜菊糖苷、单体糖苷组成及适用于该组成的 HPLC 方法。报价注明干基或原样含量基准；复配规格同时列明糖苷浓度及载体或其他甜味剂成分。”

This is a requested specification field, not a claim that a particular ZL batch passed HPLC. It follows the existing ingredient pack's analytical/composition distinction. Keep stevioside and other declared glycosides within method coverage rather than implying A/D/M are the entire total.

### S4 — Natural application language (polish; combine with S1–S3)

Original EN / ZH: “Sugar-bulk replacement requires separate recipe work.” / “替代糖的体积需另行调整配方。”

Replace EN: “When sugar is reduced, the formula also needs to account for body and dissolved solids.”

Replace ZH: “减糖后，配方还需兼顾口感厚度与可溶性固形物。”

The Chinese original makes bulk sound like a simple volume substitution. Preserve the separate warning against universal bitterness-free or sweetness-multiplier promises.

## Required exact-line edits: resveratrol

All strings below refer to `src/data/extract-sales.ts:19`.

### R1 — A molecule and usable formats, not an “assay-led project” (BLOCK)

Original EN: “ZL Botanicals supplies resveratrol for assay-led ingredient projects. Specify the trans isomer, source and impurity controls, then match powder handling or dispersion needs to your capsule or topical development.”

Original ZH: “振隆供应白藜芦醇，服务以含量为重点的原料项目。明确反式异构体、来源及杂质控制，再为胶囊或外用开发匹配粉体或分散需求。”

Replace EN: “ZL Botanicals supplies resveratrol for capsule blends and topical formulation development. Quotations identify trans-resveratrol content, source and impurity requirements; powder and carrier-based options are confirmed for the intended format.”

Replace ZH: “振隆供应白藜芦醇，用于胶囊混合粉及外用配方开发。报价列明反式白藜芦醇含量、来源与杂质要求，并按产品形态确认粉末或载体配制选项。”

No therapeutic, cosmetic-efficacy, enhanced-absorption or validated-ODM claim is introduced.

### R2 — Remove the tutorial object from the form table (BLOCK)

Original EN / ZH: “Knotweed-derived extract comparison” / “虎杖来源提取物对照”.

Replace EN / ZH: “Knotweed-derived extract option” / “虎杖来源提取物选项”.

Original application EN / ZH: “Separate botanical-extract qualification” / “单独确认植物提取物规格”.

Replace EN / ZH: “Botanical ingredient formulas” / “植物原料配方”.

Original EN / ZH: “Dispersion / carrier project” / “分散／载体项目”.

Replace EN / ZH: “Carrier-based formulation option” / “载体配制选项”.

Keep the composition and inquiry-scope fields. The second row is an extract option, not a claim that crude knotweed equals purified trans-resveratrol. Polydatin and source-specific emodin controls must remain explicit.[4]

### R3 — Source-neutral identity and concrete assay wording (BLOCK)

Original identity EN / ZH: “Trans-resveratrol · botanical source and purification route declared; knotweed-origin projects distinguished” / “反式白藜芦醇 · 声明植物来源及纯化路线，区分虎杖来源项目”.

Replace EN / ZH: “Trans-resveratrol · source, production route and purification specified by grade” / “反式白藜芦醇 · 按规格列明来源、生产路线及纯化信息”.

This avoids suggesting that the molecule or all potentially quoted grades are necessarily botanical, while not advertising confirmed synthetic or fermentation supply.

Original assay EN: “Trans-resveratrol by the agreed chromatographic method, with cis isomer, related substances and reporting basis defined. Polydatin is not free resveratrol.”

Original assay ZH: “按约定色谱方法测定反式白藜芦醇，明确顺式、相关物质及报告基准。虎杖苷不等于游离白藜芦醇。”

Replace EN: “The requested trans-resveratrol specification uses an agreed HPLC method that distinguishes cis isomer and relevant related substances, with dry or as-is basis stated. Polydatin is reported separately from free resveratrol.”

Replace ZH: “反式白藜芦醇需求规格采用约定的 HPLC 方法，区分顺式异构体及相关物质，并注明干基或原样基准。虎杖苷与游离白藜芦醇分别报告。”

The method is a quotation/acceptance requirement, not a fabricated measured result. Do not infer that naming HPLC alone proves method suitability.[4][5]

## Shared template edits affecting both pages

These are necessary to complete the product-first revision; scope changes to these two products if the parent does not authorize a shared rollout.

### C1 — Remove internal debate from the option introduction (BLOCK)

`src/components/ExtractSales.astro:37`

Original EN: “Use these material options to scope an enquiry. Available grades, concentrations and samples are confirmed for the project; extraction ratios and literature values are not published supply guarantees.”

Original ZH: “以下为询价选型范围，具体可供规格、浓度与样品按项目确认；不将提取比或文献数值直接作为商品承诺。”

Replace EN: “Product options for quotation are listed below. Available grades, concentrations and samples are confirmed with your quote.”

Replace ZH: “以下为可询价的产品选项。具体可供规格、浓度及样品随报价确认。”

The last original clause is an internal editorial rule. Keep it in evidence documentation instead of repeating it on the sales page. Retain the single batch-art caption and the application-concept scope note where they qualify the relevant objects.

### C2 — Do not append “native extract” to every molecule/route (BLOCK)

`src/components/ExtractSales.astro:44`

Original EN / ZH: “Declare native extract, carriers and processing aids.” / “明确原生提取物、载体和加工助剂。”

Replace EN / ZH: “State ingredient composition, source route, carriers and relevant processing aids.” / “列明原料组成、来源路线、载体及相关加工助剂。”

The original generic extract field is awkward for purified trans-resveratrol and non-leaf glycosides. This change is terminology, not a new certificate requirement.

### C3 — Shorten order terms without inventing delivery (editorial improvement)

`src/components/ExtractSales.astro:53`

Replace the sentence beginning “Sample quantity and cost…” / “样品数量与费用…” with:

EN: “Your written quotation includes sample quantity and cost, MOQ, pack size, storage conditions, shelf-life or retest basis, lead time, Incoterms and payment terms.”

ZH: “书面报价确认样品数量与费用、MOQ、包装单位、储存条件、保质或复验期限、交期、Incoterms 及付款条件。”

Remove the rhetorical ending about a blanket stock or delivery-day promise. The quote still does not claim stock or a fixed lead time.

### C4 — Technical reading must respect material route (BLOCK for these two pages)

`src/components/ExtractSales.astro:60`

Original generated EN: “Extraction, separation and drying choices for resveratrol depend on the target form.”

Original generated ZH: “白藜芦醇的提取、分离和干燥设备选择需匹配目标形态。”

For resveratrol replace EN / ZH: “Purification, particle handling and carrier preparation depend on source and product form.” / “纯化、粉体处理及载体配制取决于来源与产品形态。”

For stevia replace EN / ZH: “Leaf extraction, fermentation and enzyme conversion use different processing and purification steps.” / “叶提取、发酵及酶转化采用不同的加工与纯化步骤。”

Retain the existing note that the research does not establish ZL equipment ownership. Keep section IDs and ingredient-specific links. Label these two technical modules “Processing routes” / “生产路线” and “Processing equipment” / “加工设备”, rather than forcing every route under “Extraction processes” / “提取工艺”. Bioconversion is not direct leaf extraction.[1]

## Complete EN/ZH page check and acceptance criteria

| Module | Stevia EN/ZH | Resveratrol EN/ZH | Acceptance |
|---|---|---|---|
| SEO title / H1 | Present, localized commercial route | Present, molecule remains resveratrol | Keep canonical routes and matched science links; no new taxonomy |
| Hero / identity | BLOCK S1 | BLOCK R1/R3 | Product, intended format and quote basis before buyer instructions |
| Product forms | Leaf / rare glycoside / blend distinctions sound; S2/C1 | Powder / extract / carrier distinctions sound; R2/C1 | Material names, no “comparison” or generic “project” as the product |
| Specifications | No invented assay; add method/basis via S3 | No invented purity; explicit method/basis via R3 | Named analyte/method and basis; no borrowed 95/98/99% guarantee |
| Quality / contaminants | Distinct routes and crude-leaf exclusion present | Trans, polydatin and agreed emodin control present | Keep source/process-specific solvent, pesticide, microbial and elemental scope; no “impurity-free” claim |
| Why ZL | Four commercial benefits present | Same | Owner-confirmed high-level positioning only; no imported certificates or capacity |
| Documents | TDS/COA/SDS and certification inquiry links present | Same | Request links, not asserted downloads or verified certificates |
| Applications / imagery | Three correct plan IDs and 3:2 decoded files | Three correct plan IDs and 3:2 decoded files | Preserve originals and concept label; do not imply validated formula or clinical advantage |
| Price / MOQ / delivery | Covered, not quantified | Covered, not quantified | C3 shortens prose; no invented stock or lead time |
| FAQ | Total glycoside assay does not ensure taste | Resveratrol not grape-seed extract | Equivalent EN/ZH strength; samples/documents questions complete |
| Quote / sample CTA | Correct product and request query values in existing HTML | Same | Source inspection only; editable prefill and receipt not newly tested |
| Technical summaries / sources | Ingredient-specific sources and links; C4 | Ingredient-specific sources and links; C4 | Keep science secondary and route-correct; no imported research efficacy |

Suggested full-page order remains: product hero and quote/sample CTAs → material option matrix → requested specification and assay fields → price/quality/certification/delivery advantages → quality documents → three application concepts → order terms → ingredient-specific FAQ → closing quote CTA → concise matched technical reading and sources. No encyclopedia expansion or new procurement tutorial is needed.

Final anti-AI pass: the recurring problems are noun-heavy “project” language, imperatives where the offer should be, and repeated rebuttals of claims nobody has made. The replacements above remove those patterns while keeping one relevant limitation next to each material or proof object. Chinese replacements were checked independently for readable product language and do not make stronger supply or efficacy claims than English.

## Remaining gate

Apply S1–S3, R1–R3 and C1/C2/C4, preferably S4/C3 as well, then independently re-read all four generated pages and rerun the parent's existing verification suite. This report does not mark those changes complete or authorize merge. No batch purity, certificate or health claim needs to be added to satisfy the sales-page gate.

## Sources

[1] https://www.foodstandards.gov.au/sites/default/files/2023-11/A1268%20Approval%20Report.pdf
    > "Food Standards Australia New Zealand (FSANZ) has assessed an application made by
Manus Bio Inc. to amend the Australia New Zealand Food Standards Code to permit three
enzymes from genetically modified (GM) Escherichia coli strain K-12 as processing aids in
the manufacture (by bioconversion) of steviol glycosides."
[2] https://www.accessdata.fda.gov/cms_ia/importalert_119.html
    > "With regard to use in conventional foods, stevia leaf, or its crude extract, is not an approved food additive and is not considered GRAS due to inadequate toxicological information."
[3] https://howtiangroup.cn/product-sweeteners
    > "从叶片提取物到专有复配混合物和共处理解决方案，我们的 SoPure™ 甜菊糖甜味剂能带来卓越的口感、清洁标签的吸引力以及显著的成本节约。"
[4] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC5760951/fullTextXML
    > "Hydrolyzing is to transform polydatin to resveratrol to improve the yield of resveratrol. Eluting is to remove impurities including strong acidic and water-soluble compounds. By acid hydrolysis of glycoside (polydatin), the yield of resveratrol increased about 4-fold. The extraction recovery in different stages was high, and the content of resveratrol in the final product was over 73.8%."
    > "Its major constituents are stilbenes and anthraquinones such as polydatin, resveratrol ( Fig. 1 ), anthraglycoside B, emodin, physcion and chrysophanol  [2] ,  [3] ,  [4] ."
[5] https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:25864442%20AND%20SRC:MED&format=json&resultType=core
    > "Specificity was confirmed for HPLC and UPLC method, whereas UV/VIS spectroscopy resulted in false higher trans-RSV concentrations in conditions under which it was not stable (alkaline pH, light, increased temperature)."

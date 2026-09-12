# PR27 independent content review A

Review date: 2026-09-12. Commit inspected: `a27de3765b243dbe038d89551fec90ed104acc0e` in `/data/hermes/workspaces/zlbotanicals` (clean working tree). Scope: green tea, Centella asiatica and monk fruit, both languages. Repository read-only; no edits, builds, submissions or deployment.

## Decision

| Product | Scientific/material gate | Integrated sales-copy gate | Overall |
|---|---|---|---|
| Green tea | PASS: separates EGCG, catechins, polyphenols, caffeine and beverage performance | BLOCK: product offer still gives instructions; differentiation is generic and repeated technical summaries dominate the lower page | BLOCK, editorial |
| Centella asiatica | PASS: separates fractions, individual markers, glycosides/aglycones and prepared liquid; does not transfer clinical equivalence | BLOCK: offering is a cosmetic project brief rather than a clear supplier proposition; identical generic benefits | BLOCK, editorial |
| Monk fruit | PASS: separates Mogroside V, total mogrosides, carrier, residual sugars and fruit-matrix material | BLOCK: buyer-directed specification instructions and generic benefits; a few translations obscure the offer | BLOCK, editorial |

These are not requests for another certification audit or invented numeric SKUs. Owner-confirmed general price, quality, certification and delivery strengths are accepted at that scope. No fake certificate numbers, lowest-price claims, fixed delivery-day promises, batch results or clinical efficacy promises were found in the three active sales records/shared component. The blockers concern the requested sales-page standard, not a demonstrated false assay claim.

## What was actually inspected

The active content is `src/data/extract-sales.ts:9–11` and `src/components/ExtractSales.astro:13–60`, not the legacy product Markdown body. `src/pages/products/[slug].astro:24–33` and its Chinese equivalent select `ExtractSales` for these products; old Markdown is not the page body in that branch. The hero, forms, assay table, benefits, quality, three application cards, commercial terms, FAQ and technical reading were reviewed together in both languages.

Recovered the prior failed task log and its saved full supplier bodies in `research/product-sales-rollout-a-evidence/`. Four retained supplier documents already have literal supporting quotes; each quote was checked again against the saved text. No additional searches were needed. Prior search/scrape 403s and the agent timeout do not invalidate the subsequently recovered full bodies, but this review does not claim a fresh live fetch.

### Supplier evidence and boundaries

* Novanat's green-tea listing separately gives minimum polyphenols 98%, catechins 80%, EGCG 50%, and maximum caffeine 0.5%. This is concrete supplier vocabulary and a useful model for separate assay fields, not proof that ZL sells that grade.[1]
* Indena's product list specifies Centella selected triterpenes as asiaticoside 36–44% and genins 56–64%, the latter defined as the sum of asiatic and madecassic acids by HPLC. It demonstrates why a triterpene fraction must not be silently equated with a glycoside-only grade, a whole extract or a liquid preparation.[7]
* Novanat lists separate 50% Mogroside V (dry basis) and minimum 25% Mogroside V products. A V assay is a product-specific specification, not the percentage of total mogrosides or sweetness per gram of a carrier-containing blend.[8][9]

Do not import competitor limits, packaging, certification badges or commercial promises into ZL copy. Do not repeat Novanat's broad safety/zero-calorie promotional language. Use these pages to improve vocabulary and material separation. The existing nonnumeric ZL enquiry range can remain until specific grades are confirmed.

## Required shared corrections

Line references below are for this commit. The data file places an entire product on one line; use the quoted field as the exact replacement locator.

### 1. Make benefits product-specific without adding unsupported capabilities

`ExtractSales.astro:13–23,50`: all three pages receive the same four benefits. Original examples: “We coordinate quality requirements around agreed specifications and sample criteria…” / “围绕约定指标和样品标准协同质量要求…” and “Packaging, documents and shipping milestones are part of order planning…” / “把包装、文件和运输节点纳入订单沟通…”. These describe administration more than the product benefit.

Retain the four owner-confirmed themes, but render product-specific bodies from the sales record. Ready-to-use replacements are supplied in each product section below. No need to demand more proof of the general positioning already approved.

### 2. Replace the tutorial opening of the forms matrix

`ExtractSales.astro:37`, original EN: “Use these material options to scope an enquiry. Available grades, concentrations and samples are confirmed for the project; extraction ratios and literature values are not published supply guarantees.”

Original ZH: “以下为询价选型范围，具体可供规格、浓度与样品按项目确认；不将提取比或文献数值直接作为商品承诺。”

Replace EN: “Our quotation range covers the material forms below. We confirm the available grade, concentration and sample terms in your quotation.”

Replace ZH: “我们可按以下原料形态提供选型报价，具体可供规格、浓度及样品条件随报价确认。”

Keep this one availability qualification. It must not become an unqualified claim that every project form is stocked.

### 3. Reduce repeated technical and defensive prose

`ExtractSales.astro:60`: `dimensions.map(...)` repeats form composition, application and quality paragraphs already shown at lines 37–52 and adds generic equipment and evidence disclaimers. Replace the six full summaries with one compact ingredient-specific reading block: “Material forms & assay methods / 原料形态与检测方法” → `#components`; “Formulation combinations / 配方组合” → `#formulations`; “Quality & processing evidence / 质量与工艺依据” → `#standards` and `#processes`. Preserve existing anchor aliases if compatibility requires them.

Suggested intro EN: “Explore [ingredient] material forms, formulation combinations and the evidence behind processing and quality choices.”

ZH: “了解[原料]的形态区别、配方组合，以及工艺与质量选择的研究依据。”

The source links and a single evidence-scope note may remain. The public page should not repeatedly explain its own editorial boundary. This is the main shared fix needed to keep technical reading subordinate to the offer.

`ExtractSales.astro:53`, original EN ends “rather than replaced by a blanket stock or delivery-day promise”; original ZH ends “不以统一库存或固定天数代替订单安排”. Delete those argumentative endings; the preceding written-quotation sentence already states the terms accurately.

## Green tea: exact corrections and ready copy

### Hero, `extract-sales.ts:9`, `offer`

Original EN: “ZL Botanicals supplies green tea extract for tea beverages, instant blends and standardized ingredient projects. Match tea flavour and cold-water performance to your drink, or specify a catechin profile for a dry blend.”

Original ZH: “振隆供应绿茶提取物，服务茶饮、速溶粉及标准化原料项目。饮料侧重茶感与冷水表现，干粉配方可按儿茶素组成选型。”

Replace EN: “ZL Botanicals supplies green tea extract for ready-to-drink tea, instant tea powders and catechin-based dry blends. Our quotation range distinguishes flavour-led soluble extracts from catechin-oriented powders, with EGCG, caffeine and carrier composition stated for the selected grade.”

Replace ZH: “振隆供应适用于即饮茶、速溶茶粉及儿茶素型干混粉的绿茶提取物。选型报价区分风味型可溶提取物与儿茶素型粉末，并按所选规格列明 EGCG、咖啡因及载体组成。”

Retain the existing assay distinction. EN “State dry-basis or as-is values” is technically sound; a more supplier-led version is “The specification states whether values are on a dry or as-supplied basis.” / “规格注明含量按干基还是供应原样计算。”

### Product-specific benefit bodies

* Price — EN: “Competitive bulk pricing for flavour-led tea extracts and catechin-oriented powders, based on the composition and beverage performance your product needs.” ZH: “风味型茶提取物与儿茶素型粉末按成分及应用要求报价，以有竞争力的批量价格匹配产品需求。”
* Quality — EN: “Repeat-order specifications keep EGCG, caffeine and tea flavour requirements explicit, giving your team a consistent basis for incoming-material acceptance.” ZH: “复购规格明确 EGCG、咖啡因及茶感要求，为来料验收提供一致依据。”
* Certification — EN: “Tea-material qualification and certification-document support helps brands and manufacturers complete supplier onboarding.” ZH: “围绕茶原料提供资质与认证资料支持，帮助品牌商及制造企业完成供应商准入。”
* Delivery — EN: “Sample and bulk-order coordination keeps the selected tea grade, packaging and documents together in the written delivery plan.” ZH: “样品与批量订单协同安排，将所选茶原料规格、包装和文件纳入书面交付计划。”

FAQ answer can become EN: “We distinguish catechin enrichment from beverage clarity in the quotation, with flavour and caffeine requirements recorded for the selected sample.” ZH: “报价分别列明儿茶素组成与饮料澄清要求，并为所选样品记录茶感及咖啡因指标。” Keep the initial “No / 不是”.

## Centella: exact corrections and ready copy

### Hero, `extract-sales.ts:10`, `offer`

Original EN: “ZL Botanicals supplies Centella extract for cosmetic ingredient projects. Build a serum or cream around a defined triterpene composition, with colour, carrier and handling requirements included in the quotation.”

Original ZH: “振隆供应面向化妆品原料项目的积雪草提取物。精华或面霜可按明确的三萜组成选型，将色泽、载体和使用方式纳入报价。”

Replace EN: “ZL Botanicals supplies Centella asiatica extract for serums, creams and rinse-off masks. Our quotation range covers broad botanical extracts, triterpene-oriented fractions and prepared-liquid projects, with marker composition, colour and carrier matched to the cosmetic format.”

Replace ZH: “振隆供应面向精华、面霜及水洗面膜的积雪草提取物。选型报价涵盖常规植物提取物、三萜组分及液体原料项目，按化妆品形态匹配标志物组成、色泽和载体。”

Assay wording original: “Native extract concentration is distinct from the mass of a prepared liquid.” / “液体原料需区分原生提取物浓度与溶液总量。” This compares a concentration with a mass without explaining the reporting basis.

Replace EN: “For prepared liquids, state native-extract solids and each marker concentration in the supplied liquid; do not report a dry-extract assay as the liquid-product assay.”

Replace ZH: “液体原料分别列明供应液中的原生提取物固形物及各标志物浓度，不将干提取物含量直接当作液体商品含量。”

### Product-specific benefit bodies

* Price — EN: “Competitive pricing across the Centella quotation range lets cosmetic teams budget for the marker profile and appearance their formula needs.” ZH: “积雪草选型范围提供有竞争力的报价，让化妆品团队按配方所需的标志物组成与外观安排原料预算。”
* Quality — EN: “Defined triterpene, colour and carrier requirements give repeat orders a clear acceptance basis for the selected cosmetic ingredient.” ZH: “明确三萜、色泽和载体要求，为所选化妆品原料的持续采购建立清晰验收依据。”
* Certification — EN: “Material-specific qualification and certification-document support helps cosmetic brands and manufacturers review the selected Centella ingredient.” ZH: “按原料提供资质与认证资料支持，帮助化妆品品牌及制造企业审核所选积雪草原料。”
* Delivery — EN: “Coordinated sample and order terms keep the selected powder or liquid form, packaging and documentation in the delivery plan.” ZH: “协同确认样品与订单条件，将所选粉体或液体形态、包装和文件纳入交付计划。”

Keep the clinical-equivalence and oral-suitability boundaries, preferably once in the appropriate quality/application section. Do not turn the Indena fraction or EMA medicinal material into a claim for ZL cosmetic efficacy.

## Monk fruit: exact corrections and ready copy

### Hero, `extract-sales.ts:11`, `offer`

Original EN: “ZL Botanicals supplies monk fruit extract for sweetener and flavour projects. Specify Mogroside V, fruit character and carrier composition to build a reduced-sugar formula without overlooking taste or bulk.”

Original ZH: “振隆供应面向甜味剂及风味项目的罗汉果提取物。围绕罗汉果甜苷 V、果味与载体选型，让减糖配方同时兼顾口感和体积。”

Replace EN: “ZL Botanicals supplies monk fruit extract for reduced-sugar drinks, dairy desserts and dry mixes. Our quotation range separates fruit-flavour extracts from Mogroside V-oriented sweetener ingredients and blend projects, with residual sugars and carriers stated separately.”

Replace ZH: “振隆供应用于减糖饮料、乳品甜品及干混粉的罗汉果提取物。选型报价区分果味型提取物、罗汉果甜苷 V 型甜味原料及复配项目，并分别列明残留糖与载体。”

Original form use “Tabletop or dry-mix formats” / “桌面甜味剂或干混粉”: replace Chinese with “餐桌用甜味剂或干混粉”. “桌面” sounds like furniture/software, not a tabletop sweetener.

Original application ZH: “甜度可替代部分糖的甜味，但不能替代糖的体积；饮料后味、乳品质构和饼干结构需分别试验。”

Replace ZH: “罗汉果提取物可替代部分蔗糖的甜味，但不能补足蔗糖提供的固形物和结构；饮料后味、乳品质构及饼干结构需分别评价。”

Corresponding EN: “Monk fruit extract can replace part of sucrose's sweetness, but not the solids and structure sucrose contributes. Beverage aftertaste, dairy texture and cookie structure need separate evaluation.”

### Product-specific benefit bodies

* Price — EN: “Competitive bulk quotations distinguish the Mogroside V extract from the complete sweetener blend, so the price corresponds to the composition you receive.” ZH: “有竞争力的批量报价区分罗汉果甜苷 V 提取物与完整复配甜味剂，让价格对应实际供应组成。”
* Quality — EN: “Separate V, residual-sugar and carrier requirements give repeat orders a consistent composition-based acceptance standard.” ZH: “分别约定甜苷 V、残留糖及载体要求，为复购提供一致的成分验收标准。”
* Certification — EN: “Material- and market-specific documentation support helps buyers assess the chosen extract without confusing refined sweetener material with a fruit decoction.” ZH: “按原料及市场提供资料支持，帮助采购方审核所选提取物，避免将精制甜味原料与果实水煎液混同。”
* Delivery — EN: “Sample and bulk-order coordination connects the selected extract or blend with agreed packaging, documents and delivery terms.” ZH: “协同安排样品与批量订单，为所选提取物或复配原料明确包装、文件及交付条件。”

Do not add universal zero-calorie, diabetic-safe or worldwide food-permission claims. Existing market/material scope wording is appropriately limited.

## Scientific links and nine application plans

Code-level mapping PASS. `ExtractSales.astro:10,40,52,60` builds each ingredient's own localized encyclopedia URL. `IngredientRollout.astro:18–29` emits the corresponding section and `formulation-${plan.id}` anchors from the same reader pack. Both languages share IDs but use their own titles/content. `IngredientRollout.astro:26` links quality discussion back to the same product's `#qualification`.

| Ingredient | Exact plan anchors on `/[zh/]plant-extracts/ingredients/{id}` | Match assessment |
|---|---|---|
| green-tea | `#formulation-citrus-tea`, `#formulation-oat-latte`, `#formulation-instant-tea` | Beverage-grade extract, flavour-led extract/leaf-powder alternative, soluble powder respectively. The latte pack explicitly distinguishes leaf powder from soluble extract; it does not require ZL to sell matcha. |
| centella-asiatica | `#formulation-hydrating-serum`, `#formulation-lipid-cream`, `#formulation-washable-gel` | Water/glycol serum, characterized fraction in cream, broad liquid extract in rinse-off gel. No switch to oral products or wound-treatment promise. |
| monk-fruit | `#formulation-citrus-sparkling`, `#formulation-cultured-dessert`, `#formulation-oat-cookie` | Sweetness, taste and physical sugar-replacement distinctions agree with the sales record. No claim that V replaces sugar bulk. |

All nine referenced WebP files exist; actual decoded sizes are 768 × 512 (3:2), matching metadata. This recovery did not independently visually inspect the images or render the pages; decoded dimensions are not visual or browser verification.

Selected scientific source IDs resolve in each actual reader pack: green tea 18/25, Centella 4/19, monk fruit 20/26. These numbers are local pack IDs, not this report's citation IDs. Retained source bodies 18,19,20,25,26 were inspected: green-tea extraction study is explicitly a tea-waste extraction study, not a ZL release test; EFSA green-tea text includes concentrated-EGCG safety and protein interactions; Centella extraction text separates four triterpenoid markers; monk-fruit material assessment and decoction decision are not interchangeable permissions. The current sales wording does not transfer these studies into clinical or batch-quality claims.

The EMA Centella URL/title mapping was checked in the actual pack, but `encyclopedia-rollout/a/sources/4.txt` was not present at the expected retained path. This review therefore does not claim a fresh full-text verification of EMA or a complete re-audit of every linked patent. Plan material matching and link generation were verified from source; live HTTP response status, rendered fragment navigation, downloads, form delivery and browser layout were not tested.

## Acceptance after correction

Release the three pages when the shared repeated dossier is compressed, each hero is supplier-led, each benefits block refers to that ingredient, and the specific Centella reporting-basis/monk-fruit translation edits above are applied. Keep forms qualified as quotation scope unless actual availability is confirmed. Preserve original artwork and the nine matched scientific plans. A browser reviewer still needs to verify visible composition, image labels and fragment navigation; this report is not a build or deployment approval.

## Sources

[1] https://www.novanat.com/sale-35722693-green-tea-extract-98-tea-polyphenols-80-catechins-50-egcg-decaffeinated.html
    > "NLT 98%Polyphenols NLT80%Catechins EGC DL-C EC NLT50%EGCG GCG ECG NMT0.5%Caf"
[7] https://www.indena.com/indena_files/2025/10/plist_pharma.pdf
    > "≥36.0% ≤44.0% of asiaticoside, ≥56.0% ≤64.0% of genins
as sum of asiatic acid and madecassic acid by HPLC"
[8] https://www.novanat.com/sale-36188904-luo-han-guo-extract-powder-50-mogroside-v-natural-sweetener-water-soluble-clean-label-allergen-free.html
    > "Specification: Mogroside V ≥ 50% (On Dried Basis)"
[9] https://www.novanat.com/sale-14313398-monk-fruit-extract-powder-25-mogroside-v-natural-sweetener-clean-label-water-soluble.html
    > "Assay NLT 25%Mogroside V"

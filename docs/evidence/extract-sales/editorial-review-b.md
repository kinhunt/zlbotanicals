# Independent review B: PR27 ingredient sales copy

Reviewed 2026-09-12 at `a27de3765b243dbe038d89551fec90ed104acc0e` in `/data/hermes/workspaces/zlbotanicals`.

## Decision

| Ingredient | EN/ZH claim gate | Buyer-interest gate | Required correction before merge |
|---|---|---|---|
| ginseng | PASS | PASS, with wording improvements below | None |
| reishi-mushroom | PASS | PASS, with a weak hero and assay-detail opportunity | None |
| ginkgo-biloba | PASS | PASS, with clearer 24/6 wording recommended | None |

No BLOCK-level error found in these three integrated commercial pages. This is a scoped content review, not approval of every product, market authorization, batch specification, certification or the full PR. Suggested replacements below are editorial improvements, not evidence that the present safety boundaries fail.

## What was inspected and verified

- Read the actual bilingual records in `src/data/extract-sales.ts:12–14`, their shared rendering in `src/components/ExtractSales.astro`, content governance, the owner-confirmation scope recorded in `docs/extract-sales-rollout.md`, and matching ingredient reader-pack source/application mappings.
- Read all six existing `dist/{zh/,}products/{id}/index.html` sales bodies, not just the old Markdown content. Their offers, identities, matrices, FAQs, concept captions and scope statements match the inspected source. Existing dist is corroborating integrated output, not a fresh build or independent reproducibility proof.
- Static DOM checks found all six ingredient sales roots, localized purchasing titles and certificate-scope notes. All 18 application links resolve to existing, ingredient-specific `#formulation-*` IDs in local science HTML. Details: `product-sales-b-render-checks.json`.
- The three pages retain price/sample/document CTAs, three concrete application cards, explicit quote-based MOQ/packing/delivery terms, and separate technical reading. They are sales pages rather than clinical encyclopedias, although repeated assay text and generic specification instructions could be shortened.
- No repository edits, installs, builds, browser sessions, form submissions or release actions were performed. Repository status was clean at the initial check. No visual-layout or image-pixel pass is claimed here.

## 1. Ginseng: PASS

### Material and claim findings

The offer identifies **Panax ginseng root**, distinguishes white dry-root and steam-processed red-ginseng material, and treats concentrates as projects with solids/carrier/marker concentration defined. This is consistent with the EMA's distinction between dried white root and steamed-then-dried red root.[7]

The current assay sentence is sound: “Named ginsenosides by an agreed chromatographic method; a total-saponin colour assay is not the same quantity.” Chinese preserves the distinction: “采用约定色谱方法测定指定人参皂苷；总皂苷比色值不是同一指标。” A retrieved supplier table separately advertises root/red-root HPLC grades and leaf/stem UV-VIS grades; those are method- and material-specific offers, not interchangeable purity figures and not ZL specifications.[1]

The integrated page does not promise a numerical saponin grade, root age, universal food eligibility or an adaptogenic/energy clinical outcome. Food use and population review appears beside the citrus-drink, ginger-sachet and capsule concepts. Species/part and processing history remain explicit. Keep these boundaries.

### Buyer interest and exact optional replacements

Buyer priority: distinguish a root-derived HPLC-defined purchase from a cheaper, differently tested or different-part material; obtain powder or concentrate suitable for the intended process. Supplier vocabulary supports HPLC/ginsenoside intent, but does not establish search volume or ZL stock.[1]

**Location:** `extract-sales.ts:12`, `offer`, second sentence.

Current EN: “Define white or red ginseng processing and the required ginsenoside profile for a specification that fits your product.”

Replace EN: “We match white- or red-ginseng processing and the ginsenoside profile to your powder, capsule or liquid project.”

Current ZH: “明确白参或红参加工方式与人参皂苷组成，为产品匹配规格。”

Replace ZH: “我们按粉剂、胶囊或液体项目，匹配白参或红参加工方式及人参皂苷组成。”

This makes the supplier the actor without inventing an assay or manufacturing capability.

**Location:** `assay`; optional clearer purchasing wording, not a mandatory method change.

EN: “Specify the named ginsenosides and their sum using an agreed chromatographic method, such as HPLC. Report the plant part, processing history and dry-basis or as-is result. A total-saponin colour assay is a separate specification.”

ZH: “指定人参皂苷单体及其总量采用约定色谱方法（如 HPLC），并注明部位、加工史及干基或原样基准。总皂苷比色值另列，不与色谱结果混用。”

## 2. Reishi mushroom: PASS

### Material and claim findings

The current copy separates beta-glucans from total polysaccharides, requires separate triterpenoid methods, records species/fungal part/substrate/carrier and declines to equate tissue powder, mycelium or spores with extract. Its FAQ correctly rejects a high total-polysaccharide value as proof of beta-glucan content. The primary method abstract measures total glucan and alpha-glucan-related contributions separately, then determines beta-glucan by difference; it also reports method-dependent results for some Ganoderma samples.[8]

Market examples illustrate why the distinction matters: Nammex advertises a beta-glucan-defined reishi extract, whereas Mycotrition advertises polysaccharide standardization. Neither supplier's percentage or certificate transfers to ZL.[2][3]

The cocoa/oat and yogurt entries are labeled development concepts; food eligibility is explicitly material- and market-specific. The cocoa/oat-versus-clear-drink statement is a formulation hypothesis requiring sample trials, not a verified ZL sensory result. No sleep, immunity, antitumour or all-food promise appears in the inspected sales body.

### Buyer interest and exact optional replacements

Buyer priority: a specified fungal identity and part, defensible beta-glucan result, separate triterpenoid target, and acceptable bitterness/sediment in the chosen format. Avoid using “defined fungal-ingredient projects” as the main sales benefit.

**Location:** `extract-sales.ts:13`, complete `offer`.

Current EN: “ZL Botanicals supplies reishi extract for defined fungal-ingredient projects. Separate polysaccharide-oriented and triterpenoid-oriented requirements, with species, fruiting body or mycelium identity included from the first quote.”

Replace EN: “ZL Botanicals supplies reishi extract for capsule, powder-blend and selected drink projects. We match water-extract or triterpenoid-oriented options to your formulation, with species, fungal part and beta-glucan requirements stated separately in the quote.”

Current ZH: “振隆供应灵芝提取物，服务身份明确的真菌原料项目。多糖型与三萜型需求分别选型，首轮报价即纳入物种、子实体或菌丝体身份。”

Replace ZH: “振隆供应灵芝提取物，服务胶囊、干混粉及特定饮品项目。我们按配方匹配水提或三萜型选项，报价分别列明物种、真菌部位及 β-葡聚糖要求。”

Retain the existing market/material food-use note beside the application cards.

**Location:** `assay`; make the method request explicit without asserting ZL already uses a particular laboratory protocol.

EN: “Specify beta-glucan content with an agreed mushroom-method version and dry-basis or as-is result. Report alpha-glucans and relevant starch controls separately; total polysaccharides are not a substitute. Triterpenoids need their own assay method and basis.”

ZH: “β-葡聚糖含量须约定适用于蘑菇原料的方法版本及干基或原样基准。α-葡聚糖与相关淀粉控制另列，总多糖不能替代 β-葡聚糖指标；三萜另行约定检测方法及基准。”

**Citation improvement:** the sales record currently selects reader-pack source IDs `15,28`. Add existing reishi-local source `23` for the glucan-method distinction, i.e. `sources:[15,23,28]`. This is source discoverability, not a newly discovered false claim. Source 23 resolves to the same primary-method abstract as report citation [8]. Do not confuse these two citation namespaces.

## 3. Ginkgo biloba: PASS

### Material and claim findings

The page identifies **leaf, not seed**, distinguishes refined extract from leaf powder and carrier-containing preparations, and includes flavonoid glycosides, ginkgolides, bilobalide, ginkgolic-acid control and chromatographic authenticity. This matches the retrieved quality study's separate constituent-group methods and concern about adulterated supplement materials.[9]

The current “24/6 purchasing target” is expressly not a published ZL release specification or clinical-equivalence claim. A supplier does advertise 24% flavone glycosides/6% terpene lactones with ginkgolic-acid control, but that advertisement establishes only that supplier's offer.[10]

The application paragraph and FAQ explicitly reject ordinary beverage permission; the suspension card itself says “Measured oral suspension, not a beverage” / “定量口服混悬液，不作为普通饮料”. Capsule/tablet/suspension illustrations therefore do not silently override the stated restriction. EMA medicinal preparation information is not a universal food authorization.[4]

Drug interactions, bleeding risk and population review are retained. NCCIH specifically warns of bleeding risk with anticoagulants and other drug interactions; the live source was fetched once during this recovery to verify that part of the copy.[11]

### Buyer interest and exact optional replacements

Buyer priority: a refined-leaf grade with defined flavonoid and terpene-lactone groups, impurity/authenticity controls, usable dosage-form handling and a market-specific documentation route. The offer should name the likely dosage formats instead of “qualified ingredient projects”.

**Location:** `extract-sales.ts:14`, first `offer` sentence.

Current EN: “ZL Botanicals supplies ginkgo leaf extract for qualified ingredient projects.”

Replace EN: “ZL Botanicals supplies ginkgo leaf extract for capsule and tablet development, subject to material and target-market qualification.”

Current ZH: “振隆供应银杏叶提取物，服务经用途评估的原料项目。”

Replace ZH: “振隆供应面向胶囊及片剂开发的银杏叶提取物，按具体原料及目标市场确认用途。”

**Location:** `assay`, second sentence. Current wording is safe but unexplained shorthand makes the useful commercial detail harder to read.

Current EN: “A 24/6 purchasing target is a constituent-group brief, not our published release limit or a clinical-equivalence claim.”

Replace EN: “For a 24/6 enquiry, specify 24% flavonoid glycosides and 6% terpene lactones, with the analytical methods, reporting basis and ginkgolic-acid limit. We confirm the available grade in the written quote; this target does not establish clinical equivalence.”

Current ZH: “24/6 采购目标只是成分组分要求，不是本页公布的放行限值或临床等同性声明。”

Replace ZH: “询价采用 24/6 目标时，请列明 24% 黄酮苷、6% 萜内酯，以及检测方法、报告基准和银杏酸限值。具体可供规格以书面报价确认，该目标不代表临床等同性。”

Do not add an unconditional “≤5 ppm”, pharmacopoeial-compliance label, FDA approval or beverage application merely because it appears in another supplier's copy. No ZL-approved limit or current product authorization was verified here.

## Shared commercial/certification boundary

`ExtractSales.astro:37` describes forms as enquiry options, not available inventory. Lines 51 and 57 require project-specific document coordination and review of holder/site/scope/validity; GMP, ISO, Halal, Kosher and organic are buyer requirements, expressly not blanket product certifications. Lines 53 and 56 defer sample quantity/cost, MOQ, packaging and delivery to written terms. These are appropriate boundaries, not false all-food or certification promises.

The high-level price, quality, document-support and delivery positioning is supported internally by the recorded owner authorization in `docs/extract-sales-rollout.md:7`, not by independently verified certificates or factory records. No numeric pricing advantage, certificate ID, stock promise or manufacturing-site claim should be added from this report.

Optional bilingual consistency refinement at `ExtractSales.astro:29`: change the Chinese phrase “稳定品质” to “稳定品质承诺” to mirror English “consistent-quality commitments”. Existing surrounding agreed-specification language makes this a non-blocking precision improvement.

## Recovery provenance and limits

Reused the failed run's actual transcript `/data/hermes/cache/delegation/live/deleg_f27f0a58/task-2.log`, saved source files `product-sales-b-source-{1–10}.txt` and existing quote-checked `product-sales-b-citations.json`. That run had a Firecrawl search 403, Google challenge and a later successful ginkgo supplier search; it failed at the agent/API layer after retaining evidence. This recovery did not pretend those failed searches were successful, repeat broad searches, or invent competitive data. Supplier observations describe vocabulary and offers, not search rankings, sales volumes or product eligibility.

One new NCCIH retrieval was needed for current ginkgo safety wording; its exact safety excerpt is saved as `product-sales-b-source-11.txt`. The primary glucan and ginkgo-quality sources are abstracts, not claimed as full-paper reviews. Citation evidence is mechanically verified; ingredient-local website source numbers remain distinct from this report's recovered ledger IDs.

## Sources

[1] https://www.puronature.com/products/ginseng-extract — Panax Ginseng Extract - Xi'an PuroNature Biotechnology Co.,Ltd
    > "Ginseng Root Extract | 3%~15% | Ginsenosides | HPLC"
[2] https://www.nammex.com/organic-mushroom-extracts/reishi-mushroom-extract
    > "Nammex Reishi mushroom is processed by hot water extraction into a fine powder suitable for encapsulation or beverages. Our higher value extract is also extracted with alcohol. Fungal Part Mushroom; cultivated Beta (1-3),(1-6)-Glucans 40% Triterpenoids Present Request a Sample Reishi Mushroom History Reishi mushroom has been revered in China for thousands of years. It is depicted in many Chinese works of art and is utilized in Traditional Chinese Medicine. Today it is widely cultivated using a method of wood log cultivation in shade houses. Scientific research into the compounds responsible for Reishi mushroom activity began in the 1970’s in"
[3] https://www.mycotrition.com/medicinal-mushrooms/reishi — Reishi extract, powder and capsules for companies
    > "We standardize the polysaccharide content of the extracts at 30%. Powder: Grinding mushroom fruiting bodies, metal detection. Capsules: Weighing of the raw materials (powder or extract), mixing of the raw materials, encapsulation, cleaning of capsules. Shelf life and storage conditions For extracts and powders: 4 years when properly stored: at room temperature or lower, in a tightly closed package"
[4] https://www.ema.europa.eu/en/medicines/herbal/ginkgo-folium — Ginkgo folium - herbal medicinal product | European Medicines Agency (EMA)
    > "This summary covers ginkgo leaf medicines containing a specific herbal preparation made by powdering the dried leaf or as dry extract. The dry extract is prepared using a technique to extract compounds from plant material by dissolving them in acetone which is then evaporated to obtain the dry extract.

Ginkgo leaf medicines containing these preparations are usually available in liquid and solid forms to be taken by mouth.

These ginkgo leaf preparations can also be found in combination with other herbal substances in some herbal medicines. These combinations are not covered in this summary.

### What are the HMPC conclusions on its medicinal"
[7] https://www.ema.europa.eu/en/medicines/herbal/ginseng-radix
    > "Medicinal products with Ginseng contain the underground part of the plant dried (known as white ginseng) or treated first with steam and then dried (known as red ginseng). They are comminuted (reducing into tiny pieces) or powered, or prepared as liquid, soft dry or extracts. Extracts are obtained by putting the plant material in a solvent (such as ethanol or methanol) to dissolve compounds and form a liquid extract. The solvent is then partially or completely evaporated to obtain a soft or a dry extract. Herbal medicines containing these Ginseng root preparations are usually available as herbal tea to be drunk, or as liquid or solid forms to"
[8] https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:26957216&format=json&resultType=core — Measurement of β-Glucan in Mushrooms and Mycelial Products.
    > "A robust and reliable method has been developed for the measurement of β-glucan in mushroom and mycelial products. Total glucan (plus free glucose and glucose from sucrose) was measured using controlled acid hydrolysis with H2SO4 and the glucose released specifically was measured using glucose oxidase/peroxidase reagent. α-Glucan (starch/glycogen) plus free glucose and glucose from sucrose were specifically measured after hydrolysis of starch/glycogen to glucose with glucoamylase and sucrose to glucose plus fructose with invertase and the glucose specifically measured with GOPOD reagent. β-Glucan was determined by the difference. Several acid"
[9] https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:29506293&format=json&resultType=core — Ginkgo biloba Food Supplements on the European Market - Adulteration Patterns Revealed by Quality Control of Selected Samples.
    > "Pharmacopoeial Ginkgo dry extract contains 22.0 - 27.0% flavonoids and 5.4 - 6.6% terpene lactones (ginkgolides, bilobalide). In addition to its widespread use as an herbal medicine (herbal medicinal product), the same extract can be an ingredient in food supplements. The content of active secondary metabolites was quantified in a number of European food supplements containing Ginkgo dry extract or Ginkgo leaf. Flavonoids were quantified using a modified pharmacopoeial HPLC-UV method, and terpene lactones (ginkgolides A, B, C, and bilobalide) using LC-MS/MS. Some Ginkgo leaf supplement samples were also analysed by microscopy. The quality of"
[10] https://www.huisongpharm.com/ginkgo-biloba-extract-product
    > "24% flavone glycosides and 6% ter p ene lactones by HPLC , with strict quality controls ensuring ginkgolic acid remains below 5ppm. Renowned for its consistent quality and performance, it complies with international p harmaco p eial and food-grade standards, including CP, EP, and USP , and is also registered with the Korean MFDS . This makes it an excellent choice for dietary su pp lements, p harm"
[11] https://www.nccih.nih.gov/health/ginkgo — Ginkgo: Usefulness and Safety
    > "Ginkgo may increase the risk of bleeding in people who are taking anticoagulant drugs, such as warfarin. Ginkgo may also interact with other drugs."

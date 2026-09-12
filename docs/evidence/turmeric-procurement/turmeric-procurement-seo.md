# Turmeric procurement SEO — research before editing

**Retrieved:** 2026-09-12 UTC. **Scope:** read-only route/content inspection, actual Chinese/English searches, competitor procurement-page comparison and recommendations. No website edits, build, deployment, form submission or sales inquiry. Independent audience analysis is a separate parallel task.

## 1. Route finding: change the turmeric commercial page, not the category

Direct public-origin HTTP retrieval returned 200, meaningful page bodies and self-canonicals for all five routes below. The initial www-domain `web_extract` attempts failed at the Firecrawl service; direct requests to canonical `https://zlbotanicals.com` recovered current HTML. This is HTML/content verification, not rendered visual QA.

| Role | Actual route | Observed title / H1 | Decision |
|---|---|---|---|
| Multi-ingredient commercial category | `/products/botanical-extracts` | Botanical Extracts / Botanical Extracts | Preserve category scope and URL; its turmeric card links to `/products/turmeric`.[1] |
| EN commercial turmeric | `/products/turmeric` | Turmeric Extract / Turmeric Extract | This is the procurement page to optimize.[2] |
| ZH commercial turmeric | `/zh/products/turmeric` | 姜黄提取物 / 姜黄提取物 | Use procurement-specific title/H1 here.[3] |
| EN encyclopedia | `/plant-extracts/ingredients/turmeric` | Turmeric extract: forms, processing and quality / Turmeric Extract | Preserve plain ingredient identity and distinct informational intent.[4] |
| ZH encyclopedia | `/zh/plant-extracts/ingredients/turmeric` | 姜黄提取物：形态、工艺与质量 / 姜黄提取物 | Preserve plain-name H1; do not add 采购 to the encyclopedia.[5] |

Read-only repository HEAD: `48a594e89f4e4ef5e50536c9ac10c62322b0bc87`; git status was clean at inspection. Router evidence: `src/pages/products/[slug].astro` generates per-product slugs from the collection and currently binds both `title` and `heroTitle` to `product.data.name`; the ZH equivalent does the same. `src/pages/products/botanical-extracts.astro` enumerates the collection rather than rendering turmeric article content. Both turmeric Markdown files have the plain product name. `src/data/ingredient-knowledge.json` separately fixes the knowledge canonical. Snapshot saved in the evidence directory.

**Menu nuance:** the user's latest message explicitly requests preserving the procurement menu wording, but the inspected live header contains the category label **植物提取物**, not a turmeric-specific **姜黄提取物采购** item. Do not misreport that requested wording as already present. Preserve the category menu and Research → 原料; any ingredient-specific commercial label retained or introduced should read **姜黄提取物采购** and target `/zh/products/turmeric`, not the multi-product category. This is a scope recommendation, not authorization to add a new navigation branch.[3][5]

## 2. Search record and intent evidence

Five exact queries were issued through `web_search`. Its successful payloads do not identify a stable search engine or country, so these are **tool-returned result samples, not Google/Baidu local rankings**. Language was Chinese or English; no target-country override was available. No search-volume, difficulty, traffic or conversion estimates were obtained or invented. Position fields in the raw ledger are response ordering only.

| Actual query | Result / observed types | Implication |
|---|---|---|
| 姜黄提取物采购 | Successful five-result sample: ZL's latte-procurement article, a white-label liquid product, ChemicalBook ingredient/directory material, TRG and Ningbo supplier pages. Raw snippets are in `search-1.json`; supplier pages inspected below. | Intent is mixed but contains real ingredient sourcing. Keep the general procurement page distinct from the narrower latte application article; do not infer that one returned ZL result means a verified search ranking. |
| 姜黄素采购 | **Blocked/unusable, not zero demand.** Repeated web-tool failures: Exa response-shape errors and Firecrawl 403. Google browser showed unusual traffic; Bing title matched but body returned unrelated financial-services/AI results, rejected. Quoted variant also failed. | No valid exact-query SERP inference. Treat this as a related vocabulary candidate, not an independently validated ranking opportunity. |
| 姜黄提取物供应商 | Successful five-result sample: YTBIO and ACE commercial pages, business directories and another raw-material supplier. Raw record `search-3.json`. | Supplier intent calls for an identifiable offer and commercial process, not another effects encyclopedia. The inspected YTBIO page explicitly excludes individual customers.[11] |
| turmeric extract supplier | Initial service failure; retry returned Huisong, Arjuna Natural, Jeeva Organic, Mane Kancor and a company database. Raw record `retry-en.json`. | Supplier/manufacturer and product-specification pages feature prominently in this sample; do not claim ZL is a manufacturer solely to match this vocabulary. |
| turmeric extract bulk procurement | Successful sample: Valeherb product page, Tridge procurement article, an organic-powder buyer guide, and two marketplace pages mixing spice/finished products. Raw record `search-5.json`. | Use bulk sourcing/procurement naturally; distinguish industrial extract from whole rhizomes, culinary powder and retail supplements. |

The successful supplier pages expose more precise wording than the head terms alone: TRG names **总姜黄素95%（HPLC）**; Ningbo distinguishes powder/granules, extraction solvents and three-peak total content; Huisong lists **20–95% Total Curcuminoids HPLC** and multiple physical formats. These are competitor self-published specifications, not ZL SKU evidence.[9][10][21]

Recommended intent map (editorial judgment):
- **Primary ZH:** 姜黄提取物采购 → existing commercial turmeric URL.
- **Secondary ZH:** 姜黄提取物供应商; 姜黄素采购 as a related candidate with exact-query retrieval limitation; 总姜黄素、HPLC、样品、COA as buyer-answer vocabulary, not separate near-duplicate landing pages.
- **Primary EN:** turmeric extract procurement / turmeric extract sourcing. **Secondary:** turmeric extract supplier, bulk turmeric extract, total curcuminoids specifications. Do not title ZL “manufacturer,” “in stock,” “95% supplier” or “organic certified” without evidence.
- **Informational:** 姜黄提取物 / Turmeric Extract, material forms, processes, applications, standards and research → existing encyclopedia, not a new duplicate.

## 3. What competing procurement pages actually answer

All observations below concern inspected page text on the retrieval date. They establish **what sellers publish**, not independent verification of stock, qualifications, assay, performance or shipment promises. “Not found” means not in the inspected text, not absent from the company or whole site. Packaging size is not automatically MOQ.

| Seller/page | Identity, specification and form | MOQ / delivery | CoA / samples / buyer route | Useful pattern and limitation |
|---|---|---|---|---|
| TRG / 汉中天然谷 | Dried rhizome; total curcuminoids 95% HPLC; orange-yellow crystalline powder; storage and two-year shelf-life statement.[9] | 1 kg bags / 25 kg drums are **pack sizes**; numeric MOQ and lead time not found in inspected text.[9] | Online inquiry; explicit sample terms or batch CoA link not found.[9] | Compact facts before inquiry. Do not transplant the pack size, shelf life or USP/ChP/EP statement to ZL. |
| Ningbo Herb | Rhizome; powder/granules; ethanol/ethyl acetate; total three-peak content and separate water-/oil-oriented formats; own product family includes powder, oleoresin and oil.[10] | MOQ / lead time not found in inspected text.[10] | Immediate inquiry / inquiry-list actions; explicit sample and CoA terms not found.[10] | Buyers can distinguish material families before requesting a quote. “Water-soluble” and bioavailability wording remain seller claims. |
| YTBIO Chinese | Ingredient name and B2B exclusion, followed by extensive pharmacological content.[11] | States stock and 3–5-day delivery; numeric MOQ not found.[11] | Inquiry action; sample terms / actual CoA not found in inspected text.[11] | Commercial qualifiers are visible early, but disease claims and loose certificate lists are **not** a model to copy. |
| Valeherb | Total curcuminoids/HPLC, grade and formulation-format selection; says individual-compound breakdown is available on CoA.[16] | States 1 kg MOQ and US warehouse shipping within two business days **for US customers**.[16] | Inquiry and per-batch documentation claims. Retrieved body is abbreviated: do not conclude that samples or other terms are absent.[16] | Connect assay selection, delivery format and quote. Regulatory/certification and absorption claims were not validated in this research. |
| Huisong | 20–95% total curcuminoids HPLC; ratio extracts, water-soluble, straight powder and cuts; describes identity/contaminant testing.[21] | Numeric MOQ / dispatch lead time not found; contact-response wording is not shipping lead time.[21] | Contact/inquire action; actual CoA and explicit sample terms not found in inspected text.[21] | Clear specification families and QA dimensions; production scale and health claims remain supplier self-description. |
| Jeeva Organic | Page title says 95% curcumin; rhizome extract powder; distinguishes partner-company availability; publishes testing/document list.[23] | States MOQ 25 kg and 25 kg drums / HDPE bags. Numeric lead time not found in recovered body.[23] | Batch-specific CoA and technical documents on request; annual/recurring agreements discussed; explicit sample amount/cost not found.[23] | Commercial FAQ reduces repeated sales questions. Assay terminology and partner-vs-manufacturer claims need clarification rather than imitation. |
| Mane Kancor | A concise specification table: CC minimum 95%, powder, alcohol-soluble; raw-material identity; aroma/flavour; customization statement.[24] | Numeric MOQ / lead time not found in inspected extract.[24] | Product/category exploration; extraction is truncated, so no site-wide download/sample absence claim.[24] | A useful short format/solubility table; “CC: Curcumin Content” alone is not a detailed analytical definition. |

**Competitive opportunity:** add a useful commercial decision table plus an explicit quotation/sample path, not longer generic benefit copy. Existing ZL content already distinguishes total curcuminoids from curcumin, carriers, dispersion versus dissolution and market-specific document requests; retain that substance.[2][3]

## 4. ZL evidence boundary and buyer-answer gaps

The inspected ZL commercial page is an inquiry guide, expressly not a released specification or inventory list. It requests batch-linked documentation and written commercial terms; it does not establish a stocked SKU, MOQ, sample entitlement, dispatch SLA, certification or in-house production.[2][3]

Repository governance additionally requires approved SKU specifications or written quotes for assay, method, carrier, solvent, contaminants, packaging, MOQ and lead time; product listing is not manufacturing evidence. No internal current SKU/TDS, genuine batch CoA or approved logistics schedule was supplied for this research. Do not fill these gaps using competitor data.

| Buyer decision | Existing strength / gap | Recommended deliverable before/with rewriting |
|---|---|---|
| Which material fits my project? | Forms are distinguished in a paragraph, but there is no fast comparable selection matrix.[3] | Educational matrix: material type, what it contributes, comparison basis and application test. Label as material choices, **not available ZL grades**. |
| Can I compare two quotations? | Total versus single compound and carrier basis are already addressed.[3] | Compact specification comparison explanation: identity, three analytes/total, method, as-supplied versus other reporting basis, composition/carrier, physical format and exclusions. Use no invented numerical specification. |
| Can I buy at my quantity/date? | General written confirmation, without published MOQ or lead-time values.[3] | Visible commercial-terms section: distinguish sample quantity, trial order, recurring volume, destination and needed date; explain that confirmed MOQ/packaging/lead time belong in the specific quote. No “free samples,” stock or fast delivery promises. |
| Can QA approve the material? | Generic document requests are substantive but scattered.[3] | State what each document resolves: TDS for agreed limits/method, batch CoA for offered-lot results, composition and contaminant evidence for target use. Mark requestable versus actually supplied documents accurately. |
| How do I test a sample? | Wetting, clumping, sediment, staining, actual base and heat/light testing already present.[3] | Short application-specific trial acceptance path with buyer-defined conditions and sample-to-production equivalence. Do not announce a validated formula or guaranteed performance. |
| What does sales need now? | Current brief asks market, application, process, exclusions, samples and scale.[3] | Bring an actionable inquiry CTA near the opening and end; preserve existing working contact/form mechanisms. Proposed brief: company, destination/use, target material/assay, carrier exclusions, trial quantity, first-order and annual volume, required date/documents. |

## 5. Title/H1 and page structure recommendations — not applied

### Chinese commercial page
- **H1:** 姜黄提取物采购
- **Title:** 姜黄提取物采购：规格选型、样品与询价 | 振隆药业
- **Description candidate:** 姜黄提取物采购应如何比较总姜黄素类含量、检测方法、载体与分散表现？了解选型、样品测试、COA与询价要点，提交用途、目标规格和采购数量。
- **Commercial ingredient link label:** 姜黄提取物采购. Preserve the broader category label 植物提取物 and plain encyclopedia name 姜黄提取物.

### English commercial page
- **H1:** Turmeric Extract Procurement
- **Title:** Turmeric Extract Procurement: Specs, Samples & Quotes | ZL Botanicals
- **Description candidate:** Compare turmeric extract specifications, total curcuminoids, carriers and dispersion requirements. Prepare a sourcing brief covering samples, COA, order quantity and delivery needs.
- Use “bulk sourcing” naturally in the introduction/ordering section; no need to repeat “supplier bulk procurement” mechanically. These are relevance candidates, not guaranteed snippet text or rank improvements.

Do not globally change the ingredient's shared `name` just to fix title/H1: the router currently reuses that name in breadcrumbs, product cards and image text. A later implementation should separate commercial title/heading from plain ingredient identity, or narrowly scope turmeric rendering. Preserve all original product artwork and other ingredients.

Suggested commercial reading order:
1. Procurement heading, short scope, “提交采购需求 / Send a sourcing brief” CTA; concise written-confirmation note once.
2. **先选原料形态 / Choose the material format** — comparison matrix, not encyclopedia introduction.
3. **如何比较规格与报价 / Compare specifications and quotations** — total/single compound, method and composition.
4. **样品测试与验收 / Sample evaluation and acceptance** — product-specific practical tests and agreed acceptance criteria.
5. **规格书、COA与质量文件 / Specifications, COA and quality documents** — explain document purpose and availability status.
6. **采购数量、包装与交期 / Quantity, packaging and delivery requirements** — distinguish quote inputs from confirmed supply facts.
7. **提交询价 / Request a quotation** — brief fields and next action, no promised turnaround.
8. A small contextual knowledge module; do not duplicate the whole science dossier or append competing benefit essays.

## 6. Links: existing bidirectionality, improve context rather than invent it

The commercial page **already** links to the exact encyclopedia and its five science anchors; the encyclopedia already returns to the commercial turmeric page with “规格、样品与供货条件 / Specifications, samples and supply terms.” This is not a missing-links-from-zero problem.[2][3][4]

Direct HTML confirms knowledge IDs `identity`, `components`, `applications`, `formulations`, `processes`, `equipment`, `standards`, `faq`, `insights`, `patents`. Commercial pages have `procurement-summary` plus localized auto-generated Markdown headings; stable English commercial anchor IDs would be a proposed later change, not current destinations.

Recommended localized journeys:
- Material-selection paragraph → `/zh/plant-extracts/ingredients/turmeric#components`, anchor **姜黄原料形态与成分区别**; EN **Turmeric material forms and composition**.
- Dispersion/sample-testing paragraph → knowledge `#applications` or `#formulations`, anchor **姜黄在饮料与粉剂中的应用 / Turmeric in beverages and powders**.
- Assay/QA explanation → knowledge `#standards`, anchor **姜黄提取物质量与检测 / Turmeric quality and testing**.
- A short process reference → knowledge `#processes`; avoid making every buyer leave the procurement page to understand the quote.
- Encyclopedia's relevant selection/application/quality section → `/zh/products/turmeric#procurement-summary` now, anchor **姜黄提取物采购：规格、样品与询价**. If later adding `#specifications`, `#samples`, `#supply-terms`, add/verify those IDs before linking.
- Category turmeric card → existing commercial URL with a procurement-oriented label; Research → Ingredients directory keeps plain ingredient names.
- Keep each page self-canonical, existing bilingual URLs and language-localized links; no cross-canonical from one intent to the other, no redirects or duplicate turmeric procurement slugs.

## 7. Handoff acceptance and limitations

Before later publication: owner evidence check for every commercial claim; separate EN/ZH reader review; verify turmeric-only title/H1 changes and unchanged category/plain encyclopedia labels; check the actual requested header wording against navigation scope; test specific links and destination IDs. Measure qualified inquiries and Search Console query/page overlap if access is later provided; no search analytics were accessed here.

Research limitations: exact 姜黄素采购 query remained blocked/unusable after multiple tool and browser alternatives; marketplace/blog/ACE/Arjuna snippets were discovery only, not inspected evidence for capabilities. Valeherb/Mane extraction abbreviated; Jeeva extraction initially incomplete, corrected using its live-origin HTML. No certification, clinical efficacy, legal product eligibility, competitor stock, sample fulfillment, actual lead time or ZL supply capability independently verified. No visual/image audit, download-content verification, form submission or delivery test performed.

## Evidence artifacts

- `/data/hermes/research/turmeric-procurement-ledger.json`: URL→citation IDs and retrieval dates; quote-checked page evidence on inspected sources.
- `/data/hermes/research/turmeric-procurement-evidence/search-ledger.json`: all successful returned query results with dated URLs, original titles/descriptions and tool ordering. Do not convert snippet evidence to page verification.
- Same directory: raw search responses (including failures), extracted competitor text/JSON, recovered direct text, five live HTML/text snapshots, `live-routes.json`, read-only repository snapshot and `retrieval-limitations.json`.
- Citation numbering is task-local; preserve this namespace or mechanically remap if merging with the independent audience report.

## Sources

[1] https://zlbotanicals.com/products/botanical-extracts
[2] https://zlbotanicals.com/products/turmeric
[3] https://zlbotanicals.com/zh/products/turmeric
[4] https://zlbotanicals.com/plant-extracts/ingredients/turmeric
[5] https://zlbotanicals.com/zh/plant-extracts/ingredients/turmeric
[9] https://www.trgbio.com/porduct_del/7.html — 姜黄提取物-汉中天然谷生物科技股份有限公司
[10] https://www.ningboherb.com/zh_CN/proInfo/229.html — 宁波中药-中国姜黄素系列头部生产商之一-品牌官网-植体行业领军品牌-石杉碱甲生产-槲皮素生产-黄连素生产-左旋多巴-银杏叶提取物-甜味剂NHDC
[11] https://cn.sxytbio.com/health-medical-raw-materials/trace-element-supplements/turmeric-extract.html — 中国姜黄提取物制造商供应商工厂 - 购买姜黄提取物出售
[16] https://valeherb.com/product/turmeric-extract — Bulk Turmeric Extract 95% Curcuminoids | B2B Wholesale
[21] https://www.huisongpharm.com/turmeric-extract-product — Wholesale Turmeric Extract Manufacturer and Supplier | Huisong
[23] https://jeevaorganic.com/products/bulk-organic-turmeric-extract-powder-95-curcumin-supplier — Organic Turmeric Extract Powder 95% Curcumin
[24] https://manekancor.com/spice-oleoresins/curcumin-95-oleoresins — Curcumin Powder 95% is a natural extract of turmeric, Curcumin extract supplier - Mane Kancor Ingredients Ltd.

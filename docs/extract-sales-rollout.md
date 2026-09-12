# Eleven extract sales rollout

Base: `fa9dd23` (PR26). 2026-09-12. 11 existing IDs, 22 commercial pages; no new product URLs.

## Content and claim scope

The owner approved extending the turmeric sales-page approach to the other eleven extracts. The shared pricing, quality, certification-document and delivery advantages are owner-confirmed high-level commercial positioning, not independently audited operations. Do not infer universal GMP/ISO/Halal/Kosher/organic status, 95% assays, FDA approval, stock, MOQ, lead time, in-house manufacture or actual batch results. Ingredient forms are enquiry options with available grades confirmed in writing. Research and external supplier specifications are not ZL release specifications or clinical proof. No fictional COA or certificate was made.

The typed `src/data/extract-sales.ts` is the bilingual sales source; `ExtractSales.astro` renders the full offer. Existing product collection metadata and original artwork references remain intact. Actual SEO head uses the ingredient procurement title plus bulk/price/specifications and the ingredient-specific offer as description. Resveratrol remains a molecule name, not a fabricated plant extract.

## Inventory and source mapping

Each row uses the existing EN `/products/{id}` and ZH `/zh/products/{id}` commercial routes; science uses `/plant-extracts/ingredients/{id}` with the same locale prefix. Source numbers below are ingredient-local IDs in `ingredient-reader-packs.json`, not a global bibliography. Full source titles, URLs, dates and evidence excerpts remain in the research packs and existing repository evidence.

| ID | Existing catalog identity | Material distinctions / claim boundary | Sales source IDs | Application artwork IDs |
|---|---|---|---|---|
| green-tea | Camellia sinensis | Soluble tea vs catechin/EGCG vs caffeine; no weight-loss promise | 18,25 | citrus-tea, oat-latte, instant-tea |
| centella-asiatica | Centella asiatica | Leaf/aerial part; glycosides vs acids; cosmetic not automatically oral | 4,19 | hydrating-serum, lipid-cream, washable-gel |
| monk-fruit | Siraitia grosvenorii | Fruit matrix vs enriched V vs blend; decoction permission not enriched-extract permission | 20,26 | citrus-sparkling, cultured-dessert, oat-cookie |
| ginseng | Panax ginseng | Panax ginseng root, white/red history; no universal saponin assay | 11,14 | citrus-drink, instant-sachet, capsule |
| reishi-mushroom | Ganoderma lucidum | Species and fungal part; G. lucidum not automatic G. lingzhi synonym; beta-glucan not total sugar | 15,28 | cocoa-oat, cultured-yogurt, defined-capsule |
| ginkgo-biloba | Ginkgo biloba | Leaf not seed; 24/6 is requested group target, not confirmed ZL grade; ginkgolic acid and oral-use review | 2,10,13 | capsule, tablet, suspension |
| grape-seed | Vitis vinifera | Seed polyphenols not seed oil; OPC method and size definition | 2,10,20 | berry-drink, capsule, serum |
| licorice-root | Glycyrrhiza glabra | Species, DGL residual glycyrrhizin, glabridin and salts distinct; no universal food/safety permission | 1,8 | dgl-chewable, glabridin-emulsion, flavor-concentrate |
| stevia | Stevia rebaudiana | Named glycosides and route; crude leaf not refined sweetener | 1,2,5 | citrus-beverage, protein-drink, tabletop-sachet |
| resveratrol | Polygonum cuspidatum | Trans/cis, polydatin and emodin; botanical not synthetic assessment equivalence | 3,4,5 | capsule, topical, reconstitution |
| goji-berry | Lycium barbarum | Fruit/juice solids vs refined polysaccharides; free sugars and carriers separate | 12,24 | instant-drink, fruit-gummy, polysaccharide-capsule |

## Preservation and interaction contract

All 12 original product WebPs and existing editorial/media assets stay byte-identical. The 33 existing landscape application assets are reused with their exact ingredient/plan pairing. Product original-art captions distinguish illustration from batch specification. Application concepts are labeled, not passed off as customer products.

Science longform data is unchanged. `IngredientRollout.astro` adds only the contextual standards-to-procurement qualification link. Commercial five-dimension summaries preserve existing IDs and point to their own science sections. Legacy Markdown heading IDs are retained as localized aliases. No header additions or category renaming. Old dossier/news and generic matrix duplication is removed from the sales rendering; research cards remain on the matched encyclopedia and research library. Relevant ODM concepts and the sourcing checklist remain accessible.

Quote/sample/document CTAs use existing URLSearchParams and existing request types. The form remains editable; no automatic submission, no provider/recipient changes. No-JS forms remain manually editable (URL prefill needs JS). Tests abort any POST and never test external receipt.

## Draft and editorial process

The first specific bilingual draft was written after inspecting all eleven identity/form/application/source mappings in the approved reader packs. Numeric supplier examples were not copied into ZL specs. Humanizer pass favored direct supply offers, concrete composition and application distinctions, with lengthy science left on the linked encyclopedia. Shared commercial prose is reused through one component, while identities, offers, three-row matrices, assay and quality priorities, application context and material-specific FAQ are ingredient-specific.

External audit C was read and applied: kept OPC method distinctions, goji sugar/carrier distinctions, DGL/glabridin split and exact `#formulation-*` destinations. All external briefs are editorial research, not certificates or supplier authorization. Additional audit integration and actual verification results are recorded in the final QA addendum.

## Verification addendum

- `npm test`: 152/152 passing; build remains 200 static pages. Initial sales tracer failed on absent sales markup; the second tracer failed on missing contextual science-to-procurement links before implementation.
- `node scripts/extract-sales-typecheck.mjs`: 0 diagnostics for sales data plus its imported graph and generated Astro declarations. This is not a claim of whole-project Astro type checking.
- `extract-sales-browser-smoke.mjs`: 88/88 combinations (11 ingredients × EN/ZH × 390/1440 × JS on/off), 176 quote/sample form journeys, 0 POSTs, 0 uncaught page errors. Actual head title/description/canonical/hreflang, image decoding/landscape dimensions, internal science fragments, editable prefill and no-JS manual editing checked. Final log retained under evidence.
- All 44 JS hero screenshots inspected in four contact sheets; native 390px EN green-tea and 1440px EN ginkgo also inspected. All 33 landscape artworks decoded and visually inspected in three labeled contact sheets; native ginkgo desktop and licorice mobile application sections inspected. No major clipping/overlap. Peripheral artwork crops are pre-existing and originals remain untouched. Ginseng–ginger, Centella oat cream and licorice cocoa–vanilla props match the actual named plans, despite generic vision warnings. Element screenshots can include a sticky header mid-capture; viewport hero sheets confirm correct page gutters.
- Byte comparison against fa9dd23: all 124 tracked public assets unchanged, including 12 original product WebPs and 33 landscape plan assets. Scientific JSON, product Markdown metadata, headers and category pages unchanged.
- Static scan of new production files found no credentials, eval, innerHTML, network submission or recipient changes; `git diff --check` clean.
- Test baselines now verify actual sales journeys and omission of duplicated research/news modules; research cards remain tested on the encyclopedia/library. Chinese concise-summary threshold now applies equally to all ingredients rather than only turmeric.

- Additional real click suite: 44/44 product → matched science standards → commercial qualification round trips (EN/ZH, JS on/off at 390px); 44 keyboard horizontal-table scroll checks passed. Log retained in evidence.

## Review gates

At this evidence snapshot, external audit C was available and incorporated; final A/B/D report files had not yet appeared in the supplied research directory. Those integrations and parent independent content/code review remain a gate before merge. The branch is not production publication. No actual inquiry was submitted and no delivery receipt or product certificate was verified in this task. Existing dependency advisory baseline remains outside this content change.

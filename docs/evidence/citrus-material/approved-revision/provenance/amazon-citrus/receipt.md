# Amazon citrus collection receipt — 2026-09-22

## Outcome and scope
Collected four substantively different, real Amazon US product detail records through official BrowserMan `amazon.search` and `amazon.get_product`. Three searches returned 8 / 6 / 6 rows respectively; these are small purposive result windows, not representative samples or sales data. All seven executions completed successfully, with `blocked:false`. Collection ran approximately 03:53–03:56 UTC on 2026-09-22.

Catalog → Amazon actions → both action schemas → browser ping were checked before collection. Ping reported online. No busy/offline condition occurred. One serial browser collector; no retries, takeover, low-level forms, purchases, comments, messages, connections, or publication. No browser calls remain pending; browser available for parent coordination. Only this amazon-citrus directory was written.

## Writer-ready findings

| ASIN / URL | Observed material distinction | Dose/serving and limits |
|---|---|---|
| [B0896SJSK8](https://www.amazon.com/dp/B0896SJSK8) — Nootropics Depot | Title says hesperidin, 90% citrus extract; not glucosyl hesperidin | 500mg title/bullet, 180 capsules. Serving size and whether 500mg denotes extract or assayed hesperidin are not resolved by captured text. Do not silently calculate 450mg. Carrier not disclosed. |
| [B001F0QVX4](https://www.amazon.com/dp/B001F0QVX4) — NOW | Generic citrus bioflavonoids; bullets explicitly add vitamin C/ascorbic acid | Title says 700mg, 100 veg caps. Specific hesperidin mass, vitamin C amount, serving size and excipients not captured. 700mg bioflavonoids is not established as 700mg hesperidin. |
| [B0FPYN3J4Z](https://www.amazon.com/dp/B0FPYN3J4Z) — Nutricost | Diosmin–hesperidin combination | Explicit 2-capsule serving: 500mg diosmin + 500mg hesperidin; 120 capsules / 60 servings. The 1000mg complex headline is not 1000mg hesperidin. Carrier not disclosed. |
| [B07JZDPJHK](https://www.amazon.com/dp/B07JZDPJHK) — Supersmart | Hesperidin methyl chalcone (HMC), standardized to 98%; neither glucosyl nor ordinary hesperidin | 500mg HMC 98% per capsule; 2 capsules/day; 1000mg/day title; 60 capsules / 30 servings. Other ingredients explicitly hypromellose capsule and acacia gum; gum role/amount not stated. Preserve seller's source spelling “Citrus aurentium (Fruit)” in quotations. |

### Identity traps worth incorporating into citrus research
1. The `glucosyl hesperidin` Amazon US search returned ordinary hesperidin, diosmin–hesperidin blends and HMC among its six captured results. **None of the six titles identifies glucosyl hesperidin.** HMC's detail page confirms HMC, not glucosyl hesperidin. Search relevance must never be treated as chemical identity. This does not prove glucosyl products are absent from Amazon or other marketplaces.
2. Keep ordinary hesperidin, glucosyl hesperidin, HMC and generic citrus bioflavonoid mixtures in separate evidence categories. This sample illustrates label wording only; use primary chemical/study evidence to establish structures, processing, solubility, bioavailability or clinical relevance. No glucosyl-specific finished product was verified here.
3. Separate complex mass, extract mass, assay percentage and named compound mass. Only the Nutricost detail explicitly resolves its 1000mg headline into two named 500mg components and a two-capsule serving.
4. Acacia gum is genuinely named on the HMC listing, but the listing does not establish its function. Do not infer a spray-drying carrier. Undisclosed excipients on other captures are unknown, not absent.
5. Generic bioflavonoid positioning can include a vitamin C co-nutrient. It does not establish a quantified hesperidin fraction.

## Evidence package
- `records.json`: four normalized writer records with exact full titles, ASINs, canonical and observed URLs, UTC capture times, marketplace, identity, dose, serving, carrier/other-ingredient disclosure, qualifiers and deduplicated exact bullets.
- `sources/search-hesperidin-us-result.json`: 8 search rows; query URL https://www.amazon.com/s?k=hesperidin.
- `sources/search-citrus-bioflavonoids-us-result.json`: 6 search rows; query URL https://www.amazon.com/s?k=citrus+bioflavonoids.
- `sources/search-glucosyl-hesperidin-us-result.json`: 6 search rows; query URL https://www.amazon.com/s?k=glucosyl+hesperidin.
- `sources/product-{ASIN}-result.json`: sanitized official detail result for each of the four ASINs above.
- `sources/{ASIN}-excerpt.md`: exact title/bullet source excerpts plus distinctly labeled derived notes, one per product.
- Matching search/product `.json` files without `-result` preserve execution-start receipts.
- `verification.json`: parse/completion/identity checks and SHA-256 capture manifest.

## Sanitization and extraction limits
Browser/session identifiers and extension credentials were removed recursively. Embedded availability UI state and customer-review JavaScript were removed with explicit markers; product wording retained. Duplicate bullets remain in sanitized raw and are deduplicated only in derived records/excerpts. Source captures are official script JSON and text excerpts, not full HTML or screenshots. Supplement Facts panel images were not transcribed; missing serving/excipient fields must remain unknown.

Search extraction mislabeled some descriptive text as `reviewCount` or `availability`. These fields are not trusted for demand analysis. Any raw `rank` is a returned search position, not sales rank; raw Best Sellers Rank values are neither analyzed nor treated as purchase/sales evidence. Prices, reviews, ranks and account/UI state are not used to establish popularity, market size or composition.

All health, quality, vegan/non-GMO and certification statements are attributed listing claims, not independently verified. FDA-registered facility wording is not FDA product approval. No product purchase, laboratory authentication, clinical conclusion, sales inference or paper verification occurred. This ecommerce sample complements, and cannot replace, paper evidence.

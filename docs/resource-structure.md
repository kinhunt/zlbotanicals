# Resource structure and publishing rules

## Routes

Existing product, solution, blog, download and FAQ URLs remain unchanged. New populated category pages live at /resources/ingredient-guides, /resources/application-guides, /resources/quality-guides and /resources/sourcing-guides, with /zh counterparts. The resource hub and legacy /resources/blog archive use the same published article collection. Ingredient filtering is client-side, not an indexable tag directory.

## Article metadata

Each article has exactly one `guideCategory`, `relatedProducts` containing actual product slugs, and `relatedIndustries` containing zero or more beverages/food/cosmetics/nutraceuticals. Keep EN/ZH categories and relationships consistent. Existing `category` is retained for backwards compatibility; it is not the new navigation taxonomy. Only link an industry when the actual article covers that application.

Category meaning:
- ingredient-guides: material identity, composition, specification selection;
- application-guides: formulation and processing questions, evaluation;
- quality-guides: identity testing, COA and document review;
- sourcing-guides: purchasing briefs, suppliers, sample and commercial review.

Do not duplicate an article to populate multiple categories. Do not publish empty category pages. Add original content only when it solves an actual customer question and has appropriate evidence.

## Linking

Products show exact-match related guides. Industry pages show candidate ingredients (not universal suitability promises), relevant guides, and explicitly labeled application concepts. Categories link back to products and qualification resources. Do not create /en routes, thin ingredient tags or separate assay pages without a real distinct offering.

## Verification

`npm test` builds a stable output then runs source and generated-page tests. `scripts/resource-browser-smoke.mjs` checks four category routes per language, ingredient filtering and reset, product/industry links, multiple widths and no-JavaScript fallback. Use PLAYWRIGHT_MODULE for an external Playwright install. No external forms are submitted by these tests.

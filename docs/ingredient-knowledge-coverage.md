# Ingredient-specific knowledge correction — coverage and verification

Base: main / PR #11, `2eecced70c3695068fae38f593f1bdab2e0e540a`. Checked 2026-09-09.

## Architecture

- All five primary ingredient links resolve through validated productId/canonicalPath metadata, not the global taxonomy. Green tea, Centella and monk fruit use substantive sections in their existing science profiles. The other nine use their existing product URLs, with no new thin profile routes.
- Legacy science anchors (`process`, `application`, `evidence`), titles, language routes, original WebPs and all existing media/data URLs remain untouched. New anchors are `processes`, `equipment`, `applications`, `standards`, `insights`.
- General category routes remain available in a secondary native-details panel explicitly labeled **全部原料通用指南 / General guides for all ingredients**.
- Existing product-filtered papers/news are retained; science profiles now also show product-filtered event records. No matching records are disclosed honestly, not filled with other-ingredient stories.

## All 12 ingredients × EN/ZH

Every row covers all five sections, exact rendered content, resolved citations, and actual navigation clicks at 390/1440 px with JavaScript enabled and disabled.

| Product ID | EN canonical content | ZH canonical content | Distinct review focus |
|---|---|---|---|
| green-tea | `/plant-extracts/ingredients/green-tea` | `/zh/plant-extracts/ingredients/green-tea` | Compare extraction energy and downstream stabilization |
| turmeric | `/products/turmeric` | `/zh/products/turmeric` | Separate extraction from dispersion equipment |
| reishi-mushroom | `/products/reishi-mushroom` | `/zh/products/reishi-mushroom` | Polysaccharide separation is not triterpene fractionation |
| ginseng | `/products/ginseng` | `/zh/products/ginseng` | Steam history before extraction-vessel selection |
| ginkgo-biloba | `/products/ginkgo-biloba` | `/zh/products/ginkgo-biloba` | Specify the fraction before the separation train |
| grape-seed | `/products/grape-seed` | `/zh/products/grape-seed` | Match seed polyphenols to extraction and solvent recovery |
| goji-berry | `/products/goji-berry` | `/zh/products/goji-berry` | Juice drying versus polysaccharide fractionation |
| licorice-root | `/products/licorice-root` | `/zh/products/licorice-root` | Verify removal performance, not a DGL machine label |
| centella-asiatica | `/plant-extracts/ingredients/centella-asiatica` | `/zh/plant-extracts/ingredients/centella-asiatica` | Microwave or ultrasound: optimize named triterpenes |
| monk-fruit | `/plant-extracts/ingredients/monk-fruit` | `/zh/plant-extracts/ingredients/monk-fruit` | Separate clarification, adsorption and drying duties |
| stevia | `/products/stevia` | `/zh/products/stevia` | Leaf extraction and alternative glycoside routes need different briefs |
| resveratrol | `/products/resveratrol` | `/zh/products/resveratrol` | Purification equipment and encapsulation equipment answer different questions |

## Executed verification

- Baseline: `npm ci`, `npm test`: 73/73 passing. Regression RED reproduced missing EN green-tea `#processes` link. Second RED reproduced absent product-specific no-news state.
- Final full build + node:test: **76/76 passing**, **182 HTML pages** (no added routes). Data tests cover all 120 localized dimensions, specific material discriminators, exact rendered paragraphs, citations and nonduplicated per-dimension text—not only heading presence.
- `ingredient-knowledge-browser-smoke.mjs`: **120 page checks / 600 anchor-click journeys**, all 24 bilingual product pages and all 6 bilingual existing science pages, 390/1440 px, JS on/off. Zero page errors or horizontal overflow. Secondary guide disclosure works without JS.
- `product-imagery-browser-smoke.mjs`: **56 page checks**, including **48 product-detail checks** (24 pages × 2 widths), plus home/catalog; original WebPs decode correctly.
- Screenshot inspection: ZH Centella at 390 px and EN monk fruit at 1440 px show substantive equipment sections without clipping; screenshot script scrolls explicitly to the section (initial viewport captures were not treated as equipment proof).
- `git diff --check`: clean. No changes to `public/`, product markdown, product page templates, existing source records, media titles or URLs.
- Sources: 24 retrieved records, ledger IDs and verbatim evidence in `ingredient-knowledge-sources.md` and `ingredient-knowledge-source-ledger.json`. Citation verifier passes with evidence. Raw retrieval cache: `/tmp/zl-ingredient-retrieval` (not published).

## Evidence limits / blockers

- Some keyless web searches and direct EUR-Lex/EMA retrievals returned 403; no unseen legal text was adopted. Existing dated tea event retained unchanged, not represented as a fresh legal-status check. Europe PMC core API and open full-text API supplied paper evidence; available FDA, EMA ginseng, NCCIH and EC framework pages supplied institutional references.
- Equipment prose distinguishes documented laboratory/notifier examples (tea, Centella, monk fruit; selected review methods) from proposed engineering/pilot questions. Abstract-only sources do not establish machine settings, extraction recipes or factory capacity. US/EU review routes are contextual questions, not legal clearance; China or other markets are not inferred from US records.
- Baseline npm audit now reports 14 advisories: 1 low, 2 moderate, 10 high, 1 critical. No dependency migration in this scoped content/navigation fix.
- Local build/browser checks are not deployment/public-domain verification. Independent review and merge intentionally remain with the parent agent. No production deployment claimed.

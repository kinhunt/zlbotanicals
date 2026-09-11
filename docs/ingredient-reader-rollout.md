# Ingredient reader rollout handoff

Base verified: `bf49c83b254d5532a40c17895654f0d510bf5e07` (origin/main).

## Shipped foundation

All 24 canonical ingredient pages use a centered 820px reading column. `IngredientResources.astro` owns the product/application cards and compact technical/ODM links. `PlantEncyclopedia.astro` keeps family reading separate as quiet two-column rows (one on mobile), and removes the duplicate generic review-plan and sourcing banner on ingredient detail pages only.

`ingredient-reader.mjs:buildReaderSections` adapts the existing validated five-dimension packs without changing, discarding or renumbering blocks: applications first, processing with nested equipment, standards, insights, then existing references. `ResearchBlocks.astro` is the escaped paragraph/heading/list/table renderer; headings retain `research-{productId}-{original-section}-{block-index}` and citations retain `research-{group}-{productId}-source-{n}`. Turmeric retains its dedicated renderer and approved evidence.

## Integration map (not a publication claim)

The other eleven pages still use their original substantive overview and deep-pack facts. This PR does not claim that the forthcoming clinical, formulation, illustrated process or patent research has been integrated. No empty sections or synthetic material-specific content is published.

Research groups write outside the repository under `/data/hermes/research/encyclopedia-rollout/{a,b,c,d}/`. The code owner should review their source ledgers and copy only approved bilingual content into a new `src/data/ingredient-reader-packs.json` plus strict typed validator. Do not rerun the original deep-pack importer. Keep deep-ingredients.json and ingredient-overviews.json as the retained baseline.

Integration order is exported as `readerSectionOrder`: overview, effects and human research, material forms, applications, formulations, merged process/equipment, quality, FAQ, study cases, patents; references last. Build the pack adapter in `ingredient-reader.mjs` beside the legacy adapter, with nonempty bilingual sections, matching IDs, rectangular tables, HTTPS sources, unique source IDs, resolved citations, local existing assets and explicit approval. Reject unknown fields/raw HTML and missing languages at build time. Add a reviewed-pack branch in `IngredientKnowledge.astro`; keep the current adapter as fallback until each ingredient passes review. Optional sections must be absent rather than placeholders.

Use separate new citation namespaces for clinical and patent evidence. Never route new [1] citations to old source 1. For moved original blocks pass their original section and index to ResearchBlocks; do not silently reindex legacy heading anchors. Each ingredient needs its own material distinctions, applications, outcome/limitations and verified patent metadata. Do not copy turmeric facts with names replaced. Preserve original artwork, videos, canonical and legacy anchors.

## Retained inventory

Counts below are the unchanged existing packs, EN / ZH. Every original block and source remains available. New renderer regression tests compare every adapter block with its source.

| Ingredient | Group | Blocks EN/ZH | Tables EN/ZH | Sources | Existing process subheadings (EN) |
|---|---|---:|---:|---:|---|
| green-tea | a | 27/27 | 1/1 | 2 | 1.1 Evidence-led starting point: processing waste is not spent tea; 1.2 Flow and material changes: engineering proposal informed by the study; 1.3 Route comparison; 1.4 Avoid the highest-yield trap |
| centella-asiatica | a | 28/28 | 1/1 | 2 | 1.1 Get the material language right; 1.2 A development flow — engineering proposal; 1.3 Route comparison; 1.4 Three overlooked process failures |
| monk-fruit | a | 31/31 | 1/1 | 4 | 1.1 Start with retrieved process evidence; 1.2 Flow, purpose and material changes — engineering proposal; 1.3 Route comparison; 1.4 Biotransformation: attach numbers to the correct product |
| turmeric | b | 35/35 | 2/2 | 5 | Continuous sourced process discussion |
| reishi-mushroom | b | 19/19 | 1/1 | 4 | Continuous sourced process discussion |
| ginseng | b | 21/21 | 1/1 | 5 | Continuous sourced process discussion |
| ginkgo-biloba | c | 17/17 | 3/3 | 5 | 0. Define the material before buying “24/6” |
| grape-seed | c | 19/19 | 3/3 | 4 | 0. Material map: seed extract is not seed oil or skin extract |
| goji-berry | c | 20/20 | 3/3 | 6 | 0. Split identities before discussing percentages |
| licorice-root | d | 18/18 | 3/3 | 5 | Continuous sourced process discussion |
| stevia | d | 21/21 | 4/4 | 7 | Continuous sourced process discussion |
| resveratrol | d | 23/23 | 4/4 | 5 | Continuous sourced process discussion |

## Verification

- `npm test`: 200 built pages; 127 passing tests.
- `scripts/shared-ingredient-reader-browser-smoke.mjs`: 96 cases, all 24 pages at 390/1440px with JS on/off; centered widths, no overflow, real section text, table semantics, citation targets and product links.
- `scripts/turmeric-reader-browser-smoke.mjs`: 12 cases passed.
- Public drawing labels removed in source, alt text and rendered HTML; descriptive concept captions retained. Internal provenance and all public assets unchanged.
- Parent review and any later research integration remain required. No merge or production publication performed.

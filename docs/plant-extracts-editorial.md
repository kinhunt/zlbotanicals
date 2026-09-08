# Plant extracts encyclopedia: editorial and maintenance model

Checked: 2026-09-08. Existing 104 URLs are preserved; 44 new pages add one hub, seven overview guides and fourteen topics in each language. Existing resource articles and product/solution pages are linked rather than duplicated.

## Content model

`src/data/plant-extracts.json` separates stable section/topic slugs and source IDs from `translations[locale]`. Each translation has title, description and ordered heading/text blocks. Topics reference a parent section, scoped source IDs and language-neutral related links. `src/components/PlantEncyclopedia.astro` renders this model through two static rest routes. `getLocalizedPath` localizes existing content links. BaseLayout supplies page-specific canonical and reciprocal EN/ZH/x-default links; Astro's existing sitemap integration discovers all generated routes. Breadcrumb JSON-LD is generated from the same visible crumb array.

To add a locale: add it to the site i18n config and translations, supply every encyclopedia translation, extend the component Props and page-route wrappers, and extend BaseLayout's language alternates (currently the site's EN/ZH implementation). The model is locale-keyed, not an English-only body with an optional Chinese label. Do not publish an untranslated fallback page under a new locale.

To add a topic: use a stable slug, write original paired translations, add exact source IDs and existing related routes, then extend the explicit topic-count release expectation. Never create empty routes. Do not copy existing buyer guides into the encyclopedia.

## Source-to-claim map

- WHO 2011 herbal-material manual: starting-material identification and quality-control context. Not a universal finished-extract standard.
- Zhang et al., Chinese Medicine 2018, DOI 10.1186/s13020-018-0177-x: extraction/separation methods, variables and method-comparison limitations. No laboratory recipe is represented as our manufacturing process.
- EMA quality guideline, final Revision 3 (2022), sections 3–5: extract declarations, manufacturing descriptions and controls. Official page identifies this as the current effective version. Medicinal-product scope is explicit; no food authorization inferred.
- GEA plant extracts: generic solid–liquid separation equipment roles. No claimed equipment ownership or throughput.
- BUCHI spray/freeze drying: droplet drying and sublimation principles. No imported vendor performance guarantees or operating settings.
- FDA NDI index: US supplement notification and final-vs-draft document labels. No product approval inferred.
- FDA GRAS overview: intended-use scope; the page describes an August 10, 2026 proposed rule. The encyclopedia calls it a proposal, not a final rule, and requires rechecking before reliance.
- European Commission Novel Food catalogue: supplement history does not automatically cover new uses in other foods.
- European Commission cosmetics legislation: finished-cosmetic safety report and claim framework; current amendments must be checked for the formula.
- SAMR terminology URL: project 20213493-T-424 only. Final GB/T number/effective status were not verified and are explicitly unresolved, rather than inferred from historic consultation news.

Research artifacts on the implementation host: `/data/hermes/research/extract-seo/verified-sources-2026-09-08.json`, `additional-sources-2026-09-08.json`, and the earlier `search-results.json`. Some extraction-backend calls failed with 403; direct live HTTP and alternative official/manufacturer URLs were used where possible. Failed/404 pages are not cited as verified sources.

## Boundaries

No clinical promises, dosing recipes, fabricated COAs, factory capacities, equipment inventory, certificates, market forecasts or invented news. Insights are evergreen evidence-reading guides. The process diagram and rendered video are original conceptual illustrations, not facility depictions; routes can omit/reorder/repeat steps. Equipment education is not equipment sales. Commercial availability and destination suitability require written product-specific confirmation.

## Verification commands

```sh
npm ci
npm test
node scripts/verify-extraction-media.mjs
npm --prefix media/plant-extraction ci
npm --prefix media/plant-extraction run lint
npm run preview -- --host 127.0.0.1
# In another shell, with Playwright installed:
node scripts/plant-extracts-browser-smoke.mjs
node scripts/browser-smoke.mjs
node scripts/resource-browser-smoke.mjs
```

The media verifier uses ffprobe and checks metadata-aligned duration, 1280×720, 30fps H.264/AAC narrated faststart files, per-scene audibility and silence, bounded sizes, eight captions and text parity. Browser smoke checks all 44 new routes at four widths, metadata, localized links, actual media playback/caption loading and no-JS access. It makes no external sales submission.

Independent review remains a parent-agent responsibility before merge: this implementation subagent cannot spawn reviewers. Self-review and passing tests are not represented as independent approval. The unchanged root dependency audit baseline is 14 advisories (11 high, 2 moderate, 1 low); the isolated Remotion scaffold reported two low advisories. A separate tested dependency update is still needed.

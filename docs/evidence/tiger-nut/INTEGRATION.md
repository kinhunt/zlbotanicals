# Tiger nut fermented drinks: integration boundary

Base: `8c826aa543dc34f4a75ccb52d18f5c049a7a9911` (PR90). Final routes: `/resources/blog/tiger-nut-fermented-drinks` and `/zh/resources/blog/tiger-nut-fermented-drinks`.

## Approved input and preserved evidence

- `review/REVIEW.md` gives independent scientific/editorial approval only. Both `review/tiger-nut-fermentation.{en,zh}.md` corrected copies are the sole public-body inputs.
- `original/` is the complete original discovery package, preserved for provenance, not an approved publication draft. `review/` is the complete separate independent review package. `source-manifest.json` binds all 74 archive files byte-for-byte, including original primary XML, tables, supplier HTML/PDF, all six figures, supplemental PDF and visual evidence, complete claims/ledger and review corrections.
- The full ledger retains original sources 1–6. Article references remain sparse **[1], [5], [6]**; they are not renumbered to 1–3. Source 1 is PMC12071967; 5 is Tigernuts Traders extra-fine flour product page; 6 is its food catalogue PDF. Sources 2–4 remain discovery alternatives, not additional published tiger-nut support.

## Bounded presentation changes

Reviewed H1 becomes collection title. Add localized description, application-guide metadata and tags; no product or stock claim and no new image. Body prose, all 7 table rows/25 cells, all 12 count means/spreads, and original reference identities remain unchanged. Native bracketed anchors replace plain citation numbers; Sources is localized to 参考来源 in Chinese. Semantic HTML tables add captions, column/row headers, visible mobile labels and cell wrappers. Those labels are not aria-hidden. At ≤640px tables become complete row cards; desktop retains tables. Scoped styles use 820px prose, 16px cells, native source scroll margins and keyboard-focus outlines, matching existing citrus-fibre reader pattern.

The existing bilingual oat beta-glucan material-selection application guide gains a single contextual inbound paragraph. Collection discovery is generated automatically; a localized article language link is enabled. The unrelated generic botanical-sales CTA is suppressed for this research article; approved beverage and quotation links remain.

## Scientific boundaries

VEGE codes are commercial composite starters, not individual strains. Acidification remains 酸化/pH下降, not 降酸. Table2 count-harvest time is unspecified, no uniform 24-hour heading. ×10⁸ CFU/mL applies to means and ± terms, including ±0 and 0.015. No survival percentages, trial performance for flour grades, consumer-preference verdict, clinical/shelf-life promise, or added chart. Supplier development wording is not delivered sterilisation status.

## Verification

`tests/tiger-nut.test.mjs` compares all approved body paragraphs/headings and table cell texts against built output, validates sparse citations, inbound/native bilingual discovery, visible accessible labels and every archive hash. Inventory-only adjustments in five existing tests account for 49 articles/language and 292 sitemap pages; historical-content exclusions remain narrowly named.

`npm test` and `scripts/tiger-nut-browser.mjs` are the integration gates. Browser expectations are copied from the corrected reviewed tables, not scraped from the implementation. It checks EN/ZH, 320/390/1440px, JS enabled/disabled, each cell's accessible text and screen bounds, all native citation occurrences, contextual/category inbound navigation, quotation/beverage outbound navigation, locale navigation and local article links. Screenshots and exact source/dist freeze live outside the repository in `/data/hermes/research/seo-growth/2026-09-28-late-tigernut-integration/`.

Independent rendered screenshot/table review and release approval remain required. No commit, push, PR or merge is authorized by this handoff.

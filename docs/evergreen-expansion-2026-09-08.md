# Evergreen expansion — 2026-09-08

Added six distinct bilingual evergreen topics: solvent-stage disclosure; carriers/native extract; assay-method comparability; residual-solvent review; dry-basis/as-received assay; and change-control/requalification. Deepened beverage compatibility, filtration/centrifugation and spray/freeze drying with four checklist/comparison blocks each. Existing moisture and COA work is preserved unchanged. Result: 21 topics, 162 generated pages. Hub titles remain Plant Extracts / 植物提取物 and all existing routes remain.

## Concurrency reconciliation
Initial shared checkout contained moisture work. Wrote and tested additive pack outside repo first. Parent explicitly authorized reconciliation. Gateway logs record stale cron ownership loss at 05:15:37 and interrupted/no-output completion at 05:15:39; subsequent process inspection showed preview/studio services, not an active writer/build. Backed up all four preexisting dirty files externally, then applied conflict-checked additive changes. Unrelated existing entries and component were not replaced. No cron created.

## Sources and boundaries
Official EMA herbal-quality Revision 3 and ICH Q3C(R9)/Q2(R2) PDFs were downloaded and read in full. PMC wall-material, beer-haze and extraction-method reviews were read live. Article source arrays and local inline citation numbering correspond. Pharmaceutical guidance is not presented as universal food limits. Beer-haze evidence is explicitly matrix-specific. Equipment additions are buyer questions, not measured performance claims. No invented figures, factory capability, certificates or batch results.

Real EN/ZH keyword searches and original evidence are in `/data/hermes/artifacts/plant-extracts-evergreen-20260908/`. Main review files: `content-review.md`, `ledger.json`, `retrieval.json`, `keyword-search*.json`, `content-pack.json`, `manifest.json`. Evidence-backed citation verification passed; task-local ICH URLs were percent-encoded to work around parentheses parsing. No search-volume claims. Prior BUCHI freeze-drying source URL returned 404 during recheck; no new claims rely on it. Repair requires a separately verified replacement rather than guessing a URL.

## Verification
Observed pack RED then GREEN and explicit 15→21 count RED before integration in isolated snapshot. Full actual repository `npm test` passed: 162 pages, 49 tests, zero failures. Isolated browser smoke passed 232 route visits across eight EN/ZH-width combinations, no-JS and real video/caption checks; actual repository browser smoke also passed 232 route visits, eight combinations and no-JS after integration (`repo-browser-smoke.log`). No dependencies or lockfiles changed. Independent parent review is required before merge; self-review is not independent approval. Existing dependency advisories remain.

Structured tables were not added: current renderer supports heading/text blocks and is preserved. Comparison/checklist content renders directly without a new component schema.

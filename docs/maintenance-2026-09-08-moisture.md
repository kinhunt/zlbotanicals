# Maintenance: moisture vs loss on drying — 2026-09-08

## Scope and editorial decision

Added bilingual `standards/moisture-vs-loss-on-drying` and deepened existing `standards/coa-vs-specification`. New topic covers LOD versus water-specific KF, interfering matrices, solvent and vial blanks, sample handling, oven-temperature rationale, reporting basis, and actionable supplier questions. COA additions cover document-to-lot traceability, specification revision, numerical result versus pass statements, quantification limits, method changes and documented disposition. Questions are editorial procurement recommendations, not statements that ZL performed tests. No universal moisture limit, regulatory compliance, shelf-life or manufacturing assertion was added. Existing titles and URLs, including exact hub titles Plant Extracts / 植物提取物, remain unchanged.

Reciprocal language-local related links have descriptive EN/ZH labels. No table extension was warranted: the existing heading/paragraph structure supports this comparison without adding renderer complexity. Only the data, shared link-label map, scoped tests and this record changed. Original JSON formatting outside the modified/added entries is preserved; decoded data equality was checked after formatting restoration.

## Research and evidence

Search intent supplied by parent: English `plant extract loss on drying water content Karl Fischer volatile matter WHO quality control herbal materials`; Chinese `植物提取物 干燥失重 水分 卡尔费休 检测 区别`. Follow-up attempted here: `site.metrohm.com Karl Fischer side reactions aldehydes ketones water determination`; search backend returned 403, so no search-volume or ranking claim is made. No Search Console or demand-volume data was available.

The WHO 2011 IRIS PDF returned network_error. Instead, the actual WHO-hosted **1998** manual was downloaded and read, including section 9. This edition is explicitly named in the new source and copy; it is not passed off as the 2011 manual. WHO says LOD determines water and volatile matter.[1] Metrohm’s actual oven article was read for sample preparation, temperature/decomposition and blank controls.[2] Its Chinese KF article was read for water specificity and solvent compatibility including aldehydes/ketones.[3] Neither its broad regulatory statement nor its illustrative measurement/recovery ranges were adopted as extract limits.

Evidence directory (outside git): `/data/hermes/moisture-evidence-20260908/`.
- `who-1998.pdf`, `who-1998.txt`: complete PDF and pypdf text; web extraction was truncated before the relevant section, so full PDF extraction was used.
- `source-0.txt`, `source-1.txt`, `source-2.txt`, `retrieval.json`: saved actual retrievals. Source-0 is the truncated first extraction, not the final WHO evidence.
- `ledger.json`: task-local grounded-citations ledger with verbatim evidence. Citation IDs: WHO=1, Metrohm oven=2, Metrohm Chinese KF=3. New topic reference order matches these IDs. COA uses only inline [1], with WHO first; its pre-existing EMA scope reference remains second without a new inline claim.
- `moisture-vs-loss-on-drying.md`, `coa-vs-specification.md`: bilingual body exports, mechanically rendered sources and passing `verify --evidence`. COA verifier warns about the two unused KF ledger entries, expected for this separate article. Buyer questions are not sourced factual assertions.

Tool issues: pdftotext, pypdf and uv were unavailable initially; an isolated evidence-directory venv with pypdf successfully extracted the full WHO PDF without changing project dependencies. Short Chinese evidence was rejected by the ledger’s word-count heuristic; a longer exact retrieved KF passage was accepted. An extraction line-break artifact caused one optional WHO quote rejection; the accepted LOD quote and procedural quotes were used instead.

## TDD and verification

Each production slice followed observed RED then GREEN:
1. `red-topic.log`: two expected failures, count 14 != 15 and missing topic. After implementation, `green-topic.log`: 2/2 passed after build.
2. `red-coa.log`: expected missing sample-identifier review text. After deepening, `green-coa.log`: 1/1 passed after build.
3. `red-links.log`: expected missing reciprocal related link. Implementation added both links and localized labels. First full run (`npm-test.log`) found a test incorrectly assumed no Astro scoped attribute between href and text (47/48); inspected actual HTML and made the assertion tolerate attributes without weakening the label check.
4. `npm-test-final.log`: `npm test` passed, **150 pages, 48 tests, zero failures**. Covers canonical/hreflang/sitemap, local link resolution, exact hub H1/URLs, new topic boundaries, COA review content and reciprocal descriptive links. JSON formatting restoration preserved identical decoded content.

Baseline supplied by parent: npm ci / npm test passed at 148 pages and 45 tests; 14 existing dependency advisories remain outside this content scope. No dependencies, lockfiles or unrelated pages changed. Browser QA, independent review and release are intentionally left to parent. No server started; no commit, push, merge or deployment performed.

## Sources

[1] https://www.who.int/docs/default-source/medicines/norms-and-standards/guidelines/quality-control/quality-control-methods-for-medicinal-plant-materials.pdf — Quality control methods for
[2] https://www.metrohm.com/en/discover/blog/20-21/oven-method-for-sample-preparation-in-karl-fischer-titration.html — Oven method for sample preparation in Karl Fischer titration
[3] https://www.metrohm.com/zh_cn/discover/blog/20-21/moisture-analysis---karl-fischer-titration--nirs--or-both-.html — 水分测定——卡尔费休滴定法VS近红外光谱法

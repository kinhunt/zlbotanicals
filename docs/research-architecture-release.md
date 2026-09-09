# Research architecture release — 2026-09-09

## Scope and review boundary

Base: `ccaba2d089392af1601a501575b2dba3980679bc`, clean main, no concurrent worktree/writer observed. Branch `feat/research-architecture`. Parent release owner must independently review, then merge only passing checks. This document does not claim independent approval or production publication.

- New `/research` and `/zh/research` hubs: ingredient science, applications, papers, substantive market-method analysis and dated news. Five header groups: Products, Botanical ODM, Research, Quality & Documents, About, plus existing inquiry CTA. Products dropdown has three category/workflow links, not twelve ingredient links.
- `/resources/research` remains the distinct 12-paper library with ingredient/use/evidence filters and no-JS reading. No existing paper is promoted to primary clinical evidence.
- Preserved `/plant-extracts` title exactly `Plant Extracts` / `植物提取物`, all 21 prior topic URLs and seven section URLs. Inspection found constituent-family topics (polyphenols/catechins and sweetener glycosides), but no single-botanical science profiles. Therefore added three specific profiles under the existing canonical ingredient section: `/plant-extracts/ingredients/{green-tea,centella-asiatica,monk-fruit}`, plus their ZH counterparts. Family pages are retained and linked, not duplicated or renamed.
- Each science profile has identity, specification questions, processing context, application trial questions, material/evidence limits and cited sources. Product → profile → relevant product/industry/ODM/papers links use shared product IDs. Paper cards link back to matching profiles. No random recent-content links.
- Market section is substantive World Bank WITS-based analysis of trade comparability, CIF/FOB and mirror-data interpretation; it does not estimate ingredient market size or publish growth figures. Historical news explicitly retains its 2022-11-30 date and historical status.
- No image, diagram, video, caption, narration or artwork-reference changes. The 12 original product WebPs remain. Blob checks in `research-qa/preservation.json` verify 36 protected files unchanged against base, including EN/ZH media and versioned video configuration.

## Sources and limitations

Actual EN/ZH keyword searches and failures are retained in `research-architecture-searches.json`. Successful English searches located EFSA, the Centella paper and FDA documents. Chinese Centella, monk-fruit and trade searches returned candidates; repeated green-tea Chinese searches failed with backend 403 / malformed responses. This is a retrieval limitation, not evidence that Chinese literature does not exist. No search-volume/ranking claims. Chinese secondary health claims were not adopted.

Institutional/original-source retrieval: EFSA scientific opinion (2018); original Centella review hosted by PMC (2024); FDA response GRN 000706 (2017); World Bank WITS methodology; Europe PMC core metadata/abstracts for PMID 39458583 / 39063362. Source IDs, quotations, extracts and citation verification are committed. Several web extracts are partial, visibly containing omissions, and FDA PDF extraction has corrupted numeric text. No corrupted assay/sweetness/dose figures are used. Centella reading is abstract plus selected full-text passages, not independent assessment of every cited experiment. Monk-fruit review is abstract-level. Review papers are secondary research, not original experiments, even when retrieved from original publication records.

No invented capacity, assays, certifications, COAs, proprietary research, clinical benefit, market statistics or final-formula performance. Trial and procurement steps are explicitly proposed review questions. Regulatory documents are identified in their specific material/context, not treated as universal or current product approval.

## Timely discovery: integration, not a claimed running pipeline

Existing `scripts/refresh-editorial.mjs` remains unchanged and tested: locally acquired Europe PMC core or news candidate JSON → draft inbox → human/source review → explicit reviewed source-data edit → bilingual tests → independent PR → rebuild/deploy. No auto-publish flag, build-time fetch, cron or background monitor is added.

Future monitored discovery owned by the parent may:
1. Query Europe PMC using species aliases plus material/application terms; retrieve publication/revision identifiers and correction/retraction context. Maintain cursors and bounded lookback outside the evergreen pages.
2. Monitor original EFSA/FDA/EUR-Lex notices for actual event dates and applicable status, not page-update timestamps. Market inputs need report/code definitions, geography, time period, observed versus estimated values and method; ungrounded growth figures fail review.
3. Save retrieval time, original URL, body/abstract and failures; map candidate products by shared IDs; import through the existing draft-only CLI. Never write directly into published JSON from a scheduled job.
4. Notify a named editor; the editor records source, material, experiment type, applicability, EN/ZH equivalence, limitations and review scope. A qualified market-specific reviewer is required for regulated claims. Missing source or reviewer means retain draft, not fabricate content.
5. Deduplicate PMID/DOI/source URL and report monitoring failures. Publish only through independent PR review. No monitoring reliability or freshness claim is made until such a job is actually installed and verified.

## Executed verification

- Baseline `npm test`: 70/70. New failing tests observed: six versus five nav groups; absent Research hub; absent botanical science profiles. Then implemented each slice and obtained GREEN. Updated legacy expectations for the approved taxonomy, while preserving all route/content checks.
- Final `npm test`: **182 pages, 73/73 tests passing**. Baseline 174 → 182 routes: two hubs and six profile pages. Static tests check every internal page/asset link, single H1/title/description/canonical and encyclopedia reciprocal EN/ZH alternates/sitemap.
- Research browser smoke: 40 route/viewport/language checks at 390, 768, 1024, 1440; five-group mobile/desktop nav; keyboard dropdown; profile-product round trips; filter results/empty/reset; EN/ZH no-JS full papers and profile journey; no page errors or form submissions.
- Product imagery browser smoke: 56 checks, including 48 detail checks across all 24 EN/ZH product routes. Buyer-tools smoke: eight viewport/language combinations with downloads, print, paths and no-JS.
- `verify-extraction-media.mjs`: both 62.7-second H.264/AAC videos and all per-scene audio checks pass. Narration browser smoke confirms decoded, unmuted nonzero EN/ZH audio energy and captions.
- Screenshots: `/tmp/zl-research-qa`. Full-page captures initially included the keyboard-open dropdown obscuring the hero; browser script now dismisses focus before visual capture. No actual hero/H1 defect or horizontal overflow was found. Vision inspection is a visual check, not independent code/content review.
- Citation ledger `verify --evidence`: all 5 cited sources resolve and have attached verified quotations. Proposed workflows are intentionally not presented as sourced experimental findings.
- `git diff --check` passes. No secrets, eval, shell construction, external runtime fetch or raw HTML rendering added. No business form submitted.

## Known pre-existing dependency risk

`npm ci` reported 14 vulnerabilities: 1 low, 2 moderate, 10 high, 1 critical. This differs from the older governance count; no dependency/package-lock changes were made. Static rendering is not proof advisories are irrelevant. A separate tested dependency upgrade remains necessary.

## Release handoff

Parent must inspect the final exact SHA and source scope, perform independent review, confirm PR checks, merge, and separately verify production deployment/content. Local browser passes do not prove production access; protected Vercel previews may still require owner access. Roll back by reviewed revert commit, not force-reset. No additional user approval is requested.

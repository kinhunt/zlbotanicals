# Turmeric procurement implementation — 2026-09-12

Base: `48a594e89f4e4ef5e50536c9ac10c62322b0bc87` (latest origin/main at start).

## Scope and evidence

Read both research reports and the task-local URL ledger before writing. Copies are adjacent. Supplier search results inform buyer questions, not ZL capabilities. Scientific material distinctions and analytical discussion link to the existing sourced turmeric encyclopedia. Cost normalization is a mathematical comparison, not a price quote or efficacy claim.

The existing `/products/turmeric` and `/zh/products/turmeric` now have procurement-specific H1/title/description/social text. Shared ingredient names remain plain. Category URLs/H1/navigation stay unchanged; no turmeric header item existed, and none was invented. Reused turmeric description snippets change on the catalog/category and two related solution pages in each language; other ingredient detail bodies remain identical.

The commercial article covers format selection, assay/method/carrier comparison, delivered-basis cost normalization, application-specific sample evaluation, TDS/COA and supplier qualification, quantities/packaging/logistics, and quotation inputs. Only turmeric bypasses shared dossier, research/news, generic related guides and solution/closing cards. All old commercial fragment IDs survive as aliases beside relevant replacement content. Science adds `#forms` within `#components` plus three contextual purchase links; its prior scientific text and citation links are unchanged.

No image/media assets changed. No form implementation or privacy text changed. Quote/sample/TDS links retain plain-name product prefill. No sales submission made.

## Executed verification

- RED: new title/H1 regression failed on baseline; then passed after implementation. New section/journey regression failed on absent `material-selection`; then passed.
- `npm test`: 200-page build, 145 tests passed, zero failures. Historical tests were narrowed for the deliberately replaced turmeric modules, not removed for other products. The renderer byte-preservation test now strips only the allowed purchase links/forms alias before comparing with the existing baseline.
- New Playwright suite: 8 EN/ZH × 390/1440 × JS-on/off cases passed, including actual bidirectional clicks, unique H1/head/IDs, both real tables, no duplicate paragraphs/cards, original image decode, overflow checks and JS-enabled form prefill. FormSubmit requests intercepted; no submission.
- Existing turmeric-reader suite: 12 cases passed.
- Existing general/browser form suite: 14 views passed; local validation only.
- Built DOM baseline comparison: 200 routes unchanged; all former turmeric IDs retained; 22 other product bodies identical; encyclopedia text/citation links identical after removing the three added purchase links.
- `git diff --check`: passed. Changes contain no credentials, runtime network calls or new user-input processing.
- Full desktop EN and mobile ZH screenshots inspected. Both tables render; no duplicate dossiers/news, blank modules or page overflow. Final sample table gives the description column more width. Original artwork and its non-specification caption retained.

Local full screenshots/results: `/tmp/turmeric-procurement-qa`; science results `/tmp/turmeric-reader-qa`; general form results `/tmp/zl-browser-qa`. Raw final npm log `/tmp/turmeric-fulltest.log`. Scope comparator: `python scripts/turmeric-procurement-baseline.py /tmp/turmeric-baseline-dist` (requires BeautifulSoup).

## Remaining gate / limitations

Independent review belongs to the parent agent after the PR is opened; not represented as completed here. Do not merge until that gate passes. Production has not been deployed or checked by this implementation task.

`npm ci` reports 14 dependency advisories (1 low, 1 moderate, 11 high, 1 critical). No dependency versions changed; this content release does not resolve or dismiss those advisories. No genuine ZL SKU/TDS, batch COA, certificate, stock, MOQ, pricing or logistics schedule was supplied; page fields remain comparison/request requirements rather than supply promises.

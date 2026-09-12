# Sales overhaul verification

2026-09-12, branch `feat/turmeric-procurement-overhaul`, base `04c69b4`.

- `npm test`: **149 passed, 0 failed, 0 skipped**, rebuilding **200 HTML pages**. Final log has no Astro warnings. An earlier incremental build emitted duplicate-id content-cache warnings; a repeat build without source changes was clean. No duplicate rendered IDs were found by browser checks.
- `scripts/turmeric-procurement-browser-smoke.mjs http://127.0.0.1:4334`: **16 cases**, EN/ZH × 390/820/1100/1440 × JS on/off. Checks four tables, all retained meaningful anchors, full product/science journeys, four decoded landscape application images, original artwork, FAQ keyboard operation, narrow-table keyboard scrolling, document/quote/sample links, editable prefill, language-localized SEO and zero page errors. No form submissions.
- Source and served dist were byte-equal on both turmeric routes. No public image binary, category source or encyclopedia content modified. Existing full-suite image hash tests pass.
- Added-line secret/injection/eval scan: no matches. `git diff --check`: clean.
- Test-first evidence: the prior transcript records initial overhaul RED; recovery's sales-copy regression failed on tutorial-style application copy before the revision. It now passes. Browser recovery preserved normal clicks and added viewport/destination assertions instead of disabling coverage.

## Visual checks

Fresh mobile captures show full English and Chinese H1s and both quote/sample actions without clipping. Desktop hero and 1100px no-JS quality table have no overlap or horizontal overflow. The original illustrated beaker label is preserved at the user's direction, with a visible non-specification caption; it is not an approved assay statement.

Screenshot QA caught two harness artifacts, not production layout failures: pending keyboard smooth scrolling cropped an earlier hero capture, and a fresh full-page capture had not triggered lazy-loaded application images. Hero captures now reload and assert top-of-page geometry; full-page captures visit and decode each application image before capture. The image tests also assert actual landscape pixel dimensions. No images were replaced to conceal these findings.

Logs, a 16-case JSON report, selected JPEG screenshots and SHA256 ledger are in `sales-qa/`. Original PNGs for all widths/languages/modes are at `/tmp/turmeric-sales-final-qa/`. The final npm log is `/tmp/turmeric-retry-npm-verified.log`.

## Release boundary

Local preview and static/browser tests are not production deployment verification. No form delivery test was performed. No merge is authorized here. The parent agent must perform independent review before any merge; certificate/batch verification remains separate from the owner's commercial confirmation.

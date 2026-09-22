# Cranberry review package — R1, 2026-09-22

**Verdict: original requires revision; these reviewer-authored EN/ZH replacements are self-checked, not independently accepted.**

## Start here

- `cranberry-pac-purchasing.en.md` — substantial revised article (~1,300 words including references).
- `cranberry-pac-purchasing.zh.md` — corresponding Chinese rewrite (~3,600 characters including references).
- `review-report.md` — exact findings, dates, lab/sample bases, source contradictions, editorial disposition and six bounded next-review items.
- `sentence-review.json` — 128 original sentence/table audit entries across both languages.
- `table2-independent-recalculation.json` and `2020-tables-extracted.json` — direct XML extraction and all 24 row calculations.
- `recheck.py` / `recheck-output.json` — actual executed integrity/arithmetic check; rerun with `python recheck.py`.
- `source-ledger.json`, `evidence-ledger.md`, `quote-validation.json`, `inherited-quotes-rechecked.json` — stable original IDs with fresh metadata sources, supporting quotations and 27 successful inherited-quote rechecks.
- `retrieval-manifest.json` — fresh fetch URLs, status, time and hashes; failed and metadata-only attempts explicitly retained, not cited as full text.
- `verification.json` and `*.verification.txt` — both revisions and report passed citation evidence verification. Remaining warnings are unused ledger entries; sentence coverage is not a quality score, especially for Chinese and advisory prose.
- `original-hashes.json`, `original-integrity.json`, `SHA256.json` — unchanged 35-file original package, exact copied sources, and final review artifact hashes.

## Main corrections

Explicit one-lab insoluble-PAC measurement; May 6 online versus July issue chronology; three-replicate/A-type dimer basis; ratio versus shortfall versus conventional CV; identity-method scope; targeted procurement requirements instead of repeated disclaimers. Original three selected ratios were already correct. Further source contradictions are documented but kept out of the purchasing article. The unnecessary 36 mg/day detour was removed rather than surrounded with another disclaimer.

Full 2026 journal text remains unavailable: publisher HTML blocked, publisher API metadata-only. No new laboratory work, ecommerce sampling, regulatory or clinical conclusions. No website, git or publication actions. A reusable metadata-only API pitfall was added to the `grounded-citations` skill; original research files were not changed.

Next: a different reviewer accepts/corrects the six bounded R1 changes against `SHA256.json`; then separate integration/release checks if authorized. This package is not publication approval.

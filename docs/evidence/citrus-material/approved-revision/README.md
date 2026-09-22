# Revised citrus material-choice package — 22 September 2026

## Final copy
- [English](hesperidin-material-choice.en.md)
- [中文](hesperidin-material-choice.zh.md)
- [Evidence/editorial report and exact draft hashes](final-evidence-editorial-report.md)

Research-only delivery. Nothing published or integrated into the site repository.

## Verification and evidence
- `all-line-review.json`: every line of both final drafts, exact text and editorial judgment (158 rows).
- `final-claim-map.json`: body-line claims/advice and source-file mapping.
- `ledger.json`, `source-file-map.json`, `quote-verification.json`: stable citation IDs and literal evidence matching.
- `inherited-claim-dispositions.json`: original claim map preserved with revision dispositions.
- `provenance/`: all 72 original files, including both complete input packages, copied byte-for-byte.
- `sources/`: fresh full EU HTML/text, exact latest glucosyl entry and raw-derived Amazon text.
- `fresh-retrieval-manifest.json`: successful retrievals and the 404 endpoint retained honestly.
- `amendment-operative-excerpts.json`: six later EU amendment annexes, all affecting other ingredients.
- `verification.json`, `citation-verification.*.txt`: real executed verification output.
- `input-hashes.json`: immutable input baselines; `SHA256.json`: complete package file hashes except itself.

Run `python verify_package.py` from any directory. The checker reads originals for unchanged-input verification; preserve the sibling directory layout.

## Reusable recovery note
The undated CELEX query `02017R2470` returned 404. The official ELI base `/eli/reg_impl/2017/2470` resolved to the current consolidated text and exposed its version banner and dated link. Open and archive that dated ELI separately; inspect the parent act's current-version metadata and later amendment annexes. A Commission index extraction can truncate silently even with a generous requested character budget: retrieve full HTML and parse it before deciding that later updates do not exist. Keep original enactments/corrigenda alongside consolidation, which is a documentation tool rather than the authentic legal act. This workflow is recorded here instead of modifying skills outside the task's sole-writer directory.

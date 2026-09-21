# Rosemary material-selection discovery package

Research-only delivery, 2026-09-21. All task-created files are confined to this directory. No website worktree, shared backlog, browser session or social account changed.

## Start here

- `comparison.en.md` / `comparison.zh.md`: substantive paired comparison drafts, not publication-approved pages.
- `opportunity-card.md`: alternatives, rejected hypotheses, deduplication decision and next review.
- `ledger.json`: isolated URL-to-citation mapping with verified verbatim quotes.
- `source-quoted-ledger.md`: human-readable evidence excerpts. Bracketed references *inside verbatim source quotations* are the original paper's bibliography numbers, not this package's citation IDs.
- `claim-quotes.json`: exact archived-text excerpts; some repeated selections are retained. The canonical ledger includes an additional EU-table cell-boundary quote.
- `evidence/`: raw full-text XML bodies saved with `.raw`, extracted text and the EU/JECFA table with preserved column separators. Empty failed legal responses and the portal shell are retained to document failure, not treated as sources.
- `retrieval-manifest.json`: URLs, response status, raw-body SHA-256, evidence usability and retrieval date.
- `verification.json`: actual citation/evidence check results and literal quote-match result.
- `SHA256SUMS`: all package files except itself, for exact revision checks.

## Claim-to-evidence review guide

| Claim | Package source | Where to inspect | Limit |
|---|---|---|---|
| Distinct essential-oil, water-extract and lipophilic streams | 1 | Introduction and §2.2 | Water stream is contextual, not an experimentally compared treatment; does not prove commercial water solubility. |
| Residual herbal flavour after prior distillation/water extraction | 1 | §2.2 final powder description | Experimental extract only, not a verdict on deodorised commercial grades. |
| Peroxide and secondary-oxidation results diverge | 1 | §3 and Table 4; §2.8–2.10 methods | Do not copy abstract MDA units; no universal ranking or retail-life claim. |
| Essential oil lowest TBARS but extract stronger sensory result | 2 | Results: lipid oxidation and sensory properties; Tables 1/3 | Small sensory panel, specific meat/storage system; no constituent-matched comparison. |
| Composition specification versus permitted use | 7 | §3.1.2 Table 1 and authorised-use section/Table 2 | EFSA 2018 institutional account; current consolidated law not recovered. |
| 90% denominator is phenolic diterpenes | 7 | Table 1 EU column; separate column-preserving text | Not 90% purity of all rosemary extracts, not the adjacent JECFA assay. |

## Exact limitations

Only three bodies qualify as evidence: two primary food studies and a 2018 institutional assessment. EUR-Lex HTML and curl PDF attempts returned empty HTTP 202 responses; Commission portal was HTTP 200 but only a JavaScript shell (47 text characters). One later web-search request returned 403. None of these failures was replaced with search snippets or fabricated source text.

No current legal dose, matched three-way experiment, water-solubility test, microbiological validation, sensory trial by us, stock, certificates, actual batch assay, sales figure or lead-time claim has been established. Papers' “certified additives” or regulatory language is not evidence of our own product status.

Citation verification passed for both drafts and the opportunity card with the evidence-presence gate. Warnings concern five registered failed/unusable URLs deliberately not cited. Coverage heuristics are not semantic approval: EN includes uncited editorial proposals and first-party limitations; the Chinese sentence counter is unsuitable for judging citation density. No claim is made of independent EN/ZH editorial acceptance.

The shared backlog contained no rosemary/迷迭香 text when inspected, but a sibling commercial-discovery rosemary draft already covers delivery-format selection. Parent should merge useful additions or confirm distinct intent before creating another URL. This was not a complete live-site inventory.

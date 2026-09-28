# Psyllium baking research — handoff

## Outcome
One substantive EN/ZH draft selected from three distinct reader tasks. The increment is not another fibre-health article or blank worksheet: it explains how psyllium can improve softness and flour-normalized bread output while failing to improve finished-loaf specific volume or sensory acceptance. Milling hypothesis was narrowed after checking the actual evidence.

- `draft.en.md`, `draft.zh.md`: complete paired article drafts with one sourced table and direct DOI/PMC links.
- `DISCOVERY.md`: initial divergence, small validation, rejected/narrowed hypotheses, opportunity selection and possible commercial/reading links.
- `dedup.json`, `adjacent-published-pages.json`: git-show origin/main evidence; snapshot e9253d594eb13c996d80bc571f183d7ddd605f89. No repository writes or fetch.
- `source-manifest.json`, `sources/`: five original full-text JATS archives with hashes: three bread studies cited in drafts, one psyllium review used for discovery/citation chaining, and one flaxseed candidate study. Derived text and all three bread-study tables are archived separately. Text extraction can duplicate table captions; XML/table cells are authoritative.
- `claim-ledger.json`: 15 explicit claim/synthesis records, original paragraph quotes or table rows, locators and inference limits.
- `search-*.json`, `targeted-*.json`: original Europe PMC discovery responses, not Google rankings or market-demand measurements.
- `verify.py`, `verification.json`: executed author-side integrity checks; **47/47 PASS**. Hashes, original quote presence, core numeric bilingual parity and source links checked. This is not independent factual/editorial approval.
- `retrieval-issues.json`: actual failed fenugreek full-text HTTP500, stdlib parser recovery after unavailable lxml, search narrowing. Neither blocked the selected article.

## Finite review gates before any integration
1. **Independent source review of this revision:** verify C01–C14 against S1–S3 XML, especially S1 Table1 group letters/n values and flour basis; S2 Tables1/6 significance, gumminess vs adhesiveness; S3 volume denominators, target-torque hydration and nonsignificant fresh sensory scores. Preserve contrary results. Source authors' interpretations must not become established causal mechanisms.
2. **Independent EN/ZH editorial pass:** confirm 胶着性 vs 黏附性, 比容 vs 每100克粉料体积, and husk vs seed identities. Ensure the opening remains a useful bakery decision, not a health-claim or supplier-checklist page. Fix only specific defects; review final revision hashes.
3. **Placement/dedup decision:** parent checks freshly updated origin/main and any concurrent drafts; choose one paired article, no duplicate psyllium buying hub or speculative product page. Confirm proposed contextual links. No new route is assigned here.
4. **If later publication is authorized in a separate task:** integrate only reviewed content, implement accessible source-linked table and citations, run real content/build/tests and EN/ZH responsive checks, then verify exact deployed revision/public URLs. Those are future operations, not results of this package.

No website content edited, no commit/push, no account/browser operation, no publication, no fabricated experiment, supplier capability, market size or clinical outcome. Only the assigned discovery directory was used for authored research artifacts. No visual asset was needed: the source table is more useful than a decorative chart.

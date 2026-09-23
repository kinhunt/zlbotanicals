# REPORT — material discovery and complete EN/ZH draft

Status: **research and full drafting complete; author verification passed; independent editorial review still required.** No website files or backlog edited, no commit/publication, no BrowserMan use.

## Deliverables

- EN: `/data/hermes/research/seo-growth/2026-09-23-evening-discovery/material/draft.en.md`
- ZH: `/data/hermes/research/seo-growth/2026-09-23-evening-discovery/material/draft.zh.md`
- `DISCOVERY.md`: three genuinely different reader tasks, selection/rejection reasons, semantic dedup and proposed positioning.
- `claim-evidence.json`: 14 evidence units with source URL, exact original-language quotation and claim boundary.
- `paragraph-claim-map.json`: draft paragraphs mapped to evidence units; editorial recommendations distinguished from sourced findings.
- `sources/`: supplier page text, successful official-brand HTML, original distributor PDF, two complete original-paper XML/text files, Table 4 original XML. Failed direct HTTP403 bodies retained and labelled rather than misrepresented as successful originals.
- `source-manifest.json`, `ledger.json`, `quote-verification.json`, `verification.en.txt`, `verification.zh.txt`, `SHA256SUMS.json` and `verification.json`.
- `inventory.json`, `new-evidence-dedup.json`, search/discovery records.

## What changed the editorial choice

The generic distinction between juice, enriched extract and blended powder already exists on the latest main. We therefore narrowed the article to **incompatible numbers in actual purchasing documents**, with four named commercial examples. FruitSource AG6522 has 65±5 Brix and 3.30–3.70% V on the same sheet; MFC-E50 uses a V-specific 50%; Matakana declares 90% extract, minimum 7% mogrosides and 10% maltodextrin; Lakanto's 1:1 is finished-blend cup-for-cup positioning. These cannot be placed on a single purity scale.

Original 2018 sensory paper adds an independently checkable result: the tested 50.6%-V extract's reported relative sweetness falls from262 to144 to106 as sucrose reference increases5→10→15% w/v. Preserved model-derived status, extract mass basis, water matrix,40adults,15mL/5s/expectoration. No recommended commercial dose or liking/aftertaste inference.

Original 2011 resin-separation paper supplies verified methods only. Excluded its problematic yield/purification arithmetic: abstract says15.1-fold from0.5% to10.7%, which does not match direct division; '3.38g of mogroside V with purity10.7%' is also awkwardly worded. No paper yield extrapolation or claim these suppliers use that method.

## Scope and evidence limits

- FruitSource PDF approved20September2021; not a verified current release specification. Its assay dry/as-supplied basis is not explicit. Historic document identified in both drafts.
- Supplier flavour statements are attributed, not ranked as independent sensory evidence. Public documents do not establish a uniform composition category for 'monk fruit flavour'.
- Supplier published pages are not batch analysis or current availability. No supply capability, certification, price, health benefit or regulatory authorization assertion adopted.
- Layn page registered as discovery source[3], intentionally not cited: confirms a portfolio but adds less than the named specification evidence. Verifier warning about unused[3] is expected.
- Some default search calls and direct supplier HTML requests failed403; SerpAPI discovery and web_extract recovered supplier text, direct HTTP recovered the critical PDF and brand declarations. No browser occupation. Search results used for discovery only, not as full-text evidence.
- This is an author-checked draft package, not independent approval or rendered-site QA.

## Main / verification

Both origin/main and remote main confirmed`880c43562b117bde8d2bb4e8489a78cba07a8259` (PR64). Inventory read using`git show origin/main`, not the working branch. Main src scan found no occurrences of the six exact new-evidence markers; semantic overlap assessment is inDISCOVERY.md.

14/14 exact quotation checks passed. Both EN/ZH citation verification passes with evidence gate. Coverage percentages are not editorial validation: tables and Chinese segmentation are handled poorly by the generic sentence counter; prose advice is intentionally identified as editorial rather than decorated with unrelated citations. Source text, XML table row and original method paragraphs were read, not inferred from abstracts.

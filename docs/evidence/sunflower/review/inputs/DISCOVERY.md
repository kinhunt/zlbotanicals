# Discovery decision — sunflower protein material selection

Status: substantial bilingual RESEARCH DRAFT. Not independent editorial approval, not publication approval. No repository, backlog, site or account changes.

## Divergence before selection

1. **Pumpkin seed protein for a pourable drink:** distinguish protein concentration from dispersibility. Europe PMC live search returned modification-focused studies and reviews (including EGCG binding to isolate), but the initial general-web query failed with Firecrawl 403. No primary commercial comparison was validated in this branch. Deferred rather than manufacture supplier grades or a 'best dispersibility' ranking.
2. **Sunflower protein green colour as a baking failure:** live search found original cookie/cake studies, including PMC8882756. This would risk becoming another symptom/diagnostic article. Europe PMC full text returned 500; NCBI BioC returned HTTP200 with an explicit 'No result' error, not JSON/full text. Preserved failed response bytes; no cake numerical claims used.
3. **Sunflower protein as an actual material-selection problem:** selected after retrieving two AOT primary pages, Sunbloom's named product page, and a complete original study of commercial yellowish/greenish concentrates. Three independent decisions emerge: extra defatting, particle-size/application grade, and phenolic management. Four real supplier grade examples + two paper materials make a substantial commercial comparison rather than a generic checklist.
4. **Sunflower protein active packaging:** the retrieved paper provides direct emulsion/film evidence, but article-length packaging claims would require regulatory/use and food-contact evidence not collected. Kept the film experiment as a carefully bounded counterexample, not a new packaging sales opportunity.

## What changed after validation

The initial 'greening problem' became **Choosing sunflower protein: what defatting, finer milling and phenolic removal actually change**. Supplier evidence shows a practical purchasing decision broader than colour. Extra CO2 extraction must not be equated to phenolic removal. A finer beverage grade does not establish complete solubility. Higher viscosity can accompany larger droplets in the laboratory comparison.

Unexpected findings worth retaining:
- AOT process prose calls 45 stronger in water binding and 55 slightly weaker, while its table gives lower-bound thresholds >160% and >200%. This is unresolved documentary tension, NOT mathematical proof of a reversed measured ranking: lower bounds do not disclose actual capacities.
- AOT comparison-page prose says three variants but its table has four; table fibre approximations (18/20%) differ from narrative (17/19%). No fibre ranking or number of available grades is claimed in drafts.
- AOT process page calls 45 brownish; its table calls it beige. Draft ties brownish wording specifically to process-page description, not an independent colour result.
- Paper Table2 gives apparent viscosity mPa.s, nearby prose Pa.s. It also gives prose GSF droplet range1.34–1.38 even though CNC row1.31, and prose flow-index range ending1.59 versus table0.59. Draft selects exact non-cellulose E-YSF/E-GSF rows and retains the viscosity-unit conflict.

## Reader and business task

Buyer/formulator selecting samples for a savoury spread versus pale pourable food. Output is an original supplier/material comparison plus bounded paper evidence, not another tea diagnostic or empty worksheet. Commercial handoff: application → acceptable sensory/texture contribution → process constraints → available grade/current specification/matching sample. No invented stock, plant, certifications, current prices, MOQs or market volume.

## Dedup and placement

Read complete backlog.json, lines1–2111, and editorial-discovery-brief.md. None of its cards addresses sunflower/pumpkin protein grade selection. Closest neighbouring topics (psyllium bread water, tamarind hydration grade, flax cyanogenic materials, butterfly-pea protein colour) have different materials and reader decisions. No repository inspection per task restriction; this is backlog-level dedup, not a claim to have audited every live page. Parent should verify full site overlap before assigning URL. Suggested placement: independent application/material comparison under research/resources, with later links to relevant food/beverage and enquiry destinations once actual routes are verified. Do not insert competitor grades into an owned product's offer table.

## Channels and limits

Live generic web_search, primary supplier HTTP retrieval, and Europe PMC were used on2026-09-28. No BrowserMan, actual Google locale/rank observation, GSC, ecommerce purchase, community sampling, market sizing or physical formulation test. Search intent is an editorial hypothesis supported by real material differences, not measured keyword demand. BrowserMan collection by parent is optional enrichment, not falsely claimed here.

## Deliverables

- sunflower-protein-selection.en.md / .zh.md: substantial natural reader-facing drafts, mechanically rendered sources.
- evidence/: original returned HTML/XML, derived readable text, structured original table cells, failed responses retained.
- retrieval-manifest.json: URL/status/time/byte count/SHA256 for successful sources and first failed cake request.
- quote-ledger.json:12 exact text passages and2 cell-mapped numeric rows; ledger.json owns source numbering.
- source-conditions.md: study methods and transfer boundaries.
- verify.py / verification.json: repeatable archive/quote/cell/draft citation checks and artifact hashes.

Remaining gate: independent scientific/table and native EN/ZH editorial review, then parent site-level dedup/placement. No publication was attempted.

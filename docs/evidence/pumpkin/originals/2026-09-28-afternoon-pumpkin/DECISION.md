# Candidate decision and evidence review

Status: substantial bilingual research candidate; NOT publication-approved. Sole writable scope is this directory. No BrowserMan used, no repo/backlog changes, no publication.

## Divergence → selection

| Reader task explored | Evidence/value | Decision |
|---|---|---|
| Best pumpkin protein by grams per serving | Original3ASINs but missing serving masses/labels; ranking would be invalid | Reject nutrition ranking; preserve denominator gap |
| Pumpkin versus sunflower emulsification | Sunflower manuscript already has dedicated supplier/emulsion research | Reject near-duplicate commodity swap |
| Interpreting cold-pressed/fine-milled/easy-mix retail propositions | Original8search/3details plus real supplier processing and primary original-cell contrasts | SELECT: bridge commercial positioning to distinct preparation experiences |
| Roasted versus unroasted pumpkin ingredient selection | Austrade paired primary pages with actual limits, species/process differences | Include meaningful supporting section, not causal roasting experiment |
| Upcycling press cake for cultivated meat media | Original full text recovered; grinding/cooling changes and cell application too specialized for retail article | Brief bounded milling example only; no food-grade/health extrapolation |
| Supplier specification consistency case | Cambridge2020 originalPDF60-name/≥80-cell/65-nutrition conflict | Compact example with rendered original evidence; not a scandal or ranking |

Chosen reader: brand/product developer deciding whether the promise is daily protein, a kitchen ingredient, a shaker powder or roasted-flavor food. Artifact is a narrative original-sample article, not another RFQ worksheet or sunflower-style emulsifier comparison. Draft keywords derive from observed original retail query/terms and targeted scientific/supplier searches; no measured volume/difficulty, locale-specific SERP or ranking claim. Chinese is independently composed, not sentence-for-sentence translation.

## What changes the argument

1. Original search really contains8records including2Sprout sizes; only3distinct-brand details inspected. Original wrapper JSON decoded and read in full. Wrapper names, script/UI contamination and duplicates preserved under inherited/. No new Amazon retrieval or image inspection here.
2. Austrade public DOM composition-item cells, not HTML tables: unroasted protein≥60/moisture≤10/fat≤10; roasted≥57/≤8/≤17 despite both names60. Protein method and basis absent in inspected page. Supplier scope is primary own-product statement, not independent manufacturing verification.
3. CambridgePDF29pages archived. Rendered pages1,3,4 inspected with vision. Text extraction loses equals strokes (renders≥80, text>80); do not silently use extraction comparator. Page3 flow order is raw receiving→machine sieving→expression→cake→milling→packaging→storage→shipping; flattened text puts boxes out of order. Page4 protein65 lacks own unit. Date2020; no current certification/COA adopted.
4. PMC9777787 full original JATS: Table1 ±half deviation range n2; Table2 ±SD n12 (triplicate size tests of4extractions); Table3 ±SD n4 after pooled same-day isolates. Table3 UAE6.59 atpH5 > AE+US4.90; pH9 UAE46.87 andAE+US46.93 sharec. Table2 AE+USd10 grows vs control while d90 shrinks; prose blanket smaller/AE+US greatest reduction overstates entire distribution. Draft retains conditional reading.
5. PMC11748320 full original JATS: Table4 has rowspan3 extraction categories; alkaliUT10.32c/CH9.75d/MH15.99a, means±SE n3. Generic prose saysMH>CH>UT but actual alkali CH<UT (and enzymeCH<UT). Draft uses actual cells. WSI day-long hydration is distinct from PS and consumer mixing. Table2 prose moisture minimum8.23 misses7.95; fat prose10.64 vs table10.63; not used. No quantitative composition/yield claims adopted from this paper.
6. Frontiers original fullHTML supports grinding/cooling confound and changed profiles. No digitized figure numbers or4x multiplier adopted; no cell efficacy or safety claims.

## Retrieval failures and scope

- Some web_search calls failed Firecrawl403; other calls returned results via available fallback. Search descriptions were discovery only.
- Green Spring primary page returned403; raw response archived, citation7 registered but excluded from drafts. No snippet-based claim adopted. Austrade actual source HTML is successful alternative.
- EuropePMC DOI-search endpoint returned non-JSON once while looking for milling paper; publisher fullHTML then obtained successfully. Two other EuropePMC original fullTextXML calls succeeded with complete Methods/Results and tables.
- execute_code kernel unexpectedly lost state once; failed before writing. Durable build_evidence.py replaced transient workflow and executed successfully.
- No formal reader-independent review yet. Naturalness/source reconciliation here is author review, not independent approval. Visual inspection here covers supplierPDF only, not retail labels or article layout.

## Exact remaining evidence gaps

- Exact-ASIN labels/serving masses/ingredient panels remain parent-owned, uninspected. Do not rank18vs20g or infer % from bag/serving counts. Sprout Blend conflict remains unresolved.
- No retail batch particle distribution, wetting/dispersion/solubility, taste or sediment trials; no purchase or matched industrial grade identification.
- Austrade current signedTDS, assay methods, basis, current batchCOA, certifications and actual supply terms not collected; website limits remain attributed. Roasted salting plus single-ingredient marketing not resolved into composition/purity.
- Cambridge contradictory protein figures, units and current revision need supplier clarification; historical source cannot set usable protein purchase minimum.
- Scientific dispersibility evidence is indirect: no controlled shaker-disperse test of these retail powders; extracted-isolate solubility is measured, not retail instant dispersibility. Milling paper changes cooling and grinding together.
- No implemented recipe, mesh recommendation, shelf-life, food-grade, allergen-safety or health claim. No release/integration/visual assets requested or produced.

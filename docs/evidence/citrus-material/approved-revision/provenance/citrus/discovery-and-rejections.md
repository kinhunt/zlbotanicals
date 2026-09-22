# Discovery, changed hypotheses and dedup — 22 September 2026

## Scope and inputs
Research-only. All task artifacts are isolated under this directory. No repository, backlog, continuation, browser session, account or publication was changed. Read editorial-discovery-brief.md, the 22 September continuation, the supplied backlog (all candidate titles/statuses extracted into backlog-dedup-snapshot.json), b2b-content-operations and grounded-citations skills. Read the prior botanical-opportunity citrus candidate and primary paper; the primary XML was fetched anew here.

No browser was used by instruction. Discovery used web search and SerpAPI, then direct HTTP retrieval of originals. Search was qualitative opportunity discovery, not keyword volume/ranking research. No ecommerce or community sample was collected; no trend popularity or market-size claim is made.

## Materially different candidates explored

### 1. Citrus flavonoid material choice — selected
Reader: purchasing/R&D deciding whether to preserve unmodified hesperidin identity or choose an enzymatically modified water-oriented food ingredient.

Primary evidence: S1 (2023 protein co-precipitation study) and S2 (2022 enzymatic preparation and in-vitro comparison), both complete article XML with methods/results. Commercial evidence: D3 CITRAPEAK official product specification; D1 actual Alpha Glucosyl Hesperidin cosmetic PDF; D4 manufacturer's explicit food/cosmetic-grade distinction. Regulatory evidence: R1 complete EFSA assessment, R4 original EU authorisation PDF, R5 corrigendum and R6 dated consolidated Union list.

Original increment: public commercial specs distinguish MGH mass from equivalent-based total hesperidin; real food/cosmetic products are separate. Crucially, authorisation changes supply eligibility and the final metal limits differ from the earlier assessment. This is a procurement choice with legal and chemical consequences, not another sediment worksheet. Commercial handoff is a material-specific enquiry, without ZL stock/brand-distribution claims.

### 2. Deglycyrrhizinated liquorice versus flavonoid-standardised liquorice — held
Reader: supplement developer deciding whether reduced glycyrrhizin is sufficient to define an interchangeable ingredient.

A1 is an actual complete primary trial text: GutGard in functional dyspepsia, 50 randomized participants, 75 mg twice daily for 30 days, defined glabridin and total-flavonoid minima and glycyrrhizin maximum in Methods 2.1. A2 is the manufacturer's retrieved discussion of the named product; its full HTML contains extensive site-wide product/reference material, so unscoped extracted text is not a clean single-product specification. The primary study's product composition is clear, but this is a branded-material trial, not a comparison of deglycyrrhizination routes or ordinary DGL products. Manufacturer involvement in randomization is explicitly described in Methods 2.2.

Useful next artifact: two or more actual official DGL specifications plus manufacturing/compositional work, to distinguish reduced glycyrrhizin from retained-flavonoid profile. Do not transfer the branded trial's outcomes to all DGL or all liquorice. Held because a general DGL comparison now would outrun the commercially verified cross-product evidence, not because liquorice is commercially uninteresting.

### 3. Citrus fibre for texture or tablet disintegration — held
Reader: developer seeking a functional citrus side-stream material rather than a flavonoid active. This changes both value-chain position and purchasing objective.

A4 is the actual Herbafood Herbacel AQ Plus official product page, describing water binding, texture, emulsion functions and particle-size options. The surfaced primary tablet-excipient study (PMC3969490, DOI 10.1208/s12249-013-0059-6) would create an unusually different reader task. But Europe PMC returned a 500 JSON response, PMC HTML was a reCAPTCHA page, and BioC returned no result. These failed bodies are archived as A3/A3b/A3c and MUST NOT be treated as article text. Search also surfaced emulsion papers, but no complete primary emulsion text was retrieved in this branch.

Held: official product evidence is real, but tablet results cannot be generalized to food-emulsion replacement from snippets. A future piece should choose one task (food texture OR tableting) and obtain the matching primary methods/full results, rather than present an all-purpose citrus-fibre substitution guide.

## Hypotheses changed or rejected

- Initial citrus lead: protein co-precipitation could provide the core commercial answer. Rejected as the main route: no actual commercial grade or acidic clear-drink performance is established. Kept only as a distinct research route.
- 'More soluble hesperidin' might be only a physical grade change. Rejected: glucose attachment changes molecular identity, and the specified product includes unreacted hesperidin.
- A high-MGH powder should maximize purity without residual hesperidin. Rejected as a universal procurement rule: the EU definition deliberately includes a residual hesperidin range.
- Cosmetic brochure solubility figures could anchor a food-grade comparison chart. Rejected: no full method/temperature in that displayed comparison, different declared grade and no need for a numerical chart.
- EFSA opinion could stand in for current EU permission. Rejected: the actual 2025 act narrows categories, excludes young children from supplement uses, imposes a protected supply route and has stricter metal specifications than the opinion table.
- A matched generic assay could establish EU substitutability. Rejected: sourcing eligibility has to be evidenced separately from chemical identity.
- Greater aqueous affinity implies stronger antioxidant/clinical benefit. Rejected: S2 did not find a significant difference between hesperidin and the glucoside in its DPPH/ABTS comparison; no clinical benefit is claimed in the draft.

## Dedup and placement
The supplied published inventory contains tea, stevia, Centella, ginseng heat, paprika/quillaja/rosemary, elderberry, saffron and hibiscus, not a hesperidin material-choice article. The prior citrus work is an unselected candidate, not a release. The new draft does not duplicate the protein-solubility candidate: it resolves its commercial-grade evidence gap and adds actual legal supply constraints.

Generic 'check assay/method' language overlaps the elderberry/Centella discipline, and food/cosmetic differentiation overlaps a tea candidate. These are supporting checks, not the new primary intent. The incremental task is choosing between chemically different citrus materials with an actual protected-market supply route. No blank worksheet, symptom diagnostic tree, efficacy article, dose calculator or numerical chart was produced.

Suggested eventual internal connections: existing Plant Extracts hub; beverages solution; quotation enquiry. No new route or published URL has been assigned. One EN/ZH pair = one substantive article. No change to shared backlog.

## Research limitations and review gates
- R1 reports applicant primary data but is a safety assessment, not a directly obtained proprietary study dossier. Keep this attribution.
- R6 is a consolidation dated 16 March 2026, not a verified latest-as-of-22-September consolidation. Draft explicitly requires later-change checks before launch. Independent reviewer should check subsequent EU amendments/authorisations before turning this into current legal advice.
- FDA original letter/amendment downloads redirected to apology/404. No FDA permission, GRAS scope, US dose or no-questions claim is included in the draft. Search snippets were not used to fill the gap.
- D1 is archived for internal research. Its reproduction restriction remains in the source. Do not automatically publish the PDF or copy its graphs; link to the origin instead.
- Automated citation checks validate links and attached literal evidence, not editorial acceptance. EN coverage heuristic reports 31%; uncited prose is largely purchasing advice and bounded interpretation. ZH's 100% metric is not meaningful because the script recognizes few Chinese sentences. Independent bilingual and factual review is still required.
- Local tooling issue: XML extraction first attempted unavailable BeautifulSoup XML parser; recovered valid S1/S2/A1 with stdlib ElementTree. pdftotext was unavailable; pypdf was installed and used. Initial successful XML HTTP status was lost in that parser exception; manifest transparently records status null, validated complete XML and hashes rather than inventing HTTP receipts.

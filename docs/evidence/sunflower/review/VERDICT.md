# Sunflower independent source and EN/ZH editorial verdict

## Decision and exact scope

**Original revision: CORRECTIONS REQUIRED. Corrected copies: SOURCE-ACCEPTABLE WITH STATED LIMITS; ENGLISH AND CHINESE EDITORIAL PASS for this research handoff. NOT PUBLICATION APPROVAL.**

The four numerical observations survive independent parsing of the original JATS cells. The important missed error was structural: the draft transposed the study table but kept an instruction to compare statistical letters within columns. That instruction would compare unlike metrics. Both copies now say to compare across the same row.

The source records support a material-selection article, not comparative brand performance, food/feed interchangeability, food-grade certification or a commercial recipe. This is a read-only independent review of the supplied archive, not a new live retrieval. No repository, browser, backlog, source draft or external publication was changed. All created files are within this directory.

## Revision binding

Original source package: `/data/hermes/research/seo-growth/2026-09-28-midday-discovery/`.

Original EN SHA256: `237ba32f4a7cbd4a8347f5fc3a5846be0f09dc8decdc520918a35725f2a1ecb0`.

Original ZH SHA256: `61a1a74f82ef7c8992eb7d80efafe5c97d31437d84afd603dd0d7349515f781f`.

Corrected `sunflower-protein-selection.en.md` SHA256: `c82830cee0382898ba53d327f6cc09c4c8fc4dc0ebcd4a0df1f66cda435618da`.

Corrected `sunflower-protein-selection.zh.md` SHA256: `22d6fe42e8fac31080990ce3377c796babc82a05aac7a2f5ff3c7586dcbca736`.

These editorial judgments apply only to the corrected hashes above. `artifact-hashes.json` binds the remaining review artifacts and archived inputs; it does not include itself.

## Finite corrections made

1. **Statistical orientation:** original Table 2 puts each metric in a column, but both drafts put metrics in rows. Corrected the reading direction in both languages and named ANOVA/Tukey, p < 0.05. No significance letters or values changed.[4]
2. **Unsupported milling specificity in the headline:** Sunbloom says BEV is “finer”; its retrieved product page does not establish how that difference was achieved. Replaced “finer milling” with “finer particles” in EN and “细化” with “粒度” in the ZH headline. The body continues to attribute the supplier's positioning rather than asserting a milling process.[3]
3. **Protein minimums versus actual dose:** ≥45% and ≥55% on a dry-mass basis are supplier minima, not two measured sample compositions. Replaced the categorical statement that equal powder doses have different actual protein contributions with a sample-assay/as-supplied-basis instruction, including moisture conversion for dry-basis results.[2]
4. **Colour conflict:** retained the process-page attribution of brownish 45 and beige 55, but now also disclose that the comparison table calls 45 beige. A current sample, not either description alone, should determine colour suitability.[1][2]
5. **Measurement context:** specified volume–surface mean D₃₂ and added the rheology temperature, 25 °C. Kept pH 11, 20 kHz, nominal 525 W, two minutes, two experimental replicates and at least three measurements per sample.[4]
6. **Causal boundary:** explicitly say the commercial YSF/GSF materials differ in processing; the comparison is not a controlled intervention on chlorogenic acid alone. No extension from colour to quantitative phenolic assay.[4]
7. **Laboratory versus food use:** retained the packaging-material context and clarified that the experiment does not establish food-grade or food-contact compliance. Commercial supply alone is not proof of food suitability. This does not label SUNPROTEIN as feed grade or declare it unsafe; the evidence reviewed does not establish those classifications.[4]
8. **Natural prose:** shortened audit-like sentences about retaining qualifiers and not silently converting values; simplified the Chinese ending and improved 澄清饮料/成膜用乳液 wording. Kept only limitations that materially affect a buyer's decision.

## Independent source judgments

### [1] AOT process page — ACCEPT for attributed positioning

Cold pressing of hulled seeds, fine grinding under oxygen exclusion and temperature control, and additional CO₂ extraction for 55 are explicitly present. The sensory and qualitative water/fat-binding descriptions are supplier statements, not independent measurements. CO₂ defatting does not establish phenolic removal. No current stock, certification authenticity or manufacturing capability of another company is implied.[1]

Raw SHA256: `81f33046101278875599e2c500e69d41ce18cd1dec9444375b4b37fae713fa32`.

### [2] AOT comparison table — ACCEPT with documentary limitations

Independently parsed the HTML's real `tr`/`td` boundaries, including its blank corner cell and four product columns: 45 / 50 HO / Extrufix 50 HO / 55. The selected nutrition cells state minimum 45% and 55% dry mass; fat is approximately 10% and “max. approx. 2%”. Do not extend the protein denominator to fat without confirmation.[2]

Water-binding cells are >160% and >200%. These are lower bounds, not batch values and not sufficient to prove the second is stronger. The qualitative process-page ranking remains in tension with the table but is not mathematically disproved by the bounds. The page also has three-variant prose versus four table columns, 45 colour beige versus process-page brownish, and fibre 18/20% table versus 17/19% prose. No fibre, grade-count, amino-acid adequacy or current regulatory-certification claim is carried into the drafts.[1][2]

Raw SHA256: `55c0138407539c30ba1240d076d4d174eb9c3bb82724da624a6c7ea7ecdac73e`.

### [3] Sunbloom product page — ACCEPT for attributed application descriptions

PRO is positioned for medium/high viscosity; BEV is called finer and positioned for low-viscosity mouthfeel and protein/fibre enrichment. The source does not provide a measured particle-size distribution, solubility test, a higher protein specification for BEV, a defined milling step, matched sensory tests or measured equivalence. The corrected draft does not supply these missing details.[3]

Raw SHA256: `12dd67f5a77ec8e0088d21e1afb5679d830979d6674d95de5a540d92af1c8800`.

### [4] Foods 2025;14:824 — ACCEPT for bounded laboratory comparison

Original JATS is a full article, DOI 10.3390/foods14050824; metadata gives 27 February 2025. Materials are SUNPROTEIN concentrates supplied by Bio Technologies LLC. The manufacturer-provided dry-basis composition is not an author-measured batch assay. The draft does not use that composition to derive dosage.[4]

Solubility conditions verified directly: 2% w/w, pH 3/5/7/9/11, room-temperature stirring for one hour, 3,000 rpm for 20 minutes, supernatant Kjeldahl. Author prose supports the near-pH-5 low and pH-11 maximum. Exact graphical percentages are omitted; no figure-image numeric verification is claimed.[4]

Emulsion preparation and Table 1 confirm E-YSF/E-GSF omit CNC/CNF. The manuscript includes eugenol in Methods but omits it as a Table 1 column. The draft therefore describes ingredients and context, not a complete mass-balanced recipe. O/W is correctly 水包油. The emulsion replicate statement is appropriate; film production has its own triplicate statement and must not be conflated with the selected emulsion data.[4]

The selected original Table 2 cells are:

| Original row | Original column 2: D₃₂ (μm) | Original column 7: η at 10 s⁻¹ (mPa.s) |
|---|---|---|
| E-YSF | 0.90 ± 0.01 d | 29.6 ± 1.8 e |
| E-GSF | 1.34 ± 0.02 c | 135.2 ± 12.6 c |

Source Table 2 footnote: “Means with the same letters in the same column do not show statistical differences (p > 0.05).” These exact cells and the header, not a flattened string, determine the corrected display.[4]

The discussion's Pa.s conflicts with Table 2 mPa.s. The table is retained as a clearly attributed reported value, not declared to be the verified physical unit. Absolute viscosity requires clarification before calculation or specification use. Further manuscript problems—GSF droplet range 1.34–1.38 excluding the CNC 1.31 cell; n range ending 1.59 versus table 0.59; YSF prose range starting 29.5 versus cell 29.6—are not reused. These limit confidence in copied narrative summaries but do not erase the directly reported bounded comparison.[4]

The source introduction discusses sunflower meal often intended for animal feed; this does not make the study concentrates feed grade, nor make feed meal interchangeable with the suppliers' food-positioned ingredients. No animal feeding experiment, human efficacy test, food-contact approval or food-grade validation is established by this study.[4]

Raw SHA256: `6cc9f88608b84044f27c6af9551516620da4bd935d953c62b390666f04706291`.

### Excluded cake source — NOT EVIDENCE

The archived PMC8882756 XML attempt is a 500 JSON response; BioC's 200 response says no result and is not article JSON. Both failures are preserved, correctly uncited. No cake results, numerical or otherwise, enter either corrected draft. No new source retrieval was necessary for the finite corrections above.

## Every proposed display: type and editorial choice

**Display 1, supplier grade selection (EN and ZH): KEEP as a qualitative comparison table.** It has four attributed grade rows and three columns: identity / supplier wording / buyer implication. The first two rows contain minimum specifications; the last two contain application positioning. These are deliberately not commensurable performance scores. A narrative matrix is useful for sample selection; a bar chart, heat map, league table or shared numeric score would manufacture comparability. The third column is editorial procurement guidance, not supplier-tested outcomes. Leave protein minima as qualified text, not numeric-only cells. This is research/resources material, not an owned-product offer table.

**Display 2, E-YSF/E-GSF study subset (EN and ZH): KEEP as a small numeric evidence table with the unit caveat immediately nearby.** Two materials share the experimental framework and each row uses a single metric/unit, so the side-by-side table is appropriate. Keep ± terms and significance letters as reported; do not relabel the ± terms as SD/SEM because that definition was not established for this table. Corrected letters are interpreted horizontally. Do not chart viscosity against diameter on one axis, convert mPa.s to Pa.s to reconcile the prose, plot a false dose-response, or turn the two points into brand scores. If a later format cannot keep the methods/unit caveat next to the numbers, omit the absolute viscosity row rather than leave an unqualified graphic.

**No other reader-facing tables are proposed.** Protein/fat/water-binding comparisons remain qualified prose; no specification dashboard is justified. Original Tables 1–4 and the complete AOT table are parsed into `original-cells.json` for evidence only. Table 1 is not a complete recipe; Tables 3–4 concern film mechanics/colour and are outside the selected reader task. They are not approved for derivative displays by this review.

## Verification and deliverables

Executed `python research/seo-growth/2026-09-28-midday-review/sunflower/verify.py` from `/data/hermes`.

Result: **PASS, 167/167 checks**, including input hashes, unchanged originals, raw HTML/JATS quote matches, original row/cell/header parsing, E-YSF/E-GSF recipe identity, exact destination table coordinates, units, statistical orientation, methods, source ID mapping and strict evidence-backed citation checks for both languages. This executable is new independent verification; it does not merely accept the discovery package's derived cell JSON. Mechanical success is separate from the source/editorial judgment above.

Files:
- `sunflower-protein-selection.en.md` and `.zh.md`: corrected reader-facing copies.
- `original-cells.json`: all four original JATS tables and the supplier table, individual cell text plus original markup, spans and footnotes.
- `inputs/`: byte-preserved discovery package, including raw sources and failed responses.
- `ledger.json`: unchanged four-source ID mapping and exact source quotes.
- `verify.py` / `verification.json`: runnable verifier and actual results.
- `artifact-hashes.json`: SHA256 manifest for review artifacts and inputs.
- `VERDICT.md`: this independent decision.

Remaining beyond this handoff: site-level overlap/placement, implementation, rendered accessibility/responsiveness, and any publication decision. Supplier documentary conflicts and the manuscript viscosity-unit conflict remain explicitly unresolved; the article avoids claims that require resolving them. No current stock, food-grade certification, food-contact permission, market demand or finished-product performance was verified.

## Sources

[1] https://www.all-organic-treasures.com/food/heliaflor/sunflowerproteins.html — aot-process
[2] https://www.all-organic-treasures.com/food/heliaflor/sunflowerproteins-in-comparison.html — aot-comparison
[3] https://www.sunbloom-proteins.com/sunflower-protein/products — sunbloom-products
[4] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11899123/fullTextXML — sunflower-emulsions

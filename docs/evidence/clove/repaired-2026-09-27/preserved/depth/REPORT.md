# Clove carrier / humidity depth — research-only handoff

## Outcome
Prepared a differentiated EN/ZH research-led article, not a worksheet, with three original full-text primary studies, cell-level tables, exact evidence quotes and a task-local citation ledger. No website, branch, shared backlog, BrowserMan or external publishing changes.

Recommended intent: **carrier selection for clove encapsulates: initial aw versus humid exposure, with compound-loading trade-offs**. Proposed placement is a formulation/research article linking to the existing moisture-vs-loss-on-drying standard; no new canonical URL has been created. Ready for independent editorial/source review, not publication-approved.

## Current-site dedup
Read origin/main at `0d68a64fb9d92a54fd6f02cd42a7c108c4471ed6` (PR77, Centella topical evidence). Used git show and git grep read-only; did not fetch or mutate refs. No clove/丁香 string matches in tracked src/public at that commit. Archived plant-extracts.json and PlantEncyclopedia.astro snapshots plus scoped matching contexts. Existing `/plant-extracts/standards/moisture-vs-loss-on-drying` explains LOD/Karl Fischer, sample handling and reporting basis; do not duplicate it. Search was textual and repository-scoped, not a claim to have audited every live external page. Existing elderberry material-selection content is not reused as a new elderberry article; elderberry serves only as a bounded cross-material counterexample.

## Sources and conclusions
1. PMC11764740 / DOI 10.3390/foods14020237: fresh Europe PMC fullTextXML exactly matches parent archive SHA256 `72db0fa49292d61696fac6dfaf53c7a909a8c8dbd21c366b01688a2aeca9fcca`. All seven tables independently cell-parsed. Clove buds, 80% methanol extraction, freeze-drying, MD DE16.5–19.5; stated extract:wall 1:4. Initial aw at25C p0.17 versus 1g/75.3%RH/7days hygroscopicity p<0.01. Humidity exposure temperature and percentage equation absent from that method; do NOT silently supply25C, dry-basis g/100g, equilibrium isotherm or kinetic model. Higher-MD four groups all share b; lowest numerical75:25 is not a unique significant optimum. Three separate experimental runs are described, not verified independent industrial lots.
2. PMC11899151 / DOI10.3390/foods14050723: original full text and Tables1/2 support all-MD5.63±0.15% versus all-GA4.10±0.09% moisture in elderberry pomace spray drying. Different material/process/carrier ratio; NOT independent clove hygroscopicity replication. Use only to reject carrier-name-only predictions, not prove process causality. Avoid authors' speculative shelf-life/flow stability language. Its abstract CI27.34 also differs from Table2 SD4 27.75; not used.
3. PMC11510493 / DOI10.3390/pharmaceutics16101251: independent purified99%eugenol study, fixed3:1MD:GA with soy lecithin,32 spray-drying experiments. Table3 DF16 EE96.07/yield33.72 versus DF06 EE47.37/yield65.35 shows distinct optimization outcomes. EE definition differs from clove phenolic EE. No sensory retention or humidity test replication. Paper contains prose/table ambiguities (ratio %v/v paired with theoretical content percentages, and prose air-flow described as pumping); draft does not adopt ratio conversions, regulatory/GRAS claims or broad significance claims.

## Alternatives considered
- **Packaging procurement:** insufficient package transmission/seal/desiccant or real-time shelf-life evidence. Keep one bounded qualification paragraph, not a package prescription.
- **Aroma-retention article:** purified-eugenol processing evidence recovered, but no sensory/humidity-linked aroma time course verified. Use as a separate-endpoint caution within selected article, not a stand-alone retention guarantee.
- **Carrier selection:** strongest original numerical comparison; selected. Includes mechanisms only where directly measured, no generic stability reassurance.

## Numeric chart decision
A limited study-specific **numeric table is justified and included**: six aw and hygroscopicity rows, original SD and Tukey groups. `chart-data.json` is verified directly against JATS. An optional two-panel plot may show aw and hygroscopicity separately with SD (not CI), p values and a/b labels; do not overlay unlike units, connect a fitted trend, interpolate MD ratios, present a carrier superiority score or call it commercial powder data. Missing uptake calculation basis and exposure temperature must stay visible. No chart of shelf life, package performance, aroma or pooled cross-study ranking is justified. A numerical visual was not rendered; the draft table is the deliverable.

## Preserved inconsistencies / limits
- Clove Table2 all-MD moisture1.39 versus prose1.30; solubility93.3 versus prose95. All-GA89.9 contradicts blanket abstract>90. Stated in both drafts; disputed columns excluded from main numeric table.
- No aw<0.3 universal chemical/microbial safety, caking prevention or shelf-life guarantee. No conversion of mean+SD to guaranteed upper limit.
- Clove Table4 eugenol loading p0.78 is transcribed as reported, not recomputed from absent raw observations; no best-carrier claim.
- Folin total phenolics, loading efficiency, encapsulation efficiency and sensory aroma are not interchangeable. Accelerated sealed-tube60C/7d data are not shelf-life prediction.
- Search provider succeeded once, then returned403 on narrower query. Recovered via Europe PMC REST literature search; original APIs returned200 valid JATS. No publisher HTML/PDF access is claimed. Europe PMC metadata search is discovery only; primary claims use archived full text. No independent exact clove humidity replication was found in the searches performed.
- Both drafts are authored research copy; no human sensory test, Chinese external editorial approval or live-site publication validation performed.

## Verification
`verify.py` checks archived SHA256s, exact claim quotes, complete main-table parity and citation-tool evidence/strict gates. The citation tool's coverage heuristic reports38% EN and100% ZH but is sentence-tokenization dependent; it does not validate truth or prove Chinese editorial quality. Editorial recommendations are explicitly marked as proposed qualification steps, not research results.

## Main files
- `draft.en.md`, `draft.zh.md`: polished bilingual article, mechanically rendered Sources blocks.
- `claim-map.json`, `ledger.json`: original passage/table claim provenance, 24 mappings.
- `retrieval-ledger.json`, `hashes.json`, `verification.json`, `verify.py`: retrieval status, exact hashes and runnable checks.
- `tables.json`, `elderberry-tables.json`, `eugenol-tables.json`, `chart-data.json`: original cell-structured evidence.
- Three PMC original XML/text packages, fresh/copy clove parity, original REST search results, repository dedup snapshots.

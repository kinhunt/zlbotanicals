# Discovery decision — 2026-09-27

## Outcome
Select **food-grade tamarind seed gum: hydration route before viscosity**. Delivered a substantive EN/ZH material-selection article, not a blank worksheet. Strongest new finding: a seller's actual hot/cold/low-viscosity grade distinction can be paired with a primary study whose samples required 80°C/one-hour preparation and 12-hour rest. That makes an immediate buyer decision visible: a published viscosity result is not evidence that the material fits a cold process.[2][3]

## Dedup and scope
Read `/data/hermes/research/seo-growth/editorial-discovery-brief.md` and entire backlog, updated 2026-09-27T15:46:42.991721+00:00; immutable copies in `inventory/`. Backlog has 44 published cards and gardenia pending integration; excluded all their material intents, including clove/gardenia, tea, stevia, Centella, acacia, pectin, chicory, oat, etc. User says gardenia already published; task treats it as excluded regardless of stale backlog status.

Read-only source scan of `/data/hermes/workspaces/zl-clove-humidity/src` returned zero matches for `tamarind|Tamarind|罗望子|酸角|fenugreek|carob`. A second scan read all 286 relevant text files directly from the exact origin/main Git objects, again with zero case-insensitive matches; receipt `inventory/dedup-scan.json`. This worktree's origin/main is exact PR79 `016b0f5b37bc196bdd7f7e25483eff982d06f9ad`. This is a term/content scan, not a claim that all historical unpublished research was exhaustively examined. No repo, shared backlog or browser writes. No GSC, search volume, demand size, actual quotations, inventory or ecommerce purchases measured.

## Three substantive hypotheses compared

| Hypothesis | Real-source signal | Buyer value and possible original contribution | Decision |
|---|---|---|---|
| Tamarind seed gum: match hot/cold hydration route before comparing viscosity | Manufacturer separates food/personal-care ranges; distributor lists 2A/3S/Glyate distinctions; full primary 2019 study reports preparation and condition-dependent rheology.[1][2][3] | A concrete grade-to-process comparison and source reconciliation: Newtonian marketing versus condition-dependent flow; thermal recovery versus hot viscosity. | **Select.** Most decisive commercial detail plus accessible full primary methods, and not a recent material topic. |
| Carob: distinguish seed-endosperm gum from other carob ingredient intents | CAROB S.A. describes endosperm-derived PALGUM and grades differentiated by viscosity, particle size and colour.[4] | Could distinguish gum selection from powder/flavour/syrup purchasing, rather than another generic COA article. | Hold. Retrieved manufacturer page supports gum grades, but no equivalent primary full comparison of pulp products or syrup in this run. Three-way finished article would outrun evidence or resemble prior apple/vanilla forms comparisons. |
| Fenugreek: low-flavour gum versus familiar seed/spice identity | A seller describes food-grade, high-purity and defatted low-flavour variants.[5] | Potential application-led gum procurement article separating flavour and rheological objectives. | Hold. Commercial signal is real but seller's broad regulatory and health assertions were not verified. More primary sensory/rheology evidence needed; no medical marketing or certification reuse. |

These are editorial judgments about usefulness and evidence cost, not numeric opportunity scores or market estimates. An initial yucca/quillaja search failed at the search backend and was abandoned; existing quillaja coverage further reduced its usefulness. Fenugreek became the third evaluated candidate instead.

## What verification changed

1. Initial search/extraction suggested grade differences. The generic page extractor omitted GLYLOID®3S in its returned text. Direct original HTML retrieval recovered all three rows, avoiding an incomplete two-grade story.[2]
2. “Stable viscosity with Newtonian fluid” looked like a simple material property on the manufacturer page; the original paper reports low-shear Newtonian plateau followed by shear thinning at higher rates/concentrations.[1][3] Draft preserves differing conditions, does not declare either source wrong or pretend samples are equivalent.
3. Abstract thermal-stability language was less useful than the numerical result: 2% w/v, 2 s⁻¹, 3.01→0.13 Pa·s during 5→85°C heating, with recovery on cooling.[3] This is why hot processing texture and cooled eating texture must be separate purchasing questions.
4. The supplier bulletin promotes PGA replacement but supplies no paired formula, dose-equivalence or droplet-size comparison in the retrieved two pages.[6] Draft attributes the promotion and does not inherit it as proof.

## Original increment and commercial connection
Not a new “what is tamarind” encyclopedia stub. Proposed standalone applications/buying article answers **can this grade work in the process I actually have?** It combines an attributed three-grade comparison, laboratory-to-commercial preparation mismatch and a specific heat-resilience misunderstanding. No invented assay, sample data, market share, price or test curves.

Suggested editorial placement after independent review: one bilingual resource article, linked from the existing food application solution and plant-extracts hub if parent confirms final routes and fit. Do not add another product offer or advertise named third-party brands as ZL supply. Commercial handoff: product type + hydration route + texture/emulsion objective + destination market, followed by actual grade/document/sample confirmation. No URL reserved, no publication performed.

## Retrieval and uncertainty
- All selected primary sources archived: original manufacturer/distributor HTML; original article JATS with full Methods/Results; full two-page supplier PDF and per-page text. Hashes in `retrieval-manifest.json` and `verification.json`.
- Original paper: rheology of one laboratory preparation, not commercial-grade equivalence, clinical evidence or shelf-life validation. No independent replication retrieved.
- Source's earlier contrasting pH result is explicitly reported through the 2019 paper; original predecessor not independently read. Avoid stronger cross-study conclusions.
- No independent image digitization. Draft's 3.01→0.13 result is from original Results prose, not estimated from a graph. JATS table cells independently preserved; no table-derived numeric conclusions required.
- No current jurisdiction-specific legal clearance; supplier approval/certification/allergen-free language excluded. No claims about ZL supply/inventory/certificates.
- Supplier pages are undated in this analysis; retrieval date is not publication date. They are primary for their own representations, not independent performance proof.
- Search was web_search, not BrowserMan or a controlled Google SERP. No ranking/region/volume claim; no community sampling.
- Backend failures: yucca search and brochure web_extract hit Firecrawl403; direct HTTPS PDF retrieval succeeded with valid `%PDF`, 2 pages. No browser used.
- Mechanical quote/citation verification is not independent editorial approval. Parent must independently review precise grade wording, bilingual readability and evidence scope before integration.

## Sources

[1] https://www.mpgfc.co.jp/en/pickup/tamarind — manufacturer
[2] https://sociusingredients.com/glyloid — distributor
[3] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC6480175/fullTextXML — tamarind-study
[4] https://carob.es/en/product — carob
[5] https://foodingredients.net/products/fenugreek-gum — fenugreek
[6] https://sociusingredients.com/wp-content/uploads/GLYLOID-Tamarind-Seed-Gum-Bulletin-Socius-Ingredients.pdf — GLYLOID supplier bulletin

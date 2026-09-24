# GOJI bounded procurement discovery — 2026-09-23

## Decision

Add one evidence-led **commercial-material identification module** to the existing EN/ZH goji product journey, immediately after its existing forms/composition table and before assay/quality discussion. Working heading: “Before comparing quotations: identify the goji material behind the name”. Proposed reader copy: `module.en.md` / `module.zh.md`. This is a reviewable proposal, not a release or a new keyword landing page. Do not change the current title/H1. Do not add a Croda product to ZL’s offered forms.

The differentiating content is not another powder-versus-extract definition: the current site already has that. It is an original comparison of three actual supplier/seller declarations and the unresolved approval question each creates, including a clearly segregated cosmetic-liquid path.

## Current content actually inspected

Read-only git-object inspection of `origin/main` at **d387c94c9b7e802e72ca13c97ffd5716b155e4b6**, through the discovered worktree `/data/hermes/workspaces/zl-oat-apple-release`. No worktree files, browser, site or backlog were changed. Full source snapshots and focused goji objects are in `inventory/`.

- `src/data/extract-sales.ts`, goji object approximately lines 878–1002: already promises separate juice-solids powder and polysaccharide-fraction quotations; lists juice powder, aqueous fruit extract, polysaccharide-oriented fraction; covers carrier, sugar, assays/free-sugar correction, dry/fruit applications and certification scope. Title already targets supplier intent.
- `src/content/products/{en,zh}/goji-berry.md`: identity, indicative-not-released specifications, pesticide/sulfite requests, lot-specific COA, certification and supply confirmation. Do not duplicate its generic document list.
- `src/data/deep-ingredients.json`, goji: substantial two-route process/equipment, applications, analytical standards and research map.
- `src/data/ingredient-reader-packs.json`, goji: whole fruit versus juice versus fractions; existing original fractionation study; total-sugar pitfalls, carrier blanks/recovery, membrane MWCO limitations; gummies, drink sachets and capsule plans; whole-fruit trial boundaries; patents. It explicitly lacks a verified goji spray-drying original full text. No Croda, Fruitliquid, glycerin or cosmetic discussion in either goji deep record.
- `src/data/product-dossiers.json`: already asks for milled fruit/dried juice/extracted fraction identity, native solids/carrier accounting and sugar-claim review.

**Remaining gap:** buyers arriving with similar-looking commercial names do not see concrete market examples showing why a carrier-containing juice powder, a headline-standardised extract and a water/glycerin cosmetic product cannot be put into a single price or substitution table. The liquid path is genuinely absent; basic fractionation science is not.

## First-party trigger, not demand estimation

Archived exact rows in `inventory/gsc-goji-rows.json`. Source report window is 2026-09-22 22:00 to 2026-09-23 22:00 UTC; selected rows are partial hourly data (report records firstIncompleteHour 2026-09-23T06:00:00-07:00). All below led to `/products/goji-berry`, with zero clicks.

| Observed query | Impressions | Position | Interpretation |
|---|---:|---:|---|
| goji berry extract powder supplier | 5 | 22 | Commercial material/assay brief; existing page is the correct canonical destination |
| organic goji berry powder bulk supplier | 1 | 39 | Certification requirement to qualify, not a ZL organic offer |
| goji extract | 2 | 50 | Ambiguous format, not a reason for a synonym page |
| fruitliquid goji ec | 1 | 43 | Named Croda cosmetic ingredient; disambiguate, do not impersonate its seller |
| goji berry powder manufacturing plant cost | 1 | 57 | **Irrelevant to this ingredient procurement insertion.** Plant CAPEX/engineering-service intent; no equipment quotation, utility balance or installed-capacity evidence. Exclude from copy and metadata. Existing process education does not establish a plant-cost offer. |

These are small observed impressions, not search volume, a trend, an uplift forecast or verified purchasing intent.

## Three improvements compared

| Candidate | Buyer value and evidence | Duplication / risk | Decision |
|---|---|---|---|
| A. Add another extract-vs-juice powder assay FAQ or calculator | Useful in principle; S1 primary paper and supplier UV shorthand demonstrate why method matters | High duplication: present sales FAQ, detailed standards, free-sugar/carrier protocol already cover this. No real quotes/fruit-solids data for a cost calculator | Do not build standalone. Retain only the minimum scientific bridge in C |
| B. Dedicated organic bulk supplier/organic availability block | Query observed; ORGANICWAY presents organic claims | Existing certification-request text covers general checks. No ZL grade-specific certificate, issuer verification, carrier scope or stock evidence. Branded commercial claims are not certificates | No organic sales promise or separate page. One inquiry qualification paragraph only |
| C. Named commercial-material triage with cosmetic boundary | C4 actual carrier declaration; C5 extract/whole-fruit distinction and solvent wording conflict; C1 authoritative named-product INCI and cosmetic uses. Gives buyers a concrete next question rather than another taxonomy | Some shared definitions, but original supplier observations and cosmetic-liquid branch are new. Must attribute brands and avoid equivalence/distribution claims | **Select.** One product-page module, not a new article/URL |

## Primary commercial observations

**C1 — Croda Beauty / Fruitliquid™ Goji EC.** Live first-party extract archived. INCI reads Water (and) Glycerin (and) Lycium Barbarum Fruit Extract. Applications include face/neck skin care, body care, conditioners and shampoo. This resolves the named query to a cosmetic ingredient rather than fruit juice concentrate or a generic food powder. The retrieved page gives no quantitative extract loading, preservative system or use-level basis for our comparison. Do not infer those from INCI, the EC suffix or the word liquid. Promotional benefit text is not used as efficacy evidence.

**C4 — Kalustyan’s / Goji Berry / Wolfberry Juice Powder.** Direct seller HTML recovered HTTP 200 after extraction-service failure. The explicit ingredient line includes maltodextrin. This is a real commercial example supporting composition-before-cost review. It does not give carrier percentage or establish a B2B manufacturer, batch composition, stock, or a superior nutrition claim. The seller's health claims and its assertion that juice powder has more nutritional value than fruit powder are excluded.

**C5 — ORGANICWAY / Organic Goji Powder.** Direct first-party HTML HTTP 200, archived with readable text. Page separates whole-fruit freeze-dried powder from extract powder, advertises extract polysaccharides ≥50% (UV), but also uses “low-temperature aqueous extraction — using only food-grade ethanol.” It separately calls ≥25% a strengthened version alongside ≥30% standard. These are unresolved page inconsistencies, not proof of actual manufacturing conduct or fraud. No numerical purity ranking, processing reconstruction, certificate assertion or clinical-grade endorsement is justified. The draft uses the solvent ambiguity as a question to resolve and treats ≥50% as attributed marketing/specification wording only.

**Rejected leads:** Joywin's juice powder page was discovered but blocked both by extraction-service and direct fetch; search snippets suggest ≥20%/UV and whole-fruit concentrate wording but are not admitted as verified page evidence in the module. Gojix returned HTTP 200 with only `{"success":true}`; this is not a successful page archive. Generic marketplace/Accio copy is excluded. Search outputs and failed bodies are preserved rather than silently converted into facts.

## Primary science, used narrowly

**S1 — Molecules 2023, DOI 10.3390/molecules28020701, PMC9867462.** Original full-text JATS fetched from Europe PMC. Re-read original methods and results, not merely the existing website summary. Methods describe 10 g crude material/60 mL water, removal of monosaccharides/some oligosaccharides with 1 kDa ultrafiltration, subsequent fractionation, and total-saccharide analysis by phenol–sulfuric acid with glucose standard. Results state no significant total-sugar difference among fractions but differing protein/polyphenol contents. `S1-selected-quotes.json` preserves exact paragraphs.

This is **not a newly discovered efficacy result**; it is already on-site and is reused only to explain why the market comparison cannot be reduced to headline UV percentages. No transfer to finished-product health effects, cosmetics performance or commercial batch equivalence. Searches for goji juice spray-drying primary evidence did not recover a suitable original study within this bounded effort; results for barberry/goldenberry/elderberry must not be relabelled goji.

## Integration and acceptance gates

1. Use the existing goji sales page EN/ZH route and insert after its forms table; implement a goji-specific cited module rather than forcing branded references into the ZL offer object. Exact component/schema implementation is intentionally not attempted here.
2. Preserve existing organic/certification caution; the short inquiry paragraph is material-specific and not a replacement for existing QA documents.
3. Keep supplier names, claims and unresolved wording explicitly attributed. The three rows are not a performance, price or supplier-quality ranking.
4. Request independent bilingual factual/editorial review before release. Recheck live commercial pages for material changes; archive hashes pin this proposal's evidence, not future product revisions.
5. Before any actual liquid/certified quote, obtain grade-specific technical/composition/certification and availability documents. No such documents were acquired in this discovery.

## Uncertainties / bounded-effort limits

- No samples, labels/images, paid certificates, supplier contact, signed specs, COAs, quotes or lot inspection. The evidence establishes what first parties publish, not physical composition or fulfilment ability.
- Croda public page omitted quantitative composition and preservation details. Do not assume preservative-free because only three INCI components appeared.
- C5 solvent and strengthened-grade wording remain unresolved. Its organic and therapeutic language is not independently validated.
- C4 is a direct retail seller reference, not evidence of industrial volume supply or a manufacturing plant.
- No current ZL organic grade, stock, MOQ, manufacturing cost or distribution relationship inferred.
- Scientific XML parser dependency was absent; recovered using Python standard-library ElementTree. Extraction-service 403s were bypassed for C4/C5 by direct HTTP, but Joywin remained inaccessible and Gojix unusable. No browser used.
- No site tests/build were run because no site changes were made. Artifact verification checks citation IDs, expected archived claims, language-pair presence and hashes; it is not independent editorial approval.

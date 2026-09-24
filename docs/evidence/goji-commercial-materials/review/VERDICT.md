# Independent goji editorial verdict — 2026-09-23

**Decision: reject the proposed sales-page placement; retain the original commercial research in the existing goji encyclopedia.** Factual core of EN/ZH is sound, with one material overstatement in REPORT and several precision changes below. Research-only review; no publication approval or site changes.

## Actionable placement

- Override REPORT's Decision, candidate C decision and integration gate 1. Do **not** insert the three-brand table between ZL's sales forms and assay/quality content. That makes a competitor tutorial interrupt the self-owned offer, pushes the buyer away from ZL's quotation path and makes the cosmetic example appear adjacent to offered forms. Disclaimers do not cure this placement problem.
- Keep the existing sales title/H1, offer, forms and quotation journey. Optional `sales-cta.en.md` / `sales-cta.zh.md` are replacements for an existing enquiry paragraph, not another repeated checklist. No competitor names, cosmetic-liquid offering or new supplier capability is introduced there.
- Place `encyclopedia-module.en.md` / `.zh.md` within the **existing goji encyclopedia's material/composition discussion**, after its existing `components` section taxonomy and before moving into application detail. The archived `src/data/ingredient-reader-packs.json` goji record has `identity`, `components`, `applications` and `standards` sections; integrate the comparison as a subsection of `components`, not as a duplicate independent article. Keep existing analytical detail in `standards`; the S1 paragraph here is only a short explanatory bridge.
- Reuse the existing sales-to-encyclopedia navigation if appropriate. This review does not invent an encyclopedia URL, anchor or new route, nor assume which template currently renders each data object. Resolve that from the actual repository at implementation. Do not insert the same table into both deep-ingredients and reader-pack render paths. Archived baseline: d387c94c9b7e802e72ca13c97ffd5716b155e4b6, not a newly verified live release.
- Commercial observations are the substantive new contribution. Keep all three examples and the seller-specific unresolved questions in research; do not reduce the work to another generic assay worksheet. These are deliberately selected examples, not a representative ecommerce study, supplier shortlist or ranking.

## Direct evidence review and corrections

| Item | Independent finding | Editorial action |
|---|---|---|
| Croda INCI | Archived first-party extracted text says exactly `Water (and) Glycerin (and) Lycium Barbarum Fruit Extract`. | Original INCI is correct; preserve spelling and order. |
| Croda applications | Actual listed categories include `Face / neck skin care`, `Body care`, `Hair conditioners - leave on`, `Hair conditioners - rinse off`, `Shampoos` (among others). | Original facial/body/hair summary is defensible but broad; corrected drafts name these exact categories. They are listed applications, not demonstrated efficacy or permission for every market. |
| Croda evidence scope | C1 is an extracted archive containing ellipses, not a complete raw HTML/TDS archive. It supplies no quantitative loading, preservation system or use level in the inspected text. | Say **not established by the inspected archive**, not proven absent from all Croda documentation. No preservative-free, equivalent-grade or ZL distribution inference. |
| Kalustyan's | Read readable source and original HTML text: `Ingredients: Goji berry juice powder, Maltodextrin.` | Correct in both drafts. Seller wording only; do not infer carrier percentage, whole-fruit content, manufacturer identity, commercial availability or drying method. Nutrition superiority/health copy excluded. This is a retail seller reference, not industrial supplier verification. |
| ORGANICWAY solvent | Original HTML prose: `low-temperature aqueous extraction — using only food-grade ethanol`; table additionally says `Food-grade ethanol only`. | Preserve unresolved wording. Ask for process steps/solvents. Do not invent a water-extraction/ethanol-precipitation sequence or allege misconduct. |
| ORGANICWAY grades | Original prose says an **alternative** ≥25% grade; table says ≥30% standard and ≥25% also available. Separate grade-options row says `Standard + high-polysaccharide version`. No explicit mapping of ≥25% to that version. | **Correct REPORT's “It separately calls ≥25% a strengthened version alongside ≥30% standard.” That is stronger than the source supports.** Say grade naming/specification mapping is unclear. Corrected research explicitly prevents that inference. |
| ORGANICWAY ≥50% / UV | Extract ≥50% (UV) is explicitly published, but method detail and batch verification are absent. Supplier also promotes an approximately 1.7-fold extract/powder ratio. | Keep ≥50% as attributed claim only. Two minimum specifications ≥50/≥30 do not establish the actual batch ratio; no purity ranking, dose equivalence, potency superiority or clinical-grade endorsement. “UV” is not a complete assay protocol. |
| ORGANICWAY certificates | Page advertises organic and numerous other certificates/standards; no qualification documents were obtained. | Attribute or omit claims. Do not report them as verified certification, market approval, universal allergen safety, ZL certification or stock. No transfer of seller MOQ/lead time to ZL. |
| S1 original science | Parsed original JATS, not quote ledger alone: 10 g/60 mL; 1 kDa tube removes monosaccharides/some oligosaccharides, then 3/10 kDa fractionation. Phenol–sulfuric acid with glucose standard; total sugars not significantly different (p>0.05), protein/polyphenols significantly different (p<0.05). | EN/ZH statements are supported. Does not establish that C5 used the same method, validate a commercial percentage, show interchangeable batches or prove finished-product effects. Already present in encyclopedia: do not sell as new science. |

## GSC and duplication boundaries

Five archived goji query-page rows total 10 impressions and zero clicks, selected from a larger partial report. These are discovery triggers, not search demand, a trend or evidence that adding Croda to a sales page would convert buyers. The branded-query row is one impression. Keep manufacturing-plant cost outside this insertion; no plant/CAPEX offering is supported. Organic intent justifies qualifying a requirement, not claiming an organic grade.

Reviewed inventory confirms sales already separates juice-derived powder, aqueous fruit extract and polysaccharide-oriented fractions, with carrier/method/supply cautions. Reader pack already covers identity, assay limitations and the S1 study. The genuinely new editorial value is the observed commercial wording and cosmetic boundary, not another material taxonomy.

## Files and verification

- `encyclopedia-module.en.md`, `encyclopedia-module.zh.md`: corrected bilingual research module; all original source URLs retained, seller-specific scope added, grade overstatement avoided, sales CTA removed.
- `sales-cta.en.md`, `sales-cta.zh.md`: optional brief self-owned enquiry replacement, not a new sales offer or mandatory addition.
- `verification.json`: independent source hashes, exact-text checks and output citation checks.
- Original discovery files remain unchanged. All 36 author SHA256 entries matched when reviewed.

No BrowserMan, live browsing, supplier contact, certificates, samples, quotes or site build were used. Croda was checked against its archived first-party extraction, not a fresh technical document. C4/C5 original HTML and S1 original XML were inspected. Publication should recheck changeable commercial pages and confirm the actual existing encyclopedia renderer; this does not block the placement decision or justify putting competitor comparison in sales.

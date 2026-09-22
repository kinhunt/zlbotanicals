# Evidence map and source limitations

Citation identities are generated in task-local `ledger.json`. The document source list is generated from that ledger. Retrieved 2026-09-22 UTC; manufacturer publication/update dates are unknown unless explicitly stated below. Marketing statements outside the narrow claims listed here were not adopted.

| ID | Source / evidence type | Claims supported and archived locator | Important limit |
|---|---|---|---|
| 1 | BENEO official inulin catalogue; primary commercial document | `evidence/beneo-inulin-direct.txt`, “The product range”: ST-Gel high dispersibility, HSI high solubility, HP low-temperature versus HPX high-temperature fat replacement; different inulin groups.[1] | Initial extractor omitted HPX; direct HTML and text recovered it. Catalogue descriptions, not signed specifications, lot assays or comparative test results. Full source includes indicative-value caveat. |
| 2 | BENEO official oligofructose catalogue; primary commercial document | `evidence/beneo-oligofructose.txt`, opening and “product range”: partial enzymatic hydrolysis, shorter-chain material, liquid and powder forms; “Typical examples” includes cereal binding syrups.[2] | Initial extractor empty, direct HTTP200 body recovered. No universal sweetness multiplier or efficacy assertion adopted. |
| 3 | FDA Questions and Answers on Dietary Fiber; official regulatory explanation | `evidence/fda-fiber.txt`, “What isolated or synthetic fibers…” and “Until FDA…” plus “How do manufacturers know…”: inulin/fructans in proposed additions, enforcement discretion, qualifying fibre quantities and recordkeeping.[3] | Does not approve every commercial preparation or a health claim. US-only discussion; not a full worldwide regulatory audit or legal opinion. |
| 4 | PubMed discovery URL; incomplete extraction | `evidence/fos-primary.txt` metadata/references only; direct `fos-pubmed-direct.txt` cookie challenge. | NOT CITED in prose. Do not call it read full text. Successful abstract source has separate ID9. |
| 5 | BASF beta-carotene portfolio; primary manufacturer page | `evidence/basf-beta.txt`: oily dispersions, powders; algae natural-source and synthetic nature-identical routes.[5] | Supports rejected-angle exploration only, not a crystalline/beadlet performance ranking. Search-only brochure and cell-culture leads have not been fully read. |
| 6 | NCCIH Licorice Root; official health summary | `evidence/nccih-licorice.txt`, “What Do We Know About Safety?”: glycyrrhizin-related adverse effects and qualified DGL safety wording.[6] | Secondary clinical summary from an authoritative primary publishing agency, not an original clinical study. Last Updated April 2025. Encoding artifacts in direct text retained; load-bearing English quotation unaffected. Existing site already covers this angle. |
| 7 | COSUCRA FIBRULINE/FIBRULOSE catalogue; primary commercial document | `evidence/cosucra.txt`: XL texturizer/long chain, Instant, LCF liquid; separate dry matter inulin/oligofructose and as-supplied dietary fibre, footnote DP≥3.[7] | Do not compare reported inulin dry-matter percentages directly with delivered fibre. No manufacturer tolerability, health, universal approval or one-to-one replacement claims adopted. |
| 8 | Beccard et al., Alteration of the structural properties of inulin gels, Food Hydrocolloids (2019 issue), DOI 10.1016/j.foodhyd.2018.06.049; primary physical experiment | `evidence/gel-primary.txt` §2.1–2.2: average DP23 commercial BENEO material, 20% dry matter in water, temperature/mixing preparation and 24h texture; §3.5 qualitative hardness trends; §1.1 explicit model caveat. Crossref identity in `evidence/gel-crossref.json`.[8] | Extraction contains detailed methods/results/summary but does not preserve publisher page layout or figure images. No figure-digitized values or cross-study chart. Research rpm not scale-independent shear rate. Text's above-60°C dissolution wording is internally awkward and not used. One water-model material is not a finished-food validation or proof of brand-independent behavior. |
| 9 | Europe PMC core record, PMID25466090, Vega and Zuniga-Hansen; primary paper abstract | `evidence/fos-europepmc.txt`, JSON `abstractText` field in the first result: short-chain FOS, citrate buffer/orange/tomato juices at pH3.5; DP and matrix affect stability.[9] | ABSTRACT ONLY. Food Chemistry 173:784–789, print April2015; electronic October28,2014. No full-text methods, kinetic constants or claim that long-chain inulin shares the reported retention. |

## Core claim audit

1. “Chicory fibre” is not one functional grade: documentary support from two manufacturers, not inferred demand.[1][7]
2. “Instant” differs from “high soluble”: actual separate product descriptors; conceptual difference used as editorial selection guidance, not proof that ST-Gel cannot dissolve.[1]
3. Warmer preparation → more dissolution yet softer developed gels: confined to the study system; no claim that cold production is generally best.[8]
4. HP versus HPX temperature positioning: direct HTML recovery, not search snippet only.[1]
5. Given composition values use original reporting bases and supplier attribution; no inferred water percentage or physical performance ranking.[7]
6. Fibre declaration treatment: actual FDA enforcement-discretion wording retained, not replaced by supplier “approved” language.[3]
7. Suggested full-fat/reduced-fat controls, sourcing enquiry, application screening and cost interpretation are editorial recommendations, not experiments already performed.

## Quote integrity

At least one exact quote per cited source is attached using `sources.py quote --from`; ID8 has separate methods, hardness, mixing and model-limitation quotes. These passes establish literal presence, not independent scientific replication. See the full text above for exact claim context. The package contains no invented numeric trial output.

## Retrieval recovery

Initial web extraction returned empty text for BENEO oligofructose, NCCIH and COSUCRA; direct unauthenticated `requests.get` returned genuine HTTP200 HTML bodies, parsed after removal of scripts/style/navigation. No browser or bot challenge bypass used. PubMed direct returned203 with a cookie prompt, so it was not used as evidence. Europe PMC documented API supplied the abstract legitimately. Generic search had intermittent backend403, not a claim that official sources were unavailable. Raw extractor JSON is retained even where unsuccessful; successful and failed files are distinguished in the manifest.

## Sources

[1] https://www.beneo.com/human-nutrition/human-nutrition-products/functional-fibres/inulin — beneo-inulin
[2] https://www.beneo.com/human-nutrition/human-nutrition-products/functional-fibres/oligofructose — beneo-oligofructose
[3] https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/questions-and-answers-dietary-fiber — fda-fiber
[5] https://nutrition.basf.com/global/en/human-nutrition/portfolio/carotenoids/lucarotin-beta-carotene — basf-beta
[6] https://www.nccih.nih.gov/health/licorice-root — nccih-licorice
[7] https://www.cosucra.com/our-ingredients/fibruline — cosucra
[8] https://doi.org/10.1016/j.foodhyd.2018.06.049 — gel-primary
[9] https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:25466090%20AND%20SRC:MED&format=json&resultType=core — fos-europepmc

# Independent discovery and selection — 2026-09-23

## Baseline and actual-content dedup
Read-only Git object inspection confirmed origin/main **d387c94c9b7e802e72ca13c97ffd5716b155e4b6**. Searched actual src files, not the old checkout branch. `inventory/dedup.json` records matches with line numbers; complete relevant blog files and grape-seed data records are archived in `inventory/`.

| Distinct opportunity | Reader task and evidence found | Actual existing coverage / differentiation | Decision |
|---|---|---|---|
| Apple polyphenol / phloridzin versus apple fibre and pectin | Choose the correct apple-derived ingredient stream; translate molecular, mixture and functional specifications without treating them as interchangeable. Primary sequential-extraction experiment, primary pomace chromatographic analysis, primary non-fruit phloridzin method paper; BGG and Herbafood direct product data. | No apple/phloridzin ingredient article found. Existing citrus pectin article concentrates on gel setting and calcium, with one apple-pectin calcium-reactivity mention; it does not cover apple polyphenol versus fibre identity or phloridzin. | **Select.** Strongest new material coverage and immediately useful sourcing outcome. |
| Grape-seed proanthocyanidin method comparability | Compare colour reactions with oligomer/polymer distribution. Located original 2000 AJEV method-comparison paper and a 2025 membrane-fractionation lead. | Actual deep-ingredients canonical grape-seed record already explains OPC degree-of-polymerization boundaries, colourimetry versus normal-phase HPLC, assay tables and the exact AJEV paper. Cranberry article already treats interlaboratory PAC comparability in depth. | Reject standalone near-duplicate. A later extension needs genuinely new direct material data, not a swapped botanical name. |
| Black-carrot anthocyanin acylation under light | Select pigment against lighting exposure, rather than assume acylated always means stable. Original 2024 study (PMID 38729736) reports non-acylated fractions more stable in light at pH 4.5; separate heat literature exists. | No black-carrot article found, but substantial hibiscus, beet, butterfly-pea and astaxanthin stability coverage exists. Distinct lighting/acylation question remains promising. | Retain for independent future work. More differentiated than another generic colour-stability page, but apple fills a larger material-identity gap and has stronger retrieved supplier contrasts today. |

Searches are qualitative intent discovery, **not search-volume estimates**. No GSC, community, ecommerce or BrowserMan observations are claimed. Sources actually consulted: live search results, full original papers, direct manufacturer pages, and read-only site content. Search JSON files preserve both successful and failed queries; failed search results are not evidence.

## Selected editorial scope
Working slug: `apple-extract-polyphenols-phloridzin-fibre`.
Reader outcome: distinguish four purchasing briefs (mixed polyphenols, marker-defined phloridzin ingredient, functional apple fibre, pectin); interpret three primary studies correctly; choose an appropriate incoming-material and application comparison.

Do not repeat citrus pectin grade tables, calcium-gel tutorial or cranberry laboratory agreement article. Link to the existing citrus pectin article for that narrower formulation task. Apple source-part distinctions and the primary pomace chromatogram area-versus-mass problem carry this article's unique value.

## Evidence that changed the direction
- BGG's actual product page specifies **60% procyanidins powder (UV)**. Search-returned retail “80% polyphenols” language is not substituted into this specification. No claim that ApplePhenon is a phloridzin concentrate.
- Herbafood's current AFB-200/AFB-250 page distinguishes golden-brown and colour-neutral apple fibres. Older AQ Plus Apple/Citrus literature and today's citrus-only AQ Plus page are not mixed into a fictitious universal apple-fibre specification.
- Primary 2024 Golden Delicious pomace table gives **0.73% of total chromatographic area** for phloridzin, not 0.73% w/w of an extract. The main analytical totals also use calibration equivalents and a fresh-pomace denominator.
- Non-fruit phloridzin findings belong to leaves, bark and buds. They cannot support an apple-fruit extract assay or food-use status for another plant part.
- Primary 2023 cascade extraction physically separates polyphenol recovery from later pectin recovery, providing a concrete mechanism for why a shared apple feedstock does not imply substitutability.

## Retrieval and limits
P1 full publisher PDF was recovered from Aarhus University's repository after the ScienceDirect direct request returned a block. P2 and P3 full original JATS XML were recovered from Europe PMC. S2 full supplier HTML is archived. BGG direct raw requests returned HTTP 406; the product page's extracted text was recovered by web_extract, but the brochure raw request failed. Do not label the 226-byte failed response a brochure PDF. No BGG graph was numerically interpreted; no supplier health, certification, availability or shelf-life claim is adopted.

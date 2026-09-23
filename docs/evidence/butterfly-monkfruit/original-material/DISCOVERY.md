# Discovery / selection / non-duplication

## Three reader tasks before selecting

1. **Buyer deciding which quoted monk fruit material is actually comparable.** Original opportunity: audit real named commercial documents and expose incompatible denominators (Brix / V / extract fraction / cup-for-cup finished blend). Reader output: substantive annotated material comparison and an explainable shortlist. Business connection: classify sample request before quotation. High evidence feasibility; highest incremental value once the actual PDF and branded declarations were recovered.
2. **Beverage developer choosing cleaner aftertaste through higher V.** Could investigate temporal sweetness and volatile compounds. Rejected as primary direction: site's existing stevia temporal method and monk-fruit application guide already explain equal sweetness, onset and lingering; current supplier taste claims lack controlled across-grade sensory evidence. No invented purity→flavour ranking.
3. **Processor assessing purification route and yield.** Could compare selective resin extraction, drying carriers and retained juice matrix. Rejected as primary direction: latest encyclopedia already contains route distinctions, EFSA dossier, serial-column patent and III E biotransformation case. The 2011 original paper also has problematic yield/purification phrasing, making a process-yield story weaker than named commercial composition.

## Selected and narrowed

Working title: Buying monk fruit: why 65 °Brix, 50% mogroside V and a 1:1 sugar replacement are different specifications.

Not a generic fruit/juice/extract encyclopedia clone. Central original work is a four-document audit: historic FruitSource AG6522 specification, Monk Fruit Corp E50 grade, Matakana 90% extract/10% maltodextrin and Lakanto erythritol/extract blend. Original sensory paper supplies a defined counterexample to fixed relative sweetness. The narrower flavour section separates sensory description from added flavour preparation and explicitly does not invent a market-wide 'monk fruit flavour' class.

No pivot to citrus fibre or oat beta-glucan was needed: official PDF, two brand compositions and two full original research papers were recovered. The generic material-classification premise *was* repetitive; it was narrowed to incompatible purchasing denominators grounded in commercial documents rather than relabelled as a new encyclopedia.

## Main checked, not working branch

`git rev-parse origin/main` and closing `git ls-remote origin refs/heads/main` both returned **880c43562b117bde8d2bb4e8489a78cba07a8259** (PR64). All inventory reads use `git show origin/main:<path>`. No repository write, fetch, checkout, commit or publication.

Read prior editorial-discovery-brief.md and 2026-09-23-afternoon-continuation.md. Archived scoped current product pages, both-language sweetener market guide, stevia temporal/segregation content and monk-fruit entries in deep-ingredients / reader-packs / ingredient-knowledge to inventory.json.

Existing overlap:
- /plant-extracts/ingredients/monk-fruit already distinguishes decoction, concentrate, V extract and carrier/tabletop blend; contains extraction, regulatory and formulation detail. Do not repeat that as a standalone generic forms article.
- /resources/blog/zero-calorie-sweetener-market-2026 is actually a short buyer guide, not market statistics; full composition, equal perceived sweetness and total application cost are already present.
- /resources/blog/stevia-temporal-sensory contains the actual three-moment sensory worksheet; no new worksheet or disguised protocol clone here.
- stevia-segregation concerns dry-mix sampling; not expanded here.

Exact new-evidence terms (FruitSource, Matakana, MFC-E50, 50.6%, 0.0191, 65±5) returned no hits in current main src text scan (new-evidence-dedup.json). This lexical check supports but does not replace the above semantic comparison.

## Source quality / changes from initial hypothesis

- Concentrate is not simply 'less pure extract': specific HPLC and refractometer fields, permitted amber colour and refrigerated storage change the purchasing comparison.
- Matakana's 90% is ingredient proportion, not a V assay. Its 7% mogrosides cannot be renamed V or multiplied through without clarifying basis.
- One extract's relative potency is 262/144/106 at different sucrose targets in an original paper; this is not an across-supplier ranking.
- Main already covers most purification theory; retained only a short verified methods contrast from full text.

## Editorial placement proposal (not implemented)

One EN/ZH pair, proposed slug `monk-fruit-commercial-specifications`. Cross-link from existing monk fruit sourcing and encyclopedia pages; link readers needing temporal testing to existing stevia methodology rather than create a second blank sheet. Search is intent discovery, not measured demand or search-volume evidence. No claim of likely ranking uplift.

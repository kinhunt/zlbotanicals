# Night discovery: selection and source audit

## Decision

Select **saffron authenticity scope** for a substantial distinct bilingual procurement article, not another blank worksheet or generic ingredient benefits page. Working title: *Buying saffron ingredients: why a grade, a marker assay and an authenticity test answer different questions*. EN/ZH drafts are complete, not integrated and not independently approved.

Original editorial increment: distinguish (a) UV-Vis grading, (b) identity/fingerprint support, (c) targeted substitution screening, and (d) actual extract/formulation applicability. The most useful unexpected finding is an endpoint mismatch inside the 2023 study: detection at 1% through at least three marker ions is not the same statement as the proposed unknown-sample classification rule (>80% of an adulterant's markers). Neither result certifies 99% purity. The seven market samples were negative for the tested adulterants, so this evidence must not become a sensational fraud-prevalence article.[1]

## Existing coverage and continuation inspected

Read editorial-discovery-brief.md, full continuation file and programmatically loaded backlog.json; inspected all card IDs/titles/statuses. All recently published excluded families remain excluded. No backlog or repository writes.

Read-only remote `git ls-remote origin refs/heads/main` returned **2d43a60a578b06068cc975f8f3ca6c8bf2499ac0**, including PR49 elderberry. That object was not in the local author worktree; rather than fetching into that repository, downloaded GitHub's exact-SHA tarball into this task directory. `coverage-main.json` records source contexts and the tarball hash. Scanned all src textual files for saffron/hesperidin/hibiscus and Chinese equivalents; saffron only appeared in existing mushroom-market product-composition examples, not an identity guide. No hesperidin or hibiscus matches. Inspected route/content inventory: no dedicated saffron product page exists. Do not invent a /products/saffron link. Suitable future placement is one EN/ZH resources/blog article with links to existing /products/botanical-extracts, /quality and /request-quote and Chinese counterparts, subject to integration validation. No need to create a thin saffron product page to host this research.

## Three genuinely different opportunities evaluated

### A. Saffron: identity and acceptance decisions — SELECT

- Reader: purchasing and quality teams deciding what an authenticity certificate actually covers.
- Trigger: two primary analytical studies, full XML bodies archived, with methods/results/limitations read.
- Commercial question: can a grade, broad fingerprint or a “1% detection” statement support the specific purchased material?
- Format: completed interpretive article plus filled evidence comparisons; no empty downloadable template.
- Original value: a report-scope reading, concrete controlled-mixture vs unknown-sample endpoint distinction, and negative market result retained.
- Limits: spices/powders, not validation of standardized extracts; no own lot testing, representative market sample, current standard verification or fraud estimate.

### B. Citrus flavonoids: changed molecule versus improved solubility — DEFER

- Reader: formulator comparing hesperidin, hesperetin and glucosylated hesperidin for a liquid project.
- Primary text retrieved: 2022 comparative study, PMC9405481.[4]
- Full methods show the glucoside was made by enzymatic transglycosylation and subsequent processing; hydrophilic/hydrophobic properties were examined using octanol–water partitioning, 500 μM samples, about 20 h equilibration.[4]
- Useful next angle: “water-soluble citrus flavonoid” can refer to a changed molecular material, not merely a finer version of the same hesperidin. Could become a material-selection enhancement after obtaining food-matrix data and region-specific ingredient status.
- Rejected inference: the reported log P values are **not** beverage saturation concentrations or a validated clear-drink shelf-life specification. Cell/bacterial experiments cannot support finished-product claims.
- Why not selected: evidence retrieved is largely in-vitro biological comparison, with partitioning rather than finished beverage stability; a supply guide now risks overstating practical transferability. Original PMC2664388 XML attempt returned HTTP500 twice; alternate full primary study recovered, so no invented missing measurements.

### C. Hibiscus: encapsulation efficiency versus ingredient loading — DEFER

- Reader: powder procurement/process development assessing spray-dried roselle colour ingredients.
- Full primary text retrieved: PMC8751440; methods/results read, including carrier ratio, assay definition and reported physical-property table.[3]
- Useful question: does a higher encapsulation efficiency mean more anthocyanin per kilogram purchased? The paper defines EE as (TAC − SAC) × 100 / TAC; the denominator is anthocyanin measured in the powder, not the original feed mass.[3]
- Proposed value: compare loading, surface fraction and process recovery as different purchasing quantities, not turn “85% encapsulated” into “85% anthocyanins.”
- Rejected inference: the reported ACN:MD ratio is not extract-solids:carrier ratio, and the paper's powder-solubility test does not demonstrate optical clarity of an acidic finished drink.[3]
- Why not selected: scientifically useful but overlaps the just-published elderberry carrier/assay-denominator story and the recent paprika format-selection work. Saffron changes both reader task and analytical problem. Hibiscus deserves later treatment only with an additional distinct process or real application evidence base.

No search-volume/ranking/GSC evidence collected; these are editorial opportunities, not measured demand. General web search was used for discovery, not BrowserMan, competitor-browser observation or ecommerce sampling. No original market-survey claim.

## Primary evidence audit: what is and is not supported

### [1] Detection of botanical adulterants in saffron powder (2023)

- Complete publisher-deposited JATS XML retrieved through Europe PMC; article methods, results and tables available. Raw XML/text hashes in retrieval-manifest.json. Supplements ZIP retrieved with valid ZIP signature; XLSX and DOCX retained unchanged. Supplement numerical cells are **not independently audited**; no marker-by-marker performance claim is made.
- Material: 23 stigma samples, seven powders; eight potential adulterant species (pomegranate petals/seeds separate material groups). Controlled mixtures at 90/10, 95/5, 97/3, 99/1 saffron/adulterant w/w; samples pooled within material type, mixtures prepared in triplicate.
- Do not relabel triplicate mixture preparations as independent production lots or blind external validation. Internal seven-fold cross-validation is not external validation.
- 82 markers include saffron and adulterants; does not mean 82 adulterant species, 82 confirmed chemical structures or 82 certified targets. Identification confidence varies.
- At least three ions at 1% and S:N ≥10:1 is a study-specific detectability statement. Unknown-sample >80% marker rule is separately proposed. Draft explicitly distinguishes them, without pretending to have calculated all threshold outcomes from supplements.
- Seven Czech-market powders: no monitored adulterant markers detected. No global prevalence inference.
- Gardenia only appears in background/referenced studies, not the experimental eight-species panel. Draft does not claim to retrieve or validate gardenia-specific primary studies.

### [2] Determination of Saffron Quality through a Multi-Analytical Approach (2022)

- Complete JATS/XML archived and read. 21 samples, nine powders and twelve filaments. ICP-OES performed on **three selected samples**, not all 21. Draft says selected subset.
- Results §3.2: thirteen unclassified; nine excluded solely for odorous power. Draft retains correct denominator and does not call these nine fraudulent.
- ATR-FTIR discussion broadly says no major adulterations; SEM later finds some floral contamination. Draft preserves coexistence and does not turn broad FTIR similarity into absolute purity.
- Source conflict: introduction lists bittering wavelength **270 nm**, but methods §2.2 and equations use **257 nm**. No wavelength-based SOP or ISO table reproduced in draft; do not silently “correct” source in archive.
- Discussion says, except PFL-3, filament samples denied classification solely for odorous power, despite results explicitly placing several filaments in categories. Draft relies on precise §3.2 aggregate counts, not that overbroad discussion sentence.
- Elemental enrichment alone does not prove intentional adulteration; omit source's speculative salt/sand-origin conclusions and any heavy-metal compliance statement. Full current ISO text and destination-market legal limits not retrieved.

### [3] Roselle microencapsulation study

- Complete text supports deferred opportunity only. Do not import antioxidant/health rhetoric from introduction into marketing.
- TAC/SAC-based EE is distinct from mass recovery and loading. No claim that the full measured powder soluble fraction equals anthocyanin dissolution.

### [4] Hesperidin comparative study

- Full text, not abstract-only. Partition-coefficient experiment and enzymatic preparation inspected. Biological assays not translated into health benefits or food-preservative performance.
- The displayed log P equation appears ambiguously typeset; avoid recalculating from it. No quantitative beverage recommendation.

## Discarded hypotheses, explicitly

1. “A saffron grade is an authenticity guarantee” — rejected; orthogonal observations answer different questions.[2]
2. “A grade failure proves fraud” — rejected; nine unclassified samples failed only the study's odorous-power criterion, not a fraud determination.[2]
3. “1% detection equals certified 99% purity” — rejected; controlled additions and limited targets, plus different detection/classification endpoints.[1]
4. “Saffron fraud is widespread in our buyers' market” — unsupported here; seven tested powders were negative, no original market sampling.[1]
5. “The citrus study gives the concentration for a clear RTD” — rejected; partitioning and in-vitro assays are not beverage shelf-life data.[4]
6. “Higher hibiscus encapsulation efficiency means a higher purchased active percentage” — rejected; different denominator.[3]

## Independent review requested

Review exact frozen draft hashes, not just excerpt matching. Priority checks: natural EN/ZH; 1%-versus->80% distinction; seven-sample negative result; powder/extract boundary; no current ISO/proprietary capability/stock/certification inference. Scientific editor should decide whether naming the proposed >80% rule is sufficiently useful for the target audience; do not remove its limitation while retaining the headline 1% figure. No release, tests or browser verification claimed.

## Sources

[1] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10474180/fullTextXML — Detection of botanical adulterants in saffron powder
[2] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC9601413/fullTextXML — Determination of Saffron Quality through a Multi-Analytical Approach
[3] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8751440/fullTextXML — Microencapsulation of roselle (
[4] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC9405481/fullTextXML — A Comparative Study of Hesperetin, Hesperidin and Hesperidin Glucoside: Antioxidant, Anti-Inflammatory, and Antibacterial Activities In Vitro

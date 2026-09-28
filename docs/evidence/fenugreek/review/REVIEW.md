# Independent fenugreek review — PASS

**Decision: PASS for the exact bilingual revision identified below. Blocking findings: 0.** No corrective rewrite is required. The full EN/ZH copies in this directory are byte-identical to the reviewed discovery drafts, not a new author revision. This is content acceptance, not publication or browser/render acceptance.

- EN SHA-256: `2957d3c6656d8618625597386b92ba7fda077c32e19b17c58c46a36da3144b1b`
- ZH SHA-256: `8ea2cf2f1b55b5c764af792f4bbf4cdcd9b9381db88a72adf08bc2bdaf9483e0`
- Source/claim/draft hashes: `revision-manifest.json` and the individually hashed 15 records in `claim-ledger.json`.

## What was independently checked

I read both complete drafts and parsed the saved original PMC11971048 JATS XML and PMC7447712 publisher/PMC HTML. The latter contains the actual table cells; the cookie paper's source is HTML, not an invented XML archive. I did not rely on the author's flattened text, derived table JSON, test output or completion statement. Seven HTML table elements were parsed (Table 2 is split into three elements); all appear in `original-table-cells.json`. All numbers retained in the article were checked against the original cells and their headers.

The other discovery papers are not cited or used to support this article. They were not treated as additional corroboration. No browser, repository, external retrieval or publication operations were performed.

## Findings by acceptance gate

### 1. Original cells, units and denominator — PASS

Original cookie Table 5 gives the following taste/overall means: Control 7.83 a / 7.43 a; B1 5.50 b / 6.53 b; B2 3.70 c / 5.87 c; B3 3.40 c / 4.90 d. Both languages transcribe them correctly. B2/B3 share taste group c, so the draft correctly avoids a further significant taste decline between these two groups. Overall scores, unlike taste, occupy different letter groups.

These are blend means under the factorial analysis, not results exclusively at 175°C. The methods' 175°C-only exception applies to minerals, not sensory testing. The draft explicitly prevents this transfer. Five, ten and fifteen percent fenugreek refer to the flour blend; oat simultaneously rises to ten, twenty and thirty percent while wheat falls. Neither language converts this to whole-cookie percentage or an isolated fenugreek dose response.

Original Table 2 sensory headers are Color / Appearance / Odor / Crispness / Taste / Overall acceptability. The temperature row is 0.001 / 0.007 / 0.906 / 0.430 / 0.471 / 0.109. Thus the three p-values in the article are correctly aligned. Table 5 gives 200°C colour 5.88 b and appearance 6.18 b versus the two lower temperatures' a groups; the draft's lower-colour/appearance statement is supported. All sensory blend×temperature interactions exceed 0.05, consistent with presenting the main-effect results.

### 2. Panel design and endpoint — PASS

Tinctures: original XML §2.2.4 reports seven experienced assessors (five men, two women, ages 25–45), training as described by the authors, a nominal ten-point aroma scale with endpoints 0 and 10, and triplicate sample evaluations. These are aroma-intensity descriptions, not sweetness on tasting, bitterness intensity, consumer preference, or 21 independent panelists. The draft preserves the correct seven-person scope without inflating replication. The paper's 0–10/“10-point” wording is not unnecessarily reproduced as a new scale claim.

Cookies: original HTML #Par13 reports ten trained panelists and nine-point hedonic ratings for colour, appearance, odour, crispness, taste and overall acceptability. #Par8/#Par14 describe twelve blend×temperature combinations replicated twice. Those two experimental replications do not turn ten panelists into twenty consumers. The drafts give the correct panel size and distinguish liking from bitterness intensity. The source does not provide enough detail here to infer serving order, coded presentation or a robust consumer sampling design; the draft's proposed coded comparison is explicitly its own development recommendation, not a source method.

### 3. Processing conditions — PASS

Cookie #Par6 verifies 24-hour soaking at an average 20°C, seed:water 1:5 w/v, draining, two rinses with previously boiled/cooled water, 72-hour germination at average 20°C with frequent watering, drying 60°C for twelve hours, and grinding through 710 μm. Crucially, the 710 μm statement occurs for the fenugreek as well as wheat: it is not transferred from the wheat preparation by mistake. The article's less detailed rinsing description remains accurate.

#Par8 verifies 380 g flour, 201.4 g sugar, 100.7 g sunflower oil, 182.4 mL water, 10 mL vanilla, 4.18 g baking powder and 3.38 g salt; 5 mm dough sheets baked ten minutes at 150/175/200°C. The article does not invent a neutral, unsweetened or drink application from this recipe. No raw/germinated same-dose sensory comparison exists in the described design. Its results cannot quantify debittering caused by germination.

Tincture analytical heating/incubation and the paper's general preparation figure are not presented as commercial debittering conditions. No claim in the draft depends on reading an uninspected process image or proving food-grade suitability.

### 4. Evidence bounds — PASS

Original XML supports eight manufacturers and supply through Zhengzhou Tobacco Research Institute; this is not a retail product identity survey or food-use qualification. Named HL aroma descriptions match the results text. Relative quantification assumes a correction factor of one; OAV uses aqueous odour thresholds. The drafts do not turn instrumental differences into validated sensory acceptance limits.

Cookie #Par29 attributes poorer taste possibly to fenugreek bitterness, while #Par30 and the abstract endorse B2 at 175°C. Both languages preserve that tension without endorsing the paper's broader nutritional/antioxidant wording as an independent health benefit. Nonsignificant temperature effects are described as no demonstrated improvement in this recipe/range, not proof that heating never changes flavour.

### 5. Full bilingual reading — PASS

The page has one concrete argument: choose materials against the actual aroma/taste problem, use the cookie findings to explain why a process label is not a sensory result, and finish with a workable controlled comparison. Its scope qualifications concern the exact studies, rather than generic legal/quality boilerplate. It does not claim manufacturing capability or substitute a retail extract for seed flour.

Examples checked as sentences, not just numerical parity:

- EN: “A sweet-smelling sample is not necessarily sweet-tasting.” ZH: “闻着甜”也不等于“吃着甜”。 Natural in each language and equivalent in claim strength.
- EN: “These are percentages of the flour blend, not percentages of the complete cookie.” ZH: “这里的百分比以混合粉为基准，不是占完整饼干配方的比例。” Clear denominator in both.
- EN: “Germination was part of the preparation; it did not make acceptance automatic.” ZH: “发芽是制备过程的一部分，却不等于成品自然会好吃。” The Chinese is independently readable, rather than a literal translation of “acceptance automatic.”

The Chinese heading “酊剂不是‘没有味道的种子粉’” is colloquial but intelligible in this practical flavour article; it does not imply that the source actually made such a claim. The English introduction and Chinese “是否好吃” suit application-oriented reading. The final section includes a few brief-oriented sentences, but remains tied to this ingredient's experimental confounding and specific sensory endpoints, not an empty supplier checklist. No sentence-level replacement is necessary to clear the gate.

Optional nonblocking polish: localize the Chinese “Sources” heading and bibliography descriptions during integration if consistent with the site's reference style. This does not justify reopening the scientific draft or replacing the full copy.

### 6. Every article table — KEEP

There is exactly one table per language: four blend rows and two sensory-outcome columns. Retain it. It makes the central mismatch visible: taste liking can be low even when an overall score looks less poor. A chart would imply unnecessary trend precision across coupled formulations; a process table would duplicate short prose. The nine-point scale and denominator are already explained immediately before it, and the pooled-temperature/statistical qualification immediately after it. No need to add every analytical or volatile table from the sources. Table selection and content pass; mobile scrolling/rendering remain untested because browser work was prohibited.

## Executed checks and limitations

`python verify.py` returned **PASS, 82 checks**, exit 0. It is a read-only verifier: hashes, reparsed original table cells, original source locators, claim-record hashes, bilingual retained cells, p-values, citation IDs/URLs and denominator phrases. `build_review.py` is a separate one-time artifact builder; do not rerun it as a verifier because it copies from the upstream draft directory.

The grounded-citations verifier returned “citations OK” for both drafts with `--evidence`. Its Chinese sentence counter reported zero prose sentences, so that counter is not evidence of Chinese claim coverage or prose quality. Full Chinese review above is manual; original-source claim checks run separately.

Complete execution output is in `verification-results.json`. An initial exploratory XML print command encountered a missing-title node after successfully printing cookie evidence; the corrected guarded parse succeeded, and the saved verifier ran cleanly. No unresolved source-access issue affects the reviewed claims.

**Finite acceptance status: zero factual blockers, zero bilingual editorial blockers, zero table-selection blockers. Exact-revision PASS.** A changed draft requires rebinding/rechecking its hashes; this report does not approve later edits, rendered pages or release.

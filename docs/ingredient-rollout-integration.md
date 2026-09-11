# Eleven-ingredient rollout integration

Base: PR20 `7d0286c`. This branch is for parent review, not production release.

## Scope

All eleven packs are integrated in EN/ZH: green tea, Centella, monk fruit, ginseng, reishi, ginkgo, grape seed, licorice, stevia, resveratrol and recovered goji. The 22 replacement articles contain 33 distinct product-development plans and 93 ingredient-local source records. The inventory records exact input paths, original IDs, normalized IDs and every integrated plan image.

The strict build-time schema rejects unknown fields, raw HTML, missing languages, invalid ordering, missing ingredients, duplicate source/plan IDs, unresolved citations, ragged tables and references to absent images. ResearchBlocks escapes prose and renders accessible tables. New references use `research-{ingredient}-rollout-source-{local-number}`, independent of legacy groups. Old source URLs and IDs remain available in the background bibliography.

Sections: identity, effects/human evidence, material forms, applications, three formulation plans, combined processing/equipment, quality/safety, FAQ, research cases, patents, references. Canonical routes and historic dimension/headings remain. Old heading aliases land in their corresponding substantive dimension, rather than an unrelated taxonomy page. The equipment alias lands in the merged process discussion.

## Preservation and editorial choices

- Original overview identity, component distinctions, process-choice summaries and end-product choices remain in their relevant sections. The replacement article is not appended to the old article.
- Original quantitative comparison tables remain for ginseng/ginkgo where the replacement pack was prose-only. Existing insight blocks supply material-specific background where a new standalone case was absent. Goji's human and laboratory rows are separated; its stale legacy ultrasound table is not rendered.
- All pre-existing `public/` files, the 12 original product WebPs, videos, turmeric renderer/data, deep12 and overview data are byte-identical to PR20. The 33 plan WebPs are additions at new paths. PR20 reader/resource/family layout and captions remain.
- The imported A/B/C/D independent reviews are evidence of the input review, not sign-off on this integrated branch.

## Corrected publication blockers

- Monk fruit: 17.38 ± 0.44 g is product weight, at 55.14 ± 2.44% III E; 150 g resin and recovery basis retained.
- Centella: both P&G claim ranges retain “about” / “约” and extract-weight basis; aglycone and prepared-carrier wording corrected.
- Reishi: nonsignificant fatigue interaction P=0.1590 and significant well-being interaction P=0.0002 accompany the baseline changes. Membrane molecular-mass terminology corrected; 100–1,000 kDa patent text and unresolved yogurt dose remain.
- Ginkgo: inventor is not asserted as original applicant; China/EU eligibility remains an explicit material-specific launch hold. Efavirenz warning added.
- Stevia: 31 randomized and 28 completers are separate; SweetLeaf drops and trial regimen named.
- Resveratrol: synthesized encapsulated trans material and primary/secondary endpoints specified; plan acceptance criteria added; missing Chinese procurement row restored. Illustrator instructions are not rendered.
- Licorice: historical fractions lack characteristic licorice flavor; ambiguous “a minimum of 4-90%” claim wording retained, not regularized.
- Goji: actual three ultrasound frequencies/pulse settings replace unavailable-settings language; 31/28/27 participant flow and nonsignificant interaction appear in the study table.
- Source display titles cleaned; duplicate per-plan status boilerplate omitted. Specific safety, microbiology, exposure and market constraints remain.

## Verification

- TDD: rollout-presence test failed before integration. Adapter missing-export failure preceded implementation. Baseline npm test passed 127 tests; initial text integration passed 131. Fresh image/correction follow-up builds 200 pages and passes 137 tests. Image-presence, goji claim-detail, editorial/yogurt and Centella-parity regressions were observed failing before fixes.
- Shared reader browser: 96 cases, all 24 EN/ZH ingredient pages at 390/1440 px, JavaScript on/off. Centered maximum 820 px, no page overflow, substantive dimension text, all in-article citation targets, product/resource links and no page errors.
- Deep reader browser: 192 cases, all 24 pages at 360/390/768/1440 px, JS on/off. Exact current table counts and accessible table regions. Stale turmeric assertion reproduced as 5 != 2, then replaced with five actual table locations: effects, components, applications, formulations and standards.
- Plan-image browser: 144 cases across all 24 EN/ZH pages at 390/820/1440 px, JS on/off; all 33 exact image paths decoded, localized captions/alt text and natural dimensions matched, bounded 360px contain-fit frames, citation targets and overflow passed.
- Turmeric dedicated browser: 12 cases passed. Original product imagery browser: 56 checks passed (48 product-page checks).
- Regression coverage checks every old heading alias and every new/background source ID against its exact URL; tests compare every normalized paragraph/table cell to rendered HTML and all public bytes against PR20.
- Inspected mobile green-tea and desktop resveratrol screenshots. Mobile tables intentionally scroll within their focusable region; the page itself does not overflow. PR20's caption-inside-scroll treatment remains, including clipped right-side caption text before scrolling.

## Open review gates

**33/33 illustrations integrated.** The supplied optimized derivatives total 2,019,998 bytes, mapped to exact ingredient/plan paths with independent EN/ZH alt text and captions and actual decoded dimensions. Public captions have no generation labels. The common contain-fit frame is at most 360px wide and 360px high, preserving varied portrait compositions without further cropping. Contact-sheet and actual mobile/820px/desktop page inspection are recorded in `image-inspection.md`; ginger in the ginseng sachet correctly illustrates that plan’s ginger pairing. See `plan-image-manifest.json` for dimensions, bytes and hashes.

Parent must review integrated bilingual prose and retention choices. The A-review excerpt gaps are repaired in repository evidence: `docs/evidence/ingredient-rollout/claim-excerpts/ledger.json` maps 20 named claims to source URLs, exact quotations and hashed original-source bodies. This covers the six specifically identified truncated exports plus product-mass, patent, clinical and goji apparatus records. External input packs are preserved; no blanket article-coverage claim is made. Do not treat citation resolution or the stored fragment-coverage percentages as semantic evidence validation. Some display titles are concise descriptive citations rather than complete journal bibliography entries. Current market eligibility, official patent status/FTO, formula qualification and clinical claim approval remain separate gates. No merge or production publication is authorized by this report.

# Independent baobab EN/ZH review

## Verdict

**Corrected pair suitable for content handoff, not a deployment or rendered-QA approval.** The original numerical cake exhibits are accurate. The main changes are reader-facing editing, a more useful replacement-allocation table, and narrower presentation of the flawed ice-cream melting results. Originals remain untouched.

Read DISCOVERY.md and both complete original drafts; independently read original JATS Methods, Results and claim-bearing tables, with physical-cell/rowspan inspection rather than relying on the author's verifier. Both primary full-text URLs were fetched again: HTTP 200 and byte-identical SHA-256 to the archived XML. Supplier HTML/text was read for material description only. Its health, regulatory, certification and shelf-life positioning is not adopted.

## Finite issues and resolutions

1. **P1 — Public copy sounded like an internal audit.** Original EN: “This is a proposed development decision, not a blank substitute for the data above.” Original ZH: “这里给出的是基于现有数据的开发判断，不是用空白记录表代替分析。” These answer an editorial dispute, not a reader's formulation question. Removed, along with repeated “not established” endings; replaced with concrete cake and ice-cream trial conclusions.
2. **P1 — Supplier health claim was unnecessarily amplified.** Original: “The supplier page also says replacing 10% of wheat flour can help regulate blood sugar”; ZH “本稿不据此提出产品功效卖点” is internal narration. Removed the entire health-claim digression, not merely its caveat. Material-processing description remains attributed. No certification, legal approval, efficacy or availability promise transferred.
3. **P1 — Melting section overexposed defective numbers.** Original reproduced the literal malformed “12..63 ± 0.49%” in public prose alongside six endpoint values. Kept malformed source evidence internally; revised public comparison uses only IB-50 and IB-75 at first drip/90/120 minutes and clearly says descriptive means, not significant superiority. One compact note retains group-assignment, temperature, malformed-cell and significance problems. No optimal-dose claim.
4. **P2 — Exhibit budget spent on a defensive material matrix.** Original headings “What the inspected source actually establishes / What it does not establish” duplicated adjacent prose. Removed this matrix. Added the five-row milk-powder/pulp allocation table: the actual denominator is now easier to understand than the sample code alone. All five allocations independently checked and summed to 4.8 g/100 g.
5. **P2 — Ice-cream statistics deserved differentiation from cake.** Cake ± type genuinely is unspecified; ice Methods 2.3.11 explicitly says means ± SD and Duncan, not Tukey. Revised protein paragraph supplies that distinction and specifies total crude protein, not measured milk-protein fraction. Table 2 footnote uses TN×6.38. No replicate-count invention.
6. **P2 — Chinese needed less literal procurement language.** Replaced “先说清替掉什么，再比较原料规格” with an application-led title, “瓤内气孔均匀性” with “内部气孔均匀性”, “训练型评价人员” with “受过训练的评价人员”, and the “商业承接” ending with direct formulation conclusions. Chinese was rewritten as a coherent argument, with equal claim strength rather than sentence-by-sentence mirroring.
7. **P2 — Public ice-cream discussion lacked an actual eating-quality consequence.** Added the authors' 15-member staff-panel observations of rough/grainy, insufficiently smooth IB-75/IB-100, together with the important finding that body-and-texture scores did not differ significantly. This is Results 3.9, not digitisation of Figure 4, a consumer survey or a newly inferred significant preference.
8. **P1 gate — Original discovery had only backlog dedup.** Completed a read-only current-main check, pinned to `a26d4badc789c40d490a6adba7c8d155db99f5cb`. See dedup.json and archived current-main.tar.gz. No repository working tree, backlog or browser was changed.

No unresolved numerical correction is required for the retained cake tables. Source defects remain unresolved at source level and limit what can be recommended; they are not editorial typos for us to repair.

## Independent source findings

### Cake [1]

- Methods 2.1/Table 1: 5/10/15% replaces the 250 g wheat-flour allocation. First level is 237.5 g wheat + 12.5 g pulp. Other listed ingredients fixed. A 60-mesh preparation does not establish the same distribution as a commercial grade.
- Table 7 has a spanning header: body physical cells 1 and 2 are absorption and stability; other cells are torque (Nm), not further absorption endpoints. Footnote explicitly uses 14% moisture basis. Absorption 59.1/60.3/62.4/64.6 with c/c/b/a; stability 8.82/7.78/5.35/4.45 minutes with a/a/b/c. Comparisons are down each column. Thus 5% has no significant difference on those two endpoints, while 10/15% differ. No conclusion about all rheological properties follows: C2 already has different letters at 5%.
- Table 8 has two logical descriptor columns but not two physical cells in every row. Uniformity is physical row 7, tenderness row 10, overall row 12 (zero-based including header rows); each has four numerical physical cells 1–4. Overall a/a/b/b; tenderness a/b/b/b,c; uniformity a/b/c/d. No equivalence inference from shared a. Sensory scoring occurs after one-hour cooling; 20 trained panelists; 40+30+10+10+10=100 weighted points.
- Methods 2.8: triplicate analyses except duplicate amino acids, one-way ANOVA and Tukey at 0.05. This does not identify independent production batches or clarify the displayed cake ± term.

### Ice cream [2]

- Table 1 has milk 64.8, cream 17.9, sugar 12 and gelatin 0.5 g/100 g throughout. Milk powder+pulp is always 4.8. IB-100 remains dairy and contains gelatin. There is no plant-based finished-product result.
- Table 2 total crude protein is physical cell 3, under a spanning g/100 g header: control 4.70 ± 0.57 a and IB-100 3.93 ± 0.19 b. Other rows include a malformed moisture value `64..06`; that does not warrant repairing or quoting it. Protein comparison retained, broad nutritional superiority omitted.
- Table 6 physical cells: sample 0; overrun 1; first-drip time 2; 45/75/90/105/120-minute loss 3–7. Header calls first drip “Starting Melting Point (min)”: it is a time, not a temperature. Methods use 50 g samples on a wire screen, collected drainage and 22 ± 1 °C; caption says 25 °C. Narrative assigns 44.07 to IB-25, table assigns it to IB-50. Literal last IB-100 cell is `12..63 ± 0.49 c`. Dashes in control/IB-25 late-time cells are not zeros or inferred 100% loss.
- Table 6 footnote attaches p<0.05 to “no significant difference”; overrun letters b for 20.21 and 13.71 are suspect. No significance ranking taken from it. Numerical endpoint-order reversal between IB-50 and IB-75 is explicitly descriptive.
- Table 8's rate index >1 conflicts with shear-thinning prose under a conventional power law; zero/infinite-rate viscosity parameters also need model clarification. Footnote says same row and p<0.05 for no difference. Rejected for public ranking. Methods' “60 nm” sensor diameter is another reporting warning, not corrected into an invented instrument setting.
- No claim derived from mineral/DV figures, antioxidant assays, TEM visual interpretation or shelf-life speculation. Sensory narrative is used narrowly, without digitising figures or adopting the conclusion's broad recommendation.

## Every exhibit: selection verdict

| Exhibit/option | Verdict | Rationale and retained scope |
|---|---|---|
| Original material/limitations matrix | Remove | Redundant prose and warning-heavy hierarchy; supplier processing identity remains in narrative. |
| Cake Mixolab table | Keep | Four doses, two distinct units, all levels retained. Table clearer than dual-axis chart. Keep letters, ±, b14 definition and mixing context. |
| Cake sensory table | Keep | Three intentionally selected endpoints reveal total-score/subattribute divergence. All four doses retained; /100 and /10 scales prevent false like-for-like visual ranking. Do not turn into grouped bars on one shared score axis. |
| New ice replacement-allocation table | Add | Five sample codes with actual grams explain central denominator. Constant dairy ingredients stated in caption. No 100%-fruit pie/stack. |
| Ice crude-protein comparison | Prose only | Two endpoints, correctly scoped units/SD and letters. A separate chart adds little. |
| Ice melting numeric comparison | Adjust, prose only | IB-50 versus IB-75 demonstrates endpoint reversal; no trend line across missing/malformed cells, no repaired IB-100, no optimum chart. |
| Ice rheology Table 8/viscosity chart | Exclude | Model, units/parameter interpretation and statistical annotations unresolved. |
| Remaining archived tables | Evidence archive only | Cake T2–6 composition/minerals/assays/amino-acid calculations and ice T3–5/T7 microbiology/minerals/assays/colour are outside this reader task. Archiving 16 tables is not approving 16 public exhibits. |

No generated or quantitative charts were present in the supplied drafts. The corrected pair contains three tables per language and no charts. No chart is needed merely to increase exhibit count. Mobile table behaviour, actual typography, accessible headers and link destinations remain integration/rendering work; this review did not render the site.

## Topic distinction and current-main check

Downloaded current main by public GitHub API/codeload read-only. Scanned source Markdown/MDX/Astro/TS/JSON for `baobab`, `猴面包` and `adansonia`: no matches (file count in dedup.json). This is a pinned source-tree finding, not all historical URLs or unpublished parallel work.

Compared nearby actual article bodies/sections, not only filenames:
- **Psyllium gluten-free bread:** husk/seed identity, changing water, volume versus specific volume, gumminess. Baobab instead replaces wheat flour in cake and contrasts that with removal of milk powder; its primary reader answer is the displaced ingredient and weighted sensory-score trade-off. Shared “water does not equal overall quality” reasoning is useful adjacency, not duplicate evidence.
- **Citrus fibre grade/process:** mixed fibre grades and ultrasound/homogenisation in cocoa milk, separation versus viscosity/storage. No replacement-allocation or cake sensory question.
- **Sunflower/pumpkin protein:** defatting, milling, phenolics, solubility and product-positioning questions, not fruit-pulp flour/skim-milk substitution.
- **Tiger nut fermented drinks:** pressed/screened base versus flour, cultures, glucose and fermentation endpoints. No dairy ice-cream replacement experiment.

**One bilingual baobab article is justified; two near-synonym pages are not.** Cake is the cleaner evidence lead; ice cream is a contrasting matrix, not an equally strong optimisation claim. The revised outline is pulp identity → cake absorption/mixing → cake sensory split → ice allocation/protein/texture → melting endpoints → trial decision. No keyword-volume, traffic, GSC, customer-adoption or sales claim is made.

## Reproduction and files

Run `python /data/hermes/research/seo-growth/2026-09-28-final-baobab-review/verify.py`.

The verifier is read-only. It hashes preserved originals and review artifacts, independently reparses 16 JATS tables/851 physical cells including spans, captions and footnotes, checks selected physical coordinates, compares every displayed quantitative table in both languages to XML, checks the allocation arithmetic and targeted prose guards. It neither imports nor runs the author's verifier. A passing script is integrity/regression evidence, not a replacement for the source judgments above.

Files: corrected `draft.en.md`, `draft.zh.md`; `REVIEW.md`; `verify.py`; `hashes.json`; `verification.json`; `approved-cells.json`; `physical-tables.json`; copied original `sources/` and citation-ledger; `dedup.json`; pinned `current-main.tar.gz`. The copied citation ledger preserves the author's source IDs; original source blocks remain unchanged. All new writes confined to this review directory.

## Sources

[1] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8065946/fullTextXML — Methods 2.1, 2.6–2.8; Tables 1, 7, 8.

[2] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC9913908/fullTextXML — Methods 2.1–2.3.11; Results 3.5, 3.9; Tables 1, 2, 6, 8.

[3] https://www.baobabfoods.com/organic-baobab-fruit-powder — archived supplier material-processing description only.

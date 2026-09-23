# Frozen handoff — one bilingual pomegranate article, independent review next

Status: READY FOR INDEPENDENT CONTENT/EVIDENCE REVIEW, not approved for publication. Author stops editing at this handoff. No repo writes, no browser/BrowserMan, no publishing. All authored artifacts are isolated in this directory.

## Deliverables
- `draft.zh.md` / `draft.en.md`: ONE substantive article on choosing pomegranate beverage juice by flavour direction, colour and astringency trade-offs. Natural Chinese reference heading; human-readable original source titles.
- `claim-source-ledger.json`: exact archived quotes, claim mapping and limitations.
- `ledger.json`: complete discovery source map, IDs 1–6.
- `publication-ledger.frozen.json`: immutable publication subset IDs 1,2,5,6. Do not add sources to this sparse ledger; add to full discovery ledger instead.
- `SHA256SUMS.json`: immutable hashes of drafts, ledgers, authentic sources and other files, including this handoff; manifest excludes only itself.
- `verification.json`, `verify.en.txt`, `verify.zh.txt`: strict citation/evidence gate PASS. Chinese validation changes only the localized reference heading in a temporary validation view because the validator only recognizes English “Sources”. No temporary view remains. Citation gate is not independent editorial approval; language coverage counts are not reliable for Chinese.
- `numeric-cell-check.json`: exact XML table rows; no numerical chart made.

## Outcome and competing angles
1. **Selected: pomegranate juice material/flavour selection.** Fresh full 2021 primary commercial study and supplement retrieved; eight purchased 100% juices, four from-concentrate/four NFC, 10 trained assessors. Original research's market sample, NOT new ecommerce sampling by us. Aroma directions differ while overall smell intensity is similar. Total phenols and anthocyanins can diverge sharply. Supplement inspected for sensory definitions. Supplier TDS supplies a genuine commercial specification example, including its 16°Brix turbidity basis.
2. **Pomegranate enzyme optimization remains HOLD as a process recipe.** Fresh 2025 full text confirms table/narrative conflict, g/L versus mg/L, 90°C/5min versus boiling-water/10min inactivation descriptions. Table4 acceptance increases while flavour decreases; article uses this bounded trade-off, not an enzyme-dose prescription. Single25kg batch; “30% membrane and peel by weight” denominator unresolved. Table4 ± is NOT defined as SD/SEM anywhere located in full text; now explicitly preserved as undefined in both drafts. Panel10 and experimental triplicates are not independent production batches. The earlier inaccessible 2025 Elsevier papers were not re-presented as retrieved full text.
3. **Pomegranate pressing-pressure optimization rejected for this article.** Retrieved full publisher extract `pressing-full.md` plus raw tool result. Sequential pressing fractions, T1 from separation/all fruit components versus later aril juice confound a pressure-only claim; VOC relative areas do not establish sensory preference. Paper's TPC mg/g values are problematic. Not used in draft; discovery source3 remains archived.
4. **Ginger roasting still HOLD.** Primary abstract refreshed and archived, independent 2020 aroma recombination angle remains interesting, but no original full methods acquired. New search found a 2013 Schaller dissertation catalog lead (German title in search archive). Catalog HTTP200 was an Anubis challenge, explicitly rejected; extraction backend403 also not success. No roasting parameters or review-derived oil concentration claims adopted. Search failure for alternative drying angle archived. Concrete next route is legitimate author/library dissertation access, not another generic gingerol checklist.

## Dedup
`dedup-main.json` records read-only `git show origin/main` inspection across src Markdown/JSON/TS plus remote `ls-remote` equality: main78481c022d8dbf57db6fbd8885b03eca19b49f68. No fetch necessary because local origin/main exactly matched live remote. No ginger/pomegranate standalone article exists; ginger only occurs as companion spice/concept, pomegranate mainly as saffron adulteration example. Published citrus/hibiscus/elderberry articles solve different material problems. No backlog edits.

## Source archive map
- Source1: `PMC8471094.xml`, `.txt`, `-readable.txt`; full primary study. Tables2/4 selected values mechanically checked. Error terms here ARE reported as SD of two determinations, unlike source2.
- Source2: `PMC11941192.xml`, `.txt`, `-readable.txt`; full primary tannase study. Table4 numerical directions preserved despite contradictory prose.
- Source3: `pressing-full.md` and `pressing-extract.json`; publisher extraction, not raw publisher HTML; not cited in draft.
- Source4: `ginger-primary.json`; EuropePMC primary abstract only; no full-text claim.
- Source5: `sunmet-nfc.pdf`, `.txt`; original supplier PDF, review date Jan7 2025; not current batch verification or certification validation.
- Source6: `commercial-supplement.zip` and nested `antioxidants-10-01381-s001.zip`; original supplement PDFs and JPGs. `Table S3.txt` definitions used. FigureS2 inspected, no plotted numbers inferred; details in `figure-review.md`. FigureS1 and main figures in outer archive unexamined. TableS1 has uncertain nutrient denominators, not used.

## Independent review focus
Check natural Chinese and EN equivalence; assess whether bounded critique of source2 is useful without over-weighting flawed research; confirm source1 association/causation boundaries, duplicate-analysis versus lot variation, nondetection wording, supplement sensory scale vs plotted axis; confirm supplier TDS attribution and concentration basis. Source titles human-readable and Chinese heading localized. Application routes and purchasing brief are clearly editorial suggestions, not validated formulations. No health efficacy, market-size, current stock or shelf-life claim.

No additional editing after freeze. Parent may commission an isolated reviewer/revision package using these exact hashes.

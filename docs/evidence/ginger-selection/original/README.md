# Ginger discovery handoff — 2026-09-23

## Outcome

One substantive bilingual draft: **Choosing processed ginger: why more shogaol does not settle the aroma question / 生姜原料怎么选：姜烯酚更高，不代表姜香更合适**.

- `draft.en.md` and `draft.zh.md`: reader-facing drafts with mechanically rendered source blocks.
- `discovery.md`: competing explanations, selection, dedup, exact source scope and source conflicts.
- `dedup-inventory.json`: all 46 existing bilingual blog files inspected, their hashes/frontmatter and ginger mention check.
- `raw/PMC8871348.xml`, `raw/PMC8427268.xml`, `raw/PMC12195494.xml`, `raw/PMC6099745.xml`: original full-text XML from Europe PMC, not abstracts or reviews.
- `PMC*.txt`: deterministic XML text extracts, including methods and tables. XML remains authoritative for table structure.
- `ledger.json`: stable citation mapping and attached evidence.
- `exact-quotes.json`: 31 exact passages with locators, passage hashes and raw-source hashes.
- `retrieval-manifest.json`: URLs, UTC retrieval timestamps, HTTP status and SHA256 for four XMLs and two discovery responses.
- `verification.json`: six archive hash checks, 31 literal quote checks, two successful strict/evidence citation checks and exact draft hashes.
- `retrieve.py`, `fetch-papers.py`, `verify-evidence.py`: reproducible collection/verification scripts. Fetch script resets this task-local ledger; do not rerun retrieval merely to review the frozen evidence.

## Evidence finding

Slice drying supports a chemical tradeoff: shogaol formation and hydrodistilled essential-oil yield do not favour the same treatments. Three Australian growing-year samples further show that 6-gingerol, 6-shogaol and GC-MS peak totals cannot be collapsed into one quality ranking. Korean aqueous extraction and Welsh juice spray drying add material-route and carrier confounding. None provides direct sensory validation of a finished commercial beverage.

Source IDs: [1] PMC8871348 (2022 aqueous extraction); [2] PMC8427268 (2021 three Australian dried samples); [3] PMC12195494 (2025 spray drying); [4] PMC6099745 (2018 slice drying).

## Readiness

Ready for independent evidence and bilingual editorial review; **not publication-approved**. Author self-check completed for sample basis, numeric units, full methods, instrumental-versus-human sensory distinction, absence of invented supplier specifications and EN/ZH alignment. No charts, fabricated measurements, recipe recommendations, efficacy claims or market-size claims. English article is roughly 1,200 words plus references; Chinese version follows the same evidence and procurement argument without literal English syntax.

Humanizer self-pass removed blanket warnings, templated assay tables, promotional conclusions and repeated slogan contrasts. Article uses actual research contrasts and a compact proposed buying brief; it does not pretend that proposed development work has been run.

Automated citation checks returned `citations OK` for both languages. The verifier's English prose coverage was 34%, which includes uncited editorial procurement recommendations and interpretive sentences; its Chinese sentence counter recognised only three sentences and is not a meaningful coverage metric. These are citation identity/evidence-presence checks, not independent factual or language approval. Factual assertions were checked against the 31 archived passages by the author.

## Issues and exclusions

The second search response lacked a result list; it is preserved rather than represented as a successful search. All four selected original papers were retrieved successfully. The previously held roasting/dissertation source was not recovered and supplies no claims here. Supplements/images were not inspected; no figure-only numerical readings are used. Spray-drying source has an internally inconsistent inulin ratio and ginger-solids narrative; the draft acknowledges this instead of copying a ratio. No current stock, supplier capability, recommended dose or shelf-life guarantee is inferred.

All writes were confined to this ginger directory. Website, backlog and other research directories were not edited. No browser, BrowserMan, GSC, social or publication action occurred.

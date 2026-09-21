# Quillaja bounded repair — 2026-09-21

Status: repaired research candidate; unpublished. See `changes.diff` for the complete original-to-revision changes.

- Q1: rebuilt a quillaja-only ledger using the actual 2005 CTA and Ingredion URLs, attached exact archived quotes via CLI, remapped original [1]/[4] to local [1]/[2], regenerated Sources blocks, and ran both locale evidence gates.
- Full `quillaia-2005-full.txt` plus its original PDF is authoritative; partial source-1.txt and root source-2/source-3 are excluded, not silently substituted.
- Corrected Chinese dose/performance distinction, oil/flavour description, final-beverage terminology, 目标市场, procurement phrasing, 供货形态, as-supplied saponin content and analytical reporting basis. Split the analytical checklist into natural sentences after continuous re-read.
- Kept dry-basis 10–30% / 65–90%, 2005, Ingredion attribution and the weighted/non-weighted beverage-emulsion wording. Preserved egg/lactose caveats; added no regulatory permission or efficacy claims.
- This handoff supersedes the original README's provenance claim for this revision only: the shared root ledger does NOT verify original quillaja. Use this directory's ledger and verification only.

## Checks and remaining gates

- Author re-read EN/ZH continuously and checked the targeted changes against the prior independent review; the automated Chinese coverage value is not used as language assurance.
- `verification.json`: actual strict evidence checker exit/output for each locale, candidate hashes, source hash checks and separately implemented quote/PDF-extraction assertions.
- `provenance-commands.json`: actual add/quote/render commands and outputs. `retrieval-manifest.json`: candidate-local absolute paths, URLs, archive hashes, original paths and retrieval date.
- Exact source quotes contain additional historical source values; only the scoped supported figures remain in the draft bodies. Quotes are not new product or regulatory claims.
- No fresh network retrieval during this repair. Copied archives are hash-identical; prior independent review documents network checks.
- Remaining: independent editor acceptance of this specific revision, integration-context/locale/link review, real site build and authorized publication. None performed here. Actual product use still needs current destination-market regulatory and grade-specific review.

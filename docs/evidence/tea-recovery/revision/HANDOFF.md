# Revision handoff / 修订交接

**Status: ready for parent-led independent re-review, not a review PASS or publication approval.** All changes are confined to this `revision/` directory. No website, new page, shared backlog, GSC or stevia changes. The 62 pre-existing files were hashed before revision and verified byte-identical afterward (`input-sha256.json`).

## Bounded corrections

- **F1:** Both modules and specification now distinguish product-recovery completeness from overall mass closure. Unknown non-product output does not suppress an otherwise supported product recovery; complete closure and complete difference remain unknown. Subtotals/lower bounds have explicit conditions. Nonnegative input rules do not reject negative derived differences; dry fraction and D ranges are stated.
- **F2:** Delivered the missing artifacts rather than only weakening the promise: `boundary.blank.csv` (22 columns, 1 blank row) and `acceptance.blank.csv` (37 columns, paired concentrate/diluted-formulation rows). Modules describe these alongside the stream ledger as manual records, not an automatic workbook. Full EN/ZH instructions cover all fields.
- **F3:** `streams.blank.csv` now has 35 columns and 10 role-labelled blank rows. Added batch/boundary links, sampling interval/start/end/mode, composite-key definition, explicit stream/vial/solid-extract basis, numeric LOQ/unit/basis, extraction volume/test portion/basis/method reference, exact enum values and allowed quantity/assay combinations. `target_mg` is explicitly manual. Wet-cake extract mg/L is converted via extract L and test-portion kg before applying wet stream mass; dry portions additionally require measured dry fraction.
- **Evidence/language:** Corrected dried tea-cream sediment basis and 1:15 w/w; used nominal MWCO rather than pore diameter for kDa; clarified Folin–Ciocalteu/gallic-acid total phenols. Source findings and study numbers are retained without new claims. EN/ZH modules use the review's natural title and terms.

## Delivered files

- Revised editorial copies: `module.en.md`, `module.zh.md`, `decision.zh.md`.
- Full bilingual contract: `worksheet-spec.bilingual.md`.
- Blank assets: `streams.blank.csv`, `boundary.blank.csv`, `acceptance.blank.csv`; exact structural contract: `schema.json`.
- Verification: `validate.py`, `reference_math.py`, `test-results.log`, `verification.json`; observed expected pre-implementation failures: `test-red-artifacts.log`, `test-red-conversions.log`, `test-red-metrics.log`.
- Provenance: `input-sha256.json` freezes original files; `artifact-sha256.json` hashes all delivered revision files except itself. Original evidence/ledger/source-check artifacts remain in the parent directory and are not silently replaced.

## Actual execution

`python -B validate.py` completed with exit code 0: **3 unittest methods, OK**. Checks exercised every template row's width, exact schema/required contract fields, permitted prefills, and **119 blank numeric cells**. Synthetic-only reference tests exercised L×mg/L, kg×mg/kg, dry-fraction correction, analytical dilution once, wet/dry test-portion extraction conversion, LOQ upper-limit conversion, segmented sums, invalid ranges, zero/unknown denominator, unknown non-product output, product designation and >100% closure with negative derived difference.

These are local structure/reference-arithmetic tests, **not** independent content approval or an implemented CSV calculator. The reference functions assume the caller has established method comparability, valid reporting routes and a fully enumerated boundary. They do not parse or approve future user-entered rows, infer missing streams, establish analytical extraction recovery, or perform general interval uncertainty propagation. Synthetic figures appear only in test code/logs, never in delivered data-entry cells.

## Remaining review / 待复审

Parent should independently re-review F1–F3, the two-state fields and all wet/dry/bottle routes against these revision hashes. Industrial membrane-selection evidence remains open. No measured factory yield, shelf-life result, validated laboratory extraction or installed capability is claimed. Source wording relies on the already archived primary sources and independent check; no new network source retrieval was needed. No operational blockers encountered.

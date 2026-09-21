# Filling the blank CSVs

These are recording templates, not filled trial results or automatic spreadsheets. Each file has a header and one completely empty row. Save working copies as UTF-8 CSV, keeping the English headers unchanged; use decimal points, not decimal commas. Quote text containing commas. Use plain numeric cells, not spreadsheet percentage formatting or formulas.

## Sampling record: 33 columns

One row records one analyte result from one injection, or a final laboratory result with its aggregation described in `raw_data_path`. Do not mix both representations in the same summary.

- Traceability: `protocol_id`, `batch_id`, `sample_id`, `parent_sample_id`, `paired_group_id`, `control_status` connect the protocol, batch, physical sample, parent bag and transport group. Distinct bags have distinct IDs; portions from one bag retain its parent ID. Use `stage` and `location_depth` to distinguish whole-bag, bulk and partial-use samples explicitly.
- Collection: `timestamp` (ISO 8601 with time zone), `cumulative_discharge_kg`, `sachet_sequence`, `container_id`, `sampling_device_method`, `transport_conditions_record` and `seal_integrity` identify when, where and how material was collected. Put portion-removal details and representativeness evidence in the method field or its linked record.
- Weighing: `sample_mass_g` is the collected/prepared powder mass; `net_sachet_mass_g` is the corresponding entire bag's powder mass, excluding packaging. `tare_method_balance_id` records tare method and balance identity. Never substitute preparation mass for bag mass.
- Analysis: `analyte` names the glycoside or explicitly defined sum; `prep_id`, `injection_id`, `assay_method_version`, `qc_recovery_record`, `loq_and_qualifier` and `raw_data_path` retain preparation, injection, method, quality-control and raw-result evidence.
- Audit: `missing_reason`, `deviation`, `operator` retain omissions, departures and responsibility. A repeated injection does not create a new `sample_id` or an independent bag.

### Numeric and basis contract

| Meaning | `original_result` | Exact `original_unit_basis` | Conversion |
|---|---|---|---|
| 1% w/w on as-received basis | 1 | `% w/w; as_received` | ×10 = 10 mg/g |
| The same concentration as a mass fraction | 0.01 | `g/g; as_received` | ×1000 = 10 mg/g |
| Concentration already in mg/g | 10 | `mg/g; as_received` | unchanged |
| Whole-sachet amount already in mg | 20 | `mg/sachet; whole_sachet` | unchanged; do not multiply by bag weight |

The table is arithmetic guidance only; none of its numbers is recorded in the blank CSVs. `0.01` with `% w/w; as_received` means **0.01%**, or 0.1 mg/g—not 1%. Software cannot infer whether a plausible percentage was entered with the wrong intention: check the raw report and CSV text after spreadsheet export.

Use `% w/w; dry_basis`, `g/g; dry_basis` or `mg/g; dry_basis` for unconverted dry-basis results. Keep the original result and put the documented conversion in `basis_conversion_record`; only enter `concentration_as_received_mg_g` when the conversion is supported. If moisture is a mass fraction of the as-received sample and the method supports that correction, multiply dry-basis concentration by (1 − moisture fraction); do not assume this applies to every assay.

`component_mass_mg_per_sachet` = `net_sachet_mass_g` × `concentration_as_received_mg_g` only when the concentration represents that same whole sachet. A bulk sample or unrepresentative portion does not qualify. If the laboratory directly reports whole-sachet mg, retain that result without multiplying again. Partial-use results remain partial-use results: leave the whole-sachet calculated field blank.

Leave numeric cells blank for missing results, unquantified/less-than-LOQ results or unsupported conversions; explain why in `missing_reason` and record the LOQ and qualifier in `loq_and_qualifier`. Do not replace them with zero. A defensible numerical zero must be distinguishable from missing data. Summarize injections and preparations back to their physical sample before counting independent units; do not sum repeated whole-bag amounts.

## Material characterization: 18 columns

Identify `material_id`, `lot_id`, `ingredient_or_carrier`, and `composition_basis` (including composition source and basis); a commercial blend is not automatically pure glycoside. Retain `sampling_method`, `psd_method`, `dispersion_pressure_MPa` and volume-based `Dv10_um`, `Dv50_um`, `Dv90_um`. Record shape in `shape_method_observation`. Keep `bulk_density_g_mL`, `tapped_density_g_mL` and `true_density_g_mL` separate and describe each method in `density_methods`. Use `moisture_method_result`, `temperature_RH` and `raw_data_path` for moisture method/basis, measurement environment and original records. Mark unmeasured properties as blank and explain in the relevant method field.

## Checking the files

Run `python3 validate.py` from this directory. It checks the two blank schemas, unit calculations, original-file hashes and exact quotations; it does not validate a filled production dataset or approve a sampling plan. `python3 -m unittest -v test_validate.py` also exercises rejection cases. Unit-test numbers are synthetic arithmetic fixtures only.

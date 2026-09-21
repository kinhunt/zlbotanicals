"""Blank-artifact checks and SYNTHETIC arithmetic tests, not measured tea data.
Run: python -B validate.py. No files are changed by this script.
"""
import csv
import json
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent

class ArtifactTests(unittest.TestCase):
    def test_blank_sheet_contract(self):
        self.assertTrue((HERE / 'schema.json').exists(), 'Missing delivered schema and blank-sheet contract')
        schema = json.loads((HERE / 'schema.json').read_text())
        required = {
            'streams': {'boundary_id', 'batch_id', 'step_id', 'stream_id', 'analyte', 'interval_id', 'interval_start', 'interval_end', 'sampling_mode', 'result_basis', 'loq_value', 'loq_unit', 'loq_basis', 'analytical_D', 'already_corrected', 'extraction_volume_L', 'test_portion_kg', 'target_mg'},
            'boundary': {'boundary_id', 'batch_id', 'designated_product_streams', 'inventory_scope', 'criteria', 'approver'},
            'acceptance': {'pair_id', 'state', 'sample_id', 'concentrate_sample_id', 'concentrate_kg', 'added_water_kg', 'other_inputs_kg', 'final_mass_kg', 'water_report_id', 'pH', 'heat_process', 'packaging', 'observation_time', 'appearance_result', 'composition_result'}
        }
        for name, contract in schema.items():
            with (HERE / f'{name}.blank.csv').open(encoding='utf-8-sig', newline='') as f:
                rows = list(csv.reader(f))
            self.assertEqual(rows[0], contract['columns'])
            self.assertEqual(len(set(rows[0])), len(rows[0]))
            self.assertTrue(required[name] <= set(rows[0]))
            self.assertEqual(len(rows) - 1, contract['row_count'])
            for row in rows[1:]:
                self.assertEqual(len(row), len(rows[0]), name)
                for col, val in zip(rows[0], row):
                    if col in contract['numeric']:
                        self.assertEqual(val, '', f'{name}.{col} must be blank')
                    if val:
                        self.assertIn(col, contract['prefill'])
                        self.assertIn(val, contract['prefill'][col])

class SyntheticConversionTests(unittest.TestCase):
    """SYNTHETIC arbitrary unit fixtures; never measured tea results."""
    def test_amount_routes(self):
        self.assertTrue((HERE / 'reference_math.py').exists(), 'Missing reference conversion implementation')
        from reference_math import amount
        self.assertEqual(amount(2, 5, 'volume'), 10)  # L × mg/L
        self.assertEqual(amount(2, 5, 'volume', D=4, corrected=False), 40)
        self.assertEqual(amount(2, 5, 'volume', D=4, corrected=True), 10)
        self.assertEqual(amount(2, 5, 'mass'), 10)  # kg × mg/kg wet
        self.assertEqual(amount(2, 50, 'mass', dry_fraction=0.1), 10)
        self.assertEqual(amount(2, 5, 'extract', D=4, corrected=False,
                                extract_L=0.1, portion_kg=0.02), 200)
        self.assertEqual(amount(2, 5, 'extract', extract_L=0.1,
                                portion_kg=0.02, dry_fraction=0.1), 5)
        # LOQ upper-limit conversion uses the same positive map, not a point estimate.
        self.assertEqual(amount(2, 0.5, 'volume', D=4, corrected=False), 4)
        # Segmented cumulative output differs from using endpoint concentration.
        self.assertEqual(amount(2, 5, 'volume') + amount(3, 8, 'volume'), 34)
        for kwargs in [{'D': 0.5}, {'dry_fraction': 1.1}, {'dry_fraction': -0.1}]:
            with self.assertRaises(ValueError):
                amount(2, 5, 'mass', **kwargs)
        for q in [-1, float('nan'), float('inf')]:
            with self.assertRaises(ValueError):
                amount(q, 5, 'volume')
        with self.assertRaises(ValueError):
            amount(2, 5, 'extract', extract_L=0.1, portion_kg=0)
        with self.assertRaises(ValueError):
            amount(2, 5, 'kg-to-L-without-density')

    def test_metric_specific_unknowns(self):
        import reference_math as ref
        self.assertTrue(hasattr(ref, 'metrics'), 'Missing metric-specific completeness handling')
        # Synthetic mg amounts, NOT measured recovery data.
        self.assertEqual(ref.metrics([100], [60], [60, None], [0]), (60, None, None))
        self.assertEqual(ref.metrics([None], [60], [60, 40], [0]), (None, None, None))
        self.assertEqual(ref.metrics([100], [None], [60, 40], [0]), (None, 100, 0))
        self.assertEqual(ref.metrics([0], [0], [0], [0]), (None, None, None))
        self.assertEqual(ref.metrics([100], [60], [60, 50], [0]), (60, 110, -10))
        # Changing product designation must not change closure.
        self.assertEqual(ref.metrics([100], [40], [60, 40], [0]), (40, 100, 0))
        with self.assertRaises(ValueError):
            ref.metrics([100], [-1], [100], [0])

if __name__ == '__main__':
    unittest.main(verbosity=2)

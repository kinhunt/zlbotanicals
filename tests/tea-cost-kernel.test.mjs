import test from 'node:test';
import assert from 'node:assert/strict';
const module = await import('../src/lib/tea-cost-kernel.mjs').catch(() => ({}));
const calculate = module.calculate;
const base = (changes = {}) => ({
  analyte: 'Synthetic marker', assayReference: 'Synthetic method/report',
  unit: '%w/w', basis: 'as-supplied', assay: 38,
  targetMg: 50, bottles: 1000, ...changes,
});
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) <= 1e-12 * Math.max(1, Math.abs(expected)), `${actual} != ${expected}`);

test('as-supplied theoretical input with no uplift', () => {
  assert.equal(typeof calculate, 'function', 'kernel must export calculate');
  const r = calculate(base());
  assert.equal(r.assaySupplyMgG, 380);
  close(r.gramsPerBottle, 50 / 380);
  close(r.requiredKg, 0.13157894736842105);
});

test('mg/g report is already mg/g', () => {
  assert.equal(calculate(base({unit: 'mg/g', assay: 4})).assaySupplyMgG, 4);
});

test('confirmed whole-powder dry-basis correction', () => {
  const r = calculate(base({assay: 40, basis: 'dry-basis', correction: {
    percent: 5, kind: 'LOD', reference: 'Synthetic matching lot/method',
    sameLotAndMethod: true, appropriateForAssay: true,
  }}));
  assert.equal(r.assaySupplyMgG, 380);
});

test('required values reject unknown, blank, malformed, nonfinite and out-of-range input', () => {
  const bad = [
    ...['analyte','assayReference','unit','basis','assay','targetMg','bottles'].flatMap(field =>
      [undefined, null, '', '   '].map(value => ({[field]: value}))),
    {basis: 'native-extract'}, {unit: '%'}, {analyte: 42}, {assayReference: false},
    ...['assay','targetMg','bottles'].flatMap(field =>
      [NaN, Infinity, -Infinity, -1, 0, '1', true].map(value => ({[field]: value}))),
    {assay: 100.01}, {unit: 'mg/g', assay: 1000.01}, {bottles: 1.2}, {bottles: 2 ** 53},
  ];
  for (const changes of bad) assert.throws(() => calculate(base(changes)), /Invalid/, JSON.stringify(changes));
});

test('dry correction requires traceable matching confirmation and distinct LOD/KF label', () => {
  const correction = {percent: 5, kind: 'KF', reference: 'Synthetic ref', sameLotAndMethod: true, appropriateForAssay: true};
  for (const change of [null, {}, {percent: ''}, {percent: -1}, {percent: 100}, {percent: Infinity},
    {percent: NaN}, {percent: '5'}, {kind: 'water'}, {reference: ''},
    {sameLotAndMethod: false}, {appropriateForAssay: false}, {appropriateForAssay: 'yes'}]) {
    const c = change === null ? null : {...correction, ...change};
    if (change && Object.keys(change).length === 0) delete c.percent;
    assert.throws(() => calculate(base({basis: 'dry-basis', correction: c})), /Invalid correction/);
  }
  assert.equal(calculate(base({basis: 'dry-basis', correction: {...correction, percent: 0}})).assaySupplyMgG, 380);
});

test('known MOQ and packs separate procurement from theoretical consumption', () => {
  const r = calculate(base({assay: 100, targetMg: 134, moqKg: 5, packKg: 1}));
  assert.equal(r.requiredKg, 0.134);
  assert.equal(r.orderKg, 5);
  assert.equal(r.packCount, 5);
  assert.equal(r.leftoverKg, 4.866);
  assert.equal(r.moqKnown, true);
  assert.equal(r.packagingKnown, true);
  assert.equal(r.orderQuantityStatus, 'pack-rounded');
  const three = calculate(base({assay: 100, targetMg: 134, moqKg: 5, packKg: 3}));
  assert.equal(three.orderKg, 6);
  assert.equal(three.packCount, 2);
});

test('optional procurement blanks are unknown, numeric zero MOQ is known', () => {
  for (const blank of [undefined, null, '', '  ']) {
    const r = calculate(base({moqKg: blank, packKg: blank}));
    assert.equal(r.moqKnown, false);
    assert.equal(r.packagingKnown, false);
    assert.equal(r.packCount, null);
    assert.equal(r.orderKg, r.requiredKg);
    assert.equal(r.orderQuantityStatus, 'unrounded-packaging-unknown');
  }
  assert.equal(calculate(base({moqKg: 0})).moqKnown, true);
});

test('malformed MOQ and packaging do not disappear as unknown', () => {
  for (const field of ['moqKg', 'packKg']) {
    for (const value of [-1, NaN, Infinity, -Infinity, '2', true]) {
      assert.throws(() => calculate(base({[field]: value})), new RegExp(`Invalid ${field}`));
    }
  }
  assert.throws(() => calculate(base({packKg: 0})), /Invalid packKg/);
});

test('consumed ingredient cost is not purchase cash', () => {
  const r = calculate(base({assay: 100, targetMg: 134, moqKg: 5, packKg: 1, pricePerKg: 100, currency: 'SYN'}));
  close(r.cost.consumedTotal, 13.4);
  assert.equal(r.cost.purchaseCash, 500);
  close(r.cost.consumedPerBottle, 0.0134);
  assert.equal(r.cost.purchaseCashPerBottle, 0.5);
  assert.equal(r.cost.currency, 'SYN');
});

test('price validity, currency pairing and explicitly confirmed zero quote', () => {
  for (const value of [undefined, null, '', ' ']) assert.equal(calculate(base({pricePerKg: value})).cost, null);
  for (const value of [-1, NaN, Infinity, -Infinity, '100', true])
    assert.throws(() => calculate(base({pricePerKg: value, currency: 'SYN'})), /Invalid pricePerKg/);
  for (const currency of [undefined, '', '  ', 42])
    assert.throws(() => calculate(base({pricePerKg: 100, currency})), /Invalid currency/);
  assert.throws(() => calculate(base({pricePerKg: 0, currency: 'SYN'})), /Invalid zeroPriceConfirmed/);
  assert.equal(calculate(base({pricePerKg: 0, currency: 'SYN', zeroPriceConfirmed: true})).cost.purchaseCash, 0);
});

test('pack rounding absorbs binary noise but not a material excess', () => {
  const cases = [[0.3, 0.1, 3], [0.1 + 0.2, 0.1, 3], [0.6, 0.2, 3],
    [0.3000000001, 0.1, 4], [0.2999999999, 0.1, 3], [6, 3, 2], [6.000000001, 3, 3]];
  for (const [moqKg, packKg, count] of cases) {
    const r = calculate(base({moqKg, packKg}));
    assert.equal(r.packCount, count, `${moqKg}/${packKg}`);
    assert.equal(r.orderKg, count * packKg);
  }
});

test('overflow, underflow and unsafe pack counts fail rather than return misleading numbers', () => {
  for (const change of [
    {targetMg: Number.MAX_VALUE}, {assay: Number.MIN_VALUE, unit: 'mg/g'},
    {targetMg: Number.MIN_VALUE}, {packKg: Number.MIN_VALUE},
    {moqKg: Number.MAX_VALUE, packKg: Number.MAX_VALUE * 0.75},
    {pricePerKg: Number.MAX_VALUE, currency: 'SYN', moqKg: 10},
  ]) assert.throws(() => calculate(base(change)), /Invalid numerical/);
});

test('report conversion is explicit including valid 0.4% and carrier is not deducted twice', () => {
  const r = calculate(base({assay: 0.4, carrierPercent: 20}));
  assert.equal(r.assayReportMgG, 4);
  assert.equal(r.assaySupplyMgG, 4);
  assert.equal(calculate(base({carrierPercent: 20})).assaySupplyMgG, 380);
  assert.equal(calculate(base({assay: 100})).assaySupplyMgG, 1000);
  assert.equal(calculate(base({assay: 1000, unit: 'mg/g'})).assaySupplyMgG, 1000);
  assert.equal(r.accountingBasis, 'theoretical-input-per-bottle');
});

test('quote and correction evidence are copied without inventing comparison readiness', () => {
  const quoteMetadata = {tradeTerm: 'SYN', location: 'Synthetic place', tax: 'Synthetic excluded', validity: 'Synthetic date'};
  const correction = {percent: 5, kind: 'KF', reference: 'Synthetic ref', sameLotAndMethod: true, appropriateForAssay: true};
  const input = base({basis: 'dry-basis', correction, quoteMetadata});
  const r = calculate(input);
  assert.deepEqual(r.evidence.quoteMetadata, quoteMetadata);
  assert.deepEqual(r.evidence.correction, correction);
  assert.equal(r.quoteMetadataComplete, true);
  r.evidence.quoteMetadata.tax = 'modified';
  r.evidence.correction.kind = 'modified';
  assert.equal(input.quoteMetadata.tax, 'Synthetic excluded');
  assert.equal(input.correction.kind, 'KF');
  assert.equal(calculate(base()).quoteMetadataComplete, false);
  assert.equal(calculate(base({pricePerKg: 1, currency: 'SYN'})).cost.currency, 'SYN');
});

test('reject unsupported routes and accidental extra fields rather than silently ignoring them', () => {
  for (const change of [{processLoss: 20}, {form: 'liquid'}, {nativeFraction: 0.8}, {targetRetainedMg: 50}, {typo: 1},
    {carrierPercent: -1}, {carrierPercent: 101}, {carrierPercent: Infinity}, {quoteMetadata: {tax: {nested: true}}}])
    assert.throws(() => calculate(base(change)), /Invalid/);
  for (const input of [null, undefined, [], 'powder']) assert.throws(() => calculate(input), /Invalid input/);
});

test('near-boundary arithmetic never reports negative leftover', () => {
  const r = calculate(base({unit: 'mg/g', assay: 1, targetMg: 0.30000000000000004, packKg: 0.3}));
  assert.equal(r.packCount, 1);
  assert.equal(r.leftoverKg, 0);
});

test('CLI prints clearly synthetic fixture with separate display rounding', async () => {
  const {spawnSync} = await import('node:child_process');
  const r = spawnSync(process.execPath, ['tea-cost-example.mjs'], {cwd: new URL('.', import.meta.url), encoding: 'utf8'});
  assert.equal(r.status, 0, r.stderr);
  const output = JSON.parse(r.stdout);
  assert.match(output.notice, /SYNTHETIC.*not vendor data/);
  assert.equal(output.result.cost.purchaseCash, 500);
  assert.equal(output.display.requiredKg, '0.134000');
  assert.equal(output.result.requiredKg, 0.134);
});

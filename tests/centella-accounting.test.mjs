import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
const moduleUrl = new URL('../src/utils/centella-accounting.mjs', import.meta.url);
test('supply-state mg/g and mass percent give the same theoretical contribution', async () => {
  assert.ok(existsSync(moduleUrl), 'accounting module exists');
  const {contribution} = await import(moduleUrl);
  assert.equal(contribution('20', 'mg/g', '1', 'as-supplied'), 0.2);
  assert.equal(contribution('2', '%', '1', 'as-supplied'), 0.2);
 });
test('unknown is not zero; dry-basis, invalid units and impossible fractions are rejected', async () => {
  const {contribution} = await import(moduleUrl);
  for (const value of ['', ' ', null, undefined]) assert.equal(contribution(value, 'mg/g', '1', 'as-supplied'), null);
  assert.equal(contribution('0', 'mg/g', '1', 'as-supplied'), 0);
  assert.equal(contribution('10', 'mg/g', '', 'as-supplied'), null);
  for (const args of [
    ['10','mg/g','1','dry'], ['10','mg/mL','1','as-supplied'],
    ['-1','mg/g','1','as-supplied'], ['1001','mg/g','1','as-supplied'],
    ['101','%','1','as-supplied'], ['1','%','101','as-supplied'],
    ['1','%','-1','as-supplied'], ['NaN','%','1','as-supplied'],
    ['Infinity','%','1','as-supplied'], ['0x10','%','1','as-supplied']
  ]) assert.throws(() => contribution(...args), RangeError);
  assert.equal(contribution('100', '%', '100', 'as-supplied'), 1000);
  assert.equal(contribution('0.00001', 'mg/g', '0.01', 'as-supplied'), 1e-9);
});

test('five independent components share the supplied-mass ceiling without replacing unknowns', async () => {
  const {markerContributions} = await import(moduleUrl);
  const rows = [['60','%'],['','mg/g'],['','mg/g'],['','mg/g'],['50','%']];
  for (const addition of ['1','0','']) assert.throws(() => markerContributions(rows, addition, 'as-supplied'), RangeError);
  rows[4] = ['40','%'];
  assert.deepEqual(markerContributions(rows, '1', 'as-supplied'), [6,null,null,null,4]);
  assert.deepEqual(markerContributions(rows, '0', 'as-supplied'), [0,null,null,null,0]);
  rows[0] = ['20','mg/g']; rows[4] = ['50','%'];
  assert.deepEqual(markerContributions(rows, '1', 'as-supplied'), [0.2,null,null,null,5]);
});

test('four distinct markers cannot exceed the whole supplied mass, even at zero addition', async () => {
  const module = await import(moduleUrl);
  assert.equal(typeof module.markerContributions, 'function');
  const rows = [['60','%'],['50','%'],['','mg/g'],['','mg/g']];
  assert.throws(() => module.markerContributions(rows, '0', 'as-supplied'), RangeError);
  assert.deepEqual(module.markerContributions([['20','mg/g'],['0','%'],['','mg/g'],['','%']], '1', 'as-supplied'), [0.2,0,null,null]);
});

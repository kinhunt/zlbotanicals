import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate} from '../src/lib/tea-cost-kernel.mjs';
const base = x => ({analyte:'SYNTHETIC marker',assayReference:'SYNTHETIC report',unit:'mg/g',basis:'as-supplied',assay:380,targetMg:50,bottles:1000,...x});

test('B1 exact supported decimal procurement never snaps a real excess downward', () => {
  for (const x of [
    {moqKg:1000000000000001,packKg:1000000000000000},
    {assay:1,targetMg:1000000000000001,packKg:1000000000000000},
    {moqKg:0.3000000000000004,packKg:0.1},
  ]) {
    const r = calculate(base(x));
    assert.ok(r.orderKg >= Math.max(r.requiredKg,x.moqKg ?? 0), JSON.stringify(r));
    assert.equal(r.packCount, x.packKg === 0.1 ? 4 : 2);
    assert.equal(r.leftoverKg,r.orderKg-r.requiredKg);
  }
  // Explicit decimal-16 semantics: binary 0.1+0.2 canonicalizes to decimal 0.3.
  assert.equal(calculate(base({moqKg:0.1+0.2,packKg:0.1})).packCount,3);
  const boundary=calculate(base({assay:1,targetMg:0.1+0.2,packKg:0.3}));
  assert.equal(boundary.packCount,1);
  assert.equal(boundary.requiredKg,0.3);
  assert.equal(boundary.leftoverKg,0);
});

test('B2 rejects nonzero subnormal inputs and derived arithmetic', () => {
  for (const x of [
    {assay:1,targetMg:3e-321,bottles:1},
    {assay:1000,targetMg:600,bottles:1,pricePerKg:5e-321,currency:'SYN'},
    {assay:1000,targetMg:1e-300,bottles:1,pricePerKg:1e-10,currency:'SYN'},
    {assay:1000,targetMg:1e-300,bottles:1e10,pricePerKg:1e-10,currency:'SYN'},
    {moqKg:1e-320}, {packKg:1e-320},
    {assay:1e-307,basis:'dry-basis',correction:{percent:99,kind:'KF',reference:'SYN',sameLotAndMethod:true,appropriateForAssay:true}},
  ]) assert.throws(() => calculate(base(x)), /Invalid numerical/);
  assert.ok(calculate(base({assay:1,targetMg:1e-300,bottles:1})).requiredKg > 0);
});

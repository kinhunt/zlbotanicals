// Post-fix verification, not claimed as an additional RED/GREEN cycle.
import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate} from '../src/lib/tea-cost-kernel.mjs';
const base = x => ({analyte:'SYNTHETIC',assayReference:'SYNTHETIC',unit:'mg/g',basis:'as-supplied',assay:380,targetMg:50,bottles:1000,...x});
const ge = (a,b) => BigInt(a.numerator)*BigInt(b.denominator) >= BigInt(b.numerator)*BigInt(a.denominator);
test('exact rational order covers exact need and MOQ over decimal grid and extremes',()=>{
 for(let count=1;count<=1000;count++) for(let cents=1;cents<=10;cents++){
  const r=calculate(base({targetMg:.000001,moqKg:count*cents/100,packKg:cents/100}));
  assert.ok(ge(r.exactMassKg.order,r.exactMassKg.required));
  assert.ok(ge(r.exactMassKg.order,r.exactMassKg.moq));
  assert.equal(r.leftoverKg,r.orderKg-r.requiredKg);
 }
 for(const x of [{moqKg:1e15+1,packKg:1e15},{assay:1,targetMg:1e15+1,packKg:1e15},{moqKg:.3000000000000004,packKg:.1},{moqKg:.1+.2,packKg:.1},{assay:1,targetMg:.1+.2,packKg:.3}]){
  const r=calculate(base(x));
  assert.ok(ge(r.exactMassKg.order,r.exactMassKg.required));
  assert.ok(ge(r.exactMassKg.order,r.exactMassKg.moq));
 }
});

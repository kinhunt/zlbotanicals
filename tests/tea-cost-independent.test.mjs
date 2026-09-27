import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate} from '../src/lib/tea-cost-kernel.mjs';
const base = (x={}) => ({analyte:'SYNTHETIC marker',assayReference:'SYNTHETIC assay reference',unit:'mg/g',basis:'as-supplied',assay:380,targetMg:50,bottles:1000,...x});
const correction = {percent:5,kind:'LOD',reference:'SYNTHETIC matching report',sameLotAndMethod:true,appropriateForAssay:true};
const close=(a,b)=>assert.ok(Math.abs(a-b)<=1e-12*Math.max(Math.abs(b),Number.MIN_VALUE),`${a} != ${b}`);
test('independent reference equations and price distinctions',()=>{
 const r=calculate(base({assay:1000,targetMg:134,moqKg:5,packKg:3,pricePerKg:100,currency:'SYN'}));
 close(r.requiredKg,.134); assert.equal(r.orderKg,6); assert.equal(r.packCount,2); close(r.leftoverKg,5.866);
 close(r.cost.consumedTotal,13.4); assert.equal(r.cost.purchaseCash,600); close(r.cost.consumedPerBottle,.0134); close(r.cost.purchaseCashPerBottle,.6);
});
test('percent conversion and whole powder denominator do not subtract carrier',()=>{
 assert.equal(calculate(base({unit:'%w/w',assay:.4})).assaySupplyMgG,4);
 const a=calculate(base({unit:'%w/w',assay:38,carrierPercent:20}));
 const b=calculate(base({unit:'%w/w',assay:40,basis:'dry-basis',correction}));
 assert.equal(a.assaySupplyMgG,380);assert.equal(b.assaySupplyMgG,380);assert.equal(a.requiredKg,b.requiredKg);
});
test('independent decimal pack grid uses integer reference (10,000 cases)',()=>{
 for(let packs=1;packs<=1000;packs++)for(let cents=1;cents<=10;cents++){
  const r=calculate(base({targetMg:.000001,moqKg:packs*cents/100,packKg:cents/100}));
  assert.equal(r.packCount,packs);assert.equal(r.orderKg,r.packCount*(cents/100));
 }
});
test('ordinary boundary excess requires another pack',()=>{
 assert.equal(calculate(base({moqKg:.3000000001,packKg:.1})).packCount,4);
 assert.equal(calculate(base({moqKg:.3,packKg:.1})).packCount,3);
});
test('unknown procurement and price remain different from confirmed zeros',()=>{
 for(const v of [undefined,null,'',' \t ']){
  const r=calculate(base({moqKg:v,packKg:v,pricePerKg:v}));assert.equal(r.moqKnown,false);assert.equal(r.packagingKnown,false);assert.equal(r.cost,null);assert.equal(r.packCount,null);
 }
 const z=calculate(base({moqKg:0,pricePerKg:0,currency:'SYN',zeroPriceConfirmed:true})); assert.equal(z.moqKnown,true);assert.equal(z.cost.purchaseCash,0);
 assert.throws(()=>calculate(base({pricePerKg:0,currency:'SYN'})),RangeError);
});
test('malformed options and unsupported routes fail closed',()=>{
 for(const field of ['moqKg','packKg','pricePerKg'])for(const v of [-1,NaN,Infinity,'0',false,{},[]]) assert.throws(()=>calculate(base({[field]:v})),RangeError);
 for(const extra of [{processLoss:2},{nativeFraction:.8},{form:'liquid'},{targetRetainedMg:50}])assert.throws(()=>calculate(base(extra)),RangeError);
});
test('dry-basis labels and matching attestations are required',()=>{
 for(const kind of ['LOD','KF'])assert.equal(calculate(base({basis:'dry-basis',assay:400,correction:{...correction,kind}})).evidence.correction.kind,kind);
 for(const c of [undefined,null,{}, {...correction,percent:100},{...correction,sameLotAndMethod:false},{...correction,appropriateForAssay:false},{...correction,reference:' '},{...correction,kind:'water'}]) assert.throws(()=>calculate(base({basis:'dry-basis',correction:c})),RangeError);
});
test('overflows, zero underflows and unsafe counts rejected',()=>{
 for(const x of [{targetMg:Number.MAX_VALUE},{targetMg:Number.MIN_VALUE},{packKg:Number.MIN_VALUE},{bottles:2**53},{moqKg:10,pricePerKg:Number.MAX_VALUE,currency:'SYN'}])assert.throws(()=>calculate(base(x)),RangeError);
});
test('metadata completeness does not manufacture price or verification',()=>{
 const r=calculate(base({quoteMetadata:{tradeTerm:'SYN',location:'SYN',tax:'SYN',validity:'expired or fictitious'}}));
 assert.equal(r.quoteMetadataComplete,true);assert.equal(r.cost,null);assert.equal(r.accountingBasis,'theoretical-input-per-bottle');
});
test('CONTRACT minimum: known MOQ must not be rounded downward',()=>{
 const r=calculate(base({moqKg:1000000000000001,packKg:1000000000000000}));
 assert.ok(r.orderKg>=1000000000000001,`order ${r.orderKg} is 1 kg below MOQ; packs ${r.packCount}`);
});
test('CONTRACT minimum: order must cover required mass without hiding shortfall',()=>{
 const r=calculate(base({assay:1,targetMg:1000000000000001,bottles:1000,packKg:1000000000000000}));
 assert.ok(r.orderKg>=r.requiredKg,`need ${r.requiredKg}, order ${r.orderKg}, reported leftover ${r.leftoverKg}`);
 assert.equal(r.leftoverKg,r.orderKg-r.requiredKg);
});

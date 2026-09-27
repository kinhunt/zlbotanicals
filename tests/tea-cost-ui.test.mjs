import test from 'node:test';
import assert from 'node:assert/strict';
let api;
try { api = await import('../src/lib/tea-cost-input.mjs'); } catch {}
test('plain decimal parser preserves supported meaning and rejects unsupported lexical precision', () => {
 assert.equal(typeof api?.parseDecimal, 'function', 'decimal parser must exist');
 for (const [s,n] of [['0.4',0.4],['0.3000000000000004',0.3000000000000004],['001.2300',1.23],['0',0]]) assert.equal(api.parseDecimal(s),n);
 for (const s of ['', ' ', '-1', '+1', '1e2', '0x10', '1,000', '.4', '1.', 'Infinity', '0.30000000000000004', '10000000000000001']) assert.throws(()=>api.parseDecimal(s));
 assert.equal(api.parseDecimal('', true), undefined);
});

test('reviewed kernel is bound unchanged and adapter calculates declared synthetic scenario', async () => {
 assert.equal(typeof api?.calculateFields, 'function', 'field adapter must exist');
 const f = {analyte:'synthetic marker', assayReference:'synthetic test only', assay:'40', unit:'%w/w', basis:'as-supplied', targetMg:'50', bottles:'1000', moqKg:'5', packKg:'1', pricePerKg:'100', currency:'USD'};
 const a=api.calculateFields(f);
 assert.equal(a.requiredKg,0.125); assert.equal(a.orderKg,5); assert.equal(a.leftoverKg,4.875);
 assert.equal(a.cost.consumedTotal,12.5); assert.equal(a.cost.purchaseCash,500);
 assert.equal(api.calculateFields({...f,pricePerKg:''}).cost,null);
 assert.throws(()=>api.calculateFields({...f,pricePerKg:'0'}));
 assert.equal(api.calculateFields({...f,pricePerKg:'0',zeroPriceConfirmed:true}).cost.consumedTotal,0);
 assert.throws(()=>api.calculateFields({...f,basis:'dry-basis'}));
 const dry={...f,basis:'dry-basis',correctionKind:'LOD',correctionPercent:'5',correctionReference:'synthetic same-lot method',sameLotAndMethod:true,appropriateForAssay:true};
 assert.equal(api.calculateFields(dry).assaySupplyMgG,380);
 assert.equal(api.calculateFields({...dry,basis:'as-supplied',correctionPercent:'invalid'}).assaySupplyMgG,400);
 assert.throws(()=>api.calculateFields({...f,basis:'native-extract'}));
 assert.throws(()=>api.calculateFields({...f,bottles:'1.5'}));
 const {createHash}=await import('node:crypto'); const {readFileSync}=await import('node:fs');
 assert.equal(createHash('sha256').update(readFileSync('src/lib/tea-cost-kernel.mjs')).digest('hex'),'8102f892bee865842d8f8edf397545c203c49ea173afb5217ab52d43bc22352d');
});

test('both existing articles render local-only accessible calculator and preserve original markdown', async () => {
 const {readFileSync}=await import('node:fs');
 for (const prefix of ['', 'zh/']) {
  const html=readFileSync(`dist/${prefix}resources/blog/green-tea-energy-beverage-2026/index.html`,'utf8');
  assert.match(html,/id="tea-cost-calculator"/, 'calculator exists');
  assert.match(html,/<noscript>/); assert.match(html,/aria-live="polite"/);
  assert.match(html,/id="tc-assay"/); assert.match(html,/for="tc-assay"/);
  assert.match(html,/id="tc-basis"/); assert.match(html,/data-calculate/);
 }
});

for (const lang of ['en', 'zh']) test(`${lang} rendered manual dry-basis equation converts percent before multiplying mg/g`, async () => {
 const {readFileSync}=await import('node:fs');
 const html=readFileSync(`dist/${lang === 'zh' ? 'zh/' : ''}resources/blog/green-tea-energy-beverage-2026/index.html`,'utf8');
 const manual=html.slice(html.indexOf('id="tea-cost-calculator"')).match(/<details[^>]*>\s*<summary[^>]*>[\s\S]*?<\/summary>\s*<p[^>]*>([\s\S]*?)<\/p>/)?.[1].replace(/<[^>]+>/g,'').replace(/\s+/g,' ');
 assert.ok(manual, 'rendered manual-equation paragraph exists');
 if (lang === 'en') {
  assert.match(manual,/first convert.*percentage number × 10.*mg\/g/i);
  assert.match(manual,/Supplied assay \(mg\/g\) = dry-basis assay \(mg\/g\) × \(1 − confirmed correction% \/ 100\)/);
  assert.match(manual,/0\.4%.*5%.*4 mg\/g × 0\.95 = 3\.8 mg\/g/);
 } else {
  assert.match(manual,/先将.*百分数数值 × 10.*mg\/g/);
  assert.match(manual,/供应粉末含量（mg\/g）= 干基含量（mg\/g）×（1 − 已确认校正百分数\/100）/);
  assert.match(manual,/0\.4%.*5%.*4 mg\/g × 0\.95 = 3\.8 mg\/g/);
 }
});

test('lexical supported digits must also survive Number and kernel canonicalization unchanged', () => {
 assert.throws(()=>api.parseDecimal('99999999999999990'), 'must not silently change a 16-meaningful-digit integer');
 assert.equal(api.parseDecimal('10000000000000000'),10000000000000000);
});

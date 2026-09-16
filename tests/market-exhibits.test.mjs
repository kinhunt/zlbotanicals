import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const data=JSON.parse(readFileSync('src/data/market-v4.json','utf8'));
for(const lang of ['en','zh'])test(`${lang}: v4 precise exhibits use reviewed values and units`,()=>{
 const h=readFileSync(`dist/${lang==='zh'?'zh/':''}research/market/functional-mushrooms/index.html`,'utf8');
 const figure=id=>h.match(new RegExp(`<figure[^>]*id="${id}"[\\s\\S]*?</figure>`))[0];
 assert.equal((h.match(/<figure/g)||[]).length,5);
 for(const id of ['sample-form','retail-sales','global-forecast']){
  const f=figure(id),d=data.charts.find(c=>c.id===id);
  const expected=d.rows.map(r=>r.count??r.sales_usd??r.value).sort((a,b)=>a-b);
  const actual=[...f.matchAll(/data-value="([\d.]+)"/g)].map(m=>+m[1]).sort((a,b)=>a-b);assert.deepEqual(actual,expected);
  for(const rect of f.matchAll(/<rect[^>]+>/g)){assert.match(rect[0],/x="0"/);assert.doesNotMatch(rect[0],/fill="(none|white|#fff)"/);}
 }
 const forecast=figure('global-forecast');for(const s of ['2026','2031','8.66%'])assert.ok(forecast.includes(s));
 const retail=figure('retail-sales');for(const s of ['15,651,639','27,550,554','75.8%','14.4%','Whole Foods Market','Trader Joe'])assert.ok(retail.includes(s));
 const dose=figure('dose-basis');assert.match(dose,/300/);assert.match(dose,/3,000/);assert.doesNotMatch(dose,/<svg/);
 const matrix=figure('material-format');for(const p of data.products){assert.ok(matrix.includes(p.canonical_url));assert.ok(matrix.includes(p.brand));}
 assert.equal(new Set(data.products.map(p=>p.brand)).size,15);assert.equal(data.products.length,18);
 for(const cell of data.charts.find(c=>c.id==='material-format').rows)assert.equal(cell.count,data.products.filter(p=>p.form===cell.form&&p.material===cell.material_claim).length);
});

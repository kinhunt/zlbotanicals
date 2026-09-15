import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=lang=>readFileSync(new URL(`../dist/${lang==='zh'?'zh/':''}research/market/functional-mushrooms/index.html`,import.meta.url),'utf8');
const figure=(lang,id)=>read(lang).match(new RegExp(`<figure[^>]*id="${id}"[\\s\\S]*?</figure>`))?.[0];
for(const lang of ['en','zh']){
 test(`${lang}: two accessible solid endpoint bars retain source dates`,()=>{
 const f=figure(lang,'exhibit-1');assert.ok(f);assert.match(f,/<details/);assert.match(f,/<caption/);assert.doesNotMatch(f,/role="img"/);
 const bars=[...f.matchAll(/<rect\b[^>]*>/g)].map(m=>m[0]);assert.equal(bars.length,2);
 for(const [i,v] of ['583','883'].entries()){assert.match(bars[i],/x="0"/);assert.ok(bars[i].includes(`width="${v}"`));assert.ok(bars[i].includes(`fill="${i?'#52665e':'#1b4d3e'}"`));}
 assert.match(f,lang==='zh'?/2031 · 预测/:/2031 · Forecast/);for(const date of ['2026-09-11','2026-01','2026-09-15'])assert.ok(f.includes(date));assert.doesNotMatch(f,/2027|2028|2029/);
 });
 test(`${lang}: SPINS sales use dollar lengths and separate text growth`,()=>{
 const f=figure(lang,'us-channel-growth');assert.ok(f);assert.match(f,/<details/);assert.match(f,/2024-12-31/);assert.match(f,/52/);assert.match(f,/Whole Foods/);assert.match(f,/Trader Joe/);
 const bars=[...f.matchAll(/<rect\b[^>]*>/g)].map(m=>m[0]);assert.equal(bars.length,2);for(const b of bars)assert.match(b,/x="0"/);
 const widths=bars.map(b=>Number(b.match(/width="([\d.]+)"/)[1]));assert.ok(Math.abs(widths[0]/widths[1]-15.7/27.550554)<1e-8);
 for(const v of ['75.8%','14.4%'])assert.ok(f.includes(v));assert.equal((f.match(/class="yoy"/g)||[]).length,2);assert.doesNotMatch(f,/data-value="75.8"|data-value="14.4"/);
 });
 test(`${lang}: seven brand matrix replaces obsolete four-exhibit inventory`,()=>{
 const h=read(lang),f=figure(lang,'brand-positioning');assert.ok(f);assert.equal((h.match(/<figure/g)||[]).length,3);
 assert.equal((f.match(/scope="row"/g)||[]).length,7);assert.equal((f.match(/scope="col"/g)||[]).length,4);assert.equal((f.match(/class="product-card"/g)||[]).length,7);
 for(const name of ['Four Sigmatic','RYZE','Real Mushrooms','FreshCap','Host Defense','Om Mushroom Superfood','Odyssey'])assert.ok(f.includes(name));
 assert.doesNotMatch(f,/ASIN|Amazon|12:1|14:1|1,000mg/);for(const id of ['exhibit-2','exhibit-3','exhibit-4'])assert.ok(h.includes(`id="${id}"`));
 });
}

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
for(const lang of ['en','zh']) test(`${lang}: v4 Amazon evidence survives rendering`,()=>{
 const h=readFileSync(`dist/${lang==='zh'?'zh/':''}research/market/functional-mushrooms/index.html`,'utf8');
 assert.ok(h.includes('market-v4-ref-30'),'v4 citations');
 for(const s of ['4/18','6/18','B01JNNAQVW','B0C4166SSW','300','3,000'])assert.ok(h.includes(s),s);
 for(const id of ['sample-form','material-format','dose-basis','retail-sales','global-forecast'])assert.ok(h.includes(`id="${id}"`),id);
 const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 assert.doesNotMatch(h.replace(/<[^>]+>/g,''),/\*\*|\|---/);
 for(let n=1;n<=30;n++)assert.ok(h.includes(`id="market-v4-ref-${n}"`));
});

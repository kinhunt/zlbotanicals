import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),read=p=>readFileSync(new URL(p,root),'utf8');
const sources=JSON.parse(read('docs/evidence/market-depth-v3/source-manifest.json')).sources;
test('22 approved evidence archives preserve their actual original hashes',()=>{assert.equal(sources.length,22);for(const s of sources)assert.equal(createHash('sha256').update(readFileSync(new URL('docs/evidence/market-depth-v3/'+s.evidence_file,root))).digest('hex'),s.sha256);});
test('channel bars and table share approved amounts and growth values',()=>{const d=JSON.parse(read('src/data/market-exhibits.json'));assert.deepEqual(d.channels.data.map(r=>[r.value,r.yoy_percent]),[[15.7,75.8],[27.550554,14.4]]);assert.equal(d.channels.period,'52 weeks ending 2024-12-31');assert.equal(d.brands.en.length,7);assert.equal(d.brands.zh.length,7);});
for(const lang of ['en','zh'])test(`${lang}: v3 rendered IDs and markdown are clean`,()=>{const h=read(`dist/${lang==='zh'?'zh/':''}research/market/functional-mushrooms/index.html`),ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);assert.doesNotMatch(h.replace(/<[^>]+>/g,''),/\*\*|\|---/);assert.match(h,/Amazon/);assert.ok(h.includes('id="method"'));});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const packs=JSON.parse(readFileSync('src/data/ingredient-reader-packs.json'));
const get=id=>packs.find(p=>p.productId===id);
test('goji dependent claims retain retentate, water ratio and undefined enzyme basis',()=>{
 for(const lang of ['en','zh']){
  const t=JSON.stringify(get('goji-berry').content[lang].find(s=>s.id==='patents'));
  assert.match(t,/1:2/);assert.match(t,lang==='en'?/retentate/:/截留液/);
  assert.match(t,lang==='en'?/concentration basis/:/浓度计量基础/);
 }
});
test('Centella bilingual carrier and gel roles preserve the A-review qualifiers',()=>{
 const p=get('centella-asiatica');
 assert.doesNotMatch(JSON.stringify(p.content.zh),/水／多元醇原料是带有自身载体与防腐体系/);
 assert.match(JSON.stringify(p.plans[2].content.en),/Glycerol contributes humectancy/);
});
test('reader prose excludes remaining internal review instructions and yogurt assignment ambiguity',()=>{
 const t=JSON.stringify(packs);
 assert.doesNotMatch(t,/No factory validation|此次未核实工厂|本公司配方|QA的真实案例|本次未获得一套/);
 const r=get('reishi-mushroom');
 assert.match(JSON.stringify(r.content.en),/0.1% to powder and 0.2% to extract, respectively/);
});
test('clinical and patent blocking corrections remain in integrated bilingual source',()=>{
 for(const lang of ['en','zh']){
  const text=id=>JSON.stringify(get(id).content[lang]);
  assert.match(text('reishi-mushroom'),/0.1590/);assert.match(text('reishi-mushroom'),/0.0002/);
  assert.match(text('stevia'),/31/);assert.match(text('stevia'),/28/);assert.match(text('stevia'),/SweetLeaf/);
  assert.match(text('licorice-root'),/a minimum of 4-90%/);
  assert.match(text('goji-berry'),/20\/40 kHz/);assert.match(text('goji-berry'),/16\/20 kHz/);assert.match(text('goji-berry'),/28 kHz/);
  assert.match(text('resveratrol'),lang==='en'?/synthesized, encapsulated trans-resveratrol/:/合成并制成胶囊的反式白藜芦醇/);
  assert.doesNotMatch(text('ginkgo-biloba'),/this recovery|本次恢复/);
 }
});

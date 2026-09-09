import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const dossiers=JSON.parse(readFileSync('src/data/product-dossiers.json'));
const science=new Set(['green-tea','centella-asiatica','monk-fruit']);
const dimensions=['processes','equipment','applications','standards','insights'];
const html=p=>readFileSync(`dist${p}/index.html`,'utf8');
test('all 12 bilingual products link five dimensions to their own substantive canonical content',()=>{
 assert.equal(dossiers.length,12);
 for(const lang of ['en','zh']) for(const d of dossiers){
  const prefix=lang==='zh'?'/zh':'';
  const product=`${prefix}/products/${d.slug}`;
  const target=science.has(d.slug)?`${prefix}/plant-extracts/ingredients/${d.slug}`:product;
  const page=html(product), destination=html(target);
  for(const dimension of dimensions){
   assert.ok(page.includes(`href="${target}#${dimension}"`),`${lang}/${d.slug}: missing contextual ${dimension} link`);
   const section=destination.match(new RegExp(`<section[^>]*id="${dimension}"[^>]*>([\\s\\S]*?)</section>`));
   assert.ok(section,`${target}#${dimension} missing section`);
   assert.ok(section[1].replace(/<[^>]*>/g,'').length>130,`${target}#${dimension} lacks substance`);
  }
  assert.ok(page.includes(lang==='zh'?'全部原料通用指南':'General guides for all ingredients'));
 }
});

test('unmatched ingredient news explicitly says no matching reviewed records',()=>{
 for(const prefix of ['', '/zh']) {
  const page=html(`${prefix}/products/centella-asiatica`);
  assert.ok(page.includes(prefix?'暂无与本原料匹配的已核查事件记录':'No reviewed event records match this ingredient'));
  assert.ok(!page.includes('2022/2340'));
 }
});

const knowledge=JSON.parse(readFileSync('src/data/ingredient-knowledge.json'));
const sourceRecords=JSON.parse(readFileSync('src/data/ingredient-sources.json'));
const discriminators={
 'green-tea':['EGCG','catechin','儿茶素'], 'centella-asiatica':['triterpene','glycoside','三萜'],
 'monk-fruit':['mogroside','sweet','甜苷'], 'turmeric':['curcumin','carrier','姜黄素'],
 'reishi-mushroom':['polysaccharide','triterpene','多糖'], 'ginseng':['ginsenoside','steam','人参'],
 'ginkgo-biloba':['polysaccharide','flavone','银杏'], 'grape-seed':['seed','proanthocyanidin','籽'],
 'goji-berry':['polysaccharide','juice','多糖'], 'licorice-root':['glycyrrhizin','species','甘草'],
 'stevia':['glycoside','leaf','糖苷'], 'resveratrol':['resveratrol','carrier','白藜芦醇']
};
test('content coverage is differentiated in every dimension and renders exact source-bound data',()=>{
 assert.deepEqual(new Set(knowledge.map(k=>k.productId)),new Set(dossiers.map(d=>d.slug)));
 assert.equal(new Set(sourceRecords.map(s=>s.id)).size,sourceRecords.length);
 for(const dim of dimensions) for(const lang of ['en','zh']) {
  const seen=new Set();
  for(const k of knowledge){
   const b=k.sections[dim],text=b.text[lang];
   assert.ok(text.length>(lang==='en'?180:80),`${k.productId}/${dim}/${lang}`);
   assert.ok(!seen.has(text),`duplicated ${dim}/${lang}`); seen.add(text);
   const words=discriminators[k.productId];
   assert.ok(lang==='zh'?text.includes(words[2]):words.slice(0,2).some(w=>text.toLowerCase().includes(w)),`${k.productId} ${dim} missing material-specific detail`);
   const page=html(`${lang==='zh'?'/zh':''}${k.canonicalPath}`);
   const section=page.match(new RegExp(`<section[^>]*id="${dim}"[^>]*>([\\s\\S]*?)</section>`));
   const escaped=text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
   assert.ok(section[1].includes(escaped),`${k.productId}/${dim} data not rendered`);
   for(const n of b.citations){
    const source=sourceRecords.find(s=>s.id===n); assert.ok(source,`unknown citation ${n}`);
    assert.ok(section[1].includes(`href="#ingredient-source-${n}"`));
    assert.ok(page.includes(`href="${source.url.replaceAll('&','&amp;')}"`));
   }
  }
 }
});

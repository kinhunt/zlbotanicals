import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=p=>readFileSync(`dist${p}/index.html`,'utf8');
const names={ 'green-tea':['Green Tea Extract','绿茶提取物'],turmeric:['Turmeric Extract','姜黄提取物'],'reishi-mushroom':['Reishi Mushroom Extract','灵芝提取物'],ginseng:['Ginseng Extract','人参提取物'],'ginkgo-biloba':['Ginkgo Biloba Extract','银杏叶提取物'],'grape-seed':['Grape Seed Extract','葡萄籽提取物'],'goji-berry':['Goji Berry Extract','枸杞提取物'],'licorice-root':['Licorice Root Extract','甘草提取物'],'centella-asiatica':['Centella Asiatica Extract','积雪草提取物'],'monk-fruit':['Monk Fruit Extract','罗汉果提取物'],stevia:['Stevia Extract','甜菊提取物'],resveratrol:['Resveratrol','白藜芦醇']};
test('directory lists twelve plain extract names separately from constituent families; all science routes are canonical',()=>{
 const metadata=JSON.parse(readFileSync('src/data/ingredient-knowledge.json'));
 const profiles=JSON.parse(readFileSync('src/data/science-profiles.json'));
 assert.equal(profiles.length,12);
 assert.deepEqual(profiles.map(p=>p.id).sort(),Object.keys(names).sort());
 for(const [i,prefix] of ['', '/zh'].entries()){
  const index=read(`${prefix}/plant-extracts/ingredients`);
  const directory=index.match(/<section[^>]*id="extract-directory"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(directory,'dedicated extract directory');
  assert.equal((directory.match(/data-extract-id=/g)||[]).length,12);
  assert.ok(index.indexOf('id="constituent-families"')>index.indexOf('id="extract-directory"'));
  for(const [id,titles] of Object.entries(names)){
   const path=`${prefix}/plant-extracts/ingredients/${id}`;
   assert.ok(existsSync(`dist${path}/index.html`),path);
   assert.equal(metadata.find(k=>k.productId===id).canonicalPath,`/plant-extracts/ingredients/${id}`);
   assert.ok(directory.includes(`href="${path}"`)); assert.ok(directory.includes(titles[i]));
   const page=read(path);
   assert.match(page,new RegExp(`<h1[^>]*>${titles[i]}</h1>`));
   const seoTitle=id==='turmeric'?(i?'姜黄提取物：形态、工艺与质量':'Turmeric extract: forms, processing and quality'):titles[i];
   assert.ok(page.includes(`<title>${seoTitle} | ${i?'振隆药业':'ZL Botanicals'}</title>`));
   assert.ok(page.includes(`rel="canonical" href="https://zlbotanicals.com${path}"`));
   for(const lang of ['en','zh']) assert.ok(page.includes(`hreflang="${lang==='zh'?'zh-CN':lang}" href="https://zlbotanicals.com${lang==='zh'?'/zh':''}/plant-extracts/ingredients/${id}"`));
   assert.ok(page.includes(`href="${prefix}/plant-extracts/ingredients"`));
  }
 }
});

test('encyclopedias identify materials before contents, retain eight readable sections, and products retain concise legacy anchors',()=>{
 for(const prefix of ['', '/zh']) for(const id of Object.keys(names)){
  const science=`${prefix}/plant-extracts/ingredients/${id}`;
  const page=read(science), product=read(`${prefix}/products/${id}`);
  assert.ok(page.indexOf('id="identity"')<page.indexOf('data-encyclopedia-toc'),'identity before contents');
  const toc=page.match(/<nav[^>]*data-encyclopedia-toc[^>]*>([\s\S]*?)<\/nav>/)?.[1]; assert.ok(toc);
  for(const anchor of ['raw-material','components','applications','end-products','processes','equipment','standards','insights']){
   assert.ok(page.includes(`id="${anchor}"`),`${id}/${anchor}`);
   if(id!=='turmeric'||!['raw-material','end-products','equipment'].includes(anchor)) assert.ok(toc.includes(`href="#${anchor}"`));
  }
  assert.ok(!product.includes('data-deep-research'),'commercial pages must not duplicate research');
  for(const anchor of ['processes','equipment','applications','standards','insights']){
   const section=product.match(new RegExp(`<section[^>]*id="${anchor}"[^>]*>([\\s\\S]*?)</section>`))?.[1];
   assert.ok(section,`legacy commercial anchor ${id}/${anchor}`);
   // Chinese summaries carry equivalent meaning with fewer characters.
   assert.ok(section.replace(/<[^>]*>/g,'').length>(prefix?45:100));
   assert.ok(section.includes(`href="${science}#${anchor}"`));
  }
 }
});

test('visible section order follows the identity-first encyclopedia contents',()=>{
 const standard=['identity','raw-material','components','applications','end-products','processes','equipment','standards','insights'];
 for(const prefix of ['', '/zh']) for(const id of Object.keys(names)){
  const page=read(`${prefix}/plant-extracts/ingredients/${id}`);
  const expected=id==='turmeric'?['identity','raw-material','effects','components','applications','end-products','processes','equipment','standards','faq','insights']:standard;
  for(let n=1;n<expected.length;n++) assert.ok(page.indexOf(`id="${expected[n-1]}"`)<page.indexOf(`id="${expected[n]}"`),`${id}: ${expected[n-1]} precedes ${expected[n]}`);
 }
});

test('all sourced overview fields render with valid citations and no cross-ingredient identity substitutions',()=>{
 const overviews=JSON.parse(readFileSync('src/data/ingredient-overviews.json'));
 const deep=JSON.parse(readFileSync('src/data/deep-ingredients.json'));
 assert.deepEqual(overviews.map(o=>o.productId).sort(),Object.keys(names).sort());
 for(const o of overviews){
  const source=deep.find(d=>d.productId===o.productId);
  for(const n of o.citations) assert.ok(source.sources.some(s=>s.id===n));
  for(const [lang,prefix] of [['en',''],['zh','/zh']]){
   const page=read(`${prefix}/plant-extracts/ingredients/${o.productId}`);
   for(const key of (o.productId==='turmeric'?['identity','components']:['identity','components','applications','endProducts','processChoices'])) assert.ok(page.includes(o[key][lang].replaceAll('&','&amp;').replaceAll("'",'&#39;')),`${o.productId}/${lang}/${key}`);
   for(const n of o.citations) assert.ok(page.includes(`href="#research-${source.group}-${o.productId}-source-${n}"`));
  }
 }
});

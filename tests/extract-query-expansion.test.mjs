import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=(path)=>readFileSync(new URL(`../dist/${path}/index.html`,import.meta.url),'utf8');
for(const lang of ['en','zh']) {
 const prefix=lang==='zh'?'zh/':'';
 test(`${lang}: green tea supplier intent stays on the existing bulk procurement page`,()=>{
  const page=html(`${prefix}products/green-tea`);
  assert.match(page,lang==='en'?/<h1[^>]*>Green Tea Extract Supplier for Bulk Orders<\/h1>/:/<h1[^>]*>绿茶提取物批量供应<\/h1>/);
  assert.match(page,lang==='en'?/Bulk green tea extract powder and soluble tea ingredients/:/绿茶提取粉与可溶茶原料/);
  assert.match(page,lang==='en'?/wholesale green tea extract/:/品牌商及配方制造企业/);
  for(const anchor of ['components','formulation-citrus-tea','formulation-instant-tea','formulation-oat-latte']) assert.ok(page.includes(`/plant-extracts/ingredients/green-tea#${anchor}`));
  assert.match(page,lang==='en'?/Low-caffeine project/:/低咖啡因项目/);
  assert.doesNotMatch(page,/(?:50% EGCG|98% polyphenols|caffeine-free)/i);
 });
}

for(const lang of ['en','zh']) {
 const prefix=lang==='zh'?'zh/':'';
 test(`${lang}: goji distinguishes juice powder and polysaccharide material`,()=>{
  const science=html(`${prefix}plant-extracts/ingredients/goji-berry`);
  assert.match(science,lang==='en'?/Goji berry extract, juice powder and polysaccharides: what differs\?/:/枸杞提取物、果汁粉与多糖组分有什么区别/);
  assert.match(science,lang==='en'?/A total-sugar result does not identify a polysaccharide fraction/:/总糖检测不能代替多糖组分鉴定/);
  assert.ok(science.includes(`/${prefix}products/goji-berry#material-selection`));
  const sales=html(`${prefix}products/goji-berry`);
  for(const anchor of ['components','formulation-instant-drink','formulation-fruit-gummy','formulation-polysaccharide-capsule']) assert.ok(sales.includes(`/${prefix}plant-extracts/ingredients/goji-berry#${anchor}`));
 });
}

for(const lang of ['en','zh']) {
 const prefix=lang==='zh'?'zh/':'';
 test(`${lang}: stevia leaf identity and US conventional-food scope`,()=>{
  const page=html(`${prefix}plant-extracts/ingredients/stevia`);
  assert.match(page,lang==='en'?/What is Stevia rebaudiana leaf extract\?/:/甜叶菊叶提取物是什么/);
  assert.match(page,lang==='en'?/name alone does not state how far the material has been refined/:/名称本身不能说明精制程度/);
  assert.match(page,/href="https:\/\/www.accessdata.fda.gov\/cms_ia\/importalert_119.html"/);
  assert.match(page,lang==='en'?/not approved food additives and are not considered GRAS for conventional-food use/:/并非获批食品添加剂/);
  assert.match(page,lang==='en'?/FDA Import Alert 45-06: US conventional-food use/:/FDA进口警示45-06：美国普通食品用途/);
 });
}

for(const lang of ['en','zh']) {
 const prefix=lang==='zh'?'zh/':'';
 test(`${lang}: liquorice variants share a material-specific encyclopedia`,()=>{
  const page=html(`${prefix}plant-extracts/ingredients/licorice-root`);
  assert.match(page,lang==='en'?/Licorice and liquorice extracts: names and material types/:/甘草提取物的英文名称与原料类型/);
  assert.match(page,lang==='en'?/American and British spellings/:/美式和英式拼写/);
  for(const text of ['DGL','glabridin','G. glabra']) assert.ok(page.includes(text));
  assert.ok(page.includes(`/${prefix}products/licorice-root#material-selection`));
 });
}

for(const lang of ['en','zh']) {
 const prefix=lang==='zh'?'zh/':'';
 test(`${lang}: Centella extraction explains yield versus marker recovery`,()=>{
  const page=html(`${prefix}plant-extracts/ingredients/centella-asiatica`);
  assert.match(page,lang==='en'?/Extraction of Centella asiatica: solvent choice and triterpenoid profile/:/积雪草提取工艺：溶剂选择与三萜组成/);
  assert.match(page,lang==='en'?/higher crude-extract yield does not by itself mean a higher recovery of every marker/:/粗提率升高不代表每一种标志物的回收率都提高/);
  assert.ok(page.includes(`/${prefix}products/centella-asiatica#material-selection`));
  assert.doesNotMatch(page,/>extract centella asiatica</);
 });
}

for(const lang of ['en','zh']) {
 const prefix=lang==='zh'?'zh/':'';
 test(`${lang}: reishi market section uses existing sample, not a new revenue estimate`,()=>{
  const page=html(`${prefix}research/market/functional-mushrooms`);
  assert.equal((page.match(/id="reishi-extract-market"/g)||[]).length,1);
  assert.match(page,/<h2 id="reishi-extract-market">/);
  assert.ok(page.includes('href="#reishi-extract-market"'));
  for(const anchor of ['materials','dose','method','market-v4-ref-9','market-v4-ref-12']) assert.ok(page.includes(`id="${anchor}"`));
  assert.ok(page.includes(`/${prefix}products/reishi-mushroom#material-selection`));
  assert.ok(page.includes(`/${prefix}plant-extracts/ingredients/reishi-mushroom#components`));
  assert.match(page,lang==='en'?/18 product detail records across 15 brands/:/18/);
  for(const route of ['products/reishi-mushroom','plant-extracts/ingredients/reishi-mushroom','resources/blog/functional-mushroom-market-2026']) assert.ok(html(prefix+route).includes(`/${prefix}research/market/functional-mushrooms#reishi-extract-market`));
 });
}

// Contract preservation against the synchronized production base, not just page text.
import {execFileSync} from 'node:child_process';
const base='35383b7de1fdd6b5372fdf34a41e5294ec29d0ed';
const baseline=file=>execFileSync('git',['show',`${base}:${file}`],{maxBuffer:30*1024*1024});
test('bounded editorial edits retain every plan, source, research case, patent and original public asset',()=>{
 const file='src/data/ingredient-reader-packs.json';
 const before=JSON.parse(baseline(file)),after=JSON.parse(readFileSync(file));
 const allowed={'goji-berry':['components'],stevia:['identity'],'licorice-root':['identity','components'],'centella-asiatica':['components','processes']};
 for(const old of before){
  const next=after.find(p=>p.productId===old.productId);
  assert.deepEqual(next.plans,old.plans);
  // I04 adds two reviewed stevia references; all existing entries stay exact.
  assert.deepEqual(next.sources.slice(0,old.sources.length),old.sources);
  assert.equal(next.sources.length,old.sources.length+(old.productId==='stevia'?2:0));
  for(const lang of ['en','zh'])for(const s of old.content[lang]){
   const now=next.content[lang].find(x=>x.id===s.id);
   if(!(allowed[old.productId]||[]).includes(s.id)) assert.deepEqual(now,s,`${old.productId}/${lang}/${s.id}`);
   else if(s.id==='processes') assert.deepEqual(now.blocks.slice(1),s.blocks);
   else if(old.productId!=='goji-berry'&&s.id==='components') assert.deepEqual(now.blocks,s.blocks);
  }
 }
 for(const file of execFileSync('git',['ls-tree','-r','--name-only',base,'public'],{encoding:'utf8'}).trim().split('\n')) assert.deepEqual(readFileSync(file),baseline(file),file);
});
test('both market articles retain all production anchors, exhibits, bibliography and Chinese infographic',()=>{
 for(const lang of ['en','zh']){
  const file=`src/articles/functional-mushrooms.${lang}.md`;
  const old=baseline(file).toString(),now=readFileSync(file,'utf8');
  for(const [,id] of old.matchAll(/id="([^"]+)"/g)) assert.equal((now.match(new RegExp(`id="${id}"`,'g'))||[]).length,1,id);
  for(const exhibit of old.match(/<!-- exhibit:[a-z-]+ -->/g)) assert.ok(now.includes(exhibit));
  const bibliography=old.slice(old.indexOf('<h2 id="sources"'));
  assert.ok(bibliography.length>100);assert.ok(now.includes(bibliography));
  if(lang==='zh')assert.ok(now.includes('/images/research/mushroom-comparison-zh.webp'));
 }
});

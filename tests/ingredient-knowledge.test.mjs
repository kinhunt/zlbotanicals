import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const dossiers=JSON.parse(readFileSync('src/data/product-dossiers.json'));
const science=new Set(dossiers.map(d=>d.slug));
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
const deep=JSON.parse(readFileSync('src/data/deep-ingredients.json'));
test('every dimension renders its actual longform data rather than obsolete shallow paragraphs',()=>{
 const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll("'",'&#39;').replaceAll('"','&quot;');
 for(const k of knowledge) for(const lang of ['en','zh']){
  const data=deep.find(d=>d.productId===k.productId);
  const page=html(`${lang==='zh'?'/zh':''}${k.canonicalPath}`);
  const rollout=JSON.parse(readFileSync('src/data/ingredient-reader-packs.json')).find(p=>p.productId===k.productId);
  if(rollout){
   // The approved replacement is the rendering contract; retained legacy data remains
   // separately tested, rather than forcing the duplicate old article onto the page.
   const all=[...rollout.content[lang].flatMap(s=>s.blocks),...rollout.plans.flatMap(p=>p.content[lang])];
   for(const b of all){
    const texts=b.type==='table'?[...b.headers,...b.rows.flat()]:b.type==='list'?b.items:[b.text];
    for(const text of texts) for(const part of text.split(/(\[\d+\])/g)) if(part&&!/^\[\d+\]$/.test(part)) assert.ok(page.includes(escape(part)),`${k.productId}: replacement text missing`);
   }
   continue;
  }
  for(const s of data.content[lang]){
   const section=page.match(new RegExp(`<section[^>]*id="${s.id}"[^>]*>([\\s\\S]*?)</section>`));
   assert.ok(section);
   // The curated turmeric presentation merges applications/equipment and separates FAQ.
   const blocks=k.productId==='turmeric'?(s.id==='applications'?s.blocks.slice(0,2):s.id==='equipment'?s.blocks.slice(-1):s.id==='insights'?s.blocks.slice(6):s.blocks):s.blocks;
   for(const b of blocks){
    const texts=b.type==='table'?[...b.headers,...b.rows.flat()]:b.type==='list'?b.items:[b.text];
    for(const text of texts) for(const part of text.split(/(\[\d+\]|\*\*[^*]+\*\*)/g)){
     if(!part) continue;
     if(/^\[\d+\]$/.test(part)) assert.ok(section[1].includes(`href="#research-${data.group}-${k.productId}-source-${part.slice(1,-1)}"`));
     else assert.ok(section[1].includes(escape(part.replace(/^\*\*|\*\*$/g,''))),`${k.productId}/${s.id}: missing text`);
    }
   }
  }
  for(const source of data.sources) assert.ok(page.includes(`href="${source.url}"`) || page.includes(`href="${escape(source.url)}"`));
 }
});

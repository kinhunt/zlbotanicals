import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const packs=JSON.parse(readFileSync('src/data/ingredient-reader-packs.json'));
const old=JSON.parse(readFileSync('src/data/deep-ingredients.json'));
const text=id=>JSON.stringify(packs.find(p=>p.productId===id));
test('independent review blockers are corrected in the actual bilingual article',()=>{
 assert.match(text('monk-fruit'),/17.38 ± 0.44 g of product/);assert.match(text('monk-fruit'),/17.38 ± 0.44 g产品/);
 assert.match(text('centella-asiatica'),/about 40–80%/);assert.match(text('centella-asiatica'),/约40–80%/);
 assert.match(text('reishi-mushroom'),/P=0.1590/);assert.match(text('reishi-mushroom'),/P=0.0002/);
 assert.doesNotMatch(text('ginkgo-biloba'),/Beng-Poon Teng; original-assignee|this recovery|本次恢复/);
 assert.match(text('ginkgo-biloba'),/efavirenz/);assert.match(text('ginkgo-biloba'),/依非韦伦/);
 assert.match(text('stevia'),/randomized 31 healthy adults/);assert.match(text('stevia'),/31名健康成年人/);
 assert.match(text('resveratrol'),/synthesized, encapsulated trans-resveratrol/);
 assert.match(text('licorice-root'),/lack licorice’s characteristic flavor/);
 assert.match(text('licorice-root'),/a minimum of 4-90%/);
 assert.match(text('goji-berry'),/20\/40 kHz/);assert.match(text('goji-berry'),/5 seconds on\/2 seconds off/);
 assert.doesNotMatch(text('goji-berry'),/frequency\/pulse settings unavailable|完整频率\/脉冲设置未取得|not automatically the traditional 28 kHz/);
});
test('all rollout and legacy source IDs resolve to the ingredient-local HTTPS record',()=>{
 for(const p of packs) for(const lang of ['en','zh']){
  const h=readFileSync(`dist/${lang==='zh'?'zh/':''}plant-extracts/ingredients/${p.productId}/index.html`,'utf8');
  const k=old.find(x=>x.productId===p.productId);
  for(const [sources,namespace] of [[p.sources,`research-${p.productId}-rollout-source`],[k.sources,`research-${k.group}-${p.productId}-source`]]){
   for(const s of sources){
    assert.ok(s.url.startsWith('https://'));
    const item=h.match(new RegExp(`<li[^>]*id="${namespace}-${s.id}"[^>]*>([\\s\\S]*?)</li>`));assert.ok(item,`${namespace}/${s.id}`);
    assert.ok(item[1].includes(`href="${s.url.replaceAll('&','&amp;')}"`)||item[1].includes(`href="${s.url}"`),`${namespace}/${s.id}: URL mismatch`);
   }
  }
  for(const s of k.content[lang]) for(const [i,b] of s.blocks.entries()) if(b.type==='heading') assert.ok(h.includes(`id="research-${p.productId}-${s.id}-${i}"`));
  assert.equal((h.match(/data-formulation-plan=/g)||[]).length,3);
  assert.doesNotMatch(h,/Logged in as|\bDraw ingredient|No image generated/);
 }
});
test('retained assets and scientific renderer remain identical apart from procurement links and forms alias',()=>{
 const files=execFileSync('git',['ls-tree','-r','--name-only','7d0286c','public','src/components/TurmericKnowledge.astro','src/data/turmeric-formulations.ts','src/data/deep-ingredients.json','src/data/ingredient-overviews.json']).toString().trim().split('\n');
 assert.ok(files.filter(f=>/^public\/images\/products\/.*\.webp$/.test(f)).length===12);
 assert.ok(files.some(f=>/\.mp4$/.test(f)));
 for(const file of files){
  const baseline=execFileSync('git',['show',`7d0286c:${file}`],{maxBuffer:30*1024*1024});
  if(file==='src/components/TurmericKnowledge.astro'){
   const normalize=s=>s.replace(/<span id="forms" class="legacy-anchor"\/>/g,'').replace(/\{s.id==='standards'&&<p data-procurement-link>[\s\S]*?<\/p>\}/g,'').replace(/<p data-procurement-link>[\s\S]*?<\/p>/g,'').replace(/\s+/g,' ').replace(/> </g,'><').trim();
   assert.equal(normalize(readFileSync(file,'utf8')),normalize(baseline.toString()),file);
  }else assert.deepEqual(readFileSync(file),baseline,file);
 }
});

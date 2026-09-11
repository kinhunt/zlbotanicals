import {buildReviewedReaderSections} from '../src/data/ingredient-reader.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

test('eleven rollout packs replace the legacy article in both languages',()=>{
 assert.ok(existsSync('src/data/ingredient-reader-packs.json'),'reviewed rollout data is missing');
 const packs=JSON.parse(readFileSync('src/data/ingredient-reader-packs.json'));
 for(const p of packs) for(const lang of ['en','zh']) assert.deepEqual(buildReviewedReaderSections(p,lang),p.content[lang]);
 assert.throws(()=>buildReviewedReaderSections({...packs[0],approval:'pending'},'en'),/Unapproved/);
 assert.equal(packs.length,11);
 assert.equal(new Set(packs.map(p=>p.productId)).size,11);
 assert.ok(!packs.some(p=>p.productId==='turmeric'));
 for(const p of packs) for(const lang of ['en','zh']){
  const h=readFileSync(`dist/${lang==='zh'?'zh/':''}plant-extracts/ingredients/${p.productId}/index.html`,'utf8');
  assert.ok(h.includes('data-rollout-article'),`${p.productId}/${lang}`);
  assert.equal(p.plans.length,3);
  for(const id of ['identity','effects','components','applications','formulations','processes','standards','faq','insights','patents']) assert.ok(p.content[lang].some(s=>s.id===id),`${p.productId}/${lang}/${id}`);
  assert.ok(h.indexOf('id="patents"')<h.indexOf(`id="research-${p.productId}-references"`));
 }
});

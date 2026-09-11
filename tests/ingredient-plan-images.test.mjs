import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const packs=JSON.parse(readFileSync('src/data/ingredient-reader-packs.json'));
test('all 33 plans have exact local paths and bilingual image metadata',()=>{
 const paths=new Set();
 for(const p of packs) for(const plan of p.plans){
  assert.ok(plan.image,`${p.productId}/${plan.id} missing image`);
  const i=plan.image;
  assert.equal(i.src,`/images/ingredient-plans/${p.productId}/${plan.id}.webp`);
  assert.ok(existsSync(`public${i.src}`)); paths.add(i.src);
  assert.ok(i.width>0&&i.height>0);
  for(const lang of ['en','zh']){assert.ok(i.alt[lang]);assert.ok(i.caption[lang]);assert.doesNotMatch(i.caption[lang],/AI|generated|人工智能|生成/);}
 }
 assert.equal(paths.size,33);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const packs=JSON.parse(readFileSync('src/data/deep-ingredients.json','utf8'));
test('legacy reader adapter groups processing without losing blocks or anchor indexes',async()=>{
 const {buildReaderSections}=await import('../src/data/ingredient-reader.mjs');
 for(const k of packs) for(const lang of ['en','zh']) {
  const source=k.content[lang],result=buildReaderSections(source);
  assert.deepEqual(result.map(s=>s.id),['applications','processes','standards','insights']);
  assert.equal(result[1].children[0].id,'equipment');
  const restored=result.flatMap(s=>[s,...s.children]);
  for(const original of source) assert.deepEqual(restored.find(s=>s.id===original.id).blocks,original.blocks);
  assert.deepEqual(source,k.content[lang]);
 }
 assert.throws(()=>buildReaderSections([]),/Missing/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const base='docs/evidence/ingredient-rollout/claim-excerpts/';
test('named claim excerpts are exact substrings of retained primary source bodies',()=>{
 const {records}=JSON.parse(readFileSync(base+'ledger.json'));
 assert.ok(records.length>=20);
 const packs=JSON.parse(readFileSync('src/data/ingredient-reader-packs.json'));
 for(const e of records){
  const bytes=readFileSync(base+e.sourceFile);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),e.sourceSHA256);
  assert.ok(bytes.toString().includes(e.quote),e.claim);assert.ok(e.quote.length>30);
  assert.ok(e.ingredient.length,e.claim);
  for(const id of e.ingredient)assert.ok(packs.find(p=>p.productId===id).sources.some(s=>s.id===e.sourceId&&s.url===e.url),`${id}/${e.sourceId}`);
 }
 for(const [id,n,word] of [['green-tea',25,'800 mg'],['green-tea',10,'70 degrees'],['centella-asiatica',19,'8.21'],['centella-asiatica',11,'95 wt'],['monk-fruit',22,'65'],['monk-fruit',26,'England and Wales']])assert.ok(records.some(e=>e.ingredient.includes(id)&&e.sourceId===n&&e.quote.includes(word)),`${id}/${n}`);
});

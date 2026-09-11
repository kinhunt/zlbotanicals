import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=lang=>readFileSync(`dist${lang==='zh'?'/zh':''}/plant-extracts/ingredients/turmeric/index.html`,'utf8');
test('turmeric offers linked formulation and patent sections with concise image captions',()=>{
 for(const lang of ['en','zh']){
  const h=read(lang);
  for(const id of ['formulations','patents']) {assert.ok(h.includes(`id="${id}"`),id);assert.ok(h.includes(`href="#${id}"`),id);}
  assert.doesNotMatch(h,/不是上市产品、客户案例或已验证配方|not marketed products, customer cases or validated formulas/);
  const captions=[...h.matchAll(/<figcaption[^>]*>(.*?)<\/figcaption>/gs)].map(m=>m[1].replace(/<[^>]+>/g,''));
  for(const c of captions.filter(c=>/AI/.test(c))) assert.ok(c.length<150,c);
 }
});

test('four concrete combinations and four distinct patent families render with claim scope and citations',()=>{
 for(const lang of ['en','zh']){
  const h=read(lang);
  assert.equal((h.match(/data-formulation-concept=/g)||[]).length,4);
  assert.equal((h.match(/data-patent-family=/g)||[]).length,4);
  for(const id of ['WO2007101551A2','US10245238B2','WO2012156979A1','WO2007143635A1']) assert.ok(h.includes(`href="https://patents.google.com/patent/${id}/en"`),id);
  for(const word of ['HPMC','HPC','MCT','Indena','Theravalues','OmniActive','2006-03-09','2014-05-15','2011-05-16','2019-04-02']) assert.ok(h.includes(word),word);
  assert.ok(h.includes('data-formulation-roles'));
  const ids=[...h.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
  for(const m of h.matchAll(/href="#(research-turmeric-formulation-source-\d+)"/g)) assert.ok(ids.includes(m[1]));
  for(const block of h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) assert.doesNotThrow(()=>JSON.parse(block[1]));
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const read=lang=>readFileSync(`dist${lang==='zh'?'/zh':''}/plant-extracts/ingredients/turmeric/index.html`,'utf8');
test('application-first turmeric retains evidence conditions, scoped namespaces and five product choices',()=>{
 for(const lang of ['en','zh']){
  const h=read(lang);
  assert.equal((h.match(/data-study-box/g)||[]).length,2);
  assert.ok(h.includes('data-clinical-evidence'));
  const matrix=h.split('data-application-matrix')[1].split('</table>')[0];
  assert.equal((matrix.match(/scope="row"/g)||[]).length,5);
  for(const n of [1,2]) assert.ok(h.includes(`id="research-turmeric-clinical-source-${n}"`));
  for(const term of ['Turmacin Plus','500 mg','−9.1 mm','−17.8','Natural Remedies','WOMAC','MRI','2022']) assert.ok(h.includes(term),term);
  for(const asset of ['material-forms','applications']) assert.ok(h.includes(`/images/ingredients/turmeric-${asset}-concept.webp`));
  assert.ok(h.includes(lang==='en'?'Increased exposure does not automatically mean better health outcomes':'提高暴露量不自动意味着更好的健康结果'));
  const source=readFileSync('src/components/TurmericKnowledge.astro','utf8');
  assert.match(source,/<section id="equipment"/);
 }
});
test('shared ingredient data and all twelve original WebPs stay byte-identical to approved PR16',()=>{
 for(const file of ['src/data/deep-ingredients.json','src/data/ingredient-overviews.json',...execFileSync('git',['ls-tree','-r','--name-only','3ec9103','public/images/products'],{encoding:'utf8'}).trim().split('\n').filter(f=>/^public\/images\/products\/[^/]+\.webp$/.test(f))]){
  assert.deepEqual(readFileSync(file),execFileSync('git',['show',`3ec9103:${file}`]),file);
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const data=JSON.parse(readFileSync('src/data/deep-ingredients.json')).find(x=>x.productId==='turmeric');
const overview=JSON.parse(readFileSync('src/data/ingredient-overviews.json')).find(x=>x.productId==='turmeric');
const read=lang=>readFileSync(`dist${lang==='zh'?'/zh':''}/plant-extracts/ingredients/turmeric/index.html`,'utf8');
test('turmeric has one definition, process-before-use order, retained anchors and scoped cases',()=>{
 for(const lang of ['en','zh']){
  const html=read(lang), text=html.replace(/<[^>]+>/g,' ');
  assert.equal(text.split(overview.identity[lang]).length-1,1,'definition appears once');
  const order=['identity','components','processes','equipment','applications','standards','insights'];
  for(let i=1;i<order.length;i++) assert.ok(html.indexOf(`id="${order[i-1]}"`)<html.indexOf(`id="${order[i]}"`),'reader order');
  for(const id of ['raw-material','end-products','process','application','specification','evidence','research','research-caveats','pmid-39614566','industry-updates']) assert.ok(html.includes(`id="${id}"`),id);
  assert.doesNotMatch(text,/Microsoft Word|JECFA Specifications Template/);
  const cases=html.slice(html.indexOf('id="insights"'));
  for(const term of ['100±0.5 mg','5 mL','32.22','34.26','0.15 wt%','0.02 wt%','15000 psi','89.08','73.43','67.68','Turbiscan']) assert.ok(cases.includes(term),term);
  assert.match(cases,lang==='en'?/day 1[\s\S]*1000-fold[\s\S]*28 days[\s\S]*Turbiscan[\s\S]*3 days/:/第1天[\s\S]*1000倍[\s\S]*28天[\s\S]*Turbiscan[\s\S]*3天/);
  assert.ok(!html.slice(0,html.indexOf('id="insights"')).includes('89.08'),'case numbers outside foundational sections');
 }
});
test('turmeric references show original IDs and retain the original product artwork',()=>{
 for(const lang of ['en','zh']){
  const html=read(lang);
  for(const n of [4,7,10,11,13]){
   assert.match(html,new RegExp(`id="research-b-turmeric-source-${n}" value="${n}"[^>]*><span[^>]*>\\[${n}\\]</span>`));
   assert.ok(html.includes(`href="#research-b-turmeric-source-${n}"`));
  }
 }
 assert.equal(createHash('sha256').update(readFileSync('public/images/products/turmeric.webp')).digest('hex'),'d53818db71fabf986440c5b75d16ec8bc42a5d45742da20275c8ee285592b1e9');
});
const bad=/漂亮水杯样|两条生产线|分成两个项目|分账|第四步才|交付|矩阵|真正成本|这条材料边界应|堆砌|Only after this|visual brief|carrier burden|shared deliverable|R&D should|delivery-system train|define success/i;
test('turmeric has reader-facing bilingual prose and a definition of the processed ingredient',()=>{
 for(const lang of ['en','zh']){
  assert.doesNotMatch(JSON.stringify(data.content[lang]),bad);
  assert.match(overview.identity[lang],lang==='en'?/Turmeric extract is.*rhizomes/i:/姜黄提取物是.*根茎/);
  assert.match(overview.components[lang],lang==='en'?/single compound/i:/单体/);
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(`dist${p}/index.html`,'utf8');
test('turmeric procurement has actionable sections, bounded science journeys and no dossier/news duplication',()=>{
 for(const prefix of ['', '/zh']){
  const html=read(`${prefix}/products/turmeric`), science=read(`${prefix}/plant-extracts/ingredients/turmeric`);
  for(const id of ['material-selection','specifications','cost-comparison','samples','qualification','supply-terms','quote']) assert.equal((html.match(new RegExp(`id="${id}"`,'g'))||[]).length,1,id);
  for(const id of ['forms','formulations','processes','standards']){
   assert.ok(html.includes(`href="${prefix}/plant-extracts/ingredients/turmeric#${id}"`),id);
   assert.ok(science.includes(`id="${id}"`),id);
  }
  for(const id of ['material-selection','samples','quote']) assert.ok(science.includes(`href="${prefix}/products/turmeric#${id}"`),id);
  for(const marker of ['data-research-card','data-news-card','data-commercial-knowledge-summary']) assert.ok(!html.includes(marker),marker);
 }
});
test('turmeric commercial intent is distinct from science and category',()=>{
 for(const [prefix,name] of [['','Turmeric Extract Procurement'],['/zh','姜黄提取物采购']]){
  const route=`${prefix}/products/turmeric`, html=read(route);
  assert.match(html,new RegExp(`<h1[^>]*>\\s*${name}\\s*</h1>`));
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.ok(html.includes(`<title>${name}`));
  for(const tag of ['og:title','twitter:title']) assert.match(html,new RegExp(`(?:property|name)="${tag}" content="${name}`));
  assert.ok(html.includes(`rel="canonical" href="https://zlbotanicals.com${route}"`));
  assert.match(read(`${prefix}/plant-extracts/ingredients/turmeric`),new RegExp(`<h1[^>]*>\\s*${name.replace(/ Procurement|采购/,'')}\\s*</h1>`));
  assert.match(read(`${prefix}/products/botanical-extracts`),new RegExp(`<h1[^>]*>\\s*${prefix?'植物提取物':'Botanical Extracts'}\\s*</h1>`));
 }
});

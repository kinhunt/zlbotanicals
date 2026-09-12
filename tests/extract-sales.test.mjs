import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const ids=['green-tea','centella-asiatica','monk-fruit','ginseng','reishi-mushroom','ginkgo-biloba','grape-seed','goji-berry','licorice-root','stevia','resveratrol'];
test('all eleven commercial products render a localized sales offer without the old dossier',()=>{
 for(const id of ids) for(const lang of ['en','zh']){
  const html=readFileSync(`dist/${lang==='zh'?'zh/':''}products/${id}/index.html`,'utf8');
  assert.match(html,new RegExp(`data-extract-sales="${id}"`),`${lang}/${id}`);
  assert.match(html,lang==='zh'?/<h1[^>]*>[^<]+采购<\/h1>/:/<h1[^>]*>[^<]+ Procurement<\/h1>/);
  for(const anchor of ['material-selection','specifications','qualification','samples','supply-terms','why-choose-us','procurement-faq','processes','equipment','applications','standards','insights']) assert.ok(html.includes(`id="${anchor}"`),`${id}#${anchor}`);
  assert.ok(html.includes(`/plant-extracts/ingredients/${id}#`));
  assert.ok(html.includes(`/images/products/${id}.webp`));
  assert.ok(html.includes(`/images/ingredient-plans/landscape/${id}/`));
  assert.ok(!html.includes('data-product-dossier'));
 }
});
test('each science standards section links to its own commercial qualification section',()=>{
 for(const id of ids)for(const lang of ['en','zh']){
  const prefix=lang==='zh'?'zh/':'';
  const html=readFileSync(`dist/${prefix}plant-extracts/ingredients/${id}/index.html`,'utf8');
  assert.ok(html.includes(`href="/${prefix}products/${id}#qualification"`),`${lang}/${id} contextual procurement link`);
 }
});

test('sales specifications stay ingredient-specific and preserve localized legacy headings',()=>{
 const markers={'green-tea':'EGCG','centella-asiatica':'Asiaticoside','monk-fruit':'Mogroside V',ginseng:'ginsenosides','reishi-mushroom':'Beta-glucans','ginkgo-biloba':'ginkgolic','grape-seed':'OPC','goji-berry':'free-sugar','licorice-root':'DGL',stevia:'Reb A',resveratrol:'Trans-resveratrol'};
 for(const id of ids)for(const lang of ['en','zh']){
  const html=readFileSync(`dist/${lang==='zh'?'zh/':''}products/${id}/index.html`,'utf8');
  const main=html.split('<main')[1].split('</main>')[0];
  assert.doesNotMatch(main.replace(/<[^>]*>/g,''),/95%|FDA approved|every batch tested|free samples|guaranteed delivery/i);
  if(lang==='en') assert.ok(main.toLowerCase().includes(markers[id].toLowerCase()),`${id} marker`);
  const anchors=lang==='en'?['material-identity-and-selection','indicative-specification-brief','application-development-checks','documents-to-request-before-approval','send-a-useful-sourcing-brief']:['原料身份与选型','参考规格与询价要点','应用开发检查','批准样品前应索取的文件','如何提交采购需求'];
  for(const a of anchors)assert.ok(main.includes(`id="${a}"`),`${lang}/${id}#${a}`);
 }
});

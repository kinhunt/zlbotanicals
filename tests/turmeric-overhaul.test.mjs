import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(`dist${p}/index.html`,'utf8');
test('full turmeric procurement presents an offer, target grades, qualification matrix and application cards',()=>{
 for(const prefix of ['', '/zh']){
  const html=read(`${prefix}/products/turmeric`);
  assert.match(html,/data-procurement-hero/,'dedicated product offer hero');
  assert.match(html,/data-procurement-facts/,'visible purchasing facts');
  for(const word of ['95%','HPLC','GMP','ISO 9001','ISO 22000','ISO/IEC 17025','Halal','Kosher','COA','TDS','SDS','MOQ','Incoterms']) assert.ok(html.includes(word),word);
  const body=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<[^>]*>/g,' ');
  assert.match(body,prefix?/目标规格.*95%/:/target specification.*95%/i);
  assert.match(body,prefix?/实验室.*认可/:/laboratory.*accreditation/i);
  assert.doesNotMatch(body,/95\.8%|SVB-COA|25\s*kg|free samples|in stock|GMP.certified|ISO.certified|最低价|免费样品|现货供应|认证齐全/i);
  assert.equal((html.match(/data-procurement-application=/g)||[]).length,4);
  assert.ok(html.includes('id="procurement-faq"'));
  assert.equal((html.match(/<table\b/g)||[]).length,4);
  for(const id of ['material-selection','specifications','qualification','samples','supply-terms','why-choose-us','quote','procurement-faq']) assert.equal((html.match(new RegExp(`id="${id}"`,'g'))||[]).length,1,id);
  const hero=html.match(/<section[^>]*data-procurement-hero[\s\S]*?<\/section>/)?.[0];
  for(const action of ['quote','sample']) assert.ok(hero.includes(`data-procurement-action="${action}"`));
  assert.match(html,/<div[^>]*tabindex="0"[^>]*role="region"/);
 }
});

test('turmeric sells application formats and commercial service rather than a purchasing tutorial',()=>{
 for(const prefix of ['', '/zh']){
  const html=read(`${prefix}/products/turmeric`);
  const apps=html.match(/<section id="samples">([\s\S]*?)<section id="applications">/)?.[1];
  assert.ok(apps);
  assert.match(apps,prefix?/水分散形态.*植物饮/:/dispersible formats.*plant drinks/);
  assert.doesNotMatch(html,/Cost per kilogram of curcuminoids =|每公斤姜黄素类成本 =/);
  assert.match(html,prefix?/质量控制与认证资料/:/Quality control and certification documents/);
 }
});

test('owner-confirmed turmeric offer remains separate from batch results and has factual page schema',()=>{
 for(const prefix of ['', '/zh']){
  const html=read(`${prefix}/products/turmeric`);
  assert.match(html,prefix?/振隆供应姜黄提取物/:/ZL Botanicals supplies turmeric extract/);
  assert.match(html,prefix?/实际批次数据对应记录在 COA/:/actual batch values belong in the corresponding COA/);
  assert.match(html,/application\/ld\+json/);
  const data=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x=>JSON.parse(x[1]));
  assert.ok(data.some(x=>x['@type']==='WebPage' && x.url===`https://zlbotanicals.com${prefix}/products/turmeric`));
  assert.doesNotMatch(JSON.stringify(data),/AggregateRating|Review|priceCurrency|availability/);
 }
});

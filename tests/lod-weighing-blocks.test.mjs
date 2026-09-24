import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const data=JSON.parse(readFileSync('src/data/plant-extracts.json','utf8'));
const topic=data.topics.find(t=>t.slug==='moisture-vs-loss-on-drying');
assert.ok(topic,'topic moisture-vs-loss-on-drying must exist (select by slug)');

const EN_NEW=[
 'Three balance readings define an LOD result',
 'A worked example, and readings that do not compute'
];
const ZH_NEW=[
 '干燥失重结果来自三次称量',
 '演算示例与对不上的读数'
];

test('LOD topic keeps references and gains exactly the two reviewed blocks at index 2 in both languages',()=>{
 assert.deepEqual(topic.references,['who1998','kfOven','kfMoisture'],'references must stay untouched');
 for(const [lang,heads] of [['en',EN_NEW],['zh',ZH_NEW]]){
  const blocks=topic.translations[lang].blocks;
  assert.equal(blocks.length,8,lang+' block count 6 -> 8');
  assert.equal(blocks[2].heading,heads[0],lang+' new block 1 at index 2');
  assert.equal(blocks[3].heading,heads[1],lang+' new block 2 at index 3');
 }
 // pre-existing order preserved around the insert
 const en=topic.translations.en.blocks.map(b=>b.heading);
 assert.equal(en[0],'First ask what “moisture” means');
 assert.equal(en[1],'Loss on drying: retain the conditions');
 assert.equal(en[4],'Karl Fischer: water-specific does not mean interference-free');
 assert.equal(en[5],'An oven is sample preparation, not an automatic solution');
 assert.equal(en[6],'Compare like with like before accepting a lot');
 assert.equal(en[7],'Turn the distinction into a sourcing request');
 const zh=topic.translations.zh.blocks.map(b=>b.heading);
 assert.equal(zh[0],'先问“水分”究竟指什么');
 assert.equal(zh[1],'干燥失重必须保留条件');
 assert.equal(zh[4],'卡尔费休：水分专属性不等于没有干扰');
 assert.equal(zh[5],'加热炉是前处理，不是自动解决方案');
 assert.equal(zh[6],'验收前先确认可比性');
 assert.equal(zh[7],'把区别写进采购询问');
});

test('inserted LOD blocks: citation markers, bilingual parity, formula and hypothetical labels',()=>{
 for(const lang of ['en','zh']){
  const blocks=topic.translations[lang].blocks;
  for(const b of [blocks[2],blocks[3]]){
   const markers=[...b.text.matchAll(/\[(\d+)\]/g)].map(m=>Number(m[1]));
   for(const n of markers) assert.ok(n<=topic.references.length,'['+n+'] within references');
   assert.equal(b.text.includes(']('),false,'no markdown links in plain-text renderer');
  }
 }
 // WHO-quote sentence parity: 3 [1] markers in each language's first inserted block
 assert.equal((topic.translations.en.blocks[2].text.match(/\[1\]/g)||[]).length,3,'EN block 3 x [1]');
 assert.equal((topic.translations.zh.blocks[2].text.match(/\[1\]/g)||[]).length,3,'ZH block 3 x [1]');
 // formula + ×100 disclosure stay uncited in both languages (WHO states mg/g, not %)
 const enText=topic.translations.en.blocks[2].text;
 const enFormula=enText.slice(enText.indexOf('Calculate: LOD% ='),enText.indexOf('× 100%.')+7);
 assert.ok(enFormula.includes('LOD% = (pre-drying total'),'EN formula span present');
 assert.equal(enFormula.includes('[1]'),false,'EN formula span uncited');
 assert.ok(!enText.includes('The ×100 only writes that same ratio as a percentage.[1]'),'EN ×100 disclosure uncited');
 const zhText=topic.translations.zh.blocks[2].text;
 const zhFormula=zhText.slice(zhText.indexOf('计算式：干燥失重(%) ='),zhText.indexOf('× 100%。')+6);
 assert.ok(zhFormula.includes('干燥失重(%) = (干燥前总重'),'ZH formula span present');
 assert.equal(zhFormula.includes('[1]'),false,'ZH formula span uncited');
 assert.ok(!zhText.includes('乘以 100 只是把同一比值写成百分数。[1]'),'ZH ×100 disclosure uncited');
 // WHO-attributed basis sentence carries a marker in both languages
 assert.ok(enText.includes('air-dried material.”[1]'),'EN WHO-basis quote cited');
 assert.ok(zhText.includes('这一基准[1]'),'ZH WHO-basis quote cited');
 // hypothetical worked example labeled in both languages
 assert.ok(topic.translations.en.blocks[3].text.includes('Hypothetical numbers for illustration only — not batch data'));
 assert.ok(topic.translations.zh.blocks[3].text.includes('以下数字是假设示例'));
 // example arithmetic present and consistent
 assert.ok(topic.translations.en.blocks[3].text.includes('LOD = 0.1250 ÷ 2.5000 × 100% = 5.00%'));
 assert.ok(topic.translations.zh.blocks[3].text.includes('干燥失重 = 0.1250 ÷ 2.5000 × 100% = 5.00%'));
});

test('built EN and ZH pages render the new blocks in the reviewed order',()=>{
 for(const [prefix,heads] of [['',EN_NEW],['/zh/',ZH_NEW]]){
  const p=`dist${prefix}/plant-extracts/standards/moisture-vs-loss-on-drying/index.html`;
  assert.ok(existsSync(p),p);
  const html=readFileSync(p,'utf8');
  let pos=-1;
  const sequence=['Loss on drying: retain the conditions',...heads,'Karl Fischer: water-specific does not mean interference-free'];
  if(prefix==='/zh/') sequence.splice(0,4,'干燥失重必须保留条件',...ZH_NEW,'卡尔费休：水分专属性不等于没有干扰');
  for(const h of sequence){
   const at=html.indexOf(h);
   assert.ok(at>0,h+' present in '+p);
   assert.ok(at>pos,h+' appears in reviewed order in '+p);
   pos=at;
  }
 }
});

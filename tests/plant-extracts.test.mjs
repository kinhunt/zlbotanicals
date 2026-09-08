import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
const data=JSON.parse(readFileSync('src/data/plant-extracts.json','utf8'));
test('twenty-one topics have aligned translations and resolved scoped references',()=>{
 assert.equal(data.topics.length,21);
 for(const t of data.topics) {
  assert.ok(data.sections.some(s=>s.slug===t.section));
  assert.ok(t.references.length>0 && t.references.every(r=>data.sources[r]));
  for(const lang of data.locales){
   const c=t.translations[lang];
   assert.ok(c.title && c.description && c.blocks.length>=3);
   assert.ok(c.blocks.map(b=>b.text).join('').length>(lang==='en'?950:300),t.slug+' '+lang+' substantive body');
   const p=`dist/${lang==='zh'?'zh/':''}plant-extracts/${t.section}/${t.slug}/index.html`;
   assert.ok(existsSync(p),p);
  }
 }
});
test('shared navigation exposes localized encyclopedia and all seven branches',()=>{
 for(const [prefix,label] of [['','Plant Extracts'],['zh/','植物提取物']]){
  const html=readFileSync(`dist/${prefix}index.html`,'utf8');
  assert.ok(html.includes(`href="/${prefix}plant-extracts"`));
  assert.ok(html.includes(label));
  for(const s of data.sections) assert.ok(html.includes(`href="/${prefix}plant-extracts/${s.slug}"`));
 }
});
test('topic-specific existing resources are linked in the page language',()=>{
 for(const t of data.topics) for(const lang of data.locales){
  const prefix=lang==='zh'?'/zh':'';
  const html=readFileSync(`dist${prefix}/plant-extracts/${t.section}/${t.slug}/index.html`,'utf8');
  for(const p of t.relatedLinks) assert.ok(html.includes(`href="${prefix}${p}"`),t.slug+' '+p);
 }
});
test('bilingual process video has accessible opt-in playback, captions, poster and transcript',()=>{
 for(const lang of data.locales){
  const prefix=lang==='zh'?'zh/':'';
  for(const page of ['', 'processes/']){
   const html=readFileSync(`dist/${prefix}plant-extracts/${page}index.html`,'utf8');
   assert.match(html,/<video[^>]*controls/);
   assert.match(html,/<video[^>]*preload="none"/);
   assert.doesNotMatch(html,/<video[^>]*autoplay/);
   assert.match(html,/<track[^>]*kind="captions"/);
   assert.match(html,new RegExp(`extraction-${lang}\\.mp4\\?v=[a-f0-9]+`));
   assert.doesNotMatch(html,/Silent educational|无声教学|contains no additional audio/);
   assert.ok(html.includes(`extraction-${lang}.webp`));
   assert.match(html,/id="video-transcript"/);
  }
  for(const ext of ['mp4','webp','vtt']) assert.ok(existsSync(`public/media/extraction-${lang}.${ext}`));
 }
});
test('all encyclopedia routes have reciprocal language alternates and sitemap entries',()=>{
 const sitemap=readFileSync('dist/sitemap-0.xml','utf8');
 const routes=['',...data.sections.map(s=>'/'+s.slug),...data.topics.map(t=>'/'+t.section+'/'+t.slug)];
 for(const route of routes) for(const prefix of ['', '/zh']){
  const url='https://zlbotanicals.com'+prefix+'/plant-extracts'+route;
  const html=readFileSync(`dist${prefix}/plant-extracts${route}/index.html`,'utf8');
  assert.ok(html.includes(`rel="canonical" href="${url}"`));
  for(const [code,p] of [['en',''],['zh-CN','/zh'],['x-default','']]) assert.ok(html.includes(`hreflang="${code}" href="https://zlbotanicals.com${p}/plant-extracts${route}"`));
  assert.ok(sitemap.includes(url+'/'));
  const match=html.match(/<script type="application\/ld\+json">(.*?)<\/script>/);
  assert.ok(match);assert.equal(JSON.parse(match[1])['@type'],'BreadcrumbList');
 }
});
test('moisture and COA pages have reciprocal localized descriptive related links',()=>{
 for(const [from,to] of [['moisture-vs-loss-on-drying','coa-vs-specification'],['coa-vs-specification','moisture-vs-loss-on-drying']]){
  const topic=data.topics.find(t=>t.slug===from);
  const path=`/plant-extracts/standards/${to}`;
  assert.ok(topic.relatedLinks.includes(path),`${from} reciprocal related link`);
  for(const lang of data.locales){
   const prefix=lang==='zh'?'/zh':'';
   const html=readFileSync(`dist${prefix}/plant-extracts/standards/${from}/index.html`,'utf8');
   const label=to==='coa-vs-specification' ? (lang==='zh'?'检测报告与规格书':'COA vs specification') : (lang==='zh'?'水分与干燥失重':'Water content vs loss on drying');
   assert.match(html,new RegExp(`<a[^>]*href="${prefix}${path}"[^>]*>${label}</a>`));
   assert.ok(!html.includes(`>${path}</a>`),'no raw URL link labels');
  }
 }
 for(const [prefix,title] of [['','Plant Extracts'],['zh/','植物提取物']]){
  const html=readFileSync(`dist/${prefix}plant-extracts/index.html`,'utf8');
  assert.match(html,new RegExp(`<h1[^>]*>${title}</h1>`));
  assert.ok(html.includes(`rel="canonical" href="https://zlbotanicals.com/${prefix}plant-extracts"`));
 }
});
test('COA review asks for lot traceability and a method/reporting-basis decision',()=>{
 for(const lang of data.locales){
  const html=readFileSync(`dist/${lang==='zh'?'zh/':''}plant-extracts/standards/coa-vs-specification/index.html`,'utf8');
  for(const pattern of lang==='en' ? [/sample identifier/,/specification revision/,/as-received/,/dry basis/,/method change/,/LOD/,/quantification limit/,/not a market authorization/] : [/样品编号/,/规格版本/,/原样基准/,/干基/,/方法变更/,/LOD/,/定量限/,/不等于市场许可/]) assert.match(html,pattern);
 }
});
test('moisture guide distinguishes method scope in both rendered languages',()=>{
 const topic=data.topics.find(t=>t.slug==='moisture-vs-loss-on-drying');
 assert.ok(topic,'new moisture topic exists');
 assert.equal(topic.section,'standards');
 assert.deepEqual(topic.references,['who1998','kfOven','kfMoisture']);
 for(const lang of data.locales){
  const html=readFileSync(`dist/${lang==='zh'?'zh/':''}plant-extracts/standards/${topic.slug}/index.html`,'utf8');
  for(const pattern of lang==='en' ? [/volatile matter/,/Karl Fischer/,/aldehydes and ketones/,/blank/,/temperature/,/as-received/,/not interchangeable/,/no universal/i] : [/挥发性物质/,/卡尔费休/,/醛和酮/,/空白/,/温度/,/原样基准/,/不能互换/,/不存在通用/]) assert.match(html,pattern);
  for(const id of topic.references) assert.ok(html.includes(data.sources[id].url));
 }
});
const sections=['basics','ingredients','processes','equipment','applications','standards','insights'];
test('plant extracts has bilingual substantive hub and seven overview guides',()=>{
 for(const prefix of ['', 'zh/']) for(const slug of ['',...sections]) {
  const path=`dist/${prefix}plant-extracts/${slug ? slug+'/' : ''}index.html`;
  assert.ok(existsSync(path),`Missing encyclopedia route ${path}`);
  const html=readFileSync(path,'utf8');
  assert.match(html,/aria-current="page"/);
  assert.match(html,/hreflang="zh-CN"/);
  assert.match(html,/References|参考来源/);
  assert.ok(html.replace(/<[^>]+>/g,'').length>1800,`Thin overview ${path}`);
 }
});

 test('evergreen expansion has six substantial bilingual entries and valid local citations',()=>{
 const slugs=["solvent-stages-and-process-disclosure", "carriers-and-native-extract-content", "assay-method-comparability", "residual-solvent-review", "dry-basis-vs-as-received-assay", "extract-change-control-and-requalification"];
 for(const slug of slugs){
 const topic=data.topics.find(t=>t.slug===slug);assert.ok(topic,slug);
 for(const lang of data.locales){
 const blocks=topic.translations[lang].blocks;assert.equal(blocks.length,6);
 assert.ok(blocks.map(b=>b.text).join('').length>(lang==='en'?1800:550));
 for(const b of blocks) for(const m of b.text.matchAll(/\[(\d+)\]/g)) assert.ok(Number(m[1])>=1&&Number(m[1])<=topic.references.length);
 }
 }
 for(const slug of ['beverage-compatibility','filtration-and-centrifugation','spray-and-freeze-drying']){
 const topic=data.topics.find(t=>t.slug===slug);for(const lang of data.locales)assert.ok(topic.translations[lang].blocks.length>=8);
 }
 });

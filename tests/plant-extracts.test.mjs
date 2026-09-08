import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
const data=JSON.parse(readFileSync('src/data/plant-extracts.json','utf8'));
test('fourteen original topics have aligned translations and resolved scoped references',()=>{
 assert.equal(data.topics.length,14);
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

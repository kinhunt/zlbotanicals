import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
for(const lang of ['en','zh']) test(`${lang} ginseng heat article renders a three-column four-comparison trial table`,()=>{
 const route=`${lang==='zh'?'zh/':''}resources/blog/ginseng-heat-bitterness`;
 assert.ok(existsSync(`dist/${route}/index.html`),'ginseng heat article exists');
 const html=readFileSync(`dist/${route}/index.html`,'utf8');
 const table=html.match(/<table[\s\S]*?<\/table>/)?.[0];
 assert.ok(table,'real HTML table');
 assert.equal((table.match(/<th[ >]/g)||[]).length,3);
 assert.equal((table.match(/<tr[ >]/g)||[]).length,5);
 assert.ok(html.includes('20(S)-Rg3'));
 assert.ok(html.includes(lang==='en'?'did not all occur at the same reaction time':'并不都出现在相同的反应时间'));
});

for(const lang of ['en','zh']) test(`${lang} ginseng source anchors, blank download and contextual discovery work without scripts`,()=>{
 const prefix=lang==='zh'?'zh/':''; const route=prefix+'resources/blog/ginseng-heat-bitterness';
 const html=readFileSync(`dist/${route}/index.html`,'utf8');
 for(const id of ['ginseng-heat-trials','ginseng-heat-download','ginseng-heat-ref-1','ginseng-heat-ref-2','ginseng-heat-ref-4']){
  assert.equal((html.match(new RegExp(`id="${id}"`,'g'))||[]).length,1,id);
  assert.ok(html.includes(`href="#${id}"`),id);
 }
 for(const target of ['products/ginseng','plant-extracts/ingredients/ginseng','solutions/beverages']) assert.ok(html.includes(`href="/${prefix}${target}"`),target);
 for(const hub of ['resources','resources/application-guides','resources/blog','products/ginseng','plant-extracts/ingredients/ginseng']) assert.ok(readFileSync(`dist/${prefix}${hub}/index.html`,'utf8').includes(`/${route}`),hub);
 const file=`ginseng-heat-trial-${lang}.txt`;
 assert.ok(html.includes(`href="/downloads/${file}" download`));
 const txt=readFileSync(`dist/downloads/${file}`,'utf8');
 for(const marker of ['v1.0','____','20(S)-Rg3']) assert.ok(txt.includes(marker));
 assert.ok(txt.includes(lang==='en'?'not a validated recipe':'不是成熟配方'));
 assert.ok(!html.includes('**'),'no visible Markdown delimiters');
 assert.ok(readFileSync('dist/sitemap-0.xml','utf8').includes(`<loc>https://zlbotanicals.com/${route}</loc>`));
});

test('all 210 baseline sitemap entries stay byte-identical',()=>{
 const baseline=JSON.parse(readFileSync('tests/fixtures/ginseng-baseline-sitemap.json','utf8'));
 const entries=readFileSync('dist/sitemap-0.xml','utf8').match(/<url>.*?<\/url>/g);
 assert.equal(baseline.length,210); assert.equal(entries.length,212);
 for(const entry of baseline) assert.ok(entries.includes(entry));
});

for(const lang of ['en','zh']) test(`${lang} complete reviewed prose and comparison cells survive integration`,async()=>{
 const {parse}=await import('parse5');
 const html=readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/ginseng-heat-bitterness/index.html`,'utf8');
 const text=n=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join(' ');
 const norm=s=>s.replace(/<[^>]+>/g,'').replace(/\*\*/g,'').replace(/\[(?:1|2|4)\]/g,'').replace(/\s+/g,'');
 const actual=norm(text(parse(html)));
 const approved=readFileSync(`docs/evidence/ginseng-heat-bitterness/research/revision/ginseng-heat-bitterness.${lang}.md`,'utf8').split('\n## Sources\n')[0];
 for(const line of approved.split('\n').filter(l=>l.trim()&&!l.startsWith('#')&&!l.startsWith('|---'))){
  const pieces=line.startsWith('|')?line.split('|').filter(Boolean):[line.replace(/^> |^- /,'')];
  for(const part of pieces) assert.ok(actual.includes(norm(part)),part);
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const kinds=['cocoa','ginger'];
for (const kind of kinds) test(`${kind} approved bilingual research is complete, cited and discoverable`,()=>{
 const e=`docs/evidence/${kind}-selection/`;
 for(const lang of ['en','zh']) {
  const file=`src/content/blog/${lang}/${kind}-selection.md`;
  assert.ok(existsSync(file),`missing approved ${kind} ${lang}`);
  const prefix=lang==='zh'?'zh/':'';
  const html=readFileSync(`dist/${prefix}resources/blog/${kind}-selection/index.html`,'utf8');
  assert.ok(html.includes(`${kind}-reader`));
  assert.ok(!html.includes('Interested in our botanical extracts?'));
  assert.ok(!html.includes('对我们的植物提取物感兴趣'));
  for(let id=1;id<=(kind==='cocoa'?5:4);id++) {
   assert.equal((html.match(new RegExp(`id="${kind}-ref-${id}"`,'g'))||[]).length,1);
   assert.ok(html.includes(`href="#${kind}-ref-${id}"`));
  }
  for(const source of ['research','solutions/food','solutions/beverages','resources/application-guides','resources/blog']) assert.ok(readFileSync(`dist/${prefix}${source}/index.html`,'utf8').includes(`/resources/blog/${kind}-selection`),source);
 }
 for(const [p,h] of Object.entries(JSON.parse(readFileSync(e+'source-manifest.json','utf8')))) assert.equal(sha(e+p),h,p);
});

import {createMarkdownProcessor} from '@astrojs/markdown-remark';
import {parseFragment} from 'parse5';
const nodes=n=>[n,...(n.childNodes??[]).flatMap(nodes)];
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const plain=s=>text(parseFragment(s)).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
const approvedHashes={cocoa:{en:'d501e2cc12cfa1e56052b544b021c01b025f017fd0b06e9c90b49feeace3d751',zh:'9919d19e5100e38c80b24f882c1a0694523c516150e69febc53e5e8a2848d755'},ginger:{en:'f3c95c14f83331064a078261a58d2546176e943c3172393052fef3aba580ad24',zh:'0bbca4a0759e1ee8a4c3733ac5354abf648cc7a3cb37fdc9c00a118b10000af3'}};
for(const kind of kinds) for(const lang of ['en','zh']) test(`${kind} ${lang} exact approved paragraphs, headings, table cells and direct links survive rendering`,async()=>{
 const path=`docs/evidence/${kind}-selection/reviewed/${kind==='cocoa'?`draft-${lang}.md`:`draft.${lang}.md`}`;
 assert.equal(sha(path),approvedHashes[kind][lang]);
 const original=readFileSync(path,'utf8').split('\n## Sources\n')[0];
 const processor=await createMarkdownProcessor({smartypants:true});
 const expected=(await processor.render(original)).code;
 const rendered=readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/${kind}-selection/index.html`,'utf8');
 for(const m of expected.matchAll(/<(h[123]|p|th|td)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)) assert.ok(plain(rendered).includes(plain(m[2])),plain(m[2]));
 const direct=nodes(parseFragment(expected)).filter(n=>n.nodeName==='a').map(n=>n.attrs.find(a=>a.name==='href')?.value);
 for(const href of direct) assert.ok(nodes(parseFragment(rendered)).some(n=>n.nodeName==='a'&&n.attrs.some(a=>a.name==='href'&&a.value===href)),href);
 assert.equal((rendered.match(/<table/g)||[]).length,1);
 assert.ok(!rendered.includes('aria-hidden="true" class="mobile-label"'));
 assert.ok(!rendered.includes('<svg role="img"'));
});

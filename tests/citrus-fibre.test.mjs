import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createMarkdownProcessor} from '@astrojs/markdown-remark';
import {parseFragment} from 'parse5';
const slug='citrus-fibre-grade-process';
const nodes=n=>[n,...(n.childNodes??[]).flatMap(nodes)];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const norm=s=>s.replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
for(const lang of ['en','zh']) test(`${lang}: citrus fibre complete accepted prose, cells, SD and groups render unchanged`,async()=>{
 assert.ok(existsSync(`src/content/blog/${lang}/${slug}.md`),'reviewed citrus fibre article missing');
 const original=readFileSync(`docs/evidence/citrus-fibre/review/citrus-fibre.${lang}.md`,'utf8');
 const processor=await createMarkdownProcessor({smartypants:true});
 const expected=parseFragment((await processor.render(original.replace(/^# .+\n/,''))).code);
 const actual=parseFragment(readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`,'utf8'));
 for(const n of nodes(actual))if(attr(n,'class')==='mobile-label')n.childNodes=[];
 const txt=norm(text(actual));
 for(const n of nodes(expected).filter(n=>['h2','p','li'].includes(n.nodeName))) assert.ok(txt.includes(norm(text(n))),norm(text(n)));
 const tables=n=>nodes(n).filter(n=>n.nodeName==='table').map(t=>nodes(t).filter(n=>['th','td'].includes(n.nodeName)).map(n=>norm(text(n))));
 assert.deepEqual(tables(actual),tables(expected));assert.equal(tables(actual).length,3);
 for(const id of ['S1','S2','S4'])assert.equal(nodes(actual).filter(n=>attr(n,'id')===`citrus-fibre-ref-${id}`).length,1);
 // Accepted plain-text citations use sentence-final periods; those are prose, not URL bytes.
 for(const token of original.match(/https:\/\/[^\s。]+/g)){
  const url=token.replace(/\.$/,'');
  assert.ok(nodes(actual).some(n=>attr(n,'href')===url),url);
  if(token!==url)assert.ok(!nodes(actual).some(n=>attr(n,'href')===token),`sentence punctuation in href: ${token}`);
 }
 assert.ok(txt.includes('0.0008a')&&txt.includes('3.80bc')&&txt.includes('3.11cd'));
});

for(const lang of ['en','zh']) test(`${lang}: citrus fibre accessible localized discovery without a supply offer`,()=>{
 const prefix=lang==='zh'?'zh/':'';
 const html=readFileSync(`dist/${prefix}resources/blog/${slug}/index.html`,'utf8');
 assert.match(html,/citrus-fibre-reader/);
 assert.ok(!html.includes(lang==='en'?'Interested in our botanical extracts?':'对我们的植物提取物感兴趣？'));
 for(const route of ['resources/application-guides','resources/research','resources/blog/citrus-pectin-gel-selection'])assert.ok(readFileSync(`dist/${prefix}${route}/index.html`,'utf8').includes(`/${prefix}resources/blog/${slug}`),route);
 const all=nodes(parseFragment(html));
 assert.equal(all.filter(n=>attr(n,'class')==='mobile-label').length,71);
 assert.equal(all.filter(n=>attr(n,'class')==='mobile-label'&&attr(n,'aria-hidden')==='true').length,0);
 for(const guide of ['citrus-pectin-gel-selection','apple-extract-phloridzin-fibre-pectin'])assert.ok(all.some(n=>attr(n,'href')===`/${prefix}resources/blog/${guide}`));
});

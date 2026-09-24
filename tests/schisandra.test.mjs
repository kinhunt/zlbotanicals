import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
const slug='schisandra-beverage-materials';
for(const lang of ['en','zh']) test(`Schisandra ${lang}: one complete research article, native sources and contextual discovery`,()=>{
 assert.ok(existsSync(`src/content/blog/${lang}/${slug}.md`),'approved Schisandra article missing');
 const pre=lang==='zh'?'zh/':'';
 const html=readFileSync(`dist/${pre}resources/blog/${slug}/index.html`,'utf8');
 assert.equal((html.match(/<table/g)||[]).length,3);
 for(let i=1;i<=5;i++){assert.ok(html.includes(`href="#schisandra-ref-${i}"`));assert.equal((html.match(new RegExp(`id="schisandra-ref-${i}"`,'g'))||[]).length,1);}
 assert.ok(!html.includes('Interested in our botanical extracts?')&&!html.includes('对我们的植物提取物感兴趣'));
 for(const source of ['research','solutions/beverages','resources/application-guides','resources/blog']) assert.ok(readFileSync(`dist/${pre}${source}/index.html`,'utf8').includes(`/resources/blog/${slug}`),source);
 assert.ok(html.includes(`https://zlbotanicals.com/${pre}resources/blog/${slug}`));
 assert.ok(!html.match(/<span[^>]*aria-hidden[^>]*class="mobile-label"/));
});

import {createHash} from 'node:crypto';
import {createMarkdownProcessor} from '@astrojs/markdown-remark';
import {parseFragment} from 'parse5';
const nodes=n=>[n,...(n.childNodes??[]).flatMap(nodes)];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const plain=s=>text(parseFragment(s)).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
for(const [lang,hash] of Object.entries({en:'1ae7b8fef2593f16a2bc3cfdd5a23c7fa3f26f9f8e09a063cdf10e1fc9fe89f6',zh:'eead94ea09668475cd5ebd620b15921856d566a4985940c4121ad058c480b220'})) test(`${lang}: complete approved prose, exact numeric SD/units/letters and five sources`,async()=>{
 const original=readFileSync(`docs/evidence/schisandra/article.${lang}.md`,'utf8');
 assert.equal(createHash('sha256').update(original).digest('hex'),hash);
 const body=original.replace(/^# .+\n/,'').split('\n## Sources\n')[0].replace(/\[[1-5]\]/g,'').replace(/\*\*([^\n]+?)\*\*/g,'<strong>$1</strong>');
 const processor=await createMarkdownProcessor({smartypants:true});
 const expected=parseFragment((await processor.render(body.replace(/^<strong>([^\n]+)<\/strong>( ?[——].*)$/gm,'### $1\n\n$2'))).code);
 const actual=parseFragment(readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`,'utf8'));
 for(const n of nodes(actual)) if((n.nodeName==='a'&&attr(n,'href')?.startsWith('#schisandra-ref-'))||attr(n,'class')==='mobile-label')n.childNodes=[];
 const txt=plain(text(actual));
 for(const n of nodes(expected).filter(n=>['h2','h3','p','th','td'].includes(n.nodeName)))assert.ok(txt.includes(plain(text(n))),plain(text(n)));
 const tables=n=>nodes(n).filter(n=>n.nodeName==='table').map(t=>nodes(t).filter(n=>['th','td'].includes(n.nodeName)).map(n=>plain(text(n))));
 assert.deepEqual(tables(actual),tables(expected));
 for(const url of original.split('\n## Sources\n')[1].match(/https:\/\/\S+/g))assert.ok(nodes(actual).some(n=>attr(n,'href')===url),url);
});

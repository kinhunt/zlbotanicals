import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const slug='carob-powder-cocoa-baking';
import {createHash} from 'node:crypto';
import {createMarkdownProcessor} from '@astrojs/markdown-remark';
import {parseFragment} from 'parse5';
const nodes=n=>[n,...(n.childNodes??[]).flatMap(nodes)];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const plain=s=>text(parseFragment(s)).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
for(const [lang,hash] of Object.entries({en:'bb2a2c36940f825c665f7ef9b6b1ed27c214820b688f64a62f724f59279152c5',zh:'661edcaceaf7ccfacf6004a17a213fcd867481c00740eaab565bf24522bc1aef'})) test(`${lang}: complete approved prose, exact reviewed blocks and table cells and nine sources`,async()=>{
 assert.ok(existsSync(`src/content/blog/${lang}/${slug}.md`),'approved carob article missing');
 const original=readFileSync(`docs/evidence/carob/review/article.${lang}.md`,'utf8');
 assert.equal(createHash('sha256').update(original).digest('hex'),hash);
 const body=original.replace(/^# .+\n/,'').split('\n## Sources\n')[0].replace(/\[[1-9]\]/g,'').replace(/\*\*([^\n]+?)\*\*/g,'<strong>$1</strong>');
 const processor=await createMarkdownProcessor({smartypants:true});
 const expected=parseFragment((await processor.render(body.replace(/^<strong>([^\n]+)<\/strong>( ?[——].*)$/gm,'### $1\n\n$2'))).code);
 const actual=parseFragment(readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`,'utf8'));
 for(const n of nodes(actual)) if((n.nodeName==='a'&&attr(n,'href')?.startsWith('#carob-ref-'))||attr(n,'class')==='mobile-label')n.childNodes=[];
 const txt=plain(text(actual));
 for(const n of nodes(expected).filter(n=>['h2','h3','p','li','th','td'].includes(n.nodeName)))assert.ok(txt.includes(plain(text(n))),plain(text(n)));
 const tables=n=>nodes(n).filter(n=>n.nodeName==='table').map(t=>nodes(t).filter(n=>['th','td'].includes(n.nodeName)).map(n=>plain(text(n))));
 assert.deepEqual(tables(actual),tables(expected));
 for(const url of original.split('\n## Sources\n')[1].match(/https:\/\/\S+/g))assert.ok(nodes(actual).some(n=>attr(n,'href')===url),url);
});

for (const lang of ['en','zh']) test(`${lang}: scoped research reader, no generic offer and science discovery`,()=>{
 const prefix=lang==='zh'?'zh/':'';
 const html=readFileSync(`dist/${prefix}resources/blog/${slug}/index.html`,'utf8');
 assert.match(html,/carob-reader/);
 assert.ok(!html.includes(lang==='en'?'Interested in our botanical extracts?':'对我们的植物提取物感兴趣？'));
 for(const route of ['resources/application-guides','resources/research','solutions/food']) {
 const inbound=readFileSync(`dist/${prefix}${route}/index.html`,'utf8');
 assert.ok(inbound.includes(`/${prefix}resources/blog/${slug}`),route);
 }
 const doc=parseFragment(html);
 assert.equal(nodes(doc).filter(n=>attr(n,'class')==='mobile-label').length,34);
 assert.equal(nodes(doc).filter(n=>attr(n,'class')==='mobile-label'&&attr(n,'aria-hidden')==='true').length,0);
});

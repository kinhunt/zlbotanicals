import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createMarkdownProcessor} from '@astrojs/markdown-remark';
import {parseFragment} from 'parse5';
const slug='hops-alcohol-free-beer-selection';
const nodes=n=>[n,...(n.childNodes??[]).flatMap(nodes)];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const norm=s=>s.replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
for(const lang of ['en','zh']) test(`${lang}: reviewed hops prose and qualitative matrix preserved with native citations`,async()=>{
 assert.ok(existsSync(`src/content/blog/${lang}/${slug}.md`),'reviewed hops article missing');
 const original=readFileSync(`docs/evidence/hops/review/draft.${lang}.md`,'utf8');
 const manifest=JSON.parse(readFileSync('docs/evidence/hops/bindings.json','utf8'));
 assert.equal(createHash('sha256').update(original).digest('hex'),manifest.reviewedDrafts[lang]);
 let body=original.replace(/^# .+\n/,'').split('\n## Sources\n')[0].replace(/\[[3576]\]/g,'');
 if(lang==='zh')body=body.replaceAll('下层发酵','下面发酵').replaceAll('上层发酵','上面发酵');
 const processor=await createMarkdownProcessor({smartypants:true});
 const expected=parseFragment((await processor.render(body)).code);
 const actual=parseFragment(readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`,'utf8'));
 for(const n of nodes(actual)) if((n.nodeName==='a'&&attr(n,'href')?.startsWith('#hops-ref-'))||attr(n,'class')==='mobile-label')n.childNodes=[];
 const txt=norm(text(actual));
 for(const n of nodes(expected).filter(n=>['h2','h3','p','li','th','td'].includes(n.nodeName)))assert.ok(txt.includes(norm(text(n))),norm(text(n)));
 const tables=n=>nodes(n).filter(n=>n.nodeName==='table').map(t=>nodes(t).filter(n=>['th','td'].includes(n.nodeName)).map(n=>norm(text(n))));
 assert.deepEqual(tables(actual),tables(expected));
 assert.equal(tables(actual).length,1);
 for(const id of [3,5,6,7])assert.equal(nodes(actual).filter(n=>attr(n,'id')===`hops-ref-${id}`).length,1);
 for(const url of original.split('\n## Sources\n')[1].match(/https:\/\/\S+/g))assert.ok(nodes(actual).some(n=>attr(n,'href')===url),url);
 assert.ok(!txt.includes('198.4')&&!txt.includes('14,000'),'removed numerical display must not return');
});

for(const lang of ['en','zh']) test(`${lang}: research discovery and accessible reader without fictitious offer`,()=>{
 const prefix=lang==='zh'?'zh/':'';
 const html=readFileSync(`dist/${prefix}resources/blog/${slug}/index.html`,'utf8');
 assert.match(html,/hops-reader/);
 assert.ok(!html.includes(lang==='en'?'Interested in our botanical extracts?':'对我们的植物提取物感兴趣？'));
 for(const route of ['resources/application-guides','resources/research','resources/blog/vanilla-material-choice']) assert.ok(readFileSync(`dist/${prefix}${route}/index.html`,'utf8').includes(`/${prefix}resources/blog/${slug}`),route);
 const all=nodes(parseFragment(html));
 assert.equal(all.filter(n=>attr(n,'class')==='mobile-label').length,9);
 assert.equal(all.filter(n=>attr(n,'class')==='mobile-label'&&attr(n,'aria-hidden')==='true').length,0);
 for(const guide of ['vanilla-material-choice','citrus-delayed-bitterness'])assert.ok(all.some(n=>attr(n,'href')===`/${prefix}resources/blog/${guide}`));
 if(lang==='zh'){assert.ok(html.includes('下面发酵')&&html.includes('上面发酵'));assert.ok(!html.includes('下层发酵'));}
});

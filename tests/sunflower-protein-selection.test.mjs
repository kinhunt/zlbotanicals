import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const slug='sunflower-protein-selection';
import {createHash} from 'node:crypto';
import {createMarkdownProcessor} from '@astrojs/markdown-remark';
import {parseFragment} from 'parse5';
const nodes=n=>[n,...(n.childNodes??[]).flatMap(nodes)];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const plain=s=>text(parseFragment(s)).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
for(const [lang,hash] of Object.entries({en:'c82830cee0382898ba53d327f6cc09c4c8fc4dc0ebcd4a0df1f66cda435618da',zh:'22d6fe42e8fac31080990ce3377c796babc82a05aac7a2f5ff3c7586dcbca736'})) test(`${lang}: complete approved prose, exact reviewed blocks and table cells and four sources`,async()=>{
 assert.ok(existsSync(`src/content/blog/${lang}/${slug}.md`),'approved sunflower article missing');
 const original=readFileSync(`docs/evidence/sunflower/review/sunflower-protein-selection.${lang}.md`,'utf8');
 assert.equal(createHash('sha256').update(original).digest('hex'),hash);
 const delta=JSON.parse(readFileSync('docs/evidence/sunflower/editorial-delta.json','utf8'))[lang];
 assert.ok(original.includes(delta.old));
 const body=original.replace(delta.old,delta.new).replace(/^# .+\n/,'').split('\n## Sources\n')[0].replace(/\[[1-9]\]/g,'').replace(/\*\*([^\n]+?)\*\*/g,'<strong>$1</strong>');
 const processor=await createMarkdownProcessor({smartypants:true});
 const expected=parseFragment((await processor.render(body.replace(/^<strong>([^\n]+)<\/strong>( ?[——].*)$/gm,'### $1\n\n$2'))).code);
 const actual=parseFragment(readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`,'utf8'));
 for(const n of nodes(actual)) if((n.nodeName==='a'&&attr(n,'href')?.startsWith('#sunflower-ref-'))||attr(n,'class')==='mobile-label')n.childNodes=[];
 const txt=plain(text(actual));
 for(const n of nodes(expected).filter(n=>['h2','h3','p','li','th','td'].includes(n.nodeName)))assert.ok(txt.includes(plain(text(n))),plain(text(n)));
 const tables=n=>nodes(n).filter(n=>n.nodeName==='table').map(t=>nodes(t).filter(n=>['th','td'].includes(n.nodeName)).map(n=>plain(text(n))));
 assert.deepEqual(tables(actual),tables(expected));
 for(const url of original.split('\n## Sources\n')[1].match(/https:\/\/\S+/g))assert.ok(nodes(actual).some(n=>attr(n,'href')===url),url);
});
for (const lang of ['en','zh']) test(`${lang}: scoped research reader, contextual guide links, native citations and discoverability`,()=>{
 const prefix=lang==='zh'?'zh/':'';
 const html=readFileSync(`dist/${prefix}resources/blog/${slug}/index.html`,'utf8');
 assert.match(html,/sunflower-reader/);
 assert.ok(!html.includes(lang==='en'?'Interested in our botanical extracts?':'对我们的植物提取物感兴趣？'));
 for(const route of ['resources/application-guides','resources/research','resources/blog/fenugreek-flavour-processing']) {
  assert.ok(readFileSync(`dist/${prefix}${route}/index.html`,'utf8').includes(`/${prefix}resources/blog/${slug}`),route);
 }
 const doc=parseFragment(html), all=nodes(doc);
 assert.equal(all.filter(n=>attr(n,'class')==='mobile-label').length,18);
 assert.equal(all.filter(n=>attr(n,'class')==='mobile-label'&&attr(n,'aria-hidden')==='true').length,0);
 assert.equal(all.filter(n=>n.nodeName==='table').length,2);
 for(const id of [1,2,3,4]) assert.equal(all.filter(n=>attr(n,'id')===`sunflower-ref-${id}`).length,1);
 for(const guide of ['fenugreek-flavour-processing','flax-cyanogenic-material-selection'])assert.ok(all.some(n=>attr(n,'href')===`/${prefix}resources/blog/${guide}`));
 for(const url of ['https://www.all-organic-treasures.com/food/heliaflor/sunflowerproteins.html','https://www.sunbloom-proteins.com/sunflower-protein/products']) assert.ok(all.filter(n=>attr(n,'href')===url).length>=2,'contextual supplier link '+url);
 assert.ok(!html.includes('amazon.com'));
});

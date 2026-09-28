import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const slug='flax-cyanogenic-material-selection';
import {createHash} from 'node:crypto';
import {createMarkdownProcessor} from '@astrojs/markdown-remark';
import {parseFragment} from 'parse5';
const nodes=n=>[n,...(n.childNodes??[]).flatMap(nodes)];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const plain=s=>text(parseFragment(s)).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
for(const [lang,hash] of Object.entries({en:'a3d1045df96e224157fcfec314639fe2c25287eaed1d6397cbe42a33a3b76a36',zh:'50d99b84892d9a44004854badc1f16cc716a63fbb27ba5d38e6e824df12aa789'})) test(`${lang}: complete approved prose, exact reviewed blocks and table cells and five sources`,async()=>{
 assert.ok(existsSync(`src/content/blog/${lang}/${slug}.md`),'approved flax article missing');
 const original=readFileSync(`docs/evidence/flax/review/draft.${lang}.md`,'utf8');
 assert.equal(createHash('sha256').update(original).digest('hex'),hash);
 const body=original.replace(/^# .+\n/,'').split('\n## Sources\n')[0].replace(/\[[1-9]\]/g,'').replace(/\*\*([^\n]+?)\*\*/g,'<strong>$1</strong>');
 const processor=await createMarkdownProcessor({smartypants:true});
 const expected=parseFragment((await processor.render(body.replace(/^<strong>([^\n]+)<\/strong>( ?[——].*)$/gm,'### $1\n\n$2'))).code);
 const actual=parseFragment(readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`,'utf8'));
 for(const n of nodes(actual)) if((n.nodeName==='a'&&attr(n,'href')?.startsWith('#flax-ref-'))||attr(n,'class')==='mobile-label')n.childNodes=[];
 const txt=plain(text(actual));
 for(const n of nodes(expected).filter(n=>['h2','h3','p','li','th','td'].includes(n.nodeName)))assert.ok(txt.includes(plain(text(n))),plain(text(n)));
 const tables=n=>nodes(n).filter(n=>n.nodeName==='table').map(t=>nodes(t).filter(n=>['th','td'].includes(n.nodeName)).map(n=>plain(text(n))));
 assert.deepEqual(tables(actual),tables(expected));
 for(const url of original.split('\n## Sources\n')[1].match(/https:\/\/\S+/g))assert.ok(nodes(actual).some(n=>attr(n,'href')===url),url);
});
for (const lang of ['en','zh']) test(`${lang}: scoped research reader, contextual guide links, native citations and discoverability`,()=>{
 const prefix=lang==='zh'?'zh/':'';
 const html=readFileSync(`dist/${prefix}resources/blog/${slug}/index.html`,'utf8');
 assert.match(html,/flax-reader/);
 assert.ok(!html.includes(lang==='en'?'Interested in our botanical extracts?':'对我们的植物提取物感兴趣？'));
 for(const route of ['resources/application-guides','resources/research','resources/blog/psyllium-gluten-free-bread-water']) {
  assert.ok(readFileSync(`dist/${prefix}${route}/index.html`,'utf8').includes(`/${prefix}resources/blog/${slug}`),route);
 }
 const doc=parseFragment(html), all=nodes(doc);
 assert.equal(all.filter(n=>attr(n,'class')==='mobile-label').length,9);
 assert.equal(all.filter(n=>attr(n,'class')==='mobile-label'&&attr(n,'aria-hidden')==='true').length,0);
 assert.equal(all.filter(n=>n.nodeName==='table').length,1);
 assert.ok(all.some(n=>n.nodeName==='caption'&&nodes(n).some(a=>attr(a,'href')==='#flax-ref-6')));
 for(const id of [1,2,4,5,6]) assert.equal(all.filter(n=>attr(n,'id')===`flax-ref-${id}`).length,1);
 for(const guide of ['psyllium-gluten-free-bread-water','fenugreek-flavour-processing'])assert.ok(all.some(n=>attr(n,'href')===`/${prefix}resources/blog/${guide}`));
 assert.ok(!html.includes('amazon.com'));
});

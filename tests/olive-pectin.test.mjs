import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
for(const slug of ['olive-leaf-beverage-encapsulation','citrus-pectin-gel-selection']) for(const lang of ['en','zh']) test(`${slug} ${lang} approved research renders with accessible cards and discovery`,()=>{
 assert.ok(existsSync(`src/content/blog/${lang}/${slug}.md`),'approved article missing');
 const pre=lang==='zh'?'zh/':'';
 const html=readFileSync(`dist/${pre}resources/blog/${slug}/index.html`,'utf8');
 assert.ok(html.includes('olive-pectin-reader'));
 const other=lang==='en'?'zh/':'';
 assert.ok(html.includes(`href="/${other}resources/blog/${slug}"`),'visible bilingual article link');
 assert.equal((html.match(/<table/g)||[]).length,slug.startsWith('olive')?0:1);
 assert.ok(!html.includes('Interested in our botanical extracts?'));
 assert.ok(!html.includes('对我们的植物提取物感兴趣'));
 assert.ok(!html.match(/<span[^>]*aria-hidden[^>]*class="mobile-label"/));
 const ids=slug.startsWith('olive')?[4,5,7,8,9]:[4,6,11,12,13];
 for(const id of ids) {assert.equal((html.match(new RegExp(`id="${slug}-ref-${id}"`,'g'))||[]).length,1);assert.ok(html.includes(`href="#${slug}-ref-${id}"`));}
 for(const source of ['research','solutions/beverages','solutions/food','resources/application-guides','resources/blog']) assert.ok(readFileSync(`dist/${pre}${source}/index.html`,'utf8').includes(`/resources/blog/${slug}`),source);
});
import {createHash} from 'node:crypto';
import {createMarkdownProcessor} from '@astrojs/markdown-remark';
import {parseFragment} from 'parse5';
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const nodes=n=>[n,...(n.childNodes??[]).flatMap(nodes)];
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const plain=s=>text(parseFragment(s)).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
const approved={"olive-leaf-beverage-encapsulation/en/olive": {"path": "docs/evidence/olive-pectin/olive/reviewed.en.md", "hash": "0ad12b7a9e4dd838ed0057ac7298b1b1baadd66006e904e446a1039233b73621"}, "olive-leaf-beverage-encapsulation/zh/olive": {"path": "docs/evidence/olive-pectin/olive/reviewed.zh.md", "hash": "3fd11c2c5745695b8106b50e8ea74a4e80c52db668caf3578790fb95901536ef"}, "citrus-pectin-gel-selection/en/pectin": {"path": "docs/evidence/olive-pectin/pectin/reviewed.en.md", "hash": "f0af7a14f35c4451f3fb03cefc5ed87d6766ebda938c818370763ef72a7625cd"}, "citrus-pectin-gel-selection/zh/pectin": {"path": "docs/evidence/olive-pectin/pectin/reviewed.zh.md", "hash": "365b76e8d9e70dba048f7d90997b2be106c76813228f1d40e44138221602a87d"}, "olive-leaf-beverage-encapsulation/en/commerce": {"path": "docs/evidence/olive-pectin/commerce/MODULE-ENZH.md", "hash": "3ec789b3fdb128f5f1231cfd86bca853747bf48f855115b66cd76e6e6ffc6ce3"}, "olive-leaf-beverage-encapsulation/zh/commerce": {"path": "docs/evidence/olive-pectin/commerce/MODULE-ENZH.md", "hash": "3ec789b3fdb128f5f1231cfd86bca853747bf48f855115b66cd76e6e6ffc6ce3"}};
for(const [key,{path,hash}] of Object.entries(approved)) test(`${key} preserves every reviewed reader block and direct URL`,async()=>{
 assert.equal(sha(path),hash);
 const [slug,lang,kind]=key.split('/');
 let original=readFileSync(path,'utf8');
 if(kind==='commerce') original=original.split('\n---\n')[lang==='zh'?1:0];
 original=original.split('\n## Sources\n')[0].replace(/\[\d+\](?!\()/g,'');
 const processor=await createMarkdownProcessor({smartypants:true});
 const expected=(await processor.render(original.replace(/\*\*([^\n]+?)\*\*/g,'<strong>$1</strong>'))).code;
 const rendered=readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`,'utf8');
 for(const m of expected.matchAll(/<(h[123]|p|li|th|td)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)) assert.ok(plain(rendered).replace(/\[\d+\]/g,'').includes(plain(m[2])),plain(m[2]));
 const direct=nodes(parseFragment(expected)).filter(n=>n.nodeName==='a').map(n=>n.attrs.find(a=>a.name==='href')?.value);
 for(const href of direct) assert.ok(nodes(parseFragment(rendered)).some(n=>n.nodeName==='a'&&n.attrs.some(a=>a.name==='href'&&a.value===href)),href);
});
test('all approved olive/commerce/pectin input archives remain byte-identical',()=>{
 const e='docs/evidence/olive-pectin/';
 for(const [p,h] of Object.entries(JSON.parse(readFileSync(e+'source-manifest.json','utf8')))) assert.equal(sha(e+p),h,p);
});
for(const lang of ['en','zh']) test(`olive ${lang} full commerce precedes science`,()=>{
 const t=readFileSync(`src/content/blog/${lang}/olive-leaf-beverage-encapsulation.md`,'utf8');
 const brand=t.indexOf(lang==='en'?'## Three olive-leaf':'## 三款橄榄叶');
 const science=t.indexOf(lang==='en'?'## Define retention':'## 先确定要保留');
 assert.ok(t.indexOf('NIGEHER028501')<brand && brand<science);
 for(const asin of ['B0019LPMDY','B0C15XRRDJ','B010YH0BS4']) assert.ok(t.indexOf(asin)>brand&&t.indexOf(asin)<science);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
for(const slug of ['beetroot-product-formats','beet-colour-plant-based-meat']) for(const lang of ['en','zh']) test(`${slug} ${lang} approved research renders with accessible cards and discovery`,()=>{
 assert.ok(existsSync(`src/content/blog/${lang}/${slug}.md`),'approved article missing');
 const pre=lang==='zh'?'zh/':'';
 const html=readFileSync(`dist/${pre}resources/blog/${slug}/index.html`,'utf8');
 assert.ok(html.includes('beetroot-reader'));
 const other=lang==='en'?'zh/':'';
 assert.ok(html.includes(`href="/${other}resources/blog/${slug}"`),'visible bilingual article link');
 assert.equal((html.match(/<table/g)||[]).length,1);
 assert.ok(!html.includes('Interested in our botanical extracts?'));
 assert.ok(!html.includes('对我们的植物提取物感兴趣'));
 assert.ok(!html.match(/<span[^>]*aria-hidden[^>]*class="mobile-label"/));
 const ids=slug==='beetroot-product-formats'?[1,2,3,4]:[23,28,30,31];
 for(const id of ids) {assert.equal((html.match(new RegExp(`id="${slug}-ref-${id}"`,'g'))||[]).length,1);assert.ok(html.includes(`href="#${slug}-ref-${id}"`));}
 for(const source of ['research','solutions/food','resources/application-guides','resources/blog']) assert.ok(readFileSync(`dist/${pre}${source}/index.html`,'utf8').includes(`/resources/blog/${slug}`),source);
});

import {createHash} from 'node:crypto';
import {createMarkdownProcessor} from '@astrojs/markdown-remark';
import {parseFragment} from 'parse5';
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const nodes=n=>[n,...(n.childNodes??[]).flatMap(nodes)];
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const plain=s=>text(parseFragment(s)).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
const approved={"beetroot-product-formats/en": {"path": "docs/evidence/beetroot-research/reviewed/commerce/article.en.approved.md", "hash": "d681cae14314a8fab5cdeecc232902f64682f53e5e549fc098a692ce7243d866"}, "beetroot-product-formats/zh": {"path": "docs/evidence/beetroot-research/reviewed/commerce/article.zh.approved.md", "hash": "4dd77b030c3771640c4cd91a0c22361e8c73e5ef752bfda409b4d51f9f832f6b"}, "beet-colour-plant-based-meat/en": {"path": "docs/evidence/beetroot-research/reviewed/research/draft.en.md", "hash": "0db0192fabd7a88dc00103ea939b92bfba4f53daff073eaab90c31c9692fadef"}, "beet-colour-plant-based-meat/zh": {"path": "docs/evidence/beetroot-research/reviewed/research/draft.zh.md", "hash": "90ea5e098f6472fbbffadd2b07f7f0a098e3c74ff996f83b5835546dc53dc2df"}};
for(const [key,{path,hash}] of Object.entries(approved)) test(`${key} preserves approved full prose, table values and direct sources`,async()=>{
 assert.equal(sha(path),hash);
 const [slug,lang]=key.split('/');
 const original=readFileSync(path,'utf8').split('\n## Sources\n')[0];
 const processor=await createMarkdownProcessor({smartypants:true});
 const expected=(await processor.render(original.replace(/\*\*([^\n]+?)\*\*/g,'<strong>$1</strong>'))).code;
 const rendered=readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`,'utf8');
 for(const m of expected.matchAll(/<(h[123]|p|li|th|td)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)) assert.ok(plain(rendered).includes(plain(m[2])),plain(m[2]));
 const direct=nodes(parseFragment(expected)).filter(n=>n.nodeName==='a').map(n=>n.attrs.find(a=>a.name==='href')?.value);
 for(const href of direct) assert.ok(nodes(parseFragment(rendered)).some(n=>n.nodeName==='a'&&n.attrs.some(a=>a.name==='href'&&a.value===href)),href);
});
test('all beetroot source archives are byte-preserved',()=>{
 const e='docs/evidence/beetroot-research/';
 for(const [p,h] of Object.entries(JSON.parse(readFileSync(e+'source-manifest.json','utf8')))) assert.equal(sha(e+p),h,p);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
for(const slug of ['butterfly-pea-protein-beverages','monk-fruit-specification-numbers']) for(const lang of ['en','zh']) test(`${slug} ${lang} approved research renders with accessible cards and discovery`,()=>{
 assert.ok(existsSync(`src/content/blog/${lang}/${slug}.md`),'approved article missing');
 const pre=lang==='zh'?'zh/':'';
 const html=readFileSync(`dist/${pre}resources/blog/${slug}/index.html`,'utf8');
 assert.ok(html.includes('botanical-comparison-reader'));
 const other=lang==='en'?'zh/':'';
 assert.ok(html.includes(`href="/${other}resources/blog/${slug}"`),'visible bilingual article link');
 assert.equal((html.match(/<table/g)||[]).length,slug.startsWith('butterfly')?0:2);
 assert.ok(!html.includes('Interested in our botanical extracts?'));
 assert.ok(!html.includes('对我们的植物提取物感兴趣'));
 assert.ok(!html.match(/<span[^>]*aria-hidden[^>]*class="mobile-label"/));
 const ids=slug.startsWith('butterfly')?[1,7,8,9]:[1,2,4,5,6,7,8,9,10,11,12];
 for(const id of ids) {assert.equal((html.match(new RegExp(`id="${slug}-ref-${id}"`,'g'))||[]).length,1);assert.ok(html.includes(`href="#${slug}-ref-${id}"`));}
 for(const source of ['research','solutions/beverages','resources/application-guides','resources/blog']) assert.ok(readFileSync(`dist/${pre}${source}/index.html`,'utf8').includes(`/resources/blog/${slug}`),source);
});


import {createHash} from 'node:crypto';
import {createMarkdownProcessor} from '@astrojs/markdown-remark';
import {parseFragment} from 'parse5';
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const nodes=n=>[n,...(n.childNodes??[]).flatMap(nodes)];
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const plain=s=>text(parseFragment(s)).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
const approved={"butterfly-pea-protein-beverages/en/colour": {"path": "docs/evidence/butterfly-monkfruit/reviewed/colour/draft.en.md", "hash": "e35f6e47490d24a5e892c16fc6cf513547b47a407d320d5a4af9a462419b7101"}, "butterfly-pea-protein-beverages/zh/colour": {"path": "docs/evidence/butterfly-monkfruit/reviewed/colour/draft.zh.md", "hash": "f1b025a3a8d795876168d2b5f880af8fe408fd91bf4f604608438b70273a3209"}, "monk-fruit-specification-numbers/en/material": {"path": "docs/evidence/butterfly-monkfruit/reviewed/material/draft.en.md", "hash": "71edb39e3075f78d448522f3c481138f78b97ebc65027330ae541162a554b7d8"}, "monk-fruit-specification-numbers/zh/material": {"path": "docs/evidence/butterfly-monkfruit/reviewed/material/draft.zh.md", "hash": "34e73a2476e9c6e31715040a7a16bc2a716612b01f66f2f71cdfac5fb9ab4d77"}, "monk-fruit-specification-numbers/en/commerce": {"path": "docs/evidence/butterfly-monkfruit/reviewed/commerce/draft.en.md", "hash": "dc481c3c8771b7950c66180799ecedcc8181d5e02f0438c1321567aa980ea83b"}, "monk-fruit-specification-numbers/zh/commerce": {"path": "docs/evidence/butterfly-monkfruit/reviewed/commerce/draft.zh.md", "hash": "eedccc85794d5a87e30abeb4514369a0344b5e1deabcdfc06cc01cd86e625026"}};
for(const [key,{path,hash}] of Object.entries(approved)) test(`${key} preserves approved full prose, table values and direct sources`,async()=>{
 assert.equal(sha(path),hash);
 const [slug,lang]=key.split('/');
 let original=readFileSync(path,'utf8').split('\n## Sources\n')[0];
 if(key.endsWith('/commerce')) original=original.replace(/\[(\d+)\](?!\()/g,(_,n)=>`[${Number(n)+8}]`);
 for(const [old,revised] of Object.entries(JSON.parse(readFileSync('docs/evidence/butterfly-monkfruit/editorial-revisions.json','utf8')))) original=original.replace(old,revised);
 original=original.replace(/\[\d+\](?!\()/g,'');
 const processor=await createMarkdownProcessor({smartypants:true});
 const expected=(await processor.render(original.replace(/\*\*([^\n]+?)\*\*/g,'<strong>$1</strong>'))).code;
 const rendered=readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`,'utf8');
 for(const m of expected.matchAll(/<(h[123]|p|li|th|td)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)) assert.ok(plain(rendered).replace(/\[\d+\]/g,'').includes(plain(m[2])),plain(m[2]));
 const direct=nodes(parseFragment(expected)).filter(n=>n.nodeName==='a').map(n=>n.attrs.find(a=>a.name==='href')?.value);
 for(const href of direct) assert.ok(nodes(parseFragment(rendered)).some(n=>n.nodeName==='a'&&n.attrs.some(a=>a.name==='href'&&a.value===href)),href);
});
test('all butterfly and monkfruit source archives are byte-preserved',()=>{
 const e='docs/evidence/butterfly-monkfruit/';
 for(const [p,h] of Object.entries(JSON.parse(readFileSync(e+'source-manifest.json','utf8')))) assert.equal(sha(e+p),h,p);
});

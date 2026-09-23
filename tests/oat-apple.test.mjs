import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
for(const lang of ['en','zh']) test(`oat ${lang} reviewed article and native references are discoverable`,()=>{
 const slug='oat-beta-glucan-material-selection',pre=lang==='zh'?'zh/':'';
 assert.ok(existsSync(`src/content/blog/${lang}/${slug}.md`),'reviewed oat article missing');
 const html=readFileSync(`dist/${pre}resources/blog/${slug}/index.html`,'utf8');
 assert.ok(html.includes('oat-apple-reader'));
 assert.equal((html.match(/<table/g)||[]).length,1);
 for(let id=1;id<=6;id++) {assert.ok(html.includes(`href="#${slug}-ref-${id}"`));assert.equal((html.match(new RegExp(`id="${slug}-ref-${id}"`,'g'))||[]).length,1);}
 assert.ok(!html.includes('Interested in our botanical extracts?')&&!html.includes('对我们的植物提取物感兴趣'));
 assert.ok(!html.match(/<span[^>]*aria-hidden[^>]*class="mobile-label"/));
 for(const source of ['research','solutions/beverages','solutions/food','resources/application-guides','resources/blog']) assert.ok(readFileSync(`dist/${pre}${source}/index.html`,'utf8').includes(`/resources/blog/${slug}`),source);
});

for(const lang of ['en','zh']) test(`apple ${lang} reviewed article and native references are discoverable`,()=>{
 const slug='apple-extract-phloridzin-fibre-pectin',pre=lang==='zh'?'zh/':'';
 assert.ok(existsSync(`src/content/blog/${lang}/${slug}.md`),'reviewed apple article missing');
 const html=readFileSync(`dist/${pre}resources/blog/${slug}/index.html`,'utf8');
 assert.ok(html.includes('oat-apple-reader'));
 assert.equal((html.match(/<table/g)||[]).length,2);
 for(let id=1;id<=5;id++) {assert.ok(html.includes(`href="#${slug}-ref-${id}"`));assert.equal((html.match(new RegExp(`id="${slug}-ref-${id}"`,'g'))||[]).length,1);}
 assert.ok(!html.includes('Interested in our botanical extracts?')&&!html.includes('对我们的植物提取物感兴趣'));
 assert.ok(!html.match(/<span[^>]*aria-hidden[^>]*class="mobile-label"/));
 for(const source of ['research','solutions/beverages','solutions/food','resources/quality-guides','resources/blog']) assert.ok(readFileSync(`dist/${pre}${source}/index.html`,'utf8').includes(`/resources/blog/${slug}`),source);
});

import {createHash} from 'node:crypto';
import {createMarkdownProcessor} from '@astrojs/markdown-remark';
import {parseFragment} from 'parse5';
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const nodes=n=>[n,...(n.childNodes??[]).flatMap(nodes)];
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const plain=s=>text(parseFragment(s)).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
const approved={"oat/en": "4de87479da4090e98c2f8f9a382f4f6bba2028b8060284d8fff637195c2913ce", "oat/zh": "71fa8331a2c0d9da20609c5f9cd2648ae69329487a9f83a06cba74f6276e9642", "apple/en": "8883d7b8ffad733f122be7d651215318cf44c153e54db84186bd8daf96f55af8", "apple/zh": "0d367c8dff1189bdc5b505f2fafc09e66649954bc3c2cfdc9315134e6029757e"};
for(const [key,hash] of Object.entries(approved)) test(`${key} preserves every approved prose block and original source URL`,async()=>{
 const [topic,lang]=key.split('/'),slug=topic==='oat'?'oat-beta-glucan-material-selection':'apple-extract-phloridzin-fibre-pectin';
 const path=`docs/evidence/oat-apple/${topic}/review/draft.${lang}.md`;
 assert.equal(sha(path),hash);
 let original=readFileSync(path,'utf8').replace(/^---\n[\s\S]*?\n---\n/,'').replace(/^# .+\n/,'').split(/\n## (?:Sources|参考来源)\n/)[0];
 original=original.replace(/\[[1-5](?:[^\]\n]*)\](?!\()/g,'');
 const processor=await createMarkdownProcessor({smartypants:true});
 const expected=(await processor.render(original.replace(/\*\*([^\n]+?)\*\*/g,'<strong>$1</strong>'))).code;
 const rendered=readFileSync(`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`,'utf8');
 const dom=parseFragment(rendered);for(const n of nodes(dom)) if(n.nodeName==='a' && n.attrs?.some(a=>a.name==='href'&&a.value.startsWith('#'+slug+'-ref-'))) n.childNodes=[];
 const actual=plain(text(dom));
 for(const m of expected.matchAll(/<(h[123]|p|li|th|td)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)) assert.ok(actual.includes(plain(m[2])),plain(m[2]));
 for(const a of nodes(parseFragment(expected)).filter(n=>n.nodeName==='a')) {const href=a.attrs.find(a=>a.name==='href')?.value;assert.ok(nodes(dom).some(n=>n.nodeName==='a'&&n.attrs.some(x=>x.name==='href'&&x.value===href)),href);}
});
test('all discovery and independently corrected input archives are byte-preserved',()=>{
 const e='docs/evidence/oat-apple/';for(const [p,h] of Object.entries(JSON.parse(readFileSync(e+'source-manifest.json','utf8')))) assert.equal(sha(e+p),h,p);
});
for(const lang of ['en','zh']) test(`${lang} structured apple chromatogram keeps corrected 9.86 and area denominator`,()=>{
 const t=readFileSync(`src/content/blog/${lang}/apple-extract-phloridzin-fibre-pectin.md`,'utf8');assert.ok(t.includes('9.86%'));assert.ok(!t.includes('19.86%'));assert.ok(t.includes('0.73%'));assert.ok(t.includes('0.42%'));assert.ok(t.includes(lang==='en'?'peak-area percentages':'色谱峰面积占比'));
});

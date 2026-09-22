import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const slug='hesperidin-material-choice';
for(const prefix of ['', 'zh/']) test(`${prefix||'en'}: citrus research and beverage inbound discovery`,()=>{
 for(const route of ['research','solutions/beverages','resources/blog','resources/application-guides']) {
 const html=readFileSync(`dist/${prefix}${route}/index.html`,'utf8');
 assert.ok(html.includes(`href="/${prefix}resources/blog/${slug}"`),route);
 }
});
test('all approved evidence archives retained byte-identically',()=>{
 const root='docs/evidence/citrus-material/approved-revision/';
 const hashes=JSON.parse(readFileSync(root+'SHA256.json','utf8'));
 for(const [path,sha] of Object.entries(hashes)) assert.equal(createHash('sha256').update(readFileSync(root+path)).digest('hex'),sha,path);
});
for(const lang of ['en','zh']) test(`${lang}: citrus approved prose, complete identity rows and native sources`,async()=>{
 const path=`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`;
 assert.ok(existsSync(path),'new citrus research route exists');
 const html=readFileSync(path,'utf8');
 const root='docs/evidence/citrus-material/approved-revision/';
 const approved=readFileSync(`${root}${slug}.${lang}.md`,'utf8');
 const hashes=JSON.parse(readFileSync(`${root}SHA256.json`,'utf8'));
 assert.equal(createHash('sha256').update(approved).digest('hex'),hashes[`${slug}.${lang}.md`]);
 const {createMarkdownProcessor}=await import('@astrojs/markdown-remark');
 const processor=await createMarkdownProcessor({});
 let revised=approved;
 const delta=JSON.parse(readFileSync('docs/evidence/citrus-material/authorized-delta.json','utf8'));
 for(const [a,b] of delta.changes[lang]) revised=revised.replace(a,b);
 assert.ok(html.includes(delta.methodNote[lang]));
 if(lang==='zh') {assert.ok(html.includes('年龄大于10岁的一般人群')); assert.ok(!html.includes('10岁以上一般人群')); assert.ok(html.includes(delta.metadataChanges.zh[0][1]));}
 const expected=(await processor.render(revised.split('\n## Sources\n')[0].replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>'))).code;
 const plain=s=>s.replace(/<[^>]+>/g,'').replace(/&amp;|&#38;|&#x26;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#(x[0-9a-f]+|\d+);/gi,(_,v)=>String.fromCodePoint(v[0]==='x'?parseInt(v.slice(1),16):+v)).replace(/\s+/g,' ').trim();
 for(const m of expected.matchAll(/<(h[12]|p|th|td)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)) assert.ok(plain(html).includes(plain(m[2])),plain(m[2]));
 assert.equal((html.match(/class="citrus-table"/g)||[]).length,2);
 assert.equal((html.match(/scope="row"/g)||[]).length,8);
 for(const m of approved.split('\n## Sources\n')[1].matchAll(/\[(\d+)\] (\S+) — (.+)/g)) {
  assert.equal((html.match(new RegExp(`id="citrus-ref-${m[1]}"`,'g'))||[]).length,1);
  assert.ok(html.includes(`href="#citrus-ref-${m[1]}"`));
  assert.ok(plain(html).includes(plain(m[3])));
  assert.ok(html.includes(m[2]));
 }
 assert.doesNotMatch(html,/Interested in our botanical extracts\?|对我们的植物提取物感兴趣？|\/products\/hesperidin/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const slug='cranberry-pac-purchasing';
const root='docs/evidence/cranberry-pac/approved-r1/';
const digest=s=>createHash('sha256').update(s).digest('hex');
test('cranberry exact approved bilingual R1 and original source archives',()=>{
 assert.ok(existsSync(root+'SHA256.json'),'approved cranberry archives exist');
 const hashes=JSON.parse(readFileSync(root+'SHA256.json'));
 assert.ok(Object.keys(hashes).length>=40);
 for(const [path,sha] of Object.entries(hashes)) assert.equal(digest(readFileSync(root+path)),sha,path);
 const accepted=JSON.parse(readFileSync(root+'final-independent/FINAL-verdict.json'));
 assert.equal(accepted.verdict,'ACCEPT_R1_CONTENT');
 for(const lang of ['en','zh']) {
  const approved=readFileSync(`${root}${slug}.${lang}.md`,'utf8');
  assert.equal(digest(approved),accepted.draft_sha256[`${slug}.${lang}.md`]);
  assert.ok(existsSync(`src/content/blog/${lang}/${slug}.md`),'integrated article exists');
 }
});

for(const lang of ['en','zh']) test(`${lang}: cranberry approved prose, exact table and citations without commercial offer`,async()=>{
 const path=`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`;
 assert.ok(existsSync(path),'new cranberry research route exists');
 const html=readFileSync(path,'utf8');
 const approved=readFileSync(`${root}${slug}.${lang}.md`,'utf8');
 const {createMarkdownProcessor}=await import('@astrojs/markdown-remark');
 const processor=await createMarkdownProcessor({});
 const expected=(await processor.render(approved.split('\n## Sources\n')[0].replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>'))).code;
 const plain=s=>s.replace(/<[^>]+>/g,'').replace(/&amp;|&#38;|&#x26;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#(x[0-9a-f]+|\d+);/gi,(_,v)=>String.fromCodePoint(v[0]==='x'?parseInt(v.slice(1),16):+v)).replace(/\s+/g,' ').trim();
 for(const m of expected.matchAll(/<(h[12]|p|li|th|td)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)) assert.ok(plain(html).includes(plain(m[2])),plain(m[2]));
 assert.equal((html.match(/class="cranberry-table"/g)||[]).length,1);
 assert.equal((html.match(/scope="row"/g)||[]).length,3);
 for(const m of approved.split('\n## Sources\n')[1].matchAll(/\[(\d+)\] (\S+) — (.+)/g)) {
  assert.equal((html.match(new RegExp(`id="cranberry-ref-${m[1]}"`,'g'))||[]).length,1);
  assert.ok(html.includes(`href="#cranberry-ref-${m[1]}"`));
  assert.ok(plain(html).includes(plain(m[3])));
  assert.ok(html.replaceAll('&#38;','&').replaceAll('&#x26;','&').replaceAll('&amp;','&').includes(m[2]));
 }
 assert.doesNotMatch(html,/Interested in our botanical extracts\?|对我们的植物提取物感兴趣？|\/products\/cranberry/);
 for(const route of ['research','quality','resources/blog','resources/quality-guides']) assert.ok(readFileSync(`dist/${lang==='zh'?'zh/':''}${route}/index.html`,'utf8').includes(`href="/${lang==='zh'?'zh/':''}resources/blog/${slug}"`),route);
});

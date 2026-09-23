import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>readFileSync(p,'utf8');
const root='docs/evidence/acacia/';
test('acacia preserves exact approved prose and all cells in three semantic tables',()=>{
 for(const lang of ['en','zh']) {
  const path=`src/content/blog/${lang}/acacia-fibre-emulsification.md`;
  assert.ok(existsSync(path),`missing acacia ${lang}`);
  const approved=read(root+`article.${lang}.md`);
  assert.equal(createHash('sha256').update(approved).digest('hex'),JSON.parse(read(root+'approved-hashes.json'))[`article.${lang}.md`]);
  const original=approved.split('\n').slice(1).join('\n').split('\n## Sources\n')[0].trim();
  let actual=read(path).split('---')[2].split(lang==='en'?'\n## Sources\n':'\n## 来源\n')[0].trim().replace(/<a href="#acacia-ref-(\d+)">\[\d+\]<\/a>/g,'[$1]');
  const tables=[...original.matchAll(/^\|.*(?:\n\|.*)+/gm)].map(m=>m[0]);
  assert.equal(tables.length,3);
  let i=0;
  actual=actual.replace(/<table[\s\S]*?<\/table>/g,html=>{
   const table=tables[i++];
   for(const row of table.split('\n').filter((_,j)=>j!==1)) for(const cell of row.split('|').slice(1,-1)) assert.ok(html.includes(cell.trim()),cell);
   return table;
  });
  assert.equal(i,3);assert.equal(actual,original);
 }
});

test('acacia research renderer suppresses sales CTA and provides scoped whole-row reflow',()=>{
 for(const prefix of ['','zh/']) {
  const s=read(`src/pages/${prefix}resources/blog/[slug].astro`);
  assert.ok(s.includes('"acacia-reader": isAcacia'),'missing scoped research reader');
  assert.ok(s.includes('!isAcacia && !isAstaxanthin'),'missing research CTA suppression');
  assert.ok(s.includes('.acacia-reader :global(.acacia-table)'),'missing table styles');
 }
});

test('acacia renders 14 distinct original references and research discovery in both languages',async()=>{
 const {createMarkdownProcessor}=await import('@astrojs/markdown-remark');
 const processor=await createMarkdownProcessor({smartypants:false});
 const plain=s=>s.replace(/<[^>]+>/g,'').replace(/&#(?:x([0-9a-f]+)|(\d+));/gi,(_,h,d)=>String.fromCodePoint(parseInt(h||d,h?16:10))).replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
 for(const lang of ['en','zh']) {
  const prefix=lang==='zh'?'zh/':'';
  const html=read(`dist/${prefix}resources/blog/acacia-fibre-emulsification/index.html`);
  assert.ok(html.includes('acacia-reader'));
  assert.ok(!html.includes('Interested in our botanical extracts?')&&!html.includes('对我们的植物提取物感兴趣'));
  const approved=read(root+`article.${lang}.md`);
  const expected=(await processor.render(approved.split('\n## Sources\n')[0])).code;
  for(const m of expected.matchAll(/<(h[123]|p)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)) assert.ok(plain(html).includes(plain(m[2])),plain(m[2]));
  for(const m of approved.split('\n## Sources\n')[1].matchAll(/^\[(\d+)\] (\S+)/gm)) {
   assert.equal((html.match(new RegExp(`id="acacia-ref-${m[1]}"`,'g'))||[]).length,1);
   assert.ok(html.includes(`href="#acacia-ref-${m[1]}"`));
   assert.ok(html.includes(`href="${m[2]}"`));
  }
  assert.equal((html.match(/class="acacia-table"/g)||[]).length,3);
  assert.equal((html.match(/class="mobile-label"/g)||[]).length,18);
  for(const source of ['research','resources/application-guides','resources/blog','solutions/beverages','solutions/food']) assert.ok(read(`dist/${prefix}${source}/index.html`).includes('/resources/blog/acacia-fibre-emulsification'),source);
 }
});

test('acacia provides native return links to both relevant industry hubs',()=>{
 for(const prefix of ['','zh/']) {
  const html=read(`dist/${prefix}resources/blog/acacia-fibre-emulsification/index.html`).match(/<article[\s\S]*?<\/article>/)[0];
  for(const dest of ['food','beverages']) assert.ok(html.includes(`href="/${prefix}solutions/${dest}"`),`${prefix}${dest} missing outbound`);
 }
});

 test('acacia repeated mobile column labels remain in the accessibility tree',()=>{
 for(const lang of ['en','zh']) {
  const s=read(`src/content/blog/${lang}/acacia-fibre-emulsification.md`);
  const labels=[...s.matchAll(/<span\b([^>]*class="mobile-label"[^>]*)>/g)];
  assert.equal(labels.length,18);
  for(const m of labels) assert.ok(!/aria-hidden="true"/.test(m[1]),`${lang}: mobile column label hidden from accessibility tree`);
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root='docs/evidence/chicory-fibre/';
const read=p=>readFileSync(p,'utf8');
const inline=s=>s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2">$1</a>');
const undo=s=>s.replace(/<a href="#chicory-ref-(\d+)">\[\d+\]<\/a>/g,'[$1]');
test('chicory preserves every approved paragraph and all fifteen qualitative cells',()=>{
 for(const lang of ['en','zh']) {
  const file=`src/content/blog/${lang}/chicory-fibre-selection.md`;
  assert.ok(existsSync(file),`missing approved chicory article ${lang}`);
  const original=read(root+`reviewed/chicory-fibre-selection.${lang}.md`).split('\n').slice(1).join('\n').split('\n## Sources\n')[0].trim();
  let actual=undo(read(file).split('---')[2].split(lang==='en'?'\n## Sources\n':'\n## 来源\n')[0].trim());
  const table=original.match(/^\|.*(?:\n\|.*)+/m)[0];
  const cells=table.split('\n').slice(2).flatMap(r=>r.split('|').slice(1,-1).map(x=>x.trim()));
  for(const cell of cells) assert.ok(actual.includes(inline(cell)),`missing cell ${cell}`);
  actual=actual.replace(/<table[\s\S]*?<\/table>/,table);
  assert.equal(actual,original);
 }
});
test('chicory renders scoped research routes, original citation identities and meaningful discovery',()=>{
 for(const lang of ['en','zh']) {
  const prefix=lang==='zh'?'zh/':'';
  const path=`dist/${prefix}resources/blog/chicory-fibre-selection/index.html`;
  assert.ok(existsSync(path),'missing rendered chicory');
  const html=read(path);
  assert.ok(html.includes('chicory-reader'));
  assert.ok(!html.includes('Interested in our botanical extracts?')&&!html.includes('对我们的植物提取物感兴趣'));
  for(const n of [1,2,3,7,8,9]) {
   assert.equal((html.match(new RegExp(`id="chicory-ref-${n}"`,'g'))||[]).length,1);
   assert.ok(html.includes(`href="#chicory-ref-${n}"`));
  }
  assert.equal((html.match(/<tr>/g)||[]).length,6);
  assert.equal((html.match(/class="mobile-label"/g)||[]).length,10);
  for(const source of ['research','resources/application-guides','resources/blog','solutions/food']) assert.ok(read(`dist/${prefix}${source}/index.html`).includes('/resources/blog/chicory-fibre-selection'),source);
 }
});
test('chicory evidence and baseline public bytes preserved',()=>{
 const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
 for(const [path,hash] of Object.entries(JSON.parse(read(root+'source-manifest.json')))) assert.equal(sha(root+path),hash,path);
 for(const [path,hash] of Object.entries(JSON.parse(read(root+'baseline-public.json')))) assert.equal(sha(path),hash,path);
});

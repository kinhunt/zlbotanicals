import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const evidence='docs/evidence/pomegranate-flavour-selection/';
const hashes={en:'f1b4a681a4aff0fd231af275751cf48150427ab0e1e30dfe3c32d1c2ae65b36e',zh:'f0c23b4b1fa74fd2fad26a1462ef10caf16942cfa4208308aef996a35e0228e7'};
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
test('pomegranate retains exact reviewed bilingual prose and sparse citation identities',()=>{
 for(const lang of ['en','zh']) {
  const file=`src/content/blog/${lang}/pomegranate-flavour-selection.md`;
  assert.ok(existsSync(file),`missing reviewed pomegranate article ${lang}`);
  assert.equal(sha(evidence+`reviewed/reviewed.${lang}.md`),hashes[lang]);
  const heading=lang==='en'?'\n## Sources\n':'\n## 参考资料\n';
  const original=readFileSync(evidence+`reviewed/reviewed.${lang}.md`,'utf8').split('\n').slice(1).join('\n').split(heading)[0].trim();
  const actual=readFileSync(file,'utf8').split('---')[2].split(heading)[0].trim().replace(/<a href="#pomegranate-ref-(\d+)">\[\d+\]<\/a>/g,'[$1]');
  assert.equal(actual,original);
 }
});

test('pomegranate renders research-only routes with native citations and meaningful discovery',()=>{
 for(const lang of ['en','zh']) {
  const prefix=lang==='zh'?'zh/':'';
  const file=`dist/${prefix}resources/blog/pomegranate-flavour-selection/index.html`;
  assert.ok(existsSync(file),`missing rendered pomegranate ${lang}`);
  const html=readFileSync(file,'utf8');
  assert.ok(html.includes('pomegranate-reader'));
  assert.ok(!html.includes('Interested in our botanical extracts?'));
  assert.ok(!html.includes('对我们的植物提取物感兴趣'));
  for(const id of [1,2,5,6]) {
   assert.equal((html.match(new RegExp(`id="pomegranate-ref-${id}"`,'g'))||[]).length,1);
   assert.ok(html.includes(`href="#pomegranate-ref-${id}"`));
  }
  assert.ok(!html.includes('<table'));
  for(const source of ['research','solutions/beverages','resources/application-guides','resources/blog']) assert.ok(readFileSync(`dist/${prefix}${source}/index.html`,'utf8').includes('/resources/blog/pomegranate-flavour-selection'),source);
 }
});
test('pomegranate original archives, reviewed ledger and public assets retain exact bytes',()=>{
 const archives=JSON.parse(readFileSync(evidence+'source-manifest.json','utf8'));
 assert.ok(Object.keys(archives).length>=107);
 for(const [path,hash] of Object.entries(archives)) assert.equal(sha(evidence+path),hash,path);
 const publicHashes=JSON.parse(readFileSync(evidence+'baseline-public.json','utf8'));
 assert.equal(Object.keys(publicHashes).length,141);
 for(const [path,hash] of Object.entries(publicHashes)) assert.equal(sha(path),hash,path);
});

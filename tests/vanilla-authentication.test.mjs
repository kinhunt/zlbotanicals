import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const evidence='docs/evidence/vanilla-authentication/';
const hashes={en:'829c9f4e7e7099de64ee773d40e4f52659b960fa1ad769185719499334e30637',zh:'1bdb05212564d21489fc8a070a3f727867d3ed147622565ab15d434adad377ac'};
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
test('authentication article preserves only the exact accepted bilingual prose',()=>{
 for(const lang of ['en','zh']) {
  const file=`src/content/blog/${lang}/vanilla-authentication.md`;
  assert.ok(existsSync(file),`missing approved authentication article ${lang}`);
  assert.equal(sha(evidence+`reviewed/draft.${lang}.md`),hashes[lang]);
  const original=readFileSync(evidence+`reviewed/draft.${lang}.md`,'utf8').split('\n').slice(1).join('\n').split('\n## Sources\n')[0].trim();
  const actual=readFileSync(file,'utf8').split('---')[2].split(lang==='en'?'\n## Sources\n':'\n## 来源\n')[0].trim().replaceAll('<a href="#vanilla-auth-ref-1">[1]</a>','[1]');
  assert.equal(actual,original);
 }
});

test('authentication renders bilingual research-only routes with citations and discovery',()=>{
 for(const lang of ['en','zh']) {
  const prefix=lang==='zh'?'zh/':'';
  const file=`dist/${prefix}resources/blog/vanilla-authentication/index.html`;
  assert.ok(existsSync(file),`missing rendered authentication ${lang}`);
  const html=readFileSync(file,'utf8');
  assert.ok(html.includes('vanilla-authentication-reader'));
  assert.ok(!html.includes('Interested in our botanical extracts?'));
  assert.ok(!html.includes('对我们的植物提取物感兴趣'));
  assert.equal((html.match(/id="vanilla-auth-ref-1"/g)||[]).length,1);
  assert.ok((html.match(/href="#vanilla-auth-ref-1"/g)||[]).length>=20);
  assert.ok(!html.includes('<table'));
  for(const source of ['research','resources/quality-guides','resources/blog']) assert.ok(readFileSync(`dist/${prefix}${source}/index.html`,'utf8').includes('/resources/blog/vanilla-authentication'),source);
 }
});
test('authentication evidence and baseline public files retain exact bytes',()=>{
 for(const [path,hash] of Object.entries(JSON.parse(readFileSync(evidence+'source-manifest.json','utf8')))) assert.equal(sha(evidence+path),hash,path);
 const publicHashes=JSON.parse(readFileSync(evidence+'baseline-public.json','utf8'));
 assert.ok(Object.keys(publicHashes).length>=141);
 for(const [path,hash] of Object.entries(publicHashes)) assert.equal(sha(path),hash,path);
});

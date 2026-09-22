import test from 'node:test';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
const slug='vanilla-material-choice';
test('vanilla material comparison is available in both languages without a sales offer',()=>{
 for(const lang of ['en','zh']) {
  const path=`dist/${lang==='zh'?'zh/':''}resources/blog/${slug}/index.html`;
  assert.ok(existsSync(path),`missing bilingual vanilla article: ${lang}`);
  const html=readFileSync(path,'utf8');
  assert.ok(html.includes('vanilla-table'));
  assert.equal((html.match(/scope="row"/g)||[]).length,3);
  assert.ok(!html.includes('Interested in our botanical extracts?'));
  assert.ok(!html.includes('retrieved on 22 September'));
  for(const id of [1,2,3,4]) {assert.ok(html.includes(`href="#vanilla-ref-${id}"`));assert.equal((html.match(new RegExp(`id="vanilla-ref-${id}"`,'g'))||[]).length,1);}
  for(const source of ['research','resources/quality-guides','resources/blog']) assert.ok(readFileSync(`dist/${lang==='zh'?'zh/':''}${source}/index.html`,'utf8').includes(`/resources/blog/${slug}`),`missing ${source} discovery`);
 }
});

test('vanilla accepted draft hashes and archived evidence remain exact',()=>{
 const evidence='docs/evidence/vanilla-material/';
 const hashes=JSON.parse(readFileSync(evidence+'draft-hashes.json','utf8'));
 for(const lang of ['en','zh']) for(const [kind,path] of [['original',`approved-originals/draft.${lang}.md`],['revised',`revised.${lang}.md`]]) assert.equal(createHash('sha256').update(readFileSync(evidence+path)).digest('hex'),hashes[lang][kind]);
 for(const [path,hash] of Object.entries(JSON.parse(readFileSync(evidence+'source-manifest.json','utf8')))) assert.equal(createHash('sha256').update(readFileSync(evidence+'approved-originals/'+path)).digest('hex'),hash,path);
});

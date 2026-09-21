import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
const slug='paprika-extract-format-selection';
for (const lang of ['en','zh']) {
 const prefix=lang==='zh'?'zh/':'';
 test(`paprika ${lang}: published guide has five complete material choices and local discovery`,()=>{
  const path=`dist/${prefix}resources/blog/${slug}/index.html`;
  assert.ok(existsSync(path),'new sourcing guide must be built');
  const html=readFileSync(path,'utf8');
  assert.equal((html.match(/class="paprika-choice"/g)||[]).length,5);
  assert.ok(html.includes('paprika-ref-1')&&html.includes('paprika-ref-2'));
  assert.ok(html.includes(`href="/${prefix}solutions/food"`));
  assert.ok(html.includes(`href="/${prefix}request-quote"`));
  assert.ok(!html.includes('Review draft')&&!html.includes('待审稿'));
  assert.ok(!html.includes('**'));
  for(const route of ['solutions/food','resources/sourcing-guides','resources/blog']) {
   assert.ok(readFileSync(`dist/${prefix}${route}/index.html`,'utf8').includes(`/resources/blog/${slug}`),route);
  }
 });
}

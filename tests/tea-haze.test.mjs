import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
const slug='resources/blog/tea-haze-diagnosis';
for (const lang of ['en','zh']) test(`${lang} complete tea diagnostic is rendered and discoverable`,()=>{
 const prefix=lang==='zh'?'zh/':'';
 const path=`dist/${prefix}${slug}/index.html`;
 assert.ok(existsSync(path),'approved diagnostic route must exist');
 const html=readFileSync(path,'utf8');
 assert.match(html,/520 nm/);
 assert.match(html,/tea-haze-ref-4/);
 assert.match(html,/tea-haze-toc/);
 assert.equal((html.match(/<table/g)||[]).length,2);
 assert.equal((html.match(/class="tea-haze-table"/g)||[]).length,2);
 assert.match(html,/tea-haze-design/);
 assert.ok(html.includes(`https://zlbotanicals.com/${prefix}${slug}`));
 for(const hub of ['resources','resources/application-guides','resources/blog','solutions/beverages','products/green-tea']) {
  assert.ok(readFileSync(`dist/${prefix}${hub}/index.html`,'utf8').includes(`/${prefix}${slug}`),`${hub} links to article`);
 }
 for(let n=1;n<=4;n++) {
  assert.equal((html.match(new RegExp(`id="tea-haze-ref-${n}"`,'g'))||[]).length,1);
  assert.ok(html.includes(`href="#tea-haze-ref-${n}"`));
 }
});

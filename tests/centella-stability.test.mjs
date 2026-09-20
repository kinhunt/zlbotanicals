import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const slug='resources/blog/centella-cold-process-stability';
for(const lang of ['en','zh']) test(`${lang} complete Centella application study renders`,()=>{
 const prefix=lang==='zh'?'zh/':'';
 const path=`dist/${prefix}${slug}/index.html`;
 assert.ok(existsSync(path),'new application study route exists');
 const html=readFileSync(path,'utf8');
 for(const value of ['605.40','4993.60','111.95%','9.66','18.80','SC4-29','144.5']) assert.ok(html.includes(value),value);
 assert.equal((html.match(/<table/g)||[]).length,2);
 assert.ok(html.includes(`https://zlbotanicals.com/${prefix}${slug}`));
 for(let n=1;n<=2;n++){
  assert.equal((html.match(new RegExp(`id="centella-stability-ref-${n}"`,'g'))||[]).length,1);
  assert.ok(html.includes(`href="#centella-stability-ref-${n}"`));
 }
 if(lang==='zh'){assert.ok(html.includes('海藻酸（Algin）'));assert.ok(!html.includes('海藻酸钠'));}
});

for(const lang of ['en','zh']) test(`${lang} reader tables preserve row identity and discovery`,()=>{
 const prefix=lang==='zh'?'zh/':'';
 const html=readFileSync(`dist/${prefix}${slug}/index.html`,'utf8');
 assert.match(html,/centella-stability-reader/);
 assert.match(html,/centella-stability-toc/);
 assert.equal((html.match(/scope="row"/g)||[]).length,8);
 assert.equal((html.match(/class="centella-stability-table"/g)||[]).length,2);
 for(const hub of ['resources','resources/application-guides','resources/blog','solutions/cosmetics','products/centella-asiatica'])assert.ok(readFileSync(`dist/${prefix}${hub}/index.html`,'utf8').includes(`/${prefix}${slug}`),hub);
});

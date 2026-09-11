import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
for (const lang of ['en','zh']) test(`${lang}: relevant patents close the article after study cases`,()=>{
 const h=readFileSync(`dist${lang==='zh'?'/zh':''}/plant-extracts/ingredients/turmeric/index.html`,'utf8');
 const section=h.slice(h.indexOf('id="patents"'),h.indexOf('id="research-turmeric-references"'));
 assert.ok(h.indexOf('id="patents"')>h.indexOf('id="insights"'),'patents follow cases');
 assert.match(section,lang==='zh'?/相关专利/:/Relevant patents/);
 assert.equal((section.match(/<section/g)||[]).length,1,'only references opening follows patents');
 assert.match(section,/WO2007143635A1/);
 assert.match(section,lang==='zh'?/纯化/:/purification/);
 assert.match(section,lang==='zh'?/技术相关性/:/technical relevance/);
});

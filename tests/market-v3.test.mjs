import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=lang=>readFileSync(new URL(`../dist/${lang==='zh'?'zh/':''}research/market/functional-mushrooms/index.html`,import.meta.url),'utf8');
for(const lang of ['en','zh']) test(`${lang}: approved v3 depth and article-local source identities`,()=>{
 const html=read(lang);
 assert.match(html,lang==='zh'?/蘑菇补充剂市场预计2031年达88.3亿美元/:/Mushroom Supplements Market Expected to Reach USD 8.83 Billion by 2031/);
 for(const text of ['75.8%','14.4%','114.5%','9.96%','Nammex','Odyssey','RYZE','IFIC','KSM-66']) assert.ok(html.includes(text),text);
 assert.match(html,lang==='zh'?/冻干/:/freeze-drying/);
 assert.doesNotMatch(html,/Target组合销售|Amazon.com listing descriptions|market-ref-\d+"/);
 for(let n=1;n<=22;n++) {assert.ok(html.includes(`id="market-v3-ref-${n}"`),`source ${n}`);assert.ok(html.includes(`href="#market-v3-ref-${n}"`),`citation ${n}`);}
 for(const id of ['supplements','segments','product-positioning','extracts','north-america','us-canada','implications','method','reishi'])assert.ok(html.includes(`id="${id}"`),id);
});

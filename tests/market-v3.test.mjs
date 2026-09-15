// Legacy public anchors remain supported by the v4 article.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
for(const lang of ['en','zh'])test(`${lang}: retained market article anchors`,()=>{
 const h=readFileSync(`dist/${lang==='zh'?'zh/':''}research/market/functional-mushrooms/index.html`,'utf8');
 for(const id of ['supplements','segments','product-positioning','extracts','north-america','us-canada','implications','method','reishi','how-brands-compete-amazoncom-product-observations','reishi-an-established-species-across-several-formats','from-market-opportunities-to-reishi-materials','north-america-and-uscanada-regulatory-differences','sources-and-observation-method','exhibit-1','exhibit-2','exhibit-3','exhibit-4'])assert.ok(h.includes(`id="${id}"`),id);
});

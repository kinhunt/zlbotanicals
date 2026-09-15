import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = lang => readFileSync(new URL(`../dist/${lang === 'zh' ? 'zh/' : ''}research/market/functional-mushrooms/index.html`, import.meta.url),'utf8');
for (const lang of ['en','zh']) test(`${lang}: supplement endpoints are accessible SSR exhibits`,()=>{
 const html=read(lang); const fig=html.match(/<figure[^>]*id="exhibit-1"[\s\S]*?<\/figure>/)?.[0];
 assert.ok(fig,'exhibit 1 exists');
 assert.match(fig, /role="img"/); assert.match(fig, /<title id=/); assert.match(fig, /<desc id=/);
 assert.match(fig, /<caption/); assert.equal((fig.match(/data-value=/g)||[]).length,2);
 for(const v of ['5.83','8.83']) assert.ok(fig.includes(`data-value="${v}"`));
 assert.match(fig,/2026/); assert.match(fig,/2031/); assert.doesNotMatch(fig,/2027|2028|2029/);
 assert.match(fig,lang==='zh'?/58.3/:/5.83/); assert.match(fig,/2026-09-11/); assert.match(fig,/2026-01/);
});

for (const lang of ['en','zh']) test(`${lang}: independent 2025 share panels preserve dimensions`,()=>{
 const fig=read(lang).match(/<figure[^>]*id="exhibit-2"[\s\S]*?<\/figure>/)?.[0];
 assert.ok(fig,'exhibit 2 exists');
 assert.equal((fig.match(/data-value=/g)||[]).length,4);
 for(const v of ['46.43','36.22','34.57','22.81']) assert.ok(fig.includes(`data-value="${v}"`));
 assert.match(fig,lang==='zh'?/不能相加/:/must not be added/);
 assert.match(fig,/<caption/);assert.match(fig,/2025/);
});

for (const lang of ['en','zh']) test(`${lang}: CAGR compares the same forecast period with dimension labels`,()=>{
 const fig=read(lang).match(/<figure[^>]*id="exhibit-3"[\s\S]*?<\/figure>/)?.[0]; assert.ok(fig,'exhibit 3 exists');
 assert.equal((fig.match(/data-value=/g)||[]).length,3);
 for(const v of ['8.66','9.78','10.69']) assert.ok(fig.includes(`data-value="${v}"`));
 assert.match(fig,/2026/);assert.match(fig,/2031/);assert.match(fig,lang==='zh'?/不同分类维度/:/different segmentation dimensions/);
});

for (const lang of ['en','zh']) test(`${lang}: product matrix and editorial hierarchy are server rendered`,()=>{
 const html=read(lang);const fig=html.match(/<figure[^>]*id="exhibit-4"[\s\S]*?<\/figure>/)?.[0];assert.ok(fig,'product exhibit exists');
 assert.equal((fig.match(/scope="col"/g)||[]).length,5);assert.equal((fig.match(/scope="row"/g)||[]).length,5);
 for(const id of ['supplements','segments','product-positioning','reishi','extracts','north-america','us-canada','method']) assert.ok(html.includes(`id="${id}"`),id);
 assert.match(html,/class="market-toc"/);assert.equal((html.match(/<figure/g)||[]).length,4);
 assert.ok(html.indexOf('id="implications"')<html.indexOf('id="method"'));
 assert.match(html,lang==='zh'?/115.3/:/11.53/);
});

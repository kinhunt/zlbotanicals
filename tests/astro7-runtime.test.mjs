import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('local Node selection satisfies Astro7 supported runtime',()=>{
 assert.ok(Number(readFileSync('.nvmrc','utf8').trim().split('.')[0])>=22);
});
test('research table captions preserve the frozen pre-migration inline boundary',()=>{
 for(const prefix of ['', 'zh/']) {
 const html=readFileSync(`dist/${prefix}plant-extracts/ingredients/ginseng/index.html`,'utf8');
 assert.match(html,prefix ? /· 对照表2<span/ : /· Comparison2<span/);
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const profiles=JSON.parse(readFileSync('src/data/science-profiles.json','utf8'));
for(const lang of ['en','zh']) for(const p of profiles) test(`${lang}/${p.id}: separate reader resources and family links`,()=>{
 const h=readFileSync(`dist/${lang==='zh'?'zh/':''}plant-extracts/ingredients/${p.id}/index.html`,'utf8');
 assert.match(h,/ingredient-reader/);assert.match(h,/data-related-resources/);assert.match(h,/data-resource-cards/);assert.match(h,/data-family-reading/);
 assert.ok(h.indexOf('data-related-resources')<h.indexOf('data-family-reading'));
 assert.ok(h.includes(`href="/${lang==='zh'?'zh/':''}products/${p.id}"`));
});

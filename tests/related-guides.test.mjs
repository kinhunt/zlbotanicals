import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
test('product templates include localized related guides by exact product slug',()=>{
 for(const prefix of ['', 'zh/']){
 const text=readFileSync(`src/pages/${prefix}products/[slug].astro`,'utf8');
 assert.ok(text.includes('<RelatedGuides'),'related guide component missing');
 assert.ok(text.includes('productSlug={product.slug.replace'), 'pass actual product slug');
 }
});
test('all industry pages connect recommendations and relevant guides',()=>{
 for(const prefix of ['', 'zh/'])for(const industry of ['beverages','food','cosmetics','nutraceuticals']){
 const text=readFileSync(`src/pages/${prefix}solutions/${industry}.astro`,'utf8');
 assert.ok(text.includes(`<IndustryResources lang="${prefix?'zh':'en'}" industry="${industry}"`),`${prefix}${industry}`);
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import sharp from 'sharp';
for(const lang of ['en','zh']) test(`${lang}: four product-specific optimized formulation images`,async()=>{
 const h=readFileSync(`dist${lang==='zh'?'/zh':''}/plant-extracts/ingredients/turmeric/index.html`,'utf8');
 const cards=[...h.matchAll(/<article data-formulation-concept="([^"]+)"[^>]*>(.*?)<\/article>/gs)];
 assert.equal(cards.length,4);
 const paths=[];
 for(const [,id,card] of cards){
  const tag=card.match(/<img[^>]+>/)?.[0];assert.ok(tag,`${id} has image`);
  const src=tag.match(/src="([^"]+)"/)[1];paths.push(src);assert.ok(src.includes(id));
  assert.match(tag,/loading="lazy"/);assert.match(tag,/decoding="async"/);
  const alt=tag.match(/alt="([^"]+)"/)[1];assert.ok(alt.length>12);if(lang==='zh')assert.match(alt,/[一-鿿]/);
  const bytes=readFileSync('public'+src),meta=await sharp(bytes).metadata();
  assert.equal(meta.format,'webp');assert.ok(meta.width>=700&&meta.height>=450);assert.ok(bytes.length<150000);
  assert.ok(tag.includes(`width="${meta.width}"`));assert.ok(tag.includes(`height="${meta.height}"`));
  assert.match(card,lang==='zh'?/应用示意（AI绘制）/:/application concept \(AI illustration\)/);
 }
 assert.equal(new Set(paths).size,4);
});

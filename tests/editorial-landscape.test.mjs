import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import sharp from 'sharp';
const packs=JSON.parse(readFileSync('src/data/ingredient-reader-packs.json'));
test('all 33 editorial plan files decode to true landscape images with exact metadata',async()=>{
 let count=0;
 for(const pack of packs) for(const plan of pack.plans){
  const image=plan.image;
  const {info}=await sharp(`public${image.src}`).raw().toBuffer({resolveWithObject:true});
  assert.ok(info.width>info.height,`${pack.productId}/${plan.id}: decoded ${info.width}x${info.height} is not landscape`);
  assert.ok(info.width/info.height>=1.49&&info.width/info.height<=1.79);
  assert.equal(info.width,image.width);assert.equal(info.height,image.height);count++;
 }
 assert.equal(count,33);
});

test('all retained original public rasters remain byte-identical and landscape except archived plan sources',async()=>{
 const {createHash}=await import('node:crypto');
 const baseline=JSON.parse(readFileSync('docs/evidence/editorial-landscape/baseline-public-rasters.json'));
 assert.equal(baseline.length,65);assert.equal(baseline.filter(x=>x.id.startsWith('public/images/products/')).length,12);
 for(const row of baseline){
  assert.equal(createHash('sha256').update(readFileSync(row.id)).digest('hex'),row.sha256,row.id);
  if(!row.id.includes('/ingredient-plans/')){
   const {info}=await sharp(row.id).raw().toBuffer({resolveWithObject:true});assert.ok(info.width>info.height,row.id);
  }
 }
});


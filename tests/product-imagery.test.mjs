import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
const slugs = readdirSync('src/content/products/en').filter(f=>f.endsWith('.md')).map(f=>f.slice(0,-3));
test('all 24 product entries and rendered pages preserve the original rich WebP artwork',()=>{
 assert.equal(slugs.length,12);
 for(const lang of ['en','zh']) for(const slug of slugs){
  const image=`/images/products/${slug}.webp`;
  const source=readFileSync(`src/content/products/${lang}/${slug}.md`,'utf8');
  assert.match(source,new RegExp(`^image: ${image}$`,'m'),`${lang}/${slug}: original artwork`);
  const page=readFileSync(`dist/${lang==='zh'?'zh/':''}products/${slug}/index.html`,'utf8');
  assert.ok(page.includes(`src="${image}"`));
  assert.ok(!page.includes('/images/products/diagrams/'));
  assert.ok(readFileSync(`public${image}`).length>10000);
 }
});
test('home and catalog retain original product visuals and visible concept boundaries',()=>{
 for(const prefix of ['','zh/']) for(const route of ['', 'products/']){
  const page=readFileSync(`dist/${prefix}${route}index.html`,'utf8');
  const images=[...page.matchAll(/<img[^>]+src="\/images\/products\/[^>]+>/g)];
  assert.equal(images.length,route?12:6);
  for(const [image] of images){ assert.ok(image.includes('.webp')); assert.ok(image.includes('object-cover')); }
  assert.ok(page.includes(prefix?'图片为概念插画':'Images are concept illustrations'));
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const html=p=>readFileSync(`dist/${p}/index.html`,'utf8');
test('header exposes five groups and curated product categories, not twelve ingredient links',()=>{
 for(const lang of ['', 'zh/']){
  const page=html(`${lang}products`);
  const nav=page.match(/<nav aria-label="(?:Main navigation|主导航)"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav,'desktop navigation exists');
  assert.equal((nav.match(/class="relative group"/g)||[]).length,5);
  assert.ok(nav.includes(`href="/${lang}research"`));
  assert.ok(!nav.includes(`href="/${lang}products/green-tea"`));
  assert.ok(nav.includes(`href="/${lang}products/botanical-extracts"`));
 }
});

test('Research hubs separate five populated reading paths and method-aware market analysis from paper library',()=>{
 for(const lang of ['', 'zh/']){
  assert.ok(existsSync(`dist/${lang}research/index.html`),'new research hub');
  const page=html(`${lang}research`);
  for(const id of ['ingredients','applications','papers','market','news']) assert.ok(page.includes(`id="${id}"`));
  for(const path of ['plant-extracts/ingredients','plant-extracts/applications','resources/research','resources/news']) assert.ok(page.includes(`href="/${lang}${path}"`));
  assert.ok(page.includes('wits.worldbank.org'));
  assert.ok(page.includes('CIF') && page.includes('FOB'));
  assert.ok(!page.includes('CAGR'));
 }
});

test('three botanical science profiles have material boundaries, citations and ID-matched product/paper links in both languages',()=>{
 for(const lang of ['', 'zh/']) for(const slug of ['green-tea','centella-asiatica','monk-fruit']){
  const path=`${lang}plant-extracts/ingredients/${slug}`;
  assert.ok(existsSync(`dist/${path}/index.html`),`science profile ${path}`);
  const page=html(path);
  for(const id of ['identity','specification','process','application','evidence']) assert.ok(page.includes(`id="${id}"`),id);
  assert.ok(page.includes(`href="/${lang}products/${slug}"`));
  assert.ok(page.includes('data-research-card'));
  const cards=[...page.matchAll(/data-research-card data-ingredient="([^"]+)"/g)];
  assert.ok(cards.length && cards.every(c=>c[1].split(' ').includes(slug)));
  assert.ok(page.includes('href="#science-source-'));
  assert.ok(html(`${lang}products/${slug}`).includes(`href="/${path}"`),'product links back to its science profile');
  assert.ok(html(`${lang}research`).includes(`href="/${path}"`),'hub links to profile');
 }
});

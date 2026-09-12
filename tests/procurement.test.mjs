import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
const read = p => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const formSource = () => existsSync(new URL('../src/components/QuoteForm.astro', import.meta.url)) ? read('src/components/QuoteForm.astro') : read('src/pages/request-quote.astro');

test('quote form preserves recipient and labels procurement fields with honest external processing', () => {
 const s = formSource();
 assert.match(s, /action="https:\/\/formsubmit.co\/info@zlbotanicals.com"/);
 for (const name of ['request','market','first_order_quantity','certifications','desired_delivery','product','company','name','email','country','phone','volume','application','requirements']) {
  assert.match(s, new RegExp(`name="${name}"`));
  assert.match(s, new RegExp(`id="${name}"`));
  assert.match(s, new RegExp(`for="${name}"`));
 }
 assert.match(s, /mailto:info@zlbotanicals.com/);
 assert.match(s, /third-party/);
 assert.doesNotMatch(s, /name="_next"|innerHTML|preventDefault|guaranteed response/i);
});

test('URL prefill treats product as plain text and only accepts supported request types', () => {
 const script = formSource().match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1];
 assert.ok(script, 'prefill script exists');
 function run(search) {
  const fields = { product: {value:''}, request: {value:'quote', options:['quote','sample','COA','TDS','certification','application'].map(value=>({value}))} };
  vm.runInNewContext(script, {URLSearchParams, window:{location:{search}}, document:{getElementById:id=>fields[id]}});
  return fields;
 }
 const product = '<img src=x onerror=alert(1)> & 人参';
 const fields = run('?product='+encodeURIComponent(product)+'&request=COA');
 assert.equal(fields.product.value, product);
 assert.equal(fields.request.value, 'COA');
 assert.equal(run('?request=evil').request.value, 'quote');
 assert.equal(run('').product.value, '');
});

test('localized product CTAs carry the actual product and supported request types', () => {
 for(const prefix of ['', 'zh/'])for(const id of ['green-tea','centella-asiatica','monk-fruit','ginseng','reishi-mushroom','ginkgo-biloba','grape-seed','goji-berry','licorice-root','stevia','resveratrol']){
  const page=read(`dist/${prefix}products/${id}/index.html`);
  for(const request of ['quote','sample','TDS','COA']){
   const links=[...page.matchAll(/href="([^"]*request-quote[^"]*)"/g)].map(m=>new URL(m[1].replace(/&(?:amp|#x26|#38);/g,'&'),'https://zlbotanicals.com'));
   assert.ok(links.some(u=>u.pathname===`/${prefix}request-quote`&&u.searchParams.get('request')===request&&u.searchParams.get('product')));
  }
 }
});

test('downloads provide an actual bilingual checklist and scoped document request routes', () => {
 for (const prefix of ['', 'zh/']) {
  const s = read(`dist/${prefix}resources/downloads/index.html`);
  assert.match(s, /\/downloads\/sourcing-checklist.txt/);
  for (const type of ['COA','TDS','certification']) assert.ok(s.includes(`request=${type}`));
  assert.doesNotMatch(s.split('<main')[1].split('</main>')[0], /2025|2.5 MB|800 KB/);
 }
 const s = read('dist/downloads/sourcing-checklist.txt');
 assert.match(s, /Ingredient sourcing brief/); assert.match(s, /原料采购简报/);
});

test('FAQ and industry pages replace unsupported promises with evaluation guidance', () => {
 for (const prefix of ['', 'zh/']) {
  const faq = read(`src/pages/${prefix}resources/faq.astro`);
  assert.doesNotMatch(faq, /100g|25-100|2-3 weeks|4-6 weeks|We hold GMP|100克/);
  assert.match(faq, /request-quote/);
  for (const industry of ['beverages','food','cosmetics','nutraceuticals']) {
   const s = read(`src/pages/${prefix}solutions/${industry}.astro`);
   assert.match(s, /Troubleshooting|排查/);
   assert.match(s, /request-quote/);
  }
 }
});

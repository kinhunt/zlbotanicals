import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
test('ODM quote prefill carries bounded plain-text concept and application without changing provider',()=>{
 const source=fs.readFileSync('src/components/QuoteForm.astro','utf8');
 assert.ok(source.includes('value="odm"'));
 const fields={request:{value:'quote',options:[{value:'odm'}]},product:{value:''},concept:{value:''},application:{value:''}};
 const dangerous='<img src=x onerror=alert(1)>';
 vm.runInNewContext(source.match(/<script is:inline>([\s\S]*?)<\/script>/)[1],{URLSearchParams,window:{location:{search:'?request=odm&concept='+encodeURIComponent(dangerous)+'&application='+('a'.repeat(900))}},document:{getElementById:id=>fields[id]}});
 assert.equal(fields.request.value,'odm');assert.equal(fields.concept.value,dangerous);assert.equal(fields.application.value.length,500);
 assert.match(source,/for="concept"/);
});
test('navigation and product dossiers expose only relevant concept links',()=>{
 const nav=fs.readFileSync('src/data/site-navigation.ts','utf8');
 for(const route of ['/odm','/resources/research','/resources/news'])assert.ok(nav.includes(route));
 const html=fs.readFileSync('dist/products/green-tea/index.html','utf8');
 assert.ok(html.includes('/odm/late-evening-botanical-beverage'));
 assert.ok(!fs.readFileSync('dist/products/ginkgo-biloba/index.html','utf8').includes('/odm/late-evening-botanical-beverage'));
});
const slugs=['late-evening-botanical-beverage','everyday-unsweetened-botanical-tea','botanical-refreshing-beverage'];
test('ODM hub and three concepts align in both languages with conservative schema and quote context',()=>{
 for(const prefix of ['','zh/']) for(const slug of ['',...slugs]){
  const file=`dist/${prefix}odm/${slug?slug+'/':''}index.html`;
  assert.ok(fs.existsSync(file),file);
  const html=fs.readFileSync(file,'utf8');
  assert.ok(html.includes('id="capability-boundaries"'));
  assert.ok(html.includes(`/${prefix}request-quote?`));
  assert.ok(html.includes('request=odm'));
  assert.ok(html.includes('hreflang="zh-CN"'));
  assert.ok(html.includes('"@type":"WebPage"'));
  assert.ok(!html.includes('"@type":"Product"'));
  if(slug)assert.ok(html.includes('id="research"'));
 }
});

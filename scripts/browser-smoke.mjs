// Run with PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node scripts/browser-smoke.mjs [baseURL]
import {mkdirSync, writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.argv[2] || 'http://127.0.0.1:4321';
const output = process.env.QA_OUTPUT || '/tmp/zl-browser-qa';
mkdirSync(output, {recursive:true});
const browser = await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];
try {
 for (const width of [390,1440]) {
  const page = await browser.newPage({viewport:{width,height:900}});
  const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  for (const path of ['/','/zh/','/products/green-tea','/zh/products/centella-asiatica','/request-quote','/zh/request-quote','/resources/downloads']) {
   const response=await page.goto(base+path,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,`${path} HTTP`);
   assert.equal(await page.locator('h1').count(),1,`${path} h1`);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
   assert.equal(overflow,false,`${path} horizontal overflow at ${width}`);
   await page.screenshot({path:`${output}/${width}-${path.replaceAll('/','_')||'home'}.png`,fullPage:true});
   results.push({path,width,status:response.status(),overflow});
  }
  if(width===390){
   await page.goto(base+'/'); await page.locator('#open-menu').click();
   await page.waitForTimeout(350);
   assert.ok(await page.locator('#mobile-menu').evaluate(el=>el.getBoundingClientRect().x>=-1 && el.getBoundingClientRect().x<1));
   await page.locator('#close-menu').click();
  }
  for(const prefix of ['', '/zh']){
   const product='Green Tea & <test> "sample"';
   await page.goto(base+prefix+'/request-quote?product='+encodeURIComponent(product)+'&request=sample');
   assert.equal(await page.locator('[name="product"]').inputValue(),product);
   assert.equal(await page.locator('form').evaluate(el=>el.checkValidity()),false,'empty form must be invalid');
   const labels=await page.locator('form').evaluate(form=>Array.from(form.querySelectorAll('input:not([type="hidden"]),select,textarea')).filter(el=>el.type!=='submit' && !(el.labels?.length || el.getAttribute('aria-label'))).map(el=>el.name));
   assert.deepEqual(labels,[],'all form fields have accessible labels');
   // Inspect form data and validation locally. No external submission or fake buyer record.
   await page.locator('[name="company"]').fill('Internal QA — not submitted');
   await page.locator('[name="name"]').fill('Internal QA');
   await page.locator('[name="email"]').fill('invalid-email');
   assert.equal(await page.locator('[name="email"]').evaluate(el=>el.validity.valid),false);
   await page.locator('[name="email"]').fill('qa@example.invalid');
   await page.locator('[name="country"]').fill('Internal test');
   await page.locator('[name="market"]').fill('Internal test');
   await page.locator('[name="first_order_quantity"]').fill('25 kg');
   assert.equal(await page.locator('form').evaluate(el=>el.checkValidity()),true,'complete form should pass native validation');
   const fields=await page.locator('form').evaluate(el=>Object.fromEntries(new FormData(el)));
   assert.equal(fields.product,product);
   assert.equal(fields.request,'sample');
   assert.equal(fields.first_order_quantity,'25 kg');
   assert.equal(await page.locator('form').getAttribute('action'),'https://formsubmit.co/info@zlbotanicals.com');
   await page.goto(base+prefix+'/request-quote?request=unsupported');
   assert.equal(await page.locator('[name="request"]').inputValue(),'quote','unsupported types retain default');
  }
  assert.deepEqual(errors,[],`browser JS errors at ${width}`);
  await page.close();
 }
 writeFileSync(output+'/results.json',JSON.stringify({base,results,passed:true,formSubmission:'NOT SENT; inbox delivery not verified'},null,2));
 console.log(JSON.stringify({passed:true,views:results.length,output,formSubmission:'NOT SENT; inbox delivery not verified'}));
} finally { await browser.close(); }

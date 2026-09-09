import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4321';
const meta=JSON.parse(readFileSync('src/data/ingredient-knowledge.json'));
const data=JSON.parse(readFileSync('src/data/deep-ingredients.json'));
const out=process.env.QA_OUTPUT||'/tmp/zl-deep-research-qa';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});const results=[];
try{
 for(const js of [true,false]) for(const width of [360,390,768,1440]){
  const context=await browser.newContext({javaScriptEnabled:js,viewport:{width,height:900}});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const k of meta) for(const lang of ['en','zh']){
   const route=`${lang==='zh'?'/zh':''}${k.canonicalPath}`;
   assert.equal((await page.goto(base+route)).status(),200);await page.evaluate(()=>document.fonts.ready);
   const doc=page.locator('[data-deep-research]');assert.equal(await doc.getAttribute('data-deep-research'),lang);
   const expected=data.find(d=>d.productId===k.productId).content[lang];
   const tables=doc.locator('table');assert.equal(await tables.count(),expected.flatMap(s=>s.blocks).filter(b=>b.type==='table').length);
   for(const table of await tables.all()){
    assert.ok(await table.locator('caption').count());assert.ok(await table.locator('th[scope="col"]').count()>1);
    const region=table.locator('..');assert.equal(await region.getAttribute('tabindex'),'0');
   }
   for(const link of await doc.locator('a[href^="#"]').all()){
    const target=await link.getAttribute('href');assert.equal(await page.locator(target).count(),1,target);
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${route} ${width}`);
   await tables.first().scrollIntoViewIfNeeded();await tables.first().locator('..').focus();
   if(width===360) {
    const region=tables.first().locator('..');
    assert.ok(await region.evaluate(el=>el.scrollWidth>el.clientWidth));
    await page.keyboard.press('ArrowRight');
   }
   if(js&&[390,1440].includes(width)&&['turmeric','green-tea','resveratrol'].includes(k.productId)) await page.screenshot({path:`${out}/${k.productId}-${lang}-${width}.png`});
   results.push({route,lang,width,js,tables:await tables.count()});
  }
  assert.deepEqual(errors,[]);await context.close();
 }
 writeFileSync(`${out}/results.json`,JSON.stringify({passed:true,results},null,2));console.log(JSON.stringify({passed:true,pages:results.length,out}));
}finally{await browser.close();}

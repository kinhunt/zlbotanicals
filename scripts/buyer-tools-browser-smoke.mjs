import assert from 'node:assert/strict';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:4331';
const out=process.env.QA_OUTPUT||'/tmp/zl-buyer-tools-qa';mkdirSync(out,{recursive:true});
const data=JSON.parse(readFileSync('src/data/buyer-tools.json','utf8'));
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});const results=[];let submissions=0;
try{
 for(const width of [390,768,1024,1440])for(const lang of ['en','zh']){
 const prefix=lang==='zh'?'/zh':'';const page=await browser.newPage({viewport:{width,height:900}});const errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.route('**/formsubmit.co/**',r=>{submissions++;return r.abort();});
 for(const route of ['/resources/downloads','/products','/products/green-tea','/odm','/resources/research']){
 assert.equal((await page.goto(base+prefix+route)).status(),200);await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${lang} ${width} ${route}`);
 if(route==='/resources/downloads'){
 for(const tool of data.tools){
 const section=page.locator('#'+tool.id);assert.ok(await section.isVisible());
 const [download]=await Promise.all([page.waitForEvent('download'),section.locator('[data-brief-download]').click()]);
 assert.equal(download.suggestedFilename(),`${tool.id}-${lang}.md`);const text=readFileSync(await download.path(),'utf8');
 for(const field of tool.sections.flatMap(s=>s.fields))assert.ok(text.includes(field[lang]));
 assert.ok(text.includes(data.notice[lang]));
 }
 await page.locator('#sourcing-checklist').screenshot({path:`${out}/${lang}-${width}-brief.png`});
 await page.emulateMedia({media:'print'});assert.ok(await page.locator('#formula-transfer-checklist').isVisible());assert.equal(await page.locator('[data-brief-download]').first().isVisible(),false);await page.emulateMedia({media:'screen'});
 }
 if(route==='/products/green-tea')await page.locator('img[src*="diagrams"]').screenshot({path:`${out}/${lang}-${width}-diagram.png`});
 }
 await page.goto(base+prefix+'/products/green-tea');await page.locator('[data-buyer-brief]').click();assert.equal(new URL(page.url()).hash,'#sourcing-checklist');
 for(const id of ['odm-concept-brief','formula-transfer-checklist']){await page.goto(base+prefix+'/odm');await page.locator(`[data-buyer-brief][href$="#${id}"]`).click();assert.equal(new URL(page.url()).hash,'#'+id);assert.ok(await page.locator('#'+id).isVisible());}
 assert.deepEqual(errors,[]);results.push({lang,width,downloads:3,print:true,paths:true});await page.close();
 }
 for(const lang of ['en','zh']){
 const prefix=lang==='zh'?'/zh':'';const page=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:900}});
 await page.goto(base+prefix+'/resources/downloads');assert.equal(await page.locator('[data-brief-download]:visible').count(),3);
 await page.goto(base+prefix+'/resources/research');const total=Number(await page.locator('[data-research-library]').getAttribute('data-research-total'));assert.equal(await page.locator('[data-research-card]:visible').count(),total);assert.ok(await page.locator('[data-research-corpus]').isVisible());await page.close();
 }
 assert.equal(submissions,0);const result={passed:true,base,results,noJavaScript:['en','zh'],submissions};writeFileSync(out+'/results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await browser.close();}

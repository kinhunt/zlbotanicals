// Bounded next-round regression: only two confirmed topics + fixed citrus control.
// Run BASE_URL=http://127.0.0.1:8971 node regression-red.mjs; nonzero is genuine RED.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const DIR=path.dirname(fileURLToPath(import.meta.url));
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'/tmp/zl-browser/node_modules/playwright/index.mjs');
const base=process.env.BASE_URL||'http://127.0.0.1:8971';
if(!['127.0.0.1','localhost'].includes(new URL(base).hostname))throw Error('Local-only');
const fixtures=JSON.parse(fs.readFileSync(path.join(DIR,'../tests/fixtures/responsive-mobile-labels.json')));
const compact=s=>s.replace(/\s+/g,'');
const browser=await chromium.launch({headless:true});const results=[];
for(const width of [320,390,1440])for(const js of [true,false]){
 const ctx=await browser.newContext({viewport:{width,height:844},javaScriptEnabled:js});
 await ctx.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin&&['GET','HEAD'].includes(r.request().method())?r.continue():r.abort());
 for(const f of fixtures){const page=await ctx.newPage();const rec={route:f.route,width,js,failures:[],cells:[]};
 try{
  const response=await page.goto(base+f.route,{waitUntil:'load'});if(response.status()!==200)throw Error('HTTP '+response.status());
  for(const t of f.tables){const table=page.locator('main table').nth(t.index);rec.tableSnapshot=await table.ariaSnapshot();
   if(width===1440){const headers=await table.getByRole('columnheader').allTextContents();if(JSON.stringify(headers.map(s=>s.trim()))!==JSON.stringify(t.headers))rec.failures.push('desktop headers differ');if(await table.locator('.mobile-label:visible').count())rec.failures.push('desktop duplicate labels visible');}
   for(const c of t.cells){const cell=table.locator('tbody td').nth(c.index);const snap=await cell.ariaSnapshot();const labelOK=compact(snap).includes(compact(c.label));const valueOK=compact(snap).includes(compact(c.value));rec.cells.push({...c,snapshot:snap,labelOK,valueOK});if(width<640&&!labelOK)rec.failures.push('missing accessible label: '+c.label+' cell '+c.index);if(!valueOK)rec.failures.push('missing value: '+c.value);}
  }
 }catch(e){rec.failures.push('HARNESS/HTTP: '+String(e));}
 rec.passed=rec.failures.length===0;results.push(rec);console.log(JSON.stringify({route:rec.route,width,js,passed:rec.passed,failures:rec.failures.length}));await page.close();}
 await ctx.close();
}
await browser.close();const summary={cases:results.length,passed:results.filter(r=>r.passed).length,failed:results.filter(r=>!r.passed).length,harnessErrors:results.filter(r=>r.failures.some(f=>f.startsWith('HARNESS/HTTP'))).length};
fs.writeFileSync(process.env.RESULT_FILE||'responsive-a11y-results.json',JSON.stringify({summary,results},null,2));console.log(JSON.stringify(summary));if(summary.failed)process.exitCode=1;

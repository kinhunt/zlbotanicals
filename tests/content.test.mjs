import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const base = fileURLToPath(new URL('../src/content/', import.meta.url));
const entries = kind => ['en','zh'].flatMap(lang => readdirSync(`${base}${kind}/${lang}`).filter(f=>f.endsWith('.md')).map(file=>({lang,file,text:readFileSync(`${base}${kind}/${lang}/${file}`,'utf8')})));
test('all 24 product guides distinguish indicative specifications from written confirmation',()=>{
 const pages=entries('products'); assert.equal(pages.length,24);
 for(const {lang,file,text} of pages){
  if(file==='turmeric.md'){
   const built=readFileSync(`dist/${lang==='zh'?'zh/':''}products/turmeric/index.html`,'utf8');
   // Owner confirmed turmeric supply scope on 2026-09-12; order-specific terms remain quoted.
   assert.match(built,lang==='en'?/confirmed for the selected specification/:/在报价中确认/);
   assert.match(text,/COA/); assert.match(text,/request-quote/);
   assert.doesNotMatch(text,/in stock|free samples|免费样品|现货供应|符合.*药典/i);
   continue;
  }
  assert.match(text,lang==='en'?/indicative[\s\S]*written confirmation/i:/参考[\s\S]*书面确认/,file);
  assert.match(text,lang==='en'?/batch-specific COA/:/批次 COA/,file);
  assert.doesNotMatch(text,/extracts comply with|complies with USP|Conforms to USP|Clinical|临床有效|符合.*药典|27×|20-50x/i,file);
  assert.match(text,new RegExp(`${lang === "en" ? "" : "/zh"}/contact`),file);
 }
});

test('solutions are unvalidated concepts with no serving formula or commercial promises',()=>{
 const pages=entries('solutions'); assert.equal(pages.length,14);
 for(const {lang,file,text} of pages){
  assert.match(text,lang==='en'?/not a validated commercial formula/:/并非经过验证的商业配方/,file);
  assert.match(text,lang==='en'?/finished-goods manufacturing/:/成品代工/,file);
  assert.doesNotMatch(text,/Recommended Formula|推荐配方|\d+\s*(mg|μg|毫克)|5[-–]7|287%|benzodiazepine|27×|20-50x|Clinical safety|好吃又有效/i,file);
  assert.match(text,new RegExp(`${lang === "en" ? "" : "/zh"}/products/`),file);
  assert.match(text,new RegExp(`${lang === "en" ? "" : "/zh"}/contact`),file);
 }
});

test('buyer guides replace unsupported market reports and use the actual update date',()=>{
 const pages=entries('blog'); assert.equal(pages.length,10);
 for(const {lang,file,text} of pages){
  assert.match(text,/publishDate: ["']?2026-09-07/,file);
  assert.match(text,/category: ["']?ingredient-spotlight/,file);
  assert.doesNotMatch(text,/287%|22\.5%|18\.7%|CAGR|WHO|Mordor|Grand View|市场爆发|爆发式增长|sources:\s*\n\s*-/,file);
  assert.match(text,lang==='en'?/buyer|procurement/i:/采购/,file);
 }
});
test('English markdown uses root routes and concise product summaries',()=>{
 for(const kind of ['products','solutions','blog']) for(const {lang,file,text} of entries(kind)){
  if(lang==='en') assert.doesNotMatch(text,/\]\(\/en\//,file);
  if(kind==='products') assert.ok(text.match(/^description: (.*)$/m)[1].length < 220,file);
 }
});

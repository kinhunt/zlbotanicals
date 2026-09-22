import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root='docs/evidence/astaxanthin/';
const read=p=>readFileSync(p,'utf8');
const inline=s=>s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2">$1</a>');
const undo=s=>s.replace(/<a href="#astaxanthin-ref-(\d+)">\[\d+\]<\/a>/g,'[$1]');
test('astaxanthin preserves every approved paragraph and all six within-study numerical cells',()=>{
 for(const lang of ['en','zh']) {
  const file=`src/content/blog/${lang}/astaxanthin-beverage-stability.md`;
  assert.ok(existsSync(file),`missing approved astaxanthin article ${lang}`);
  const original=read(root+`review/reviewed/draft.${lang}.md`).split('\n').slice(1).join('\n').split('\n## Sources\n')[0].trim();
  let actual=undo(read(file).split('---')[2].split(lang==='en'?'\n## Sources\n':'\n## 来源\n')[0].trim());
  const table=original.match(/^\|.*(?:\n\|.*)+/m)[0];
  const cells=table.split('\n').slice(2).flatMap(r=>r.split('|').slice(1,-1).map(x=>x.trim()));
  for(const cell of cells) assert.ok(actual.includes(inline(cell)),`missing cell ${cell}`);
  actual=actual.replace(/<table[\s\S]*?<\/table>/,table);
  assert.equal(actual,original);
 }
});
test('astaxanthin renders scoped research routes, original citation identities and meaningful discovery',()=>{
 for(const lang of ['en','zh']) {
  const prefix=lang==='zh'?'zh/':'';
  const path=`dist/${prefix}resources/blog/astaxanthin-beverage-stability/index.html`;
  assert.ok(existsSync(path),'missing rendered astaxanthin');
  const html=read(path);
  assert.ok(html.includes('astaxanthin-reader'));
  assert.ok(!html.includes('Interested in our botanical extracts?')&&!html.includes('对我们的植物提取物感兴趣'));
  for(const n of [1,2,3]) {
   assert.equal((html.match(new RegExp(`id="astaxanthin-ref-${n}"`,'g'))||[]).length,1);
   assert.ok(html.includes(`href="#astaxanthin-ref-${n}"`));
  }
  assert.equal((html.match(/<tr>/g)||[]).length,4);
  assert.equal((html.match(/class="mobile-label"/g)||[]).length,6);
  for(const source of ['research','resources/application-guides','resources/blog','solutions/beverages']) assert.ok(read(`dist/${prefix}${source}/index.html`).includes('/resources/blog/astaxanthin-beverage-stability'),source);
 }
});
test('astaxanthin evidence and baseline public bytes preserved',()=>{
 const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
 for(const [path,hash] of Object.entries(JSON.parse(read(root+'source-manifest.json')))) assert.equal(sha(root+path),hash,path);
 for(const [path,hash] of Object.entries(JSON.parse(read(root+'baseline-public.json')))) assert.equal(sha(path),hash,path);
});

test('astaxanthin rendered paragraphs retain approved qualifiers and exact original source URLs',async()=>{
 const {createMarkdownProcessor}=await import('@astrojs/markdown-remark');
 const processor=await createMarkdownProcessor({smartypants:false});
 const plain=s=>s.replace(/<[^>]+>/g,'').replace(/&#(?:x([0-9a-f]+)|(\d+));/gi,(_,h,d)=>String.fromCodePoint(parseInt(h||d,h?16:10))).replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
 for(const lang of ['en','zh']) {
  const original=read(root+`review/reviewed/draft.${lang}.md`);
  const approved=(await processor.render(original.split('\n## Sources\n')[0])).code;
  const actual=read(`dist/${lang==='zh'?'zh/':''}resources/blog/astaxanthin-beverage-stability/index.html`);
  for(const match of approved.matchAll(/<(h[123]|p)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g)) assert.ok(plain(actual).includes(plain(match[2])),plain(match[2]));
  for(const [n,pmc] of ['PMC7070863','PMC7913560','PMC11381615'].entries()) assert.ok(actual.includes(`id="astaxanthin-ref-${n+1}">[${n+1}] <a href="https://www.ebi.ac.uk/europepmc/webservices/rest/${pmc}/fullTextXML"`));
 }
});

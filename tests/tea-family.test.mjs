import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {parse} from 'parse5';
const read=p=>readFileSync(p,'utf8');
const nodes=(n,p)=>[...(p(n)?[n]:[]),...(n.childNodes??[]).flatMap(c=>nodes(c,p))];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const norm=s=>s.replace(/\s+/g,' ').trim();
for(const lang of ['en','zh']) test(`${lang}: tea family is a distinct complete commercial hub`,()=>{
 const path=`dist/${lang==='zh'?'zh/':''}products/tea-extracts/index.html`;
 assert.ok(existsSync(path),'distinct tea-family route exists');
 const html=read(path),doc=parse(html), main=nodes(doc,n=>attr(n,'data-tea-family')!==undefined)[0];
 assert.ok(main,'commercial hub container');
 const approved=read(`docs/evidence/tea-family/revision/tea-family-sales.${lang}.md`).split('---\n')[2].split('\n## Sources\n')[0];
 const plain=approved.replace(/^#+ /gm,'').replace(/^\|[-|]+\|$/gm,'').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/\[\d+\]/g,'').replace(/\*\*/g,'');
 for(const line of plain.split('\n').filter(l=>l.trim())){
  const parts=line.startsWith('|')?line.split('|').filter(s=>s.trim()):[line.replace(/^- /,'')];
  for(const part of parts) assert.ok(norm(text(main)).replace(/\[\d+\]/g,'').includes(norm(part)),`approved prose: ${part}`);
 }
 assert.equal(nodes(main,n=>n.tagName==='h1').length,1);
 assert.ok(html.includes(`https://zlbotanicals.com/${lang==='zh'?'zh/':''}products/tea-extracts`));
 assert.ok(!text(main).includes('**'),'no literal bold markers');
 for(const id of [5,6,7,8,19]){
  assert.equal(nodes(main,n=>attr(n,'id')===`tea-family-ref-${id}`).length,1);
  assert.ok(nodes(main,n=>attr(n,'href')===`#tea-family-ref-${id}`).length);
 }
 const ids=nodes(doc,n=>attr(n,'id')).map(n=>attr(n,'id'));assert.equal(ids.length,new Set(ids).size);
});

for(const lang of ['en','zh']) test(`${lang}: all three commercial CTAs carry supported editable tea context`,()=>{
 const prefix=lang==='zh'?'/zh':'';
 const doc=parse(read(`dist${prefix}/products/tea-extracts/index.html`));
 const main=nodes(doc,n=>attr(n,'data-tea-family')!==undefined)[0];
 const links=nodes(main,n=>n.tagName==='a'&&attr(n,'href')?.includes('/request-quote'));
 assert.equal(links.length,3);
 for(const [i,link] of links.entries()){
  const url=new URL(attr(link,'href'),'https://zlbotanicals.com');
  assert.equal(url.pathname,`${prefix}/request-quote`);
  assert.equal(url.searchParams.get('request'),i===1?'sample':'quote');
  assert.equal(url.searchParams.get('source'),'catalog');
  assert.equal(url.searchParams.get('product'),lang==='zh'?'茶提取物：绿茶、红茶与乌龙茶':'Tea extracts: green, black and oolong');
  assert.ok(url.searchParams.get('form').length>10);
  assert.deepEqual([...url.searchParams.keys()].sort(),['form','product','request','source']);
 }
});

for(const prefix of ['','/zh']) test(`${prefix||'en'}: contextual discovery from three existing commercial entries`,()=>{
 for(const path of ['/products','/products/green-tea','/solutions/beverages']){
  const doc=parse(read(`dist${prefix}${path}/index.html`));
  const links=nodes(doc,n=>attr(n,'href')===`${prefix}/products/tea-extracts`);
  assert.equal(links.length,1,`${path} has one bounded family link`);
  assert.match(text(links[0]),prefix?/绿茶.*红茶.*乌龙茶/:/green.*black.*oolong/i);
 }
});

test('tea evidence preserves original hashes, complete 23 quotes and ledger identities',async()=>{
 const {createHash}=await import('node:crypto');
 const root='docs/evidence/tea-family/';
 const hashes=JSON.parse(read(root+'original-hashes.json'));
 for(const [path,hash] of Object.entries(hashes)) assert.equal(createHash('sha256').update(readFileSync(root+path)).digest('hex'),hash,path);
 const claims=JSON.parse(read(root+'claim-evidence.json'));assert.equal(claims.length,23);
 for(const claim of claims) assert.ok(norm(read(root+claim.evidence_file)).includes(norm(claim.quote)),`complete quote ${claim.source_id}`);
 const ledger=JSON.parse(read(root+'revision/ledger.json')).sources;
 for(const prefix of ['','/zh']){
  const doc=parse(read(`dist${prefix}/products/tea-extracts/index.html`));
  for(const id of [5,6,7,8,19]){
   const ref=nodes(doc,n=>attr(n,'id')===`tea-family-ref-${id}`)[0];
   assert.equal(attr(nodes(ref,n=>n.tagName==='a')[0],'href'),ledger.find(s=>s.id===id).url);
  }
 }
});

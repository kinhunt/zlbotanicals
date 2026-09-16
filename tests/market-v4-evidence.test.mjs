import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const dir='docs/evidence/market-v4/';
const read=p=>readFileSync(dir+p,'utf8');
const pinned={"approved-sources.json": "da2a3e50e7e305e0d8dc3cb0d8792572c08d599617596a58634dd1ee4919a440", "approved-source-manifest.json": "fce144ffaec634f8e04d78661b539943581a7e75d07a585bfa25c181ff5538ad"};
for(const [file,hash] of Object.entries(pinned))assert.equal(createHash('sha256').update(readFileSync(dir+file)).digest('hex'),hash,'approved ledger changed');
const approved=JSON.parse(read('approved-sources.json')).sources;
const sources=JSON.parse(read('sources.json'));
const manifest=JSON.parse(read('approved-source-manifest.json'));
assert.equal(sources.length,30);
assert.equal(new Set(sources.map(s=>s.id)).size,30);
const normalize=t=>t.replace(/\s+/gu,' ').trim();
for(const expected of approved)test(`source ${expected.id}: complete approved quotes with hashed archive support`,()=>{
 const actual=sources.find(s=>s.id===expected.id);
 assert.deepEqual(actual.excerpts,expected.quotes.map(q=>q.text),'full approved quotes, no fixed-length cuts or omitted supplement');
 assert.ok(actual.archives?.length,'self-contained archives');
 const original=manifest.find(m=>m.id===expected.id);
 const expectedArchives=[{file:original.evidence_file,sha256:original.sha256},...(original.independent_checks||[]).map(c=>({file:c.file,sha256:c.sha256}))];
 assert.deepEqual(actual.archives.map(a=>({file:a.file,sha256:a.sha256})),expectedArchives);
 for(const key of ['url','title','accessed'])assert.equal(actual[key],expected[key]);
 for(const archive of actual.archives){assert.equal(createHash('sha256').update(readFileSync(dir+archive.file)).digest('hex'),archive.sha256);}
 assert.equal(actual.quoteLocations.length,actual.excerpts.length);
 actual.excerpts.forEach((quote,i)=>{
  const location=actual.quoteLocations[i];
  assert.ok(actual.archives.some(a=>a.file===location.file));
  assert.ok(normalize(read(location.file)).includes(normalize(quote)),`quote ${i} fully matches archive after whitespace normalization only`);
 });
});

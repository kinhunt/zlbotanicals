#!/usr/bin/env node
/** Offline, draft-only import of Europe PMC core JSON or editorial/news arrays. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
try {
 const args=process.argv.slice(2),opts={};
 for(let i=0;i<args.length;i+=2){
  if(!['--input','--output'].includes(args[i]) || !args[i+1] || args[i+1].startsWith('--')) throw Error('Use --input FILE [--output FILE]. Publication is intentionally unsupported.');
  opts[args[i]]=args[i+1];
 }
 if(!opts['--input']) throw Error('--input is required; this CLI never fetches or publishes automatically.');
 const output=path.resolve(opts['--output'] || path.join(root,'editorial-drafts/inbox.json'));
 fs.mkdirSync(path.dirname(output),{recursive:true});
 const resolved=path.join(fs.realpathSync(path.dirname(output)),path.basename(output));
 const relative=path.relative(root,resolved);
 if(['src','public','dist'].some(d=>relative===d || relative.startsWith(d+path.sep)) || (fs.existsSync(output) && fs.lstatSync(output).isSymbolicLink())) throw Error('Output must remain outside publishable source/public/dist trees and cannot be a symlink.');
 const raw=JSON.parse(fs.readFileSync(opts['--input'],'utf8'));
 const input=Array.isArray(raw)?raw:raw.resultList?.result;
 if(!Array.isArray(input)) throw Error('Expected an array or Europe PMC core resultList.result.');
 const existing=fs.existsSync(output)?JSON.parse(fs.readFileSync(output,'utf8')):[];
 if(!Array.isArray(existing)) throw Error('Existing draft file must be an array.');
 const published=['research','news'].flatMap(n=>{const p=path.join(root,`src/data/${n}.json`);return fs.existsSync(p)?JSON.parse(fs.readFileSync(p,'utf8')):[];});
 const keys=r=>{
  const doi=String(r.doi||'').replace(/^https?:\/\/(?:dx\.)?doi\.org\//i,'').trim().toLowerCase();
  const pmid=String(r.pmid || (r.source==='MED'?r.id:'') || '').trim();
  const out=[];if(doi)out.push('doi:'+doi);if(/^\d+$/.test(pmid))out.push('pmid:'+pmid);
  if(r.kind==='news' && r.sourceUrl){const u=new URL(r.sourceUrl);if(u.protocol!=='https:')throw Error('News source must be HTTPS');u.hash='';out.push('url:'+u.href);}
  if(!out.length)throw Error('Each record requires DOI, numeric PMID or a news source URL.');return out;
 };
 const seen=new Set(published.flatMap(keys));const drafts=[];
 for(const r of [...existing,...input]){
  const ids=keys(r);if(ids.some(k=>seen.has(k))){ids.forEach(k=>seen.add(k));continue;}
  if(!r.title)throw Error('Record title required');ids.forEach(k=>seen.add(k));
  drafts.push({...r,id:ids[0],status:'draft',reviewRequired:true,reviewedAt:null,reviewScope:null});
 }
 const temporary=output+`.${process.pid}.tmp`;
 fs.writeFileSync(temporary,JSON.stringify(drafts,null,2)+'\n',{flag:'wx'});fs.renameSync(temporary,output);
 console.log(`${drafts.length} unique draft records saved to ${output}; no website files changed. Human bilingual, source and claim review required.`);
} catch(error){console.error(error.message);process.exitCode=1;}

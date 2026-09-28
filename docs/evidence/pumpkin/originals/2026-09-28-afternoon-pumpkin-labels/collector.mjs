import { defineScript } from '/usr/local/lib/node_modules/browserman-cli/cli/local-scripts.js';
export default defineScript({id:'local.pumpkin-initial-gallery',name:'pumpkin-initial-gallery',version:'1.0.0',apiVersion:'^1.0.0',actions:{read:{params:{type:'object',required:['asin'],properties:{asin:{type:'string'}}},async run(ctx,p){
if(!['B01N7CLYX7','B0CWVTCT7G','B0FWJGBPWM'].includes(p.asin))throw Error('Not authorized ASIN');
await ctx.navigate('https://www.amazon.com/dp/'+p.asin);
let r;
for(let tries=0;tries<8;tries++){
r=await ctx.evaluate(`(()=>{
const expected=${JSON.stringify(p.asin)};
const url=location.href, title=document.querySelector('#productTitle')?.textContent.trim()||'',asin=document.querySelector('input#ASIN')?.value||'';
if(!new URL(url).hostname.endsWith('amazon.com')|| !url.includes('/'+expected))throw Error('CONTEXT INTERFERENCE: URL mismatch '+url);
if(asin&&asin!==expected)throw Error('CONTEXT INTERFERENCE: ASIN mismatch '+asin);
const scripts=[...document.scripts].map(s=>s.textContent);
let rawInitial=null,sourcePrefix=null;
for(const s of scripts){const c=s.indexOf('colorImages');if(c<0)continue;const m=/["']initial["']\\s*:/.exec(s.slice(c));if(!m)continue;const start=s.indexOf('[',c+m.index+m[0].length);if(start<0)continue;
let depth=0,q=null,esc=false,end=-1;
for(let i=start;i<s.length;i++){let ch=s[i];if(q){if(esc)esc=false;else if(ch==='\\\\')esc=true;else if(ch===q)q=null;}else{if(ch==='"'||ch==="'")q=ch;else if(ch==='[')depth++;else if(ch===']'&&--depth===0){end=i+1;break;}}}
if(end>0){rawInitial=s.slice(start,end);sourcePrefix=s.slice(c,start);break;}}
const initial=rawInitial?JSON.parse(rawInitial):null;
return {capturedAt:new Date().toISOString(),expectedAsin:expected,url,title,asin,documentTitle:document.title,canonical:document.querySelector('link[rel=canonical]')?.href,validated:asin===expected&&!!title,initial,rawInitial,sourcePrefix,bullets:document.querySelector('#feature-bullets')?.innerText||'',details:document.querySelector('#productDetails_detailBullets_sections1')?.innerText||'',overview:document.querySelector('#productOverview_feature_div')?.innerText||''};})()`);
if(r.validated&&r.initial?.length)return r;
await new Promise(resolve=>setTimeout(resolve,1250));
}
throw Error('Incomplete exact-ASIN title/gallery after bounded wait '+JSON.stringify(r));
}}}});

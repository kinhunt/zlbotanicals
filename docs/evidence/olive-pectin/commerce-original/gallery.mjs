import { defineScript } from '/usr/local/lib/node_modules/browserman-cli/cli/local-scripts.js';
export default defineScript({id:'research.olive-initial-gallery',name:'olive-initial-gallery',version:'1.0.0',apiVersion:'^1.0.0',actions:{read:{params:{type:'object',properties:{asin:{type:'string'}},required:['asin']},async run(ctx,p){
if(!/^[A-Z0-9]{10}$/.test(p.asin))throw Error('Invalid ASIN');
await ctx.navigate('https://www.amazon.com/dp/'+p.asin);
let r;
for(let i=0;i<8;i++){
r=await ctx.evaluate(`JSON.stringify((()=>{const asin=document.querySelector('input#ASIN')?.value; const title=document.querySelector('#productTitle')?.innerText; const scripts=Array.from(document.scripts).map(s=>s.textContent);let initial=null;for(const s of scripts){const at=s.indexOf("'colorImages'");if(at<0)continue;const sub=s.slice(at);const mt=sub.match(/['"]initial['"]\\s*:\\s*/);if(!mt)continue;const start=sub.indexOf('[',mt.index);let depth=0,quoted=false,esc=false;for(let j=start;j<sub.length;j++){const c=sub[j];if(quoted){if(esc)esc=false;else if(c.charCodeAt(0)===92)esc=true;else if(c==='"')quoted=false;}else if(c==='"')quoted=true;else if(c==='[')depth++;else if(c===']'&&--depth===0){try{initial=JSON.parse(sub.slice(start,j+1))}catch(e){}break;}}if(initial)break;}return {url:location.href,asin,title,initial,selectedSize:document.querySelector('#variation_size_name')?.innerText,important:document.querySelector('#important-information')?.innerText,bullets:document.querySelector('#feature-bullets')?.innerText};})())`);
if(typeof r==='string')r=JSON.parse(r);
if(r?.asin===p.asin&&r.title&&r.initial?.length)return r;
await new Promise(resolve=>setTimeout(resolve,1000));
}throw Error('Exact ASIN/title/initial gallery unavailable: '+JSON.stringify(r));
}}}});

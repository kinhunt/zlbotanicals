import { defineScript } from '/usr/local/lib/node_modules/browserman-cli/cli/local-scripts.js';
export default defineScript({id:'local.monkfruit-labels',name:'monkfruit-labels',version:'1.0.0',apiVersion:'^1.0.0',actions:{read:{params:{type:'object',properties:{}},async run(ctx){
const rows=[];
for(const asin of ['B07B4D9TF3','B0CP9Q47LK','B098H7XWQ6','B0CLBVY6VY']){
await ctx.navigate('https://www.amazon.com/dp/'+asin);
let ready; for(let attempt=0;attempt<20;attempt++){ready=await ctx.evaluate(`({ready:!!document.querySelector('#productTitle')&&[...document.scripts].some(x=>x.textContent.includes('colorImages')),blocked:/enter the characters you see below|sorry, we just need to make sure|robot check/i.test(document.body.innerText)})`);if(ready.ready||ready.blocked)break;await new Promise(r=>setTimeout(r,500));}
const data=await ctx.evaluate(`(() => {const text=document.body.innerText; if(/enter the characters you see below|sorry, we just need to make sure|robot check/i.test(text))return {blocked:true,url:location.href};const scripts=[...document.scripts].map(x=>x.textContent).filter(t=>t.includes('colorImages')&&t.includes('initial'));return {url:location.href,asin:document.querySelector('input#ASIN')?.value,title:document.querySelector('#productTitle')?.innerText,ingredients:document.querySelector('#important-information')?.innerText,galleryScripts:scripts,hero:document.querySelector('#landingImage')?.getAttribute('data-a-dynamic-image')};})()`);
rows.push({requestedAsin:asin,...data});if(data.blocked||data.asin!==asin)break;
}
return {rows};
}}}});

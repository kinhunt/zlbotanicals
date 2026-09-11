import {z} from 'astro:content';
import {existsSync} from 'node:fs';
import raw from './ingredient-reader-packs.json';
import {deepIngredients} from './deep-ingredients';
import {readerSectionOrder} from './ingredient-reader.mjs';
const text=z.string().trim().min(1).refine(t=>!/<\/?[a-z][^>]*>/i.test(t),'Raw HTML is not allowed');
const localized=z.object({en:text,zh:text}).strict();
const block=z.discriminatedUnion('type',[
 z.object({type:z.literal('paragraph'),text}).strict(),z.object({type:z.literal('heading'),text}).strict(),
 z.object({type:z.literal('list'),items:z.array(text).min(1)}).strict(),
 z.object({type:z.literal('table'),headers:z.array(text).min(2),rows:z.array(z.array(text)).min(1)}).strict(),
]);
const blocks=z.array(block).min(1);
const section=z.object({id:text,heading:text,blocks,legacy:z.boolean().optional()}).strict();
const image=z.object({src:z.string().regex(/^\/images\/ingredient-plans\/landscape\/[a-z0-9-]+\/[a-z0-9-]+\.webp$/),caption:localized,alt:localized,width:z.number().int().positive(),height:z.number().int().positive()}).strict();
const plan=z.object({id:z.string().regex(/^[a-z0-9-]+$/),title:localized,content:z.object({en:blocks,zh:blocks}).strict(),image:image.optional()}).strict();
const schema=z.array(z.object({productId:text,approval:z.literal('editorial-reviewed'),sourcePack:text,content:z.object({en:z.array(section),zh:z.array(section)}).strict(),plans:z.array(plan).length(3),sources:z.array(z.object({id:z.number().int().positive(),title:text,url:z.string().url().startsWith('https://'),accessed:z.string().regex(/^\d{4}-\d{2}-\d{2}$/)}).strict()).min(1)}).strict()).length(11);
export const ingredientReaderPacks=schema.parse(raw);
const expected=deepIngredients.filter(p=>p.productId!=='turmeric').map(p=>p.productId).sort();
if(ingredientReaderPacks.map(p=>p.productId).sort().join()!==expected.join()) throw new Error('Rollout must account for all eleven ingredients');
for(const p of ingredientReaderPacks){
 const ids=new Set(p.sources.map(s=>s.id));
 if(ids.size!==p.sources.length) throw new Error(`Duplicate rollout sources: ${p.productId}`);
 if(new Set(p.plans.map(s=>s.id)).size!==3) throw new Error(`Duplicate plans: ${p.productId}`);
 const legacy=new Set(deepIngredients.find(k=>k.productId===p.productId)!.sources.map(s=>s.id));
 const check=(bs:z.infer<typeof blocks>,sources:Set<number>)=>{
  for(const b of bs){
   if(b.type==='table'&&b.rows.some(row=>row.length!==b.headers.length)) throw new Error(`Ragged rollout table: ${p.productId}`);
   for(const m of JSON.stringify(b).matchAll(/\[(\d+)\]/g)) if(!sources.has(Number(m[1]))) throw new Error(`Unresolved rollout citation: ${p.productId}/${m[1]}`);
  }
 };
 for(const lang of ['en','zh'] as const){
  if(p.content[lang].map(s=>s.id).join()!==readerSectionOrder.join()) throw new Error(`Rollout order: ${p.productId}/${lang}`);
  for(const s of p.content[lang]) check(s.blocks,s.legacy?legacy:ids);
  for(const plan of p.plans) check(plan.content[lang],ids);
 }
 for(const plan of p.plans) if(plan.image&&!existsSync(`public${plan.image.src}`)) throw new Error(`Missing approved illustration: ${plan.image.src}`);
}
export function getIngredientReaderPack(id:string){return ingredientReaderPacks.find(p=>p.productId===id);}

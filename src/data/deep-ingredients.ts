import {z} from 'astro:content';
import raw from './deep-ingredients.json';
import {productIds, dimensions} from './ingredient-knowledge';
const text=z.string().min(1);
const block=z.discriminatedUnion('type',[
 z.object({type:z.literal('paragraph'),text}).strict(),
 z.object({type:z.literal('heading'),text}).strict(),
 z.object({type:z.literal('list'),items:z.array(text).min(1)}).strict(),
 z.object({type:z.literal('table'),headers:z.array(text).min(2),rows:z.array(z.array(text)).min(1)}).strict(),
]);
const sections=z.array(z.object({id:z.enum(dimensions),heading:text,blocks:z.array(block).min(1)}).strict()).length(5);
const schema=z.array(z.object({productId:z.enum(productIds),group:z.enum(['a','b','c','d']),pack:text,content:z.object({en:sections,zh:sections}).strict(),sources:z.array(z.object({id:z.number().int().positive(),title:text,url:z.string().url().refine(s=>s.startsWith('https://')),accessed:text,scope:text}).strict()).min(1)}).strict()).length(12);
export const deepIngredients=schema.parse(raw);
export type ResearchBlock=z.infer<typeof block>;
if(new Set(deepIngredients.map(k=>k.productId)).size!==12) throw new Error('Duplicate deep ingredient');
for(const k of deepIngredients){
 const sources=new Set(k.sources.map(s=>s.id));
 if(sources.size!==k.sources.length) throw new Error(`Duplicate sources: ${k.productId}`);
 for(const lang of ['en','zh'] as const){
  if(k.content[lang].map(s=>s.id).join()!==dimensions.join()) throw new Error(`Invalid dimension order: ${k.productId}`);
  for(const section of k.content[lang]){
   for(const b of section.blocks) if(b.type==='table' && b.rows.some(r=>r.length!==b.headers.length)) throw new Error(`Ragged table: ${k.productId}`);
   for(const m of JSON.stringify(section.blocks).matchAll(/\[(\d+)\]/g)) if(!sources.has(Number(m[1]))) throw new Error(`Unresolved citation: ${k.productId}/${m[1]}`);
  }
 }
}
export function getDeepIngredient(id:string){
 const entry=deepIngredients.find(k=>k.productId===id);
 if(!entry) throw new Error(`Unknown deep ingredient: ${id}`);
 return entry;
}

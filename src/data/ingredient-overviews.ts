import {z} from 'astro:content';
import raw from './ingredient-overviews.json';
import {productIds} from './ingredient-knowledge';
import {getDeepIngredient} from './deep-ingredients';
const bilingual=z.object({en:z.string().min(30),zh:z.string().min(15)}).strict();
const schema=z.array(z.object({productId:z.enum(productIds),identity:bilingual,components:bilingual,applications:bilingual,endProducts:bilingual,processChoices:bilingual,citations:z.array(z.number().int().positive()).min(1)}).strict()).length(12);
export const overviews=schema.parse(raw);
if(new Set(overviews.map(o=>o.productId)).size!==12) throw new Error('Duplicate ingredient overview');
for(const o of overviews) for(const id of o.citations) if(!getDeepIngredient(o.productId).sources.some(s=>s.id===id)) throw new Error(`Unknown overview source: ${o.productId}/${id}`);
export function getIngredientOverview(id:string){
 const result=overviews.find(o=>o.productId===id);
 if(!result) throw new Error(`Missing ingredient overview: ${id}`);
 return result;
}

import { z } from 'astro:content';
import raw from './ingredient-knowledge.json';
import sources from './ingredient-sources.json';
import profiles from './science-profiles.json';
import dossiers from './product-dossiers.json';
export const productIds = ['green-tea','turmeric','reishi-mushroom','ginseng','ginkgo-biloba','grape-seed','goji-berry','licorice-root','centella-asiatica','monk-fruit','stevia','resveratrol'] as const;
export type ProductId = typeof productIds[number];
export const dimensions = ['processes','equipment','applications','standards','insights'] as const;
export type Dimension = typeof dimensions[number];
const bilingual = z.object({en:z.string().min(12),zh:z.string().min(6)}).strict();
const block = z.object({heading:bilingual,text:z.object({en:z.string().min(180),zh:z.string().min(65)}).strict(),citations:z.array(z.number().int().positive()).min(1)}).strict();
const schema = z.array(z.object({productId:z.enum(productIds),canonicalPath:z.string(),name:bilingual,sections:z.object({processes:block,equipment:block,applications:block,standards:block,insights:block}).strict()}).strict()).length(productIds.length);
export const knowledge = schema.parse(raw);
if (new Set(knowledge.map(k=>k.productId)).size !== productIds.length) throw new Error('Duplicate ingredient knowledge ID');
for (const k of knowledge) {
 const expected=`/plant-extracts/ingredients/${k.productId}`;
 if (!profiles.some(p=>p.id===k.productId)) throw new Error(`Missing science profile: ${k.productId}`);
 if(k.canonicalPath!==expected || !dossiers.some(d=>d.slug===k.productId)) throw new Error(`Invalid canonical ingredient mapping: ${k.productId}`);
 for(const d of dimensions) if(k.sections[d].citations.some(n=>!sources.some(s=>s.id===n))) throw new Error(`Unknown ingredient source: ${k.productId}/${d}`);
}
export function getIngredientKnowledge(id:string) {
 const result=knowledge.find(k=>k.productId===id);
 if(!result) throw new Error(`Unknown product ID: ${id}`);
 return result;
}
export const dimensionLabels:Record<Dimension,{en:string;zh:string}> = {
 processes:{en:'Extraction processes',zh:'提取工艺'}, equipment:{en:'Equipment guide',zh:'提取设备指南'}, applications:{en:'Applications',zh:'植物提取物应用'}, standards:{en:'Standards & regulations',zh:'标准与法规参考'}, insights:{en:'Research & industry observations',zh:'研究与行业观察'}
};

import { getCollection as loadCollection, type CollectionKey, type CollectionEntry } from 'astro:content';
// Migration contract derived from HTTP200 production DOM (2026-09-21), not local enumeration.
// Existing locale-specific catalog order is retained; new IDs append lexically.
const productOrder = {
  "en": [
    "centella-asiatica",
    "ginkgo-biloba",
    "ginseng",
    "goji-berry",
    "grape-seed",
    "green-tea",
    "licorice-root",
    "monk-fruit",
    "reishi-mushroom",
    "resveratrol",
    "stevia",
    "turmeric"
  ],
  "zh": [
    "centella-asiatica",
    "ginkgo-biloba",
    "ginseng",
    "goji-berry",
    "grape-seed",
    "green-tea",
    "licorice-root",
    "monk-fruit",
    "reishi-mushroom",
    "stevia",
    "resveratrol",
    "turmeric"
  ]
} as const;
const homepageBlogTieOrder = ['tea-haze-diagnosis','stevia-temporal-sensory'];
function rank(id: string, order: readonly string[]) { const n=order.indexOf(id); return n < 0 ? order.length : n; }
export async function getOrderedCollection<C extends CollectionKey>(name:C, filter?: (entry:CollectionEntry<C>)=>boolean):Promise<CollectionEntry<C>[]> {
 const entries=await loadCollection(name,filter);
 const solutionOrder = ['botanical-sweetener-rtd','deep-sleep-capsule','green-tea-energy-sparkling','liver-support-gummy','reishi-sleep-gummy','turmeric-golden-latte','white-peach-sparkling'];
 return entries.sort((a,b)=>{
  const [la,ia]=a.id.split('/'), [lb,ib]=b.id.split('/');
  if(la!==lb) return la.localeCompare(lb);
  const order=name==='products' ? productOrder[la as 'en'|'zh'] : name==='blog' ? homepageBlogTieOrder : la==='zh' ? solutionOrder : [...solutionOrder].sort();
  return rank(ia,order)-rank(ib,order) || a.id.localeCompare(b.id);
 });
}

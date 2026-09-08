import type { useTranslations } from '../i18n/utils';
export interface NavigationLink { label: string; href: string; children?: NavigationLink[]; }
/** Commercial paths first; deeper resource categories remain on their hub. */
export function getSiteNavigation(t: ReturnType<typeof useTranslations>, localize: (path: string) => string, products: NavigationLink[] = []): NavigationLink[] {
  const link = (key: string, path: string): NavigationLink => ({label:t(key as Parameters<typeof t>[0]),href:localize(path)});
  return [
    {...link('nav.products','/products'), children:[...products,link('nav.productsHerbal','/products/herbal-powders'),link('nav.productsCustom','/products/custom-formulation')]},
    link('nav.odm','/odm'),
    {...link('nav.plantExtracts','/plant-extracts'),children:['basics','ingredients','processes','equipment','applications','standards','insights'].map(s=>link(`nav.extracts_${s}`,`/plant-extracts/${s}`))},
    {...link('nav.resources','/resources'),children:[link('nav.research','/resources/research'),link('nav.news','/resources/news'),link('nav.solutions','/solutions'),link('nav.resourcesAll','/resources/blog'),link('nav.resourcesFaq','/resources/faq')]},
    {...link('nav.quality','/quality'),children:[link('nav.aboutCertifications','/about/certifications'),link('nav.resourcesDownloads','/resources/downloads'),link('nav.qualityRequestDocuments','/request-quote?request=TDS')]},
    {...link('nav.about','/about'),children:[link('nav.aboutStory','/about/story'),link('nav.aboutFacility','/about/facility'),link('nav.contact','/contact')]},
  ];
}

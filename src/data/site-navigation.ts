import type { useTranslations } from '../i18n/utils';
export interface NavigationLink { label: string; href: string; children?: NavigationLink[]; }
/** Five buyer-facing groups; the catalog owns individual product discovery. */
export function getSiteNavigation(t: ReturnType<typeof useTranslations>, localize: (path: string) => string): NavigationLink[] {
 const link = (key: string, path: string): NavigationLink => ({label:t(key as Parameters<typeof t>[0]),href:localize(path)});
 return [
  {...link('nav.products','/products'),children:[link('nav.productsBotanical','/products/botanical-extracts'),link('nav.productsHerbal','/products/herbal-powders'),link('nav.productsCustom','/products/custom-formulation')]},
  {...link('nav.odm','/odm'),children:[link('nav.solutions','/solutions'),link('nav.solutionsBeverages','/solutions/beverages'),link('nav.solutionsCosmetics','/solutions/cosmetics')]},
  {...link('nav.researchHub','/research'),children:[link('nav.scienceIngredients','/plant-extracts/ingredients'),link('nav.scienceApplications','/plant-extracts/applications'),link('nav.research','/resources/research'),link('nav.marketInsights','/research#market'),link('nav.news','/resources/news'),link('nav.plantExtracts','/plant-extracts')]},
  {...link('nav.quality','/quality'),children:[link('nav.aboutCertifications','/about/certifications'),link('nav.resourcesDownloads','/resources/downloads'),link('nav.resourcesFaq','/resources/faq'),link('nav.qualityRequestDocuments','/request-quote?request=TDS')]},
  {...link('nav.about','/about'),children:[link('nav.aboutStory','/about/story'),link('nav.aboutFacility','/about/facility'),link('nav.contact','/contact')]},
 ];
}

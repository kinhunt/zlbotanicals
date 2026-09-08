import type { useTranslations } from '../i18n/utils';

export interface NavigationLink {
  label: string;
  href: string;
  children?: NavigationLink[];
}

/** One taxonomy for desktop navigation, mobile navigation and footer. */
export function getSiteNavigation(
  t: ReturnType<typeof useTranslations>,
  localize: (path: string) => string,
  products: NavigationLink[] = [],
): NavigationLink[] {
  return [
    { label: t('nav.plantExtracts'), href: localize('/plant-extracts'),
      children: ['basics','ingredients','processes','equipment','applications','standards','insights'].map(slug => ({label: t(`nav.extracts_${slug}`), href: localize(`/plant-extracts/${slug}`)})),
    },
    {
      label: t('nav.products'), href: localize('/products'),
      children: [
        ...products,
        { label: t('nav.productsHerbal'), href: localize('/products/herbal-powders') },
        { label: t('nav.productsCustom'), href: localize('/products/custom-formulation') },
      ],
    },
    {
      label: t('nav.solutions'), href: localize('/solutions'),
      children: [
        { label: t('nav.odm'), href: localize('/odm') },
        { label: t('nav.solutionsBeverages'), href: localize('/solutions/beverages') },
        { label: t('nav.solutionsNutraceuticals'), href: localize('/solutions/nutraceuticals') },
        { label: t('nav.solutionsCosmetics'), href: localize('/solutions/cosmetics') },
        { label: t('nav.solutionsFood'), href: localize('/solutions/food') },
      ],
    },
    {
      label: t('nav.resources'), href: localize('/resources'),
      children: [
        { label: t('nav.research'), href: localize('/resources/research') },
        { label: t('nav.news'), href: localize('/resources/news') },
        { label: t('nav.resourcesIngredients'), href: localize('/resources/ingredient-guides') },
        { label: t('nav.resourcesApplications'), href: localize('/resources/application-guides') },
        { label: t('nav.resourcesQuality'), href: localize('/resources/quality-guides') },
        { label: t('nav.resourcesSourcing'), href: localize('/resources/sourcing-guides') },
        { label: t('nav.resourcesFaq'), href: localize('/resources/faq') },
        { label: t('nav.resourcesDownloads'), href: localize('/resources/downloads') },
        { label: t('nav.resourcesAll'), href: localize('/resources/blog') },
      ],
    },
    {
      label: t('nav.quality'), href: localize('/quality'),
      children: [
        { label: t('nav.qualityProcess'), href: localize('/quality') },
        { label: t('nav.aboutCertifications'), href: localize('/about/certifications') },
        { label: t('nav.resourcesDownloads'), href: localize('/resources/downloads') },
        { label: t('nav.qualityRequestDocuments'), href: localize('/request-quote?request=TDS') },
      ],
    },
    {
      label: t('nav.about'), href: localize('/about'),
      children: [
        { label: t('nav.aboutStory'), href: localize('/about/story') },
        { label: t('nav.aboutFacility'), href: localize('/about/facility') },
      ],
    },
    { label: t('nav.contact'), href: localize('/contact') },
  ];
}

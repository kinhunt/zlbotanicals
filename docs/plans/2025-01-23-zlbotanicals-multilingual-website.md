# ZL Botanicals Multilingual Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a multilingual (English + Chinese) B2B website for ZL Botanicals using Astro + TailwindCSS with extensible i18n architecture.

**Architecture:** Subdirectory-based i18n (`/` for English, `/zh/` for Chinese). UI strings in JSON translation files, content in separate markdown files per language. Components receive `lang` prop and use translation utilities.

**Tech Stack:** Astro 4.x, TailwindCSS 3.x, TypeScript, Astro Content Collections

---

## Task 1: Initialize Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.js`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`

**Step 1: Create Astro project with TailwindCSS**

```bash
npm create astro@latest . -- --template minimal --typescript strict --install --no-git
```

Select defaults when prompted.

**Step 2: Add TailwindCSS integration**

```bash
npx astro add tailwind -y
```

**Step 3: Add sitemap integration**

```bash
npx astro add sitemap -y
```

**Step 4: Verify installation**

```bash
npm run dev
```

Expected: Dev server starts on localhost:4321

**Step 5: Stop dev server and commit**

```bash
git init
git add .
git commit -m "chore: initialize Astro project with TailwindCSS"
```

---

## Task 2: Configure TailwindCSS Theme

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/styles/global.css`

**Step 1: Update tailwind.config.js with brand colors and fonts**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4D3E',
          light: '#2D6A4F',
          dark: '#0F2F26',
        },
        accent: {
          DEFAULT: '#C9A227',
          light: '#D4B84A',
          dark: '#A68620',
        },
        cream: '#F5F1E6',
        'off-white': '#F8F7F4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
}
```

**Step 2: Update global.css with base styles**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700&display=swap');

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-sans text-gray-900 antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }
}

@layer components {
  .container-wide {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .section-padding {
    @apply py-16 md:py-24 lg:py-32;
  }
}
```

**Step 3: Commit**

```bash
git add tailwind.config.js src/styles/global.css
git commit -m "style: configure TailwindCSS theme with brand colors"
```

---

## Task 3: Set Up i18n Infrastructure

**Files:**
- Create: `src/i18n/config.ts`
- Create: `src/i18n/translations/en.json`
- Create: `src/i18n/translations/zh.json`
- Create: `src/i18n/utils.ts`

**Step 1: Create i18n config**

Create `src/i18n/config.ts`:

```typescript
export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}
```

**Step 2: Create English translations**

Create `src/i18n/translations/en.json`:

```json
{
  "site": {
    "name": "ZL Botanicals",
    "tagline": "Premium Botanical Extracts"
  },
  "nav": {
    "home": "Home",
    "about": "About",
    "aboutStory": "Our Story",
    "aboutFacility": "Facility Tour",
    "aboutCertifications": "Certifications",
    "products": "Products",
    "productsBotanical": "Botanical Extracts",
    "productsHerbal": "Herbal Powders",
    "productsCustom": "Custom Formulation",
    "applications": "Applications",
    "applicationsBeverages": "Beverages",
    "applicationsNutraceuticals": "Nutraceuticals",
    "applicationsCosmetics": "Cosmetics",
    "applicationsFood": "Food",
    "quality": "Quality",
    "resources": "Resources",
    "resourcesBlog": "Blog",
    "resourcesDownloads": "Downloads",
    "resourcesFaq": "FAQ",
    "contact": "Contact",
    "requestQuote": "Request Quote"
  },
  "hero": {
    "badge": "Since 1986 • Guangzhou, China",
    "title": "Rooted in Tradition.",
    "titleHighlight": "Refined for Tomorrow.",
    "subtitle": "Premium botanical extracts and natural ingredients for the global food, beverage, and wellness industries.",
    "ctaPrimary": "Explore Products",
    "ctaSecondary": "Request a Quote"
  },
  "trust": {
    "years": "Years Experience",
    "tons": "Tons Capacity",
    "lines": "GMP Lines",
    "countries": "Countries Served"
  },
  "about": {
    "subtitle": "Our Heritage",
    "title": "Nearly Four Decades of Botanical Excellence",
    "description": "Founded in 1986 in Guangzhou, China, ZL Botanicals has grown from a local herbal processing facility to a globally trusted supplier of premium botanical extracts. We combine traditional knowledge with modern technology to deliver consistent, high-quality natural ingredients to partners worldwide.",
    "link": "Learn Our Story"
  },
  "products": {
    "subtitle": "What We Offer",
    "title": "Our Product Range",
    "botanicalTitle": "Botanical Extracts",
    "botanicalDesc": "Standardized plant extracts with guaranteed active compound levels for consistent formulation results.",
    "herbalTitle": "Herbal Powders",
    "herbalDesc": "Fine-ground botanical powders processed under strict GMP conditions, preserving natural properties.",
    "customTitle": "Custom Formulation",
    "customDesc": "Tailored extraction and formulation services to meet your unique product specifications.",
    "viewProducts": "View Products",
    "learnMore": "Learn More"
  },
  "whyUs": {
    "subtitle": "Our Advantages",
    "title": "Why Partner With ZL Botanicals",
    "gmpTitle": "GMP Certified Production",
    "gmpDesc": "7 fully certified production lines ensuring pharmaceutical-grade quality standards.",
    "traceabilityTitle": "Full Traceability",
    "traceabilityDesc": "Complete supply chain transparency from raw material sourcing to final delivery.",
    "pricingTitle": "Competitive Pricing",
    "pricingDesc": "Direct manufacturer pricing without middleman markups.",
    "moqTitle": "Flexible MOQ",
    "moqDesc": "From sample quantities to bulk orders, we accommodate your needs.",
    "rdTitle": "R&D Support",
    "rdDesc": "Technical expertise to help develop custom formulations and applications.",
    "turnaroundTitle": "Fast Turnaround",
    "turnaroundDesc": "Efficient production and logistics for reliable delivery timelines."
  },
  "applications": {
    "subtitle": "Industries We Serve",
    "title": "Application Areas",
    "beverages": "Beverages",
    "nutraceuticals": "Nutraceuticals",
    "cosmetics": "Cosmetics & Beauty",
    "food": "Food Industry"
  },
  "cta": {
    "title": "Ready to Source Premium Botanical Ingredients?",
    "subtitle": "Get in touch with our team for product information, samples, or a custom quote.",
    "primary": "Request a Quote",
    "secondary": "Download Catalog"
  },
  "footer": {
    "description": "Your trusted partner for botanical excellence since 1986.",
    "products": "Products",
    "company": "Company",
    "resources": "Resources",
    "aboutUs": "About Us",
    "ourStory": "Our Story",
    "facility": "Facility",
    "careers": "Careers",
    "blog": "Blog",
    "downloads": "Downloads",
    "faq": "FAQ",
    "contactUs": "Contact Us",
    "support": "Support",
    "copyright": "© 2025 ZL Botanicals. All rights reserved.",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service"
  },
  "contact": {
    "title": "Contact Us",
    "subtitle": "Get in touch with our team",
    "form": {
      "company": "Company Name",
      "name": "Contact Person",
      "email": "Email",
      "phone": "Phone",
      "country": "Country",
      "inquiryType": "Inquiry Type",
      "message": "Message",
      "submit": "Send Message",
      "selectCountry": "Select a country",
      "selectType": "Select inquiry type",
      "typeGeneral": "General Inquiry",
      "typeProduct": "Product Information",
      "typeSample": "Sample Request",
      "typeQuote": "Quote Request"
    }
  },
  "common": {
    "learnMore": "Learn More",
    "viewAll": "View All",
    "readMore": "Read More",
    "getQuote": "Get Quote",
    "required": "Required"
  }
}
```

**Step 3: Create Chinese translations**

Create `src/i18n/translations/zh.json`:

```json
{
  "site": {
    "name": "振隆药业",
    "tagline": "优质植物提取物"
  },
  "nav": {
    "home": "首页",
    "about": "关于我们",
    "aboutStory": "品牌故事",
    "aboutFacility": "生产设施",
    "aboutCertifications": "资质认证",
    "products": "产品中心",
    "productsBotanical": "植物提取物",
    "productsHerbal": "草本粉末",
    "productsCustom": "定制配方",
    "applications": "应用领域",
    "applicationsBeverages": "饮料行业",
    "applicationsNutraceuticals": "保健品行业",
    "applicationsCosmetics": "化妆品行业",
    "applicationsFood": "食品行业",
    "quality": "品质保证",
    "resources": "资源中心",
    "resourcesBlog": "博客",
    "resourcesDownloads": "下载中心",
    "resourcesFaq": "常见问题",
    "contact": "联系我们",
    "requestQuote": "获取报价"
  },
  "hero": {
    "badge": "始于1986年 • 中国广州",
    "title": "根植传统，",
    "titleHighlight": "精研未来。",
    "subtitle": "为全球食品、饮料和健康产业提供优质植物提取物和天然原料。",
    "ctaPrimary": "探索产品",
    "ctaSecondary": "获取报价"
  },
  "trust": {
    "years": "年行业经验",
    "tons": "吨年处理能力",
    "lines": "条GMP生产线",
    "countries": "个服务国家"
  },
  "about": {
    "subtitle": "我们的传承",
    "title": "近四十年的植物提取专业经验",
    "description": "振隆药业成立于1986年，总部位于中国广州。从一家本地草药加工厂发展成为全球信赖的优质植物提取物供应商。我们将传统智慧与现代技术相结合，为全球合作伙伴提供稳定、高品质的天然原料。",
    "link": "了解我们的故事"
  },
  "products": {
    "subtitle": "产品与服务",
    "title": "产品系列",
    "botanicalTitle": "植物提取物",
    "botanicalDesc": "标准化植物提取物，活性成分含量稳定，确保配方效果一致。",
    "herbalTitle": "草本粉末",
    "herbalDesc": "在严格GMP条件下加工的细磨植物粉末，保留天然特性。",
    "customTitle": "定制配方",
    "customDesc": "根据您的独特产品规格，提供定制提取和配方服务。",
    "viewProducts": "查看产品",
    "learnMore": "了解更多"
  },
  "whyUs": {
    "subtitle": "我们的优势",
    "title": "为什么选择振隆药业",
    "gmpTitle": "GMP认证生产",
    "gmpDesc": "7条全认证生产线，确保制药级质量标准。",
    "traceabilityTitle": "全程可追溯",
    "traceabilityDesc": "从原料采购到最终交付的完整供应链透明度。",
    "pricingTitle": "价格优势",
    "pricingDesc": "厂家直供价格，无中间商加价。",
    "moqTitle": "灵活起订量",
    "moqDesc": "从样品到大批量订单，满足您的各种需求。",
    "rdTitle": "研发支持",
    "rdDesc": "专业技术团队协助开发定制配方和应用方案。",
    "turnaroundTitle": "快速交付",
    "turnaroundDesc": "高效的生产和物流体系，确保可靠的交货时间。"
  },
  "applications": {
    "subtitle": "服务行业",
    "title": "应用领域",
    "beverages": "饮料行业",
    "nutraceuticals": "保健品行业",
    "cosmetics": "化妆品行业",
    "food": "食品行业"
  },
  "cta": {
    "title": "准备采购优质植物原料？",
    "subtitle": "联系我们的团队，获取产品信息、样品或定制报价。",
    "primary": "获取报价",
    "secondary": "下载产品目录"
  },
  "footer": {
    "description": "自1986年以来，您值得信赖的植物提取物合作伙伴。",
    "products": "产品中心",
    "company": "关于公司",
    "resources": "资源中心",
    "aboutUs": "关于我们",
    "ourStory": "品牌故事",
    "facility": "生产设施",
    "careers": "加入我们",
    "blog": "博客",
    "downloads": "下载中心",
    "faq": "常见问题",
    "contactUs": "联系我们",
    "support": "技术支持",
    "copyright": "© 2025 振隆药业 版权所有",
    "privacy": "隐私政策",
    "terms": "服务条款"
  },
  "contact": {
    "title": "联系我们",
    "subtitle": "与我们的团队取得联系",
    "form": {
      "company": "公司名称",
      "name": "联系人",
      "email": "电子邮箱",
      "phone": "电话",
      "country": "国家/地区",
      "inquiryType": "咨询类型",
      "message": "留言内容",
      "submit": "发送消息",
      "selectCountry": "请选择国家/地区",
      "selectType": "请选择咨询类型",
      "typeGeneral": "一般咨询",
      "typeProduct": "产品信息",
      "typeSample": "样品申请",
      "typeQuote": "报价请求"
    }
  },
  "common": {
    "learnMore": "了解更多",
    "viewAll": "查看全部",
    "readMore": "阅读更多",
    "getQuote": "获取报价",
    "required": "必填"
  }
}
```

**Step 4: Create i18n utilities**

Create `src/i18n/utils.ts`:

```typescript
import { defaultLang, type Language } from './config';
import en from './translations/en.json';
import zh from './translations/zh.json';

const translations = { en, zh } as const;

type TranslationKeys = typeof en;

type NestedKeyOf<T, K extends string = ''> = T extends object
  ? {
      [P in keyof T & string]: T[P] extends object
        ? NestedKeyOf<T[P], K extends '' ? P : `${K}.${P}`>
        : K extends ''
        ? P
        : `${K}.${P}`;
    }[keyof T & string]
  : never;

type TranslationKey = NestedKeyOf<TranslationKeys>;

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((acc, part) => acc?.[part], obj) ?? path;
}

export function useTranslations(lang: Language) {
  return function t(key: TranslationKey): string {
    const translation = translations[lang];
    return getNestedValue(translation, key);
  };
}

export function getStaticPathsForLanguages() {
  return [{ params: { lang: undefined } }, { params: { lang: 'zh' } }];
}
```

**Step 5: Commit**

```bash
git add src/i18n/
git commit -m "feat: add i18n infrastructure with en/zh translations"
```

---

## Task 4: Create Base Layout

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css';
import { defaultLang, type Language } from '../i18n/config';
import { useTranslations } from '../i18n/utils';

interface Props {
  title: string;
  description?: string;
  lang?: Language;
}

const { title, description, lang = defaultLang } = Astro.props;
const t = useTranslations(lang);

const siteTitle = `${title} | ${t('site.name')}`;
const siteDescription = description || t('site.tagline');
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={siteDescription} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="alternate" hreflang="en" href="https://zlbotanicals.com/" />
    <link rel="alternate" hreflang="zh" href="https://zlbotanicals.com/zh/" />
    <title>{siteTitle}</title>
  </head>
  <body class="min-h-screen bg-white">
    <slot />
  </body>
</html>
```

**Step 2: Update index.astro to use layout**

Update `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home">
  <main class="container-wide section-padding">
    <h1 class="text-4xl font-display font-bold text-primary">
      ZL Botanicals
    </h1>
    <p class="mt-4 text-gray-600">
      Site is under construction.
    </p>
  </main>
</BaseLayout>
```

**Step 3: Verify dev server works**

```bash
npm run dev
```

Expected: Page loads with styled heading

**Step 4: Commit**

```bash
git add src/layouts/ src/pages/index.astro
git commit -m "feat: add BaseLayout with i18n support"
```

---

## Task 5: Create Header Component

**Files:**
- Create: `src/components/layout/Header.astro`
- Create: `src/components/layout/Navigation.astro`
- Create: `src/components/layout/MobileMenu.astro`
- Create: `src/components/common/LanguageSwitcher.astro`

**Step 1: Create LanguageSwitcher component**

Create `src/components/common/LanguageSwitcher.astro`:

```astro
---
import { languages, type Language, getLocalizedPath } from '../../i18n/config';

interface Props {
  currentLang: Language;
  currentPath: string;
}

const { currentLang, currentPath } = Astro.props;

// Remove language prefix from current path to get base path
const basePath = currentPath.replace(/^\/(zh)/, '') || '/';
---

<div class="relative group">
  <button
    class="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
    aria-label="Select language"
  >
    <span>{languages[currentLang]}</span>
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <div class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
    {Object.entries(languages).map(([code, name]) => (
      <a
        href={getLocalizedPath(basePath, code as Language)}
        class:list={[
          "block px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg",
          code === currentLang ? "text-primary font-medium" : "text-gray-700"
        ]}
      >
        {name}
      </a>
    ))}
  </div>
</div>
```

**Step 2: Create Navigation component**

Create `src/components/layout/Navigation.astro`:

```astro
---
import { type Language, getLocalizedPath } from '../../i18n/config';
import { useTranslations } from '../../i18n/utils';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = useTranslations(lang);

const navItems = [
  {
    label: t('nav.about'),
    href: getLocalizedPath('/about', lang),
    children: [
      { label: t('nav.aboutStory'), href: getLocalizedPath('/about/story', lang) },
      { label: t('nav.aboutFacility'), href: getLocalizedPath('/about/facility', lang) },
      { label: t('nav.aboutCertifications'), href: getLocalizedPath('/about/certifications', lang) },
    ],
  },
  {
    label: t('nav.products'),
    href: getLocalizedPath('/products', lang),
    children: [
      { label: t('nav.productsBotanical'), href: getLocalizedPath('/products/botanical-extracts', lang) },
      { label: t('nav.productsHerbal'), href: getLocalizedPath('/products/herbal-powders', lang) },
      { label: t('nav.productsCustom'), href: getLocalizedPath('/products/custom-formulation', lang) },
    ],
  },
  {
    label: t('nav.applications'),
    href: getLocalizedPath('/applications', lang),
    children: [
      { label: t('nav.applicationsBeverages'), href: getLocalizedPath('/applications/beverages', lang) },
      { label: t('nav.applicationsNutraceuticals'), href: getLocalizedPath('/applications/nutraceuticals', lang) },
      { label: t('nav.applicationsCosmetics'), href: getLocalizedPath('/applications/cosmetics', lang) },
      { label: t('nav.applicationsFood'), href: getLocalizedPath('/applications/food', lang) },
    ],
  },
  {
    label: t('nav.quality'),
    href: getLocalizedPath('/quality', lang),
  },
  {
    label: t('nav.resources'),
    href: getLocalizedPath('/resources', lang),
    children: [
      { label: t('nav.resourcesBlog'), href: getLocalizedPath('/resources/blog', lang) },
      { label: t('nav.resourcesDownloads'), href: getLocalizedPath('/resources/downloads', lang) },
      { label: t('nav.resourcesFaq'), href: getLocalizedPath('/resources/faq', lang) },
    ],
  },
  {
    label: t('nav.contact'),
    href: getLocalizedPath('/contact', lang),
  },
];
---

<nav class="hidden lg:flex items-center gap-8">
  {navItems.map((item) => (
    <div class="relative group">
      <a
        href={item.href}
        class="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors py-2"
      >
        {item.label}
        {item.children && (
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </a>

      {item.children && (
        <div class="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          {item.children.map((child) => (
            <a
              href={child.href}
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary first:rounded-t-lg last:rounded-b-lg"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  ))}
</nav>
```

**Step 3: Create MobileMenu component**

Create `src/components/layout/MobileMenu.astro`:

```astro
---
import { type Language, getLocalizedPath, languages } from '../../i18n/config';
import { useTranslations } from '../../i18n/utils';

interface Props {
  lang: Language;
  currentPath: string;
}

const { lang, currentPath } = Astro.props;
const t = useTranslations(lang);
const basePath = currentPath.replace(/^\/(zh)/, '') || '/';

const navItems = [
  {
    label: t('nav.about'),
    href: getLocalizedPath('/about', lang),
    children: [
      { label: t('nav.aboutStory'), href: getLocalizedPath('/about/story', lang) },
      { label: t('nav.aboutFacility'), href: getLocalizedPath('/about/facility', lang) },
      { label: t('nav.aboutCertifications'), href: getLocalizedPath('/about/certifications', lang) },
    ],
  },
  {
    label: t('nav.products'),
    href: getLocalizedPath('/products', lang),
    children: [
      { label: t('nav.productsBotanical'), href: getLocalizedPath('/products/botanical-extracts', lang) },
      { label: t('nav.productsHerbal'), href: getLocalizedPath('/products/herbal-powders', lang) },
      { label: t('nav.productsCustom'), href: getLocalizedPath('/products/custom-formulation', lang) },
    ],
  },
  {
    label: t('nav.applications'),
    href: getLocalizedPath('/applications', lang),
    children: [
      { label: t('nav.applicationsBeverages'), href: getLocalizedPath('/applications/beverages', lang) },
      { label: t('nav.applicationsNutraceuticals'), href: getLocalizedPath('/applications/nutraceuticals', lang) },
      { label: t('nav.applicationsCosmetics'), href: getLocalizedPath('/applications/cosmetics', lang) },
      { label: t('nav.applicationsFood'), href: getLocalizedPath('/applications/food', lang) },
    ],
  },
  { label: t('nav.quality'), href: getLocalizedPath('/quality', lang) },
  {
    label: t('nav.resources'),
    href: getLocalizedPath('/resources', lang),
    children: [
      { label: t('nav.resourcesBlog'), href: getLocalizedPath('/resources/blog', lang) },
      { label: t('nav.resourcesDownloads'), href: getLocalizedPath('/resources/downloads', lang) },
      { label: t('nav.resourcesFaq'), href: getLocalizedPath('/resources/faq', lang) },
    ],
  },
  { label: t('nav.contact'), href: getLocalizedPath('/contact', lang) },
];
---

<div id="mobile-menu" class="fixed inset-0 bg-white z-50 transform translate-x-full transition-transform duration-300 lg:hidden">
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between p-4 border-b">
      <span class="text-xl font-display font-bold text-primary">{t('site.name')}</span>
      <button id="close-menu" class="p-2" aria-label="Close menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto p-4">
      {navItems.map((item) => (
        <div class="mb-4">
          <a href={item.href} class="block py-2 text-lg font-medium text-gray-900">
            {item.label}
          </a>
          {item.children && (
            <div class="pl-4 mt-1 space-y-1">
              {item.children.map((child) => (
                <a href={child.href} class="block py-1 text-gray-600 hover:text-primary">
                  {child.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>

    <div class="p-4 border-t">
      <div class="flex gap-2 mb-4">
        {Object.entries(languages).map(([code, name]) => (
          <a
            href={getLocalizedPath(basePath, code as Language)}
            class:list={[
              "flex-1 py-2 text-center rounded-lg text-sm font-medium",
              code === lang
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            ]}
          >
            {name}
          </a>
        ))}
      </div>
      <a
        href={getLocalizedPath('/request-quote', lang)}
        class="block w-full py-3 bg-accent text-white text-center rounded-lg font-medium hover:bg-accent-dark transition-colors"
      >
        {t('nav.requestQuote')}
      </a>
    </div>
  </div>
</div>

<script>
  const mobileMenu = document.getElementById('mobile-menu');
  const openButton = document.getElementById('open-menu');
  const closeButton = document.getElementById('close-menu');

  openButton?.addEventListener('click', () => {
    mobileMenu?.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  });

  closeButton?.addEventListener('click', () => {
    mobileMenu?.classList.add('translate-x-full');
    document.body.style.overflow = '';
  });
</script>
```

**Step 4: Create Header component**

Create `src/components/layout/Header.astro`:

```astro
---
import { type Language, getLocalizedPath } from '../../i18n/config';
import { useTranslations } from '../../i18n/utils';
import Navigation from './Navigation.astro';
import MobileMenu from './MobileMenu.astro';
import LanguageSwitcher from '../common/LanguageSwitcher.astro';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = useTranslations(lang);
const currentPath = Astro.url.pathname;
---

<header class="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-40">
  <div class="container-wide">
    <div class="flex items-center justify-between h-16 lg:h-20">
      <!-- Logo -->
      <a href={getLocalizedPath('/', lang)} class="flex items-center gap-2">
        <span class="text-xl lg:text-2xl font-display font-bold text-primary">
          {t('site.name')}
        </span>
      </a>

      <!-- Desktop Navigation -->
      <Navigation lang={lang} />

      <!-- Right Section -->
      <div class="flex items-center gap-4">
        <div class="hidden lg:block">
          <LanguageSwitcher currentLang={lang} currentPath={currentPath} />
        </div>

        <a
          href={getLocalizedPath('/request-quote', lang)}
          class="hidden lg:inline-flex px-5 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent-dark transition-colors"
        >
          {t('nav.requestQuote')}
        </a>

        <!-- Mobile Menu Button -->
        <button id="open-menu" class="lg:hidden p-2" aria-label="Open menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>

<MobileMenu lang={lang} currentPath={currentPath} />
```

**Step 5: Commit**

```bash
git add src/components/
git commit -m "feat: add Header, Navigation, MobileMenu, LanguageSwitcher components"
```

---

## Task 6: Create Footer Component

**Files:**
- Create: `src/components/layout/Footer.astro`

**Step 1: Create Footer component**

Create `src/components/layout/Footer.astro`:

```astro
---
import { type Language, getLocalizedPath } from '../../i18n/config';
import { useTranslations } from '../../i18n/utils';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = useTranslations(lang);

const footerLinks = {
  products: [
    { label: t('nav.productsBotanical'), href: getLocalizedPath('/products/botanical-extracts', lang) },
    { label: t('nav.productsHerbal'), href: getLocalizedPath('/products/herbal-powders', lang) },
    { label: t('nav.productsCustom'), href: getLocalizedPath('/products/custom-formulation', lang) },
  ],
  company: [
    { label: t('footer.aboutUs'), href: getLocalizedPath('/about', lang) },
    { label: t('footer.ourStory'), href: getLocalizedPath('/about/story', lang) },
    { label: t('footer.facility'), href: getLocalizedPath('/about/facility', lang) },
    { label: t('nav.quality'), href: getLocalizedPath('/quality', lang) },
  ],
  resources: [
    { label: t('footer.blog'), href: getLocalizedPath('/resources/blog', lang) },
    { label: t('footer.downloads'), href: getLocalizedPath('/resources/downloads', lang) },
    { label: t('footer.faq'), href: getLocalizedPath('/resources/faq', lang) },
    { label: t('footer.contactUs'), href: getLocalizedPath('/contact', lang) },
  ],
};
---

<footer class="bg-primary text-white">
  <div class="container-wide py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <!-- Brand Column -->
      <div class="lg:col-span-1">
        <a href={getLocalizedPath('/', lang)} class="text-2xl font-display font-bold">
          {t('site.name')}
        </a>
        <p class="mt-4 text-gray-300 text-sm leading-relaxed">
          {t('footer.description')}
        </p>
        <div class="mt-6 flex gap-4">
          <a href="#" class="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Products Column -->
      <div>
        <h4 class="font-semibold text-lg mb-4">{t('footer.products')}</h4>
        <ul class="space-y-3">
          {footerLinks.products.map((link) => (
            <li>
              <a href={link.href} class="text-gray-300 hover:text-white text-sm transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <!-- Company Column -->
      <div>
        <h4 class="font-semibold text-lg mb-4">{t('footer.company')}</h4>
        <ul class="space-y-3">
          {footerLinks.company.map((link) => (
            <li>
              <a href={link.href} class="text-gray-300 hover:text-white text-sm transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <!-- Resources Column -->
      <div>
        <h4 class="font-semibold text-lg mb-4">{t('footer.resources')}</h4>
        <ul class="space-y-3">
          {footerLinks.resources.map((link) => (
            <li>
              <a href={link.href} class="text-gray-300 hover:text-white text-sm transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>

  <!-- Bottom Bar -->
  <div class="border-t border-white/10">
    <div class="container-wide py-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-gray-400 text-sm">
        {t('footer.copyright')}
      </p>
      <div class="flex gap-6 text-sm">
        <a href={getLocalizedPath('/privacy', lang)} class="text-gray-400 hover:text-white transition-colors">
          {t('footer.privacy')}
        </a>
        <a href={getLocalizedPath('/terms', lang)} class="text-gray-400 hover:text-white transition-colors">
          {t('footer.terms')}
        </a>
      </div>
    </div>
  </div>
</footer>
```

**Step 2: Commit**

```bash
git add src/components/layout/Footer.astro
git commit -m "feat: add Footer component"
```

---

## Task 7: Create Page Layout

**Files:**
- Create: `src/layouts/PageLayout.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Update BaseLayout to include Header/Footer option**

Modify `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css';
import { defaultLang, type Language } from '../i18n/config';
import { useTranslations } from '../i18n/utils';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';

interface Props {
  title: string;
  description?: string;
  lang?: Language;
  includeHeaderFooter?: boolean;
}

const { title, description, lang = defaultLang, includeHeaderFooter = true } = Astro.props;
const t = useTranslations(lang);

const siteTitle = `${title} | ${t('site.name')}`;
const siteDescription = description || t('site.tagline');
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={siteDescription} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="alternate" hreflang="en" href="https://zlbotanicals.com/" />
    <link rel="alternate" hreflang="zh" href="https://zlbotanicals.com/zh/" />
    <title>{siteTitle}</title>
  </head>
  <body class="min-h-screen bg-white flex flex-col">
    {includeHeaderFooter && <Header lang={lang} />}
    <main class="flex-1">
      <slot />
    </main>
    {includeHeaderFooter && <Footer lang={lang} />}
  </body>
</html>
```

**Step 2: Create PageLayout for inner pages with hero**

Create `src/layouts/PageLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';
import { type Language } from '../i18n/config';

interface Props {
  title: string;
  description?: string;
  lang?: Language;
  heroTitle?: string;
  heroSubtitle?: string;
}

const { title, description, lang, heroTitle, heroSubtitle } = Astro.props;
---

<BaseLayout title={title} description={description} lang={lang}>
  {(heroTitle || heroSubtitle) && (
    <section class="bg-primary text-white py-16 md:py-24">
      <div class="container-wide text-center">
        {heroTitle && (
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            {heroTitle}
          </h1>
        )}
        {heroSubtitle && (
          <p class="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
        )}
      </div>
    </section>
  )}
  <slot />
</BaseLayout>
```

**Step 3: Commit**

```bash
git add src/layouts/
git commit -m "feat: add PageLayout with hero section support"
```

---

## Task 8: Create Homepage Components

**Files:**
- Create: `src/components/home/Hero.astro`
- Create: `src/components/home/TrustIndicators.astro`
- Create: `src/components/home/AboutPreview.astro`
- Create: `src/components/home/ProductCategories.astro`
- Create: `src/components/home/WhyChooseUs.astro`
- Create: `src/components/home/Applications.astro`
- Create: `src/components/home/CTASection.astro`
- Create: `src/components/common/SectionHeader.astro`
- Create: `src/components/common/Button.astro`

**Step 1: Create Button component**

Create `src/components/common/Button.astro`:

```astro
---
interface Props {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const { href, variant = 'primary', size = 'md', class: className = '' } = Astro.props;

const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors';

const variants = {
  primary: 'bg-primary hover:bg-primary-dark text-white',
  secondary: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-primary hover:text-primary-dark underline-offset-4 hover:underline',
  accent: 'bg-accent hover:bg-accent-dark text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

const Tag = href ? 'a' : 'button';
---

<Tag href={href} class={classes}>
  <slot />
</Tag>
```

**Step 2: Create SectionHeader component**

Create `src/components/common/SectionHeader.astro`:

```astro
---
interface Props {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  class?: string;
}

const { subtitle, title, description, align = 'center', class: className = '' } = Astro.props;

const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
---

<div class={`max-w-2xl mb-12 ${alignClass} ${className}`}>
  {subtitle && (
    <span class="text-accent font-medium uppercase tracking-wider text-sm">
      {subtitle}
    </span>
  )}
  <h2 class="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-3">
    {title}
  </h2>
  {description && (
    <p class="text-gray-600 mt-4 text-lg">
      {description}
    </p>
  )}
</div>
```

**Step 3: Create Hero component**

Create `src/components/home/Hero.astro`:

```astro
---
import { type Language, getLocalizedPath } from '../../i18n/config';
import { useTranslations } from '../../i18n/utils';
import Button from '../common/Button.astro';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = useTranslations(lang);
---

<section class="relative bg-primary overflow-hidden">
  <!-- Background Pattern -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute inset-0" style="background-image: url('/images/pattern.svg'); background-size: 100px;"></div>
  </div>

  <div class="container-wide relative">
    <div class="py-20 md:py-28 lg:py-36">
      <div class="max-w-3xl">
        <!-- Badge -->
        <span class="inline-block px-4 py-2 bg-white/10 text-white/90 rounded-full text-sm font-medium mb-6">
          {t('hero.badge')}
        </span>

        <!-- Title -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
          {t('hero.title')}
          <span class="text-accent">{t('hero.titleHighlight')}</span>
        </h1>

        <!-- Subtitle -->
        <p class="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl">
          {t('hero.subtitle')}
        </p>

        <!-- CTAs -->
        <div class="mt-10 flex flex-wrap gap-4">
          <Button href={getLocalizedPath('/products', lang)} variant="accent" size="lg">
            {t('hero.ctaPrimary')}
          </Button>
          <Button href={getLocalizedPath('/request-quote', lang)} variant="secondary" size="lg" class="border-white text-white hover:bg-white hover:text-primary">
            {t('hero.ctaSecondary')}
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 4: Create TrustIndicators component**

Create `src/components/home/TrustIndicators.astro`:

```astro
---
import { type Language } from '../../i18n/config';
import { useTranslations } from '../../i18n/utils';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = useTranslations(lang);

const stats = [
  { value: '40+', label: t('trust.years') },
  { value: '20,000+', label: t('trust.tons') },
  { value: '7', label: t('trust.lines') },
  { value: '50+', label: t('trust.countries') },
];
---

<section class="bg-off-white py-12 md:py-16">
  <div class="container-wide">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      {stats.map((stat) => (
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-display font-bold text-accent">
            {stat.value}
          </div>
          <div class="mt-2 text-sm md:text-base text-gray-600">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 5: Create AboutPreview component**

Create `src/components/home/AboutPreview.astro`:

```astro
---
import { type Language, getLocalizedPath } from '../../i18n/config';
import { useTranslations } from '../../i18n/utils';
import SectionHeader from '../common/SectionHeader.astro';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = useTranslations(lang);
---

<section class="section-padding">
  <div class="container-wide">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <!-- Image -->
      <div class="relative">
        <div class="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
          <img
            src="/images/facility-placeholder.jpg"
            alt="ZL Botanicals Facility"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-xl -z-10"></div>
      </div>

      <!-- Content -->
      <div>
        <SectionHeader
          subtitle={t('about.subtitle')}
          title={t('about.title')}
          align="left"
          class="mb-6"
        />
        <p class="text-gray-600 text-lg leading-relaxed">
          {t('about.description')}
        </p>
        <a
          href={getLocalizedPath('/about/story', lang)}
          class="inline-flex items-center gap-2 mt-8 text-primary font-medium hover:text-primary-dark transition-colors"
        >
          {t('about.link')}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
```

**Step 6: Create ProductCategories component**

Create `src/components/home/ProductCategories.astro`:

```astro
---
import { type Language, getLocalizedPath } from '../../i18n/config';
import { useTranslations } from '../../i18n/utils';
import SectionHeader from '../common/SectionHeader.astro';
import Button from '../common/Button.astro';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = useTranslations(lang);

const categories = [
  {
    title: t('products.botanicalTitle'),
    description: t('products.botanicalDesc'),
    href: getLocalizedPath('/products/botanical-extracts', lang),
    cta: t('products.viewProducts'),
    image: '/images/botanical-extracts.jpg',
  },
  {
    title: t('products.herbalTitle'),
    description: t('products.herbalDesc'),
    href: getLocalizedPath('/products/herbal-powders', lang),
    cta: t('products.viewProducts'),
    image: '/images/herbal-powders.jpg',
  },
  {
    title: t('products.customTitle'),
    description: t('products.customDesc'),
    href: getLocalizedPath('/products/custom-formulation', lang),
    cta: t('products.learnMore'),
    image: '/images/custom-formulation.jpg',
  },
];
---

<section class="section-padding bg-off-white">
  <div class="container-wide">
    <SectionHeader
      subtitle={t('products.subtitle')}
      title={t('products.title')}
    />

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category) => (
        <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
          <div class="aspect-[3/2] bg-gray-200 overflow-hidden">
            <img
              src={category.image}
              alt={category.title}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900">
              {category.title}
            </h3>
            <p class="mt-3 text-gray-600">
              {category.description}
            </p>
            <Button href={category.href} variant="ghost" class="mt-4 p-0">
              {category.cta} →
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 7: Create WhyChooseUs component**

Create `src/components/home/WhyChooseUs.astro`:

```astro
---
import { type Language } from '../../i18n/config';
import { useTranslations } from '../../i18n/utils';
import SectionHeader from '../common/SectionHeader.astro';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = useTranslations(lang);

const advantages = [
  {
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`,
    title: t('whyUs.gmpTitle'),
    description: t('whyUs.gmpDesc'),
  },
  {
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>`,
    title: t('whyUs.traceabilityTitle'),
    description: t('whyUs.traceabilityDesc'),
  },
  {
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    title: t('whyUs.pricingTitle'),
    description: t('whyUs.pricingDesc'),
  },
  {
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`,
    title: t('whyUs.moqTitle'),
    description: t('whyUs.moqDesc'),
  },
  {
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>`,
    title: t('whyUs.rdTitle'),
    description: t('whyUs.rdDesc'),
  },
  {
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
    title: t('whyUs.turnaroundTitle'),
    description: t('whyUs.turnaroundDesc'),
  },
];
---

<section class="section-padding">
  <div class="container-wide">
    <SectionHeader
      subtitle={t('whyUs.subtitle')}
      title={t('whyUs.title')}
    />

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {advantages.map((item) => (
        <div class="p-6 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all">
          <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
            <Fragment set:html={item.icon} />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">
            {item.title}
          </h3>
          <p class="mt-2 text-gray-600 text-sm">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 8: Create Applications component**

Create `src/components/home/Applications.astro`:

```astro
---
import { type Language, getLocalizedPath } from '../../i18n/config';
import { useTranslations } from '../../i18n/utils';
import SectionHeader from '../common/SectionHeader.astro';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = useTranslations(lang);

const applications = [
  {
    title: t('applications.beverages'),
    href: getLocalizedPath('/applications/beverages', lang),
    image: '/images/app-beverages.jpg',
  },
  {
    title: t('applications.nutraceuticals'),
    href: getLocalizedPath('/applications/nutraceuticals', lang),
    image: '/images/app-nutraceuticals.jpg',
  },
  {
    title: t('applications.cosmetics'),
    href: getLocalizedPath('/applications/cosmetics', lang),
    image: '/images/app-cosmetics.jpg',
  },
  {
    title: t('applications.food'),
    href: getLocalizedPath('/applications/food', lang),
    image: '/images/app-food.jpg',
  },
];
---

<section class="section-padding bg-gray-900">
  <div class="container-wide">
    <SectionHeader
      subtitle={t('applications.subtitle')}
      title={t('applications.title')}
      class="text-white [&_span]:text-accent [&_h2]:text-white"
    />

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {applications.map((app) => (
        <a
          href={app.href}
          class="group relative aspect-[3/4] rounded-xl overflow-hidden"
        >
          <img
            src={app.image}
            alt={app.title}
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <h3 class="text-white text-lg md:text-xl font-semibold">
              {app.title}
            </h3>
            <span class="mt-2 inline-flex items-center text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              {t('common.learnMore')} →
            </span>
          </div>
        </a>
      ))}
    </div>
  </div>
</section>
```

**Step 9: Create CTASection component**

Create `src/components/home/CTASection.astro`:

```astro
---
import { type Language, getLocalizedPath } from '../../i18n/config';
import { useTranslations } from '../../i18n/utils';
import Button from '../common/Button.astro';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = useTranslations(lang);
---

<section class="bg-primary py-16 md:py-24">
  <div class="container-wide text-center">
    <h2 class="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white">
      {t('cta.title')}
    </h2>
    <p class="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
      {t('cta.subtitle')}
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <Button href={getLocalizedPath('/request-quote', lang)} variant="accent" size="lg">
        {t('cta.primary')}
      </Button>
      <Button href="/documents/catalog.pdf" variant="secondary" size="lg" class="border-white text-white hover:bg-white hover:text-primary">
        {t('cta.secondary')}
      </Button>
    </div>
  </div>
</section>
```

**Step 10: Commit**

```bash
git add src/components/
git commit -m "feat: add all homepage components"
```

---

## Task 9: Build English Homepage

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Update English homepage**

Update `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/home/Hero.astro';
import TrustIndicators from '../components/home/TrustIndicators.astro';
import AboutPreview from '../components/home/AboutPreview.astro';
import ProductCategories from '../components/home/ProductCategories.astro';
import WhyChooseUs from '../components/home/WhyChooseUs.astro';
import Applications from '../components/home/Applications.astro';
import CTASection from '../components/home/CTASection.astro';

const lang = 'en';
---

<BaseLayout title="Premium Botanical Extracts Manufacturer" lang={lang}>
  <Hero lang={lang} />
  <TrustIndicators lang={lang} />
  <AboutPreview lang={lang} />
  <ProductCategories lang={lang} />
  <WhyChooseUs lang={lang} />
  <Applications lang={lang} />
  <CTASection lang={lang} />
</BaseLayout>
```

**Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: build English homepage with all sections"
```

---

## Task 10: Build Chinese Homepage

**Files:**
- Create: `src/pages/zh/index.astro`

**Step 1: Create Chinese homepage**

Create `src/pages/zh/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Hero from '../../components/home/Hero.astro';
import TrustIndicators from '../../components/home/TrustIndicators.astro';
import AboutPreview from '../../components/home/AboutPreview.astro';
import ProductCategories from '../../components/home/ProductCategories.astro';
import WhyChooseUs from '../../components/home/WhyChooseUs.astro';
import Applications from '../../components/home/Applications.astro';
import CTASection from '../../components/home/CTASection.astro';

const lang = 'zh';
---

<BaseLayout title="优质植物提取物生产商" lang={lang}>
  <Hero lang={lang} />
  <TrustIndicators lang={lang} />
  <AboutPreview lang={lang} />
  <ProductCategories lang={lang} />
  <WhyChooseUs lang={lang} />
  <Applications lang={lang} />
  <CTASection lang={lang} />
</BaseLayout>
```

**Step 2: Commit**

```bash
git add src/pages/zh/
git commit -m "feat: add Chinese homepage"
```

---

## Task 11: Create Static Assets

**Files:**
- Create: `public/favicon.svg`
- Create: `public/images/` directory structure

**Step 1: Create favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#1B4D3E"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#C9A227" font-family="system-ui" font-weight="bold" font-size="16">ZL</text>
</svg>
```

**Step 2: Create placeholder images directory**

```bash
mkdir -p public/images
```

Create placeholder note file `public/images/README.md`:

```markdown
# Image Assets

Place the following images in this directory:

## Homepage
- `facility-placeholder.jpg` - Factory/facility photo (800x600)
- `botanical-extracts.jpg` - Botanical extracts product photo (600x400)
- `herbal-powders.jpg` - Herbal powders product photo (600x400)
- `custom-formulation.jpg` - Lab/R&D photo (600x400)

## Applications
- `app-beverages.jpg` - Beverage industry photo (400x533)
- `app-nutraceuticals.jpg` - Supplements photo (400x533)
- `app-cosmetics.jpg` - Cosmetics photo (400x533)
- `app-food.jpg` - Food industry photo (400x533)

## Optional
- `pattern.svg` - Background pattern for hero

Recommended: Use high-quality, royalty-free images from Unsplash or company photos.
```

**Step 3: Commit**

```bash
git add public/
git commit -m "chore: add favicon and image assets structure"
```

---

## Task 12: Create About Pages

**Files:**
- Create: `src/pages/about/index.astro`
- Create: `src/pages/about/story.astro`
- Create: `src/pages/about/facility.astro`
- Create: `src/pages/about/certifications.astro`
- Create: `src/pages/zh/about/index.astro`
- Create: `src/pages/zh/about/story.astro`
- Create: `src/pages/zh/about/facility.astro`
- Create: `src/pages/zh/about/certifications.astro`

**Step 1: Create English About index page**

Create `src/pages/about/index.astro`:

```astro
---
import PageLayout from '../../layouts/PageLayout.astro';
import { useTranslations } from '../../i18n/utils';

const lang = 'en';
const t = useTranslations(lang);
---

<PageLayout
  title="About Us"
  lang={lang}
  heroTitle="About ZL Botanicals"
  heroSubtitle="Nearly four decades of botanical excellence since 1986"
>
  <section class="section-padding">
    <div class="container-wide">
      <div class="prose prose-lg max-w-none">
        <p class="text-xl text-gray-600 leading-relaxed">
          Founded in 1986 in Guangzhou, China, ZL Botanicals has evolved from a local herbal processing facility into a globally trusted supplier of premium botanical extracts and natural ingredients.
        </p>

        <div class="grid md:grid-cols-3 gap-8 mt-12">
          <a href="/about/story" class="block p-6 bg-off-white rounded-xl hover:shadow-md transition-shadow">
            <h3 class="text-xl font-semibold text-gray-900">Our Story</h3>
            <p class="mt-2 text-gray-600">Learn about our journey from 1986 to today.</p>
          </a>
          <a href="/about/facility" class="block p-6 bg-off-white rounded-xl hover:shadow-md transition-shadow">
            <h3 class="text-xl font-semibold text-gray-900">Facility Tour</h3>
            <p class="mt-2 text-gray-600">Explore our 24,000 m² production facility.</p>
          </a>
          <a href="/about/certifications" class="block p-6 bg-off-white rounded-xl hover:shadow-md transition-shadow">
            <h3 class="text-xl font-semibold text-gray-900">Certifications</h3>
            <p class="mt-2 text-gray-600">View our quality certifications and standards.</p>
          </a>
        </div>
      </div>
    </div>
  </section>
</PageLayout>
```

**Step 2: Create Chinese About pages (mirror structure)**

Create `src/pages/zh/about/index.astro`:

```astro
---
import PageLayout from '../../../layouts/PageLayout.astro';

const lang = 'zh';
---

<PageLayout
  title="关于我们"
  lang={lang}
  heroTitle="关于振隆药业"
  heroSubtitle="自1986年以来，近四十年的植物提取专业经验"
>
  <section class="section-padding">
    <div class="container-wide">
      <div class="prose prose-lg max-w-none">
        <p class="text-xl text-gray-600 leading-relaxed">
          振隆药业成立于1986年，总部位于中国广州。从一家本地草药加工厂发展成为全球信赖的优质植物提取物和天然原料供应商。
        </p>

        <div class="grid md:grid-cols-3 gap-8 mt-12">
          <a href="/zh/about/story" class="block p-6 bg-off-white rounded-xl hover:shadow-md transition-shadow">
            <h3 class="text-xl font-semibold text-gray-900">品牌故事</h3>
            <p class="mt-2 text-gray-600">了解我们从1986年至今的发展历程。</p>
          </a>
          <a href="/zh/about/facility" class="block p-6 bg-off-white rounded-xl hover:shadow-md transition-shadow">
            <h3 class="text-xl font-semibold text-gray-900">生产设施</h3>
            <p class="mt-2 text-gray-600">探索我们24,000平方米的生产基地。</p>
          </a>
          <a href="/zh/about/certifications" class="block p-6 bg-off-white rounded-xl hover:shadow-md transition-shadow">
            <h3 class="text-xl font-semibold text-gray-900">资质认证</h3>
            <p class="mt-2 text-gray-600">查看我们的质量认证和标准。</p>
          </a>
        </div>
      </div>
    </div>
  </section>
</PageLayout>
```

**Step 3: Create story, facility, certifications pages (English and Chinese)**

Due to space, create minimal placeholder pages for now that can be expanded.

Create `src/pages/about/story.astro`:

```astro
---
import PageLayout from '../../layouts/PageLayout.astro';

const lang = 'en';
---

<PageLayout
  title="Our Story"
  lang={lang}
  heroTitle="Our Story"
  heroSubtitle="From humble beginnings to global reach"
>
  <section class="section-padding">
    <div class="container-wide max-w-4xl">
      <div class="prose prose-lg">
        <h2>The Beginning (1986)</h2>
        <p>In the lush hills of Zhenlong township, Guangzhou, where medicinal herbs have been cultivated for centuries, ZL Botanicals was officially established...</p>

        <h2>Growth & Modernization (1990s-2000s)</h2>
        <p>We invested in modern extraction technology while preserving traditional knowledge...</p>

        <h2>Global Expansion (2007-Present)</h2>
        <p>Renamed ZL Botanicals, we expanded our vision to serve the global market...</p>

        <h2>Today</h2>
        <p>With 7 GMP-certified production lines, 24,000 m² of facility space, and the capacity to process over 20,000 tons of raw materials annually, we continue our mission: bringing the best of nature to the world.</p>
      </div>
    </div>
  </section>
</PageLayout>
```

Create similar files for facility.astro, certifications.astro, and their Chinese counterparts.

**Step 4: Commit**

```bash
git add src/pages/about/ src/pages/zh/about/
git commit -m "feat: add About pages (en/zh)"
```

---

## Task 13: Create Contact Page

**Files:**
- Create: `src/pages/contact.astro`
- Create: `src/pages/zh/contact.astro`
- Create: `src/components/forms/ContactForm.astro`

**Step 1: Create ContactForm component**

Create `src/components/forms/ContactForm.astro`:

```astro
---
import { type Language } from '../../i18n/config';
import { useTranslations } from '../../i18n/utils';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = useTranslations(lang);

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
  'Australia', 'Japan', 'South Korea', 'Singapore', 'Malaysia',
  'Thailand', 'Vietnam', 'Indonesia', 'India', 'Brazil', 'Mexico', 'Other'
];
---

<form class="space-y-6" action="/api/contact" method="POST">
  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {t('contact.form.company')} <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="company"
        required
        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {t('contact.form.name')} <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="name"
        required
        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
      />
    </div>
  </div>

  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {t('contact.form.email')} <span class="text-red-500">*</span>
      </label>
      <input
        type="email"
        name="email"
        required
        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {t('contact.form.phone')}
      </label>
      <input
        type="tel"
        name="phone"
        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
      />
    </div>
  </div>

  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {t('contact.form.country')}
      </label>
      <select
        name="country"
        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <option value="">{t('contact.form.selectCountry')}</option>
        {countries.map((country) => (
          <option value={country}>{country}</option>
        ))}
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {t('contact.form.inquiryType')}
      </label>
      <select
        name="inquiryType"
        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <option value="">{t('contact.form.selectType')}</option>
        <option value="general">{t('contact.form.typeGeneral')}</option>
        <option value="product">{t('contact.form.typeProduct')}</option>
        <option value="sample">{t('contact.form.typeSample')}</option>
        <option value="quote">{t('contact.form.typeQuote')}</option>
      </select>
    </div>
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {t('contact.form.message')} <span class="text-red-500">*</span>
    </label>
    <textarea
      name="message"
      rows="5"
      required
      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-none"
    ></textarea>
  </div>

  <button
    type="submit"
    class="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
  >
    {t('contact.form.submit')}
  </button>
</form>
```

**Step 2: Create English Contact page**

Create `src/pages/contact.astro`:

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import ContactForm from '../components/forms/ContactForm.astro';
import { useTranslations } from '../i18n/utils';

const lang = 'en';
const t = useTranslations(lang);
---

<PageLayout
  title="Contact Us"
  lang={lang}
  heroTitle={t('contact.title')}
  heroSubtitle={t('contact.subtitle')}
>
  <section class="section-padding">
    <div class="container-wide">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <!-- Contact Info -->
        <div>
          <h2 class="text-2xl font-display font-bold text-gray-900 mb-6">Get In Touch</h2>

          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Address</h3>
                <p class="text-gray-600 mt-1">No.2 Keling Road, Zhenlong<br/>Huangpu District, Guangzhou<br/>Guangdong, China 510000</p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Email</h3>
                <p class="text-gray-600 mt-1">info@zlbotanicals.com<br/>sales@zlbotanicals.com</p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Phone</h3>
                <p class="text-gray-600 mt-1">+86 20 XXXX XXXX</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-off-white rounded-xl p-8">
          <ContactForm lang={lang} />
        </div>
      </div>
    </div>
  </section>
</PageLayout>
```

**Step 3: Create Chinese Contact page**

Create `src/pages/zh/contact.astro`:

```astro
---
import PageLayout from '../../layouts/PageLayout.astro';
import ContactForm from '../../components/forms/ContactForm.astro';
import { useTranslations } from '../../i18n/utils';

const lang = 'zh';
const t = useTranslations(lang);
---

<PageLayout
  title="联系我们"
  lang={lang}
  heroTitle={t('contact.title')}
  heroSubtitle={t('contact.subtitle')}
>
  <section class="section-padding">
    <div class="container-wide">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <!-- Contact Info -->
        <div>
          <h2 class="text-2xl font-display font-bold text-gray-900 mb-6">联系方式</h2>

          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">地址</h3>
                <p class="text-gray-600 mt-1">广东省广州市黄埔区<br/>镇龙镇科灵路2号<br/>邮编：510000</p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">邮箱</h3>
                <p class="text-gray-600 mt-1">info@zlbotanicals.com<br/>sales@zlbotanicals.com</p>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">电话</h3>
                <p class="text-gray-600 mt-1">+86 20 XXXX XXXX</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-off-white rounded-xl p-8">
          <ContactForm lang={lang} />
        </div>
      </div>
    </div>
  </section>
</PageLayout>
```

**Step 4: Commit**

```bash
git add src/pages/contact.astro src/pages/zh/contact.astro src/components/forms/
git commit -m "feat: add Contact page with form (en/zh)"
```

---

## Task 14: Create Products Pages

**Files:**
- Create: `src/pages/products/index.astro`
- Create: `src/pages/products/botanical-extracts.astro`
- Create: `src/pages/products/herbal-powders.astro`
- Create: `src/pages/products/custom-formulation.astro`
- Create: `src/pages/zh/products/` (mirror structure)
- Create: `src/components/products/ProductCard.astro`

**Step 1: Create ProductCard component**

Create `src/components/products/ProductCard.astro`:

```astro
---
interface Props {
  name: string;
  latinName?: string;
  category: string;
  specification?: string;
  applications?: string[];
  image?: string;
  href: string;
}

const { name, latinName, category, specification, applications, image, href } = Astro.props;
---

<div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
  <div class="aspect-[4/3] bg-gray-100 overflow-hidden">
    <img
      src={image || '/images/product-placeholder.jpg'}
      alt={name}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
    />
  </div>
  <div class="p-6">
    <span class="text-xs font-medium text-accent uppercase tracking-wider">
      {category}
    </span>
    <h3 class="text-lg font-semibold text-gray-900 mt-2">
      {name}
    </h3>
    {latinName && (
      <p class="text-sm text-gray-500 italic">{latinName}</p>
    )}
    {specification && (
      <p class="text-sm text-gray-600 mt-2">
        <span class="font-medium">Spec:</span> {specification}
      </p>
    )}
    {applications && applications.length > 0 && (
      <div class="flex flex-wrap gap-1 mt-3">
        {applications.slice(0, 3).map((app) => (
          <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
            {app}
          </span>
        ))}
      </div>
    )}
    <div class="mt-4 flex gap-3">
      <a
        href={href}
        class="text-sm font-medium text-primary hover:text-primary-dark"
      >
        View Details →
      </a>
    </div>
  </div>
</div>
```

**Step 2: Create Products index page**

Create `src/pages/products/index.astro`:

```astro
---
import PageLayout from '../../layouts/PageLayout.astro';
import ProductCard from '../../components/products/ProductCard.astro';
import { getLocalizedPath } from '../../i18n/config';

const lang = 'en';

const categories = [
  {
    title: 'Botanical Extracts',
    description: 'Standardized plant extracts with guaranteed active compound levels',
    href: '/products/botanical-extracts',
    image: '/images/botanical-extracts.jpg',
  },
  {
    title: 'Herbal Powders',
    description: 'Fine-ground botanical powders processed under strict GMP conditions',
    href: '/products/herbal-powders',
    image: '/images/herbal-powders.jpg',
  },
  {
    title: 'Custom Formulation',
    description: 'Tailored extraction and formulation services for your unique needs',
    href: '/products/custom-formulation',
    image: '/images/custom-formulation.jpg',
  },
];

const featuredProducts = [
  {
    name: 'Licorice Root Extract',
    latinName: 'Glycyrrhiza glabra',
    category: 'Extract',
    specification: '20% Glycyrrhizic Acid',
    applications: ['Beverage', 'Nutraceuticals', 'Cosmetics'],
    href: '/products/licorice-extract',
  },
  {
    name: 'Ginseng Extract',
    latinName: 'Panax ginseng',
    category: 'Extract',
    specification: '10% Ginsenosides',
    applications: ['Nutraceuticals', 'Beverage'],
    href: '/products/ginseng-extract',
  },
  {
    name: 'Green Tea Extract',
    latinName: 'Camellia sinensis',
    category: 'Extract',
    specification: '95% Polyphenols',
    applications: ['Beverage', 'Cosmetics', 'Food'],
    href: '/products/green-tea-extract',
  },
];
---

<PageLayout
  title="Products"
  lang={lang}
  heroTitle="Our Products"
  heroSubtitle="Premium botanical extracts and natural ingredients for global industries"
>
  <!-- Categories -->
  <section class="section-padding bg-off-white">
    <div class="container-wide">
      <h2 class="text-2xl font-display font-bold text-gray-900 mb-8">Product Categories</h2>
      <div class="grid md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <a href={cat.href} class="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div class="aspect-[3/2] bg-gray-200 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900">{cat.title}</h3>
              <p class="mt-2 text-gray-600">{cat.description}</p>
              <span class="inline-block mt-4 text-primary font-medium">Explore →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>

  <!-- Featured Products -->
  <section class="section-padding">
    <div class="container-wide">
      <h2 class="text-2xl font-display font-bold text-gray-900 mb-8">Featured Products</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  </section>
</PageLayout>
```

**Step 3: Create zh/products mirror pages**

Create `src/pages/zh/products/index.astro` with Chinese content (similar structure, translated text).

**Step 4: Commit**

```bash
git add src/pages/products/ src/pages/zh/products/ src/components/products/
git commit -m "feat: add Products pages with ProductCard component (en/zh)"
```

---

## Task 15: Create Remaining Pages (Placeholder Structure)

**Files:**
- Create: `src/pages/quality.astro` and `src/pages/zh/quality.astro`
- Create: `src/pages/request-quote.astro` and `src/pages/zh/request-quote.astro`
- Create: `src/pages/applications/` pages (en/zh)
- Create: `src/pages/resources/` pages (en/zh)

This task creates minimal placeholder pages for all remaining routes to complete the site structure.

**Step 1: Create Quality pages**

**Step 2: Create Request Quote pages**

**Step 3: Create Applications pages**

**Step 4: Create Resources pages**

**Step 5: Commit**

```bash
git add src/pages/
git commit -m "feat: add remaining page structure (quality, applications, resources)"
```

---

## Task 16: Update Astro Config

**Files:**
- Modify: `astro.config.mjs`

**Step 1: Update Astro config with site and i18n settings**

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zlbotanicals.com',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          zh: 'zh-CN',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
```

**Step 2: Commit**

```bash
git add astro.config.mjs
git commit -m "chore: configure Astro with i18n and sitemap settings"
```

---

## Task 17: Final Verification

**Step 1: Run development server**

```bash
npm run dev
```

**Step 2: Verify pages**

Check the following URLs work:
- http://localhost:4321/ (English home)
- http://localhost:4321/zh/ (Chinese home)
- http://localhost:4321/about (English about)
- http://localhost:4321/zh/about (Chinese about)
- http://localhost:4321/products (English products)
- http://localhost:4321/zh/products (Chinese products)
- http://localhost:4321/contact (English contact)
- http://localhost:4321/zh/contact (Chinese contact)

**Step 3: Build for production**

```bash
npm run build
```

Expected: Build completes without errors

**Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete ZL Botanicals multilingual website v1.0"
```

---

## Summary

This plan creates a complete multilingual website with:
- 17 tasks broken into atomic steps
- Full i18n infrastructure (extensible to more languages)
- All homepage sections per specs
- Core pages: About, Products, Contact, Quality
- Reusable component library
- TailwindCSS theme matching brand guidelines
- Mobile-responsive design
- SEO-ready structure with sitemap

import { defineCollection, z } from 'astro:content';

// Products collection schema (产品：罗汉果提取物、甘草提取物等)
const products = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameEn: z.string().optional(),
    latinName: z.string().optional(),
    lang: z.enum(['en', 'zh']),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    // 关联到解决方案
    solutions: z.array(z.string()).default([]),
  }),
});

// Solutions collection schema (解决方案：零糖气泡水等)
const solutions = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameEn: z.string().optional(),
    lang: z.enum(['en', 'zh']),

    // 关联到行业
    industry: z.enum(['beverages', 'nutraceuticals', 'cosmetics', 'food']),

    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Blog collection schema (博客：市场洞察、行业趋势等)
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.enum(['en', 'zh']),
    publishDate: z.string(),
    category: z.enum(['market-insights', 'ingredient-spotlight', 'industry-news', 'research']),
    guideCategory: z.enum(['ingredient-guides', 'application-guides', 'quality-guides', 'sourcing-guides']),
    relatedIndustries: z.array(z.enum(['beverages', 'food', 'cosmetics', 'nutraceuticals'])).default([]),
    tags: z.array(z.string()).default([]),
    description: z.string(),
    image: z.string().optional(),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string(),
    })).optional(),
    draft: z.boolean().default(false),
    // 关联到产品和解决方案
    relatedProducts: z.array(z.string()).default([]),
    relatedSolutions: z.array(z.string()).default([]),
  }),
});

export const collections = {
  products,
  solutions,
  blog,
};

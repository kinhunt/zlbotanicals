import { defineCollection, z } from 'astro:content';

// Ingredient collection schema (原料：罗汉果提取物、甘草提取物等)
const ingredients = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameEn: z.string().optional(),
    latinName: z.string().optional(),
    lang: z.enum(['en', 'zh']),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Product collection schema (具体产品：罗汉果甜味剂等)
const products = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameEn: z.string().optional(),
    lang: z.enum(['en', 'zh']),

    // 关联到原料
    ingredient: z.string(),

    // 技术规格
    specification: z.string().optional(),

    // 关联应用方案
    applications: z.array(z.string()).default([]),

    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Application collection schema (应用方案：零糖气泡水等)
const applications = defineCollection({
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

export const collections = {
  ingredients,
  products,
  applications,
};

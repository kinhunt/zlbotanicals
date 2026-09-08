// Shared editorial taxonomy; deliberately independent of content collection APIs.
export const guideCategories = [
  {
    slug: 'ingredient-guides',
    en: {
      title: 'Ingredient & Specification Guides',
      description: 'Compare botanical identity, ingredient forms, marker assays and carriers before selecting a material. Start with turmeric powder, extract and dispersion differences, then use the linked product brief to prepare specification questions.',
    },
    zh: {
      title: '原料与规格指南',
      description: '选型前比较植物身份、原料形态、标志物检测和载体。先从姜黄粉、提取物与分散体的差异入手，再结合相关产品资料准备规格问题；分散性或含量不能直接证明吸收或功效。',
    },
  },
  {
    slug: 'application-guides',
    en: {
      title: 'Application & Formulation Guides',
      description: 'Plan practical trials in the intended finished-product format. These beverage and gummy guides cover sensory controls, processing, uniformity and stability questions; they are development checklists, not validated formulas or efficacy evidence.',
    },
    zh: {
      title: '应用与配方指南',
      description: '围绕目标成品形态制定试验计划。饮料与软糖指南涉及感官对照、加工、均匀性和稳定性问题，帮助把原料要求转化为中试检查项；它们不是经过验证的配方或功效证据。',
    },
  },
  {
    slug: 'quality-guides',
    en: {
      title: 'Quality & Testing Guides',
      description: 'Review identity, analytical methods and batch-linked documentation before approving an ingredient. The reishi checklist explains why total polysaccharides differ from beta-glucans and how to read a COA without treating a certificate as finished-product evidence.',
    },
    zh: {
      title: '质量与检测指南',
      description: '批准原料前审查身份、检测方法及对应批次文件。灵芝检查表说明总多糖与 β-葡聚糖的区别，并帮助核对 COA 的批号、单位、方法和实测结果；证书不能替代成品验证。',
    },
  },
  {
    slug: 'sourcing-guides',
    en: {
      title: 'Sourcing & Customization Guides',
      description: 'Prepare a sourcing brief that goes beyond price per kilogram. Use the monk fruit and stevia guide to compare composition, sensory trial costs, destination-market requirements and written acceptance criteria before requesting samples or a quote.',
    },
    zh: {
      title: '采购与定制指南',
      description: '制定不只比较每公斤价格的采购需求。通过罗汉果与甜菊糖苷指南核查完整组成、感官试样成本、目的地要求和书面验收标准，再提出样品或报价申请；供货和规格需书面确认。',
    },
  },
] as const;

export type GuideCategorySlug = typeof guideCategories[number]['slug'];

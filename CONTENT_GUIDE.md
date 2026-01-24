# 内容管理指南

本指南面向内容营销团队，说明如何管理网站内容。

---

## 网站概述

### 这是什么网站？

振隆药业（ZL Botanicals）官方网站，一个双语（中文/英文）的 B2B 企业网站，面向全球食品、饮料、保健品和化妆品行业的采购商和配方师。

### 网站目的

1. **品牌展示** - 展示公司历史、生产能力、资质认证
2. **产品展示** - 呈现植物提取物产品线，提供详细技术规格
3. **应用方案** - 展示产品在不同行业的应用案例，帮助客户理解如何使用我们的原料
4. **询盘获取** - 通过联系表单和报价请求获取潜在客户

---

## 内容结构

网站使用 Astro Content Collections 管理内容，所有内容文件位于 `src/content/` 目录。

```
src/content/
├── config.ts              # 内容模型定义（勿修改）
├── ingredients/           # 原料（产品分类）
│   ├── zh/               # 中文原料
│   └── en/               # 英文原料
├── products/             # 具体产品
│   ├── zh/
│   └── en/
└── applications/         # 应用方案
    ├── zh/
    └── en/
```

### 内容层级关系

```
原料 (Ingredients)          应用 (Applications)
    │                            │
    │ 1:N                        │ N:1
    ▼                            ▼
具体产品 (Products) ◄────────► 行业分类
                    N:M
```

- **原料** → 产品分类页面，如"罗汉果提取物"
- **产品** → 具体产品规格，如"罗汉果甜味剂 25% Mogroside V"
- **应用** → 行业解决方案，如"零糖气泡水解决方案"

---

## 创建内容

### 1. 创建新原料

原料是产品的分类依据，会显示在：
- 首页产品系列
- 导航栏产品下拉菜单
- 产品中心页面
- 页脚产品链接

**创建步骤：**

1. 在 `src/content/ingredients/zh/` 创建中文文件，如 `stevia.md`
2. 在 `src/content/ingredients/en/` 创建对应英文文件 `stevia.md`

**文件模板：**

```markdown
---
name: 甜菊糖苷
nameEn: Stevia Extract
latinName: Stevia rebaudiana
lang: zh
description: 甜菊糖苷是从甜菊叶中提取的天然甜味剂，甜度为蔗糖的200-300倍。
image: /images/ingredients/stevia.jpg
---

## 原料简介

这里写原料的详细介绍...

## 主要活性成分

| 成分 | 含量范围 | 功能特点 |
|-----|---------|---------|
| 甜菊糖苷 A | 40-98% | 主要甜味来源 |

## 应用领域

- **食品饮料**：无糖饮料、烘焙制品
- **保健品**：膳食补充剂

## 质量标准

我们的产品符合：
- 中国药典标准
- USP 标准
```

**字段说明：**

| 字段 | 必填 | 说明 |
|-----|-----|------|
| name | ✅ | 中/英文名称 |
| nameEn | 选填 | 英文名（中文文件用） |
| latinName | 选填 | 拉丁学名，斜体显示 |
| lang | ✅ | 语言代码：`zh` 或 `en` |
| description | 选填 | 简短描述，用于列表页 |
| image | 选填 | 配图路径 |
| draft | 选填 | 设为 `true` 可隐藏 |

---

### 2. 创建新产品

产品是原料下的具体规格，会显示在原料详情页的"相关产品"部分。

**创建步骤：**

1. 在 `src/content/products/zh/` 创建文件，如 `stevia-ra98.md`
2. 在 `src/content/products/en/` 创建对应英文文件

**文件模板：**

```markdown
---
name: 甜菊糖苷 RA 98%
nameEn: Stevia RA 98%
lang: zh
ingredient: stevia
specification: Rebaudioside A ≥98%
applications:
  - zero-sugar-sparkling
description: 高纯度甜菊糖苷，口感纯净，适合高端无糖饮料。
image: /images/products/stevia-ra98.jpg
---

## 产品概述

详细的产品介绍...

## 技术规格

| 指标 | 规格 |
|-----|------|
| RA 含量 | ≥98% |
| 外观 | 白色粉末 |

## 应用场景

- 零糖饮料
- 乳制品
```

**字段说明：**

| 字段 | 必填 | 说明 |
|-----|-----|------|
| name | ✅ | 产品名称 |
| lang | ✅ | 语言代码 |
| ingredient | ✅ | 关联的原料 slug（文件名去掉 .md） |
| specification | 选填 | 规格说明 |
| applications | 选填 | 关联的应用 slug 数组 |
| description | 选填 | 简短描述 |
| image | 选填 | 产品图片 |

---

### 3. 创建新应用

应用是行业解决方案，会显示在对应行业页面（饮料、保健品、化妆品、食品）。

**创建步骤：**

1. 在 `src/content/applications/zh/` 创建文件
2. 在 `src/content/applications/en/` 创建对应英文文件

**文件模板：**

```markdown
---
name: 功能性茶饮解决方案
nameEn: Functional Tea Beverage Solution
industry: beverages
lang: zh
description: 为功能性茶饮品牌提供植物提取物配方支持。
image: /images/applications/functional-tea.jpg
---

## 市场趋势

介绍市场背景...

## 我们的解决方案

### 推荐原料组合

| 原料 | 功能 | 推荐用量 |
|-----|------|---------|
| 绿茶提取物 | 抗氧化 | 0.1-0.3% |

## 成功案例

> "客户评价..."

## 合作流程

1. 需求沟通
2. 样品评估
3. 配方优化
```

**字段说明：**

| 字段 | 必填 | 说明 |
|-----|-----|------|
| name | ✅ | 方案名称 |
| industry | ✅ | 所属行业：`beverages`、`nutraceuticals`、`cosmetics`、`food` |
| lang | ✅ | 语言代码 |
| description | 选填 | 简短描述 |
| image | 选填 | 配图 |

---

## 多语言支持

### 规则

1. **每个内容必须有中英文两个版本**
2. **文件名必须一致**（如 `zh/monk-fruit.md` 和 `en/monk-fruit.md`）
3. **`lang` 字段必须正确设置**

### 语言对应关系

| 中文目录 | 英文目录 |
|---------|---------|
| `src/content/*/zh/` | `src/content/*/en/` |

### 示例

创建"甜菊糖苷"原料：

```
src/content/ingredients/
├── zh/stevia.md    # lang: zh, name: 甜菊糖苷
└── en/stevia.md    # lang: en, name: Stevia Extract
```

---

## 常见问题

### Q: 创建内容后需要修改代码吗？

**不需要。** 网站会自动读取 Content Collections 中的内容：

- 新原料自动出现在导航菜单、产品页面
- 新产品自动出现在关联原料页面
- 新应用自动出现在对应行业页面

### Q: 如何隐藏未完成的内容？

在 frontmatter 中添加 `draft: true`：

```markdown
---
name: 新产品（草稿）
draft: true
---
```

### Q: 图片放在哪里？

图片放在 `public/images/` 目录下：

```
public/images/
├── ingredients/    # 原料封面图（推荐尺寸：800x600px 或 4:3 比例）
├── products/       # 产品封面图
└── applications/   # 应用方案封面图
```

在 frontmatter 中引用：`image: /images/ingredients/stevia.jpg`

### Q: 图片会显示在哪些位置？

| 位置 | 显示内容 |
|-----|---------|
| **首页产品系列** | 显示原料的 `image`，无图片时显示默认图标 |
| **产品中心列表页** | 显示原料的 `image`，无图片时显示默认图标 |
| **原料/产品详情页** | 页面顶部显示封面图 |
| **应用方案页面** | 显示应用的 `image` |

### Q: 图片格式和大小建议？

- **格式**：JPG（照片）、PNG（图标/透明背景）、WebP（推荐）
- **封面图尺寸**：800×600px 或更大，保持 4:3 或 3:2 比例
- **文件大小**：建议压缩到 200KB 以内
- **命名规范**：使用英文小写，与内容 slug 一致（如 `monk-fruit.jpg`）

### Q: 如何添加产品和应用的关联？

在产品文件的 `applications` 字段中添加应用的 slug：

```yaml
applications:
  - zero-sugar-sparkling
  - functional-tea
```

### Q: 文件名有什么要求？

- 使用英文小写
- 用连字符分隔单词
- 不要使用中文、空格或特殊字符
- 示例：`monk-fruit.md`、`green-tea-extract.md`

### Q: 如何预览修改？

1. 确保开发服务器运行中（`npm run dev`）
2. 保存文件后浏览器会自动刷新
3. 访问 `http://localhost:4321` 查看

---

## 内容检查清单

发布新内容前，请确认：

- [ ] 中英文版本都已创建
- [ ] 文件名一致
- [ ] `lang` 字段正确
- [ ] 必填字段都已填写
- [ ] 图片已上传到正确目录
- [ ] 关联的 slug 拼写正确
- [ ] 在本地预览确认显示正常

---

## 联系技术支持

如有问题，请联系开发团队。

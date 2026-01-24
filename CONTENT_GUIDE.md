# 内容管理指南

本指南面向内容营销团队，说明如何管理网站内容。

---

## 网站概述

### 这是什么网站？

振隆药业（ZL Botanicals）官方网站，一个双语（中文/英文）的 B2B 企业网站，面向全球食品、饮料、保健品和化妆品行业的采购商和配方师。

### 网站目的

1. **品牌展示** - 展示公司历史、生产能力、资质认证
2. **产品展示** - 呈现植物提取物产品线，提供详细技术规格
3. **解决方案** - 展示产品在不同行业的应用案例，帮助客户理解如何使用我们的原料
4. **询盘获取** - 通过联系表单和报价请求获取潜在客户

---

## 内容结构

网站使用 Astro Content Collections 管理内容，所有内容文件位于 `src/content/` 目录。

```
src/content/
├── config.ts              # 内容模型定义（勿修改）
├── products/              # 产品（罗汉果提取物、甘草提取物等）
│   ├── zh/               # 中文产品
│   └── en/               # 英文产品
└── solutions/            # 解决方案（零糖气泡水、健康零食等）
    ├── zh/
    └── en/
```

### 内容层级关系

```
产品 (Products)                    解决方案 (Solutions)
├── 罗汉果提取物      ◄─────────►   ├── 零糖气泡水
├── 甘草提取物        ◄─────────►   ├── 健康零食
├── 人参提取物        ◄─────────►   └── ...
└── ...                    N:M
```

- **产品** → 我们销售的植物提取物，如"罗汉果提取物"、"甘草提取物"
- **解决方案** → 行业应用方案，如"零糖气泡水解决方案"、"健康零食方案"
- **关联关系** → 产品和解决方案是多对多关系，在产品中配置关联

---

## 创建内容

### 1. 创建新产品

产品会显示在：
- 首页产品系列
- 导航栏产品下拉菜单
- 产品中心页面
- 页脚产品链接
- 关联的解决方案页面（"推荐产品"）

**创建步骤：**

1. 在 `src/content/products/zh/` 创建中文文件，如 `stevia.md`
2. 在 `src/content/products/en/` 创建对应英文文件 `stevia.md`

**文件模板：**

```markdown
---
name: 甜菊糖苷提取物
nameEn: Stevia Extract
latinName: Stevia rebaudiana
lang: zh
description: 甜菊糖苷是从甜菊叶中提取的天然甜味剂，甜度为蔗糖的200-300倍。
image: /images/products/stevia.jpg
solutions:
  - zero-sugar-sparkling
  - healthy-snacks
---

## 产品概述

这里写产品的详细介绍...

## 技术规格

| 指标 | 规格范围 |
|------|---------|
| RA 含量 | 40% / 60% / 80% / 98% |
| 外观 | 白色粉末 |

## 可选规格

| 产品型号 | RA含量 | 应用推荐 |
|---------|--------|---------|
| ST-40   | 40%    | 饮料、烘焙 |
| ST-98   | 98%    | 高端配方 |

## 应用场景

- **无糖饮料**：零糖碳酸饮料、功能性饮料
- **健康食品**：无糖烘焙、代餐粉

## 质量认证

- GMP 生产
- ISO 9001 / ISO 22000
```

**字段说明：**

| 字段 | 必填 | 说明 |
|-----|-----|------|
| name | ✅ | 中/英文名称 |
| nameEn | 选填 | 英文名（中文文件用） |
| latinName | 选填 | 拉丁学名，斜体显示 |
| lang | ✅ | 语言代码：`zh` 或 `en` |
| description | 选填 | 简短描述，用于列表页和 SEO |
| image | 选填 | 封面图路径 |
| solutions | 选填 | 关联的解决方案 slug 数组 |
| draft | 选填 | 设为 `true` 可隐藏 |

---

### 2. 创建新解决方案

解决方案会显示在：
- 解决方案页面
- 对应行业页面（饮料、保健品、化妆品、食品）
- 关联产品的详情页（"应用解决方案"）

#### 内容定位

**Solution 不是泛泛的行业方案，而是一个"可直接落地的终端产品方案"。**

| 定位 | ❌ 不要这样 | ✅ 应该这样 |
|-----|-----------|-----------|
| 命名 | 零糖饮料解决方案 | 白桃乌龙零糖气泡水 |
| 内容 | 泛泛的行业趋势 | 具体的产品配方 |
| 图片 | 原料图 | 终端产品图（精美零售包装） |
| 技术 | "提供甜味" | "膜分离纯化工艺，罗汉果苷V≥50%" |

**目标读者**：食品、饮品、保健品、日化品牌的市场和产品研发人员

**内容目标**：让研发人员觉得"这个方案拿来就能用"

#### 创建步骤

1. 在 `src/content/solutions/zh/` 创建文件，如 `white-peach-sparkling.md`
2. 在 `src/content/solutions/en/` 创建对应英文文件（文件名必须一致）
3. 准备终端产品封面图，放入 `public/images/solutions/`
4. 更新相关产品的 `solutions` 字段，建立关联

#### 内容结构模板

```markdown
---
name: 白桃乌龙零糖气泡水
nameEn: White Peach Oolong Zero-Sugar Sparkling Water
industry: beverages
lang: zh
description: 一款融合白桃清甜与乌龙茶韵的零糖气泡水，采用罗汉果苷V高纯度提取物。
image: /images/solutions/white-peach-sparkling.webp
---

## 产品概念

**产品名称** — 一句话产品定位。

- **目标人群**：具体描述
- **消费场景**：具体场景
- **产品定位**：核心卖点

---

## 配方亮点

### 核心成分1：XXX提取物

说明我们的工艺差异化，不是简单说"用什么"，而是说"为什么用我们的"：

| 技术指标 | 常规产品 | 振隆方案 |
|---------|---------|---------|
| 活性成分含量 | XX% | **≥XX%** |
| 口感/效果差异 | 一般 | 优秀 |

**作用机制**：用专业但易懂的语言解释原理。

### 核心成分2：XXX提取物

同上结构...

### 协同配伍

说明多个成分如何协同增效。

---

## 推荐配方

**XXml成品配方参考**

| 原料 | 用量 | 功能 |
|-----|------|-----|
| 成分A | XX% | 主要功能 |
| 成分B | XX% | 辅助功能 |

### 工艺要点

1. **步骤1**：具体操作说明
2. **步骤2**：具体操作说明

---

## 我们提供的价值

### 原料规格选择

| 产品 | 推荐规格 | 特点 |
|-----|---------|------|
| 产品A | 规格代码 | 特点说明 |

### 技术服务

- **配方定制**：...
- **稳定性测试**：...
- **风味开发**：...

### 合规支持

- 提供检测报告
- 协助产品备案

---

> 想要开发您的XXX产品线？[联系我们](/zh/contact) 获取样品和技术方案。
```

#### 字段说明

| 字段 | 必填 | 说明 |
|-----|-----|------|
| name | ✅ | 具体产品名称（不是泛泛的方案名） |
| nameEn | 选填 | 英文名（中文文件用） |
| industry | ✅ | 所属行业：`beverages`、`nutraceuticals`、`cosmetics`、`food` |
| lang | ✅ | 语言代码 |
| description | ✅ | 简短描述，突出差异化技术 |
| image | ✅ | 终端产品封面图（精美零售风格） |
| draft | 选填 | 设为 `true` 可隐藏 |

#### 技术内容要点

写技术内容时，需要体现专业性和差异化：

1. **工艺差异化**
   - 膜分离纯化、超临界CO₂萃取、纳米乳化等
   - 对比常规产品的指标差异

2. **活性成分说明**
   - 具体成分名称和含量（如"罗汉果苷V≥50%"）
   - 作用机制（如"激活Nrf2通路"）

3. **配伍逻辑**
   - 为什么这几个成分要一起用
   - 协同增效的原理

4. **可落地的配方**
   - 具体用量（百分比或mg）
   - 工艺要点和注意事项

#### 图片要求

Solution 的封面图应该是 **精美的终端产品图**，让研发人员一眼看到可行的产品形态：

- 饮料类：瓶装/罐装产品，有凝珠水滴效果
- 保健品：软糖/胶囊瓶，专业包装设计
- 化妆品：精华瓶/面霜罐，高端质感
- 食品类：包装零食，诱人食欲

图片规格：WebP 格式，1200×654px，50KB 以内

#### 现有 Solution 参考

| 文件名 | 行业 | 关联产品 |
|-------|------|---------|
| white-peach-sparkling | 饮料 | monk-fruit, green-tea, licorice-root |
| liver-support-gummy | 保健品 | goji-berry, reishi-mushroom, turmeric, licorice-root |

---

## 产品与解决方案的关联

### 如何建立关联？

在**产品**文件的 `solutions` 字段中添加解决方案的 slug（文件名去掉 `.md`）：

```yaml
# src/content/products/zh/monk-fruit.md
---
name: 罗汉果提取物
solutions:
  - zero-sugar-sparkling    # 关联到 solutions/zh/zero-sugar-sparkling.md
  - healthy-snacks          # 关联到 solutions/zh/healthy-snacks.md
---
```

### 关联后会发生什么？

1. **产品详情页** → 底部显示"应用解决方案"，列出关联的解决方案
2. **解决方案详情页** → 底部显示"推荐产品"，自动反向查询关联的产品

### 注意事项

- slug 必须与解决方案文件名一致
- 中英文产品文件的 `solutions` 数组应保持一致
- 解决方案不需要配置关联，会自动反向查询

---

## 多语言支持

### 规则

1. **每个内容必须有中英文两个版本**
2. **文件名必须一致**（如 `zh/monk-fruit.md` 和 `en/monk-fruit.md`）
3. **`lang` 字段必须正确设置**

### 语言对应关系

| 中文目录 | 英文目录 |
|---------|---------|
| `src/content/products/zh/` | `src/content/products/en/` |
| `src/content/solutions/zh/` | `src/content/solutions/en/` |

### 示例

创建"甜菊糖苷提取物"产品：

```
src/content/products/
├── zh/stevia.md    # lang: zh, name: 甜菊糖苷提取物
└── en/stevia.md    # lang: en, name: Stevia Extract
```

---

## 图片管理

### 图片存放位置

```
public/images/
├── products/       # 产品封面图
└── solutions/      # 解决方案封面图
```

### 引用方式

在 frontmatter 中：`image: /images/products/stevia.webp`

### 图片规格建议

| 项目 | 建议 |
|-----|------|
| 格式 | **WebP**（推荐）、JPG、PNG |
| 尺寸 | 1200×654px，保持 4:3 比例 |
| 文件大小 | **50KB 以内**（WebP 格式通常可达到） |
| 命名 | 英文小写，与内容 slug 一致（如 `monk-fruit.webp`） |

### 图片压缩方法

上传图片前请进行压缩优化，推荐使用以下方法：

**方法 1：命令行工具（推荐）**

```bash
# 安装工具（仅需一次）
brew install webp

# 压缩单张图片：调整尺寸并转为 WebP
sips -Z 1200 input.jpg --out temp.png && cwebp -q 85 temp.png -o output.webp && rm temp.png

# 批量压缩当前目录所有图片
for f in *.jpg *.png; do
  name="${f%.*}"
  sips -Z 1200 "$f" --out "${name}_temp.png" 2>/dev/null
  cwebp -q 85 "${name}_temp.png" -o "${name}.webp" 2>/dev/null
  rm "${name}_temp.png" 2>/dev/null
done
```

**方法 2：在线工具**

- [Squoosh](https://squoosh.app) - Google 出品，支持 WebP 转换
- [TinyPNG](https://tinypng.com) - 简单易用的压缩工具

### 图片显示位置

| 位置 | 说明 |
|-----|------|
| 首页产品系列 | 显示产品的 `image`，无图片时显示默认图标 |
| 产品中心列表 | 显示产品的 `image`，无图片时显示默认图标 |
| 产品详情页 | 页面顶部显示封面图 |
| 解决方案页面 | 显示解决方案的 `image` |

---

## 常见问题

### Q: 创建内容后需要修改代码吗？

**不需要。** 网站会自动读取内容：

- 新产品自动出现在导航菜单、产品页面
- 新解决方案自动出现在对应行业页面
- 关联关系自动在两边显示

### Q: 如何隐藏未完成的内容？

在 frontmatter 中添加 `draft: true`：

```markdown
---
name: 新产品（草稿）
draft: true
---
```

### Q: 文件名有什么要求？

- 使用英文小写
- 用连字符分隔单词
- 不要使用中文、空格或特殊字符
- 示例：`monk-fruit.md`、`green-tea.md`

### Q: 如何预览修改？

1. 确保开发服务器运行中（`npm run dev`）
2. 保存文件后浏览器会自动刷新
3. 访问 `http://localhost:4321` 查看

---

## URL 结构

| 内容类型 | 中文 URL | 英文 URL |
|---------|----------|----------|
| 产品列表 | `/zh/products` | `/products` |
| 产品详情 | `/zh/products/monk-fruit` | `/products/monk-fruit` |
| 解决方案列表 | `/zh/solutions` | `/solutions` |
| 解决方案详情 | `/zh/solutions/zero-sugar-sparkling` | `/solutions/zero-sugar-sparkling` |

---

## 内容检查清单

发布新内容前，请确认：

- [ ] 中英文版本都已创建
- [ ] 文件名一致（如 `zh/stevia.md` 和 `en/stevia.md`）
- [ ] `lang` 字段正确设置
- [ ] 必填字段都已填写
- [ ] 图片已上传到正确目录
- [ ] `solutions` 关联的 slug 拼写正确
- [ ] 在本地预览确认显示正常

---

## 快速参考

### 产品 frontmatter

```yaml
---
name: 产品名称
nameEn: Product Name (可选)
latinName: 拉丁学名 (可选)
lang: zh
description: 简短描述 (可选)
image: /images/products/xxx.jpg (可选)
solutions: (可选)
  - solution-slug-1
  - solution-slug-2
draft: false (可选)
---
```

### 解决方案 frontmatter

```yaml
---
name: 方案名称
nameEn: Solution Name (可选)
lang: zh
industry: beverages  # beverages/nutraceuticals/cosmetics/food
description: 简短描述 (可选)
image: /images/solutions/xxx.jpg (可选)
draft: false (可选)
---
```

---

## 日常内容生产工作流

本节说明如何持续产出市场研究 Blog 和 Solution 内容。

### 工作流概述

```
┌─────────────────────────────────────────────────────────────────┐
│                        选题阶段（周期性）                          │
├─────────────────────────────────────────────────────────────────┤
│  1. 检查现有 Solutions，避免重复                                   │
│  2. 通过 WebSearch 搜索行业信息源                                  │
│  3. 分析趋势，识别潜在 Solution 机会                               │
│  4. 将选题添加到 TOPIC_BACKLOG.md                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        执行阶段（日常）                            │
├─────────────────────────────────────────────────────────────────┤
│  1. 从 TOPIC_BACKLOG.md 选择一个选题                              │
│  2. 深入研究，撰写 Market Research Blog（中英文）                  │
│  3. 设计 Solution 方案（中英文）                                   │
│  4. 生成配图（Blog + Solution 各需要封面图）                       │
│  5. 更新相关产品的 solutions 关联                                  │
│  6. 在 TOPIC_BACKLOG.md 中标记完成                                │
└─────────────────────────────────────────────────────────────────┘
```

### 信息源

**推荐使用 WebSearch + site: 操作符**（这些网站使用 JS 渲染，RSS/WebFetch 效果不佳）：

| 信息源 | 领域 | 搜索示例 |
|-------|------|---------|
| nutraingredients.com | 营养品原料 | `site:nutraingredients.com botanical extract 2026` |
| cosmeticsdesign.com | 化妆品原料 | `site:cosmeticsdesign.com natural ingredients` |
| beveragedaily.com | 饮料行业 | `site:beveragedaily.com functional beverages` |
| foodnavigator.com | 食品行业 | `site:foodnavigator.com plant-based` |
| grandviewresearch.com | 市场报告 | `site:grandviewresearch.com extract market` |

**可用的 RSS 源**（作为补充）：

| 信息源 | RSS URL |
|-------|---------|
| SupplySide | https://www.supplysideshow.com/rss |
| Nutritional Outlook | https://www.nutritionaloutlook.com/rss |

### 选题管理

选题列表维护在 `TOPIC_BACKLOG.md` 文件中。

**选题原则：**

1. **检查重复** - 选题前先查看现有 Solutions，避免重复
2. **具体可落地** - 选题应该是具体的产品方案，不是泛泛的行业趋势
3. **关联产品** - 优先选择能关联到我们现有产品的选题
4. **市场热点** - 结合当前市场趋势和热点

**现有 Solutions（选题时避免重复）：**

执行以下命令查看：
```bash
ls src/content/solutions/zh/
```

### 内容产出规范

每个选题需要产出：

| 内容类型 | 存放位置 | 说明 |
|---------|---------|------|
| Market Research Blog（中文） | `src/content/blog/zh/` | 市场分析文章 |
| Market Research Blog（英文） | `src/content/blog/en/` | 英文版本 |
| Solution（中文） | `src/content/solutions/zh/` | 产品方案详情 |
| Solution（英文） | `src/content/solutions/en/` | 英文版本 |
| Blog 封面图 | `public/images/blog/` | WebP，1200×654px |
| Solution 封面图 | `public/images/solutions/` | WebP，1200×654px |

### Blog 文件模板

```markdown
---
title: "标题：突出市场趋势和数据"
lang: zh
publishDate: "2026-01-24"
category: market-insights  # market-insights/ingredient-spotlight/industry-news/research
tags: [标签1, 标签2, 标签3]
description: 简短描述，包含关键数据点
image: /images/blog/xxx.webp
sources:
  - title: "来源标题"
    url: https://example.com/article
relatedProducts:
  - product-slug
relatedSolutions:
  - solution-slug
---

## 市场信号

开篇介绍市场动态或事件...

## 数据分析

| 指标 | 数据 |
|-----|------|
| 市场规模 | $XX亿 |
| 增长率 | XX% |

## 趋势解读

分析背后的原因和影响...

## 对原料供应商的启示

1. 需求变化
2. 规格要求
3. 应用创新

## ZL Botanicals 观点

我们的产品如何满足这一趋势...

---

> 想了解我们的XXX产品？[联系我们](/zh/contact) 获取样品。
```

### 执行步骤详解

#### 第1步：选题

从 `TOPIC_BACKLOG.md` 待执行列表选择，或用 WebSearch 搜索信息源发现新选题：

```
WebSearch: site:nutraingredients.com functional mushrooms 2026
WebSearch: site:cosmeticsdesign.com botanical extracts trends
WebSearch: site:beveragedaily.com zero sugar natural sweetener
```

分析选题：
- 识别热点话题
- 确认与我们产品的关联性
- 检查是否与现有 Solutions 重复

#### 第2步：深入研究

针对选定的选题，搜索更多市场数据：

```
WebSearch: [选题关键词] market size growth 2026
WebSearch: [选题关键词] consumer trends research
```

收集：市场规模、增长率、消费趋势、竞品案例、技术创新点

#### 第3步：创建内容文件

**Blog 文件**（中英文各一个，文件名必须一致）：
```
src/content/blog/zh/xxx-market-2026.md
src/content/blog/en/xxx-market-2026.md
```

**Solution 文件**（中英文各一个，文件名必须一致）：
```
src/content/solutions/zh/xxx-product.md
src/content/solutions/en/xxx-product.md
```

#### 第4步：生成配图

使用 image-generation skill 生成配图：

```bash
python3 ~/.claude/skills/image-generation/scripts/generate_image.py \
  --prompt "图片描述..." \
  --aspect-ratio 16:9 \
  --output /path/to/public/images/blog/xxx.webp
```

压缩图片（确保 < 100KB）：

```bash
cd /path/to/image/directory
sips -Z 1200 xxx.webp --out temp.png
cwebp -q 85 temp.png -o xxx.webp
rm temp.png
```

需要生成的图片：
- Blog 封面图：`public/images/blog/xxx.webp`
- Solution 封面图：`public/images/solutions/xxx.webp`

#### 第5步：更新产品关联

编辑相关产品的 md 文件，在 `solutions:` 字段添加新 solution 的 slug：

```yaml
# src/content/products/zh/turmeric.md
solutions:
  - liver-support-gummy
  - turmeric-golden-latte  # 新增
```

中英文产品文件都需要更新。

#### 第6步：标记完成

更新 `TOPIC_BACKLOG.md`：
1. 将选题从"待执行"移至"已完成的 Solutions"
2. 记录完成日期和关联产品

---

## 联系技术支持

如有问题，请联系开发团队。

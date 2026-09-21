# 接骨木采购解释稿：页面位置与集成建议

## 当前交付状态
完整双语稿完成；事实/引文自检完成。尚未独立审查、集成、构建或发布。只写入本研究目录，不改仓库与共享backlog。

## 去重基线
- 只读本地 origin/main：`b842a492a415abe0b0362a92d9494b6a1063ac3a`，未执行git fetch；父级集成前须核最新远端差异。
- 扫描 src 内容/数据/组件/路由，未见 elderberry/接骨木、citrus fiber/柑橘纤维专题。果胶有枸杞软糖/罗汉果工艺背景提及，不是本题。
- 共享backlog.json按 elderberry/接骨木/citrus/柑橘/花青素/anthocyan 查无候选匹配；查重过程保存在 site-dedup.json。
- 已读取现有 paprika-extract-format-selection 全文与两种语言博客路由；邻接应用页和询价页全文另存 site-snapshot/。此处不是依据slug猜内容。

## 与既有内容的实质差异
1. 辣椒红现有页讨论油标准化/水分散、色价与辣味；接骨木稿核心是同一花青素档位下真实的普通/高纤维材料差异及方法限值，不复用其诊断结构或空白表。
2. 皂树属于饮料乳化选择，迷迭香属于抗氧化剂形态；本稿主要承接补充剂/品牌配方的黑接骨木果实原料，颜色只是用途边界。
3. `/solutions/nutraceuticals/`现有页是剂型/投料表现概览；可增加一个“接骨木标准化与高纤维材料”阅读入口，不改其现有H1。
4. `/solutions/beverages/`目前重点茶、甜菊和皂树；本稿可作为相关材料延伸，不把它改成接骨木着色采购页。

## 建议一对URL（一主题，不拆成4%、7%、HighFiber多个薄页）
- EN `/resources/blog/elderberry-material-selection/`
- ZH `/zh/resources/blog/elderberry-material-selection/`
- 现有 `src/pages/resources/blog/[slug].astro` 与中文对应路由可承接；未来若要完整接骨木百科，应另作有实质内容的普通原料名页面，而非将这篇比较文冒充百科。
- 分类建议沿用 `ingredient-spotlight` / `sourcing-guides`；相关行业 nutraceuticals 为主，beverages 次之。先核分类枚举，不增加空分类。
- EN SEO title: `Elderberry Extract Selection: 7% Anthocyanins and HighFiber Grades`
- ZH SEO title: `接骨木提取物选型：7%花青素与高纤维等级的区别`
- EN description: `Compare real elderberry ingredient specifications: conventional and HighFiber grades, anthocyanin assay methods, carriers and product roles.`
- ZH description: `从真实供应商规格看普通与高纤维接骨木提取物，厘清花青素检测方法、载体及补充剂和颜色用途，避免只按百分比采购。`

## 内链和商业承接
正文补充剂段落链接 `/solutions/nutraceuticals/`，饮料颜色段落链接 `/solutions/beverages/`，尾段“采购与询价沟通”链接 `/request-quote/`；中文全部使用 `/zh/`路径。已有页面作为入口，勿新增假产品详情链接。未验证查询参数，CTA不拼造product=elderberry参数。

正文首次提及Iprona、Artemis、Rubini时可加对应实际外链，保留原有逐主张编号引用；不能链接到品牌首页替代支持具体数值的PDF。数字引用须集成为可点击锚，表格源注与约号≥符号必须保留。

ZL供货段来自任务中业主确认的广泛采购/询价范围，不是外部认证。没有授权代理这些品牌的证据，不能改写为“ZL供应ElderCraft/Rubini”；没有库存、报价、MOQ、交期、认证材料，正文未虚构。

## 集成验收重点
- 不将Iprona产品清单的7%行强行映射到2023 B0120169为同一现行SKU；两类文件在文章中承担不同证据任务。
- 纤维43%/54%是approximately，不能变成minimum；表中elderberry fiber并未定义为某AOAC总膳食纤维值。
- 不把pH差示/HPLC范围写成实测差值、方法换算或抽检不合格。
- 保留2023规格Issue Date与当前读取日期的区别；Iprona文件名26不是已证实发布日期。
- HighFiber TDS、COA、溶解性和完整辅料组成未得；无载体宣传页403，不采其搜索摘要入稿。
- 在窄屏真实验收两个表的数值和行身份；无需图表装饰或空白下载表。此次未生产图片。
- 独立审查需要同时读双语完整稿、claim-evidence和原始PDF/XML；不能仅以citation CLI通过代替事实/自然中文审查。

## 搜索词范围
已实际搜索：citrus fiber pectin difference beverage emulsification；elderberry juice powder extract anthocyanins maltodextrin official product；black carrot purple sweet potato anthocyanin beverage color；另检索elderberry原料及论文。一次general elderberry authenticity检索403后改Europe PMC API，成功取得全文。未测量搜索量或关键词难度；中文关键词建议是编辑候选，未执行中文SERP验证。

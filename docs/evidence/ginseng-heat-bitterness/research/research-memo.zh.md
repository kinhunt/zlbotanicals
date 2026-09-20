# 新原料研发问题：加热后更苦的人参饮料，能不能照搬纯水遮苦结果？

日期：2026-09-20。状态：研究验证完成，附实质中英编辑草稿；不是工厂实验、发布稿或量产配方。

## 选择结果

优先验证**西洋参乳饮的热后苦味与跨基质遮苦迁移**，而不是泛写人参功效或“热加工提高稀有皂苷”。意外收获：公开乳饮试验同时报告加工后总皂苷回收不完整与更强苦味，不能用“总皂苷越少就越不苦”的单轴假设指导成品；另一个训练评委试验证明遮苦可以起作用，但其水/模型能量饮料、材料身份与热后乳饮不同。[1][2] 这些证据足以写出研究边界明确的研发决策文章，**不足以推荐商业遮苦配比或证明某单体导致热后苦味**。

## 先比较三个真实方向

下表的优先级是本次编辑判断，不是搜索量或市场评分。无BrowserMan、社区样本或GSC数据参与；没有把论文存在当作需求规模。

|候选问题|真实触发源与研究任务|既有内容差异与价值|证据/成本判断|决策|
|---|---|---|---|---|
|“水溶”姜黄做澄清饮料，透光、粒径与化学保留为何不能互相替代？|2017年透明微乳原始研究的出版社摘要片段，研究脂质类型与透明体系。[5]|origin/main 已写“小液滴不保证透明”、DLS稀释1000倍、3天Turbiscan与28天粒径观察差异，还写上清/沉淀/容器色素核算；泛透明/沉淀诊断会重复。要新增价值需取得不同体系的完整透明度方法和真实饮料稀释数据。|本次仅摘要片段，虽有价值但新增正文/图表验证成本较高。|保留，不再写通用“水溶≠透明”薄页。|
|人参热处理后苦味是否随总皂苷减少而减弱？纯水遮苦能迁移到乳饮吗？|2012西洋参UHT低乳糖乳饮研究；2010水/模型能量饮料环糊精感官研究。[1][2]|既有人参页有蒸制转化、酸热、专利苦味抑制与通用稳定性核查，未收录这两个直接感官试验；新增的是真实成品热后体验、两个基质之间的证据断层和分离对照。|两篇原始摘要可获取，另有水热转化全文供机制边界反核。可写研究综合而非新百科。|选中。|
|DGL“free of GA”是否等于零甘草酸？柱分离纯度能否作为放行规格？|Fu等2005树脂分离原始摘要。[3]|既有完整甘草页已含21.9%黄酮/66%甘草酸、残留定量限、盐型/干基、DGL不等于光甘草定以及完整动态柱方法缺口。|同一原文的摘要不会形成新证据；必须找到完整方法/市售批次残留分析或新标准才能推进。|放弃本轮；不重写已有规格解释。|

## origin/main 只读盘点与差异依据

基线SHA：`c035c1f24ed558e7048905060e2ff88f9fbff000`。读取的是本地当前远端跟踪引用 `origin/main`，没有fetch、checkout、写工作树或修改任何仓库文件，也不声称已查询远端最新提交。

完整百科12种：绿茶、积雪草、罗汉果、姜黄、灵芝、人参、银杏、葡萄籽、枸杞、甘草、甜菊、白藜芦醇。盘点由 `git show origin/main:src/data/deep-ingredients.json` 提取，见 `site-snapshot/encyclopedia-inventory.json`。

已读并归档三候选在 `deep-ingredients.json`、`ingredient-reader-packs.json`、`ingredient-knowledge.json` 的记录及对应中文产品页，另读 `TurmericKnowledge.astro` 和 `turmeric-formulations.ts`。已有内容不是空白：

- 人参已写“在相同实测目标皂苷剂量下比较……苦味与回味”，以及“主峰下降……区别化学转化、物理析出和分析提取不足”。本稿不重复列检查表，而以**热加工×原料加入的对照逻辑**解释为什么冷样遮苦筛选不能取代成品评价。
- 人参既有引用包括苦味抑制专利US9011940B2、黑参工艺、红参综述和酸热原始研究PMC6190498。本稿两个直接感官证据的PMID/DOI在全站src文本检索无命中。
- 全src检索的唯一数字命中“67.6”实际属于姜黄粒径67.68 nm，非人参67.6%回收率；见 `novelty-search.json`，不能把数字巧合视为重复。
- 建议未来优先作为既有人参知识页的独立深读模块或一篇有独立故障诊断意图的研究文章，与人参采购/百科双向内链；本次不创建路由，不修改站点。

## 小验证：读到了什么，没读到什么

### A. 真正的成品感官信号：西洋参UHT乳饮

原始论文：*Active compounds and distinctive sensory features provided by American ginseng (Panax quinquefolius L.) extract in a new functional milk beverage*，2012，DOI `10.3168/jds.2012-5341`，PMID 22818438。Europe PMC原始摘要已获取并落盘，**未取得论文完整方法/表格**。[1]

- 研究为低乳糖乳饮、西洋参根提取物、UHT加工；使用HPLC与训练小组描述性感官分析。[1]
- 摘要报告加工后7.52 mg总皂苷/100 g乳饮，对照未加工提取物为67.6%回收；工业加工样品的褐色、苦味、金属味最高；香草香精与三氯蔗糖加入后苦味减弱。[1]
- 摘录：“Levels of brown color, bitterness, and metallic taste were highest in the industrially processed ginseng-enriched milk.”[1]
- 不能从摘要判断损失全部由热降解造成，不能把32.4%算成任何商业人参饮料的热损耗常数，也不能确认具体UHT温度时间、单峰变化、评分显著性与添加顺序。本稿不引用摘要中的认知功效推断：该饮料研究摘要不是成品人体认知试验。[1]

### B. 可行但不能照搬的反证：环糊精遮苦

原始论文：*Sensory properties of ginseng solutions modified by masking agents*，2010，DOI `10.1111/j.1750-3841.2010.01749.x`，PMID 21535568。已取得Europe PMC原始摘要，**非全文**。[2]

摘要描述每100 mL溶液含0.052 g、标称80%皂苷的panax ginseng材料；12名训练评委评价42处理（3处理×7水平×2基底），带/不带鼻夹；水与模型能量饮料中，0.09 g γ-CD/100 mL或1 g β-CD/100 mL在研究筛选中使苦味强度减半。[2]

摘录：“Twelve trained panelists evaluated 42 solution treatments (3 treatments × 7 levels × 2 bases) for bitter attributes with and without nose clips.”[2]

这是“苦味不可能改善”的反证，不是UHT乳饮的适配证明。两个研究材料身份、基质、加工、响应值不等同；训练感官强度降低不是消费者购买意愿、活性保留或长期稳定性提升。[1][2] 所列用量只为原研究身份核对，不作为配方建议。

### C. 全文反核：不能用皂苷转化论文证明苦味机制

原始论文：*Effect of hydrothermal processing on ginseng extract*，DOI `10.1016/j.jgr.2016.12.002`，全文XML和正文已归档。实验为4年生Panax ginseng，50%乙醇索氏提取、除乙醇后调4 wt%固形物，在23 mL批式反应器中100–160°C反应，研究HPLC皂苷与化学抗氧化测定；不是含乳饮料感官试验。[4]

全文发现最大Rg3得率与Rk1/Rg5并不随温度同方向变化，并讨论生成与分解速率竞争；这反对“热越强所有目标皂苷越高”的简化说法，但**没有建立Rg3含量与人类苦味评分之间的定量因果**。[4] Methods给140°C时间范围15–135 min，而Results列出10 min点；这里只陈述研究尺度和因果边界，不输出可复制工艺参数。

## 假设被怎样修改

1. 起初可疑解释：“热后苦是总皂苷浓度上升。”修改为：在特定乳饮研究中，总回收不完整仍伴随苦味增强，必须将分析组成与实际感官同时测；不能只以总量预测苦味。[1]
2. 起初可疑解释：“公开遮苦剂的有效用量就能直接开发人参乳饮。”否定迁移结论：有效试验在另一材料/基质上；它证明有研究路径，不提供目标配方的效应值。[1][2]
3. 起初可疑解释：“找到水热转换全文就能补上热后苦味机制。”否定：阅读全文后只可用于排除工艺条件等价假设；它没有感官终点。[4]
4. 反向过度结论：“热处理一定使所有人参体系更苦。”不成立，本次仅一个西洋参乳饮研究，不外推Panax ginseng、植物饮、所有杀菌程序。[1]

## 交付与精确断点

已写 `ginseng-heat-bitterness.zh.md` / `.en.md` 一组实质双语草稿，以读者的“实验室冷样好喝、加工后不一样”为单一研发任务。它们可进入独立事实/语言审查，但未做站点集成、技术测试、发布或实验。

若后续要加入推荐剂量、工艺因果图或定量感官图，必须取得2012全文的样品A–D定义、精确热史、Tables 4/5、感官人数/量表/统计及HPLC回收方法；取得2010全文基液配方、环糊精型号与处理统计；再用目标合法原料、真实基底与经验证杀菌过程完成独立批次试验。现在不能补写这些信息。

外部访问问题：首次甘草搜索403，另一次搜索成功；ScienceDirect抓取失败、Wiley超时，改用Europe PMC公开核心记录得到原始摘要；姜黄出版社只拿到预览片段。没有绕过付费访问、没有用搜索摘要替代已读取论文证据。

所有引用采用本目录独立ledger，保留API原始JSON/XML、逐字摘录与SHA256清单。检验只证明引文链存在，不把自动校验称为独立事实审查。

## Sources

[1] https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:22818438%20AND%20SRC:MED&format=json&resultType=core — Active compounds and distinctive sensory features provided by American ginseng (Panax quinquefolius L.) extract in a new functional milk beverage.
    > "Total ginsenoside content in the UHT-treated milk enriched with the ginseng extract after UHT process treatment was 7.52 mg/100 g of milk, corresponding to a recovery of 67.6% compared with the content in the unprocessed extract."
    > "Levels of brown color, bitterness, and metallic taste were highest in the industrially processed ginseng-enriched milk."
    > "The bitterness attributable to ginseng extract was reduced by addition of vanilla flavor and sucralose."
    > "Individual ginsenosides in the milk were analyzed by HPLC."
[2] https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:21535568%20AND%20SRC:MED&format=json&resultType=core — Sensory properties of ginseng solutions modified by masking agents.
    > "Twelve trained panelists evaluated 42 solution treatments (3 treatments × 7 levels × 2 bases) for bitter attributes with and without nose clips."
    > "Overall, the most effective treatments were 0.09 g γ-CDs in 100 mL of solution and 1 g β-CDs in 100 mL solution, which both reduced the bitterness intensity of the solutions by half."
    > "Effectiveness of the γ-CDs, β-CDs, and combinations of γ- and β-CDs were tested in 100 mL water and in 100 mL model energy drink base solutions containing 0.052 g 80% ginsenosides panax ginseng, using descriptive sensory analysis."
[3] https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:16130766%20AND%20SRC:MED&format=json&resultType=core — The application of macroporous resins in the separation of licorice flavonoids and glycyrrhizic acid.
    > "The adsorption capacity was found to depend strongly on the pH of the feed solution."
[4] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC5628343/fullTextXML — Effect of hydrothermal processing on ginseng extract — full text
    > "The hydrothermal reactions were performed using an oil bath (COB-22, Chosun Instruments, Seoul, South Korea) with 23-mL batch reactors."
    > "For 20(S)-Rg3, the increase in the decomposition rate with increasing reaction temperature was estimated to be greater than the corresponding increase in the generation rate."
    > "The concentrate was diluted to 4 weight% (wt%) solids for use as a reactant in the hydrothermal reaction.
The hydrothermal reactions were performed using an oil bath (COB-22, Chosun Instruments, Seoul, South Korea) with 23-mL batch reactors."
    > "However, the maximum yields of Rk1 and Rg5 increased because the increases in the generation rates of Rk1 and Rg5 with temperature were greater than the increases in the corresponding decomposition rates."
[5] https://link.springer.com/article/10.1007/s11483-016-9461-4 — Development of Transparent Curcumin Loaded Microemulsions — publisher abstract preview
    > "It was found that the maximum lipid content allowing transparent microemulsions (mean particle diameter of around 25 nm) to be obtained was greatly affected by the lipid characteristics."

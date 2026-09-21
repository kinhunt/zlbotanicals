# 接骨木双语冻结候选：独立事实、编辑与商业价值审查

## 结论

**内容尚未无条件PASS；仅需3组局部修订，可直接在集成阶段落实，不需退回研究或重写全篇。** E1中文高纤维段自然表达；E2双语Food to Live采集过程口吻；E3双语175 mg小标题把未知写成否定。精确原文和替换均在 `editorial-fixes.md`。完成后复核该小范围diff、双语hash及实际渲染，即可进入最终内容批准。当前审稿不等于发布或视觉批准。

作者README及package-sha256实际位于上一级交付目录，并非elderberry子目录。已读取并校验所有53个elderberry清单项及README，共54项全部匹配。此前pre-freeze记录仅是当时状态，由本报告取代。

## 冻结稿SHA256

- EN `elderberry-material-selection.en.md`: `94fabcbadf165c0c16a606f30b14ac4f52676188e1a86ffacda39d497feb15e8`
- ZH `elderberry-material-selection.zh.md`: `f277783ee7cdd661df85962dc63ba85efa17b7acff9d5e2a60e422df5be5a809`
- 全部核对结果及作者manifest自身hash：`final-review-hashes.json`。

## 事实核验结果

1. 两个7%等级均宣称花青素≥7%，但纤维为约5.2%与约43%；两个4%等级纤维约3.1%与约54%。已读Iprona原文并查看原PDF第2页图像，产品行及符号匹配。正文保留约值和分析口径未知，没有升级为成品营养声称或最低纤维保证。[5]
2. Artemis两份规格按pH差示/HPLC分别为7.00–8.80/6.50–8.10，以及4.00–5.40/4.10–5.30 g/100 g；均以cyanidin-3-glucoside计。稿件明确是规格范围，不是同批实测比较，也没有编造方法换算。两组多酚限值和当量也准确。[1][2]
3. 麦芽糊精、膜分离、喷雾干燥、提取比32:1与16–18:1及溶解性均可在各自规格找到。未移植为HighFiber完整辅料或溶解性事实。文档Issue Date与数字签名日期已区分。[1][2]
4. 同品牌体系关系保留，未将Artemis/Iprona算作两家独立实验室交叉验证。Rubini仅支持另一采购用途，未宣称与ElderCraft等价。[5][7]
5. 原始Amazon三个get_product JSON均完整读过；另外从作者归档raw.html重新提取#productTitle及#feature-bullets。Food to Live同ASIN标题Juice Powder+Maltodextrin与bullet entire berries冲突确实存在。文章没有据此断言实物组成或欺诈。E2只是正文表达修订，并不删除必要边界。[9]
6. Terrasoul的100% elderberries/no additives是商品声明，未独立验证组成；Bulk Essentials的175mg标题未注明对应成分。**E3仅修小标题过强判断**，正文已有正确限定。[10][11]
7. 综述仅用于身份/成分分析背景，未借用供应商或论文功效宣传为成品疗效背书。[8]

14/14 claim-evidence引文逐字存在于对应完整归档且quote SHA256一致。独立调用只读verify_draft，EN/ZH均exit 0、无错误、8个所引来源均有证据。EN自动覆盖率18%、ZH92%受句切分与英文建议句影响，不能冒充人工事实覆盖率；实际结论依据全文与来源逐项检查。

## 商业价值与语言

选题有真实差异化：以同样7%却不同纤维组成引入，连接检测口径、载体、真实零售表达和配方成本，而非泛化“询问供应商”清单。Amazon已成为独立实质章节，含三个品牌直链及不同采购后果，不是附录补丁。Iprona、Artemis、Rubini正文也有上下文直链。

EN整体自然，ZH结构连贯但E1拟人句及E2采集过程句不适合作为完成稿；另有少量建议润色见补丁。限定总体必要，但个别段落重复“不是……”可用补丁压缩，不应删掉Food to Live、规格范围与高纤维标签的必要边界。

商业CTA可用，集成时应连接真实本地化询价入口；不暗示ZL持有被举例品牌的经销权、现货、认证或已验证样品。无需追加销量、价格排名或市场规模。三样本不能推导市场结构，稿件对此有简洁方法说明。

## 两表逐项图型审查

| 展示 | 判定 | 理由与集成验收 |
|---|---|---|
| 普通/HighFiber四等级组成表 | 保留原生HTML表 | 这是两种指标和四等级的对照；最低花青素与近似纤维不可堆积为组成，也不可做饼图。≥和约/≈须跟数字保留。若手机表格过宽，按等级分四卡，每卡完整保留等级、两指标与单位，不能拆成失去产品身份的裸数卡。 |
| 两方法规格范围表 | 保留原生HTML表 | 两行产品三列，读数优于图。不得画成实测柱图、差异显著性图或连线趋势；区间图也非必要。手机若拆卡，每卡标题含等级+编号，两方法各占一行且明确g/100 g；“规格范围，不是批次实测”应随表/卡出现。 |

这属于数据与图型选择审核。**未查看文章渲染、桌面或手机截图，没有通过视觉/无障碍门槛。** 网站集成后须检查320–390px实际数字可见性、范围不拆断、来源文字可读、引用可点和表格/卡片身份保留。原PDF页面图像审核不能替代文章视觉审核。

## 证据定位与引用

本报告编号复用冻结作者source-ledger，不新建或改号；正文具体证据见 `claim-evidence.json`、本目录 `evidence-audit.json`及父级 `2026-09-21-evening-browser/receipt.md`与三个product-*-result.json。审阅期间未修改作者文件、未调用BrowserMan、未发布。

## Sources

[1] https://artemis-nutraceuticals.com/wp-content/uploads/2024/09/B0120169-ElderCraft-7-Spec.pdf — Artemis ElderCraft 7% specification B0120169, Version 09
[2] https://artemis-nutraceuticals.com/wp-content/uploads/2024/09/B0120253-ElderCraft-4-Spec.pdf — Artemis ElderCraft 4% specification B0120253, Version 08
[5] https://www.iprona.com/fileadmin/Holundersamenoel/2025/IPRONA_Lieferprogramm_Extrakte_26_web.pdf — Iprona Health & Nutrition standardized fruit extracts product list
[7] https://www.iprona.com/en/our-procuts-and-services — Iprona ingredients for food and beverages
[8] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10096080/fullTextXML — Elderberry Extracts: Chemical Composition, Quality Consistency and Analysis (2023 review, full text)
[9] https://www.amazon.com/dp/B097YTRXG5 — Amazon Food to Live B097YTRXG5 product listing
[10] https://www.amazon.com/dp/B086BXMF5X — Amazon Terrasoul B086BXMF5X product listing
[11] https://www.amazon.com/dp/B0FF6GT2NY — Amazon Bulk Essentials B0FF6GT2NY product listing

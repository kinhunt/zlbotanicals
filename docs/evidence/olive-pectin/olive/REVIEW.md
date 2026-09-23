# 独立事实与双语编辑审查：橄榄叶提取物包封

**结论：修订稿通过，可集成 EN/ZH 内容；不是发布回执。** 审查日期：2026-09-23。批准对象仅为本包 `reviewed.en.md`、`reviewed.zh.md` 的最终 SHA-256 版本，不是作者初稿或后续未复核版本。

## 已核实的核心事实

1. **排名逆转成立。** 实际查看原论文 Figure 8 原尺寸图片并结合图注辨认黑圆点＝未包封 OLE、灰菱形＝脂质体制备物。a 是商业柠檬饮料，b 是含抗坏血酸模拟体系，c 是不含抗坏血酸模拟体系。正文精确报告的约90/83、67/88与图像端点一致；47天、5°C，不是35天。统计显著性取自作者正文和统计方法，而不是从误差线推断。[4]
2. **含抗坏血酸体系没有被误写成等效。** 原尺寸图8b约87/90，与正文损失10–13%一致；保留“作者报告差异无统计学显著性”，不推导等效。低分辨率首次视觉读取将b粗估为85/88，原尺寸复核排除了这项分辨率误读，未把该粗估写入稿件。[4]
3. **35天试验独立。** 全文方法规定未包封提取物先经乙醇溶解、加缓冲液、去不溶物、定容，5°C储存35天；正文62.3/98.2/92.3/67.1%分别对应pH2/4/6/7。此次取得并实际查看 Online Resource 1 的Figure 3：横轴Time(day)，终点35，曲线与这些数字一致。正文稿保留约62/98/92/67，不制造图像小数精度。另一个脂质体释放试验是500h约21天，未与上述两试验混淆。[4][9]
4. **34%分母已主动修正为明确定义。** 全文式(1)与方法将包封组分中的目标酚质量除以包封＋未包封目标酚质量；橄榄苦苷结果为33.8±1.5%。稿件约34%的分母明确为两分离组分中测得的橄榄苦苷之和，不是提取物粉末、载体或投料总质量。分离测定属于操作性定义，不声称全部位于脂质体水相内腔。饮料终点是总橄榄苦苷，不是仅包封部分。[4]
5. **配方条件正确。** 模拟体系pH2.87，含抗坏血酸版本1.2mg/mL，饮料总橄榄苦苷约130µg/mL；两路线统一总指标成分投料，不按相同粉末重量比较。[4]
6. **材料不能互换。** 论文供应材料≥40%干重橄榄苦苷；Nutraceuticals Group 2025-04-01 V03文件为≥6%、参考4:1、干粉两年储存条件，稿件不把两材料混为一物。补足RH<60%条件，不把干粉保质期外推到液体。[4][5]
7. **摘要边界保留且收紧。** 热处理研究仅用原摘要支持组成变化与总酚/ABTS变化较小；感官研究仅用摘要支持11人、5.78/8.05mg OLE多酚/100g果昔、20mg/100g条件下蔗糖降低苦味24.9%。不是粉末或橄榄苦苷剂量，也没有蔗糖添加量。未声称取得这两篇全文。[7][8]

## 已落实的双语编辑

- 完整逐段、逐句阅读两稿，30个对应内容单元记录在 `sentence-review.en-zh.json`；这是人工语义审查记录，不是以机器引用通过代替中文审读。
- EN/ZH均补足包封率分母、总橄榄苦苷测定口径，以及35/47天试验区分。
- 删除“本次审查只取得摘要”“已取得全文”等内部工作流程口吻；在引入研究时自然说明“摘要报告”，保留实际证据层级。
- 删除重复的“不是最佳商业配方”“不是建议添加量”等泛免责声明；改成具体的配方比较口径、摘要缺蔗糖浓度、无法由化学保留验证热处理/感官/常温货架期等有用限制。
- 中文将“思慕雪”“训练型感官小组”改为“果昔”“经过训练的感官评价员”，减少“具名”“悄悄替换目标”等审查腔与说教。
- 不新增文章数值图表；三组饮料结果仍用文字列表。证据目录图片仅用于审查，不属于待发布视觉资产。
- `edits.json`记录主要定点修改；最终完整差异以 `changes.en.diff`、`changes.zh.diff`为准，包含最后一轮句级引用与措辞调整。

## 证据检查范围与限制

- 独立读取作者归档的真实全文HTML、供应商完整PDF提取文本、两份Europe PMC摘要；不是依赖作者REVIEW结论。
- 新下载论文原图8和完整补充DOCX，并实际看了原图8与补图3。正文中没有引用其他图表的新数值，未宣称审读所有无关图像。
- 未发现影响文章中心结论的正文—图像矛盾。作者正文另有未引用的早期释放浓度单位疑点，未采入。
- 首次补充链接解析误选页内锚点、随后准确选到真实DOCX；解析环境缺lxml，改用stdlib ElementTree成功；补图透明黑色TIFF最初显示为黑底，白底alpha合成后实际检查。原件、透明导出与白底可读派生件均保留，没有修饰数据。
- 没有重新做实验、统计分析或图像数字化；图像用于核对方向、时间、量级，数值精度与显著性仍归属于论文文字。
- 图像URL及补充URL见 `retrieval-manifest.json`，正文编号沿用作者本地ledger，新增[9]为真实补充文件。

## 验证与集成

- 两稿 `sources.py verify --evidence` 返回exit 0，均为citations OK。所有5个被引用来源有原文摘录；保留未用发现来源[1][2][3][6]，其警告不代表文章引用了失败正文。
- 英文验证器把句末紧邻的`[n]`与下一句合并计算，出现2条“more than 3 citations”句数警告；实际自然语言每句最多两个来源编号，无堆叠多源句。英文39%与中文100%机器句数覆盖不可横向比较。
- `SHA256SUMS.json`涵盖本包所有其他文件；`verification.json`绑定两稿的精确哈希与关键数字检查。
- 未修改作者包、网站、backlog、BrowserMan或其他电商工作包；没有发布、没有声称网站技术验收。

## Sources

[1] https://pubs.rsc.org/en/content/articlehtml/2024/fb/d4fb00044g
[2] https://doi.org/10.1002/jsfa.12371
[3] https://pubmed.ncbi.nlm.nih.gov/20722953
[4] https://doi.org/10.1007/s11483-020-09650-y — González-Ortega R, Šturm L, Skrt M, Di Mattia CD, Pittia P, Poklar Ulrih N. Liposomal Encapsulation of Oleuropein and an Olive Leaf Extract: Molecular Interactions, Antioxidant Effects and Applications in Model Food Systems. Food Biophysics. 2021;16:84–97. Published online 2 October 2020. doi:10.1007/s11483-020-09650-y. Full text.
[5] https://nutraceuticalsgroup.com/document/nigeher028501-mnspec.pdf — Nutraceuticals Group. Product Master Specification: Olive Leaf Extract 6% Oleuropein (Olea europaea l.). NIGEHER028501, MNSPEC V03. Issued 1 April 2025. Two-page PDF.
[6] https://www.iff.com/health-sciences/our-products/benolea
[7] https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1002/jsfa.12371&format=json&resultType=core — González-Ortega R, Di Mattia CD, Pittia P, Poklar Ulrih N. Effect of heat treatment on phenolic composition and radical scavenging activity of olive leaf extract at different pH conditions: a spectroscopic and kinetic study. Journal of the Science of Food and Agriculture. 2023;103(4):2047–2056. doi:10.1002/jsfa.12371. Europe PMC abstract record.
[8] https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:20722953%20AND%20SRC:MED&format=json&resultType=core — Kranz P, Braun N, Schulze N, Kunz B. Sensory quality of functional beverages: bitterness perception and bitter masking of olive leaf extract fortified fruit smoothies. Journal of Food Science. 2010;75(6):S308–S311. doi:10.1111/j.1750-3841.2010.01698.x. Europe PMC abstract record.
[9] https://media.springernature.com/original/springer-static/esm/art%3A10.1007%2Fs11483-020-09650-y/MediaObjects/11483_2020_9650_MOESM1_ESM.docx — González-Ortega et al. Online Resource 1: supplementary figures

# 石榴双语稿独立审查

## 结论

**原冻结稿：需有限修订；本目录完整修订稿：PASS（内容与证据审查，不是发布许可）。**

原稿核心论点成立：石榴汁的香气方向、总酚、花青素和小组接受度不能互相替代。所有正文选用的12组“均值±数值”均与原始XML表格的正确行列一致，没有把浓缩还原饮用汁误写成工业浓缩原料，也没有把商业样品差异写成单一浓缩步骤的因果效应。文章提供了风味导向的试样路径，足以作为应用内容，不必扩成通用采购清单。

须修正的是：1处证据台账错列定位，以及正文中统计名词、接受度适用对象、灭酶程序判断和少量中文表达。已提供完整EN/ZH修订稿与逐项diff，不要求作者自行重写。

## 冻结输入独立确认

首先读取并复制作者目录45个文件（当时HANDOFF已存在、SHA256SUMS尚未出现），之后独立读取作者最终SHA256SUMS，将全部45项与首次副本逐项比对：**零差异**。最后再次对作者目录取哈希，45项仍全部匹配，原有文件零变动。新增文件只有SHA256SUMS.json，不构成草稿变更。

- 原EN：`c9c49dcc1463fa847546a3dc4c3f5940fa4ad56e6438d90bcc1466d162cf0bda`
- 原ZH：`c78e308051e902fe77d179f2b0fef03cf05633c22f05ca670f96354f6e86f7bf`
- 审后EN：`f1b4a681a4aff0fd231af275751cf48150427ab0e1e30dfe3c32d1c2ae65b36e`
- 审后ZH：`f0c23b4b1fa74fd2fad26a1462ef10caf16942cfa4208308aef996a35e0228e7`

逐项结果、核验时间及差异列表见`final-freeze-verification.json`。作者文件、仓库均未改动；没有联网浏览、BrowserMan操作或发布。

## 直接核验结果

### [1] 市售果汁研究

原始档：`input/PMC8471094.xml`。标题直接读取article-title，与EN/ZH参考资料一致：*Chemical Composition, Antioxidant Activity, and Sensory Characterization of Commercial Pomegranate Juices*，2021。

- §2.1及表1：八款购入的100%果汁，4款from concentrate、4款not from concentrate。不是4款未稀释浓缩汁对4款单倍汁。产地、栽培、稳定化及浓缩方式不一致。
- §2.9：10名已受训评价员、9厘米非结构化线标度。不是10名普通消费者，更不是消费者偏好排序。
- §3.7与补图S2b：NFC偏石榴果实、鲜果、甜菜；还原汁偏干制水果、糖果、焦糖、蜂蜜、熟煮；整体香气强度相近。已独立检查S2图像：b有Smell overall intensity，d的Overall intensity与甜酸苦并列；未把d的指标当作闻香强度，未从雷达图读出精确数值。
- 表2：ICPJ7总酚3748.8 ± 19.8；INCPJ8为2614.0 ± 16.5，单位mg/L。§2.3明确以没食子酸表达，正文写mg GAE/L准确。
- 表4：对应样品花青素合计0.8 ± 0.0与280.6 ± 0.1 mg/L；INCPJ2是n.d.，不能改为零。正文没有这样改写。
- 表2与表4脚注明确mean of two different determinations ± standard deviation。原稿“两次测定的不确定性/误差”方向未错，但不如直接写“均值±标准差”准确。修订稿已明示SD，仍不当作批间波动。
- §2.5：花青素以cyanidin-3-O-glucoside为标准。不能将HPLC花青素之和与Folin总酚GAE直接相减。
- §3.3：HPP/PET样品无检出，以及残余酶活和透氧机制，是样品观察与作者推测，不是包装或高压处理的因果验证。正文边界合格。

### [2] 单宁酶研究

原始档：`input/PMC11941192.xml`。原始标题为*Study on the Effects of Tannase on the De Astringency of Pomegranate Juice*，2025；保留原题的De Astringency拼法，不自创更规范的题名。

- §2.3：同一25 kg果实批次；保留原文“30% of the aril membrane and peel by weight”。未定义分母，原稿谨慎处理正确；不是成品含30%果皮。
- §2.7及表2：10名食品专业师生，四项各10分。专业背景不自动等于训练过的消费者代表样本。修订稿将结论更明确地限定为这10人的评分。
- **表4真实时间列为0、30、60、90、120 min。** 独立XML定位`foods-14-00985-t004`，0→90 min：

| 指标 | 0 min | 90 min | 核验 |
|---|---:|---:|---|
| Color | 7.24 ± 0.6 | 7.02 ± 0.3 | PASS |
| Taste | 5.40 ± 0.3 | 8.53 ± 0.2 | PASS |
| Flavor | 7.79 ± 0.4 | 6.80 ± 0.4 | PASS |
| Acceptability | 4.48 ± 0.2 | 7.92 ± 0.3 | PASS |

- 表4没有误差脚注，正文检索standard deviation及standard error均无结果。不能按惯例补成SD或SEM；三次实验也不能反推这些感官误差的计算方式。稿件保留±并说明未知，正确。
- §3.4文字说flavor与acceptability都改善，与表4的flavor下降直接冲突。保留表格方向正确，但没有依据称这一下降具有统计显著性；两稿均没有这样写。
- Taste行从Distinct bitterness变成Mild astringency，并非独立涩感强度评分。文章没有把口感评分增量换算成脱涩率。
- 表3浓度g/L与§3.3验证结果mg/L相冲突，不能静默统一单位。§2.3写90°C 5 min，§2.6正交实验写沸水10 min；这是不同章节的不同程序，未必证明同一个实验自相矛盾。修订稿因此将“灭酶条件不一致”改为“两个章节记载的程序不同”，避免过度定罪，仍不据此提供量产处方。

### [5][6] 原始PDF及补充资料

独立用PDF解析器重新提取`sunmet-nfc.pdf`和`Table S3.pdf`，不只信任作者的txt。

- Sunmet TDS文档名NFC Pomegranate Juice；审核日January 07, 2025；最低14.5°Brix；酸度0.60–1.4% w/w as citric；浊度<100 NTU @16°Brix；亮深红、良好澄清、酸中带甜。稿件数字与条件全部吻合，也明确是供应商规格，不是某批实测或通用NFC标准。
- S3：Bitter为caffeine or quinine相关滋味；Astringency为Dry puckering mouthfeel associate with tea leaves。引用正确。中文“干果”容易让人想到坚果，改成“干制水果”以匹配干燥果实/葡萄干一类香气。

## 有限修正清单（全部已落实）

1. **台账定位错误**：原`claim-source-ledger.json`中claim为“Table4 time columns”的引句却是表3的`ATime/min | BTemperature/℃ | CEnzyme Dosage/(mL: 100 mL) | DBlank`。已在独立的`claim-source-ledger.reviewed.json`替换为表4真实时间标题，原始台账保留不动。这不影响原稿数值正确性，但影响证据可复核性。
2. **统计名称**：EN“reported uncertainties”、ZH“误差来自两次测定”改为两次测定的均值±标准差，避免将SD笼统当作测量不确定度。
3. **小组接受度**：EN“improved acceptance with some loss”、ZH“更容易接受”改为“该10人小组接受度评分升高、特征风味评分降低”。这是报告评分，而不是大众喜好或确定的风味损失机制。
4. **方法差异的措辞**：浓度单位冲突保留；灭酶从笼统“不一致”改为两个实验章节的程序不同。
5. **中文自然度与双语等效**：删去英文没有的“石榴含量越高越好”假想反驳；“四桶”改成明确的浓缩形态；“两种汁都可能闻得到”改为香气明显但方向不同；“干果”改“干制水果”；“深色调饮料”改“熟果风味饮料”，避免香气与颜色再次混淆；“合并报价口径”改“与果汁分开说明”。

全部原句、行号与替换句见`editorial-changes.json`；所有非空输入行均列于`line-by-line-review.json`。后者的PASS指该行无须改写，并不代替上面的证据定位。

## 读者价值与图表判断

现有结构可保留：应用目标 → 材料身份 → 香气分型及试样路径 → 总酚与色素背离 → 脱涩的感官取舍 → 简短风味brief。不是百科全书，无须机械增加设备、专利或配方模板。

最有价值的部分是：先换不合适的香气原料，而不是把一切问题都交给脱涩；总酚与色素采用不同方法和当量，不能混作一个高低指标；专业小组接受度提升不等于鲜果特征同步增强。保留这些具体判断，比追加供应商问题清单更有用。末尾已有的brief只占一小段，可保留，但不是必备下载模板。

**可纯文字发布，无必需新增图表。** 12组均值±数值用于两组明确比较，正文可以承载。若后续确需图，优先做分面而非综合评分：总酚和花青素用各自单位；单宁酶四项指标保持10分标度并注明小组范围与未知±定义。不要画总酚减花青素的组成图，不要画“NFC更好”的排名，也不要把0→90 min画成消费者偏好提升率。本次未制作或批准任何网页图表。

## 交付与验证范围

- `reviewed.en.md`、`reviewed.zh.md`：完整审后稿，保持原引用ID与文献链接。
- `reviewed.en.diff`、`reviewed.zh.diff`：冻结输入到审后稿的精确差异。
- `independent-raw-evidence.json`：直接解析XML的表头、表行、脚注、标题及12组端点断言，PASS。
- `claim-source-ledger.reviewed.json`：修正唯一错列的证据台账副本。
- `citation-check.en.json`、`citation-check.zh.json`：严格引用/证据验证均exit 0。中文仅在本目录临时验证视图中替换参考资料标题；中文覆盖率算法无可靠意义，不把100%当成质量证明。英文脚本统计29%亦不替代逐句实质审查。
- `input/`、`input-manifest.json`、`final-freeze-verification.json`：保留输入和独立冻结证据。

未检查网页渲染、移动端、表单、产品可供应性或在线文献当前状态；本任务依据原始归档做内容审查。未重新执行作者去重流程，不把作者的PR61去重结论当成本次独立发现。没有发布。

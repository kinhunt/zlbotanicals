# 独立最终审查：PASS

日期：2026-09-20。**研究修订交付通过，无需再作实质修订；原独立审查R1、R2均已解决。** 此结论针对当前文件版本，不是网站上线或取样执行批准。尚无网站截图，**视觉发布未验**。

## 审查范围与执行结果

完整阅读原`independent/review.md`，修订版`en.md`、`zh.md`、两份reader说明、两份CSV、research、sampling-plan、quote-ledger及集成交接说明。先完整阅读test_validate.py与validate.py，确认没有写文件路径后，用`PYTHONDONTWRITEBYTECODE=1`与`-B`实际执行，防止写入原目录的__pycache__。

- `python3 -B -m unittest -v test_validate.py`：exit 0，3个测试方法全部OK；包含10个单位/基准/代表性拒绝子用例、5个空表拒绝子用例。
- `python3 -B validate.py`：exit 0，38份原资产hash一致，11条引文命中，4个核心换算断言通过。返回的`independent_review:not_run`是作者验证器的固定标签，不是本次审查未执行；本次结果以本报告为准。实际stdout/stderr见test-execution.json。
- 我另用csv.reader解析原始CSV字节：33列/18列，均恰有表头加一条等宽全空数据行，没有空格占位、零、例数或公式。与父目录模板逻辑行完全相同，仅CRLF/LF换行不同；不把字节不同误报成数据变更。
- 我另从三份归档原PDF直接用PyMuPDF提取，不依赖作者fresh文本判真：Q01–Q10全部命中；Q11命中归档百科段落。仅去独立数字行并压缩空白，不改写词句。Q10还限定在PDF第15页命中。
- 三份正文的`sources.py verify --evidence`均exit 0。未引用账本来源警告是预期；该检查只证明映射/证据存在，语义支持另行人工核对，不将英文低覆盖或中文分句器计数当成质量评分。
- 审查前后66个输入文件SHA-256全部一致，新增文件仅在本目录。完整清单见input-sha256.json及review.json。

## R1：已解决

Q10从8888字符收窄为693字符，准确定位印刷/PDF第15页314–322行；开头“If the sampling depth”、结尾“Raman signal is 0.013 g.”在归档PDF该页逐字支持。6 mm光斑、假定振实密度0.45 g/cm³、3.5 mm等贡献假设、上层1 mm贡献约90%信号均保留。[6]

`research.md:68`与quote-ledger现已明确静态粉床几何估算。独立读取第19–20页422–426行，确认4.99 g/1.43 g是另一动态估算；第6页122–127行确实说明三组分实验使用3 mm光斑。修订没有把0.013 g或1.43 g无条件套到阿斯巴甜动态曲线。四页独立提取原文已保存在本目录。[6]

这里的“真实性通过”指与归档原始PDF一致并且上下文支持；本轮未联网重抓，不将本地重复提取称为第二个独立来源。

## R2：已解决

`sampling-plan.md:51`和双语reader的数字合同明确：1% w/w保存为`1` + `% w/w; as_received`，等于10 mg/g；同浓度质量分数为`0.01` + `g/g; as_received`。两者乘2 g均为20 mg。`0.01`配百分数单位则合法地表示0.01%，只得到0.1 mg/g、2 g袋得0.2 mg，不替填写者猜意图。正文双语例子与合同一致，且明确是合成换算例，不是实测。

## 技术与双语审查

- **质量守恒：PASS。** 完整密封且无漏失/降解时，颗粒重排不改变整袋目标组分质量。灌装前散装分层与封袋后重排分开；整袋回收与实际部分取用分开。没有以部分浓度无依据外推整袋。
- **单位与基准：PASS。** g×mg/g=mg/袋；%数值×10、g/g×1000正确；实验室整袋mg不再乘袋重。干基先保留原值和证据再换原样基；水分校正带有质量分数及方法适用前提。sample_mass_g不代替net_sachet_mass_g。物性MPa、µm、g/mL均分栏，堆/振实/真密度不混用。
- **未知/LOQ：PASS。** 缺测、未定量、低于LOQ或缺转换依据时数值栏留空，原因及定量限/限定符另记，不以零填补；有依据的数值零也未被一概禁止。未知属性在对应方法栏解释。
- **独立单位：PASS。** 物理样、制样、进样层级明确；重复进样不增加袋数、不相加整袋mg。运输比较是同生产段不同袋随机分组，不是同袋两次破坏性测量。
- **来源支持：PASS。** Thermo确实写每样两次进样；不等于两袋独立抽样。化学制样、回收率及w/w结果的研究表述有原句支持，没有移植为本项目方法性能或食品阈值。[1] HORIBA确实逐样评估分散压力；读者模块仅用它支持保留测量条件，不据商品粒径声称纯糖苷规格或防分层因果。[2] Raman只承担跨行业模型/探测体积限制的证据，不包装为食品运输验证。[6]
- **中英文：PASS。** en.md用sachet与amount区分浓度和整袋质量，句子自然；中文用“净重/浓度/每袋糖苷质量”避免“含量”单词承担三种量。条件、用途、单位、示例及来源范围双语一致；保留CSV标识符是合理填写要求。技术reader偏密集但面向实验室合理，公开短模块未塞入Raman细节。
- **验证器边界：合理。** 只是空表和合成单位测试助手，不验证填好的生产数据、不自动判断代表性/错误百分数意图。正文和交接均没有扩大它的能力。

## 各表格：类型选择与阅读表达

- **research.md:17–21｜候选方案对照矩阵：PASS。** 四列并列任务、最小验证及决定，适合收敛比较；不伪装用户访谈。内部研究用长单元格可接受。
- **research.md:94–100｜诊断决策表（非放行判定表）：PASS。** 观察—先复核—禁止结论三列把相关与因果分开；将来真实数据标题避免误认已有结果。
- **sampling-plan.md:6–17｜批次/目标键值填写表：PASS。** 固定字段加空白待填栏合理，审批人和数量依据可追踪；无假默认值。
- **sampling-plan.md:20–28｜工段覆盖矩阵：PASS。** 每工段对照位置、独立数与理由、方法/对照，避免只按时间串联；早中晚不是固定样本数。
- **sampling-plan.md:37–45｜分析决策/证据清单：PASS。** 每一待审事项留决定和证据链接，不把提取、质控、LOQ写成已验证。
- **sampling-plan.md:58–65｜审批签署矩阵：PASS。** 问题、修订、责任日期分列；明确本轮未签，独立研究审查不能替代现场方案批准。
- **reader-en.md:17–22｜数值—单位—转换查找表：PASS。** 四个示例分别覆盖百分数、质量分数、浓度、整袋量；英文自然，准确字符串以代码显示，随后说明0.01%歧义。
- **reader-zh.md:17–22｜数值—单位—转换查找表：PASS。** 中文与英文逐项等价；示例明确不是数据，保留机器单位字符串避免翻译变体。
- **sampling-record.csv｜长格式分析结果记录（33列）：PASS。** 适合作为下载/实验室录入，不宜整张嵌入网页；一分析物×一次进样或已注明汇总的最终结果，禁止同一汇总混粒度。读者说明分组覆盖33列。
- **material-characterization.csv｜材料/批次物性记录（18列）：PASS。** 适合机器读取/下载，材料身份、Dv分位、分散条件、三种密度分别留栏；不宜当成商品规格对比或实测数据图。

## 各流程：类型选择与阅读表达

- **en.md:15; zh.md:15｜线性工段取样地图：PASS。** 箭头表示采样覆盖顺序而非已验证因果；双语保留出料质量区间和接收/转运，短模块表达易读。
- **research.md:84; sampling-plan.md:30｜研究层全链条流程：PASS。** 从原料到运输的文本流程足够，不需要无数据图表；部分取用为按实际用途另设，不应误解为每批强制线性步骤。
- **en.md:13; zh.md:13; reader-en.md:28; reader-zh.md:28｜整袋/部分取用条件分支：PASS。** 用两个用途的条件句比强行画连续流程更准确；代表性缺失时明确不外推整袋。
- **sampling-plan.md:47; en.md:19–21; zh.md:19–21｜物理样→制样→进样层级：PASS。** 是嵌套观测结构，不是增加独立样本数的流水线；文字明确去伪重复，避免把技术重复相加。
- **sampling-plan.md:34; research.md:90; en.md:15; zh.md:15｜不同袋随机分配的运输/未运输对照分支：PASS。** 保留生产时段匹配、独立ID和组号，不声称同一袋前后破坏性实测。

`en.md`/`zh.md`自身无Markdown表格：把三量公式及短分支留在正文、将宽表留给下载，是适合当前无数据状态的表达，不需要制造趋势图、曲线或示意数据。

## 发布边界与后续动作（不构成本研究返修）

1. **无网站截图，视觉发布未验**：桌面/移动排版、长字段溢出、表格横滚、真实页内锚点和下载操作均未验；未用浏览器、未写网站。
2. 集成时按integration-notes核对中文对应路由、映射真实下载链接并按URL合并引用编号；当前相对文件链接仅在资产包成立。
3. 若公开包不提供验证脚本和父目录档案，按既有交接要求移除reader的开发者“文件检查”段，不能给下载读者一个无法执行的命令。
4. 作者账本与file-index保留“独立审查待执行”的历史状态未修改；本目录review.json是本次独立审查的明确结果。后续由集成人处理门禁状态，不应误当成网站发布完成。

## 版本锁定：关键输入SHA-256

完整66份输入hash另见input-sha256.json；以下覆盖待公开文本、模板、测试及R1原始证据。

- `independent/review.md`：`309e669f10582da815f065c4c2ab6659d2d501deef22df092ada82dde2506eb4`
- `revision/en.md`：`23f93ab7a5be73a920f98c09065261d4d7394820fea49599cc3dbde33e7fd753`
- `revision/zh.md`：`24de84ebb36148b2af93109539b4d0f78b4fd893f58940ce2a7081e88699af73`
- `revision/reader-en.md`：`c4d0f55eb415cd647c55f9d2db98cf980865a3f81e4e2b1002716a33e9bea2b8`
- `revision/reader-zh.md`：`8f1eb60b448987276aa78eb9e2cad075d60a715e55b17f8f45060827216adadb`
- `revision/sampling-record.csv`：`6d5d080e8195db3f9a25433c75c44baf7b5251ff01894b1bfc891e434d0cff41`
- `revision/material-characterization.csv`：`bd918745b3e38c5bff815de7ba2815f6240f450af04b18a4ca22c23e6d742649`
- `revision/sampling-plan.md`：`bdd97b47a42712d67c1d139505cf6d81d8c763548a1bb7407b03d0c4b66d743b`
- `revision/research.md`：`7f9d7c7bb8aef1c52707699dfeb91696df8255f22c161d023dcee0b58d85af98`
- `revision/quote-ledger.json`：`a5b52d19953fe3b639b03918ae2248fe30ba4cdb253f36c4572fff19f4164e7c`
- `revision/test_validate.py`：`2d0265a89fe7861cf8f1cdeff47c9f3a54d7283ff0d75ce078fb665def33704d`
- `revision/validate.py`：`d4e19e405d30d8b19e8df0ae216cc58cdf0466ccf70e2469d25139590600034d`
- `sources/raman.pdf`：`12d3009c0cff9264fb2c544329d6667dfe7956c4268d2cc44ccf24bc2698d0be`
- `sources/thermo.pdf`：`1d2dc575bf8a1fd318e9d5fcdabcad3401caa99734516ac0c58e103968054f8f`
- `sources/horiba.pdf`：`540afed9331c5e42a2be55774830328d9b45bdcac4366f3a331ae42606a69791`

## Sources

[1] https://documents.thermofisher.com/TFS-Assets/CMD/Application-Notes/AN-1040-Analysis-Products-Containing-Stevia-AN70278.pdf — thermo original application note
    > "The samples and standards were prepared in an aqueous methanol (20%) solution; sample injection concentrations are listed in Table 2."
    > "Two injec- tions of each sample and three injections of the individual standards were analyzed. Injections of the standards and samples were interlaced over a three-day period."
    > "The recovery for Reb A was 98.4% for the charged aerosol detector compared to 92.2% recovery for the UV detector."
    > "Linear regression analysis of the five-point calibration was used to calculate a w/w% of the two major glycosides in each of the products indicated in Table 2."
[2] https://static.horiba.com/fileadmin/Horiba/Application/Food_and_Beverage/Food/AN213_Sugar_Substitutes.pdf — horiba original application note
    > "Two stevia sugar samples and one monk fruit sugar were purchased and tested."
    > "Each sample was assessed individually (pressure-size titration test) for an appropriate air pressure to be applied. 0.1MPa was determined to be the best air pressure for both stevia sugar dispersion and 0.2MPa for monk fruit sugar."
    > "The laser diffraction analysis result shows a larger particle size distribution for the Popular Brand Stevia as it extends up to Dv90 of 487.5 µm whereas the Store Brand Stevia, under the same measurement conditions, measured smaller."
[6] https://strathprints.strath.ac.uk/43661/2/Allan_etal_JPBA2013_powder_blending_by_non_invasive_raman_spectrometry_aam.pdf — Raman information depths and non-invasive monitoring of powder blending
    > "The vessel has a pot size of about 500 mL, a radius of 4 cm and is made of glass. The impeller has three blades set 120° apart with a tilt angle of 45°; each blade is approximately 29 mm long and 12 mm wide. Powders were mixed at 50 rpm using a stirrer motor (IKA Eurostar, VWR International). For the mixing of two components, 75 g of unsieved Avicel PH-101 was placed into the vessel and mixed. After 120 s, different masses (0, 5, 10, 20, 30 or 40 g) of either unsieved or size fractions of sieved aspirin (<106, 250 – 300 or 425 – 500 µm) were added via a funnel positioned directly above the centre of the vessel and the powders were allowed to mix for a further 780 s. A further experiment was also conducted in which 25 g of unsieved aspirin and 25 g of unsieved aspartame was added to 75 g of unsieved Avicel PH-101 after 120 and 900 s, respectively; the total mixing time was 2100 s."
    > "The oscillating mixing profile of aspartame between 1200 and 1600 s is characteristic of a cohesive particle [32]."
    > "If the sampling depth is 3.5 mm for mixtures of Avicel and aspirin and it is assumed that all layers within the 3.5 mm contribute equally to the Raman signal, then with a 6 mm diameter laser spot the sampling volume is 99.0 mm3. This equates to a mass of 0.045 g if the density (tap) of the powder is assumed to be that of Avicel (0.45 g cm-3). However, it can be estimated from the information depth plots that approximately 90% of the Raman signal is generated in the upper 1 mm layer of the powder; this is consistent with the results of Monte Carlo simulations by Matousek and Parker [24]. Therefore, the mass of sample that contributes to approximately 90% of the Raman signal is 0.013 g."

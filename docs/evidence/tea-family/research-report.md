# I01：茶家族采购 hub — 研究结论与成稿交接

状态：双语完整销售候选稿已写，待独立事实／中英文编辑审查。没有修改网站、提交、发布、表单提交或 BrowserMan 使用。一个 EN/ZH 对计为一个主题，不计两篇成果。

## 结论

**建议新建茶家族商业 hub，保留既有绿茶采购页作为子意图承接，不将其改名或迁移。** 理由是已经找到三茶类的实际商业粉体证据，且红茶有粉／液分别交付、乌龙有可定制液体浓缩平台证据，不必靠三段泛茶知识撑页。[3][4][5] 页面主任务是选定可询价材料并请求样品／报价，而非学习如何审问供应商。

**乌龙液体必须窄写：** 已核到 Finlays 的黑、绿、乌龙、白茶定制浓缩平台及 Bag-in-Box 交付，但其范围包括甜味与风味定制，不能证明存在某个无糖、无载体、固定固形物的纯乌龙提取液 SKU。[5] 候选稿因此写“乌龙速溶提取粉；浓缩液按项目洽谈”，没有填造 Brix、茶固形物、包装或最低订单。

## 起点、检索和证据等级

- 触发词为 backlog I01 中 `tea extract supplier`，继承记录为 2 曝光／0 点击／53.5 位；本任务未调用 GSC，不将其作为需求规模或流量预测。没有设置曝光阈值。
- 最新 origin/main 读取自 `/data/hermes/workspaces/zlbotanicals`；`git ls-remote origin refs/heads/main` 与本地 origin/main 均为 `6b9b250c06bc62f373fff232f1bf8aaa95283499`，读取时已核远端。实际销售数据是 `src/data/extract-sales.ts`，不是仅看旧 Markdown。
- 当前绿茶页已有风味型可溶提取物、儿茶素干粉和低咖啡因项目；没有红茶／乌龙物料行。完整绿茶对象摘录与 SHA 在 `origin-main-green-tea.txt`、`origin-main-snapshot.json`。新页只增茶类×形态×应用交叉信息，不再复制 EGCG 方法长文或已发布冷后浑诊断。
- 外部证据是公开供应商页面和论文全文。本任务没有原创电商采样、销量数据、价格采集、实物采购、批次检测或客户访谈。
- 搜索工具没有稳定引擎和地域元数据，不能称 Google 美国／百度中国排名调查；成功返回只支持观察到的词汇与意图。
- 供应商页面只能证明其公开 OFFER；不独立证明实际履约、指标达标、证书有效、产能真实，更不证明其是 ZL 的供应商。

## 先发散：三个实质方向及取舍

| 方向 | 读者问题／小验证 | 选择结果 |
|---|---|---|
| 茶风味采购：绿／红／乌龙×粉／液 | 广泛供应词是否真的超过绿茶？宇隆明确列三茶类速溶粉；Starlon 红茶页列喷干粉与浓缩液；Finlays 浓缩平台列三类茶。[3][4][5] | **选为主干**。材料差异真实，能承接新的询价对象，不是 bulk/wholesale 同义门页。 |
| 富集活性：总多酚、儿茶素、EGCG | 是否应把整个 hub 改成高纯活性目录？Finlays 同页区分鲜绿叶风味产品和具有特定儿茶素范围的 Green+。[10] | **保留一行，深度回到既有绿茶页**。该供应商范围不是 ZL 规格，更不推广为所有红茶／乌龙含量。Taiyo 原站受阻，未拿搜索片段充当新全文。 |
| 奶茶色香：红茶／乌龙成品表现 | 粉体商业应用是否包含奶茶？宇隆明确列奶茶等应用；论文支持制茶过程与组成／感官差异。[3][6][7] | **纳入应用模块，不单独建页**。未获得红茶对乌龙的乳基量化对照，不声称谁“更浓”“更耐奶”“不沉淀”，不虚构添加比例或已验证配方。 |

推翻的直觉：乌龙不是一个固定“介于红绿之间”的化学百分比，也不能将“降低儿茶素一定改善风味”写成原则。一项 CFT-6 乌龙制茶研究在其优化工艺条件下报告儿茶素保留增加并改善醇爽口感；这是该茶叶工艺研究的结论，不是商品提取物应用试验。[7]

## 实际商业材料矩阵

| 茶类／任务 | 粉体直接证据 | 液体直接证据 | 可用的材料差异 | 不能补写的格子 |
|---|---|---|---|---|
| 绿茶风味 | 宇隆列速溶绿茶粉，其系列工艺含萃取、香气回收、超滤、造粒喷干。[3] | Finlays 定制浓缩平台明确 green。[5] | 茶固形物型风味原料与成分导向原料分别报价。[8][10] | ZL 现货、具体含量、同日鲜叶提取、产地与工厂设备均未核实。 |
| 红茶风味 | 宇隆列红茶粉；Starlon 明确 spray-drying 和 HWS／CWS 类别。[3][4] | Starlon 红茶页明确 liquid tea concentrates；Finlays 平台明确 black。[4][5] | 叶阶段氧化产物含茶黄素、茶红素；后续粉体干燥与液体投料是另一个维度。[4][6] | 不将茶黄素存在写为富集茶黄素标准品，不给通用红茶 EGCG 值。 |
| 乌龙风味 | 宇隆明确乌龙茶粉，正文含茶粉系列加工路径与奶茶／饮料应用。[3] | Finlays 明确 oolong 的定制茶浓缩平台和 Bag-in-Box。[5] | 乌龙制茶摇青／静置等会影响组成；商业粉体与定制液体范围分别有证据。[3][5][7] | 未核到独立的纯乌龙液原料 TDS、Brix、无糖／载体声明，故不写固定纯液 SKU。 |
| 儿茶素型绿茶 | 当前 ZL 销售矩阵已有该方向；外部 Finlays Green+ 是特定儿茶素定位的公开商业例子。[10] | 本轮不扩展成分型液体 SKU。 | 指定单体与咖啡因要求不是茶类本身的默认组成。 | 不照搬 Green+ 的典型范围，也不将其包装成 ZL“富集工艺”证据。 |

通用粉／液工艺补证：宇隆浓缩液页描述萃取、香气回填、酶解、膜／热浓缩、杀菌、无菌灌装并列实际液体包装。[18] **该页没写具体茶类，所以不能用其填成“宇隆乌龙纯浓缩液”。** 相反，速溶茶粉页明确茶类，能支持乌龙粉体这一格。[3]

HWS 与 CWS 都被 Finlays 定义为水提茶固形物，分别按热／冷水可溶区分。[8][19] 编辑判断：报价应明确复溶条件，但不从 CWS 名称推出货架期清澈、乳基兼容或冷藏不沉淀。

## 加工与化学：足够支撑销售，不外推工厂能力

- 文献将绿茶、乌龙和红茶按不发酵／部分发酵／发酵加工区分；本文选取这三类，不冒称穷尽所有茶类别。[6]
- 红茶“发酵”的关键证据是儿茶素酶促氧化与聚合形成茶黄素、茶红素等，不当作微生物发酵设备需求。[6]
- 乌龙叶研究实际使用 CFT-6、一个芽及二三叶，比较萎凋、摇青、杀青／烘焙、揉捻与干燥条件。[7] 这些是叶加工条件，不是 ZL 提取设备，也不是商业提取粉的溶解或奶茶稳定性验证。
- 叶加工茶类与后续提取粉／浓缩液交付是两条独立分类轴。三种茶不是三个植物物种；采购页范围为茶树叶来源加工茶，不混入草本代用茶。

## 来源时间和访问时间

所有本轮使用外部原文访问日期为 2026-09-20；精确 UTC、URL、完整 HTTP 响应存档及 SHA-256 见 `capture-manifest.json`。

| 来源 | 发布日期 | 访问日期 | 时间解释 |
|---|---|---|---|
| Enzymatic Oxidation of Tea Catechins and Its Mechanism | 2022-01-29 | 2026-09-20 | 原始 JATS epub date，非更新日期。[6] |
| Optimizing Processing Techniques of Oolong Tea… | 2023-12-01 | 2026-09-20 | 原始 JATS epub date，非实验样品日期。[7] |
| Finlays／Starlon 商业页 | 未确定 | 2026-09-20 | 页脚版权年份不当作发布日期。[4][5][8][10][19] |
| 宇隆商业粉／液页 | 未确定 | 2026-09-20 | 页面“修改时间”几乎跟随读取时钟，且粉页搜索缓存显示 2026-08-06；保留原文但不采用为真实更新日期。[3][18] |

## 相比现有内容的具体增量

1. 两条新增采购支路：红茶与乌龙，而非把所有茶词继续强塞绿茶。
2. 三茶类×粉体／液体的有证据矩阵，并揭示浓缩基底不一定是纯原料液，避免错报价。
3. 区分风味型材料与成分型绿茶；将 EGCG 专项需求直接回接现有绿茶页。
4. 把奶茶成品茶感和水中溶解区分为不同评价对象，但不重复已发表冷后浑诊断。
5. 完整 EN/ZH 销售稿包含自家报价范围、交付形态、应用、样品／大货流程、FAQ、询盘 CTA，没有制造设备、库存、纯度、具名认证或通用交期承诺。

## 自家供货声称的证据边界

商业范围依据任务上下文中的业主授权：ZL 可开展广泛植物提取物／规格采购供货规划；无需把当前 11 项目录当上限。候选文中“供应／可询价／按项目洽谈”建立在该授权上，不建立在竞争商网页上。未把任何竞争商列为 ZL 合作方。

样品与报价段是拟采用的销售服务表达，不是现成样品包、文件下载、某张批次 COA 或认证已核验的宣称。采用正式报价确认具体组成和商务条件，只保留一处集中说明，避免整页变免责声明。

## 路由与内链建议（未实施）

- 单一 populated hub，建议由产品导航承接；**路由仍待整合者决定**，不得在交接中宣称新 URL 已存在。
- 保留 `/products/green-tea` 与 `/zh/products/green-tea`，由 hub 的绿茶／儿茶素模块链接过去；既有绿茶页可新增一条“红茶／乌龙需求→茶家族”的父级回链。
- 应用接现有 `/solutions/beverages` 及中文页；报价接 `/request-quote` 及中文页。已从 origin/main 确认路由源文件，不声称本轮测试了公开 HTTP、表单投递或后端接收。
- 绿茶百科、干基计量和茶饮冷后浑继续保留在既有深度页，不创建红茶／乌龙空白子页，也不为 HWS、CWS、bulk、wholesale 各建门页。

## 文件与下一门禁

- `tea-family-sales.zh.md` / `.en.md`：完整候选成稿，引用保留供事实审；不是发布许可。
- `sources-evidence.md`、`ledger.json`、`claim-evidence.json`：本任务专用引用及核心 claim→quote→原文定位。
- `raw/`：完整响应字节、完整提取文本；论文另存 `.xml`，无任意字符截断。
- `capture-manifest.json`：访问、源日期、HTTP 状态、哈希；失败响应也明确保留。
- `searches-round2.json` / `search-log.md`：成功、失败与仅候选结果的范围。
- `verify_evidence.py` / `verification.txt`：离线只读校验与实际结果。

后续：独立审读两语言全稿与原文，重点确认乌龙液体项目的窄表述、ZL 自家商业授权范围和奶茶应用不是已验证表现；通过后另行进入网站集成与技术／视觉／转化 QA。本任务未具备提交发布权限，也未执行。

## 阻塞与排除

搜索有间歇性 403／返回形状错误，记录而未循环重试。Teaheals HTTP 403、HTTPS 证书域名不匹配，放弃正文证据；Taiyo／Sunphenon 当前原站 403，未据 snippet 编造全文或认证。部分 web_extract 成功内容中途截断，已改直接 HTTP 存整页／JATS，引用全部来自完整档案。

没有从英文药用类供应商通用“98%纯度”“无沉淀”“代谢支持”等营销文本采纳性能或健康结论。也未将电商聚合搜索页的价格、单位、重购率视为原始电商样本。

## Sources

[3] http://hbylbio.com/cont/19.html — 湖北宇隆：速溶茶粉系列
[4] https://starlonnaturals.com/black-tea-extract.php — Starlon Naturals — Black Tea Extract
[5] https://www.finlays.net/product/general/tea-concentrates — Complete Tea Concentrate Package | Finlays
[6] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8840101/fullTextXML — Enzymatic Oxidation of Tea Catechins and Its Mechanism (2022)
[7] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10706478/fullTextXML — Optimizing Processing Techniques of Oolong Tea (2023)
[8] https://www.finlays.net/product/tea-extracts-aromas/hot-water-soluble-hws-powders — Finlays — Hot Water Soluble Tea Powders
[10] https://www.finlays.net/product/tea-extracts-aromas/wellbeing-collection — The Wellbeing Collection | Premium Tea Extracts | Finlays
[18] http://hbylbio.com/cont/20.html — 湖北宇隆：茶浓缩液系列
[19] https://www.finlays.net/product-solution/cold-water-soluble-cws-powders — Finlays — Cold Water Soluble Tea Powders

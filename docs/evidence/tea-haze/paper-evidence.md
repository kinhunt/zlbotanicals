# 论文证据与独立审稿交接

取证日期：2026-09-20。任务为论文发现路线，不使用BrowserMan，不进行发布或repo修改。证据类型全部是食品物料/工艺实验，不涉及人体疗效。

## 原文范围与用途

| Ledger | 文献与标识 | 实际读取范围 | 支持的正文内容 | 不能由此推出 |
|---|---|---|---|---|
| [1] | Guo等，Dynamic Formation of Green Tea Cream and the Identification of Key Components Using the “Knock-Out/Knock-In” Method；Foods 2023；DOI 10.3390/foods12162987；PMID 37627986 | Europe PMC原始JATS全文XML；已读方法、结果、讨论及结论。XML含原始表格/图注，提取txt主要包含段落 | 纯水提取并离心后仍在4°C形成冷后浑；透析后同时回添EGCG与咖啡因导致浑浊，单独回添未出现；蛋白与多糖参与；520 nm光学跟踪 | 不能直接推广至所有红茶、商业高EGCG粉、酸化RTD、蛋白饮料或货架期；4小时不是通用稳定性周期 |
| [2] | Xu等，Analysis of cream formation in green tea concentrates with different solid concentrations；J Food Sci Technol，2011在线/2012卷期；PMC3614051 | PMC页面实际只返回摘要；Europe PMC fullTextXML两次HTTP 500，**未读取全文** | 所测5–40°Brix范围量随浓度上升，50/60°Brix下降；黏度可能参与解释；总糖、咖啡因、儿茶素为主要组分 | 不能作为浓缩液通用最佳浓度、稀释稳定或黏度因果已证实的依据；正文不引用未读方法中的30天等参数 |
| [3] | Cabrera等，Effect of Water Hardness on Catechin and Caffeine Content in Green Tea Infusions；Molecules 2021；DOI 10.3390/molecules26123485；PMID 34201178 | Europe PMC JATS全文XML；已读方法、结果与讨论 | 碳酸氢钠与矿物盐拆分对照；偏碱绿茶中EGC/EGCG下降及褐变；原水与茶液pH不同；茶包70°C/3 min体系用于界定外推范围 | 不将茶叶萃取效率等同粉末复溶，不把研究局部pH/硬度阈值写成工业水标准 |
| [4] | Spiro, Chong, Jaganyi，Kinetics and equilibria of tea infusion. 13. Further studies on tea scum: the effect of calcium carbonate, lemon juice and sugar；Food Chemistry 57(2)，1996；DOI 10.1016/0308-8146(95)00236-7 | Europe PMC AGR摘要记录IND20615746；直接API原始JSON已保存，**未读取全文** | 茶膜需单列；摘要称钙和碳酸氢根而非伴生CaCO3控制膜形成；柠檬汁影响只用于选题卡并保留pH/络合双解释 | 不给柠檬酸剂量，不把表面膜与体相冷后浑画等号，不声称取得完整实验细节 |

## 检索与取得路径

- 初始web_search一条检索返回Firecrawl 403，另一条返回了PMC冷后浑研究；后续主路径为直接Europe PMC REST search与fullTextXML，不调用浏览器。
- `epmc-targeted-0.json`：TITLE:"tea cream"；`epmc-water-search.json`：茶标题结合hardness/scum/water quality/calcium及日期条件。`epmc-search.json`与`epmc-targeted-1.json`是较宽检索，包含无关结果，未把它们当支持正文的证据。
- 直接API全文成功：PMC10453089.xml、PMC8229914.xml；正文解析副本为同名.txt。txt首部包含参考文献题名，引用选段均定位在主文段落而非参考文献标题。
- [2]实际提取内容：PMC3614051-abstract.txt。此为工具返回摘要正文的保存副本，不声称原始全文。
- [4]原始API响应：tea-scum-api.json；单记录格式化副本tea-scum-1997-abstract.txt。**该文件名的1997为初始暂名，实际记录年份已核为1996；文献身份以本表/DOI/JSON为准。**
- citation-ledger.json保存URL→编号及逐字证据；引用脚本quote --from已逐条校验真实包含关系。完整证据渲染另存citation-evidence.md。

## 去重与内容增量

仓库：/data/hermes/workspaces/zlbotanicals。

本地origin/main与`git ls-remote origin refs/heads/main`一致，均为 **9f30bb453bb6e6e5ea205a1a08c576e211295ece**（2026-09-18）。只使用git show/git grep/git ls-tree等只读命令，未fetch、checkout、提交、修改工作树。开始与结束git status --porcelain均为空。

已读：
- src/data/deep-ingredients.json绿茶段：有水硬度、pH、氧气分组建议，过滤前后含量对照，以及浓缩干燥知识。
- src/data/ingredient-reader-packs.json绿茶段与三应用方案：柑橘RTD要求冷藏、矿物质与氧/光检查；速溶条包要求固定水温、水量和搅拌；燕麦基底要求蛋白/盐/pH控制。
- src/content/blog/en/green-tea-energy-beverage-2026.md：实际标题为Buying Green Tea Extract for RTD Beverages: A Practical Checklist，不是新闻市场预测。
- src/content/products/en/green-tea.md及src/pages/solutions/beverages.astro。

结论：泛泛“冷后浑需做水质与储存测试”会重复。稿件因此采用**水质×复溶×冷藏诊断决策**，新增独立重复/配对储存设计、粉团/茶膜/褐变分流、牺牲样回温、仪器单位不可互换、组成与外观同时判定、六分支下一步表。不是替代采购总页，也不重复高EGCG人体安全百科。

## 科学边界与审稿重点

1. 八条件矩阵、记录表、回温流程、第二轮筛选与衡算为明确提出的工程方案，**未实际执行配方试验，无自有NTU、得率、保留率或货架期结果**。
2. [1]原文组成浓度段存在值得谨慎的单位/基准表述（例如多糖mg/mL相对总cream量的可比性），不引用这些数值，也不基于它们作图。只使用实验设计、回添定性结果及光学方法。
3. [3]讨论中引用钙/有机酸盐的沉淀解释，与[1]突出EGCG–咖啡因的重点不同；稿件不将任何一种解释写成所有茶沉淀的唯一机制。不要从相关性直接命名沉淀。
4. 回温减少浑浊仅为工作假设线索，不证明沉淀身份或食品安全。正文只保留一处具体异常微生物排查，不用大段免责声明替代知识。
5. [2]摘要的黏度解释保留“可能”；不会虚构全文参数。原液清亮→稀释后另测为工程建议，不声称该论文实际做了稀释实验。
6. “软化水”不是分析结果。正文请求分列硬度、碱度、pH和矿物组成，没有推荐统一阈值，也没有声称某种水处理必然有效。
7. 两种语言表达与表格行对应；成品正文无内部项目叙述、SEO自述或医疗营销。来源标题标有读取范围，读者可知道何处只有摘要。

## 交付与后续

- tea-haze-diagnosis.zh.md / .en.md：完整正文，非提纲；包括建议内链。
- topic-cards.md：5张完整卡，第一张对应已完成文章；其余候选注明下一步补证和去重门槛。
- citation-ledger.json / citation-evidence.md：机器登记的引用与逐字证据。
- verification.log / verification.json：严格引用和证据校验结果、正文计数、repo未改及产物哈希。

本次只完成文稿、研究与校验。独立编辑审、配方实测、站点集成、构建与发布均未执行；下一步交独立审稿，不发布。

## Sources

[1] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10453089/fullTextXML — Dynamic Formation of Green Tea Cream and the Identification of Key Components Using the “Knock-Out/Knock-In” Method (2023; full text)
[2] https://pmc.ncbi.nlm.nih.gov/articles/PMC3614051 — Analysis of cream formation in green tea concentrates with different solid concentrations (2012 issue; abstract only retrieved)
[3] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8229914/fullTextXML — Effect of Water Hardness on Catechin and Caffeine Content in Green Tea Infusions (2021; full text)
[4] https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:IND20615746&format=json&resultType=core — Kinetics and equilibria of tea infusion. 13. Further studies on tea scum: the effect of calcium carbonate, lemon juice and sugar (abstract record)

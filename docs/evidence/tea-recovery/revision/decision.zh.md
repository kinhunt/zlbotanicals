# 茶浓缩/澄清研究决策：新增价值在“分母审计”，不在再写冷后浑

日期：2026-09-21。修订副本，原始研究存档保留在上级目录；下述网站快照与抓取情况为原轮记录，本次未重新核验。状态：研究交付，未发布、未修改网站及原始 backlog。

## 结论

**T03：取得全文，但不值得据此另写“兑水必沉淀”的独立文章；建议作为现有茶采购页的双状态验收短模块。T04：支持制作独立可下载的“流股与分母审计工作表”，暂不支持工业膜选型/回收率专题。** 两者共享一份交接工具，不拆成两篇同义 SEO 页面。

真正新发现：原 T03 论文不仅研究浓缩度，还在“参与沉淀的组分”计算中明确使用原液和澄清液的不同体积。T04 的核心因此不必等到拿到工业膜性能数据才可以做：可以先帮助读者检查报告给出的到底是浓度、干粉组成，还是目标物总质量。[7] 这不是把实验室离心等同于生产膜过滤。

## 只读现有内容核对

origin/main 与 git ls-remote origin refs/heads/main 同为 `aaf0bf37f2ec76157b41a91a66cac9cee2e96d80`；开始时工作区无改动。已读 editorial-discovery-brief.md 与 backlog T03/T04 卡，并保存副本。

- `/resources/blog/tea-haze-diagnosis`：已覆盖八条件故障诊断、原液与终稀释态、全样/上清/沉淀、用量×组成及设备残留。因此仅补一句“过滤前后检测”没有增量。
- `/products/tea-extracts`（PR41）：已区分风味型茶粉、浓缩液、加糖/调味基底，要求用途和稀释条件，但没有流股记录及分母错误判读工具。
- `/plant-extracts/ingredients/green-tea`：`deep-ingredients.json` 已明确每流股质量×含量、湿/干基、膜通量及清洗后恢复、分析瓶 mg/L 不能直接当生产得率；`ingredient-reader-packs.json` 已有吸附步骤衡算。
- 双语原文及 green-tea 专属数据快照见 `site-snapshot/`。本轮不改 T01，也不凭“有新论文”重复其解释段落。

## 三个竞争假设（另列一个否决的扩展）

| 假设/读者任务 | 小验证结果 | 与已有内容差异/成本 | 决策 |
|---|---|---|---|
| H1 / T03：高浓度稳定导致兑水后更容易沉淀，可独立解释机制 | 全文是分别制备 5–60°Brix、4°C 30 天试验，不是同一已储存原液兑水前后失败试验；高浓度仍报告不可逆沉积；黏度在约25°C测定，结果讨论称为 clarified concentrates，不能当4°C原液因果验证。[7] | 现有T01已经提醒终稀释态测试。取得方法加强边界，但不生成新机制证明 | **否决独立机制文；保留双状态验收模块** |
| H2 / T04：越细过滤越清，某截留分子量能给通用茶成分保留率 | 2026白茶全文使用15mL离心超滤，留取颗粒截留组分，不是生产线澄清透过液。不能将100kDa/3000×g/20min迁移为工厂工艺。[6] | 对买膜/生产放大证据仍弱；查到早期黑茶陶瓷膜论文，但没有验证全文。异种玫瑰研究不能补这个缺口 | **否决工业膜推荐、通量/清洗周期/通用回收率** |
| H3：供应商“含量上升/含量保持”不等于目标物质量回收，真正缺的是分母与流股交接 | 浓缩研究使用体积校正；白茶研究表2按μg/mg粉末组成比较，分析前均重配至1mg/mL，不给可闭合的所有流股目标物账。[7][6] | 现有内容讲原理，尚无可填写的双状态＋逐流股审计、缺失值处理和判读门。成本低于新实验/工业膜综述 | **采用：独立下载资产＋采购页短模块；暂不新建长文URL** |
| H4：白茶纳米颗粒稳定化可独立扩为产品/功效话题 | 论文目标为分离研究颗粒；不验证ZL规格、饮料保质期或消费者功效。[6] | 易偏离采购问题，需新证据且可能制造薄页 | 不推进 |

## 原始全文证据及关键分母

### A. 绿茶浓缩度研究：补齐T03，但改弱原标题

来源[7]：Xu等，*Analysis of cream formation in green tea concentrates with different solid concentrations*，在线2011/期刊2012。方法：茶叶7份，蒸馏水1:15（w/w），75°C 15min，预先离心澄清，分别浓缩到5、10、20、30、40、50、60°Brix，再90°C 15min处理、45mL装瓶、4°C储存30天；终点10,000g/4°C/15min分离。[7]

表1按原文干燥法（80°C、48h）测得的沉淀量为干燥茶乳沉淀质量/浓缩液体积，单位 mg/mL；不是湿沉淀质量，不是“沉淀占进料茶固形物的质量百分比”。40°Brix为77.4±14.67 mg/mL，50为28.2±8.48，60为32.2±9.23；不能写成高浓度无沉淀。作者另报告30–60°Brix存在不可逆沉积。[7]

原文公式图片已下载并视觉复核：`participated content = (C_original × V1 − C_clarified × V2) / V1`，mg/mL，以原液体积作分母。它是体积校正的差额，不是对已分离沉淀的直接组分定量。[7] 若忽略V2，用两次浓度相减，和原文算法并不相同。表格未逐项报告V2，本轮不反推或捏造回收率。

**否证边界：** 没有同批浓缩液储存后再兑水的试验；没有终饮料失败率；不能把黏度的可能解释写成唯一原因；不能建立50°Brix通用稳定门槛。

### B. 2026白茶膜分离原始论文：新且有用，但恰好揭示无法计算的回收率

来源[6]：*Optimized Isolation of White Tea Infusion Micro-Nanoparticles and Stability Mechanism*，Foods 15(8):1408，2026。§2.4以15mL预微滤白茶进行名义截留分子量（MWCO）为30/100kDa的离心超滤筛选（kDa不是长度单位的孔径），截留组分补至10mL；§2.5.1将两组粉末各自配成1mg/mL后测成分。[6]

表2为μg/mg：以Folin–Ciocalteu法、没食子酸标准测得的茶多酚WTCs 427±2、WTMPs 386±3；咖啡因91±0.1、62±0.1；没食子酸10±0.2、39±0.1。[6] 总酚是方法当量，不是儿茶素质量，不能与其他非互斥指标相加作质量闭合。这些是粉末单位质量上的组成，不是原始15mL进料目标物质量回收率。不能把62/91叫咖啡因回收率，也不能把39/10叫质量回收提高3.9倍；还需要得到的粉末总量、各流股分析及损失边界。截留物被稀释到10mL并不能补上这些缺失。

论文比较颗粒形态和稳定性，不是生产透明茶透过液。**本轮工业膜性能缺口仍未补齐。** 这反而支持工作表强制填写“哪一流股才是目标产品”，而不是照抄“最优”膜。

### C. 2023绿茶冷后浑机制全文：只作交叉核对，不重写T01

来源[1]说明EGCG/咖啡因及蛋白、多糖参与沉淀，并讨论组分相对含量随沉淀组成变化的影响。[1] 只能支持测量分离各相的必要性，不给工业膜损失百分数。本轮重新联网取得全文；无须再扩机制文章。

## 交付与接续门

- `module.zh.md` / `module.en.md`：可供独立编辑审的短模块，要求两个状态、两个问题，而不是将外观/浓度/回收率混为一谈。
- `worksheet-spec.bilingual.md`：双语实施规格，包括流股表、计算、取样边界、湿渣与分析回收率、缺失值规则和合成验证说明；不是已上线计算器。
- `streams.blank.csv`、`boundary.blank.csv`、`acceptance.blank.csv`：空白记录模板；`schema.json`定义字段。所有数值单元格留空。验证脚本内的合成测试不是实测数据。
- `evidence/`、`ledger.json`、`citation-check.log`：原始联网结果、完整HTML/XML、公式图片、可复核引文；SHA256见`manifest.json`。
- 可建议 backlog T03→`enhancement_ready_for_review`，T04→`worksheet_spec_ready_industrial_evidence_open`，这里只写建议，不改共享backlog。

发布前需独立审稿；如实现计算器/Excel，另做代码/公式和实际输入验证。本修订仅运行空表结构与公式参考函数的合成测试，不代表交互计算器已验证。工业膜长文须补真实茶体系的全流股、工艺规模与设备边界全文；找不到就维持工作表形态。

## 阻塞与排除

默认web_search返回403；改用SerpApi与EuropePMC。浓缩论文EuropePMC全文500、BioC无结果、直接PMC为验证码；`?pdf=render`返回真实完整HTML（约26k正文），含方法/结果/表格，已保存，未绕过登录或验证码。web_extract首次得到全文，重复调用却得到3257字元局部内容，已标为partial而不假称完整。黑茶UNSW论文PDF真实下载，但字体映射导致文本乱码，未拿它的数字做结论。玫瑰渣膜研究虽为全文，但不是茶，排除。没有网站编辑、BrowserMan、GSC、社媒或发布。

## Sources

[1] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10453089/fullTextXML — Dynamic Formation of Green Tea Cream and the Identification of Key Components Using the “Knock-Out/Knock-In” Method
[6] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC13115093/fullTextXML — Optimized Isolation of White Tea Infusion Micro-Nanoparticles and Stability Mechanism: A Composition–Structure–Stability Perspective
[7] https://pmc.ncbi.nlm.nih.gov/articles/PMC3614051/?pdf=render — Analysis of cream formation in green tea concentrates (full HTML recovered)

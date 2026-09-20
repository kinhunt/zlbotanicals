# 与现有站点的差异及交付状态

## 基线

只读仓库 `/data/hermes/workspaces/zlbotanicals` 的 `origin/main@afa8182f68f6b01f04888fa42481814f51d2c894`；本次 `git ls-remote origin refs/heads/main` 确认远端同SHA。没有把主worktree旧分支当线上最新。保存8份源文件及3份积雪草专用数据摘录于site-snapshot/，未checkout、fetch、改动git工作树、提交或发布。

检查范围：双语产品正文、extract-sales.ts实际销售数据、ingredient-reader-packs.json、deep-ingredients.json、ingredient-knowledge.json、双语cosmetics应用页。不是浏览器渲染审查，也不声称穷尽全部历史草稿。

## 已经有的内容，不再重写

| 页面/模块 | 当前可定位原文 | 当前任务 |
|---|---|---|
| `/products/centella-asiatica`与中文对应页；extract-sales.ts | “ZL Botanicals supplies Centella asiatica extract for serums, creams and rinse-off masks.”；“按化妆品形态匹配标志物组成、色泽和载体” | 材料形态、四标志物、液体载体及报价；不能说现站完全没有应用选型 |
| `/plant-extracts/ingredients/centella-asiatica`；reader packs components/standards | “Calculate the native extract and marker content, not the full solution mass.”；“含量回收应在终端配方中验证” | 已讲原料溶液分母和配方检测，新稿只用CICA EX具体案例深化 |
| 同百科，deep applications | “以实际pH、防腐体系、二醇比例及增稠剂测试低温、室温和升温储藏中的浑浊、析晶、黏度与四峰含量” | 已有一般稳定性开发框架，新稿不能以一般核查清单冒充增量 |
| 同百科，reader packs研究 | “The five solvents were chloroform, hexane, methanol, ethyl acetate and water.” | 原有2024研究是叶片超声/溶剂选择性，不是本次2024冷配研究 |
| 同百科，reader packs plans | “Centella humectant serum”及脂质面霜、水洗凝胶方案 | 已有成品配伍建议，保留原图和方案；本稿不再给泛化三配方 |
| `/solutions/cosmetics`及中文 | “Compare baseline and aged samples under suitable stability conditions in final packaging.” | 行业级排查入口，不承担单篇论文方法审计 |

## 本次实际新增

1. 原样光学稳定性与两次水稀释/超声后Zeta测量的可比性问题，解释W/O电位改善但TSI恶化，而不只喊“多指标”。
2. 表2初始降黏与84天物理变化、两个月化学测定的三条时间线。
3. 原图校正作者概括：O/W TSI先升后平台、凝胶约一月窗口，而非精确30天。
4. CICA EX商品液体、分别2%/5%单体的实验流分离；480分钟分数与质量的可核算反例。
5. HPLC校准区间与图5样品浓度不匹配、原文方法载体标签互换、模型拟合概括与表4/6不一致，均保留在档案；正文只保留影响应用判断的部分。
6. 原文/主图/补充PDF可复查档案，不编造实验或借品牌公告推定市场需求。

## 编辑与页面决定

选定一个独立研究应用案例，双语算一篇：
- 中文：积雪草冷配乳液稳定性：为什么 Zeta 电位变好，体系仍在变化？
- English: Centella cold-process stability: why a better zeta potential can coexist with a changing emulsion
- 建议slug：`centella-cold-process-stability`。这是未来集成建议，不是现有URL或已经建好的网页。
- 与ADJ-06合并，只保留一节浓度/释放分母；不另建“高含量积雪草释放”近重复页。
- 本文从百科的稳定性/乳霜研究处进入，文末返回原有百科和销售页；cosmetics应用页可增加一个定向研究阅读链接，无需改H1或另建冷配服务承诺。
- 未进行新关键词搜索、SERP或GSC采样，不声明搜索量、排名、需求规模。立题依据是研究中可验证的方法冲突和现站内容缺口。

## 交付与验收边界

双语Markdown为完整可用稿，证据档案与source ledger分别保存。已经实际读取主图、全部方法和补充PDF，完成本作者的事实及双语对照复核。机械引用校验不是独立编辑验收；仍应由另一位审查者复核自然语言、关键方法判断及原图后再决定网站集成。用户此任务明确暂不改站，因此没有部署、UI或端到端测试结果。

MDPI图像403已通过Europe PMC公共补充文件接口解决。原研究的完整配比/均质参数/低浓度校准解释缺口不能通过工具补齐，已经缩小正文结论，不以此阻塞有根据的研究解读。

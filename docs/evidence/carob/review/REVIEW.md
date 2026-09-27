# 角豆修订稿第二独立终审

## 结论：本目录最终稿可以集成；输入稿不应原样集成

**事实/双语内容审定通过，限下列最终 SHA-256。** 输入稿主要研究结论已正确，但仍有开篇采集日志口吻、商品缺少上下文直链及少数中文措辞问题。本目录已作有限替换，不新增研究、不改核心论证、不改来源编号。不需要再开一轮扩写。

**不是发布批准或网页视觉 PASS。** 没有网页截图、浏览器版式/手机端/实际链接交互测试；此次视觉核对仅为三张原始论文图的内容识读。没有改站、没有发布。集成时须保留论文的范围限定、Raw异常说明、方法注与引用，另行执行渲染及发布流程。

## 冻结文件

|文件|SHA-256|
|---|---|
|输入 article.en.md|f09944b28f5d400d9a281ea72c024f97d8daac8d177a0181bd1e3aec19e2dcc6|
|输入 article.zh.md|4576c878f6071c2ed059635999a3d1608edc11be9f69bf3e32eff16e481af18d|
|最终 article.en.md|bb2a2c36940f825c665f7ef9b6b1ed27c214820b688f64a62f724f59279152c5|
|最终 article.zh.md|661edcaceaf7ccfacf6004a17a213fcd867481c00740eaab565bf24522bc1aef|

输入根目录：`/data/hermes/research/seo-growth/2026-09-27-late-carob-review/`。输出根目录为本报告所在 `2026-09-27-late-carob-final/`。所有35个输入文件的精确哈希在 `input-SHA256SUMS.json`；复核结束时逐一重算，全部未变。`SHA256SUMS.json` 列出输出文件（自身除外）哈希。

## 独立事实审定（不是复述上轮报告）

直接解析 `sources/cake.xml`、`muffin.xml` 原始 JATS 的方法、表格、图注和结果，读取三份 Amazon `*-result.json` 原始返回及搜索原始结果，并重新查看三张 JPG。辅助核对 `gum.txt`、`commerce.txt` 与 `efsa.xml`。未把 `claims.json`、`verification.json` 或上轮图审结论当作事实依据。

|审定项|原始证据与判断|最终状态|
|---|---|---|
|30组内聚性|蛋糕图1D灰柱：0/10/30/50/70依次标 b/a/c/d/e；30低于对照且不共享字母。图注说明不共享字母为Tukey p<0.05。原文“above 30%”不能被扩写成30组内聚性未变。稿件明确30已显著降低。[3]|保留，正确|
|硬度与弹性|图1C硬度字母 b/c/c/a/b；弹性 ab/a/b/c/d。10、30硬度低于对照；50更硬；30弹性与对照共享b。50/70弹性与内聚性继续降低。未从图估读值编造精确数值。[3]|保留，正确|
|比容|表2对照2.22±0.12 a、10组2.01±0.08 ab、30组1.93±0.00 abc、50组1.78±0.10 bc、70组1.66±0.02 c。30与对照共享a；50与对照无共享字母。表注 n=2、均值±SD，Tukey p<0.05。未检出差异不等于等效。[3]|保留，正确|
|75g与300g基准|表1每行粉体合计75g、列明配料合计300g；独立计算角豆占总量0/2.5/7.5/12.5/17.5%。30组实际全去15g可可，加入22.5g角豆，小麦60→52.5g。10组小麦反增至67.5g。[3]|保留，非单纯可可替换率|
|完整配方限制|材料列泡打粉而表1无其量；材料还提到去离子水。不得把表列300g当完整复刻配方或烤后质量。现文已明确“列明配料”与“不完整”，无需为这一点再扩写。[3]|保留，正确|
|图注15%冲突|图1图注写15% cocoa (f.b.)，表1为15/75=20%，正文也写20%。稿件公开指出冲突并按表1克数计算，而非默改来源。[3]|保留；中文“可可粉基”改自然表达|
|蛋糕感官|方法20受训评价员，每人3样，12次/组，烤后24h，15cm线量表；表3接受度对照8.9±3.9 a、30组10.4±2.9 a，所有组均a。不能宣称30最受欢迎或最佳用量；100消费者是作者建议的后续验证，并非已完成。[3]|保留，正确|
|玛芬配方|5%为作者列的全配方比例；25.5%大豆、6.5%亚麻籽、6%小麦、19%白糖。先泡12h、煮45min、打碎；未明示25.5%计量时点，不能称干大豆粉。[4]|保留，正确|
|玛芬感官与图号|图1是14属性QDA雷达图（a香气/t味道/s结构）；角豆更甜、豆味/unknown更强，可可味和苦味更弱，正文一致。10名训练评价员与78名接受度志愿者是两套评价；图2才是接受度柱图，7.1和6.9同标a，正文与图注共同支持无显著差异。[4]|保留；unknown改为未明确命名，不解释成“不熟悉”|
|跨研究分数|蛋糕15cm量表与玛芬九分喜好量表不同，评价人群、配方亦不同。不能数值横比，更不能把QDA雷达图当总体接受度图。[3][4]|保留，正确|
|减糖|玛芬保留19%白糖；蛋糕各75g糖；没有随角豆用量减糖的实验证据。更甜不构成减糖成功。[3][4]|保留，正确|
|Amazon中焙|B07JX6YCKR原始title/brand及bullets明确Worldwide Botanicals、medium、regular cocoa、milk chocolate用例。重复bullets不是独立证据。[6]|仅作卖家定位，未采信健康/成本/完美替代宣称|
|Amazon深焙|B0F67QBGL3明确同品牌dark、dark cocoa、dark chocolate用例；未规定碱化度/pH。[7]|仅作定位，不称等效替代测试|
|Amazon Raw|B01D2975KS title为AUSTRALIAN RAW ORGANIC CAROB POWDER，brand为The Australian Carob Co.，bullets=[]；details确实含“Type of item”: “Video Game”。这是原始采样的真实异常，不因success=true而自动合格。[8]|保留异常与限制；不称同品牌第三档，不确认温度/营养/品质，不判定异常原因|
|样本口径|search-result.json count=8且items=8，三款ASIN均在其中；三份详情status=completed、success=true。8是搜索记录，非8品牌或8已核详情。Amazon.com域名未建立配送国家和购买条件。[9]|方法注保留8记录/3详情、日期；不推销量和份额|
|LBG及商品身份|PALGUM页面明确种子胚乳、黏度/粒径/颜色及黄原胶/卡拉胶协同；EFSA支持冷水膨胀、最大溶解需加热，但不支持统一温度时间。Nordmann将焙烤粉、LBG-VISCOGUM和40–50%蛋白VISCOGUM CGP分开。[1][2][5]|保留，不外推批次规格|

### 三张真实图的逐张处置

- `foods-09-01586-g001.jpg`：已查看全图；用于图1C/D字母核对。D纵轴误用“Hardness (N), Springiness (%)”，与图例不一致；本文不采用其错误单位，不将图中文字错误复制到正文。无需把这一无关轴标签错误再塞进读者正文。
- `11130_2018_675_Fig1_HTML.jpg`：已查看真实雷达图；只支持感官属性轮廓，不能单独证明喜好无显著差异。统计/人数依原文方法及结果。
- `11130_2018_675_Fig2_HTML.jpg`：已查看真实柱图；两柱同a；指标性质及九分量表由原JATS图注确认，不从无轴标题图像猜测。以上是论文图内容核查，不是网站视觉验收。

## 必须修改与有限替换

完整精确 old/new、理由在 `exact-replacements.json`；`article.en.diff`、`article.zh.diff` 给出可直接审阅的上下文。已验证按顺序回放替换与最终文件逐字相同。

1. 删除英/中第9行“On 27 September…we examined…”及“2026年9月27日，我们查看了…”整段，将真实8条记录/3款详情/采样日期移到文末“Sampling scope / 采样范围”。不是隐藏时间，也不是改写成另一个开篇工作日志。
2. 两语开篇的中焙/深焙、商品表三款以及工业商品PALGUM、Carob Ingredients、VISCOGUM CGP均增加已存来源的上下文外链，不只靠文末裸URL。
3. “三个真实商品，提出的是不同选样问题”→“中焙、深焙与Raw：三款商品的定位差异”；英文同步。保留选样逻辑，不继续重写文章。
4. “15%可可粉基”→“粉体基准的15%”；“不熟悉味道”→“未明确命名的味道”；“黏度测试协议”→“黏度测试方法及条件”；“另一个Raw候选”→“单独的Raw款候选样品”。这些是中文自然性/精确性修正，不引入新发现。
5. Raw的缺要点及Video Game异常仍说明为“详情采样”，不改成真实商品就是电子游戏或页面当前必定相同。未补造原料参数。

全文中文逐段审定：标题—商品定位—计量基准—质构与感官—玛芬差异—胶的材料边界—小试建议的逻辑连续；科学段密度较高但服务于误读纠正。无须删除研究细节或把正文改成采购问卷。双语主张强度一致，数字、方向、样本条件未改变。

## 机械验证与事实判断分开

- 两语 `sources.py verify --evidence` 均 exit 0、`citations OK`；各9个来源均有引文。EN工具报告37%句覆盖；ZH工具仅识别1句，所谓100%对中文没有有效质量含义，**均不作为事实通过依据**。
- 表1计算由原JATS单元格重算，不由终稿数字反推；各组表列总量300g、粉体75g及四项百分比正确。
- 所有输入hash结束时仍一致；精准替换回放通过。输出hash用于冻结，不等于事实证据。
- 未运行原目录可能写文件的verify.py；未扩展外部研究，未重抓Amazon来混合采样时点；此次依既有原始证据归档审定。

## 集成交接边界

使用本目录 `article.en.md` 和 `article.zh.md`，沿用原始证据目录及source身份，保存原JATS与三图供追溯；不要只带走旧正文而遗漏新方法注或直链。不要把“内容可集成”写成“已经发布/网页视觉通过”。无剩余内容阻断项；剩余为网站渲染、交互及获授权后的发布验证。

## Sources

沿用文章现有来源ID，不重编号：
[1] https://carob.es/en/product — gum
[2] https://www.nordmann.global/en/news-events/news/exquisite-carob-products-from-morocco — commerce
[3] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC7692711/fullTextXML — cake
[4] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC6096888/fullTextXML — muffin
[5] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC7010100/fullTextXML — efsa
[6] https://www.amazon.com/dp/B07JX6YCKR — Worldwide Botanicals medium roast listing
[7] https://www.amazon.com/dp/B0F67QBGL3 — Worldwide Botanicals dark roast listing
[8] https://www.amazon.com/AUSTRALIAN-RAW-ORGANIC-CAROB-POWDER/dp/B01D2975KS — The Australian Carob Co. Raw product detail, 27 September 2026
[9] https://www.amazon.com/s?k=carob+powder — Amazon US carob powder search, 27 September 2026

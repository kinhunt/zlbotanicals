# 独立核验 REPORT：罗汉果电商样本

日期：2026-09-23。结论：**可作为现有罗汉果采购/规格稿中有分量的一节集成；不建议仅凭本样本另建一张薄页。** 草稿英文正文约750词，中文按同一论证自然重写。其价值是用实物标签展示图与页面措辞解释“商品名—配料—量取—功能”之间的差异，而非重讲标准化等级或编造品类份额。集成时保留三个小标题及四个商品直接外链，放在原料规格定义之后、应用或选择讨论之前。未读取另一审稿人的全文，因此具体段落去重及最终篇幅仍由集成者按全文判断。

## 独立检查范围与证据等级

仅离线读取授权证据目录；无浏览器、无新网页抓取、无网站/共享backlog写入、无发布。已加载b2b-website-content-audit、b2b-content-operations、grounded-citations。

原始目录：`/data/hermes/research/seo-growth/2026-09-23-evening-commerce/`。四份 `detail-{ASIN}.json` 的 `stdout.result.result` 为官方详情字段；`14-gallery-result.json` 的 `stdout.result.result.rows` 为原始DOM提取回执，包含title、input#ASIN读取结果、URL、重要信息和原始gallery script字符串。**这是DOM字段/脚本摘录，不是完整HTML归档。** 未把作者ANALYSIS或其转录当作独立视觉证据。

本次实际调用vision查看四张contact图的全部31格，另直接打开四张关键背标原图（NOW -02，其余 -01）、DureLife正面-00、Lakanto赤藓糖醇量杯图-06。contact仅用于身份/用途检查，不宣称全31图的小字逐字核对。原图标签读数来自本次视觉工具，不是作者转录。所有31原始JPEG已重新计算SHA256，并重新解析每个ASIN的colorImages.initial，逐索引校验image_url和ASIN/URL身份，31/31通过，见image-verification.json。

这里的“核实”指卖家页面和展示图片确实作出该声明，不是实购、检测、现行认证或实测烘焙证明。NOW、DureLife UPC视觉读数与详情UPC相符；两Lakanto显示字母数字贴标，不宣称UPC对应已独立确认。initial gallery可能含同系列不同尺寸/Golden宣传，不能一律视作所选SKU专用图。

## 字段级证据与采用决定

下表D指`detail-{ASIN}.json`中上述result，G指`14-gallery-result.json`中对应row，I指`images/{ASIN}-NN.jpg`。四个ASIN的D.asin、G.requestedAsin、G.asin和G.url均吻合。

|商品/字段|独立证据定位及原样读数|判定与稿件边界|
|---|---|---|
|NOW B07B4D9TF3，名称与2 fl oz|D.title、D.details.Size；G.title；I00|可用；不把Item Weight的2.1 ounces当液体净含量|
|NOW配料|I02：DE-IONIZED WATER, CERTIFIED ORGANIC MONK FRUIT (LUO HAN GUO) EXTRACT, 11% ORGANIC CANE ALCOHOL|可用；G没有配料字段，不能虚称该配料来自DOM文字|
|NOW 11%|I02确见11%，未见w/w、v/v或ABV|明确未知分母；不可写11%vol、不可算乙醇质量/每滴酒精量|
|NOW用法|I02与D.bullets同述5 to 8 drops、Shake well before using|可用；未规定对应饮料体积，也不是每日安全限量|
|NOW UPC|I02读733739069160；D.details.UPC相同|身份佐证，不进入读者正文|
|DureLife B0CP9Q47LK，5 oz/142g、pure|D.title；G.title；I00：NET WT 5OZ (142 GRAMS)，100% PURE • NO ERYTHRITOL|可用，限定卖家声明|
|DureLife配料|I01：ORGANIC MONK FRUIT (LUO HAN GUO) EXTRACT；G.ingredients：Organic monk fruit extract (Luo Han Guo). 100% monk fruit extract|支持单一提取物标示；不等于100% mogrosides或100% mogroside V|
|DureLife标准化|四详情/DOM及已检查标签未披露总苷或V百分比|只说本次未见，不说产品实际没有苷/不存在检测|
|DureLife量取|I01：1 Scoop (0.31g)；USE 1 SCOOP (1/8 TSP) TO CREATE THE SAME SWEET TASTE AS 1 TSP OF SUGAR|可用，是甜味换算；不推导统一8倍甜度、不换算重量、不推烘焙功能|
|DureLife份数不一致|I00：450 SERVINGS；I01：454 Servings Per Container；D.bullets：450+ servings|保留450/454，不擅自纠正、平均或按142g/0.31g反算“真实份数”；450+与454不必判冲突|
|DureLife UPC|I01读860011036906；D.details.UPC相同|身份佐证|
|Lakanto B098H7XWQ6身份|D.title、G.title：with Erythritol, 5 Lb；I00：Classic、With Erythritol、5lb/2.27kg|可用，不与allulose合并规格|
|赤藓糖醇版配料|G.ingredients、I01：Erythritol, Monk Fruit Extract.|可用，无配比|
|赤藓糖醇版营养|I01：About 284 servings；2 tsp (8g)；0 calories；Total Carbohydrate 8g；Sugar Alcohol 8g|稿中只用每份8g/碳水8g/糖醇8g/零卡说明不可倒推比例；不声称额外的Total Sugars 0g行存在|
|赤藓糖醇版1:1|D.bullets：1:1 replacement；I06：1 CUP SUGAR = 1 CUP LAKANTO，Measures 1:1 Like Sugar；脚注As close to a 1:1 replacement as we can get|图明确按杯体积，限定词保留；图本身未写配方，归属来自准确gallery映射，不能移用另一ASIN|
|赤藓糖醇版成分作用|I05宣传图：monk fruit extract provides sweetness；erythritol provides sugar-like texture|作为广告分工可用，不当实验结果；不采用browns beautifully为实证|
|Lakanto B0CLBVY6VY身份|D.title/G.title：with Allulose, Classic White, 3 LB；I00/I01同系列正背标|可用；宣传小袋尺寸不覆盖本SKU的3lb|
|阿洛酮糖版配料|G.ingredients：Allulose, Monk Fruit Extract.；I01：Allulose*, Monk Fruit Extract；*Adds a negligible amount of sugar|配料可用，脚注原样存档；不是两种配料各50%|
|阿洛酮糖版营养|I01：170 servings；2 tsp (8g)；Calories 0；Total Carbohydrate 8g；Total Sugars 0g|可作标签声明；不“纠正”零卡、不换算热量，不把糖与总碳水混淆|
|阿洛酮糖版1:1与烘焙|D.bullets：close to 1:1 sugar replacement ratio；keeps baked goods moist；mimicking ... browning characteristics|可归因于页面；比率基准未明，不能说本ASIN已证实cup-for-cup；保湿/褐变为定位非对照试验|
|阿洛酮糖版47%|I01：packaging contains up to 47% post-consumer recycled content|包装回收含量，绝非阿洛酮糖或提取物比例；正文不用|
|Lakanto两条码|I01均为字母数字贴标而非可确认对应页面UPC的纯数字条码|不采用模糊字母转录作为身份强证据|

## 全图用途审阅

- NOW 00正面、01营养、02配料/用法、03另一营养角度；04跨产品甜度图（不能移用粉末/袋装/1-to-1行）；05滴入杯场景；06品牌认证宣传、07品牌排除项宣传。后两者不是批次检测。
- DureLife 00正面、01背标；02饮食/认证卖点、03烘焙场景、04pure/organic/no erythritol、05厨师持袋、06面团、07厨房生活方式。任何甜点图都不证明整份食品零卡或配方等效。
- Lakanto erythritol 00/01正背标；02日常使用、03家庭生活方式、04饮料/烘焙/酱料、05两种成分角色与性能营销、06杯量1:1及脚注、07饮食卖点。无实测方法。
- Lakanto allulose 00/01所选Classic正背标；02 new classic、03泛用zero calorie、04白糖替代、05 Classic与Golden混合系列、06宣传。部分宣传图展示较小袋型；其份数/净量不用于3lb ASIN。Golden不作Classic配料证据。

## 对原ANALYSIS的独立判定

核心材料观察通过；有三项集成时必须收紧：
1. “单一提取物标示”不能升级为分析纯度结论；100% Pure与100%罗汉果苷严格分开。
2. 不能把“两种复配袋装以常规糖量取替代为卖点”进一步泛化为两款都已证明等体积1:1。仅赤藓糖醇版量杯图明确体积；阿洛酮糖页面close to 1:1未写基准。
3. DureLife正背份数差异在原image-observations中有记录，但原ANALYSIS表只列454；本稿正文直接保留450/454，防止集成时丢失矛盾。

不将四款硬分成普适原料分类，不按成分优劣、价格/克、甜度/克或销量排名。未采用类目名、评论量、价格、销售名次、健康/降糖/减重、认证真实性或“最受欢迎”表述。31图不是31商品，四ASIN属于三品牌。

## 交付与集成

- `draft.en.md`：约750词正文，完整可读分析节。
- `draft.zh.md`：自然中文对应论证，关键数字和限制一致。
- `ledger.json`：本任务独立引文命名空间；原始DOM bullets逐条经sources.py quote匹配，图片字段以本报告及映射文件为证据。
- `source-{ASIN}.json` ×4：从原始回执无改写提取的title/ingredients/bullets/details便查副本，**不是新抓取或完整HTML**。
- `image-verification.json`：31图hash、URL索引、ASIN身份机器校验。
- `validation.json`：引用校验结果及交付文件hash。

Sources脚本的--evidence门只确认每个引用有匹配文字，**不自动验证每个图片字段**；上述逐字段视觉核验补足这一点。集成主稿时须按URL合并引用ID，不直接复用本节1–4覆盖别稿。实际发布仍需全文独立审阅，本任务没有发布授权。

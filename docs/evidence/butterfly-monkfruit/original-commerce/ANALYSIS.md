# Amazon美国站罗汉果甜味商品：材料身份与使用场景小样本

采集时间：2026-09-23 16:03–16:08 UTC；工具 BrowserMan CLI 0.4.2，真实浏览器 cedar-vale。单一串行采集者。只读浏览，无登录、购物、评论、私信或发文。

## 样本与结果

真实搜索 https://www.amazon.com/s?k=monk+fruit+sweetener 第1页，官方脚本返回20项；从该页目的抽样4个ASIN、3品牌，覆盖液滴、单一提取物标示及两种复配体系。不是随机样本、完整品类调查或销量/份额数据。不得把搜索次序、评论量、类目排名当销量。

| 品牌/ASIN/链接 | 页面与包装实际材料声明 | 使用场景与不可越界结论 |
|---|---|---|
| NOW B07B4D9TF3 https://www.amazon.com/dp/B07B4D9TF3 | 2 fl oz液体；背标Ingredients：DE-IONIZED WATER, CERTIFIED ORGANIC MONK FRUIT (LUO HAN GUO) EXTRACT, 11% ORGANIC CANE ALCOHOL。背标UPC733739069160与页面一致。 | 背标5–8滴按口味甜化食品饮料、使用前摇匀；它是含水和酒精的液体配方，不是100%干提取物。11%基准未写明，不自行认定体积比。 |
| DureLife B0CP9Q47LK https://www.amazon.com/dp/B0CP9Q47LK | 5oz/142g；背标仅列ORGANIC MONK FRUIT (LUO HAN GUO) EXTRACT。页面标题100%Pure、No Erythritol与单一成分声明一致；UPC860011036906与页面一致。 | 1 scoop(0.31g)，454份；背标1 scoop(1/8 tsp)甜味相当于1 tsp糖。品牌主打饮料、烘焙；这是甜味换算，不是体积1:1，更不是烘焙功能等效。本轮未见mogroside V或总mogrosides标准化百分比，不能把100%pure写成100%罗汉果苷。 |
| Lakanto B098H7XWQ6 https://www.amazon.com/dp/B098H7XWQ6 | 5lb；Ingredients:Erythritol, Monk Fruit Extract。背标每2tsp(8g)总碳水8g、糖醇8g、0calories，约284份。 | 页面与宣传图主打1:1白糖替代、咖啡茶、烘焙及酱料；背标本身未给甜度换算。包装的8g糖醇是标签舍入数据，不可据此算出提取物精确占比。营销“browns beautifully”等不是实测烘焙证据。 |
| Lakanto B0CLBVY6VY https://www.amazon.com/dp/B0CLBVY6VY | 3lb；Ingredients:Allulose*, Monk Fruit Extract；脚注*Adds a negligible amount of sugar。背标2tsp(8g)、170份、总碳水8g、总糖0g、0calories。 | 页面主打无赤藓糖醇、接近1:1、保湿和褐变。与赤藓糖醇版同属monkfruit sweetener却不同配方；不能只凭商品类别名称采购。零卡是卖家标签声明，不是所有成分物理热值为零的证明。 |

## 核心观察

1. “monk fruit sweetener”不是统一商业原料。四个样本至少需要区分液体载体体系、单一提取物标示、赤藓糖醇复配与阿洛酮糖复配。
2. “No erythritol”不能直接推出“无其他成分”：NOW有水与有机甘蔗酒精；Lakanto阿洛酮糖版有allulose。必须读完整Ingredients。
3. 用量表达揭示不同任务：NOW按滴调甜；DureLife按小勺浓缩甜味换算；复配袋装以常规糖的量取替代为卖点。甜味、体积、保湿、褐变是不同验证项目，本次只观察卖家如何定位，没有厨房或实验室试验。
4. 品牌相同也不能合并规格。Lakanto两种配方同为Classic、白糖替代，其配料、营养字段和功能话术不同。
5. DureLife“100%Pure”支持的只是卖家单一提取物声明；不支持mg/g mogroside V、某个商业标准化等级、无残留或批次纯度。本轮可形成采购问题：提取物标准化指标、载体/溶剂、成品添加量、目标应用验证。

## 图像检查

完整映射：image-manifest.json。31张原始JPEG均下载自本轮DOM的colorImages.initial实际URL，不从其他size/color组补图。每品牌contact图逐格实际视觉检查31张，关键背标4张另以原图分辨率检查。检查记录见image-observations.md。其余宣传图仅作版式/声明分类，不把小字认作完整转录。

原图为卖家展示的包装照片/艺术稿，不是实购物或批次验货。NOW/DureLife背标数字UPC与页面相符；两Lakanto背标条码为字母数字贴标，未验证其对应UPC，不虚称全部UPC一致。阿洛酮糖图05含Golden系列，不作为所选Classic成分证据；NOW图04也是多产品甜度图，不把其他规格套到本ASIN。

## 证据路径（本目录绝对路径前缀）

`/data/hermes/research/seo-growth/2026-09-23-evening-commerce/`

- `01-catalog.json`、`02-amazon-actions.json`、`03-search-schema.json`、`04-product-schema.json`、`05-ping.json`：官方脚本发现、schema与在线回执。
- `06-search.json`、`07-search-result.json`：真实搜索dispatch/completed原始脱敏回执。
- `detail-B07B4D9TF3.json`、`detail-B0CP9Q47LK.json`、`detail-B098H7XWQ6.json`、`detail-B0CLBVY6VY.json`及各`-dispatch.json`：四详情completed回执。
- `14-gallery-result.json`：成功完整4ASIN DOM/title/input#ASIN/initial-gallery脚本片段。
- `images/`：31张原始图与4张派生联系表；`image-manifest.json`：URL→ASIN→原始字段→文件→SHA256。
- `image-observations.md`：每图分类与关键背标转录。
- `SHA256SUMS.json`：证据文件hash；`verification.json`：实际校验结果。

## 技术问题与边界

- 官方get_product出现重复bullets、availability/reviews混入JS：保留原始回执，分析不把重复当独立证据；搜索第9项reviewCount误抽availability，未用于数量分析。
- 首次本地脚本import路径不匹配安装导出，08/09保留失败回执；按package.json修正后通过inspect/schema。
- 第一次gallery抓取过早，12回执NOW缺title/gallery，第三项缺ASIN后停止；不作为完整材料证据。增加可见title+gallery脚本的有限轮询后14完整返回4个匹配ASIN，没有绕过验证码。
- 无忙/离线/验证码。本地脚本完成后使用CLI标准完成/清理生命周期自动结束预留，本采集者不再持有任务或继续浏览；15-browser-release-check仅证明浏览器在线，不证明专用lease状态（CLI列表未展示lease字段）。
- 保存回执对浏览器/扩展/连接标识及凭据预览脱敏，保留executionId供追踪；未读取或输出config凭据。只写授权目录，不改共享backlog、网站或技能库。后续复用注意：navigate返回不代表title/gallery已就绪，必须先就绪检查及ASIN验证。

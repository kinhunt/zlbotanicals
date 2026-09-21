# 新商业机会：食品用迷迭香抗氧化原料选型

状态：已完成实质 EN/ZH 候选稿和证据包；未独立审稿、未集成、未发布。不是库存/合规核准记录。

## 从真实信号发散，而不是换原料套诊断模板

触发信号是制造商 EN-FORT 当前页面同时提供油溶、水分散、干态及液态形态。[1] 同厂 FORTIUM R 页面进一步把浓度、载体和鼠尾草酸标准化列为产品差异。[2] 发现的商业问题不是“迷迭香有没有抗氧化活性”，而是采购是否把物理交付形态与组成含量混成一个规格。此为产品分类信号，不是搜索量、市场增速或 ZL 库存证据；页面发布日期未核实，不称近期新品。

比较的机会：

1. **油脂、涂层、乳化食品与粉体之间的迷迭香原料采购选型——选中。** 对象是食品采购和配料销售，交付的是有明确原料路线的双语商业模块，不是故障排查或空白表格。现有站点无该原料内容，供应形态有直接制造商证据。[1][2]
2. **果胶兼容的紫薯花青素色素——本轮暂缓。** 新论文摘要涉及柑橘皮果胶与紫薯花青素在红薯淀粉粉丝中的组合，不是果胶软糖。[4] 可以衍生“有色淀粉食品”研究题，但把它包装成普遍适用于软糖的色素采购页证据不足；未取得完整方法，也未验证可采购具体色素等级。因此不以摘要数字作商品兼容性保证。
3. **迷迭香替代 BHA/BHT 的配方比较——不作主线。** 原始试验确有食品加工与氧化终点，但使用三种纯化合物混合物，且较高浓度组总体仍弱于所比较的 BHA:BHT。[3] 这推翻了“天然方案可一比一直接替换”的强营销角度。保留为选型稿里的反例，避免另开替代指南。
4. **迷迭香专用含脂粉体商业页——合并而不独立建页。** 当前直接应用研究是填充脂肪乳粉，不足以自动推到所有植物基奶精或零食粉体。[3] 将粉体仅作为采购路线之一，避免把窄研究过度扩页。

## 与现有站点和已排期候选的区别

只读基准：/data/hermes/workspaces/zlbotanicals 的本地 origin/main = `8c1995038de0601928d233606a322e30efb396b6`。未执行 fetch，不能声称该 SHA 是远端此刻最新版本。全部 src 路径保存在 site-inventory.json；关键词检索记录为 site-novelty-search.txt。精确检索 rosemary / anthocyanin / 迷迭香 / 花青素色无命中。扩大检索中可见葡萄籽原花青素和罗汉果果胶酶，但它们不是花青素着色或迷迭香食品抗氧化供应页。

已读 editorial-discovery-brief.md，程序解析 backlog.json 全部 23 张 cards，确认 paprika、quillaja 已有成熟候选，本次不占用其原料或用途。brief 与 backlog 未修改。

现有 /solutions/food 页面主要是通用均匀性、加工后风味/颜色、规格不符和询盘提示，没有迷迭香具体材料路线。已保存英中页面快照及 botanical-extracts 页快照。本候选新增原料而不是把茶、甜菊或积雪草的试验模板改名。

## 推荐读者、承载与商业承接

- 首要读者：食品配料采购、食用油/零食/调味酱研发及销售技术支持；不是购买保健胶囊的消费者。
- **近期承载建议：**在 /solutions/food 与 /zh/solutions/food 中新增商业原料选型模块，链接现有 /products/botanical-extracts 与 /request-quote（中文对应页）。这些路径在只读 inventory 中实际存在。避免立刻制造薄产品页或宣称新 SKU 已上线。
- 未来独立商业页的条件：业务方确认可询价的实际等级范围、载体/成分资料和样品沟通流程；内容及目的市场合规独立复核。当前不分配虚构上线 URL。
- 商业承接：食品类别＋目的市场＋加料相/节点＋感官要求＋数量，进入迷迭香原料采购可行性和样品讨论。禁止从竞品页面搬用认证、垂直整合、脱味、供货期或性能承诺。
- 原创增量：把“油溶/水分散”与“干态/液态”拆成两个规格维度；给出三条具体询样路线；用纯化合物试验的阴性比较约束替代宣传，保留 ppm 的脂肪基准。
- 不主张该主题有已测搜索量或 GSC 需求；本次是直接商品分类信号驱动的机会验证。

## 证据范围与未完成事项

来源 1、2 是同一制造商的商业一手资料，只证明其公开产品分类和主张，不算两个独立的效果验证。来源 3 是独立原始研究全文；本稿只依赖方法与结论，不把论文背景引用当新读过的原始研究。来源 4 只取得摘要，专用于暂缓决策。

Firecrawl 搜索中途 403；改用 SerpApi，已保存 organic 结果，不使用 AI overview 作为证据。Europe PMC 搜索接口一次空结果、一次仅返回 version，已保留原始响应，不解释为文献不存在；通过搜索发现论文后，Europe PMC fullTextXML 成功返回完整正文。PubMed 直取 HTTP 203 返回 cookie interstitial，已保存失败体；后经 web_extract 获得摘要，来源范围仍明确为摘要。没有调用 BrowserMan 或任何浏览器。

未做食品实测、报价、样品确认、现行法规逐条核查或独立中英文审稿。候选的交付形式与证据成熟到可进入独立内容审查，不等于可无审直接发布。附 verification.json 为引用/档案技术检查，不是独立编辑通过。

## Sources

[1] https://www.kemin.com/eu/en/markets/food/products/en-fort — EN-FORT™ | Rosemary antioxidant for food | Kemin Europe
[2] https://www.kemin.com/na/en-us/markets/food/products/fortium-r — FORTIUM™ R Rosemary-Based Antioxidant for Food Shelf Life Extension
[3] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8151479/fullTextXML — The Effect of Carnosol, Carnosic Acid and Rosmarinic Acid on the Oxidative Stability of Fat-Filled Milk Powders
[4] https://pubmed.ncbi.nlm.nih.gov/42602737 — Sweet potato starch noodle enriched with purple sweet potato anthocyanins (abstract only)

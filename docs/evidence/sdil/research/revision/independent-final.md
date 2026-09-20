# SDIL修订稿独立终审

日期：2026-09-20。审查者为独立事实与中英编辑，不是作者或英国税务顾问。本轮只读审查既有稿件与原文存档，不改文章、不写repo、不发布。

## 结论：PASS（仅成稿内容）

**E1–E5均已在实际文件中解除。** 已完整阅读revision的英文、中文及两份worksheet，并对照原稿逐项检查diff，不是依据changelog或作者自检预先放行。该PASS适用于一般信息文章与空白附件；**尚未集成、尚未发布、尚未完成浏览器验收**，不构成乳清配方资格判定或税务专业签署。

## E1–E5实际修订

| 项目 | 实际定位 | 独立结论 |
|---|---|---|
| E1 标题泛化豁免 | 两语正文第1行 | RESOLVED：英文为current SDIL rules / proposed changes，中文为现行适用条件 / 调整方案。标题独立出现不再承诺类别整体豁免。 |
| E2 乳清范围与语言 | 两语第43行；附件第40、56–59行 | RESOLVED：另行确认代替reserved decision／人工复核；正文明确不决定乳清来源乳糖的资格，附件仅留空白证据及待确认事项。 |
| E3 研究日记与法律状态 | 两语第84行，连同第7、21行 | RESOLVED：删除“本次未找到成法”，转为HMRC于2026年7月文件的有限归属，不将检索缺席当成法律不存在的证据。 |
| E4 混合饮品歧义 | 两语表2第61行 | RESOLVED：containing sugars / 含糖明确是植物乳替代饮料带入糖，与纯动物乳混合；不再暗示必须另加糖或多植物组合。 |
| E5 钙条件跨时期 | 两语第33行；两语附件B第23行 | RESOLVED：正文、附件均明确仅为现行豁免条件，不得直接带入2028资格判断。 |

### 原文支持与范围控制

- 当前指南确有75ml乳／100ml调制饮品与乳替代饮料120mg钙／100ml等条件；修订保留添加糖、其他产品条件及豁免判断，不凭糖数值单独裁税。[4]
- 政策原文笼统排除乳清粉乳糖，草案4C(c)/(d)则有“to the extent … not recombined / not reconstituted”限定；修订准确保留差别而不解决其适用。没有把乳清粉一概不可扣除、溶解即法律复原、复原必然可扣除写成自己的结论。[2][7]
- 7月政策明说内容可能更新并将发布最终指引；正文第84行的文件归属有原文依据，不需要证明一个不可穷尽的“绝无后续法规”命题。[2]
- 混合饮品的依据是政策原句“if sugars from a milk substitute drink are added to plain milk, these sugars are considered to be added sugars”；并不以额外加糖浆为前提。[2]
- 草案对regulation 8结构作修改；本稿只限定现行钙字段用途，没有擅自推导未来全部条件，范围恰当。[7]

### 全文与双语复核

两语各两张表、六个假设场景和两份A–F空白表均检查。现行5／8g、拟议4.5／8g、每100ml单位、2026税率年份、75ml乳条件、现行120mg钙、饮用酸奶90ml与不得为提高可饮用性另加液体的第二条件、应税事件时间口径均保留。植物单一核心糖源、同植物额外加米糖浆、果蔬汁例外及混入动物乳的区别成组保留；门店分装不等于全供应链免税，机器浓缩液仍另行说明。

未发现英中翻译改变确定性、日期、数值或适用范围。E6的具体产品文件说明、E7的甜菊税务分类与使用许可区分、中文“非碳酸”“现配杯装”“参考来源”等优化均已落实。正文研究流程口吻已解除。附件保留“Decision reserved / review owner”等记录字段符合空白工作表用途，不应为了清除正文流程口吻而删掉真实待办记录。没有预填税额、产品性能、默认零值或通用乳清扣除计算。

非阻塞小瑕疵：zh.md第33行“资格条件。 配方”有一个多余半角空格；未改文件，不影响发布内容判断。

## 实际验证及其限制

- 4份原稿／修订稿diff已人工复核；revision manifest的12项hash全部匹配；历史original-integrity的51项原文件hash全部匹配。
- 本轮对开始时存在的64个文件保存并复算SHA-256，全部未变；完整before/after保存在同名JSON。仅新增本报告两份文件。
- 复用independent/ledger.json，52条引文均可在对应既有原文存档中匹配，仅归一空白。没有新增法律检索、重编号或改写ledger。
- 独立运行`verify --evidence`：英文原文件退出0；中文原文件退出1，原因仅为工具不识别“参考来源”标题。临时副本只将该标题归一为Sources后退出0，副本已清理。不得把后者冒称中文原文件命令通过。
- 校验器仍有未引用账本条目、单句引文计数警告；中文分句统计只有2句，不能作为100%中文语义覆盖的证明。PASS来自人工逐段、表单和原文审查，而非工具分数。

## 集成前待办（不是本轮已完成项）

本轮未集成到网站，未提交或部署repo，未访问生产网页；Markdown相对链接存在只说明附件在本地。实际下载URL、UTF-8下载内容、语义HTML表头／caption、移动端溢出与键盘可达性、最终中英页面标题与引用必须在后续集成时验收。若后续加入具体乳清扣除资格、数值、税额或自动判定，当前PASS不覆盖新增内容，应重新审查。

## Sources

[2] https://www.gov.uk/government/publications/changes-to-the-soft-drinks-industry-levy/changes-to-the-soft-drinks-industry-levy-policy-paper
[4] https://www.gov.uk/guidance/check-if-your-drink-is-liable-for-the-soft-drinks-industry-levy
[7] https://www.gov.uk/government/publications/changes-to-the-soft-drinks-industry-levy/draft-legislation-accessible-version

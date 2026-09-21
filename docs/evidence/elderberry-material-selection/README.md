# 晚间主动发现交付：接骨木真实材料差异

## 先看
- `elderberry/elderberry-material-selection.zh.md`：完整中文稿
- `elderberry/elderberry-material-selection.en.md`：完整英文稿
- `discovery-selection.md`：三角度发散、实际验证与收敛理由
- `placement.md`：现有页差异、建议URL、内链、商业边界与集成门槛

## 证据
- `elderberry/source-ledger.json`：正文8个来源，保留原始ID 1/2/5/7/8/9/10/11
- `elderberry/retrieval-ledger.json`：包括403/未采用来源的完整最初注册记录
- `elderberry/claim-evidence.json`：14项可定位主张/原文证据段与正文锚
- `retrieval-manifest.json`：URL、取回时间、HTTP状态、原文与文本SHA256；publication date与retrieval date分开
- `elderberry/evidence/`：原始PDF/HTML/XML及未截断提取文本；失败页也留存但不作支持证据
- `citrus/`、`color/`：其他候选完全隔离存档
- `site-dedup.json`、`site-snapshot/`：只读origin/main与backlog去重证据
- `verification.json`、`elderberry/citation-verification-final.json`：引用严格证据检查及逐段原文匹配结果
- `package-sha256.json`：完整交付文件哈希（不包含该清单自身）

## 范围与遗留
研究代理没有调用BrowserMan、修改代码/共享backlog、发布或生成图片。父级唯一BrowserMan采集者追加3个Amazon详情，本代理直接HTTP独立复核并整合；原料证据另有公开B2B文件，不声称实物检测。Artemis/Iprona相关资料不算独立证据流。一次通用搜索403，部分供应商HTML失败；改用官方完整PDF与Europe PMC全文，而非搜索摘要拼稿。

作者自检通过不等于独立审稿。父级安排独立中英文编辑/事实审查；本包不含发布承诺。英文引用覆盖率CLI为18%（方法建议、商业推论及每段多句使统计偏低），没有用阈值掩盖；需按claim-evidence与完整原文审查事实强度。中文句子统计同样不适用字数判断。

需要后续证据：HighFiber单品完整TDS/检测方法/辅料组成，当前可交付规格与COA，目标成品试验。文章没有将这些未知项写成已确定事实。

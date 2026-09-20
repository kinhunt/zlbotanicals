# 修订验证

- E1–E7双语建议替换逐项匹配，E5正文与附件均作现行限定；表格、语言建议一并落实。
- 原始账本48条引文：对原始source-N.txt仅归一空白逐字匹配，48/48。未重新获取网页。
- 实际en.md、zh.md正文引用ID集合与各自参考来源集合相等，URL与原账本一致，所引7个来源均有原文证据。
- EN引用工具verify --evidence退出0。
- ZH原生检查退出1：工具不识别“参考来源”。仅对临时副本将该标题改为Sources后退出0，临时副本已删除；交付中文仍为“参考来源”。不是中文事实失败，也不隐瞒工具限制。
- 保留非strict警告：账本[3]未引用；分句器报告一处>3引文。中文仅统计2句，不将100%工具统计解释为中文语义覆盖或严格验收通过。
- 两份附件空白字段数、原有URL完整保留；下载相对目标在revision存在，未测试线上下载。
- 51个原有文件前后SHA-256一致；recheck.py未执行/导入；未修改repo、证据、原稿或共享backlog。
- 仅writer自检完成，等待独立复核；未作税务专业签署或发布。

句子级变更见changelog.md；详细输出见verification.json、两语verification.txt、quote-validation.json与original-integrity.json。manifest.sha256.json覆盖本目录其余全部最终文件，不自包含。

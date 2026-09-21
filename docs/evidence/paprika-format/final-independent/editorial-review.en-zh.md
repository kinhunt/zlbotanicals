# Final independent editorial review / 最终独立编辑复审

2026-09-21 · Bounded re-review of the exact four files in `../candidate-hashes.json`.

| Candidate / 候选稿 | integration_ready | Decision / 结论 |
|---|---|---|
| Paprika EN/ZH / 辣椒红中英文 | **true** | Content approved; P1/P2 closed / 内容通过，P1/P2已关闭 |
| Quillaja EN/ZH / 皂树中英文 | **true** | Content approved; Q1 and Chinese fixes closed / 内容通过，Q1及中文修订已关闭 |

## English

**Paprika:** Both complete language files were read, not just the replacement strings. P1 is closed at EN/ZH lines 29–33: the misleading denominator heading is replaced, the two percentage reporting bases remain distinct, and the extract-versus-diluted/formulated-preparation limitation is explicit. P2 is closed at ZH lines 11, 27, 43 and 55: 果实, the direct aqueous-formulation explanation, 干粉预混料 and 原料定义 are correct in context. The table and procurement prose are readable; the shorter disclaimer still distinguishes recommendations from ZL trials. The factual/analytical content remains consistent with the local evidence; no new capsaicinoid number or use permission was introduced. See `../paprika/changes.diff`, `claim-evidence.json`, `ledger.json` and the archived 2008 CTA pp.2–3 / later specification pp.1–5.

**Quillaja:** Q1 is closed. The isolated ledger maps local citation 1 to the actual 2005 CTA and local citation 2 to Ingredion, consistently in both drafts and Sources blocks; the old 1/4 mapping is documented, not left colliding with the root ledger. The full CTA extraction and PDF are used, not the partial/wrong-lane sources. The manifest includes absolute paths, URLs, dates and matching hashes; the change ledger explicitly withdraws the original shared-ledger verification claim for this revision. ZH lines 9, 13–15, 21, 25 and 29 now read naturally and preserve dose-versus-performance, dry-basis-versus-as-supplied, and supplier-documentation distinctions. Ingredion attribution and weighted/non-weighted emulsion wording remain intact. No generic clarity guarantee, universal Type 2 superiority, or blanket egg/milk/vegan allegation is created. See `../quillaja/changes.diff`, `citation-remap.json`, `retrieval-manifest.json`, `ledger.json`, CTA pp.1–2 and `sources/source-4.txt`.

**Regression and boundary:** No blocking regression found in either EN/ZH pair. Both retain destination-market checks and do not turn JECFA descriptions, historical ranges or manufacturer claims into current country-specific permissions, approved food doses, confirmed stock, certifications or validated ZL performance. Claim scope has not expanded; no new regulation search is required for this content gate.

## 中文

**辣椒红：** 已完整通读中英文。P1的错误分母标题已替换，7%与“总类胡萝卜素的30%”未混淆，并明确禁止未经确认就把提取物指标套用于稀释或复配制剂。P2所列“果实”、含水配方说明、“干粉预混料”和“原料定义”均已落实。表格及采购建议表达顺畅，仍清楚区分文献描述、询样建议与ZL实测结果。未新增辣椒素类数值或法规许可承诺。

**皂树：** Q1已关闭。独立证据账本、引文编号、来源列表及检索清单一致；使用2005年CTA完整文本及原始PDF，未混入其他稿件来源，且已明确原共享账本不能验证旧版皂树稿。添加量与透明度/保质期的区别、供货形态、干基与供货状态含量、检测方法及报告基准、最终饮料和目标市场等中文问题均已修正。保留Ingredion归属、含/不含增重剂乳化体系及卵白蛋白/乳糖的条件性说明，未扩大为所有商品的性能或过敏原断言。

**边界：** 两组稿件未发现阻断性退步或虚构法规准入。历史规格不等于现行许可，样品与规格仍需项目确认。此次只批准上述哈希对应文本进入整合，不批准实际原料使用，也不代表页面渲染、站点构建或生产发布通过。

## Verification record / 验证记录

- All four SHA-256 values exactly match `../candidate-hashes.json` before and after checking; see `hash-checks.json` and `verdict.json`.
- Fresh execution of `../check_revisions.py`: **exit 0**, **4/4** strict evidence gates passed, **11** quote checks and **7** archive hash checks passed; **48/48** original files unchanged. Raw output and fresh per-candidate results are retained here.
- Optional PDF fontTools warnings remain in `checker.stderr.txt`; checked excerpts still match fresh PDF extraction. Automated coverage percentages were not used to approve Chinese prose.
- The checker rewrote diagnostic JSON with a different interpreter path. Fresh results were saved here; prior diagnostic bytes were restored by exact pre-run SHA-256 match. All pre-existing revision files remain byte-identical. No site, candidate text, source archive or ledger was edited.
- Remaining gates: insertion context, locale/routes/links, rendered review, actual build and authorized publication. **No further content correction requested for this bounded gate.**

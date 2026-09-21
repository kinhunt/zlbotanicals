# 空白CSV填写说明

两份表都是记录模板，不是试验结果，也不含电子表格自动公式。每份只有表头和一条全空行。另存工作副本时使用UTF-8、保留英文表头，数字用小数点；含逗号的文本须按CSV规则加引号。数字栏填写普通数值，不使用百分比显示格式或公式。

## 取样记录：33列

每行记录一个分析物的一次进样结果；也可记录实验室最终汇总结果，但须在`raw_data_path`注明汇总方式。同一汇总中不要混用这两种粒度。

- 追溯：`protocol_id`、`batch_id`、`sample_id`、`parent_sample_id`、`paired_group_id`、`control_status`关联方案、批次、物理样、母袋和运输对照组。不同袋使用不同ID；同袋取出的各部分保留母袋ID。在`stage`和`location_depth`明确区分整袋、散装与部分取用。
- 采集：`timestamp`用含时区的ISO 8601时间；`cumulative_discharge_kg`、`sachet_sequence`、`container_id`、`sampling_device_method`、`transport_conditions_record`、`seal_integrity`记录出料区间、袋序、容器、取样方法、运输及封口状态。部分取用的方式和代表性依据写入方法栏或链接记录。
- 称量：`sample_mass_g`是实际取出或用于制样的粉体量，`net_sachet_mass_g`才是对应整袋粉体净重，不含包装；`tare_method_balance_id`记录皮重方法和衡器。制样量不能代替整袋净重。
- 分析：`analyte`写明糖苷名称或加和明细；`prep_id`、`injection_id`、`assay_method_version`、`qc_recovery_record`、`loq_and_qualifier`、`raw_data_path`保留制样、进样、方法、质控、定量限与原始记录。
- 留痕：`missing_reason`、`deviation`、`operator`分别记录缺失、偏离与操作人。同一制样液重复进样，不另建物理样ID，也不增加独立袋数。

### 数字与基准约定

| 结果含义 | `original_result` | `original_unit_basis`准确写法 | 换算 |
|---|---|---|---|
| 原样基1% w/w | 1 | `% w/w; as_received` | ×10＝10 mg/g |
| 同一浓度，以质量分数表示 | 0.01 | `g/g; as_received` | ×1000＝10 mg/g |
| 已是mg/g浓度 | 10 | `mg/g; as_received` | 不变 |
| 已是整袋糖苷质量mg | 20 | `mg/sachet; whole_sachet` | 不变，不再乘袋重 |

表中数字只用于说明换算，未写入空白CSV。`0.01`配`% w/w; as_received`表示的是**0.01%**，即0.1 mg/g，不是1%。软件无法仅凭一个合理数值判断填写者是否误用了百分比；从电子表格导出后，应对照实验室报告检查CSV实际保存的数字。

尚未转换的干基结果，单位写`% w/w; dry_basis`、`g/g; dry_basis`或`mg/g; dry_basis`。保留原始值，把换算依据写入`basis_conversion_record`；依据齐全后再填`concentration_as_received_mg_g`。如果水分以原样质量分数报告、且分析方法支持该校正，可将干基浓度乘以（1－水分质量分数）；不要默认每种测定都适用此式。

只有浓度能代表同一整袋时，才计算`component_mass_mg_per_sachet`＝`net_sachet_mass_g`×`concentration_as_received_mg_g`。散装样或没有代表性依据的部分样不能这样外推。实验室直接报告整袋mg时，保留该结果，不再乘袋重。部分取用结果仍是部分取用结果，整袋计算栏留空。

缺测、未定量、低于LOQ或缺换算依据时，数字栏留空，在`missing_reason`解释，定量限及限定符写入`loq_and_qualifier`，不要填零。有依据的数值零应与缺失明确区分。统计前先将进样和制样结果归回物理样层级，再计算独立样本数量；不能把重复测得的整袋含量相加。

## 原料物性表：18列

`material_id`、`lot_id`、`ingredient_or_carrier`和`composition_basis`记录材料、批号、组分身份及组成来源/基准；商品复配粉不能默认是纯糖苷。`sampling_method`、`psd_method`、`dispersion_pressure_MPa`及体积分布`Dv10_um`、`Dv50_um`、`Dv90_um`保留粒径取样与测量条件；形貌填`shape_method_observation`。`bulk_density_g_mL`、`tapped_density_g_mL`、`true_density_g_mL`分别是堆密度、振实密度和真密度，在`density_methods`写各自方法，不互相代填。`moisture_method_result`、`temperature_RH`、`raw_data_path`记录水分方法与基准、测量环境及原件。未测数值留空，在对应方法栏注明原因。

# Tea-stream and paired-state records / 茶液流股与双状态记录

Three blank UTF-8 BOM CSVs for manual records; no automatic formulas or calculator. Blank means unknown, not zero.

三张UTF-8 BOM空白CSV供手工记录，不含自动公式，也不是计算器。空白表示未知，不等于零。

## 1. Files and linked keys / 文件与关联键

- `boundary.blank.csv`: one row per step boundary and analyte; uniquely identify with `boundary_id`. / 每个步骤边界、每个目标物一行，以`boundary_id`唯一标识。
- `acceptance.blank.csv`: separate rows for concentrate and diluted formulation, linked by `pair_id` and the same ingredient `batch_id`; repeat paired rows for later observation times. / 原液和按实际配方稀释后的样品分行，同批原料用`pair_id`配对；新增观察时间需新增配对记录。
- `streams.blank.csv`: one row per step × stream × analyte × sampling interval. Within a batch/boundary, composite key is `(step_id, stream_id, analyte, interval_id)`; across files prefix `(boundary_id, batch_id)`. Another analyte or interval is not a duplicate stream. Do not total the same interval twice. / 每步骤×流股×目标物×取样区间一行；批次及边界内用上述四项复合键，跨记录须加边界和批次编号。同一流股的不同目标物或区间不算重复，不重复累计同一区间。

Use exact ASCII field names and enum values in CSVs; bilingual definitions below are authoritative. Blank means unknown/not yet entered, never zero. For genuinely inapplicable fields leave blank and explain in `notes` or `investigation_notes`; do not enter text in numeric cells. Numerical zero requires evidence. / CSV使用原样ASCII字段和枚举值；中英说明如下。空白表示未知或未填，不等于零。不适用字段留空，并在备注说明；数值格不得填文字。零值也须有依据。

## 2. Boundary fields / 边界字段

| Fields | English instruction | 中文说明 |
|---|---|---|
| boundary_id, batch_id, project, operator | Identify the boundary, ingredient batch, project and responsible recorder. | 标明衡算边界、原料批次、项目与记录人。 |
| tea_type, form, other_ingredients | Record tea type, concentrate/powder/formulated base and all other ingredients. | 记录茶类、浓缩液/粉末/配方基底及其他配料。 |
| step_id, process_description, boundary_scope | Name the separation step and all included equipment; do not combine consecutive steps as parallel streams. | 标明分离步骤及纳入的设备；串联步骤不得当并联流股累计。 |
| inventory_scope | Define opening and closing inventory in tanks, membrane modules and piping; quantities and assays go in stream rows. | 定义罐、膜组件、管道期初与期末存量；实测量和分析结果填流股表。 |
| interval_start, interval_end | ISO 8601 timestamps with timezone defining the accounting window. | 用含时区的ISO 8601时间定义衡算区间。 |
| designated_product_streams | Explicit stream IDs for permeate, retentate or a defined product blend, consistent with product_eligible rows. | 明确产品流股编号：透过液、截留液或指定混配；与流股表产品标记一致。 |
| analyte, method_comparability_ref | One analyte; reference evidence that assays and matrix preparation are comparable. GAE total phenols are not catechin mass. | 每次单列目标物；引用方法与基质前处理可比性依据。总酚GAE不是儿茶素质量。 |
| temperature_C, duration_min, added_water_kg | Actual process conditions and added water; water mass here is contextual, not an extra input to add to the stream total. | 实际温度、时长与加水量；此处加水量只作条件记录，不再额外计入流股总量。 |
| criteria, approver, notes | Predetermine acceptance criteria, approval responsibility and exceptions; no default industrial thresholds. | 事前约定允收准则、批准人及例外；不预设通用工业阈值。 |

## 3. Paired-state fields / 双状态字段

| Fields | English instruction | 中文说明 |
|---|---|---|
| boundary_id, batch_id, pair_id, state, sample_id, concentrate_sample_id, operator | Link to boundary and lot. state = concentrate or diluted_formulation. Identify each sample and its source concentrate aliquot; both rows share pair_id. | 关联边界与批次。state取concentrate（原液）或diluted_formulation（稀释配方）。各样品单独编号，记录来源原液分样编号，两态共用pair_id。 |
| concentrate_kg, added_water_kg, other_inputs_kg, final_mass_kg | On the diluted-formulation row record weighed ingredients and actual final mass. For multiple other inputs, provide individual masses and compositions via inputs_composition_ref. | 稀释配方行记录浓缩液、加水、其他投入及最终实测质量。多个其他投入须在inputs_composition_ref引用文件中逐项给出质量和组成。 |
| inputs_composition_ref, volume_dosing_ref | Trace each input assay and basis. If dosing by volume, reference individual volumes in L, measurement temperatures and measured densities in kg/L. Do not assume additive volumes or kg = L. | 逐项追溯投入组成及口径。按体积配料时，引用各股L数、测温及实测密度kg/L。不得假定体积可直接相加或kg等于L。 |
| tea_solids_value, tea_solids_unit, tea_solids_basis | Record tea-derived solids content, its unit and measurement/source attribution basis for each state. °Brix of a mixed formulation is not tea solids. | 分别记录茶来源固形物含量、单位、测定和来源归属依据。混合配方的°Brix不等于茶固形物。 |
| water_report_id, mixing_order, pH, heat_process, packaging | Identify water analysis, addition order, measured state-specific pH, complete time/temperature heat history and packaging. | 记录水分析编号、投料顺序、各状态实测pH、完整热处理时间/温度及包装。 |
| observation_time, observation_temperature_C | ISO timestamp with timezone and actual observation temperature; add rows for repeated observations. | 含时区的观察时间及实际观察温度；重复观察另增行。 |
| appearance_method, appearance_result, colour_method, colour_result | Record agreed appearance and colour methods and observations; results are not automatic acceptances. | 记录约定的外观、颜色方法和观察结果，不自动代表合格。 |
| turbidity_value, turbidity_unit, turbidity_method | Numeric result with instrument/method and matching unit, not an unlabelled number. | 浊度数值须配套单位、仪器/方法，不填无单位的数值。 |
| composition_method, composition_result, sample_scope | Trace analyte, value, unit, basis and qualifier via a complete lab-report reference or full result text. sample_scope = whole_sample, supernatant or separated_solid. A supernatant assay is not a whole-sample assay. | 用完整实验室报告引用或完整结果文本记录目标物、数值、单位、口径及定量状态。sample_scope取whole_sample（全样）、supernatant（上清）或separated_solid（分离固体）。上清分析不得称为全样含量。 |
| criteria_ref, appearance_decision, composition_decision, investigation_notes | Link approved criteria; each decision = pass, fail or pending, assessed separately. Record unresolved issues. | 引用已批准准则；外观及组成各自填写pass、fail或pending，分开判断，记录待调查项。 |

For homogeneous, loss-free mixing without target reaction, expected content in mg/kg is `Σ(input kg × input mg/kg) / measured final kg`. This is conditional bookkeeping, not a stability prediction. The concentrate paper tested separately prepared concentrations, not post-storage dilution of one concentrate.[7]

仅在均匀混合、无损失且目标物不反应的前提下，预期mg/kg含量为`Σ(投入kg×对应mg/kg)/最终实测kg`。这是有条件的账面预期，不预测稳定性。原论文研究分别制备的浓缩液，不是同一已储存原液的兑水试验。[7]

## 4. Stream dictionary and reporting contract / 流股字典与报告口径

| Fields | English instruction | 中文说明 |
|---|---|---|
| boundary_id, batch_id, step_id, stream_id, analyte | Required links and identity; use the composite key in §1. | 必填关联及标识，复合键见§1。 |
| role | feed, added_water, other_input, permeate, retentate, wet_cake, withdrawn_sample, flush, opening_inventory or closing_inventory. Include every boundary stream, even when its result is unknown. | 分别为进料、加水、其他投入、透过液、截留液、湿渣、取样、冲洗、期初、期末存量。即使结果未知也应列出全部边界流股。 |
| interval_id, interval_start, interval_end, sampling_mode, sample_time, sample_id | Required interval ID and start/end; sampling_mode = segment_composite, pooled_composite or inventory. sample_time is the sampling timestamp, not the accounting interval. Identify a mixed pool or representative segment sample; inventory is a snapshot at start/end. | 必填区间编号及起止；sampling_mode取segment_composite（分段混合样）、pooled_composite（混匀池样）或inventory（存量快照）。单个取样时刻不能代替区间。注明混匀池或代表性分段样，存量对应期初/期末快照。 |
| quantity_basis, volume_L, mass_kg | quantity_basis = volume or mass; enter exactly the relevant measured quantity in L or kg. Neither quantity is inferred without measured density. | quantity_basis取volume或mass，只填所选路线的实测L或kg；没有实测密度不得互换。 |
| result_basis | stream = original/as-received material result; vial = diluted laboratory analytical bottle; solid-extract = extract from a weighed solid portion, before or after bottle-dilution correction as indicated. | stream表示原样/收到状态的结果；vial表示实验室分析瓶的稀释液结果；solid-extract表示称取固体试样所得提取液，是否已校正分析瓶稀释由下列字段说明。 |
| concentration_mg_L, content_mg_kg, wet_dry_basis | Choose only the assay field matching the route below. wet_dry_basis = wet or dry for mg/kg; wet denotes as-received material, including liquids weighed as received. Leave blank for liquid stream/vial mg/L; for solid-extract mg/L specify the weighed portion basis as required below. | 按下列路线仅填适用分析字段。mg/kg须标wet（湿基/收到状态，含称重液体）或dry（干基）；液体原样/分析瓶mg/L不填湿干基，solid-extract的mg/L则按下述规则标称样湿干基。 |
| dry_fraction | Measured dry-matter mass fraction of matching as-received material, 0–1 inclusive, required for a dry-basis assay applied to wet mass. | 对应收到状态物料的实测干物质质量分数，范围0–1；以湿质量使用干基含量时必填。 |
| analytical_D, already_corrected | D is the cumulative conventional laboratory dilution factor, finite and ≥1. already_corrected = yes or no. D is never physical process dilution. See route rules; the flag alone cannot establish result basis. | D为实验室常规累积分析稀释倍数，有限且≥1；already_corrected取yes或no，不是工艺兑水倍数。仅凭该标记不能确定报告口径，须按路线填写。 |
| qualifier, loq_value, loq_unit, loq_basis | qualifier = quantified, <LOQ or missing. For <LOQ leave assay value blank; enter a positive numeric loq_value, loq_unit = mg/L or mg/kg, and loq_basis = stream, vial or solid-extract matching result_basis and the same wet/dry and correction fields. Do not put “<” in a numeric cell. | qualifier取quantified、<LOQ或missing。<LOQ时分析数值留空，另填正数定量限loq_value，loq_unit取mg/L或mg/kg，loq_basis与result_basis一致，并沿用同一湿干基及稀释校正口径。数值格不填“<”。 |
| method_id, lab_report_id | Identify validated matrix-specific method and a unique complete report; establish cross-stream comparability. Include uncertainty and method QC references when available. | 引用经验证的基质适用方法和唯一完整报告，确认跨流股可比性；有不确定度及方法质控时一并引用。 |
| extraction_volume_L, test_portion_kg, test_portion_basis, extraction_method_ref | Required for solid-extract: final combined extract volume (not simply solvent added), representative test portion mass, basis wet or dry, and validated preparation/extraction reference. Both quantities must be positive. No undocumented extraction-recovery correction. | solid-extract必填最终合并提取液体积（不是简单的加入溶剂量）、代表性称样质量、wet/dry称样基准及经验证的提取方法引用。体积及称样质量须为正；不得擅自加入提取回收率校正。 |
| product_eligible, target_mg, notes | product_eligible = yes or no, consistent with designated product IDs; only output rows can be products. target_mg is a manually calculated point amount in mg; CSV has no formulas. Leave blank for missing or <LOQ; record interval/upper bound in notes, not a fabricated point value. | product_eligible取yes或no，与产品编号一致，只有出料可作产品。target_mg是手工计算的mg点值，CSV无自动公式。missing或<LOQ时留空，上界/区间写备注，不伪造点值。 |

### Allowed routes / 允许路线

1. **Liquid as received / 液体原样:** volume + L + `result_basis=stream` + mg/L + `already_corrected=yes`; `A=V×C`. D is not multiplied, even if recorded for traceability. / D即使留作追溯，也不再乘。
2. **Liquid analytical bottle / 液体分析瓶:** volume + L + `result_basis=vial` + mg/L + `already_corrected=no`, D required; `C_stream=C_vial×D`, `A=V×C_stream`. If the lab already reports original concentration, select stream, not vial. / 若实验室已报原液浓度，应选stream而非vial。
3. **Weighed material / 称重物料:** mass + kg + `result_basis=stream` + mg/kg + `already_corrected=yes`. Wet basis: `A=m_wet×w_wet`; dry basis: `A=m_wet×f_dry×w_dry`. For a dry powder still use measured as-received mass and its matching fraction; do not assume f=1. / 干粉同样按收到状态质量及匹配的干物质分数填写，不默认f=1。
4. **Wet-cake extraction / 湿渣提取:** mass + as-received kg + `result_basis=solid-extract` + mg/L, extraction fields required. Let `C_extract=C_reported` if already_corrected=yes, otherwise `C_reported×D`. Then `w_portion [mg/kg] = C_extract [mg/L] × extraction_volume_L / test_portion_kg`. Set wet_dry_basis equal to test_portion_basis. Wet portion: `A=m_wet×w_portion`; dry portion: `A=m_wet×f_dry×w_portion`. This assumes a representative sample and validated quantitative extraction; otherwise request the lab's validated as-received mg/kg result and use route 3. Multiplying mg/L by D alone never produces mg/kg. / C_extract为提取液浓度：已校正则直接用，未校正仅乘一次D；由提取体积和称样质量换成mg/kg。称样湿干基须与wet_dry_basis一致，干样路线另需对应实测干物质分数。前提是样品有代表性且定量提取已验证；不满足时应取得实验室验证后换算的原样mg/kg结果，走路线3。mg/L只乘D绝不会变成mg/kg。

Do not add entrained-liquid analyte again if captured by a whole-wet-cake assay. Do not combine both mg/kg and extract mg/L results for the same sample. / 整体湿渣分析若已包含夹带液，不重复加入夹带液目标物；同一样品不同时累计mg/kg结果和提取液mg/L结果。

## 5. Amounts, completeness and interpretation / 目标物量、完整性与判读

`A_available = A_opening_inventory + Σ A_inputs` (mg).

`Product recovery (%) = 100 × Σ A_designated_product / A_available`.

`Complete closure (%) = 100 × (Σ A_outputs + A_closing_inventory) / A_available`.

`Unaccounted difference (mg) = A_available − Σ A_outputs − A_closing_inventory`.

Products are already included in outputs: never add them twice. No recirculation totals. Do not count samples already included in an output twice; flushed hold-up counted as flush is not also closing inventory. Use either a representative mixed cumulative pool or `Σ(V_segment×C_segment)` for nonoverlapping segments, never endpoint concentration × entire run volume.

产品已经计入outputs，不再另加。内循环不累计。已包含在出料中的取样不重复加；已冲出并计入冲洗液的残留不再算期末存量。累计量须用代表性混匀池样或不重叠分段的`Σ(V分段×C分段)`，不能用终点瞬时浓度乘全程产液量。

- **Check each metric separately.** Complete, comparable available-input and designated-product amounts permit product recovery even if a non-product stream is unknown. Label overall balance incomplete. Missing non-product output or closing inventory prevents complete closure and a complete unaccounted difference, not necessarily recovery. Unknown denominator or product means no point recovery. / **逐项判断指标完整性。** 全部投入及指定产品量完整、可比时可报告产品回收率，即使非产品流股未知；但必须注明整体衡算不完整。不完整非产品出料或期末存量使完整闭合率及完整未闭合差额未知，不必然使产品回收率未知。分母或产品未知则不得报点值回收率。
- A measured-output subtotal may be reported with its scope. Only with nonnegative, comparable amounts, no duplicates, a complete positive denominator and one consistent boundary may it be called an accounted fraction/lower bound, not complete closure. / 已测出料合计可以注明范围后单列；只有量非负、口径可比、无重复、分母完整且为正、边界一致时，才可称已核算比例/下界，不称完整闭合率。
- For <LOQ, do not substitute zero. With known quantities and compatible numeric LOQ, propagate `[0, LOQ)` through the same positive conversion to an amount bound. If the denominator itself is bounded, propagate numerator and denominator intervals; do not use the point formula. Blank LOQ means no numerical bound. / <LOQ不填零；量已知且数值定量限口径匹配时，按同一正数转换传播`[0,LOQ)`到目标物量上界。分母本身为区间时须传播分子和分母区间，不用点值公式。定量限缺失则不得报数值上界。
- Input quantities, concentrations and LOQs must be finite and nonnegative (LOQ positive); dry_fraction ∈ [0,1]; D ≥1. Zero denominator is undefined. Reject duplicate composite keys, not duplicate stream_id alone. Missing density prohibits kg↔L conversion. Negative **derived differences** are allowed and flagged; the nonnegative rule applies to measurements, not differences. / 输入量和含量须有限、非负（LOQ为正）；干物质分数0–1，D≥1。零分母未定义。拒绝重复复合键，不仅凭stream_id判断。无密度不得换算kg与L。计算所得负差额可保留并报警；非负规则针对输入而非差额。
- Recovery or closure >100% is flagged, never clipped/normalized. Unaccounted mass is an investigation item, not proven adsorption, degradation or removal; chemical formation/conversion requires species-specific investigation. / 超100%须复核，不截断、不归一化。差额是待调查项，不证明吸附、降解或去除；存在物种转化须专门调查。
- Concentration ratio is not recovery; instantaneous membrane rejection is not cumulative product recovery. Analytical spike recovery is method QC, not process yield; do not automatically divide process results by it. Appearance and composition decisions remain separate from recovery and shelf-life validation. / 浓度比不是回收率，瞬时膜截留率不是累计产品回收率。加标回收属于方法质控，不是工艺产率，不自动用它除算生产结果。外观、组成判断须与回收率及保质期验证分开。

## 6. Evidence and test scope / 证据及测试边界

The concentrate paper reports dried cream sediment mass per concentrate volume (80°C drying for 48 h), not wet sediment or percent feed solids. Its volume-corrected deficit `(C_original×V1 − C_clarified×V2)/V1` in mg/mL is not a recovery fraction.[7] The white-tea paper compares composition in μg/mg powder after separate reconstitution; total recovered powder and all streams are needed for recovery. Its 30/100 kDa values are nominal MWCO, not geometric pore diameters. Folin–Ciocalteu total phenols use a gallic-acid standard and are not an additive catechin mass fraction.[6]

浓缩论文报告按80°C、48h干燥法所得茶乳沉淀质量/浓缩液体积，不是湿沉淀或占进料固形物百分比。体积校正差额公式单位为mg/mL，不是回收率。[7] 白茶论文按各自重配后的粉末μg/mg比较组成，计算回收还需粉末总量及全部流股。30/100kDa是名义截留分子量，不是几何孔径。Folin–Ciocalteu总酚使用没食子酸标准，不是可直接累加的儿茶素质量分数。[6]

## Sources

[6] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC13115093/fullTextXML — Optimized Isolation of White Tea Infusion Micro-Nanoparticles and Stability Mechanism: A Composition–Structure–Stability Perspective
[7] https://pmc.ncbi.nlm.nih.gov/articles/PMC3614051/?pdf=render — Analysis of cream formation in green tea concentrates (full HTML recovered)

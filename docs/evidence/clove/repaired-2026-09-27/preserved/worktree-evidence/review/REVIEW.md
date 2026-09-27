# Independent clove EN/ZH review — content-ready after finite repairs

## Verdict
**PASS: publication-ready research copy for the exact reviewed EN/ZH files bound in hashes.json.** No remaining source or language blockers in that copy. This is not approval of the unmodified author drafts, a food manufacturing specification, or verification of site integration, rendering, accessibility, deployment or publication. No site files edited. All work is confined to this review directory; originals preserved.

## Finite repairs
1. **Substantive denominator correction, both languages:** Methods 2.3 says freeze-dried extract was mixed with a **30% w/v wall-material solution** at 1:4. Original drafts shortened this to extract:wall material, inviting a dry-mass ratio reading. Corrected the actual mixing object and explicitly left the ratio basis unspecified. Discussion elsewhere claims carrier comprises 80% of the powder; that does not resolve the method's ambiguity. No dry powder carrier fraction is derived.
2. **Denominator clarity, both languages:** Defined clove loading efficiency as measured post-drying concentration / theoretical pre-drying concentration, not powder eugenol mass fraction. Expanded the paper's phenolic encapsulation-efficiency formula literally: (TCP−SP)/TCP×100, where TCP is author-defined total core phenolics. No reinterpretation as an eugenol assay.
3. **Design precision, both languages:** Eugenol experiment varied both processing conditions and eugenol:polymer ratio, not only process settings. Its 3:1 MD:GA blend stayed fixed; lecithin was added. No claim that DF06/DF16 isolates one causal variable.
4. **Storage precision, both languages:** Replaced generic sealed-tube wording with screw-capped tubes 4/25 °C, 40 days versus sealed tubes 60 °C, seven days. These are separate from seven-day 75.3% RH exposure and not shelf-life validation.
5. **Editorial precision:** Table described as selected columns, not all of Table 2. Chinese “三次独立开展的实验运行” changed to “分三次开展实验” (natural wording without implying independent industrial lots); “端点排序” changed to plain 水分高低顺序. No wholesale rewrite or added commercial samples.

Exact before/after edits: edits.json and changes.en.diff / changes.zh.diff.

## Independent evidence findings
Freshly fetched all three original JATS XML sources; bytes exactly match the author archive. Parsed original td/th cells, read Methods and equations, and compared all used numeric endpoints. independent-evidence.json records all original tables plus relevant methods, not a flattened table reconstruction.

- Clove Table 2: six aw/hygroscopicity rows correct; p=0.17 vs p<0.01 correct. Hygroscopicity groups a,a,b,b,b,b: 75:25 is only numerically lowest, not a unique significant optimum. Nonsignificance is not equivalence. Three separate runs, SD, Tukey and p<0.05 confirmed.[1]
- Hygroscopicity: 1 g, saturated NaCl, 75.3% RH, seven days; method does not explicitly state exposure temperature or percentage equation. The 25 °C value belongs to aw measurement. Do not insert dry-basis g/100 g, equilibrium uptake, kinetic interpretation or an exposure temperature.[1]
- Conflicts correctly retained: all-MD moisture 1.39% Table 2 versus 1.30% discussion; solubility 93.3% versus 95%; all-GA 89.9% versus abstract blanket >90%. Disputed columns excluded from the main table. Elderberry comparison uses only the direction of endpoint ordering, unchanged by the clove discrepancy, not a pooled numerical ranking.[1][2]
- Clove Table 4 loading range 70.5–75.6%, p=0.78 confirmed as published, not statistically reconstructed without raw observations. Chemical loading and Folin phenolics are not sensory retention. Product recovery's solids denominator is distinct from loading concentration's denominator.[1]
- Eugenol Table 3 DF16 96.07% EE /33.72% recovery and DF06 47.37% EE /65.35% recovery confirmed. Recovery is final microcapsule mass divided by initial MD+GA+SL+EUG mass. EE is experimental/theoretical EUG content. Method's theoretical percentages and design's %v/v ratio wording remain a source ambiguity; copy attributes reported values and makes no conversion. No clove versus eugenol efficiency ranking.[3]
- Elderberry Tables 1/2 all-MD 5.63±0.15% and all-GA 4.10±0.09% confirmed; 1:2 carrier:extract-dry-mass and inlet120±1 °C confirmed. Different material, extraction and drying: bounded counterexample to carrier-name-only prediction, not a clove replication or proof of drying-method causation.[2]
- No universal aw threshold guarantee, health claim, package barrier/desiccant prescription, shelf-life extrapolation, or borrowed retail-product equivalence found in reviewed copy. Recommendations are clearly editorial qualification proposals.

## Paragraph-level natural-language and reader-value review
Every body paragraph in both languages reviewed (original lines used below to locate aligned EN/ZH paragraphs; edits retain their order).

| Original line | Reader function and outcome |
|---|---|
| 3 | Clear initial-aw versus exposed-powder distinction; useful buyer hook, accept. |
| 5 | Defines selection task rather than universal winner; accept. |
| 9 | Material/process identity essential; repaired wall-solution ratio ambiguity. |
| 11 | Necessary distinction from ground clove/oil and commercial food process; accept. |
| 13 | Reproducible test boundaries; accept, missing fields remain explicit. |
| 17 | Table framing; repaired subset description and awkward Chinese runs phrase. |
| 28 | Correct SD/significance interpretation, worth the detail; accept. |
| 30 | Brief bridge from statistics to choice; not a second methods disclaimer, accept. |
| 32 | Compact source-conflict note, relevant to trust in table; retain once. |
| 36 | Adds chemical versus sensory selection criterion; repaired loading denominator clarity. |
| 38 | Concrete recovery/loading trade-off rather than generic warning; repaired design description. |
| 40 | Distinguishes the two efficiency definitions; supplied exact clove formula. |
| 44 | Bounded cross-material test of transferability; repaired Chinese jargon. |
| 46 | Prevents false process causality; concise and necessary, accept. |
| 50 | Gives specific candidate-qualification decision and flow/caking endpoints; accept. |
| 52 | Gives distinct aroma and sealed-pack next steps; repaired storage description. |
| 54 | Short actionable conclusion, no unsupported extrapolation; accept. |

English is idiomatic technical B2B copy. Chinese reads naturally after the two localized phrasing repairs; technical terms remain consistent (水分活度/吸湿性/负载效率/包埋效率/回收率). No internal agent/research-workflow narration in article body. Caution paragraphs serve different interpretation risks rather than padding. This is an independent AI editorial assessment, not external human sign-off.

## Independent visual decision
- **Approve supplied six-row numeric table**, with SD and a/b letters and surrounding conditions/limits. This is the clearest publication form; no chart is required.
- **Optional two-panel plot conditionally justified**, one panel per aw/uptake endpoint, discrete categorical carrier ratios, SD not confidence intervals, correct p-values and a/b only on uptake; caption must repeat 1g/75.3%RH/7days, unspecified exposure temperature and uptake basis, and laboratory freeze-dried material. No plot has been rendered or visually approved.
- Reject shared/dual-axis overlays, fitted or connected trend lines suggesting interpolation, superiority scores, pooled cross-study carrier ranking, or charts of shelf life, package, desiccant or sensory retention. They exceed the data.
- No need to add an elderberry table or eugenol leaderboard: bounded prose comparisons carry their reader benefit without implying common conditions. Commerce samples are optional and correctly absent.

## Release boundary
Use only draft.en.reviewed.md and draft.zh.reviewed.md with their recorded SHA256 hashes. Any later factual change or figure requires scoped recheck; source warnings and comparisons must not be stripped. Remaining work is normal site integration and technical release verification, outside this review task—not a content blocker.

## Sources

[1] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11764740/fullTextXML — Clove original JATS, Methods2.3/2.6/2.8/2.9/2.11 and Tables2/4
[2] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11899151/fullTextXML — Elderberry original JATS, Methods2.2/2.3 and Tables1/2
[3] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11510493/fullTextXML — Eugenol original JATS, Methods2.2/2.3/2.7/2.10 and Table3

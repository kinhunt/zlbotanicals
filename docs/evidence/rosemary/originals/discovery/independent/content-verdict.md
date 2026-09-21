# Independent content review — bounded PASS

Reviewed 2026-09-21 UTC. **PASS for research-content acceptance and integration; not publication approval or current regulatory clearance.** No blocking scientific misstatement or missing bilingual substantive section found in the exact revisions identified in `reviewed-hashes.json`. Minor wording improvements are listed below. No original research files or website worktrees edited; no new retrieval or publication performed.

## Scope and method

Read both comparison drafts line by line (1–58), the opportunity card, README, ledger/claim quotations and retrieval/verification records. Checked actual archived primary-study methods/results and their relevant tables, not just quotations: salmon §§2–3/Table 4, pork methods and Tables 1/3, EFSA composition Table 1 and authorisation discussion. Parsed those tables from raw XML to preserve columns. Compared the complete earlier `2026-09-21-commercial-discovery/rosemary-food-antioxidant/selection.en.md` (1–39) for editorial overlap, not for a fresh audit of that draft's underlying manufacturer/milk-powder sources. This is not an exhaustive review of every paper reference, figure or unrelated endpoint, or a live-site inventory.

## Scientific checks

- **Material identity — PASS.** EN/ZH 13–17 distinguish the experimental lipophilic material from water extraction and essential oil; they explicitly do not treat the pork extract as a verified water-soluble grade, or equal ingredient mass as equal constituent dose. Salmon §2.2 supports the sequential distillation/water extraction and residual intense herbal flavour. No three-way matched trial is claimed.[1][2]
- **Pork endpoint split — PASS, with a precision improvement.** Tables 1/3 support essential oil's lowest TBARS versus extract's highest numerical sensory scores. TBARS additive means are control 0.49, oleoresin 0.39, extract 0.41, essential oil 0.13 mg MDA/kg meat; the first three share a significance letter, and storage P=0.146. The 15 mg/kg is additive mass per kg meat, not an active-dose recommendation. Six panellists and cooked evaluation are correctly disclosed. However, extract and oleoresin share the aroma/taste significance group, and extract and essential oil share the colour group. “Best overall in the authors' assessment” is defensible as written, but does not mean statistically superior to every alternative on every sensory measure.[2]
- **Salmon endpoint divergence — PASS.** Raw Table 4 confirms day-42 high-dose PV 5.37 versus untreated 3.92, with different significance letters; TBARS treated groups are all below untreated and share the same significance letter. PV denominator is kg fat in §2.8. Methods/Table 4 say mg MDA/kg; abstract says mg/g. EN/ZH 38 correctly flag that contradiction without converting or reproducing absolute MDA claims. The draft does not invent a specific salmon TBARS denominator beyond the source wording.[1]
- **Dose inconsistency — PASS.** Source §2.1 says nominal 150 mg/kg carnosic acid + carnosol; §3 reports initial high-dose 62+79=141 mg/kg, consistent approximately with 0.63 g/kg × (125.22+97.91) mg/g = 140.57 mg/kg from Table 2. The draft flags this rather than promoting a compliance calculation. Measured post-processing values are a separate quantity, not a correction to the nominal dose.[1]
- **E392 denominator and time scope — PASS.** EFSA's EU column—not the neighbouring JECFA column—places ≥90% over total phenolic diterpenes, not total extract. The EU column says insoluble in water; the draft does not borrow JECFA's additional oil-solubility wording as EU text. EFSA is a 2018 refined exposure assessment reproducing historical specifications/use information, not retrieved current consolidated law. EN/ZH 42–46 preserve that distinction and assert no current permitted numeric dose.[7]
- **Claims ceiling — PASS.** No retail shelf life, antimicrobial protection, beverage clarity, universal winner, own finished-product efficacy, stock, certification or supply capability is established or promised. The paper authors' stronger shelf-life and regulatory statements have not been adopted uncritically.

## Bilingual/editorial findings

All substantive EN sections, warnings, numerical study conditions, denominator distinctions, enquiry requirements and unconfirmed business facts appear in Chinese. Chinese is understandable and generally natural, not a shortened substitute. Recommended targeted polish before integration:

1. **ZH 13:** “实际加油工艺” can mean adding oil rather than incorporating the extract into the oil phase. Prefer “加入油相的具体方法和工艺条件” to match EN “actual oil-incorporation instructions.” This is the clearest translation weakness.
2. **ZH 15:** “不同的材料流” is process-English; prefer “不同的产物” or “不同提取阶段得到的原料”.
3. **EN/ZH 5/23:** optionally say “highest mean sensory scores / 感官平均评分最高”, then note that some pairwise comparisons were not significant. Current explicit author attribution and six-person limitation prevent this from being a blocker; do not upgrade it into universal or statistically unique superiority.[2]
4. **ZH 54–58:** localize “Sources” to “参考来源” and replace salmon/pork/efsa shorthand with useful study titles. The URLs/IDs are complete, so this is presentation polish, not missing evidence.
5. For a reader-facing version, replace HTTP/application-shell troubleshooting detail at EN/ZH 46 with a concise statement that current consolidated rules still require checking; retain full retrieval limitations in this research package. Do not remove the historical/current-law distinction.

## Integration, not a duplicate article

Recommend **merge into the existing rosemary selection candidate by default**. Both target food buyers/formulators choosing material, incorporation route, assay/carrier and sensory fit, ending in the same sample enquiry. Different studies alone do not establish a distinct page intent.

Keep the earlier draft's delivery-format framework (oil-soluble versus water-dispersible versus dry/liquid). Add this package's concise identity distinction (essential oil ≠ antioxidant extract; water-extracted ≠ proven water-soluble), pork sensory-versus-TBARS example, salmon primary/secondary endpoint conflict, and historical E392 denominator clarification. Preserve the earlier pure-compound milk-powder limitation if that example stays. Do not merge water-soluble with water-dispersible or transplant citation IDs: the earlier package's [1]–[3] map to different URLs. Build a reconciled ledger and re-review the resulting EN/ZH exact revisions.

A separate comparison URL is only defensible after an actual site/topic inventory establishes a distinct reader task and deliberately narrows it to material identity and endpoint trade-offs. The opportunity card appropriately discloses that this inventory has not happened and that the trigger is research, not measured demand.

## Verification and limits

Independent citation/evidence-presence commands returned exit 0 for both drafts; warnings are the five deliberately uncited failed/unusable sources. Their English/Chinese coverage percentages are not semantic or localization scores. Original package manifest validation and before/after hashes are recorded in `reviewed-hashes.json`; exact review scope is distinguished from merely integrity-checked files.

No blocking issue for this bounded research-content PASS. Current legal-dose advice remains blocked by absent current annex evidence, and creation of a separate page remains an editorial/inventory decision, not an approved outcome of this review.

## Sources

Source IDs below retain the reviewed candidate ledger's mapping. Numerical checks above are review evidence, not proposed product or legal-use recommendations.

[1] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC9219763/fullTextXML — archived salmon primary study; methods, Table 2, Table 4 and results.
[2] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11418379/fullTextXML — archived pork primary study; methods, Table 1 and Table 3.
[7] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC7009710/fullTextXML — archived 2018 EFSA assessment; Table 1 EU column and authorised-use discussion.

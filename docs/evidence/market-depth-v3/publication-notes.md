# V3 publication notes — independent review handoff

**Status: drafts only. No repository modified, no release, no new BrowserMan collection, no image-generation call.**

## Deliverables and reading order

1. `functional-mushrooms.en.md` — publication-oriented English article, 2,307 words including headings, tables and method, excluding generated Sources.
2. `functional-mushrooms.zh.md` — equivalent natural Chinese article, 3,745 Han characters; whitespace word count is not meaningful for Chinese.
3. `chart-data-plan.json` — three primary exhibits: compact global endpoints, new real U.S. channel-sales exhibit, seven-brand matrix. Optional value-chain prompt only.
4. `citations.json`, `source-manifest.json`, `evidence/source-01.txt` through `source-22.txt`, `evidence-quotes.md` — task-local unified URL ledger and exact archived supporting text.
5. `verify-offline.py`, `verification.json` — read-only reproducible verification and actual output. `build-ledger.py` is a separate writing utility; do not run it during read-only review.

## Editorial decisions

- Headline leads with the requested 2031 forecast; subtitle carries functional mushrooms, extracts and growth trends. The forecast remains attributed and model-based.
- Real U.S. retail sales, cognitive positioning and purchasing tasks precede brand and value-chain analysis. Six layers distinguish cultivation, extraction, release/supply, manufacture, brand and retail.
- Seven official-source brands replace the old five-Amazon examples. Four names are new to the old set: Four Sigmatic, RYZE, Om and Odyssey. Real Mushrooms, FreshCap and Host Defense now use different official examples. This is not seven independent sales datasets.
- Removed the separate reishi-extract revenue forecast from public v3. It distracted from the primary supplement answer and invited comparison across incompatible valuation scopes. Reishi remains a natural product/encyclopedia journey, without adding supply promises.
- No brand price ladder, implied willingness-to-pay premium, brand sales rank, concentration metric, clinical comparison, “FDA approved” inference, current tariff rate or audited factory assertion.
- Region section gives the publisher’s North America and Asia-Pacific framing, actual U.S. channel evidence, and precise Canadian/EU entry differences—not unsupported country demand rankings.
- Methods and source dates are consolidated near the end. Product/cognitive limitations are stated where necessary, without repeating an Amazon collection diary.

## Numeric audit

| Public fact | Source ID / interpretation | Result |
|---|---|---|
| USD 5.83bn → USD 8.83bn; 2026–2031; 8.66% | [1], publisher estimate/forecast | CAGR recalculated 8.657180%, rounds to 8.66%; Chinese 58.3亿 → 88.3亿 correct. |
| Mainstream USD ~15.70m / 1,570万美元; +75.8% | [2], 2024 mushrooms (other), source prose | Exact reported precision retained. The inferred prior base is not an observed 2023 value and is not plotted. |
| Natural expanded USD 27,550,554 → USD 27.55m / 2,755万美元; +14.4% | [2], Table 5 | USD-to-million and 万 conversion verified. Prior-year percentage uses report-revised data. |
| Cognitive USD 7.65m / 765万美元; +114.5%; nearly half | [2], mainstream same category, label-based health focus | Approximate share 48.726% supports “nearly half”; no false-precision share published. Rounded USD 3.57m → 7.65m computes 114.286%, not precisely 114.5%. A rounding-compatible interval is 113.846%–114.727%; retain the source’s rate as reported, not as exactly independently reproduced. |
| Immune positioning 6.1%; cordyceps −4.8% | [2] | Direct source values, different scopes retained: immune within mainstream other; cordyceps separately tracked in natural expanded. |
| 46.43%, 36.22%, 34.57% | [1] | Direct 2025 global supplement shares for form, channel, geography respectively; not additive. |
| 9.78%, 10.69%, 9.96% | [1] | Direct 2026–2031 powder/channel/region forecast CAGR; no independent segment endpoints available to reconstruct. |
| 82% at home | [4] | Past-day coffee drinkers; historical Fall 2025, not mushroom users or all U.S. adults. |
| Price 71%, healthfulness 57% | [3] | General U.S. food/beverage decisions, impact four or five on five-point scale; not mushroom purchase survey. |
| 3,000 adults, 18–80; March 13–27, 2025 | [3] | Survey method verified; recommended full-report citation January 2026, not survey fieldwork date. |
| RYZE ~48 mg; Odyssey 85/222 mg caffeine | [6][11] | Brand-declared amounts, not lab results; no universal low-caffeine claim. |
| Real Mushrooms >30% beta-glucans | [7] | Brand claim, not batch verification. |
| RYZE six, FreshCap six, Om ten mushrooms | [6][8][10] | Product/ingredient descriptions, not weights or individual species doses. B12 and KSM-66 are ingredient identifiers. |
| Nammex 12,000 kg → 30,000 kg; 2022–2023; +150% | [14] | Exact arithmetic; supplier project reported in 2024, not industry production growth. The 2024 expansion target is omitted. |
| Ingredient kg = servings × grams ÷ 1,000 | Analytical identity | Dimensional conversion correct; actual proportions/yields/inventory still needed. |
| 2019 and 2025 EU determinations | [18][19] | Dates in original documents; materials and process distinguished, not blanket authorization. |

Other dates, top-40/second-place category positions, six value-chain layers and seven-brand count were checked against original report text or the draft structure. All shared percentage/quantity tokens are regression-tested in both languages.

## Source dates and provenance

- [1] saved original publisher body: page updated 2026-09-11; estimation data/insights as of January 2026; archive retrieved/reviewed 2026-09-15. No public methodology microdata available; arithmetic agreement does not validate the model.
- [2] ABC HerbalGram issue 144, 2025; underlying 52 weeks ending 2024-12-31; 2023 bases revised by SPINS in May 2025. Both contributing research documents use this exact PDF. Unified [2] represents one underlying source, not independent confirmation.
- [3] IFIC fieldwork March 13–27, 2025, full report recommended citation January 2026. [4] NCA historical Fall 2025 summary released 2025-09-09.
- [5]–[13], [22] undated official/retailer page snapshots at 2026-09-15; observation date is not publication date. [14] historical report 2024-02-07; [15] historical 2024 report, exact day not confirmed in extracted body.
- [16] guidance adopted/effective 2017-01-03; page details 2026-04-28 in contributing evidence. [17] page details 2025-12-17. [18] document 2019-10-29. [19] document 2025-02-28. [20] FDA archived excerpt and [21] existing ingredient-science body reused from revision 2.
- Original quotation contexts are preserved verbatim, including PDF line breaks and incidental promotional claims. Those surrounding claims are NOT all endorsed or reused. Review each cited sentence against its specific context, not against every claim in the quote block.

## Source issues handled

- FreshCap’s current powder page mixes capsule copy and conflicting 12:1/14:1 extract-ratio sections. V3 excludes both ratios, raw equivalents, dosage arithmetic and unit prices. It retains the clearly named product, listed blend, standardization narrative and subscription structure. Reviewer should decide whether even the qualitative standardized-blend description needs a fresh label check before release.
- Om’s “1,000mg of 10 functional mushrooms + Ashwagandha” cannot safely be split into mushroom-only dose; omitted.
- RYZE page contains broad pregnancy and other health language not suitable for independent safety guidance; none is adopted.
- Some Four Sigmatic/Nammex original extracts have encoding damage. Archived evidence is unchanged; article uses stable names and unambiguous material facts, not corrupted quotations.
- Quote attachment first failed when a selected context cut into markdown link syntax. Fixed by selecting complete original lines; final quote attachment and literal archive matching passed. A second missing search phrase was caused by PDF line breaks and corrected against the actual text.
- NCA source labels itself historical. V3 says Fall 2025, not latest 2026 demand.

## Independent reviewer acceptance

Read both full articles and original archived evidence. Focus on claim strength in Chinese versus English, cognitive denominator, natural-expanded exclusions, the seven non-ranking examples, FreshCap ambiguity, material/process scope of EU status, and clarity of operational recommendations. The strategic arguments are analysis, not observed margin/retention results.

Run `python /data/hermes/research/market-depth-v3/drafts/verify-offline.py` for read-only checks. Existing `verification.json` reports success for hashes, literal quotes, URL identity, strict citation/evidence gates, numerical calculations and shared numeric facts. The citation tool’s sentence coverage is a crude English-oriented parser: its Chinese percentage is not a meaningful coverage assessment. This automated pass does not substitute for semantic source review.

No rendered layout, live internal-link checks, forms, current stock, chart accessibility, images or production behavior were tested in this drafting task. Existing localized product/encyclopedia destinations are preserved from the prior article, not newly validated. Before publication, review the integrated rendered article and clickable reference identities; replace legacy component data instead of appending a second layer of charts. Independent approval and release remain outstanding.

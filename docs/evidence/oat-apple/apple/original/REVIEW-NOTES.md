# Author verification and reviewer attention points

The package is complete for independent content review, not claimed independently approved or published.

## Verified
- Actual origin/main d387c94 read-only inventory and canonical grape-seed records were inspected. No site edits.
- Three genuinely different reader tasks compared before selection. Apple is selected; grape assay topic duplicates existing actual canonical prose; black-carrot light/acylation remains a future opportunity.
- Three primary full texts archived (one publisher PDF, two full JATS XML); two supplier pages archived as retrieved text, with full raw HTML for Herbafood.
- 14 exact source-excerpt checks pass. Units and selected numeric strings are present in both languages. 0.56 g/100g -> 5.6 mg/g arithmetic passes without changing the denominator/calibrant.
- English approximately 1,900 whitespace-delimited words including frontmatter and references; Chinese is a complete counterpart, not a summary.

## Material boundaries retained
- P1: Swedish wet pressed pomace and sequential lab fractions, not ApplePhenon or a Herbacel product. No transfer of antioxidant assay into shelf life.
- P2: leaf/bark/bud analytical extracts, not fruit food ingredients. Two Table 3 phloridzin means are used with mg/g dry-plant denominator, no purity claim.
- P3: Golden Delicious commercial juice pomace. Table 3 is chromatographic area, not mass. Table 2 total is fresh-pomace-based and epicatechin-equivalent. S1 solvent shorthand preserved rather than reconstructed.
- S1: 60% procyanidins (UV) is attributed to BGG. Neither an 80% retail polyphenol claim nor a phloridzin standard is substituted.
- S2: named grades, qualitative colour and hydration claims only. No chart measurement, universal dose or independent performance claim.

## Source defects not adopted
P2 abstract total-phenolic leaf range differs from Table 2; Table 1 recovery figures differ from prose; tables mix SD/RSD language. Draft uses only Table 3 phloridzin means and omits uncertainties/range generalization.
P3 Table 3 labels phloridzin a phenolic acid; chemical definition instead comes from P2. The paper says 12 compounds in its conclusion while Table 3 lists 13 entries; draft does not repeat a compound count. Main text and supporting-info description do not consistently identify the phloroglucinolysis material (peel versus pomace); no mean-DP claim is used.
P1 reports a 2 mg extraction charge; draft deliberately does not turn that unusual number into scale-up guidance. Its research-level food-gel findings are not used to reopen the existing citrus-pectin calcium article.

## Retrieval issues
Some web_search calls failed (403 or invalid backend shape); they remain recorded. Europe PMC search returned 503, but direct fullTextXML endpoints succeeded. BGG raw HTML and brochure returned 406; extracted product text supplied the quoted standard. ScienceDirect direct HTML was blocked and a repeat extractor call failed; the earlier successful complete extraction is preserved and an 8.27MB publisher PDF was subsequently downloaded from Aarhus University. pdftotext unavailable: PyMuPDF successfully extracted the original PDF. Failed bodies have explicitly failed/blocked filenames, not masquerading PDF files.

## Integration tasks for parent
1. Independently review exact draft hashes, especially Chinese chemistry terms and the P3 equivalent/area distinction.
2. Normalize citations to site-renderable anchors and frontmatter against current schema; add publication date only at integration. Citation map is source-manifest.json (1=S1,2=S2,3=P1,4=P2,5=P3).
3. Recheck destination canonical URL and related pectin link during build. Suggested EN path /resources/blog/apple-extract-polyphenols-phloridzin-fibre and corresponding /zh path.
4. Add discoverability entry points without asserting an existing apple inventory SKU. No proposed product page, certification, MOQ, availability or medical claims are included.
5. Run full site tests and browser checks only in the authorized publication worktree. Those checks were intentionally outside this no-site-edits research task.

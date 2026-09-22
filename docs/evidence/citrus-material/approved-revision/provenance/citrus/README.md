# Hesperidin material-choice research package

**Status: full EN/ZH drafts ready for independent evidence and language review. Research only; nothing published or integrated.**

## Read first
1. `hesperidin-material-choice.en.md`
2. `hesperidin-material-choice.zh.md`
3. `discovery-and-rejections.md` — three distinct ingredient/commercial candidates, rejected hypotheses, dedup and limitations
4. `claim-map.json` — 15 scoped claims with literal quotes and limitations
5. `ledger.json` — generated citation mapping [1]–[9], URLs and attached evidence
6. `retrieval-manifest.json`, `primary-metadata.json`, `sources/` — original bytes plus extracted text; failures explicitly identified
7. `verification.json`, `citation-verification.*.txt`, `SHA256.json`

## Main new finding
The useful comparison is not a protein-solubility diagnostic. It is a choice between unmodified hesperidin and a chemically different glucosylated food ingredient, with actual commercial-grade and market-access consequences. The official CITRAPEAK specification and separate cosmetic brochure resolve the earlier candidate's commercial-document gap. EU 2025/167 and its corrigendum establish a restricted supply route; the legal lead/arsenic limits differ from the EFSA assessment's earlier table. Matching assay percentages alone cannot establish material or sourcing equivalence.

## Evidence strength
Two complete citrus primary experiments (S1/S2), one complete alternative liquorice primary trial (A1), one complete EFSA assessment (R1), real manufacturer original HTML/PDF documents, original EU legislation/corrigendum and dated consolidated list are archived. Nine sources are cited in both drafts. All 15 claim quotes matched the archived text; both citation checks exited 0 and recorded source hashes match.

Do not count R1's unpublished applicant stability datasets as independently acquired primary experiments. No numerical plot, invented ZL specification, efficacy claim or finished-product test was created. All shortlist recommendations are editorial purchasing advice, not measured ZL results.

## Independent review priorities
- Review chemical identity and MGH versus equivalent-based total hesperidin wording.
- Review exact EU categories, age wording, labelling and protected supply route. R6 is dated 16 March 2026, not certified latest as of this research date; check later changes before publishing a current-law conclusion.
- Review the source-to-source metal-limit contrast (R1 Table4 versus R4 Annex Table2 and R6).
- Ensure natural EN/ZH parity and keep the article about material choice, not generic documentation advice.
- Keep D1 cosmetic PDF research-only; do not rehost its brochure or graph by default.

## Retrieval issues
Some keyless searches failed; SerpAPI recovered discovery. FDA originals were blocked/404 and are not used for any US regulatory claim. Citrus-fibre primary text remained unavailable (500/challenge/no-result); that candidate is held, not drafted from snippets. Valid primary XML parsing was recovered with stdlib ElementTree; initial XML HTTP status was not preserved and is recorded as null. PDF text used pypdf after pdftotext proved unavailable. Raw failed-response files are not evidence even when their suffix says XML/JSON or HTTP status is 200.

No browser or repository operations. No shared backlog or continuation edits. All written research files are within this candidate directory.

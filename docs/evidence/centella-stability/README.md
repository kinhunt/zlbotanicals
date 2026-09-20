# Centella cold-process stability integration

## Evidence and editorial identity

The 77 files listed in `manifest.json` are byte-identical copies of the independently reviewed research archive, not shortened evidence exports. This includes the complete retrieved primary XML, supplementary ZIP, nested original supplement ZIP/PDF, original figure JPGs, section/table extracts, 30 claim quotations, source ledger and original bilingual drafts. Source [1] remains the primary full-text XML; source [2] remains the supplement of that SAME study, not an independent corroborating study. Public article references use `centella-stability-ref-1/2` and offer the readable title and DOI as well as the original source endpoints.

`independent-review.md` records the factual/editorial PASS and its limits. `approved-corrected.en.md` and `.zh.md` adopt only its N1/N2/N3 edits; exact diffs are in `editorial-diff.*.patch`, and N2/N3 replacements are enumerated in `approved-edits.json`. N1 replaces Chinese 海藻酸钠 with 海藻酸（Algin）. No other reviewed argument, measurement, denominator or qualification is changed. Runtime HTML adds a TOC, semantic table captions/headers, scroll instructions, citation links and localized metadata. Strong markup is made explicit to prevent literal Markdown next to Chinese text.

## Exhibits

Exactly two native HTML tables: initial viscosity/pH (paper Table 2), and the measurement/development-role matrix. Row headers remain sticky on small screens, with keyboard-focusable horizontal regions; columns are sized so the final column is readable beside the persistent row identity. The 480-minute 9.66 mg / 18.80 mg comparison remains a clearly scoped prose calculation, not a new experiment or fictional curve. No new/generated chart or public research image is used. All original research images remain in this evidence archive. Existing site images, formulation artwork and unique encyclopedia content are unchanged.

## Routes and discovery

- `/resources/blog/centella-cold-process-stability`
- `/zh/resources/blog/centella-cold-process-stability`

Discovered through resource hub, application guides, blog archive, cosmetics application and an ingredient-specific technical-reading link on the Centella product page. The article links back to the localized Centella encyclopedia and product. No new duplicate purchasing page or broad efficacy promise.

## Acceptance

`tests/centella-stability.test.mjs` checks rendered routes, numerical landmarks, reference identity, both tables, eight row headers and discovery. RED first: missing routes, then missing reader/table/discovery behavior. `tests/centella-stability-evidence.test.mjs` verifies all 77 original artifact hashes and byte lengths, all 30 quotes against complete sections, reviewed prose/table-cell fidelity and the bounded editorial edits. Existing content-count tests retain their ten legacy buyer guides while separately allowing the three research articles.

`scripts/centella-stability-browser-smoke.mjs` tests both languages at 390/1440, JS on/off: canonical/hreflang, 820px left-aligned desktop reader, no page overflow, tables and keyboard scroll, persistent row identity/rightmost-column visibility, native citation/TOC destinations below the header, localized outbound links, five inbound discovery routes, and zero non-GET requests. Screenshot evidence and all run logs are outside the repository in the handoff directory. Early harness attempts are retained separately; a Chinese source-label length assumption and Playwright implicit smooth-scroll races were corrected without changing approved prose or disabling site CSS.

## Scope

Initial base afa8182f68f6b01f04888fa42481814f51d2c894; synchronized with PR38 main 1702a16091dc2ce7c333d8b36258958d7840fd8d before final npm test and browser gate. Stevia approved prose/assets are untouched. This is an integration candidate for independent technical/visual review, not a release or production-verification record.

# Bilingual application module update

Date: 2026-09-14. Base: `dbc9b29623a96b58b7d79ddce80858336214f20b` (PR28).

## Editorial rationale

This bounded update uses the completed applications SerpAPI v2 report, `applications/intent-decisions.json` and `applications/queryledger-cited.json` in the external research archive. No additional searches were made. Query IDs below refer to that ledger, not to scientific claim citations. Search snippets inform vocabulary and intent only; practical evaluation summaries connect to the site's existing ingredient formulations, not newly claimed experiments.

| Existing destination | Query IDs | Change and evidence boundary |
| --- | --- | --- |
| EN/ZH `/solutions/beverages` | EN03, EN05; ZH03, ZH05 | Replace the existing sensory troubleshooting paragraph with separate bitterness/astringency evaluation and a descriptive green-tea citrus-trial anchor. Give the existing stevia card its own bitter-aftertaste versus lingering-sweetness explanation. English has relevant professional results mixed with research and consumer content; Chinese has weaker industrial intent and is aligned editorially, not declared equally validated. |
| EN/ZH `/solutions/nutraceuticals` | EN08, EN09, ZH08, ZH09 | Expand the existing powder module with flow/fill-weight variation, hygroscopicity, bulk/tapped density and separate marker-uniformity assessment. Add descriptive links to existing reishi and ginseng capsule plans. Results skew toward equipment and solid-dosage research; the page remains ingredient selection and sample evaluation, not machinery sales or pharmaceutical manufacturing. |
| EN/ZH `/solutions/cosmetics` | ZH07; EN07 failed | Add one material-specific glabridin card using the existing licorice **form index 2: Glabridin-oriented fraction / 光甘草定型组分**, not DGL. Link to `#formulation-glabridin-emulsion`; preserve both sample and specification-undecided application context. Chinese supplier/formulation results justify a better existing entry point; English alignment is not a successful English SERP finding. |

All six pages now have buyer-focused titles and descriptions. Existing hero identities remain. The new glabridin paragraph summarizes the current licorice emulsion plan's dissolution/dispersion, dilution, microscopy, total/supernatant and color evaluation, without importing DIY ratios or benefit claims.

## Deliberately unchanged

- No new indexable routes, tags or ingredient profiles. Build remains 200 HTML pages.
- Cold-haze and general sediment queries EN01/EN02/ZH01/ZH02 failed. Existing haze content and tea task remain; failure is not an opportunity or absence-of-demand signal.
- EN04 low-caffeine results did not meet the semantic gate; ZH04 failed. No new low-caffeine page or specification claim.
- EN06 failed; ZH06 crystallization results largely concern material manufacture. Existing Centella tasks and deep content remain unchanged; no serum-crystallization SEO-gap promise.
- All 124 baseline public files remain byte-identical. Shared ingredient data, rich science content, original artwork, form behavior and PR28 context fields remain unchanged.
- No numeric performance, new certificate/specification, medical benefit, tested-formula or manufacturing claim was added.

## Author verification

External evidence directory: `/data/hermes/research/applications-seo-release/`.

- Baseline `npm test`: 168 passed, 0 failed (`baseline-test.log`).
- Regression-first cycles: `red-beverages.log`, `red-capsules.log`, `red-glabridin.log` fail on the absent intended module/card; beverage and capsule green logs retained. Final `npm test` builds 200 pages and passes 171 tests (`final-npm-test.log`).
- Existing audience suite: 32 EN/ZH desktop/mobile journeys, four no-JS forms, zero POSTs and page errors (`audience-browser.log`, `audience/results.json`).
- New `scripts/applications-seo-browser.mjs`: 32 sample/application journeys plus four tea-anchor checks at 390/1440 px, exact science and supply destinations, editable local FormData, zero non-GET/HEAD attempts and page errors (`targeted-browser.log`, `targeted/results.json`).
- Screenshots: `targeted/{en,zh}-{390,1440}-*.png`; overview `visual-review.jpg`. Native desktop EN and mobile ZH glabridin captures inspected: readable, contained cards. Minor inherited standalone CTA arrow wrap on desktop; no layout change in scope. First screenshot framing placed headings beneath sticky navigation; rerun positions card headings below the header and asserts that geometry.
- Byte preservation and final build manifest: `preservation.json`, `dist-sha256.json`.

`npm ci` reports 14 existing dependency advisories (1 low, 1 moderate, 11 high, 1 critical), plus install-script approval warnings. Dependencies were not changed; do not treat this content batch as dependency remediation.

No inquiry was submitted. No push, PR, merge, publish or deployment verification is included. Independent review and release belong to the parent reviewer. Author rebuilds stop at handoff.

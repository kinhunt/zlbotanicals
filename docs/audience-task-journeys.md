# Audience task journeys: first implementation batch

Baseline: `86e1a6ad6fe115017f6a7ee78fda7204ce98d679` (origin/main). No new content routes. No public asset bytes changed.

## Changes
- Four homepage tasks and five unchanged top-level navigation groups; Applications & Projects routes to the existing application hub and includes all four industries plus concept/transfer anchors.
- Eleven bilingual catalog descriptions reuse the first supply-offer sentence from existing approved sales data. Turmeric offer and all long-form procurement/science text remain intact. Existing botanical-extract category links now describe specifications and inquiries.
- Existing application pages add material/form/problem cards with exact encyclopedia plan anchors and editable sample/application context. Skincare and capsule explanations are task-specific.
- Existing-formula review has a substantive independent section, document-inventory/rights/gap/pilot responsibilities and neutral transfer CTAs through the final page action. Ingredient science no longer defaults to generic beverage ODM.
- Inquiry adds optional editable context, source/stage allowlists, document multi-selection, repeat/second-source/distribution tasks, and disabled inactive fields. All controls remain manually usable with JavaScript disabled. No form provider or recipient change.
- Contact/privacy remove stale never-verified delivery statements. Basis: owner explicitly confirmed one actual inquiry receipt; no guarantee of subsequent delivery. FormSubmit, font/hosting and email disclosures remain.

## Verification
Author executed npm ci and clean baseline npm test, then red/green tests before each behavior slice. Final npm test: 168 passed, 0 failed; 200 static pages. Existing source-specific tests were updated where old two-button navigation, contact never-verified claims and minimal DOM mocks conflicted with authorized behavior; security payload assertions retained.

Author browser execution on local preview: 32 bilingual desktop/mobile task journeys plus 4 no-JS form checks; upper and actual page-final transfer checks, payload-switching safety; 0 POST, 0 page errors. Existing 88 procurement cases / 176 form journeys passed; existing 44 science round trips / 44 keyboard checks passed. Desktop/mobile screenshots inspected; minor Chinese heading wrapping remains nonblocking.

Fresh independent read-only reviewer initially found inactive hidden controls still serializing, capsule copy using beverage explanation, and upper transfer using beverage defaults. Author added failing regressions and fixed all three. Fresh re-review: passed=true, no security concerns or logic errors; independently exercised bilingual transfer entry points and local FormData switching. Its report accurately records a first transient built-category test failure while the author completed that category slice, followed by a 12/12 pass. This is not an immutable-artifact review or production verification. Parent final gate remains required.

Full external logs/reviews/screenshots: `/data/hermes/research/audience-structure-qa/`.

## Deferred
Legal entity/brand mapping, per-material supply role, actual document register/status, current partner execution capacity, real project cases and turnaround/fee promises require internal facts. No such facts were invented. Additional catalog filters/printable summaries, quality/download reorganization, Research navigation cleanup and full application/plan ID modeling remain subsequent work. Lower generic application links still use industry codes in editable application text; the new task cards carry localized end-product descriptions. No merge or production release is authorized by this record.

# Goji commercial-materials module — author integration, 2026-09-24

Base: origin/main 448b91baf7b222f4b90122cce04d9a09a17f9c06 (PR67), fetched at start and again before freeze. No commit/push.

## Placement and editorial contract

IngredientKnowledge chooses IngredientRollout for goji-berry. The additive GojiCommercialMaterials component renders once inside its existing `components` section, after existing taxonomy and before the existing supply-forms link. Existing reader-pack/deep/overview data and the sales renderer are untouched. No new route, product offer, supplier recommendation or competitive sales insertion.

The corrected independent review EN/ZH modules are preserved byte-for-byte in review/. The original 37 discovery files (including their 36-entry hash ledger) are preserved in discovery/. That discovery REPORT contains the grade-mapping overstatement explicitly superseded by review/VERDICT.md; it is evidence history, not public copy.

Reader transformation: the three categorical table rows become three vertically stacked semantic sections, each retaining complete declaration and buyer-question text under named labels. Headings shift down one level to sit inside components; all C1/C4/C5/S1 markers become native links in a separate namespace, including card declarations. Direct source URLs remain unchanged. No chart or new table. English confirmation fields remain noun phrases under “Still to confirm”, as in the approved table; they are not truncated sentences. Chinese 本报告 becomes 独立 to remove research-diary wording.

## Normal-fetch commercial recheck

2026-09-24 curl, no BrowserMan/browser bypass, no supplier contact:
- C4 HTTP200: exact ingredient declaration still includes Goji berry juice powder, Maltodextrin.
- C5 HTTP200 (redirect to www/slash): aqueous/food-grade ethanol wording, extract ≥50% (UV), standard whole-fruit ≥30%, alternative ≥25%, and unmapped high-polysaccharide version all remain present. No certificate, batch measurement, availability or ratio is verified.
- C1 HTTP403: not live-qualified. The reader explicitly identifies this as the archived first-party listing reviewed 2026-09-23 and says the current page was unavailable. Card wording says archived listing. Full raw live Croda content/TDS is still unavailable; preserved C1 extraction has omissions. No substitute archive is passed off as a fresh source.

Raw response bodies/headers, UTC checks and C4/C5 readable extractions: live/. Live URLs and status are in live/results.json.

## QA and limitations

Actual TDD RED (2 missing-module failures), GREEN npm test 394/394. Author visual inspection caught the card declarations' plain citation markers despite lower-page native links passing. Added per-card regression: 2 genuine RED failures; fixed only citation markup, reran npm test 394/394. Both attempts retained in the external release evidence.

Final browser matrix: EN/ZH × 390/1440 × JS on/off, 8/8; 32 native keyboard citations, 8 sales→components and 8 components→sales native journeys. 56 final screenshots include all three cards (viewport and element) in every condition plus module views. No forms submitted, no non-GET requests, zero page errors. Source URLs are asserted directly; supplier external navigation is intentionally not repeated in this local layout suite.

All 141 baseline public files and all baseline tracked files except the two-line additive IngredientRollout change are byte-preserved. Removing the module from final ENZH reader DOM preserves the ordered original text blocks, IDs, links and image attributes. Sales main HTML stays exact. Full-site ordered parity is not claimed: inherited Astro collection ordering may vary between builds.

Frozen build: 260 HTML routes, no new URL. Dependencies are reused read-only via symlink to /data/hermes/workspaces/zlbotanicals/node_modules. This is actual local build/test execution, NOT a clean install or dependency/security remediation. No shared backlog/security changes. Independent final source/rendered/presentation review remains for the parent after HANDOFF; author visual QA is not independent acceptance. Production/deployment not attempted.

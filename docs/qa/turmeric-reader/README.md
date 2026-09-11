# Turmeric reader rewrite — review handoff

Date: 2026-09-11. Baseline: `4c69662ba8429edbcea75f2b440879db50bfeb8a`.

## Scope and editorial decisions

- Rewrote turmeric EN/ZH as an ingredient encyclopedia: processed-ingredient definition, components/forms, extraction, equipment roles, applications, purchasing specifications, troubleshooting and scoped literature cases.
- Removed repeated definition/application previews and the second contents list for turmeric. Replaced its paper-card/empty-news footer with a concise research-resource link, retaining legacy fragments.
- Removed internal-team instructions, “two production lines” implications and mandatory crystallization-before-dispersion language. Equipment is described by function, not as evidence of this supplier's facilities.
- Retained the analytical extraction material/method/unit limits. MCT case now distinguishes day-1 measurements, 1000-fold DLS dilution, 28-day size comparison and separate 3-day Turbiscan observation. The sodium-azide/non-food warning stays adjacent to case composition.
- Named the historical JECFA documents and retained method/material/year-specific regulatory limits; no new commercial assay, capacity, food recipe or health claim.

## Correction to the source review

The source review's assertion that the old visible bibliography numbered its entries 1–5 was incorrect. Baseline HTML used `li value` values **4, 7, 10, 11, 13**, and the prior run's browser screenshot (`baseline-references.png`) showed those actual visible numbers. Do not describe this release as fixing a proven citation mismatch. The rewrite preserves the original namespace and numbers, now with explicit visible `[n]` text and no competing list marker, so the correspondence is also clear in extracted text. JECFA title cleanup is a separate, valid correction.

## Verification

- Resumed the interrupted dirty branch without reset or re-import. The prior task log records failing reader regressions before implementation, followed by green runs.
- Fresh `npm test`: **90/90 pass**, **200 static pages** built. Full output retained locally at `/tmp/turmeric-resume-tests.log`.
- Fresh `turmeric-reader-browser-smoke.mjs` against built local preview on port 4330: **8/8 pass** (EN/ZH × 390/1440 × JS on/off). Checks actual paragraph uniqueness, one TOC, retained navigation, explicit bibliography labels/click destinations, original image decoding, five commercial-to-science journeys, canonical URLs, page overflow and JS errors. `results.json` and EN/ZH screenshots are from this resumed run.
- Preserved prior successful full-suite evidence: `deep-results.json` **192 cases** and `encyclopedia-results.json` **200 cases**. Prior task log records successful executions; these suites were not rerun during the bounded resumption.
- Visually rechecked fresh Chinese mobile references and English desktop definition/contents: readable, correct visible labels, no overlaps or horizontal clipping.
- Compared each data record to baseline: only `turmeric` differs in deep ingredients, overviews and science profiles; the other eleven records are identical in all three files. Shared component's non-turmeric branch retains its original body renderer.
- `git diff HEAD -- public media src/content` is empty: all original product artwork, audio/video and commercial Markdown unchanged. Turmeric WebP SHA-256 regression passes; full suite also checks all 24 localized original-image mappings.
- `git diff --check` passes. Added/modified source scan found no raw HTML injection, eval, innerHTML, shell execution or hardcoded-secret patterns. Rendering remains Astro escaped text plus existing bounded citation/bold parser; source URLs are HTTPS-validated at build time.

## Limits / next gate

This is a review-ready branch, not proof of production publication. Parent agent must independently review, check the exact PR SHA and CI, merge only after approval, and verify deployment/public content separately. No sales forms were submitted. No current-market legal review, supplier specification verification, clinical claim approval or new dependency audit was performed. The existing dependency advisory baseline remains in `docs/content-governance.md`.

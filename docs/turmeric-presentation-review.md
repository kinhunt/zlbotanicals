# Turmeric reading and social metadata review

Base: `877abf4` (PR #15). Scope: EN/ZH turmeric encyclopedia; optional social metadata props leave other routes unchanged.

## Changes
- Replaced repeated facility/recipe/market disclaimers with equipment functions, analytical distinctions and the scope of the 2003 international FAO/WHO JECFA colour specification. Kept US 21 CFR 111.70 scope, historical dates, sodium-azide non-food warning, analytical versus industrial yield distinctions, dilution and separate 3-day/28-day study observations.
- Centered title, introduction, contents, article and references on an 820px grid. Added a compact forms table, chapter hierarchy and quieter accessed-date metadata.
- Added an original semantic HTML process illustration: milling branches into ground turmeric or extraction, with conditional purification and separately identified dispersion formulation. No image-generation model used or claimed.
- Added descriptive localized HTML titles/descriptions and OG/Twitter image metadata using unchanged 1200×654 original turmeric WebP. Canonical/hreflang and plain-name H1 unchanged. No invented author/date or Article JSON-LD; OG type identifies editorial article.
- Suppressed generic hero/review-plan/sourcing boilerplate for turmeric only. Related technical and commercial links remain.

## Verification
- TDD: observed failures for defensive wording, missing diagram/forms table and missing social image; implemented and observed passing tests. Browser regression exposed clipped mobile scroll hints; constrained width and reran successfully.
- `npm ci` then `npm test`: 93/93 passing; 200 static pages. Existing dependency advisories remain outside this content release.
- Turmeric browser smoke: 12 cases, EN/ZH × 390/768/1440 × JS on/off. Real head deduplication, canonical/OG parity, image HTTP 200, single H1, native keyboard TOC, keyboard table scrolling, no page overflow/errors, retained source IDs and product-to-science journeys.
- Desktop title, identity, TOC and references all 820px wide, centered within 2px. Screenshots/JSON: `/tmp/turmeric-presentation-qa`.
- Visually inspected desktop EN intro, ZH process and mobile EN forms. Tables scroll inside focusable regions; hints fit viewport.
- Other 11 deep entries equal to base; all 12 original product WebPs byte-identical. No product entries or original media changed.
- `git diff --check` passed. No new runtime scripts, external calls, user inputs, credentials or unsafe HTML.

Independent parent review and merge/deployment verification remain release gates. Local QA is not production verification.

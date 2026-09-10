# Ingredient encyclopedia correction

Baseline: production `ca51f73` (PR #13). Branch: `feat/ingredient-encyclopedia`.

## Architecture

- Research navigation now says **Ingredients / 原料**. The existing `/plant-extracts/ingredients` index starts with twelve plain ingredient names, not a list of process/composition/research suffixes. Constituent-family concepts remain separately labeled further reading, preserving their original URLs.
- All twelve product IDs map to `/plant-extracts/ingredients/{productId}` with an equivalent `/zh` route: **24 canonical science pages**, including **18 new routes**. The previous three science routes and all **48 previous bilingual topic URLs** survive. See `ingredient-encyclopedia-mapping.json` for the exact ID mapping.
- Titles and H1s are plain ingredient names. Resveratrol stays **Resveratrol / 白藜芦醇** because it is a molecule with multiple production origins, not a fabricated botanical species called “resveratrol extract.” Reishi explicitly remains a fungus.
- Material identity comes before an eight-part table of contents: raw material, components, application fields, example end products, process choices, equipment, quality/regulation, research/evidence. Application discussion precedes end products and processing. Existing five dimensions, deep subheading IDs and original science aliases remain valid.
- All original deep-pack paragraphs, headings, lists, tables and source records remain **byte-identical in `deep-ingredients.json`**; only their canonical display location and section order change. A typed, source-linked `ingredient-overviews.json` adds readable species/part/material distinctions and target-product-driven process choices without new production specifications.
- All **24 commercial product pages** keep procurement, artwork and project context. Five concise summaries retain `#processes`, `#equipment`, `#applications`, `#standards`, `#insights` and link to the exact ingredient science section. They no longer embed the complete longform body.
- No public image, video, audio, caption or other media file changed. All twelve original product WebPs were byte-compared with `ca51f73` and match.

## Evidence scope

Overview citations resolve to the ingredient's existing research-pack namespace and sources. Application/end-product examples are explicitly proposed development categories, not branded products, approved formulas, customer cases, regulatory approvals or manufacturing claims. The historical scope ledger and the evidence limitations documented in `deep-ingredient-integration.md` remain applicable. No new literature retrieval or market-clearance determination is claimed.

## Verification

- RED: initial regression failed because only 3 profiles existed; identity/TOC and commercial-anchor test failed before implementation; section-order test failed before reordering.
- Full build: **200 static pages**.
- `npm test`: **87 passed, 0 failed**. Expanded previous three-only science tests to all twelve and replaced the obsolete 24-topic assertion with 33 topics (21 retained general topics + 12 science profiles). No old assertions about actual longform text, sources, imagery, audio, static links, language alternates or material hazards were removed.
- `npm ci`: completed; existing dependency tree reports 14 advisories (1 critical, 11 high, 1 moderate, 1 low). No dependency or lockfile changes. npm also reports existing pending install-script approval warnings.
- Browser QA results are recorded separately after execution. The new suite covers bilingual index/science/product journeys at mobile/desktop with JS on/off; existing deep-table and original-imagery suites remain in use.

## Review / publication boundary

The implementing subagent creates the passing PR. Parent must independently review the diff and evidence, then merge under the user's existing authorization and verify the exact production deployment SHA. Local browser results do not prove production deployment or bypass Vercel preview protection.

# Turmeric commercial advantages revision

Recorded: 2026-09-12 UTC (`date -u +%F` on implementation host).
Base: `2fe6663` (fetched origin/main, PR #24).
Scope: only the EN/ZH turmeric procurement `#why-choose-us` copy and regression checks. The previous `why-choose-us.md` records the historical workflow-card release, not the evidence basis for this revision.

## Owner authorization and claim boundaries

The task supplies the owner's latest confirmation: “价格品质认证交付都是优势，要一版有吸引力不对再说”. This authorizes high-level commercial positioning around price, quality, certification and delivery. It does not supply a price comparison, certificate file, inventory record, batch test result or performance audit. The date above records receipt/implementation of that confirmation, not an invented certificate or underlying business-event date.

The competitor research at `/data/hermes/research/turmeric-competitive-advantages.md` (2026-09-12) was read before editing. Its useful editorial finding is that a discussion workflow alone does not explain customer value. Competitor assertions and documents are not evidence of ZL capabilities; no competitor grade, certificate, price, inventory network or delivery promise was transferred.

Public claim mapping:
- Price: owner-confirmed competitive pricing, explained through comparable quote terms and budget planning; no lowest-price, numerical savings or manufacturer-direct claim.
- Quality: owner-confirmed focus on quality and batch consistency. This is a purchasing/quality commitment, not proof of tested multi-lot conformity or a specific batch-release panel.
- Certification: owner-confirmed certification advantage expressed as certification and qualification-document support for the selected material and market. No named certificate, holder, validity, product approval, worldwide eligibility or fake badge is asserted. Any future specific certification claim remains subject to the document requirements in `docs/content-governance.md`.
- Delivery: owner-confirmed reliable order/delivery coordination for production and replenishment planning. No stock, warehouse, fixed dispatch time, arrival guarantee or on-time percentage.

## Copy and scope

Exact public copy is in `src/content/products/{en,zh}/turmeric.md`, under `#why-choose-us`. Four cards replace the previous workflow cards. The lead identifies ZL Botanicals, turmeric extract and the four commercial benefits in visible HTML. EN is written for buyers rather than transliterated from Chinese. No hidden SEO content or search/AI visibility guarantee was added.

The existing localized CTA text, href and editable application brief are unchanged, as are the TOC link and section anchor. Category, encyclopedia, form implementation, original images, titles and metadata are unchanged. A source comparison against origin/main confirmed that both Markdown files are byte-identical outside this section.

## Verification

- RED: the rendered regression failed on the old four workflow headings before copy changes.
- GREEN: `npm test` built 200 HTML pages and passed all 146 tests, 0 failures. Log: `/tmp/turmeric-commercial-npm-test.log`.
- Retained the previous unsupported-claim guard and added specific certificate/number/warehouse/batch-test restrictions. The new numerical guard initially matched percent-encoded CTA parameters; it now checks visible prose rather than URL attributes. No factual restriction was removed.
- `scripts/turmeric-procurement-browser-smoke.mjs` passed all 8 EN/ZH × 390/1440 × JS-on/off journeys at local preview `http://127.0.0.1:4332`. Exact new heading checks, existing TOC/science journeys, original image decoding, overflow, keyboard CTA, JS prefill and no-JS fallback passed. FormSubmit requests blocked; no inquiries submitted.
- Results and screenshots: `/tmp/turmeric-commercial-qa/`. Inspected all four EN/ZH mobile/desktop section crops and actual Chinese mobile heading/CTA viewport screenshots. No text clipping. Apparent edge tightness in element crops was not a page defect: actual gutters measure 16 px each on mobile and 310 px each at 1440; the CTA has complete borders and surrounding space.
- `git diff --check` passed; added-line secret/execution scan had no matches.
- `npm ci` reported the existing 14 dependency advisories (1 low, 1 moderate, 11 high, 1 critical) and unapproved-install-script warnings. No dependency changes made.

Independent parent review and release are next. This record establishes local verification, not production publication or independently audited commercial performance.

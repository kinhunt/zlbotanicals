# Turmeric procurement: why choose section

Base: `83058e6e517a138062ef10bfcef1241455d6f2d9` (main), 2026-09-12.
Scope: EN/ZH `/products/turmeric` only. Category, encyclopedia, shared product identity, images and form implementation unchanged.

## Claim scope and existing support

This is a description of the existing discussion pathway and public tools, not evidence of manufacturing or sample fulfillment.

- Application-led discussion: `src/components/QuoteForm.astro` invites known specifications, application and market, including undecided details; its request types include application discussion. `OdmPage.astro` direct coordination scope explicitly includes brief development, extract selection and procurement-document discussion.
- Specification/sample comparison: existing turmeric procurement `#specifications` and `#samples` explain reporting basis, composition, batch references and acceptance criteria. `src/data/buyer-tools.json` contains bilingual sourcing and sample-evaluation tools. The card asks buyers to use these in the discussion; it does not say ZL operates a testing laboratory or provides validated samples.
- ODM connection: `OdmPage.astro` describes project-specific feasibility and potential partner workstreams. New copy says “we can discuss” / “可以…讨论” and narrows the example to beverage projects. It makes no execution or production-capacity claim.
- Bilingual resources and handoff: public EN/ZH technical guides, buyer tools and existing procurement `#equipment` explain recording trial/process requirements for production contacts. New copy asks the buyer to add documents, open decisions and approval owners, rather than claiming an executed handoff service or customer case.

Read before editing: `docs/content-governance.md`, the prior `turmeric-procurement-audience.md` and `turmeric-procurement-seo.md` research. No new scientific or supplier capability claim was introduced; existing citations retain their namespaces. No own factory, laboratory, certification, patents, inventory, MOQ, price, speed or worldwide customer claim was added.

## Editorial and implementation

Four cards follow delivery terms and precede `#quote`; `#why-choose-us` is in the procurement TOC. Exact published EN/ZH copy is in the corresponding turmeric Markdown section (single source, not duplicated here). Cards explain concrete inputs and team use rather than generic competitive superiority. The CTA opens the existing localized request form with product, `request=application`, and an editable application context covering selection, specification/sample comparison and ODM where relevant. With JavaScript disabled the link and manual form remain usable; existing client-side prefill is not claimed to work without JavaScript. No inquiry was submitted.

## Verification

- TDD: new rendered regression failed on absent section before implementation, then passed. Adjusted its HTML attribute/entity parser to Astro's actual serialization.
- Full `npm test`: 146 passed, 0 failed; 200 static pages built.
- Expanded procurement browser smoke: 8 EN/ZH × 390/1440 × JS-on/off journeys passed. Checks TOC, four cards, keyboard CTA navigation, actual editable prefill with JS, no-JS email fallback, old science links, original image decoding, SEO and overflow. FormSubmit requests blocked; no submissions.
- Screenshots: `/tmp/turmeric-why-qa/`; reviewed ZH mobile/no-JS and EN desktop/JS section crops, with no text clipping. Crop-edge tightness is the element screenshot, not the page gutter.
- Built baseline/head comparison: SEO title/meta/canonical/alternates/JSON-LD identical; all old IDs and anchor hrefs retained in both procurement pages. CSS asset hashes naturally change, so whole-head byte equality is not the criterion.
- `git diff --check` passed; added-line security scan found no suspicious secrets or execution patterns.
- `npm ci` reported 14 dependency advisories (1 low, 1 moderate, 11 high, 1 critical), plus pending install-script approval warnings. No dependency changes in this content patch.

Independent parent review is required before merge. Local QA is not production verification.

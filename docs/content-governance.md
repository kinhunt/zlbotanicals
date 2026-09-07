# Content and evidence policy

Updated: 2026-09-07

## Publish only what can be supported

- Company milestones, processing capacity, manufacturing site area, export destinations and customer relationships require dated internal records and owner approval of public disclosure.
- Manufacturing, partner supply and custom feasibility work must not be conflated. A product listing is not proof of in-house manufacturing, inventory or regulatory eligibility.
- Certifications require the legal entity, site, scope, certificate number, issuer, expiry date and approved document. An ISO certificate is not a product authorization. Never apply a select-product certificate to the entire catalogue.
- Product assay values, methods, carriers, solvents, contaminant limits, packaging, MOQ and lead time must match the current approved SKU specification or written quote. Buyer checklist items are requests, not actual test results.
- A COA must identify the sample/batch and actual results. Never generate a fictional COA or certificate for download.
- Application concepts are not validated formulas, clinical evidence, finished-goods manufacturing offers or customer case studies. Publish actual formulation performance only with method, composition, conditions and approval.
- Market claims need a link to the specific report and a stated region, period and definition. Check growth arithmetic and distinguish estimates from observed results.
- Ingredient research is not evidence that a particular commercial extract or finished product treats a disease. Claims require market-specific review and appropriate supporting evidence.
- Never invent customers, sales, research, dosing recommendations or production photos.

## Bilingual editorial checks

Keep EN/ZH pages aligned in claim strength, availability and version. Preserve existing URLs when correcting a page. Titles should describe the revised content, even where the historic URL references an old market article. Links must remain language-localized.

## Evidence needed from the business

1. Current business and manufacturing licenses and scope.
2. Current certification register and approved copies.
3. Priority products with own/partner/custom supply status and approved TDS.
4. Redacted genuine COA examples and permitted facility/test photographs.
5. Confirmed contact details and FormSubmit activation/inbox delivery evidence.
6. Permitted customer references and documented application testing.

Until supplied, the site should facilitate document requests rather than assert missing evidence exists.

## Release checks

Run `npm run build` then `node --test tests/*.test.mjs`. Run browser smoke tests against local preview and production with Chromium/Playwright. Check mobile and desktop, EN/ZH, links, downloads, URL prefill, invalid form inputs and JavaScript errors. Do not submit fake buyer records to the live sales form. Form submission, provider acceptance, redirect and inbox delivery are distinct checks.

Deploy a branch preview first, review changes independently, then merge. Verify GitHub deployment status AND fetch production pages to confirm the expected content. Record previous and new commit SHAs; revert the release commit through a new reviewed commit if rollback is necessary.

## Dependency audit baseline

The pre-change `npm ci` on 2026-09-07 reported 14 dependency advisories (11 high, 2 moderate, 1 low). This release does not silently perform a major Astro upgrade. The site is built as static HTML (no application SSR endpoint), which limits applicability of server-side advisories, but does not prove all advisories irrelevant. Track a separate tested dependency upgrade and avoid exposing the development server publicly.

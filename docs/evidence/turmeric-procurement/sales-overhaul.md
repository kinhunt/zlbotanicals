# Turmeric sales-page overhaul

Date: 2026-09-12. Base: `04c69b4`. Scope: the two existing turmeric product routes, their shared hero, and focused tests. No category or encyclopedia content rewrite; no image replacement.

## Claim provenance

The latest owner instruction, passed to this recovery task, confirms turmeric supply including 95% total curcuminoids by HPLC and relevant product/certification capabilities (GMP, ISO, Halal, Kosher). It also confirms competitive pricing, quality and delivery advantages. This supersedes the earlier research brief's assumption that 95% supply had not been confirmed.

This is **owner-confirmed commercial scope**, not independent laboratory verification. No original ZL batch COA, signed TDS, certificate copy, certificate number, assay basis, contaminant result or certificate validity was supplied to the implementer. No sample was analysed. No certificate was generated. No outside laboratory was represented as having tested ZL material.

| Public content | Basis and boundary |
| --- | --- |
| ZL supplies turmeric, including total curcuminoids 95% by HPLC | Latest owner confirmation. 95% is the standardized powder offer, not a measured result or a guarantee that all carrier/granule formats contain 95%. Final-blend assay is grade-specific. |
| Powder, granules, dispersible materials and category-format selection | Owner-confirmed product capabilities carried into the recovered draft. Oleoresin, ratio and carrier formats are selected by project, not asserted as stocked SKUs. |
| GMP/ISO documents, Halal/Kosher options | Owner confirmation at capability/category level. Specific legal holder, site, standard, issuing body, number, scope and dates remain in actual scoped documents. The page does not claim every certification applies to every material. |
| ISO 9001 / ISO 22000 / ISO/IEC 17025 | General distinctions between quality management, food safety management and laboratory competence. They are qualification categories, not a statement ZL holds all three. Original ISO fetches in the prior task hit bot protection; no certificate validation is claimed. |
| Organic | A market- and scheme-specific sourcing option, not blanket certification, stock or a published organic SKU. |
| Competitive price, quality consistency, delivery coordination | Owner-approved commercial positioning. No lowest-price, savings percentage, zero-variation, stock or guaranteed dispatch claim. |
| Technical and quality tables | Specification fields and agreed controls, not fabricated numerical limits or batch results. COA contains actual lot-specific results. |
| Application cards | Sales use cases with material/form selection and sample evaluation. Existing concept illustrations, not customer projects, verified production performance or clinical results. |
| MOQ, sample charges, packaging, lead time | Confirmed by quotation for the selected material, volume and destination. No competitor quantities, free sample policy or timing imported. |

## Reference use and exclusions

Reference: https://www.svbotanica.com/zh/herbal-extracts/turmeric-extract-curcumin-95 . The prior implementation transcript records successful browser retrieval and full-page text reading after extraction failed. The recovery also read `/data/hermes/research/turmeric-overhaul-reference-review.md` and the existing source. The reference informed the product-offer hero, format table, quality/documents, applications, buying terms and quote/sample paths. Text is original bilingual ZL copy.

Excluded: competitor batch 95.8%, COA IDs, certification numbers, Indian origin/FSSAI/APEDA, copied MOQ/pack sizes/lead times, independent-lab claims and clinical promises. Total curcuminoids are explicitly distinguished from single curcumin. HPLC alone does not establish every authenticity claim; water dispersion does not establish solubility, clarity or absorption.

The recovery removed the active-constituent cost calculation tutorial, converted application instructions to product-format offers, reduced certification boilerplate and shortened the final enquiry. The actual sales benefit is stated before technical reading.

## Preservation

- Commercial H1: `Turmeric Extract Procurement` / `姜黄提取物采购`; existing route, canonical, hreflang and social metadata preserved.
- Encyclopedia H1 and content unchanged; product-to-science forms/formulations/processes/standards and science-to-product selection/samples/quote journeys retained.
- Original `/images/products/turmeric.webp` is intact; four existing landscape concept images reused. No public image binary modified.
- Other product behavior retains the generic template; only turmeric receives the custom hero and wider sales layout.
- Existing enquiry endpoint, privacy/validation and mailto fallback retained. Browser tests abort FormSubmit requests and never submit forms.

## Recovery and test rationale

The interrupted browser run failed during an implicit long-distance Playwright click scroll. Recovery verified port 4334 was HTTP 200 and its HTML byte-identical to local dist. The first unchanged rerun reproduced the same unstable/outside-viewport signature at a different deep link (bottom quote), not just the Chinese formulation link. Fresh-page isolated probes passed (2 formulation clicks and 24 bottom-link attempts), showing it depends on navigation/scroll state rather than a consistently hidden link. The site has native `scroll-behavior: smooth`.

The smoke harness now waits for fonts, explicitly positions deep links with `scrollIntoView({behavior:'instant', block:'center'})`, asserts their real viewport bounds, then performs a normal actionability-checked Playwright click. No forced clicks, DOM click dispatch or skipped link assertions. Site CSS is unchanged. Destination prose checks were added. The above-fold CTA assertion now scrolls to the top and checks a nonnegative Y coordinate, fixing its old false-positive possibility after visiting deep sections. Form prefill waits for actual load.

This establishes a robust test path; it is not a claim that isolated tests reproduced the complete browser engine timing mechanism. The original failure logs are retained outside the repo at `/tmp/turmeric-overhaul-browser.log` and `/tmp/turmeric-retry-browser.log`.

Final execution evidence is recorded in `sales-overhaul-qa.md`. Independent review and any merge remain the parent agent's responsibility; this task does not authorize merge or claim production publication.

# Research, event records and ODM editorial workflow

Updated 2026-09-08. EN is unprefixed; ZH uses `/zh`. Shared JSON records and Astro components keep IDs, source links and claim boundaries aligned. More locales require a complete translation, routes and reciprocal alternate checks; do not publish fallback English as a translated page.

## Published foundation

- `src/data/research.json`: 12 selected papers, one scoped reading card per ingredient. Metadata and abstracts retrieved directly from Europe PMC core API on 2026-09-08; retained in `docs/research-source-snapshot.json`. These are selected literature reviews, **not** an exhaustive search, clinical evidence assessment, current-news feed or finished-product efficacy dossier. Original-language paper titles and author names are intentionally preserved.
- Each record includes stable PMID/DOI, bibliographic title/authors/year, evidence type, species/material, dose-context limitations, editorial date and scope. No review-level dosing recommendation is manufactured from heterogeneous underlying studies. Cards explicitly say that individual protocols and full text require assessment.
- `src/data/news.json`: one verified historical adoption event (EU 2022/2340, 2022-11-30), clearly historical, not presented as 2026 news or a current compliance determination. Official EUR-Lex source checked for event identity/date only. No verified recent industry news is published. No inferred market growth or placeholder news stories.
- `src/data/product-dossiers.json`: 12 product-specific process/application questions and technical/industry mappings. Questions are not assertions of our actual manufacturing process or released specification. Existing ingredient markdown identity/specification/procurement sections remain intact.
- `src/data/odm.json`: three illustrative briefs. Candidate ingredients are optional feasibility directions, not formulas, dose recommendations or verified food eligibility. Unsweetened tea excludes sweeteners and does not promise sugar-free status, weight loss or glucose control.

## Draft-only refresh CLI

No external APIs are called at build time or from visitors' browsers. The CLI imports a locally obtained Europe PMC `resultType=core` search response, or an array of editorial/news candidates:

```sh
node scripts/refresh-editorial.mjs --input /path/to/europepmc-core.json
node scripts/refresh-editorial.mjs --input /path/to/news-candidates.json --output editorial-drafts/news.json
```

Default output: `editorial-drafts/inbox.json` (not bundled into the site). Every imported record is forced to `status: draft`, `reviewRequired: true`, and cleared review fields even if the input asserts approval. DOI case and DOI-URL variants normalize; PMID, DOI and news source URL are stable dedupe keys. Existing published records and the draft inbox are deduplicated. Re-running the same input is idempotent. Unknown switches including `--publish` fail. Output into this repo's `src`, `public` or `dist`, including a symlinked parent into those trees, is rejected. Writes are atomic. Run one refresh writer at a time.

Example acquisition, performed by an operator rather than the site:

`https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22steviol%20glycosides%22%20AND%20PUB_TYPE:review&format=json&resultType=core&pageSize=20`

Search results are **candidates**, not approved source material. Check that the PMID, DOI, title, publication date and actual abstract/body agree. `firstPublicationDate` and journal publication year may differ. Never infer a new event from a page's update timestamp. PubMed/Europe PMC indexing is not endorsement.

News input records require `kind: news`, an HTTPS `sourceUrl`, title, actual event date, territory and a summary supported by an official source. Prefer legislation/agency notices over secondary reporting for regulatory changes. Historical and current events must be distinguished explicitly.

## Mandatory review gate before publication

The importer has **no publish command**. Publication requires an explicit source-data edit on a review branch, passing tests/build and an independently reviewed PR. Renderers exclude anything except `status: reviewed`.

1. Read the source; save relevant retrieved evidence and stable identifiers. Check retraction/correction status for the intended use, source date, species, part, extraction method and route of administration.
2. Classify review, human, animal, in-vitro or analytical evidence accurately. For a primary study record exact material, subject species/population, dose, duration, comparator and limitations only when verified. Never substitute an animal dose for a serving recommendation.
3. Fill aligned EN/ZH context and limitations, reviewer/date/scope. Bibliographic/abstract review **does not approve medical or regulatory claims**. Seek a qualified market-specific reviewer before any such claim; absent approval, omit the claim and retain explicit boundaries.
4. Check industry relevance and product mappings. Do not connect topical centella wound-care findings to beverages, grape packaging-film findings to drink preservation, or licorice species without disclosing the mismatch.
5. For regulatory events, distinguish adoption, publication, entry into force, transitional dates and current consolidated status. This initial event card approves only event identity/date, not legal conclusions.
6. Run `npm test`, `node scripts/odm-browser-smoke.mjs URL` with Playwright configured, inspect diff and source evidence, then independent PR review. Parent/release owner merges only after CI/deployment checks.

Scheduling is intentionally not configured here. A later monitoring job can fetch time-sensitive sources into a local input file, invoke this draft-only importer and notify an editor. It must never auto-promote draft claims or replace evergreen pages merely to look fresh. Report source/network failures instead of synthesizing news. Static deployment changes only after reviewed data is rebuilt and released.

## ODM capabilities and imagery

Direct coordination, possible partner workstreams and project-confirmation requirements are separate visible sections. No owned lab, filler, certification, clinical testing, validated formula, capacity, MOQ, dose, shelf-life or delivery guarantee is claimed. Agree the executor, study plan, acceptance criteria, formula/artwork rights and manufacturing/release responsibilities in writing.

`public/images/odm/packaging-concepts.webp` is a 1536×1024 AI-generated concept illustration, optimized from the parent-provided PNG to 93,866 bytes. Visible concept wording includes AFTER HOURS, DAILY BOTANICAL TEA, BOTANICAL REFRESH and “ODM PACKAGING CONCEPTS — NOT COMMERCIAL PRODUCTS”. It is neither product photography nor evidence of actual production. Names are provisional design copy, not trademark clearance. Bilingual alt text and captions make these limitations visible. Source asset: `/data/hermes/cache/images/claw_max_gpt-image-2-high_20260908_061217_75e8e253.png` (external working artifact, not a deploy dependency).

ODM CTAs prefill the existing FormSubmit quote form with editable bounded plain-text product, concept and application context. No extra provider is introduced. QA constructs local FormData and checks validity but never submits to sales. FormSubmit activation and inbox delivery remain unverified.

# Astro 7 isolated migration contract

Base 327c9c33bdec586c671bdca8965576e3dead640b (PR51). Preview-only authorization; no merge without independent gate.

Astro7.3.3 / Sharp0.35.4 / Tailwind4.3.3 / Lucide1.47.0; locally tested Node24.18.0. Provider Node24 and actual native-module clean build remain separately unverified; package/root lock engines 24.x and .nvmrc=24 constrain selection but do not prove provider execution; package engines overrides Vercel Project Settings.

## Ordering authority

Collection enumeration is unspecified. The previous local frozen ordering is superseded by 10 genuine HTTP200 production captures dated 2026-09-21 19:23–19:25 UTC. Their byte hashes/receipts and strict DOM comparison are retained in the isolated research handoff. No owner approval of arbitrary local enumeration is needed.

- Both homepages: centella-asiatica, ginkgo-biloba, ginseng, goji-berry, grape-seed, green-tea.
- EN catalog: same first six, then licorice-root, monk-fruit, reishi-mushroom, resveratrol, stevia, turmeric.
- ZH catalog: same first nine, then stevia, resveratrol, turmeric. Preserve this observed locale distinction.
- Home same-date article priority begins tea-haze-diagnosis, stevia-temporal-sensory. Remaining same-day IDs use lexical ID tie-break after those two; these unexposed tie positions are deterministic fallback policy, NOT additional live observations. Homepage remains date-descending; PR51 hibiscus now precedes saffron, elderberry and paprika. GuideList retains existing date/ID rules.
- Both nutraceutical concept lists: deep-sleep-capsule, liver-support-gummy, reishi-sleep-gummy. Beverage concept order is unchanged and observed live.
- Global catalog/recommendation/filter ordering follows these explicit arrays; new IDs append lexically. Homepage remains six explicit IDs and fails closed if missing. Unobserved routes inherit this deterministic rule, not a claim of full-site production capture.
- Solution directories retain explicit ID-descending sort (not publish date).

## Verification contract

The untouched fresh Astro5 clone is first built/tested and its raw ordering differences retained. An Astro5 reference build applies ONLY these explicit ordering rules (no dependency/render migration). The ten historical captures establish the original ordering contract, not current PR51 content: elderberry, saffron and hibiscus legitimately add cards and rotate homepage articles. Retain the historical full-DOM mismatch report; verify unchanged product/concept/filter ordering separately. Derive the 222-route href fixture only from this current-main Astro5 reference, never the candidate. The Astro7 candidate must match that independent-engine reference across all 222 routes, metadata, ordered full text/blocks/links/IDs/images, forms and JSON-LD; only compiler style-scope attributes are excluded. This does not bless arbitrary local ordering.

`tests/fixtures/production-dom.json` is extracted from captured production HTML, not from candidate output. The separate research `production-check.py` exercises full DOM content; `astro7-order.test.mjs` rejects route additions/deletions and href-order differences. Future content merges require a new reference, fixture review and all gates rerun.

Original public/Markdown content and downloads remain byte-preserved. Adjacent caption expressions explicitly preserve Astro5 visible text; Rust compiler negative control and valid bare boolean attributes retain original behavior tests. No source CSS change is used to hide QA failures.

Run npm ci, npm test, npm audit --json. Additional strict DOM/browser evidence is in the isolated research handoff. Independent second-person approval and provider runtime execution are still required; non-production PR permitted; no merge or production change without independent approval.

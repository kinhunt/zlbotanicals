# Original ecommerce observation — beetroot

## Decision
Worth progressing to independent editorial review and publication: YES. Publishable intent is product-concept/material selection from original ecommerce observations, not ingredient testing checklist, health efficacy or market-sizing. Drafts are standalone EN/ZH and this task publishes nothing.

## Dedup and selection
Fetched origin; source baseline 115d93addb8e1149b2a5ac147a10b182c024c888 (PR63 baseline). Read-only git inventory of src blog/products/data found no dedicated beetroot article. Existing mentions are pomegranate sensory descriptors, beet pectin in an astaxanthin example, beet adulterants in saffron, and betaine in goji discussions. site-inventory.json records matching lines and full EN blog filenames. Did not modify website working files. Did not verify anonymous public deployment; dedup is against current origin/main.

Initial hypothesis was whole-root versus juice versus formulated powder. Actual label evidence does NOT support classifying Micro Ingredients definitively as juice powder. Revised article compares kitchen versatility, bulk mixing and flavoured routine, while retaining material ambiguity. This is the central evidence-led change, not a preassigned three-category result.

## Collection
BrowserMan official catalog → Amazon actions/schema → online ping, then serial official search/get_product. Search beetroot powder, US, limit12, one page. Three purposeful examples chosen from positions1,3,5 for distinct intended uses; not random or representative. Search contained repeated brand sizes and a capsule; no sales, share, market growth, review or rank inference.

Three exact-ASIN scoped DOM reads followed, verifying input#ASIN, URL, product title. Initial colorImages gallery only downloaded. All25 images inspected in numbered contact sheets; four label images additionally inspected at full resolution. Three contact sheets are derived navigation assets, not primary evidence. Image URLs, dimensions and SHA256 in image-manifest.json. Images are archived for internal verification; reproduction rights were not obtained. Publish the textual analysis with direct product links, not necessarily the seller images.

No browser concurrency, account changes, purchases, domain/WAF changes or social actions. Browser identifiers/extension credentials stripped. DOM archive retains parsed initial gallery only, not surrounding page instrumentation. Official product raw duplicates and UI-JS contamination preserved where non-sensitive; derived article deduplicates bullets and does not use nonsensical taxonomy fields.

## Sample findings and traceability

### B0BGMGN7H4 — Kate Naturals
Source: https://www.amazon.com/dp/B0BGMGN7H4
- Official title8oz; page uses smoothie/baking/juice positioning.
- Image07: “made by dehydrating and finely grinding whole beets”; Ingredients Organic Beet Root Powder; 1Tsp(4g),56servings,227g.
- Official bullet “Our beet juice powder” conflicts with the more specific label process. No definite juice-powder classification.
- Images01 front227g;02FAQ;03workout;04smoothie;05nitrate marketing;06food colouring;07back-label.
- Article treats uses as seller presentation, not proof of recipe/process performance or nitrate amount.

### B01N20ON39 — Micro Ingredients
Source: https://www.amazon.com/dp/B01N20ON39
- Official details Special Ingredients and DOM important-information Ingredients: Organic Beet Root Juice Concentrated Powder.
- Image07 ingredient: Organic Beet Root Powder. Serving1scoop(3.5g approx.),518servings. Visible FNSKU-style X003S0T35N, not a numeric UPC; do not equate it to ASIN.
- Image01 old front4lb;02old/new packs says New Look Same Trusted Quality, new4lb1814g;03powder/highly concentrated marketing;04use/518servings;05drink;06sourcing;07back;08charity.
- Image07 does not visibly show net weight. Same-ASIN initial gallery and front size support gallery association; not purchased-pack identity verification.
- Image07 potassium shows11.7mg and2%; retain literally, not a verified nutrient analysis. Not used in article. Solubility, beet equivalence, organic/testing claims remain attributed and unvalidated.

### B01ENMEXO4 — humanN
Source: https://www.amazon.com/dp/B01ENMEXO4
- Images08,09: two beetroot powders (one fermented), natural black cherry flavour, malic acid, magnesium ascorbate, rebaudioside A (from Stevia rebaudiana leaf). DOM says stevia leaf extract more broadly.
- Images08,09:1teaspoon5g,30servings. Image09UPC813188020360 matches official details. Image01 front150g/5.3oz; detail Item Weight7.04oz is not used as net weight.
- Page4–6oz mixing vs image09 visible4–8oz. Page45days vs separate disclaimer30days; back45days. This is listing-text inconsistency, not proven physical failure.
- Images08,09 print40calories while macros0gfat/4gcarb/1gprotein; do not silently correct to20 or rank nutrition. Omitted from public article because it is not needed for its product-development argument.
- Images01front;02health marketing;03endorsement;04institutional partnership;05ingredient claim;06brand-family graphic includes OTHER products (not powder evidence);07spoon/directions;08label artwork;09back-container;10seal.
- No clinical claim validated or carried into article as efficacy evidence; no inference fermented is superior or nitrate standardized.

## Editorial quality controls
- Direct canonical links for every sample, plus exact original query.
- Retail evidence is substantive body material; not decorative citations around a generic purchasing checklist.
- Opportunities explicitly editorial hypotheses, not unmet-demand/market-size assertions.
- No invented raw-material grades, supplier stock, certifications, MOQ, prices or service promises.
- No serving/weight/price efficacy ranking; archived snapshot prices are not used for value-per-serving comparison.
- EN/ZH explain the same findings, naturally rather than as a rigid line-by-line translation.
- Only seller-evidence conclusions included; no extra scientific mechanism claims requiring unrelated paper references.

## Remaining review
Independent factual + native editorial review of exact article revision hashes; integration/frontmatter/technical tests not performed because this subtask has no website-write authority. If adding a definite juice-powder classification, concentration ratio, nitrate dose, physical solubility result or health claim later, obtain additional evidence first.

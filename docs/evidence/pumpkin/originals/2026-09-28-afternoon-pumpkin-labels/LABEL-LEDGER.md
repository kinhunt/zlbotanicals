# Pumpkin exact-ASIN initial-gallery label ledger

Research-only seller-display evidence, collected 2026-09-28 09:04 UTC. Supplements—not replaces—the original eight-search-row/three-ASIN observations in `../2026-09-28-midday-commerce/OBSERVATIONS.md`. No purchase, physical sample, COA, independent certification verification, protein-quality assessment, ranking, or publication.

## Binding and method

One serial BrowserMan owner. CLI 0.4.2; catalog → Amazon actions → get_product schema → online ping archived. Official get_product has no gallery action; reviewed local read-only script uses standard ctx.navigate/ctx.evaluate. Each script validates URL, input#ASIN, title and initial gallery together before returning. Quoted-string-aware balanced-bracket extraction + JSON.parse, not a lazy array regex. No other color/size group, A+ content, video or review image collected. Scoped DOM excerpts and raw initial array are archived; these are not complete HTML archives. Scripts restore the previous tab on cleanup; no post-cleanup page state was used as product evidence. No offline, busy, challenge or context interference was encountered. No social writes, repository or backlog edits.

| ASIN | Verified live URL | Title | Capture UTC | Images | Local execution |
|---|---|---|---|---|---|
| B01N7CLYX7 | https://www.amazon.com/dp/B01N7CLYX7?th=1 | Sprout Living Organic Pumpkin Seed Protein Powder, Unflavored, 20 Grams of Plant Based Protein Powder Without Artificial Sweeteners, Non Dairy, Non-GMO, Vegan, Gluten Free (1 Pound, 14 Servings) | 09:04:11.349 | 8 | local_5aa1bd95e10e497e8d0d |
| B0CWVTCT7G | https://www.amazon.com/dp/B0CWVTCT7G?th=1 | Anthony's Organic Pumpkin Seed Protein Powder, 1lb, Gluten Free, Non GMO, Unflavored, Plant-Based Protein | 09:04:28.691 | 5 | See ASIN receipt |
| B0FWJGBPWM | https://www.amazon.com/dp/B0FWJGBPWM | Micro Ingredients Organic Pumpkin Seed Protein Powder, 2lb \| Raw Plant-Based Protein \| Single-Ingredient Powder \| Smooth Texture & Versatile Use \| Non-GMO, Soy Free | 09:04:36.151 | 5 | See ASIN receipt |

Each verified input#ASIN equalled its requested ASIN. All 18 original JPEG responses downloaded successfully from the actual initial[i].hiRes URLs, without rewriting URL sizes; dimensions, bytes, SHA-256, URL, exact raw-field index and receipt hash are in `image-provenance.json`. All 18 were visually inspected in numbered contact sheets. Main fronts and nutrition/ingredient targets received individual original-image inspection as specified below. No image is wholly unexamined; small text in contact-only views remains explicitly untranscribed. Contact sheets are derived aids, not original images.

## Nutrition ledger — literal printed values

These are three distinct seller-label serving bases. Do not rank 20g/5g/18g as equivalent portions, reverse-engineer specification purity, or turn rounded retail declarations into batch composition.

| Printed field | Sprout: 06-PT05 | Anthony: 02-PT01 and 03-PT02 | Micro: 02-PT01 |
|---|---|---|---|
| Servings/container | About 14 | 56 | 30 |
| Serving size | 2 scoops (32.5 g) | 1 Tbsp (8g) | 2 scoops (30g approx.) |
| Calories | 150 | 30 | 120 |
| Total Fat | 5 g; 6% | 1g; 1% | 3g; 4% |
| Saturated Fat | 1 g; 5% | 0g; 0% | 1g; 5% |
| Trans Fat | 0 g | 0g | 0g |
| Cholesterol | 0 mg; 0% | 0mg; 0% | 0mg; 0% |
| Sodium | 0 mg; 0% | 45mg; 2% | 0mg; 0% |
| Total Carbohydrate | 5 g; 2% | less than 1g; 0% | 4g; 1% |
| Dietary Fiber | 3 g; 11% | 0g; 0% | 4g; 14% |
| Total Sugars | 0 g | 0g | 0g |
| Includes Added Sugars | 0 g; 0% | 0g; 0% | 0g; 0% |
| Protein | 20 g; 28% | 5g; no % printed | 18g; 18% |
| Vitamin D | 0mcg; 0% | 0mcg; 0% | 0mcg; 0% |
| Calcium | 20mg; 2% | 8mg; 0% | 40mg; 3% |
| Iron | 4mg; 22% | 1.4mg; 8% | 8mg; 44% |
| Potassium | 330mg; 7% | 110mg; 2% | 450mg; 10% |
| Magnesium | 250mg; 60% | not printed in inspected panel | not printed in inspected panel |
| Zinc | 2.5mg; 23% | not printed in inspected panel | not printed in inspected panel |

Percentages in this table are printed Daily Values, **not ingredient percentages**. Preserve Sprout protein 20g/28% and Micro protein 18g/18% literally; do not correct them to a presumed percentage or infer a reason for the differing relationship. Absence of a nutrient line is not absence of that nutrient. All three include the conventional 2,000-calorie general-nutrition footnote. No calories or macronutrients have been recalculated.

## B01N7CLYX7 — Sprout Living

- Front: `Simple Protein / Pumpkin Seed`, `Unflavored`, `NET WT 1 lb (454 g)`, `20g Vegan Protein / Pure & Clean`, `One Ingredient / Farm-Sourced`; `3g Fiber · 2g Net Carb`; `Made without gums, “flavoring” or fillers`. Front lower line includes `Single-Source Protein Powder`.
- Ingredient artwork: `Ingredients: Organic Pressed Pumpkin Seed Powder` with `ONE SIMPLE INGREDIENT` and `NO ADDITIVES OR FILLERS`.
- Original wrapper structured `Protein Source: Blend` conflicts with the gallery's one-ingredient/single-source description and single listed ingredient. Record as within-listing wording conflict, not verified blended physical composition. Original cold-pressed bullet remains seller wording; gallery ingredient says **Pressed**, not independently proven process conditions.
- About14 servings on nutrition artwork agrees in general wording with title14; no need to infer counts from pack weight.
- Certifications, third-party testing, net-carb and mixing claims remain seller claims. This gallery has label artwork, not an actual photographed rear pouch. No UPC or ASIN sticker was observed to independently strengthen the rear-label size binding.

| Image | Inspection | Visible content and boundary |
|---|---|---|
| 01-MAIN | Contact + individual original | Front pouch, 1lb454g, product and claims above. |
| 02-PT01 | Contact | `New Look. Same Taste & Quality.` old Pumpkin Protein/new Simple Protein packaging. Fine print/older size untranscribed; not proof of separate sizes. |
| 03-PT02 | Contact | Lifestyle kitchen/blender: `Clean protein that you can trust for your daily routine`, `3rd-Party Tested`, `Farm-Sourced`. No testing documentation; small pouch print untranscribed. |
| 04-PT03 | Contact | Pouch/drink: `Slightly sweet & nutty, mixes smooth & light`; no gums/fillers/sweeteners. No dispersibility test. Small pouch print untranscribed. |
| 05-PT04 | Contact | Recipe bites: `Perfect as a boost for your favorite recipe`, baking/snacks/breakfast. No recipe quantities/nutrition. Small pouch print untranscribed. |
| 06-PT05 | Contact + individual original | Nutrition artwork transcribed above; Pure & Clean/organic/vegan/Whole30 marks, not independent certification. |
| 07-PT06 | Contact | 20g ultra-clean vegan protein, 2g net carbs, keto/paleo, mixing/taste claims and non-GMO/gluten/soy/dairy-free/kosher/Whole30 wording. |
| 08-PT07 | Contact + individual original | Exact ingredient artwork transcribed above. |

## B0CWVTCT7G — Anthony's

- Front: `PUMPKIN SEED PROTEIN POWDER`; `ORGANIC | COLD-PRESSED`; `Net wt. 1 lb. (454g)`.
- Actual back pouch and separate nutrition artwork independently show **56 servings**, **1 Tbsp (8g)**, **5g protein**, `Ingredient: Organic Toasted Pumpkin Seeds`.
- Original wrapper details say **Total Servings Per Container: 30**. This conflicts with the gallery's **56**, on both back pouch and closeup. Do not silently replace or reconcile; do not infer package variant or reformulation.
- Back processing paragraph: `Our Organic Pumpkin Seed Protein Powder is made by carefully selecting organic pumpkin seeds, which are toasted to perfection and pressed to extract their natural oils, leaving behind a pressed pulp. This remaining pulp is then finely milled into our gourd-geous green Pumpkin Protein Powder!`
- Thus front **cold-pressed** coexists with **toasted** ingredient and explicit toast → press → mill copy. These need not logically exclude one another; they do prevent calling the listing a verified unheated/raw powder. No pressing temperature, residual oil, milling distribution or industrial specification supplied by this evidence.
- Back says `Storage: Refrigeration not required. Store in a cool, dry place.`; `Batch Tested and Verified Gluten Free`; `Packed in California`; `Certified Organic by CCOF`; `Product of Austria`. Origin and packing location are distinct.
- Barcode sticker shows an alphanumeric code (small ambiguous characters, not reliably transcribed here), product name and `New`; **not a numeric UPC or visible ASIN**. Original wrapper UPC850034042312 was not visually matched. Page/gallery binding is strong at listing level, not physical sample proof.

| Image | Inspection | Visible content and boundary |
|---|---|---|
| 01-MAIN | Contact + individual original | 1lb454g front, organic/cold-pressed text; claims only. |
| 02-PT01 | Contact + individual original | Actual rear pouch; nutrition, ingredient, processing, storage, origin copy above. Alphanumeric sticker not UPC. |
| 03-PT02 | Contact + individual original | Nutrition/ingredient artwork matching rear pouch's transcribed values. |
| 04-PT03 | Contact | Overhead unbranded bowl of powder; no measurable particle size, serving weight or independent product identity. |
| 05-PT04 | Contact | Angled unbranded bowl of powder; same limitation. |

## B0FWJGBPWM — Micro Ingredients

- Front: `Organic Pumpkin Seed Protein`, `Unflavored`, `+ 18 g PROTEIN / per serving`, `2 LB (907 g) / POWDER / NET WT.`
- Rear pouch: `Ingredients: Organic Pumpkin Seed Protein Powder.`; `Free of: Soy, Dairy, Gluten & Tree nuts.`
- Nutrition gives 2scoops30g approx.; suggested use separately says `Mix 2 rounded scoops into smoothies, desserts, juice, oatmeal, or yogurt. (Scoop included)`. Retain **rounded** and **approx.**; no precise universal scoop conversion.
- Rear storage: `Reseal bag after opening. Keep in a cool, dry place.`; `Natural color variation may occur in this product.`
- Rear `CALIFORNIA WARNING: Risk of cancer and reproductive harm from exposure to lead. See www.P65Warnings.ca.gov/food.` Below: `Required by California law; this warning does not mean the product is unsafe.` Both are label wording, **not measured lead content or an independent safety determination**.
- `Certified Organic by Organic Certifiers`; manufactured-in-cGMP-facility/GMO-free/third-party-lab-tested badges are unverified seller claims. “Easily absorbed” and other wellness prose are not human absorption evidence.
- Rear sticker `X004VNFJ1D`, `Micro Ingredients Pumpkin Seed Protein Powder`, `New`, `SKU: BA-MI-PSP0907`; alphanumeric identifier is **not UPC or ASIN**. Original wrapper UPC850077801334 was not visually matched.
- Marketing panel says **raw & organic**, single-ingredient plant protein, amino acids/fiber, free-from and purity/consistency testing. No manufacturing or assay evidence verifies “raw”, fineness, absence of allergens or test results.

| Image | Inspection | Visible content and boundary |
|---|---|---|
| 01-MAIN | Contact + individual original | Front 2lb907g and18g per serving. |
| 02-PT01 | Contact + individual original | Actual rear pouch, nutrition/ingredients/directions/warning above. |
| 03-PT02 | Contact | 18g single-ingredient protein per serving; smooth/unflavored; amino acids/fiber; raw & organic; free-from; non-GMO/third-party claims. No lab report. |
| 04-PT04 | Contact | Vitamin Angels charitable-partnership marketing with child photograph, no nutrition evidence and no separate retail product. |
| 05-PT05 | Contact | Smoothie use: `a spoonful of nature’s gift`, `mix with smoothie`. Pouch and drink props; small netweight untranscribed, no recipe or dispersion measurements. |

## Findings and limits

The followup adds serving denominators and actual seller ingredient/process text. It does not establish three validated industrial grades. Anthony's now supplies explicit toast/press/mill language; Sprout supports single-ingredient pressed-pumpkin wording against a conflicting Blend attribute; Micro provides a 30g-approx. serving and raw marketing without process evidence. Preserve Anthony30-versus56 servings and printed protein%DV values. No normalization/ranking, price-per-protein calculation, amino-acid quality inference, fraud claim, or independent safety/certification conclusion is justified.

All18 images are inspected at least at contact-sheet level; only designated originals were read for fine detail. Contact-only package microtext, QR contents and ambiguous Anthony sticker characters remain **unexamined/untranscribed**. No unrelated retail product identified; unbranded powder/lifestyle/charity images are not composition evidence. Later reviews should cite the precise image filename and hash from the provenance ledger, not a contact-sheet approximation.

# Turmeric application-first evidence review

Retrieved 2026-09-11. Base: PR16 / 3ec9103.

## Clinical scope

The Wang 2020 single-centre double-blind trial enrolled 70 people with symptomatic knee osteoarthritis and ultrasound-defined effusion-synovitis. Two extract capsules daily were compared with placebo for 12 weeks. VAS pain improved, but MRI effusion-synovitis volume and cartilage composition did not.[1]

The Feng 2022 review included 15 randomized trials and 1,670 participants. The review's tables describe different formulations and follow-up from 4 weeks to 6 months; its evidence includes the Wang trial and is not independent confirmation. Low original study quality and substantial heterogeneity limit inference. In pooled placebo comparisons, VAS and total WOMAC met the authors' clinically important differences; WOMAC pain, function and stiffness subscales did not.[2]

The institutional abstract supplies the Wang endpoints, numerical results and funding. The review full text, table 2, supplies the Turmacin Plus material identification (500 mg rhizome extract per capsule containing curcuminoids and turmerosaccharides). The page does not present this as a current ZL specification or a dosing recommendation. Neither source supports a cure claim, cartilage repair, efficacy of a generic latte, or health superiority inferred solely from bioavailability.

The Springer extractor returned an incomplete body. The successful Europe PMC fullTextXML retrieval was parsed into `review-fulltext.txt`. `trial-abstract.txt` is the retrieved institutional HTML text. `ledger.json` preserves registered URLs and literal verified quotes. On-page clinical IDs use `research-turmeric-clinical-source-{1,2}`, separate from historical processing sources `research-b-turmeric-source-{4,7,10,11,13}`. Clinical source numbers come from this ledger, not renumbering of the original pack.

## Illustration provenance

Both are actual gpt-image-2-high results, not image2.5. Originals remain outside the repository and unchanged.

- Existing material illustration: `/data/hermes/cache/images/claw_max_gpt-image-2-high_20260911_023459_4debd83d.png`, actual 2172×724. Visually inspected via a downsized JPEG after the full-image vision call failed with a connection error. Derivative: `public/images/ingredients/turmeric-material-forms-concept.webp`, 134594 bytes, Pillow WebP quality 84/method 6. Caption identifies rhizomes / ground turmeric / oleoresin / pigment as concepts, not batches; visual clarity is not an oleoresin specification or purity evidence.
- New application illustration: `/data/hermes/cache/images/claw_max_gpt-image-2-high_20260911_024036_9ece3a9b.png`, generated with available `image_generate`, reported model `gpt-image-2-high`. Actual file dimensions 1672×941 (tool metadata size 1536×1024 was not used). Derivative: `public/images/ingredients/turmeric-applications-concept.webp`, 126770 bytes, same optimization. Visually inspected: no labels/logos; concept drinks, capsules/tablets, sachet and foods. Caption explains clear liquid is a development target, not a demonstrated formula.
- The original twelve `public/images/products/*.webp` files are byte-identical to PR16; no generated image replaces their references.
- Process figure remains deterministic semantic HTML with optional branches; no generated text diagram or factory-capability claim.

## QA record

- RED: changed reader-order regression failed on the PR16 build with `AssertionError: reader order` before implementation.
- No shared data or validator changes. Deep12 and overview JSON remain byte-identical. Existing curated turmeric component alone changes published content; generic tests now expect its merged sections instead of requiring duplicate prose.
- Final full npm test: 200 static pages, 95/95 tests passed, 0 failures; `/tmp/turmeric-full-test-final.log`. `git diff --check` passed. Shared data and twelve original WebPs have explicit byte-identity tests against PR16.
- Browser: `scripts/turmeric-reader-browser-smoke.mjs http://127.0.0.1:4325`, `PLAYWRIGHT_MODULE=/tmp/zl-browser/node_modules/playwright/index.mjs`, `QA_OUTPUT=/tmp/turmeric-application-first-qa`: passed 12 cases (EN/ZH ×390/768/1440 ×JS on/off). Verifies centered desktop title/body/TOC/references, tables and keyboard scrolling, both new image decodes/captions, clinical disclosures, both citation namespaces, canonical/OG, no overflow or page errors, original artwork, and 60 commercial-to-science anchor journeys. An initial caption-length check used English length for Chinese; made locale-aware and reran all 12 successfully.
- No live inquiries submitted. No schedules created. Parent independent review and merge/deployment verification remain release gates.

## Sources

[1] https://research.monash.edu/en/publications/effectiveness-of-curcuma-longa-extract-for-the-treatment-of-sympt — Wang et al. 2020 randomized trial, institutional abstract
    > "RESULTS: CL improved VAS pain compared with placebo by -9.1 mm (95% CI, -17.8 to -0.4 mm [P = 0.039]) but did not change effusion-synovitis volume (3.2 mL [CI, -0.3 to 6.8 mL]). CL also improved WOMAC knee pain (-47.2 mm [CI, -81.2 to -13.2 mm]; P = 0.006) but not lateral femoral cartilage T2 relaxation time (-0.4 ms [CI, -1.1 to 0.3 ms]). The incidence of adverse events was similar in the CL (n = 14 [39%]) and placebo (n = 18 [53%]) groups (P = 0.16); 2 events in the CL group and 5 in the placebo group may have been treatment related."
[2] https://www.ebi.ac.uk/europepmc/webservices/rest/PMC9580113/fullTextXML — Feng et al. 2022 systematic review, full text
    > "Fifteen studies with 1670 patients were included."
    > "The principal finding of our study was that CURs were associated with better effectiveness than placebo and not inferior to NSAIDs in terms of pain reduction and functional promotion for knee OA. The pooled analyses found that CURs were more effective than placebo in the improvement of VAS for pain, WOMAC total score, WOMAC pain score, WOMAC function score and WOMAC stiffness score, while there was no significant difference found between CURs and NSAIDs. We used the MCID as a threshold in this meta-analysis to assess the clinical significance of the difference between CURs and the control groups, instead of rely solely on the statistical significance. The MCID can be calculated by anchor-based and distribution-based methods, we applied the anchor-based method to set the threshold at 20% based on previous research [27, 33–36]. The significance test of clinical benefits found that only VAS for pain and WOMAC total score achieved clinical significance by exceeding their MCID, while WOMAC pain score, WOMAC function score and WOMAC stiffness score did not. We also found that CURs did not induce an increase of AEs compared with placebo and NSAIDs. The total incidences of AEs in CURs and control groups were 25.06% and 35.57%. Diarrhea and/or constipation and stomach pain (5.8% and 8.17%) were the most frequent mild AEs in CURs and control groups respectively (Table 4)."

# Amazon v4 evidence remediation — 2026-09-15

All 30 sources reviewed against the article and chart/product scope; see `claim-support-review.json`.
`approved-sources.json` and `approved-source-manifest.json` are byte-identical copies of the approved revision-2 ledgers. `sources.json` preserves ALL approved quotes without slicing, and maps each to an original or supplementary archive. All 41 referenced text archives are copied byte-for-byte with original path and SHA256. These are complete **archived captures**, not assertions that every live webpage was fully captured. Some original captures/approved quotes already end abruptly or have encoding artifacts; they are not silently repaired. Complete substantive claim passages (not incomplete tails) support the article. Source 2's full captured report also retains period/channel/category context missing from the old short excerpts.

Quote verification uses complete substring matching after whitespace normalization ONLY; no punctuation or word substitution. Supplementary Amazon public-HTTP bullets use different whitespace from the original quote ledger. Original and supplementary captures remain explicitly distinguished. FreshCap coffee's supplementary 1,000mg sentence is not part of the original 18-detail dose statistics. Claims are observed listing wording, not composition/lab/clinical verification. Search sources 3–7 support search topics, not sales shares or organic rankings. Sources 26–30 are outside the 18 Amazon details.

Source 14's original `Item Highlight` contains the 29% claim; its locator is available in the full source-14 archive even though the original short quote selection omitted it. Sources 26–28 now retain their complete approved quote and complete archived capture, including substantive coffee/capsule descriptions. No approved article numbers or sample records were changed.

Run `node --test tests/market-v4-evidence.test.mjs` from repository root.

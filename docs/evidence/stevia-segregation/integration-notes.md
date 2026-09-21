# Integration handoff — not a new page

- Insert `en.md` into the existing English stevia encyclopedia's tabletop-sachet section (`#formulation-tabletop-sachet`). Insert `zh.md` into its actual Chinese counterpart after checking the existing anchor and route. The Chinese route was not verified here.
- Preserve existing recipes, equipment text, images and sensory guidance. No new article frontmatter, slug or page is supplied.
- Package both blank CSVs with language-matched reader guidance. Relative links in the modules refer to files in this bundle; map them to the site's actual download routes when integrating. Reader guides may become adjacent help text or download files; remove the developer-only “Checking the files / 文件检查” subsection from public copy if the scripts are not distributed.
- Merge source IDs by URL with the host page's citation system; local [1]/[2] are NOT host-page reference numbers. Public module sources are Thermo (injection repeats) and HORIBA (measurement conditions); retain citations at the supported sentences.
- `research.md` and `sampling-plan.md` are revised research copies. Their references to research support files not duplicated here resolve in the parent research directory; they are not standalone public downloads. Only modules, CSVs and reader guides are proposed public assets.
- `revision-ledger.md` explains R1/R2 and verification. `quote-ledger.json` and `citation-ledger.json` preserve the original source numbering. Raw PDFs remain untouched in `../sources/`; `fresh-*.txt` are fresh local re-extractions, not network retrievals.
- Run `python3 validate.py` and `python3 -m unittest -v test_validate.py` here. PyMuPDF was used for re-extraction; the delivered validators need only Python's standard library and the retained parent archive.
- Next gate: independent review. No website changes, build, deployment or independent review were performed in this task.

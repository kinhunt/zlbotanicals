from pathlib import Path
import xml.etree.ElementTree as ET,json,hashlib,subprocess
R=Path(__file__).parent
S='/data/hermes/skills/research/grounded-citations/scripts/sources.py'
def run(*args):
 p=subprocess.run(['python',S,'--ledger',str(R/'ledger.json'),*args],capture_output=True,text=True)
 p.check_returncode();return p.stdout+p.stderr
# Select exact complete paragraphs or table text using unique literal anchors.
selections={
1:('PMC8871348',[
 ('methods/material','Fresh ginger (Zingiber officinale Rosc.) was harvested'),
 ('methods/infusion','In addition to the dried form'),
 ('methods/hydrothermal','Hydrothermal enzyme-assisted extraction (HWE) was studied'),
 ('methods/pressure','High-pressure extraction (HP) and high-pressure enzyme-assisted'),
 ('methods/e-nose','The volatile compounds in gingers extracted'),
 ('methods/GC-MS','GC–MS/MS was performed on a 7890'),
 ('results/extraction','The extraction yields of the ginger and sugar'),
 ('results/markers','The components that impart'),
 ('results/volatile','Ginger samples from different extraction methods were analyzed')]),
2:('PMC8427268',[
 ('methods/sample','Three samples of Queensland-grown'),
 ('methods/quantitation basis','Polar compounds, such as gingerols'),
 ('methods/semiquantitative','In addition to the pungent gingerols'),
 ('results/Table1','The total phenolic content and total antioxidant capacity of the dried'),
 ('results/GC-MS total','Forty-two of the major peaks')]),
3:('PMC12195494',[
 ('methods/ginger','Fresh ginger rhizomes used in this study'),
 ('methods/formulation','Five formulations were prepared'),
 ('methods/solids','Fresh ginger juice, containing 4.92%'),
 ('Table1','Table 1Spray-drying formulations and conditions.'),
 ('results/starch','Modified starch (Clear Gum CO03) was selected'),
 ('results/pea','Pea protein (moisture content 4.4%)'),
 ('results/inulin conflict','In contrast, the SD_Inulin formulation'),
 ('results/no carrier','Moisture content was not determined'),
 ('results/conflicting ginger proportions','The ginger content in the final powders'),
 ('methods/Level2','Following data acquisition, Chromeleon.cmbx'),
 ('results/relative signals','Key ginger bioactives were tentatively')]),
4:('PMC6099745',[
 ('methods/slice drying','Fresh ginger rhizomes were collected'),
 ('results/gingerol-shogaol','The contents of gingerols and shogaols in different'),
 ('results/time','In order to evaluation of impact'),
 ('results/oil','Content of Essential oil was influenced'),
 ('methods/hydrodistillation','Essential oil content of dried ginger with different'),
 ('methods/replicates','Data was analyzed using SAS')])}
claims=[]
for sid,(pmc,items) in selections.items():
 tree=ET.parse(R/'raw'/f'{pmc}.xml')
 for loc,anchor in items:
  candidates=[(el,''.join(el.itertext())) for el in tree.iter() if el.tag in ['p','table-wrap'] and ''.join(el.itertext()).startswith(anchor)]
  assert candidates,(pmc,anchor)
  el,q=candidates[0]
  assert q in (R/f'{pmc}.txt').read_text()
  run('quote',str(sid),'--text',q,'--from',str(R/f'{pmc}.txt'))
  claims.append(dict(source_id=sid,pmcid=pmc,locator=loc,xml_tag=el.tag,xml_id=el.get('id'),exact_quote=q,quote_sha256=hashlib.sha256(q.encode()).hexdigest(),raw_sha256=hashlib.sha256((R/'raw'/f'{pmc}.xml').read_bytes()).hexdigest()))
(R/'exact-quotes.json').write_text(json.dumps(claims,ensure_ascii=False,indent=2))
logs=[]
for lang in ['en','zh']:
 f=R/f'draft.{lang}.md'
 logs.append(run('render','--replace-in',str(f)))
 logs.append(run('verify',str(f),'--strict','--evidence'))
manifest=json.loads((R/'retrieval-manifest.json').read_text())
for m in manifest:assert hashlib.sha256((R/m['file']).read_bytes()).hexdigest()==m['sha256']
checks={'raw_hashes_verified':len(manifest),'exact_quotes_verified':len(claims),'source_count':4,'drafts':{lang:hashlib.sha256((R/f'draft.{lang}.md').read_bytes()).hexdigest() for lang in ['en','zh']},'citation_verifier_output':logs}
(R/'verification.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2))
print(json.dumps(checks,ensure_ascii=False,indent=2))

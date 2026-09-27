import pathlib, json, subprocess, hashlib, xml.etree.ElementTree as ET
P=pathlib.Path(__file__).resolve().parent
S='/data/hermes/skills/research/grounded-citations/scripts/sources.py'
base=['python',S,'--ledger',str(P/'ledger.json')]
claims=[
('identity',1,'manufacturer','The seeds are rich in neutral polysaccharide called xyloglucan.','Seed origin and xyloglucan; do not equate fruit flavour with seed gum.'),
('applications',1,'manufacturer','GLYLOID® for Food & Beverage Food Applications TAMAVISCO® for Personal Care Personal Care Applications','Separate food/personal-care ranges; not a legal approval conclusion.'),
('manufacturer-rheology',1,'manufacturer','Stable viscosity with Newtonian fluid','Manufacturer general statement; no matched conditions against study.'),
('grades',2,'distributor','GLYLOID®2A Hot water soluble Suitable for applications requiring heat processing. Heat to a minimum of 80°C for at least 15 minutes. GLYLOID®3S Cold water soluble Cold water-soluble grade for applications without a heating process. Glyate® Cold water soluble Low-viscosity grade.','Named supplier grade descriptions, not own stock or equivalence.'),
('study-preparation',3,'tamarind-study','All the samples were prepared by stirring for 1 h at 80 °C and then resting for 12 h before analyses.','Hydrated laboratory samples, not cold-process demonstration.'),
('flow',3,'tamarind-study','The apparent viscosity of TSP solutions showed a Newtonian plateau at low shear rates, and became shear thinning at high shear rates and more concentrated concentrations.','Condition-dependent flow; not all grades.'),
('temperature',3,'tamarind-study','The apparent viscosity of TSP at a shear rate of 2 s−1 decreased from 3.01 to 0.13 Pa.s as the temperature increased from 5 to 85 °C.','2% w/v context from same paragraph; heat resilience not constant hot viscosity.'),
('recovery',3,'tamarind-study','Furthermore, during the heating-cooling process, the two apparent viscosity curves coincided well, indicating the good thermal resilience of TSP.','Author interpretation, not shelf-life validation.'),
('sweep',3,'tamarind-study','For the thermostability study, temperature sweeps were performed by heating from 5 to 85 °C, and subsequent cooling from 85 to 5 °C at 5 °C/min and at a constant shear rate (2 s−1, 60 s−1, 200 s−1).','Do not extrapolate to retort/UHT/long holding.'),
('ph-grid',3,'tamarind-study','The samples at 2.0% (w/v) were also studied using different pH buffer solution (pH 1, 4, 7, 10, and 13).','Discrete test points, not continuous validation.'),
('ph-result',3,'tamarind-study','The results showed that the apparent viscosity of TSP was almost unchanged at pH 1–10, but decreased significantly at pH 13.','Reported laboratory result.'),
('ph-conflict',3,'tamarind-study','This is in contrast to Alpizar-Reyes’s [27] research, in which the apparent viscosity of TSP decreased with the decreasing pH.','Prior study reported via this paper only; not independently re-read.'),
('salt-sugar',3,'tamarind-study','The effects of salt ions (0.5 M NaCl, 1.0 M NaCl, 1.0 M KCl, 1.0 M CaCl2) and sucrose (10%, 20%, 30% w/v) on the rheological parameters of TSP were conducted at a concentration of 2.0% (w/v) TSP.','Not recommended formula concentrations.'),
('result-summary',3,'tamarind-study','The apparent viscosity of the TSP solution decreased with increasing temperature and ion concentration, but increased with sucrose concentration.','No guarantee in complete foods.'),
('research-limit',3,'tamarind-study','further studies will focus on the interaction of TSP with food components.','Food-component interactions remain open.'),
('carob-candidate',4,'carob','It comes from milling the endosperm of the carob seed.','Candidate ingredient identity from manufacturer.'),
('fenugreek-candidate',5,'fenugreek','Common market grades include Standard Food Grade (the principal format for functional beverages and dietary fiber applications), High-Purity Grade for nutraceutical use, and Defatted Powder for low-flavor applications.','Seller proposition; no verification of certifications/efficacy.'),
('emulsification-marketing',6,'brochure','Glyloid acts as a natural emulsiﬁer and can help stabilize sauces and dressings without the need for ingredients such as PGA.','Supplier promotion, no replacement ratio or matched trial.'),
]
records=[]
for key,number,name,quote,limit in claims:
    text=(P/'sources'/f'{name}.txt').read_text()
    norm=lambda x:' '.join(x.split())
    assert norm(quote) in norm(text),key
    proc=subprocess.run(base+['quote',str(number),'--text',quote,'--from',str(P/'sources'/f'{name}.txt')],capture_output=True,text=True)
    if proc.returncode: raise RuntimeError(proc.stdout+proc.stderr)
    records.append({'claim_id':key,'source_id':number,'evidence_file':f'sources/{name}.txt','quote':quote,'claim_boundary':limit})
(P/'claim-source-ledger.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
# Original JATS table cell extraction retained separately, never infer cells from flattened text.
root=ET.parse(P/'sources/tamarind-study.xml').getroot()
tables=[]
for tw in root.iter('table-wrap'):
    tables.append({'id':tw.get('id'),'rows':[[''.join(c.itertext()) for c in row if c.tag in ('th','td')] for row in tw.iter('tr')]})
(P/'sources/study-tables.json').write_text(json.dumps(tables,ensure_ascii=False,indent=2))
results=[]
for name in ['tamarind-grade-selection.en.md','tamarind-grade-selection.zh.md','DISCOVERY.md']:
    if not (P/name).exists(): continue
    render=subprocess.run(base+['render','--replace-in',str(P/name)],capture_output=True,text=True)
    assert render.returncode==0,render.stderr
    verify=subprocess.run(base+['verify',str(P/name),'--evidence'],capture_output=True,text=True)
    results.append({'file':name,'exit_code':verify.returncode,'output':verify.stdout+verify.stderr})
    assert verify.returncode==0,verify.stdout+verify.stderr
files={str(f.relative_to(P)):hashlib.sha256(f.read_bytes()).hexdigest() for f in P.rglob('*') if f.is_file() and f.name not in ['verification.json']}
(P/'verification.json').write_text(json.dumps({'claim_quotes_verified':len(records),'citation_checks':results,'hashes':files,'scope':'Mechanical evidence/citation integrity, not independent factual/editorial approval'},ensure_ascii=False,indent=2))
print(json.dumps({'quotes':len(records),'draft_checks':results},ensure_ascii=False,indent=2))

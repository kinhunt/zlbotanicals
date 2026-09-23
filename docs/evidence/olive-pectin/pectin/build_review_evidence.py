from pathlib import Path
import json,re,hashlib,subprocess,difflib
b=Path(__file__).parent
S=Path('/data/hermes/skills/research/grounded-citations/scripts/sources.py')
ledger=json.loads((b/'ledger.json').read_text())
# Keep source IDs stable. New PDF is an alternate full-text witness to source 13.
pdf=json.loads((b/'pdf-success.json').read_text())
(b/'alternate-source-map.json').write_text(json.dumps({'source_id':13,'identity':'Liu et al., DOI 10.1002/fsn3.1933, publisher PDF with university cover sheet','retrieval':pdf,'pdf':'milk-study.pdf','printed_pages':'6433–6444','methods_pdf_pages':[3,4],'note':'XML remains canonical citation. PDF recovered through OpenAlex-listed University of Copenhagen repository; metadata version label not used as proof of document version.'},indent=2))
results={}
for lang in ['en','zh']:
 p=b/f'reviewed.{lang}.md'
 for args in [['render','--replace-in',str(p)],['verify',str(p),'--evidence']]:
  r=subprocess.run(['python',str(S),'--ledger',str(b/'ledger.json')]+args,text=True,capture_output=True)
  (b/f'{args[0]}.{lang}.txt').write_text(r.stdout+r.stderr)
  assert r.returncode==0,(args,r.stdout,r.stderr)
  results[f'{args[0]}.{lang}']=r.returncode
 text=p.read_text().split('## Sources')[0]
 records=[]
 for i,line in enumerate(text.splitlines(),1):
  if not line.strip():continue
  # A review unit is a paragraph/table row. Preserve entire reviewed prose for traceability.
  refs=re.findall(r'\[(\d+)\]',line)
  nums=re.findall(r'\d+(?:\.\d+)?',re.sub(r'https?://[^)\s]+|\[\d+\]','',line))
  typ='heading' if line.startswith('#') else 'supplier-table' if line.startswith('|') else 'sourced-prose' if refs else 'editorial-guidance'
  records.append({'line':i,'text':line,'type':typ,'sources':refs or ([11] if typ=='supplier-table' else []),'numeric_tokens':nums,'editorial_review':'read and accepted in final bilingual revision','evidence':'numeric-review.json and original/claim-evidence.json; paragraph context applies to citations at paragraph end' if refs or typ=='supplier-table' else 'editorial synthesis/recommendation; not presented as empirical result'})
 (b/f'paragraph-review.{lang}.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
 (b/f'changes.{lang}.diff').write_text(''.join(difflib.unified_diff((b/f'original/draft.{lang}.md').read_text().splitlines(True),p.read_text().splitlines(True),fromfile='original',tofile='reviewed')))
# Exact displayed numeric rows checked against independently rendered original PDF pages.
rows=[
 ('Classic CF 407',21,['60–66%','>58%','2.9–3.3']),
 ('Classic CF 701',22,['39–45%','40–60%','3.0–3.6']),
 ('Classic CF 703',22,['32–38%','≤45%','3.0–3.6']),
 ('Amid CF 010-D',23,['30–36%','14–20%','30–55%','3.0–3.5']),
 ('Amid CF 020-C',23,['27–32%','18–23%','15–45%','3.0–4.0']),
 ('Classic CM 203',29,['>68%','3.6–4.2']),
 ('Classic CJ 206',30,['68–76%','2.7–4.5'])]
audit=[{'claim':name,'source':11,'pdf':'original/sources/hf-official-brochure.pdf','page':pg,'image':f'visual/hf-official-brochure-p{pg}.png','values':vals,'result':'visually verified'} for name,pg,vals in rows]
audit += [
 {'claim':'HM >50%; LM <50%; chemistry and calcium optimum','source':11,'page':8,'image':'visual/hf-definition-p8.png','result':'visually verified'},
 {'claim':'GENU LM-104 AS E440 sucrose-standardised; high calcium reactivity; soluble solids20–40%','source':4,'evidence':'original/sources/azelis-browser-excerpt.txt','result':'verified against archived scoped DOM; no original public PDF supplied or claimed'},
 {'claim':'DM30 vs DM32/DA19; 6g;900g;30wt%;at least triplicate; R=2[Ca2+]/[COO-]','source':6,'page':7,'image':'visual/study2017-p7.png','result':'visually verified; standard recipe is LM; total-solids figure attributed as authors reported, not recalculated'},
 {'claim':'100°C→10°C;1K/min','source':6,'page':8,'image':'visual/study2017-p8.png','result':'visually verified'},
 {'claim':'Table2 calcium series','source':6,'page':11,'image':'visual/study2017-p11.png','rows':[[0.73,64.3,60.3,64.4,0.079,10.5],[0.90,68.2,64.9,68.7,0.085,10.4],[1.09,75.4,68.1,74.8,0.089,10.1],[1.28,79.6,70.2,78.8,0.098,10.4],[1.45,81.8,69.4,None,0.101,9.7]],'columns':['R','IST°C','CST°C','GP°C','tanδend','SDRa Pa/min'],'significance':['','***','***','*','***',''],'result':'CST not monotonic; SDRa no rising trend and significance cell empty; tanδ increases. Narrative SDRa rise and next-page more-solid-like statement conflict. Both disclosed, no silent repair.'},
 {'claim':'microgels are inferred, not observed','source':6,'page':12,'image':'visual/study2017-p12.png','result':'visually verified'},
 {'claim':'pH directions and proposed mechanism','source':6,'page':14,'image':'visual/study2017-p14.png','result':'visually verified'},
 {'claim':'Two-material comparison; galacturonan contents differ','source':6,'page':15,'image':'visual/study2017-p15.png','values':{'LMP':{'DM':30,'GC':82,'DA':None,'R':0.70},'LMAP':{'DM':32,'GC':68,'DA':19,'R':0.73}},'result':'visually verified; not isolated causal amidation experiment; Table4 LMAP IST65.8 conflicts with Table2 same R IST64.3. No exact IST used in article.'},
 {'claim':'HM calcium-reactive blocks; amidated tolerance; separate addition; apple option; stability criteria','source':12,'pages':[7,9,16],'images':['visual/hf-acidified-milk-p7.png','visual/hf-acidified-milk-p9.png','visual/hf-acidified-milk-p16.png'],'result':'visually verified; attributed supplier guidance'},
 {'claim':'DE69 experimental CP Kelco; no botanical origin stated; pH4.0; no calcium fortification factor','source':13,'page':3,'image':'visual/milk-p3.png','result':'visually verified against PDF materials and preparation; full XML also read'},
 {'claim':'pectin0.20/0.40%w/w;180–200bar;121°C4s;within one week','source':13,'page':4,'image':'visual/milk-p4.png','result':'visually verified; inversion ten times before measurements noted in evidence, not shelf-life proof'},
 {'claim':'minor particle-size changes, viscosity interpretation','source':13,'pages':[5,7],'images':['visual/milk-p5.png','visual/milk-p7.png'],'result':'visually verified narrative and viscosity plot; no invented significance or cross-product ranking'}]
(b/'numeric-review.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2))
# Compare the numeric content of all grade rows across locales, excluding row heading text.
a=[x for x in (b/'reviewed.en.md').read_text().splitlines() if x.startswith('| ')][1:]
z=[x for x in (b/'reviewed.zh.md').read_text().splitlines() if x.startswith('| ')][1:]
assert len(a)==len(z)==7
for x,y in zip(a,z):assert re.findall(r'\d+(?:\.\d+)?',x)==re.findall(r'\d+(?:\.\d+)?',y)
results['bilingual_table_numeric_parity']=True
results['source_ids_unique']=len({s['id'] for s in ledger['sources']})==len(ledger['sources'])
# Assert all retained archival files remain byte-identical, without updating author's directory.
snapshot=json.loads((b/'source-snapshot.json').read_text())['files']
for name,h in snapshot.items():assert hashlib.sha256((b/'original'/name).read_bytes()).hexdigest()==h
src=Path('/data/hermes/research/seo-growth/2026-09-23-night-discovery/pectin')
results['source_still_matches_snapshot']=all(hashlib.sha256((src/n).read_bytes()).hexdigest()==h for n,h in snapshot.items())
results['original_copy_integrity']=True
results['status']='PASS: reviewed research content; not website/release certification'
(b/'verification.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps(results,indent=2))

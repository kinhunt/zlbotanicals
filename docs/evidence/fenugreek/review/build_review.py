from pathlib import Path
import hashlib,json,shutil,xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parent
SRC=Path('/data/hermes/research/seo-growth/2026-09-28-morning-discovery/fenugreek')
def sha(b): return hashlib.sha256(b).hexdigest()
def save(name,obj): (ROOT/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
(ROOT/'sources').mkdir(exist_ok=True)
for name in ['draft.en.md','draft.zh.md','ledger.json']:
    shutil.copyfile(SRC/name,ROOT/name)
for name in ['PMC11971048.xml','PMC7447712.html']:
    shutil.copyfile(SRC/'sources'/name,ROOT/'sources'/name)
soup=BeautifulSoup((ROOT/'sources/PMC7447712.html').read_bytes(),'html.parser')
x=ET.parse(ROOT/'sources/PMC11971048.xml').getroot()
tables=[[[c.get_text(' ',strip=True) for c in row.find_all(['th','td'],recursive=False)] for row in t.select('tr')] for t in soup.select('table')]
save('original-table-cells.json',tables)
claims=[]
def claim(id,source,locator,evidence,scope):
    item=dict(id=id,source=source,source_sha256=sha((ROOT/source).read_bytes()),locator=locator,evidence=evidence,scope=scope)
    item['claim_sha256']=sha(json.dumps(item,sort_keys=True,ensure_ascii=False).encode())
    claims.append(item)
for id,needle,scope in [
 ('T01','Fenugreek tinctures from eight different','Eight manufacturers; supplied through tobacco institute, not established food-grade validation.'),
 ('T02','DSA (Descriptive Sensory Analysis)','Seven experienced assessors, five men/two women ages25–45; trained as reported; aroma scored0–10; each sample in triplicate. Not21 independent panelists or consumer preference.'),
 ('T03','Samples of fenugreek tincture from various manufacturers','Descriptive aroma profiles, not bitterness, sweetness on tasting, or controlled processing comparison.'),
 ('T04','In this work, the correction factor','Relative quantification assumes factor1, not calibrated absolute acceptance specification.'),
 ('T05','OAV evaluation determines','Odour thresholds from aqueous solution, no finished-matrix consumer outcome.')]:
    ps=x.findall('.//p'); found=[(i,p) for i,p in enumerate(ps) if needle in ''.join(p.itertext())]; assert len(found)==1
    i,p=found[0]; claim(id,'sources/PMC11971048.xml',f'.//p[{i}] (zero-based)', ''.join(p.itertext()),scope)
for id,pid,scope in [
 ('C01','Par6','24h20C soak,1:5w/v, twice rinsed boiled/cooled water,72h20C germination/frequent watering,60C12h drying,710um flour sieve. No raw same-dose control.'),
 ('C02','Par7','Four flour blends:100/0/0,85/5/10,70/10/20,55/15/30 wheat/fenugreek/oat; coupled ingredient changes.'),
 ('C03','Par8','380g flour plus sugar201.4g,oil100.7g,water182.4ml,vanilla10ml,baking powder4.18g,salt3.38g;5mm dough,10min150/175/200C,12 combinations replicated twice.'),
 ('C04','Par13','Ten trained panelists, nine-point hedonic liking; consent/laboratory setting. Not bitterness intensity or broad consumer study.'),
 ('C05','Par14','4x3 factorial/two replications; mineral175C-only exception does not attach to sensory table; Tukey5% comparisons.'),
 ('C06','Par27','200C colour and appearance lower than150/175C.'),
 ('C07','Par29','Authors hypothesize bitterness and warn B2/B3 taste may not appeal; no bitterness assay.'),
 ('C08','Par30','Conclusion endorses B2 at175C; retain tension with pooled low taste scores.')]:
    p=soup.find(id=pid); assert p
    claim(id,'sources/PMC7447712.html','#'+pid,p.get_text(' ',strip=True),scope)
claim('C09','sources/PMC7447712.html','table index6 (zero-based), original Table5',tables[6],'Blend means across temperature factor. Taste7.83a/5.50b/3.70c/3.40c; overall7.43a/6.53b/5.87c/4.90d. Not175C-only, not percent liking.')
claim('C10','sources/PMC7447712.html','table index3 (zero-based), sensory section original Table2',tables[3],'Temperature p odor0.906,taste0.471,overall0.109; nonsignificance is not equivalence or proof heat never changes flavor.')
save('claim-ledger.json',claims)
files=['draft.en.md','draft.zh.md','ledger.json','sources/PMC11971048.xml','sources/PMC7447712.html','original-table-cells.json','claim-ledger.json']
save('revision-manifest.json',{'verdict':'PASS','scope':'Exact archived bilingual draft bytes; content/source review only, not rendered implementation or publication.','origin':str(SRC),'files':{f:sha((ROOT/f).read_bytes()) for f in files}})
print(json.dumps({'copied_drafts':2,'original_sources':2,'independent_claim_records':len(claims),'original_html_tables':len(tables),'draft_hashes':{f:sha((ROOT/f).read_bytes()) for f in files[:2]}},indent=2))

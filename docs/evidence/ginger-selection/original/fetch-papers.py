exec((__import__('pathlib').Path(__file__).parent/'retrieve.py').read_text())
S='/data/hermes/skills/research/grounded-citations/scripts/sources.py'
def ledger(*args):
 r=subprocess.run(['python',S,'--ledger',str(ROOT/'ledger.json'),*args],capture_output=True,text=True);print(r.stdout,r.stderr);r.check_returncode()
ledger('reset')
for pmc in ['PMC8871348','PMC8427268','PMC12195494','PMC6099745']:
 url=f'https://www.ebi.ac.uk/europepmc/webservices/rest/{pmc}/fullTextXML'
 r=get(url,pmc+'.xml');tree=ET.fromstring(r.content)
 title=''.join(tree.find('.//article-title').itertext())
 ledger('add',url,'--title',title)
 lines=[]
 for el in tree.iter():
  if el.tag in ['article-title','title','p','table-wrap','pub-date']:
   lines.append('['+el.tag+' '+str(el.get('id',''))+'] '+''.join(el.itertext()))
 (ROOT/(pmc+'.txt')).write_text('\n\n'.join(lines))
 print(pmc,title,'body?',tree.find('body') is not None)
(ROOT/'retrieval-manifest.json').write_text(json.dumps(manifest,indent=2))

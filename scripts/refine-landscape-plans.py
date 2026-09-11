from pathlib import Path
from PIL import Image,ImageDraw
import json,shutil,hashlib
R=Path(__file__).resolve().parents[1];E=R/'docs/evidence/editorial-landscape'
s=E/'sources/licorice-dgl-refined.png';d=s
m=json.loads((E/'manifest.json').read_text())
for row in m:
 if row['id']=='licorice-root/dgl-chewable':
  out=R/'public'/row['src'].lstrip('/');Image.open(s).resize((768,512),Image.Resampling.LANCZOS).save(out,'WEBP',quality=88,method=6)
  row.update(source=str(d.relative_to(R)),sourceSha256=hashlib.sha256(d.read_bytes()).hexdigest(),sha256=hashlib.sha256(out.read_bytes()).hexdigest(),bytes=out.stat().st_size,crop=None,method='text-to-image single landscape scene, proportional downsize; replaces clipped blister candidate')
(E/'manifest.json').write_text(json.dumps(m,indent=2)+'\n')
sheet=Image.new('RGB',(960,235*11),'#dddddd')
for n,row in enumerate(m):
 card=Image.new('RGB',(320,235),'white');card.paste(Image.open(R/'public'/row['src'].lstrip('/')).resize((300,200)),(10,0));ImageDraw.Draw(card).text((8,205),row['id'],fill='black');sheet.paste(card,((n%3)*320,(n//3)*235))
sheet.save(E/'contact-sheet.jpg',quality=90)
for n in [0,4,8]:sheet.crop((0,n*235,960,min((n+4)*235,sheet.height))).save(E/f'contact-{n}.jpg')

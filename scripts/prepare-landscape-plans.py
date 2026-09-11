"""One-time derivative export from actual generated 2x2 landscape compositions.
Preserves all prior public artwork and the complete generated source sheets.
"""
from pathlib import Path
from PIL import Image, ImageDraw
import json, hashlib, shutil
ROOT=Path(__file__).resolve().parents[1]
E=ROOT/'docs/evidence/editorial-landscape'; E.mkdir(parents=True,exist_ok=True)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
packs=json.loads((ROOT/'src/data/ingredient-reader-packs.json').read_text())
suffixes=['132918_afb1a8ea','132953_721f9731','133032_9dc21779','133125_d1c1dd1c','133201_c7de1b25','133253_cafa4ebd','133330_9bf2bb71','133411_14edcaf9','133449_906d9279','133536_fa6cbc5a','133615_e6abc2ca']
# Capture every original public raster individually, including retained landscape art.
inventory=[]
for p in sorted((ROOT/'public/images').rglob('*')):
 if p.suffix in ['.webp','.png','.jpg','.jpeg'] and 'landscape' not in p.parts:
  im=Image.open(p); inventory.append(dict(id=str(p.relative_to(ROOT)),width=im.width,height=im.height,sha256=sha(p),action='preserve source; landscape derivative' if '/ingredient-plans/' in str(p) else 'retain original landscape'))
(E/'baseline-public-rasters.json').write_text(json.dumps(inventory,indent=2)+'\n')
manifest=[]; thumbs=[]
for pack,suffix in zip(packs,suffixes,strict=True):
 source=E/'sources'/f'{pack["productId"]}.png'
 dest=source
 im=Image.open(source).convert('RGB');w,h=im.size
 assert w>h and w%2==0 and h%2==0
 boxes=[(0,0,w//2,h//2),(w//2,0,w,h//2),(0,h//2,w//2,h)]
 for plan,box in zip(pack['plans'],boxes,strict=True):
  old=f'/images/ingredient-plans/{pack["productId"]}/{plan["id"]}.webp'; src=f'/images/ingredient-plans/landscape/{pack["productId"]}/{plan["id"]}.webp'
  out=ROOT/'public'/src.lstrip('/');out.parent.mkdir(parents=True,exist_ok=True)
  panel=im.crop(box);panel.save(out,'WEBP',quality=88,method=6)
  plan['image'].update(src=src,width=panel.width,height=panel.height)
  manifest.append(dict(id=f'{pack["productId"]}/{plan["id"]}',source=str(dest.relative_to(ROOT)),sourceSha256=sha(dest),originalSrc=old,originalSha256=sha(ROOT/'public'/old.lstrip('/')),src=src,width=panel.width,height=panel.height,sha256=sha(out),bytes=out.stat().st_size,model='gpt-image-2-high',provider='claw-max',method='text-to-image; independent landscape quadrant export',crop=box,status='exported; visual inspection pending'))
  thumb=panel.resize((300,200)); card=Image.new('RGB',(320,235),'white');card.paste(thumb,(10,0));ImageDraw.Draw(card).text((8,205),f'{pack["productId"]}/{plan["id"]}',fill='black');thumbs.append(card)
(ROOT/'src/data/ingredient-reader-packs.json').write_text(json.dumps(packs,ensure_ascii=False,indent=2)+'\n')
(E/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
sheet=Image.new('RGB',(960,235*11),'#dddddd')
for n,t in enumerate(thumbs):sheet.paste(t,((n%3)*320,(n//3)*235))
sheet.save(E/'contact-sheet.jpg',quality=90)
print(json.dumps(dict(originals=len(inventory),derivatives=len(manifest),dimensions=sorted(set((m['width'],m['height']) for m in manifest)))))

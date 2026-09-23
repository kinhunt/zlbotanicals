import pathlib,json,requests,hashlib
from PIL import Image,ImageOps,ImageDraw
b=pathlib.Path(__file__).parent;(b/'images').mkdir(exist_ok=True); rows=[]
for fn in ['B0019LPMDY-gallery-v2.json','B0C15XRRDJ-gallery.json','B010YH0BS4-gallery.json']:
 d=json.loads(json.loads((b/fn).read_text())['output'])['result']['result']; ims=[]
 for i,g in enumerate(d['initial']):
  url=g.get('hiRes') or g['large']; name=f"{d['asin']}-{i+1:02d}.jpg"; data=requests.get(url,timeout=30).content;(b/'images'/name).write_bytes(data)
  im=Image.open(b/'images'/name);row={'asin':d['asin'],'title':d['title'],'pageUrl':d['url'],'rawFile':fn,'rawField':f'initial[{i}].hiRes','variant':g['variant'],'url':url,'file':'images/'+name,'sha256':hashlib.sha256(data).hexdigest(),'dimensions':im.size};rows.append(row)
  tile=Image.new('RGB',(500,540),'white');tile.paste(ImageOps.contain(im,(500,500)),(0,35));ImageDraw.Draw(tile).text((10,10),name,fill='black');ims.append(tile)
 sheet=Image.new('RGB',(1500,540*((len(ims)+2)//3)), '#cccccc')
 for i,im in enumerate(ims):sheet.paste(im,((i%3)*500,(i//3)*540))
 sheet.save(b/'images'/f"{d['asin']}-contact.jpg")
 print(d['asin'],len(ims),d.get('important',''))
(b/'image-manifest.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))

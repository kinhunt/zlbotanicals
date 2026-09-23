from collect_receipt import *
import urllib.request,hashlib
from PIL import Image,ImageOps,ImageDraw
raw=ROOT/'14-gallery-result.json'
rows=json.loads(raw.read_text())['stdout']['result']['result']['rows']
manifest=[]
for ri,row in enumerate(rows):
    assert row['asin']==row['requestedAsin'] and row.get('title')
    script=row['galleryScripts'][0]
    s=re.search(r"'initial': A\.\$\.parseJSON\('(.*?)'\)",script,re.S).group(1)
    gallery=json.loads(s)
    asin=row['asin']; (ROOT/'images').mkdir(exist_ok=True)
    print(asin,row.get('ingredients','NO INGREDIENT DOM'))
    thumbs=[]
    for i,g in enumerate(gallery):
        url=g.get('hiRes') or g['large']; path=ROOT/'images'/f'{asin}-{i:02d}.jpg'
        data=urllib.request.urlopen(url,timeout=40).read();path.write_bytes(data)
        im=Image.open(path);entry={'asin':asin,'product_url':row['url'],'title':row['title'],'image_url':url,'path':str(path),'sha256':hashlib.sha256(data).hexdigest(),'dimensions':im.size,'raw_receipt':str(raw),'raw_field':f'stdout.result.result.rows[{ri}].galleryScripts[0] -> colorImages.initial[{i}].hiRes','visual_status':'pending'};manifest.append(entry)
        thumb=ImageOps.contain(im,(480,480));tile=Image.new('RGB',(500,525),'white');tile.paste(thumb,((500-thumb.width)//2,25));ImageDraw.Draw(tile).text((8,5),f'{asin}-{i:02d}',fill='black');thumbs.append(tile)
    sheet=Image.new('RGB',(500*4,525*((len(thumbs)+3)//4)),'#dddddd')
    for i,im in enumerate(thumbs):sheet.paste(im,(i%4*500,i//4*525))
    sheet.save(ROOT/'images'/f'{asin}-contact.jpg')
(ROOT/'image-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print('downloaded',len(manifest))

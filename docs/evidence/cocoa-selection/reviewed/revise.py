from pathlib import Path
import json, hashlib, shutil, subprocess
ROOT=Path('/data/hermes/research/seo-growth/2026-09-23-midday-discovery/new-material')
OUT=Path(__file__).parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
originals={str(p.relative_to(ROOT)):sha(p) for p in ROOT.rglob('*') if p.is_file()}
(OUT/'original-hashes.json').write_text(json.dumps(originals,indent=2)+'\n')
(OUT/'evidence').mkdir(exist_ok=True)
files=['d11a-spec.pdf','d11a-spec.txt','fsai.pdf','fsai.txt','s8.html','s8.txt','acticoa-extracted.txt','miller-abstract.txt','miller-europepmc.json']
for name in files: shutil.copy2(ROOT/'evidence'/name,OUT/'evidence'/name)
shutil.copy2(ROOT/'retrieval-manifest.json',OUT/'evidence/original-retrieval-manifest.json')
ledger=json.loads((ROOT/'sources-ledger.json').read_text())
# Preserve established IDs. Replace broad evidence exports with exact complete primary-source passages.
texts={i:(OUT/'evidence'/f).read_text() for i,f in [(1,'d11a-spec.txt'),(2,'s8.txt'),(3,'acticoa-extracted.txt'),(4,'fsai.txt'),(5,'miller-abstract.txt')]}
def segment(i,a,b):
 t=texts[i]; return t[t.index(a):t.index(b)+len(b)]
quotes={1:[segment(1,'pH (in 10% solution)','Moisture content 5.0% max. ICA 1/1952'),segment(1,'D-11-A\n1-Jan-2024','Page 1 of 1'),segment(1,'Main components Minerals','Zinc 7 mg/100g'),segment(1,'Dietary Fiber','Starch 11,5 g/100g'),segment(1,'Nutrient content information','products containing this ingredient as the responsibility for determining label information lies with the finished product manufacturer.'),segment(1,'D-11-A\n1-Jan-2025','1-Feb-2022')],2:[segment(2,'Physical & Chemical Overview','Cocoa Color\nRed')],3:[segment(3,'Cocoa powder with naturally preserved','6.8-7.5 (Light alkalized)')],4:[segment(4,'The production process','powder or else extracted with aqueous acetone to produce the cocoa extract.'),segment(4,'The specifications for the cocoa extract','calcium.'),segment(4,'The cocoa extract  is intended','per day.'),segment(4,'Having reviewed','nutritional value, metabolism, intended use and level of undesirable substances.')],5:[texts[5]]}
for s in ledger['sources']:
 s['quotes']=[{'text':q,'added':'2026-09-23'} for q in quotes[s['id']]]
(OUT/'sources-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2)+'\n')
en=(ROOT/'draft-en.md').read_text(); zh=(ROOT/'draft-zh.md').read_text()
def change(text,a,b):
 assert a in text,a
 return text.replace(a,b)
en=change(en,'## Three materials, three different buying tasks','## Four examples across three buying tasks')
en=change(en,'A different colour/pH option even though its fat band matches D-11-A.','A red-colour option with a higher listed pH range, even though its fat band matches D-11-A.')
en=change(en,'The FSAI material is a historical dossier; the deZaan PDF contains a 2024 technical specification and 2025 indicative nutrition information.','The FSAI opinion dates from August 2015; the deZaan PDF contains a technical specification dated 1 January 2024 and indicative nutrition information dated 1 January 2025.')
en=change(en,'The purchasing shorthand captures fat, not the whole colour and processing profile.','The purchasing shorthand captures fat, not the whole colour and processing profile. The S8 page does not give the pH test preparation alongside its range, so a transfer specification should also align the test methods.')
en=change(en,'for lightly processed cocoa','for lightly alkalized cocoa')
en=change(en,'for medium-processed cocoa','for moderately alkalized cocoa')
en=change(en,'for heavily processed cocoa','for heavily alkalized cocoa')
en=change(en,'The current Acticoa SKU description combines preserved-flavanol positioning with a light-alkalized pH category.[3] Processing category is informative, but it cannot replace the selected material’s actual flavanol result.','The archived Acticoa SKU description combines preserved-flavanol positioning with a “Light alkalized” pH category of 6.8–7.5.[3] These labels are not a shared grading standard: Miller grouped lightly treated powders at pH 6.50–7.20, medium-treated powders at 7.21–7.60, and heavily treated powders at 7.61 or above.[5] The supplier label therefore cannot be used to assign Acticoa to one of Miller’s flavanol averages. Processing category is informative, but it cannot replace the selected material’s actual flavanol result.')
en=change(en,'Those paired amounts imply about 51.4% flavanols for that dossier’s serving example.','The same passage proposed 1.2 g extract per day and advice to avoid more than 600 mg cocoa flavanols per day; these are the applicant’s historical proposed use conditions, not general intake recommendations.[4] The paired serving amounts imply about 51.4% flavanols for that example, calculated from rounded stated quantities rather than a batch assay.')
en=change(en,'Neither an extract name nor a small bench sample establishes shelf-stable clarity.','For an opaque cocoa drink, uniform suspension and acceptable sediment are more relevant endpoints than clarity; a short bench observation does not establish shelf-life stability.')
en=change(en,'The FSAI opinion concerns a particular 2015 dossier and its proposed uses, not blanket present-day market authorization.','FSAI concluded that the named Mars extract was substantially equivalent to Mars’ natural cocoa powder under the proposed uses and use levels; this is a dossier-specific August 2015 conclusion, not blanket present-day market authorization or evidence of a health benefit.[4]')
zh=change(zh,'做小剂量补充剂','做小装量补充剂')
zh=change(zh,'“提取物含量更高”','“黄烷醇浓度更高”')
zh=change(zh,'即便脂肪范围相同，色泽与pH仍不同，不能只按“10/12”替换。','脂肪范围虽与D-11-A相同，标示pH却更高；红色色调可作为另一个感官选项，不能只按“10/12”替换。')
zh=change(zh,'FSAI文件属于历史申报资料；deZaan下载文件中技术规格日期为2024年，参考营养信息日期为2025年。','FSAI意见发表于2015年8月；deZaan下载文件中，技术规格日期为2024年1月1日，参考营养信息日期为2025年1月1日。')
zh=change(zh,'不包含完整的色泽与加工特征。','不包含完整的色泽与加工特征。S8产品页在pH范围旁未注明测试时的样品制备条件，转移规格时还应统一检测方法。')
zh=change(zh,'轻度处理组13.8','轻度碱化组13.8'); zh=change(zh,'中度处理组7.8','中度碱化组7.8'); zh=change(zh,'重度处理组3.9','重度碱化组3.9'); zh=change(zh,'可提取体系的pH越高','浸提测得的pH越高')
zh=change(zh,'当前Acticoa货号页面恰好同时出现“保留黄烷醇”和“轻度碱化”两种描述。[3] 工艺分类可以帮助筛选，却不能代替所选原料的含量结果。','归档的Acticoa货号页面同时出现“保留黄烷醇”和“轻度碱化”两种描述，后者对应的pH范围为6.8—7.5。[3] 但不同资料的分级并不统一：Miller研究以pH 6.50—7.20划为轻度处理，7.21—7.60为中度，7.61及以上为重度。[5] 因此，不能凭供应商的“轻度碱化”标签，把研究中的某组黄烷醇平均值套到Acticoa上。工艺分类可以帮助筛选，却不能代替所选原料的含量结果。')
zh=change(zh,'总摄入仍可能发生不同变化。','每天摄入的总量并不一定增加。')
zh=change(zh,'按这组配对数值计算，所对应的黄烷醇比例约为51.4%。','同一段还提出每日1.2 g提取物的用量，并拟提醒消费者每天不要摄入超过600 mg可可黄烷醇；这些是当时申请方提出的使用条件，不是通用摄入建议。[4] 以每份730 mg与375 mg这组数值换算，黄烷醇比例约为51.4%，但这是根据文件所列取整数值推算，并非批次含量检测结果。')
zh=change(zh,'“风味型可可粉加定量提取物”','“风味型可可粉加黄烷醇含量经检测的提取物”')
zh=change(zh,'再用受控的一部分液体润湿分散','再加入定量液体润湿分散')
zh=change(zh,'原料名带“提取物”，或稀释小样短时间看起来均匀，都不能证明最终饮料长期澄清稳定。','对于不透明的可可饮料，更应关注悬浮均匀性和可接受的沉降程度，而不是追求澄清；小样短时间看起来均匀，也不能证明货架期内稳定。')
zh=change(zh,'小装量补充剂应从原料质量及实测黄烷醇、咖啡因、可可碱含量出发。','小装量补充剂应先确定所需原料的装量，并核算实测黄烷醇、咖啡因和可可碱含量。')
zh=change(zh,'**用于明确巧克力基质的可可粉**','**用于构建巧克力风味和口感的可可粉**')
zh=change(zh,'**用于控制黄烷醇投料的定量可可提取物**','**黄烷醇含量经检测、便于核算投料量的可可提取物**')
zh=change(zh,'FSAI意见针对2015年的特定申报材料及拟议用途，不代表所有可可提取物在今天均获得市场准入。','FSAI在2015年8月的意见中认为，在拟议用途和用量下，玛氏这款提取物与其天然可可粉实质等同；这一结论只适用于该申报案例，不是所有可可提取物在今天的市场准入依据，也不是功效证明。[4]')
# Put primary supplier links beside their named examples, retaining original reference identities.
for s,needle in [(ledger['sources'][0],'deZaan D-11-A'),(ledger['sources'][1],'deZaan S8'),(ledger['sources'][2],'Bensdorp Acticoa')]:
 en=en.replace('| '+needle,'| ['+needle+']('+s['url']+')',1)
 zh=zh.replace('| '+needle,'| ['+needle+']('+s['url']+')',1)
for lang,text in [('en',en),('zh',zh)]: (OUT/f'draft-{lang}.md').write_text(text)
S='/data/hermes/skills/research/grounded-citations/scripts/sources.py'
for lang in ['en','zh']:
 subprocess.run(['python',S,'--ledger',str(OUT/'sources-ledger.json'),'render','--replace-in',str(OUT/f'draft-{lang}.md')],check=True)
assert originals=={str(p.relative_to(ROOT)):sha(p) for p in ROOT.rglob('*') if p.is_file()}
print('Revised drafts, full evidence passages, source copies written; all originals unchanged.')

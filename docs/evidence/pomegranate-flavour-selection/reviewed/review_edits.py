from pathlib import Path
import json, hashlib, difflib, re, xml.etree.ElementTree as ET
BASE=Path(__file__).resolve().parent
edits={
'en':[
('The reported uncertainties come from two determinations, not variation across multiple production batches.', 'These values are means ± standard deviations from two determinations, not estimates of variation across production batches.'),
('The table therefore describes **improved acceptance with some loss of characteristic flavour**, not improvement in every attribute.', 'For this ten-person panel, the table describes **higher acceptability scores alongside lower characteristic-flavour scores**, rather than improvement in every attribute.'),
('The tannase paper also has inconsistencies in concentration units and enzyme-inactivation conditions, so it is not an adequate basis for prescribing a production enzyme dose or time–temperature schedule.', 'The tannase paper also reports conflicting concentration units and different enzyme-inactivation procedures in its preparation and orthogonal-experiment sections, so it is not an adequate basis for prescribing a production enzyme dose or time–temperature schedule.'),
],
'zh':[
('不要把这几个目标合并成“石榴含量越高越好”。', '这几个目标需要分别考虑。'),
('而不是四桶浓缩汁与四桶原汁的直接比较', '而不是未稀释的工业浓缩汁与单倍果汁的直接比较'),
('这两个汁都可能闻得到', '两种汁都可能有明显香气'),
('两种汁都可能闻得到，闻到的却不是同一种石榴印象。', '两种汁都可能有明显香气，呈现的石榴风味却不同。'),
('干果', '干制水果'),
('熟果型、深色调饮料', '熟果风味饮料'),
('它也没有证明某种工艺必然损失了多少色素——论文表格中的误差来自两次测定，不是多个生产批次之间的波动。', '这不是同一款汁加工前后的对照，不能用来计算某种工艺造成的色素损失。表中数值为两次测定的均值±标准差，不代表多个生产批次之间的波动。'),
('也就是说，这张表呈现的不是“什么都变好了”，而是**更容易接受，但部分石榴特征有所减弱**。', '对这10名评价员而言，表中的结果是**接受度评分升高，特征风味评分降低**，而不是所有指标都改善。'),
('该单宁酶论文在浓度单位和灭酶条件上另有不一致，不适合直接据此制定量产酶用量或时间温度参数。', '该论文另有浓度单位冲突，制汁方法与正交试验章节记载的灭酶程序也不同，不适合直接据此制定量产酶用量或时间—温度参数。'),
('不与果汁合并报价口径', '与果汁分开说明'),
]}
# One unused candidate replacement is deliberately excluded: it is not an input sentence.
edits['zh']=[p for p in edits['zh'] if p[0]!='这两个汁都可能闻得到']
records=[]
for lang,pairs in edits.items():
    original=(BASE/'input'/f'draft.{lang}.md').read_text()
    revised=original
    for old,new in pairs:
        assert old in revised, old
        lines=[i for i,line in enumerate(original.splitlines(),1) if old in line]
        records.append({'language':lang,'original_lines':lines,'old':old,'new':new})
        revised=revised.replace(old,new)
    (BASE/f'reviewed.{lang}.md').write_text(revised)
    (BASE/f'reviewed.{lang}.diff').write_text(''.join(difflib.unified_diff(original.splitlines(True),revised.splitlines(True),fromfile=f'frozen/draft.{lang}.md',tofile=f'reviewed.{lang}.md')))
(BASE/'editorial-changes.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
# Raw evidence, independently extracted from XML, not the author's readable tables.
evidence={}
for pmc,ids in [('PMC8471094',['t001','t002','t004']),('PMC11941192',['t001','t002','t003','t004'])]:
    root=ET.parse(BASE/'input'/f'{pmc}.xml').getroot()
    tables=[]
    for t in root.findall('.//table-wrap'):
        if t.get('id').split('-')[-1] in ids:
            tables.append({'id':t.get('id'),'caption': ''.join(t.find('caption').itertext()),'rows':[[''.join(c.itertext()) for c in row] for row in t.findall('.//tr')], 'footnote': ''.join(t.find('table-wrap-foot').itertext()) if t.find('table-wrap-foot') is not None else None})
    evidence[pmc]={'title':''.join(root.find('.//article-title').itertext()),'tables':tables}
    if pmc=='PMC11941192':
        body=''.join(root.find('body').itertext()).lower()
        evidence[pmc]['dispersion_definition_search']={s:body.count(s) for s in ['standard deviation','standard error']}
# Verify endpoint extraction independently and retain source column headers.
t1=evidence['PMC8471094']['tables']; t2=evidence['PMC11941192']['tables']
phenols={row[0]:row[1] for row in t1[1]['rows'][1:]}
assert phenols['ICPJ7']=='3748.8 ± 19.8f' and phenols['INCPJ8']=='2614.0 ± 16.5g'
a=t1[2]['rows']; assert a[0][7:9]==['ICPJ7','INCPJ8']; assert a[-1][7:9]==['0.8 ± 0.0f','280.6 ± 0.1g']; assert a[-1][2]=='n.d.'
s=t2[-1]['rows']; assert s[0]==['','Time/min','0','30','60','90','120']
expected={'Color':('7.24 ± 0.6','7.02 ± 0.3'),'Taste':('5.40 ± 0.3','8.53 ± 0.2'),'Flavor':('7.79 ± 0.4','6.80 ± 0.4'),'Acceptability':('4.48 ± 0.2','7.92 ± 0.3')}
for row in s[2:]:
    assert expected[row[0]][0] in row[1] and expected[row[0]][1] in row[4]
evidence['endpoint_assertions']='PASS'
(BASE/'independent-raw-evidence.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2))
print('PASS: raw table columns and all 12 published mean ± pairs; complete bilingual revisions and diffs written.')

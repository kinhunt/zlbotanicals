import data from '../../data/buyer-tools.json';
const render = (tool: typeof data.tools[number], lang: 'en'|'zh') => `# ${tool.title[lang]}\n\n${lang==='zh'?'版本':'Version'}: ${data.version}\n\n${data.notice[lang]}\n\n` + tool.sections.map(section=>`## ${section.title[lang]}\n\n`+section.fields.map(field=>`- [ ] ${field[lang]}: ____`).join('\n\n')).join('\n\n') + '\n\ninfo@zlbotanicals.com\n';
export function getStaticPaths(){
 return [...data.tools.flatMap(tool=>(['en','zh'] as const).map(lang=>({params:{file:`${tool.id}-${lang}.md`},props:{text:render(tool,lang)}}))),{params:{file:'sourcing-checklist.txt'},props:{text:render(data.tools[0],'en')+'\n'+render(data.tools[0],'zh')}}];
}
export function GET({props}: {props:{text:string}}){return new Response(props.text,{headers:{'Content-Type':'text/plain; charset=utf-8'}});}

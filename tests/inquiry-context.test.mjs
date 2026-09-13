import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync('src/components/QuoteForm.astro','utf8').split('<script is:inline>')[1].split('</script>')[0];
function run(query) {
 const fields=Object.fromEntries(['request','product','concept','application','form','plan','problem','source','stage','company','email'].map(k=>[k,{value:'',options:[...['quote','sample','COA','TDS','certification','application','odm-transfer','odm','repeat','second-source','distribution'].map(value=>({value}))],addEventListener(){}}]));
 const document={getElementById:k=>fields[k]||null,querySelectorAll:()=>[],querySelector:()=>null,documentElement:{lang:'en'}};
 vm.runInNewContext(source,{URLSearchParams,document,window:{location:{search:query}},console});
 return fields;
}
test('inquiry retains bounded plaintext context without assigning arbitrary fields',()=>{
 const f=run('?request=sample&product=Centella&application=Serum&form=Prepared+liquid&plan=Hydrating+serum&problem=Crystals&source=cosmetics&stage=pilot&company=INJECTED&email=attacker@example.com');
 for(const [key,value] of Object.entries({product:'Centella',application:'Serum',form:'Prepared liquid',plan:'Hydrating serum',problem:'Crystals',source:'cosmetics',stage:'pilot'})) assert.equal(f[key].value,value,key);
 assert.equal(f.company.value,''); assert.equal(f.email.value,'');
});
test('inquiry rejects unknown enums and bounds/control-cleans plaintext',()=>{
 const f=run('?request=evil&source=https://evil.test&stage=unrecognized&problem='+encodeURIComponent('x'.repeat(900)+'\n\u0000'));
 assert.equal(f.request.value,'');assert.equal(f.source.value,'');assert.equal(f.stage.value,'');assert.equal(f.problem.value.length,500);
});

test('early control characters become spaces',()=>{assert.equal(run('?problem='+encodeURIComponent('a\n\u0000b')).problem.value,'a  b');});
test('inactive task controls are disabled to exclude hidden values from submission',()=>{
 const controls=[{disabled:false}];const group={dataset:{requestTypes:'odm-transfer'},hidden:false,querySelectorAll:()=>controls};
 const request={value:'quote',options:[],addEventListener(){}};
 const document={getElementById:k=>k==='request'?request:null,querySelectorAll:()=>[group],querySelector:()=>null,documentElement:{lang:'en'}};
 vm.runInNewContext(source,{URLSearchParams,document,window:{location:{search:''}}});
 assert.equal(group.hidden,true);assert.equal(controls[0].disabled,true);
});

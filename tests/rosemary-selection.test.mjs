import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');
test('food pages expose one merged rosemary selection with six distinct source targets',()=>{
 for(const prefix of ['', 'zh/']){
  const html=read(`dist/${prefix}solutions/food/index.html`);
  assert.ok(html.includes('id="rosemary-selection"'),'existing food page must contain rosemary selection');
  assert.ok(!html.includes('**初级氧化产物：**'),'Chinese labels must render as strong, not raw Markdown');
  for(let id=1;id<=6;id++){
   assert.equal((html.match(new RegExp(`id="rosemary-ref-${id}"`,'g'))||[]).length,1);
   assert.ok(html.includes(`href="#rosemary-ref-${id}"`));
  }
  assert.equal((html.match(/class="rosemary-choice"/g)||[]).length,6);
  assert.ok(html.includes(`${prefix ? '/zh' : ''}/request-quote?request=application`));
 }
});

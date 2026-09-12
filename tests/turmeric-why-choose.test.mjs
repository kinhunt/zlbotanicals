import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = p => readFileSync(`dist${p}/index.html`, 'utf8');
test('turmeric why choose section connects buyer decisions to a localized project brief', () => {
 for (const [prefix, heading, product] of [['', 'Why choose ZL Botanicals', 'Turmeric Extract'], ['/zh', '为什么选择振隆', '姜黄提取物']]) {
  const html = read(`${prefix}/products/turmeric`);
  const section = html.match(/<section id="why-choose-us">([\s\S]*?)<\/section>/)?.[1];
  assert.ok(section, 'why choose section exists');
  assert.match(section, new RegExp(`<h2[^>]*>${heading}</h2>`));
  const cards = [...section.matchAll(/<h3[^>]*>(.*?)<\/h3>/g)].map(m => m[1]);
  assert.deepEqual(cards, prefix ? ['有竞争力的采购价格', '重视品质与批次一致性', '认证与准入资料支持', '可靠交付协同'] : ['Competitive pricing', 'A focus on quality and consistency', 'Certification and qualification support', 'Reliable delivery coordination']);
  const lead = section.match(/<p>(.*?)<\/p>/)?.[1];
  assert.match(lead, /ZL Botanicals/);
  assert.match(lead, prefix ? /姜黄提取物.*价格.*品质.*认证.*交付/ : /turmeric extract.*pricing.*quality.*certification.*delivery/);
  assert.equal((section.match(/<h3\b/g) || []).length, 4);
  assert.equal((section.match(/class="procurement-benefit"/g) || []).length, 4);
  assert.ok(html.indexOf('id="supply-terms"') < html.indexOf('id="why-choose-us"'));
  assert.ok(html.indexOf('id="why-choose-us"') < html.indexOf('id="quote"'));
  assert.ok(html.includes('href="#why-choose-us"'));
  const href = section.match(/data-why-choose-brief="" href="([^"]+)"/)?.[1];
  assert.ok(href, 'dedicated project brief CTA');
  const url = new URL(href.replace(/&(?:amp|#x26);/g, '&'), 'https://zlbotanicals.com');
  assert.equal(url.pathname, `${prefix}/request-quote`);
  assert.equal(url.searchParams.get('product'), product);
  assert.equal(url.searchParams.get('request'), 'application');
  assert.match(url.searchParams.get('application'), prefix ? /姜黄.*选型.*样品.*ODM/ : /Turmeric.*selection.*sample.*ODM/);
  // Scope the claim guard to new promotional copy, not existing buyer questions or scientific citations.
  assert.doesNotMatch(section, /own factory|in-house lab|certified|exclusive patent|in stock|free samples|lowest price|worldwide customers|guaranteed|自有工厂|自建实验室|认证齐全|独家专利|现货|免费样品|最低价|全球客户|保证交付/i);
  // Check visible prose, not percent-encoded query parameters in the preserved CTA.
  assert.doesNotMatch(section.replace(/<[^>]*>/g, ''), /\b(?:ISO|GMP|FDA|organic|warehouse)\b|\d+\s*(?:%|hours?|days?|小时|天)|best quality|every batch tested|approved worldwide|manufacturer.direct|有机认证|每批.*检测|全球.*准入|工厂直供|最优品质/i);
  for (const route of ['/products/botanical-extracts', '/plant-extracts/ingredients/turmeric']) assert.ok(!read(prefix + route).includes('id="why-choose-us"'), route);
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('gold action buttons use dark text for readable contrast',()=>{
 const source=readFileSync('src/components/common/Button.astro','utf8');
 assert.ok(source.includes("accent: 'bg-accent hover:bg-accent-dark text-primary-dark'"),'Gold button must use dark text');
});
test('mobile hero keeps equal-width CTAs and compact vertical spacing',()=>{
 const source=readFileSync('src/components/home/Hero.astro','utf8');
 assert.ok(source.includes('py-12 md:py-24'));
 assert.ok(source.includes('flex-col sm:flex-row'));
 assert.ok(source.includes('w-full sm:w-auto'));
});

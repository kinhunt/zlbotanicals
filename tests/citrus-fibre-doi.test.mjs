import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseFragment} from 'parse5';

const nodes = n => [n, ...(n.childNodes ?? []).flatMap(nodes)];
const hrefs = html => nodes(parseFragment(html))
  .filter(n => n.nodeName === 'a')
  .map(n => n.attrs.find(a => a.name === 'href')?.value);

for (const doi of ['10.1021/acsomega.5c01904', '10.3390/foods12193663']) {
  test(`English citrus fibre DOI has exact valid href: ${doi}`, () => {
    const target = `https://doi.org/${doi}`;
    for (const path of [
      'dist/resources/blog/citrus-fibre-grade-process/index.html',
      'src/content/blog/en/citrus-fibre-grade-process.md',
    ]) {
      // Limit to the bibliography: other valid DOI links elsewhere cannot mask a broken source link.
      const links = hrefs(readFileSync(path, 'utf8').split('id="citrus-fibre-ref-S1"')[1]);
      const doiLinks = links.filter(href => href?.startsWith(target));
      assert.ok(doiLinks.length > 0, `${path}: DOI link exists`);
      for (const href of doiLinks) assert.equal(href, target, `${path}: exact DOI href without sentence punctuation`);
    }
  });
}

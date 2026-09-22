import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const readJSON = (name) => JSON.parse(readFileSync(name, 'utf8'));

test('runtime selection contract', () => {
  const pkg = readJSON('package.json');
  const lock = readJSON('package-lock.json');
  assert.equal(pkg.engines.node, '24.x', 'package engine must select only Node24');
  assert.equal(lock.packages[''].engines.node, pkg.engines.node, 'lock root engine must match package');
  assert.equal(readFileSync('.nvmrc', 'utf8').trim(), '24', '.nvmrc must select Node24');
  assert.match(process.version, /^v24\./, `actual process.version must be Node24, got ${process.version}`);
  console.log(`Actual runtime: ${process.version}; executable: ${process.execPath}`);
});

// Run the real contract in disposable fixture directories; never mutate the repository.
for (const [name, mutate, message] of [
  ['Node23 nvm selection', (p, l, f) => { f.nvm = '23'; }, /nvmrc must select Node24/],
  ['Node25 nvm selection', (p, l, f) => { f.nvm = '25'; }, /nvmrc must select Node24/],
  ['Node23 engine selection', (p, l) => { p.engines.node = l.packages[''].engines.node = '23.x'; }, /package engine must select only Node24/],
  ['Node25 engine selection', (p, l) => { p.engines.node = l.packages[''].engines.node = '25.x'; }, /package engine must select only Node24/],
  ['unbounded future majors', (p, l) => { p.engines.node = l.packages[''].engines.node = '>=22.12.0'; }, /package engine must select only Node24/],
  ['lock root engine mismatch', (p, l) => { l.packages[''].engines.node = '22.x'; }, /lock root engine must match package/],
]) {
  test(`runtime contract rejects ${name}`, () => {
    const dir = mkdtempSync(join(tmpdir(), 'runtime-selection-'));
    try {
      const pkg = readJSON('package.json');
      const lock = readJSON('package-lock.json');
      pkg.engines.node = lock.packages[''].engines.node = '24.x';
      const fixture = { nvm: '24' };
      const env = { ...process.env };
      delete env.NODE_TEST_CONTEXT; // Child runs its own test runner, not the parent's worker.
      mutate(pkg, lock, fixture);
      writeFileSync(join(dir, 'package.json'), JSON.stringify(pkg));
      writeFileSync(join(dir, 'package-lock.json'), JSON.stringify(lock));
      writeFileSync(join(dir, '.nvmrc'), fixture.nvm + '\n');
      const result = spawnSync(process.execPath, [
        '--test', '--test-name-pattern=^runtime selection contract$', fileURLToPath(import.meta.url),
      ], { cwd: dir, encoding: 'utf8', env });
      assert.equal(result.error, undefined);
      assert.equal(result.status, 1, `invalid selection must fail: ${result.stdout}\n${result.stderr}`);
      assert.match(result.stdout + result.stderr, message);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}

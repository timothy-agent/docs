import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle, docsUrl } from './bundle.mjs';
import { loadRoutes } from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const routes = loadRoutes(path.join(here, 'routes.json'));
const content = (n) => path.join(here, 'fixtures', n);
const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'bundle-'));

test('excluded page is dropped, keyless page kept', () => {
  const out = tmp();
  const { manifest } = bundle({ out, routes, contentDir: content('good') });
  assert.deepEqual(manifest.files, ['root__nokey.md', 'settings__features.md']);
  assert.ok(!fs.existsSync(path.join(out, 'install__quick-start.md')));
});

test('bundle frontmatter carries docs_url, app_path and app_label', () => {
  const out = tmp();
  bundle({ out, routes, contentDir: content('good') });
  const md = fs.readFileSync(path.join(out, 'settings__features.md'), 'utf8');
  assert.match(md, /^---\ntitle: "Features"\n/);
  assert.match(md, /docs_url: "https:\/\/timothy-agent\.github\.io\/docs\/settings\/features\/"/);
  assert.match(md, /app_path: "\/settings\/features"/);
  assert.match(md, /app_label: "Features"/);
  assert.match(md, /source: "docs"/);
  const nokey = fs.readFileSync(path.join(out, 'root__nokey.md'), 'utf8');
  assert.ok(!/app_path|app_label/.test(nokey));
});

test('manifest hash is stable across runs', () => {
  const a = bundle({ out: tmp(), routes, contentDir: content('good') }).manifest;
  const b = bundle({ out: tmp(), routes, contentDir: content('good') }).manifest;
  assert.equal(a.sha256, b.sha256);
  assert.match(a.sha256, /^[0-9a-f]{64}$/);
});

test('validation failure blocks the bundle', () => {
  const out = tmp();
  const res = bundle({ out, routes, contentDir: content('regression') });
  assert.equal(res.errors.length, 1);
  assert.deepEqual(fs.readdirSync(out), []);
});

test('index pages map to the section url', () => {
  assert.equal(docsUrl('install/index'), 'https://timothy-agent.github.io/docs/install/');
  assert.equal(docsUrl('index'), 'https://timothy-agent.github.io/docs/');
});

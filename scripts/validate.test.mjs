import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate, loadRoutes, matchesRoute } from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const routes = loadRoutes(path.join(here, 'routes.json'));
const run = (name) => validate({ contentDir: path.join(here, 'fixtures', name), routes });

test('good fixtures pass, including excluded and keyless pages', () => {
  const r = run('good');
  assert.deepEqual(r.errors, []);
  assert.equal(r.pages.length, 3);
});

test('unknown app_path fails with page, line and value', () => {
  assert.deepEqual(run('bad-path').errors, ['page:4: unknown app_path (/nowhere)']);
});

test('stale label and unknown settings path fail', () => {
  assert.deepEqual(run('bad-label').errors, [
    'page:7: unknown UI label (Model)',
    'page:8: unknown settings path (/settings/typo)',
  ]);
});

test('/settings/routing app_path fails (screen is /settings/routes)', () => {
  assert.deepEqual(run('regression').errors, ['routing:4: unknown app_path (/settings/routing)']);
});

test('route pattern matching', () => {
  assert.ok(matchesRoute('/', routes));
  assert.ok(matchesRoute('/chat', routes));
  assert.ok(matchesRoute('/chat/abc', routes));
  assert.ok(matchesRoute('/missions/abc', routes));
  assert.ok(matchesRoute('/knowledge/a/b', routes));
  assert.ok(!matchesRoute('/nowhere', routes));
  assert.ok(!matchesRoute('/analytics/x', routes));
});

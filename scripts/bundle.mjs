import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { validate, loadRoutes, arg, BASE_URL, DEFAULT_CONTENT } from './lib.mjs';

export function docsUrl(id) {
  const parts = id.split('/');
  if (parts[parts.length - 1] === 'index') parts.pop();
  return BASE_URL + (parts.length ? `${parts.join('/')}/` : '');
}

function render(pg) {
  const fm = {
    title: pg.data.title,
    description: pg.data.description,
    docs_url: docsUrl(pg.id),
    app_path: pg.data.app_path,
    app_label: pg.data.app_label,
    source: 'docs',
  };
  const head = Object.entries(fm)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n');
  let body = pg.body;
  if (pg.ext === '.mdx') body = body.split('\n').filter((l) => !/^import\s/.test(l)).join('\n');
  return `---\n${head}\n---\n${body.replace(/^\n+/, '')}`;
}

export function bundle({ out, routes, contentDir = DEFAULT_CONTENT }) {
  const { errors, pages } = validate({ contentDir, routes });
  if (errors.length) return { errors };
  fs.mkdirSync(out, { recursive: true });
  for (const f of fs.readdirSync(out)) {
    if (f.endsWith('.md') || f === 'manifest.json') fs.rmSync(path.join(out, f));
  }
  const files = {};
  for (const pg of pages) {
    if (pg.data.assistant === false) continue;
    const parts = pg.id.split('/');
    const name = `${parts.length > 1 ? parts[0] : 'root'}__${parts[parts.length - 1]}.md`;
    files[name] = render(pg);
  }
  const names = Object.keys(files).sort();
  const hash = crypto.createHash('sha256');
  for (const n of names) {
    fs.writeFileSync(path.join(out, n), files[n]);
    hash.update(files[n]);
  }
  const manifest = { source: 'docs', files: names, sha256: hash.digest('hex') };
  fs.writeFileSync(path.join(out, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  return { errors: [], manifest };
}

if (process.argv[1] && import.meta.url === new URL(`file://${path.resolve(process.argv[1])}`).href) {
  const out = arg(process.argv, '--out');
  const routesFile = arg(process.argv, '--routes');
  if (!out || !routesFile) {
    console.error('usage: node scripts/bundle.mjs --out <dir> --routes <file> [--content <dir>]');
    process.exit(2);
  }
  const res = bundle({
    out,
    routes: loadRoutes(routesFile),
    contentDir: arg(process.argv, '--content') ?? DEFAULT_CONTENT,
  });
  if (res.errors.length) {
    for (const e of res.errors) console.error(e);
    process.exit(1);
  }
  console.log(`ok: ${res.manifest.files.length} pages bundled, sha256 ${res.manifest.sha256}`);
}

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const DEFAULT_CONTENT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'src',
  'content',
  'docs',
);
export const BASE_URL = 'https://timothy-agent.github.io/docs/';

export function loadRoutes(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// Parses top-level `key: value` scalars of the leading frontmatter block.
// Nested maps (sidebar, hero) are skipped.
export function parsePage(text) {
  const lines = text.split('\n');
  const data = {};
  if (lines[0] !== '---') return { data, body: text, bodyLine: 1 };
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      end = i;
      break;
    }
    const m = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(lines[i]);
    if (!m || m[2] === '') continue;
    let v = m[2].trim();
    if (/^(".*"|'.*')$/.test(v)) v = v.slice(1, -1);
    if (v === 'true') v = true;
    else if (v === 'false') v = false;
    data[m[1]] = v;
  }
  if (end < 0) return { data: {}, body: text, bodyLine: 1 };
  return { data, body: lines.slice(end + 1).join('\n'), bodyLine: end + 2 };
}

export function listPages(contentDir) {
  const out = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (/\.mdx?$/.test(e.name)) out.push(full);
    }
  };
  walk(contentDir);
  return out.sort().map((file) => {
    const rel = path.relative(contentDir, file).split(path.sep).join('/');
    const text = fs.readFileSync(file, 'utf8');
    return { file, rel, id: rel.replace(/\.mdx?$/, ''), ext: path.extname(file), text, ...parsePage(text) };
  });
}

function segs(p) {
  return p.split('/').filter(Boolean);
}

function matchSegs(pat, act) {
  if (pat.length === 0) return act.length === 0;
  const [p, ...rest] = pat;
  if (p === '*') return true;
  if (p.startsWith(':') && p.endsWith('?')) {
    return matchSegs(rest, act) || (act.length > 0 && matchSegs(rest, act.slice(1)));
  }
  if (act.length === 0) return false;
  if (p.startsWith(':') || p === act[0]) return matchSegs(rest, act.slice(1));
  return false;
}

export function matchesRoute(appPath, routes) {
  const act = segs(appPath);
  return routes.routes.some((r) => matchSegs(segs(r.path), act));
}

// A settings path must start with a known area path: the generic
// /settings/* route alone would accept any typo.
export function resolvesPath(appPath, routes) {
  if (!matchesRoute(appPath, routes)) return false;
  const a = segs(appPath);
  if (a[0] === 'settings' && a.length > 1) {
    return routes.settings_areas.some((s) => segs(s.path)[1] === a[1]);
  }
  return true;
}

const LABEL_RE = /Settings\s*(?:→|->|>)\s*\**([A-Za-z]+(?: [A-Za-z]+){0,2})/g;
const PATH_RE = /`(\/settings\/[A-Za-z0-9_\-/:?]*)`/g;

export function validate({ contentDir = DEFAULT_CONTENT, routes }) {
  const pages = listPages(contentDir);
  const errors = [];
  const labels = new Set(routes.labels);
  for (const pg of pages) {
    const fmLine = (key) => {
      const i = pg.text.split('\n').findIndex((l) => l.startsWith(`${key}:`));
      return i < 0 ? 1 : i + 1;
    };
    if (pg.data.app_path !== undefined) {
      if (typeof pg.data.app_path !== 'string' || !resolvesPath(pg.data.app_path, routes)) {
        errors.push(`${pg.id}:${fmLine('app_path')}: unknown app_path (${pg.data.app_path})`);
      }
    }
    pg.body.split('\n').forEach((line, i) => {
      const n = pg.bodyLine + i;
      for (const m of line.matchAll(LABEL_RE)) {
        const words = m[1].split(' ');
        let found = null;
        for (let k = words.length; k > 0; k--) {
          const cand = words.slice(0, k).join(' ');
          if (labels.has(cand)) {
            found = cand;
            break;
          }
        }
        if (!found) errors.push(`${pg.id}:${n}: unknown UI label (${words[0]})`);
      }
      for (const m of line.matchAll(PATH_RE)) {
        if (!resolvesPath(m[1], routes)) errors.push(`${pg.id}:${n}: unknown settings path (${m[1]})`);
      }
    });
  }
  return { errors, pages };
}

export function arg(argv, name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
}

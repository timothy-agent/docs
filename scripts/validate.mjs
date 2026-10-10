import { validate, loadRoutes, arg, DEFAULT_CONTENT } from './lib.mjs';

const routesFile = arg(process.argv, '--routes');
if (!routesFile) {
  console.error('usage: node scripts/validate.mjs --routes <file> [--content <dir>]');
  process.exit(2);
}
const { errors, pages } = validate({
  contentDir: arg(process.argv, '--content') ?? DEFAULT_CONTENT,
  routes: loadRoutes(routesFile),
});
if (errors.length) {
  for (const e of errors) console.error(e);
  process.exit(1);
}
console.log(`ok: ${pages.length} pages checked`);

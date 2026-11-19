import { calculatorIds } from '../lib/calculators';

const articleSlugs = new Set(
  Object.keys(import.meta.glob('../content/articles/*.md')).map((key) =>
    key.slice(key.lastIndexOf('/') + 1, -3),
  ),
);
const publicPaths = new Set([
  '/',
  '/about/',
  '/app/',
  '/articles/',
  '/companies/',
  '/compare/',
  '/learn/',
  '/privacy/',
  '/support/',
  '/tools/',
  '/tools/research-template/',
  ...calculatorIds.map((id) => `/tools/${id}/`),
]);

export function publicPath(pathname: string): string | undefined {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (publicPaths.has(path)) return path;
  const match = /^\/(?:companies|compare|learn)\/([^/]+)\/$/.exec(path);
  return match?.[1] && articleSlugs.has(match[1]) ? path : undefined;
}

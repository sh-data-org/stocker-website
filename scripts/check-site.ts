import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = new URL('../dist/', import.meta.url);
async function files(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? files(join(directory, entry.name))
        : [join(directory, entry.name)],
    ),
  );
  return nested.flat();
}
const all = await files(fileURLToPath(root));
const pages = all.filter((file) => file.endsWith('.html'));
const titles = new Set<string>();
let links = 0;
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title, `${file}: title missing`);
  assert.ok(!titles.has(title), `${file}: duplicate title`);
  titles.add(title);
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) ?? []).length,
    1,
    `${file}: must contain one h1`,
  );
  assert.match(
    html,
    /name="description" content="[^"]+"/,
    `${file}: description missing`,
  );
  assert.match(
    html,
    /rel="canonical" href="https:\/\/stocker-invest.com\//,
    `${file}: canonical missing`,
  );
  for (const match of html.matchAll(
    /(?:href|src)="(\/(?!\/)[^"?#]*)(?:[?#][^"]*)?"/g,
  )) {
    const pathname = match[1];
    if (!pathname) continue;
    const local = join(
      fileURLToPath(root),
      pathname.endsWith('/') ? `${pathname}index.html` : pathname,
    );
    await access(local).catch(() => {
      throw new Error(`${file}: missing local target ${pathname}`);
    });
    links += 1;
  }
  for (const match of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    JSON.parse(match[1] ?? '');
  }
}
assert.ok(
  pages.length >= 25,
  'Expected the full content site, not only a landing page.',
);
await access(new URL('sitemap-index.xml', root));
await access(new URL('robots.txt', root));
console.log(
  `Verified ${pages.length} HTML pages, ${links} local links/assets, unique titles, canonical metadata and JSON-LD.`,
);

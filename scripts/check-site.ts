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
const indexableUrls = new Set<string>();
let articleSchemas = 0;
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
  if (!file.endsWith('/404.html')) {
    assert.doesNotMatch(html, /name="robots" content="[^"]*noindex/);
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonical);
    indexableUrls.add(canonical);
  }
  for (const match of html.matchAll(
    /(?:href|src|poster|data-source)="(\/(?!\/)[^"?#]*)(?:[?#][^"]*)?"/g,
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
    const parsed: unknown = JSON.parse(match[1] ?? '');
    const schemas: unknown[] = Array.isArray(parsed) ? parsed : [parsed];
    let hasOrganization = false;
    let hasWebsite = false;
    for (const item of schemas) {
      assert.ok(item && typeof item === 'object' && '@type' in item);
      hasOrganization ||= item['@type'] === 'Organization';
      hasWebsite ||= item['@type'] === 'WebSite';
      if (item['@type'] !== 'Article') continue;
      articleSchemas += 1;
      assert.ok(
        'image' in item && Array.isArray(item.image) && item.image.length,
      );
      assert.ok(
        'citation' in item &&
          Array.isArray(item.citation) &&
          item.citation.length,
      );
      for (const image of item.image) {
        assert.equal(typeof image, 'string');
        const url = new URL(image);
        assert.equal(url.origin, 'https://stocker-invest.com');
        await access(join(fileURLToPath(root), url.pathname));
      }
    }
    assert.ok(hasOrganization && hasWebsite, `${file}: site identity missing`);
  }
}
assert.ok(
  pages.length >= 25,
  'Expected the full content site, not only a landing page.',
);
await access(new URL('sitemap-index.xml', root));
await access(new URL('robots.txt', root));
const sitemap = await readFile(new URL('sitemap-0.xml', root), 'utf8');
const sitemapUrls = new Set(
  [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]),
);
assert.deepEqual(
  sitemapUrls,
  indexableUrls,
  'Sitemap must cover every indexable page exactly.',
);
assert.equal(
  articleSchemas,
  14,
  'Every article needs image and source metadata.',
);
console.log(
  `Verified ${pages.length} HTML pages, ${links} local links/assets, ${indexableUrls.size} indexable sitemap URLs and ${articleSchemas} articles with images and citations.`,
);

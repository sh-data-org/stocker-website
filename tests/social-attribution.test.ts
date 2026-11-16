import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { socialCampaignParameters } from '../src/scripts/social-campaign';

const client = ts.transpileModule(
  readFileSync(new URL('../src/scripts/analytics.ts', import.meta.url), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;

type Listener = (event: { target?: TestLink }) => void;

class TestLink {
  href: string;
  textContent = 'Download Stocker';

  constructor(
    href = 'https://apps.apple.com/app/id6443543680',
    private readonly inline = false,
  ) {
    this.href = href;
  }

  getAttribute(name: string) {
    return name === 'data-app-placement' && this.inline
      ? 'article_inline'
      : null;
  }

  closest(selector: string) {
    if (
      selector === 'a' ||
      (selector === '[data-app-placement]' && this.inline)
    )
      return this;
    return null;
  }
}

function parameters(command: unknown[] | undefined): Record<string, unknown> {
  const value = command?.[2];
  assert(value && typeof value === 'object');
  return Object.fromEntries(Object.entries(value));
}

test('consented social landing keeps campaign fields and counts one store click', () => {
  const listeners = new Map<string, Listener>();
  const url = new URL(
    'https://stocker-invest.com/tools/research-template/?utm_source=linkedin&utm_medium=social&utm_campaign=stocker-research&utm_content=filing-demo&private=excluded',
  );
  const window = { dataLayer: [] as IArguments[] };
  let isArticle = false;
  const accept = {
    addEventListener: (_name: string, listener: Listener) =>
      listeners.set('accept', listener),
  };
  const banner = {
    querySelector: (selector: string) =>
      selector === '[data-consent-accept]' ? accept : null,
  };
  runInNewContext(client, {
    URL,
    exports: {},
    require(name: string) {
      assert.equal(name, './social-campaign');
      return { socialCampaignParameters };
    },
    Element: TestLink,
    location: url,
    window,
    localStorage: { getItem: () => null, setItem() {} },
    document: {
      querySelector: (selector: string) => {
        if (selector === '[data-consent-banner]') return banner;
        if (selector === '[data-stock-research-article]' && isArticle)
          return {};
        return null;
      },
      addEventListener: (name: string, listener: Listener) =>
        listeners.set(name, listener),
      createElement: () => ({ addEventListener() {} }),
      head: { append() {} },
    },
  });
  listeners.get('click')?.({ target: new TestLink() });
  assert.equal(window.dataLayer.length, 0);
  listeners.get('accept')?.({});
  listeners.get('click')?.({ target: new TestLink() });
  const commands = window.dataLayer.map((command) =>
    Array.from<unknown>(command),
  );
  const config = parameters(commands.find(([type]) => type === 'config'));
  assert.equal(
    config.page_location,
    'https://stocker-invest.com/tools/research-template/',
  );
  const clicks = commands.filter(([, name]) => name === 'app_store_click');
  assert.equal(clicks.length, 1);
  assert.equal(
    parameters(clicks[0]).link_url,
    'https://apps.apple.com/app/id6443543680',
  );
  assert.equal(config.campaign_source, 'linkedin');
  assert.equal(config.campaign_medium, 'social');
  assert.equal(config.campaign_name, 'stocker-research');
  assert.equal(config.campaign_content, 'filing-demo');
  assert.equal(JSON.stringify(commands).includes('excluded'), false);

  const appPage = new TestLink('https://stocker-invest.com/app/', true);
  listeners.get('click')?.({ target: appPage });
  assert.equal(window.dataLayer.length, commands.length);
  isArticle = true;
  listeners.get('click')?.({ target: appPage });
  listeners.get('click')?.({ target: new TestLink(undefined, true) });
  listeners.get('click')?.({
    target: new TestLink('https://example.com/app/'),
  });
  const articleClicks = window.dataLayer
    .slice(commands.length)
    .map((command) => Array.from<unknown>(command));
  assert.deepEqual(
    articleClicks.map(([, name]) => name),
    ['article_app_page_click', 'app_store_click'],
  );
  for (const click of articleClicks) {
    assert.equal(parameters(click).page_type, 'article');
    assert.equal(parameters(click).link_placement, 'article_inline');
  }
});

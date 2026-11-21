import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { socialCampaignParameters } from '../src/scripts/social-campaign';

function script(name: string) {
  return ts.transpileModule(
    readFileSync(new URL(`../src/scripts/${name}.ts`, import.meta.url), 'utf8'),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
  ).outputText;
}

type Listener = (event: {
  target?: TestLink;
  button?: number;
  type?: string;
  key?: string;
  persisted?: boolean;
  preventDefault?: () => void;
}) => void;

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
    if (name === 'href') return this.href;
    return name === 'data-app-placement' && this.inline
      ? 'article_inline'
      : null;
  }

  querySelectorAll() {
    return [null, this];
  }

  closest(selector: string) {
    if (
      selector.startsWith('a[href],') ||
      selector === 'main' ||
      (selector === '[data-app-placement="article_inline"]' && this.inline) ||
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
  const window = {
    dataLayer: [] as IArguments[],
    addEventListener: (key: string, listener: Listener) =>
      listeners.set(key, listener),
  };
  const routeModule = {
    publicPath: (path: string) =>
      ['/', '/app/', '/tools/research-template/'].includes(path) ? path : undefined,
  };
  const interaction = {};
  runInNewContext(script('analytics-interaction'), {
    URL,
    exports: interaction,
    require: () => routeModule,
    location: url,
  });
  let savedChoice: string | null = null;
  let reloads = 0;
  let isArticle = false;
  const choice = (name: string) => ({
    addEventListener: (_name: string, listener: Listener) =>
      listeners.set(name, listener),
  });
  const banner = {
    querySelector: (selector: string) =>
      selector === '[data-consent-accept]'
        ? choice('accept')
        : choice('reject'),
  };
  runInNewContext(script('analytics'), {
    URL,
    exports: {},
    require(name: string) {
      if (name === './analytics-interaction') return interaction;
      if (name === './analytics-path') return routeModule;
      assert.equal(name, './social-campaign');
      return { socialCampaignParameters };
    },
    Element: TestLink,
    location: Object.assign(url, {
      reload: () => reloads++,
      assign() {},
    }),
    setTimeout() {},
    window,
    localStorage: {
      getItem: () => savedChoice,
      setItem: (_key: string, value: string) => {
        savedChoice = value;
      },
    },
    document: {
      title: 'Stock research template',
      referrer: 'https://example.com/ref?private=excluded',
      querySelector: (selector: string) => {
        if (selector === '[data-consent-banner]') return banner;
        if (selector === '[data-stock-research-article]' && isArticle)
          return {};
        return null;
      },
      addEventListener: (name: string, listener: Listener) =>
        listeners.set(name, (event) =>
          listener({ preventDefault() {}, ...event }),
        ),
      createElement: () => ({ addEventListener() {} }),
      head: { append() {} },
    },
  });
  listeners.get('click')?.({
    type: 'click',
    button: 0,
    target: new TestLink(),
  });
  assert.equal(window.dataLayer.length, 0);
  listeners.get('accept')?.({});
  listeners.get('click')?.({
    type: 'click',
    button: 0,
    target: new TestLink(),
  });
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
  listeners.get('click')?.({ type: 'click', button: 0, target: appPage });
  assert.equal(window.dataLayer.length, commands.length + 1);
  isArticle = true;
  listeners.get('click')?.({ type: 'click', button: 0, target: appPage });
  listeners.get('click')?.({
    type: 'click',
    button: 0,
    target: new TestLink(undefined, true),
  });
  listeners.get('auxclick')?.({
    type: 'auxclick',
    button: 1,
    target: new TestLink('https://example.com/app/?private=excluded'),
  });
  const articleClicks = window.dataLayer
    .slice(commands.length)
    .map((command) => Array.from<unknown>(command));
  assert.deepEqual(
    articleClicks.map(([, name]) => name),
    ['site_click', 'article_app_page_click', 'app_store_click', 'site_click'],
  );
  assert.equal(commands[0]?.[0], 'set');
  assert.equal(Reflect.get(Object(commands[0]?.[1]), 'send_page_view'), false);
  assert.equal(config.send_page_view, false);
  assert.equal(config.page_referrer, 'https://example.com/');
  assert.equal(commands.filter(([, name]) => name === 'page_view').length, 1);
  assert.equal(parameters(articleClicks[3]).click_destination, 'external_link');
  assert.equal(JSON.stringify(articleClicks).includes('excluded'), false);
  for (const click of articleClicks.slice(1, 3)) {
    assert.equal(parameters(click).control_position, '2');
    assert.equal(parameters(click).click_region, 'article_inline');
    assert.equal(parameters(click).page_type, 'article');
    assert.equal(parameters(click).link_placement, 'article_inline');
  }
  assert.equal(config.page_title, 'Stock research template');
  url.pathname = '/';
  const beforeRestore = window.dataLayer.length;
  listeners.get('pageshow')?.({ persisted: true });
  assert.equal(window.dataLayer.length, beforeRestore + 1);
  const restored = Array.from<unknown>(window.dataLayer[beforeRestore] ?? []);
  assert.equal(parameters(restored).page_title, 'Home – Stock Research');
  listeners.get('reject')?.({});
  listeners.get('click')?.({
    type: 'click',
    button: 0,
    target: new TestLink(),
  });
  assert.equal(reloads, 1);
  assert.equal(window.dataLayer.length, beforeRestore + 1);
});

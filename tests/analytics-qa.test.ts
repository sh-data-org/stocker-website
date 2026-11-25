import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { socialCampaignParameters } from '../src/scripts/social-campaign';

const consentKey = 'stocker-analytics-consent';
const qaKey = 'stocker-analytics-qa';
const source = ts.transpileModule(
  readFileSync(new URL('../src/scripts/analytics.ts', import.meta.url), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;

type BrowserEvent = {
  target?: Control;
  type?: string;
  button?: number;
  key?: string | null;
  persisted?: boolean;
  defaultPrevented?: boolean;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  preventDefault?: () => void;
};

class Control {
  getAttribute() {
    return null;
  }

  closest() {
    return null;
  }
}

function browser(
  query = '',
  storage = new Map<string, string>([[consentKey, 'granted']]),
  blockedStorage = false,
  page: { path?: string; title?: string; referrer?: string } = {},
) {
  const listeners = new Map<string, (event: BrowserEvent) => void>();
  const commands: IArguments[] = [];
  const warnings: string[] = [];
  let loads = 0;
  let reloads = 0;
  let prevented = 0;
  const navigation: string[] = [];
  const timers: Array<() => void> = [];
  const location = Object.assign(
    new URL(
      `https://stocker-invest.com${page.path ?? '/companies/best-stocks-for-2027/'}${query}`,
    ),
    { reload: () => reloads++, assign: (url: string) => navigation.push(url) },
  );
  const window = {
    dataLayer: commands,
    'ga-disable-G-4EJ7RNNCP8': false,
    addEventListener: (name: string, listener: (event: BrowserEvent) => void) =>
      listeners.set(name, listener),
  };
  const choice = (name: string) => ({
    addEventListener: (
      _name: string,
      listener: (event: BrowserEvent) => void,
    ) => listeners.set(name, listener),
  });
  const banner = {
    hidden: true,
    querySelector: (selector: string) =>
      choice(selector === '[data-consent-accept]' ? 'accept' : 'reject'),
  };
  runInNewContext(source, {
    exports: {},
    URL,
    Element: Control,
    location,
    window,
    setTimeout: (callback: () => void) => timers.push(callback),
    console: { warn: (message: string) => warnings.push(message) },
    localStorage: {
      getItem: (key: string) => {
        if (blockedStorage) throw new Error('Storage unavailable');
        return storage.get(key) ?? null;
      },
      setItem: (key: string, value: string) => {
        if (blockedStorage) throw new Error('Storage unavailable');
        storage.set(key, value);
      },
    },
    document: {
      title: page.title ?? 'Stocks to Watch in 2027',
      referrer: page.referrer ?? '',
      querySelector: (selector: string) =>
        selector === '[data-consent-banner]' ? banner : null,
      addEventListener: (
        name: string,
        listener: (event: BrowserEvent) => void,
      ) =>
        listeners.set(name, (event) =>
          listener({ preventDefault: () => prevented++, ...event }),
        ),
      createElement: () => ({ addEventListener() {} }),
      head: { append: () => loads++ },
    },
    require: (name: string) => {
      if (name === './social-campaign') return { socialCampaignParameters };
      if (name === './analytics-path')
        return { publicPath: (path: string) => path };
      assert.equal(name, './analytics-interaction');
      return {
        clickedControl: (control: Control) => ({
          control,
          url: new URL('https://apps.apple.com/app/id6443543680'),
          fields: { click_destination: 'app_store' },
        }),
      };
    },
  });
  return {
    window,
    storage,
    warnings,
    commands,
    listeners,
    timers,
    navigation,
    prevented: () => prevented,
    loads: () => loads,
    reloads: () => reloads,
    click: () =>
      listeners.get('click')?.({
        type: 'click',
        button: 0,
        target: new Control(),
      }),
  };
}

test('QA URL suppresses page views and clicks and persists across navigation', () => {
  const first = browser('?analytics_qa=1');
  first.click();
  first.listeners.get('accept')?.({});
  first.listeners.get('pageshow')?.({ persisted: true });
  assert.equal(first.storage.get(consentKey), 'granted');
  assert.equal(first.storage.get(qaKey), '1');
  assert.equal(first.window['ga-disable-G-4EJ7RNNCP8'], true);
  assert.equal(first.commands.length, 0);
  assert.equal(first.loads(), 0);

  const next = browser('', first.storage);
  next.click();
  assert.equal(next.commands.length, 0);
  assert.equal(next.loads(), 0);
});

test('turning QA off resumes consented analytics with one page view and click', () => {
  const storage = new Map([
    [consentKey, 'granted'],
    [qaKey, '1'],
  ]);
  const visitor = browser('?analytics_qa=0', storage);
  visitor.click();
  assert.equal(storage.get(qaKey), '0');
  assert.equal(visitor.loads(), 1);
  const events = visitor.commands.map((command) =>
    Array.from<unknown>(command),
  );
  assert.equal(events.filter(([, name]) => name === 'page_view').length, 1);
  assert.equal(
    events.filter(([, name]) => name === 'app_store_click').length,
    1,
  );
});

test('QA opt-out preserves a denied consent choice', () => {
  const storage = new Map([
    [consentKey, 'denied'],
    [qaKey, '1'],
  ]);
  const visitor = browser('?analytics_qa=0', storage);
  visitor.click();
  assert.equal(visitor.loads(), 0);
  assert.equal(visitor.commands.length, 0);
});

test('a consented Google landing keeps the search origin and records one store tap', () => {
  const path = '/companies/how-affirm-makes-money/';
  const title = 'How Does Affirm Make Money on a 0% APR Purchase? | Stocker';
  const visitor = browser('', new Map(), false, {
    path,
    title,
    referrer: 'https://www.google.com/search?q=private',
  });
  visitor.click();
  assert.equal(visitor.loads(), 0);
  assert.equal(visitor.commands.length, 0);

  visitor.listeners.get('accept')?.({});
  visitor.click();
  const events = visitor.commands
    .map((command) => Array.from<unknown>(command))
    .filter(([type]) => type === 'event');
  assert.deepEqual(
    events.map(([, name]) => name),
    ['page_view', 'app_store_click'],
  );
  const [, , landing] = events[0] ?? [];
  const [, , click] = events[1] ?? [];
  assert(landing && typeof landing === 'object');
  assert(click && typeof click === 'object');
  assert.equal(
    'page_referrer' in landing && landing.page_referrer,
    'https://www.google.com/',
  );
  assert.equal('page_title' in landing && landing.page_title, title);
  assert.equal(
    'page_location' in landing && landing.page_location,
    'https://stocker-invest.com' + path,
  );
  assert.equal('page_path' in click && click.page_path, path);
  assert.equal(
    'click_destination' in click && click.click_destination,
    'app_store',
  );
  assert.doesNotMatch(JSON.stringify(visitor.commands), /private/);

  const internal = browser('', visitor.storage, false, {
    path,
    title,
    referrer: 'https://stocker-invest.com/companies/?private',
  });
  const view = internal.commands
    .map((command) => Array.from<unknown>(command))
    .find(([, name]) => name === 'page_view')?.[2];
  assert(view && typeof view === 'object');
  assert.equal('page_title' in view && view.page_title, title);
  assert.equal(
    'page_referrer' in view && view.page_referrer,
    'https://stocker-invest.com/companies/',
  );
});

test('Tag Assistant preview enters QA mode before analytics starts', () => {
  const preview = browser('?gtm_debug=123&analytics_qa=0');
  preview.click();
  assert.equal(preview.storage.get(qaKey), '1');
  assert.equal(preview.loads(), 0);
  assert.equal(preview.commands.length, 0);
});

test('a second tab enabling QA disables collection in an already open tab', () => {
  const visitor = browser();
  assert.equal(visitor.loads(), 1);
  const before = visitor.commands.length;
  visitor.storage.set(qaKey, '1');
  visitor.listeners.get('storage')?.({ key: qaKey });
  visitor.click();
  assert.equal(visitor.window['ga-disable-G-4EJ7RNNCP8'], true);
  assert.equal(visitor.commands.length, before);
  assert.equal(visitor.reloads(), 1);
});

test('back-forward cache restoration rechecks QA before sending a page view', () => {
  const visitor = browser();
  const before = visitor.commands.length;
  visitor.storage.set(qaKey, '1');
  visitor.listeners.get('pageshow')?.({ persisted: true });
  visitor.click();
  assert.equal(visitor.commands.length, before);
  assert.equal(visitor.reloads(), 1);
});

test('unavailable QA storage pauses analytics and reports the failure', () => {
  const visitor = browser('?analytics_qa=1', new Map(), true);
  visitor.listeners.get('accept')?.({});
  visitor.click();
  assert.equal(visitor.loads(), 0);
  assert.equal(visitor.commands.length, 0);
  assert.ok(
    visitor.warnings.some((warning) => warning.includes('QA preference')),
  );
});

test('tracked navigation waits for delivery and fallback cannot navigate twice', () => {
  const visitor = browser();
  visitor.click();
  assert.equal(visitor.prevented(), 1);
  assert.equal(visitor.navigation.length, 0);
  const event = visitor.commands
    .map((command) => Array.from<unknown>(command))
    .find(([, name]) => name === 'app_store_click');
  assert.ok(event);
  const fields = event[2];
  assert.ok(fields && typeof fields === 'object');
  const callback: unknown = Reflect.get(fields, 'event_callback');
  assert.equal(typeof callback, 'function');
  if (typeof callback === 'function') callback();
  visitor.timers.forEach((timer) => timer());
  assert.deepEqual(visitor.navigation, [
    'https://apps.apple.com/app/id6443543680',
  ]);
});

test('blocked analytics delivery still opens the link through the fallback', () => {
  const visitor = browser();
  visitor.click();
  visitor.timers.forEach((timer) => timer());
  assert.deepEqual(visitor.navigation, [
    'https://apps.apple.com/app/id6443543680',
  ]);
});

test('modified clicks retain browser navigation behavior', () => {
  const visitor = browser();
  visitor.listeners.get('click')?.({
    type: 'click',
    button: 0,
    target: new Control(),
    metaKey: true,
  });
  assert.equal(visitor.prevented(), 0);
  assert.equal(visitor.timers.length, 0);
});

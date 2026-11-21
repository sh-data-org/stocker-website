import { publicPath } from './analytics-path';

const controls = 'a[href],button,summary,[role="button"],input[type="submit"]';
const regions = [
  ['.contents', 'article_contents'],
  ['.sources', 'article_sources'],
  ['.related-section', 'related_articles'],
  ['[data-app-placement="article_inline"]', 'article_inline'],
  ['[data-app-placement="article_middle"]', 'article_middle'],
  ['[data-app-placement="article_end"]', 'article_end'],
  ['.prose', 'article_body'],
  ['.download-bar', 'download_bar'],
  ['.download-sidebar', 'download_sidebar'],
  ['.site-header', 'header'],
  ['footer', 'footer'],
  ['nav', 'navigation'],
  ['form', 'form'],
  ['main', 'main'],
] as const;

function destinationFor(control: Element, url?: URL): string {
  if (!url) return control.tagName === 'SUMMARY' ? 'disclosure' : 'button';
  if (url.origin === location.origin) {
    if (url.hash && url.pathname === location.pathname) return 'page_section';
    if (url.pathname.startsWith('/downloads/')) return 'download';
    return publicPath(url.pathname) ?? 'internal_link';
  }
  if (url.hostname === 'apps.apple.com') return 'app_store';
  return ['mailto:', 'tel:'].includes(url.protocol)
    ? 'contact_link'
    : 'external_link';
}

export function clickedControl(target: Element) {
  const control = target.closest(controls);
  if (
    !control ||
    control.closest('[data-consent-banner],[data-analytics-settings]')
  )
    return;
  const region = regions.find(([selector]) => control.closest(selector));
  const container = region ? control.closest(region[0]) : document.body;
  if (!container) return;
  const position =
    Array.from(container.querySelectorAll(controls)).indexOf(control) + 1;
  if (!position) return;
  const href = control.getAttribute('href');
  let url: URL | undefined;
  if (href !== null) {
    try {
      url = new URL(href, location.href);
    } catch {
      // A malformed link has no navigable destination.
      return;
    }
  }
  return {
    control,
    url,
    fields: {
      click_region: region?.[1] ?? 'page',
      control_position: String(position),
      click_destination: destinationFor(control, url),
    },
  };
}

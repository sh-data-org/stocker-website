import { socialCampaignParameters } from './social-campaign';

import { clickedControl } from './analytics-interaction';
import { publicPath } from './analytics-path';

const MEASUREMENT_ID = 'G-4EJ7RNNCP8';
const CONSENT_KEY = 'stocker-analytics-consent';
type Consent = 'granted' | 'denied';

declare global {
  interface Window {
    'ga-disable-G-4EJ7RNNCP8'?: boolean;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const banner = document.querySelector<HTMLElement>('[data-consent-banner]');
let enabled = false;

function storedConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

function pageContext() {
  const referrer = document.referrer ? new URL(document.referrer) : undefined;
  const path = publicPath(location.pathname) ?? '/404/';
  return {
    page_path: path,
    page_location: location.origin + path,
    page_title: document.title,
    page_referrer:
      referrer && ['https:', 'http:'].includes(referrer.protocol)
        ? referrer.origin +
          (referrer.origin === location.origin
            ? (publicPath(referrer.pathname) ?? '/')
            : '/')
        : '',
  };
}

function startAnalytics(): void {
  if (enabled || location.hostname !== 'stocker-invest.com') return;
  enabled = true;
  window['ga-disable-G-4EJ7RNNCP8'] = false;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function () {
    // Google's command queue uses Arguments objects for gtag commands.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  // The Google tag can emit its own startup view before destination configuration.
  window.gtag('set', { send_page_view: false });
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {
    ...socialCampaignParameters(new URL(location.href)),
    ...pageContext(),
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  window.gtag('event', 'page_view', pageContext());
  const script = document.createElement('script');
  script.referrerPolicy = 'no-referrer';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.addEventListener('error', () =>
    console.warn('Website analytics could not load.'),
  );
  document.head.append(script);
}

function chooseConsent(consent: Consent): void {
  try {
    localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    console.warn('Analytics preference could not be saved.');
  }
  if (banner) banner.hidden = true;
  if (consent === 'granted') startAnalytics();
  else stopAnalytics();
}

banner
  ?.querySelector('[data-consent-accept]')
  ?.addEventListener('click', () => chooseConsent('granted'));
banner
  ?.querySelector('[data-consent-reject]')
  ?.addEventListener('click', () => chooseConsent('denied'));
document
  .querySelector('[data-analytics-settings]')
  ?.addEventListener('click', () => {
    if (banner) banner.hidden = false;
  });

function stopAnalytics(): void {
  if (!enabled) return;
  enabled = false;
  window['ga-disable-G-4EJ7RNNCP8'] = true;
  location.reload();
}

function trackClick(event: MouseEvent): void {
  if (!enabled || !(event.target instanceof Element)) return;
  if (event.type === 'auxclick' ? event.button !== 1 : event.button !== 0)
    return;
  const click = clickedControl(event.target);
  if (!click) return;
  const { control, url, fields } = click;
  const isArticle =
    document.querySelector('[data-stock-research-article]') !== null;
  let name = 'site_click';
  if (url?.hostname === 'apps.apple.com') name = 'app_store_click';
  else if (isArticle && fields.click_destination === '/app/')
    name = 'article_app_page_click';
  window.gtag?.('event', name, {
    ...fields,
    page_path: publicPath(location.pathname) ?? '/404/',
    page_type: isArticle ? 'article' : undefined,
    ...(name !== 'site_click' && url
      ? { link_url: url.origin + url.pathname }
      : {}),
    link_placement:
      control
        .closest('[data-app-placement]')
        ?.getAttribute('data-app-placement') ?? undefined,
    transport_type: 'beacon',
  });
}

document.addEventListener('click', trackClick, true);
document.addEventListener('auxclick', trackClick, true);
window.addEventListener('storage', (event) => {
  if (event.key !== CONSENT_KEY && event.key !== null) return;
  const consent = storedConsent();
  if (banner) banner.hidden = consent !== null;
  if (consent === 'granted') startAnalytics();
  else stopAnalytics();
});
window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return;
  const consent = storedConsent();
  if (consent !== 'granted') {
    if (banner) banner.hidden = consent !== null;
    stopAnalytics();
  } else if (enabled) window.gtag?.('event', 'page_view', pageContext());
  else startAnalytics();
});

const consent = storedConsent();
if (consent === 'granted') startAnalytics();
else if (consent === null && banner) banner.hidden = false;

export {};

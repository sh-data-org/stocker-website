const MEASUREMENT_ID = 'G-4EJ7RNNCP8';
const CONSENT_KEY = 'stocker-analytics-consent';
type Consent = 'granted' | 'denied';

declare global {
  interface Window {
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

function startAnalytics(): void {
  if (enabled || location.hostname !== 'stocker-invest.com') return;
  enabled = true;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function () {
    // Google's command queue uses Arguments objects for gtag commands.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {
    page_location: `${location.origin}${location.pathname}`,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement('script');
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
  else if (enabled) location.reload();
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

document.addEventListener('click', (event) => {
  if (!enabled || !(event.target instanceof Element)) return;
  const link = event.target.closest('a');
  if (!link || new URL(link.href).hostname !== 'apps.apple.com') return;

  window.gtag?.('event', 'app_store_click', {
    page_path: location.pathname,
    link_url: link.href,
    link_text: link.textContent?.trim().slice(0, 100),
    transport_type: 'beacon',
  });
});

const consent = storedConsent();
if (consent === 'granted') startAnalytics();
else if (consent === null && banner) banner.hidden = false;

export {};

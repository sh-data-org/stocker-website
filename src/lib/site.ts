const APP_STORE_ID = '6443543680';
const APP_STORE_PROVIDER = '125042532';
const WEBSITE_CPP_ID = 'ff0e30b6-122a-4a61-9b6f-a276cf17f599';

function promotesStockerApp(pathname: string): boolean {
  return pathname === '/app/' || pathname.startsWith('/companies/');
}

export function smartAppBanner(pathname: string): string | undefined {
  if (!promotesStockerApp(pathname)) return;

  return [
    `app-id=${APP_STORE_ID}`,
    `affiliate-data=pt=${APP_STORE_PROVIDER}&ct=stocker-web-safari-banner`,
    'app-argument=stocker://watchlist?source=website_safari_banner',
  ].join(', ');
}

export const SITE = {
  name: 'Stocker',
  origin: 'https://stocker-invest.com',
  appStore: `https://apps.apple.com/app/id${APP_STORE_ID}`,
  supportEmail: 'hello@stocker-invest.com',
  privacy: 'https://stocker-privacy-policy.sh-data.site/',
  terms: 'https://stocker-terms-of-service.sh-data.site/',
  description:
    'Clear stock research guides, thoughtful comparisons, and free tools. Discover companies and build your watchlist with Stocker.',
} as const;

export const SECTIONS = ['learn', 'compare', 'companies'] as const;
export type Section = (typeof SECTIONS)[number];

export function appStoreUrl(pathname: string): string {
  const isWatchlistCampaign = pathname === '/companies/best-stocks-for-2027/';
  const useWebsiteCpp =
    !isWatchlistCampaign && (pathname === '/' || promotesStockerApp(pathname));
  if (!isWatchlistCampaign && !useWebsiteCpp) return SITE.appStore;

  const url = new URL(SITE.appStore);
  url.searchParams.set('pt', APP_STORE_PROVIDER);
  url.searchParams.set(
    'ct',
    isWatchlistCampaign ? 'stocker-web-2027-watchlist' : 'stocker-web-cpp',
  );
  url.searchParams.set('mt', '8');
  if (useWebsiteCpp) url.searchParams.set('ppid', WEBSITE_CPP_ID);
  return url.href;
}

export function canonicalUrl(pathname: string): string {
  return new URL(pathname, SITE.origin).href;
}

export function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export const SITE = {
  name: 'Stocker',
  origin: 'https://stocker-invest.com',
  appStore: 'https://apps.apple.com/app/id6443543680',
  supportEmail: 'hello@stocker-invest.com',
  privacy: 'https://stocker-privacy-policy.sh-data.site/',
  terms: 'https://stocker-terms-of-service.sh-data.site/',
  description:
    'Clear stock research guides, thoughtful comparisons, and free tools. Discover companies and build your watchlist with Stocker.',
} as const;

export const SECTIONS = ['learn', 'compare', 'companies'] as const;
export type Section = (typeof SECTIONS)[number];

export function appStoreUrl(pathname: string): string {
  if (pathname !== '/companies/best-stocks-for-2027/') return SITE.appStore;

  const url = new URL(SITE.appStore);
  url.searchParams.set('pt', '125042532');
  url.searchParams.set('ct', 'stocker-web-2027-watchlist');
  url.searchParams.set('mt', '8');
  return url.href;
}

export function canonicalUrl(pathname: string): string {
  return new URL(pathname, SITE.origin).href;
}

export function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

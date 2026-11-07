export const SITE = {
  name: 'Stocker',
  origin: 'https://stocker-invest.com',
  appStore: 'https://apps.apple.com/app/id6443543680',
  privacy: 'https://stocker-privacy-policy.sh-data.site/',
  terms: 'https://stocker-terms-of-service.sh-data.site/',
  description:
    'Clear stock research guides, thoughtful comparisons, and free tools. Discover companies and build your watchlist with Stocker.',
} as const;

export const SECTIONS = ['learn', 'compare', 'companies'] as const;
export type Section = (typeof SECTIONS)[number];

export function canonicalUrl(pathname: string): string {
  return new URL(pathname, SITE.origin).href;
}

export function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

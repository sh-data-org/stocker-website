import { SITE, canonicalUrl } from './site';

export const organizationId = canonicalUrl('/#organization');

export const websiteSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    name: SITE.name,
    url: SITE.origin,
    logo: canonicalUrl('/favicon.png'),
    sameAs: [SITE.appStore],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': canonicalUrl('/#website'),
    name: 'Stocker Journal',
    url: SITE.origin,
    description: SITE.description,
    inLanguage: 'en',
    publisher: { '@id': organizationId },
  },
];

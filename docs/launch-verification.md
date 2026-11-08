# Launch verification — 8 November 2026

## Live deployment

- https://stocker-invest.com serves the production website over HTTPS.
- Cloudflare Pages project: `stocker-website` in Shoham's Cloudflare account.
- Direct upload; no automatic GitHub deployment.
- Current production deployment: `142111b3-9cbb-4aa5-b7fa-0cf342747ad8` ([Cloudflare detail](https://dash.cloudflare.com/e646bcff38192c38c43d9bd838125600/pages/view/stocker-website/142111b3-9cbb-4aa5-b7fa-0cf342747ad8)). This adds approved Inter typography, the compact article-first homepage, the all-articles library and download CTAs that avoid duplicate promotions.
- https://www.stocker-invest.com/learn/?test=canonical returned HTTP 301 to the same path and query on the apex host.
- Public robots.txt and both sitemap XML files returned HTTP 200. Googlebot user-agent request also returned the expected robots directives. This is a public HTTP check, not proof of Google's successful fetch.

## Google setup

- Shared owner: Gaver Apps, `gaverapps@gmail.com`.
- Search Console: `sc-domain:stocker-invest.com`; DNS ownership verified.
- GA4 account `410024069`, property `563215065`, web stream `16296213728`, measurement `G-4EJ7RNNCP8`.
- Search Console integration saved and verified in Analytics.
- Analytics Realtime showed the site's page views and three `app_store_click` test events. These are test clicks, not installs.
- `app_store_click` marked as a key event, counted once per event, with no default monetary value.
- Declining Google Analytics then reloading produced no Google Analytics or Google Tag Manager requests. Allowing produced the expected measurement request. Consent can be changed in the footer.
- Cloudflare's separate cookieless performance beacon is enabled by the hosting platform and disclosed in the privacy page.

## Open indexing issue

Both `/sitemap-index.xml` and `/sitemap-0.xml` were submitted. Search Console reports **Couldn't fetch / General HTTP error**. Homepage live test reports **Failed: Robots.txt unreachable** and currently disables Request indexing.

Settings confirms verified ownership and the Analytics association, but shows **No robots.txt file** with its report button disabled. Cloudflare's security event list showed four local Python requests blocked by Browser Integrity Check; no Google blocks were shown in that sampled list. No security protections were disabled.

Recheck Google's live test and sitemap status after its next robots fetch. If the error persists, inspect Cloudflare logs for the actual Google robots request and response. Do not describe the site as indexed until Google confirms it. Google's [robots update documentation](https://developers.google.com/crawling/docs/robots-txt/submit-updated-robots-txt) explains its cache and recrawl control; that control is unavailable until this property's robots report populates.

## Source checks

Typecheck: zero errors, warnings or hints. ESLint passed. Four calculator tests passed. Build generated 28 HTML pages. Static checker verified 894 local links/assets, metadata, canonical URLs and JSON-LD. All 27 live content pages returned HTTP 200 with the new font preload and article navigation. Both webfonts returned valid WOFF2 data. Chrome confirmed Inter Variable rendering on the live homepage. The live mobile library search returned the expected result and reset to all 14 articles.

## Remaining measurement work

Valid App Store campaign links and install attribution are not configured. Shoham's existing dashboard task must keep search clicks, consented website visits, outbound App Store clicks and attributable installs separate, with source freshness and unavailable states.

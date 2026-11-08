# Launch verification — 8 November 2026

## Live deployment

- https://stocker-invest.com serves the production website over HTTPS.
- Cloudflare Pages project: `stocker-website` in Shoham's Cloudflare account.
- Direct upload; no automatic GitHub deployment.
- Current production deployment: `beaed2b1-6616-48e7-8a41-dd0df27d840c` ([Cloudflare detail](https://dash.cloudflare.com/e646bcff38192c38c43d9bd838125600/pages/view/stocker-website/beaed2b1-6616-48e7-8a41-dd0df27d840c)). This publishes the minimal mobile title/real swipe recording/download CTA and SEO/GEO metadata. The native recording finishes on the green checkmark.
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

## Indexing recovery — 8 November, Bangkok

The earlier robots-fetch failure cleared. The homepage live test at approximately 15:42 reports **URL is available to Google** and **Page can be indexed**. The homepage indexing request was accepted into Google's priority crawl queue after publication.

Both sitemap submissions now show **Success**. The direct `/sitemap-0.xml` was read on 8 November and reports **27 discovered pages**. Evidence is saved in `docs/research/sitemap-success.png`.

The stored index result has not yet confirmed completed indexing. Do not report discovery, successful submission or live-test eligibility as indexed pages.

## Source checks

Typecheck: zero errors, warnings or hints. ESLint passed. Four calculator tests passed. Build generated 28 HTML pages. Static checker verified 944 local links/assets, all 27 indexable sitemap URLs and all 14 articles with images and source citations. Public HTTP checks verified all 27 pages, article schema, reachable images, robots access and the deployed video. The native recording and minimal title/visual/download CTA were checked on mobile; viewport and reduced-motion overrides were restored after review.

## Remaining measurement work

Valid App Store campaign links and install attribution are not configured. Shoham's existing dashboard task must keep search clicks, consented website visits, outbound App Store clicks and attributable installs separate, with source freshness and unavailable states.

# Stocker Invest

Website source for **https://stocker-invest.com**, live on Cloudflare Pages. Static editorial website with 17 illustrated articles, three calculators, a downloadable worksheet and persistent App Store download links on desktop and mobile.

## Run

```sh
npm ci
npm run dev
```

Build and review production output:

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run check:site
npm run preview
```

Astro 7 needs Node 22+. A project-local Node 22 runtime is installed by npm and used by package scripts. Source is strict TypeScript and Astro; articles live in `src/content/articles`, templates in `src/layouts`, and interactive tools in `src/lib/calculators.ts` and `src/scripts`.

## Content and research

- `docs/research/stocker-seo-plan.md`: prioritization, briefs and 90-day plan.
- `docs/research/stocker-dataforseo-keywords.csv`: initial 60-seed study.
- `docs/research/stocker-expanded-keywords.csv`: additional 52 comparison, business-model and tool seeds.
- `docs/research/stocker-research-log.md`: requests, cost, limitations and sources.
- `docs/research/seasonal-content-2026-11-09.md`: seasonal keyword research, three new articles and first traffic measurements.
- `docs/design/site-spec.md`: design and implementation decisions.
- `docs/design/article-images-and-download.md`: article illustrations, real app swipe preview and responsive download CTA verification.
- `docs/design/clean-journal.md`: Inter typography, compact article-first homepage, all-articles library and download visibility behavior.
- `docs/design/swipe-cta.md`: final minimal mobile CTA and native app recording.
- `docs/research/seo-geo-verification.md`: search eligibility, sitemap recovery and AI discovery metadata verification.
- `docs/verification.md`: checks and remaining launch work.

The library works without JavaScript. Calculator inputs stay disabled until local handlers initialize, so no native form submission sends entered values. Calculators do not fetch market data.

## Production

Launched 8 November 2026. Cloudflare Pages project `stocker-website` serves the apex domain over HTTPS. The www host returns a 301 redirect preserving the path and query. Static output is `dist/`; build command is `npm run build`.

This is a **direct-upload Pages project**, not a GitHub-linked build. Pushing source does not deploy it. Build locally, ZIP the contents of `dist/` at the archive root, then upload a production deployment in the [Cloudflare project](https://dash.cloudflare.com/e646bcff38192c38c43d9bd838125600/pages/view/stocker-website). The Pages production label `main` is a hosting label; source remains on `yoav-dev`.

Google ownership uses **Gaver Apps (`gaverapps@gmail.com`)**:

- Search Console domain property: `sc-domain:stocker-invest.com`, DNS ownership verified.
- Analytics account: `410024069`; property **Stocker — Website**: `563215065`.
- Web stream: `16296213728`; measurement ID: `G-4EJ7RNNCP8`.
- Search Console and GA4 are linked.
- Google Analytics loads only after consent on the canonical host. Footer preferences allow changing the choice. Advertising personalization and Google signals are disabled.
- Realtime verified page views and `app_store_click` receipt; the latter is a key event with no default monetary value.

### Consented click paths

Read `page_view`, `site_click`, `article_app_page_click`, and `app_store_click` in timestamp order within one GA4 session. A page entry or browser back/forward restoration sends one manual page view. A control activation sends one of the three click events. App Store and article-to-app links retain their existing event names for historical reports and key events.

All three clicks carry `click_region`, `control_position` (one-based DOM order within the region), and `click_destination` (public page path or action category). Consent controls are excluded. Register these fields as event-scoped custom dimensions in GA4. The stream’s automatic outbound clicks, file downloads, and browser-history page views are disabled. Other enhanced-measurement events such as scrolls and form submissions describe separate actions. Filter to the four named events when reading a click path. Older events cannot be backfilled.

### Excluding QA activity

Before testing production, open `https://stocker-invest.com/?analytics_qa=1` in each browser profile used for QA. This saves `stocker-analytics-qa=1` in that origin’s local storage and prevents the Google tag, page views and click events from loading or firing. The preference persists across article and app-page navigation and synchronizes with open tabs. Tag Assistant URLs containing `gtm_debug` also enable this exclusion. If the QA preference cannot be read or saved, analytics stays paused and the browser console reports the failure.

Open `https://stocker-invest.com/?analytics_qa=0` to restore normal consent-based collection. QA mode leaves the visitor’s consent choice intact. A different browser profile or cleared local storage needs QA mode enabled again. Existing November 14 test events remain in GA4. Exclude the three known article-to-app test clicks when reporting that historical period, and keep any uncertain traffic labelled as unverified.

Sitemaps were submitted, but Google currently reports **Couldn't fetch**. The homepage live test reports **Robots.txt unreachable**. Public robots.txt and sitemap checks return HTTP 200. Google's robots report has not populated, so its recrawl control is unavailable. This remains an open indexing issue; see [launch verification](docs/launch-verification.md).

Install links currently go directly to app ID 6443543680. Configure valid App Store campaign links and agreed analytics before claiming measured installs. Search Console clicks, website outbound clicks and app installs are different metrics. Review the website privacy text against the chosen host and any measurement added.

Repository: https://github.com/sh-data-org/stocker-website. Source is on `yoav-dev`. The separate iOS project was not changed. Dependency audit at initial verification: no production vulnerabilities reported; seven moderate development-only minimatch findings remained in the ESLint toolchain. No forced dependency downgrade was applied.

## Shoham handoff

Keep deployment instructions above with the existing publish task. Build with Node 22+ and `npm ci && npm run build`; no server, database or private API keys are required for the website.

Shoham owns the remaining indexing follow-up and admin dashboard integration. Use the shared Gaver Apps providers above. Connect Search Console API and Google Analytics Data API server-side with separate search, visit, outbound-click and attributable-install metrics. Show source freshness and unavailable data explicitly. Reconcile a matching date range against the provider UI before moving the task to Review.

App Store campaign attribution remains unconfigured. Credentials belong in the approved secret store, not this repository.

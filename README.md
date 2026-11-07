# Stocker Invest

Website source for **https://stocker-invest.com**. Static editorial website with 14 articles, three calculators, a downloadable worksheet and direct App Store links. No deployment or DNS change has been made.

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
- `docs/design/site-spec.md`: design and implementation decisions.
- `docs/verification.md`: checks and remaining launch work.

The library works without JavaScript. Calculator inputs stay disabled until local handlers initialize, so no native form submission sends entered values. Calculators do not fetch market data.

## Launch work

The canonical domain and sitemap are configured. Hosting, DNS, HTTPS, preferred-host redirects, Search Console and install attribution are not configured. Yoav authorized launch on 7 November 2026; Shoham owns deployment to the domain. Static output is `dist/`; build command is `npm run build`.

Install links currently go directly to app ID 6443543680. Configure valid App Store campaign links and agreed analytics before claiming measured installs. Search Console clicks, website outbound clicks and app installs are different metrics. Review the website privacy text against the chosen host and any measurement added.

Repository: https://github.com/sh-data-org/stocker-website. Reviewed source is on `yoav-dev`. Public deployment is pending. The separate iOS project was not changed. Dependency audit: no production vulnerabilities reported; seven moderate development-only minimatch findings remained in the ESLint toolchain at verification. No forced dependency downgrade was applied.


## Shoham handoff

Publish the static `dist/` output to **stocker-invest.com**, configure HTTPS and the www-to-apex redirect, then verify representative articles, tools and the sitemap. Build with Node 22+ and `npm ci && npm run build`; no server, database or private API keys are required for the current website.

Shoham owns Search Console and website analytics. Create/verify the domain property, create or select the GA4 web stream, and provide the measurement ID for website integration. Tracking is not installed yet. Connect provider data to the existing admin dashboard with separate search, visit, outbound-click and attributable-install metrics. Show source freshness and unavailable data explicitly. Reconcile a matching date range against the provider UI before moving the task to Review.

Record final hosting URL, deployment identifier, GSC property, GA4 property/stream and verified campaign-link setup in the launch task. Credentials belong in the approved secret store, not this repository.

# Seasonal SEO and first traffic — November 9, 2026

## What the site is getting now

Search Console, Web, last 24 hours (November 8–9): **8 impressions, 0 clicks, average position 30**. The report was updated 3.5 hours before inspection. Five URLs appeared: Visa/Mastercard (3 impressions), stock research guide (2), research app comparison (1), revenue/earnings (1), trailing/forward P/E (1). Visible queries included “how to research stocks” (2 impressions) and “forward pe vs trailing pe” (1). Query totals can omit anonymized searches.

GA4, Gaver Apps / Stocker — Website, property **563215065**, custom November 7–9: **6 sessions, 3 tracked users, 20 page views**. Sources: direct 4 sessions; github.com / referral 2; no Organic Search sessions reported. `app_store_click`: **5 events from 2 users**. The enhanced-measurement `click` event is separate tracking of outbound activity; do not add it to the custom event count. Key events show 2, because that configuration was added after initial event testing.

These counts include launch QA. Three test `app_store_click` events were verified during setup, but the full report does not provide a reliable clean external-user count. Do not call the 2 users customers or installs, or attribute the remaining clicks to Google. Accepted indexing requests, indexed URLs, impressions, visits, download-link clicks and installs are different metrics.

## Keyword evidence

DataForSEO Google Keyword Overview, US (2840), English, November 9. Tested **62 seeds; 28 records returned, 34 absent**. Missing records are unavailable data, not zero demand. Clickstream enrichment disabled. Estimates are monthly averages, not current November traffic forecasts; keyword updates range from September 17 to November 5, 2026. See [the full returned keyword extract](seasonal-keywords-2026-11-09.csv). Close variants must not be summed.

| Keyword                        | US searches/month |  KD | Decision                                                                          |
| ------------------------------ | ----------------: | --: | --------------------------------------------------------------------------------- |
| best stocks for 2027           |               110 |   1 | Draft a transparent company research shortlist; strongest seasonal fit            |
| best stocks to buy in november |                30 |   3 | Address with a company-confirmed earnings watchlist; no claim of proven best buys |
| stocks to watch in november    |                10 | N/A | Same November page; do not create a competing variant                             |
| stock market holidays 2026     |             8,100 |  33 | Useful calendar page, but established competition and weaker install intent       |
| stock market holidays 2027     |               260 |  37 | Cover on the same calendar URL to avoid duplicate annual pages                    |
| best dividend stocks 2026      |             8,100 |  23 | Backlog: needs a dated dividend/payout dataset and maintenance                    |
| 52 week low stocks             |             6,600 |   7 | Backlog: live lists and screeners dominate; no stale list presented as current    |
| stocks with low pe ratio       |               720 |  20 | Backlog: needs a current, clearly defined screening dataset                       |
| how to find undervalued stocks |               390 |  20 | Future evergreen guide; closer to research intent than generic predictions        |
| best stocks to buy now         |            49,500 |  37 | Broad, competitive and demanding ongoing coverage; not first priority             |

The exact November **2026** variants were not returned. The 30 estimate belongs to the broader month phrase, not an exact dated query. “Best stocks for 2027” is distinct from “best stocks to buy 2027” (10, KD unavailable); don't combine them into an audience forecast. KD is a tool score, not a ranking probability.

## Live mobile SERP checks

US / English / mobile / depth 10. Returned Google redirect URLs were interpreted through visible site names and breadcrumbs.

- **2027:** Motley Fool, Morgan Stanley, Reddit, Financhill, Facebook, Yahoo Finance, The Independent. An AI Overview item appeared. Mixed discussions and publishers suggest an editorial opening, but finance authority and the site's infancy still limit expectations.
- **November:** Reddit, YouTube, Investopedia, Motley Fool, Zacks. Several results referred to older Novembers. A current, sourced calendar/watchlist answers a freshness gap; competition remains substantial.
- **52-week lows:** Investopedia, HDFC, Reddit, Yahoo Finance, Investing.com, Economic Times, MarketInOut. Geographic ambiguity and screener intent reduce fit for a static US educational page.

No numeric traffic, CTR or install projection is justified from these checks. Calendar competition was not separately live-SERP checked in this run.

## Prepared pages and conversion path

- `/companies/stocks-to-watch-november-2026/`: Nvidia, Target and Walmart's official November 17–19 call schedule, questions to test and a before/after worksheet.
- `/companies/best-stocks-for-2027/`: Microsoft, Nvidia and Visa; stated selection method, dated reporting, risks, valuation steps and ETF comparison.
- `/learn/stock-market-holidays-2026-2027/`: full closures, early closes and time-zone guidance from NYSE/Nasdaq.

All three reuse existing article images, mobile download CTA, actual swipe preview, author/source metadata and Article/Breadcrumb schema. They link to existing research guides, comparisons and tools. Article and section listings pick them up automatically; the homepage's More articles list includes them through their order values. The sitemap is generated from built routes.

Review the monthly page after the November 17–19 releases and before reusing it in December. Preserve its November URL as an archive; a December page needs new evidence and a distinct shortlist. Recheck the annual shortlist after new filings and the calendar if exchanges announce changes. These editorial review points are documented, not scheduled automations.

Measure organic clicks and landing pages in Search Console, then `app_store_click` users/events by source and page in GA4. A download click is not an App Store installation. Do not project installs from search-volume estimates.

## Request audit

| Endpoint                                         | Request ID                             |         USD |
| ------------------------------------------------ | -------------------------------------- | ----------: |
| Google Keyword Overview                          | `11090543-3038-0607-0000-b3ba8a4de4e6` |     0.01536 |
| Live mobile SERP: best stocks for 2027           | `11090548-3038-0139-0000-17d2219e4b9f` |     0.00200 |
| Live mobile SERP: best stocks to buy in november | `11090548-3038-0139-0000-47c3693207c8` |     0.00200 |
| Live mobile SERP: 52 week low stocks             | `11090549-3038-0139-0000-22773cb4cde1` |     0.00200 |
| **Total this run**                               |                                        | **0.02136** |

Raw rendered responses and report screenshots are saved locally under `stocker-growth-2026-11-09` in the session's visualization directory. Research used the signed-in web Playground; no API credentials were extracted. Company/exchange sources are linked beside the claims in the prepared articles. Yoav approved pushing `yoav-dev`, merging and publishing all three articles on November 9, 2026.

## Validation

Typecheck: 40 files, no errors, warnings or hints. ESLint passed. All four existing calculator tests passed. Production build passed: 31 HTML pages including 404, 30 indexable sitemap URLs and 17 article schemas. The site check verified 1,078 local links/assets, article images, citations and exact sitemap coverage. The article-count assertion now derives the expected total from the content directory instead of fixing it at 14.

All three new article routes rendered in the existing Chrome session at a 390px mobile viewport without document overflow, with the download CTA present. The wider November table scrolls within its own container. A desktop article preview also rendered. Built homepage HTML links to all three new articles. No download CTA was clicked during these previews, avoiding additional test conversions.

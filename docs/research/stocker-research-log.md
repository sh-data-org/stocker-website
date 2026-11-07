# Stocker SEO research log

Retrieved 7 November 2026 through the signed-in Gaver Apps DataForSEO web Playground in Yoav's existing Chrome session. No API credentials were extracted. Research artifacts are local and no website was published.

## DataForSEO requests

| Endpoint                     | Request ID                             | Scope                                                                             |    Cost USD |
| ---------------------------- | -------------------------------------- | --------------------------------------------------------------------------------- | ----------: |
| Google Keyword Overview      | `11071605-3038-0607-0000-9c40c167444e` | 60 seeds; US 2840/en; 48 records                                                  |     0.01776 |
| Google Keyword Ideas         | `11071608-3038-0400-0000-0d7fb1e2e030` | 4 seeds; 50 broad results; rejected for poor relevance                            |     0.01800 |
| Google Keyword Ideas         | `11071608-3038-0400-0000-ce294094f551` | Closely Variants enabled; 50 results still dominated by ticker searches; excluded |     0.01800 |
| Google Organic Live Advanced | `11071608-3038-0139-0000-16367f7e86b0` | tinder for stocks; US/en/mobile; depth 10                                         |     0.00200 |
| Google Organic Live Advanced | `11071609-3038-0139-0000-b204c32f1a4e` | negative pe ratio; US/en/mobile; depth 10                                         |     0.00200 |
| Google Organic Live Advanced | `11071609-3038-0139-0000-f91b1abe8d2a` | revenue vs earnings; US/en/mobile; depth 10                                       |     0.00200 |
| Google Organic Live Advanced | `11071609-3038-0139-0000-ad71cca5cb5f` | best stock watchlist app; US/en/mobile; depth 10                                  |     0.00200 |
| Google Organic Live Advanced | `11071610-3038-0139-0000-409c1b41335b` | finviz alternative; US/en/mobile; depth 10                                        |     0.00200 |
| Google Organic Live Advanced | `11071610-3038-0139-0000-00ad36d7fa84` | sector vs industry; US/en/mobile; depth 10                                        |     0.00200 |
| **Total**                    |                                        |                                                                                   | **0.06576** |

Keyword Overview data: 47 numeric search-volume estimates, one null volume, twelve requested keywords absent. Date range of keyword-info updates: 2026-09-17 through 2026-10-20. Clickstream data was disabled. Live SERPs were retrieved around 16:08–16:10 UTC / 23:08–23:10 Bangkok. The CSV is a transcribed extract of the rendered API fields, not a full raw response export.

The overview reported an anomalous detected language of `ro` for negative pe ratio and `it` for finviz alternative despite US/en request settings. Both phrases were checked against live English results; do not use language-detection metadata as independent confirmation of demand quality.

## Close-variant and intent notes

- `tinder for stocks`: volume 880, KD 0, core keyword `tinder stock`. September 2026 volume 720. Live results are heavily mixed with Match Group equity intent. Excluded as a primary traffic bet.
- `revenue vs earnings`: volume 1,900, KD 6, core keyword `earnings vs revenue`. September 2026 volume 1,300. One page should cover both word orders.
- `negative pe ratio`: volume 1,000, KD 0; September 590. The separate question `what does a negative pe ratio mean` has reported volume 880 but should target the same URL. No combined traffic estimate was calculated.
- `trailing vs forward pe`: volume 720, KD 0; September 590.
- `sector vs industry`: volume 720, KD 0; September 720.
- `how to research stocks`: volume 480, KD 25; September 480.
- `best stock watchlist app`: volume 70, KD 29; September 40.
- `finviz alternative`: volume 70, KD 6; latest returned month August 2026, volume 50.

## Live Google mobile observations

DataForSEO returned Google redirect wrappers in result URLs, so the analysis used the rendered titles and breadcrumbs instead of treating `google.com` wrappers as competitor domains. Below are returned organic order observations, not permanent rankings. All six responses contained an AI Overview item.

**Negative P/E:** Investopedia; Reddit; Public; Saxo; TIKR; Schwab; Ziggma; AAII; SmartAsset. Low reported KD coexists with well-established finance publishers.

**Revenue vs earnings:** Dryrun; Trading 212; a video result; Parikh Financial; National Funding; QuickBooks; Shopify; Bloom. Significant business-accounting intent, so article framing must qualify visitors interested in listed companies.

**Sector vs industry:** Fidelity; ScienceDirect; Economics Stack Exchange; FINRA; Wikipedia; Easy Peasy Finance; Blue Investments. Useful product relevance, but low KD is not a substitute for trust and accurate examples.

**Best stock watchlist app:** Reddit; MarketWatch on Google Play; WallStreetZen; New York Times; TradingView on Apple's App Store; NerdWallet. App modules, discussion elements and AI Overview were present.

**Finviz alternative:** NerdWallet; Reddit; Stock Rover; AllInvestView; ChartMath; ChartsWatcher; Shibui; Semrush. Predominantly screener/research tool comparisons; Stocker has limited feature equivalence.

**Tinder for stocks:** the first result concerned Tinder/Match Group stock. A swipe-discovery Reddit post appeared second; several later results concerned dating-company stocks. Do not reinterpret the full estimate as swipe-app demand.

## Other sources used

- [Current Stocker App Store listing](https://apps.apple.com/ca/app/ai-stock-market-investing/id6443543680?platform=ipad): current public description and app identity, ID 6443543680. US URL could not be retrieved through the web tool; no US price was inferred from Canadian prices.
- [Local repository README](/Users/yoavtzori/Chinag%20Mai%20Projects/Stocker_2.0/README.md): corroborating feature and analytics context. It contains older and newer sections with inconsistencies; the public listing was used for current marketing scope, not stale archived metadata.
- [Old Stocker domain](https://stockermobileapp.com/): search/Exa cached content only; direct fetch failed. Unrelated forex copy was returned. This does not prove current ownership, compromise or live content.
- [Stocker LinkedIn company profile](https://linkedin.com/company/stocker-app): Exa evidence connecting the historical domain to the product.
- [Simply Wall St screener](https://simplywall.st/features/stock-screener), [Stock Analysis screener tutorial](https://stockanalysis.com/tutorials/screener/), [WhatStocks](https://www.whatstocks.com/), [StockSight](https://www.stocksightsapp.com/): competing discovery/research positioning.
- [Apple Stocks guide](https://support.apple.com/guide/iphone/check-stocks-iph1ac0b1bc/26/ios/26): baseline iPhone watchlist capabilities.
- [StockFloc](https://stockfloc.com/), [Howl](https://howlapp.co/), [StockSwype](https://stockswype.com/): additional product-positioning evidence. StockSwype's page said coming to the App Store; this is not proof of a live app.
- [Stock watchlist template example](https://becoin.net/templates/stock-watchlist-template), [Stocksbrew watchlist comparison](https://www.stocksbrew.online/blog/best-stock-watchlist-apps-2026): evidence that competing pages offer templates and tool comparisons, not verified traffic estimates.
- [DataForSEO overview documentation](https://docs.dataforseo.com/v3/dataforseo_labs/google/keyword_overview/live/), [KD methodology](https://dataforseo.com/help-center/what-is-keyword-difficulty-and-how-is-it-calculated), [volume definition](https://dataforseo.com/help-center/what-is-search-volume).
- Google Search Central and Apple campaign documentation are linked at the relevant recommendations in the plan.

## Limits

This is a targeted seed study, not an exhaustive market-wide keyword database export or backlink audit. Only six shortlisted terms received live DataForSEO SERP checks. Other rankings and all install-fit ratings remain hypotheses. Search volume does not prove attainable traffic, clicks or installs. Competitor pages establish content/product presence, not commercial success.

## Expanded website research

A second Google Keyword Overview request, `11071622-3038-0607-0000-301298c0b886`, tested 52 additional seeds for app comparisons, company comparisons, business-model explainers and calculators. US 2840 / English; November 7, 2026. Returned 49 records; three absent. Cost $0.01788, bringing the observed research total to **$0.08364**. The separate expanded CSV is a transcription of displayed volume/KD fields, not raw JSON.

Do not sum close variants: `nvidia vs amd stock` returned 260 but its core keyword was `amd vs nvidia stock` (590). `amazon vs walmart stock` mapped to `amazon stock vs walmart stock`; `best apps to learn about stocks` mapped to `best app for learning stocks`. Some apparently small terms inherit high difficulty from broad core intents. Null KD remains blank, not zero.

The local launch content spans five app/company comparisons, seven educational guides and two business models. The three working tools cover P/E, market cap and dividend yield. The compound-interest keyword has enormous estimated volume but high competition and weak differentiation, so no generic compound-interest page was built. Company comparison phrases and calculator volumes remain keyword-tool opportunities, not verified accessible traffic; only the original six terms received live DataForSEO SERP checks.

The business-model Visa article was checked against Visa's fiscal 2026 SEC Form 10-K, published November 5, 2026: https://www.sec.gov/Archives/edgar/data/1403161/000140316126000134/v-20260930.htm . The initial Mastercard source link was removed during editorial review.

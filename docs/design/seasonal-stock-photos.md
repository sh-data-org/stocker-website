# Seasonal article photography — November 9, 2026

Yoav requested stock photography before the approved three-article publication. The article heroes, library cards and social/Article metadata use three locally hosted Pexels photographs. Existing app screenshots and swipe recordings remain in the download CTA.

| Article                     | Photographer and source                                                                                                        | Local asset                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| November earnings watchlist | [Clément Proust — grocery aisle in Tadoussac](https://www.pexels.com/photo/stocked-grocery-store-aisle-in-tadoussac-40069127/) | `src/assets/stock-retail-aisle.webp` |
| 2027 research shortlist     | [panumas nikhomkhai — server equipment](https://www.pexels.com/photo/computer-server-in-data-center-room-17489163/)            | `src/assets/stock-data-center.webp`  |
| 2026–2027 market calendar   | [Vlada Karpovich — New York Stock Exchange](https://www.pexels.com/photo/new-york-stock-exchange-4451945/)                     | `src/assets/stock-nyse.webp`         |

The source pages identified each photo as free under the [Pexels license](https://www.pexels.com/license/). Pexels' [license explanation](https://help.pexels.com/hc/en-us/articles/360042295174-What-is-the-license-of-the-photos-and-videos-on-Pexels) permits personal and commercial use without mandatory attribution. Each article nevertheless includes a visible photographer credit linked to the original photo page.

The supermarket and server images illustrate sectors; they do not identify Walmart/Target premises or Microsoft/Nvidia equipment, and do not imply an endorsement. Descriptive alternative text reflects that distinction. The NYSE photograph depicts the exchange facade.

Assets were downloaded through the existing Chrome session from public Pexels pages. No Pexels API key or runtime API dependency was added. Source photos are resized without enlargement, encoded as WebP and further optimized by Astro for the article hero, thumbnail and social image. The site serves the files itself rather than hotlinking.

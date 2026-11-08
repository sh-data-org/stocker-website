# Article images and download CTA — 8 November 2026

## Design

Keep the existing white, navy and blue editorial layout. Add one explanatory image after the first two sections of every article, with descriptive alt text and a caption. Use real Stocker screenshots when discussing the app.

The generated reference is `article-download-concept.png`. Actual desktop and mobile previews are saved alongside it. The implementation preserves the article text and existing navigation rather than using incidental copy or numbers in the generated reference.

## Artwork

Six illustrations were generated with the built-in GPT Image tool, with `transparent_background: false`. Shared direction: wide 3:2 editorial composition, restrained clay and paper materials, pale blue or mint background, navy/cobalt/ivory with small lime accents; no embedded words, logos, numerical data or return promises.

- `article-valuation.png`: two financial reports, division and a magnifying glass highlighting a negative result. Used for P/E explanations.
- `article-business.png`: business activity passes operating costs before a smaller remainder. Used for revenue versus earnings.
- `article-portfolio.png`: one company beside a basket of company tiles. Used for stocks versus ETFs.
- `article-payments.png`: merchant terminal connects through a network hub to banks. Used for Visa and Mastercard articles.
- `article-chips.png`: two processors connect to computing customers and supporting infrastructure. Used for semiconductor articles.
- `article-sectors.png`: one broad category branches into narrower business groups. Used for sector versus industry.

Astro produces WebP assets at build time. Inline images load lazily and include dimensions. Illustrations are conceptual; app screenshots show historical example data.

## Download behavior

- Article desktop layout has a sticky sidebar with the real discovery screen and download button.
- A fixed bar appears whenever the desktop sidebar button is outside the viewport. Other pages always use the bar.
- Mobile and tablet use the compact fixed bar, with a real app screenshot and an iPhone/iPad label.
- The screenshot card animates once for 3.8 seconds. Desktop readers can replay it. This is an animated screenshot preview, not an app recording or live quote feed.
- Reduced-motion preferences disable the animation and replay control. The App Store link works without JavaScript.
- Footer spacing, safe-area insets and the consent banner account for the fixed bar.

## Verification

Typecheck and ESLint passed; all four existing tests passed. Production build generated 27 pages. The site checker verified 923 local links/assets. All 14 article bodies contain lazy-loaded images with alt text and dimensions.

Browser review covers desktop and mobile layouts, 320px, 390px and 820px widths, the App Store destination, consent spacing, reduced motion, replay and fixed/sticky CTA behavior. No horizontal overflow was found at those widths.

Yoav approved publication. Deployed to `stocker-invest.com` as Cloudflare production deployment `4e351681-203b-43b8-ab0a-1d2251811895`. All 14 live article URLs returned HTTP 200 with the new image and download CTA. Live mobile image loading and CTA visibility were also checked in Chrome.

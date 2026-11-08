# Cleaner journal and typography — 8 November 2026

## Direction

Make articles the first destination and the Stocker download the clear next action. Preserve the existing article URLs, illustrations and real app preview.

The generated reference is `article-first-home-concept.png`. The implementation keeps the existing illustration style instead of the incidental photography and example article titles in that reference. Desktop and mobile implementation screenshots are saved alongside it.

## Changes

- Replace Poppins with self-hosted Inter Variable, including real italic and weight support. Use semibold headings and more natural tracking.
- Remove the large decorative homepage hero. Show three featured articles within the first desktop viewport and the first complete article in the first mobile viewport.
- Add `/articles/` with all 14 articles, search and topic filters. Simplify the main navigation to Articles, Tools and The app.
- Keep the app promotion after the reading recommendations. Show the floating download bar when no header, sidebar or inline download button is fully visible. Without JavaScript, the bar stays available.
- Retain the article illustrations, calculator functionality, consent controls and App Store click tracking.
- Remove the unused homepage styles and Poppins files.

## Font source

Inter 4.1 was downloaded unchanged from the [official distribution](https://rsms.me/inter/inter.css): `InterVariable.woff2` and `InterVariable-Italic.woff2`. The original license is retained at `public/fonts/INTER-LICENSE.txt`. Font requests stay on this website's own origin.

Chrome's rendered-font inspector confirmed **Inter Variable** for both the homepage heading and article paragraphs, rather than a fallback font.

## Verification

- Typecheck: zero errors, warnings or hints. ESLint and all four existing tests passed.
- Production build: 28 HTML pages. Static checker: 894 local links/assets, canonical metadata, unique titles and JSON-LD.
- Article library search for “negative” returned one article; App comparison returned three; resetting restored all 14.
- Desktop and 320px/390px/820px previews were inspected. The first mobile featured article fits above the download bar. No horizontal overflow was found at those widths.

Yoav approved publication. Deployed as `142111b3-9cbb-4aa5-b7fa-0cf342747ad8` to `stocker-invest.com`. Live desktop and mobile checks confirmed the layout, Inter rendering, download visibility and article library search. All 27 live content pages returned HTTP 200 and both webfonts returned valid WOFF2 data. Full production evidence is recorded in `docs/launch-verification.md`.

# Stocker Invest website

Domain supplied by Yoav: stocker-invest.com. Goal: a substantial, attractive editorial website that attracts relevant organic visitors and helps them discover the iPhone app.

## Chosen implementation

Astro static pages with strict TypeScript, Markdown content collections, reusable editorial components and small browser scripts for library filtering and calculators. This is the builder's choice: search-indexable HTML and fast pages fit the content-heavy site. A client-only React app adds unnecessary rendering work; a hosted CMS is not needed for the initial reviewable version. Astro 7.4.7 uses a project-local Node 22.23.4 runtime dependency. This avoids changing the system runtime and removes the older Astro dependency vulnerabilities.

## Design reference

Generated using built-in GPT Image. References: home-concept.png, home-continuation-concept.png, article-concept.png. Assets: research sheets, phones and processor chips, plus the real app icon and owned app screenshots.

White background, navy #101f35, cobalt #075adc, lime #b3dc60. Poppins from the app's existing font assets. Desktop maximum content width 1400px, restrained 12px radii, gray rules, large bold headings, editorial lists and split comparison features. No claims about investor returns, user counts or live prices. Keep header and actual hero copy from the concept.

## Surfaces

Home; searchable/filterable Learn, Compare and Companies libraries; individual complete articles with sources, dates and table of contents; tools directory, P/E, market cap and dividend yield calculators; downloadable research worksheet; The app page; About/editorial policy; 404. Privacy and Terms link to the existing published app documents until website-specific policies are reviewed. Add a factual local website privacy explanation. No analytics or tracking cookies enabled in this local version.

## Content and behavior

14 original articles initially: 7 educational guides, 3 app comparisons, 2 company comparisons and 2 company business-model explainers. App comparisons disclose ownership and describe documentation-based comparison without claiming hands-on testing. Company pages cite official primary sources and avoid time-sensitive prices or numerical financial claims. Calculators use user-entered numbers, handle invalid and negative values, and show formulas and limitations. Library filters and search must work with keyboard access and show empty results. Without JavaScript, all article links remain available.

## SEO and conversion

Canonical URLs use the confirmed domain. Unique page titles/descriptions, sitemap, robots, breadcrumb/Article JSON-LD and Open Graph image. No invented aggregate reviews or unsupported rich-result promises. Download links point to actual Apple app ID 6443543680. Provider token and analytics not configured; do not label clicks installs or pretend measurement is live.

## Intentional differences from generated concepts

Use the actual Stocker icon, not the approximate generated logo. Remove the generated article's claim that Stocker compares companies side-by-side; the shipping app supports research and saved stocks. Use correct source-backed copy for all article content. Mobile layout adapts sections into one readable column and the header into an accessible menu.

## Delivery and verification

Separate local repository on yoav-dev. The iOS repository's existing modified Settings file is untouched. No remote, push, deployment or DNS change without authorization. Required checks: Astro typecheck, ESLint, calculator edge-case tests, production build, generated-page links/metadata, desktop and mobile in permitted browser. Keep review evidence in docs.

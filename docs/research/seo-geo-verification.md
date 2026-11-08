# Search and AI discovery verification — 8 November 2026

## Implemented

- Every public page is static HTML with a unique title, description, canonical URL and readable internal links. All 27 indexable URLs are in the sitemap; the error page stays noindex.
- All pages identify the same Stocker organization and website through JSON-LD, connected to the actual App Store listing. About and app-page headings now state the product clearly.
- All 14 articles retain visible author, publication date, primary-source links, explanatory text and editorial disclosures. Their Article markup now includes a reachable 1200px editorial image, language, category and source citations. Open Graph images match each article.
- Snippet and large-image previews are explicitly permitted. The robots policy allows ordinary search crawling and explicitly allows OAI-SearchBot. Existing access for other agents is preserved.
- Sitemap responses return a five-minute cache lifetime. The origin also requests five minutes for robots.txt, while the observed Cloudflare edge robots response still uses four hours; its body already contains the new allow rule.
- Static validation checks sitemap coverage, no accidental noindex on content pages, site identity, article images and citations. Search traffic and App Store clicks remain separate from unverified installs.

Production deployment: `beaed2b1-6616-48e7-8a41-dd0df27d840c`. All 27 deployed content URLs returned HTTP 200; the final video matches the built asset byte for byte. The public verification log is `live-seo-verification.json`.

## Google evidence

The homepage's Search Console live test on 8 November at approximately 15:42 Bangkok reported **URL is available to Google** and **Page can be indexed**. The earlier robots-fetch failure is no longer reproduced in that live test. The stored index result still says the URL is unknown to Google; this is not proof of completed indexing.

After publication, Google accepted the homepage indexing request into its priority crawl queue. Both sitemap submissions now show **Success**. The direct sitemap was read on 8 November and reports **27 discovered pages**. Evidence: `sitemap-success.png`. The stored index result has not yet confirmed indexing; sitemap discovery, eligibility and completed indexing remain separate states.

## Basis for GEO work

[Google's AI search guidance](https://developers.google.com/search/docs/appearance/ai-features) emphasizes ordinary crawlability, useful visible content, internal links and structured data that matches the page. Special AI files or a separate AI-specific schema are not required. Existing articles already provide direct explanations, comparisons and primary-source citations, so no duplicate keyword pages or hidden answer text were added.

[OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots) identifies OAI-SearchBot as the search crawler, independently of GPTBot's training purpose. The explicit search rule clarifies search access without changing the existing training policy.

These improvements support discovery and interpretation. They do not establish indexing, rankings or citations in any AI answer service.

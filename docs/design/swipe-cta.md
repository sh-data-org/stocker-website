# Minimal mobile app CTA — 8 November 2026

## Final design

Three elements: **Swipe to discover.**, a native Stocker swipe recording, and **Download Stocker**. The screenshot crop, floating arrow, explanatory paragraphs, separate Like/Pass buttons and availability captions were removed after visual review.

The reference is `mobile-cta-simple-concept.png`, generated with GPT Image using the real app screen as a reference. The shipped visual is a real recording, rather than the generated screen.

## Visual provenance and behavior

- Recorded Stocker's native onboarding swipe demo in an isolated iPhone 17 Pro simulator. Existing simulators and the iOS source tree were preserved. The temporary capture simulator was removed afterward.
- Cropped to the native card animation and its own Like/Pass feedback. Demo-data labels stay in the recording. No generated stock prices, artificial cursor or web overlays are added.
- `public/videos/stocker-swipe-liked.mp4`: silent H.264, 720×926, approximately 4.4 seconds, 223,966 bytes. The optimized WebP poster is about 19 KB.
- Playback starts when the preview is mostly visible, pauses offscreen, and finishes on the native green checkmark. Tapping or keyboard activation pauses, resumes or replays the demo. Reduced motion shows the poster until the user explicitly requests playback.
- The homepage, article sidebar, article-end CTA and compact fixed bar share the same recording. Download actions still point to App Store app 6443543680.
- The mobile homepage promotion is approximately 454px tall at 320–430px widths and has a full-width 48px download button.

## Verification

Typecheck: zero errors, warnings or hints. ESLint passed. All four existing calculator tests passed. Production build: 28 HTML pages. Static validation: 944 local links/assets, all 27 indexable URLs in the sitemap, and all 14 Article schemas with reachable images and source citations.

Chrome checks cover playback, replay, reduced motion, CTA visibility, and horizontal overflow at 320px, 375px, 390px, 430px and 1440px. Live production proof is saved beside this document after publication.

## Publication

Yoav explicitly approved publication, the `yoav-dev` push and merge to `main`. Deployment and Search Console evidence are recorded in `docs/launch-verification.md` and `docs/research/seo-geo-verification.md`.

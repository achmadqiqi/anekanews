# Design Specification: AnekaNews.com AdSense Readiness, SEO, & Quality Audit

This document outlines the architectural enhancements, SEO corrections, editorial transparency features, AI publishing controls, and AdSense readiness modules for **AnekaNews.com**.

## 1. System Architecture & Component Design

### 1.1 Category Fallback Fix (`src/pages/index.astro`)
- **Problem**: When a category has 0 or few articles, `topHorizontal = channelPosts[0] || remainingPosts[0]` causes Technology articles to spill into Sports, Property, Business, and Lifestyle sections.
- **Solution**: Remove the fallback to `remainingPosts`. Filter `channelPosts` strictly per channel slug. If `channelPosts` is empty, render a clean empty state or omit the section gracefully without repeating articles from other categories.

### 1.2 Image Upload Extension & MIME Handling (`src/pages/api/upload-image.ts` & `/media/[filename].ts`)
- **Problem**: Uploads save all files with `.webp` extension regardless of source MIME type, causing MIME mismatch on serving.
- **Solution**: Infer extension dynamically from file MIME type (`image/jpeg` -> `.jpg`, `image/png` -> `.png`, `image/webp` -> `.webp`). Save with correct extension in R2. Serving endpoint extracts extension and sets matching `Content-Type`.

### 1.3 Hero Image LCP Optimization (`src/layouts/ArticleLayout.astro`)
- **Problem**: Hero image uses `loading="lazy"`, which hurts Largest Contentful Paint (LCP).
- **Solution**: Use `loading="eager"` and `fetchpriority="high"` for the main article hero image. Keep `loading="lazy"` for article card thumbnails.

### 1.4 Editorial Transparency & Author Profile System
- **Authors Data Model** (`src/lib/authors.ts`): Define structured author profiles (ID, name, role, bio, avatar, expertise, social links).
- **Author Route** (`src/pages/penulis/[slug].astro`): Render individual author bio pages with article listing and Schema `Person`.
- **Legal Pages**: Expand `kontak.astro`, `kebijakan-privasi.astro`, `tentang.astro`, `pedoman-media.astro`, `disclaimer.astro`, and add `kebijakan-editorial.astro`.

### 1.5 AI Publishing Workflow Control (`src/lib/automation/pipeline.ts`)
- **Problem**: AI generator advances directly from `ready` to `published` without human approval.
- **Solution**: Set default state of AI generated drafts to `needs_review` or `draft`. Require explicit approval or manual trigger before setting state to `published`.

### 1.6 AdSense Readiness & Consent
- **`ads.txt` Endpoint** (`src/pages/ads.txt.ts`): Serves valid `ads.txt` format populated from `ADSENSE_PUBLISHER_ID` environment variable.
- **AdSense Integration Script** (`src/components/AdSenseScript.astro`): Loads AdSense script conditionally when `ADSENSE_ENABLED === "true"`.
- **Cookie Consent Banner** (`src/components/CookieConsent.astro`): Lightweight UI for user cookie preference management.

---

## 2. Verification Plan

1. **Build & Type Check**: Run `npm run check && npm run test && npm run build`.
2. **Homepage Verification**: Ensure categories display strictly matching articles.
3. **Legal Pages**: Verify no placeholder text remains on `/kontak`, `/kebijakan-privasi`, `/tentang`.
4. **AdSense & SEO**: Test `/sitemap.xml`, `/rss.xml`, `/ads.txt`, `/robots.txt`, and Schema JSON-LD.

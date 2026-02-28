# Stella Mattina Website Rebuild

## What This Is

A modern Next.js website for Stella Mattina, a medical clinic in Dallas. Rebuilt from WordPress to Next.js 15 App Router with an Ask Tia-inspired clean/warm design. 121 static pages covering all doctors, services, locations, blog posts, and static pages — fully optimized for traditional search and AI-powered search (ChatGPT, Perplexity, Google AI Overviews). Shipped as v1.0 on 2026-02-28.

## Core Value

A warm, trustworthy online presence that makes patients feel confident booking with Stella Mattina — whether they find it through Google, ChatGPT, or a recommendation.

## Requirements

### Validated (v1.0)

- ✓ Rebuild all existing SM pages in Next.js — v1.0 (121 static pages)
- ✓ Apply Ask Tia-inspired design: clean minimal layout, warm personal feel — v1.0
- ✓ Use existing SM brand assets: colors, logo, copy, and photography — v1.0
- ✓ Booking CTA links to existing patient portal (external URL) — v1.0
- ✓ SEO-optimized: semantic HTML, meta tags, schema.org, sitemap, robots.txt — v1.0
- ✓ AIO-optimized: content structured for AI search visibility — v1.0
- ✓ Service pages: Gynecology, Obstetrics, Hormone Therapy, and others — v1.0 (10 service pages)
- ✓ Blog with existing posts migrated — v1.0 (61 posts)
- ✓ Doctor Directory page — v1.0 (29 doctors)
- ✓ Locations page — v1.0 (7 locations)
- ✓ Mobile-responsive — v1.0

### Active (v1.1 candidates)

- [ ] Online booking integration (replace external portal link)
- [ ] Real patient testimonials
- [ ] Per-page OG images (custom 1200×630 per service/doctor)
- [ ] Spanish language pages (infrastructure exists: /ginecologo-dallas)
- [ ] Google Business Profile + medical directory listings (Healthgrades, Zocdoc)

### Out of Scope

- Custom booking system v1 — patient portal is external, we only link to it
- New copywriting from scratch — use and edit existing SM copy
- New photography — use existing SM photos from scraped site
- Backend CMS — static/file-based content for v1

## Context

- **Shipped:** stellamattina.com rebuilt as Next.js 15 static site, deployed on Vercel
- **Codebase:** `stella-mattina/` — ~3,806 lines TypeScript/TSX
- **Content source:** 5 JSON files in `stella-mattina/src/data/` (practitioners, services, locations, blog_posts, contact_info)
- **Pages:** 121 static routes — 29 doctor bios, 10 service pages, 61 blog posts, 7 location pages, listings, static pages, homepage
- **Schema.org:** Physician, MedicalClinic, FAQPage, Article, MedicalOrganization, LocalBusiness, BreadcrumbList on all pages
- **Analytics:** Vercel Analytics (HIPAA-safe — no GA4, no Meta Pixel)

## Constraints

- **Tech Stack**: Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui — locked in
- **Brand**: SM colors, logo, copy, and photos — no rebrand
- **Booking**: External patient portal link — no custom scheduling
- **HIPAA**: No GA4, no Meta Pixel, contact form is mailto: only (name/email/message)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js over WordPress | Better SEO control, performance, modern DX | ✓ Correct — 121 static pages, fast build |
| Reuse existing copy | Editable existing SM copy | ✓ Good — content accurate and live |
| External patient portal link | No custom booking needed | ✓ Good — BookingButton works everywhere |
| AIO via schema.org + FAQ content | Structured data for AI search | ✓ Done — all page types have JSON-LD |
| Record<string,unknown> for JSON-LD | schema-dts union types incompatible | ✓ Correct — avoids TypeScript errors |
| No trailing slash | WordPress canonical URL preservation | ✓ Correct — SEO equity preserved |
| ContactForm as mailto: | HIPAA-safe, no PHI stored | ✓ Correct — 3-field form only |
| Content layer from JSON at build time | No runtime CMS needed for v1 | ✓ Good — instant static pages |

---
*Last updated: 2026-02-28 after v1.0 milestone*

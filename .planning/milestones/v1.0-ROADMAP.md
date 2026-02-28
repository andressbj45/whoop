# Roadmap: Stella Mattina Website Rebuild

## Overview

A four-phase rebuild of stellamattina.com from WordPress to Next.js. Phase 1 lays the foundation — scaffolding, content data layer, design system, and HIPAA-safe analytics — so every subsequent page is built on a correct, consistent base. Phase 2 builds every content page (doctors, services, locations, blog, static pages) using detail-first ordering so index pages can summarize real shapes. Phase 3 assembles the homepage last, composing Phase 2 components into the primary patient acquisition surface. Phase 4 hardens the SEO layer — sitemap, robots.txt, canonical URLs, Open Graph — which can only be correct after all routes exist.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Scaffold Next.js project with typed content layer, design tokens, and HIPAA-safe analytics (completed 2026-02-26)
- [x] **Phase 2: Content Pages** - Build all detail, listing, and static pages (doctors, services, blog, locations, contact, careers) (completed 2026-02-26)
- [x] **Phase 3: Homepage** - Assemble homepage by composing Phase 2 component types into the primary patient acquisition surface (completed 2026-02-27)
- [x] **Phase 4: SEO Hardening** - Generate sitemap, robots.txt, canonical URLs, and Open Graph coverage across all routes (completed 2026-02-28)

## Phase Details

### Phase 1: Foundation
**Goal**: The project infrastructure is ready — any content page can be built correctly and consistently
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, DESIGN-01, DESIGN-02, DESIGN-03, DESIGN-04
**Success Criteria** (what must be TRUE):
  1. `next dev` runs without errors and loads a shell page with SM header, footer, and "Book Now" CTA button
  2. SM brand colors, fonts, and spacing are visible in the rendered shell — not default Tailwind styles
  3. The content layer reads practitioners, locations, services, blog posts, and contact info from JSON files with no runtime errors
  4. Plausible or Vercel Analytics loads on every page without Google Analytics or any cookie-consent prompt
  5. The site renders correctly on a 375px mobile screen (no horizontal scroll, no clipped content)
**Plans**: 5 plans

Plans:
- [x] 01-01-PLAN.md — Scaffold Next.js 16 project with all dependencies (FOUND-04)
- [ ] 01-02-PLAN.md — SM brand tokens in globals.css + Plausible analytics in root layout (FOUND-02, FOUND-03, DESIGN-02)
- [ ] 01-03-PLAN.md — Typed content layer: 5 modules reading extracted JSON files (FOUND-01)
- [ ] 01-04-PLAN.md — Layout shell: Header, Footer, PageWrapper, BookingButton + shell homepage (DESIGN-01, DESIGN-03, DESIGN-04)
- [ ] 01-05-PLAN.md — Human verification: brand, mobile responsive, analytics, Book Now CTA (DESIGN-02)

### Phase 2: Content Pages
**Goal**: Every patient-facing content page exists and is viewable with real SM content and correct schema markup
**Depends on**: Phase 1
**Requirements**: ABOUT-01, CONT-01, CONT-02, DOC-01, DOC-02, DOC-03, SERV-01, SERV-02, SERV-03, SEOLP-01, SEOLP-02, BLOG-01, BLOG-02, BLOG-03, LOC-01, LOC-02, LOC-03, CAR-01
**Success Criteria** (what must be TRUE):
  1. Every doctor's bio page loads at `/doctor-directory/[slug]` with photo, credentials, specialties, and a "Book with [Name]" CTA — Physician JSON-LD is present in page source
  2. Every service page loads with the full service description and a visible FAQ section — FAQPage JSON-LD is present in page source
  3. The blog index lists all migrated posts with category filter; each individual post page loads with original content, author byline, and Article JSON-LD
  4. Every location page shows address, phone number, and a directions link — MedicalClinic JSON-LD is present in page source
  5. The contact page contact form accepts name, email, and message only (no PHI fields) and the careers page is reachable
**Plans**: 8 plans

Plans:
- [ ] 02-01-PLAN.md — Data foundations: next.config.ts remotePatterns, faqs.ts, location-addresses.ts, blog category normalization (SERV-02, SERV-03, LOC-03, BLOG-01)
- [ ] 02-02-PLAN.md — Doctor bio detail pages: /doctor-directory/[slug] with Physician JSON-LD (DOC-02, DOC-03)
- [ ] 02-03-PLAN.md — Service pages: 10 top-level routes with FAQPage JSON-LD + providers-bio redirect (SERV-01, SERV-02, SERV-03, SEOLP-01, SEOLP-02)
- [ ] 02-04-PLAN.md — Blog post detail pages: /blog/[slug] with Article JSON-LD and plain-text rendering (BLOG-02, BLOG-03)
- [ ] 02-05-PLAN.md — Location detail pages: /find-our-locations/[slug] with MedicalClinic JSON-LD (LOC-02, LOC-03)
- [ ] 02-06-PLAN.md — Doctor directory listing + blog index with client-side category filter (DOC-01, BLOG-01)
- [ ] 02-07-PLAN.md — Locations listing, About Us, HIPAA-safe contact form, and Careers pages (LOC-01, ABOUT-01, CONT-01, CONT-02, CAR-01)
- [ ] 02-08-PLAN.md — Human verification of all Phase 2 content pages

### Phase 3: Homepage
**Goal**: Patients arriving at the root URL immediately understand what Stella Mattina offers and can book or navigate to any service
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02
**Success Criteria** (what must be TRUE):
  1. The homepage hero shows SM brand photography, a headline, and a working "Book Now" CTA linking to the patient portal
  2. The homepage surfaces service cards, doctor highlights, and a location CTA — all linking to their respective Phase 2 pages
  3. MedicalOrganization and LocalBusiness JSON-LD are present in the homepage source
**Plans**: 1 plan

Plans:
- [ ] 03-01-PLAN.md — Wire real content layer data into homepage + add MedicalOrganization/LocalBusiness JSON-LD and metadata (HOME-01, HOME-02)

### Phase 4: SEO Hardening
**Goal**: Every page is discoverable by search engines and AI crawlers with correct metadata, canonical URLs, and structured sitemaps
**Depends on**: Phase 3
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05
**Success Criteria** (what must be TRUE):
  1. `sitemap.xml` is reachable at `/sitemap.xml` and includes every page URL (doctors, services, locations, blog posts, static pages, homepage)
  2. `robots.txt` is reachable at `/robots.txt` and explicitly allows ChatGPT-User, PerplexityBot, and Googlebot
  3. Every page has a unique `<title>`, `<meta name="description">`, and Open Graph image tag visible in page source
  4. Every non-home page has a BreadcrumbList JSON-LD block and a `<link rel="canonical">` tag pointing to its own URL
**Plans**: 4 plans

Plans:
- [ ] 04-01-PLAN.md — sitemap.ts, robots.ts, metadataBase in root layout, shared OG constant (SEO-01, SEO-02)
- [ ] 04-02-PLAN.md — BreadcrumbJsonLd component + canonical/OG on all 19 static pages (SEO-03, SEO-04, SEO-05)
- [ ] 04-03-PLAN.md — Canonical/OG/breadcrumb on 3 dynamic route pages (doctor, blog, location) (SEO-03, SEO-04, SEO-05)
- [ ] 04-04-PLAN.md — Human verification: sitemap, robots, canonical, OG, BreadcrumbList in browser (SEO-01, SEO-02, SEO-03, SEO-04, SEO-05)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 5/5 | Complete   | 2026-02-26 |
| 2. Content Pages | 7/8 | In Progress|  |
| 3. Homepage | 1/1 | Complete    | 2026-02-27 |
| 4. SEO Hardening | 4/4 | Complete    | 2026-02-28 |

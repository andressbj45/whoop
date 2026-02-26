# Requirements: Stella Mattina Website Rebuild

**Defined:** 2026-02-26
**Core Value:** A warm, trustworthy online presence that makes patients feel confident booking with Stella Mattina — whether they find it through Google, ChatGPT, or a recommendation.

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Content layer module (`src/lib/content/`) reads the 5 extracted JSON files (practitioners, locations, services, blog_posts, contact_info) as the single source of truth
- [ ] **FOUND-02**: SM brand design tokens (colors, fonts, spacing) defined in Tailwind v4 config — extracted from existing WordPress theme
- [ ] **FOUND-03**: HIPAA-safe analytics configured (Plausible or privacy-first solution — no GA4 on medical/service pages)
- [x] **FOUND-04**: Next.js 16.x project scaffolded with App Router, Tailwind v4, shadcn/ui, and schema-dts

### Design System

- [x] **DESIGN-01**: Ask Tia-inspired global layout applied (clean minimal, warm personal feel, generous whitespace)
- [x] **DESIGN-02**: Site is fully mobile-responsive across all page types
- [x] **DESIGN-03**: SM logo displayed in header and footer
- [x] **DESIGN-04**: "Book Now" CTA button present on every page, linking to patient portal

### Home Page

- [ ] **HOME-01**: Homepage built with hero section, services overview, doctor highlights, and location CTA
- [ ] **HOME-02**: MedicalOrganization + LocalBusiness schema.org JSON-LD on homepage

### About Page

- [ ] **ABOUT-01**: About Us page with clinic story, mission, and SM brand photography

### Contact Page

- [ ] **CONT-01**: Contact page with clinic phone numbers, addresses, and inquiry form
- [ ] **CONT-02**: Contact form collects only non-PHI fields (name, email, general inquiry) — HIPAA-safe

### Doctor Directory

- [ ] **DOC-01**: Doctor directory listing page showing all practitioners from practitioners.json
- [x] **DOC-02**: Individual doctor bio pages with photo, credentials, specialties, and "Book with [Name]" CTA
- [x] **DOC-03**: Physician schema.org JSON-LD on each doctor bio page

### Service Pages

- [x] **SERV-01**: All service pages rebuilt from services.json (Gynecology, Obstetrics, Hormone Therapy, Biote Hormone Therapy, and all others in data)
- [x] **SERV-02**: Each service page includes visible FAQ section with Q&A relevant to that service
- [x] **SERV-03**: FAQPage schema.org JSON-LD on every service page

### SEO Landing Pages

- [x] **SEOLP-01**: Existing WordPress SEO landing pages rebuilt at exact same URL paths (e.g. `/gynecologist-dallas`, `/biote-hormone-therapy`, `/hormone-pellet-therapy-dallas`)
- [x] **SEOLP-02**: SEO landing pages include local keyword targeting and FAQ blocks

### Blog

- [x] **BLOG-01**: Blog index page with all posts listed and category filtering
- [x] **BLOG-02**: All existing SM blog posts migrated as individual pages with original content
- [x] **BLOG-03**: Article schema.org JSON-LD on every blog post

### Locations

- [ ] **LOC-01**: Locations listing page with all clinic locations from locations.json
- [ ] **LOC-02**: Individual location detail pages with address, phone, and directions CTA
- [x] **LOC-03**: MedicalClinic schema.org JSON-LD on each location page

### Careers

- [ ] **CAR-01**: Careers page with clinic culture info and application contact

### Site-wide SEO & AIO

- [ ] **SEO-01**: Auto-generated `sitemap.xml` covering all pages
- [ ] **SEO-02**: `robots.txt` configured with AI crawlers allowed (ChatGPT-User, PerplexityBot, etc.)
- [ ] **SEO-03**: Per-page OG images and meta descriptions (title, description) for all page types
- [ ] **SEO-04**: BreadcrumbList JSON-LD on all non-home pages
- [ ] **SEO-05**: Canonical URLs set on all pages to prevent duplicate content

## v2 Requirements

### URL Preservation

- **URL-01**: Full URL audit of existing WordPress site with 301 redirects for any changed paths — critical if any URLs differ from existing WordPress structure

### Content Management

- **CMS-01**: Admin interface for editing clinic content without code changes
- **CMS-02**: Spanish language version of key pages (i18n)

### Enhanced Features

- **ENH-01**: Insurance/accepted plans page
- **ENH-02**: Active job listings feed from ATS system
- **ENH-03**: Patient testimonials / reviews section
- **ENH-04**: Live chat or chatbot

## Out of Scope

| Feature | Reason |
|---------|--------|
| Custom booking system | Patient portal (ecwcloud) already exists — link only |
| New photography | Use existing SM photos from scraped site |
| New copywriting | Use and edit existing SM copy |
| Patient portal / login | External system, not part of this site |
| HIPAA-compliant form storage | Contact form sends non-PHI only; no medical data collected |
| Mobile app | Web-first; mobile app is a separate product decision |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Complete |
| DESIGN-01 | Phase 1 | Complete |
| DESIGN-02 | Phase 1 | Complete |
| DESIGN-03 | Phase 1 | Complete |
| DESIGN-04 | Phase 1 | Complete |
| HOME-01 | Phase 3 | Pending |
| HOME-02 | Phase 3 | Pending |
| ABOUT-01 | Phase 2 | Pending |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| DOC-01 | Phase 2 | Pending |
| DOC-02 | Phase 2 | Complete |
| DOC-03 | Phase 2 | Complete |
| SERV-01 | Phase 2 | Complete |
| SERV-02 | Phase 2 | Complete |
| SERV-03 | Phase 2 | Complete |
| SEOLP-01 | Phase 2 | Complete |
| SEOLP-02 | Phase 2 | Complete |
| BLOG-01 | Phase 2 | Complete |
| BLOG-02 | Phase 2 | Complete |
| BLOG-03 | Phase 2 | Complete |
| LOC-01 | Phase 2 | Pending |
| LOC-02 | Phase 2 | Pending |
| LOC-03 | Phase 2 | Complete |
| CAR-01 | Phase 2 | Pending |
| SEO-01 | Phase 4 | Pending |
| SEO-02 | Phase 4 | Pending |
| SEO-03 | Phase 4 | Pending |
| SEO-04 | Phase 4 | Pending |
| SEO-05 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 33 total
- Mapped to phases: 33/33
- Unmapped: 0

---
*Requirements defined: 2026-02-26*
*Last updated: 2026-02-26 after plan 01-01 — FOUND-04 marked complete*

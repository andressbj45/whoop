# Stella Mattina Website Rebuild

## What This Is

A modern Next.js website for Stella Mattina, a medical clinic. The site rebuilds the existing stellamattina.com with a new design inspired by Ask Tia's clean, minimal, and warm aesthetic — while preserving all existing SM brand assets (colors, logo, copy, and photography). It targets both traditional search engines and AI-powered search (ChatGPT, Perplexity, Google AI Overviews).

## Core Value

A warm, trustworthy online presence that makes patients feel confident booking with Stella Mattina — whether they find it through Google, ChatGPT, or a recommendation.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Rebuild all existing SM pages in Next.js (Home, About Us, Doctor Directory, Locations, Services, Blog, Careers, Contact)
- [ ] Apply Ask Tia-inspired design: clean minimal layout, warm personal feel
- [ ] Use existing SM brand assets: colors, logo, copy (editable), and photography from scraped site
- [ ] Booking CTA links to existing patient portal (external URL)
- [ ] SEO-optimized: semantic HTML, meta tags, structured data (schema.org), sitemap, robots.txt
- [ ] AIO-optimized: content structured for AI search visibility (ChatGPT, Perplexity, Google AI Overviews)
- [ ] Service pages: Gynecology, Obstetrics, Hormone Therapy (Biote, Pellet), and others from existing site
- [ ] Blog with existing posts migrated
- [ ] Doctor Directory page
- [ ] Locations page
- [ ] Mobile-responsive

### Out of Scope

- Custom booking system — patient portal is external, we only link to it
- New copywriting from scratch — use and edit existing SM copy
- New photography — use existing SM photos from scraped site
- Backend CMS for first version — static/file-based content is fine

## Context

- Existing site: WordPress-based stellamattina.com (fully scraped to `scraped-sites/stellamattina/`)
- Design reference: Ask Tia website (scraped to `scraped-sites/asktia/`) — clean minimal layout, warm personal feel
- Brand assets available in scraped data: colors, logo, photography, all copy
- Extracted/processed data in `scraped-sites/output/` and `scraped-sites/stellamattina/extracted/`
- Medical clinic serving patients in Dallas area (gynecology, obstetrics, hormone therapy focus)
- AIO = AI search optimization: structured content so answers appear in ChatGPT, Perplexity, Google AI Overviews

## Constraints

- **Tech Stack**: Next.js — user explicitly selected, good for SEO/performance
- **Brand**: Must use existing SM colors, logo, copy, and photos — no rebrand
- **Design inspiration**: Ask Tia aesthetic (clean minimal + warm) — not a copy, just the vibe
- **Booking**: Link to existing patient portal — no custom scheduling built

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js over WordPress | Better SEO control, performance, modern DX | — Pending |
| Reuse existing copy | User explicitly wants editable but existing SM copy | — Pending |
| External patient portal link | No custom booking needed, portal already exists | — Pending |
| AIO via content structure | Optimizing for AI search with semantic HTML, FAQs, schema.org | — Pending |

---
*Last updated: 2026-02-26 after initialization*

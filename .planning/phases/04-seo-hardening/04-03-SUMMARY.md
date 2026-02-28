---
phase: 04-seo-hardening
plan: "03"
subsystem: seo/dynamic-routes
tags: [seo, metadata, open-graph, breadcrumb, dynamic-routes, next.js]
dependency_graph:
  requires:
    - 04-02 (BreadcrumbJsonLd component, defaultOgImage, static pages pattern)
  provides:
    - Canonical URLs on all 97 dynamic pages (29 doctors + 7 locations + 61 blog posts)
    - OG metadata on all dynamic pages
    - BreadcrumbList JSON-LD on all dynamic pages
  affects:
    - SEO-03 (canonical URLs — now complete across all pages)
    - SEO-04 (OG metadata — now complete across all pages)
    - SEO-05 (BreadcrumbList JSON-LD — now complete across all pages)
tech_stack:
  added: []
  patterns:
    - generateMetadata returns alternates.canonical + openGraph with images for slug-specific pages
    - BreadcrumbJsonLd rendered as first child in page component root container
    - Not-found paths return minimal metadata (title only, no canonical or OG)
    - Blog posts use type:'article' in openGraph; other pages use type:'website'
key_files:
  created: []
  modified:
    - stella-mattina/src/app/doctor-directory/[slug]/page.tsx
    - stella-mattina/src/app/blog/[slug]/page.tsx
    - stella-mattina/src/app/find-our-locations/[slug]/page.tsx
decisions:
  - "[04-03]: Doctor bio pages use bio.slice(0,155) as OG description with fallback to constructed string — matches generateMetadata description field"
  - "[04-03]: Blog posts use type:'article' in openGraph — correct OG type for blog content, enables richer social sharing previews"
  - "[04-03]: Location pages deduplicate description by extracting to const before use in metadata and openGraph — single source of truth"
metrics:
  duration: 2min
  completed_date: 2026-02-27
  tasks_completed: 2
  files_modified: 3
---

# Phase 4 Plan 03: Dynamic Route SEO Metadata Summary

Canonical URLs, Open Graph metadata, and BreadcrumbList JSON-LD added to all three dynamic route page types — completing SEO coverage for the remaining 97 pages (29 doctors + 7 locations + 61 blog posts).

## What Was Built

### Task 1: Doctor bio and location detail pages (commit: 20567b7)

**`stella-mattina/src/app/doctor-directory/[slug]/page.tsx`**
- Added `import { defaultOgImage } from '@/lib/seo/og'`
- Added `import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'`
- `generateMetadata` now returns `alternates.canonical` and `openGraph` (title, description, url, type:'website', images:[defaultOgImage])
- Page component renders `BreadcrumbJsonLd` with 3-item breadcrumb: Home > Doctor Directory > doctor name
- Not-found case returns only `{ title: 'Doctor Not Found | Stella Mattina' }` — no canonical or OG

**`stella-mattina/src/app/find-our-locations/[slug]/page.tsx`**
- Added same imports as doctor page
- `generateMetadata` returns `alternates.canonical` and `openGraph` (type:'website') with location-specific values
- Page component renders `BreadcrumbJsonLd` with 3-item breadcrumb: Home > Locations > location name
- Not-found case returns only `{ title: 'Location Not Found | Stella Mattina' }` — no canonical or OG

### Task 2: Blog post page (commit: 17e0c0e)

**`stella-mattina/src/app/blog/[slug]/page.tsx`**
- Added `import { defaultOgImage } from '@/lib/seo/og'`
- Added `import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'`
- `generateMetadata` extracts title and description to consts, reuses them in both page metadata and `openGraph`
- `openGraph` uses `type: 'article'` (not 'website') — correct OG type for blog content
- Page component renders `BreadcrumbJsonLd` with 3-item breadcrumb: Home > Blog > post heading
- Not-found case returns only `{ title: 'Post Not Found | Stella Mattina' }` — no canonical or OG

## Verification

- TypeScript: `npx tsc --noEmit` — no errors
- All three files use `generateMetadata` (not `export const metadata`) — no Next.js build conflict

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- FOUND: stella-mattina/src/app/doctor-directory/[slug]/page.tsx
- FOUND: stella-mattina/src/app/blog/[slug]/page.tsx
- FOUND: stella-mattina/src/app/find-our-locations/[slug]/page.tsx
- FOUND: .planning/phases/04-seo-hardening/04-03-SUMMARY.md
- FOUND: commit 20567b7 (Task 1)
- FOUND: commit 17e0c0e (Task 2)

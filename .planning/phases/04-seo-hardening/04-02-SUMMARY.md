---
phase: 04-seo-hardening
plan: "02"
subsystem: seo-metadata
tags: [seo, canonical, open-graph, breadcrumb, json-ld, schema.org, server-component]
dependency_graph:
  requires:
    - 04-01  # metadataBase, defaultOgImage, sitemap, robots
  provides:
    - canonical URLs on all 19 static pages
    - Open Graph metadata on all 19 static pages
    - BreadcrumbList JSON-LD on all 18 non-home static pages
  affects:
    - All static page routes in stella-mattina/src/app/
tech_stack:
  added:
    - stella-mattina/src/components/seo/BreadcrumbJsonLd.tsx (new Server Component)
  patterns:
    - Next.js Metadata API (alternates.canonical, openGraph)
    - BreadcrumbList JSON-LD via dangerouslySetInnerHTML script tag
    - Record<string,unknown> for JSON-LD (avoids schema-dts union type conflicts)
key_files:
  created:
    - stella-mattina/src/components/seo/BreadcrumbJsonLd.tsx
  modified:
    - stella-mattina/src/app/page.tsx
    - stella-mattina/src/app/about-us/page.tsx
    - stella-mattina/src/app/contact-us/page.tsx
    - stella-mattina/src/app/careers/page.tsx
    - stella-mattina/src/app/blog/page.tsx
    - stella-mattina/src/app/doctor-directory/page.tsx
    - stella-mattina/src/app/find-our-locations/page.tsx
    - stella-mattina/src/app/services/page.tsx
    - stella-mattina/src/app/patient-information/page.tsx
    - stella-mattina/src/app/gynecology/page.tsx
    - stella-mattina/src/app/biote-hormone-therapy/page.tsx
    - stella-mattina/src/app/gynecologist-dallas/page.tsx
    - stella-mattina/src/app/hormone-pellet-therapy-dallas/page.tsx
    - stella-mattina/src/app/prenatal-care-near-me/page.tsx
    - stella-mattina/src/app/primary-care-physician-dallas/page.tsx
    - stella-mattina/src/app/maternal-fetal-medicine/page.tsx
    - stella-mattina/src/app/ginecologo-dallas/page.tsx
    - stella-mattina/src/app/womens-health/page.tsx
decisions:
  - "BreadcrumbJsonLd uses Record<string,unknown> consistent with all other JSON-LD in the project — avoids schema-dts union type issues"
  - "Homepage gets canonical + OG but NO BreadcrumbJsonLd — single-item BreadcrumbList is schema.org non-compliant"
  - "gynecology and biote-hormone-therapy use 3-item breadcrumb (Home > Services > Page) — they are service sub-pages"
  - "All openGraph blocks include images:[defaultOgImage] — Next.js shallow-merges openGraph, child overrides drop root layout OG image if images is omitted"
metrics:
  duration: 4min
  completed: 2026-02-27
  tasks_completed: 2
  files_modified: 19
---

# Phase 4 Plan 02: Canonical URLs, Open Graph, and BreadcrumbList JSON-LD Summary

**One-liner:** Canonical URLs, Open Graph metadata with shared OG image, and BreadcrumbList JSON-LD added to all 19 static pages via a new reusable BreadcrumbJsonLd Server Component.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create BreadcrumbJsonLd Server Component | 4cb2d02 | stella-mattina/src/components/seo/BreadcrumbJsonLd.tsx (created) |
| 2 | Add canonical, OG, and breadcrumb to all static pages | 59a36f2 | 18 page files modified |

## What Was Built

**BreadcrumbJsonLd Server Component** (`stella-mattina/src/components/seo/BreadcrumbJsonLd.tsx`):
- Pure Server Component (no `use client` directive)
- Accepts `items: BreadcrumbItem[]` where `BreadcrumbItem = { name: string; url: string }`
- Renders schema.org BreadcrumbList JSON-LD via a `<script type="application/ld+json">` tag
- Uses `Record<string, unknown>` consistent with all other JSON-LD in the codebase

**Metadata updates across 19 pages:**
- `alternates: { canonical: '/[path]' }` — resolves to absolute URL via `metadataBase` added in Plan 01
- `openGraph: { title, description, url, type: 'website', images: [defaultOgImage] }` — shared OG image ensures rich sharing previews on all pages
- `BreadcrumbJsonLd` rendered as first child inside `<PageWrapper>` on all 18 non-home pages

**Breadcrumb hierarchy:**
- 2-item (Home > Page): about-us, contact-us, careers, blog, doctor-directory, find-our-locations, services, patient-information, gynecologist-dallas, hormone-pellet-therapy-dallas, prenatal-care-near-me, primary-care-physician-dallas, maternal-fetal-medicine, ginecologo-dallas, womens-health
- 3-item (Home > Services > Page): gynecology, biote-hormone-therapy (sub-pages of the services index)
- Homepage: NO breadcrumb (single-item BreadcrumbList is schema.org non-compliant)

## Decisions Made

1. **BreadcrumbJsonLd uses `Record<string,unknown>`** — Consistent with all other JSON-LD in the project. schema-dts BreadcrumbList union types cause TypeScript errors with custom values; `Record<string,unknown>` avoids this without sacrificing runtime correctness.

2. **Homepage gets canonical + OG but NO BreadcrumbJsonLd** — A BreadcrumbList requires at least 2 ListItems per schema.org. The homepage would only have "Home" — a single-item BreadcrumbList is invalid.

3. **`images: [defaultOgImage]` required in every `openGraph` block** — Next.js does a shallow merge of `openGraph` objects. If a child page sets any `openGraph` field without including `images`, the root layout's OG image is dropped entirely. Every page's `openGraph` block explicitly re-includes `images: [defaultOgImage]`.

4. **gynecology and biote-hormone-therapy use 3-item breadcrumbs** — These are clearly sub-pages of the Services section and appear linked from the /services index. The 3-item chain (Home > Services > Page) reflects the actual site hierarchy.

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- TypeScript: `npx tsc --noEmit` passes with 0 errors after both tasks
- BreadcrumbJsonLd.tsx: confirmed no `use client` directive, exports named `BreadcrumbJsonLd`, accepts `items` prop of `BreadcrumbItem[]`
- All 19 static pages: `alternates.canonical` and `openGraph` with `images: [defaultOgImage]` present
- All 18 non-home static pages: `BreadcrumbJsonLd` imported and rendered in page component

## Self-Check: PASSED

Files verified present:
- `stella-mattina/src/components/seo/BreadcrumbJsonLd.tsx` — FOUND
- `stella-mattina/src/app/about-us/page.tsx` — FOUND (contains alternates, openGraph, BreadcrumbJsonLd)
- `stella-mattina/src/app/page.tsx` — FOUND (contains alternates, openGraph, no BreadcrumbJsonLd)

Commits verified:
- 4cb2d02 — FOUND (BreadcrumbJsonLd Server Component)
- 59a36f2 — FOUND (19 pages updated with canonical + OG + breadcrumb)

---
phase: 04-seo-hardening
plan: "01"
subsystem: seo
tags: [next.js, sitemap, robots, metadata, og-image, seo, crawlability]

# Dependency graph
requires:
  - phase: 02-content-pages
    provides: content layer (getPractitioners, getBlogPosts, getLocations, getServices) used to generate dynamic sitemap URLs
  - phase: 03-homepage
    provides: root layout baseline that metadataBase is added to

provides:
  - sitemap.ts covering all 119+ page URLs (static, SEO landing pages, doctors, blog, locations, services)
  - robots.ts explicitly allowing all major AI crawlers (ChatGPT-User, GPTBot, OAI-SearchBot, PerplexityBot, Perplexity-User, Googlebot, Google-Extended)
  - metadataBase: new URL('https://stellamattina.com') in root layout resolving all relative canonical/OG paths
  - defaultOgImage constant at @/lib/seo/og exportable by Plans 02 and 03 for page-level OG metadata

affects:
  - 04-02-PLAN.md (page-level metadata — needs defaultOgImage import)
  - 04-03-PLAN.md (service/location page metadata — needs defaultOgImage import)
  - 04-04-PLAN.md (BreadcrumbList JSON-LD — benefits from metadataBase being set)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Next.js built-in file convention for sitemap.ts (MetadataRoute.Sitemap) — zero external dependencies
    - Next.js built-in file convention for robots.ts (MetadataRoute.Robots) — programmatic, TypeScript type-safe
    - Shared constant module at @/lib/seo/og.ts to avoid duplication across page metadata files

key-files:
  created:
    - stella-mattina/src/app/sitemap.ts
    - stella-mattina/src/app/robots.ts
    - stella-mattina/src/lib/seo/og.ts
  modified:
    - stella-mattina/src/app/layout.tsx

key-decisions:
  - "sitemap.ts filters providers-bio from serviceUrls — that route is a server-side redirect to /doctor-directory, not a real page"
  - "robots.ts uses per-agent rules array (not wildcard-only) to make AI crawler intent explicit in the file"
  - "defaultOgImage uses hero-doctor-consultation.jpg (1200x800) — not ideal 1200x630 OG crop, proper crop is v2 task"
  - "openGraph block in root layout uses shallow merge — child pages setting any openGraph field must re-include images: [defaultOgImage]"

patterns-established:
  - "Shared SEO constants in @/lib/seo/*.ts — importable by any page metadata export"
  - "sitemap.ts uses content layer functions (getPractitioners, etc.) directly — dynamic URLs always in sync with data"

requirements-completed: [SEO-01, SEO-02]

# Metrics
duration: 1min
completed: 2026-02-28
---

# Phase 04 Plan 01: SEO Foundation Summary

**Next.js sitemap.ts + robots.ts with AI crawler rules, metadataBase in root layout, and shared defaultOgImage constant enabling all subsequent page-level SEO metadata**

## Performance

- **Duration:** 1 min
- **Started:** 2026-02-28T00:43:05Z
- **Completed:** 2026-02-28T00:44:25Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Created sitemap.ts covering all 119+ page URLs across 6 categories: static pages, 8 SEO landing pages, doctor directory, blog, locations, and services (with providers-bio filtered out)
- Created robots.ts explicitly naming and granting allow: '/' to all major AI crawlers (ChatGPT-User, GPTBot, OAI-SearchBot, PerplexityBot, Perplexity-User) plus Googlebot and Google-Extended
- Added metadataBase to root layout so all relative canonical and OG paths now resolve to stellamattina.com
- Created @/lib/seo/og.ts with defaultOgImage constant that Plans 02 and 03 will import for page-level OG metadata

## Task Commits

Each task was committed atomically:

1. **Task 1: Create sitemap.ts and robots.ts** - `3c45999` (feat)
2. **Task 2: Add metadataBase to root layout and create shared OG constant** - `6dd6f62` (feat)

## Files Created/Modified

- `stella-mattina/src/app/sitemap.ts` - MetadataRoute.Sitemap covering all route categories; filters providers-bio redirect; uses content layer functions
- `stella-mattina/src/app/robots.ts` - MetadataRoute.Robots with explicit per-agent allow rules for AI crawlers + sitemap reference
- `stella-mattina/src/lib/seo/og.ts` - Shared defaultOgImage constant (hero-doctor-consultation.jpg, 1200x800, with alt text)
- `stella-mattina/src/app/layout.tsx` - Added metadataBase, openGraph block, and import of defaultOgImage

## Decisions Made

- Filtered providers-bio from sitemap serviceUrls — it is a redirect, not a destination page; including it would add a redirect entry to the sitemap
- Used per-agent rules array in robots.ts (not a single wildcard rule) to make AI crawler intent explicit and auditable
- Used hero-doctor-consultation.jpg as defaultOgImage — only wide-format image in public/images/; proper 1200x630 OG crop is a future v2 task
- Noted Next.js shallow OG merge behavior in og.ts comments and layout — child pages that set any openGraph field must re-include images: [defaultOgImage]

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- sitemap.ts and robots.ts are live and TypeScript-clean
- metadataBase is set — all relative OG and canonical paths will now resolve correctly
- defaultOgImage is importable from @/lib/seo/og — Plans 02 and 03 can proceed immediately
- TypeScript clean (tsc --noEmit passes with zero errors)

## Self-Check: PASSED

- FOUND: stella-mattina/src/app/sitemap.ts
- FOUND: stella-mattina/src/app/robots.ts
- FOUND: stella-mattina/src/lib/seo/og.ts
- FOUND: .planning/phases/04-seo-hardening/04-01-SUMMARY.md
- FOUND commit: 3c45999
- FOUND commit: 6dd6f62

---
*Phase: 04-seo-hardening*
*Completed: 2026-02-28*

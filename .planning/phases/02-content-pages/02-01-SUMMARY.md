---
phase: 02-content-pages
plan: "01"
subsystem: data
tags: [nextjs, typescript, faqs, blog, images, locations]

requires:
  - phase: 01-foundation
    provides: Content layer JSON data files, typed content modules, and Next.js project scaffold

provides:
  - next.config.ts with images.remotePatterns allowing stellamattina.com practitioner photos
  - src/data/location-addresses.ts with PostalAddressData interface and LOCATION_ADDRESSES for all 7 clinic slugs
  - src/data/faqs.ts with FAQ interface, SERVICE_FAQS for 9 services (3-5 Q&A each), and getFaqsForService() accessor
  - src/lib/content/blog.ts with normalizeCategories() helper and corrected getBlogCategories()/getBlogPostsByCategory()

affects:
  - 02-02 service pages (getFaqsForService used in service page components)
  - 02-04 location pages (LOCATION_ADDRESSES used in location detail JSON-LD)
  - 02-07 blog pages (getBlogCategories/getBlogPostsByCategory used in blog index/filter)
  - any page using next/image for practitioner photos

tech-stack:
  added: []
  patterns:
    - "Data module pattern: typed data files in src/data/ with named exports and accessor functions (getFaqsForService, LOCATION_ADDRESSES)"
    - "normalizeCategories helper: handles heterogeneous category arrays (string | object) from JSON CMS export"

key-files:
  created:
    - stella-mattina/src/data/faqs.ts
    - stella-mattina/src/data/location-addresses.ts
  modified:
    - stella-mattina/next.config.ts
    - stella-mattina/src/lib/content/blog.ts

key-decisions:
  - "FAQ content written with Stella Mattina's warm patient-friendly tone — 3-5 pairs per service, medically accurate but not clinical"
  - "normalizeCategories uses unknown[] input type with runtime typeof checks to safely handle malformed blog_posts.json entries without modifying source JSON"
  - "location-addresses.ts designed as an easily-updatable lookup table: no page component changes needed when addresses are verified against live site"

patterns-established:
  - "Accessor functions (getFaqsForService, normalizeCategories) handle all data coercion internally — page components receive clean typed data"

requirements-completed: [SERV-02, SERV-03, LOC-03, BLOG-01]

duration: 6min
completed: 2026-02-26
---

# Phase 2 Plan 01: Data Layer Fixes Summary

**Four blocking data layer issues fixed: remotePatterns for practitioner photos, 9-service FAQ module, 7-location postal address registry, and blog category malformed-object normalization**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-26T22:26:35Z
- **Completed:** 2026-02-26T22:32:30Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- next.config.ts updated with images.remotePatterns so next/image can render practitioner photos hosted at stellamattina.com/wp-content/uploads
- Created src/data/location-addresses.ts with PostalAddressData interface and LOCATION_ADDRESSES record for all 7 clinic location slugs — unlocks schema.org PostalAddress in location page JSON-LD
- Created src/data/faqs.ts with FAQ interface, SERVICE_FAQS covering all 9 content service slugs (womens-health, gynecology, prenatal-care-near-me, maternal-fetal-medicine, biote-hormone-therapy, hormone-pellet-therapy-dallas, gynecologist-dallas, ginecologo-dallas, primary-care-physician-dallas), and getFaqsForService() accessor
- Fixed getBlogCategories() and getBlogPostsByCategory() in blog.ts to use normalizeCategories() helper, eliminating [object Object] display from malformed blog_posts.json category entries

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix next.config.ts remotePatterns and create location-addresses.ts** - `bcd2987` (feat)
2. **Task 2: Create faqs.ts module and fix blog category normalization** - `bf9afd8` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified
- `stella-mattina/next.config.ts` - Added images.remotePatterns for stellamattina.com/wp-content/uploads/**
- `stella-mattina/src/data/location-addresses.ts` - New: PostalAddressData interface + LOCATION_ADDRESSES record for 7 clinic slugs
- `stella-mattina/src/data/faqs.ts` - New: FAQ interface, SERVICE_FAQS for 9 services, getFaqsForService() accessor
- `stella-mattina/src/lib/content/blog.ts` - Added normalizeCategories() helper; updated getBlogCategories() and getBlogPostsByCategory() to use it

## Decisions Made
- FAQ content written in Stella Mattina's warm, patient-friendly tone — 3-5 medically accurate Q&A pairs per service, including bilingual (Spanish/English) pairs for `ginecologo-dallas`
- normalizeCategories uses `unknown[]` input with runtime `typeof` checks to safely handle the malformed blog_posts.json entries without touching source JSON
- location-addresses.ts structured as a standalone lookup table: when real addresses are verified against the live site, only this one file needs updating — no changes to page components

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All four blocking data layer dependencies are resolved
- getFaqsForService(slug) is ready to be called from service page components (02-02)
- LOCATION_ADDRESSES is ready for location detail page JSON-LD (02-04)
- getBlogCategories() returns clean string arrays — ready for blog index/filter UI (02-07)
- next/image will render practitioner photos without runtime error once doctor pages are built (02-03)

---
*Phase: 02-content-pages*
*Completed: 2026-02-26*

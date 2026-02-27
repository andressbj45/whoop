---
phase: 03-homepage
plan: "01"
subsystem: ui
tags: [next.js, server-components, json-ld, schema.org, content-layer]

# Dependency graph
requires:
  - phase: 02-content-pages
    provides: Content layer (getPractitioners, getLocations), /find-our-locations/[slug] routes, /doctor-directory routes
  - phase: 01-foundation
    provides: Next.js project with remotePatterns configured for stellamattina.com WordPress CDN
provides:
  - Homepage wired to real practitioner and location data from JSON content layer
  - MedicalOrganization + LocalBusiness JSON-LD structured data on homepage
  - Homepage-specific metadata (title + description) distinct from root layout defaults
  - Correct /find-our-locations/[slug] hrefs on location cards (replacing broken /our-locations/ prefix)
affects: [04-seo, 05-launch]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component homepage using synchronous content layer calls (no async/await needed)
    - Record<string,unknown> for JSON-LD type (avoids schema-dts union type conflicts)
    - JSON-LD script tag as first child of PageWrapper for DOM ordering

key-files:
  created: []
  modified:
    - stella-mattina/src/app/page.tsx

key-decisions:
  - "Homepage remains a pure Server Component — no use client directive added"
  - "JSON-LD uses Record<string,unknown> consistent with all Phase 2 page decisions"
  - "Location cards use loc.name (full verbose) as heading with static Dallas-Fort Worth, TX subtitle — Location type has no separate city field"

patterns-established:
  - "Homepage data pattern: synchronous getPractitioners()/getLocations() calls inside Server Component function body, slice for featured subsets"
  - "JSON-LD injection: const jsonLd at module level, script tag as first PageWrapper child"

requirements-completed: [HOME-01, HOME-02]

# Metrics
duration: 2min
completed: 2026-02-27
---

# Phase 3 Plan 01: Homepage Data Wiring + JSON-LD Summary

**Homepage wired to real practitioner/location JSON content layer with MedicalOrganization+LocalBusiness JSON-LD and homepage-specific metadata**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-27T22:36:03Z
- **Completed:** 2026-02-27T22:38:00Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Replaced 6-item hardcoded PROVIDERS array with getPractitioners().slice(0, 6) using remote photo_url from WordPress CDN
- Replaced 5-item hardcoded LOCATIONS array with getLocations().slice(0, 5) fixing broken /our-locations/ hrefs to /find-our-locations/${loc.slug}
- Added MedicalOrganization + LocalBusiness JSON-LD structured data as first PageWrapper child
- Added homepage-specific metadata export (title and description distinct from root layout)

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace hardcoded PROVIDERS and LOCATIONS arrays with real content layer data** - `9dbb98c` (feat)
2. **Task 2: Add homepage metadata export and MedicalOrganization + LocalBusiness JSON-LD** - `693be2c` (feat)

## Files Created/Modified
- `stella-mattina/src/app/page.tsx` - Homepage wired to real data, metadata export added, JSON-LD injected

## Decisions Made
- Homepage remains a pure Server Component — getPractitioners() and getLocations() are synchronous (JSON imported at module level), no async/await needed
- JSON-LD uses Record<string,unknown> consistent with all Phase 2 page decisions (avoids schema-dts union type conflicts)
- Location cards display loc.name as the heading with static "Dallas-Fort Worth, TX" subtitle since Location type has no separate city field

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Homepage fully data-driven for practitioners and locations
- MedicalOrganization JSON-LD satisfies HOME-02 structured data requirement
- Homepage metadata satisfies HOME-01 SEO requirement
- Ready for Phase 4 (SEO) or Phase 5 (Launch)

---
*Phase: 03-homepage*
*Completed: 2026-02-27*

## Self-Check: PASSED

- FOUND: stella-mattina/src/app/page.tsx
- FOUND: .planning/phases/03-homepage/03-01-SUMMARY.md
- FOUND commit 9dbb98c: feat(03-01): wire homepage to real content layer data
- FOUND commit 693be2c: feat(03-01): add homepage metadata and MedicalOrganization JSON-LD

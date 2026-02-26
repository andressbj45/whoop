---
phase: 02-content-pages
plan: "05"
subsystem: ui
tags: [nextjs, ssg, schema-org, json-ld, local-seo, tailwind]

# Dependency graph
requires:
  - phase: 02-01
    provides: location-addresses.ts lookup table with PostalAddressData for all 7 slugs
  - phase: 01-foundation
    provides: locations.ts with getLocations/getLocationWithProviders, PageWrapper, BookingButton

provides:
  - Dynamic location detail page at /find-our-locations/[slug]
  - 7 statically generated clinic location pages (SSG)
  - MedicalClinic JSON-LD with PostalAddress for local SEO rich results
  - Directions link to Google Maps pre-filled with clinic address

affects: [phase-03-seo, phase-04-polish, local-search-features]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "MedicalClinic JSON-LD uses Record<string,unknown> (not schema-dts MedicalClinic union type)"
    - "Next.js 15 async params: Promise<{ slug: string }> awaited in both generateMetadata and page"
    - "LOCATION_ADDRESSES[slug] lookup for optional address — defensive null-check prevents crash"

key-files:
  created:
    - stella-mattina/src/app/find-our-locations/[slug]/page.tsx
  modified: []

key-decisions:
  - "Used Record<string,unknown> for MedicalClinic JSON-LD because schema-dts MedicalClinic resolves to MedicalClinicLeaf | CovidTestingFacility | string union type which is incompatible with WithContext<T extends Thing> — consistent with existing Physician JSON-LD pattern in doctor-directory page"
  - "Address lookup is defensive: LOCATION_ADDRESSES[slug] ?? undefined — falls back to generic directions link if address missing"

patterns-established:
  - "Location detail page: SSG via getLocations() generateStaticParams + getLocationWithProviders() for provider hydration"
  - "JSON-LD injection: <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> inside PageWrapper"

requirements-completed: [LOC-02, LOC-03]

# Metrics
duration: 2min
completed: 2026-02-26
---

# Phase 2 Plan 05: Location Detail Pages Summary

**Statically generated location detail pages for all 7 Stella Mattina clinics with MedicalClinic JSON-LD, PostalAddress, Google Maps directions, and practitioner list**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-26T23:51:15Z
- **Completed:** 2026-02-26T23:53:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Built `/find-our-locations/[slug]/page.tsx` with SSG via `generateStaticParams` — all 7 clinic routes prerendered at build time
- MedicalClinic JSON-LD with `@type: PostalAddress` injected in page source for Google local rich results eligibility
- Google Maps directions link using Maps Search API (no API key required) pre-filled with full clinic address
- Practitioners list at each location links to `/doctor-directory/[slug]` via `getLocationWithProviders()`
- BookingButton CTA renders at page bottom for conversion

## Task Commits

Each task was committed atomically:

1. **Task 1: Build location detail page with MedicalClinic JSON-LD** - `1611b0e` (feat)

**Plan metadata:** (docs commit below)

## Files Created/Modified
- `stella-mattina/src/app/find-our-locations/[slug]/page.tsx` - Location detail page: SSG, MedicalClinic JSON-LD with PostalAddress, directions link, providers list, BookingButton

## Decisions Made
- Used `Record<string, unknown>` for MedicalClinic JSON-LD instead of the plan-specified `MedicalClinic` from schema-dts. The `MedicalClinic` type in schema-dts resolves to a union type (`MedicalClinicLeaf | CovidTestingFacility | string`) which is incompatible with `WithContext<T extends Thing>`. This is consistent with the existing `Physician` JSON-LD pattern in `doctor-directory/[slug]/page.tsx` and the STATE.md decision "[Phase 02-content-pages]: schema-dts MedicalSpecialty is strict enum — use Record<string,unknown> for jsonLd when custom specialty strings conflict with type". The output JSON-LD is valid schema.org markup.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Used Record<string,unknown> instead of MedicalClinic from schema-dts**
- **Found during:** Task 1 (Build location detail page)
- **Issue:** Plan specified `const jsonLd: MedicalClinic` but schema-dts `MedicalClinic` is a union type (`MedicalClinicLeaf | CovidTestingFacility | string`) incompatible with `WithContext<T extends Thing>`. Direct use without `@context` causes TypeScript errors since bare `MedicalClinicLeaf` doesn't include `@context`.
- **Fix:** Used `Record<string, unknown>` consistent with existing `doctor-directory/[slug]/page.tsx` pattern
- **Files modified:** stella-mattina/src/app/find-our-locations/[slug]/page.tsx
- **Verification:** npm run build exits 0, TypeScript check passes
- **Committed in:** 1611b0e (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 type compatibility bug)
**Impact on plan:** Minimal — only the TypeScript type annotation changed. The emitted JSON-LD is identical to what the plan specified. Output is valid schema.org MedicalClinic markup.

## Issues Encountered
None — build succeeded on first attempt.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 7 location detail pages are live at `/find-our-locations/[slug]`
- MedicalClinic JSON-LD with PostalAddress ready for Google Search Console verification
- Practitioners list on each location page provides cross-links to doctor directory
- Ready for Phase 3 (SEO/sitemap) — location pages will be included in sitemap generation

---
*Phase: 02-content-pages*
*Completed: 2026-02-26*

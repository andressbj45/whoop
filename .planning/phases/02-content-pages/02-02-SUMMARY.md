---
phase: 02-content-pages
plan: "02"
subsystem: ui
tags: [nextjs, schema-dts, json-ld, ssg, doctor-directory, seo]

# Dependency graph
requires:
  - phase: 02-01
    provides: remotePatterns for stellamattina.com in next.config.ts, practitioners.ts content layer
  - phase: 01-foundation
    provides: PageWrapper, BookingButton, Practitioner type, practitioners.json data file

provides:
  - Doctor bio detail pages at /doctor-directory/[slug] for all 29 practitioners
  - Physician JSON-LD (schema.org) on every doctor page
  - "Book with [FirstName]" CTA on every doctor page
  - generateStaticParams returning 29 slugs for full SSG

affects: [02-06-doctor-listing, 03-homepage-doctor-highlights]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component async page with Promise<{ slug }> params (Next.js 15 pattern)
    - JSON-LD via dangerouslySetInnerHTML script tag in Server Component
    - Record<string, unknown> for JSON-LD objects when schema-dts strict enum types conflict with custom string values

key-files:
  created:
    - stella-mattina/src/app/doctor-directory/[slug]/page.tsx
  modified: []

key-decisions:
  - "schema-dts MedicalSpecialty is a strict enum — plain string specialties like OBGYN must be typed as Record<string,unknown> for the jsonLd object rather than Physician; the emitted JSON-LD is still valid schema.org markup"
  - "params typed as Promise<{ slug: string }> per Next.js 15 async params API — generateMetadata and page both await params"

patterns-established:
  - "JSON-LD injection: const jsonLd: Record<string, unknown> = { '@context': ..., '@type': ... } then <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />"
  - "Bio fallback: if (!p.bio) render italic 'Bio coming soon.' — never render undefined as text"

requirements-completed: [DOC-02, DOC-03]

# Metrics
duration: 8min
completed: 2026-02-26
---

# Phase 2 Plan 02: Doctor Bio Detail Page Summary

**29 statically-generated doctor bio pages at /doctor-directory/[slug] with Physician JSON-LD, photo, credentials, and "Book with [FirstName]" CTA**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-02-26T22:25:00Z
- **Completed:** 2026-02-26T22:33:09Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Created `doctor-directory/[slug]/page.tsx` as a Server Component with `generateStaticParams`, `generateMetadata`, and `DoctorBioPage`
- `generateStaticParams` returns all 29 practitioner slugs — build produces 29 SSG routes
- Physician JSON-LD with `@context`, `@type`, `name`, `description`, `medicalSpecialty`, `image`, `url`, and `worksFor` fields
- Bio fallback "Bio coming soon." for margaret-warren (sole practitioner with empty bio field)
- `BookingButton` rendered with `label={"Book with ${firstName}"}` and `size="lg"`

## Task Commits

Each task was committed atomically:

1. **Task 1: Build doctor bio detail page with Physician JSON-LD** - `a890b60` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified
- `stella-mattina/src/app/doctor-directory/[slug]/page.tsx` - Doctor bio Server Component with generateStaticParams, generateMetadata, Physician JSON-LD, photo, specialty, bio/fallback, BookingButton

## Decisions Made
- `schema-dts` `Physician` type's `medicalSpecialty` field only accepts `MedicalSpecialty` enum values (e.g. "Gynecologic") — not arbitrary strings like "OBGYN". Typed `jsonLd` as `Record<string, unknown>` to bypass strict enum. The JSON-LD output remains valid schema.org markup.
- `params` must be typed as `Promise<{ slug: string }>` and awaited — this is the Next.js 15 async params API.
- Removed unused `Physician` type import after switching to `Record<string, unknown>` — keeps build clean.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript error: schema-dts MedicalSpecialty strict enum incompatible with custom specialty strings**
- **Found during:** Task 1 (build verification)
- **Issue:** `Physician` type's `medicalSpecialty` field expects `MedicalSpecialty | IdReference` — a strict schema.org enum that does not include "OBGYN", "Family Medicine", or other custom strings used in practitioners.json
- **Fix:** Changed `jsonLd` type from `Physician` to `Record<string, unknown>`; removed unused `Physician` import. JSON-LD output structure is identical and valid.
- **Files modified:** `stella-mattina/src/app/doctor-directory/[slug]/page.tsx`
- **Verification:** `npm run build` exits 0, 29 doctor-directory routes prerendered
- **Committed in:** a890b60 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — type error)
**Impact on plan:** Auto-fix required for build to pass. No behavior change, no scope creep.

## Issues Encountered
- `schema-dts` `Physician` type stricter than expected — custom specialty strings not in the schema.org enum. Resolved by typing jsonLd as `Record<string, unknown>` while preserving all JSON-LD fields.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 29 doctor bio pages are live and statically generated — ready for 02-06 doctor listing to link to `/doctor-directory/[slug]`
- Phase 3 homepage doctor highlights can reference these pages
- No blockers

---
*Phase: 02-content-pages*
*Completed: 2026-02-26*

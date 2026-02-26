---
phase: 02-content-pages
plan: "03"
subsystem: ui
tags: [next.js, schema-dts, faq, seo, service-pages, json-ld]

# Dependency graph
requires:
  - phase: 02-content-pages
    provides: faqs.ts module with getFaqsForService(), services.ts content layer with getServiceBySlug()

provides:
  - ServiceFaqSection Server Component (details/summary accordion, no JS)
  - 10 service page routes at exact WordPress URL paths with FAQPage JSON-LD
  - /providers-bio redirect to /doctor-directory (preserves SEO equity)

affects:
  - 03-location-pages
  - 04-technical-seo

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Static service page pattern with module-level getServiceBySlug() for metadata + page component reuse
    - WithContext<FAQPage> for schema-dts FAQPage with @context field (bare FAQPage rejects @context)
    - Native details/summary HTML accordion — no React state, no client JS needed

key-files:
  created:
    - stella-mattina/src/components/services/ServiceFaqSection.tsx
    - stella-mattina/src/app/providers-bio/page.tsx
    - stella-mattina/src/app/womens-health/page.tsx
    - stella-mattina/src/app/gynecology/page.tsx
    - stella-mattina/src/app/prenatal-care-near-me/page.tsx
    - stella-mattina/src/app/maternal-fetal-medicine/page.tsx
    - stella-mattina/src/app/biote-hormone-therapy/page.tsx
    - stella-mattina/src/app/hormone-pellet-therapy-dallas/page.tsx
    - stella-mattina/src/app/gynecologist-dallas/page.tsx
    - stella-mattina/src/app/ginecologo-dallas/page.tsx
    - stella-mattina/src/app/primary-care-physician-dallas/page.tsx
    - stella-mattina/src/app/patient-information/page.tsx
  modified: []

key-decisions:
  - "ServiceFaqSection uses native details/summary HTML accordion — no shadcn, no client JS, no React state needed"
  - "Module-level const service = getServiceBySlug(SLUG)! allows export const metadata to reference service data without generateMetadata"
  - "WithContext<FAQPage> required for schema-dts — bare FAQPage type rejects @context field (established in 02-04 and applied here)"
  - "patient-information page uses FAQPage schema with empty mainEntity — ServiceFaqSection renders null when faqs.length === 0"

patterns-established:
  - "Service page pattern: const SLUG + module-level service lookup + export const metadata + Server Component default export"
  - "FAQPage JSON-LD: WithContext<FAQPage> with mainEntity array of Question objects, each with acceptedAnswer as Answer"

requirements-completed: [SERV-01, SERV-02, SERV-03, SEOLP-01, SEOLP-02]

# Metrics
duration: 2min
completed: 2026-02-26
---

# Phase 2 Plan 03: Service Pages Summary

**10 top-level service route pages with FAQPage JSON-LD and reusable details/summary FAQ accordion component — all at exact WordPress URL paths for SEO equity preservation**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-26T23:51:05Z
- **Completed:** 2026-02-26T23:53:59Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Created ServiceFaqSection Server Component using native HTML details/summary accordion (no client JS)
- Built all 10 service page routes at exact WordPress URL paths as top-level app/ directories
- Added FAQPage JSON-LD (WithContext<FAQPage>) with mainEntity array to every service page
- Created /providers-bio redirect to /doctor-directory preserving existing WordPress URL
- npm run build exits 0 with 112 total static pages generated

## Task Commits

Each task was committed atomically:

1. **Task 1: Create ServiceFaqSection component and providers-bio redirect** - `c0339ff` (feat) — committed in prior 02-03 execution
2. **Task 2: Build all 10 service page routes with FAQPage JSON-LD** - `66bd1c3` (feat)

**Plan metadata:** (to be committed with SUMMARY.md)

## Files Created/Modified
- `stella-mattina/src/components/services/ServiceFaqSection.tsx` - Reusable FAQ accordion using details/summary; returns null when empty
- `stella-mattina/src/app/providers-bio/page.tsx` - Redirect to /doctor-directory
- `stella-mattina/src/app/womens-health/page.tsx` - Women's health service page with 5 FAQs
- `stella-mattina/src/app/gynecology/page.tsx` - Gynecology service page with 5 FAQs
- `stella-mattina/src/app/prenatal-care-near-me/page.tsx` - Prenatal care service page with 5 FAQs
- `stella-mattina/src/app/maternal-fetal-medicine/page.tsx` - MFM service page with 5 FAQs
- `stella-mattina/src/app/biote-hormone-therapy/page.tsx` - BioTE hormone therapy page with 5 FAQs
- `stella-mattina/src/app/hormone-pellet-therapy-dallas/page.tsx` - Hormone pellet therapy Dallas page with 5 FAQs
- `stella-mattina/src/app/gynecologist-dallas/page.tsx` - Gynecologist Dallas page with 5 FAQs
- `stella-mattina/src/app/ginecologo-dallas/page.tsx` - Spanish-bilingual gynecologist Dallas page with 5 FAQs
- `stella-mattina/src/app/primary-care-physician-dallas/page.tsx` - Primary care Dallas page with 5 FAQs
- `stella-mattina/src/app/patient-information/page.tsx` - Patient forms page (no FAQs — ServiceFaqSection returns null)

## Decisions Made
- Used native HTML details/summary for FAQ accordion — no shadcn dependency, no client-side JavaScript, works with Server Components
- Module-level `const service = getServiceBySlug(SLUG)!` pattern allows `export const metadata` to reference service at build time
- WithContext<FAQPage> from schema-dts required when including @context field (bare FAQPage type rejects it)

## Deviations from Plan

Task 1 and 7 of 10 service pages were partially executed in a previous session (committed as c0339ff and 178bcf6 from 02-04 execution as a Rule 1 auto-fix for schema-dts type errors). This execution completed the remaining 2 pages (primary-care-physician-dallas and patient-information) that were still missing.

None - all deviations were within plan intent. The remaining 2 pages followed the identical pattern already established.

## Issues Encountered
None - build succeeded on first attempt, TypeScript compiled with zero errors.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 11 service routes (10 content + 1 redirect) are live and building correctly
- FAQPage JSON-LD present for all content pages (patient-information has empty mainEntity — no FAQs authored)
- ServiceFaqSection is available for reuse in future location pages if FAQs are added
- Ready for 02-05 and beyond

---
*Phase: 02-content-pages*
*Completed: 2026-02-26*

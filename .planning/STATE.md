# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-26)

**Core value:** A warm, trustworthy online presence that makes patients feel confident booking with Stella Mattina — whether they find it through Google, ChatGPT, or a recommendation.
**Current focus:** Phase 3 — Homepage

## Current Position

Phase: 3 of 4 (Homepage) — IN PROGRESS
Plan: 1 of 1 — Plan 03-01 complete
Status: Phase 3 plan 03-01 complete — homepage wired to real data with JSON-LD
Last activity: 2026-02-27 — 03-01 complete: homepage data wiring + MedicalOrganization JSON-LD

Progress: [██████████] 85%

## Performance Metrics

**Velocity:**
- Total plans completed: 5
- Average duration: 4min
- Total execution time: 18min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 5 | 18min | 4min |

**Recent Trend:**
- Last 5 plans: 01-01 (2min), 01-02 (5min), 01-03 (5min), 01-04 (3min), 01-05 (3min)
- Trend: Consistent

*Updated after each plan completion*
| Phase 01-foundation P01 | 2min | 1 tasks | 22 files |
| Phase 01-foundation P03 | 5min | 2 tasks | 6 files |
| Phase 01-foundation P04 | 3min | 2 tasks | 17 files |
| Phase 01-foundation P05 | 3min | 1 tasks | 0 files |
| Phase 02-content-pages P01 | 6min | 2 tasks | 4 files |
| Phase 02-content-pages P02 | 8min | 1 tasks | 1 files |
| Phase 02-content-pages P04 | 3 | 1 tasks | 9 files |
| Phase 02-content-pages P05 | 2min | 1 tasks | 1 files |
| Phase 02-content-pages P03 | 2min | 2 tasks | 12 files |
| Phase 02-content-pages P06 | 2min | 2 tasks | 3 files |
| Phase 02-content-pages P07 | 2min | 2 tasks | 5 files |
| Phase 03-homepage P01 | 2min | 2 tasks | 1 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Foundation]: No GA4 or Meta Pixel — use Plausible or Vercel Analytics only (HIPAA risk on medical site)
- [Foundation]: All content served from five pre-extracted JSON files via typed content layer at build time
- [All phases]: WordPress URL paths must be preserved exactly in Next.js app/ directory to protect SEO equity
- [Phase 2]: blog_posts.json full_text confirmed as plain text (not HTML or WP blocks) — safe to render directly, no HTML sanitization needed
- [01-03]: LOCATION_SHORT_NAMES must map actual SEO-pattern slugs from locations.json (e.g. "gynecologist-dallas-bishop-arts"), not assumed verbose slugs
- [01-01]: shadcn --defaults flag used instead of --yes to avoid interactive color prompt blocking automation
- [01-01]: shadcn init run before any brand token customization to prevent globals.css overwrite
- [Phase 01-foundation]: shadcn --defaults flag used instead of --yes to avoid interactive color prompt blocking automation
- [01-04]: JSON data files copied to stella-mattina/src/data/ — Turbopack cannot resolve imports outside the Next.js project root via relative paths
- [01-04]: MobileNav is the only 'use client' component in layout — all other layout components are Server Components
- [02-01]: normalizeCategories uses unknown[] input with runtime typeof checks to handle malformed blog_posts.json category objects without modifying source JSON
- [02-01]: location-addresses.ts structured as a standalone lookup table so page components need no changes when addresses are verified against live site
- [Phase 02-content-pages]: schema-dts MedicalSpecialty is strict enum — use Record<string,unknown> for jsonLd when custom specialty strings conflict with type
- [Phase 02-content-pages]: Next.js 15 async params: type as Promise<{ slug: string }> and await in both generateMetadata and page component
- [Phase 02-content-pages]: WithContext<FAQPage> and WithContext<Article> required for schema-dts types when @context is present — bare FAQPage/Article types reject @context field
- [Phase 02-content-pages]: renderBlogContent strips tag cloud using word-count heuristic (>4 words per line = real content) rather than keyword matching
- [Phase 02-content-pages]: ServiceFaqSection uses native details/summary HTML accordion — no shadcn, no client JS needed
- [Phase 02-content-pages]: Module-level const service = getServiceBySlug(SLUG)! allows export const metadata to reference service data at build time
- [Phase 02-content-pages]: patient-information page uses FAQPage schema with empty mainEntity — ServiceFaqSection renders null when faqs.length === 0
- [02-05]: MedicalClinic JSON-LD uses Record<string,unknown> — schema-dts MedicalClinic union type (MedicalClinicLeaf | CovidTestingFacility | string) is incompatible with WithContext<T extends Thing>
- [Phase 02-content-pages]: BlogFilter receives all posts from Server Component parent and filters client-side — no API round-trips needed since full post list is small enough to serialize as props
- [02-07]: ContactForm uses mailto: action with window.location.href — no backend endpoint, no data stored, HIPAA-safe by design
- [02-07]: Contact form strictly limited to 3 fields: name, email, message — no phone, DOB, symptoms, insurance, or any health-related field
- [02-08]: ServicePageContent component renders sections array as intro + cards + benefits + CTA; falls back to full_text when sections absent
- [02-08]: /services index page excludes providers-bio slug (that route redirects to /doctor-directory)
- [03-01]: Homepage remains a pure Server Component — getPractitioners()/getLocations() are synchronous, no async/await needed
- [03-01]: JSON-LD uses Record<string,unknown> consistent with Phase 2 decisions (avoids schema-dts union type conflicts)
- [03-01]: Location cards use loc.name as heading with static "Dallas-Fort Worth, TX" subtitle — Location type has no separate city field

### Pending Todos

None yet.

### Blockers/Concerns

- [RESOLVED - 01-03]: Blog post body format in blog_posts.json confirmed as plain text — no sanitization needed
- [Phase 1]: Verify trailing slash behavior on existing WordPress canonical URLs before configuring Next.js trailingSlash setting
- [Phase 2]: FAQPage schema eligibility criteria for Google AI Overviews are evolving — validate against current Search Central docs before implementing service page FAQs

## Session Continuity

Last session: 2026-02-27
Stopped at: Completed 03-homepage 03-01-PLAN.md — homepage data wiring and JSON-LD complete
Resume file: None

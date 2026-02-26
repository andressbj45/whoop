---
phase: 01-foundation
plan: "04"
subsystem: ui
tags: [nextjs, layout, header, footer, shadcn, tailwind, components]

# Dependency graph
requires:
  - phase: 01-02
    provides: SM brand tokens (bg-sm-navy, text-sm-blue, font-display) available as Tailwind utilities
  - phase: 01-03
    provides: getContactInfo() returning deduplicated phone numbers from contact_info.json

provides:
  - Global layout shell: Header (sticky nav) + Footer (contact info + quick links) + PageWrapper
  - BookingButton server component linking to mycw160.ecwcloud.com patient portal
  - PhoneLink server component rendering tel: links with +1 prefix
  - MobileNav client component: shadcn Sheet drawer with hamburger trigger
  - Shell homepage at app/page.tsx confirming full SM-branded layout renders
  - JSON data files co-located in stella-mattina/src/data/ for Turbopack compatibility

affects:
  - 01-05
  - All Phase 2 page components (will use PageWrapper as their shell)
  - All future pages inherit Header, Footer, BookingButton from this plan

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component layout pattern: Header + Footer are server components, MobileNav is the only client leaf
    - next/image for logo with priority flag in header and brightness-0 invert for footer (white logo on navy)
    - JSON data files in src/data/ — Turbopack cannot resolve imports outside the Next.js project root
    - getContactInfo() called directly in Footer server component (no prop drilling, no context)
    - shadcn Sheet component used for mobile drawer navigation

key-files:
  created:
    - stella-mattina/src/components/common/BookingButton.tsx
    - stella-mattina/src/components/common/PhoneLink.tsx
    - stella-mattina/src/components/layout/MobileNav.tsx
    - stella-mattina/src/components/layout/Header.tsx
    - stella-mattina/src/components/layout/Footer.tsx
    - stella-mattina/src/components/layout/PageWrapper.tsx
    - stella-mattina/src/data/contact_info.json
    - stella-mattina/src/data/practitioners.json
    - stella-mattina/src/data/locations.json
    - stella-mattina/src/data/services.json
    - stella-mattina/src/data/blog_posts.json
    - stella-mattina/public/images/logo.png
  modified:
    - stella-mattina/src/app/page.tsx
    - stella-mattina/src/lib/content/contact.ts
    - stella-mattina/src/lib/content/practitioners.ts
    - stella-mattina/src/lib/content/locations.ts
    - stella-mattina/src/lib/content/services.ts
    - stella-mattina/src/lib/content/blog.ts

key-decisions:
  - "JSON data files copied into stella-mattina/src/data/ — Turbopack cannot resolve imports traversing outside the Next.js project root via relative paths (../../../../scraped-sites/...)"
  - "MobileNav is the only 'use client' component in the layout — keeps client-side JS bundle minimal; all other layout components are Server Components"
  - "SM logo brightness-0 invert in footer — renders logo white on navy background without needing a separate white logo asset"
  - "next/image with priority in Header — prevents LCP penalty on logo above the fold"

patterns-established:
  - "Layout shell pattern: PageWrapper = Header + main + Footer, consumed by every app page"
  - "Client island pattern: MobileNav is a client leaf inside server parent Header — avoids making Header a client component"
  - "Data co-location: scraped JSON copied to src/data/ so Turbopack resolves imports within project root"

requirements-completed: [DESIGN-01, DESIGN-03, DESIGN-04]

# Metrics
duration: 3min
completed: 2026-02-26
---

# Phase 1 Plan 04: Layout Shell Summary

**Global layout shell built with SM-branded Header, sticky nav, mobile drawer, Footer with real contact data, and shell homepage confirming full layout renders at http://localhost:3000**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-26T20:03:13Z
- **Completed:** 2026-02-26T20:06:06Z
- **Tasks:** 2 of 2
- **Files created/modified:** 17

## Accomplishments

- 6 layout/common components built: BookingButton, PhoneLink, MobileNav, Header, Footer, PageWrapper
- SM logo (logo-new.png, 337KB) copied from scraped assets to public/images/logo.png
- Header: sticky nav with logo, 6 desktop nav links, BookingButton, and MobileNav hamburger
- Footer: SM logo (inverted white), real phone numbers from getContactInfo(), Quick Links, Book CTA
- MobileNav: shadcn Sheet drawer (right side, 72px wide) with nav links and full-width BookingButton
- Shell homepage at app/page.tsx using PageWrapper with Dynalight heading and BookingButton size="lg"
- npm run build exits 0, http://localhost:3000 returns HTTP 200

## Task Commits

Each task was committed atomically:

1. **Task 1: Create BookingButton, PhoneLink, and MobileNav components** - `037ca87` (feat)
2. **Task 2: Build Header, Footer, PageWrapper, and shell homepage** - `00e7e75` (feat)

## Files Created/Modified

**Created:**
- `stella-mattina/src/components/common/BookingButton.tsx` - Server component, links to mycw160.ecwcloud.com, size sm/md/lg variants
- `stella-mattina/src/components/common/PhoneLink.tsx` - Server component, tel: links with +1 prefix
- `stella-mattina/src/components/layout/MobileNav.tsx` - 'use client', shadcn Sheet, hamburger trigger, 6 nav links + BookingButton
- `stella-mattina/src/components/layout/Header.tsx` - Sticky header, SM logo, desktop nav, BookingButton, MobileNav
- `stella-mattina/src/components/layout/Footer.tsx` - Navy bg, SM logo (inverted), getContactInfo() phones+emails, Quick Links, Book CTA
- `stella-mattina/src/components/layout/PageWrapper.tsx` - flex min-h-screen shell: Header + main + Footer
- `stella-mattina/src/data/*.json` - 5 JSON data files (contact, practitioners, locations, services, blog_posts) co-located in project
- `stella-mattina/public/images/logo.png` - SM logo (337KB PNG, copied from scraped-sites)

**Modified:**
- `stella-mattina/src/app/page.tsx` - Replaced Next.js placeholder with SM shell page (PageWrapper + Dynalight h1 + BookingButton)
- `stella-mattina/src/lib/content/*.ts` (5 files) - Updated import paths from `../../../../scraped-sites/...` to `../../data/...`

## Decisions Made

- **JSON files moved to src/data/:** Turbopack (used in Next.js 16 build) cannot resolve module imports that traverse outside the project root via relative paths. The `../../../../scraped-sites/...` paths worked in Plan 03's build only because no page component was importing from the content layer yet. Once Footer.tsx triggered the import chain, Turbopack threw a Module not found error. Fix: copy JSON files into `stella-mattina/src/data/` and update all 5 content module imports to `../../data/*.json`.

- **MobileNav as sole 'use client' component:** Header, Footer, PageWrapper, BookingButton, and PhoneLink are all Server Components. MobileNav requires `useState` for the Sheet open/close, so it must be a client component — but it's a leaf node in the tree, keeping the client boundary minimal.

- **Logo invert approach:** Footer uses `className="... brightness-0 invert"` on the Image to render the logo white on the navy background without needing a separate white-version SVG/PNG asset.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed Turbopack module resolution: JSON imports outside project root**
- **Found during:** Task 2 (building Footer.tsx which imports getContactInfo which imports JSON)
- **Issue:** `npm run build` threw `Module not found: Can't resolve '../../../../scraped-sites/stellamattina/extracted/contact_info.json'`. Turbopack in Next.js 16 cannot resolve imports that traverse outside the Next.js project root directory. The prior plan's build passed because no page actually imported from the content layer — the modules were created but never used.
- **Fix:** Copied all 5 JSON files from `scraped-sites/stellamattina/extracted/` into `stella-mattina/src/data/`. Updated all 5 content modules to import from `../../data/*.json` instead of `../../../../scraped-sites/...`
- **Files modified:** stella-mattina/src/lib/content/contact.ts, practitioners.ts, locations.ts, services.ts, blog.ts; stella-mattina/src/data/ (5 new files)
- **Verification:** `npm run build` exits 0, route `/` prerendered as static
- **Committed in:** 00e7e75 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 3 - blocking build error from Turbopack module resolution)
**Impact on plan:** Required fix for build to pass. JSON files are now co-located inside the project — a better practice for build systems. Scraped-sites directory remains as the source of truth but is no longer imported directly.

## Issues Encountered

None beyond the Turbopack module resolution issue documented above.

## User Setup Required

None — no external service configuration. The dev server at http://localhost:3000 shows the SM-branded layout immediately after `npm run dev`.

## Next Phase Readiness

- All 6 layout components ready for use by Phase 2 page components
- PageWrapper available as the universal page shell (`import { PageWrapper } from '@/components/layout/PageWrapper'`)
- BookingButton available as a standalone CTA component for any page
- Content layer JSON imports now resolve correctly in Turbopack — no further path issues expected
- Phase 1 success criterion met: `next dev` loads a page at localhost:3000 with SM header, footer, and Book Now CTA

---
*Phase: 01-foundation*
*Completed: 2026-02-26*

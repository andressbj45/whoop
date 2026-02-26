---
phase: 01-foundation
plan: "02"
subsystem: ui
tags: [tailwind, css-tokens, next-font, plausible-analytics, shadcn]

# Dependency graph
requires:
  - phase: 01-01
    provides: Next.js 16 scaffold with shadcn/ui, Tailwind v4, and next-plausible installed

provides:
  - SM brand color tokens as Tailwind utility classes (bg-sm-navy, text-sm-blue, etc.)
  - Roboto and Dynalight fonts loaded via next/font/google with CSS variable injection
  - PlausibleProvider in root layout for HIPAA-safe analytics on all pages
  - Typography plugin registered via @plugin directive

affects:
  - 01-03
  - 01-04
  - All UI component plans that use SM brand colors or fonts

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Tailwind v4 CSS-first configuration via @theme block in globals.css
    - SM brand tokens as --color-sm-* CSS variables generating utility classes automatically
    - @plugin directive for Tailwind v4 plugins (not @import)
    - next/font/google with variable injection on <html> element for zero layout shift
    - PlausibleProvider in <head> for script loading before page content

key-files:
  created: []
  modified:
    - stella-mattina/src/app/globals.css
    - stella-mattina/src/app/layout.tsx

key-decisions:
  - "Use @plugin directive for @tailwindcss/typography in Tailwind v4 — not @import (Tailwind v4 CSS-first plugin syntax)"
  - "Separate @theme block (without inline) for SM brand tokens — does not conflict with shadcn's @theme inline block"
  - "PlausibleProvider placed in <head> not <body> — loads analytics script before page content renders"
  - "No 'use client' in layout.tsx — preserves Next.js Metadata API for server-side head tag rendering"

patterns-established:
  - "SM brand token pattern: --color-sm-* in @theme {} → bg-sm-*, text-sm-* Tailwind utilities"
  - "Font pattern: next/font/google with variable: '--font-*' → injected on <html> → referenced in @theme"
  - "Analytics pattern: PlausibleProvider in <head> of root layout — applies to every page automatically"

requirements-completed: [FOUND-02, FOUND-03, DESIGN-02]

# Metrics
duration: 2min
completed: 2026-02-26
---

# Phase 1 Plan 02: Brand Tokens & Analytics Summary

**SM brand colors and fonts wired into Tailwind v4 via @theme CSS tokens, with Plausible HIPAA-safe analytics in root layout**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-26T19:16:24Z
- **Completed:** 2026-02-26T19:18:27Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- SM brand color tokens (navy #1C348C, blue #617CDF, and 5 variants) registered in Tailwind v4 @theme block — available as bg-sm-navy, text-sm-blue, etc. in all components
- Roboto (400/500/700) and Dynalight (400) fonts loaded via next/font/google with CSS variable injection on `<html>` — zero external DNS lookup, no layout shift
- PlausibleProvider added to root layout `<head>` with domain="stellamattina.com" — HIPAA-safe analytics on every page from day one, no GA4 or Meta Pixel

## Task Commits

Each task was committed atomically:

1. **Task 1: Add SM brand tokens to globals.css** - `f945637` (feat)
2. **Task 2: Configure root layout with fonts and Plausible analytics** - `af0d7b6` (feat)

**Plan metadata:** (pending docs commit)

## Files Created/Modified

- `stella-mattina/src/app/globals.css` - Added @plugin "@tailwindcss/typography" and @theme block with SM brand color tokens, font variables, and spacing tokens; preserved all shadcn-generated variables
- `stella-mattina/src/app/layout.tsx` - Replaced Geist fonts with Roboto+Dynalight, added PlausibleProvider in `<head>`, set SM brand metadata, removed 'use client'

## Decisions Made

- Used `@plugin "@tailwindcss/typography"` directive instead of `@import` — Tailwind v4 uses CSS-first plugin syntax, `@import` would fail at build time
- Added SM brand tokens in a separate `@theme {}` block (without `inline`) — avoids conflicting with shadcn's `@theme inline` block which maps to CSS variable refs
- PlausibleProvider goes in `<head>` not `<body>` — ensures script loads before page content for accurate analytics
- No `'use client'` in layout.tsx — this would break the Next.js Metadata API

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Used @plugin instead of @import for typography**
- **Found during:** Task 1 (Add SM brand tokens to globals.css)
- **Issue:** Plan specified `@import "@tailwindcss/typography"` but Tailwind v4 uses `@plugin` directive for plugins — `@import` caused build failure: "Can't resolve '@tailwindcss/typography'"
- **Fix:** Changed `@import "@tailwindcss/typography"` to `@plugin "@tailwindcss/typography"` — the correct Tailwind v4 CSS-first plugin registration syntax
- **Files modified:** stella-mattina/src/app/globals.css
- **Verification:** `npm run build` exits 0, typography utilities available
- **Committed in:** f945637 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug — incorrect import syntax for Tailwind v4 plugin)
**Impact on plan:** Auto-fix was required for build to pass. No scope creep. Typography plugin is correctly registered.

## Issues Encountered

None beyond the Tailwind v4 @plugin syntax fix documented above.

## User Setup Required

None - no external service configuration required. Plausible analytics will use the domain "stellamattina.com" — analytics data appears in the Plausible dashboard once the site is deployed to that domain.

## Next Phase Readiness

- All SM brand tokens available as Tailwind utility classes in Plans 03 and 04
- Roboto and Dynalight fonts ready for any component using `font-sans` and `font-display`
- Analytics tracking in place from first page deployed

---
*Phase: 01-foundation*
*Completed: 2026-02-26*

---
phase: 02-content-pages
plan: "04"
subsystem: ui
tags: [nextjs, schema-dts, ssg, seo, blog, json-ld]

# Dependency graph
requires:
  - phase: 02-content-pages
    plan: "01"
    provides: getBlogPosts, getBlogPostBySlug, blog.ts content layer functions
provides:
  - Blog post detail page at /blog/[slug] with 61 statically generated routes
  - Article JSON-LD (headline, author, datePublished, publisher, url)
  - Tag cloud stripping via word-count heuristic (renderBlogContent helper)
  - Author byline with publication date and category display
affects: [seo-validation, blog-listing, sitemap-generation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "WithContext<T> wrapper required for schema-dts types when @context field is included at top level"
    - "renderBlogContent word-count heuristic: last line with >4 words marks end of real content"
    - "Async params pattern for Next.js 15+: type as Promise<{ slug: string }> and await in both generateMetadata and page"

key-files:
  created:
    - stella-mattina/src/app/blog/[slug]/page.tsx
  modified:
    - stella-mattina/src/app/biote-hormone-therapy/page.tsx
    - stella-mattina/src/app/ginecologo-dallas/page.tsx
    - stella-mattina/src/app/gynecologist-dallas/page.tsx
    - stella-mattina/src/app/gynecology/page.tsx
    - stella-mattina/src/app/hormone-pellet-therapy-dallas/page.tsx
    - stella-mattina/src/app/maternal-fetal-medicine/page.tsx
    - stella-mattina/src/app/prenatal-care-near-me/page.tsx
    - stella-mattina/src/app/womens-health/page.tsx

key-decisions:
  - "WithContext<FAQPage> and WithContext<Article> required for schema-dts types when @context is present — bare FAQPage/Article types reject @context field"
  - "renderBlogContent strips tag cloud using word-count heuristic (>4 words per line) rather than keyword matching — more robust across varied post endings"

patterns-established:
  - "schema-dts: Always use WithContext<T> when the JSON-LD object includes @context"

requirements-completed: [BLOG-02, BLOG-03]

# Metrics
duration: 3min
completed: 2026-02-26
---

# Phase 02 Plan 04: Blog Post Detail Page Summary

**61 blog post detail pages statically generated with Article JSON-LD, paragraph rendering, tag cloud stripping, and author byline via /blog/[slug]**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-26T23:44:58Z
- **Completed:** 2026-02-26T23:48:08Z
- **Tasks:** 1
- **Files modified:** 9

## Accomplishments

- Created `blog/[slug]/page.tsx` Server Component with `generateStaticParams` producing 61 slug routes
- Implemented `renderBlogContent()` helper that strips trailing tag cloud blocks using word-count heuristic
- Built `WithContext<Article>` JSON-LD with headline, author (Person), datePublished, publisher (Organization), and url fields
- Rendered blog body as individual `<p>` elements using Tailwind prose classes for readable typography
- Displays author byline, formatted publication date, and first category label in article header

## Task Commits

Each task was committed atomically:

1. **Task 1: Build blog post detail page with Article JSON-LD and plain-text rendering** - `178bcf6` (feat)

**Plan metadata:** *(pending final commit)*

## Files Created/Modified

- `stella-mattina/src/app/blog/[slug]/page.tsx` - Blog post detail page: generateStaticParams (61 routes), generateMetadata, BlogPostPage component with Article JSON-LD, renderBlogContent tag-stripping helper
- `stella-mattina/src/app/biote-hormone-therapy/page.tsx` - Fixed: FAQPage -> WithContext<FAQPage>
- `stella-mattina/src/app/ginecologo-dallas/page.tsx` - Fixed: FAQPage -> WithContext<FAQPage>
- `stella-mattina/src/app/gynecologist-dallas/page.tsx` - Fixed: FAQPage -> WithContext<FAQPage>
- `stella-mattina/src/app/gynecology/page.tsx` - Fixed: FAQPage -> WithContext<FAQPage>
- `stella-mattina/src/app/hormone-pellet-therapy-dallas/page.tsx` - Fixed: FAQPage -> WithContext<FAQPage>
- `stella-mattina/src/app/maternal-fetal-medicine/page.tsx` - Fixed: FAQPage -> WithContext<FAQPage>
- `stella-mattina/src/app/prenatal-care-near-me/page.tsx` - Fixed: FAQPage -> WithContext<FAQPage>
- `stella-mattina/src/app/womens-health/page.tsx` - Fixed: FAQPage -> WithContext<FAQPage>

## Decisions Made

- Used `WithContext<Article>` instead of bare `Article` — schema-dts's bare types exclude `@context` field since it's added by the `WithContext<T>` wrapper. Same fix applied to all 7 service pages using `WithContext<FAQPage>`.
- `renderBlogContent` uses word-count heuristic (>4 words per line = real content, <=4 words = tag/keyword line). This approach is content-agnostic and doesn't require hardcoded tag lists.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed schema-dts FAQPage type error blocking build across 7 service pages**
- **Found during:** Task 1 (blog post detail page build verification)
- **Issue:** All 7 existing service pages (`biote-hormone-therapy`, `ginecologo-dallas`, `gynecologist-dallas`, `gynecology`, `hormone-pellet-therapy-dallas`, `maternal-fetal-medicine`, `prenatal-care-near-me`, `womens-health`) typed their JSON-LD as `FAQPage` — but schema-dts's bare `FAQPage` type does not include `@context`, causing TypeScript compile error `'@context' does not exist in type 'FAQPageLeaf'`
- **Fix:** Changed all 7 pages from `import type { FAQPage }` to `import type { WithContext, FAQPage }` and from `const jsonLd: FAQPage` to `const jsonLd: WithContext<FAQPage>`
- **Also applied:** Same pattern to new blog page (`Article` -> `WithContext<Article>`) before the error manifested
- **Files modified:** 7 service page files
- **Verification:** npm run build exits 0 after fix, all 103 static pages generated
- **Committed in:** 178bcf6 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - type bug in 7 pre-existing service pages)
**Impact on plan:** Fix was necessary to unblock build. All service pages continue to emit correct JSON-LD at runtime — only the compile-time type annotation was wrong.

## Issues Encountered

None beyond the FAQPage type bug documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Blog post detail pages complete — all 61 routes statically generated at build time
- Article JSON-LD ready for Google Search Console validation
- Blog listing page (02-03) already built; linking from listing to detail pages is live
- Service pages TypeScript type bug is resolved — future service page additions should use `WithContext<T>` pattern

---
*Phase: 02-content-pages*
*Completed: 2026-02-26*

---
phase: 02-content-pages
plan: "06"
subsystem: content-pages
tags: [doctor-directory, blog, client-island, server-component, category-filter]
dependency_graph:
  requires: ["02-02", "02-04"]
  provides: ["/doctor-directory listing", "/blog listing with category filter"]
  affects: ["/doctor-directory/[slug]", "/blog/[slug]"]
tech_stack:
  added: []
  patterns: ["client-island pattern (BlogFilter with use client)", "Server Component parent passes serializable data to client island"]
key_files:
  created:
    - stella-mattina/src/app/doctor-directory/page.tsx
    - stella-mattina/src/app/blog/page.tsx
    - stella-mattina/src/components/blog/BlogFilter.tsx
  modified: []
decisions:
  - "BlogFilter receives all posts from Server Component parent and filters client-side — no API round-trips"
  - "Category filter deselects when same pill is clicked again (toggle behavior)"
metrics:
  duration: "2min"
  completed_date: "2026-02-26"
  tasks_completed: 2
  files_created: 3
---

# Phase 2 Plan 6: Doctor Directory Listing + Blog Index with Category Filter Summary

**One-liner:** Doctor directory listing (29 practitioner cards) and blog index with client-side category filter using the Server Component + client island pattern.

## What Was Built

### Doctor Directory Listing Page (`/doctor-directory`)

`stella-mattina/src/app/doctor-directory/page.tsx` — Server Component that calls `getPractitioners()` and renders all 29 practitioners in a responsive card grid (1/2/3 columns). Cards include:
- Photo via `next/image` with `fill` + `object-top` to show faces
- Name (font-display), specialty, and location names
- Full card links to `/doctor-directory/[slug]` detail pages
- BookingButton CTA at bottom of page

### Blog Index Page (`/blog`)

`stella-mattina/src/app/blog/page.tsx` — Server Component parent that fetches posts and categories, then passes serializable data to the BlogFilter client island.

### BlogFilter Client Island (`/src/components/blog/BlogFilter.tsx`)

`stella-mattina/src/components/blog/BlogFilter.tsx` — Client Component (`'use client'`) that handles all interactivity:
- Category pill buttons — "All Posts" + one per category from `getBlogCategories()`
- `useState` for active category; clicking active pill deselects (shows all)
- Filters posts array client-side without page reload
- Post cards show title, author, date, category badge, and meta description
- Live post count updates at bottom right

## Decisions Made

1. **BlogFilter receives all posts from Server Component parent and filters client-side** — no API round-trips needed since the full post list (~61 posts) is small enough to serialize as props. This matches the established client island pattern.
2. **Category filter toggle behavior** — clicking the active category pill deselects it (returns to "All Posts"), reducing UX friction for users who want to undo a filter without clicking "All Posts".

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- `npm run build` exits 0
- 118 static pages generated successfully
- `/doctor-directory` appears as `○ (Static)` in route output
- `/blog` appears as `○ (Static)` in route output
- `/blog/[slug]` shows 61 blog post routes
- `/doctor-directory/[slug]` shows 29 practitioner routes

## Self-Check: PASSED

Files confirmed created:
- FOUND: stella-mattina/src/app/doctor-directory/page.tsx
- FOUND: stella-mattina/src/app/blog/page.tsx
- FOUND: stella-mattina/src/components/blog/BlogFilter.tsx

Commits confirmed:
- 1581850: feat(02-06): build doctor directory listing page
- 878ac89: feat(02-06): build blog index page with client-side category filter

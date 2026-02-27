# Phase 3: Homepage - Research

**Researched:** 2026-02-26
**Domain:** Next.js 16 App Router homepage composition, schema.org JSON-LD (MedicalOrganization + LocalBusiness)
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HOME-01 | Homepage built with hero section, services overview, doctor highlights, and location CTA | Existing page.tsx already contains all four sections — task is to wire them to real data from content layer instead of hardcoded arrays |
| HOME-02 | MedicalOrganization + LocalBusiness schema.org JSON-LD on homepage | Established codebase pattern: `Record<string,unknown>` JSON-LD injected via `<script type="application/ld+json" dangerouslySetInnerHTML>` in Server Component |
</phase_requirements>

---

## Summary

Phase 3 has an unusual starting point: the homepage (`stella-mattina/src/app/page.tsx`) already exists with a complete, visually polished 10-section layout built during an earlier session. The page renders a hero, trust bar, services section, "How It Works" steps, featured providers, testimonials, locations preview, insurance list, FAQ accordion, and final CTA banner — all with correct SM brand styling (sm-navy, sm-blue, Outfit font, wave dividers, generous whitespace).

The primary work for Phase 3 is therefore **not** to design or build the homepage from scratch. It is to (1) replace the four hardcoded inline data arrays (`PROVIDERS`, `LOCATIONS`, `TESTIMONIALS`, `INSURERS`) with calls to the real content layer functions (`getPractitioners()`, `getServices()`, `getLocations()`, `getContactInfo()`), and (2) add the MedicalOrganization + LocalBusiness JSON-LD block that HOME-02 requires. The hero section already shows brand photography (`/images/hero-doctor-consultation.jpg`) and a working BookingButton CTA, fully satisfying the first success criterion.

One structural issue exists: the homepage currently uses hardcoded `href` values for locations that reference a non-existent `/our-locations/` prefix instead of the correct `/find-our-locations/[slug]` paths that Phase 2 built. This must be corrected when wiring locations to real data. The services section links to `/services` (correct) but uses static content with no link-through to individual service pages — this should be corrected to link each card to its actual route.

**Primary recommendation:** Phase 3 is a focused data-wiring + JSON-LD task on an existing polished page. Two plans suffice: (1) wire real data from content layer + fix routing hrefs, and (2) add MedicalOrganization + LocalBusiness JSON-LD and homepage metadata export.

---

## Standard Stack

### Core (already installed — no new dependencies needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | App Router, RSC, static generation | Project foundation |
| react | 19.2.3 | Component model | Project foundation |
| typescript | ^5 | Type safety | Project standard |
| tailwindcss | ^4 | Utility-first CSS | Project design system |
| schema-dts | ^1.1.5 | TypeScript types for schema.org | Already used for Physician, FAQPage, MedicalClinic JSON-LD |
| next/image | built-in | Optimized image rendering | Used across Phase 2 for practitioner photos |

### Supporting (already installed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | ^0.575.0 | SVG icons | Already used in layout; avoid if SVG inline is fine |
| clsx + tailwind-merge | installed | Conditional class merging | Already used in project |

### Alternatives Considered

No new libraries needed. All required functionality exists in the installed stack.

**Installation:** No new packages required.

---

## Architecture Patterns

### Existing Homepage Structure

The `stella-mattina/src/app/page.tsx` file is a **Server Component** (no `'use client'` directive) with 10 rendered sections:

```
1. Hero — split layout, brand photo, BookingButton CTA, phone link, trust badges
2. Trust Bar — stats (30+ years, 15+ locations, 25+ providers, 4.8 stars)
3. Services — 3 cards: Women's Health, Primary Care, BioTE Hormone Therapy
4. How It Works — 3-step numbered flow
5. Featured Providers — 6-doctor grid with photos, names, specialty, location
6. Testimonials — 3 patient quotes (static content — not from data layer)
7. Locations Preview — 5 location cards + "View All" tile
8. Insurance — 8 insurer names in badge layout
9. FAQ — FaqAccordion 'use client' island component
10. Final CTA Banner — BookingButton + phone link on sm-navy background
```

Wave divider SVG components (`Wave`) and accent line (`AccentLine`) are defined inline in the file.

### Pattern 1: Server Component Data Wiring (established pattern)

**What:** Replace hardcoded inline arrays with content layer function calls at the top of the Server Component.
**When to use:** For sections that render practitioners, locations, services.
**Example:**
```typescript
// Source: established pattern from stella-mattina/src/app/doctor-directory/page.tsx
import { getPractitioners } from '@/lib/content/practitioners'
import { getLocations } from '@/lib/content/locations'
import { getServices } from '@/lib/content/services'

// At top of Server Component (no async needed — these are synchronous):
const practitioners = getPractitioners()   // Returns Practitioner[] (29 items)
const locations = getLocations()           // Returns Location[] (7 items)
const services = getServices()             // Returns Service[] (11 items)
```

### Pattern 2: JSON-LD Injection (established codebase pattern)

**What:** Plain `Record<string,unknown>` JSON-LD object rendered as `<script type="application/ld+json">` in Server Component.
**When to use:** schema-dts `MedicalOrganization` and `LocalBusiness` may have union type issues like `MedicalClinic` did — use `Record<string,unknown>` to avoid type conflicts.
**Example:**
```typescript
// Source: established pattern from stella-mattina/src/app/doctor-directory/[slug]/page.tsx
// and stella-mattina/src/app/find-our-locations/[slug]/page.tsx

const jsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': ['MedicalOrganization', 'LocalBusiness'],
  name: 'Stella Mattina',
  url: 'https://stellamattina.com',
  logo: 'https://stellamattina.com/images/logo.png',
  telephone: '214-942-3100',
  description: "Expert women's health and primary care in Dallas-Fort Worth.",
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 32.7767,
      longitude: -96.7970,
    },
    geoRadius: '50000',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: "Women's Health & Primary Care Services",
  },
}

// Render in JSX (Server Component):
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

### Pattern 3: Homepage Metadata Export (needed for HOME-02)

**What:** Export `metadata` constant from page.tsx for homepage-specific title and description.
**When to use:** Homepage needs its own metadata distinct from the root layout default.
**Example:**
```typescript
// Source: Next.js App Router pattern established in layout.tsx and all Phase 2 pages
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Stella Mattina | Women's Health & OBGYN in Dallas-Fort Worth",
  description: "Board-certified OBGYNs and primary care physicians. Same-day appointments. 7 DFW locations. Book online or call 214-942-3100.",
}
```

### Pattern 4: Slicing Practitioners for Featured Providers Section

**What:** Homepage shows 6 featured providers — select first 6 from the full list of 29.
**When to use:** Avoids coupling homepage to hand-picked list; naturally updates when practitioners.json changes.
**Example:**
```typescript
// Deterministic slice — same 6 on every build
const featuredPractitioners = getPractitioners().slice(0, 6)
```

### Pattern 5: Linking Locations Correctly to Phase 2 Routes

**What:** The current homepage uses hardcoded `href` values under `/our-locations/` prefix (wrong). Phase 2 built location detail pages at `/find-our-locations/[slug]`.
**Correct href pattern:**
```typescript
// WRONG (current hardcoded):
href: '/our-locations/gynecologist-dallas-bishop-arts'

// CORRECT (Phase 2 routes):
href: `/find-our-locations/${location.slug}`
```

### Recommended File Structure Changes

No new files or directories needed. All changes go to one existing file:

```
stella-mattina/src/app/
└── page.tsx          # Replace hardcoded arrays, add JSON-LD, add metadata export
```

Optionally, a thin data file could be extracted for testimonials if the planner wants to keep them editable:
```
stella-mattina/src/data/
└── testimonials.ts   # OPTIONAL — static array of 3 testimonials (not from JSON)
```

### Anti-Patterns to Avoid

- **Converting page.tsx to 'use client':** The FAQ accordion is already a separate 'use client' island (`FaqAccordion`). The homepage itself must remain a Server Component. Do not add `'use client'` to page.tsx.
- **Importing from outside Next.js project root:** All imports must use `@/` alias or relative paths within `stella-mattina/src/`. Turbopack cannot resolve paths outside the project root (established decision from 01-04).
- **Using WithContext<MedicalOrganization> from schema-dts:** schema-dts has had union type issues with medical types in this codebase. Use `Record<string,unknown>` consistently (established decision from Phase 2).
- **Hardcoding location hrefs:** Must use `location.slug` from `getLocations()` to build `/find-our-locations/${slug}` paths.
- **Showing all 29 practitioners:** Doctor section shows a curated set (6). Use `.slice(0, 6)` or a similar subset.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JSON-LD rendering | Custom JsonLd component | Inline `<script dangerouslySetInnerHTML>` | Established pattern in all Phase 2 pages; no additional abstraction needed |
| Image optimization | Custom `<img>` tags | `next/image` with `fill` or explicit dimensions | Already handles WebP conversion, lazy load, sizing |
| Booking CTA | New button component | `BookingButton` from `@/components/common/BookingButton` | Already has correct URL, target=_blank, all props |
| Content data | Inline hardcoded arrays | Content layer: `getPractitioners()`, `getLocations()`, `getServices()` | Data layer is the project's single source of truth |
| Phone number | Hardcoded "214-942-3100" | `getContactInfo()` from `@/lib/content/contact` | Deduped authoritative source; avoids stale phone if contact_info.json changes |

**Key insight:** The homepage does not need new components or abstractions. The entire implementation is data-wiring edits to one existing file plus a JSON-LD block.

---

## Common Pitfalls

### Pitfall 1: Wrong Location URL Prefix

**What goes wrong:** Location cards link to `/our-locations/[slug]` (404) instead of `/find-our-locations/[slug]` (Phase 2 route).
**Why it happens:** Current hardcoded `LOCATIONS` array in page.tsx uses the wrong prefix — it wasn't updated to match the actual Next.js routes Phase 2 built.
**How to avoid:** When replacing `LOCATIONS` with `getLocations()`, build hrefs as `/find-our-locations/${loc.slug}`.
**Warning signs:** Clicking a location card from the homepage gives a 404.

### Pitfall 2: Services Section Links to Wrong Routes

**What goes wrong:** Service cards link to `/services` (the index) rather than individual service pages.
**Why it happens:** Current static section has 3 grouped category cards (Women's Health, Primary Care, BioTE), not individual service page links.
**How to avoid:** Either keep the 3 grouped category cards linking to `/services` (acceptable — preserves current layout), or wire each to specific slug routes. The grouped approach is simpler and the current layout is already polished.
**Recommendation:** Keep 3 grouped cards with "Learn More" linking to `/services`. Do not replace with 11 individual service cards — that's too many for a homepage section.

### Pitfall 3: MedicalOrganization JSON-LD Type Conflicts

**What goes wrong:** Attempting `WithContext<MedicalOrganization>` from schema-dts causes TypeScript errors due to union type incompatibility.
**Why it happens:** Same pattern as `MedicalClinic` — schema-dts medical types resolve to union types that conflict with `WithContext<T extends Thing>`.
**How to avoid:** Type the JSON-LD as `Record<string,unknown>` — established decision from Phase 2. Output is still valid schema.org markup.
**Warning signs:** TypeScript error mentioning "does not satisfy the constraint 'Thing'" or union type assignment errors.

### Pitfall 4: Async Page Component When Data Calls Are Synchronous

**What goes wrong:** Making `HomePage` an `async` function unnecessarily, or awaiting synchronous content layer functions.
**Why it happens:** Confusion with async patterns from dynamic route pages.
**How to avoid:** `getPractitioners()`, `getLocations()`, `getServices()`, `getContactInfo()` are all synchronous — they read from JSON imported at module level. No `await` needed. Homepage can remain a synchronous Server Component.
**Warning signs:** TypeScript warning about `await` on non-Promise value.

### Pitfall 5: Phone Number Discrepancy

**What goes wrong:** Homepage displays "214-942-3100" in hero and footer CTA but contact_info.json has two phone numbers: "214-942-3100" and "469-399-0355".
**Why it happens:** The current hardcoded page only shows the main number.
**How to avoid:** Use `getContactInfo()` which returns deduped phones. Display `phones[0]` (214-942-3100) as the primary — consistent with all other pages.

### Pitfall 6: Hero Image Path

**What goes wrong:** Hero image at `/images/hero-doctor-consultation.jpg` is used in the current page.tsx. Verify the file actually exists at `stella-mattina/public/images/hero-doctor-consultation.jpg` before assuming it will render.
**Why it happens:** File was placed during Phase 1 — confirmed present (`public/images/` listing shows `hero-doctor-consultation.jpg`).
**Status:** No issue — file confirmed present. Also available: `hero-expecting-mothers.jpg`.

---

## Code Examples

Verified patterns from codebase inspection:

### JSON-LD Injection Pattern (from location detail page)

```typescript
// Source: stella-mattina/src/app/find-our-locations/[slug]/page.tsx (confirmed pattern)
const jsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  // ... fields
}

// In JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

### Content Layer Data Access (from doctor directory listing)

```typescript
// Source: stella-mattina/src/app/doctor-directory/page.tsx (confirmed pattern)
import { getPractitioners } from '@/lib/content/practitioners'

export default function DoctorDirectoryPage() {
  const practitioners = getPractitioners()
  // synchronous — no async needed
  return (...)
}
```

### MedicalOrganization + LocalBusiness Combined JSON-LD

```typescript
// Source: schema.org specification — multiple @type values are valid
// Typed as Record<string,unknown> per codebase convention (avoids schema-dts union type issues)
const jsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': ['MedicalOrganization', 'LocalBusiness'],
  name: 'Stella Mattina',
  url: 'https://stellamattina.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://stellamattina.com/images/logo.png',
  },
  telephone: '214-942-3100',
  email: 'info@stellamattina.com',
  description: "Expert women's health and primary care across 7 DFW locations.",
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: 25,
  },
}
```

### Slicing Practitioners for Homepage Featured Section

```typescript
// Source: pattern derived from getPractitioners() + doctor-directory/page.tsx
import { getPractitioners } from '@/lib/content/practitioners'

export default function HomePage() {
  const allPractitioners = getPractitioners()
  const featuredPractitioners = allPractitioners.slice(0, 6)
  // ...
}
```

### Location Cards with Correct Routes

```typescript
// Source: derived from getLocations() + Phase 2 route structure
import { getLocations } from '@/lib/content/locations'

export default function HomePage() {
  const locations = getLocations()
  // Display subset (e.g. first 5) — not all 7, to keep homepage compact
  const featuredLocations = locations.slice(0, 5)

  return (
    // ...
    {featuredLocations.map((loc) => (
      <a key={loc.slug} href={`/find-our-locations/${loc.slug}`}>
        {loc.name} — {loc.phone}
      </a>
    ))}
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router `getStaticProps` | App Router Server Components (synchronous data access at component level) | Next.js 13+ | No async needed for JSON-imported data |
| `Head` component for JSON-LD | `<script dangerouslySetInnerHTML>` in Server Component body | Next.js 13 App Router | JSON-LD renders in `<body>` before `</body>` — still valid for SEO |
| Separate `@type` items | Combined `@type: ['MedicalOrganization', 'LocalBusiness']` array | schema.org spec | Multiple types on one entity — both signals sent to search engines |

**Deprecated/outdated:**
- Pages Router `_app.tsx` / `_document.tsx` patterns: This project uses App Router exclusively.
- `getStaticProps` / `getServerSideProps`: Not applicable in App Router.

---

## Open Questions

1. **Testimonials data source**
   - What we know: 3 testimonials are hardcoded in page.tsx with names "Maria L.", "Jennifer R.", "Sofia M." — synthetic placeholder content.
   - What's unclear: Should these remain as static content (out of scope of any JSON data file), or does the client want them replaced/removed?
   - Recommendation: Keep as static inline data in page.tsx for Phase 3. They're clearly framed as representative quotes, not attribution claims. If real testimonials are needed, that's a v2 requirement (ENH-03).

2. **Services section: 3 grouped cards vs. individual service page links**
   - What we know: Current section has 3 grouped category cards (Women's Health, Primary Care, BioTE). Each has a "Learn More →" link pointing to `/services`.
   - What's unclear: Whether the planner should wire individual service cards instead.
   - Recommendation: Keep 3 grouped category cards. The homepage needs to convey categories at a glance, not list 11 individual services. Links to `/services` (the index) are correct.

3. **Doctor photo rendering — local vs. remote**
   - What we know: The PROVIDERS array in page.tsx uses local paths like `/images/doctors/akshay-goswami.png`. The content layer `Practitioner.photo_url` provides WordPress-hosted URLs (e.g., `stellamattina.com/wp-content/uploads/...`). Phase 2 doctor directory listing uses remote photo_url via next/image with remotePatterns configured.
   - What's unclear: When switching from hardcoded local paths to real data, should the homepage use `p.photo_url` (remote) or local `/images/doctors/` files?
   - Recommendation: Use `p.photo_url` (remote) — the same approach as doctor-directory/page.tsx. `remotePatterns` was configured in 02-01 for exactly this purpose. Local files in `/images/doctors/` may not be comprehensive (only 6 exist for the 29 practitioners).

---

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection — `stella-mattina/src/app/page.tsx` (existing homepage, confirmed full 10-section layout)
- Direct codebase inspection — `stella-mattina/src/lib/content/` (all 5 content layer modules, confirmed API shapes)
- Direct codebase inspection — `stella-mattina/src/data/` (JSON files and typed data modules)
- Direct codebase inspection — `stella-mattina/src/components/` (BookingButton, PageWrapper, FaqAccordion confirmed)
- Direct codebase inspection — `stella-mattina/package.json` (confirmed: next 16.1.6, schema-dts 1.1.5, React 19.2.3)
- Phase 2 SUMMARY files (confirmed established patterns: Record<string,unknown> JSON-LD, async params, client islands)

### Secondary (MEDIUM confidence)
- schema.org spec: multiple `@type` values in one JSON-LD block are valid (e.g., `['MedicalOrganization', 'LocalBusiness']`) — confirmed by existing worksFor pattern in doctor slug pages
- Next.js App Router: Server Components can render `<script>` tags directly with `dangerouslySetInnerHTML` — confirmed by all Phase 2 page implementations

### Tertiary (LOW confidence)
- None — all findings are based on direct codebase inspection with HIGH confidence.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — confirmed from package.json and direct file inspection
- Architecture: HIGH — patterns extracted directly from existing Phase 2 pages in the codebase
- Pitfalls: HIGH — identified from actual issues in existing page.tsx (wrong location hrefs, hardcoded data arrays)

**Research date:** 2026-02-26
**Valid until:** 2026-03-28 (stable stack; content layer patterns don't change frequently)

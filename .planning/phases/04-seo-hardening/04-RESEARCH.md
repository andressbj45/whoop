# Phase 4: SEO Hardening - Research

**Researched:** 2026-02-27
**Domain:** Next.js 16.1.6 App Router metadata, sitemap, robots.txt, structured data (JSON-LD)
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | Auto-generated `sitemap.xml` covering all pages | Next.js `app/sitemap.ts` with `MetadataRoute.Sitemap` — calls all content layer getters, no extra dependencies |
| SEO-02 | `robots.txt` configured with AI crawlers allowed (ChatGPT-User, PerplexityBot, etc.) | Next.js `app/robots.ts` with `MetadataRoute.Robots` — explicit per-agent rules array |
| SEO-03 | Per-page OG images and meta descriptions (title, description) for all page types | All 22 page files already export `title` + `description`. OG images need `openGraph` field added — static fallback in root layout covers all pages; per-page adds value only on key pages |
| SEO-04 | BreadcrumbList JSON-LD on all non-home pages | New `<BreadcrumbJsonLd>` Server Component renders `<script type="application/ld+json">` in each page; reusable pattern established by Phase 2 JSON-LD blocks |
| SEO-05 | Canonical URLs set on all pages | `alternates.canonical` in each metadata export; requires `metadataBase` in root layout to resolve relative paths |
</phase_requirements>

---

## Summary

Phase 4 is a pure SEO hardening pass. All content pages are built and verified (119 static pages at build time). No new pages or route structures are added — this phase adds discoverability infrastructure: sitemap, robots, canonical tags, Open Graph coverage, and BreadcrumbList JSON-LD. The work is additive and non-breaking.

The good news: Next.js 16.1.6 ships built-in file conventions for sitemap.ts and robots.ts that auto-serve at `/sitemap.xml` and `/robots.txt` with zero configuration beyond creating the files. The metadata API already supports `alternates.canonical` and `openGraph.images` through the existing `export const metadata` / `generateMetadata` pattern used consistently in Phase 2 and 3. No new npm packages are needed.

The critical gap is `metadataBase` — it must be added to the root layout metadata before any relative canonical URLs or OG image paths will resolve correctly. Without it, Next.js raises a build-time warning for relative paths in metadata fields. Adding `metadataBase: new URL('https://stellamattina.com')` to `app/layout.tsx` metadata unlocks relative path usage for all subsequent metadata in all pages.

**Primary recommendation:** Create `app/sitemap.ts` + `app/robots.ts`, add `metadataBase` to root layout, add `alternates.canonical` + `openGraph` to each page's metadata export, and insert a `BreadcrumbJsonLd` Server Component into every non-home page — all within the existing codebase patterns, zero new dependencies.

---

## Standard Stack

### Core (built-in — no install needed)
| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| `MetadataRoute.Sitemap` | Next.js 16.1.6 | Typed return type for `app/sitemap.ts` | Official Next.js convention — auto-serves at `/sitemap.xml` |
| `MetadataRoute.Robots` | Next.js 16.1.6 | Typed return type for `app/robots.ts` | Official Next.js convention — auto-serves at `/robots.txt` |
| `Metadata` type (existing) | Next.js 16.1.6 | `alternates.canonical` + `openGraph` fields | Already imported in every page file |

### Supporting (already installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `schema-dts` | 1.1.5 | TypeScript types for JSON-LD | BreadcrumbList type (if not using Record<string,unknown> pattern) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `app/sitemap.ts` | `next-sitemap` npm package | next-sitemap runs post-build, adds postbuild script complexity. Built-in is simpler and zero-dep for a static site |
| `app/robots.ts` | Static `app/robots.txt` file | Static file cannot be composed programmatically. .ts allows reusing `SITE_URL` constant |
| Manual `<link rel="canonical">` in page JSX | `alternates.canonical` in metadata | Metadata API is the correct App Router approach; manual tags in JSX risk placement errors |

**Installation:** None required — all tooling is built into Next.js 16.1.6.

---

## Architecture Patterns

### Recommended File Structure for Phase 4

```
stella-mattina/src/
├── app/
│   ├── layout.tsx              # ADD: metadataBase to root metadata export
│   ├── sitemap.ts              # CREATE: MetadataRoute.Sitemap — all 119 pages
│   ├── robots.ts               # CREATE: MetadataRoute.Robots — AI crawlers allowed
│   ├── page.tsx                # ADD: openGraph to existing metadata (homepage)
│   ├── [each page]/page.tsx    # ADD: alternates.canonical + openGraph to metadata
│   └── [each dynamic page]/page.tsx  # ADD: same via generateMetadata
├── components/
│   └── seo/
│       └── BreadcrumbJsonLd.tsx  # CREATE: reusable Server Component
```

---

### Pattern 1: metadataBase in Root Layout (REQUIRED FIRST)

**What:** Adds base URL so all relative paths in metadata resolve correctly.
**When to use:** Must be done before any `alternates.canonical` or relative OG image paths will work.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
// File: stella-mattina/src/app/layout.tsx

export const metadata: Metadata = {
  metadataBase: new URL('https://stellamattina.com'),
  title: {
    template: '%s | Stella Mattina',
    default: "Stella Mattina | Women's Health & Primary Care | OBGYN Dallas",
  },
  description:
    "Expert women's health and primary care in Dallas. Board-certified OBGYNs and Family Medicine doctors across 7 DFW locations.",
  openGraph: {
    siteName: 'Stella Mattina',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-default.jpg',  // resolves to https://stellamattina.com/images/og-default.jpg
        width: 1200,
        height: 630,
        alt: "Stella Mattina Women's Health",
      },
    ],
  },
}
```

---

### Pattern 2: sitemap.ts — Single File for All 119 Pages

**What:** Exports a function returning `MetadataRoute.Sitemap` — all URLs from all content layer getters.
**When to use:** Single sitemap.ts in `app/` covers all routes under 50,000 entries (Google limit).

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
// File: stella-mattina/src/app/sitemap.ts

import type { MetadataRoute } from 'next'
import { getPractitioners } from '@/lib/content/practitioners'
import { getBlogPosts } from '@/lib/content/blog'
import { getLocations } from '@/lib/content/locations'
import { getServices } from '@/lib/content/services'

const BASE_URL = 'https://stellamattina.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // Dynamic routes
  const doctorUrls = getPractitioners().map((p) => ({
    url: `${BASE_URL}/doctor-directory/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogUrls = getBlogPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.published_date),
    changeFrequency: 'never' as const,
    priority: 0.5,
  }))

  const locationUrls = getLocations().map((loc) => ({
    url: `${BASE_URL}/find-our-locations/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const serviceUrls = getServices()
    .filter((s) => s.slug !== 'providers-bio')  // providers-bio is a redirect, not a real page
    .map((s) => ({
      url: `${BASE_URL}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  // Static pages
  const staticUrls: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/doctor-directory`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/find-our-locations`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about-us`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/contact-us`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/careers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/patient-information`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    // SEO landing pages (exact WordPress URL paths preserved)
    { url: `${BASE_URL}/gynecologist-dallas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/hormone-pellet-therapy-dallas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/prenatal-care-near-me`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/primary-care-physician-dallas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/maternal-fetal-medicine`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/ginecologo-dallas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/biote-hormone-therapy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/womens-health`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  return [...staticUrls, ...doctorUrls, ...blogUrls, ...locationUrls, ...serviceUrls]
}
```

**Key decisions baked in:**
- `providers-bio` excluded (it's a redirect to `/doctor-directory`)
- `changeFrequency` as `const` is required — TypeScript narrows the string literal type

---

### Pattern 3: robots.ts — Explicit AI Crawler Allow Rules

**What:** Exports a function returning `MetadataRoute.Robots` with explicit per-agent rules.
**When to use:** When you need more than `User-Agent: * Allow: /` — e.g., explicit AI crawler grants.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// File: stella-mattina/src/app/robots.ts

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        // OpenAI bots — allow for ChatGPT citations and AI Overview appearance
        userAgent: ['ChatGPT-User', 'GPTBot', 'OAI-SearchBot'],
        allow: '/',
      },
      {
        // Perplexity AI
        userAgent: ['PerplexityBot', 'Perplexity-User'],
        allow: '/',
      },
      {
        // Google
        userAgent: ['Googlebot', 'Google-Extended'],
        allow: '/',
      },
    ],
    sitemap: 'https://stellamattina.com/sitemap.xml',
  }
}
```

**Output of this robots.ts:**
```
User-agent: *
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://stellamattina.com/sitemap.xml
```

---

### Pattern 4: Canonical + OG in Static Metadata Pages

**What:** Adds `alternates.canonical` and `openGraph` to pages with `export const metadata`.
**When to use:** All 19 static pages (those with `export const metadata: Metadata = {...}`).

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#alternates
// Example: stella-mattina/src/app/about-us/page.tsx

export const metadata: Metadata = {
  title: "About Us | Stella Mattina Women's Health",
  description: "Stella Mattina is a women's health practice serving Dallas-Fort Worth...",
  alternates: {
    canonical: '/about-us',  // resolves to https://stellamattina.com/about-us via metadataBase
  },
  openGraph: {
    title: "About Us | Stella Mattina Women's Health",
    description: "Stella Mattina is a women's health practice serving Dallas-Fort Worth...",
    url: '/about-us',
    type: 'website',
  },
}
```

---

### Pattern 5: Canonical + OG in Dynamic generateMetadata Pages

**What:** Adds same fields to the async `generateMetadata` function return for dynamic routes.
**When to use:** Dynamic routes with `generateMetadata` (doctor-directory/[slug], blog/[slug], find-our-locations/[slug]).

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// Example: stella-mattina/src/app/doctor-directory/[slug]/page.tsx

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = getPractitionerBySlug(slug)
  if (!p) {
    return { title: 'Doctor Not Found | Stella Mattina' }
  }

  const description = p.bio
    ? p.bio.slice(0, 155)
    : `Meet ${p.name} — ${p.specialty} at Stella Mattina in Dallas.`

  return {
    title: `${p.name} | ${p.specialty} | Stella Mattina`,
    description,
    alternates: {
      canonical: `/doctor-directory/${slug}`,
    },
    openGraph: {
      title: `${p.name} | ${p.specialty} | Stella Mattina`,
      description,
      url: `/doctor-directory/${slug}`,
      type: 'website',
    },
  }
}
```

---

### Pattern 6: BreadcrumbJsonLd Server Component

**What:** Reusable Server Component that renders BreadcrumbList JSON-LD as a `<script>` tag.
**When to use:** Every non-home page. Accept an array of `{name, url}` items as props.

```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
// File: stella-mattina/src/components/seo/BreadcrumbJsonLd.tsx

// Server Component — no 'use client' directive
// BreadcrumbList JSON-LD uses Record<string,unknown> consistent with project-wide pattern
// (schema-dts has union type issues for some types — keep consistent)

type BreadcrumbItem = {
  name: string
  url: string
}

type Props = {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: Props) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

**Usage in a page (example: about-us):**
```typescript
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

export default function AboutPage() {
  return (
    <PageWrapper>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://stellamattina.com' },
          { name: 'About Us', url: 'https://stellamattina.com/about-us' },
        ]}
      />
      {/* ...rest of page JSX */}
    </PageWrapper>
  )
}
```

**Usage in dynamic page (example: doctor-directory/[slug]):**
```typescript
// After awaiting params and fetching practitioner data:
<BreadcrumbJsonLd
  items={[
    { name: 'Home', url: 'https://stellamattina.com' },
    { name: 'Doctor Directory', url: 'https://stellamattina.com/doctor-directory' },
    { name: p.name, url: `https://stellamattina.com/doctor-directory/${p.slug}` },
  ]}
/>
```

---

### Anti-Patterns to Avoid

- **Canonical with absolute URL and no metadataBase:** Next.js requires metadataBase if you use relative paths. Set it once in root layout and use relative paths everywhere else.
- **Both `metadata` object AND `generateMetadata` function in the same file:** Not allowed by Next.js — will cause a build error.
- **Putting BreadcrumbList in layout.tsx:** Breadcrumb content is page-specific; placing it in layout would produce the same breadcrumb on every page in that segment. Render in `page.tsx` only.
- **Including providers-bio in sitemap:** That route is a redirect to `/doctor-directory`. Search engines follow redirects and may attribute signals to the wrong URL.
- **Using `changeFrequency` as a regular string:** TypeScript narrows the type — must use `as const` assertion or define as the literal union type.
- **Skipping metadataBase:** Without it, a relative `alternates.canonical` value like `'/about-us'` will cause a Next.js build warning and may not render correctly.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Serving `/sitemap.xml` | Custom Route Handler at `app/sitemap.xml/route.ts` | `app/sitemap.ts` with `MetadataRoute.Sitemap` | Built-in file convention sets correct Content-Type, caching headers, and 200 status automatically |
| Serving `/robots.txt` | Custom Route Handler or static file in `public/` | `app/robots.ts` with `MetadataRoute.Robots` | Built-in convention allows programmatic composition with TypeScript; static file can't import `SITE_URL` constant |
| Per-page canonical tags | Manual `<link rel="canonical">` in JSX | `alternates.canonical` in metadata | Metadata API places tags correctly in `<head>`, handles merging across layout/page hierarchy |
| OG image tags | Manual `<meta property="og:image">` in JSX | `openGraph.images` in metadata | Metadata API generates correct OG protocol tags including width/height/alt attributes |

**Key insight:** Next.js 16.1.6 ships the entire SEO file-convention system built in. Every bespoke solution adds complexity and risks incorrect header behavior that the built-in system handles correctly.

---

## Common Pitfalls

### Pitfall 1: Missing metadataBase Breaks Relative Canonical URLs
**What goes wrong:** `alternates.canonical: '/about-us'` does not resolve to an absolute URL in `<head>` output. Next.js logs a build warning and the canonical tag may render as a relative URL, which browsers handle inconsistently.
**Why it happens:** `metadataBase` is not set in root layout; all metadata fields that require absolute URLs silently pass through as-is.
**How to avoid:** Add `metadataBase: new URL('https://stellamattina.com')` to the root layout metadata export FIRST, before updating any page metadata.
**Warning signs:** Build warning: "metadata.metadataBase is not set for resolving social open graph or twitter images..."

### Pitfall 2: providers-bio Appearing in Sitemap
**What goes wrong:** Sitemap includes `https://stellamattina.com/providers-bio` which immediately redirects to `/doctor-directory`. Search engines may split link equity or flag as redirect chain.
**Why it happens:** If sitemap iterates over all `getServices()` slugs without exclusion filter.
**How to avoid:** Filter out `slug === 'providers-bio'` in sitemap.ts. Also exclude from any other slug iteration.
**Warning signs:** Build shows 120 pages when only 119 unique destinations exist.

### Pitfall 3: changeFrequency TypeScript Error
**What goes wrong:** `changeFrequency: 'monthly'` causes TypeScript error "Type 'string' is not assignable to type..." because TypeScript widens the string literal.
**Why it happens:** When building the array dynamically (e.g., inside a `.map()`), the object literal is not in position to be narrowed.
**How to avoid:** Add `as const` after the string: `changeFrequency: 'monthly' as const`. Or declare the entire entry object with explicit type annotation.
**Warning signs:** TypeScript build error on sitemap.ts at the `changeFrequency` property.

### Pitfall 4: BreadcrumbList on Homepage
**What goes wrong:** Adding BreadcrumbList with only one item (home) to the homepage is schema.org non-compliant — BreadcrumbList requires at least 2 ListItems for Google to interpret it correctly.
**Why it happens:** Treating homepage like other non-home pages.
**How to avoid:** Only add BreadcrumbJsonLd to non-home pages. Homepage gets no breadcrumb.
**Warning signs:** Google Rich Results Test flags single-item breadcrumb as invalid.

### Pitfall 5: Duplicate OG Image from Layout Inheritance
**What goes wrong:** A page that sets `openGraph: { title: '...', url: '...' }` without `images` inherits the layout-level OG image — but only if the page's `openGraph` object does not overwrite the layout's entire `openGraph` object. Since Next.js performs **shallow merge**, if a page sets any `openGraph` field, the parent layout's `openGraph.images` is dropped entirely.
**Why it happens:** Metadata merging is shallow — child `openGraph` object completely replaces parent `openGraph` object.
**How to avoid:** Either always include `images` in every page's `openGraph` object, OR define a shared `ogImage` constant in a shared file and spread it into each page's `openGraph`.

Recommended shared pattern:
```typescript
// stella-mattina/src/lib/seo/og.ts
export const defaultOgImage = {
  url: '/images/og-default.jpg',
  width: 1200,
  height: 630,
  alt: "Stella Mattina Women's Health",
}
```
Then in each page: `openGraph: { ...otherFields, images: [defaultOgImage] }`

**Warning signs:** Pages show no OG image when shared to social media despite root layout defining one.

### Pitfall 6: Static Export Compatibility
**What goes wrong:** `app/sitemap.ts` and `app/robots.ts` are Route Handlers cached by default. If the project uses `output: 'export'` in next.config.ts, these do NOT work — Next.js static export does not support Route Handlers.
**Why it's not a risk here:** The project does NOT use `output: 'export'` (confirmed by reviewing next.config.ts — only `images.remotePatterns` is set). Sitemap.ts and robots.ts are safe.
**Warning signs:** Build error "Route Handlers are not compatible with static export mode."

---

## Code Examples

Verified patterns from official Next.js 16.1.6 documentation:

### sitemap.ts Type Definition

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
type Sitemap = Array<{
  url: string
  lastModified?: string | Date
  changeFrequency?:
    | 'always' | 'hourly' | 'daily' | 'weekly'
    | 'monthly' | 'yearly' | 'never'
  priority?: number
  alternates?: {
    languages?: Languages<string>
  }
}>
```

### robots.ts Type Definition

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
type Robots = {
  rules:
    | {
        userAgent?: string | string[]
        allow?: string | string[]
        disallow?: string | string[]
        crawlDelay?: number
      }
    | Array<{
        userAgent: string | string[]
        allow?: string | string[]
        disallow?: string | string[]
        crawlDelay?: number
      }>
  sitemap?: string | string[]
  host?: string
}
```

### Metadata with alternates.canonical

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#alternates
export const metadata: Metadata = {
  alternates: {
    canonical: '/about',  // resolves to https://example.com/about via metadataBase
  },
}
// Output: <link rel="canonical" href="https://example.com/about" />
```

### openGraph with images

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#opengraph
export const metadata: Metadata = {
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    url: '/page-path',
    type: 'website',
    images: [
      {
        url: 'https://example.com/og.png',  // absolute URL required (or use metadataBase + relative)
        width: 1200,
        height: 630,
        alt: 'Alt text',
      },
    ],
  },
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next-sitemap` post-build script | `app/sitemap.ts` built-in convention | Next.js 13.3 | Zero dependencies; runs at build time like any other route |
| Manual `<meta>` tags in `_document.js` | `export const metadata` / `generateMetadata` in page.tsx | Next.js 13.2 | Server-side, TypeScript-typed, no client hydration |
| Static `public/robots.txt` file | `app/robots.ts` file convention | Next.js 13.3 | Programmatic composition; imports shared constants |
| `next/head` component | `metadata` object or `generateMetadata` | Next.js 13 App Router | Eliminated Pages Router pattern entirely |
| OG image via third-party service | `app/opengraph-image.tsx` with `ImageResponse` | Next.js 13.3 | Zero external deps; generates at build time |

**Deprecated/outdated in this project:**
- `next/head`: Not used anywhere — project is App Router throughout. Confirmed correct.
- `_document.js`: Not applicable to App Router. Confirmed absent.

---

## Open Questions

1. **OG image asset — does `/images/og-default.jpg` exist?**
   - What we know: The root layout references `/images/hero-doctor-consultation.jpg` for the homepage hero image.
   - What's unclear: Whether a proper 1200×630 OG image exists in `public/images/` or needs to be created.
   - Recommendation: Check `stella-mattina/public/images/` at plan time. If no OG image exists, use the hero image path as the OG image for now (imperfect but functional); flag creation of a proper 1200×630 crop as a follow-up.

2. **Trailing slash behavior on canonical URLs**
   - What we know: This was flagged as a concern in Phase 1 (01-05-SUMMARY.md blocker note). The existing WordPress site URL canonicalization behavior is unknown.
   - What's unclear: Whether the Next.js build adds trailing slashes by default, and whether the WordPress site canonicalized with or without trailing slashes.
   - Recommendation: Use no trailing slash in all canonical URLs (e.g., `/about-us` not `/about-us/`). Next.js default is no trailing slash unless `trailingSlash: true` in next.config.ts. Verify next.config.ts has no `trailingSlash` setting (confirmed: it doesn't) — canonical URLs with no slash are correct.

3. **Should BreadcrumbList use absolute URLs or relative?**
   - What we know: Schema.org BreadcrumbList `item` property should be an absolute URL. The project pattern for all JSON-LD is to use absolute URLs (`https://stellamattina.com/...`).
   - What's unclear: Nothing — use absolute URLs. Consistent with existing Phase 2 JSON-LD.
   - Recommendation: Use `https://stellamattina.com` as the prefix in all BreadcrumbJsonLd items.

---

## Complete Page Inventory for Phase 4 Tasks

### Pages Requiring metadata updates (canonical + OG)

**Static pages (19 files with `export const metadata`):**
| File | Current State | Needed |
|------|--------------|--------|
| `app/layout.tsx` | title template + description | Add `metadataBase` + default `openGraph` |
| `app/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/about-us/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/contact-us/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/careers/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/blog/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/doctor-directory/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/find-our-locations/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/services/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/patient-information/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/gynecology/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/biote-hormone-therapy/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/gynecologist-dallas/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/hormone-pellet-therapy-dallas/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/prenatal-care-near-me/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/primary-care-physician-dallas/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/maternal-fetal-medicine/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/ginecologo-dallas/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |
| `app/womens-health/page.tsx` | title + description | Add `alternates.canonical` + `openGraph` |

**Dynamic pages (3 files with `generateMetadata`):**
| File | Route Count | Needed |
|------|------------|--------|
| `app/doctor-directory/[slug]/page.tsx` | 29 pages | Add `alternates.canonical` + `openGraph` to return value |
| `app/blog/[slug]/page.tsx` | 61 pages | Add `alternates.canonical` + `openGraph` to return value |
| `app/find-our-locations/[slug]/page.tsx` | 7 pages | Add `alternates.canonical` + `openGraph` to return value |

**Pages NOT needing metadata updates:**
| File | Reason |
|------|--------|
| `app/providers-bio/page.tsx` | Server-side redirect — no metadata needed, not in sitemap |

### Pages Requiring BreadcrumbJsonLd

All non-home pages need BreadcrumbJsonLd. This includes all 21 pages above (excluding `app/layout.tsx` and `app/page.tsx` / homepage). BreadcrumbJsonLd replaces the need for a visible breadcrumb UI component — the JSON-LD satisfies the schema.org requirement without visual breadcrumb navigation.

---

## Sources

### Primary (HIGH confidence)
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap — Sitemap API, `MetadataRoute.Sitemap` type, version history (confirmed v13.3 introduction, v13.4.14 added changeFrequency/priority)
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots — Robots API, `MetadataRoute.Robots` type, per-agent rules array
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata — Full metadata fields reference: `metadataBase`, `alternates.canonical`, `openGraph`, inheritance/merging behavior
- https://nextjs.org/docs/app/getting-started/metadata-and-og-images — OG image approaches (static file, generateMetadata, ImageResponse)
- https://nextjs.org/docs/app/guides/json-ld — Official JSON-LD pattern: `<script type="application/ld+json">` in page component

### Secondary (MEDIUM confidence)
- https://momenticmarketing.com/blog/ai-search-crawlers-bots — AI crawler user agent strings for robots.txt (ChatGPT-User, GPTBot, OAI-SearchBot, PerplexityBot, Perplexity-User, Google-Extended) — cross-referenced with OpenAI community docs

### Tertiary (LOW confidence)
- None — all critical claims verified against official Next.js docs.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified against Next.js 16.1.6 official docs (exact version running in project)
- Architecture: HIGH — patterns directly mirror existing Phase 2/3 code patterns in the codebase
- Pitfalls: HIGH — metadataBase, changeFrequency as const, OG shallow merge all documented in official Next.js API reference

**Research date:** 2026-02-27
**Valid until:** 2026-05-27 (90 days — Next.js metadata API is stable; AI crawler user agents may evolve faster)

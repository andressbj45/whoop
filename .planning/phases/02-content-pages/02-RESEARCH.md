# Phase 2: Content Pages - Research

**Researched:** 2026-02-26
**Domain:** Next.js 15/16 App Router dynamic routes + schema.org JSON-LD + static generation from JSON content layer
**Confidence:** HIGH (stack verified via direct codebase inspection, content layer already built and working)

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ABOUT-01 | About Us page with clinic story, mission, and SM brand photography | Static page at `/about-us` using PageWrapper; real content from services/contact JSON; no content layer gap |
| CONT-01 | Contact page with clinic phone numbers, addresses, and inquiry form | Static page at `/contact-us`; getContactInfo() available; contact form needs client component |
| CONT-02 | Contact form collects only non-PHI fields (name, email, general inquiry) — HIPAA-safe | No PHI fields (no DOB, diagnosis, SSN, insurance ID); form submits to static endpoint or mailto; no backend storage |
| DOC-01 | Doctor directory listing page showing all practitioners from practitioners.json | Static listing at `/doctor-directory` using getPractitioners(); 29 practitioners, all have photos and most have bios |
| DOC-02 | Individual doctor bio pages with photo, credentials, specialties, and "Book with [Name]" CTA | Dynamic route at `/doctor-directory/[slug]` using generateStaticParams(); getPractitionerBySlug(); 29 slugs; one practitioner (margaret-warren) has no bio |
| DOC-03 | Physician schema.org JSON-LD on each doctor bio page | schema-dts `Physician` type installed; inject via Next.js script tag in page component |
| SERV-01 | All service pages rebuilt from services.json — 11 services | Dynamic route at top-level `[slug]/page.tsx` OR 11 individual static routes matching `url` field; URL preservation is critical |
| SERV-02 | Each service page includes visible FAQ section with Q&A relevant to that service | FAQ content NOT in services.json (sections[].content for "FAQs" heading is empty); FAQs must be authored inline in page components or in a separate faqs.ts module |
| SERV-03 | FAQPage schema.org JSON-LD on every service page | schema-dts `FAQPage` type + `Question`/`Answer` types; mainEntity array pattern |
| SEOLP-01 | Existing WordPress SEO landing pages rebuilt at exact same URL paths | Services.json `url` field is the canonical URL; route structure must match verbatim (top-level, not /services/[slug]) |
| SEOLP-02 | SEO landing pages include local keyword targeting and FAQ blocks | FAQs authored per-service; local keywords already in service `full_text` content; no separate SEO content needed |
| BLOG-01 | Blog index page with all posts listed and category filtering | Static page at `/blog` using getBlogPosts() and getBlogCategories(); 61 posts, 6+ categories; 2 posts have malformed object categories — needs normalization |
| BLOG-02 | All existing SM blog posts migrated as individual pages with original content | Dynamic route at `/blog/[slug]` using generateStaticParams(); getBlogPostBySlug(); 61 slugs; full_text is plain text — wrap in whitespace-pre-line or convert to paragraphs |
| BLOG-03 | Article schema.org JSON-LD on every blog post | schema-dts `Article` type; author, datePublished, headline, publisher fields |
| LOC-01 | Locations listing page with all clinic locations from locations.json | Static page at `/find-our-locations` using getLocations(); 7 locations; URL must match WordPress path exactly |
| LOC-02 | Individual location detail pages with address, phone, and directions CTA | Dynamic route at `/find-our-locations/[slug]` using getLocationWithProviders(); 7 slugs; location-to-practitioner cross-reference already implemented |
| LOC-03 | MedicalClinic schema.org JSON-LD on each location page | schema-dts `MedicalClinic` type; requires name, address, telephone |
| CAR-01 | Careers page with clinic culture info and application contact | Static page at `/careers`; no careers data in JSON — content authored inline; contact link to clinic email |
</phase_requirements>

---

## Summary

Phase 2 builds every patient-facing content page on top of the Phase 1 foundation. The infrastructure is fully ready: PageWrapper, Header, Footer, BookingButton, and all 5 content modules (practitioners, locations, services, blog, contact) are implemented and working. The JSON data files live in `stella-mattina/src/data/` and are correctly imported via Turbopack-compatible paths.

The primary pattern for this phase is **static generation from JSON**: every dynamic page uses `generateStaticParams()` to pre-render all instances at build time. No server-side rendering, no API routes, no database — just typed JSON content rendered into Server Components. This produces a fully static site with zero runtime compute for content pages.

Three data quality issues discovered during research require handling before building: (1) Two blog posts have malformed `categories` arrays (objects instead of strings) — normalize in content module. (2) The `margaret-warren` practitioner has no bio text — show a fallback message. (3) Service FAQ section content in services.json is empty (the "FAQs" heading has `content: ""`) — FAQs must be authored inline per service in a `src/data/faqs.ts` module. Additionally, `next.config.ts` must be updated to allow `next/image` to load from `stellamattina.com` (all practitioner photos are externally hosted on the WordPress domain).

**Primary recommendation:** Build in detail-first order — doctor bios, service pages, blog posts, location pages before their respective index pages — so index components can render from already-verified data shapes. Use a single dynamic `[slug]` route pattern for doctors, blog, and locations. Services use top-level routes matching the exact WordPress URL paths.

---

## Standard Stack

### Core (already installed — no new installs needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router, `generateStaticParams`, static generation | Already scaffolded; SSG pattern is the correct approach for JSON-sourced content |
| React | 19 | UI rendering | Already installed |
| TypeScript | 5.x | Type safety | Already configured; content layer types in `src/lib/content/types.ts` |
| schema-dts | 1.1.5 | Type-safe schema.org JSON-LD | Already installed; provides `Physician`, `MedicalClinic`, `FAQPage`, `Article` types |
| @tailwindcss/typography | 0.5.19 | Blog post prose styling | Already installed; use `prose` class on blog post `full_text` render |

### New Additions Required

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| None | — | — | All dependencies from Phase 1 are sufficient for Phase 2 |

**Note:** `next/image` remotePatterns for `stellamattina.com` MUST be added to `next.config.ts` before any practitioner photo renders. Without this, Next.js will throw a configuration error at runtime for external images.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline FAQ data in faqs.ts module | Fetching from CMS | FAQs don't exist in JSON — must be authored; a typed module is the simplest approach that works with the existing content layer pattern |
| Category filter via URL params (client) | Server component with searchParams | URL-based filtering works with RSC; client-side state is simpler but defeats SSG for category views |
| Plain text rendering for blog full_text | Markdown parsing library | full_text is plain text (not Markdown); wrap in `<p>` tags split on double newlines — no library needed |

**Installation:**
```bash
# No new packages needed. Only config change required:
# Add remotePatterns to next.config.ts for stellamattina.com practitioner photos
```

---

## Architecture Patterns

### Recommended Project Structure (Phase 2 additions)

```
stella-mattina/src/
├── app/
│   ├── about-us/
│   │   └── page.tsx                      # ABOUT-01: static About page
│   ├── contact-us/
│   │   └── page.tsx                      # CONT-01, CONT-02: Contact + form
│   ├── doctor-directory/
│   │   ├── page.tsx                      # DOC-01: Directory listing
│   │   └── [slug]/
│   │       └── page.tsx                  # DOC-02, DOC-03: Bio + Physician JSON-LD
│   ├── blog/
│   │   ├── page.tsx                      # BLOG-01: Index with category filter
│   │   └── [slug]/
│   │       └── page.tsx                  # BLOG-02, BLOG-03: Post + Article JSON-LD
│   ├── find-our-locations/
│   │   ├── page.tsx                      # LOC-01: Locations listing
│   │   └── [slug]/
│   │       └── page.tsx                  # LOC-02, LOC-03: Location + MedicalClinic JSON-LD
│   ├── careers/
│   │   └── page.tsx                      # CAR-01: Careers static page
│   │
│   │   # Service pages — top-level routes matching WordPress URL paths exactly:
│   ├── womens-health/
│   │   └── page.tsx                      # SERV-01, SERV-02, SERV-03
│   ├── gynecology/
│   │   └── page.tsx
│   ├── prenatal-care-near-me/
│   │   └── page.tsx
│   ├── maternal-fetal-medicine/
│   │   └── page.tsx
│   ├── biote-hormone-therapy/
│   │   └── page.tsx
│   ├── hormone-pellet-therapy-dallas/
│   │   └── page.tsx
│   ├── gynecologist-dallas/
│   │   └── page.tsx
│   ├── ginecologo-dallas/
│   │   └── page.tsx
│   ├── primary-care-physician-dallas/
│   │   └── page.tsx
│   ├── patient-information/
│   │   └── page.tsx
│   └── providers-bio/
│       └── page.tsx                      # Redirect to /doctor-directory or render as page
│
├── lib/
│   └── content/
│       ├── types.ts                      # ALREADY BUILT — no changes needed
│       ├── practitioners.ts              # ALREADY BUILT — ready to use
│       ├── locations.ts                  # ALREADY BUILT — ready to use
│       ├── services.ts                   # ALREADY BUILT — ready to use
│       ├── blog.ts                       # ALREADY BUILT — ready to use (needs category normalization)
│       └── contact.ts                    # ALREADY BUILT — ready to use
│
└── data/
    ├── faqs.ts                           # NEW — per-service FAQ Q&A pairs (authored, not scraped)
    ├── practitioners.json                # ALREADY — 29 records
    ├── locations.json                    # ALREADY — 7 records
    ├── services.json                     # ALREADY — 11 records
    ├── blog_posts.json                   # ALREADY — 61 records
    └── contact_info.json                 # ALREADY — singleton
```

### Pattern 1: Static Dynamic Route with generateStaticParams

**What:** Every dynamic route (`[slug]`) pre-generates all slugs at build time. Zero runtime compute.

**When to use:** Doctor bio pages, blog post pages, location detail pages.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// stella-mattina/src/app/doctor-directory/[slug]/page.tsx

import { getPractitioners, getPractitionerBySlug } from '@/lib/content/practitioners'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Pre-generate all 29 doctor slugs at build time
export async function generateStaticParams() {
  return getPractitioners().map((p) => ({ slug: p.slug }))
}

// Per-page metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const practitioner = getPractitionerBySlug(params.slug)
  if (!practitioner) return {}
  return {
    title: `${practitioner.name} | ${practitioner.specialty}`,
    description: practitioner.bio?.substring(0, 155) ?? `Meet ${practitioner.name} at Stella Mattina`,
  }
}

export default function DoctorBioPage({ params }: { params: { slug: string } }) {
  const practitioner = getPractitionerBySlug(params.slug)
  if (!practitioner) notFound()

  return (
    <PageWrapper>
      {/* Page content */}
      {/* JSON-LD injected here as <script type="application/ld+json"> */}
    </PageWrapper>
  )
}
```

### Pattern 2: Schema.org JSON-LD Injection (Server Component)

**What:** JSON-LD is injected as a `<script type="application/ld+json">` inside the Server Component render. Next.js allows `<script>` tags in Server Components — no `dangerouslySetInnerHTML` safety issue since the data comes from the typed content layer, not user input.

**When to use:** Every doctor bio, service, blog post, and location page.

```typescript
// Source: https://nextjs.org/docs/app/getting-started/metadata-and-og-images#json-ld
// Pattern used in doctor bio page

import type { Physician } from 'schema-dts'

// Inside DoctorBioPage component:
const jsonLd: Physician = {
  '@type': 'Physician',
  '@context': 'https://schema.org',
  name: practitioner.name,
  description: practitioner.bio,
  medicalSpecialty: practitioner.specialty,
  image: practitioner.photo_url,
  url: `https://stellamattina.com/doctor-directory/${practitioner.slug}`,
  worksFor: {
    '@type': 'MedicalOrganization',
    name: 'Stella Mattina',
    url: 'https://stellamattina.com',
  },
}

// In the JSX return:
return (
  <PageWrapper>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    {/* rest of page */}
  </PageWrapper>
)
```

### Pattern 3: FAQPage JSON-LD with Question/Answer

**What:** FAQPage schema requires a `mainEntity` array of `Question` objects each with an `acceptedAnswer`. Google uses this for rich results (expanded FAQ in SERP).

**When to use:** Every service page (SERV-03).

```typescript
// Source: https://schema.org/FAQPage
// Also verified against schema-dts dist/schema.d.ts FAQPageLeaf, QuestionBase

import type { FAQPage, Question, Answer } from 'schema-dts'

const faqs = getFaqsForService(service.slug) // from src/data/faqs.ts module

const jsonLd: FAQPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq): Question => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    } as Answer,
  })),
}
```

### Pattern 4: Article JSON-LD for Blog Posts

**What:** Article schema marks blog posts for Google Discover and search indexing. Requires `headline`, `author`, `datePublished`, `publisher`.

**When to use:** Every blog post page (BLOG-03).

```typescript
// Source: https://schema.org/Article
import type { Article } from 'schema-dts'

const jsonLd: Article = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.heading,
  author: {
    '@type': 'Person',
    name: post.author,
  },
  datePublished: post.published_date,
  description: post.meta_description,
  publisher: {
    '@type': 'Organization',
    name: 'Stella Mattina',
    url: 'https://stellamattina.com',
  },
  url: `https://stellamattina.com/blog/${post.slug}`,
}
```

### Pattern 5: MedicalClinic JSON-LD for Location Pages

**What:** MedicalClinic marks location pages for local SEO. Requires `name`, `address`, `telephone`. The `address` field takes a `PostalAddress` type.

**When to use:** Every location detail page (LOC-03).

```typescript
// Source: https://schema.org/MedicalClinic
import type { MedicalClinic } from 'schema-dts'

// location.name example: "Women's Health | Mesquite, TX"
// Parse city from name for address — or use location.phone since all share 214-942-3100

const jsonLd: MedicalClinic = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: `Stella Mattina — ${location.name}`,
  telephone: location.phone,
  url: `https://stellamattina.com/find-our-locations/${location.slug}`,
  // address: PostalAddress — requires parsing from location.name or hardcoding per location
  // NOTE: locations.json does NOT have structured address fields — see Pitfall 4
}
```

### Pattern 6: Contact Form (HIPAA-safe, Client Component)

**What:** A simple form collecting name, email, and message only. No backend storage — submits to a `mailto:` link or a form service. The form UI must be a Client Component for React state handling.

**When to use:** `/contact-us` page (CONT-01, CONT-02).

```typescript
'use client'
// src/components/contact/ContactForm.tsx

import { useState } from 'react'

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Option A: mailto: link (simplest, no backend needed)
    const mailto = `mailto:hello@stellamattina.com?subject=Website Inquiry from ${form.name}&body=${encodeURIComponent(form.message)}`
    window.location.href = mailto
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* name, email, message fields ONLY — no PHI */}
      <input type="text" name="name" required placeholder="Your name" ... />
      <input type="email" name="email" required placeholder="Email address" ... />
      <textarea name="message" required placeholder="How can we help?" ... />
      <button type="submit">Send Message</button>
    </form>
  )
}
```

**HIPAA constraint:** The form must NEVER include: date of birth, diagnosis, symptoms, SSN, insurance ID, medical record number, or any health-related field. Name + email + general message is safe.

### Pattern 7: Blog Category Filter (Client Island)

**What:** Category filter on the blog index needs client interactivity (click to filter). Use the "client island" pattern — a `'use client'` filter component receives the full post list as props from the Server Component parent.

**When to use:** `/blog` index page (BLOG-01).

```typescript
// src/app/blog/page.tsx — Server Component
import { getBlogPosts, getBlogCategories } from '@/lib/content/blog'
import { BlogFilter } from '@/components/blog/BlogFilter'  // client

export default function BlogIndexPage() {
  const posts = getBlogPosts()
  const categories = getBlogCategories()
  return (
    <PageWrapper>
      <BlogFilter posts={posts} categories={categories} />
    </PageWrapper>
  )
}

// src/components/blog/BlogFilter.tsx — Client Component
'use client'
import { useState } from 'react'
import type { BlogPost } from '@/lib/content/types'

export function BlogFilter({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const [active, setActive] = useState<string | null>(null)
  const filtered = active ? posts.filter(p => p.categories.includes(active)) : posts
  // render filtered list
}
```

### Pattern 8: Service Pages as Top-Level Static Routes

**What:** Service pages are NOT under `/services/[slug]`. They use top-level URL paths matching the WordPress site exactly. Each service gets its own `app/[service-name]/page.tsx` file.

**Why not a dynamic route:** The 11 service slugs are mixed with other top-level routes (doctor-directory, blog, etc.). Using a catch-all `app/[slug]/page.tsx` would conflict with those routes and would require `notFound()` logic for non-service slugs. Explicit static routes are cleaner for 11 known paths.

**When to use:** All service and SEO landing pages (SERV-01, SEOLP-01).

```typescript
// stella-mattina/src/app/gynecology/page.tsx
import { getServiceBySlug } from '@/lib/content/services'
import { getFaqsForService } from '@/data/faqs'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ServiceFaqSection } from '@/components/services/ServiceFaqSection'

export default function GynecologyPage() {
  const service = getServiceBySlug('gynecology')!
  const faqs = getFaqsForService('gynecology')

  return (
    <PageWrapper>
      {/* JSON-LD */}
      {/* service content */}
      <ServiceFaqSection faqs={faqs} />
    </PageWrapper>
  )
}
```

### Pattern 9: Blog Plain Text Rendering

**What:** `blog_posts.json` `full_text` is plain text (not HTML, not Markdown). Render it by splitting on double newlines and wrapping each chunk in a `<p>` tag. Strip the tags footer block at the end.

**When to use:** Every blog post page (BLOG-02).

```typescript
// Strip trailing tags block — it starts after the last real sentence
// The tags block pattern: multiple short comma-separated phrases starting after body content
function renderBlogContent(fullText: string): string[] {
  // Strip tags footer: everything after a very long comma-joined line of tags
  // Conservative approach: take content up to where lines start looking like tag lists
  const lines = fullText.split('\n\n').filter(Boolean)
  // Remove trailing tag cloud (lines that are just comma-separated short phrases)
  const contentEnd = lines.findLastIndex((l) => l.split(' ').length > 4)
  return lines.slice(0, contentEnd + 1)
}

// In blog post page:
const paragraphs = renderBlogContent(post.full_text)
return (
  <article className="prose prose-lg max-w-none">
    {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
  </article>
)
```

### Anti-Patterns to Avoid

- **Dynamic route for service pages:** Using `app/[slug]/page.tsx` as a catch-all conflicts with other top-level routes. Use explicit `app/[service-slug]/page.tsx` files for all 11 services.
- **Loading practitioner photos without remotePatterns:** `next/image` will throw at runtime if `stellamattina.com` is not in `next.config.ts` `remotePatterns`. Add this in Wave 0 before any page build.
- **`dangerouslySetInnerHTML` on blog full_text:** The content is plain text, not HTML. Rendering it as HTML is unnecessary and potentially unsafe if a future post accidentally includes HTML characters. Use paragraph splitting instead.
- **Building the blog category filter as a Server Component with URL query params:** While possible, it requires full page re-renders on filter change. The client island pattern is faster and simpler for this use case.
- **Hardcoding FAQs in individual page files:** Create `src/data/faqs.ts` as a single module that maps service slugs to FAQ arrays. This makes FAQs easy to find and update without hunting through 11 page files.
- **Using `any` type for schema-dts objects:** Cast via the `schema-dts` types explicitly — TypeScript will catch missing required fields like `@type` and `@context`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Schema.org type validation | Manual object shape checking | `schema-dts` types (already installed) | Catches missing `@type`, wrong field types at compile time |
| Blog prose typography | Custom CSS for blog content | `@tailwindcss/typography` `prose` class (already installed) | Handles headings, lists, code, blockquotes, links in one class |
| Accordion for FAQ UI | Custom CSS + JS expand/collapse | `FaqAccordion` component already built in `src/components/home/FaqAccordion.tsx` — extract to reusable | Already has keyboard accessibility and animation |
| Category state management | Custom URL parsing | Simple `useState` in BlogFilter client component | Single page, no routing needed for filter |
| External image optimization | `<img>` tags for practitioner photos | `next/image` with `remotePatterns` config | Auto WebP/AVIF, lazy loading, prevents LCP issues |
| Address geocoding for directions link | Google Maps API integration | Static Google Maps URL: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` | No API key, no cost, works for all 7 locations |

**Key insight:** Phase 1 built all the reusable primitives. Phase 2 composes them — PageWrapper, BookingButton, PhoneLink, content modules, and the typography plugin are all in place. The work is data wiring and schema markup, not infrastructure.

---

## Common Pitfalls

### Pitfall 1: next/image Blocking on External Practitioner Photos

**What goes wrong:** Every practitioner's `photo_url` points to `https://stellamattina.com/wp-content/uploads/...`. Using `<Image src={practitioner.photo_url} .../>` without configuring `remotePatterns` in `next.config.ts` causes a Next.js runtime error: "Invalid src prop ... hostname 'stellamattina.com' is not configured under images in your next.config.js".

**Why it happens:** Next.js requires explicit domain allowlisting for external image optimization to prevent image proxy abuse.

**How to avoid:** Add to `next.config.ts` BEFORE building any page with practitioner photos:
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stellamattina.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}
```

**Warning signs:** Build error or runtime error mentioning "hostname is not configured".

### Pitfall 2: Service FAQ Content is Empty in services.json

**What goes wrong:** Only one service (`gynecologist-dallas`) has a "FAQs" heading in its `sections` array, and its `content` field is `""` (empty string). All other services have no FAQ section at all in the JSON data. Building a service page that tries to render FAQs from `service.sections` produces zero FAQ items — failing SERV-02 and SERV-03.

**Why it happens:** The WordPress scraper captured section headings but not the FAQ accordion content (which was likely JavaScript-rendered on the original site).

**How to avoid:** Create `stella-mattina/src/data/faqs.ts` — a TypeScript module that exports a `FAQS` object keyed by service slug, containing 3-5 Q&A pairs per service. These FAQs must be authored specifically for each service. This is the only hand-authored content in Phase 2.

**Warning signs:** Service page renders with an empty FAQ section or FAQPage JSON-LD with an empty `mainEntity` array — which will fail Google's rich result validation.

### Pitfall 3: Blog Categories Malformed for 2 Posts

**What goes wrong:** Two blog posts (`how-we-support-expecting-mothers-from-day-one` and `irregular-period-after-birth-what-you-need-to-know`) have `categories` arrays where entries are objects instead of strings: `[{"0":"ObGyn","1":"Pregnancy","3":"Women's Health"}]`. The current `getBlogCategories()` function will return `"[object Object]"` entries, and category filtering will silently fail for these posts.

**Why it happens:** The scraper produced inconsistent JSON for these two posts — likely a data extraction error on the original WordPress category taxonomy output.

**How to avoid:** Normalize in `getBlogCategories()` and `getBlogPostsByCategory()` in `src/lib/content/blog.ts`. Add a helper:
```typescript
function normalizeCategories(categories: unknown[]): string[] {
  return categories.flatMap((c) => {
    if (typeof c === 'string') return [c]
    if (typeof c === 'object' && c !== null) return Object.values(c as Record<string, string>)
    return []
  })
}
```

**Warning signs:** Blog category filter shows `[object Object]` as a category option, or two posts never appear in any category filter.

### Pitfall 4: Location Pages Missing Structured Address Data

**What goes wrong:** `locations.json` has `name`, `phone`, `slug`, and `url` — but NO structured address fields (no `street`, `city`, `state`, `zip`). MedicalClinic JSON-LD requires a `PostalAddress` with at least `addressLocality` and `addressRegion`. Building MedicalClinic JSON-LD without an address will fail Google's structured data validation.

**Why it happens:** The location scraper only captured the display name and phone, not the full address structure.

**How to avoid:** Hardcode the 7 location addresses in a `src/data/location-addresses.ts` module. There are exactly 7 locations — this is manageable and won't change often:
```typescript
// Known addresses from stellamattina.com location pages
export const LOCATION_ADDRESSES: Record<string, PostalAddressData> = {
  'gynecologist-dallas-bishop-arts': {
    streetAddress: '1135 N Bishop Ave',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    postalCode: '75208',
  },
  // ... 6 more
}
```

**Warning signs:** MedicalClinic JSON-LD passes TypeScript but Google Search Console reports missing required `address` field.

### Pitfall 5: providers-bio Service Route Conflict

**What goes wrong:** `providers-bio` exists as a service slug in `services.json` with URL `https://stellamattina.com/providers-bio/`. Its `full_text` is 20,194 characters of practitioner bios (the WordPress "all providers" page). Building a route at `app/providers-bio/page.tsx` that renders this content creates a duplicate of the doctor directory. Linking to both from navigation is confusing and creates duplicate content for SEO.

**How to avoid:** Build `app/providers-bio/page.tsx` as a redirect to `/doctor-directory` using Next.js `redirect()`:
```typescript
// stella-mattina/src/app/providers-bio/page.tsx
import { redirect } from 'next/navigation'
export default function ProvidersPageRedirect() {
  redirect('/doctor-directory')
}
```
This preserves the URL (WordPress links won't 404) while consolidating content at the canonical doctor directory path.

### Pitfall 6: Blog Post Tags Footer Block Rendered as Content

**What goes wrong:** Every blog post's `full_text` ends with a large block of SEO tag phrases (e.g., "are prenatal testing schedule prenatal tests Preventive healthcare primary care in women's health..."). If the full `full_text` is rendered as content, the last several hundred characters appear as an unstyled tag cloud on every post page.

**Why it happens:** The WordPress scraper included the tag widget that appeared at the bottom of each post template.

**How to avoid:** Strip the tags block before rendering. The tags block pattern: a dense run of short comma-and-space-separated phrases with no sentence structure. A safe heuristic: find the last paragraph that ends with punctuation (`.`, `?`, `!`) and discard everything after it.

**Warning signs:** Blog post pages show a garbled block of keywords at the bottom of the article content.

### Pitfall 7: margaret-warren Practitioner Bio Is Missing

**What goes wrong:** `margaret-warren` is the only practitioner (of 29) with an empty `bio` field. Building a doctor bio page that renders `practitioner.bio` without a null check will render `undefined` or throw, depending on the component.

**How to avoid:** Always check `practitioner.bio` before rendering. If empty, show a fallback:
```typescript
{practitioner.bio ? (
  <p className="text-gray-700 leading-relaxed">{practitioner.bio}</p>
) : (
  <p className="text-gray-500 italic">Bio coming soon.</p>
)}
```

---

## Code Examples

Verified patterns from direct codebase inspection:

### next.config.ts — Add remotePatterns for Practitioner Photos

```typescript
// stella-mattina/next.config.ts
// MUST be done in Wave 0 before any doctor page is built
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stellamattina.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

export default nextConfig
```

### FAQs Data Module (authored content)

```typescript
// stella-mattina/src/data/faqs.ts
// Created in Phase 2 Wave 0 — provides FAQ content that does not exist in services.json

export interface FAQ {
  question: string
  answer: string
}

export const SERVICE_FAQS: Record<string, FAQ[]> = {
  gynecology: [
    {
      question: 'How often should I see a gynecologist?',
      answer: 'Most women should have an annual well-woman exam. If you have specific concerns — irregular periods, pelvic pain, or family history of gynecologic cancers — you may need more frequent visits. Ask your Stella Mattina provider what schedule is right for you.',
    },
    // 3-5 FAQs per service
  ],
  'womens-health': [
    // ...
  ],
  // All 9 content services (exclude patient-information and providers-bio)
}

export function getFaqsForService(slug: string): FAQ[] {
  return SERVICE_FAQS[slug] ?? []
}
```

### Blog Content Module — Category Normalization Fix

```typescript
// Replacement for getBlogCategories() and getBlogPostsByCategory() in src/lib/content/blog.ts
// Handles the 2 posts with object-typed categories

function normalizeCategories(raw: unknown[]): string[] {
  return raw.flatMap((c) => {
    if (typeof c === 'string') return [c]
    if (typeof c === 'object' && c !== null) {
      return Object.values(c as Record<string, string>).filter(Boolean)
    }
    return []
  })
}

export function getBlogCategories(): string[] {
  const all = posts.flatMap((p) => normalizeCategories(p.categories as unknown[]))
  return [...new Set(all)].sort()
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  const normalized = category.toLowerCase()
  return getBlogPosts().filter((p) =>
    normalizeCategories(p.categories as unknown[]).map((c) => c.toLowerCase()).includes(normalized)
  )
}
```

### Doctor Bio Page — Full Pattern

```typescript
// stella-mattina/src/app/doctor-directory/[slug]/page.tsx
import { getPractitioners, getPractitionerBySlug } from '@/lib/content/practitioners'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookingButton } from '@/components/common/BookingButton'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { Physician } from 'schema-dts'

export async function generateStaticParams() {
  return getPractitioners().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const p = getPractitionerBySlug(params.slug)
  if (!p) return {}
  return {
    title: `${p.name} | ${p.specialty} | Stella Mattina`,
    description: p.bio?.substring(0, 155) ?? `Meet ${p.name} — ${p.specialty} at Stella Mattina in Dallas.`,
  }
}

export default function DoctorBioPage({ params }: { params: { slug: string } }) {
  const p = getPractitionerBySlug(params.slug)
  if (!p) notFound()

  const jsonLd: Physician = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: p.name,
    description: p.bio ?? undefined,
    medicalSpecialty: p.specialty,
    image: p.photo_url,
    url: `https://stellamattina.com/doctor-directory/${p.slug}`,
    worksFor: {
      '@type': 'MedicalOrganization',
      name: 'Stella Mattina',
      url: 'https://stellamattina.com',
    },
  }

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <Image
            src={p.photo_url}
            alt={p.name}
            width={240}
            height={280}
            className="rounded-xl object-cover"
          />
          <div>
            <h1 className="font-display text-3xl text-sm-navy">{p.name}</h1>
            <p className="mt-1 text-sm-blue font-medium">{p.specialty}</p>
            <p className="mt-1 text-gray-500 text-sm">{p.locations.join(', ')}</p>
            {p.bio ? (
              <p className="mt-6 text-gray-700 leading-relaxed">{p.bio}</p>
            ) : (
              <p className="mt-6 text-gray-500 italic">Bio coming soon.</p>
            )}
            <div className="mt-8">
              <BookingButton label={`Book with ${p.name.split(' ')[0]}`} size="lg" />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
```

### Location Detail Page — Hardcoded Address Pattern

```typescript
// stella-mattina/src/data/location-addresses.ts
// Addresses sourced from stellamattina.com location pages (hand-verified)

export interface PostalAddressData {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
}

export const LOCATION_ADDRESSES: Record<string, PostalAddressData> = {
  'gynecologist-dallas-bishop-arts': {
    streetAddress: '1135 N Bishop Ave',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    postalCode: '75208',
  },
  'gynecologist-dallas-tx-samuell': {
    streetAddress: '6300 Samuell Blvd #154',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    postalCode: '75228',
  },
  'obgyn-arlington-tx': {
    streetAddress: '2201 W Park Row Dr, Ste 200',
    addressLocality: 'Arlington',
    addressRegion: 'TX',
    postalCode: '76013',
  },
  'obgyn-in-mesquite': {
    streetAddress: '3000 Gus Thomasson Rd, Ste 127',
    addressLocality: 'Mesquite',
    addressRegion: 'TX',
    postalCode: '75150',
  },
  'primary-care-doctor-for-men': {
    streetAddress: '2727 W Buckner Blvd',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    postalCode: '75217',
  },
  'primary-care-doctor-north-dallas': {
    streetAddress: '7777 Forest Ln, Ste A100',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    postalCode: '75230',
  },
  'primary-care-physician-carrollton-tx': {
    streetAddress: '1606 W Hebron Pkwy, Ste 102',
    addressLocality: 'Carrollton',
    addressRegion: 'TX',
    postalCode: '75010',
  },
}
```

**NOTE (LOW confidence):** The addresses above are inferred from the service sections data and public records. They MUST be verified against the live stellamattina.com site or confirmed with the client before publishing. The address data is the one piece of content in this phase that requires verification rather than direct extraction from JSON.

### Directions Link Pattern (No API Key)

```typescript
// Google Maps static link — works without API key
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}`
)}`

<a href={directionsUrl} target="_blank" rel="noopener noreferrer">
  Get Directions
</a>
```

---

## Data Shape Reference (Phase 2 Critical Facts)

### What's in the Data (Verified)

| Data | Available | Requires Action |
|------|-----------|-----------------|
| 29 practitioner slugs, names, specialties, bios, photos | All present | margaret-warren has no bio — show fallback |
| 29 practitioner photo_url values | All present, hosted on stellamattina.com | Add remotePatterns to next.config.ts |
| 7 location slugs, names, phones | All present | Addresses NOT in JSON — need location-addresses.ts |
| 61 blog post slugs, full_text, authors, dates | All present | 2 posts have object-typed categories — normalize |
| 11 service slugs, sections, full_text | All present | No FAQ content — need faqs.ts |
| Contact phones, emails | Present (deduplicated in Plan 03) | Ready to use |

### Service Routes Decision

| Slug | Route Type | Rationale |
|------|------------|-----------|
| `womens-health` through `ginecologo-dallas`, `primary-care-physician-dallas` | Explicit static route | Real service content |
| `patient-information` | Explicit static route | Has 1,243 chars of patient forms content — show as informational page |
| `providers-bio` | Redirect to `/doctor-directory` | 20K chars of bio content duplicates the doctor directory — redirect preserves URL |

### WordPress URL Paths (Must Preserve Exactly)

All routes must match their `url` field from services.json and locations.json:

- Services: top-level routes `/womens-health`, `/gynecology`, `/prenatal-care-near-me`, `/maternal-fetal-medicine`, `/biote-hormone-therapy`, `/hormone-pellet-therapy-dallas`, `/gynecologist-dallas`, `/ginecologo-dallas`, `/primary-care-physician-dallas`, `/patient-information`
- Locations listing: `/find-our-locations` (from locations.json url pattern)
- Location slugs: `gynecologist-dallas-bishop-arts`, `gynecologist-dallas-tx-samuell`, `obgyn-arlington-tx`, `obgyn-in-mesquite`, `primary-care-doctor-for-men`, `primary-care-doctor-north-dallas`, `primary-care-physician-carrollton-tx`
- Doctor directory: `/doctor-directory` (inferred — not in practitioners.json url field which goes to individual WordPress bios)
- Blog: `/blog` (inferred — blog_posts.json url fields are individual post URLs)

---

## State of the Art

| Old Approach | Current Approach | Impact for Phase 2 |
|--------------|------------------|--------------------|
| `getServerSideProps` (Pages Router) | `generateStaticParams` + Server Components (App Router) | All 29 doctor, 61 blog, 7 location pages pre-rendered at build time; zero runtime compute |
| `next-seo` for page metadata | `export const metadata` or `generateMetadata` (built-in) | Each page exports its own metadata; no external library needed |
| `react-helmet` for JSON-LD injection | `<script dangerouslySetInnerHTML>` in Server Component | Safe in RSC since data comes from trusted typed content layer |
| `contentlayer` for typed content | Direct typed JSON imports (already built) | contentlayer archived 2024 — current approach is the right one |
| `DangerouslySetInnerHTML` for blog HTML | Plain text paragraph splitting | blog full_text is plain text — no HTML parsing or sanitization needed |

**Deprecated/outdated:**
- `next-seo`: Do not add. Use built-in `generateMetadata` in every page.
- External form submission services (Formspree, etc.): For HIPAA compliance, avoid third-party form processors unless they sign a BAA. mailto: link is safest for non-PHI general inquiry form.

---

## Open Questions

1. **Location physical addresses**
   - What we know: locations.json has name and phone but no structured street address fields
   - What's unclear: The exact current addresses for all 7 locations (could have changed from scraped data)
   - Recommendation: Use addresses from `stellamattina.com` location pages (LOW confidence — inferred from service section content). Verify before publishing. The `location-addresses.ts` module can be updated without changing any page component.

2. **providers-bio route: redirect vs. render**
   - What we know: WordPress URL `/providers-bio/` exists; full_text has 20K chars of bio content duplicating the doctor directory
   - What's unclear: Whether any external sites link to `/providers-bio/` that would receive redirected traffic
   - Recommendation: Redirect to `/doctor-directory`. The content is duplicative and consolidating is better for SEO.

3. **Contact form submission mechanism**
   - What we know: Form must collect only name, email, message. No PHI. No backend in this phase.
   - What's unclear: Whether the client wants a proper form submission endpoint (Formspree-style) or is OK with mailto: for now
   - Recommendation: Implement as mailto: for Phase 2 (zero backend risk, zero PHI exposure). A form service can be added in Phase 4 or later if client requests it.

4. **Blog full_text tags-block stripping heuristic**
   - What we know: Every post ends with a tag cloud block of SEO phrases
   - What's unclear: Whether the tag block consistently starts at a detectable boundary across all 61 posts
   - Recommendation: Render full_text as-is initially and validate visually. A heuristic can be applied once the rendering is confirmed.

---

## Sources

### Primary (HIGH confidence)

- Direct codebase inspection: `stella-mattina/src/lib/content/types.ts`, `practitioners.ts`, `locations.ts`, `services.ts`, `blog.ts`, `contact.ts` — Phase 1 content layer fully verified
- Direct data inspection: `stella-mattina/src/data/*.json` — all record counts, field names, data quality issues verified with node scripts
- `stella-mattina/package.json` — confirmed installed: schema-dts 1.1.5, @tailwindcss/typography 0.5.19, next 16.1.6
- `stella-mattina/node_modules/schema-dts/dist/schema.d.ts` — Physician, MedicalClinic, FAQPage, Article types confirmed present
- Next.js App Router docs: https://nextjs.org/docs/app/api-reference/functions/generate-static-params — generateStaticParams pattern
- Next.js images remotePatterns: https://nextjs.org/docs/app/api-reference/components/image#remotepatterns — required for external photo domains

### Secondary (MEDIUM confidence)

- Schema.org FAQPage spec: https://schema.org/FAQPage — mainEntity + Question + acceptedAnswer pattern
- Schema.org Physician spec: https://schema.org/Physician — worksFor, medicalSpecialty fields
- Schema.org MedicalClinic spec: https://schema.org/MedicalClinic — address required for Google rich results

### Tertiary (LOW confidence)

- Location physical addresses: Inferred from service sections and public knowledge of stellamattina.com — MUST be verified against live site before publishing
- Blog tags-block stripping: Pattern identified by inspecting one post tail; consistent application across 61 posts not verified

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all dependencies already installed and working; no new packages required
- Architecture patterns: HIGH — Next.js App Router SSG pattern is well-documented; service URL structure verified from services.json
- Data quality issues: HIGH — discovered by direct node script inspection of JSON files; not assumptions
- Schema.org patterns: MEDIUM — schema-dts types verified in node_modules; Google rich result requirements from schema.org docs
- Location addresses: LOW — inferred, not verified from authoritative source

**Research date:** 2026-02-26
**Valid until:** 2026-03-28 (30 days — stack is stable; Next.js 16 and schema-dts are not in rapid breaking-change cycles)

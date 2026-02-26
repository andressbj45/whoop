# Architecture Patterns

**Domain:** Medical clinic website rebuild (Next.js from WordPress + scraped reference)
**Researched:** 2026-02-26
**Confidence:** HIGH (based on direct analysis of scraped data structures, confirmed Next.js App Router patterns)

---

## Recommended Architecture

Next.js 14+ App Router, fully statically generated (SSG), with a local file-based content layer fed by the pre-existing extracted JSON files. No CMS, no database, no API routes at runtime. All pages are HTML at deploy time.

```
scraped-sites/stellamattina/extracted/*.json   <-- content source (already exists)
         |
         v
src/lib/content/*.ts   <-- typed data access layer (reads JSON at build time)
         |
         v
src/app/[route]/page.tsx   <-- Next.js page components (generateStaticParams)
         |
         v
src/components/[domain]/   <-- presentational components
         |
         v
Vercel / static host   <-- pre-rendered HTML + assets
```

### Why Static Generation (not SSR)

Medical clinic content changes infrequently. Services, doctor bios, and locations change quarterly at most. Blog posts are added occasionally. Static generation gives:
- Fastest possible page loads (critical for SEO rankings)
- Zero cold-start latency (no server to spin up)
- No infrastructure cost or complexity
- Optimal Core Web Vitals, which directly affect Google rankings

When content changes, a new deploy regenerates all pages. This is the right tradeoff for a clinic of this size.

---

## Component Boundaries

### Layer 1: Content Data Layer (Build-Time Only)

**Location:** `src/lib/content/`

| Module | Reads From | Returns |
|--------|-----------|---------|
| `practitioners.ts` | `scraped-sites/stellamattina/extracted/practitioners.json` | Typed `Practitioner[]` |
| `locations.ts` | `scraped-sites/stellamattina/extracted/locations.json` | Typed `Location[]` |
| `services.ts` | `scraped-sites/stellamattina/extracted/services.json` | Typed `Service[]` |
| `blog.ts` | `scraped-sites/stellamattina/extracted/blog_posts.json` | Typed `BlogPost[]` |
| `contact.ts` | `scraped-sites/stellamattina/extracted/contact_info.json` | Typed `ContactInfo` |

Each module exports: `getAll()`, `getBySlug(slug)`, `getAllSlugs()`.

This layer is the single source of truth. No page component reads JSON directly — it always goes through this layer. This makes future CMS migration straightforward: swap the implementation of these modules without touching page components.

### Layer 2: Page Routes (Next.js App Router)

**Location:** `src/app/`

| Route | File | Data Source | Render Strategy |
|-------|------|------------|----------------|
| `/` | `app/page.tsx` | practitioners, services, contact | Static |
| `/about-us` | `app/about-us/page.tsx` | static copy | Static |
| `/services` | `app/services/page.tsx` | services.getAll() | Static |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | services.getBySlug() | Static (generateStaticParams) |
| `/doctor-directory` | `app/doctor-directory/page.tsx` | practitioners.getAll() | Static |
| `/doctor-directory/[slug]` | `app/doctor-directory/[slug]/page.tsx` | practitioners.getBySlug() | Static (generateStaticParams) |
| `/find-our-locations` | `app/find-our-locations/page.tsx` | locations.getAll() | Static |
| `/find-our-locations/[slug]` | `app/find-our-locations/[slug]/page.tsx` | locations.getBySlug() | Static (generateStaticParams) |
| `/blog` | `app/blog/page.tsx` | blog.getAll() | Static |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | blog.getBySlug() | Static (generateStaticParams) |
| `/blog/category/[category]` | `app/blog/category/[category]/page.tsx` | blog.getByCategory() | Static (generateStaticParams) |
| `/careers` | `app/careers/page.tsx` | static copy | Static |
| `/contact-us` | `app/contact-us/page.tsx` | contact.getAll() | Static |
| `/gynecologist-dallas` | `app/gynecologist-dallas/page.tsx` | static copy | Static (SEO landing page) |
| `/gynecology` | `app/gynecology/page.tsx` | static copy | Static (SEO landing page) |
| `/biote-hormone-therapy` | `app/biote-hormone-therapy/page.tsx` | static copy | Static |
| `/immigration-physical` | `app/immigration-physical/page.tsx` | static copy | Static |

**Route URL preservation is critical.** The existing WordPress URLs must be preserved exactly — `/gynecologist-dallas`, `/biote-hormone-therapy`, `/find-our-locations` — to avoid breaking inbound links and destroying existing SEO equity. Do not restructure URLs.

### Layer 3: Shared Components

**Location:** `src/components/`

Organized by domain, not by technical type. This matches the mental model of what's being built.

```
src/components/
  layout/
    Header.tsx          # Nav with mobile menu, booking CTA button
    Footer.tsx          # Contact info, location links, legal
    PageWrapper.tsx     # Common page shell (header + footer + main)

  common/
    BookingButton.tsx   # External portal link — used everywhere
    PhoneLink.tsx       # Tel: link with formatting
    SEOHead.tsx         # Meta tags, OG, schema.org injection (via Next.js metadata API)

  home/
    HeroSection.tsx     # Main headline + booking CTA + photography
    ServicesGrid.tsx    # Service category cards linking to service pages
    DoctorHighlights.tsx  # Featured doctor cards → doctor directory
    LocationsMap.tsx    # Location list or embedded map
    TrustBar.tsx        # Social proof: patient count, years, awards

  services/
    ServiceCard.tsx     # Service name + description + book link
    ServiceDetail.tsx   # Full service page layout (heading, sections, FAQ)
    ServicesList.tsx    # Grid of ServiceCards for /services index

  doctors/
    DoctorCard.tsx      # Photo, name, credentials, location, book button
    DoctorGrid.tsx      # Filterable grid for /doctor-directory
    DoctorProfile.tsx   # Full doctor bio page layout
    DoctorFilter.tsx    # Client component: filter by specialty/location

  locations/
    LocationCard.tsx    # Name, address, phone, directions link
    LocationGrid.tsx    # All locations grid for /find-our-locations
    LocationDetail.tsx  # Single location page with services + providers

  blog/
    BlogCard.tsx        # Post title, excerpt, date, author, category
    BlogGrid.tsx        # Post listing grid
    BlogPost.tsx        # Full post layout (article, author bio, related posts)
    CategoryFilter.tsx  # Client component: filter posts by category

  schema/
    ClinicSchema.tsx    # schema.org MedicalOrganization JSON-LD
    DoctorSchema.tsx    # schema.org Physician JSON-LD
    ServiceSchema.tsx   # schema.org MedicalProcedure JSON-LD
    BlogSchema.tsx      # schema.org Article JSON-LD
    BreadcrumbSchema.tsx # schema.org BreadcrumbList JSON-LD
```

**Rule:** Components under `layout/`, `common/`, and `schema/` are Server Components. Components with interactivity (DoctorFilter, CategoryFilter) are the only Client Components (`"use client"`). Keep the client boundary as narrow as possible — it improves performance and keeps the bundle small.

### Layer 4: Static Assets

**Location:** `public/`

All images from the WordPress scrape live in `public/`. The scraped `wp-content/uploads/` directory gets copied into `public/wp-content/uploads/` initially, preserving existing image URLs that appear in blog post content. Practitioner photos referenced in JSON use absolute stellamattina.com URLs — these need to be either downloaded into `public/` or proxied via Next.js Image.

```
public/
  images/
    doctors/       # Practitioner photos (downloaded from scraped photo_url fields)
    services/      # Service photography
    locations/     # Location photos
  wp-content/
    uploads/       # Blog post images (preserve original path structure)
  logo.svg         # SM brand logo
  favicon.ico
```

---

## Data Flow

### Scraped JSON to Next.js Pages

This is the core transformation pipeline, executed at build time:

```
STEP 1: Source JSON (already exists in scraped-sites/stellamattina/extracted/)
  practitioners.json  → array of { slug, name, specialty, locations, bio, photo_url, booking_url }
  locations.json      → array of { slug, name, phone, address, description, providers[] }
  services.json       → array of { slug, title, url, meta_description, sections[] }
  blog_posts.json     → array of { slug, heading, author, published_date, categories, content }
  contact_info.json   → { phones[], emails[], footer_contact_text }

STEP 2: Content Layer (src/lib/content/)
  - Imports JSON at module load (Next.js processes this at build time)
  - Adds TypeScript types
  - Exposes getAll(), getBySlug(), getByCategory(), getAllSlugs()
  - NO runtime I/O — JSON is bundled into the build

STEP 3: generateStaticParams (in [slug]/page.tsx files)
  - Calls getAllSlugs() to tell Next.js which paths to pre-render
  - Next.js generates one HTML file per slug at build time
  - Result: /doctor-directory/akshay-goswami-md → static HTML page

STEP 4: Page Components (src/app/*/page.tsx)
  - Call getBySlug(params.slug) or getAll()
  - Pass data as props to layout components
  - Export metadata function for SEO meta tags (uses same data)
  - Return JSX — rendered to HTML at build time

STEP 5: Schema.org Injection (src/components/schema/)
  - Each page type adds appropriate JSON-LD script tags
  - Clinic pages: MedicalOrganization
  - Doctor pages: Physician
  - Service pages: MedicalProcedure
  - Blog pages: Article + BreadcrumbList
```

### Content Gaps and Workarounds

The extracted JSON has known gaps that need handling:

**Locations with empty `providers[]`:** All 7 locations in locations.json have `"providers": []`. The practitioners.json has `"locations"` arrays per doctor. The content layer must cross-reference — build location-to-provider mapping at build time by inverting the practitioner data, not by fixing the source JSON.

**Blog post body content:** The blog_posts.json stores full article content in an omitted field (shown as `[Omitted long matching line]` in grep output). Before building, verify the `content` field is complete HTML or Markdown. If it is raw HTML from WordPress, use `dangerouslySetInnerHTML` wrapped in a styled container — this is acceptable for static pre-rendered content with trusted source data.

**Service `sections[]` as content model:** Service pages are stored as arrays of `{heading, content}` sections. Render these as structured `<section>` elements with semantic headings, not as free HTML. This is already clean for SEO and AIO purposes.

**Doctor photo_url:** Values are absolute WordPress URLs (`https://stellamattina.com/wp-content/uploads/...`). Download these at setup time using a simple script into `public/images/doctors/`. Use Next.js `<Image>` with local paths for optimized delivery (WebP, lazy loading, correct dimensions).

---

## Suggested Build Order

Dependencies determine order. Build bottom-up: data → layout → simple pages → template-driven pages → index pages → SEO layer.

```
Phase 1: Foundation (no page renders)
  1. Project scaffolding (Next.js 14+, TypeScript, Tailwind)
  2. src/lib/content/*.ts — typed data access for all 5 JSON files
  3. src/components/layout/ — Header, Footer, PageWrapper
  4. src/components/common/ — BookingButton, PhoneLink
  5. Design tokens (Tailwind config: SM brand colors, typography)

Phase 2: Core Page Templates (one of each template type)
  6. /doctor-directory/[slug] page + DoctorProfile component
  7. /find-our-locations/[slug] page + LocationDetail component
  8. /services/[slug] page + ServiceDetail component
  9. /blog/[slug] page + BlogPost component
  Note: Build the [slug] detail page before the index listing page.
  The detail page defines the data shape you'll summarize in the index.

Phase 3: Index Pages (depend on detail page components)
  10. /doctor-directory — DoctorGrid + DoctorFilter (client component)
  11. /find-our-locations — LocationGrid
  12. /services — ServicesList
  13. /blog — BlogGrid + CategoryFilter (client component)

Phase 4: Static Pages (no dynamic data, copy from scraped HTML)
  14. /about-us
  15. /careers
  16. /contact-us
  17. SEO landing pages: /gynecologist-dallas, /gynecology, /biote-hormone-therapy, /immigration-physical

Phase 5: Homepage (depends on all component types)
  18. / — HeroSection, ServicesGrid, DoctorHighlights, LocationsMap, TrustBar

Phase 6: SEO Layer (add to all pages)
  19. schema/ClinicSchema, DoctorSchema, ServiceSchema, BlogSchema
  20. Export metadata() functions in all page.tsx files
  21. /sitemap.xml via app/sitemap.ts (Next.js built-in)
  22. /robots.txt via app/robots.ts
```

**Why detail before index:** If you build the index listing page first, you create summary card components without knowing exactly what data the detail page needs. Build detail first, then the card component is a simplified view of the same data shape.

**Why homepage last:** The homepage is a composition of all other component types. Build and validate each component in isolation first, then assemble on the homepage.

---

## Handling Each Content Type

### Static Pages

**What:** About Us, Careers, Contact Us, SEO landing pages (gynecologist-dallas, etc.)

**Pattern:** Simple `app/page-name/page.tsx` files with hardcoded content (ported from scraped HTML). No dynamic data needed. These pages do not use `generateStaticParams`. Export a static `metadata` object (not a function).

```typescript
// app/about-us/page.tsx
export const metadata = {
  title: "About Stella Mattina | Dallas Women's Health Clinic",
  description: "...",
}

export default function AboutPage() {
  return <PageWrapper>...</PageWrapper>
}
```

### Blog Posts

**What:** ~50+ posts from blog_posts.json with authors, dates, categories, full body content.

**Pattern:** `app/blog/[slug]/page.tsx` with `generateStaticParams` from `blog.getAllSlugs()`. Render body as HTML (if raw HTML) or Markdown (if Markdown). Category index at `app/blog/category/[category]/page.tsx`.

**AIO consideration:** Blog posts are the highest-value AIO content. Structure each post with: one clear `<h1>`, 3-5 `<h2>` sections, an FAQ section at the bottom using `<details>`/`<summary>` or a structured FAQ component. Add `Article` + `FAQPage` schema.org JSON-LD. This is what makes content appear in ChatGPT, Perplexity, and Google AI Overviews.

**Author treatment:** The `author` field contains full names like "Dr. Theodore J. T. Krum". Cross-reference against practitioners.json to link author name to doctor profile page. If no match, render name as plain text.

### Service Pages

**What:** 14 services in services.json, each with `sections[]` array of `{heading, content}`.

**Pattern:** `app/services/[slug]/page.tsx`. Map sections to semantic HTML: first section heading → `<h1>`, subsequent headings → `<h2>`, content paragraphs → `<p>`. Append a FAQ section assembled from the sections data (questions that match "What..." or "How..." headings). Booking CTA after each major section.

**URL note:** Several services have their own top-level URL (e.g., `/gynecology`, `/biote-hormone-therapy`, `/gynecologist-dallas`) that are NOT under `/services/`. These were SEO landing pages on the original WordPress site. Preserve their URL structure exactly — create them as separate `app/` routes, not as redirects to `/services/slug`. They have different content and different keyword targeting.

### Doctor Directory

**What:** 25+ practitioners in practitioners.json with specialty, locations, credentials, photo, booking URL.

**Pattern:** `app/doctor-directory/page.tsx` with client-side filter by specialty (OBGYN, Family Medicine, MFM) and by location. The filter component is `"use client"` — it receives the full practitioners array as a prop from the server component and filters in the browser. This keeps the filtering fast without a server round-trip while keeping the page statically generated.

```typescript
// app/doctor-directory/page.tsx (Server Component)
export default async function DoctorDirectoryPage() {
  const practitioners = getPractitioners()  // reads JSON at build time
  return <DoctorGrid practitioners={practitioners} />  // DoctorGrid is client component
}

// src/components/doctors/DoctorGrid.tsx
"use client"
// receives practitioners, manages filter state internally
```

**Booking URL:** Every practitioner record has `"booking_url": "https://mycw160.ecwcloud.com/portal22103/..."` pointing to the external patient portal. The BookingButton component wraps this with `target="_blank" rel="noopener noreferrer"`.

### Locations

**What:** 7 locations in locations.json (Women's Health and Family Medicine, Dallas area). Provider lists are empty in locations.json but cross-referenced from practitioners.json.

**Pattern:** Build a `getLocationWithProviders(slug)` function in the content layer that merges location data with practitioners who list that location. The `/find-our-locations/[slug]` page shows: location name, phone, address, services offered at that location, and practitioner cards for providers at that location.

**Location categories:** Locations span two service lines — Women's Health and Family Medicine. The filter on `/find-our-locations` should offer these two categories. Both are Stella Mattina brands.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: CMS Before Launch

**What:** Adding a headless CMS (Contentful, Sanity, etc.) before the first version ships.

**Why bad:** Adds integration complexity, cost, and a new failure surface. The scraped JSON is already structured data. The clinic can edit JSON files or trigger redeploys for content updates for V1.

**Instead:** File-based content layer now. Design the content layer module interface so swapping the backend to a CMS later requires only changing the implementation of `src/lib/content/*.ts`, not touching page components.

### Anti-Pattern 2: Global State for Filter Logic

**What:** Using Zustand, Redux, or React Context to manage doctor/location filter state.

**Why bad:** Massive overkill. Filter state is local to a single page, is not shared, and doesn't need to persist across navigation.

**Instead:** `useState` inside the filter client component. Simple, zero dependency.

### Anti-Pattern 3: Rewriting the URL Structure

**What:** Restructuring WordPress URLs to match a "cleaner" hierarchy (e.g., moving `/gynecologist-dallas` to `/services/gynecology-dallas`).

**Why bad:** Destroys years of accumulated SEO equity, breaks inbound links, removes Google's understanding of the page's keyword intent.

**Instead:** Preserve all existing URLs exactly. If the new site needs a different URL scheme for new pages, add those at new URLs. Never redirect old high-value URLs to different paths unless Google Search Console confirms the old URL has no ranking value.

### Anti-Pattern 4: Image Tags Without next/image

**What:** Using raw `<img>` tags for doctor photos and service photography.

**Why bad:** Kills Core Web Vitals (LCP, CLS). Images are unoptimized, wrong size, blocking render.

**Instead:** Always use `next/image` with explicit `width` and `height`. For practitioner photos, download all images from `photo_url` fields into `public/images/doctors/` during setup. Set `priority` on above-the-fold images (hero, first doctor cards).

### Anti-Pattern 5: Dumping Raw WordPress HTML into Blog Posts

**What:** Rendering blog post bodies via `dangerouslySetInnerHTML` without style scoping.

**Why bad:** WordPress HTML carries inline styles, `<div class="wp-block-*">` wrappers, and theme-specific markup that clashes with the new Tailwind design. Blog posts look broken.

**Instead:** Wrap `dangerouslySetInnerHTML` in a `prose` Tailwind Typography class container that normalizes all HTML output. This gives WordPress-sourced HTML a clean, consistent visual treatment without editing each post.

```typescript
<div className="prose prose-slate max-w-none"
  dangerouslySetInnerHTML={{ __html: post.content }}
/>
```

---

## Scalability Considerations

This is a clinic website, not a platform. Scalability concerns are minimal. The relevant consideration is content update velocity:

| Concern | Current Scale | Approach |
|---------|--------------|---------|
| Content updates | Quarterly (services/doctors change rarely) | Edit JSON → redeploy. Acceptable. |
| Blog post adds | Monthly (50+ posts, growing) | Add to blog_posts.json → redeploy. Or migrate to MDX files per post for git-based editorial workflow. |
| New locations | Rare (one location at a time) | Add to locations.json → redeploy. |
| Traffic spikes | Medical clinic — not viral. | Vercel static hosting handles it without configuration. |

**If content update frequency increases beyond quarterly:** Migrate `src/lib/content/blog.ts` to read from `.mdx` files instead of JSON. MDX supports frontmatter metadata and React components inside markdown, better for editorial workflow. This is a one-module change that doesn't touch page components.

---

## Sources

- Direct analysis of `scraped-sites/stellamattina/extracted/*.json` (HIGH confidence — primary source)
- Direct analysis of `scraped-sites/asktia/asktia.com/component---src-templates-*.js` naming (confirms Gatsby template patterns as design reference — Ask Tia uses: page, service, team, location, editorial, journal, appointment templates)
- Next.js 14 App Router documentation patterns (HIGH confidence — stable, widely validated)
- WordPress URL structure from `scraped-sites/stellamattina/stellamattina.com/` HTML directory tree (HIGH confidence — directly observed)
- `.planning/PROJECT.md` requirements (primary source)

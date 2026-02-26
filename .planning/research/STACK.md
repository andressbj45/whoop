# Technology Stack

**Project:** Stella Mattina Medical Clinic Website Rebuild
**Researched:** 2026-02-26
**Overall confidence:** HIGH (core stack from official docs), MEDIUM (AIO patterns from emerging ecosystem)

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.1 (latest stable) | Full-stack React framework | User-selected. App Router with built-in metadata API, sitemap generation, robots.txt, ISR — purpose-built for SEO. Static generation for all clinic pages = fast TTFB and perfect crawler indexability. |
| React | 19 | UI library | Peer dependency of Next.js 16. React Server Components reduce JS bundle size — critical for LCP on mobile. |
| TypeScript | 5.x | Type safety | `next.config.ts` supported natively since Next.js 15. Required for schema-dts (structured data types). Eliminates runtime errors in SEO-critical metadata code. |
| Node.js | 18.18+ (LTS) | Runtime | Minimum required by Next.js 15+. Use LTS 22.x for production. |

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x | Utility-first CSS | v4 delivers 3.78x faster full builds and 182x faster incremental rebuilds with no CSS changes. Zero-config setup — `@import "tailwindcss"` is all you need. Native CSS variables expose design tokens to JS. Critical for the Ask Tia-inspired minimal aesthetic. |
| @tailwindcss/typography | 0.5.x | Prose styling for MDX/blog | Provides `prose` classes for the blog. Automatically styles markdown-rendered content (headings, links, lists) without custom CSS. Pairs directly with `@next/mdx`. |
| shadcn/ui | latest (2025) | Headless component library | Copy-paste components built on Radix UI primitives. Components live in your codebase — no version lock-in. Ships accessible (aria-compliant) components out of the box. Supports Tailwind v4. Use for: navigation menu, accordion (FAQ), dialog (modals), card (doctor profiles). Do NOT use for every element — only where accessibility primitives matter. |

**What NOT to use:**
- **Chakra UI / MUI / Ant Design** — heavy runtime JS bundles that hurt LCP. Medical clinic sites are content-heavy; minimize client-side JS.
- **Tailwind CSS v3** — use v4. Zero-config, faster builds, better CSS variable support. No reason to stay on v3 for a new project.
- **CSS Modules (only)** — Tailwind v4 + shadcn covers all cases. CSS modules add file complexity without benefit here.

### SEO — Built-in Next.js (No Additional Library)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js Metadata API | built-in (16.x) | Per-page title, description, OG tags, canonical URL, robots directives | App Router's `export const metadata` and `generateMetadata()` are the standard. Outputs correct `<head>` tags, handles OpenGraph, Twitter cards, and `<link rel="canonical">` natively. No external library needed. |
| Next.js sitemap.ts | built-in | XML sitemap generation | `app/sitemap.ts` exports `MetadataRoute.Sitemap` — generates `/sitemap.xml` with `changeFrequency` and `priority`. Supports image sitemaps. Static by default (crawlers need this). |
| Next.js robots.ts | built-in | robots.txt | `app/robots.ts` generates compliant robots.txt declaratively. |
| next/font/google | built-in | Font optimization | Self-hosts Google Fonts at build time. Zero layout shift via `size-adjust`. Eliminates third-party font requests (privacy + performance). |
| next/image | built-in | Responsive images | Automatic WebP/AVIF conversion, lazy loading, blur placeholders, responsive `srcSet`. Sharp is auto-used in Next.js 15+ — no manual install needed. |
| next/og (ImageResponse) | built-in | Dynamic OG images | Generates per-page social cards using JSX. Auto-cached on CDN. Use for blog posts and service pages. |

**What NOT to use:**
- **next-seo** — was the standard for Pages Router. App Router's native Metadata API is its complete replacement. next-seo adds a dependency for functionality that is now built in.
- **react-helmet** — Pages Router pattern. Do not use with App Router at all.

### Structured Data (Schema.org / AIO)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| schema-dts | 1.x | TypeScript types for schema.org JSON-LD | Provides type-safe construction of JSON-LD structured data objects. Catches missing required fields at compile time. No runtime overhead — types only. |
| Inline JSON-LD via `<script type="application/ld+json">` | n/a | Schema markup delivery | Server Component renders JSON-LD inline in `<head>` — parseable by both Google and AI crawlers (ChatGPT, Perplexity) on first request. No hydration needed. |

**Schema types to implement for Stella Mattina:**
- `MedicalClinic` (extends `LocalBusiness`) — for clinic location pages (name, address, telephone, openingHours, geo, priceRange)
- `Physician` — for doctor profile pages (name, specialty, image, worksFor)
- `MedicalSpecialty` — to type physician specialties (Gynecology, Obstetrics)
- `FAQPage` + `Question`/`Answer` — for FAQ sections on service pages (critical for AI Overviews and Perplexity citations)
- `BreadcrumbList` — for all pages (improves SERP appearance)
- `Article`/`BlogPosting` — for blog posts (author, datePublished, dateModified)
- `WebPage`/`MedicalWebPage` — for service pages

**What NOT to use:**
- **WordPress Yoast SEO schema output** — the scraped site had this. Rebuild structured data from scratch as proper JSON-LD server-rendered in Next.js. Do not port Yoast's format.
- **Microdata or RDFa** — JSON-LD is the format Google and AI crawlers prefer. More maintainable.

### Content Management

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| MDX via @next/mdx | latest | Blog posts and rich content pages | Native Next.js support. MDX files live in `/content/` directory, processed as React components. Supports frontmatter via `gray-matter`. Pairs with `@tailwindcss/typography` for prose styling. Sufficient for a clinic blog — no CMS needed for v1. |
| gray-matter | 4.x | Frontmatter parsing | Parse title, date, author, slug, and SEO fields from MDX frontmatter. Used server-side only in `generateStaticParams` / `generateMetadata`. |
| remark-gfm | 4.x | GitHub Flavored Markdown | Adds tables, strikethrough, task lists. Use via `@next/mdx` remark plugins. |
| Node fs + glob pattern | built-in | Blog index and static params | Server-side file enumeration for `generateStaticParams`. No additional CMS backend required for v1. |

**What NOT to use:**
- **Contentlayer** — officially unmaintained as of 2024. Do not use.
- **Sanity / Contentful / Strapi** — out of scope for v1. PROJECT.md explicitly states "static/file-based content is fine." CMS adds infrastructure complexity the client doesn't need yet.
- **WordPress headless** — the whole point is leaving WordPress. Don't reintroduce it as a headless CMS.
- **next-mdx-remote** — requires server components setup to avoid client-side rendering. `@next/mdx` with App Router is simpler and officially recommended.

### Performance & Core Web Vitals

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Turbopack | built-in (Next.js 16.1 stable) | Dev server bundler | 76%+ faster local server startup, 96% faster Fast Refresh. Use `next dev --turbopack` (stable). Turbopack builds alpha in 15.3 — do NOT use for production builds yet; use standard `next build`. |
| @vercel/analytics | latest | Web analytics | Lightweight analytics via Vercel dashboard. Tracks page views, visitor demographics. No cookie consent needed for privacy-safe mode. |
| @vercel/speed-insights | latest | Core Web Vitals monitoring | Tracks LCP, CLS, INP, FCP, TTFB per page. Required separately from analytics since Next.js 15. Critical for validating SEO performance after launch. |

### AIO (AI Search Optimization) Technical Implementation

AIO is not a separate library — it is a content and markup discipline enforced through the stack above. Here is the implementation approach:

| Technique | Implementation | Why It Helps AI Search |
|-----------|---------------|------------------------|
| FAQPage JSON-LD | `<script type="application/ld+json">` on service pages | Perplexity and Google AI Overviews directly consume FAQ schema to extract answer snippets |
| Semantic HTML headings | `<h1>` through `<h3>` hierarchy enforced in MDX and page templates | AI crawlers parse heading hierarchy to understand page structure and extract topical answers |
| Concise answer-first paragraphs | Content writing pattern: state the answer in the first sentence, then elaborate | Matches how AI summarizers extract "the best answer" from a passage |
| `llms.txt` (emerging standard) | Static file at `/public/llms.txt` | An emerging convention (popularized by Anthropic, adopted by Vercel) listing pages and content summaries for AI crawlers. LOW confidence on adoption rate — but zero cost to implement. |
| robots.txt — allow AI crawlers | Default: allow all well-known AI crawlers (Perplexity, GPTBot, ClaudeBot) | Blocking AI crawlers removes your content from AI training/retrieval entirely |
| Canonical URLs | `metadata.alternates.canonical` on every page | Prevents AI and search engines from indexing duplicate or scraped versions |
| Local business NAP consistency | Identical Name, Address, Phone in schema, footer, and Contact page | AI and local search both rely on consistent NAP signals for entity resolution |

### Deployment & Infrastructure

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | latest (free/pro tier) | Hosting and CDN | Zero-config Next.js deployment. Global CDN, automatic ISR, image optimization on-demand (no manual sharp config), Preview deployments, built-in Web Analytics and Speed Insights. Natural fit for the stack. |

**What NOT to use:**
- **Self-hosting on VPS** — eliminates Vercel's CDN, image optimization pipeline, and Preview deployment workflow. The added DevOps overhead is not warranted for a clinic site.
- **Netlify** — works but lacks native Next.js ISR support and requires adapter plugins. More friction.
- **Docker** — overkill for a static-heavy content site.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| CSS framework | Tailwind CSS v4 | CSS Modules | Tailwind provides faster iteration for design-heavy pages. CSS Modules require more custom code for the same result. |
| UI components | shadcn/ui | Radix UI (raw) | shadcn wraps Radix with pre-built styling. Raw Radix still requires all styling from scratch. shadcn is faster to bootstrap while remaining unstyled in spirit. |
| UI components | shadcn/ui | MUI / Chakra | Heavy bundle size, opinionated look requires overriding to match the Ask Tia aesthetic. |
| Blog/content | MDX + @next/mdx | Sanity (headless CMS) | Scope: PROJECT.md says static is fine for v1. CMS adds infra complexity, cost, and auth requirements not yet needed. |
| Blog/content | MDX + @next/mdx | Contentlayer | Unmaintained since mid-2024. Do not introduce a dead dependency. |
| Structured data | schema-dts (types only) | next-seo JSON-LD | next-seo App Router support is incomplete and the library wraps functionality Now built into Next.js. schema-dts gives type safety without the abstraction layer. |
| SEO meta | Next.js Metadata API (built-in) | next-seo | next-seo is a Pages Router solution. App Router's native API is its direct replacement. |
| Analytics | @vercel/analytics | Google Analytics | Vercel Analytics is zero-cookie, privacy-safe, and integrates directly with Speed Insights dashboard. GA4 adds cookie consent complexity. |
| Deployment | Vercel | AWS / VPS | Vercel is purpose-built for Next.js. The operational overhead of AWS for a clinic marketing site is not justified. |

---

## Installation

```bash
# Create project
npx create-next-app@latest stella-mattina \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

# Content and blog
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx gray-matter remark-gfm

# Structured data types
npm install schema-dts

# shadcn/ui setup (interactive CLI installs components on demand)
npx shadcn@latest init

# Tailwind typography plugin (for MDX prose)
npm install @tailwindcss/typography

# Vercel observability (install both — separate packages since Next.js 15)
npm install @vercel/analytics @vercel/speed-insights

# Dev dependencies
npm install -D @types/node @types/react @types/react-dom typescript
```

```bash
# shadcn components to install (add as needed per phase):
npx shadcn@latest add navigation-menu
npx shadcn@latest add accordion      # For FAQ sections
npx shadcn@latest add card           # For doctor profiles, service cards
npx shadcn@latest add button         # CTAs
npx shadcn@latest add badge          # Specialty tags
npx shadcn@latest add separator
npx shadcn@latest add sheet          # Mobile nav drawer
```

---

## Key Configuration Patterns

### next.config.ts (TypeScript, Turbopack dev, MDX)

```typescript
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Turbopack for dev is stable in Next.js 15+/16.x
  // Enable via: next dev --turbopack
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
```

### Metadata pattern (per-page SEO)

```typescript
// app/services/gynecology/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gynecology Services | Stella Mattina',
  description: 'Expert gynecology care in Dallas. Annual exams, preventive screenings, and personalized women\'s health services at Stella Mattina.',
  alternates: {
    canonical: 'https://stellamattina.com/services/gynecology',
  },
  openGraph: {
    title: 'Gynecology Services | Stella Mattina',
    description: '...',
    images: [{ url: '/og/gynecology.png', width: 1200, height: 630 }],
  },
}
```

### JSON-LD structured data (MedicalClinic + FAQPage)

```typescript
// components/StructuredData.tsx (Server Component)
import type { MedicalClinic, FAQPage, WithContext } from 'schema-dts'

const clinicData: WithContext<MedicalClinic> = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'Stella Mattina',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '...',
    addressLocality: 'Dallas',
    addressRegion: 'TX',
    postalCode: '...',
    addressCountry: 'US',
  },
  telephone: '...',
  url: 'https://stellamattina.com',
  medicalSpecialty: ['Gynecology', 'Obstetrics'],
}

export function ClinicStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicData) }}
    />
  )
}
```

### Sitemap (app/sitemap.ts)

```typescript
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stellamattina.com'

  const staticPages = [
    { url: baseUrl, changeFrequency: 'monthly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/doctors`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/locations`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: 'yearly' as const, priority: 0.6 },
    { url: `${baseUrl}/careers`, changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

  // Add blog posts dynamically via fs enumeration
  return staticPages
}
```

---

## Confidence Assessment

| Area | Confidence | Reason |
|------|------------|--------|
| Next.js 16.x as core framework | HIGH | Verified via official next.js blog — 16.1 released Dec 2025 |
| Next.js built-in Metadata API | HIGH | Official documentation, version 16.1.6, updated 2026-02-24 |
| Next.js built-in sitemap/robots | HIGH | Official documentation verified |
| Tailwind CSS v4 | HIGH | Official Tailwind blog with benchmarks and release details |
| shadcn/ui + Tailwind v4 compatibility | MEDIUM | shadcn/ui supports Tailwind v4 (confirmed via changelog) but some components may need manual migration |
| @next/mdx for blog | HIGH | Official Next.js documentation, updated 2026-02-24 |
| schema-dts for JSON-LD types | MEDIUM | Library is actively maintained on npm; version 1.x confirmed. No Context7 verification available. |
| Contentlayer being unmaintained | HIGH | Well-documented in community; project archived on GitHub |
| AIO via FAQPage schema | MEDIUM | Google's support for FAQPage rich results is confirmed. AI crawler behavior (ChatGPT, Perplexity) consuming JSON-LD is MEDIUM — observed in practice but not formally documented by AI providers. |
| llms.txt convention | LOW | Emerging community pattern, not a formal standard. Zero cost to implement but uncertain adoption by crawlers. |
| next-seo deprecation for App Router | HIGH | next-seo GitHub explicitly states App Router metadata API is the replacement |

---

## Sources

- Next.js 16.1 Blog: https://nextjs.org/blog (December 18, 2025)
- Next.js 15.3 Blog: https://nextjs.org/blog/next-15-3 (April 9, 2025)
- Next.js Metadata API Docs: https://nextjs.org/docs/app/getting-started/metadata-and-og-images (updated 2026-02-24)
- Next.js Sitemap API Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap (updated 2026-02-24)
- Next.js Font Optimization Docs: https://nextjs.org/docs/app/getting-started/fonts (updated 2026-02-24)
- Next.js MDX Guide: https://nextjs.org/docs/app/guides/mdx (updated 2026-02-24)
- Next.js Image Component: https://nextjs.org/docs/app/api-reference/components/image (updated 2026-02-24)
- Tailwind CSS v4 Blog: https://tailwindcss.com/blog/tailwindcss-v4
- Vercel Next.js Deployment Docs: https://vercel.com/docs/frameworks/nextjs
- schema-dts: https://www.npmjs.com/package/schema-dts

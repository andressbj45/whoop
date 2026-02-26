# Phase 1: Foundation - Research

**Researched:** 2026-02-26
**Domain:** Next.js 16 App Router + Tailwind CSS v4 + shadcn/ui + Content Layer + Analytics
**Confidence:** HIGH (core stack verified via official docs), MEDIUM (Tailwind v4 + shadcn init flow)

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Content layer module (`src/lib/content/`) reads the 5 extracted JSON files (practitioners, locations, services, blog_posts, contact_info) as the single source of truth | JSON schema verified; data shapes documented; module interface defined |
| FOUND-02 | SM brand design tokens (colors, fonts, spacing) defined in Tailwind v4 config — extracted from existing WordPress theme | Brand colors extracted from scraped theme CSS; Tailwind v4 CSS-first config pattern documented |
| FOUND-03 | HIPAA-safe analytics configured (Plausible or privacy-first solution — no GA4 on medical/service pages) | next-plausible package confirmed; integration pattern documented; HIPAA rationale documented |
| FOUND-04 | Next.js 16.x project scaffolded with App Router, Tailwind v4, shadcn/ui, and schema-dts | create-next-app@latest confirmed; shadcn init pattern confirmed; all install commands verified |
| DESIGN-01 | Ask Tia-inspired global layout applied (clean minimal, warm personal feel, generous whitespace) | Ask Tia design principles extracted; component structure documented; anti-patterns identified |
| DESIGN-02 | Site is fully mobile-responsive across all page types | Tailwind mobile-first approach confirmed; 375px breakpoint testing strategy documented |
| DESIGN-03 | SM logo displayed in header and footer | Logo file located at `wp-content/uploads/2024/03/logo-new.png`; download strategy documented |
| DESIGN-04 | "Book Now" CTA button present on every page, linking to patient portal | External portal URL confirmed from practitioners.json; BookingButton component pattern documented |
</phase_requirements>

---

## Summary

Phase 1 establishes the technical foundation from which all subsequent content pages are built. The work breaks into four parallel tracks: (1) project scaffolding — creating the Next.js 16 project with Tailwind CSS v4, shadcn/ui, and schema-dts; (2) content layer — typed TypeScript modules that read the five extracted JSON files at build time; (3) design system — SM brand tokens in Tailwind CSS v4's CSS-first configuration format, plus the header/footer shell with the Book Now CTA; (4) HIPAA-safe analytics — Plausible via `next-plausible`, installed in root layout before any pages go live.

The core insight for this phase is that nothing depends on page content yet. Phase 1 is infrastructure: the Next.js dev server must start, the shell layout must render with real SM branding, the content layer must parse JSON without errors, and analytics must load without Google or Meta tracking. Everything else is blocked until these four tracks are stable.

One discovered fact from directly inspecting the scraped data: the JSON files are clean and small (1173 lines for blog_posts.json, not 594MB — the previous concern about file size was unfounded for the JSON version). The extracted data is well-structured and immediately usable. The content layer will be straightforward to implement.

**Primary recommendation:** Scaffold via `create-next-app@latest`, then layer in shadcn/ui init, then implement content modules, then design tokens, then analytics — in this exact order so each step is testable in isolation.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 (latest stable as of 2026-02-24) | Full-stack React framework, App Router | User-decided. Built-in metadata API, sitemap, SSG — purpose-built for SEO-heavy content sites |
| React | 19 (peer dep of Next.js 16) | UI rendering | Server Components reduce JS bundle; critical for Core Web Vitals on mobile |
| TypeScript | 5.x | Type safety across content layer and schemas | Required for schema-dts; catches content model mismatches at build time |
| Node.js | 20.9+ LTS (minimum per Next.js 16) | Runtime | Next.js 16 requires Node 20.9+; use LTS 22.x for production |

### Styling

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | 4.x | Utility-first CSS | User-decided. CSS-first config (`@import "tailwindcss"`), 3.78x faster builds, native CSS variables |
| shadcn/ui | latest (2026, Tailwind v4 compatible) | Accessible headless components | User-decided. Components live in codebase, no version lock-in, built on Radix UI primitives |
| tw-animate-css | latest | Animation utilities | Replaces deprecated `tailwindcss-animate` in shadcn/ui Tailwind v4 setup |

### Analytics

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next-plausible | latest | Plausible Analytics integration for Next.js | HIPAA-safe: no cookies, no IP storage, no cross-site tracking. `PlausibleProvider` wraps root layout. SPA route change tracking built in. |

### Content & Schema

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| schema-dts | 1.x | TypeScript types for schema.org JSON-LD | Type-safe construction of MedicalOrganization, Physician, MedicalClinic JSON-LD — compile-time validation of required fields |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-plausible | @vercel/analytics | Vercel Analytics is also HIPAA-acceptable (no PII), but Plausible is explicitly the decision. Both are viable; next-plausible is the call. |
| next-plausible | GA4 | GA4 on medical service pages is a HIPAA violation risk per HHS Dec 2022 guidance. Never use GA4 here. |
| Tailwind v4 CSS-first config | tailwind.config.ts (v3 style) | v3 config style still works in v4 but defeats the performance benefits and is the deprecated path |
| shadcn@latest | custom Radix UI components | shadcn wraps Radix with pre-built styling. Raw Radix still requires all styling from scratch. |

**Installation:**

```bash
# 1. Create project (Tailwind + App Router + TypeScript + src dir + Turbopack default in Next.js 16)
npx create-next-app@latest stella-mattina \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack

# 2. shadcn/ui init (Tailwind v4 compatible)
npx shadcn@latest init

# 3. Core shadcn components for Phase 1 shell
npx shadcn@latest add button
npx shadcn@latest add navigation-menu
npx shadcn@latest add sheet

# 4. Analytics
npm install next-plausible

# 5. Structured data types
npm install schema-dts

# 6. Tailwind typography (for blog prose — install now, use in Phase 2)
npm install @tailwindcss/typography
```

---

## Architecture Patterns

### Recommended Project Structure

```
stella-mattina/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout: PlausibleProvider + font + analytics
│   │   ├── page.tsx              # Homepage (Phase 3)
│   │   ├── globals.css           # @import "tailwindcss" + @theme with SM tokens
│   │   └── favicon.ico
│   ├── lib/
│   │   └── content/
│   │       ├── practitioners.ts  # FOUND-01: reads practitioners.json
│   │       ├── locations.ts      # FOUND-01: reads locations.json
│   │       ├── services.ts       # FOUND-01: reads services.json
│   │       ├── blog.ts           # FOUND-01: reads blog_posts.json
│   │       ├── contact.ts        # FOUND-01: reads contact_info.json
│   │       └── types.ts          # Shared TypeScript types
│   └── components/
│       ├── layout/
│       │   ├── Header.tsx        # Nav + SM logo + mobile menu + Book Now CTA
│       │   ├── Footer.tsx        # Contact info + location links + Book Now CTA
│       │   └── PageWrapper.tsx   # Wraps all pages in Header + Footer + <main>
│       └── common/
│           ├── BookingButton.tsx # External portal link — used everywhere
│           └── PhoneLink.tsx     # Tel: link with formatting
├── public/
│   ├── images/
│   │   └── logo.png              # SM logo downloaded from scraped site
│   └── favicon.ico
└── scraped-sites/                # Source data (read-only reference)
    └── stellamattina/
        └── extracted/            # The 5 JSON files
```

### Pattern 1: Tailwind v4 CSS-First Configuration with SM Brand Tokens

**What:** Tailwind v4 uses a CSS-first approach — design tokens live in `globals.css` using the `@theme` directive, not in `tailwind.config.ts`.

**When to use:** For all brand color, font, and spacing definitions in this project.

**SM Brand Colors (extracted from `cam-theme/style.css` and inline styles):**
- Primary blue: `#1C348C` (dark navy — used for nav buttons, CTA backgrounds)
- Accent blue: `#617CDF` (medium blue — hover states, modal borders)
- Light accent: `#9EB1F6` (lighter blue — secondary elements)
- Background warm: `#FFFCE3` (warm off-white — page sections)
- Card background: `#D6DEF9` (light blue-lavender — cards)
- Neutral gray: `#EDEDED` (borders, dividers)
- Dark text: `#0A0A0A`

**SM Fonts (extracted from WordPress `<link>` tags in homepage HTML):**
- Body: Roboto (400, 500, 700) — loaded via `next/font/google`
- Display/accent: Dynalight (regular) — decorative headings only

**Example:**

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "@tailwindcss/typography";

@theme {
  /* SM Brand Colors */
  --color-sm-navy: #1C348C;
  --color-sm-blue: #617CDF;
  --color-sm-blue-light: #9EB1F6;
  --color-sm-blue-card: #D6DEF9;
  --color-sm-warm: #FFFCE3;
  --color-sm-gray: #EDEDED;

  /* SM Typography */
  --font-sans: var(--font-roboto);
  --font-display: var(--font-dynalight);
}
```

```typescript
// src/app/layout.tsx
// Source: https://nextjs.org/docs/app/getting-started/fonts (updated 2026-02-24)
import { Roboto, Dynalight } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
})

const dynalight = Dynalight({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dynalight',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${dynalight.variable}`}>
      <body className="font-sans text-[#0A0A0A] bg-white">
        {children}
      </body>
    </html>
  )
}
```

### Pattern 2: Content Layer Module Interface

**What:** Five TypeScript modules in `src/lib/content/` that read JSON at module import time (processed by Next.js at build time). Each module exports a standard interface.

**When to use:** Every page component that needs clinic data calls these modules — never imports JSON directly.

**Why this interface:** Makes future CMS migration a one-module change that doesn't touch page components.

```typescript
// Source: Architecture analysis of scraped-sites/stellamattina/extracted/ data
// src/lib/content/types.ts

export interface Practitioner {
  slug: string
  url: string
  name: string
  specialty: 'OBGYN' | 'Family Medicine' | 'Maternal-Fetal Medicine (MFM)' | 'Maternal-Fetal Medicine (MFM), OBGYN'
  category: "Women's Health" | 'Family Medicine'
  locations: string[]
  bio: string
  photo_url: string
  booking_url: string
}

export interface Location {
  slug: string
  url: string
  name: string
  phone: string
  providers: string[]  // NOTE: always empty in locations.json — cross-reference from practitioners
  description?: string
}

export interface Service {
  slug: string
  url: string
  title: string
  meta_description: string
  sections: Array<{ heading: string; content: string }>
  full_text: string
}

export interface BlogPost {
  slug: string
  url: string
  page_title: string
  heading: string
  author: string
  published_date: string
  meta_description: string
  categories: string[]
  tags: string[]
  full_text: string
}

export interface ContactInfo {
  phones: string[]
  emails: string[]
  footer_contact_text: string
}
```

```typescript
// src/lib/content/practitioners.ts
import practitionersData from '../../../scraped-sites/stellamattina/extracted/practitioners.json'
import type { Practitioner } from './types'

const practitioners = practitionersData as Practitioner[]

export function getPractitioners(): Practitioner[] {
  return practitioners
}

export function getPractitionerBySlug(slug: string): Practitioner | undefined {
  return practitioners.find(p => p.slug === slug)
}

export function getPractitionerSlugs(): string[] {
  return practitioners.map(p => p.slug)
}

// Cross-reference: get practitioners at a specific location
export function getPractitionersByLocation(locationName: string): Practitioner[] {
  return practitioners.filter(p => p.locations.includes(locationName))
}
```

### Pattern 3: Plausible Analytics Integration (HIPAA-Safe)

**What:** `next-plausible` wraps the root layout with `PlausibleProvider`. Tracks page views without cookies, IP addresses, or cross-site data. SPA route changes tracked automatically.

**When to use:** Root layout — wraps the entire application before any pages are built.

```typescript
// Source: https://github.com/4lejandrito/next-plausible
// src/app/layout.tsx (partial)
import PlausibleProvider from 'next-plausible'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="stellamattina.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Pattern 4: BookingButton Component (DESIGN-04)

**What:** A server component wrapping the external patient portal link. Used in header, footer, and every page CTA.

**When to use:** Everywhere a "Book Now" CTA is needed.

```typescript
// src/components/common/BookingButton.tsx
// Booking URL from practitioners.json: https://mycw160.ecwcloud.com/portal22103/jsp/100mp/login_otp.jsp

const BOOKING_URL = 'https://mycw160.ecwcloud.com/portal22103/jsp/100mp/login_otp.jsp'

interface BookingButtonProps {
  label?: string
  className?: string
}

export function BookingButton({ label = 'Book Now', className }: BookingButtonProps) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label}
    </a>
  )
}
```

### Pattern 5: Location-to-Provider Cross-Reference

**What:** The `locations.json` has empty `providers: []` arrays. Practitioners list their locations in `practitioners.json`. The content layer builds the reverse mapping at module load time.

**When to use:** Any page that displays providers at a specific location.

```typescript
// src/lib/content/locations.ts (partial)
import locationsData from '../../../scraped-sites/stellamattina/extracted/locations.json'
import { getPractitioners } from './practitioners'
import type { Location, Practitioner } from './types'

const locations = locationsData as Location[]

export function getLocationWithProviders(slug: string): (Location & { practitioners: Practitioner[] }) | undefined {
  const location = locations.find(l => l.slug === slug)
  if (!location) return undefined

  // Cross-reference: match location name to practitioner.locations[]
  // Location names in practitioners.json are SHORT NAMES (e.g. "Mesquite")
  // Location names in locations.json are FULL NAMES (e.g. "Women's Health | Mesquite, TX")
  // Must extract the short name for matching
  const practitioners = getPractitioners().filter(p =>
    p.locations.some(locName =>
      location.name.toLowerCase().includes(locName.toLowerCase())
    )
  )

  return { ...location, practitioners }
}
```

**IMPORTANT:** The location name matching requires care. `locations.json` names are verbose (e.g. "Women's Health | Bishop Arts District in Dallas") while `practitioners.json` location arrays use short forms (e.g. "Samuell (White Rock Lake)"). The content layer must handle this mismatch. The safest approach: normalize both sides to a canonical short key during module initialization.

### Anti-Patterns to Avoid

- **`'use client'` on layout.tsx:** Breaks metadata API — head tags will not render server-side. Only leaf interactive components get `'use client'`.
- **Google Fonts via `<link>` tag:** Use `next/font/google` exclusively — eliminates external DNS lookup, prevents layout shift.
- **Reading JSON in page components directly:** Always go through `src/lib/content/` modules — enables future CMS migration without touching page files.
- **Hardcoding phone numbers/addresses in components:** All contact info comes from `contact_info.json` via `getContactInfo()` — single source of truth.
- **GA4 or Meta Pixel in root layout:** HIPAA violation risk on medical URL paths. Use Plausible only.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accessible navigation menu | Custom nav with click handlers | `shadcn/ui` NavigationMenu (built on Radix UI) | Focus trap, keyboard navigation, ARIA roles handled by Radix; medical sites need WCAG 2.1 AA |
| Mobile nav drawer | Custom CSS slide-in + JS state | `shadcn/ui` Sheet component | Accessible modal pattern with proper focus management |
| Privacy-safe analytics | Custom event tracking | `next-plausible` | Plausible's script is <1KB, handles SPA route changes, GDPR-compliant by design |
| Font loading optimization | `<link rel="preload">` for Google Fonts | `next/font/google` | Self-hosts at build time, zero layout shift via `size-adjust`, no external DNS lookup |
| Responsive images | `<img>` with manual srcset | `next/image` | Automatic WebP/AVIF, lazy loading, blur placeholder, prevents LCP and CLS failures |
| Type-safe schema.org JSON-LD | Manual object construction | `schema-dts` types | Catches missing required fields (e.g. MedicalClinic requires `address`) at TypeScript compile time |

**Key insight:** This phase's "don't hand-roll" list is about accessibility and performance primitives. Radix UI components and Next.js built-ins exist precisely because these primitives have dozens of edge cases that are tedious to get right and easy to ship broken.

---

## Common Pitfalls

### Pitfall 1: Location-to-Practitioner Name Mismatch

**What goes wrong:** `locations.json` uses full verbose location names ("Women's Health | Mesquite, TX") while `practitioners.json` uses short informal names ("Mesquite"). A naive string equality match produces zero providers for every location.

**Why it happens:** The two JSON files were extracted from different parts of the WordPress site by different scrapers, each using whatever text appeared in that context.

**How to avoid:** Build a canonical location key map in `src/lib/content/locations.ts`. Extract the city/neighborhood from the full location name during module initialization. Map "Bishop Arts" → bishop-arts, "Samuell" → samuell, etc. Then match practitioner location strings against these canonical keys.

**Warning signs:** Any location page showing zero practitioners when practitioners.json clearly lists that location.

### Pitfall 2: Tailwind v4 CSS Config vs v3 `tailwind.config.ts`

**What goes wrong:** `create-next-app@latest` now scaffolds Tailwind v4 by default. Attempting to add a `tailwind.config.ts` with v3-style `extend.colors` configuration has no effect in v4 — tokens must go in `globals.css` under `@theme`.

**Why it happens:** Many tutorials and AI completions still show v3 configuration patterns.

**How to avoid:** All SM brand tokens go in `src/app/globals.css` under `@theme { }`. Do not create a separate `tailwind.config.ts` for color/font customization in v4.

**Warning signs:** Brand colors appear in TypeScript/TSX files but render as default Tailwind colors in the browser.

### Pitfall 3: shadcn/ui Init Overwriting globals.css

**What goes wrong:** Running `npx shadcn@latest init` after manually adding SM brand tokens to `globals.css` will replace the file with the shadcn baseline, erasing all SM customizations.

**Why it happens:** shadcn init creates a fresh `globals.css` with its own `@theme` block.

**How to avoid:** Run `npx shadcn@latest init` FIRST (before adding SM tokens), then manually merge SM brand tokens into the shadcn-generated `globals.css`. Order matters: scaffold → shadcn init → add SM tokens.

**Warning signs:** SM brand colors are correct in `globals.css` but shadcn components render with wrong colors (shadcn baseline variables override SM variables).

### Pitfall 4: HIPAA Analytics Boundary — Plausible Script in Wrong Scope

**What goes wrong:** `PlausibleProvider` must be placed in root `layout.tsx` so it wraps all pages — including any future API routes or admin pages that should NOT be tracked. Placing it only on specific pages creates uneven tracking and maintenance burden.

**Why it happens:** Developers add tracking only where they remember to.

**How to avoid:** One `PlausibleProvider` in root `layout.tsx`. Never use GA4/gtag script tags anywhere in the project — not even in `<Script>` components on non-medical pages. Establish this as a hard project rule from the first commit.

**Warning signs:** Network tab shows requests to `www.google-analytics.com` or `connect.facebook.net` on any page of the site.

### Pitfall 5: contact_info.json Has Duplicate/Inconsistent Phone Numbers

**What goes wrong:** `contact_info.json` contains three entries in the `phones` array — `"214-942-3100"`, `"469-399-0355"`, and `"214.942.3100"` (a duplicate with different formatting). The footer renders three phone numbers when only two unique numbers exist.

**Why it happens:** The scraper captured the phone number from multiple locations on the page with different formatting.

**How to avoid:** In `src/lib/content/contact.ts`, deduplicate and normalize phone numbers during module initialization. Normalize format to `XXX-XXX-XXXX`. The canonical main number is `214-942-3100`.

**Warning signs:** Footer shows "214-942-3100 | 469-399-0355 | 214.942.3100" — three entries instead of two.

### Pitfall 6: Next.js 16 Requires Node.js 20.9+

**What goes wrong:** Running `npm run dev` on Node.js 18.x fails with a compatibility error.

**Why it happens:** Next.js 16 raised the minimum Node.js requirement from 18.18 to 20.9.

**How to avoid:** Verify Node.js version before scaffolding: `node --version`. Use nvm or fnm to switch to Node 20.9+ LTS.

**Warning signs:** `create-next-app` or `npm run dev` throws a Node.js version warning/error.

---

## Code Examples

Verified patterns from official sources:

### Next.js 16 Root Layout with Font and Analytics

```typescript
// Source: https://nextjs.org/docs/app/getting-started/installation (updated 2026-02-24)
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Roboto, Dynalight } from 'next/font/google'
import PlausibleProvider from 'next-plausible'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const dynalight = Dynalight({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dynalight',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Stella Mattina',
    default: "Stella Mattina | Women's Health & Primary Care | OBGYN Dallas",
  },
  description: "Expert women's health and primary care in Dallas. Board-certified OBGYNs and Family Medicine doctors across 7 DFW locations.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${dynalight.variable}`}>
      <head>
        <PlausibleProvider domain="stellamattina.com" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

### Tailwind v4 globals.css with SM Brand Tokens

```css
/* Source: https://ui.shadcn.com/docs/tailwind-v4 */
/* src/app/globals.css */
@import "tailwindcss";
@import "@tailwindcss/typography";

/* shadcn/ui base variables (generated by shadcn init — do not remove) */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --primary: 221 68% 33%;          /* SM navy #1C348C */
    --primary-foreground: 0 0% 98%;
    --secondary: 224 62% 62%;        /* SM blue #617CDF */
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 93%;               /* SM gray #EDEDED */
    --muted-foreground: 0 0% 57%;
    --radius: 0.5rem;
  }
}

/* SM Brand Tokens — extend shadcn theme */
@theme {
  /* Brand colors — from cam-theme/style.css analysis */
  --color-sm-navy: #1C348C;
  --color-sm-blue: #617CDF;
  --color-sm-blue-hover: #4D63C7;
  --color-sm-blue-light: #9EB1F6;
  --color-sm-blue-card: #D6DEF9;
  --color-sm-warm: #FFFCE3;
  --color-sm-gray: #EDEDED;

  /* Typography */
  --font-sans: var(--font-roboto), system-ui, sans-serif;
  --font-display: var(--font-dynalight), Georgia, serif;

  /* Spacing scale (Ask Tia aesthetic: generous whitespace) */
  --spacing-section: 5rem;     /* 80px section padding */
  --spacing-section-lg: 8rem;  /* 128px for hero sections */
}
```

### Content Module Reading JSON at Build Time

```typescript
// Source: Architecture analysis + Next.js static import pattern
// src/lib/content/blog.ts
import blogData from '../../../scraped-sites/stellamattina/extracted/blog_posts.json'
import type { BlogPost } from './types'

const posts = blogData as BlogPost[]

export function getBlogPosts(): BlogPost[] {
  return posts.sort((a, b) =>
    new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
  )
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug)
}

export function getBlogPostSlugs(): string[] {
  return posts.map(p => p.slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return posts.filter(p =>
    p.categories.map(c => c.toLowerCase()).includes(category.toLowerCase())
  )
}

export function getBlogCategories(): string[] {
  const all = posts.flatMap(p => p.categories)
  return [...new Set(all)].sort()
}
```

### Header Shell (Server Component)

```typescript
// src/components/layout/Header.tsx
import Image from 'next/image'
import { BookingButton } from '@/components/common/BookingButton'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { MobileNav } from './MobileNav'  // 'use client' leaf component

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-sm-gray bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Stella Mattina Women's Health"
            width={180}
            height={48}
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="/find-our-locations" className="text-sm font-medium text-gray-700 hover:text-sm-navy">Locations</a>
          <a href="/doctor-directory" className="text-sm font-medium text-gray-700 hover:text-sm-navy">Doctors</a>
          <a href="/services" className="text-sm font-medium text-gray-700 hover:text-sm-navy">Services</a>
          <a href="/blog" className="text-sm font-medium text-gray-700 hover:text-sm-navy">Blog</a>
        </nav>

        <div className="flex items-center gap-3">
          <BookingButton className="bg-sm-navy text-white hover:bg-sm-blue px-4 py-2 rounded-md text-sm font-semibold" />
          <MobileNav />  {/* Client component for mobile sheet */}
        </div>
      </div>
    </header>
  )
}
```

### tsconfig.json Path for JSON Import

```json
// tsconfig.json — ensure resolveJsonModule is enabled for content layer
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Data Shape Reference (Verified from JSON Files)

### Actual Record Counts (not estimates)

| File | Records | Notes |
|------|---------|-------|
| practitioners.json | 29 practitioners | Specialties: OBGYN (majority), Family Medicine, MFM |
| locations.json | 7 locations | 4 Women's Health, 3 Family Medicine; all `providers: []` |
| services.json | 11 services | See slugs below |
| blog_posts.json | 61 blog posts | All have `full_text` as plain text (not raw HTML); clean data |
| contact_info.json | Singleton | 3 phone entries (2 unique), 2 emails |

### Service Slugs (from services.json — determines URL routes)

These 11 services live at top-level routes (NOT under `/services/`):
- `womens-health` → `/womens-health/`
- `gynecology` → `/gynecology/`
- `prenatal-care-near-me` → `/prenatal-care-near-me/`
- `maternal-fetal-medicine` → `/maternal-fetal-medicine/`
- `biote-hormone-therapy` → `/biote-hormone-therapy/`
- `hormone-pellet-therapy-dallas` → `/hormone-pellet-therapy-dallas/`
- `gynecologist-dallas` → `/gynecologist-dallas/`
- `ginecologo-dallas` → `/ginecologo-dallas/`
- `primary-care-physician-dallas` → `/primary-care-physician-dallas/`
- `patient-information` → `/patient-information/`
- `providers-bio` → `/providers-bio/`

**Note:** Service pages use top-level URL paths exactly matching the WordPress site — NOT a `/services/[slug]` pattern. Route structure must match `url` field in services.json verbatim.

### Practitioner Specialties and Categories

| Specialty Value | Category | Count |
|-----------------|----------|-------|
| OBGYN | Women's Health | Majority |
| Family Medicine | Family Medicine | Several |
| Maternal-Fetal Medicine (MFM) | Women's Health | Few |
| Maternal-Fetal Medicine (MFM), OBGYN | Women's Health | 1 |

### Blog Post Content Format

Blog posts store content in `full_text` field as **plain text** (not raw HTML). Content is clean and does not require HTML sanitization. Each post includes: slug, url, page_title, heading, author, published_date, meta_description, categories[], tags[], full_text. The `full_text` ends with a related-tags footer block (a long list of tag phrases) — strip this in the content module or in the rendering component.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.ts` with `extend.colors` | `@theme { }` in `globals.css` | Tailwind v4 (2025) | All SM tokens must go in CSS, not JS config |
| `tailwindcss-animate` for shadcn animations | `tw-animate-css` | shadcn/ui Tailwind v4 update (2025) | Replace dependency during shadcn init |
| `next-seo` library | Next.js built-in Metadata API | Next.js 13+ App Router | next-seo is Pages Router only; do not install |
| Google Fonts `<link>` tags | `next/font/google` module | Next.js 13+ | Self-hosted, zero CLS, no external DNS |
| `contentlayer` for content | Direct JSON import + typed modules | contentlayer archived 2024 | Do not use contentlayer; it is unmaintained |
| `react-helmet` for head tags | Next.js `export const metadata` | App Router | react-helmet is Pages Router pattern only |
| Turbopack as opt-in flag | Turbopack is default in Next.js 16 | Next.js 16 (Dec 2025) | `next dev` uses Turbopack automatically; no flag needed |

**Deprecated/outdated:**
- `next-seo`: Pages Router SEO library. App Router has native replacement built in.
- `contentlayer`: Officially archived on GitHub mid-2024. Do not introduce as a dependency.
- `tailwindcss-animate`: Deprecated in shadcn/ui v4 setup; replaced by `tw-animate-css`.
- `@tailwindcss/postcss` separate install: In Next.js 16 + Tailwind v4, the PostCSS integration is handled via `@tailwindcss/postcss` — verify this is installed as part of `create-next-app` output.

---

## Open Questions

1. **Location name matching canonical key**
   - What we know: `locations.json` uses verbose names; `practitioners.json` uses short names. They don't match directly.
   - What's unclear: The exact canonical form needed for reliable matching (e.g., "Mesquite" matches "Women's Health | Mesquite, TX" but "Samuell (White Rock Lake)" vs "Dallas - Samuell" needs a hand-crafted map).
   - Recommendation: Build a static lookup table of 7 location slugs → location short names during Phase 1 content layer implementation. Verify all 7 before committing.

2. **SM logo file format and dimensions**
   - What we know: Logo exists at `scraped-sites/stellamattina/stellamattina.com/wp-content/uploads/2024/03/logo-new.png`
   - What's unclear: Actual dimensions and whether a transparent-background SVG version exists.
   - Recommendation: Inspect the PNG dimensions before setting `width` and `height` on `next/image`. If no SVG exists, use the PNG — it is sufficient for a logo.

3. **`providers-bio` and `patient-information` service slugs**
   - What we know: These appear in services.json with WordPress URL paths.
   - What's unclear: Whether these should be public routes in the Next.js app or are legacy WordPress admin pages that should not be rebuilt.
   - Recommendation: Inspect the scraped HTML for these URLs to determine if they have meaningful public content. If not, omit from the Next.js route tree and add a 301 redirect to a relevant page.

4. **Next.js 16 + Tailwind v4 exact PostCSS setup**
   - What we know: `create-next-app@latest` sets up Tailwind v4 by default as of Next.js 16. The CSS-first config is via `@import "tailwindcss"`.
   - What's unclear: Whether `@tailwindcss/postcss` is installed automatically by `create-next-app` or requires a separate install step.
   - Recommendation: After running `create-next-app`, verify `package.json` includes `@tailwindcss/postcss` as a dev dependency before proceeding with token configuration.

---

## Sources

### Primary (HIGH confidence)
- Next.js 16.1 Installation Docs: https://nextjs.org/docs/app/getting-started/installation (version 16.1.6, updated 2026-02-24) — verified install command, Node.js requirement, Turbopack default
- Next.js 16 Fonts Guide: https://nextjs.org/docs/app/getting-started/fonts (updated 2026-02-24) — `next/font/google` pattern
- shadcn/ui Tailwind v4 Docs: https://ui.shadcn.com/docs/tailwind-v4 — `@theme` directive, `tw-animate-css`, `@theme inline` configuration
- shadcn/ui Next.js Installation: https://ui.shadcn.com/docs/installation/next — `npx shadcn@latest init` command
- Scraped JSON files (direct inspection): `scraped-sites/stellamattina/extracted/` — all record counts, field names, data shapes verified directly

### Secondary (MEDIUM confidence)
- SM brand colors `#1C348C` (navy), `#617CDF` (blue): Extracted from `scraped-sites/stellamattina/stellamattina.com/wp-content/themes/cam-theme/style.css` and inline styles in homepage HTML — multiple occurrences confirm these as primary brand colors
- SM fonts (Roboto, Dynalight): Extracted from `<link>` tags in homepage HTML — direct observation from WordPress page source
- next-plausible integration: https://github.com/4lejandrito/next-plausible — official community package, confirmed App Router support in multiple 2025 guides
- Plausible SPA support: https://plausible.io/docs/spa-support — automatic pushState routing support confirmed in official docs

### Tertiary (LOW confidence)
- Location name matching specifics: Inferred from data inspection. The exact canonical key strategy was not verified end-to-end — needs validation during implementation.
- `providers-bio` and `patient-information` route decisions: Not verified by inspecting scraped HTML of those pages. Recommendation is provisional.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Next.js 16.1.6 and Tailwind v4 verified via official docs; shadcn/ui Tailwind v4 compatibility confirmed via official shadcn docs
- Architecture: HIGH — Content layer pattern derived from direct inspection of JSON files; data shapes are exact
- Brand tokens: MEDIUM — Colors and fonts extracted from scraped CSS and HTML; correct for observed values but a visual comparison with the live site should confirm
- Analytics/HIPAA: HIGH — Plausible integration is well-documented; HIPAA principle (no behavioral tracking on medical URL paths) is established guidance
- Pitfalls: HIGH — Most pitfalls derived from direct data inspection (location mismatch, phone deduplication) or established Next.js patterns

**Research date:** 2026-02-26
**Valid until:** 2026-03-28 (30 days — stack is stable; Tailwind v4 and shadcn are active but not in rapid breaking-change cycles)

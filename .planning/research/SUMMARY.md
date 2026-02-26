# Project Research Summary

**Project:** Stella Mattina Medical Clinic Website Rebuild
**Domain:** Medical clinic marketing site (women's health / OBGYN / primary care, multi-location, Dallas TX)
**Researched:** 2026-02-26
**Confidence:** HIGH (stack and architecture), MEDIUM (AIO optimization patterns)

## Executive Summary

Stella Mattina is a multi-location women's health and primary care clinic in the Dallas area. The rebuild is a WordPress-to-Next.js migration — not a greenfield build — which means the primary content already exists in scraped JSON files and the primary deliverable is a faster, better-ranked version of the current site. The correct approach is fully static generation (SSG) using Next.js 16.x App Router, a file-based content layer reading from pre-extracted JSON, and a Vercel deployment that eliminates server infrastructure entirely. The site is marketing and SEO-first: every architectural and technology decision should be evaluated against its impact on Google rankings, Core Web Vitals, and AI search visibility (AIO).

The recommended stack is Next.js 16.x with TypeScript, Tailwind CSS v4, shadcn/ui for accessible component primitives, and zero external SEO libraries — everything needed for metadata, sitemaps, robots.txt, and OG images is built into the App Router's native APIs. Content is served from five pre-extracted JSON files (practitioners, locations, services, blog posts, contact info) through a typed content layer at build time. Schema.org structured data using medical-specific types (MedicalClinic, Physician, MedicalProcedure, FAQPage) is the highest-leverage differentiator over typical clinic sites, enabling both traditional rich results and AI Overview citations. The design reference is Ask Tia — a warm, minimal aesthetic — applied using Stella Mattina's existing brand colors, not Ask Tia's palette.

The three critical risks for this project are distinct from typical web builds: (1) HIPAA exposure from analytics and contact form implementations — standard tools like Google Analytics 4 can constitute PHI violations on a medical site, requiring privacy-safe alternatives from day one; (2) SEO authority destruction from URL changes — the WordPress site has accumulated years of backlink equity at specific URLs that must be preserved exactly or redirected with 301s, since any 404 represents permanent ranking loss; and (3) content quality degradation from scraped WordPress artifacts — blog post data is 594MB and may contain duplicates, shortcodes, and plugin-injected HTML that must be cleaned before import. Address these three risks in Phase 1, not as post-launch cleanup.

---

## Key Findings

### Recommended Stack

The stack is lean by design. Next.js 16.x App Router provides static generation, built-in metadata management, sitemap generation, and image optimization in a single framework. Tailwind CSS v4 (3.78x faster full builds, 182x faster incremental builds) replaces any need for CSS Modules or component-library styling. shadcn/ui provides accessible component primitives (navigation menu, accordion, card, sheet for mobile nav) without bundle weight penalties. MDX via @next/mdx handles blog content with @tailwindcss/typography for prose normalization of WordPress-sourced HTML.

Notably absent by design: next-seo (replaced by App Router native APIs), Contentlayer (unmaintained since mid-2024), any headless CMS (file-based content is sufficient for v1), Google Analytics (HIPAA risk — use Plausible or Vercel Analytics instead), and react-helmet (Pages Router pattern, incompatible with App Router). Deployment is Vercel: zero-config Next.js deployment with built-in image optimization pipeline, CDN, Speed Insights, and Preview deployments.

**Core technologies:**
- **Next.js 16.x (App Router):** Full-stack framework — static generation, native metadata API, sitemap/robots built-in, ISR for future content updates
- **React 19:** Peer dependency — Server Components reduce JS bundle; critical for LCP on mobile
- **TypeScript 5.x:** Type safety for schema-dts structured data types; catches missing required fields at compile time
- **Tailwind CSS v4:** Utility-first CSS with native CSS variables — faster builds, zero-config, supports shadcn/ui
- **shadcn/ui (2025):** Accessible Radix UI-based components copied into codebase — no version lock-in, aria-compliant
- **@next/mdx + gray-matter:** File-based blog content — MDX files with frontmatter, no CMS overhead
- **schema-dts:** TypeScript types for schema.org JSON-LD — compile-time validation of structured data
- **Vercel:** Hosting — zero-config deployment, global CDN, image optimization, Speed Insights
- **Plausible Analytics (or @vercel/analytics):** HIPAA-safe analytics — no personal data collection, no cookie consent needed

### Expected Features

The rebuild scope is a parity migration plus upgrade — not a feature-gated MVP. All content currently on the site must be ported. The differentiation layer is SEO/AIO implementation quality, not feature novelty.

**Must have (table stakes) — missing any of these loses patients:**
- Homepage with clinic hero, services overview, and "Book Now" CTA (links to existing ecwcloud portal)
- Service overview page + individual service pages for all 7 services (Gynecology, Obstetrics, Hormone Therapy, Primary Care, Women's Health, Maternal-Fetal Medicine, Immigration Physical)
- Doctor directory + individual bio pages for all 15+ practitioners
- Locations overview + individual location pages for all 7 locations (with address, phone, hours, map embed)
- Contact page (phone 214-942-3100, email, minimal contact form with PHI disclaimer)
- About Us, Privacy Policy, Careers pages
- Mobile-responsive layout (60%+ of medical searches are mobile)
- sitemap.xml, robots.txt, per-page metadata
- Blog with 50+ migrated posts

**Should have (differentiators — set this rebuild above average clinic sites):**
- Schema.org structured data: MedicalClinic, Physician, MedicalProcedure, FAQPage, Article, BreadcrumbList
- FAQ sections per service page (semantic HTML + FAQPage JSON-LD) for AI Overview eligibility
- Warm minimal design applying Ask Tia layout principles with SM brand tokens
- Author attribution on blog posts with E-E-A-T signals (MD bylines linked to doctor profiles)
- Open Graph + per-page OG images via next/og
- Core Web Vitals optimization (all images via next/image with explicit dimensions)
- Doctor profile linked directly to individual booking URL

**Defer to v2+:**
- Location-specific service pages (e.g., /gynecology/arlington) — high SEO value but requires editorial strategy
- Condition/symptom landing pages — requires content planning beyond migration
- Headless CMS — file-based JSON is sufficient for v1; revisit when update frequency demands it
- Multilingual site (Spanish) — requires professional medical translator; machine translation is a liability
- Careers page can be simple and added last (low patient-impact)

**Anti-features (explicitly do not build):**
- Custom appointment booking system — HIPAA-compliant booking infrastructure is out of scope; link to existing ecwcloud portal
- Patient portal, live chat widget, insurance verification tool, symptom checker, prescription forms — all carry HIPAA liability or scope beyond the site's purpose
- AMP pages — deprecated by Google; Core Web Vitals optimization is the correct approach

### Architecture Approach

The architecture is a statically generated Next.js App Router site with a build-time content layer. Five pre-existing JSON files (from the WordPress scrape) serve as the single source of truth. A typed content module layer (`src/lib/content/*.ts`) reads these files at build time and exposes `getAll()`, `getBySlug()`, and `getAllSlugs()` functions — all page components consume data through this layer, never directly from JSON. This abstraction makes future CMS migration a one-module change. All pages use `generateStaticParams` for static pre-rendering; the only client components are interactive UI elements (doctor/location filter, mobile nav, contact form).

**Major components:**
1. **Content Data Layer (`src/lib/content/`)** — typed access to practitioners, locations, services, blog posts, contact info from JSON; build-time only, no runtime I/O
2. **Page Routes (`src/app/`)** — one file per route, using `generateStaticParams` for dynamic routes; exports both page component and `generateMetadata` for SEO
3. **Shared UI Components (`src/components/`)** — organized by domain (layout, home, services, doctors, locations, blog, schema); Server Components by default; `"use client"` only on interactive leaf components
4. **Schema Components (`src/components/schema/`)** — Server Components that render inline JSON-LD script tags; one component per schema type (ClinicSchema, DoctorSchema, ServiceSchema, BlogSchema, BreadcrumbSchema)
5. **Static Assets (`public/`)** — practitioner photos downloaded from scraped photo_url fields; blog images preserving wp-content path structure for internal links

A critical constraint: all existing WordPress URLs must be preserved exactly in the Next.js `app/` directory structure. Several high-value pages (`/gynecologist-dallas`, `/biote-hormone-therapy`, `/find-our-locations`) are top-level routes, not nested under `/services/`. Changing these URLs destroys SEO equity accumulated over years.

**Build order principle:** detail pages before index pages (detail page defines the data shape; index card is a summary of that shape), all content pages before homepage (homepage composes all component types), content before SEO layer (SEO metadata functions use the same data as page components).

### Critical Pitfalls

1. **HIPAA-violating analytics (Critical)** — Standard GA4 and Meta Pixel transmit PHI on medical sites (service page URLs reveal health conditions). Use Plausible Analytics or Vercel Analytics only. Never add `gtag` or `fbq`. Set this policy in Phase 1 before any page goes live.

2. **URL structure changes destroying SEO equity (Critical)** — Any 404 on a previously indexed URL represents permanent ranking loss. Map all existing WordPress URLs before writing routes. Preserve them exactly. Configure `trailingSlash` to match WordPress behavior. Implement 301 redirects for any URL that must change.

3. **Scraped WordPress content imported without cleanup (Critical)** — blog_posts.json is 594MB and likely contains duplicate records, WordPress shortcodes, and plugin HTML. Deduplicate by slug, strip shortcodes, sanitize HTML with `sanitize-html`, wrap all HTML content in `prose` Tailwind Typography container.

4. **Missing medical schema.org types (Critical)** — The WordPress site used Yoast which auto-generated schema; the rebuild loses this. Must explicitly implement MedicalOrganization, Physician, MedicalProcedure, FAQPage, and Article schema. Generic Organization or WebPage schema leaves significant rich results and AIO visibility on the table.

5. **Images served unoptimized from scraped WordPress uploads (Critical)** — Scraped JPEGs are typically 2-5MB originals that destroy LCP scores. Every image must go through `next/image` with explicit `width`, `height`, `sizes`, and `priority` props. Download practitioner photos from photo_url fields into `public/images/doctors/` during project setup.

6. **Contact forms collecting PHI without safeguards (Critical)** — Contact forms must not include "reason for visit" or service interest fields. Limit to name, phone, email, message. Add explicit PHI disclaimer. All health-related intake routes to the external booking portal.

---

## Implications for Roadmap

Based on the combined research, a 6-phase structure is recommended. The ordering is determined by dependencies (data layer before pages, detail pages before index pages, content before homepage), risk front-loading (HIPAA, analytics, URL mapping resolved in Phase 1), and the content migration reality (blog deduplication is high-effort and should be isolated in its own phase).

### Phase 1: Foundation and Safety Infrastructure

**Rationale:** Three critical pitfalls (HIPAA analytics, URL destruction, design system identity) must be resolved before a single page is built. The data layer and component infrastructure must exist before any page can be rendered. This phase has no user-visible output but determines correctness of everything that follows.

**Delivers:** Project scaffold, typed content layer, global layout components, design tokens, analytics policy, URL inventory, image download pipeline

**Features from FEATURES.md:** Global layout (header/footer/nav), phone number display, design system (Ask Tia vibe with SM brand tokens)

**Stack from STACK.md:** Next.js 16.x + TypeScript scaffold, Tailwind CSS v4 config, shadcn/ui init, next/font/google, @vercel/analytics (privacy-safe)

**Architecture from ARCHITECTURE.md:** `src/lib/content/*.ts` content layer, `src/components/layout/` Header/Footer/PageWrapper, `src/components/common/` BookingButton/PhoneLink, centralized `lib/clinic-data.ts` for contact info

**Avoids from PITFALLS.md:** HIPAA analytics violation (no GA4 — select Plausible/Vercel Analytics now), WordPress URL destruction (map all existing URLs before any routing), Ask Tia design literal copy (define SM brand tokens first), hardcoded phone numbers across components

**Research flag:** Standard patterns — no additional research needed for this phase.

---

### Phase 2: Core Content Page Templates

**Rationale:** Build the detail page for each content type before the corresponding index/listing page. This establishes the full data shape for each type (doctor, location, service, blog post) before building summary card components. Doing index pages first creates summary cards without knowing what they summarize.

**Delivers:** Individual doctor bio pages, individual location pages, individual service pages, individual blog post pages — all with their respective schema.org structured data

**Features from FEATURES.md:** Individual provider bio pages, individual service pages, individual location pages, blog post pages, schema.org (Physician, MedicalProcedure, LocalBusiness, Article), FAQ blocks on service pages, E-E-A-T author attribution on blog posts

**Stack from STACK.md:** schema-dts for JSON-LD types, @next/mdx + gray-matter for blog MDX, @tailwindcss/typography for prose normalization of WordPress HTML

**Architecture from ARCHITECTURE.md:** `app/doctor-directory/[slug]/`, `app/find-our-locations/[slug]/`, `app/services/[slug]/`, `app/blog/[slug]/` — all with `generateStaticParams`; `components/schema/` ClinicSchema/DoctorSchema/ServiceSchema/BlogSchema

**Avoids from PITFALLS.md:** Missing medical schema types (implement per page type as built, not post-launch), scraped content without cleanup (use JSON as source, sanitize HTML, strip shortcodes), images without next/image (every photo through image component with dimensions), missing alt text (generate from practitioners.json data), blog data deduplication (deduplicate by slug before import), contact form PHI exposure (name/phone/email/message only + disclaimer), Vimeo without facade pattern

**Research flag:** AIO content structure (FAQ sections, answer-first paragraphs) is MEDIUM confidence — validate current FAQPage schema requirements against Google Search Central before implementation.

---

### Phase 3: Index and Listing Pages

**Rationale:** Index pages require the detail page components to exist first (they render card summaries of detail page data). Client-side filter components (doctor specialty/location filter, blog category filter) are the only `"use client"` components in the entire site — their scope is intentionally narrow.

**Delivers:** Doctor directory page with specialty/location filter, locations listing page, services listing page, blog index with category filter

**Features from FEATURES.md:** Doctor directory page, services overview page, locations overview page, blog listing page, category navigation

**Architecture from ARCHITECTURE.md:** `app/doctor-directory/`, `app/find-our-locations/`, `app/services/`, `app/blog/`, `app/blog/category/[category]/` — DoctorGrid + DoctorFilter (client component), LocationGrid, ServicesList, BlogGrid + CategoryFilter (client component); `useState` only for filter state (not Zustand/Redux)

**Avoids from PITFALLS.md:** Global state for filter logic (use `useState` in leaf client component, not shared state), `"use client"` on page-level components (client boundary stays at filter component only)

**Research flag:** Standard patterns — well-documented in Next.js App Router docs. No additional research needed.

---

### Phase 4: Static Pages and SEO Landing Pages

**Rationale:** Static pages (About Us, Careers, Contact Us) and the pre-existing WordPress SEO landing pages (`/gynecologist-dallas`, `/biote-hormone-therapy`, `/gynecology`, `/immigration-physical`) have no dynamic data and no component dependencies — they can be built at any point but logically follow the content templates that define the site's visual patterns.

**Delivers:** About Us, Careers, Contact Us (with minimal safe form), Privacy Policy, dedicated SEO landing pages preserving exact WordPress URL structure

**Features from FEATURES.md:** About Us, Careers, Contact page, Privacy Policy, social media links, patient testimonials section

**Architecture from ARCHITECTURE.md:** Static `app/page-name/page.tsx` files — no `generateStaticParams`, static `metadata` export (not function), content ported from scraped HTML

**Avoids from PITFALLS.md:** URL restructuring (these pages use the exact WordPress URL paths as `app/` directory names), contact form PHI collection

**Research flag:** Standard patterns — no additional research needed.

---

### Phase 5: Homepage

**Rationale:** The homepage is a composition of all other component types (hero, service cards, doctor highlights, location map, trust bar). Building it last means all component types are built and validated in isolation before assembly. A homepage built before its sub-components requires placeholder data and must be rebuilt.

**Delivers:** Homepage with HeroSection, ServicesGrid, DoctorHighlights, LocationsMap, TrustBar — the primary patient acquisition and trust-building surface

**Features from FEATURES.md:** Homepage hero with booking CTA, services overview, doctor trust signal, prominent phone number, patient testimonials/trust signals

**Architecture from ARCHITECTURE.md:** `app/page.tsx` composing `components/home/` HeroSection, ServicesGrid, DoctorHighlights, LocationsMap, TrustBar — each component receives server-fetched data as props

**Avoids from PITFALLS.md:** LCP images not using next/image with priority prop (hero image is the LCP element — must have `priority` set), Google Fonts via external link (must use next/font/google exclusively)

**Research flag:** Standard patterns — no additional research needed.

---

### Phase 6: SEO and AIO Hardening Layer

**Rationale:** The SEO layer (sitemap, robots.txt, canonical URLs, full Open Graph coverage) is last because it depends on all routes existing. The sitemap must enumerate all pages — it can only be correct after all pages are built. This phase also includes launch pre-flight checks (URL audit, 301 redirect verification, schema validation, Core Web Vitals baseline).

**Delivers:** sitemap.xml covering all routes, robots.txt (allow AI crawlers), canonical URLs on all pages, dynamic OG images via next/og for blog and service pages, @vercel/speed-insights integration, Speed Insights baseline, Google Search Console sitemap submission, www/apex redirect configuration, llms.txt

**Features from FEATURES.md:** sitemap.xml, robots.txt, canonical URLs, Open Graph + Twitter card meta per page, breadcrumb navigation + BreadcrumbList schema, Core Web Vitals optimization verification

**Stack from STACK.md:** `app/sitemap.ts` (Next.js built-in), `app/robots.ts` (Next.js built-in), `metadata.alternates.canonical` per page, `next/og` for dynamic social cards, `@vercel/speed-insights`

**Avoids from PITFALLS.md:** No sitemap/robots configuration (explicit generation required — not automatic), www vs apex canonicalization gap (Vercel DNS configuration), deploying without HTTPS redirect, sitemap missing newly added routes (generate dynamically from data layer `getAllSlugs()`)

**Research flag:** Standard patterns — Next.js built-in sitemap and robots APIs are well-documented. llms.txt is LOW confidence (emerging convention) — implement but don't rely on it.

---

### Phase Ordering Rationale

- **Dependencies drive order:** Content layer before pages, detail pages before index pages, index pages before homepage. The homepage is genuinely the last page to build because it depends on all others.
- **Risk front-loading:** HIPAA and URL mapping concerns are Phase 1 items precisely because they cannot be fixed after pages go live without rework or legal exposure.
- **Schema.org is not a layer — it is part of each content type:** Structured data must be implemented with each page type (Phase 2), not retrofitted in Phase 6. Only sitemap-level SEO (sitemap.xml, robots.txt, OG images) belongs in the final phase.
- **Blog content is the highest-effort content type:** 594MB of JSON requiring deduplication, HTML sanitization, and author cross-referencing. It belongs in Phase 2 with sufficient time allocation — do not treat blog migration as trivial.
- **Client components are exceptions, not defaults:** Only DoctorFilter, CategoryFilter, mobile nav toggle, and contact form are client components. Everything else is a Server Component. This architectural constraint is enforced from Phase 1.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (AIO content structure):** FAQPage schema eligibility criteria and optimal content patterns for Google AI Overviews are evolving. Validate against current Google Search Central guidance before writing service page FAQ content. MEDIUM confidence.
- **Phase 2 (blog HTML sanitization):** Verify the specific WordPress shortcode patterns present in Stella Mattina's blog_posts.json before choosing a sanitization approach. The 594MB file size and 5,554-line CSV suggest the dataset needs hands-on inspection.

Phases with standard patterns (can skip research-phase):
- **Phase 1 (foundation):** Next.js scaffolding, Tailwind v4 config, shadcn/ui init are all well-documented.
- **Phase 3 (index pages):** Standard App Router patterns with `useState` filtering.
- **Phase 4 (static pages):** No dynamic data, no novel patterns.
- **Phase 5 (homepage):** Composition of Phase 2-4 components; no new patterns.
- **Phase 6 (SEO hardening):** Next.js built-in sitemap/robots APIs are fully documented.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Next.js 16.x verified via official blog (Dec 2025). Tailwind v4 confirmed with benchmarks. shadcn/ui Tailwind v4 compatibility MEDIUM (confirmed but some components may need migration). @next/mdx official docs updated 2026-02-24. |
| Features | HIGH | Derived from direct analysis of scraped Stella Mattina site and extracted JSON data files. Feature list reflects actual existing content, not assumptions. AIO-specific feature guidance is MEDIUM confidence. |
| Architecture | HIGH | Directly derived from analysis of the five extracted JSON files in the project. Data shapes, URL structure, and component boundaries are grounded in what actually exists in the scraped data. Next.js App Router patterns are stable and well-validated. |
| Pitfalls | HIGH (HIPAA, URL, images, schema), MEDIUM (AIO) | HIPAA guidance on tracking pixels is well-established (HHS Dec 2022). WordPress migration SEO patterns are well-documented. AIO optimization is an evolving field — flagged as MEDIUM. Blog data deduplication risk is confirmed by actual file size evidence (594MB). |

**Overall confidence:** HIGH

### Gaps to Address

- **Blog post content format:** It is not confirmed whether blog post body content in blog_posts.json is stored as raw HTML, Markdown, or WordPress block JSON. This determines the sanitization and rendering approach. Inspect the `content` field of a sample blog_posts.json record before Phase 2 implementation begins.
- **Trailing slash configuration:** Whether the existing WordPress site used trailing slashes must be verified from the scraped HTML canonical URLs before configuring Next.js `trailingSlash` setting. Wrong configuration creates URL mismatches that destroy redirects.
- **llms.txt adoption:** This is a LOW confidence, emerging convention. Implement it as a zero-cost static file but do not invest editorial effort in it until the standard matures.
- **shadcn/ui component migration:** Some shadcn/ui components may require manual Tailwind v4 migration steps. Verify during Phase 1 setup that the components needed (navigation-menu, accordion, card, sheet, button) work correctly before committing to the component architecture.
- **AIO FAQPage eligibility:** Google's criteria for which FAQPage schema implementations qualify for AI Overview citations are not formally documented and evolve rapidly. Validate against current Google Search Central guidance at the start of Phase 2.

---

## Sources

### Primary (HIGH confidence)
- Next.js 16.1 official blog (December 18, 2025) — framework version, Turbopack stable status
- Next.js Metadata API docs (updated 2026-02-24) — canonical URLs, generateMetadata, sitemap.ts, robots.ts
- Next.js MDX Guide (updated 2026-02-24) — @next/mdx setup, remark plugins
- Tailwind CSS v4 official blog — build speed benchmarks, zero-config setup
- HHS OCR guidance on tracking technologies (December 2022) — HIPAA implications of analytics on medical sites
- Direct analysis of `scraped-sites/stellamattina/extracted/*.json` — practitioners, locations, services, blog posts, contact info
- Direct analysis of scraped WordPress URL structure — existing routes, slug formats, SEO landing pages

### Secondary (MEDIUM confidence)
- schema-dts npm package (v1.x, actively maintained) — TypeScript types for schema.org JSON-LD
- shadcn/ui changelog — Tailwind v4 compatibility confirmation
- Google Search Central structured data documentation — MedicalOrganization, Physician, FAQPage types
- AIO optimization patterns — Google AI Overviews citation behavior, FAQPage schema eligibility
- Ask Tia scraped site analysis — design patterns, layout principles, component naming conventions

### Tertiary (LOW confidence)
- llms.txt convention — emerging community standard popularized by Anthropic and adopted by Vercel; not a formal specification; AI crawler adoption rate uncertain

---
*Research completed: 2026-02-26*
*Ready for roadmap: yes*

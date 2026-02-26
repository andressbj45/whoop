# Domain Pitfalls

**Domain:** Medical clinic website rebuild (Next.js, scraped WordPress source)
**Project:** Stella Mattina — stellamattina.com
**Researched:** 2026-02-26
**Overall confidence:** MEDIUM-HIGH (training data for HIPAA/Next.js well-established; AIO is newer territory, flagged where confidence is lower)

---

## Critical Pitfalls

Mistakes that cause rewrites, legal exposure, or major SEO damage.

---

### Pitfall 1: Using Google Analytics / Meta Pixel Without HIPAA-Compliant Configuration

**What goes wrong:** Standard Google Analytics 4, Meta Pixel, or other third-party tracking scripts collect IP addresses, referrer URLs, and behavioral data. On a medical clinic website, the referrer URL alone can constitute Protected Health Information (PHI) — e.g., `stellamattina.com/services/hormone-therapy` visited from a specific IP reveals a person's health interest. HHS has issued guidance (December 2022) explicitly warning that tracking pixels on healthcare sites may violate HIPAA if they transmit PHI to third parties without a Business Associate Agreement (BAA).

**Why it happens:** Developers copy analytics implementations from non-medical sites without thinking about what the URL path discloses. Medical service page URLs are inherently sensitive.

**Consequences:** OCR enforcement action, fines up to $50,000 per violation category, and mandatory corrective action plans. Several large health systems (Advocate Aurora Health, Novant Health) faced class action lawsuits in 2022-2023 for this exact issue.

**Prevention:**
- Do NOT implement Google Analytics 4 or Meta Pixel in their default configuration on any service, doctor, or health-condition page.
- If analytics are needed: use a HIPAA-compliant analytics provider (e.g., Freshpaint with BAA, or server-side analytics that strip PHI before transmission).
- For Stella Mattina Phase 1: omit behavioral tracking entirely, or use only privacy-safe page-view analytics with IP anonymization and no cross-site tracking (e.g., Plausible Analytics, which is GDPR/privacy-first and does not collect personal data).
- Never use `gtag` or `fbq` on pages whose URLs reveal health conditions or services.
- The external patient portal (booking system) handles PHI — Stella Mattina's site only links to it. This reduces HIPAA surface area significantly, but URL-level tracking on service pages is still a risk.

**Detection:** Audit any `<Script>` tags in `_app.tsx` or layout files. If a third-party tracking domain appears in the network tab when navigating to a service page, that is a violation risk.

**Phase:** Address in Phase 1 (foundation/infrastructure). Establish analytics policy before any page goes live.

---

### Pitfall 2: Embedding Contact Forms That Collect Patient Information Without HIPAA Safeguards

**What goes wrong:** A contact form that asks "What brings you in?" or "Which service are you interested in?" collects PHI. If that form data is sent via a standard email integration (EmailJS, Formspree, Mailchimp) without a BAA, it's a HIPAA violation. Gravity Forms (used on the WordPress site) typically had a BAA path — a raw Next.js email integration does not.

**Why it happens:** Developers treat medical contact forms like e-commerce "contact us" forms. The health context is forgotten.

**Consequences:** Any form submission containing health information sent to a non-BAA provider creates liability. If the form data is stored in a database or third-party service without encryption and BAA, every record is a potential violation.

**Prevention:**
- For Stella Mattina: the booking CTA links to the external patient portal — this is the RIGHT approach. The patient portal (presumably HIPAA-compliant) handles sensitive intake.
- The site's own contact form should be limited to: name, phone, email, and a generic message. Do NOT add dropdowns for "reason for visit" or "service interest."
- Use a HIPAA-compliant form backend or keep forms minimal enough that no PHI is collected.
- Add a notice on contact forms: "Please do not include sensitive health information in this form."
- Consider using a simple mailto link for non-sensitive inquiries rather than a stored-form-data solution.

**Detection:** Review every form field label. Any field that could elicit health information is a red flag.

**Phase:** Address in Phase 2 (contact/forms implementation).

---

### Pitfall 3: Scraped Images Served Without Optimization — Core Web Vitals Failure

**What goes wrong:** The scraped site contains JPEG/PNG images from WordPress's `wp-content/uploads/` directory. These are typically unoptimized originals: full-resolution JPEGs at 2-5MB, no WebP variants, no responsive srcset. Serving these directly destroys Largest Contentful Paint (LCP) and Core Web Vitals scores, which directly harm Google rankings.

**Why it happens:** Developers copy images from the scraped source into `/public/images/` and reference them with `<img>` tags or even Next.js `<Image>` with incorrect sizing. The images "work" visually but fail performance tests.

**Consequences:** LCP scores of 5-8 seconds on mobile. Google penalizes pages with poor Core Web Vitals. A medical clinic with poor performance will rank below competitors. Ask Tia's design aesthetic also relies on crisp, fast-loading photography — poor image performance undermines the entire design goal.

**Prevention:**
- Audit all scraped images before use: identify dimensions, file size, format.
- Convert all hero and above-the-fold images to WebP/AVIF during the build process (Next.js `<Image>` does this automatically when configured correctly).
- Always provide explicit `width` and `height` props on `<Image>` components to prevent layout shift (CLS).
- Use `priority` prop on hero/LCP images; use `loading="lazy"` for below-fold images.
- Set `sizes` prop correctly for responsive images — a common mistake is leaving it as default (100vw) for images that are only 50% wide on desktop.
- Run `next build` and check the output warnings for image issues before deploying.
- Store images in a CDN (Vercel's built-in image optimization, or Cloudinary) rather than directly in `/public/`.

**Detection:** Run PageSpeed Insights on any page after launch. LCP > 2.5s or CLS > 0.1 flags this pitfall.

**Phase:** Address in Phase 1 (image pipeline setup) and verify in each content phase.

---

### Pitfall 4: Broken or Redirected URLs After WordPress-to-Next.js Migration — SEO Authority Loss

**What goes wrong:** The existing stellamattina.com has accumulated backlinks, Google indexing, and PageRank at specific URLs. WordPress generates URLs like `/services/gynecology/`, `/blog/post-name/`, `/doctors/dr-jane-smith/`. If the Next.js rebuild changes ANY of these URLs (e.g., `/services/gynecology` without trailing slash, `/blog/post-name` with different slug format, `/team/dr-jane-smith` renamed to `/doctors/`), Google treats them as new pages and the old URLs become 404s. All accumulated authority is lost.

**Why it happens:** Developers focus on building new pages and forget URL parity. Next.js file-based routing makes it easy to choose different URL structures. WordPress often had trailing slashes; Next.js often does not. Slugs may be cleaned up or renamed for "better" structure.

**Consequences:** A site rebuild that causes 404s on previously indexed URLs will see a dramatic ranking drop. Recovery takes months. For a medical clinic, this means lost patient acquisition during the recovery period.

**Prevention:**
- Map ALL existing URLs from the scraped site before building routes. The extracted JSON and scraped HTML directory structure provide this map.
- Match WordPress URL structure exactly in Next.js `app/` directory naming. If WordPress had `/services/gynecology/`, create `app/services/gynecology/page.tsx`.
- Configure Next.js `trailingSlash: true` in `next.config.js` if the WordPress site used trailing slashes (check the scraped HTML for canonical URLs).
- For any URLs that MUST change, implement 301 redirects in `next.config.js` `redirects()` — never let old URLs 404.
- Use the scraped sitemap or crawl the scraped HTML to generate a complete URL inventory before writing a single route.
- Submit the new sitemap to Google Search Console after launch.

**Detection:** After build, run a crawl of all URLs extracted from scraped data against the new site. Any 404 is a pre-launch blocker.

**Phase:** Phase 1 (URL mapping) and pre-launch audit.

---

### Pitfall 5: Scraped Content Pasted Directly Without Cleanup — Structured Data and AIO Pollution

**What goes wrong:** Content scraped from WordPress is riddled with artifacts: WordPress shortcodes (`[vc_row][vc_column]`), plugin-injected HTML, inline styles, ad placeholder divs, and duplicated nav/footer content embedded in page body. If this content is dropped directly into Next.js components, the resulting HTML is semantically polluted. Google's AI Overviews and LLMs parsing the page for AIO will extract garbled or contradictory information.

**Why it happens:** Developers extract text content from scraped HTML by taking `.innerHTML` of a main content selector, not realizing it contains plugin artifacts and theme chrome.

**Consequences:** Schema.org structured data conflicts with visible page content (a common cause of Google rich result rejection). AI systems extract incorrect or incomplete clinic information. The page looks fine visually but is semantically broken to crawlers.

**Prevention:**
- Use the extracted JSON files (`services.json`, `practitioners.json`, `blog_posts.json`) as the source of truth — these are pre-extracted structured data, not raw HTML.
- For blog post content: strip all WordPress shortcodes before storing. Use a regex or parser pass: `/\[.*?\]/g` removes shortcodes.
- For any HTML content: parse with a proper HTML sanitizer (DOMPurify server-side, or `sanitize-html` npm package) and allow only semantic HTML elements.
- After content import, manually review at least the homepage, one service page, one doctor bio, and one blog post for WordPress artifacts.
- Run the final site through Google's Rich Results Test and validate all schema.org markup returns clean results.

**Detection:** Search page source for `[vc_`, `[gravityforms`, `[contact-form`, or style attributes with WordPress-specific values. Any found = content not cleaned.

**Phase:** Phase 2 (content migration). This is the highest-effort cleanup phase.

---

### Pitfall 6: Missing or Incorrect Schema.org Structured Data for Medical Content

**What goes wrong:** Medical websites have specific schema.org types that unlock rich results and improve AI understanding: `MedicalOrganization`, `Physician`, `MedicalCondition`, `MedicalProcedure`, `LocalBusiness`. Not implementing these — or implementing generic `Organization` schema instead — leaves significant SEO and AIO value on the table. The original WordPress site used Yoast SEO which generated some schema automatically; the rebuild loses this without explicit implementation.

**Why it happens:** Developers implement basic `Article` or `WebPage` schema and miss the medical-specific types. Yoast's automatic schema generation is not replicated in a Next.js build.

**Consequences:** No rich results for doctor profiles. No local business knowledge panel improvement. AI systems like Google AI Overviews and ChatGPT have less structured information to work with when answering "Who are the gynecologists at Stella Mattina in Dallas?"

**Prevention:**
- Implement `MedicalOrganization` (not just `LocalBusiness`) for the clinic.
- Each doctor page: `Physician` schema with `medicalSpecialty`, `worksFor`, `address`.
- Each service page: `MedicalProcedure` or `MedicalTherapy` schema as appropriate.
- Locations page: `MedicalClinic` with `openingHours`, `telephone`, `address`, `geo` coordinates.
- Blog posts: `MedicalWebPage` or `Article` with `author` linked to doctor profiles.
- Use JSON-LD in a `<Script type="application/ld+json">` tag, not microdata, for easier maintenance.
- Validate with Google's Rich Results Test before launch.

**Detection:** Google Search Console > Enhancements will show if structured data is missing or invalid after indexing. Pre-launch: use schema.org validator.

**Phase:** Phase 2 (each content type as built). Do not treat this as a post-launch addition.

---

## Moderate Pitfalls

### Pitfall 1: AIO Optimization Treated as an Afterthought (Content Structure, Not Keywords)

**What goes wrong:** AIO (AI Overview optimization for ChatGPT, Perplexity, Google AI Overviews) requires content structured for direct extraction — clear questions answered directly, concise factual paragraphs, FAQ sections with `FAQPage` schema. Developers focus on traditional keyword density and miss that AI systems prefer confident, specific, directly-answering prose. Content copied from WordPress marketing-speak ("We are committed to excellence in women's healthcare...") does not answer user queries directly.

**Why it happens:** AIO optimization is newer and less understood than traditional SEO. The temptation is to reuse existing copy verbatim.

**Prevention:**
- For each service page: add a "Frequently Asked Questions" section with 4-6 questions phrased exactly as patients would ask (e.g., "Does Stella Mattina offer hormone pellet therapy in Dallas?"). Answer each in 2-3 direct sentences.
- Use `FAQPage` schema on these sections.
- The first paragraph of each service page should be a "definition + eligibility" statement, not a marketing hook. AI systems extract the first high-information paragraph.
- Use `speakable` schema on key factual content blocks.
- Avoid vague superlatives ("best," "leading") — AI systems prefer specific facts ("board-certified OB/GYN with 15 years experience").
- **Confidence note:** AIO best practices are evolving rapidly. The above represents MEDIUM confidence patterns — validate against current Google Search Central guidance.

**Detection:** Ask ChatGPT or Perplexity "What gynecology services does Stella Mattina offer?" after launch. If the answer is vague or wrong, content structure needs improvement.

**Phase:** Phase 2 (content authoring). Cannot be retrofitted easily without content rewrites.

---

### Pitfall 2: Ask Tia Design Applied Too Literally — Brand Identity Lost

**What goes wrong:** Ask Tia uses a specific color palette, typography, and layout that works for its brand. Applying it too literally to Stella Mattina's site creates a confusing brand identity conflict. Stella Mattina has existing brand colors, logo, and photography that patients recognize. The goal is the "vibe" (clean, minimal, warm) — not a copy.

**Why it happens:** Developers extract CSS variables and color values from the scraped Ask Tia site and apply them wholesale, overriding SM's brand colors.

**Prevention:**
- Define SM's brand tokens first (from existing site's color values) in `tailwind.config.ts` or CSS variables.
- Study Ask Tia for layout patterns and whitespace principles — not color values.
- The warm/minimal vibe comes from: generous white space, serif or humanist sans typography, photography-forward layouts, minimal navigation clutter.
- Review existing SM photography — it should dictate the warmth, not an imported color palette.

**Detection:** Compare new site screenshots with original SM branding side-by-side. If a patient familiar with SM does not recognize the brand, overcorrect.

**Phase:** Phase 1 (design system setup).

---

### Pitfall 3: Next.js App Router Misuse — Server vs. Client Component Confusion

**What goes wrong:** Next.js 13+ App Router defaults to Server Components, which cannot use hooks (`useState`, `useEffect`) or browser APIs. Developers adding interactivity (mobile menu toggle, accordion FAQ, map embed) forget to add `'use client'` directive and get runtime errors. Conversely, marking entire page layouts as `'use client'` defeats server-rendering benefits and hurts SEO.

**Why it happens:** App Router is relatively new. Many tutorials still show Pages Router patterns. The default is confusing — a component can look correct in development but behave differently in production.

**Prevention:**
- Default all page components and layout components to Server Components (no `'use client'`).
- Only add `'use client'` to leaf components that require interactivity: mobile nav toggle, contact form, accordion, map.
- Never add `'use client'` to root `layout.tsx` or any page-level component unless absolutely necessary.
- For third-party libraries that require browser context (e.g., a maps library): wrap in a client component and use `dynamic(() => import(...), { ssr: false })`.

**Detection:** React error "cannot use hooks in server component" is the primary signal. Also: if `<head>` metadata is not rendering correctly, a parent component has been incorrectly marked as client.

**Phase:** Phase 1 (architecture setup) and throughout content phases.

---

### Pitfall 4: Scraped Blog Post Data Not Deduplicated or Validated Before Import

**What goes wrong:** The CONCERNS.md analysis flagged that `blog_posts.csv` has 5,554 lines and `blog_posts.json` is 594MB. That volume suggests duplicate extraction or WordPress pagination artifacts. Importing all records without deduplication will create hundreds of duplicate blog pages, confusing Google (duplicate content penalty) and inflating the sitemap.

**Why it happens:** Automation extracts every HTML page without checking for canonical duplicates. WordPress pagination creates multiple URLs for the same content.

**Prevention:**
- Before import: deduplicate by `slug` field. If two records have the same slug, keep the one with more complete metadata.
- Normalize slugs: lowercase, hyphens only, no trailing slashes in the key.
- WordPress pagination pages (`/blog/page/2/`, `/blog/page/3/`) should NOT be imported as content pages — they are navigation artifacts.
- Validate that each blog post has: title, slug, author, date, and body content. Records missing body content should be excluded.
- Set `<meta name="robots" content="noindex">` on any stub or thin-content pages that must be created but should not be indexed.

**Detection:** Count unique slugs in extracted data vs. total record count. If duplicates > 5%, the dataset needs cleaning before import.

**Phase:** Phase 2 (content migration, blog import step).

---

### Pitfall 5: No robots.txt or Sitemap Configuration — Crawl Budget Wasted

**What goes wrong:** Next.js does not generate `robots.txt` or `sitemap.xml` by default. Without these, Google may index unwanted URLs (API routes, dev pages, admin pages) while missing important content pages. Medical sites with many service pages need explicit sitemap control.

**Prevention:**
- Generate `sitemap.xml` dynamically using Next.js's `app/sitemap.ts` (App Router) or `next-sitemap` package.
- Include all: service pages, doctor pages, location pages, blog posts.
- Exclude: any API routes (`/api/*`), preview routes, and internal navigation pages.
- Set `sitemap.xml` URL in `robots.txt`.
- Disallow crawling of any future `/api/` routes.
- Set canonical URLs on all pages using Next.js `metadata` API to prevent duplicate content from URL variations (with/without trailing slash, www vs non-www).

**Detection:** After launch, check Google Search Console Coverage report for unexpected indexed URLs and indexing gaps.

**Phase:** Phase 3 (pre-launch SEO hardening).

---

## Minor Pitfalls

### Pitfall 1: Google Fonts Causing Performance Regression

**What goes wrong:** The original WordPress site loaded Google Fonts via external CDN (`fonts.googleapis.com`). In Next.js, using `@next/font/google` (now `next/font/google`) eliminates the external DNS lookup and self-hosts fonts. Developers often copy the old `<link>` tag from WordPress into the Next.js layout and lose the performance benefit.

**Prevention:** Use `next/font/google` exclusively. Never use `<link href="fonts.googleapis.com">` in the layout. This is zero-cost performance that takes 5 minutes to implement correctly.

**Phase:** Phase 1 (layout/typography setup).

---

### Pitfall 2: Vimeo Embed Without Facade — Blocking Page Load

**What goes wrong:** The scraped site uses Vimeo embeds (detected in STACK.md). Standard `<iframe>` Vimeo embeds load Vimeo's JavaScript on page load, adding 300-500ms to initial load and hurting LCP. This is especially damaging if a video appears above the fold.

**Prevention:** Use a "video facade" pattern: show a static thumbnail image with a play button. Only load the Vimeo iframe when the user clicks play. The `lite-vimeo` web component or a custom implementation achieves this easily. Use `loading="lazy"` as a minimum if no facade is implemented.

**Phase:** Phase 2 (media-heavy pages like About or Home).

---

### Pitfall 3: Missing `alt` Text on Scraped Doctor/Staff Photos

**What goes wrong:** WordPress often stored images with filenames like `DSC_0047.jpg` and no programmatic alt text. When these are imported, they get empty or file-name alt text. Medical photos of doctors with bad alt text fail accessibility (WCAG 2.1 AA) and miss keyword opportunities.

**Prevention:** When importing practitioner data from `practitioners.json`, generate alt text template: `"Dr. [Name], [Specialty] at Stella Mattina"`. For other medical photography: describe what is shown ("medical professional consulting with patient in bright office"). Never leave alt text empty for meaningful images.

**Phase:** Phase 2 (doctor directory and about page implementation).

---

### Pitfall 4: Hardcoded Phone Numbers and Addresses — Maintenance Trap

**What goes wrong:** The extracted data shows Stella Mattina has multiple locations with potentially different phone numbers. If phone numbers and addresses are hardcoded across components, a location change requires hunting through multiple files. The CONCERNS.md also flagged duplicate phone number formatting in the extracted data.

**Prevention:** Centralize all contact information in a single `lib/clinic-data.ts` or `content/clinic.json` file. Components import from this single source. When a phone number changes, it changes in one place.

**Detection:** Search codebase for phone number pattern `214-942-3100` or `214.942.3100`. Multiple hits = not centralized.

**Phase:** Phase 1 (data model setup).

---

### Pitfall 5: Deploying to Production Without HTTPS Redirect Configuration

**What goes wrong:** WordPress redirected `http://` to `https://` and `www.` to non-www (or vice versa). Next.js on Vercel handles HTTPS automatically, but `www` vs non-www canonicalization is a deployment configuration step that is easy to miss. If Google has indexed `www.stellamattina.com` and the new site is served at `stellamattina.com` without redirect, both versions exist independently.

**Prevention:** Configure the custom domain on Vercel to redirect `www` to apex (or vice versa) at the DNS/hosting level. Verify the redirect with `curl -I http://www.stellamattina.com` before announcing launch.

**Phase:** Phase 3 (deployment configuration).

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Phase 1: Foundation / Setup | Choosing wrong analytics tool (GA4 on medical site) | Select HIPAA-safe analytics (Plausible) before any tracking is added |
| Phase 1: Design System | Over-copying Ask Tia colors/tokens, losing SM brand | Define SM brand tokens first; extract design principles from Ask Tia, not values |
| Phase 1: Data model | Hardcoded contact info across components | Create `lib/clinic-data.ts` as single source of truth from day one |
| Phase 2: Content migration | Importing raw scraped HTML with WordPress artifacts | Use extracted JSON as source; sanitize all HTML content |
| Phase 2: Blog import | 5,554-line CSV with duplicates | Deduplicate by slug before any import; validate required fields |
| Phase 2: Doctor directory | Empty or filename-based alt text on photos | Generate structured alt text from practitioners.json data |
| Phase 2: Contact forms | Form fields that elicit health information | Limit to: name, phone, email, message. Add PHI disclaimer. |
| Phase 2: Service pages | Missing medical schema.org types | Implement MedicalOrganization + Physician + MedicalProcedure schema per page type |
| Phase 2: AIO content | Marketing copy that doesn't answer direct questions | Add FAQ sections with FAQPage schema to each service page |
| Phase 3: SEO hardening | No sitemap / robots.txt | Generate dynamic sitemap.xml; configure robots.txt before soft launch |
| Phase 3: Deployment | www vs apex canonicalization gap | Configure DNS redirect before pointing domain |
| All phases | Images served unoptimized from /public | Use next/image with explicit dimensions and sizes on every image |

---

## Sources

- HHS Office for Civil Rights HIPAA guidance (December 2022) on tracking technologies — training data, HIGH confidence on core HIPAA principles
- Google Core Web Vitals documentation — training data + established Next.js docs patterns, HIGH confidence
- Next.js App Router documentation (v14+) — training data, HIGH confidence on Server/Client component split
- Google Search Central: Structured Data documentation for medical types — training data, HIGH confidence on schema.org types
- AIO optimization patterns — training data, MEDIUM confidence (field evolving rapidly; validate against current Google Search Central guidance)
- Stella Mattina scraped site analysis (CONCERNS.md, STACK.md, ARCHITECTURE.md) — direct evidence from project files, HIGH confidence on project-specific pitfalls
- WordPress migration SEO best practices — training data, HIGH confidence (well-established field)

---

*Research note: WebSearch and WebFetch were unavailable in this session. Findings draw on training data (current to August 2025) for domain-specific pitfalls. HIPAA guidance, Next.js architecture, and WordPress migration SEO patterns are well-established and unlikely to have changed materially. AIO optimization is flagged as MEDIUM confidence due to the rapidly evolving nature of AI search ranking signals.*

# External Integrations

**Analysis Date:** 2026-02-26

## APIs & External Services

**Content Delivery & Performance:**
- Google Fonts API - Font delivery (`fonts.googleapis.com`)
  - Client: CSS stylesheet linking
  - No auth required

- Cloudflare CDN - Static asset delivery (`cdnjs.cloudflare.com`)
  - Client: Direct script/CSS includes
  - No auth required

- jsDelivr CDN - JavaScript library hosting (`cdn.jsdelivr.net`)
  - Client: Direct script includes
  - No auth required

- Bootstrap CDN - UI framework components (`stackpath.bootstrapcdn.com`)
  - Client: CSS/JS links
  - No auth required

**Video & Media:**
- Vimeo - Video embedding (`player.vimeo.com`)
  - Usage: Video player integration in pages
  - No explicit auth in archived files

**Search & SEO:**
- Google Tag Manager - Analytics/tracking (`www.googletagmanager.com`)
  - Purpose: Site analytics and conversion tracking
  - No direct API calls visible

## Data Storage

**Databases:**
- Not applicable - this is a static site archive

**File Storage:**
- Local filesystem in scraped archive (`/scraped-sites/stellamattina/stellamattina.com/`)
- Original storage: WordPress Media Library (not included)

**Caching:**
- WP Rocket - Application-level caching (configured in original WordPress)
  - Evidence: `wp-content/plugins/wp-rocket/` directory

## Authentication & Identity

**Auth Provider:**
- Not applicable - no authentication system in static archive

**Original CMS:**
- WordPress administrative authentication (not preserved in archive)
- Gravity Forms with reCAPTCHA for form submissions
  - reCAPTCHA integration: `gravityformsrecaptcha/js/frontend.min.js`

## Monitoring & Observability

**Error Tracking:**
- Not detected in static archive

**Logs:**
- Not applicable - no server-side logging visible

**Analytics:**
- Google Tag Manager integration detected
  - Manager ID: Embedded in page headers
  - Purpose: Conversion and user behavior tracking

## CI/CD & Deployment

**Hosting:**
- Original platform: WordPress hosting at `stellamattina.com`
- Current state: Static HTML archive (no active deployment)

**CI Pipeline:**
- Not applicable - no CI configuration detected

## Environment Configuration

**Required env vars:**
- Not applicable - static files only

**Secrets location:**
- Not applicable - no secrets management system

## Webhooks & Callbacks

**Incoming:**
- Gravity Forms form submissions - Email notifications configured
  - Endpoint: Original WordPress site (not functional in archive)

**Outgoing:**
- Not detected

## Third-Party Service Dependencies (Original Site)

**Forms & Lead Capture:**
- Gravity Forms - Contact form builder
  - reCAPTCHA integration for spam protection
  - Form processing backend (not functional in archive)

**Location/Store Locator:**
- Agile Store Locator plugin
  - Purpose: Display multiple office locations
  - Data: Embedded location information

**Review Aggregation:**
- Widget Google Reviews plugin
  - Purpose: Display aggregated Google reviews
  - Integration: Likely API-based (not visible in static archive)

**Content & Styling:**
- JS Composer (Visual Composer) - Page builder framework
- Bootstrap UI framework

---

*Integration audit: 2026-02-26*

**Important Note:** This archive represents a static snapshot of a WordPress website. The original site at `stellamattina.com` likely has active integrations (payment processing, CRM, email services) that are not visible in this static HTML/CSS/JavaScript snapshot. The configurations above reflect only what is detectable in the archived files.

# Codebase Structure

**Analysis Date:** 2026-02-26

## Directory Layout

```
Woop/
├── .git/                          # Git repository metadata
├── .planning/                     # Planning and analysis documents
│   └── codebase/                  # Architecture analysis output
├── scraped-sites/                 # All scraped website data
│   ├── stellamattina/             # Healthcare provider 1 (women's health)
│   ├── asktia/                    # Healthcare provider 2 (integrated care)
│   └── output/                    # Final processed output
└── (no source code files at root)
```

## Directory Purposes

**`.git/`:**
- Purpose: Version control metadata and history
- Contains: Git objects, refs, hooks
- Key files: `HEAD`, `config`, `objects/`, `refs/`

**`.planning/`:**
- Purpose: GSD framework planning and analysis documents
- Contains: Codebase documentation generated during architecture mapping
- Key files: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md, INTEGRATIONS.md, STACK.md

**`.planning/codebase/`:**
- Purpose: Central repository for codebase analysis documentation
- Contains: Markdown documents describing architecture, conventions, testing patterns, technical concerns
- Key files: Analysis documents produced by `/gsd:map-codebase` command

**`scraped-sites/`:**
- Purpose: Root directory for all web scraping output
- Contains: Subdirectories per domain plus aggregated output
- Structure: Parallel directories for raw HTML and extracted JSON

**`scraped-sites/stellamattina/`:**
- Purpose: Stella Mattina healthcare provider data (women's health, ObGyn)
- Contains: `stellamattina.com/` (raw HTML) and `extracted/` (JSON data)
- Key data types: Locations, practitioners, contact info, blog posts, services

**`scraped-sites/stellamattina/stellamattina.com/`:**
- Purpose: Complete HTML snapshot of stella mattina website
- Contains: Full URL-structure-preserving directory tree of HTML pages and assets
- Examples: `our-locations/`, `category/pregnancy/`, `wp-content/`, `wp-includes/`

**`scraped-sites/stellamattina/extracted/`:**
- Purpose: Extracted structured data from Stella Mattina content
- Contains: JSON files with categorized entities
- Key files: `locations.json`, `practitioners.json`, `contact_info.json`, `services.json`, `blog_posts.json`

**`scraped-sites/asktia/`:**
- Purpose: Ask TIA (Tia) healthcare provider data (integrative care, women's health)
- Contains: `asktia.com/` (raw HTML snapshots) and page-data JSON structure
- Key data types: Articles, care team, locations, services, appointments

**`scraped-sites/asktia/asktia.com/`:**
- Purpose: Complete website snapshot with URL structure preservation
- Contains: All pages, assets, and page-data JSON metadata
- Examples: `page-data/article/*/`, `page-data/locations/*/`, `page-data/join/*/`

**`scraped-sites/output/`:**
- Purpose: Final aggregated and processed output directory
- Contains: Reorganized content, static assets, and Gatsby-style page-data files
- Examples: `article/`, `locations/`, `join/`, `career/`, `services/`, `page-data/`

## Key File Locations

**Entry Points:**
- Not applicable (no application code; data-driven project)

**Configuration:**
- No build/lint/package configuration files detected at root

**Core Logic:**
- Not applicable (external scraping and extraction tools)

**Data Files:**
- `scraped-sites/stellamattina/extracted/blog_posts.json`: Array of blog post objects with full text, metadata, author, publication date
- `scraped-sites/stellamattina/extracted/locations.json`: Array of location objects with name, phone, address, slugs
- `scraped-sites/stellamattina/extracted/practitioners.json`: Healthcare providers and their credentials
- `scraped-sites/stellamattina/extracted/services.json`: Medical services offered at locations
- `scraped-sites/stellamattina/extracted/contact_info.json`: Contact details for locations

**Raw HTML Assets:**
- `scraped-sites/stellamattina/stellamattina.com/index.html`: Homepage
- `scraped-sites/stellamattina/stellamattina.com/category/[name]/`: Category pages
- `scraped-sites/stellamattina/stellamattina.com/wp-content/`, `wp-includes/`: WordPress asset directories
- `scraped-sites/asktia/asktia.com/index.html`: Gatsby-built homepage
- `scraped-sites/asktia/asktia.com/page-data/`: Gatsby page data JSON files

**Testing:**
- Not applicable (no test files detected)

## Naming Conventions

**Files:**
- **HTML files:** Lowercase with hyphens (e.g., `index.html`, `our-locations.html`)
- **JSON files:** Lowercase with underscores for entity types (e.g., `blog_posts.json`, `contact_info.json`)
- **Directories:** Lowercase with hyphens matching URL slugs (e.g., `our-locations/`, `category/pregnancy/`)
- **WordPress assets:** Follow WP convention (e.g., `wp-content/`, `wp-includes/`)

**Directories:**
- **Domain directories:** Full lowercase domain name (e.g., `stellamattina`, `asktia`)
- **Extraction directories:** Named `extracted/` (singular)
- **Output structure:** URL-slug based (e.g., `article/[article-slug]/`, `locations/[location-slug]/`)

**URL-Structure Preservation:**
- Directory paths mirror original website URLs for easy navigation
- Example: `stellamattina.com/our-locations/obgyn-arlington-tx/` matches URL structure
- Example: `asktia.com/page-data/article/cancel-cervical-cancer/page-data.json` mirrors `asktia.com/article/cancel-cervical-cancer/`

## Where to Add New Code

**New Scraped Site:**
1. Create new directory at `scraped-sites/[domain-name]/`
2. Add raw HTML snapshot: `scraped-sites/[domain-name]/[domain].com/` (preserving URL structure)
3. Add extracted data: `scraped-sites/[domain-name]/extracted/` with JSON files (`blog_posts.json`, `locations.json`, `practitioners.json`, `services.json`, `contact_info.json`)

**New Extracted Data Type:**
- Add new JSON file to `scraped-sites/[domain]/extracted/[entity-type].json`
- Follow array-of-objects structure matching existing files
- Include metadata fields consistent with similar entity types (e.g., slug, URL, name, contact info)

**New Processed Output:**
- Add to `scraped-sites/output/[page-category]/` directory
- For Gatsby-style output: use `page-data.json` files mirroring URL structure
- Ensure slug-based organization for consistency with input domains

## Special Directories

**`scraped-sites/stellamattina/stellamattina.com/`:**
- Purpose: WordPress website snapshot
- Generated: Yes (via web scraper)
- Committed: Yes (included in repo as archive)
- Structure: Preserves WordPress URL structure with `wp-content/`, `wp-includes/`

**`scraped-sites/asktia/asktia.com/`:**
- Purpose: Gatsby-built static site snapshot
- Generated: Yes (via web scraper)
- Committed: Yes (included in repo as archive)
- Structure: Includes webpack bundles and Gatsby page-data JSON files

**`scraped-sites/output/`:**
- Purpose: Aggregated and transformed final output
- Generated: Yes (likely from extraction layer)
- Committed: Yes (final deliverable)
- Structure: Reorganized by content type with static assets and page-data directories

**`scraped-sites/[domain]/extracted/`:**
- Purpose: Canonical structured data format
- Generated: Yes (from HTML parsing)
- Committed: Yes (essential data product)
- Content: Five JSON files per domain (blog_posts, locations, practitioners, services, contact_info)

---

*Structure analysis: 2026-02-26*

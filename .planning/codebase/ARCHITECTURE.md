# Architecture

**Analysis Date:** 2026-02-26

## Pattern Overview

**Overall:** Web Scraping & Data Extraction

**Key Characteristics:**
- Multi-site healthcare web scraper that captures full HTML and extracts structured data
- Two-phase pipeline: complete HTML capture followed by selective data extraction
- Organized by domain with parallel processing for independent sites
- Output includes both raw HTML snapshots and extracted JSON datasets

## Layers

**Scraping Layer:**
- Purpose: Capture complete website HTML structure and assets
- Location: `scraped-sites/[domain]/[domain].com/`
- Contains: Full HTML pages, JavaScript bundles, CSS, images, and media files
- Depends on: Web crawler/scraper tool (external)
- Used by: Data extraction layer

**Extraction Layer:**
- Purpose: Parse HTML and extract structured data into machine-readable formats
- Location: `scraped-sites/[domain]/extracted/`
- Contains: JSON files with categorized data (locations, practitioners, services, blog posts, contact info)
- Depends on: Raw HTML from scraping layer
- Used by: Output generation and downstream data pipelines

**Output Generation Layer:**
- Purpose: Produce final processed content from extracted data
- Location: `scraped-sites/output/`
- Contains: Reorganized HTML, static assets, page-data JSON files organized by URL paths
- Depends on: Extracted data and possibly Gatsby/static site generation
- Used by: Distribution and consumption systems

## Data Flow

**Primary Workflow:**

1. **Website Identification** → List target healthcare domains (stellamattina.com, asktia.com)
2. **Full Site Scraping** → Download complete HTML structure and all assets
3. **HTML Storage** → Store raw pages in domain-specific directories preserving URL structure
4. **Data Extraction** → Parse HTML and extract structured entities (locations, staff, services, content)
5. **JSON Serialization** → Output extracted data as normalized JSON files
6. **Output Generation** → Generate final deliverable files (optionally Gatsby-formatted)

**State Management:**
- State is immutable and file-based
- Each scrape creates a new snapshot (no in-memory state preservation between runs)
- Extracted data is canonical format; raw HTML is reference/archive only

## Key Abstractions

**Domain-Based Organization:**
- Purpose: Isolate different healthcare provider datasets
- Examples: `scraped-sites/stellamattina/`, `scraped-sites/asktia/`
- Pattern: Each domain gets its own root directory with subdirectories for raw content and extracted data

**Extracted Entity Types:**
- Purpose: Structure unstructured web content into defined data models
- Examples: `locations.json`, `practitioners.json`, `services.json`, `blog_posts.json`, `contact_info.json`
- Pattern: One JSON file per entity type, arrays of objects with consistent schema per type

**Page Data Structure:**
- Purpose: Store intermediate Gatsby/static site generation metadata
- Examples: `asktia.com/page-data/article/*/page-data.json`
- Pattern: Mirrors source URL structure with JSON metadata files at each path level

## Entry Points

**Scraping Initiation:**
- Location: Unknown (external tool or orchestration layer)
- Triggers: Manual execution or scheduled crawl job
- Responsibilities: Begin HTML capture across target domains

**Data Extraction:**
- Location: Unknown (processing tool)
- Triggers: After scraping completes for a domain
- Responsibilities: Parse domain's HTML, extract entities, write JSON files to `extracted/` directory

**Output Assembly:**
- Location: Unknown (possibly Gatsby or similar)
- Triggers: After extraction completes
- Responsibilities: Aggregate extracted data and raw assets into final `output/` directory

## Error Handling

**Strategy:** Graceful degradation with partial data retention

**Patterns:**
- Partial extraction: If some pages fail to parse, others proceed (HTML snapshot preserved regardless)
- No deletion: Raw HTML retained even if extraction fails (safety net for re-processing)
- Asset preservation: JS/CSS/images captured alongside HTML for offline access

## Cross-Cutting Concerns

**Data Organization:** All extracted data follows domain/entity directory structure for discoverability

**Content Preservation:** Raw HTML kept separate from processed data, enabling re-extraction with different logic

**Schema Consistency:** Each JSON file type maintains consistent structure for automated consumption (locations always have phone/slug/providers fields, etc.)

---

*Architecture analysis: 2026-02-26*

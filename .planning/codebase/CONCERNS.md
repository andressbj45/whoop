# Codebase Concerns

**Analysis Date:** 2026-02-26

## Project Structure Issues

**No source code in repository:**
- Issue: Repository contains only scraped website data (416MB of HTML, JavaScript, CSS, images, and JSON/CSV extracts) with no scraper scripts or application code visible
- Files affected: Entire `scraped-sites/` directory structure lacks corresponding scraper source
- Impact: Cannot verify scraper implementation, audit data collection methods, or track changes to scraper logic
- Fix approach: Create and commit scraper scripts (Python/Node.js), document scraping methodology, add source control for automation

**Missing project documentation:**
- Issue: No README, configuration files, package.json, requirements.txt, or setup instructions present
- Files affected: Project root
- Impact: Unclear project purpose, dependencies, and execution process; new contributors cannot set up the project
- Fix approach: Create README.md with project overview, setup instructions, and usage guide; add configuration files appropriate to the technology stack

**No scraper configuration or parameters:**
- Issue: Cannot determine what triggers scraping, what sites are being targeted, or what extraction rules are applied
- Files affected: Configuration likely missing or undocumented
- Impact: Difficult to reproduce scraping runs, modify targets, or maintain scraper as websites change
- Fix approach: Create configuration file (YAML/JSON) with site URLs, selector patterns, and extraction rules; document in code

## Data Quality & Validation Issues

**Data consistency concerns in extracted files:**
- Issue: Duplicate phone numbers in `contact_info.json` ("214-942-3100" and "214.942.3100" with different formatting)
- Files affected: `scraped-sites/stellamattina/extracted/contact_info.json`, potentially other data files
- Impact: Data deduplication and normalization logic may be missing; subsequent analysis or API integrations could fail on format mismatches
- Fix approach: Implement data validation and normalization during extraction; add unit tests for data format consistency

**CSV/JSON structure validation gaps:**
- Issue: Large data files (`blog_posts.csv` 569KB, `blog_posts.json` 594MB) with no apparent schema validation
- Files affected: All files in `scraped-sites/*/extracted/` directory
- Impact: Unknown data structure, missing fields, or inconsistent nesting could break downstream processing
- Fix approach: Define and validate JSON schema; implement CSV column validation; add data profiling in extraction pipeline

**Incomplete contact information:**
- Issue: Contact data appears to have malformed entries ("CONTACTinfo@stellamattina.com" missing space/separator)
- Files affected: `scraped-sites/stellamattina/extracted/contact_info.json`
- Impact: Email addresses may not be usable for outreach or system integration
- Fix approach: Implement email validation regex, add HTML parsing tests, review scraper text extraction logic

## Data Storage & Organization Issues

**Excessive binary file storage:**
- Issue: Repository contains 416MB of minified JavaScript, images (JPG, PNG), fonts (TTF, WOFF2, SVG), and binary assets alongside text data
- Files affected: `scraped-sites/stellamattina/stellamattina.com/wp-content/`, `scraped-sites/asktia/asktia.com/`, output directory
- Impact: Repository is bloated; cloning/pulling is slow; version control overhead is excessive for non-essential assets
- Fix approach: Use .gitignore to exclude binary media files; store images/fonts separately (cloud storage or CDN); commit only extracted text data and metadata

**Extracted data mixed with raw HTML:**
- Issue: Cleaned CSV/JSON extracts in `extracted/` subdirectories coexist with raw HTML files; unclear which is source of truth
- Files affected: `scraped-sites/stellamattina/extracted/` vs raw HTML files throughout directory tree
- Impact: Maintenance confusion; unclear if raw data is needed after extraction; wastes storage
- Fix approach: Define extraction pipeline outputs; delete raw HTML after successful extraction and validation; document data pipeline stages

**No data versioning or dating:**
- Issue: Cannot determine when each site was scraped or if data is current
- Files affected: All scraped content lacks timestamps in filenames or metadata
- Impact: Unclear data freshness; difficult to track changes over time; cannot compare versions
- Fix approach: Add ISO 8601 timestamps to extracted data filenames; implement version tracking with dates; add "last_scraped" fields to JSON exports

## Legal & Compliance Issues

**Terms of Service violations potential:**
- Issue: Scraping websites (stellamattina.com, asktia.com) may violate their ToS; WordPress-powered sites typically restrict automated scraping
- Files affected: All files in `scraped-sites/`
- Impact: Legal liability; sites may pursue DMCA takedowns or civil action; stored copyrighted content may not be legally usable
- Fix approach: Review each target site's robots.txt and ToS; obtain explicit permission or use RSS feeds; add Terms compliance documentation

**Copyright and attribution issues:**
- Issue: Extracted blog posts, images, and content stored without attribution or license information
- Files affected: `scraped-sites/stellamattina/extracted/blog_posts.json`, images in uploads/, WordPress themes and plugins
- Impact: Cannot legally redistribute scraped content; WordPress plugin code may have GPL license violations
- Fix approach: Document original sources and licenses; add attribution fields to extracted data; verify GPL compliance for WordPress plugins

**No data retention or deletion policy:**
- Issue: Personal information (practitioner names, locations, contact info) is stored indefinitely with no clear purpose or retention limit
- Files affected: `practitioners.json`, `locations.json`, `contact_info.json`, HTML pages with provider bios
- Impact: GDPR/CCPA compliance risk if European or California residents' data is included; no clear lawful basis for processing
- Fix approach: Document data retention periods; implement deletion mechanisms; clarify lawful basis (legitimate interest with opt-out, etc.)

## Security Concerns

**No secrets management:**
- Issue: If API keys, tokens, or credentials were ever added to scraper configuration, they would be committed to git history
- Files affected: Project configuration (when added)
- Impact: Credentials could be leaked if repository becomes public; cannot rotate secrets safely
- Fix approach: Create `.env` and `.gitignore` to prevent secrets; use environment variable loading; implement secret scanning in CI

**Exposed sensitive information in extracted data:**
- Issue: Practitioner information and contact details are publicly scraped and stored
- Files affected: `practitioners.json`, `contact_info.json`, HTML pages in `doctors/` and similar directories
- Impact: Enables spam, impersonation, or targeting of medical professionals; violates privacy expectations
- Fix approach: Implement access controls on data directory; clarify intended use; consider anonymization; add privacy notice to documentation

## Performance & Scalability Issues

**Repository size unsustainable:**
- Issue: 416MB repository with many small files (HTML, CSS, JS) creates slow git operations
- Files affected: All of `scraped-sites/`
- Impact: Cloning takes long time; git status/commit operations slow; CI/CD pipelines timeout; difficult to collaborate
- Fix approach: Remove binary and HTML assets; keep only structured data extracts; use sparse checkout for large repos; implement data storage separation

**HTML file redundancy:**
- Issue: Minified JavaScript bundles (e.g., `app-2b73efca19db1fd7a449.js` 1.1MB) and duplicate assets stored without compression
- Files affected: `output/` and `stellamattina.com/wp-content/` directories
- Impact: Wasted storage; slow operations; not providing value if only metadata is needed
- Fix approach: Delete build artifacts and CDN assets; keep only original HTML source; implement asset-light extraction strategy

## Extraction & Data Pipeline Issues

**No error handling or failure logging:**
- Issue: Cannot determine if scraping failed for some pages or if extraction had errors without re-running
- Files affected: All extracted data files
- Impact: Data may be incomplete; missing pages go undetected; quality metrics unknown
- Fix approach: Add logging to scraper; track extraction success/failure rates; implement data completeness validation; generate scraping reports

**Inconsistent data extraction:**
- Issue: Blog post CSV has 5554 lines but JSON may have different structure; unclear if counts match
- Files affected: `blog_posts.csv` vs `blog_posts.json`
- Impact: Data loss or duplication between formats; downstream systems may have mismatches
- Fix approach: Implement format validation; add record count assertions; verify CSV and JSON contain same data; document transformations

**Missing field documentation:**
- Issue: Extracted CSV/JSON files have no documentation of what each field represents or where it came from
- Files affected: All files in `extracted/` directories (practitioners.csv, services.csv, etc.)
- Impact: Cannot understand or reuse data; difficult to validate quality; schema changes undetected
- Fix approach: Create data dictionary documenting each field; add schema files (JSON Schema); document field source (XPath/CSS selector)

## Missing Operational Infrastructure

**No extraction pipeline:**
- Issue: No visible scheduler, pipeline orchestration, or way to refresh data
- Files affected: Project-wide
- Impact: Cannot update scraped data; cannot add new sites without manual intervention; no repeatability
- Fix approach: Implement scheduler (cron, Airflow, GitHub Actions) to run scraper on interval; create pipeline with stages (scrape, extract, validate, publish)

**No monitoring or alerting:**
- Issue: If scraper breaks due to website changes, there is no way to detect or alert
- Files affected: Project-wide
- Impact: Stale data used without knowledge; manual debugging required; breaks go unnoticed for long periods
- Fix approach: Add health checks (verify page counts match expected); implement error notifications; create scraper test suite with smoke tests per site

**No data versioning system:**
- Issue: Each new scrape overwrites previous data; cannot track historical changes or rollback
- Files affected: All extracted data
- Impact: Cannot see what changed, when, or why; cannot recover from bad scrapes
- Fix approach: Implement versioned storage (timestamped backups, git-like history); add diff tracking between scrapes; tag releases

## Documentation & Maintainability Issues

**Undocumented extraction rules:**
- Issue: Cannot see selector patterns, parsing logic, or field mappings from scraped sites
- Files affected: Unknown - scraper source code not in repository
- Impact: Cannot fix extraction when sites change; new maintainers have no reference; difficult to extend to new fields
- Fix approach: Document all CSS/XPath selectors; create visual mapping of page structure to extracted fields; add selector tests

**No changelog or scraping log:**
- Issue: No record of what was scraped when, or what changed between runs
- Files affected: All of `scraped-sites/`
- Impact: Cannot debug data quality issues; cannot see impact of website redesigns; no audit trail
- Fix approach: Create changelog documenting scraping runs (date, records, changes, issues); add extraction metadata to JSON (scraped_at, scraper_version); version control extracts in git with commit messages

## Fragile Areas

**Site-specific selectors are brittle:**
- Issue: If stellamattina.com or asktia.com redesign their website, all selectors will break
- Files affected: Scraper logic (not visible in repository)
- Impact: Scraper will fail silently or produce corrupted data; requires manual intervention to repair
- Safe modification: Implement selector versioning; add fallback selectors; monitor selector effectiveness; add regression tests per site
- Test coverage: Likely zero - no test fixtures or selector validation tests visible

**WordPress plugin dependencies:**
- Issue: Scraper may depend on specific WordPress plugins or theme versions; if sites update, scraping may break
- Files affected: `wp-content/plugins/`, `wp-content/themes/` directories contain old version snapshots
- Impact: Scraper becomes incompatible with site updates; difficult to maintain
- Safe modification: Document plugin/theme version dependencies; implement version detection in scraper; add graceful fallback logic

## Missing Critical Features

**No data reconciliation:**
- Issue: No mechanism to verify extracted data against original sources or check for completeness
- Blocks: Cannot validate data quality; cannot catch extraction failures
- Fix approach: Implement data reconciliation module that samples original pages and validates extraction; create report of completeness metrics

**No duplicate/deduplication tracking:**
- Issue: Cannot detect if same content appears in multiple places or if extraction duplicates records
- Blocks: Data quality unknown; analytics and reporting unreliable
- Fix approach: Add deduplication logic (hash-based); track record lineage; implement idempotency checks

**No access control or audit trail:**
- Issue: Stored data has no access restrictions or usage audit; unclear who should have access
- Blocks: Data governance unimplemented; compliance requirements unmet
- Fix approach: Implement role-based access control; add audit logging for data access; document intended use cases

## Test Coverage Gaps

**No automated tests for scraper:**
- What's not tested: Extraction logic, selector correctness, data format validation, error handling, data freshness
- Files affected: Scraper source code (not in repository)
- Risk: Changes to scraper go unvalidated; regressions undetected; data corruption possible
- Priority: High

**No integration tests for data pipeline:**
- What's not tested: End-to-end scrape → extract → validate → store workflows; inter-format consistency (CSV vs JSON)
- Files affected: All extraction pipeline (not visible)
- Risk: Data loss or corruption between pipeline stages goes undetected
- Priority: High

**No validation tests for extracted data:**
- What's not tested: Schema compliance, required fields present, data type correctness, format consistency
- Files affected: All files in `extracted/` directories
- Risk: Malformed data causes downstream system failures; quality issues undetected
- Priority: Medium

---

*Concerns audit: 2026-02-26*

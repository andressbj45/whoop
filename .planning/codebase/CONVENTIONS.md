# Coding Conventions

**Analysis Date:** 2026-02-26

## Overview

This project is a data collection repository containing scraped website content and extracted data. There is no application source code (no TypeScript, JavaScript, Python, or other programming language files) to establish coding conventions.

## Project Structure

The codebase consists of:
- `scraped-sites/` - Raw HTML and data files from web scraping operations
- `.planning/codebase/` - Analysis and planning documents

## No Active Code

This repository does not contain:
- Production source files (`.ts`, `.tsx`, `.js`, `.jsx`, `.py`, etc.)
- Configuration files (`.eslintrc`, `.prettierrc`, `pyproject.toml`, etc.)
- Test files or testing framework configurations
- Package manifests (`package.json`, `requirements.txt`, etc.)

## When Source Code is Added

Future source code in this repository should establish conventions based on the following principles:

### File Organization
- Source code should be placed in a dedicated `src/` directory (not in `scraped-sites/`)
- Separate application code from data artifacts
- Keep scraped content in `scraped-sites/` for reference only

### Naming Conventions
- Use descriptive, self-documenting names for files and functions
- Follow language-specific standards (camelCase for JavaScript, snake_case for Python)
- Use clear module names that reflect their purpose

### Code Style
- Establish and enforce style rules via tooling (ESLint, Prettier, Black, etc.)
- Document style choices in a configuration file at project root
- Maintain consistency across all source files

### Documentation
- Include comments for complex logic
- Use type annotations where applicable
- Maintain README files explaining project structure and setup

---

*Convention analysis: 2026-02-26*
*Note: This project currently contains only scraped data. These recommendations apply when source code is introduced.*

// Shared TypeScript interfaces for all SM content types.
// Derived from direct inspection of scraped-sites/stellamattina/extracted/*.json

export interface Practitioner {
  slug: string
  url: string
  name: string
  specialty:
    | 'OBGYN'
    | 'Family Medicine'
    | 'Maternal-Fetal Medicine (MFM)'
    | 'Maternal-Fetal Medicine (MFM), OBGYN'
  category: "Women's Health" | 'Family Medicine'
  locations: string[]  // Short location names e.g. "Mesquite", "Bishop Arts"
  bio: string
  photo_url: string    // Absolute URL to WordPress-hosted photo
  booking_url: string  // External patient portal URL
}

export interface Location {
  slug: string
  url: string
  name: string         // Full verbose name e.g. "Women's Health | Mesquite, TX"
  phone: string
  providers: string[]  // Always empty in source JSON — use getLocationWithProviders() instead
  description?: string
}

export interface Service {
  slug: string
  url: string          // WordPress URL path — use this for Next.js route creation
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
  published_date: string  // ISO date string
  meta_description: string
  categories: string[]
  tags: string[]
  full_text: string       // Plain text (not raw HTML); ends with tags footer block
}

export interface ContactInfo {
  phones: string[]        // Raw from JSON — may contain duplicates; use getContactInfo() for deduped
  emails: string[]
  footer_contact_text: string
}

// Enriched location type returned by getLocationWithProviders()
export interface LocationWithProviders extends Location {
  practitioners: Practitioner[]
}

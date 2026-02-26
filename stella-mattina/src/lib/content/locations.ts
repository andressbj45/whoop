import locationsData from '../../data/locations.json'
import { getPractitioners } from './practitioners'
import type { Location, LocationWithProviders } from './types'

const locations = locationsData as Location[]

// Canonical short-name lookup for location matching.
// locations.json uses full verbose names; practitioners.json uses short informal names.
// Built from direct inspection of both JSON files.
// Actual location slugs (verified against locations.json):
//   gynecologist-dallas-bishop-arts  -> "Women's Health | Bishop Arts District in Dallas"
//   gynecologist-dallas-tx-samuell   -> "Women's Health | Dallas - Samuell"
//   obgyn-arlington-tx               -> "Women's Health | Arlington, TX"
//   obgyn-in-mesquite                -> "Women's Health | Mesquite, TX"
//   primary-care-doctor-for-men      -> "Family Medicine | Dallas - Buckner"
//   primary-care-doctor-north-dallas -> "Family Medicine | Dallas - North"
//   primary-care-physician-carrollton-tx -> "Family Medicine | Carrollton - Texas"
// Practitioner location values: "Bishop Arts", "Samuell (White Rock Lake)", "Arlington/Midcities",
//   "Mesquite", "Buckner", "North Dallas", "Carrollton", "Rockwall"
const LOCATION_SHORT_NAMES: Record<string, string[]> = {
  'gynecologist-dallas-bishop-arts': ['bishop arts', 'bishop'],
  'gynecologist-dallas-tx-samuell': ['samuell'],
  'obgyn-arlington-tx': ['arlington'],
  'obgyn-in-mesquite': ['mesquite'],
  'primary-care-doctor-for-men': ['buckner'],
  'primary-care-doctor-north-dallas': ['north dallas'],
  'primary-care-physician-carrollton-tx': ['carrollton'],
}

export function getLocations(): Location[] {
  return locations
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug)
}

export function getLocationSlugs(): string[] {
  return locations.map((l) => l.slug)
}

export function getLocationWithProviders(slug: string): LocationWithProviders | undefined {
  const location = locations.find((l) => l.slug === slug)
  if (!location) return undefined

  const shortNames = LOCATION_SHORT_NAMES[slug] ?? []
  const practitioners = getPractitioners().filter((p) =>
    p.locations.some((locName) => {
      const lower = locName.toLowerCase()
      // Try canonical map first
      if (shortNames.length > 0) {
        return shortNames.some((s) => lower.includes(s))
      }
      // Fallback: substring match against location's full name
      return location.name.toLowerCase().includes(lower)
    })
  )

  return { ...location, practitioners }
}

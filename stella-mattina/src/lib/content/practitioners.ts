import practitionersData from '../../data/practitioners.json'
import type { Practitioner } from './types'

const practitioners = practitionersData as Practitioner[]

export function getPractitioners(): Practitioner[] {
  return practitioners
}

export function getPractitionerBySlug(slug: string): Practitioner | undefined {
  return practitioners.find((p) => p.slug === slug)
}

export function getPractitionerSlugs(): string[] {
  return practitioners.map((p) => p.slug)
}

// Cross-reference: get all practitioners who list a given location short name
// e.g. getPractitionersByLocation("Mesquite") or getPractitionersByLocation("Bishop Arts")
export function getPractitionersByLocation(locationShortName: string): Practitioner[] {
  const normalized = locationShortName.toLowerCase()
  return practitioners.filter((p) =>
    p.locations.some((loc) => loc.toLowerCase().includes(normalized))
  )
}

import servicesData from '../../../../scraped-sites/stellamattina/extracted/services.json'
import type { Service } from './types'

const services = servicesData as Service[]

export function getServices(): Service[] {
  return services
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug)
}

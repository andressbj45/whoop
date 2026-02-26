import contactData from '../../../../scraped-sites/stellamattina/extracted/contact_info.json'
import type { ContactInfo } from './types'

const raw = contactData as ContactInfo

// Normalize phone numbers to XXX-XXX-XXXX format and deduplicate.
// contact_info.json has 3 phone entries: "214-942-3100", "469-399-0355", "214.942.3100"
// (the third is a duplicate of the first with different formatting)
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return phone
}

const dedupedPhones = [...new Set(raw.phones.map(normalizePhone))]

export function getContactInfo(): ContactInfo & { phones: string[] } {
  return {
    ...raw,
    phones: dedupedPhones,
  }
}

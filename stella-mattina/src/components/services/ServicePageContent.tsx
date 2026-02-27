import { BookingButton } from '@/components/common/BookingButton'
import { ServiceFaqSection } from '@/components/services/ServiceFaqSection'
import type { Service } from '@/lib/content/types'
import type { FAQ } from '@/data/faqs'

interface Props {
  service: Service
  faqs: FAQ[]
}

/**
 * Smart layout component for service pages.
 *
 * Interprets the structured `sections` array from services.json:
 *   1. Intro section (first section with content, before "Our Services")
 *   2. Service cards (sections between "Our Services" / "Our Practitioners" and "What You Get")
 *   3. Benefits ("What You Get" content — "Label: text" pairs)
 *   4. CTA ("Take the Next Step" or last section)
 *
 * Falls back to full_text paragraph rendering when sections are absent.
 */
export function ServicePageContent({ service, faqs }: Props) {
  const { sections, full_text, title } = service

  // --- Parse sections ---
  const SERVICES_MARKERS = ['our services', 'our practitioners', 'nuestros servicios']
  const BENEFITS_MARKER = 'what you get'
  const SKIP_SLUGS = ['take the next step', 'take control', 'schedule your appointment', 'agenda tu cita']

  const servicesIdx = sections.findIndex(s =>
    SERVICES_MARKERS.includes(s.heading.toLowerCase())
  )
  const benefitsIdx = sections.findIndex(s =>
    s.heading.toLowerCase().startsWith(BENEFITS_MARKER)
  )

  const hasStructure = servicesIdx !== -1

  // Intro: sections before "Our Services" with non-empty content
  const introSections = hasStructure
    ? sections.slice(0, servicesIdx).filter(s => s.content.trim())
    : []

  // Service cards: sections between "Our Services" and "What You Get" (or end)
  const cardsEnd = benefitsIdx !== -1 ? benefitsIdx : sections.length
  const cardSections = hasStructure
    ? sections.slice(servicesIdx + 1, cardsEnd).filter(s => s.content.trim())
    : []

  // Benefits: parse "Label: description" pairs from "What You Get" content
  const benefitsSection = benefitsIdx !== -1 ? sections[benefitsIdx] : null
  const benefits = parseBenefits(benefitsSection?.content ?? '')

  // CTA text: last section that isn't a benefits/card section
  const ctaSection = sections.slice(benefitsIdx !== -1 ? benefitsIdx + 1 : 0).find(s =>
    s.content.trim() && !SKIP_SLUGS.some(skip => s.heading.toLowerCase().startsWith(skip))
  ) ?? sections.find(s =>
    SKIP_SLUGS.some(skip => s.heading.toLowerCase().startsWith(skip)) && s.content.trim()
  )

  // Fallback: render full_text as paragraphs if no structure
  if (!hasStructure) {
    const paragraphs = full_text.split('\n\n').filter(p => p.trim())
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="font-display text-4xl text-sm-navy mb-6">{title}</h1>
        <div className="prose prose-lg max-w-none text-gray-700 mb-10">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <BookingButton label="Book an Appointment" size="lg" />
        <ServiceFaqSection faqs={faqs} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">

      {/* Page title + intro */}
      <div className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl text-sm-navy mb-4">{title}</h1>
        {introSections.map((s, i) => (
          <div key={i}>
            {introSections.length > 1 && (
              <p className="text-lg font-medium text-sm-blue mb-2">{s.heading}</p>
            )}
            <p className="text-lg text-gray-700 leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>

      {/* Service cards grid */}
      {cardSections.length > 0 && (
        <section className="mb-14">
          <h2 className="font-display text-2xl text-sm-navy mb-8">Our Services</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {cardSections.map((card, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-display text-lg text-sm-navy mb-3">{card.heading}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{card.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What You Get benefits */}
      {benefits.length > 0 && (
        <section className="mb-14 bg-slate-50 rounded-2xl p-8">
          <h2 className="font-display text-2xl text-sm-navy mb-6">What You Get</h2>
          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 h-5 w-5 shrink-0 text-sm-blue">✓</span>
                <div>
                  {b.label && <span className="font-semibold text-sm-navy">{b.label}: </span>}
                  <span className="text-gray-700">{b.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CTA */}
      <div className="mb-16">
        {ctaSection && (
          <p className="text-gray-700 mb-6 max-w-2xl leading-relaxed">{ctaSection.content}</p>
        )}
        <BookingButton label="Book an Appointment" size="lg" />
      </div>

      {/* FAQs */}
      <ServiceFaqSection faqs={faqs} />
    </div>
  )
}

/** Parse "Label: description" pairs from a benefits blob. */
function parseBenefits(content: string): Array<{ label: string; text: string }> {
  if (!content.trim()) return []

  // Try splitting on pattern "Word(s): " — indicates labelled benefits
  const labelPattern = /([A-Z][^:]{2,40}):\s/g
  const matches = [...content.matchAll(labelPattern)]

  if (matches.length >= 2) {
    return matches.map((m, i) => {
      const start = (m.index ?? 0) + m[0].length
      const end = matches[i + 1]?.index ?? content.length
      return {
        label: m[1].trim(),
        text: content.slice(start, end).trim(),
      }
    })
  }

  // Fallback: treat whole content as a single benefit with no label
  return [{ label: '', text: content }]
}

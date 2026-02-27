import { getServices } from '@/lib/content/services'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookingButton } from '@/components/common/BookingButton'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | Stella Mattina',
  description: "Comprehensive women's health services including gynecology, obstetrics, hormone therapy, and primary care across 7 DFW locations.",
}

const EXCLUDED_SLUGS = ['providers-bio']

export default function ServicesPage() {
  const services = getServices().filter(s => !EXCLUDED_SLUGS.includes(s.slug))

  return (
    <PageWrapper>
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="font-display text-4xl md:text-5xl text-sm-navy mb-4">Our Services</h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          Expert women's health and primary care services, delivered with compassion across 7 DFW locations.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {services.map((service) => {
            const intro = service.sections.find(s => s.content.trim())
            return (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-sm-blue transition-all"
              >
                <h2 className="font-display text-lg text-sm-navy mb-3 group-hover:text-sm-blue transition-colors">
                  {service.title}
                </h2>
                {intro && (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {intro.content}
                  </p>
                )}
                <span className="mt-4 inline-block text-sm font-medium text-sm-blue">
                  Learn more →
                </span>
              </Link>
            )
          })}
        </div>

        <div className="border-t border-gray-100 pt-10 text-center">
          <p className="text-gray-600 mb-6">Ready to schedule with one of our specialists?</p>
          <BookingButton label="Book an Appointment" size="lg" />
        </div>
      </div>
    </PageWrapper>
  )
}

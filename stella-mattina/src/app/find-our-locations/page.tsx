import { getLocations } from '@/lib/content/locations'
import { LOCATION_ADDRESSES } from '@/data/location-addresses'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookingButton } from '@/components/common/BookingButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find Our Locations | Stella Mattina',
  description: "Stella Mattina women's health clinics in Dallas, Arlington, Mesquite, and Carrollton, TX. Find a location near you.",
}

export default function LocationsListingPage() {
  const locations = getLocations()
  return (
    <PageWrapper>
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="font-display text-4xl text-sm-navy mb-4">Find Our Locations</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Stella Mattina serves the Dallas-Fort Worth area with convenient clinic locations. Find the office nearest you.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {locations.map((loc) => {
            const addr = LOCATION_ADDRESSES[loc.slug]
            return (
              <a
                key={loc.slug}
                href={`/find-our-locations/${loc.slug}`}
                className="block p-6 border border-gray-200 rounded-xl hover:border-sm-blue hover:shadow-sm transition-all"
              >
                <h2 className="font-display text-xl text-sm-navy mb-2">{loc.name}</h2>
                {addr && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {addr.streetAddress}<br />
                    {addr.addressLocality}, {addr.addressRegion} {addr.postalCode}
                  </p>
                )}
                <p className="mt-2 text-sm text-sm-blue">{loc.phone}</p>
                <span className="mt-4 inline-block text-xs font-medium text-sm-blue">View Location &rarr;</span>
              </a>
            )
          })}
        </div>
        <div className="mt-12 text-center">
          <BookingButton label="Book an Appointment" size="lg" />
        </div>
      </div>
    </PageWrapper>
  )
}

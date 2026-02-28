import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getLocations, getLocationWithProviders } from '@/lib/content/locations'
import { LOCATION_ADDRESSES } from '@/data/location-addresses'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookingButton } from '@/components/common/BookingButton'
import { defaultOgImage } from '@/lib/seo/og'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

// Server Component — no 'use client' directive
// MedicalClinic JSON-LD uses Record<string,unknown> (consistent with codebase pattern)
// because schema-dts MedicalClinic resolves to a union type incompatible with WithContext<T>.

export async function generateStaticParams() {
  const locations = getLocations()
  return locations.map((loc) => ({ slug: loc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const location = getLocationWithProviders(slug)
  if (!location) {
    return { title: 'Location Not Found | Stella Mattina' }
  }

  const address = LOCATION_ADDRESSES[location.slug]

  const description = `Stella Mattina women's health clinic at ${address?.streetAddress ?? ''}, ${address?.addressLocality ?? ''}, ${address?.addressRegion ?? ''}. Book an appointment today.`

  return {
    title: `${location.name} | Stella Mattina Locations`,
    description,
    alternates: { canonical: `/find-our-locations/${slug}` },
    openGraph: {
      title: `${location.name} | Stella Mattina Locations`,
      description,
      url: `/find-our-locations/${slug}`,
      type: 'website',
      images: [defaultOgImage],
    },
  }
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const location = getLocationWithProviders(slug)

  if (!location) {
    notFound()
  }

  const address = LOCATION_ADDRESSES[location.slug]

  const directionsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}`
      )}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ' Stella Mattina')}`

  // MedicalClinic JSON-LD — typed as Record<string,unknown> because schema-dts MedicalClinic
  // is a union type (MedicalClinicLeaf | CovidTestingFacility | string) which is incompatible
  // with WithContext<T extends Thing>. Output is valid schema.org markup.
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: `Stella Mattina — ${location.name}`,
    telephone: location.phone,
    url: `https://stellamattina.com/find-our-locations/${location.slug}`,
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: address.streetAddress,
        addressLocality: address.addressLocality,
        addressRegion: address.addressRegion,
        postalCode: address.postalCode,
        addressCountry: 'US',
      },
    }),
  }

  return (
    <PageWrapper>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://stellamattina.com' },
          { name: 'Locations', url: 'https://stellamattina.com/find-our-locations' },
          { name: location.name, url: `https://stellamattina.com/find-our-locations/${location.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="font-display text-4xl text-sm-navy mb-2">{location.name}</h1>
        <p className="text-sm-blue font-medium mb-8">Stella Mattina Women&apos;s Health</p>

        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          <div className="space-y-3">
            <h2 className="font-semibold text-sm-navy">Contact</h2>
            <p className="text-gray-700">
              <a href={`tel:${location.phone}`} className="hover:text-sm-blue transition-colors">
                {location.phone}
              </a>
            </p>
            {address && (
              <address className="text-gray-700 not-italic leading-relaxed">
                {address.streetAddress}
                <br />
                {address.addressLocality}, {address.addressRegion} {address.postalCode}
              </address>
            )}
          </div>
          <div className="space-y-3">
            <h2 className="font-semibold text-sm-navy">Directions</h2>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm-blue underline hover:text-sm-navy transition-colors"
            >
              Get Directions &rarr;
            </a>
          </div>
        </div>

        {/* Providers at this location */}
        {location.practitioners.length > 0 && (
          <section className="border-t border-gray-100 pt-10">
            <h2 className="font-display text-2xl text-sm-navy mb-6">Our Providers</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {location.practitioners.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`/doctor-directory/${p.slug}`}
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-sm-blue transition-colors"
                  >
                    <span className="font-medium text-sm-navy">{p.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-10">
          <BookingButton label="Book an Appointment" size="lg" />
        </div>
      </div>
    </PageWrapper>
  )
}

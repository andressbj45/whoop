import { getPractitioners } from '@/lib/content/practitioners'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookingButton } from '@/components/common/BookingButton'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Doctors & Providers | Stella Mattina',
  description: 'Meet the Stella Mattina team — experienced OB-GYNs, maternal-fetal medicine specialists, and primary care physicians serving Dallas and the DFW area.',
}

export default function DoctorDirectoryPage() {
  const practitioners = getPractitioners()

  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="font-display text-4xl text-sm-navy mb-4">Meet Our Providers</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Our team of board-certified physicians and specialists is dedicated to women&apos;s health, obstetrics, and primary care across the Dallas-Fort Worth area.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {practitioners.map((p) => (
            <a
              key={p.slug}
              href={`/doctor-directory/${p.slug}`}
              className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-sm-blue hover:shadow-md transition-all"
            >
              <div className="relative aspect-[3/2] bg-gray-50">
                <Image
                  src={p.photo_url}
                  alt={p.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="p-4">
                <h2 className="font-display text-lg text-sm-navy group-hover:text-sm-blue transition-colors">{p.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{p.specialty}</p>
                <p className="text-xs text-gray-400 mt-1">{p.locations.join(', ')}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-12 text-center">
          <BookingButton label="Book an Appointment" size="lg" />
        </div>
      </div>
    </PageWrapper>
  )
}

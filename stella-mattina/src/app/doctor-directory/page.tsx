import { getPractitioners } from '@/lib/content/practitioners'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookingButton } from '@/components/common/BookingButton'
import Image from 'next/image'
import type { Metadata } from 'next'
import { defaultOgImage } from '@/lib/seo/og'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Our Doctors & Providers | Stella Mattina',
  description: 'Meet the Stella Mattina team — experienced OB-GYNs, maternal-fetal medicine specialists, and primary care physicians serving Dallas and the DFW area.',
  alternates: { canonical: '/doctor-directory' },
  openGraph: {
    title: 'Our Doctors & Providers | Stella Mattina',
    description: 'Meet the Stella Mattina team — experienced OB-GYNs, maternal-fetal medicine specialists, and primary care physicians serving Dallas and the DFW area.',
    url: '/doctor-directory',
    type: 'website',
    images: [defaultOgImage],
  },
}

export default function DoctorDirectoryPage() {
  const practitioners = getPractitioners()

  return (
    <PageWrapper>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://stellamattina.com' },
        { name: 'Doctor Directory', url: 'https://stellamattina.com/doctor-directory' },
      ]} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[480px] sm:min-h-[540px]">
        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-doctors.png"
            alt="Stella Mattina physicians"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Dark gradient overlay — heavier on left so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-sm-navy/90 via-sm-navy/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 flex items-center">
          <div className="max-w-xl">
            <p className="text-sm-blue-light text-sm font-semibold uppercase tracking-widest mb-3">Our Team</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              World-Class Providers.<br />
              <span className="text-sm-blue-light">Personal Care.</span>
            </h1>
            <p className="text-white/80 text-lg max-w-md mb-8">
              Board-certified OB-GYNs, maternal-fetal medicine specialists, and primary care physicians — all dedicated to women&apos;s health across Dallas-Fort Worth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <BookingButton label="Book an Appointment" size="lg" />
              <a href="tel:2149423100" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors">
                Call 214-942-3100
              </a>
            </div>
            <div className="mt-10 flex gap-8">
              <div>
                <p className="text-white font-bold text-2xl">29+</p>
                <p className="text-white/60 text-sm">Providers</p>
              </div>
              <div>
                <p className="text-white font-bold text-2xl">15+</p>
                <p className="text-white/60 text-sm">DFW Locations</p>
              </div>
              <div>
                <p className="text-white font-bold text-2xl">30+</p>
                <p className="text-white/60 text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {practitioners.map((p) => (
            <a
              key={p.slug}
              href={`/doctor-directory/${p.slug}`}
              className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-sm-blue hover:shadow-md transition-all cursor-pointer"
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

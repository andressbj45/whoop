import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getPractitioners, getPractitionerBySlug } from '@/lib/content/practitioners'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookingButton } from '@/components/common/BookingButton'
import { defaultOgImage } from '@/lib/seo/og'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

// Server Component — no 'use client' directive

export async function generateStaticParams() {
  const practitioners = getPractitioners()
  return practitioners.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = getPractitionerBySlug(slug)
  if (!p) {
    return { title: 'Doctor Not Found | Stella Mattina' }
  }

  const description = p.bio
    ? p.bio.slice(0, 155)
    : `Meet ${p.name} — ${p.specialty} at Stella Mattina in Dallas.`

  return {
    title: `${p.name} | ${p.specialty} | Stella Mattina`,
    description,
    alternates: { canonical: `/doctor-directory/${slug}` },
    openGraph: {
      title: `${p.name} | ${p.specialty} | Stella Mattina`,
      description,
      url: `/doctor-directory/${slug}`,
      type: 'website',
      images: [defaultOgImage],
    },
  }
}

export default async function DoctorBioPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = getPractitionerBySlug(slug)

  if (!p) {
    notFound()
  }

  // Build Physician JSON-LD as a plain object — schema-dts MedicalSpecialty is a strict
  // enum that excludes custom strings; the output is valid schema.org markup.
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: p.name,
    ...(p.bio ? { description: p.bio } : {}),
    medicalSpecialty: p.specialty,
    image: p.photo_url,
    url: `https://stellamattina.com/doctor-directory/${p.slug}`,
    worksFor: {
      '@type': 'MedicalOrganization',
      name: 'Stella Mattina',
      url: 'https://stellamattina.com',
    },
  }

  return (
    <PageWrapper>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://stellamattina.com' },
          { name: 'Doctor Directory', url: 'https://stellamattina.com/doctor-directory' },
          { name: p.name, url: `https://stellamattina.com/doctor-directory/${p.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <Image
            src={p.photo_url}
            alt={p.name}
            width={240}
            height={280}
            className="rounded-xl object-cover"
          />
          <div>
            <h1 className="font-display text-3xl text-sm-navy">{p.name}</h1>
            <p className="mt-1 text-sm-blue font-medium">{p.specialty}</p>
            <p className="text-gray-500 text-sm">{p.locations.join(', ')}</p>
            {p.bio ? (
              <p className="text-gray-700 leading-relaxed mt-6">{p.bio}</p>
            ) : (
              <p className="text-gray-500 italic mt-6">Bio coming soon.</p>
            )}
            <div className="mt-8">
              <BookingButton label={`Book with ${p.name.split(' ')[0]}`} size="lg" />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

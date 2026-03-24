import { getServiceBySlug } from '@/lib/content/services'
import { getFaqsForService } from '@/data/faqs'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ServicePageContent } from '@/components/services/ServicePageContent'
import type { Metadata } from 'next'
import type { WithContext, FAQPage, Question, Answer } from 'schema-dts'
import { defaultOgImage } from '@/lib/seo/og'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

const SLUG = 'gynecologist-dallas'
const service = getServiceBySlug(SLUG)!

export const metadata: Metadata = {
  title: `${service.title} | Stella Mattina`,
  description: service.meta_description ?? service.full_text.substring(0, 155),
  alternates: { canonical: '/gynecologist-dallas' },
  openGraph: {
    title: `${service.title} | Stella Mattina`,
    description: service.meta_description ?? service.full_text.substring(0, 155),
    url: '/gynecologist-dallas',
    type: 'website',
    images: [defaultOgImage],
  },
}

export default function GynecologistDallasPage() {
  const faqs = getFaqsForService(SLUG)

  const jsonLd: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq): Question => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      } as Answer,
    })),
  }

  const medicalWebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `${service.title} | Stella Mattina`,
    description: service.meta_description ?? service.full_text.substring(0, 155),
    url: 'https://stellamattina.com/gynecologist-dallas',
    about: {
      '@type': 'MedicalSpecialty',
      name: 'Gynecology',
    },
    audience: {
      '@type': 'Patient',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stella Mattina',
      url: 'https://stellamattina.com',
    },
  }

  return (
    <PageWrapper>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://stellamattina.com' },
        { name: 'Gynecologist Dallas', url: 'https://stellamattina.com/gynecologist-dallas' },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageJsonLd) }}
      />
      <ServicePageContent service={service} faqs={faqs} />
    </PageWrapper>
  )
}

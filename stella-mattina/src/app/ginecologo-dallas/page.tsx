import { getServiceBySlug } from '@/lib/content/services'
import { getFaqsForService } from '@/data/faqs'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ServicePageContent } from '@/components/services/ServicePageContent'
import type { Metadata } from 'next'
import type { WithContext, FAQPage, Question, Answer } from 'schema-dts'
import { defaultOgImage } from '@/lib/seo/og'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

const SLUG = 'ginecologo-dallas'
const service = getServiceBySlug(SLUG)!

export const metadata: Metadata = {
  title: `${service.title} | Stella Mattina`,
  description: service.meta_description ?? service.full_text.substring(0, 155),
  alternates: { canonical: '/ginecologo-dallas' },
  openGraph: {
    title: `${service.title} | Stella Mattina`,
    description: service.meta_description ?? service.full_text.substring(0, 155),
    url: '/ginecologo-dallas',
    type: 'website',
    images: [defaultOgImage],
  },
}

export default function GinecologoDallasPage() {
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

  return (
    <PageWrapper>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://stellamattina.com' },
        { name: 'Ginec\u00f3logo Dallas', url: 'https://stellamattina.com/ginecologo-dallas' },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageContent service={service} faqs={faqs} />
    </PageWrapper>
  )
}

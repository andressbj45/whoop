import { getServiceBySlug } from '@/lib/content/services'
import { getFaqsForService } from '@/data/faqs'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ServicePageContent } from '@/components/services/ServicePageContent'
import type { Metadata } from 'next'
import type { WithContext, FAQPage, Question, Answer } from 'schema-dts'
import { defaultOgImage } from '@/lib/seo/og'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

const SLUG = 'maternal-fetal-medicine'
const service = getServiceBySlug(SLUG)!

export const metadata: Metadata = {
  title: `${service.title} | Stella Mattina`,
  description: service.meta_description ?? service.full_text.substring(0, 155),
  alternates: { canonical: '/maternal-fetal-medicine' },
  openGraph: {
    title: `${service.title} | Stella Mattina`,
    description: service.meta_description ?? service.full_text.substring(0, 155),
    url: '/maternal-fetal-medicine',
    type: 'website',
    images: [defaultOgImage],
  },
}

export default function MaternalFetalMedicinePage() {
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
        { name: 'Maternal Fetal Medicine', url: 'https://stellamattina.com/maternal-fetal-medicine' },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageContent service={service} faqs={faqs} />
    </PageWrapper>
  )
}

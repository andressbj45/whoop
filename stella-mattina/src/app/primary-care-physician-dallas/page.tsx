import { getServiceBySlug } from '@/lib/content/services'
import { getFaqsForService } from '@/data/faqs'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ServiceFaqSection } from '@/components/services/ServiceFaqSection'
import { BookingButton } from '@/components/common/BookingButton'
import type { Metadata } from 'next'
import type { WithContext, FAQPage, Question, Answer } from 'schema-dts'

const SLUG = 'primary-care-physician-dallas'
const service = getServiceBySlug(SLUG)!

export const metadata: Metadata = {
  title: `${service.title} | Stella Mattina`,
  description: service.meta_description ?? service.full_text.substring(0, 155),
}

export default function PrimaryCareDallasPage() {
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

  const paragraphs = service.full_text.split('\n\n').filter(p => p.trim().length > 0)

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="font-display text-4xl text-sm-navy mb-6">{service.title}</h1>
        <div className="prose prose-lg max-w-none text-gray-700">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="mt-10">
          <BookingButton label="Book an Appointment" size="lg" />
        </div>
        <ServiceFaqSection faqs={faqs} />
      </div>
    </PageWrapper>
  )
}

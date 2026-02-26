import type { FAQ } from '@/data/faqs'

interface Props {
  faqs: FAQ[]
}

export function ServiceFaqSection({ faqs }: Props) {
  if (faqs.length === 0) return null

  return (
    <section className="mt-16 border-t border-gray-100 pt-10">
      <h2 className="font-display text-2xl text-sm-navy mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details key={i} className="group border border-gray-200 rounded-lg">
            <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-medium text-sm-navy list-none">
              {faq.question}
              <span className="ml-4 text-sm-blue group-open:rotate-180 transition-transform">&#9660;</span>
            </summary>
            <p className="px-5 pb-4 pt-0 text-gray-700 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

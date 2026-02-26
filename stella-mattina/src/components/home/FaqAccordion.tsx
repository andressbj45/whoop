'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'Do you offer same-day appointments?',
    a: 'Yes — same-day appointments are available at most of our DFW locations. Book online or call us at 214-942-3100 to check availability.',
  },
  {
    q: 'What insurance do you accept?',
    a: 'We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Humana, Medicare, and Medicaid. Don\'t see yours? Call us — self-pay options are also available.',
  },
  {
    q: 'What should I bring to my first visit?',
    a: 'Please bring a valid photo ID, your insurance card, a list of current medications, and any relevant medical records. We recommend arriving 10–15 minutes early to complete your paperwork.',
  },
  {
    q: 'Do you accept Medicare and Medicaid?',
    a: 'Yes. Stella Mattina proudly accepts both Medicare and Medicaid to provide inclusive, affordable care for all members of our community.',
  },
  {
    q: 'How do I access the patient portal?',
    a: 'Visit mycw160.ecwcloud.com/portal22103 to log in. If you need help getting set up, ask at your next visit or call our office and we\'ll walk you through it.',
  },
]

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => (
        <div key={i} className="border border-sm-gray rounded-xl overflow-hidden">
          <button
            className="w-full flex justify-between items-center gap-4 px-6 py-5 text-left font-semibold text-sm-navy hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="text-base">{faq.q}</span>
            <svg
              className={`w-5 h-5 text-sm-blue shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-sm-gray pt-4">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

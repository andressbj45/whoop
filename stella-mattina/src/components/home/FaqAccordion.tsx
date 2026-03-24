'use client'
import { useState } from 'react'
import { HOME_FAQS } from '@/data/home-faqs'

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {HOME_FAQS.map((faq, i) => (
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

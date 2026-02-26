import { PageWrapper } from '@/components/layout/PageWrapper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Careers | Stella Mattina Women's Health",
  description: "Join the Stella Mattina team. We are looking for compassionate healthcare professionals dedicated to women's health in the Dallas-Fort Worth area.",
}

export default function CareersPage() {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-4xl text-sm-navy mb-6">Join Our Team</h1>
        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:font-display prose-headings:text-sm-navy">
          <p>
            At Stella Mattina, we believe a great patient experience starts with a great team. We&apos;re always
            looking for skilled, compassionate healthcare professionals who share our commitment to women&apos;s
            health and genuine patient care.
          </p>
          <h2>Why Stella Mattina</h2>
          <ul>
            <li>A supportive, collaborative practice environment</li>
            <li>Seven DFW locations with flexible scheduling</li>
            <li>Physician-led practice with a patient-first culture</li>
            <li>Competitive compensation and benefits</li>
          </ul>
          <h2>How to Apply</h2>
          <p>
            Send your CV and a brief note about your interest to{' '}
            <a href="mailto:info@stellamattina.com?subject=Career Inquiry" className="text-sm-blue hover:underline">
              info@stellamattina.com
            </a>
            . We review applications on a rolling basis and will be in touch if there&apos;s a match.
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}

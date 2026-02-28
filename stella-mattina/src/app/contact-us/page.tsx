import { getContactInfo } from '@/lib/content/contact'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ContactForm } from '@/components/contact/ContactForm'
import type { Metadata } from 'next'
import { defaultOgImage } from '@/lib/seo/og'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: "Contact Us | Stella Mattina Women's Health",
  description: "Contact Stella Mattina Women's Health. Call us, find a location, or send a general inquiry. We're here to help.",
  alternates: { canonical: '/contact-us' },
  openGraph: {
    title: "Contact Us | Stella Mattina Women's Health",
    description: "Contact Stella Mattina Women's Health. Call us, find a location, or send a general inquiry. We're here to help.",
    url: '/contact-us',
    type: 'website',
    images: [defaultOgImage],
  },
}

export default function ContactPage() {
  const contact = getContactInfo()

  return (
    <PageWrapper>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://stellamattina.com' },
        { name: 'Contact Us', url: 'https://stellamattina.com/contact-us' },
      ]} />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="font-display text-4xl text-sm-navy mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          We&apos;re here to answer your questions. For appointments, please use the Book Now button. For general
          inquiries, reach out below.
        </p>
        <div className="grid sm:grid-cols-2 gap-12">
          {/* Contact info column */}
          <div className="space-y-6">
            <div>
              <h2 className="font-semibold text-sm-navy mb-3">Phone</h2>
              <ul className="space-y-1">
                {contact.phones.map((phone) => (
                  <li key={phone}>
                    <a href={`tel:${phone}`} className="text-gray-700 hover:text-sm-blue transition-colors">
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {contact.emails.length > 0 && (
              <div>
                <h2 className="font-semibold text-sm-navy mb-3">Email</h2>
                <ul className="space-y-1">
                  {contact.emails.map((email) => (
                    <li key={email}>
                      <a href={`mailto:${email}`} className="text-gray-700 hover:text-sm-blue transition-colors">
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h2 className="font-semibold text-sm-navy mb-3">Locations</h2>
              <a href="/find-our-locations" className="text-sm-blue hover:underline text-sm">
                View all 7 locations &rarr;
              </a>
            </div>
          </div>
          {/* Form column */}
          <div>
            <h2 className="font-semibold text-sm-navy mb-4">Send a General Inquiry</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

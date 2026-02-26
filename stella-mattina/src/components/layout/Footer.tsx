// Server Component — reads contact info from content layer.
import Image from 'next/image'
import { BookingButton } from '@/components/common/BookingButton'
import { PhoneLink } from '@/components/common/PhoneLink'
import { getContactInfo } from '@/lib/content/contact'

export function Footer() {
  const contact = getContactInfo()

  return (
    <footer className="bg-sm-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="/" aria-label="Stella Mattina home">
              <Image
                src="/images/logo.png"
                alt="Stella Mattina Women's Health"
                width={160}
                height={42}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </a>
            <p className="mt-4 text-sm text-blue-200">
              Expert women&apos;s health and primary care across 7 DFW locations.
            </p>
            <div className="mt-4 flex flex-col gap-1">
              {contact.phones.map((phone) => (
                <PhoneLink
                  key={phone}
                  phone={phone}
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                />
              ))}
              {contact.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  {email}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { href: '/doctor-directory', label: 'Our Doctors' },
                { href: '/services', label: 'Services' },
                { href: '/find-our-locations', label: 'Locations' },
                { href: '/blog', label: 'Blog' },
                { href: '/about-us', label: 'About Us' },
                { href: '/careers', label: 'Careers' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-blue-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Book CTA */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200">
              Ready to Book?
            </h3>
            <p className="mt-4 text-sm text-blue-200">
              Schedule your appointment with one of our board-certified providers.
            </p>
            <BookingButton
              size="md"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-white font-semibold text-sm-navy hover:bg-blue-50 transition-colors px-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-sm-blue/30 pt-6 text-center text-xs text-blue-300">
          © {new Date().getFullYear()} Stella Mattina. All rights reserved.
          {' · '}
          <a href="/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}

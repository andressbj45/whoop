// Server Component — no 'use client'. MobileNav (client) is a leaf child.
import Image from 'next/image'
import { BookingButton } from '@/components/common/BookingButton'
import { MobileNav } from './MobileNav'

const NAV_LINKS = [
  { href: '/find-our-locations', label: 'Locations' },
  { href: '/doctor-directory', label: 'Doctors' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/about-us', label: 'About Us' },
  { href: '/contact-us', label: 'Contact' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-sm-navy shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo — inverted to white */}
        <a href="/" className="flex items-center" aria-label="Stella Mattina home">
          <Image
            src="/images/logo.png"
            alt="Stella Mattina Women's Health"
            width={180}
            height={48}
            priority
            className="h-10 w-auto object-contain brightness-0 invert"
          />
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a
            href="https://mycw160.ecwcloud.com/portal22103/jsp/100mp/login_otp.jsp"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center text-xs font-medium tracking-wide text-white/60 hover:text-white transition-colors"
          >
            Patient Portal ↗
          </a>
          <span className="hidden md:block h-4 w-px bg-white/20" aria-hidden="true" />
          <BookingButton className="hidden sm:inline-flex items-center justify-center rounded-md border border-white font-semibold text-white hover:bg-white hover:text-sm-navy transition-colors px-4 py-2 text-sm" />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

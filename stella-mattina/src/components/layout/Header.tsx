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
    <header className="sticky top-0 z-50 w-full border-b border-sm-gray bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center" aria-label="Stella Mattina home">
          <Image
            src="/images/logo.png"
            alt="Stella Mattina Women's Health"
            width={180}
            height={48}
            priority
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-sm-navy transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <BookingButton className="hidden sm:inline-flex items-center justify-center rounded-md bg-sm-navy font-semibold text-white hover:bg-sm-blue-hover transition-colors px-4 py-2 text-sm" />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

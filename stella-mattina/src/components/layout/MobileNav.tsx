'use client'
// Only client component in the layout — manages Sheet open/close state.
// Uses shadcn Sheet (installed in Plan 01).

import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { BookingButton } from '@/components/common/BookingButton'

const NAV_LINKS = [
  { href: '/find-our-locations', label: 'Locations' },
  { href: '/doctor-directory', label: 'Doctors' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/about-us', label: 'About Us' },
  { href: '/contact-us', label: 'Contact' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open navigation menu"
          className="flex md:hidden flex-col gap-1.5 p-2"
        >
          <span className="block h-0.5 w-6 bg-sm-navy" />
          <span className="block h-0.5 w-6 bg-sm-navy" />
          <span className="block h-0.5 w-6 bg-sm-navy" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 pt-8">
        <nav className="flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-sm-navy hover:text-sm-blue"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <BookingButton size="lg" className="mt-4 w-full inline-flex items-center justify-center rounded-md bg-sm-navy font-semibold text-white hover:bg-sm-blue-hover transition-colors px-6 py-3 text-base" />
        </nav>
      </SheetContent>
    </Sheet>
  )
}

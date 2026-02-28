import type { Metadata } from 'next'
import { Roboto, Outfit } from 'next/font/google'
import PlausibleProvider from 'next-plausible'
import { defaultOgImage } from '@/lib/seo/og'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://stellamattina.com'),
  title: {
    template: '%s | Stella Mattina',
    default: "Stella Mattina | Women's Health & Primary Care | OBGYN Dallas",
  },
  description:
    "Expert women's health and primary care in Dallas. Board-certified OBGYNs and Family Medicine doctors across 7 DFW locations.",
  openGraph: {
    siteName: 'Stella Mattina',
    locale: 'en_US',
    type: 'website',
    images: [defaultOgImage],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${outfit.variable}`}>
      <head>
        <PlausibleProvider domain="stellamattina.com" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

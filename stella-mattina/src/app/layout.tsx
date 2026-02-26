import type { Metadata } from 'next'
import { Roboto, Dynalight } from 'next/font/google'
import PlausibleProvider from 'next-plausible'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const dynalight = Dynalight({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dynalight',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Stella Mattina',
    default: "Stella Mattina | Women's Health & Primary Care | OBGYN Dallas",
  },
  description:
    "Expert women's health and primary care in Dallas. Board-certified OBGYNs and Family Medicine doctors across 7 DFW locations.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${dynalight.variable}`}>
      <head>
        <PlausibleProvider domain="stellamattina.com" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookingButton } from '@/components/common/BookingButton'

const TRUST_ITEMS = [
  {
    label: "Expert Women's Health",
    desc: 'Gynecology, obstetrics, hormone therapy and more',
  },
  {
    label: '7 DFW Locations',
    desc: 'Dallas, Plano, Grapevine, and across the Metroplex',
  },
  {
    label: 'Board-Certified Providers',
    desc: 'A team of experienced, caring clinicians',
  },
]

export default function HomePage() {
  return (
    <PageWrapper>

      {/* ── Hero — warm cream ── */}
      <section className="bg-sm-warm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 lg:py-36 text-center">

          {/* Eyebrow */}
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sm-navy/50 mb-5">
            Women&apos;s Health · Dallas–Fort Worth
          </p>

          {/* Brand name */}
          <h1 className="font-display text-6xl font-normal text-sm-navy sm:text-7xl lg:text-[5.5rem] leading-none">
            Stella Mattina
          </h1>

          {/* Tagline */}
          <p className="mt-6 text-xl sm:text-2xl text-sm-navy/60 max-w-2xl mx-auto leading-relaxed font-light">
            Whole-person care for women — from your first appointment
            to every stage of life.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <BookingButton
              size="lg"
              className="inline-flex items-center justify-center rounded-lg bg-sm-navy font-semibold text-white hover:bg-sm-blue-hover transition-colors px-8 py-3.5 text-base shadow-sm"
            />
            <a
              href="/find-our-locations"
              className="inline-flex items-center justify-center rounded-lg border border-sm-navy/25 text-sm-navy hover:border-sm-navy hover:bg-sm-navy/5 transition-colors px-8 py-3.5 text-base font-medium"
            >
              Find a Location
            </a>
          </div>
        </div>

        {/* Wave: cream → light grey */}
        <div className="overflow-hidden">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block -mb-px"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C160,80 320,0 480,40 C640,80 800,0 960,40 C1120,80 1280,20 1440,40 L1440,80 L0,80 Z"
              fill="#F0F0F2"
            />
          </svg>
        </div>
      </section>

      {/* ── Trust strip — light grey ── */}
      <section className="bg-[#F0F0F2]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-2 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-sm-blue-card flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M9 1.5L11.06 6.56L16.5 7.27L12.75 10.9L13.72 16.31L9 13.77L4.28 16.31L5.25 10.9L1.5 7.27L6.94 6.56L9 1.5Z"
                      fill="#1C348C"
                      fillOpacity="0.7"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm-navy text-lg leading-snug">{item.label}</h3>
                <p className="text-sm-navy/55 text-sm leading-relaxed max-w-[200px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave: grey → white */}
        <div className="overflow-hidden">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block -mb-px"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C200,0 400,80 600,40 C800,0 1000,80 1200,40 C1320,20 1400,60 1440,40 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── Spacer — Phase 3 fills this ── */}
      <section className="bg-white py-24 text-center">
        <p className="text-sm-navy/20 text-xs tracking-widest uppercase">
          Full homepage — Phase 3
        </p>
      </section>

    </PageWrapper>
  )
}

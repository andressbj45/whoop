import Image from 'next/image'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookingButton } from '@/components/common/BookingButton'

// ─── Wave SVG helpers ────────────────────────────────────────────────────────

function WaveDown({ from, to }: { from: string; to: string }) {
  return (
    <div style={{ background: from }} className="overflow-hidden leading-none">
      <svg
        viewBox="0 0 1440 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        preserveAspectRatio="none"
      >
        <path
          d="M0,36 C180,72 360,0 540,36 C720,72 900,0 1080,36 C1260,72 1440,20 1440,36 L1440,72 L0,72 Z"
          fill={to}
        />
      </svg>
    </div>
  )
}

function WaveUp({ from, to }: { from: string; to: string }) {
  return (
    <div style={{ background: from }} className="overflow-hidden leading-none">
      <svg
        viewBox="0 0 1440 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        preserveAspectRatio="none"
      >
        <path
          d="M0,36 C240,0 480,72 720,36 C960,0 1200,72 1440,36 L1440,72 L0,72 Z"
          fill={to}
        />
      </svg>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <PageWrapper>

      {/* ══════════════════════════════════════════════════
          HERO — white, split layout
      ══════════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text side */}
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sm-blue mb-5">
                Women&apos;s Health · Dallas–Fort Worth
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] font-normal text-sm-navy leading-tight">
                Your Partner in Women&apos;s Health
              </h1>
              <p className="mt-5 text-lg text-gray-500 leading-relaxed max-w-lg">
                Same-day appointments. All major insurance accepted.
                Expert women&apos;s health and primary care at 7 DFW locations.
              </p>
              <div className="mt-8">
                <BookingButton
                  size="lg"
                  label="Book an Appointment"
                  className="inline-flex items-center justify-center rounded-lg bg-sm-navy font-semibold text-white hover:bg-sm-blue-hover transition-colors px-8 py-3.5 text-base shadow-sm"
                />
              </div>
              {/* Quick trust signals */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {['Same-Day Appointments', 'Walk-ins Welcome', 'All Major Insurance'].map((label) => (
                  <span key={label} className="flex items-center gap-1.5 text-sm text-gray-500">
                    <svg className="w-4 h-4 text-sm-blue shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Image side */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[3/4] bg-sm-gray shadow-lg">
              <Image
                src="/images/hero-doctor-consultation.jpg"
                alt="Stella Mattina doctor consulting with patient"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <WaveDown from="white" to="#F0F0F2" />

      {/* ══════════════════════════════════════════════════
          TRUST STRIP — light grey
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#F0F0F2]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: 'Same-Day', label: 'Appointments Available' },
              { value: '7', label: 'DFW Locations' },
              { value: '30+', label: 'Years of Experience' },
              { value: 'All Major', label: 'Insurance Accepted' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <span className="text-3xl font-bold text-sm-navy">{item.value}</span>
                <span className="text-sm text-gray-500 leading-snug">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveUp from="#F0F0F2" to="white" />

      {/* ══════════════════════════════════════════════════
          SERVICES — white
      ══════════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sm-blue mb-3">
              What We Treat
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-normal text-sm-navy">
              Explore Our Healthcare Solutions
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Women's Health",
                desc: 'Comprehensive gynecology, obstetrics, and reproductive healthcare for every stage of life.',
                href: '/services',
              },
              {
                title: 'Primary Care',
                desc: 'Full-service primary care for the whole family — preventive, chronic, and urgent care.',
                href: '/services',
              },
              {
                title: 'Obstetrics',
                desc: 'Expert prenatal care, high-risk pregnancy support, and postpartum follow-up.',
                href: '/services',
              },
              {
                title: 'Gynecology',
                desc: 'Routine well-woman exams, STD screenings, cervical cancer screening, and more.',
                href: '/services',
              },
              {
                title: 'BioTE Hormone Therapy',
                desc: 'Personalized bioidentical hormone optimization to restore energy, mood, and vitality.',
                href: '/services',
              },
              {
                title: 'Maternal-Fetal Medicine',
                desc: 'Specialized care for high-risk pregnancies, working alongside your OB team.',
                href: '/services',
              },
            ].map((service) => (
              <a
                key={service.title}
                href={service.href}
                className="group rounded-xl border border-sm-gray bg-white p-6 hover:border-sm-blue-light hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-sm-navy text-lg group-hover:text-sm-blue transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{service.desc}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-sm-blue gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <WaveDown from="white" to="#F0F0F2" />

      {/* ══════════════════════════════════════════════════
          WHY CHOOSE US — light grey
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#F0F0F2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Image side */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-sm-gray shadow-md order-2 lg:order-1">
              <Image
                src="/images/hero-expecting-mothers.jpg"
                alt="Expecting mothers at Stella Mattina"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Text side */}
            <div className="order-1 lg:order-2">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sm-blue mb-3">
                Why Stella Mattina
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-normal text-sm-navy mb-8">
                Uniquely Focused on Women&apos;s Health
              </h2>
              <ul className="space-y-5">
                {[
                  { title: 'Same-Day Appointments', desc: 'Your health matters. Timely care when you need it most.' },
                  { title: 'Walk-ins Welcome', desc: 'Our doors are always open for urgent concerns.' },
                  { title: 'BioTE Certified Providers', desc: 'Personalized hormone optimization for your health and vitality.' },
                  { title: 'Medicare & Medicaid Accepted', desc: 'Inclusive, affordable care for every member of our community.' },
                  { title: 'Self-Pay Options Available', desc: 'Flexible payment solutions with or without insurance.' },
                ].map((item, i) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sm-navy text-white text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-sm-navy">{item.title}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <WaveUp from="#F0F0F2" to="white" />

      {/* ══════════════════════════════════════════════════
          HOW IT WORKS — white
      ══════════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sm-blue mb-3">
            Getting Started
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-normal text-sm-navy mb-14">
            Your Journey to Exceptional Healthcare
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 relative">
            {/* connector line */}
            <div className="hidden sm:block absolute top-8 left-[calc(16.67%)] right-[calc(16.67%)] h-px bg-sm-gray" aria-hidden="true" />
            {[
              {
                step: '01',
                title: 'Schedule Your Appointment',
                desc: 'Book online or call us — same-day appointments are available.',
              },
              {
                step: '02',
                title: 'Get a Personalized Plan',
                desc: 'We design a tailored health plan with you after your consultation.',
              },
              {
                step: '03',
                title: 'Stay on Top of Your Health',
                desc: 'Enjoy regular follow-ups and preventive care for a healthier life.',
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-4 relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sm-navy text-white font-display text-2xl shadow-sm relative z-10">
                  {item.step}
                </div>
                <h3 className="font-semibold text-sm-navy text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <BookingButton
              size="lg"
              label="Book an Appointment"
              className="inline-flex items-center justify-center rounded-lg bg-sm-navy font-semibold text-white hover:bg-sm-blue-hover transition-colors px-8 py-3.5 text-base shadow-sm"
            />
          </div>
        </div>
      </section>

    </PageWrapper>
  )
}

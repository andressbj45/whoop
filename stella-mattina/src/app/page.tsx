import Image from 'next/image'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookingButton } from '@/components/common/BookingButton'
import { FaqAccordion } from '@/components/home/FaqAccordion'

// ─── Reusable wave dividers ──────────────────────────────────────────────────

function Wave({ fromColor, toColor, flip = false }: { fromColor: string; toColor: string; flip?: boolean }) {
  const path = flip
    ? 'M0,36 C240,0 480,72 720,36 C960,0 1200,72 1440,36 L1440,72 L0,72 Z'
    : 'M0,36 C180,72 360,0 540,36 C720,72 900,0 1080,36 C1260,72 1440,20 1440,36 L1440,72 L0,72 Z'
  return (
    <div style={{ background: fromColor }} className="overflow-hidden leading-none">
      <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
        <path d={path} fill={toColor} />
      </svg>
    </div>
  )
}

// Thin accent bar — replaces Ask Tia's orange line motif with SM blue
function AccentLine() {
  return <div className="w-10 h-[3px] bg-sm-blue rounded-full mb-5" />
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PROVIDERS = [
  { name: 'Akshay Goswami, MD',      specialty: 'OBGYN',          location: 'Dallas – Samuell',        photo: '/images/doctors/akshay-goswami.png' },
  { name: 'Alfredo A. Antonetti, MD', specialty: 'OBGYN',          location: 'Mesquite',                photo: '/images/doctors/alfredo-antonetti.jpg' },
  { name: 'Jared Eaves, MD',          specialty: 'OBGYN',          location: 'Bishop Arts District',    photo: '/images/doctors/jared-eaves.jpg' },
  { name: 'Ann L. Roc, MD',           specialty: 'OBGYN',          location: 'Mesquite',                photo: '/images/doctors/ann-roc.jpg' },
  { name: 'Pilar M. Bescos, MD',      specialty: 'Family Medicine', location: 'Carrollton',              photo: '/images/doctors/pilar-bescos.jpg' },
  { name: 'Sami E. Constantine, MD',  specialty: 'OBGYN',          location: 'Bishop Arts District',    photo: '/images/doctors/sami-constantine.jpg' },
]

const TESTIMONIALS = [
  {
    quote: "I've been a patient at Stella Mattina for three years and I've never felt more heard or cared for. Dr. Goswami took the time to walk me through every option.",
    name: 'Maria L.',
    location: 'Dallas',
    rating: 5,
  },
  {
    quote: 'Same-day appointment was available when I really needed it. The staff was warm, professional, and my OB was incredibly knowledgeable. Highly recommend.',
    name: 'Jennifer R.',
    location: 'Mesquite',
    rating: 5,
  },
  {
    quote: 'Finding a great OB in DFW felt impossible until I found Stella Mattina. They accepted my insurance, the location was convenient, and the care was exceptional.',
    name: 'Sofia M.',
    location: 'Arlington',
    rating: 5,
  },
]

const LOCATIONS = [
  { name: 'Bishop Arts District',  city: 'Dallas',      phone: '214-942-3100', href: '/our-locations/gynecologist-dallas-bishop-arts' },
  { name: 'Samuell (White Rock)',  city: 'Dallas',      phone: '214-942-3100', href: '/our-locations/gynecologist-dallas-tx-samuell' },
  { name: 'Arlington',             city: 'Arlington',   phone: '214-942-3100', href: '/our-locations/obgyn-arlington-tx' },
  { name: 'Mesquite',              city: 'Mesquite',    phone: '214-942-3100', href: '/our-locations/obgyn-in-mesquite' },
  { name: 'Carrollton',            city: 'Carrollton',  phone: '214-942-3100', href: '/our-locations/primary-care-physician-carrollton-tx' },
]

const INSURERS = [
  'Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealthcare',
  'Humana', 'Medicare', 'Medicaid', 'TriCare',
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <PageWrapper>

      {/* ══════════════════════════════════════════════
          1. HERO — split, full-bleed image right
      ══════════════════════════════════════════════ */}
      <section className="bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">

          {/* Text side */}
          <div className="flex items-center px-6 sm:px-10 xl:px-20 py-16 lg:py-24 lg:ml-auto lg:max-w-2xl w-full">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sm-blue mb-5">
                Women&apos;s Health · Dallas–Fort Worth
              </p>
              <h1 className="font-display text-5xl sm:text-6xl font-bold text-sm-navy leading-tight">
                Expert Women&apos;s Care,{' '}
                <span className="text-sm-blue">Same Day</span>
              </h1>
              <p className="mt-5 text-lg text-gray-500 leading-relaxed max-w-lg">
                Board-certified OBGYNs and primary care providers accepting
                most major insurance — across 15+ DFW locations.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
                <BookingButton
                  size="lg"
                  label="Book Your Appointment"
                  className="inline-flex items-center justify-center rounded-lg bg-sm-navy font-semibold text-white hover:bg-sm-blue-hover transition-colors px-8 py-3.5 text-base shadow-sm"
                />
              </div>
              <a
                href="tel:214-942-3100"
                className="mt-3 inline-flex items-center text-sm text-gray-400 hover:text-sm-navy transition-colors"
              >
                Or call&nbsp;<span className="font-medium text-sm-navy">214-942-3100</span>
              </a>

              {/* Inline trust checks */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {['Same-Day Appointments', 'Walk-ins Welcome', 'All Major Insurance'].map((label) => (
                  <span key={label} className="flex items-center gap-1.5 text-sm text-gray-400">
                    <svg className="w-4 h-4 text-sm-blue shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Full-bleed image right */}
          <div className="relative min-h-[360px] lg:min-h-0 bg-sm-gray">
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
      </section>

      {/* ══════════════════════════════════════════════
          2. TRUST BAR
      ══════════════════════════════════════════════ */}
      <section className="bg-sm-navy">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: '30+',    label: 'Years Experience' },
              { value: '15+',    label: 'DFW Locations' },
              { value: '25+',    label: 'Providers' },
              { value: '4.8★',  label: 'Google Rating' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <span className="text-3xl font-bold text-white">{item.value}</span>
                <span className="text-sm text-white/60">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave fromColor="#1C348C" toColor="white" flip />

      {/* ══════════════════════════════════════════════
          3. SERVICES (3 cards)
      ══════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <AccentLine />
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-sm-navy">
              Healthcare Solutions
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Comprehensive, compassionate care for women and families at every stage of life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 28 28">
                    <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M9 14c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="14" cy="14" r="2" fill="currentColor" />
                  </svg>
                ),
                title: "Women's Health",
                services: ['Obstetrics', 'Gynecology', 'Maternal-Fetal Medicine'],
                desc: "Expert care for every stage of a woman's life — from annual exams to high-risk pregnancy management.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 28 28">
                    <rect x="4" y="6" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M14 10v8M10 14h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                ),
                title: 'Primary Care',
                services: ['Family Medicine', 'Immigration Physicals', 'Preventive Care'],
                desc: 'Full-service primary care for your whole family — chronic conditions, urgent care, and preventive screenings.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 28 28">
                    <path d="M14 4c5.52 0 10 4.48 10 10S19.52 24 14 24 4 19.52 4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                ),
                title: 'BioTE Hormone Therapy',
                services: ['Pellet Therapy', 'Hormone Optimization', 'Energy & Vitality'],
                desc: 'Personalized bioidentical hormone therapy to restore balance, energy, and quality of life.',
              },
            ].map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-sm-gray bg-white p-8 hover:border-sm-blue-light hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-sm-blue-card text-sm-navy flex items-center justify-center mb-5">
                  {service.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-sm-navy mb-3">{service.title}</h3>
                <ul className="space-y-1 mb-4">
                  {service.services.map((s) => (
                    <li key={s} className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sm-blue shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-400 leading-relaxed">{service.desc}</p>
                <a href="/services" className="mt-5 inline-flex items-center text-sm font-semibold text-sm-blue gap-1 group-hover:gap-2 transition-all">
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave fromColor="white" toColor="#F0F0F2" />

      {/* ══════════════════════════════════════════════
          4. HOW IT WORKS
      ══════════════════════════════════════════════ */}
      <section className="bg-[#F0F0F2]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <AccentLine />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-sm-navy mb-14">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 relative">
            <div className="hidden sm:block absolute top-8 left-[calc(16.7%)] right-[calc(16.7%)] h-px bg-sm-gray" aria-hidden="true" />
            {[
              { n: '01', title: 'Schedule', desc: 'Book online or call — same-day appointments available at most locations.' },
              { n: '02', title: 'Get Your Plan', desc: 'After your visit, we build a personalized care plan tailored to your needs.' },
              { n: '03', title: 'Stay Healthy', desc: 'Regular follow-ups and preventive care keep you on track long-term.' },
            ].map((step) => (
              <div key={step.n} className="flex flex-col items-center gap-4 relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sm-navy text-white font-display font-bold text-xl shadow-sm relative z-10">
                  {step.n}
                </div>
                <h3 className="font-display font-bold text-lg text-sm-navy">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave fromColor="#F0F0F2" toColor="white" flip />

      {/* ══════════════════════════════════════════════
          5. FEATURED PROVIDERS
      ══════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <AccentLine />
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-sm-navy">
              Meet Our Providers
            </h2>
            <p className="mt-4 text-gray-500">
              Board-certified physicians dedicated to compassionate, expert care.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {PROVIDERS.map((doc) => (
              <a
                key={doc.name}
                href="/doctor-directory"
                className="group flex flex-col items-center text-center"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-sm-gray mb-3 shadow-sm">
                  <Image
                    src={doc.photo}
                    alt={doc.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                </div>
                <p className="font-semibold text-sm text-sm-navy leading-snug group-hover:text-sm-blue transition-colors">{doc.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{doc.specialty}</p>
                <p className="text-xs text-gray-400">{doc.location}</p>
              </a>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/doctor-directory"
              className="inline-flex items-center justify-center rounded-lg border-2 border-sm-navy text-sm-navy hover:bg-sm-navy hover:text-white transition-colors px-8 py-3 text-sm font-semibold"
            >
              View All 25+ Providers →
            </a>
          </div>
        </div>
      </section>

      <Wave fromColor="white" toColor="#F0F0F2" />

      {/* ══════════════════════════════════════════════
          6. TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="bg-[#F0F0F2]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <AccentLine />
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-sm-navy">
              What Our Patients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 shadow-sm flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-sm-blue" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.376-2.454a1 1 0 00-1.175 0l-3.376 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.288-3.967z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-sm text-sm-navy">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave fromColor="#F0F0F2" toColor="white" flip />

      {/* ══════════════════════════════════════════════
          7. LOCATIONS PREVIEW
      ══════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <AccentLine />
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-sm-navy">
              Find a Location Near You
            </h2>
            <p className="mt-4 text-gray-500">
              15+ convenient locations across the Dallas–Fort Worth Metroplex.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LOCATIONS.map((loc) => (
              <a
                key={loc.name}
                href={loc.href}
                className="group rounded-xl border border-sm-gray p-6 hover:border-sm-blue-light hover:shadow-md transition-all flex flex-col gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sm-blue-card text-sm-navy flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm-navy text-sm group-hover:text-sm-blue transition-colors">{loc.name}</h3>
                    <p className="text-xs text-gray-400">{loc.city}, TX</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{loc.phone}</span>
              </a>
            ))}
            {/* View all card */}
            <a
              href="/find-our-locations"
              className="rounded-xl border-2 border-dashed border-sm-gray p-6 hover:border-sm-blue transition-colors flex flex-col items-center justify-center gap-2 text-center min-h-[120px]"
            >
              <span className="text-sm font-semibold text-sm-navy">View All Locations →</span>
              <span className="text-xs text-gray-400">15+ across DFW</span>
            </a>
          </div>
        </div>
      </section>

      <Wave fromColor="white" toColor="#F0F0F2" />

      {/* ══════════════════════════════════════════════
          8. INSURANCE
      ══════════════════════════════════════════════ */}
      <section className="bg-[#F0F0F2]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <AccentLine />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-sm-navy mb-4">
            We Accept Most Major Insurance
          </h2>
          <p className="text-gray-500 mb-10">
            Don&apos;t see yours? Call us — self-pay options are also available.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {INSURERS.map((name) => (
              <span
                key={name}
                className="rounded-lg border border-sm-gray bg-white px-5 py-2.5 text-sm font-medium text-sm-navy shadow-sm"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-400">
            Medicare, Medicaid, TriCare, and self-pay options accepted.{' '}
            <a href="tel:214-942-3100" className="font-medium text-sm-navy hover:underline">
              Call 214-942-3100
            </a>{' '}
            to verify your coverage.
          </p>
        </div>
      </section>

      <Wave fromColor="#F0F0F2" toColor="white" flip />

      {/* ══════════════════════════════════════════════
          9. FAQ
      ══════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <AccentLine />
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-sm-navy">
              Frequently Asked Questions
            </h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          10. FINAL CTA BANNER
      ══════════════════════════════════════════════ */}
      <section className="bg-sm-navy">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Accent line in white */}
          <div className="w-10 h-[3px] bg-sm-blue-light rounded-full mb-6 mx-auto" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Ready to Take Charge of Your Health?
          </h2>
          <p className="text-white/60 text-lg mb-10">
            Same-day appointments available. Most major insurance accepted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingButton
              size="lg"
              label="Book an Appointment"
              className="inline-flex items-center justify-center rounded-lg bg-white font-semibold text-sm-navy hover:bg-blue-50 transition-colors px-8 py-3.5 text-base shadow-sm"
            />
            <a
              href="tel:214-942-3100"
              className="inline-flex items-center justify-center rounded-lg border border-white/40 text-white hover:bg-white/10 transition-colors px-8 py-3.5 text-base font-medium"
            >
              Call 214-942-3100
            </a>
          </div>
        </div>
      </section>

    </PageWrapper>
  )
}

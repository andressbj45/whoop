import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookingButton } from '@/components/common/BookingButton'

export default function HomePage() {
  return (
    <PageWrapper>
      {/* Shell placeholder — homepage content built in Phase 3 */}
      <section className="bg-sm-warm flex flex-col items-center justify-center py-spacing-section-lg text-center px-4">
        <h1 className="font-display text-5xl font-normal text-sm-navy sm:text-6xl lg:text-7xl">
          Stella Mattina
        </h1>
        <p className="mt-6 max-w-xl text-xl text-sm-navy/70 leading-relaxed">
          Expert women&apos;s health and primary care across 7 DFW locations.
        </p>
        <div className="mt-10">
          <BookingButton size="lg" />
        </div>
      </section>
    </PageWrapper>
  )
}

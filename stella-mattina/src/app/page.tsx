import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookingButton } from '@/components/common/BookingButton'

export default function HomePage() {
  return (
    <PageWrapper>
      {/* Shell placeholder — homepage content built in Phase 3 */}
      <section className="flex flex-col items-center justify-center py-spacing-section-lg text-center px-4">
        <h1 className="font-display text-4xl font-normal text-sm-navy sm:text-5xl lg:text-6xl">
          Stella Mattina
        </h1>
        <p className="mt-4 max-w-xl text-lg text-gray-600">
          Expert women&apos;s health and primary care across 7 DFW locations.
        </p>
        <div className="mt-8">
          <BookingButton size="lg" />
        </div>
      </section>
    </PageWrapper>
  )
}

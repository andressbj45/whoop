import { PageWrapper } from '@/components/layout/PageWrapper'
import { BookingButton } from '@/components/common/BookingButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Us | Stella Mattina Women's Health",
  description: "Stella Mattina is a women's health practice serving the Dallas-Fort Worth area with expert OB-GYN, obstetrics, and primary care services.",
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-4xl text-sm-navy mb-6">About Stella Mattina</h1>
        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:font-display prose-headings:text-sm-navy">
          <p>
            Stella Mattina Women&apos;s Health was founded on a simple belief: every woman deserves exceptional,
            compassionate care that meets her where she is — through every season of life. From adolescence
            through menopause and beyond, our board-certified physicians bring decades of expertise and a genuine
            commitment to your well-being.
          </p>
          <p>
            Our team of OB-GYNs, maternal-fetal medicine specialists, and primary care physicians serves the
            Dallas-Fort Worth area across seven convenient clinic locations. Whether you are navigating a first
            pregnancy, managing a complex condition, or simply prioritizing your annual wellness visit, Stella
            Mattina is your partner in health.
          </p>
          <p>
            We believe that trust is built in the exam room — through listening, through honesty, and through
            care that respects your time and your dignity. That commitment to warm, unhurried medicine is what
            defines the Stella Mattina experience.
          </p>
        </div>
        <div className="mt-10">
          <BookingButton label="Meet Our Team" size="lg" />
        </div>
      </div>
    </PageWrapper>
  )
}

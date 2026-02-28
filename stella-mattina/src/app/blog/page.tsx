import { getBlogPosts, getBlogCategories } from '@/lib/content/blog'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BlogFilter } from '@/components/blog/BlogFilter'
import type { Metadata } from 'next'
import { defaultOgImage } from '@/lib/seo/og'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: "Women's Health Blog | Stella Mattina",
  description: "Expert insights on women's health, obstetrics, gynecology, and primary care from the Stella Mattina team.",
  alternates: { canonical: '/blog' },
  openGraph: {
    title: "Women's Health Blog | Stella Mattina",
    description: "Expert insights on women's health, obstetrics, gynecology, and primary care from the Stella Mattina team.",
    url: '/blog',
    type: 'website',
    images: [defaultOgImage],
  },
}

export default function BlogIndexPage() {
  const posts = getBlogPosts()
  const categories = getBlogCategories()

  return (
    <PageWrapper>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://stellamattina.com' },
        { name: 'Blog', url: 'https://stellamattina.com/blog' },
      ]} />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="font-display text-4xl text-sm-navy mb-4">Women&apos;s Health Blog</h1>
        <p className="text-gray-600 mb-10 max-w-2xl">
          Expert guidance on pregnancy, gynecology, hormone health, and primary care from our team of board-certified physicians.
        </p>
        <BlogFilter posts={posts} categories={categories} />
      </div>
    </PageWrapper>
  )
}

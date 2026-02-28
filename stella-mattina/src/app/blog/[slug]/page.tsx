import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { WithContext, Article } from 'schema-dts'
import { getBlogPosts, getBlogPostBySlug } from '@/lib/content/blog'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { defaultOgImage } from '@/lib/seo/og'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

// Server Component — no 'use client' directive

function renderBlogContent(fullText: string): string[] {
  const lines = fullText.split('\n\n').filter(Boolean)
  // Strip trailing tag cloud: remove lines that are just comma-separated short phrases
  // Heuristic: last paragraph where words > 4 is the end of real content
  const contentEnd = lines.reduce((lastIdx, line, i) => {
    return line.trim().split(' ').length > 4 ? i : lastIdx
  }, 0)
  return lines.slice(0, contentEnd + 1)
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) {
    return { title: 'Post Not Found | Stella Mattina' }
  }

  const title = `${post.heading} | Stella Mattina Blog`
  const description = post.meta_description ?? post.full_text.substring(0, 155)

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/${slug}`,
      type: 'article',
      images: [defaultOgImage],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.heading,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.published_date,
    description: post.meta_description ?? post.full_text.substring(0, 155),
    publisher: {
      '@type': 'Organization',
      name: 'Stella Mattina',
      url: 'https://stellamattina.com',
    },
    url: `https://stellamattina.com/blog/${post.slug}`,
  }

  const paragraphs = renderBlogContent(post.full_text)

  return (
    <PageWrapper>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://stellamattina.com' },
          { name: 'Blog', url: 'https://stellamattina.com/blog' },
          { name: post.heading, url: `https://stellamattina.com/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16">
        <header className="mb-10">
          <h1 className="font-display text-4xl text-sm-navy leading-tight mb-4">
            {post.heading}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>By {post.author}</span>
            <span>·</span>
            <time dateTime={post.published_date}>
              {new Date(post.published_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.categories?.[0] && (
              <>
                <span>·</span>
                <span className="text-sm-blue">{String(post.categories[0])}</span>
              </>
            )}
          </div>
        </header>
        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:font-display prose-headings:text-sm-navy">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
    </PageWrapper>
  )
}

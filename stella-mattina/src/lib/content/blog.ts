import blogData from '../../data/blog_posts.json'
import type { BlogPost } from './types'

const posts = blogData as BlogPost[]

function normalizeCategories(raw: unknown[]): string[] {
  return raw.flatMap((c) => {
    if (typeof c === 'string') return [c]
    if (typeof c === 'object' && c !== null) {
      return Object.values(c as Record<string, string>).filter(Boolean)
    }
    return []
  })
}

export function getBlogPosts(): BlogPost[] {
  // Sort newest first
  return [...posts].sort(
    (a, b) =>
      new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
  )
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getBlogPostSlugs(): string[] {
  return posts.map((p) => p.slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  const normalized = category.toLowerCase()
  return getBlogPosts().filter((p) =>
    normalizeCategories(p.categories as unknown[])
      .map((c) => c.toLowerCase())
      .includes(normalized)
  )
}

export function getBlogCategories(): string[] {
  const all = posts.flatMap((p) => normalizeCategories(p.categories as unknown[]))
  return [...new Set(all)].sort()
}

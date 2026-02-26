import blogData from '../../data/blog_posts.json'
import type { BlogPost } from './types'

const posts = blogData as BlogPost[]

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
    p.categories.map((c) => c.toLowerCase()).includes(normalized)
  )
}

export function getBlogCategories(): string[] {
  const all = posts.flatMap((p) => p.categories)
  return [...new Set(all)].sort()
}

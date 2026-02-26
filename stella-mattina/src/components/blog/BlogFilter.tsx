'use client'
import { useState } from 'react'
import type { BlogPost } from '@/lib/content/types'

interface Props {
  posts: BlogPost[]
  categories: string[]
}

export function BlogFilter({ posts, categories }: Props) {
  const [active, setActive] = useState<string | null>(null)
  const filtered = active
    ? posts.filter((p) => {
        const cats = Array.isArray(p.categories)
          ? p.categories.map((c) => typeof c === 'string' ? c : Object.values(c as Record<string, string>).join(' '))
          : []
        return cats.some((c) => c.toLowerCase() === active.toLowerCase())
      })
    : posts

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !active ? 'bg-sm-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Posts
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat === active ? null : cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              active === cat ? 'bg-sm-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post list */}
      <div className="space-y-6">
        {filtered.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block border border-gray-200 rounded-xl p-6 hover:border-sm-blue hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl text-sm-navy hover:text-sm-blue transition-colors">
                  {post.heading}
                </h2>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>·</span>
                  <time dateTime={post.published_date}>
                    {new Date(post.published_date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </time>
                </div>
              </div>
              {Array.isArray(post.categories) && typeof post.categories[0] === 'string' && (
                <span className="shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-sm-blue">
                  {String(post.categories[0])}
                </span>
              )}
            </div>
            {post.meta_description && (
              <p className="mt-3 text-gray-600 text-sm line-clamp-2">{post.meta_description}</p>
            )}
          </a>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-400 text-right">{filtered.length} post{filtered.length !== 1 ? 's' : ''}</p>
    </>
  )
}

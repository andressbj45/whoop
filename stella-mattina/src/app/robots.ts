import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['ChatGPT-User', 'GPTBot', 'OAI-SearchBot'],
        allow: '/',
      },
      {
        userAgent: ['PerplexityBot', 'Perplexity-User'],
        allow: '/',
      },
      {
        userAgent: ['Googlebot', 'Google-Extended'],
        allow: '/',
      },
      {
        userAgent: ['ClaudeBot', 'anthropic-ai'],
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: 'https://stellamattina.com/sitemap.xml',
  }
}

// Server Component — no 'use client' directive needed, breadcrumb JSON-LD requires no client JS

type BreadcrumbItem = {
  name: string
  url: string
}

type Props = {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: Props) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

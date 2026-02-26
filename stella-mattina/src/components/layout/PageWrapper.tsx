// Server Component — wraps all pages in the consistent header/footer shell.
import { Header } from './Header'
import { Footer } from './Footer'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={`flex-1 ${className ?? ''}`}>{children}</main>
      <Footer />
    </div>
  )
}

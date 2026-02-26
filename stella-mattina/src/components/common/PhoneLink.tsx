// Server component — formats and renders a tel: link.
interface PhoneLinkProps {
  phone: string
  className?: string
}

export function PhoneLink({ phone, className }: PhoneLinkProps) {
  // Format tel: href — strip non-digits
  const digits = phone.replace(/\D/g, '')
  const href = `tel:+1${digits}`

  return (
    <a href={href} className={className ?? 'hover:text-sm-blue transition-colors'}>
      {phone}
    </a>
  )
}

// Server component — no 'use client' needed. Pure link.
const BOOKING_URL =
  'https://mycw160.ecwcloud.com/portal22103/jsp/100mp/login_otp.jsp'

interface BookingButtonProps {
  label?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function BookingButton({
  label = 'Book Now',
  className,
  size = 'md',
}: BookingButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        `inline-flex items-center justify-center rounded-md bg-sm-navy font-semibold text-white hover:bg-sm-blue-hover transition-colors ${sizeClasses[size]}`
      }
    >
      {label}
    </a>
  )
}

import Link from 'next/link'
import { useLocale } from 'next-intl'

export function Logo() {
  const locale = useLocale()

  return (
    <Link
      href={`/${locale}`}
      className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DB6A0] focus-visible:ring-offset-2 rounded"
      aria-label="Soluty - Home"
    >
      {/* Logo Icon */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-8 h-8 md:w-9 md:h-9"
      >
        {/* Stylized S shape representing flow/connection */}
        <rect width="32" height="32" rx="8" fill="#4DB6A0" />
        <path
          d="M10 12C10 10.8954 10.8954 10 12 10H16C18.2091 10 20 11.7909 20 14C20 16.2091 18.2091 18 16 18H14C12.8954 18 12 18.8954 12 20V20C12 21.1046 12.8954 22 14 22H20"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Wordmark - hidden on mobile, visible on md+ */}
      <span className="hidden md:block text-xl font-semibold text-[#2D3436] tracking-tight">
        SOLUTY
      </span>
    </Link>
  )
}

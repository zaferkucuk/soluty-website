'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'

export function Logo() {
  const locale = useLocale()

  return (
    <Link
      href={`/${locale}`}
      className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DB6A0] focus-visible:ring-offset-2 rounded"
      aria-label="Soluty - Home"
    >
      {/* Logo Icon - Stylized S flow/path matching brand */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-9 h-9 md:w-10 md:h-10"
      >
        {/* Rounded rectangle background */}
        <rect width="100" height="100" rx="18" fill="#4DB6A0" />
        
        {/* Stylized S path - smooth flowing curve like a road */}
        <path
          d="M32 25
             C42 25, 68 25, 68 42
             C68 55, 50 58, 40 60
             C30 62, 32 75, 32 75
             C32 88, 58 88, 68 78"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* Wordmark - hidden on mobile, visible on md+ */}
      <span 
        className="hidden md:block text-[22px] font-medium tracking-[0.12em] text-[#414141]"
      >
        SOLUTY
      </span>
    </Link>
  )
}

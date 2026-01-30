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
      {/* Logo Icon - Exact brand logo from PDF */}
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
        <rect width="100" height="100" rx="12" fill="#5BC494" />
        
        {/* Exact S-curve path from brand logo */}
        <path
          d="M 72.5 5
             C 79.5 8.5 82.5 15.5 84 19.5
             C 84.5 20.5 84.5 21 84.5 21.5
             C 83 25.5 70.5 22.5 56.5 25.5
             C 54.5 26 37 29.5 36.5 35.5
             C 36 43.5 66 54 69 55
             C 77 58 85 60 92 67.5
             C 94.5 70 96 72.5 97 75
             C 97 75 98.5 81 96 88
             C 92.5 98.5 77 109 59 115.5
             C 49 119 31 124 7.5 121.5
             C 10 120.5 13.5 119 17.5 117
             C 25.5 113 79 87 76 74.5
             C 73 63 23 71 16 51.5
             C 15.5 50 15.5 49 15.5 48
             C 13 32.5 32.5 18.5 36.5 15.5
             C 42 12 60 0 72.5 5"
          fill="white"
          transform="translate(2, 0) scale(0.95)"
        />
      </svg>

      {/* Wordmark - hidden on mobile, visible on md+ */}
      <span 
        className="hidden md:block text-[22px] font-medium tracking-[0.12em] text-[#1a1a1a]"
      >
        SOLUTY
      </span>
    </Link>
  )
}

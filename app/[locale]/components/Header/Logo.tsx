'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'

export function Logo() {
  const locale = useLocale()

  return (
    <Link
      href={`/${locale}`}
      className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DB6A0] focus-visible:ring-offset-2 rounded"
      aria-label="Soluty - Home"
    >
      {/* Logo Icon */}
      <Image
        src="/soluty-icon.svg"
        alt=""
        width={40}
        height={40}
        className="w-9 h-9 md:w-10 md:h-10"
        priority
      />

      {/* Wordmark - hidden on mobile, visible on md+ */}
      <span 
        className="hidden md:block text-[22px] font-medium tracking-[0.12em] text-[#1a1a1a]"
      >
        SOLUTY
      </span>
    </Link>
  )
}

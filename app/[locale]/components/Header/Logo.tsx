'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'

export function Logo() {
  const locale = useLocale()

  return (
    <Link
      href={`/${locale}`}
      className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 rounded"
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

      {/* Wordmark - DM Sans font */}
      <span 
        className="
          hidden md:block 
          text-[22px] font-semibold tracking-[0.08em]
          font-[var(--font-sans)]
          text-[var(--color-text-primary)]
        "
      >
        SOLUTY
      </span>
    </Link>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'

// Font constant for inline styles (Tailwind v4 CSS variable workaround)
const FONTS = {
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
}

export function Logo() {
  const locale = useLocale()

  return (
    <Link
      href={`/${locale}`}
      className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 rounded"
      aria-label="Soluty - Home"
    >
      {/* Logo Icon - increased by 20% */}
      <Image
        src="/soluty-icon.svg"
        alt=""
        width={48}
        height={48}
        className="w-11 h-11 md:w-12 md:h-12"
        priority
      />

      {/* Wordmark - DM Sans font, increased by 20% (22px → 26px) */}
      <span 
        className="hidden md:block font-semibold tracking-[0.08em]"
        style={{
          fontFamily: FONTS.sans,
          fontSize: '26px',
          color: '#32302F',
        }}
      >
        SOLUTY
      </span>
    </Link>
  )
}

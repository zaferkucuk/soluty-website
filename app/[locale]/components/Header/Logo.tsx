'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'

export function Logo() {
  const locale = useLocale()

  return (
    <Link
      href={`/${locale}`}
      className="inline-flex items-center gap-2 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 rounded"
      aria-label="Soluty Business Solutions - Home"
    >
      <Image
        src="/images/logo-icon.svg"
        alt="Soluty"
        width={100}
        height={100}
        className="h-10 sm:h-14 md:h-16 w-auto"
        priority
      />
      <div className="flex flex-col items-center leading-tight">
        <span
          style={{
            fontFamily: "'Crimson Pro', Georgia, 'Times New Roman', serif",
            fontWeight: 400,
            color: '#32302F',
            letterSpacing: '0.18em',
          }}
          className="text-[18px] sm:text-[26px]"
        >
          SOLUTY
        </span>
        {/* "BUSINESS SOLUTIONS" hidden on mobile, visible from sm+ */}
        <span
          style={{
            fontFamily: "'Crimson Pro', Georgia, 'Times New Roman', serif",
            fontSize: '13px',
            fontWeight: 400,
            color: '#32302F',
          }}
          className="hidden sm:block"
        >
          BUSINESS SOLUTIONS
        </span>
      </div>
    </Link>
  )
}

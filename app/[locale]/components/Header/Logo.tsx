'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'

export function Logo() {
  const locale = useLocale()

  return (
    <Link
      href={`/${locale}`}
      className="inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 rounded"
      aria-label="Soluty Business Solutions - Home"
    >
      <Image
        src="/images/logo-icon.svg"
        alt="Soluty"
        width={100}
        height={100}
        className="h-14 md:h-16 w-auto"
        priority
      />
      <div className="flex flex-col leading-tight">
        <span
          style={{
            fontFamily: "'Crimson Pro', Georgia, 'Times New Roman', serif",
            fontSize: '24px',
            fontWeight: 400,
            color: '#32302F',
            letterSpacing: '0.16em',
          }}
        >
          SOLUTY
        </span>
        <span
          style={{
            fontFamily: "'Crimson Pro', Georgia, 'Times New Roman', serif",
            fontSize: '15px',
            fontWeight: 400,
            color: '#32302F',
          }}
        >
          BUSINESS SOLUTIONS
        </span>
      </div>
    </Link>
  )
}

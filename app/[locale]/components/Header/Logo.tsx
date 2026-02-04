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
      {/* Logo icon only */}
      <Image
        src="/images/logo-icon.svg"
        alt=""
        width={48}
        height={48}
        className="w-10 h-10 md:w-12 md:h-12"
        priority
      />
      {/* Company name — Crimson Pro (hero font), nav-link size */}
      <div className="flex flex-col leading-tight">
        <span
          style={{
            fontFamily: "'Crimson Pro', Georgia, 'Times New Roman', serif",
            fontSize: '16px',
            fontWeight: 600,
            color: '#1a1a1a',
            letterSpacing: '0.04em',
          }}
        >
          SOLUTY
        </span>
        <span
          style={{
            fontFamily: "'Crimson Pro', Georgia, 'Times New Roman', serif",
            fontSize: '12px',
            fontWeight: 400,
            color: '#555555',
            letterSpacing: '0.06em',
          }}
        >
          BUSINESS SOLUTIONS
        </span>
      </div>
    </Link>
  )
}

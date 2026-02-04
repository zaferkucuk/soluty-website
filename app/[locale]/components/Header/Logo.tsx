'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'

export function Logo() {
  const locale = useLocale()

  return (
    <Link
      href={`/${locale}`}
      className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 rounded"
      aria-label="Soluty Business Solutions - Home"
    >
      {/* Full logo SVG: icon + SOLUTY + Business Solutions */}
      <Image
        src="/images/logo-full.svg"
        alt="Soluty Business Solutions"
        width={200}
        height={80}
        className="h-10 md:h-12 w-auto"
        priority
      />
    </Link>
  )
}

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
      <Image
        src="/images/logo-full.svg"
        alt="Soluty Business Solutions"
        width={250}
        height={100}
        className="h-14 md:h-16 w-auto"
        priority
      />
    </Link>
  )
}

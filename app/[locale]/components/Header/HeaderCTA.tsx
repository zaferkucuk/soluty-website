'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

interface HeaderCTAProps {
  className?: string
  variant?: 'default' | 'mobile'
}

export function HeaderCTA({ className = '', variant = 'default' }: HeaderCTAProps) {
  const t = useTranslations('header')
  const locale = useLocale()

  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold text-white
    bg-[#4DB6A0] hover:bg-[#3DA08C]
    rounded-lg
    transition-colors duration-200
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DB6A0] focus-visible:ring-offset-2
  `

  const sizeStyles = variant === 'mobile'
    ? 'px-4 py-2 text-sm'
    : 'px-4 py-2 text-sm lg:px-5 lg:py-2.5 lg:text-base'

  return (
    <Link
      href={`/${locale}#contact`}
      className={`${baseStyles} ${sizeStyles} ${className}`}
    >
      {variant === 'mobile' ? (
        // Shorter text on mobile header
        <span className="lg:hidden">{t('cta')}</span>
      ) : (
        t('cta')
      )}
      {variant === 'default' && (
        <span className="hidden lg:inline">{t('cta')}</span>
      )}
    </Link>
  )
}

// Simpler version for consistent display
export function HeaderCTASimple({ className = '' }: { className?: string }) {
  const t = useTranslations('header')
  const locale = useLocale()

  return (
    <Link
      href={`/${locale}#contact`}
      className={`
        inline-flex items-center justify-center
        px-4 py-2 text-sm font-semibold text-white
        bg-[#4DB6A0] hover:bg-[#3DA08C]
        rounded-lg
        transition-colors duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DB6A0] focus-visible:ring-offset-2
        whitespace-nowrap
        ${className}
      `}
    >
      {t('cta')}
    </Link>
  )
}

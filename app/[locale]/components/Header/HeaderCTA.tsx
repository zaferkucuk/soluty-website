'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

// Brand colors (matching CSS variables)
const COLORS = {
  brandPrimary: '#4DB6A0',
  brandHover: '#3DA08C',
  textSecondary: '#5C5A58',
}

export function HeaderButtons() {
  const t = useTranslations('header')
  const locale = useLocale()

  return (
    <div className="flex items-center gap-2 lg:gap-3">
      {/* Login Button - Ghost style */}
      <Link
        href={`/${locale}/login`}
        className="
          hidden sm:inline-flex items-center justify-center
          px-3 py-1.5 lg:px-4 lg:py-2
          text-base font-medium
          rounded-full
          transition-colors duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        "
        style={{
          color: COLORS.textSecondary,
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = COLORS.brandPrimary}
        onMouseLeave={(e) => e.currentTarget.style.color = COLORS.textSecondary}
      >
        {t('login')}
      </Link>

      {/* Contact Button - Primary style (Soluty brand color) */}
      <Link
        href={`/${locale}#contact`}
        className="
          inline-flex items-center justify-center
          px-4 py-2 lg:px-5 lg:py-2.5
          text-[15px] font-medium text-white
          rounded-full
          transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          whitespace-nowrap
        "
        style={{
          backgroundColor: COLORS.brandPrimary,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.brandHover
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(77,182,160,0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.brandPrimary
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {t('contact')}
        <svg 
          className="ml-1.5 w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M17 8l4 4m0 0l-4 4m4-4H3" 
          />
        </svg>
      </Link>
    </div>
  )
}

// Legacy exports for compatibility
export function HeaderCTA({ className = '' }: { className?: string }) {
  return <HeaderButtons />
}

export function HeaderCTASimple({ className = '' }: { className?: string }) {
  return <HeaderButtons />
}

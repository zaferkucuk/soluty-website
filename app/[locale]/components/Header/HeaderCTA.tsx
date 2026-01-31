'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

// ==========================================================================
// Stripe-style Header Buttons
// ==========================================================================

export function HeaderButtons() {
  const t = useTranslations('header')
  const locale = useLocale()

  return (
    <div className="flex items-center gap-2 lg:gap-3">
      {/* Login Button - Ghost style (Stripe-inspired) */}
      <Link
        href={`/${locale}/login`}
        className="
          hidden sm:inline-flex items-center justify-center
          px-3 py-1.5 lg:px-4 lg:py-2
          text-sm font-medium
          text-[#0a2540] hover:text-[#635bff]
          rounded-full
          transition-colors duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#635bff] focus-visible:ring-offset-2
        "
      >
        {t('login')}
      </Link>

      {/* Contact Button - Primary style (Stripe-inspired) */}
      <Link
        href={`/${locale}#contact`}
        className="
          inline-flex items-center justify-center
          px-3 py-1.5 lg:px-4 lg:py-2
          text-sm font-medium text-white
          bg-[#635bff] hover:bg-[#5851ea]
          rounded-full
          transition-colors duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#635bff] focus-visible:ring-offset-2
          whitespace-nowrap
        "
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

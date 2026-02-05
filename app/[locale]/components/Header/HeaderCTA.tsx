'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Button } from '../ui/Button'

// Arrow icon component
const ArrowIcon = () => (
  <svg 
    className="w-4 h-4" 
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
)

export function HeaderButtons() {
  const t = useTranslations('header')
  const locale = useLocale()

  return (
    <div className="flex items-center gap-2 lg:gap-3">
      {/* Login Button - Secondary style (Wealthsimple "Log in") */}
      <Button
        as="link"
        href={`/${locale}/login`}
        variant="secondary"
        size="sm"
        className="hidden sm:inline-flex"
      >
        {t('login')}
      </Button>

      {/* Contact Button - Primary style (Wealthsimple "Get started") */}
      <Button
        as="link"
        href={`/${locale}#contact`}
        variant="brand"
        size="sm"
        icon={<ArrowIcon />}
      >
        {t('contact')}
      </Button>
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

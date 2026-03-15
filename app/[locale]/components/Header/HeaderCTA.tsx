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
      {/* Contact Button - Secondary style (transparent/bordered), hidden on mobile */}
      <Button
        as="link"
        href={`/${locale}#contact`}
        variant="secondary"
        size="sm"
        icon={<ArrowIcon />}
        className="hidden sm:inline-flex"
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

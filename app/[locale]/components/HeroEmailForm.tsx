'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textMuted: '#8A8785',
  brandPrimary: '#4DB6A0',
  brandHover: '#3DA08C',
  borderStrong: 'rgba(50, 48, 47, 0.25)',
}

export function HeroEmailForm() {
  const t = useTranslations('hero')
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative flex-1 max-w-md">
      <input
        type="email"
        placeholder={t('emailPlaceholder')}
        className="
          w-full h-14 px-5 pr-36
          text-base
          bg-white
          rounded-full
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-0
        "
        style={{
          color: COLORS.textPrimary,
          border: `1px solid ${COLORS.borderStrong}`,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = COLORS.brandPrimary
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = COLORS.borderStrong
        }}
      />
      {/* Submit Button inside input */}
      <button
        type="button"
        className="
          absolute right-2 top-1/2 -translate-y-1/2
          inline-flex h-10 items-center justify-center gap-2
          rounded-full px-5
          text-white font-medium text-sm
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
        "
        style={{ 
          backgroundColor: isHovered ? COLORS.brandHover : COLORS.brandPrimary,
          transform: isHovered ? 'translateY(-50%) translateY(-1px)' : 'translateY(-50%)',
          boxShadow: isHovered ? '0 4px 12px rgba(77, 182, 160, 0.3)' : 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {t('cta.submit')}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  )
}

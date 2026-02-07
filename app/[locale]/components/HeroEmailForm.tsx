'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

// Design tokens (matching globals.css)
const COLORS = {
  textPrimary: '#32302F',
  textInverse: '#FFFFFF',
  textMuted: '#8A8785',
  bgInverse: '#32302F',
  bgInverseHover: '#4A4745',
  borderStrong: 'rgba(50, 48, 47, 0.25)',
}

export function HeroEmailForm() {
  const t = useTranslations('hero')
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <form 
      className="relative w-full max-w-md"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Email Input */}
      <input
        type="email"
        placeholder={t('emailPlaceholder')}
        className="
          w-full h-14
          pl-5 pr-44
          text-base
          bg-white
          rounded-full
          transition-all duration-200
          focus:outline-none
        "
        style={{
          color: COLORS.textPrimary,
          border: `1px solid ${isFocused ? COLORS.bgInverse : COLORS.borderStrong}`,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {/* Submit Button - positioned inside input */}
      <button
        type="submit"
        className="
          absolute right-1.5 top-1/2
          inline-flex h-11 items-center justify-center gap-2
          rounded-full px-6
          font-medium text-sm
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#32302F]
        "
        style={{
          backgroundColor: isHovered ? COLORS.bgInverseHover : COLORS.bgInverse,
          color: COLORS.textInverse,
          transform: `translateY(-50%)${isHovered ? ' translateY(-1px)' : ''}`,
          boxShadow: isHovered ? '0 4px 12px rgba(50, 48, 47, 0.25)' : 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {t('cta.submit')}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </form>
  )
}

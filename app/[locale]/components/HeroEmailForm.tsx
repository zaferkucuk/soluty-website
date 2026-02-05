'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

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
          color: 'var(--color-text-primary)',
          border: `1px solid ${isFocused ? 'var(--color-brand-primary)' : 'var(--color-border-strong)'}`,
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
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4DB6A0]
        "
        style={{ 
          backgroundColor: isHovered ? 'var(--color-bg-dark-hover)' : 'var(--color-bg-dark)',
          color: 'var(--color-text-inverse)',
          transform: `translateY(-50%)${isHovered ? ' translateY(-1px)' : ''}`,
          boxShadow: isHovered ? '0 4px 12px rgba(15, 42, 57, 0.3)' : 'none',
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

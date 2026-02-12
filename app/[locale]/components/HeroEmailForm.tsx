'use client'

import { useTranslations } from 'next-intl'
import { useState, useRef, useCallback } from 'react'

// Design tokens (matching globals.css)
const COLORS = {
  textPrimary: '#32302F',
  textInverse: '#FFFFFF',
  textMuted: '#8A8785',
  bgInverse: '#32302F',
  bgInverseHover: '#4A4745',
  borderStrong: 'rgba(50, 48, 47, 0.25)',
  error: '#DC2626',
  errorBorder: 'rgba(220, 38, 38, 0.5)',
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function HeroEmailForm() {
  const t = useTranslations('hero')
  const tValidation = useTranslations('finalCta.validation')

  const [email, setEmail] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showInlineError = useCallback((message: string) => {
    // Clear any existing timeout
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current)
    }

    setEmail('')
    setErrorMessage(message)

    // Revert to normal state after 3 seconds
    errorTimeoutRef.current = setTimeout(() => {
      setErrorMessage(null)
      errorTimeoutRef.current = null
    }, 3000)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmed = email.trim()

    // Validate: empty
    if (!trimmed) {
      showInlineError(tValidation('emailRequired'))
      inputRef.current?.focus()
      return
    }

    // Validate: format
    if (!isValidEmail(trimmed)) {
      showInlineError(tValidation('emailInvalid'))
      inputRef.current?.focus()
      return
    }

    // Valid — dispatch custom event for ContactForm to pick up
    window.dispatchEvent(
      new CustomEvent('hero-email-submit', { detail: { email: trimmed } })
    )

    // Smooth scroll to contact section
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

    // Clear input
    setEmail('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If user starts typing while error is shown, clear the error
    if (errorMessage) {
      setErrorMessage(null)
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current)
        errorTimeoutRef.current = null
      }
    }
    setEmail(e.target.value)
  }

  const isErrorState = errorMessage !== null
  const placeholderText = isErrorState ? errorMessage : t('emailPlaceholder')

  // Border color: error > focused > default
  const borderColor = isErrorState
    ? COLORS.errorBorder
    : isFocused
      ? COLORS.bgInverse
      : COLORS.borderStrong

  return (
    <form
      className="relative w-full max-w-md"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Email Input */}
      <input
        ref={inputRef}
        type="email"
        value={email}
        onChange={handleInputChange}
        placeholder={placeholderText}
        aria-label={t('emailPlaceholder')}
        aria-invalid={isErrorState}
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
          border: `1px solid ${borderColor}`,
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

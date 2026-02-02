'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition, useState } from 'react'

// Design tokens
const FONTS = {
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
}

const COLORS = {
  textPrimary: '#32302F',
  textMuted: '#8A8785',
  brandPrimary: '#4DB6A0',
  borderStrong: 'rgba(50, 48, 47, 0.25)',
}

const locales = ['de', 'en'] as const
type Locale = typeof locales[number]

function LocaleButton({ 
  locale, 
  isActive, 
  isPending,
  onClick,
  label,
}: { 
  locale: Locale
  isActive: boolean
  isPending: boolean
  onClick: () => void
  label: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className="px-2 py-1 rounded transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-1"
      style={{
        fontFamily: FONTS.sans,
        fontSize: '18px',
        fontWeight: isActive ? 600 : 500,
        color: isActive 
          ? COLORS.textPrimary 
          : isHovered 
            ? COLORS.brandPrimary 
            : COLORS.textMuted,
        opacity: isPending ? 0.5 : 1,
        cursor: isPending ? 'wait' : 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-pressed={isActive}
      aria-label={`Switch to ${locale.toUpperCase()}`}
    >
      {label}
    </button>
  )
}

export function LanguageSwitcher() {
  const t = useTranslations('header.languageSwitcher')
  const currentLocale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return

    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    startTransition(() => {
      router.replace(newPath)
    })
  }

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="flex items-center gap-1"
      style={{ fontFamily: FONTS.sans, fontSize: '18px' }}
    >
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          <LocaleButton
            locale={locale}
            isActive={currentLocale === locale}
            isPending={isPending}
            onClick={() => handleLocaleChange(locale)}
            label={t(locale)}
          />
          {index < locales.length - 1 && (
            <span 
              className="mx-1" 
              style={{ color: COLORS.borderStrong }}
              aria-hidden="true"
            >
              |
            </span>
          )}
        </span>
      ))}
    </div>
  )
}

'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition, useState } from 'react'

// Design tokens
const COLORS = {
  brandPrimary: '#4DB6A0',
  borderStrong: 'rgba(50, 48, 47, 0.15)',
}

const locales = ['de', 'en'] as const
type Locale = typeof locales[number]

// Circular flag SVG components
function GermanyFlag({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <clipPath id="deCircle"><circle cx="16" cy="16" r="16" /></clipPath>
      <g clipPath="url(#deCircle)">
        <rect y="0" width="32" height="10.67" fill="#000000" />
        <rect y="10.67" width="32" height="10.66" fill="#DD0000" />
        <rect y="21.33" width="32" height="10.67" fill="#FFCC00" />
      </g>
    </svg>
  )
}

function UKFlag({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <clipPath id="ukCircle"><circle cx="16" cy="16" r="16" /></clipPath>
      <g clipPath="url(#ukCircle)">
        <rect width="32" height="32" fill="#012169" />
        <path d="M0 0L32 32M32 0L0 32" stroke="#fff" strokeWidth="5.5" />
        <path d="M0 0L32 32M32 0L0 32" stroke="#C8102E" strokeWidth="3.5" />
        <path d="M16 0V32M0 16H32" stroke="#fff" strokeWidth="9" />
        <path d="M16 0V32M0 16H32" stroke="#C8102E" strokeWidth="5.5" />
      </g>
    </svg>
  )
}

const flagComponents: Record<Locale, React.FC<{ size?: number }>> = {
  de: GermanyFlag,
  en: UKFlag,
}

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
  const FlagIcon = flagComponents[locale]

  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className="relative rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2"
      style={{
        width: 28,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isActive ? 1 : isHovered ? 0.8 : 0.4,
        cursor: isPending ? 'wait' : 'pointer',
        transform: isHovered && !isActive ? 'scale(1.08)' : 'scale(1)',
        boxShadow: isActive ? `0 0 0 2px ${COLORS.borderStrong}` : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-pressed={isActive}
      aria-label={label}
    >
      <FlagIcon size={28} />
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
      className="flex items-center gap-2"
    >
      {locales.map((locale) => (
        <LocaleButton
          key={locale}
          locale={locale}
          isActive={currentLocale === locale}
          isPending={isPending}
          onClick={() => handleLocaleChange(locale)}
          label={`Switch to ${locale.toUpperCase()}`}
        />
      ))}
    </div>
  )
}

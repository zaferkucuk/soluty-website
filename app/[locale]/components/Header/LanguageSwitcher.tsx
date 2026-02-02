'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition, useState } from 'react'

// Design tokens
const COLORS = {
  brandPrimary: '#4DB6A0',
  borderStrong: 'rgba(50, 48, 47, 0.25)',
}

const locales = ['de', 'en'] as const
type Locale = typeof locales[number]

// Flag SVG components — inline to avoid external dependencies
function GermanyFlag({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect y="0" width="64" height="21.3" rx="4" ry="4" fill="#000000" />
      <rect y="21.3" width="64" height="21.4" fill="#DD0000" />
      <rect y="42.7" width="64" height="21.3" rx="4" ry="4" fill="#FFCC00" />
    </svg>
  )
}

function UKFlag({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <clipPath id="ukClip"><rect width="64" height="64" rx="4" /></clipPath>
      <g clipPath="url(#ukClip)">
        <rect width="64" height="64" fill="#012169" />
        <path d="M0 0L64 64M64 0L0 64" stroke="#fff" strokeWidth="10" />
        <path d="M0 0L64 64M64 0L0 64" stroke="#C8102E" strokeWidth="6" />
        <path d="M32 0V64M0 32H64" stroke="#fff" strokeWidth="16" />
        <path d="M32 0V64M0 32H64" stroke="#C8102E" strokeWidth="10" />
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
      className="p-1.5 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-1"
      style={{
        opacity: isActive ? 1 : isHovered ? 0.85 : 0.5,
        cursor: isPending ? 'wait' : 'pointer',
        transform: isHovered && !isActive ? 'scale(1.1)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-pressed={isActive}
      aria-label={label}
    >
      <FlagIcon size={22} />
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
      className="flex items-center gap-0.5"
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

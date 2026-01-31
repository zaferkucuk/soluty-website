'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

const locales = ['de', 'en'] as const
type Locale = typeof locales[number]

export function LanguageSwitcher() {
  const t = useTranslations('header.languageSwitcher')
  const currentLocale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return

    // Replace the locale segment in the pathname
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
      className="flex items-center gap-1 text-base font-[var(--font-sans)]"
    >
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          <button
            onClick={() => handleLocaleChange(locale)}
            disabled={isPending}
            className={`
              px-1.5 py-0.5 rounded transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-1
              ${currentLocale === locale
                ? 'text-[var(--color-text-primary)] font-semibold'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] font-medium'
              }
              ${isPending ? 'opacity-50 cursor-wait' : ''}
            `}
            aria-pressed={currentLocale === locale}
            aria-label={`Switch to ${locale.toUpperCase()}`}
          >
            {t(locale)}
          </button>
          {index < locales.length - 1 && (
            <span className="text-[var(--color-border-strong)] mx-0.5" aria-hidden="true">|</span>
          )}
        </span>
      ))}
    </div>
  )
}

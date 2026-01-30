'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

const locales = ['de', 'en', 'tr'] as const
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
      className="flex items-center gap-1 text-sm"
    >
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          <button
            onClick={() => handleLocaleChange(locale)}
            disabled={isPending}
            className={`
              px-1 py-0.5 rounded transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4DB6A0] focus-visible:ring-offset-1
              ${currentLocale === locale
                ? 'text-[#2D3436] font-semibold'
                : 'text-[#636E72] hover:text-[#4DB6A0] font-normal'
              }
              ${isPending ? 'opacity-50 cursor-wait' : ''}
            `}
            aria-pressed={currentLocale === locale}
            aria-label={`Switch to ${locale.toUpperCase()}`}
          >
            {t(locale)}
          </button>
          {index < locales.length - 1 && (
            <span className="text-[#E0E0E0] mx-0.5" aria-hidden="true">|</span>
          )}
        </span>
      ))}
    </div>
  )
}

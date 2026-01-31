'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

interface NavItem {
  key: string
  href: string
}

const navItems: NavItem[] = [
  { key: 'services', href: '#services' },
  { key: 'references', href: '#references' },
  { key: 'contact', href: '#contact' },
]

export function Navigation() {
  const t = useTranslations('header.nav')
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
      {navItems.map((item) => {
        const href = `/${locale}${item.href}`
        const isActive = pathname === href || pathname.endsWith(item.href)

        return (
          <Link
            key={item.key}
            href={href}
            className={`
              text-base font-normal transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#635bff] focus-visible:ring-offset-2 rounded
              ${isActive 
                ? 'text-[#0a2540] font-medium' 
                : 'text-[#425466] hover:text-[#635bff]'
              }
            `}
            {...(isActive && { 'aria-current': 'page' })}
          >
            {t(item.key)}
          </Link>
        )
      })}
    </nav>
  )
}

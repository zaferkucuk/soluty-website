'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

// Design tokens
const FONTS = {
  serif: "'Crimson Pro', Georgia, 'Times New Roman', serif",
}

const COLORS = {
  textPrimary: '#32302F',
  brandPrimary: '#4DB6A0',
}

interface NavItem {
  key: string
  href: string
}

const navItems: NavItem[] = [
  { key: 'services', href: '#services' },
  { key: 'references', href: '#references' },
  { key: 'contact', href: '#contact' },
]

function NavLink({ item, isActive, children }: { item: NavItem; isActive: boolean; children: React.ReactNode }) {
  const locale = useLocale()
  const href = `/${locale}${item.href}`
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className="transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 rounded"
      style={{
        fontFamily: FONTS.serif,
        fontSize: '92px',
        fontWeight: 400,
        color: isHovered 
          ? COLORS.brandPrimary 
          : COLORS.textPrimary,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...(isActive && { 'aria-current': 'page' })}
    >
      {children}
    </Link>
  )
}

export function Navigation() {
  const t = useTranslations('header.nav')
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-10">
      {navItems.map((item) => {
        const href = `/${locale}${item.href}`
        const isActive = pathname === href || pathname.endsWith(item.href)

        return (
          <NavLink key={item.key} item={item} isActive={isActive}>
            {t(item.key)}
          </NavLink>
        )
      })}
    </nav>
  )
}

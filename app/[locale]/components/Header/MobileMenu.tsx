'use client'

import { useEffect, useRef } from 'react'
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

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('header.nav')
  const locale = useLocale()
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Focus trap and escape key handling
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Focus first link when menu opens
    firstLinkRef.current?.focus()

    document.addEventListener('keydown', handleEscape)
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className="
          fixed top-16 left-0 right-0
          bg-white
          border-t border-[var(--color-border)]
          shadow-[var(--shadow-lg)]
          z-50
          lg:hidden
          animate-in slide-in-from-top-2 duration-200
        "
      >
        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {navItems.map((item, index) => {
              const href = `/${locale}${item.href}`
              const isActive = pathname === href || pathname.endsWith(item.href)

              return (
                <li key={item.key}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={href}
                    onClick={onClose}
                    className={`
                      block py-3 px-4
                      text-lg font-medium
                      font-[var(--font-sans)]
                      rounded-lg
                      transition-colors duration-200
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-inset
                      ${isActive
                        ? 'text-[var(--color-brand-primary)] bg-[var(--color-brand-subtle)] font-semibold'
                        : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-brand-primary)]'
                      }
                    `}
                    {...(isActive && { 'aria-current': 'page' })}
                  >
                    {t(item.key)}
                  </Link>
                  {index < navItems.length - 1 && (
                    <div className="border-b border-[var(--color-divider)] mx-4" aria-hidden="true" />
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

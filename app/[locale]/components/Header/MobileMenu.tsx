'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

// Design tokens
const FONTS = {
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
}

const COLORS = {
  textPrimary: '#32302F',
  brandPrimary: '#4DB6A0',
  brandSubtle: 'rgba(77, 182, 160, 0.1)',
  bgSecondary: '#F7F6F5',
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

function MobileNavLink({ 
  item, 
  isActive, 
  onClick, 
  linkRef,
  children,
}: { 
  item: NavItem
  isActive: boolean
  onClick: () => void
  linkRef?: React.Ref<HTMLAnchorElement>
  children: React.ReactNode
}) {
  const locale = useLocale()
  const href = `/${locale}${item.href}`
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={onClick}
      className="block py-3 px-4 text-lg rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-inset"
      style={{
        fontFamily: FONTS.sans,
        fontWeight: isActive ? 600 : 500,
        color: isActive ? COLORS.brandPrimary : COLORS.textPrimary,
        backgroundColor: isActive 
          ? COLORS.brandSubtle 
          : isHovered 
            ? COLORS.bgSecondary 
            : 'transparent',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...(isActive && { 'aria-current': 'page' })}
    >
      {children}
    </Link>
  )
}

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

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    firstLinkRef.current?.focus()
    document.addEventListener('keydown', handleEscape)
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
                  <MobileNavLink
                    item={item}
                    isActive={isActive}
                    onClick={onClose}
                    linkRef={index === 0 ? firstLinkRef : undefined}
                  >
                    {t(item.key)}
                  </MobileNavLink>
                  {index < navItems.length - 1 && (
                    <div 
                      className="border-b mx-4" 
                      style={{ borderColor: 'rgba(50, 48, 47, 0.08)' }}
                      aria-hidden="true" 
                    />
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

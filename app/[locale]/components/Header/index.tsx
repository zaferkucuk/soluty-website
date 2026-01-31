'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Logo } from './Logo'
import { Navigation } from './Navigation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { HeaderButtons } from './HeaderCTA'
import { MobileMenu } from './MobileMenu'
import { MobileMenuToggle } from './MobileMenuToggle'

export function Header() {
  const t = useTranslations('header')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll for sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only
          focus:absolute focus:top-4 focus:left-4
          focus:z-[100] focus:px-4 focus:py-2
          focus:bg-[var(--color-brand-primary)] focus:text-white
          focus:rounded-lg focus:outline-none
          focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-brand-primary)]
        "
      >
        {t('skipToContent')}
      </a>

      <header
        className={`
          sticky top-0 z-50
          bg-[var(--color-bg-primary)]
          transition-shadow duration-200
          ${isScrolled ? 'shadow-[var(--shadow-md)]' : ''}
        `}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20 lg:h-[88px]">
            {/* Left: Mobile Menu Toggle + Logo + Navigation (aligned left) */}
            <div className="flex items-center gap-2 lg:gap-10">
              <MobileMenuToggle
                isOpen={isMobileMenuOpen}
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
              <Logo />
              {/* Desktop Navigation - now left-aligned after logo */}
              <div className="hidden lg:flex">
                <Navigation />
              </div>
            </div>

            {/* Right: Language Switcher + Buttons */}
            <div className="flex items-center gap-3 lg:gap-4">
              <LanguageSwitcher />
              <HeaderButtons />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </header>
    </>
  )
}

export default Header

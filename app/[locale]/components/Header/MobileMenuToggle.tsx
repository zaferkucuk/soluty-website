'use client'

import { useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'

interface MobileMenuToggleProps {
  isOpen: boolean
  onToggle: () => void
}

export function MobileMenuToggle({ isOpen, onToggle }: MobileMenuToggleProps) {
  const t = useTranslations('header.mobileMenu')

  return (
    <button
      type="button"
      onClick={onToggle}
      className="
        lg:hidden
        p-2 -ml-2
        text-[var(--color-text-primary)] hover:text-[var(--color-brand-primary)]
        transition-colors duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2
        rounded-lg
      "
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? t('close') : t('open')}
    >
      {isOpen ? (
        <X size={24} aria-hidden="true" />
      ) : (
        <Menu size={24} aria-hidden="true" />
      )}
    </button>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'

const FONTS = {
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
}

const COLORS = {
  textInverse: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  bgInverse: '#32302F',
  border: 'rgba(255, 255, 255, 0.1)',
  brandPrimary: '#4DB6A0',
}

/** Circular EU flag SVG — matches header LanguageSwitcher flag style */
function EUFlag({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="shrink-0"
    >
      <clipPath id="euCircleFooter">
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath="url(#euCircleFooter)">
        <rect width="32" height="32" fill="#003399" />
        {/* 12 stars in a circle */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180)
          const cx = 16 + 9 * Math.cos(angle)
          const cy = 16 + 9 * Math.sin(angle)
          return (
            <g key={i} transform={`translate(${cx}, ${cy})`}>
              <polygon
                points="0,-2.2 0.66,-0.7 2.1,-0.7 1.05,0.27 1.38,1.78 0,1.05 -1.38,1.78 -1.05,0.27 -2.1,-0.7 -0.66,-0.7"
                fill="#FFCC00"
              />
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: COLORS.bgInverse,
        fontFamily: FONTS.sans,
      }}
      role="contentinfo"
    >
      <div className="max-w-[1200px] 2xl:max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Company */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-3 mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 rounded"
              aria-label="Soluty Business Solutions - Home"
            >
              <Image
                src="/images/logo-icon.svg"
                alt="Soluty"
                width={100}
                height={100}
                className="h-12 md:h-14 w-auto"
              />
              <div className="flex flex-col items-center leading-tight">
                <span
                  style={{
                    fontFamily: "'Crimson Pro', Georgia, 'Times New Roman', serif",
                    fontSize: '26px',
                    fontWeight: 400,
                    color: COLORS.textSecondary,
                    letterSpacing: '0.18em',
                  }}
                >
                  SOLUTY
                </span>
                <span
                  style={{
                    fontFamily: "'Crimson Pro', Georgia, 'Times New Roman', serif",
                    fontSize: '13px',
                    fontWeight: 400,
                    color: COLORS.textSecondary,
                  }}
                >
                  BUSINESS SOLUTIONS
                </span>
              </div>
            </Link>
            <p
              className="text-sm leading-relaxed max-w-[280px]"
              style={{ color: COLORS.textSecondary }}
            >
              {t('companyDescription')}
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: COLORS.textMuted }}
            >
              {t('servicesTitle')}
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <FooterLink href={`/${locale}#services`}>
                  {t('services.customErp')}
                </FooterLink>
              </li>
              <li>
                <FooterLink href={`/${locale}#services`}>
                  {t('services.customProjects')}
                </FooterLink>
              </li>
              <li>
                <FooterLink href={`/${locale}#services`}>
                  {t('services.aiSolutions')}
                </FooterLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: COLORS.textMuted }}
            >
              {t('contactTitle')}
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <FooterLink href="mailto:info@soluty.de">
                  info@soluty.de
                </FooterLink>
              </li>
              <li>
                <FooterLink href="tel:+4917647757322">
                  +49 176 4775 7322
                </FooterLink>
              </li>
              <li>
                <span
                  className="text-sm leading-relaxed block"
                  style={{ color: COLORS.textSecondary }}
                >
                  {t('addressStreet')}
                </span>
                <span
                  className="text-sm leading-relaxed block"
                  style={{ color: COLORS.textSecondary }}
                >
                  {t('addressCity')}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Social */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: COLORS.textMuted }}
            >
              {t('legalTitle')}
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <FooterLink href={`/${locale}/impressum`}>
                  {t('legal.imprint')}
                </FooterLink>
              </li>
              <li>
                <FooterLink href={`/${locale}/datenschutz`}>
                  {t('legal.privacy')}
                </FooterLink>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/soluty"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#32302F] rounded"
                style={{ opacity: 0.5 }}
                aria-label={t('social.linkedin')}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: COLORS.textInverse }}
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/soluty-gmbh"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#32302F] rounded"
                style={{ opacity: 0.5 }}
                aria-label={t('social.github')}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: COLORS.textInverse }}
                  aria-hidden="true"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: `1px solid ${COLORS.border}` }}
        >
          <p
            className="text-xs"
            style={{ color: COLORS.textMuted }}
          >
            © {currentYear} Soluty GmbH. {t('copyright')}
          </p>
          <div
            className="text-xs flex items-center gap-2"
            style={{ color: COLORS.textMuted }}
          >
            <EUFlag size={20} />
            <span>{t('madeInEU')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/** Reusable footer link with consistent styling */
function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')

  if (isExternal) {
    return (
      <a
        href={href}
        className="text-sm transition-colors duration-150 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#32302F] rounded"
        style={{ color: COLORS.textSecondary }}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className="text-sm transition-colors duration-150 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#32302F] rounded"
      style={{ color: COLORS.textSecondary }}
    >
      {children}
    </Link>
  )
}

export default Footer

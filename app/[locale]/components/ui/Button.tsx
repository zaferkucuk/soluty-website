'use client'

import Link from 'next/link'
import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

/**
 * Soluty Button Component
 * =========================
 * Inspired by Wealthsimple's button design system
 * 
 * Variants:
 * - primary: Dark background (#32302F), white text — main CTAs
 * - secondary: White background, dark border — secondary actions
 * - ghost: Transparent, dark text — tertiary actions (nav links)
 * - brand: Brand color (#4DB6A0), white text — special emphasis
 * 
 * Sizes:
 * - sm: Compact (header buttons)
 * - md: Default (most buttons)
 * - lg: Large (hero CTAs)
 */

// Design tokens (matching globals.css)
const COLORS = {
  textPrimary: '#32302F',
  textInverse: '#FFFFFF',
  bgPrimary: '#FCFCFC',
  brandPrimary: '#4DB6A0',
  brandHover: '#3DA08C',
  borderStrong: 'rgba(50, 48, 47, 0.25)',
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'brand'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: 'button'
    href?: never
  }

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: 'link'
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

// Style configurations
const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: COLORS.textPrimary,
    color: COLORS.textInverse,
    border: 'none',
  },
  secondary: {
    backgroundColor: COLORS.bgPrimary,
    color: COLORS.textPrimary,
    border: `1px solid ${COLORS.borderStrong}`,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: COLORS.textPrimary,
    border: 'none',
  },
  brand: {
    backgroundColor: COLORS.brandPrimary,
    color: COLORS.textInverse,
    border: 'none',
  },
}

const variantHoverStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#1a1918',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(50, 48, 47, 0.2)',
  },
  secondary: {
    backgroundColor: '#F7F6F5',
    borderColor: COLORS.textPrimary,
  },
  ghost: {
    color: COLORS.brandPrimary,
  },
  brand: {
    backgroundColor: COLORS.brandHover,
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(77, 182, 160, 0.3)',
  },
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-8 py-4 text-base',
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      children,
      className = '',
      icon,
      iconPosition = 'right',
      ...rest
    } = props

    const baseClasses = `
      inline-flex items-center justify-center gap-2
      font-medium
      rounded-full
      transition-all duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4DB6A0]
      whitespace-nowrap
      select-none
      ${sizeStyles[size]}
      ${className}
    `

    const style = variantStyles[variant]
    const hoverStyle = variantHoverStyles[variant]

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      const target = e.currentTarget
      Object.assign(target.style, hoverStyle)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      const target = e.currentTarget
      Object.assign(target.style, style)
      target.style.transform = ''
      target.style.boxShadow = ''
    }

    const content = (
      <>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </>
    )

    if (props.as === 'link') {
      const { as, href, ...linkRest } = rest as ButtonAsLink
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClasses}
          style={style}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...linkRest}
        >
          {content}
        </Link>
      )
    }

    const { as, ...buttonRest } = rest as ButtonAsButton
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={baseClasses}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...buttonRest}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

// Convenience exports for common button types
export function PrimaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="primary" {...props} />
}

export function SecondaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="secondary" {...props} />
}

export function GhostButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="ghost" {...props} />
}

export function BrandButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="brand" {...props} />
}

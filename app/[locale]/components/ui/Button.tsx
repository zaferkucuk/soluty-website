'use client'

import Link from 'next/link'
import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

/**
 * Soluty Button Component
 * =========================
 * Inspired by Wealthsimple's button design system
 * 
 * Variants:
 * - primary: Dark petrol background, white text — main CTAs
 * - secondary: White background, dark border — secondary actions
 * - ghost: Transparent, dark text — tertiary actions (nav links)
 * - brand: Brand color, white text — special emphasis
 * 
 * Sizes:
 * - sm: Header buttons — h-11 (44px) matching HeroEmailForm submit button
 * - md: Default (most buttons)
 * - lg: Large (hero CTAs)
 */

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

// Style configurations using CSS variables
const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-bg-dark)',
    color: 'var(--color-text-inverse)',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border-strong)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-text-primary)',
    border: 'none',
  },
  brand: {
    backgroundColor: 'var(--color-brand-primary)',
    color: 'var(--color-text-inverse)',
    border: 'none',
  },
}

const variantHoverStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-bg-dark-hover)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(15, 42, 57, 0.3)',
  },
  secondary: {
    backgroundColor: 'var(--color-bg-secondary)',
    borderColor: 'var(--color-text-primary)',
  },
  ghost: {
    color: 'var(--color-brand-primary)',
  },
  brand: {
    backgroundColor: 'var(--color-brand-hover)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(77, 182, 160, 0.3)',
  },
}

// Size styles — sm uses fixed h-11 (44px) to match HeroEmailForm submit button
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-11 px-6 text-sm',
  md: 'px-7 py-3.5 text-[18px]',
  lg: 'px-10 py-4 text-[19px]',
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
  return <Button variant="primary" {...props as ButtonProps} />
}

export function SecondaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="secondary" {...props as ButtonProps} />
}

export function GhostButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="ghost" {...props as ButtonProps} />
}

export function BrandButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="brand" {...props as ButtonProps} />
}

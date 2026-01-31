/**
 * Soluty Typography System
 * 
 * Centralized font configuration using next/font for optimal loading.
 * All components should use CSS variables defined here.
 * 
 * Font Pairing:
 * - Serif (Headlines): Libre Baskerville — classic, trustworthy, B2B appropriate
 * - Sans (Body): DM Sans — geometric, modern, excellent readability
 * 
 * Design Reference: Wealthsimple-inspired typography with Soluty brand colors
 */

import { Libre_Baskerville, DM_Sans, JetBrains_Mono } from 'next/font/google'

/**
 * Libre Baskerville — Serif font for headlines
 * Used for: h1, h2, h3, hero headlines, section titles
 * Character: Classic, editorial, trustworthy
 */
export const serifFont = Libre_Baskerville({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

/**
 * DM Sans — Sans-serif font for body text
 * Used for: body text, buttons, labels, navigation, subheadlines
 * Character: Geometric, modern, highly readable
 */
export const sansFont = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

/**
 * JetBrains Mono — Monospace font for code
 * Used for: code blocks, technical content, data displays
 * Character: Developer-friendly, clear distinction between similar characters
 */
export const monoFont = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['Consolas', 'Monaco', 'monospace'],
})

/**
 * Combined font variables for className usage
 * Usage: <body className={fontVariables}>
 */
export const fontVariables = `${serifFont.variable} ${sansFont.variable} ${monoFont.variable}`

/**
 * Typography scale (for reference)
 * These values are implemented in globals.css
 * 
 * Headlines (serif):
 * - h1: 44px / 700 / 1.15 line-height
 * - h2: 36px / 700 / 1.2 line-height  
 * - h3: 28px / 700 / 1.3 line-height
 * - h4: 22px / 600 / 1.4 line-height
 * 
 * Body (sans):
 * - body: 16px / 400 / 1.6 line-height
 * - body-lg: 18px / 400 / 1.65 line-height
 * - small: 14px / 400 / 1.5 line-height
 * - caption: 12px / 500 / 1.4 line-height
 */

/**
 * Soluty Typography System
 *
 * Centralized font configuration using next/font for optimal loading.
 * All components should use CSS variables defined here.
 *
 * Font Pairing:
 * - Serif (Headlines): Crimson Pro — elegant, high-contrast, editorial (Tiempos alternative)
 * - Sans (Body): DM Sans — geometric, modern, excellent readability
 *
 * Design Reference: Wealthsimple-inspired typography with Soluty brand colors
 * Crimson Pro: Typewolf's official recommendation for Tiempos Headline alternative
 *
 * Performance notes:
 * - Only weights actually used in the codebase are loaded
 * - JetBrains Mono removed (no usage found)
 * - vietnamese subset removed from Crimson Pro (not needed)
 */

import { Crimson_Pro, DM_Sans } from 'next/font/google'

/**
 * Crimson Pro — Serif font for headlines
 * Used for: h1, h2, h3, hero headlines, section titles
 * Weights in use: 400 (headings), 500 (card titles, subsections)
 */
export const serifFont = Crimson_Pro({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  style: ['normal'],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

/**
 * DM Sans — Sans-serif font for body text
 * Used for: body text, buttons, labels, navigation, subheadlines
 * Weights in use: 400 (body), 500 (labels, buttons), 600 (eyebrow, emphasis)
 */
export const sansFont = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  style: ['normal'],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

/**
 * Combined font variables for className usage
 * Usage: <body className={fontVariables}>
 */
export const fontVariables = `${serifFont.variable} ${sansFont.variable}`

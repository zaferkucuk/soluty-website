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
 */

import { Crimson_Pro, DM_Sans, JetBrains_Mono } from 'next/font/google'

/**
 * Crimson Pro — Serif font for headlines
 * Used for: h1, h2, h3, hero headlines, section titles
 * Character: Elegant, high-contrast, editorial (Typewolf recommended Tiempos alternative)
 * 
 * Key features:
 * - Official Typewolf recommendation for Tiempos Headline
 * - 9 weights (200-900) + variable font support
 * - High contrast between thick and thin strokes
 * - Modern editorial feel, perfect for fintech/B2B
 */
export const serifFont = Crimson_Pro({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
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
 * Headlines (serif - Crimson Pro):
 * - h1: 56-72px / 400-500 / 1.05-1.08 line-height
 * - h2: 40-52px / 400-500 / 1.12-1.15 line-height  
 * - h3: 32-36px / 500 / 1.2 line-height
 * - h4: 24px / 500 / 1.3 line-height
 * 
 * Body (sans - DM Sans):
 * - body: 16px / 400 / 1.6 line-height
 * - body-lg: 18px / 400 / 1.65 line-height
 * - small: 14px / 400 / 1.5 line-height
 * - caption: 12px / 500 / 1.4 line-height
 */

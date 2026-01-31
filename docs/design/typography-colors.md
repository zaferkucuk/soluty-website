# Typography & Color System

**Status:** Active  
**Version:** 1.0  
**Last Updated:** January 2025

---

## Overview

This document defines the typography and color system for Soluty GmbH website.
All components must use these tokens for consistency.

**Design Reference:** Wealthsimple-inspired typography with Soluty brand identity.

---

## Typography

### Font Stack

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| **Serif** | Libre Baskerville | Georgia, Times New Roman, serif | Headlines, section titles |
| **Sans** | DM Sans | system-ui, Helvetica Neue, Arial | Body text, UI, buttons |
| **Mono** | JetBrains Mono | Consolas, Monaco, monospace | Code, technical content |

### CSS Variables

```css
--font-serif: 'Libre Baskerville', Georgia, serif;
--font-sans: 'DM Sans', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', Consolas, monospace;
```

### Type Scale

#### Headlines (Serif)

| Class | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `.heading-1` | 44px (32px mobile) | 400 | 1.15 | Hero headline |
| `.heading-2` | 36px (28px mobile) | 400 | 1.2 | Section titles |
| `.heading-3` | 28px (24px mobile) | 400 | 1.3 | Subsection titles |
| `.heading-4` | 22px (20px mobile) | 600 | 1.4 | Card titles |

#### Body Text (Sans)

| Class | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `.body-lg` | 18px | 400 | 1.65 | Subheadlines, intro text |
| `.body` | 16px | 400 | 1.6 | Paragraphs, default |
| `.body-sm` | 14px | 400 | 1.5 | Secondary text |
| `.caption` | 12px | 500 | 1.4 | Labels, metadata |

### Usage Examples

```tsx
// Headline
<h1 className="heading-1">Stop adapting your business to software.</h1>

// Subheadline
<p className="body-lg">Custom ERP solutions for delivery businesses.</p>

// Body text
<p className="body">Regular paragraph content goes here.</p>
```

---

## Color Palette

### Text Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-text-primary` | `#32302F` | Headlines, primary text |
| `--color-text-secondary` | `#5C5A58` | Body text, descriptions |
| `--color-text-muted` | `#8A8785` | Captions, placeholders |
| `--color-text-inverse` | `#FFFFFF` | Text on dark backgrounds |

### Background Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-bg-primary` | `#FCFCFC` | Page background |
| `--color-bg-secondary` | `#F7F6F5` | Cards, sections |
| `--color-bg-tertiary` | `#EFEEED` | Hover states, dividers |
| `--color-bg-inverse` | `#32302F` | Dark sections, buttons |

### Brand Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-brand-primary` | `#4DB6A0` | CTAs, links, accents |
| `--color-brand-light` | `#11EFE3` | Highlights, gradients |
| `--color-brand-subtle` | `rgba(77, 182, 160, 0.1)` | Badge backgrounds |
| `--color-brand-hover` | `#3DA08C` | Hover states |

### UI Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-border` | `rgba(50, 48, 47, 0.12)` | Default borders |
| `--color-border-strong` | `rgba(50, 48, 47, 0.25)` | Emphasized borders |
| `--color-divider` | `rgba(50, 48, 47, 0.08)` | Section dividers |

---

## Component Utilities

### Buttons

```html
<!-- Primary button (dark background) -->
<button class="btn btn-primary">Get Started</button>

<!-- Secondary button (outline) -->
<button class="btn btn-secondary">Learn More</button>

<!-- Brand button (teal) -->
<button class="btn btn-brand">Contact Us</button>
```

### Badges

```html
<!-- Brand badge -->
<span class="badge badge-brand">🇩🇪 Made in Germany</span>

<!-- Neutral badge -->
<span class="badge badge-neutral">New Feature</span>
```

### Cards

```html
<!-- Standard card -->
<div class="card">
  <h3 class="heading-4">Card Title</h3>
  <p class="body-sm">Card content</p>
</div>

<!-- Card with hover effect -->
<div class="card card-shadow-hover">...</div>
```

---

## Tailwind Usage

Use CSS variables in Tailwind for consistency:

```tsx
// Text colors
<p className="text-[var(--color-text-primary)]">...</p>

// Background colors  
<div className="bg-[var(--color-bg-secondary)]">...</div>

// Or use the utility classes directly
<h1 className="heading-1">...</h1>
<button className="btn btn-primary">...</button>
```

---

## Migration Notes

### Deprecated (from Geist fonts)

The following are no longer used:
- `--font-geist-sans` → Use `--font-sans`
- `--font-geist-mono` → Use `--font-mono`

### Archived Fonts

Previously used fonts (for reference):
- **Geist Sans** — Was used for body text
- **Geist Mono** — Was used for code

These have been replaced with DM Sans and JetBrains Mono respectively.

---

## Accessibility

### Color Contrast

All color combinations meet WCAG 2.1 AA standards:

| Combination | Ratio | Status |
|-------------|-------|--------|
| `#32302F` on `#FCFCFC` | 12.6:1 | ✅ AAA |
| `#5C5A58` on `#FCFCFC` | 6.2:1 | ✅ AA |
| `#FFFFFF` on `#32302F` | 12.6:1 | ✅ AAA |
| `#4DB6A0` on `#FCFCFC` | 3.1:1 | ⚠️ Large text only |

**Note:** Brand teal (`#4DB6A0`) should only be used for large text (18px+) or UI elements, not body text.

### Focus States

All interactive elements use:
```css
:focus-visible {
  outline: 2px solid var(--color-brand-primary);
  outline-offset: 2px;
}
```

---

## File References

| File | Purpose |
|------|---------|
| `app/fonts.ts` | Font loading configuration |
| `app/globals.css` | CSS variables and utilities |
| `app/[locale]/layout.tsx` | Font variable injection |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 2025 | Initial typography system with Libre Baskerville + DM Sans |

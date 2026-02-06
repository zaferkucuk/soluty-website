# Typography & Color System

**Status:** Active  
**Version:** 1.1  
**Last Updated:** February 2026

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
| **Serif** | Crimson Pro | Georgia, Times New Roman, serif | Headlines, section titles |
| **Sans** | DM Sans | system-ui, Helvetica Neue, Arial | Body text, UI, buttons |
| **Mono** | JetBrains Mono | Consolas, Monaco, monospace | Code, technical content |

### CSS Variables

```css
--font-serif: 'Crimson Pro', Georgia, 'Times New Roman', serif;
--font-sans: 'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif;
--font-mono: 'JetBrains Mono', Consolas, Monaco, monospace;
```

### Type Scale

#### Headlines (Serif — Crimson Pro)

| Class | Desktop | Tablet (640px+) | Mobile (<640px) | Weight | Line Height |
|-------|---------|-----------------|-----------------|--------|-------------|
| `.heading-1` | 92px | 82px | 54px | 400 | 1.02–1.05 |
| `.heading-2` | 52px | 48px | 32px | 400 | 1.12 |
| `.heading-3` | 36px | 32px | 26px | 500 | 1.2 |
| `.heading-4` | 24px | 24px | 22px | 500 | 1.3 |

#### Body Text (Sans — DM Sans)

| Class | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `.body-lg` | 18px | 400 | 1.65 | Subheadlines, intro text |
| `.body` | 16px | 400 | 1.6 | Paragraphs, default |
| `.body-sm` | 14px | 400 | 1.5 | Secondary text |
| `.caption` | 12px | 500 | 1.4 | Labels, metadata |

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
| `--color-bg-inverse` | `#3D3B39` | Buttons, dark sections (Graphite) |
| `--color-bg-inverse-hover` | `#555250` | Button hover state |

### Brand Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-brand-primary` | `#4DB6A0` | Icons, accents, badges, links |
| `--color-brand-light` | `#11EFE3` | Highlights, gradients |
| `--color-brand-subtle` | `rgba(77, 182, 160, 0.1)` | Badge backgrounds |
| `--color-brand-hover` | `#3DA08C` | Brand element hover states |

### UI Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-border` | `rgba(50, 48, 47, 0.12)` | Default borders |
| `--color-border-strong` | `rgba(50, 48, 47, 0.25)` | Emphasized borders |
| `--color-divider` | `rgba(50, 48, 47, 0.08)` | Section dividers |

---

## Button Color Strategy

**Decision:** Koyu buton stratejisi (A). Tüm primary butonlar koyu (Graphite), yeşil (#4DB6A0) sadece accent rolünde (ikon, badge, link, checkmark).

| State | Color | CSS Variable | Contrast on #FCFCFC |
|-------|-------|--------------|---------------------|
| **Default** | `#3D3B39` (Graphite) | `--color-bg-inverse` | 11.8:1 ✅ AAA |
| **Hover** | `#555250` | `--color-bg-inverse-hover` | 7.1:1 ✅ AA |
| **Active** | `#3D3B39` | `--color-bg-inverse` | 11.8:1 ✅ AAA |

**Hover davranışı:** `background-color` geçişi + `translateY(-1px)` + `box-shadow`.

**Neden Graphite?**
- Metin rengi (#32302F) ile farklı ama uyumlu — butonlar metinden ayrışır
- Sayfa warm tone'uyla (FCFCFC, F7F6F5) doğal uyum
- AAA kontrast — erişilebilirlik konusunda güvenli

---

## Component Utilities

### Buttons

```html
<!-- Primary button (Graphite — koyu buton stratejisi) -->
<button class="btn btn-primary">Get Started →</button>

<!-- Secondary button (outline) -->
<button class="btn btn-secondary">Learn More</button>

<!-- Brand button (teal — özel vurgu için) -->
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

## Accessibility

### Color Contrast

All color combinations meet WCAG 2.1 AA standards:

| Combination | Ratio | Status |
|-------------|-------|--------|
| `#32302F` on `#FCFCFC` | 12.6:1 | ✅ AAA |
| `#3D3B39` on `#FCFCFC` (buttons) | 11.8:1 | ✅ AAA |
| `#555250` on `#FCFCFC` (button hover) | 7.1:1 | ✅ AA |
| `#5C5A58` on `#FCFCFC` | 6.2:1 | ✅ AA |
| `#FFFFFF` on `#3D3B39` | 11.8:1 | ✅ AAA |
| `#4DB6A0` on `#FCFCFC` | 3.1:1 | ⚠️ Large text only |

**Note:** Brand teal (`#4DB6A0`) should only be used for large text (18px+), icons, or UI elements — not body text.

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
| 1.1 | Feb 2026 | Button color: Graphite #3D3B39 + hover #555250. Font updated to Crimson Pro. Heading sizes updated to match globals.css. |
| 1.0 | Jan 2025 | Initial typography system with Libre Baskerville + DM Sans |

# Header Section Specification

**Status:** Ready for Implementation  
**Version:** 1.0  
**Last Updated:** 2025-01-20

---

## Overview

The header is a persistent navigation element providing brand identity, primary navigation, language switching, and consultation CTA. It serves as the anchor point for user orientation across all pages.

**Design Approach:** Mobile-first  
**Behavior:** Sticky on scroll

---

## Content

### Logo

| Variant | Usage |
|---------|-------|
| **Full** | Icon + "SOLUTY" wordmark (desktop) |
| **Compact** | Icon only (mobile, optional) |

**Note:** Tagline "BUSINESS SOLUTIONS" is NOT displayed in header (space constraint).

### Navigation Links (3)

| Key | German (DE) | English (EN) | Turkish (TR) |
|-----|-------------|--------------|--------------|
| `nav.services` | Leistungen | Services | Hizmetler |
| `nav.references` | Referenzen | References | Referanslar |
| `nav.contact` | Kontakt | Contact | İletişim |

### Language Switcher

**Format:** Abbreviations (DE | EN | TR)

| Code | Label |
|------|-------|
| `de` | DE |
| `en` | EN |
| `tr` | TR |

**Behavior:**
- Current language is visually distinct (bold or underlined)
- Clicking switches locale and preserves current page

### Call-to-Action Button

| Language | Text |
|----------|------|
| **DE** | Beratung anfragen |
| **EN** | Request consultation |
| **TR** | Danışmanlık talep et |

**Action:** Opens contact/consultation booking (same as Hero primary CTA destination)

---

## Visual Design

### Brand Colors (from Logo)

| Token | Value | Usage |
|-------|-------|-------|
| `brand-primary` | #4DB6A0 | Logo, CTA button, active states |
| `brand-primary-hover` | #3DA08C | CTA hover |
| `text-primary` | #2D3436 | Navigation text, logo text |
| `text-secondary` | #636E72 | Language switcher inactive |
| `background` | #FFFFFF | Header background |
| `border` | #E0E0E0 | Bottom border (subtle) |

### Typography

| Element | Font | Weight | Size (Desktop) | Size (Mobile) |
|---------|------|--------|----------------|---------------|
| Logo wordmark | System/Brand | 600 | 24px | 20px |
| Nav links | System | 500 | 16px | 16px |
| Language | System | 400/600 | 14px | 14px |
| CTA button | System | 600 | 14px | 14px |

### Spacing

| Element | Desktop | Mobile |
|---------|---------|--------|
| Header height | 72px | 64px |
| Logo left padding | 0 | 0 |
| Nav link gap | 32px | — |
| Language switcher gap | 8px | 8px |
| CTA left margin | 24px | 0 |
| Container max-width | 1280px | 100% |
| Container padding-x | 24px | 16px |

---

## Layout

### Desktop (≥1024px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [LOGO]          [Leistungen]  [Referenzen]  [Kontakt]     [DE|EN|TR] [CTA] │
│    ↑                              ↑                            ↑        ↑   │
│   left                          center                       right    right │
└─────────────────────────────────────────────────────────────────────────┘
```

**Structure:**
- Logo: Far left
- Navigation: Center (or left after logo with gap)
- Language + CTA: Far right

**Alternative (left-aligned nav):**
```
┌─────────────────────────────────────────────────────────────────────────┐
│  [LOGO]   [Leistungen]  [Referenzen]  [Kontakt]        [DE|EN|TR] [CTA] │
└─────────────────────────────────────────────────────────────────────────┘
```

**Recommendation:** Left-aligned nav (simpler, more common in B2B)

### Tablet (768px - 1023px)

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]   [Leistungen] [Referenzen] [Kontakt]   [DE▼] [CTA] │
└─────────────────────────────────────────────────────────┘
```

- Navigation visible but tighter spacing
- Language switcher: Dropdown (compact)
- CTA: Smaller padding

### Mobile (<768px)

**Header Bar:**
```
┌─────────────────────────────────┐
│  [☰]     [LOGO]      [DE▼] [CTA]│
└─────────────────────────────────┘
```

**Mobile Menu (expanded):**
```
┌─────────────────────────────────┐
│  [✕]     [LOGO]      [DE▼] [CTA]│
├─────────────────────────────────┤
│                                 │
│  Leistungen                     │
│  ─────────────────────────────  │
│  Referenzen                     │
│  ─────────────────────────────  │
│  Kontakt                        │
│                                 │
└─────────────────────────────────┘
```

**Mobile Specifications:**
- Hamburger icon: Left side
- Logo: Center
- Language: Compact dropdown
- CTA: Preserved (smaller, text only or icon+text)
- Menu: Full-width overlay or slide-in panel

---

## Sticky Behavior

| State | Trigger | Style Change |
|-------|---------|--------------|
| Default | Page top | Full height (72px desktop, 64px mobile) |
| Sticky | Scroll > 50px | Slight shadow, same height |

**CSS Properties:**
```css
position: sticky;
top: 0;
z-index: 50;
transition: box-shadow 0.2s ease;
```

**Shadow on scroll:**
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
```

---

## Interactive States

### Navigation Links

| State | Style |
|-------|-------|
| Default | `text-primary`, no underline |
| Hover | `brand-primary` color |
| Active (current page) | `brand-primary` color, font-weight 600 |
| Focus | Visible outline (2px solid brand-primary) |

### CTA Button

| State | Style |
|-------|-------|
| Default | `brand-primary` bg, white text, rounded |
| Hover | `brand-primary-hover` bg |
| Active | Slightly darker |
| Focus | Visible outline |

### Language Switcher

| State | Style |
|-------|-------|
| Current | Bold (600), `text-primary` |
| Other | Normal (400), `text-secondary` |
| Hover | `brand-primary` color |

---

## Technical Requirements

### Accessibility

- Skip to main content link (first focusable element, visually hidden until focused)
- Semantic HTML: `<header>`, `<nav>`, proper landmark roles
- Keyboard navigation: All links/buttons focusable, logical tab order
- Mobile menu: Focus trap when open, close on Escape
- ARIA labels:
  - `aria-label="Main navigation"` on `<nav>`
  - `aria-expanded` on mobile menu toggle
  - `aria-current="page"` on active nav link
- Color contrast: WCAG 2.1 AA (4.5:1 minimum)

### Performance

- Logo: SVG format (inline or optimized file)
- Total header assets: < 50KB
- No layout shift on load (reserve space)
- Font: Preloaded or system font

### SEO

- Semantic HTML structure
- Crawlable text links (not JS-only navigation)
- `hreflang` handled at page level (not header)

### i18n

- All text from translation files
- Language switching preserves current route
- RTL not required (DE/EN/TR are LTR)

---

## Translation Keys

```json
{
  "header": {
    "nav": {
      "services": "Services",
      "references": "References",
      "contact": "Contact"
    },
    "cta": "Request consultation",
    "languageSwitcher": {
      "label": "Select language",
      "de": "DE",
      "en": "EN",
      "tr": "TR"
    },
    "mobileMenu": {
      "open": "Open menu",
      "close": "Close menu"
    },
    "skipToContent": "Skip to main content"
  }
}
```

---

## Component Structure

```
src/components/sections/
└── Header/
    ├── index.tsx              # Main header component
    ├── Logo.tsx               # Logo component (SVG)
    ├── Navigation.tsx         # Desktop navigation links
    ├── LanguageSwitcher.tsx   # Language toggle (DE|EN|TR)
    ├── HeaderCTA.tsx          # Consultation button
    ├── MobileMenu.tsx         # Mobile hamburger menu
    └── MobileMenuToggle.tsx   # Hamburger/close icon button
```

---

## Assets Required

| Asset | Format | Status |
|-------|--------|--------|
| Logo (full) | SVG | ⏳ Needs conversion from PNG |
| Logo (icon only) | SVG | ⏳ Needs extraction |
| Hamburger icon | SVG/Lucide | ✅ Use lucide-react |
| Close icon | SVG/Lucide | ✅ Use lucide-react |

---

## Out of Scope

- Search functionality
- User account/login
- Dropdown menus for navigation
- Mega menu
- Notification badges
- Shopping cart

---

## Dependencies

- `next-intl` for translations
- `next/link` for navigation
- `lucide-react` for icons (Menu, X)
- Tailwind CSS for styling

---

## Acceptance Criteria

- [ ] Logo displays correctly and links to homepage
- [ ] Navigation shows 3 links: Services, References, Contact
- [ ] Active page link is visually distinct
- [ ] Language switcher shows DE/EN/TR, current is highlighted
- [ ] Language switch changes locale without page reload flash
- [ ] CTA button is visually prominent
- [ ] Header becomes sticky on scroll with subtle shadow
- [ ] Mobile: Hamburger menu toggles navigation panel
- [ ] Mobile: CTA remains visible in header
- [ ] Accessible: Skip link works, keyboard nav works, focus visible
- [ ] Responsive: Works from 375px to 1440px+
- [ ] Performance: No layout shift, fast render
- [ ] i18n: All text from translation files, no hardcoded strings

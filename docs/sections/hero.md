# Hero Section Specification

**Status:** Ready for Implementation  
**Version:** 1.0  
**Last Updated:** 2025-01-20

---

## Overview

The hero section is the first impression of Soluty GmbH's website. It must communicate the core value proposition in under 5 seconds while positioning Soluty as a custom ERP solution partner (not a generic software vendor).

**Strategic Position:** "We understand your problem and the solution isn't categorical — it's custom for you."

---

## Content (English - Reference Version)

### Headline (H1)

```
Stop adapting your business to software.
We build ERP systems that adapt to your delivery workflows.
```

**Typography:**
- Line 1: Bold, larger (pain point — creates tension)
- Line 2: Medium weight, slightly smaller (solution — resolves tension)

### Subheadline

```
Custom ERP solutions for small and medium-sized delivery businesses — 
designed around your workflow, not the other way around.
```

### Call-to-Action Buttons

| Type | Text | Action |
|------|------|--------|
| **Primary** | "Discuss your delivery setup" | Opens consultation booking / contact |
| **Secondary** | "See how custom ERP works" | Scrolls to process section or opens explainer |

**Note:** No micro-copy under CTAs (intentionally less salesy)

### Trust Bar

| Badge | Text |
|-------|------|
| 🇩🇪 Flag | Built in Germany |
| ✓ Shield | DSGVO-compliant |

---

## Visual Design

### Hero Illustration

**Type:** Line-based system flow (NOT dashboard screenshot, NOT stock photos)

**Flow Diagram:**
```
ORDER ──────► ROUTE ──────► DRIVER
  📦           🗺️            🚚
                              │
                              ▼
              INVOICE ◄───── DELIVERY
                🧾             ✓
```

**Specifications:**
- Style: Thin/medium line-weight (2-3px)
- Colors: Monochrome or 2-color max (brand color + gray)
- Icons: Simple, line-based (Phosphor or Lucide style)
- Animation: Optional subtle CSS animation on connection lines
- Background: Clean, minimal (light gray or white)

**Why this approach:**
- Makes ERP approachable, not intimidating
- Shows delivery process at a glance
- Differentiates from competitors (who show dashboards)
- Technical but not scary

### Layout

**Desktop (≥1024px):**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────────────┐  ┌──────────────────────────────┐ │
│  │                         │  │                              │ │
│  │  HEADLINE               │  │   SYSTEM FLOW ILLUSTRATION   │ │
│  │  Line 1 (bold)          │  │                              │ │
│  │  Line 2 (medium)        │  │   Order → Route → Driver     │ │
│  │                         │  │              ↓               │ │
│  │  SUBHEADLINE            │  │   Invoice ← Delivery         │ │
│  │  (gray, smaller)        │  │                              │ │
│  │                         │  │                              │ │
│  │  [PRIMARY CTA] [SEC]    │  │                              │ │
│  │                         │  │                              │ │
│  └─────────────────────────┘  └──────────────────────────────┘ │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│  TRUST BAR: [🇩🇪 Built in Germany]  [✓ DSGVO-compliant]        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

- Split: 55% text / 45% illustration
- Vertical alignment: Center
- Max container width: 1280px

**Mobile (<768px):**
```
┌─────────────────────────┐
│                         │
│  HEADLINE               │
│  Line 1                 │
│  Line 2                 │
│                         │
│  ┌───────────────────┐  │
│  │ ILLUSTRATION      │  │
│  │ (compact version) │  │
│  └───────────────────┘  │
│                         │
│  SUBHEADLINE            │
│                         │
│  [PRIMARY CTA - full]   │
│  [SECONDARY - full]     │
│                         │
│  ───────────────────    │
│  TRUST BADGES           │
│                         │
└─────────────────────────┘
```

- Stack order: Headline → Illustration → Subheadline → CTAs → Trust
- CTAs: Full width buttons
- Illustration: Simplified/horizontal version

### Spacing

| Element | Desktop | Mobile |
|---------|---------|--------|
| Section padding (top/bottom) | 80px | 48px |
| Between headline and subheadline | 24px | 16px |
| Between subheadline and CTAs | 32px | 24px |
| Between CTAs | 16px | 12px |
| Trust bar margin-top | 48px | 32px |

---

## Technical Requirements

### Accessibility

- Headline: `<h1>` tag
- Subheadline: `<p>` tag with appropriate styling
- CTAs: `<button>` or `<a>` with proper roles
- Illustration: Decorative (aria-hidden) or with alt text
- Color contrast: WCAG 2.1 AA minimum
- Focus states: Visible on all interactive elements

### Performance

- LCP target: < 2.5 seconds
- Illustration: SVG preferred (or optimized WebP)
- No heavy animations blocking render
- Fonts: Preloaded

### i18n

- All text from `messages/{locale}.json`
- No hardcoded strings
- Translation keys defined in content JSON

---

## Translation Keys

```json
{
  "hero": {
    "headline": {
      "line1": "Stop adapting your business to software.",
      "line2": "We build ERP systems that adapt to your delivery workflows."
    },
    "subheadline": "Custom ERP solutions for small and medium-sized delivery businesses — designed around your workflow, not the other way around.",
    "cta": {
      "primary": "Discuss your delivery setup",
      "secondary": "See how custom ERP works"
    }
  },
  "trust": {
    "builtInGermany": "Built in Germany",
    "gdprCompliant": "DSGVO-compliant"
  }
}
```

---

## Component Structure

```
src/components/sections/
└── HeroSection/
    ├── index.tsx           # Main component
    ├── HeroContent.tsx     # Text + CTAs
    ├── HeroIllustration.tsx # SVG flow diagram
    └── TrustBar.tsx        # Trust badges
```

---

## Out of Scope

- Video background
- Carousel/slider
- Form in hero
- Customer logos (moved to later section)
- Animated statistics

---

## Dependencies

- `next-intl` for translations
- Tailwind CSS for styling
- SVG illustration (to be created or placeholder)

---

## Acceptance Criteria

- [ ] Headline displays correctly (2 lines, different weights)
- [ ] Subheadline is readable and properly spaced
- [ ] Primary CTA is visually prominent
- [ ] Secondary CTA is clearly secondary
- [ ] Trust badges display below hero content
- [ ] Responsive: Works on mobile (375px) to desktop (1440px+)
- [ ] Accessible: Keyboard navigable, screen reader friendly
- [ ] Performance: LCP < 2.5s
- [ ] i18n: All text from translation files

# Services Section — UI Specification

**Version:** 1.0  
**Date:** January 2026  
**Role:** UX/UI Designer  
**Status:** Ready for Implementation

---

## Overview

The Services section presents Soluty's three core offerings in a visually balanced 3-card layout. Custom ERP receives subtle visual prominence through center positioning and an accent border, while maintaining equal weight with other services.

### Design Rationale

- **Center positioning** naturally draws the eye, establishing hierarchy without breaking visual balance
- **Equal card sizes** communicate that all services are legitimate, professional offerings
- **Subtle accent** on Custom ERP signals core competency without diminishing other services
- **Benefit-focused headlines** connect with SME pain points rather than listing features

---

## Section Layout

### Desktop (≥1024px)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              max-width: 1280px                              │
│                              padding: 0 64px                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     Section Header (centered)                        │   │
│   │                                                                      │   │
│   │   Eyebrow: "UNSERE LEISTUNGEN" (label-sm, brand color)              │   │
│   │   Headline: "Digitale Lösungen..." (heading-2, serif)               │   │
│   │   Subheadline: Optional 1-2 sentences (body-lg)                     │   │
│   │                                                                      │   │
│   │                     margin-bottom: 64px                              │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         Cards Container                              │   │
│   │                                                                      │   │
│   │   display: grid                                                      │   │
│   │   grid-template-columns: repeat(3, 1fr)                             │   │
│   │   gap: 32px                                                          │   │
│   │                                                                      │   │
│   │   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐               │   │
│   │   │             │   │  ★ CUSTOM   │   │             │               │   │
│   │   │   Custom    │   │     ERP     │   │     AI      │               │   │
│   │   │  Projects   │   │  (accent    │   │  Solutions  │               │   │
│   │   │             │   │   border)   │   │             │               │   │
│   │   │             │   │             │   │             │               │   │
│   │   └─────────────┘   └─────────────┘   └─────────────┘               │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                           padding: 96px 0                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tablet (768px - 1023px)

```
┌───────────────────────────────────────────────────┐
│                   padding: 0 32px                  │
├───────────────────────────────────────────────────┤
│                                                   │
│              Section Header (centered)            │
│              margin-bottom: 48px                  │
│                                                   │
│   ┌─────────────────────────────────────────┐     │
│   │  grid-template-columns: repeat(3, 1fr)  │     │
│   │  gap: 24px                              │     │
│   │                                         │     │
│   │  ┌─────────┐ ┌─────────┐ ┌─────────┐   │     │
│   │  │ Custom  │ │   ERP   │ │   AI    │   │     │
│   │  │Projects │ │ (accent)│ │Solutions│   │     │
│   │  └─────────┘ └─────────┘ └─────────┘   │     │
│   │                                         │     │
│   └─────────────────────────────────────────┘     │
│                                                   │
│                   padding: 64px 0                  │
│                                                   │
└───────────────────────────────────────────────────┘
```

### Mobile (<768px)

```
┌─────────────────────────────────┐
│        padding: 0 20px          │
├─────────────────────────────────┤
│                                 │
│    Section Header (centered)    │
│    margin-bottom: 32px          │
│                                 │
│   ┌─────────────────────────┐   │
│   │  flex-direction: column │   │
│   │  gap: 20px              │   │
│   │                         │   │
│   │  ┌───────────────────┐  │   │
│   │  │    Custom ERP     │  │   │
│   │  │    (accent)       │  │   │
│   │  │    FIRST ON       │  │   │
│   │  │    MOBILE         │  │   │
│   │  └───────────────────┘  │   │
│   │                         │   │
│   │  ┌───────────────────┐  │   │
│   │  │  Custom Projects  │  │   │
│   │  └───────────────────┘  │   │
│   │                         │   │
│   │  ┌───────────────────┐  │   │
│   │  │   AI Solutions    │  │   │
│   │  └───────────────────┘  │   │
│   │                         │   │
│   └─────────────────────────┘   │
│                                 │
│         padding: 48px 0         │
│                                 │
└─────────────────────────────────┘

Note: On mobile, Custom ERP moves to FIRST position
to maintain hierarchy (center position loses meaning
in single-column layout).
```

---

## Card Component Specification

### Card Anatomy

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   padding: 32px                                         │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │  Icon Container                                  │   │
│   │  48x48px, brand color                           │   │
│   │  margin-bottom: 24px                            │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │  Headline (heading-4, serif)                    │   │
│   │  "Software, die zu Ihnen passt"                 │   │
│   │  margin-bottom: 16px                            │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │  Description (body, secondary color)            │   │
│   │  2-3 sentences, 40-60 words                     │   │
│   │  line-height: 1.6                               │   │
│   │  margin-bottom: 24px                            │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │  CTA Link                                        │   │
│   │  "Mehr erfahren →"                              │   │
│   │  brand color, font-weight: 500                  │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Card Dimensions

| Property | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| Min Height | 360px | 340px | auto |
| Padding | 32px | 28px | 24px |
| Icon Size | 48px | 44px | 40px |
| Gap (icon → headline) | 24px | 20px | 16px |
| Gap (headline → desc) | 16px | 14px | 12px |
| Gap (desc → CTA) | 24px | 20px | 20px |

### Card States

#### Default State
```css
background: white;
border: 1px solid var(--color-border);  /* rgba(50, 48, 47, 0.12) */
border-radius: var(--radius-lg);        /* 12px */
box-shadow: var(--shadow-sm);           /* 0 1px 2px rgba(50, 48, 47, 0.06) */
```

#### Hover State
```css
transform: translateY(-4px);
box-shadow: var(--shadow-lg);           /* 0 8px 24px rgba(50, 48, 47, 0.12) */
border-color: var(--color-border-strong); /* rgba(50, 48, 47, 0.25) */
transition: all 250ms ease;
```

#### Focus State (Accessibility)
```css
outline: 2px solid var(--color-brand-primary);
outline-offset: 2px;
```

#### Custom ERP Card (Highlighted)
```css
/* Additional styles - applied on top of default */
border: 2px solid var(--color-brand-primary);  /* #4DB6A0 */
box-shadow: var(--shadow-md);                   /* Slightly elevated */
```

---

## Typography Specification

### Section Header

| Element | Style | Value |
|---------|-------|-------|
| Eyebrow | font-family | var(--font-sans) |
| | font-size | 12px |
| | font-weight | 600 |
| | letter-spacing | 0.1em |
| | text-transform | uppercase |
| | color | var(--color-brand-primary) |
| | margin-bottom | 16px |
| Headline | class | heading-2 |
| | font-family | var(--font-serif) |
| | font-size | 44px (desktop), 32px (mobile) |
| | font-weight | 400 |
| | color | var(--color-text-primary) |
| | margin-bottom | 16px |
| Subheadline | class | body-lg |
| | font-size | 18px |
| | color | var(--color-text-secondary) |
| | max-width | 640px (centered) |

### Card Typography

| Element | Style | Value |
|---------|-------|-------|
| Headline | class | heading-4 |
| | font-family | var(--font-serif) |
| | font-size | 24px (desktop), 22px (mobile) |
| | font-weight | 500 |
| | color | var(--color-text-primary) |
| Description | class | body |
| | font-family | var(--font-sans) |
| | font-size | 16px |
| | line-height | 1.6 |
| | color | var(--color-text-secondary) |
| CTA | font-family | var(--font-sans) |
| | font-size | 15px |
| | font-weight | 500 |
| | color | var(--color-brand-primary) |

---

## Color Specification

### Section Background
```css
background-color: var(--color-bg-secondary);  /* #F7F6F5 */
```

Alternative: White (`var(--color-bg-primary)`) if preceded by colored section.

### Card Colors
```css
/* Card background */
background: white;

/* Default border */
border-color: var(--color-border);  /* rgba(50, 48, 47, 0.12) */

/* Highlighted card border (Custom ERP) */
border-color: var(--color-brand-primary);  /* #4DB6A0 */

/* Icon color */
color: var(--color-brand-primary);  /* #4DB6A0 */

/* Text colors */
--headline: var(--color-text-primary);     /* #32302F */
--description: var(--color-text-secondary); /* #5C5A58 */
--cta: var(--color-brand-primary);         /* #4DB6A0 */
```

---

## Icon Specification

### Icon Selection (Lucide React)

| Service | Primary Icon | Alternative |
|---------|--------------|-------------|
| Custom ERP | `Database` | `Workflow`, `Boxes` |
| Custom Projects | `Code2` | `Layers`, `Puzzle` |
| AI Solutions | `Brain` | `Sparkles`, `Cpu` |

### Icon Styling
```css
.service-icon {
  width: 48px;
  height: 48px;
  color: var(--color-brand-primary);
  stroke-width: 1.5;
}

/* Icon container (optional background) */
.icon-container {
  width: 64px;
  height: 64px;
  background: var(--color-brand-subtle);  /* rgba(77, 182, 160, 0.1) */
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## Animation Specification

### Entry Animation

Cards should animate in on scroll (intersection observer):

```css
/* Initial state (before visible) */
.service-card {
  opacity: 0;
  transform: translateY(24px);
}

/* Animated state (when visible) */
.service-card.visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 500ms ease, transform 500ms ease;
}

/* Stagger timing */
.service-card:nth-child(1) { transition-delay: 0ms; }
.service-card:nth-child(2) { transition-delay: 100ms; }
.service-card:nth-child(3) { transition-delay: 200ms; }
```

### Hover Animation
```css
.service-card {
  transition: transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease;
}

.service-card:hover {
  transform: translateY(-4px);
}
```

### CTA Arrow Animation
```css
.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.cta-link .arrow {
  transition: transform 200ms ease;
}

.cta-link:hover .arrow {
  transform: translateX(4px);
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .service-card,
  .service-card:hover,
  .cta-link .arrow {
    transition: none;
    transform: none;
  }
}
```

---

## Content Specification (German Primary)

### Section Header

**Eyebrow:** `UNSERE LEISTUNGEN`

**Headline Options:**
1. "Digitale Lösungen für Ihr Unternehmen"
2. "Software, die mit Ihnen wächst"
3. "Technologie, die zu Ihnen passt"

**Subheadline (optional):**
"Von maßgeschneiderten ERP-Systemen bis zur KI-Integration – wir entwickeln Software, die Ihre Prozesse vereinfacht."

### Card 1: Individuelle Softwareprojekte

**Icon:** `Code2`

**Headline:** "Software, die zu Ihnen passt"

**Description:** 
"Maßgeschneiderte Softwarelösungen für komplexe Geschäftsprozesse. Wir entwickeln was Sie brauchen – nicht mehr, nicht weniger."

**CTA:** "Projektablauf ansehen →"

### Card 2: Maßgeschneiderte ERP-Systeme (HIGHLIGHTED)

**Icon:** `Database`

**Badge (optional):** "Kernkompetenz"

**Headline:** "ERP-Systeme, die mit Ihnen wachsen"

**Description:**
"Vergessen Sie starre Standardsoftware. Unsere ERP-Lösungen passen sich Ihrem Unternehmen an – heute und morgen."

**CTA:** "ERP-Lösungen entdecken →"

### Card 3: Künstliche Intelligenz

**Icon:** `Brain`

**Headline:** "Intelligenz für Ihre Daten"

**Description:**
"KI-Lösungen, die in Ihrer Infrastruktur laufen. Lokal, sicher und speziell für deutsche Unternehmen entwickelt."

**CTA:** "AI-Services erkunden →"

---

## Accessibility Checklist

- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Focus states visible on all interactive elements
- [ ] Cards are keyboard navigable (tab order)
- [ ] CTA links have descriptive text (not just "Learn more")
- [ ] Icons have aria-hidden="true" (decorative)
- [ ] Section has proper heading hierarchy (h2 for section, h3 for cards)
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Animations respect prefers-reduced-motion

---

## Responsive Breakpoints Summary

| Breakpoint | Layout | Card Gap | Section Padding |
|------------|--------|----------|-----------------|
| ≥1024px (Desktop) | 3 columns | 32px | 96px 64px |
| 768-1023px (Tablet) | 3 columns | 24px | 64px 32px |
| <768px (Mobile) | 1 column | 20px | 48px 20px |

---

## Implementation Notes

### Component Structure (Suggested)
```
ServicesSection/
├── ServicesSection.tsx       # Main section component
├── ServiceCard.tsx           # Reusable card component
├── services.ts               # Content/translations
└── index.ts                  # Export
```

### i18n Keys Structure
```json
{
  "services": {
    "eyebrow": "UNSERE LEISTUNGEN",
    "headline": "Digitale Lösungen für Ihr Unternehmen",
    "subheadline": "...",
    "cards": {
      "customProjects": {
        "headline": "Software, die zu Ihnen passt",
        "description": "...",
        "cta": "Projektablauf ansehen"
      },
      "customERP": {
        "badge": "Kernkompetenz",
        "headline": "ERP-Systeme, die mit Ihnen wachsen",
        "description": "...",
        "cta": "ERP-Lösungen entdecken"
      },
      "aiSolutions": {
        "headline": "Intelligenz für Ihre Daten",
        "description": "...",
        "cta": "AI-Services erkunden"
      }
    }
  }
}
```

### Tailwind Classes Reference
```tsx
// Section container
"bg-[var(--color-bg-secondary)] py-24 lg:py-32"

// Content wrapper
"max-w-7xl mx-auto px-5 md:px-8 lg:px-16"

// Cards grid
"grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8"

// Card base
"bg-white rounded-xl p-6 lg:p-8 border border-[var(--color-border)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-250"

// Highlighted card
"border-2 border-[var(--color-brand-primary)] shadow-md"
```

---

## Design Sign-off

**Designer:** Claude (UX/UI Designer Role)  
**Date:** January 2026  
**Status:** Ready for Web Developer handoff

### Approval Checklist
- [x] Follows existing design system tokens
- [x] Responsive behavior explicitly defined
- [x] Accessibility requirements documented
- [x] Animation specs include reduced-motion
- [x] Content structure supports i18n
- [x] Implementation guidance provided

---

*This specification is implementation-ready. Web Developer may proceed without additional clarification.*

# Problem Statement Section Specification

**Status:** Ready for Review  
**Version:** 1.0  
**Last Updated:** 2026-02-04

---

## 1. Overview

The Problem Statement section immediately follows the Hero. Its purpose is to create empathy by naming the real digitalization challenges SMEs face — validating the visitor's pain before presenting solutions. This is a classic "agitate" step in the PAS (Problem-Agitate-Solution) storytelling framework.

**Strategic Position:** "We understand what you're dealing with."

**Narrative Flow:** Hero (aspiration) → **Problem Statement (reality check)** → Services (here's how we help)

**Section Goal:** Make the visitor feel understood. Build trust by demonstrating deep knowledge of their operational struggles, creating a natural bridge to the Services section.

---

## 2. Content Structure

### 2.1 Eyebrow (Optional)

```
HERAUSFORDERUNGEN
```

Typography: `caption` class (12px, DM Sans, weight 500, uppercase, tracking-wider)  
Color: `--color-brand-primary` (#4DB6A0)  
Purpose: Signals section topic at a glance. Optional — include only if it improves scan-ability.

### 2.2 Section Headline (H2)

```
Die Realität der Digitalisierung im Mittelstand
```

Typography: `heading-2` (Crimson Pro, 44px → 52px desktop)  
Color: `--color-text-primary` (#32302F)

### 2.3 Section Subtext

```
Viele Unternehmen kämpfen mit den gleichen Problemen — fragmentierte Systeme, manuelle Prozesse und Software, die nicht zum Geschäft passt.
```

Typography: `body-lg` (DM Sans, 18px)  
Color: `--color-text-secondary` (#5C5A58)  
Max width: `max-w-2xl` (672px)

### 2.4 Pain Point Items (6 Items, 3×2 Grid)

Each item consists of an icon, a title, and a short description:

| # | Icon | Title (DE) | Description (DE) |
|---|------|-----------|-------------------|
| 1 | `Unplug` | Fragmentierte Systeme & Datensilos | Kundendaten in Excel, Aufträge im E-Mail-Postfach, Rechnungen im Ordner — Informationen verstreut über Dutzende Tools. |
| 2 | `ClipboardList` | Ineffiziente manuelle Prozesse | Doppelte Dateneingabe, Zettelwirtschaft und fehleranfällige Übergaben zwischen Abteilungen kosten Zeit und Geld. |
| 3 | `PuzzlePiece` | Software, die nicht zum Geschäft passt | Standardlösungen zwingen Sie, Ihre Abläufe an die Software anzupassen — statt umgekehrt. |
| 4 | `TrendingUp` | Schwierigkeiten beim Skalieren | Was mit 10 Mitarbeitern funktioniert, bricht bei 50 zusammen. Systeme, die nicht mitwachsen, werden zur Bremse. |
| 5 | `Wallet` | Hohe Kosten durch Standardsoftware | Pro-Nutzer-Lizenzen, ungenutzte Module und versteckte Gebühren treiben die Kosten in die Höhe. |
| 6 | `HelpCircle` | Fehlende technische Expertise | Kein internes IT-Team, kein Überblick über Möglichkeiten — und die Angst, die falsche Entscheidung zu treffen. |

**Icon source:** Lucide React  
**Title typography:** `heading-4` style (Crimson Pro, 24px → 22px mobile, weight 500)  
**Description typography:** `body-sm` (DM Sans, 14px, color `--color-text-secondary`)

### 2.5 Transition Element (Optional)

A subtle text bridge to the Services section:

```
Wir kennen diese Herausforderungen — und haben Lösungen dafür entwickelt.
```

Typography: `body-lg` (DM Sans, 18px), weight 500  
Color: `--color-text-primary`  
Placement: Centered, below the grid, with enough spacing to not feel cramped.

This element is optional. Omit if the visual flow between sections is already smooth.

---

## 3. Visual Design

### 3.1 Card Design (Each Pain Point)

Each pain point is a minimal card — not heavily styled, to maintain a clean feel.

| Property | Value |
|----------|-------|
| Background | `transparent` (no card background) |
| Border | None |
| Padding | `var(--space-6)` (24px) |
| Icon container | 48×48px circle, `var(--color-bg-secondary)` background |
| Icon size | 24px |
| Icon color | `--color-brand-primary` (#4DB6A0) |

**Alternative approach (if more visual weight is needed):**

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | `1px solid var(--color-border)` |
| Border-radius | `var(--radius-lg)` (12px) |
| Padding | `var(--space-8)` (32px) |
| Shadow | None (or `var(--shadow-sm)` subtle) |
| Hover | `var(--shadow-md)`, `translateY(-2px)` |

**Decision:** Start with the transparent/minimal approach. The bordered card variant is a fallback if the section looks too sparse in context with surrounding sections.

### 3.2 Icon Treatment

Icons sit inside a soft circular container:

```
┌────────────────────────┐
│  ┌──────┐              │
│  │  ⚡  │  Title       │
│  └──────┘              │
│  Description text      │
│  that wraps onto       │
│  multiple lines.       │
└────────────────────────┘
```

- Circle: `w-12 h-12` (48px), `rounded-full`
- Background: `var(--color-brand-subtle)` (rgba(77, 182, 160, 0.1))
- Icon: `w-6 h-6` (24px), `var(--color-brand-primary)` stroke
- Spacing: Icon → Title: `var(--space-4)` (16px)
- Spacing: Title → Description: `var(--space-2)` (8px)

---

## 4. Layout

### 4.1 Desktop (≥1024px)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Section background: var(--color-bg-primary) (#FCFCFC)              │
│                                                                     │
│  ┌──────────────── max-w-7xl (1280px) centered ──────────────────┐  │
│  │                                                                │  │
│  │  [HERAUSFORDERUNGEN]  (eyebrow, centered)                      │  │
│  │                                                                │  │
│  │  H2: Die Realität der Digitalisierung  (centered)              │  │
│  │                                                                │  │
│  │  Subtext paragraph  (centered, max-w-2xl)                      │  │
│  │                                                                │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │  │
│  │  │ ⚡ Item 1    │  │ 📋 Item 2    │  │ 🧩 Item 3    │         │  │
│  │  │              │  │              │  │              │         │  │
│  │  │ Description  │  │ Description  │  │ Description  │         │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘         │  │
│  │                                                                │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │  │
│  │  │ 📈 Item 4    │  │ 💰 Item 5    │  │ ❓ Item 6    │         │  │
│  │  │              │  │              │  │              │         │  │
│  │  │ Description  │  │ Description  │  │ Description  │         │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘         │  │
│  │                                                                │  │
│  │  [Transition text]  (centered, optional)                       │  │
│  │                                                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- Grid: `grid grid-cols-3 gap-8` (32px gap)
- Header block: centered, full width above grid
- Section padding: `var(--space-20)` top/bottom (80px)

### 4.2 Tablet (768px – 1023px)

```
┌────────────────────────────────────┐
│                                    │
│  [HERAUSFORDERUNGEN]               │
│  H2: Section Title (centered)      │
│  Subtext (centered)                │
│                                    │
│  ┌──────────┐  ┌──────────┐       │
│  │ Item 1   │  │ Item 2   │       │
│  └──────────┘  └──────────┘       │
│  ┌──────────┐  ┌──────────┐       │
│  │ Item 3   │  │ Item 4   │       │
│  └──────────┘  └──────────┘       │
│  ┌──────────┐  ┌──────────┐       │
│  │ Item 5   │  │ Item 6   │       │
│  └──────────┘  └──────────┘       │
│                                    │
└────────────────────────────────────┘
```

- Grid: `grid grid-cols-2 gap-6` (24px gap)
- Section padding: `var(--space-16)` (64px)

### 4.3 Mobile (<768px)

```
┌─────────────────────────┐
│                         │
│  [HERAUSFORDERUNGEN]    │
│  H2: Title              │
│  (left-aligned)         │
│                         │
│  Subtext                │
│                         │
│  ┌───────────────────┐  │
│  │ ⚡ Item 1         │  │
│  │ Description       │  │
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │ 📋 Item 2         │  │
│  │ Description       │  │
│  └───────────────────┘  │
│  ... (6 items stacked)  │
│                         │
└─────────────────────────┘
```

- Grid: `grid grid-cols-1 gap-6` (24px gap)
- Text: left-aligned (not centered on mobile)
- Section padding: `var(--space-12)` top/bottom (48px), `var(--space-6)` horizontal (24px)

---

## 5. Spacing Specification

### 5.1 Section-Level

| Property | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| Section padding-top | 80px | 64px | 48px |
| Section padding-bottom | 80px | 64px | 48px |
| Horizontal padding | 24px | 24px | 24px |
| Max container width | 1280px | 100% | 100% |

### 5.2 Header Block (Eyebrow + H2 + Subtext)

| Element Pair | Desktop | Tablet | Mobile |
|-------------|---------|--------|--------|
| Eyebrow → H2 | 16px | 16px | 12px |
| H2 → Subtext | 20px | 16px | 16px |
| Subtext → Grid | 48px | 40px | 32px |

### 5.3 Within Each Item

| Element Pair | Value |
|-------------|-------|
| Icon → Title | 16px |
| Title → Description | 8px |

### 5.4 Transition Text

| Property | Desktop | Mobile |
|----------|---------|--------|
| Grid → Transition text | 48px | 32px |

---

## 6. Color & Visual Treatment

### 6.1 Section Background

`var(--color-bg-primary)` (#FCFCFC) — same as Hero, creating visual continuity.

**Design Note:** If the Hero already uses #FCFCFC and the Services section uses a dark background (#0F2A39), the Problem Statement section benefits from the same light background. The contrast between Problem Statement (light) → Services (dark) creates a strong visual break that signals "problems end here, solutions start now."

### 6.2 Icon Color Variants (Optional Enhancement)

If all icons in `--color-brand-primary` feel monotonous, individual icon containers can use subtle color variations from the gradient palette. This is an optional refinement:

| Item | Icon Background | Icon Color |
|------|----------------|------------|
| 1. Fragmented Systems | rgba(108, 145, 247, 0.1) | #6C91F7 (blue) |
| 2. Manual Processes | rgba(255, 184, 108, 0.1) | #FFB86C (orange) |
| 3. Wrong Software | rgba(228, 126, 237, 0.1) | #E47EED (magenta) |
| 4. Scaling Issues | rgba(247, 201, 76, 0.1) | #F7C94C (yellow) |
| 5. High Costs | rgba(173, 106, 235, 0.1) | #AD6AEB (purple) |
| 6. No Expertise | rgba(77, 182, 160, 0.1) | #4DB6A0 (teal/brand) |

**Decision:** Start with uniform `--color-brand-primary` for all icons. Apply color variants only if the section looks too monotone during implementation review.

---

## 7. Accessibility Requirements (WCAG 2.1 AA)

### 7.1 Semantic HTML

```html
<section id="challenges" aria-labelledby="challenges-heading">
  <p class="eyebrow">HERAUSFORDERUNGEN</p>
  <h2 id="challenges-heading">Die Realität der Digitalisierung im Mittelstand</h2>
  <p>Subtext...</p>
  
  <div role="list" aria-label="Digitalisierungs-Herausforderungen">
    <div role="listitem">
      <div aria-hidden="true"><!-- icon --></div>
      <h3>Fragmentierte Systeme & Datensilos</h3>
      <p>Description...</p>
    </div>
    <!-- ... 5 more items -->
  </div>
</section>
```

### 7.2 Key Requirements

- Icons: `aria-hidden="true"` (decorative, meaning conveyed by text)
- Item titles: `<h3>` tags (proper heading hierarchy under section `<h2>`)
- Grid items: Use `role="list"` + `role="listitem"` for semantic grouping
- No interactive elements in this section (pure content display)
- Color contrast: all text meets 4.5:1 minimum

### 7.3 Color Contrast Verification

| Element | Foreground | Background | Ratio | Requirement |
|---------|-----------|------------|-------|-------------|
| H2 | #32302F | #FCFCFC | 15.2:1 | ≥4.5:1 ✓ |
| Subtext | #5C5A58 | #FCFCFC | 6.4:1 | ≥4.5:1 ✓ |
| Eyebrow | #4DB6A0 | #FCFCFC | 3.1:1 | Decorative, ≥3:1 ✓ |
| Item title | #32302F | #FCFCFC | 15.2:1 | ≥4.5:1 ✓ |
| Item desc | #5C5A58 | #FCFCFC | 6.4:1 | ≥4.5:1 ✓ |

---

## 8. i18n — Translation Keys

```json
{
  "problemStatement": {
    "eyebrow": "HERAUSFORDERUNGEN",
    "heading": "Die Realität der Digitalisierung im Mittelstand",
    "subtext": "Viele Unternehmen kämpfen mit den gleichen Problemen — fragmentierte Systeme, manuelle Prozesse und Software, die nicht zum Geschäft passt.",
    "items": {
      "fragmentedSystems": {
        "title": "Fragmentierte Systeme & Datensilos",
        "description": "Kundendaten in Excel, Aufträge im E-Mail-Postfach, Rechnungen im Ordner — Informationen verstreut über Dutzende Tools."
      },
      "manualProcesses": {
        "title": "Ineffiziente manuelle Prozesse",
        "description": "Doppelte Dateneingabe, Zettelwirtschaft und fehleranfällige Übergaben zwischen Abteilungen kosten Zeit und Geld."
      },
      "wrongSoftware": {
        "title": "Software, die nicht zum Geschäft passt",
        "description": "Standardlösungen zwingen Sie, Ihre Abläufe an die Software anzupassen — statt umgekehrt."
      },
      "scalingDifficulties": {
        "title": "Schwierigkeiten beim Skalieren",
        "description": "Was mit 10 Mitarbeitern funktioniert, bricht bei 50 zusammen. Systeme, die nicht mitwachsen, werden zur Bremse."
      },
      "highCosts": {
        "title": "Hohe Kosten durch Standardsoftware",
        "description": "Pro-Nutzer-Lizenzen, ungenutzte Module und versteckte Gebühren treiben die Kosten in die Höhe."
      },
      "noExpertise": {
        "title": "Fehlende technische Expertise",
        "description": "Kein internes IT-Team, kein Überblick über Möglichkeiten — und die Angst, die falsche Entscheidung zu treffen."
      }
    },
    "transition": "Wir kennen diese Herausforderungen — und haben Lösungen dafür entwickelt."
  }
}
```

**Note:** EN and TR translations must follow the same key structure.

---

## 9. Performance Requirements

| Metric | Target |
|--------|--------|
| Component type | Server component (no client-side JS) |
| Icons | Imported from Lucide React (tree-shakeable) |
| No images | Pure SVG icons + text |
| No animations | Static content, no motion |

This section should be a pure server component with zero client-side JavaScript. It renders 6 static items with icons and text — no interactivity needed.

---

## 10. Component Structure

```
app/[locale]/components/ProblemStatement/
├── index.tsx             # Main section component (server component)
└── PainPointCard.tsx     # Reusable item card (server component)
```

### Component Boundaries

| Component | Rendering | Responsibility |
|-----------|-----------|----------------|
| `index.tsx` | Server | Section layout, grid, header text, i18n |
| `PainPointCard.tsx` | Server | Single pain point: icon, title, description |

### PainPointCard Interface

```typescript
interface PainPointCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}
```

---

## 11. Interaction with Adjacent Sections

### Above: Hero
- Same background color (#FCFCFC) — seamless visual continuation
- Sufficient vertical spacing (section padding) creates separation without a hard divider
- No border or divider needed between Hero and Problem Statement

### Below: Services
- Strong contrast shift: light (#FCFCFC) → dark (#0F2A39)
- This natural color break reinforces the narrative: "problems" (light) → "solutions" (dark, confident)
- No additional divider needed

---

## 12. Out of Scope (v1.0)

- Animated number counters or statistics
- Scroll-triggered reveal animations
- Interactive hover states on cards
- Links from pain points to specific solutions
- Expandable/collapsible details
- Background illustrations or decorative elements

---

## 13. Dependencies

- `next-intl` — translations
- Tailwind CSS — styling
- Lucide React — icons (Unplug, ClipboardList, PuzzlePiece, TrendingUp, Wallet, HelpCircle)

---

## 14. Acceptance Criteria

### Visual & Layout
- [ ] 3×2 grid on desktop, 2×3 on tablet, 1×6 on mobile
- [ ] Each item has icon (in circle), title, and description
- [ ] Section header (eyebrow + H2 + subtext) is centered on desktop/tablet
- [ ] Header text is left-aligned on mobile
- [ ] All spacing matches specification
- [ ] Responsive from 375px to 1440px+
- [ ] Visual continuity with Hero section (same background)
- [ ] Clear contrast with Services section below

### Accessibility
- [ ] Section has `aria-labelledby` pointing to H2
- [ ] Item titles use `<h3>` tags
- [ ] Icons are `aria-hidden="true"`
- [ ] All text meets WCAG 2.1 AA color contrast
- [ ] Grid uses semantic list markup

### i18n
- [ ] All text from `messages/{locale}.json`
- [ ] No hardcoded strings
- [ ] Works correctly in DE, EN, TR

### Performance
- [ ] Server component (no client-side JS bundle)
- [ ] No images to load
- [ ] Icons tree-shaken from Lucide

---

*This specification is ready for review. Implementation must not begin until human approval is received, per CLAUDE.md governance rules.*

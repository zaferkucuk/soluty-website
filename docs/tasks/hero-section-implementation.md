# Claude Code Task: Hero Section Implementation

## Task Summary

Implement the HeroSection component for Soluty GmbH website following the approved specification.

---

## Pre-Implementation Checklist

Before writing any code, read these files in order:

1. `docs/DEV_STANDARDS.md` — Coding conventions, naming, structure
2. `docs/technical_constraints.md` — Technology boundaries, quality targets
3. `docs/sections/hero.md` — Hero section specification (layout, content, design)
4. `messages/en.json` — i18n structure reference

---

## Scope

**Create:**
```
src/components/sections/HeroSection/
├── index.tsx              # Main component (exports HeroSection)
├── HeroContent.tsx        # Headline, subheadline, CTAs
├── HeroIllustration.tsx   # SVG flow diagram
└── TrustBar.tsx           # Trust badges
```

**Do NOT create:**
- New pages
- Navigation components
- Footer components
- Any components outside HeroSection

---

## Technical Requirements

### Stack
- Next.js 14+ (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- next-intl for i18n

### i18n Integration

Use `next-intl` hooks:

```typescript
import { useTranslations } from 'next-intl';

export function HeroContent() {
  const t = useTranslations('hero');
  
  return (
    <h1>{t('headline.line1')}</h1>
  );
}
```

Translation files are already in `messages/{de,en,tr}.json`.

### TypeScript Conventions

From DEV_STANDARDS.md:
- Use `interface` for props (no `I` prefix)
- Boolean props: `is`, `has`, `should` prefixes
- No default exports except for page components

```typescript
// ✓ Correct
interface HeroContentProps {
  className?: string;
}

// ✗ Wrong
interface IHeroContentProps { }
```

### Tailwind Class Order

Layout → Spacing → Sizing → Typography → Visual → Interactive

```typescript
// ✓ Correct
className="flex items-center gap-4 w-full text-lg font-medium text-gray-900 bg-white hover:bg-gray-50"
```

---

## Layout Specification

### Desktop (lg:)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌────────────────────────┐  ┌─────────────────────────────┐ │
│  │ HEADLINE               │  │ ILLUSTRATION                │ │
│  │ Line 1 (bold)          │  │ Order→Route→Driver          │ │
│  │ Line 2 (brand color)   │  │           ↓                 │ │
│  │                        │  │ Invoice←Delivery            │ │
│  │ SUBHEADLINE (muted)    │  │                             │ │
│  │                        │  │                             │ │
│  │ [PRIMARY] [SECONDARY]  │  │                             │ │
│  └────────────────────────┘  └─────────────────────────────┘ │
│                                                              │
│  ──────────────────────────────────────────────────────────  │
│  [🇩🇪 Built in Germany]  [✓ GDPR-compliant]                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘

Split: 55% content / 45% illustration
```

### Mobile (default)

```
┌─────────────────────┐
│ HEADLINE            │
│ Line 1              │
│ Line 2              │
│                     │
│ SUBHEADLINE         │
│                     │
│ [PRIMARY - full]    │
│ [SECONDARY - full]  │
│                     │
│ ┌─────────────────┐ │
│ │ ILLUSTRATION    │ │
│ └─────────────────┘ │
│                     │
│ ─────────────────── │
│ TRUST BADGES        │
└─────────────────────┘
```

---

## Illustration Specification

Create a simple SVG flow diagram:

```
ORDER ──────► ROUTE ──────► DRIVER
  📦           🗺️            🚚
                              │
                              ▼
              INVOICE ◄───── DELIVERY
                🧾             ✓
```

**Requirements:**
- Inline SVG (not external file)
- Use Lucide icons or simple shapes
- 2 colors max: `text-blue-600` + `text-gray-400`
- Line weight: 2px
- Optional: Subtle CSS animation on connection lines
- Must have `aria-hidden="true"` (decorative)

---

## Color Tokens (Temporary)

Until brand colors are defined, use Tailwind defaults:

| Element | Class |
|---------|-------|
| H1 Line 1 | `text-gray-900` |
| H1 Line 2 | `text-blue-600` |
| Subheadline | `text-gray-600` |
| Primary CTA bg | `bg-blue-600 hover:bg-blue-700` |
| Primary CTA text | `text-white` |
| Secondary CTA | `text-blue-600 hover:text-blue-700 underline` |
| Trust badges | `text-gray-500` |
| Section bg | `bg-white` |

---

## Spacing Tokens

| Element | Class |
|---------|-------|
| Section padding | `py-12 md:py-20 lg:py-28` |
| Container | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| Headline gap | `space-y-2` |
| Content gap | `mt-6` (subheadline), `mt-8` (CTAs) |
| CTA gap | `gap-4` |
| Trust bar | `mt-12 lg:mt-16` |

---

## Acceptance Criteria

Before marking complete, verify:

- [ ] All text comes from i18n (no hardcoded strings)
- [ ] Responsive: Works 375px → 1440px+
- [ ] H1 is the only `<h1>` element
- [ ] CTAs have proper focus states
- [ ] Illustration has `aria-hidden="true"`
- [ ] TypeScript: No `any` types, strict mode passes
- [ ] Tailwind: No custom CSS, class order correct
- [ ] Component exports follow DEV_STANDARDS.md

---

## Test Command

After implementation, verify with:

```bash
npm run dev
# Visit http://localhost:3000/en (or /de, /tr)
# Check responsive breakpoints
# Test keyboard navigation
```

---

## Out of Scope

Do NOT implement:
- Header/Navigation
- Other page sections
- Footer
- Page routing setup
- next-intl configuration (assume already configured)
- Any external API calls

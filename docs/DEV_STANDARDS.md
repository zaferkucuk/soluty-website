# Development Standards

## Purpose

This document defines mandatory development standards for this project. Its goal is to ensure:

- High code quality
- Long-term maintainability
- Predictable structure
- Consistent AI-generated output

These standards apply to all code, regardless of whether it is written by a human or AI.

---

## Part 1: Principles

### General Principles

- Code must be clear over clever
- Readability is prioritized over brevity
- Explicit is always better than implicit
- Consistency beats personal preference

If a choice is unclear, choose the option that is:

1. Easier to understand
2. Easier to maintain
3. Easier to review

### Project Structure

- File and folder structure must be logical and predictable
- Deep nesting should be avoided unless justified
- Related files must be grouped together

No ad-hoc or one-off structures are allowed.

### Naming Conventions

- Descriptive names over short names
- No abbreviations unless universally understood
- File names must clearly reflect their responsibility

Examples:

- `HeroSection.tsx` ✅
- `HS.tsx` ❌

### Component Design (Frontend)

- Components should have a single responsibility
- Large components must be broken down
- Props should be minimal and explicit

Components must not:

- Contain unrelated logic
- Handle concerns outside their scope

### Code Style

- Consistent formatting is mandatory
- Linting rules must be respected
- No commented-out code in committed files

Temporary code must not reach the repository.

### Comments & Documentation

- Code should be self-explanatory first
- Comments are used only when intent is not obvious
- Comments must explain **why**, not **what**

### Error Handling

- Errors must be handled explicitly
- Silent failures are not allowed
- User-facing errors must be clear and actionable

### Performance Awareness

- Avoid unnecessary re-renders
- Avoid premature optimization
- Performance trade-offs must be conscious and documented

### Testing Expectations

- Critical logic must be testable
- Code should be written with testability in mind
- Tests should verify behavior, not implementation details

### AI-Specific Rules

When generating or modifying code, AI must:

- Follow this document strictly
- Avoid introducing patterns not used elsewhere
- Ask before deviating from established conventions

### Review Readiness Rule

Every code change must be:

- Understandable without additional explanation
- Reviewable in isolation
- Aligned with project standards

### Final Rule

If code quality is questionable, execution must stop. Quality is not negotiable.

---

## Part 2: Project-Specific Standards

### Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| i18n | next-intl |
| Content | JSON files |

### Project Structure

```
soluty-website/
├── src/
│   ├── app/
│   │   └── [locale]/        # Locale-based routing
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       └── ...
│   ├── components/
│   │   ├── ui/              # Reusable UI primitives
│   │   └── sections/        # Page sections (Hero, Services, etc.)
│   ├── lib/                 # Utilities, helpers
│   └── styles/              # Global styles (if needed)
├── messages/                # i18n JSON files
│   ├── de.json              # German (default)
│   ├── en.json              # English
│   └── tr.json              # Turkish
├── public/                  # Static assets
└── docs/                    # Project documentation
```

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `HeroSection.tsx` |
| Utilities | kebab-case | `format-date.ts` |
| Hooks | camelCase with `use` prefix | `useScrollPosition.ts` |
| Types | PascalCase | `types.ts` |
| Constants | SCREAMING_SNAKE_CASE | `constants.ts` |

### TypeScript Conventions

**Type/Interface Naming:**

- No `I` prefix for interfaces
- No `T` prefix for types
- Use descriptive names with context

```typescript
// ✅ Correct
interface HeroSectionProps {
  headline: string
  subheadline: string
}

// ❌ Wrong
interface IHeroSectionProps { ... }
```

**Boolean Props:**

- Use `is`, `has`, `should` prefixes

```typescript
interface ButtonProps {
  isDisabled: boolean
  hasIcon: boolean
  shouldAnimate: boolean
}
```

**Component Props:**

- Use `interface` for component props (extendable)
- Use `type` for unions, intersections, utility types

```typescript
// Props: interface
interface CardProps {
  title: string
  children: React.ReactNode
}

// Union: type
type ButtonVariant = 'primary' | 'secondary' | 'ghost'
```

### Tailwind CSS Standards

**Class Organization:**

Follow consistent ordering:

1. Layout (display, position)
2. Spacing (margin, padding)
3. Sizing (width, height)
4. Typography (font, text)
5. Visual (background, border, shadow)
6. Interactive (hover, focus, transition)

```tsx
// ✅ Organized
<div className="flex items-center gap-4 p-6 w-full text-lg bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">

// ❌ Random order
<div className="shadow-sm hover:shadow-md text-lg flex bg-white p-6 rounded-lg w-full gap-4 items-center transition-shadow">
```

**Avoid:**

- Inline styles
- CSS-in-JS mixing
- `@apply` overuse (use sparingly)

### Multilingual Content (i18n)

**Rules:**

- No hardcoded strings in components
- All user-facing text must come from translation files
- German is the canonical/default language

**JSON Structure:**

```json
{
  "hero": {
    "headline": "Stop adapting your business to software.",
    "headlinePart2": "We build ERP systems that adapt to your delivery workflows.",
    "subheadline": "Custom ERP solutions for small and medium-sized delivery businesses — designed around your workflow, not the other way around.",
    "cta": {
      "primary": "Discuss your delivery setup",
      "secondary": "See how custom ERP works"
    }
  },
  "trust": {
    "builtInGermany": "Built in Germany",
    "gdprCompliant": "GDPR-compliant"
  }
}
```

**Key Naming:**

- Use nested objects for sections
- Use camelCase for keys
- Keep keys descriptive but concise

### Git Workflow

**Branch Naming:**

```
feature/<short-description>
fix/<short-description>
docs/<short-description>
refactor/<short-description>
```

Examples:

- `feature/hero-section`
- `fix/mobile-nav-alignment`
- `docs/update-readme`

**Commit Messages (Conventional Commits):**

Format:

```
<type>(<scope>): <description>
```

Types:

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code restructure, no feature change |
| `chore` | Build, config, dependencies |
| `test` | Adding or fixing tests |

Examples:

```
feat(hero): implement hero section layout
fix(i18n): correct German translation key
docs(readme): update setup instructions
style(hero): adjust CTA button spacing
refactor(components): extract TrustBadge component
chore(deps): update next-intl to v4
```

**Rules:**

- Use imperative mood ("add" not "added")
- Keep subject line under 72 characters
- Scope is optional but recommended

### Import Order

Maintain consistent import ordering:

```typescript
// 1. External packages
import { useTranslations } from 'next-intl'
import Image from 'next/image'

// 2. Internal modules (absolute paths)
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

// 3. Types
import type { HeroSectionProps } from './types'

// 4. Styles (if any)
import './styles.css'
```

### Performance Rules

- Images: Use Next.js `<Image>` component, WebP format, proper sizing
- Fonts: Use `next/font` for optimization
- Bundle: Keep page bundles minimal, use dynamic imports for heavy components
- LCP target: Under 2.5 seconds

### Accessibility (a11y)

- Semantic HTML is mandatory
- All interactive elements must be keyboard accessible
- Images must have meaningful `alt` text
- Color contrast must meet WCAG 2.1 AA

---

## Compliance

All contributors (human and AI) must follow these standards.

Deviations require explicit approval and documentation.

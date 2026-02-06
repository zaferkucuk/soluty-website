# Button System

> Wealthsimple-inspired button design system for Soluty

## Overview

Our button system follows Wealthsimple's clean, professional approach:
- **Primary actions** use Graphite (#3D3B39) backgrounds for maximum visibility
- **Secondary actions** use bordered white backgrounds
- All buttons use pill shape (border-radius: 9999px)
- Consistent sizing across the application

**Color Strategy:** Koyu buton stratejisi — tüm primary butonlar Graphite, yeşil (#4DB6A0) sadece accent (ikon, badge, link).

---

## Variants

### Primary
- **Use:** Main CTAs, form submissions, key actions
- **Style:** Graphite background (#3D3B39), white text
- **Hover:** Background lightens to #555250, slight lift + shadow

```tsx
<Button variant="primary">Get started</Button>
```

### Secondary
- **Use:** Alternative actions, cancel buttons, "Log in"
- **Style:** White background, dark border, dark text
- **Hover:** Light gray background

```tsx
<Button variant="secondary">Log in</Button>
```

### Ghost
- **Use:** Navigation links, tertiary actions, minimal UI
- **Style:** Transparent, dark text only
- **Hover:** Text turns brand color

```tsx
<Button variant="ghost">Learn more</Button>
```

### Brand
- **Use:** Special emphasis, promotional CTAs (use sparingly)
- **Style:** Brand teal (#4DB6A0), white text
- **Hover:** Darker teal (#3DA08C) + lift + shadow

```tsx
<Button variant="brand">Start free trial</Button>
```

---

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-inverse` | `#3D3B39` (Graphite) | Primary button background |
| `--color-bg-inverse-hover` | `#555250` | Primary button hover background |
| `--color-text-inverse` | `#FFFFFF` | Button text on dark bg |
| `--color-brand-primary` | `#4DB6A0` | Brand button bg |
| `--color-brand-hover` | `#3DA08C` | Brand button hover |
| `--color-border-strong` | `rgba(50,48,47,0.25)` | Secondary button border |

### Contrast Ratios

| State | Color | on #FCFCFC | WCAG |
|-------|-------|-----------|------|
| Primary default | `#3D3B39` | 11.8:1 | ✅ AAA |
| Primary hover | `#555250` | 7.1:1 | ✅ AA |
| Brand default | `#4DB6A0` | 3.1:1 | ⚠️ Large text only |

---

## Sizes

| Size | Padding | Font Size | Use Case |
|------|---------|-----------|----------|
| `sm` | 10px 20px | 13px | Header buttons, compact UI |
| `md` | 14px 28px | 15px | Default, most buttons |
| `lg` | 16px 32px | 16px | Hero CTAs, prominent actions |

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

---

## Hover Behavior

```css
.btn-primary:hover {
  background-color: var(--color-bg-inverse-hover);  /* #555250 */
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(61, 59, 57, 0.25);
}
```

Transition: `all 150ms ease` (--transition-fast).

---

## Icons

```tsx
// Icon on right (default)
<Button icon={<ArrowIcon />}>Continue</Button>

// Icon on left
<Button icon={<PlusIcon />} iconPosition="left">Add item</Button>
```

---

## As Link

For navigation, use `as="link"` with `href`:

```tsx
<Button as="link" href="/contact" variant="primary">
  Contact us
</Button>
```

---

## Component Import

```tsx
import { Button } from '@/components/ui/Button'

// Or use convenience exports
import { 
  PrimaryButton, 
  SecondaryButton, 
  GhostButton, 
  BrandButton 
} from '@/components/ui'
```

---

## Design Reference

### Header
```
[Logo] [Nav] [Nav] [Nav]     [Log in] [Contact →]
                              ↑         ↑
                           Secondary  Primary (#3D3B39)
```

### Hero
```
Manage your
business digitally

Subheadline text here...

[Get Started →]  ← Primary (#3D3B39), large size
```

---

## Accessibility

- All buttons have `focus-visible` ring with brand color
- Minimum touch target: 44x44px on mobile
- Primary button contrast: 11.8:1 (WCAG AAA)
- Clear hover/active states with visible color change

---

## Examples in Use

### Header
```tsx
<Button as="link" href="/login" variant="secondary" size="sm">
  Sign in
</Button>
<Button as="link" href="#contact" variant="primary" size="sm">
  Contact →
</Button>
```

### Hero
```tsx
<Button as="link" href="#contact" variant="primary" size="lg">
  Get Started →
</Button>
```

### Section CTA
```tsx
<Button as="link" href="#contact" variant="primary" size="md">
  Beratung anfragen →
</Button>
```

### Form
```tsx
<Button type="submit" variant="primary">
  Submit
</Button>
<Button type="button" variant="secondary" onClick={onCancel}>
  Cancel
</Button>
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | Feb 2026 | Graphite #3D3B39 as primary button color, hover #555250, contrast table added |
| 1.0 | Jan 2025 | Initial button system with #32302F |

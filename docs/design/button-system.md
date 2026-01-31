# Button System

> Wealthsimple-inspired button design system for Soluty

## Overview

Our button system follows Wealthsimple's clean, professional approach:
- **Primary actions** use dark backgrounds for maximum visibility
- **Secondary actions** use bordered white backgrounds
- All buttons use pill shape (border-radius: 9999px)
- Consistent sizing across the application

---

## Variants

### Primary
- **Use:** Main CTAs, form submissions, key actions
- **Style:** Dark background (#32302F), white text
- **Hover:** Slight lift + shadow

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
- **Use:** Special emphasis, promotional CTAs
- **Style:** Brand teal (#4DB6A0), white text
- **Hover:** Darker teal + lift + shadow

```tsx
<Button variant="brand">Start free trial</Button>
```

---

## Sizes

| Size | Padding | Font Size | Use Case |
|------|---------|-----------|----------|
| `sm` | 16px 8px | 14px | Header buttons, compact UI |
| `md` | 24px 12px | 15px | Default, most buttons |
| `lg` | 32px 16px | 16px | Hero CTAs, prominent actions |

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

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

### Wealthsimple Header
```
[Logo] [Nav] [Nav] [Nav]     [Log in] [Get started]
                              ↑         ↑
                           Secondary  Primary
```

### Wealthsimple Hero
```
Better than
your bank

Subheadline text here...

[Get started]  ← Primary, large size
```

---

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-text-primary` | #32302F | Primary button bg, text |
| `--color-text-inverse` | #FFFFFF | Button text on dark bg |
| `--color-brand-primary` | #4DB6A0 | Brand button bg |
| `--color-brand-hover` | #3DA08C | Brand button hover |
| `--color-border-strong` | rgba(50,48,47,0.25) | Secondary button border |

---

## Accessibility

- All buttons have `focus-visible` ring with brand color
- Minimum touch target: 44x44px on mobile
- Sufficient color contrast (WCAG AA)
- Clear hover/active states

---

## Examples in Use

### Header
```tsx
<Button as="link" href="/login" variant="secondary" size="sm">
  Log in
</Button>
<Button as="link" href="#contact" variant="primary" size="sm">
  Contact
</Button>
```

### Hero
```tsx
<Button as="link" href="#contact" variant="primary" size="lg">
  Request Consultation
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

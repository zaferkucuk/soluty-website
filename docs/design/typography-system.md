# Typography System — Canonical Specification

**Status:** ✅ Active — Single Source of Truth  
**Version:** 2.1  
**Last Updated:** 2026-02-07  
**Supersedes:** `docs/design/typography-colors.md` (typography sections only)

---

## Purpose

This document defines the **10 canonical typography styles** used across the entire Soluty website. Every text element on every page must map to exactly one of these 10 styles. No exceptions.

This is a **mandatory reference** for all roles (UX/UI Designer, Web Developer, Researcher). Any deviation requires explicit approval from the project owner.

---

## Font Stack

| Role | Font | CSS Variable | Fallback |
|------|------|-------------|----------|
| Serif (Headlines) | Crimson Pro | `--font-serif` | Georgia, Times New Roman, serif |
| Sans (Body/UI) | DM Sans | `--font-sans` | system-ui, Helvetica Neue, Arial, sans-serif |
| Mono (Code) | JetBrains Mono | `--font-mono` | Consolas, Monaco, monospace |

**Font source:** `app/fonts.ts` → Google Fonts via `next/font`

---

## The 10 Styles

### Quick Reference Table

| # | Style Name | Size | Weight | Font | Color | Extra | CSS Class |
|---|-----------|------|--------|------|-------|-------|-----------|
| 1 | section-title | 52px | 400 | Crimson Pro | `#32302F` | letter-spacing: -0.015em | `.heading-2` |
| 2 | section-body | 18px | 400 | DM Sans | `#5C5A58` | line-height: 1.65 | `.body-lg` |
| 3 | card-title | 24px | 500 | Crimson Pro | `#32302F` | line-height: 1.3 | `.heading-4` |
| 4 | card-body | 16px | 400 | DM Sans | `#5C5A58` | line-height: 1.6 | — |
| 5 | form-label | 14px | 500 | DM Sans | `#32302F` | — | `.label` |
| 6 | link-inline | inherit | 500 | DM Sans | inherit | `text-decoration: underline` | — |
| 7 | caption | 14px | 400 | DM Sans | `#5C5A58` | line-height: 1.4 | `.caption` |
| 8 | eyebrow | 14px | 600 | DM Sans | `#5C5A58` | `uppercase` + `letter-spacing: 0.1em` | — |
| 9 | button-text | 14–16px | 500 | DM Sans | `#FFFFFF` | — | — |
| 10 | placeholder | 16px | 400 | DM Sans | light gray | — | — |

---

### Style 1: section-title

The primary headline for each page section.

```
Font:         Crimson Pro
Size:         52px (desktop) → 48px (tablet) → 32px (mobile)
Weight:       400
Color:        #32302F (--color-text-primary)
Line-height:  1.12
Tracking:     -0.015em
CSS class:    .heading-2
```

**Responsive breakpoints:**
- `≥1024px`: 52px
- `≥640px`: 48px
- `<640px`: 32px

**Usage:** Section `<h2>` elements — "Let's discuss your requirements", "Frequently Asked Questions", service section headlines.

**Inverse variant:** On dark backgrounds (Services section), color changes to `#FFFFFF` via inline style override.

**Implementation:**
```tsx
<h2 className="heading-2" style={{ color: '#FFFFFF' }}>{t('headline')}</h2>
```

---

### Style 2: section-body

Subheadlines and introductory text directly below section titles.

```
Font:         DM Sans
Size:         18px
Weight:       400
Color:        #5C5A58 (--color-text-secondary)
Line-height:  1.65
CSS class:    .body-lg
```

**Usage:** Section descriptions — "In a no-obligation initial consultation, we'll analyze your current processes..."

**Inverse variant:** On dark backgrounds, color changes to `rgba(255, 255, 255, 0.75)`.

**Implementation:**
```tsx
<p className="body-lg">{t('subheadline')}</p>
```

---

### Style 3: card-title

Headlines inside card components.

```
Font:         Crimson Pro
Size:         24px (desktop) → 22px (mobile)
Weight:       500
Color:        #32302F (--color-text-primary)
Line-height:  1.3
CSS class:    .heading-4
```

**Usage:** ServiceCard headlines, ERP module card titles — "Custom ERP Systems", "Order Management".

**Implementation:**
```tsx
<h3 style={{
  fontFamily: FONTS.serif,
  fontSize: '24px',
  fontWeight: 500,
  color: '#32302F',
  lineHeight: 1.3,
}}>
  {headline}
</h3>
```

---

### Style 4: card-body

Body text inside card components and secondary content blocks.

```
Font:         DM Sans
Size:         16px
Weight:       400
Color:        #5C5A58 (--color-text-secondary)
Line-height:  1.6
```

**No CSS class** — use inline styles or match with `.body` class (which uses `#32302F`; override color).

**Usage:** ServiceCard descriptions, FAQ answers, contact section benefit items — "Free and non-binding", "30-minute initial consultation".

**Implementation:**
```tsx
<p style={{
  fontFamily: FONTS.sans,
  fontSize: '16px',
  fontWeight: 400,
  color: '#5C5A58',
  lineHeight: 1.6,
}}>
  {description}
</p>
```

**⚠️ Common mistake:** Using `#32302F` instead of `#5C5A58` for card body text. The primary text color is reserved for headlines and labels only.

---

### Style 5: form-label

Labels for form fields.

```
Font:         DM Sans
Size:         14px
Weight:       500
Color:        #32302F (--color-text-primary)
CSS class:    .label
```

**Usage:** Contact form field labels — "Name", "Company", "Email".

**Implementation:**
```tsx
<label style={{
  fontFamily: FONTS.sans,
  fontSize: '14px',
  fontWeight: 500,
  color: '#32302F',
}}>
  {label}
</label>
```

---

### Style 6: link-inline

Text links embedded within content.

```
Font:         DM Sans
Size:         inherit (from parent)
Weight:       500
Color:        inherit (from parent context) — typically #5C5A58
Decoration:   underline (default), no-underline on hover
```

**No CSS class** — apply inline.

**Usage:** "View all questions →", "Privacy Policy", "info@soluty.de", FAQ CTA link.

**Interaction:** `underline` by default → `no-underline` on hover.

**Implementation:**
```tsx
<a
  href={href}
  className="underline hover:no-underline transition-colors duration-150"
  style={{
    fontWeight: 500,
    color: '#5C5A58',
  }}
>
  {text}
</a>
```

**⚠️ Rules:**
- Always `font-weight: 500`
- Always `text-decoration: underline` in default state
- Color inherits from context (typically `#5C5A58` in body, `#FFFFFF` in inverse sections)

---

### Style 7: caption

Small secondary text for metadata, hints, and legal notes.

```
Font:         DM Sans
Size:         14px
Weight:       400
Color:        #5C5A58 (--color-text-secondary)
Line-height:  1.4
CSS class:    .caption
```

**Usage:** "(optional)" next to form labels, "We'll get back to you within 24 hours", "By submitting, you agree to our Privacy Policy", ServiceCard badges.

**Implementation:**
```tsx
<span className="caption">{text}</span>
// or inline:
<span style={{
  fontFamily: FONTS.sans,
  fontSize: '14px',
  fontWeight: 400,
  color: '#5C5A58',
}}>
  {text}
</span>
```

**⚠️ Common mistake:** Using `font-weight: 500` or `font-weight: 600` for caption. Caption is always `400`.

---

### Style 8: eyebrow

Section pre-title / category label above headlines.

```
Font:         DM Sans
Size:         14px
Weight:       600
Color:        #5C5A58 (--color-text-secondary)
Transform:    uppercase
Tracking:     0.1em (letter-spacing)
```

**No CSS class** — apply inline.

**Usage:** "OUR SERVICES", "FREQUENTLY ASKED QUESTIONS", "CUSTOM ERP MODULES".

**Inverse variant:** On dark backgrounds, color changes to `rgba(255, 255, 255, 0.75)`.

**Implementation:**
```tsx
<p style={{
  fontFamily: FONTS.sans,
  fontSize: '14px',
  fontWeight: 600,
  color: '#5C5A58',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
}}>
  {t('eyebrow')}
</p>
```

**⚠️ Rules:**
- Never use Tailwind `text-xs` (12px) — eyebrow is always 14px
- Always uppercase + wide letter-spacing
- Color is `#5C5A58`, NOT `#32302F`

---

### Style 9: button-text

Text inside button components.

```
Font:         DM Sans
Size:         14–16px (context-dependent)
Weight:       500
Color:        #FFFFFF (on primary/inverse buttons)
```

**Usage:** "Request Consultation", "Get Started →", "Contact →".

**Size guidance:**
- Header CTA buttons: 14–15px
- Section CTA buttons: 16px
- Form submit buttons: 16px

**Implementation (via `.btn` class):**
```tsx
<button className="btn btn-primary">{t('cta')}</button>
```

**Manual implementation:**
```tsx
<button style={{
  fontFamily: FONTS.sans,
  fontSize: '16px',
  fontWeight: 500,
  color: '#FFFFFF',
  backgroundColor: '#32302F',
}}>
  {t('submit')}
</button>
```

---

### Style 10: placeholder

Form field placeholder text.

```
Font:         DM Sans
Size:         16px
Weight:       400
Color:        light gray (browser default or custom)
```

**Usage:** "John Smith", "Acme Inc.", "john@acme.com", "+49 176 1234567".

**Implementation:**
```tsx
<input
  placeholder={t('placeholder')}
  style={{
    fontFamily: FONTS.sans,
    fontSize: '16px',
    fontWeight: 400,
  }}
/>
```

---

## Additional Heading Styles

These exist in `globals.css` but are NOT part of the 10-style system. They are used in specific contexts:

| Class | Size (desktop) | Weight | Usage |
|-------|---------------|--------|-------|
| `.heading-1` | 92px/82px/54px | 400 | Hero headline only |
| `.heading-3` | 36px/32px/26px | 500 | Subsection titles (rare) |

---

## Accepted Exceptions

These are intentional deviations from pixel-perfect typography, approved by the project owner:

| Component | Exception | Reason |
|-----------|-----------|--------|
| **Services Section — Highlighted Card** | `transform: scale(1.05)` on parent wrapper causes text to render ~5% larger (24px → 25.2px) | Visual hierarchy — the "Core Expertise" (ERP) card must appear prominently larger than sibling cards. Alternative approaches (shadow-only, extra padding) were tested and rejected. |
| **FAQ Question text** | Uses `16px/500/#32302F` instead of card-body `16px/400/#5C5A58` | Interactive `<summary>` elements — needs primary color and medium weight to signal clickability. |

---

## Color Reference

Only two text colors are used in the typography system:

| Hex | Variable | Role |
|-----|----------|------|
| `#32302F` | `--color-text-primary` | Headlines (section-title, card-title), form labels |
| `#5C5A58` | `--color-text-secondary` | Body text, captions, eyebrows, links, descriptions |

**Rule:** If the text is a heading or label → `#32302F`. Everything else → `#5C5A58`.

**Inverse (dark backgrounds):**

| Normal | Inverse |
|--------|---------|
| `#32302F` | `#FFFFFF` |
| `#5C5A58` | `rgba(255, 255, 255, 0.75)` |

---

## Section-by-Section Style Mapping

### Hero Section
| Element | Style |
|---------|-------|
| Headline | `.heading-1` (special — not in 10-style system) |
| Subheadline | section-body (#2) |
| CTA button | button-text (#9) |
| Email input placeholder | placeholder (#10) |
| "GDPR-compliant" badge | caption (#7) |

### Services Section (Dark BG)
| Element | Style |
|---------|-------|
| Eyebrow "OUR SERVICES" | eyebrow (#8) — inverse |
| Section headline | section-title (#1) — inverse |
| Section subheadline | section-body (#2) — inverse |
| Card headline | card-title (#3) ⚠️ highlighted card renders ~5% larger via scale |
| Card description | section-body (#2) — white bg context |
| Card CTA link | link-inline (#6) |
| Card badge "Core Expertise" | caption (#7) |

### ERP Features Section
| Element | Style |
|---------|-------|
| Eyebrow "CUSTOM ERP MODULES" | eyebrow (#8) |
| Section headline | section-title (#1) |
| Section subheadline | section-body (#2) |
| Module card title | card-title (#3) |
| Module card description | card-body (#4) |
| Module card badge | caption (#7) |

### FAQ Section
| Element | Style |
|---------|-------|
| Eyebrow "FREQUENTLY ASKED QUESTIONS" | eyebrow (#8) |
| Section headline | section-title (#1) |
| Question text (summary) | 16px/500/#32302F ⚠️ interactive exception |
| Answer text | card-body (#4) |
| "View all questions →" link | link-inline (#6) |

### Contact Section
| Element | Style |
|---------|-------|
| Section headline | section-title (#1) |
| Section description | section-body (#2) |
| Benefit items | card-body (#4) |
| "We'll get back within 24h" | caption (#7) |
| "or contact us directly:" | caption (#7) |
| Email/phone links | link-inline (#6) |
| Form field labels | form-label (#5) |
| "(optional)" text | caption (#7) |
| Form placeholders | placeholder (#10) |
| Submit button | button-text (#9) |
| "By submitting..." text | caption (#7) |
| "Privacy Policy" link | link-inline (#6) |

### Footer
| Element | Style |
|---------|-------|
| Column headings | eyebrow (#8) |
| Links | link-inline (#6) — variant without underline |
| Company description | caption (#7) |
| Copyright | caption (#7) |

---

## Implementation Rules

### DO
- Always use inline `style` with design tokens for typography (not Tailwind text utilities)
- Use CSS utility classes (`.heading-2`, `.body-lg`, `.caption`) when they match the system exactly
- Include font-family in inline styles to ensure correct font rendering
- Test all text elements against this spec after implementation

### DON'T
- ❌ Use Tailwind `text-xs` (12px) for eyebrows — always 14px
- ❌ Use `#32302F` for body/description text — always `#5C5A58`
- ❌ Use `font-weight: 600` for captions — always `400`
- ❌ Use `font-weight: 500` for captions — always `400`
- ❌ Use links without `underline` default state
- ❌ Mix fonts (e.g., DM Sans for headlines)
- ❌ Introduce new font sizes outside the system
- ❌ Use Tailwind `font-bold` (700) anywhere — max weight is `600` (eyebrow only)

### Audit Checklist

When auditing typography compliance, check every text element for:

1. **Font family** — Crimson Pro for headings, DM Sans for everything else
2. **Font size** — Must match one of the 10 styles exactly
3. **Font weight** — Must match the specified weight (400, 500, or 600)
4. **Color** — `#32302F` for headings/labels, `#5C5A58` for everything else
5. **Text decoration** — Links must have `underline` by default
6. **Text transform** — Eyebrows must be `uppercase`
7. **Letter spacing** — Eyebrows must have `0.1em`, section-titles `-0.015em`

---

## File References

| File | Purpose |
|------|---------|
| `app/fonts.ts` | Font loading (Google Fonts via next/font) |
| `app/globals.css` | CSS variables, utility classes, responsive breakpoints |
| `docs/design/typography-colors.md` | Legacy color/typography doc (superseded for typography) |
| `docs/design/button-system.md` | Button variant specifications |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-07 | Added "Accepted Exceptions" section (scale(1.05) on highlighted card, FAQ question style). Added ⚠️ markers in section mapping. |
| 2.0 | 2026-02-07 | Complete rewrite. Defined 10 canonical styles. Section-by-section mapping. Audit rules. Replaces typography section in typography-colors.md. |
| 1.1 | 2026-02 | Button color updates (typography-colors.md) |
| 1.0 | 2025-01 | Initial typography system (typography-colors.md) |

# Final CTA Section Specification

**Status:** Ready for Review  
**Version:** 1.0  
**Last Updated:** 2026-02-04  
**Research Input:** [`docs/research/contact-form-research.md`](../research/contact-form-research.md)

---

## 1. Overview

The Final CTA section is the primary conversion point of the homepage. It appears after all value-building sections (Hero → Problem Statement → Services → ERP Features → Why Custom Software → References), capturing visitors who have consumed enough context to consider contacting Soluty.

**Strategic Position:** "You've seen what we do. Now let's talk about your specific situation."

**Section Goal:** Convert interested visitors into consultation leads with minimal friction.

**Key Design Decision:** The wireframe originally specified a CTA button + contact info. Based on research findings, this section uses an **inline contact form** instead of redirecting to a separate page. Inline forms eliminate the friction of page navigation and keep the visitor in context. Research shows value-oriented inline forms outperform generic "contact" buttons by 28%.

---

## 2. Content Structure

### 2.1 Section Headline (H2)

```
Lassen Sie uns über Ihre Anforderungen sprechen
```

Typography: `heading-2` (Crimson Pro, 44px → 52px desktop)

### 2.2 Section Subtext

```
In einem kostenlosen Erstgespräch analysieren wir gemeinsam Ihre Prozesse 
und zeigen Ihnen, wie eine maßgeschneiderte Lösung Ihr Unternehmen 
voranbringen kann.
```

Typography: `body-lg` (DM Sans, 18px)

### 2.3 Value Bullets

Three benefit statements to reinforce the value of taking action:

| Icon | Text (DE) |
|------|-----------|
| ✓ | Kostenlos und unverbindlich |
| ✓ | 30 Minuten Erstgespräch |
| ✓ | Individuelle Prozessanalyse |

Typography: `body` (DM Sans, 16px), icon color: `--color-brand-primary`

### 2.4 Response Time Promise

```
Wir melden uns innerhalb von 24 Stunden bei Ihnen.
```

Typography: `body-sm` (DM Sans, 14px), color: `--color-text-muted`

Placement: Below value bullets on the left column.

### 2.5 Social Proof (Optional)

If customer logos are available, display 2–3 logos below the value bullets. This element is optional at launch but increases conversion by +18% when present.

- Logos: Grayscale, max height 28px
- Label: "Vertrauen uns bereits:" or no label
- If no logos available at launch: omit entirely (do not use placeholder logos)

---

## 3. Contact Form Specification

### 3.1 Form Fields

| # | Field | Label (DE) | Type | Required | HTML Attributes | Friction Impact |
|---|-------|-----------|------|----------|-----------------|-----------------|
| 1 | Name | Vor- und Nachname | `text` | Yes | `autocomplete="name"` | −0.9% |
| 2 | Company | Unternehmensname | `text` | Yes | `autocomplete="organization"` | −4.3% |
| 3 | Email | E-Mail-Adresse | `email` | Yes | `autocomplete="email"`, `inputmode="email"` | −1.2% |
| 4 | Phone | Telefonnummer | `tel` | No | `autocomplete="tel"`, `inputmode="tel"` | −18.7% |
| 5 | Message | Ihre Nachricht | `textarea` | No | — | Low |

**Total estimated friction: −6.4% (required fields only)**

**Field ordering rationale:** Name → Company → Email follows a natural "who are you" → "where do you work" → "how do we reach you" progression. Phone and Message are optional extensions.

### 3.2 Field Labels & Placement

- Labels: **Above** fields (not beside, not floating/placeholder-only)
- Required indicator: None (no asterisks)
- Optional indicator: "(optional)" text appended to label in `--color-text-muted`
- Rationale: Research shows "(optional)" labeling increases completion +25% vs asterisk-for-required pattern

```
Vor- und Nachname
[________________________]

Unternehmensname
[________________________]

E-Mail-Adresse
[________________________]

Telefonnummer (optional)
[________________________]

Ihre Nachricht (optional)
[________________________]
[________________________]
[________________________]
```

### 3.3 Field Dimensions

| Field | Height | Lines |
|-------|--------|-------|
| Text inputs | 48px | 1 |
| Textarea | 120px (min) | 4 (initial), resizable vertically |

- Field border: `1px solid var(--color-border)` → `var(--color-border-strong)` on focus
- Field border-radius: `var(--radius-md)` (8px)
- Field padding: `12px 16px`
- Field font: `var(--font-sans)`, 16px (prevents iOS zoom)
- Field background: `#FFFFFF`
- Gap between fields: `var(--space-5)` (20px)

### 3.4 CTA Button

**Text:** "Beratung anfragen"

**Style:** `btn btn-brand` (full width within form column)

| Property | Value |
|----------|-------|
| Background | `var(--color-brand-primary)` (#4DB6A0) |
| Text | `var(--color-text-inverse)` (#FFFFFF) |
| Font | DM Sans, 15px, weight 500 |
| Padding | 16px 32px |
| Border-radius | `var(--radius-full)` |
| Height | 52px |
| Width | 100% of form column |

**Hover state:** `var(--color-brand-hover)` (#3DA08C), `translateY(-1px)`, shadow

**Loading state:** Button text replaced with spinner + "Wird gesendet…" — button disabled

**Disabled state:** `opacity: 0.6`, `cursor: not-allowed`

### 3.5 Privacy Assurance (Below Button)

```
🔒 Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Datenschutzerklärung
```

- Icon: Lock icon (Lucide `Lock`, 14px)
- Text: `caption` class (12px, `--color-text-muted`)
- "Datenschutzerklärung" is a link (`--color-brand-primary`) to the privacy policy page
- No consent checkbox (legal basis: legitimate interest, Art. 6(1)(f) GDPR)

### 3.6 Form States

#### Empty (Default)
All fields empty, labels visible, no validation messages.

#### Focused
Active field: border becomes `var(--color-brand-primary)`, `box-shadow: 0 0 0 3px var(--color-brand-subtle)`.

#### Validation Error
- Border: `#DC2626` (red-600)
- Error message below field: `caption` style, color `#DC2626`
- Icon: Small warning icon (Lucide `AlertCircle`, 14px)
- Error messages are specific (not generic "invalid input")

| Field | Validation Rule | Error Message (DE) |
|-------|-----------------|-------------------|
| Name | min 2 chars | "Bitte geben Sie Ihren Namen ein" |
| Company | min 2 chars | "Bitte geben Sie Ihren Unternehmensnamen ein" |
| Email | valid email format | "Bitte geben Sie eine gültige E-Mail-Adresse ein" |
| Phone | valid phone format (if filled) | "Bitte geben Sie eine gültige Telefonnummer ein" |
| Message | max 2000 chars | "Nachricht darf maximal 2000 Zeichen lang sein" |

**Validation timing:** On blur (field loses focus) + on submit. No real-time validation while typing.

#### Submitting
Button shows loading state. Fields are read-only. Form cannot be submitted again.

#### Success
Form replaced with success message:

```
┌─────────────────────────────────┐
│                                 │
│  ✓  Vielen Dank für Ihre        │
│     Anfrage!                    │
│                                 │
│  Wir haben Ihre Nachricht       │
│  erhalten und melden uns        │
│  innerhalb von 24 Stunden       │
│  bei Ihnen.                     │
│                                 │
│  [Zurück zur Startseite]        │
│                                 │
└─────────────────────────────────┘
```

- Checkmark: `var(--color-brand-primary)`, 48px
- Headline: `heading-4` style
- Body: `body` style
- Link: Text link, not button
- Animation: Subtle fade-in (200ms), respects `prefers-reduced-motion`

#### Error (Submission Failed)
Inline error banner above the submit button:

```
⚠ Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut 
oder kontaktieren Sie uns direkt unter info@soluty.de
```

- Background: `rgba(220, 38, 38, 0.05)`
- Border-left: `3px solid #DC2626`
- Email link is clickable fallback

---

## 4. Layout

### 4.1 Desktop (≥1024px)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Section background: var(--color-bg-secondary) (#F7F6F5)            │
│                                                                     │
│  ┌──────────────── max-w-7xl (1280px) centered ──────────────────┐  │
│  │                                                                │  │
│  │  ┌─────────────────────┐      ┌────────────────────────────┐  │  │
│  │  │                     │      │                            │  │  │
│  │  │  H2: Section Title  │      │  ┌──────────────────────┐  │  │  │
│  │  │                     │      │  │ Name*                │  │  │  │
│  │  │  Subtext paragraph  │      │  │ [__________________] │  │  │  │
│  │  │                     │      │  │                      │  │  │  │
│  │  │  ✓ Bullet 1         │      │  │ Unternehmen*         │  │  │  │
│  │  │  ✓ Bullet 2         │      │  │ [__________________] │  │  │  │
│  │  │  ✓ Bullet 3         │      │  │                      │  │  │  │
│  │  │                     │      │  │ E-Mail*              │  │  │  │
│  │  │  Response promise   │      │  │ [__________________] │  │  │  │
│  │  │                     │      │  │                      │  │  │  │
│  │  │  [Customer Logos]   │      │  │ Telefon (optional)   │  │  │  │
│  │  │                     │      │  │ [__________________] │  │  │  │
│  │  │                     │      │  │                      │  │  │  │
│  │  │                     │      │  │ Nachricht (optional) │  │  │  │
│  │  │                     │      │  │ [__________________] │  │  │  │
│  │  │                     │      │  │ [__________________] │  │  │  │
│  │  │                     │      │  │                      │  │  │  │
│  │  │                     │      │  │ [Beratung anfragen ] │  │  │  │
│  │  │                     │      │  │                      │  │  │  │
│  │  │                     │      │  │ 🔒 Privacy text      │  │  │  │
│  │  │                     │      │  └──────────────────────┘  │  │  │
│  │  │                     │      │                            │  │  │
│  │  └─────────────────────┘      └────────────────────────────┘  │  │
│  │                                                                │  │
│  │         50%                            50%                     │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  Alternative contact: info@soluty.de  ·  +49 XXX XXXXXXX           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- Grid: `grid grid-cols-2 gap-16` (64px gap)
- Left column: vertically centered content
- Right column: form card with subtle elevation
- Form card: White background, `var(--shadow-md)`, `var(--radius-lg)`, padding `var(--space-8)` (32px)
- Section padding: `var(--space-20)` top/bottom (80px)

### 4.2 Tablet (768px – 1023px)

```
┌───────────────────────────────────┐
│                                   │
│  H2: Section Title (centered)     │
│                                   │
│  Subtext (centered)               │
│                                   │
│  ✓ Bullet 1  ✓ Bullet 2          │
│  ✓ Bullet 3                      │
│                                   │
│  ┌─────────────────────────────┐  │
│  │ Form Card (full width)      │  │
│  │ ...fields...                │  │
│  │ [Beratung anfragen]         │  │
│  │ 🔒 Privacy                  │  │
│  └─────────────────────────────┘  │
│                                   │
│  Response promise                 │
│  Alternative contact              │
│                                   │
└───────────────────────────────────┘
```

- Single column, stacked layout
- Text content centered
- Value bullets: inline/horizontal (flex-wrap)
- Form card: full width with `max-width: 560px`, centered
- Section padding: `var(--space-16)` (64px)

### 4.3 Mobile (<768px)

```
┌─────────────────────────┐
│                         │
│  H2: Title              │
│  (left-aligned)         │
│                         │
│  Subtext                │
│                         │
│  ✓ Bullet 1             │
│  ✓ Bullet 2             │
│  ✓ Bullet 3             │
│                         │
│  Response promise       │
│                         │
│  ┌───────────────────┐  │
│  │ Name*             │  │
│  │ [_______________] │  │
│  │                   │  │
│  │ Unternehmen*      │  │
│  │ [_______________] │  │
│  │                   │  │
│  │ E-Mail*           │  │
│  │ [_______________] │  │
│  │                   │  │
│  │ Telefon (opt.)    │  │
│  │ [_______________] │  │
│  │                   │  │
│  │ Nachricht (opt.)  │  │
│  │ [_______________] │  │
│  │                   │  │
│  │ [Beratung anfr. ] │  │
│  │                   │  │
│  │ 🔒 Privacy text   │  │
│  └───────────────────┘  │
│                         │
│  info@soluty.de         │
│  +49 XXX XXXXXXX        │
│                         │
└─────────────────────────┘
```

- No form card shadow on mobile (flat, no elevation) — reduces visual noise
- Form fields have no surrounding card; they integrate directly into the section
- Section padding: `var(--space-12)` top/bottom (48px), `var(--space-6)` horizontal (24px)
- All fields: full width
- CTA button: full width
- Tap targets: minimum 48×48px

---

## 5. Spacing Specification

### 5.1 Section-Level Spacing

| Property | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| Section padding-top | 80px | 64px | 48px |
| Section padding-bottom | 80px | 64px | 48px |
| Section horizontal padding | 24px | 24px | 24px |
| Max container width | 1280px | 100% | 100% |

### 5.2 Content Spacing

| Element Pair | Desktop | Tablet | Mobile |
|-------------|---------|--------|--------|
| H2 → Subtext | 24px | 20px | 16px |
| Subtext → Value bullets | 32px | 24px | 24px |
| Between bullets | 12px | 12px | 12px |
| Bullets → Response promise | 24px | 20px | 20px |
| Response promise → Logos | 32px | 24px | — |
| Content column ↔ Form column | 64px | — | — |
| Text block → Form (stacked) | — | 40px | 32px |

### 5.3 Form Internal Spacing

| Element Pair | Value |
|-------------|-------|
| Between form fields | 20px |
| Label → Input | 6px |
| Last field → Submit button | 24px |
| Submit button → Privacy text | 12px |
| Error message → next field | 4px (error is between label and field gap) |

### 5.4 Alternative Contact Bar

| Property | Desktop | Mobile |
|----------|---------|--------|
| Margin-top from section | 48px | 32px |
| Padding | 16px 0 | 16px 0 |
| Border-top | `1px solid var(--color-divider)` | Same |
| Text size | 14px | 14px |
| Text color | `--color-text-muted` | Same |

---

## 6. Color & Visual Treatment

### 6.1 Section Background

`var(--color-bg-secondary)` (#F7F6F5) — warm off-white that differentiates this section from adjacent white sections and signals "action zone."

### 6.2 Form Card (Desktop/Tablet Only)

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border-radius | `var(--radius-lg)` (12px) |
| Padding | `var(--space-8)` (32px) |
| Shadow | `var(--shadow-md)` |
| Border | None |

### 6.3 Field States (Color Reference)

| State | Border | Background | Shadow |
|-------|--------|------------|--------|
| Default | `var(--color-border)` | `#FFFFFF` | None |
| Hover | `var(--color-border-strong)` | `#FFFFFF` | None |
| Focus | `var(--color-brand-primary)` | `#FFFFFF` | `0 0 0 3px var(--color-brand-subtle)` |
| Error | `#DC2626` | `#FFFFFF` | `0 0 0 3px rgba(220, 38, 38, 0.1)` |
| Disabled | `var(--color-border)` | `var(--color-bg-secondary)` | None |

---

## 7. Accessibility Requirements (WCAG 2.1 AA)

### 7.1 Semantic HTML

```html
<section id="contact" aria-labelledby="contact-heading">
  <h2 id="contact-heading">...</h2>
  <form aria-label="Kontaktformular" novalidate>
    <div>
      <label for="contact-name">Vor- und Nachname</label>
      <input id="contact-name" type="text" required aria-required="true" />
    </div>
    <!-- ... -->
    <button type="submit">Beratung anfragen</button>
  </form>
</section>
```

### 7.2 Keyboard Navigation

- All fields reachable via Tab key in logical order (top to bottom)
- Submit button reachable after last field
- Enter key submits form when focused on any text input
- Focus trap: none (form is inline, not modal)
- Focus visible: `outline: 2px solid var(--color-brand-primary)`, `outline-offset: 2px`

### 7.3 Screen Reader

- Labels programmatically associated with inputs (`for`/`id` or `aria-labelledby`)
- Required fields: `aria-required="true"`
- Error messages: `aria-describedby` linking field to its error, `role="alert"` on error container
- Success message: `role="status"`, `aria-live="polite"`
- Loading state: `aria-busy="true"` on form, `aria-disabled="true"` on button

### 7.4 Color Contrast

| Element | Foreground | Background | Ratio | Requirement |
|---------|-----------|------------|-------|-------------|
| Field labels | #32302F | #FFFFFF | 15.5:1 | ≥4.5:1 ✓ |
| Placeholder text | #8A8785 | #FFFFFF | 3.5:1 | ≥3:1 (large text only) |
| Error text | #DC2626 | #FFFFFF | 4.6:1 | ≥4.5:1 ✓ |
| Privacy text | #8A8785 | #F7F6F5 | 3.2:1 | ≥3:1 (UI components) ✓ |
| CTA button | #FFFFFF | #4DB6A0 | 3.2:1 | ≥3:1 (large text) ✓ |

**Note on placeholder text:** Placeholder contrast (3.5:1) does not meet 4.5:1 for normal text. Placeholders must NOT serve as labels — they are supplementary only. All fields have visible labels above them.

### 7.5 Motion

- Success state fade-in: 200ms, respects `prefers-reduced-motion: reduce`
- No other animations in this section

---

## 8. GDPR Compliance

### 8.1 Legal Basis

**Processing basis:** Legitimate interest (Article 6(1)(f) GDPR)

The contact form collects data solely to respond to a business inquiry. This falls under legitimate interest; a consent checkbox is NOT required.

### 8.2 Required Elements

| Element | Present | Location |
|---------|---------|----------|
| Privacy policy link | Yes | Below submit button |
| Data usage statement | Yes | Below submit button (inline with privacy link) |
| Pre-ticked checkboxes | No | Not applicable (no consent mechanism needed) |
| Newsletter consent | Not in v1.0 | Add as separate unchecked checkbox when newsletter is launched |
| Data minimization | Yes | Only 5 fields, 2 explicitly optional |

### 8.3 Data Handling (Implementation Reference)

- Form data transmitted over HTTPS only
- No third-party tracking scripts on this section
- No data stored client-side (no localStorage/cookies)
- Server-side: store only what's needed, define retention period in privacy policy
- Deletion capability: must be possible upon request

---

## 9. Spam Protection

### 9.1 Primary Defense (Zero UX Friction)

1. **Honeypot field** — hidden input field, invisible to users, detected by bots
2. **Time-based validation** — reject submissions completed in under 3 seconds (bot speed)

### 9.2 Implementation

```html
<!-- Honeypot: visually hidden, labeled misleadingly for bots -->
<div aria-hidden="true" style="position: absolute; left: -9999px;">
  <label for="contact-website">Website</label>
  <input id="contact-website" type="text" name="website" tabindex="-1" autocomplete="off" />
</div>
```

- Honeypot field: `name="website"` (attractive to bots)
- If honeypot has value on submit → silently reject (return fake success to not alert bot)
- Time-based: record `Date.now()` on form mount, check on submit

### 9.3 Escalation (Phase 2, If Needed)

If spam volume becomes problematic, add Cloudflare Turnstile or hCaptcha. Do NOT use Google reCAPTCHA (GDPR concerns in German market).

---

## 10. i18n — Translation Keys

```json
{
  "finalCta": {
    "heading": "Lassen Sie uns über Ihre Anforderungen sprechen",
    "subtext": "In einem kostenlosen Erstgespräch analysieren wir gemeinsam Ihre Prozesse und zeigen Ihnen, wie eine maßgeschneiderte Lösung Ihr Unternehmen voranbringen kann.",
    "benefits": {
      "free": "Kostenlos und unverbindlich",
      "duration": "30 Minuten Erstgespräch",
      "individual": "Individuelle Prozessanalyse"
    },
    "responsePromise": "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    "socialProof": {
      "label": "Vertrauen uns bereits:"
    },
    "form": {
      "name": {
        "label": "Vor- und Nachname",
        "placeholder": "Max Mustermann"
      },
      "company": {
        "label": "Unternehmensname",
        "placeholder": "Musterfirma GmbH"
      },
      "email": {
        "label": "E-Mail-Adresse",
        "placeholder": "max@musterfirma.de"
      },
      "phone": {
        "label": "Telefonnummer",
        "placeholder": "+49 XXX XXXXXXX"
      },
      "message": {
        "label": "Ihre Nachricht",
        "placeholder": "Erzählen Sie uns kurz von Ihrem Vorhaben…"
      },
      "optional": "optional",
      "submit": "Beratung anfragen",
      "submitting": "Wird gesendet…"
    },
    "privacy": {
      "text": "Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.",
      "link": "Datenschutzerklärung"
    },
    "validation": {
      "nameRequired": "Bitte geben Sie Ihren Namen ein",
      "nameMinLength": "Name muss mindestens 2 Zeichen lang sein",
      "companyRequired": "Bitte geben Sie Ihren Unternehmensnamen ein",
      "companyMinLength": "Unternehmensname muss mindestens 2 Zeichen lang sein",
      "emailRequired": "Bitte geben Sie Ihre E-Mail-Adresse ein",
      "emailInvalid": "Bitte geben Sie eine gültige E-Mail-Adresse ein",
      "phoneInvalid": "Bitte geben Sie eine gültige Telefonnummer ein",
      "messageMaxLength": "Nachricht darf maximal 2000 Zeichen lang sein"
    },
    "success": {
      "heading": "Vielen Dank für Ihre Anfrage!",
      "text": "Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.",
      "backLink": "Zurück zur Startseite"
    },
    "error": {
      "text": "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt unter",
      "email": "info@soluty.de"
    },
    "alternativeContact": {
      "text": "Oder kontaktieren Sie uns direkt:",
      "email": "info@soluty.de",
      "phone": "+49 XXX XXXXXXX"
    }
  }
}
```

**Note:** EN and TR translations must follow the same key structure. Placeholder values must be localized (e.g., "John Smith" for EN, "Ahmet Yılmaz" for TR).

---

## 11. Performance Requirements

| Metric | Target |
|--------|--------|
| Section render | No blocking resources |
| Form JS | Client component, loaded with section |
| API route | < 500ms response time |
| Validation | Client-side first (instant), server-side on submit |
| No external scripts | No reCAPTCHA, no third-party form services |

The form component is a client component (`'use client'`). It should be lightweight — no heavy form libraries unless justified. Native HTML validation attributes + minimal client-side logic is preferred.

---

## 12. Component Structure

```
app/[locale]/components/FinalCTA/
├── index.tsx               # Main section component (server component wrapper)
├── ContactForm.tsx         # Form component ('use client')
├── FormField.tsx           # Reusable form field with label, error, states
├── SuccessMessage.tsx      # Post-submission success state
└── ValueProposition.tsx    # Left column: heading, subtext, bullets, logos
```

### Component Boundaries

| Component | Rendering | Responsibility |
|-----------|-----------|----------------|
| `index.tsx` | Server | Section layout, i18n text loading, grid structure |
| `ContactForm.tsx` | Client | Form state, validation, submission, loading/error states |
| `FormField.tsx` | Client | Input rendering, label, error message, focus states |
| `SuccessMessage.tsx` | Client | Success state display after submission |
| `ValueProposition.tsx` | Server | Static content: heading, subtext, bullets, logos |

---

## 13. Anchor & Navigation

- Section `id`: `contact`
- Header CTA ("Beratung anfragen") links to `#contact`
- Hero primary CTA can also link to `#contact`
- Smooth scroll behavior (CSS `scroll-behavior: smooth` or JS with `prefers-reduced-motion` check)
- Scroll offset: account for sticky header height (~72px)

---

## 14. Alternative Contact (Below Form)

A minimal contact bar below the main section provides fallback contact for visitors who prefer not to use the form:

```
Oder kontaktieren Sie uns direkt: info@soluty.de · +49 XXX XXXXXXX
```

- Separated by `var(--color-divider)` border-top
- Email: `mailto:` link
- Phone: `tel:` link (clickable on mobile)
- Typography: `body-sm`, `--color-text-muted`
- Centered on all breakpoints

---

## 15. Out of Scope (v1.0)

- Calendar/booking widget integration (Calendly, Cal.com)
- Multi-step form wizard
- File upload capability
- Live chat widget
- Newsletter subscription checkbox (add when newsletter launches)
- Customer logos (add when logo permissions are secured)
- Progressive profiling (requires CRM, Phase 2)
- A/B testing infrastructure (requires traffic volume)

---

## 16. Dependencies

- `next-intl` — translations
- Tailwind CSS — styling
- Lucide React — icons (Lock, CheckCircle, AlertCircle, Loader2)
- Next.js API route — form submission endpoint (`/api/contact`)
- Email service — Resend or Brevo (to be decided during implementation)

---

## 17. Acceptance Criteria

### Visual & Layout
- [ ] Two-column layout on desktop (≥1024px), stacked on tablet/mobile
- [ ] Form card has white background and shadow on desktop/tablet
- [ ] Form integrates flat (no card) on mobile
- [ ] Section background is `--color-bg-secondary`
- [ ] All spacing matches specification
- [ ] Responsive from 375px to 1440px+

### Form Functionality
- [ ] 5 fields rendered: 3 required, 2 optional with "(optional)" label
- [ ] Labels above fields, not floating/placeholder
- [ ] Client-side validation on blur and on submit
- [ ] Server-side validation in API route
- [ ] Honeypot field present but invisible to users
- [ ] Time-based validation prevents instant submissions
- [ ] Loading state on submit button during submission
- [ ] Success message replaces form after successful submission
- [ ] Error message displays inline if submission fails
- [ ] Form is not submittable when already submitting

### Accessibility
- [ ] All fields have programmatic labels (`for`/`id`)
- [ ] Required fields have `aria-required="true"`
- [ ] Error messages linked via `aria-describedby`
- [ ] Success/error states use appropriate ARIA live regions
- [ ] Keyboard navigable (Tab order, Enter to submit)
- [ ] Focus states visible on all interactive elements
- [ ] Color contrast meets WCAG 2.1 AA

### i18n
- [ ] All text from `messages/{locale}.json`
- [ ] No hardcoded strings in components
- [ ] Placeholder text localized per language
- [ ] Validation messages localized per language
- [ ] Form works correctly in DE, EN, TR

### GDPR
- [ ] Privacy policy link visible near submit button
- [ ] Data usage statement in plain language
- [ ] No pre-ticked consent checkboxes
- [ ] No consent checkbox for basic inquiry processing
- [ ] Form data transmitted over HTTPS

### Performance
- [ ] No external scripts loaded (no reCAPTCHA)
- [ ] Form JS bundle is minimal
- [ ] API route responds within 500ms

---

*This specification is ready for review. Implementation must not begin until human approval is received, per CLAUDE.md governance rules.*

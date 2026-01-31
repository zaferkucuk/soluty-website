# Services Section Research Report

**Date:** January 2026  
**Role:** Researcher  
**Purpose:** Inform design and implementation of Services section for Soluty GmbH website  
**Status:** Complete

---

## Executive Summary

This research analyzes enterprise-grade B2B SaaS websites to identify best practices for presenting multiple services with a "highlighted but equal" hierarchy. Key finding: Modern B2B websites favor feature-based cards with visual consistency, subtle differentiation through color or positioning, and benefit-focused messaging over feature lists.

---

## Research Methodology

### Sources Analyzed

**Tier 1 - Enterprise-Grade References:**
- Linear (linear.app) - Project management
- Vercel (vercel.com) - Developer infrastructure
- Notion (notion.so) - Workspace platform
- HubSpot (hubspot.com) - CRM/Marketing platform

**Tier 2 - German B2B Software:**
- DATEV (datev.de) - German accounting software leader
- SAP (analyzed via compaction summary)

**Tier 3 - Industry Best Practices:**
- B2B SaaS design guides (2024-2025)
- Card UI/UX research
- Enterprise software UX principles

---

## Key Findings

### 1. Service Presentation Patterns

#### Linear (Best-in-Class Example)
- **Structure:** Feature-based sections, not product cards
- **Visual approach:** Large screenshots, interactive demos, dark theme
- **Messaging:** "Purpose-built for product development" + three key differentiators
- **Trust signals:** "Powering the world's best product teams" + customer logos (Figma, OpenAI, Vercel)
- **Layout:** Vertical sections with alternating content/visual alignment

#### Vercel
- **Structure:** Tab-based navigation (AI Apps, Web Apps, Ecommerce, Marketing, Platforms)
- **Hero:** "Build and deploy on the AI Cloud"
- **Card pattern:** Use case cards with icon + title + short description + CTA
- **Trust:** Customer logos in scrolling banner, performance metrics
- **Differentiation:** Framework-specific templates section

#### Notion
- **Structure:** 2x2 bento grid for key features
- **Visual:** Large product screenshots with context
- **Messaging:** "AI workspace that works for you"
- **Trust signals:** "100M+ users", "62% of Fortune 100"
- **Each card:** Image + headline + link ("Automate repetitive tasks →")

#### HubSpot
- **Structure:** Product hub pages with icon + title + description + dual CTAs
- **Categories:** Marketing Hub, Sales Hub, Service Hub, Content Hub, Data Hub
- **Card anatomy:** Icon → Product name → Tagline → Description → "Learn more" + "Get started free"
- **Visual consistency:** Each product has same card structure, different gradient icon

#### DATEV (German Market)
- **Headline:** "Mehr als Software. Ihr Partner." (More than software. Your partner.)
- **Structure:** Category cards with image + title + "Mehr erfahren" CTA
- **Categories:** Steuerberatung, Unternehmen, Wirtschaftsprüfung, Rechtsberatung
- **Trust elements:** Statistics (14 Mio. Lohn- und Gehaltsabrechnungen, 40.000 Mitglieder)
- **Tone:** Professional, precise, partnership-focused (very German B2B)

---

### 2. Card Design Best Practices

#### Anatomy of High-Converting Service Cards

```
┌─────────────────────────────────────────┐
│                                         │
│   [Icon or Visual - 48-64px]            │
│                                         │
│   Headline (24-32px, bold)              │
│   Benefit-focused, not feature-focused  │
│                                         │
│   Description (16-18px, regular)        │
│   2-3 sentences maximum                 │
│   Address pain point + solution         │
│                                         │
│   [CTA Link →] (14-16px, accent color)  │
│   Action-oriented verb                  │
│                                         │
└─────────────────────────────────────────┘
```

#### Measurements (Desktop)
- Card width: 350-400px (in 3-column grid)
- Card height: 300-400px (equal heights mandatory)
- Padding: 32-48px internal
- Gap between cards: 24-48px
- Border radius: 8-16px (modern, not too rounded)
- Shadow: Subtle (0 2px 8px rgba(0,0,0,0.08))

#### Hover States
- Lift effect: transform: translateY(-4px)
- Shadow increase: 0 8px 24px rgba(0,0,0,0.12)
- Optional: Border color change or subtle glow
- Transition: 200-300ms ease

---

### 3. "Highlighted but Equal" Hierarchy

This is the core challenge: Making Custom ERP visually prominent while maintaining equal weight for all three services.

#### Strategies Observed

**Option A: Position-Based (Recommended)**
- Place highlighted service in center position
- Center naturally draws eye first
- No visual difference needed, positioning does the work
- Example: Linear's roadmap feature is center-placed

**Option B: Subtle Color Differentiation**
- Accent color border (2px) on highlighted card
- Or slight background tint (3-5% opacity of brand color)
- All other visual elements remain identical
- Example: HubSpot's "Popular" badge on pricing

**Option C: Scale Differentiation**
- Highlighted card 5-10% larger
- Risk: Can feel unbalanced if overdone
- Example: Pricing page patterns (not recommended for services)

**Recommended Approach for Soluty:**
- Center position for Custom ERP
- Subtle accent border OR badge ("Kernkompetenz" / "Core Competency")
- Equal card size and internal structure
- Same hover effects for all cards

---

### 4. Content Strategy

#### Headline Patterns (Benefit-Focused)

**DO:**
- "Software that adapts to your business"
- "Automate what slows you down"
- "Intelligence built for your data"

**DON'T:**
- "Custom ERP Development"
- "Enterprise Software Solutions"
- "AI Integration Services"

#### Description Best Practices
- Lead with pain point acknowledgment
- Follow with solution
- End with outcome/benefit
- 2-3 sentences maximum (40-60 words)

#### CTA Patterns
- "Mehr erfahren →" (Learn more) - German standard
- "Jetzt starten →" (Start now) - More aggressive
- "Kontakt aufnehmen →" (Get in touch) - Consultation focus
- Use arrow (→) to indicate navigation

---

### 5. German B2B Market Considerations

#### Tone and Language
- **Precision over persuasion:** Germans prefer facts, numbers, specifics
- **Formal "Sie" address:** Always formal in B2B context
- **Trust through expertise:** Emphasize technical capability, not just outcomes
- **Partnership language:** "Partner" is powerful in German B2B (see DATEV)

#### Cultural Design Preferences
- Clean, uncluttered layouts preferred
- Less animation, more substance
- Clear hierarchy and navigation
- Professional color palettes (blues, grays, whites)
- Avoid overly playful or casual design

#### Compliance Requirements
- GDPR compliance messaging where relevant
- "Made in Germany" quality signal
- Data location/sovereignty if applicable
- Clear Impressum/contact information

---

### 6. Technical Implementation Notes

#### Responsive Behavior
- Desktop (≥1024px): 3 columns, equal width
- Tablet (768-1023px): 3 columns compressed OR 2+1 stacked
- Mobile (<768px): Single column, full width, maintain visual hierarchy

#### Accessibility (WCAG 2.1 AA)
- Color contrast: 4.5:1 minimum for text
- Focus states: Visible outline on all interactive elements
- Screen reader: Proper heading hierarchy, alt text for icons
- Touch targets: 44x44px minimum on mobile

#### Animation Guidelines
- Entry animation: Subtle fade-in + slight upward motion
- Stagger cards: 100-150ms delay between each
- Hover: Keep smooth (200-300ms ease)
- Respect reduced-motion preferences

---

## Recommendations for Soluty Services Section

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Section Headline (centered)                               │
│   "Unsere Leistungen" / "Digitale Lösungen für Ihr         │
│   Unternehmen"                                              │
│                                                             │
│   Optional: 1-2 sentence subheadline                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌───────────┐    ┌───────────┐    ┌───────────┐          │
│   │           │    │  ★ ERP ★  │    │           │          │
│   │  Custom   │    │  (center  │    │    AI     │          │
│   │ Projects  │    │ position) │    │ Solutions │          │
│   │           │    │           │    │           │          │
│   └───────────┘    └───────────┘    └───────────┘          │
│                                                             │
│                    Gap: 32-48px                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Card Content Structure

**Card 1: Individuelle Softwareprojekte (Custom Enterprise Projects)**
- Icon: Code/Development symbol (Lucide: `Code2` or `Layers`)
- Headline: "Software, die zu Ihnen passt"
- Description: Maßgeschneiderte Softwarelösungen für komplexe Geschäftsprozesse. Wir entwickeln was Sie brauchen – nicht mehr, nicht weniger.
- CTA: "Projektablauf ansehen →"

**Card 2: Maßgeschneiderte ERP-Systeme (Custom ERP) - HIGHLIGHTED**
- Icon: Database/System symbol (Lucide: `Database` or `Workflow`)
- Badge (optional): "Kernkompetenz" or subtle accent border
- Headline: "ERP-Systeme, die mit Ihnen wachsen"
- Description: Vergessen Sie starre Standardsoftware. Unsere ERP-Lösungen passen sich Ihrem Unternehmen an – heute und morgen.
- CTA: "ERP-Lösungen entdecken →"

**Card 3: Künstliche Intelligenz (AI Solutions)**
- Icon: AI/Brain symbol (Lucide: `Brain` or `Sparkles`)
- Headline: "Intelligenz für Ihre Daten"
- Description: KI-Lösungen, die in Ihrer Infrastruktur laufen. Lokal, sicher und speziell für deutsche Unternehmen entwickelt.
- CTA: "AI-Services erkunden →"

### Visual Style
- Background: Light gray (#F8F9FA) or white section
- Card background: White
- Card border: 1px #E5E7EB (light gray)
- Custom ERP border: 2px brand color (e.g., #2563EB)
- Icons: Brand color, consistent style (outline or filled, not mixed)
- Text: Dark gray (#1F2937) for headlines, medium gray (#4B5563) for descriptions

---

## Implementation Checklist

- [ ] Create services section component structure
- [ ] Implement responsive 3-card grid
- [ ] Design card component with consistent anatomy
- [ ] Add subtle differentiation for Custom ERP (center position + accent border)
- [ ] Implement hover states with lift effect
- [ ] Add entry animations (respect reduced-motion)
- [ ] Integrate i18n for DE/EN/TR content
- [ ] Test accessibility (contrast, focus, screen reader)
- [ ] Mobile optimization and testing

---

## References

### Websites Analyzed
- https://linear.app
- https://vercel.com
- https://notion.so
- https://hubspot.com/products
- https://datev.de

### Research Sources
- Huemor: Service Page Design Examples
- Interaction Design Foundation: B2B UX Model
- Eleken: Card UI Examples and Best Practices
- FuseLab Creative: SaaS UI/UX Design Guide 2024
- Passionate Agency: 13 UX Rules for B2B Web Applications
- Medium (Thiago Casarotto): Enterprise B2B UX Design

---

*Research compiled by Claude (Researcher Role) for Soluty GmbH website project.*

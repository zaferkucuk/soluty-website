# Technical Constraints

## Purpose

This document defines **non-negotiable technical boundaries** for this project.
AI and human contributors must treat these constraints as **hard limits**, not suggestions.

---

## Technology Stack

### Frontend
- Framework: **Next.js**
- Language: **TypeScript**
- Styling: Modern CSS approach (explicitly chosen and documented)
- UI libraries: Allowed only if clearly justified and approved

### Backend
- No custom backend in this project phase
- Static or semi-static site generation preferred

---

## Hosting

- Platform: **Hostinger KVM 8 (self-managed VPS)**
- Full server access and responsibility
- Deployment must be compatible with Linux-based VPS environments
- No platform-specific assumptions (e.g. Vercel-only features)

---

## Design & Performance

- Mobile-first approach
- Accessibility: WCAG 2.1 AA baseline
- No heavy animations that harm performance or usability

### Quality & Testing Targets

The finished website must be validated across multiple dimensions:

- Performance (Lighthouse, Core Web Vitals)
- SEO (technical + semantic)
- Accessibility
- Code quality (clarity, maintainability)

The goal is to achieve **very strong scores across all categories**, not just performance.

---

## SEO & Content

- Semantic HTML is mandatory
- Metadata must be explicitly defined
- Clean URL structure (no query-based content routing)

### Multilingual & International SEO

- The website must support **German (default), English, and Turkish**
- German content is canonical unless explicitly stated otherwise
- Language handling must be compatible with international SEO best practices
- URL structure must clearly reflect language context
- No language is allowed to silently override another

Multilingual handling must be considered in:
- Content structure
- Metadata
- Internal linking
- SEO validation and testing


### Advanced SEO Requirements

- Content must be optimized for **AI-powered search engines**
- Clear semantic hierarchy (sections, entities, relationships)
- Meaning-first structure (no keyword stuffing)
- Structured data should be considered where appropriate

---

## Data & Privacy

- GDPR compliance is mandatory
- No tracking tools without explicit approval
- No cookies by default unless strictly necessary

---

## Tooling Rules

- Avoid tools that introduce long-term maintenance risk
- Prefer mature, well-documented solutions
- Experimental or niche tools are not allowed

---

## AI-Specific Constraints

- AI must not assume databases or APIs
- AI must not introduce external services silently
- Any deviation must be explicitly flagged

---

## Change Policy

- Changes to this document require explicit human approval
- Temporary exceptions must be documented with justification

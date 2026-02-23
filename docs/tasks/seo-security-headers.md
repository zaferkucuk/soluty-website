# Task: Security Headers

**Phase:** 2 — SEO & Technical Infrastructure  
**Rol:** Web Developer  
**Öncelik:** 🟡 5  
**Bağımlılık:** Bağımsız  
**Spec referansı:** `docs/seo-geo-spec.md` §8

---

## Görev Tanımı

`next.config.ts` içine güvenlik headers ekleyerek SecurityHeaders.com'da A+ rating almak.
Lighthouse Best Practices skorunu artırmak.

---

## Önemli Ön Not

**Hosting:** Hostinger KVM VPS (`technical_constraints.md`)  
**Çelişki:** Repoda `vercel.json` mevcut — bu dosya Hostinger VPS'de etkisizdir.  
**Karar:** Tüm headers `next.config.ts` üzerinden yönetilecek — platform bağımsız.

---

## Kapsam

### 1. next.config.ts — Tüm Headers

```typescript
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  },
  {
    key: 'X-XSS-Protection',
    value: '0'  // Devre dışı — CSP'ye güven, eski XSS filter güvenlik açığı yaratır
  }
]

// CSP — Önce Report-Only modda test et, sonra enforce et
// Aşama 1 (test):
// { key: 'Content-Security-Policy-Report-Only', value: cspValue }
// Aşama 2 (production):
// { key: 'Content-Security-Policy', value: cspValue }

const nextConfig: NextConfig = {
  trailingSlash: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ]
  }
}

export default withNextIntl(nextConfig)
```

---

### 2. CSP — Ayrı Aşama (Dikkatli Yönetim)

CSP framer-motion (inline styles), next/image ve form action'ları nedeniyle
dikkatli analiz gerektiriyor.

**Aşama 1 — Report-Only (site çalışmaya devam eder):**

```typescript
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",  // next.js inline scripts gerektirir
  "style-src 'self' 'unsafe-inline'",   // framer-motion inline styles
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'"
].join('; ')

// headers dizisine ekle:
{ key: 'Content-Security-Policy-Report-Only', value: cspReportOnly }
```

**Test süreci:**
1. Deploy → Chrome DevTools Console → CSP violation'ları gözlemle
2. Her violation'ı düzelt (kaynak ekle veya kodu güncelle)
3. 48 saat violation yoksa enforce moduna geç
4. `Content-Security-Policy-Report-Only` → `Content-Security-Policy` olarak değiştir

**Dikkat:** CSP'yi acele enforce etme — site kırılabilir.

---

### 3. nginx Çakışma Kontrolü (Hostinger VPS)

Hostinger VPS'de nginx kullanılıyorsa aynı header iki yerden set edilmemeli.

```bash
# nginx config kontrolü (VPS'de)
grep -r 'add_header' /etc/nginx/
```

Eğer nginx'te de aynı headerlar set ediliyorsa birini kaldır — çakışma
bazı browserlar'da beklenmedik davranış yaratır.

---

## Doğrulama

```
✅ https://securityheaders.com — A+ rating
✅ Tüm 6 header response'da görünüyor (Chrome DevTools → Network → Headers)
✅ HSTS: max-age, includeSubDomains, preload doğru
✅ X-Frame-Options: DENY (iframe embedding yok)
✅ Lighthouse Best Practices — güvenlik uyarısı yok
✅ CSP (eğer enforce edilmişse): Console'da violation yok
```

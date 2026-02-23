# Task: SEO Performance & Core Web Vitals

**Phase:** 2 — SEO & Technical Infrastructure  
**Rol:** Web Developer  
**Öncelik:** 🟡 4  
**Bağımlılık:** Bağımsız — diğer task'larla paralel yürütülebilir  
**Spec referansı:** `docs/seo-geo-spec.md` §6

---

## Görev Tanımı

Next.js performans optimizasyonlarını uygulayarak Core Web Vitals hedeflerine ulaşmak:
PageSpeed desktop ≥95, mobile ≥90, LCP <2.5s, INP <200ms, CLS <0.1.

---

## Kapsam

### 1. next/font — Google Fonts Yerine Kullan

Mevcut durum kontrol edilmeli: Harici Google Fonts request var mı?

```typescript
// app/[locale]/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],  // latin-ext: ä, ö, ü, ß, Ş, ğ, İ için zorunlu
  display: 'swap',
  variable: '--font-inter'  // CSS variable olarak kullanıyorsa
})
```

**Neden kritik:**
- Harici Google Fonts = 300–500ms ek yükleme süresi
- `latin-ext` subset olmadan Almanca umlauts ve Türkçe özel karakterler fallback font'la render olur → CLS
- `display: 'swap'` = FOIT (flash of invisible text) önler

**Kontrol:** `next/font` zaten kullanılıyor mu? Yoksa mevcut font sistemini bozmadan ekle.

---

### 2. Image Optimization

```tsx
// Hero görseli — PRIORITY ZORUNLU (LCP elementi)
<Image
  src="/hero.webp"
  alt="ERP-Software für Lieferunternehmen"
  width={1200}
  height={800}
  priority  // ← Bu olmadan LCP ciddi düşer
/>

// Tüm diğer görseller — width/height HER ZAMAN gerekli (CLS önleme)
<Image
  src="/feature.webp"
  alt="..."
  width={400}
  height={300}
  loading="lazy"  // default zaten lazy — hero dışı için
/>
```

**Kontrol edilecekler:**
- `<img>` tag'leri kullanılıyor mu? Hepsi `next/image`'a çevrilmeli
- Priority olmayan görsellerde width/height eksik mi?
- Logo görseli SVG mi JPG/PNG mı?

---

### 3. Server Component Optimizasyonu

```typescript
// Her bileşende 'use client' durumu audit edilecek
// Kural: State, event handler veya browser API yoksa Server Component olmalı

// YANLIŞ:
'use client'
export function StaticSection() {  // Hiç interaksiyon yok ama 'use client' var
  return <section>...</section>
}

// DOĞRU:
export function StaticSection() {  // Server Component — bundle'a girmez
  return <section>...</section>
}
```

---

### 4. Dynamic Imports (Ağır Bileşenler)

```typescript
import dynamic from 'next/dynamic'

// Framer-motion animasyon bileşenleri
const ModuleGrid = dynamic(() => import('@/components/ModuleGrid'), {
  ssr: false,  // Animasyon sadece client'ta çalışıyorsa
  loading: () => <div style={{ height: '400px' }} />  // Placeholder — CLS önleme
})
```

**Dikkat:** `ssr: false` dikkatli kullanılmalı. SEO için önemli içerik SSR'da render edilmeli.

---

### 5. Audit Süreci

**Adım 1: Baseline ölç**
1. `https://soluty.io/de/` için PageSpeed Insights çalıştır
2. Skoru kaydet (Desktop + Mobile)
3. Önerilen optimizasyonları listele

**Adım 2: Öncelikli fix'ler uygula**
- next/font (en büyük etki)
- Image priority (LCP)
- Unused JavaScript (Lighthouse önerisi)

**Adım 3: Tekrar ölç ve karşılaştır**

---

### 6. prefers-reduced-motion

Framer-motion animasyonlar bu sistem tercihini dikkate almalı:

```typescript
import { useReducedMotion } from 'framer-motion'

export function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
    >
      ...
    </motion.div>
  )
}
```

Bu hem accessibility (WCAG 2.1 AA 2.3.3) hem de performance için gerekli.

---

## Doğrulama

```
✅ PageSpeed Insights — desktop ≥ 95
✅ PageSpeed Insights — mobile ≥ 90
✅ LCP < 2.5s (PageSpeed veya Chrome DevTools)
✅ CLS < 0.1
✅ INP < 200ms
✅ Lighthouse — Harici font request yok (next/font)
✅ Lighthouse — LCP görselinde priority prop var
✅ Tüm <img> → <Image> çevrilmiş, width/height mevcut
```

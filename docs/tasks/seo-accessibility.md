# Task: Accessibility Audit & Fixes (WCAG 2.1 AA)

**Phase:** 2 — SEO & Technical Infrastructure  
**Rol:** Web Developer  
**Öncelik:** 🟡 6  
**Bağımlılık:** Bağımsız — diğer task'larla paralel yürütülebilir  
**Spec referansı:** `docs/seo-geo-spec.md` §9, `docs/technical_constraints.md`

---

## Görev Tanımı

Tüm mevcut bileşenler için WCAG 2.1 AA kapsamında accessibility audit yapmak ve
bulunan sorunları gidermek. Hedef: Lighthouse Accessibility ≥ 95.

---

## Neden Bu Task Phase 2'de

`technical_constraints.md` WCAG 2.1 AA'yı zorunlu olarak belirtiyor.
Lighthouse 4 kategoride ölçer — Performance, SEO, Best Practices, **Accessibility**.
Bu kategoriyi atlamak genel skoru düşürür ve yasal risk yaratır.

---

## Audit Kapsamı

### Öncelikli Bileşenler (Yüksek Risk)

```
1. Header & Navigation         — language switcher, mobile menu toggle
2. Hero Section               — animasyonlar, CTA butonları
3. ModuleGrid                 — framer-motion animasyonlar, ARIA
4. Contact Form (FinalCTA)    — label'lar, hata mesajları, validation
5. WhatsApp floating button   — aria-label, klavye erişimi
6. FAQ accordion (varsa)      — aria-expanded, klavye
7. Footer                    — link açıklamaları
```

---

## Kontrol Listesi

### Görseller

```
✅ Anlamlı görseller: alt text açıklayıcı ve içerik taşıyan
   YANLIŞ: alt="image" veya alt="photo"
   DOĞRU:  alt="ERP-Dashboard für Tourenplanung"
✅ Dekoratif görseller: alt="" (boş string, attribute kaldırılmadan)
✅ CSS background görselleri: içerik taşımıyor (decorative only)
✅ SVG ikonlar: aria-hidden="true" veya anlamlı aria-label
```

### Renk Kontrastı

```
✅ Normal metin (< 18px veya < 14px bold): kontrast ≥ 4.5:1
✅ Büyük metin (≥ 18px veya ≥ 14px bold): kontrast ≥ 3:1
✅ UI bileşenleri (buton, input border, icon): ≥ 3:1
✅ Focus outline: arka plana karşı ≥ 3:1
✅ Disabled state: WCAG muaf — ama görsel ipucu verilmeli
```

Test: https://webaim.org/resources/contrastchecker/

### Klavye Navigasyonu

```
✅ Tab sırası DOM sırasıyla uyumlu — mantıklı akış
✅ Focus outline görünür ve net (tarayıcı default'u kaldırılmamış)
✅ Tüm interaktif elementler Tab ile erişilebilir
✅ Skip-to-content linki çalışıyor (messages/de.json'da "skipToContent" var)
✅ Mobile menu: Esc ile kapanıyor, focus trap doğru
✅ Dropdown/modal: Tab sıkışıp kalıyor mu? Focus trap test et
✅ WhatsApp butonu: Tab → Enter ile açılabiliyor
```

### Yapı ve Semantik

```
✅ H1 her sayfada yalnızca bir kez
✅ H2-H3 hiyerarşisi mantıklı — H1'den H3'e atlama yok
✅ Landmark roller: <main>, <header>, <nav>, <footer> mevcut
✅ <section> anlamlı başlık ile eşlenmiş
✅ <button> vs <a>: navigasyon için <a>, aksiyon için <button>
✅ <ul>/<ol> içinde sadece <li> — başka element yok
```

### Form (FinalCTA contact form)

```
✅ Her <input> için eşleşen <label> (for/id pair)
   YANLIŞ: placeholder only, label yok
   DOĞRU:  <label for="email">E-Mail</label> + <input id="email">
✅ Required alanlar: aria-required="true" veya HTML required attribute
✅ Hata mesajları: aria-describedby ile input'a bağlı
✅ Validation hataları: focus hatalı alana gidiyor
✅ Submit butonu: anlamlı metin ("Beratung anfragen" — zaten var)
✅ Başarı/hata mesajı: screen reader duyuruyor (aria-live="polite")
```

### Animasyonlar

```typescript
// Framer-motion bileşenlerinde zorunlu
import { useReducedMotion } from 'framer-motion'

const shouldReduceMotion = useReducedMotion()

// AnimatePresence ve tüm motion bileşenleri bu flag'i kontrol etmeli
// WCAG 2.1 AA — 2.3.3 Animation from Interactions
```

### Dil Özellikleri

```
✅ <html lang="xx"> doğru locale ile set edilmiş (next-intl yapıyor — doğrula)
✅ İçerik dili değiştiğinde (başka dil kelimesi geçiyorsa): lang attribute
   Örnek: <span lang="de">Lieferunternehmen</span> İngilizce sayfa içinde
```

---

## Audit Süreci

### Adım 1: Otomatik Tarama

```
1. Chrome DevTools → Lighthouse → Accessibility çalıştır
   Her locale için: /de/, /en/, /tr/
   Skoru ve bulunan sorunları kaydet

2. axe DevTools browser eklentisi kur
   Her sayfa için çalıştır — WCAG 2.1 AA filtresini aç
   "critical" ve "serious" sorunları öncelikle çöz

3. WAVE (wave.webaim.org) ile görsel tarama
   Renk kontrastı hatalarına odaklan
```

### Adım 2: Manuel Test

```
1. Klavye ile tüm sayfayı gez (Tab, Shift+Tab, Enter, Esc)
2. Focus outline her zaman görünüyor mu?
3. Mobile menu klavye ile açılıp kapanıyor mu?
4. Contact form Tab sırasıyla doldurulabiliyor mu?
5. Hata mesajı çıktığında fokus doğru yere gidiyor mu?
```

### Adım 3: Fix & Re-test

Bulunan her sorun için:
1. Bileşeni belirle
2. Fix uygula
3. Sadece o bileşeni yeniden test et
4. Lighthouse'u tüm sayfa için tekrar çalıştır

---

## Doğrulama

```
✅ Lighthouse Accessibility ≥ 95 (her 3 locale'da)
✅ axe DevTools: critical ve serious ihlal yok
✅ WAVE: kontrast hatası yok
✅ Klavye testi: tüm interaktif elementler erişilebilir
✅ prefers-reduced-motion: animasyonlar saygı gösteriyor
✅ Screen reader spot check: NVDA veya macOS VoiceOver ile kısa test
```

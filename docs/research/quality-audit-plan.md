# Soluty Website — Kalite Denetim Planı

> **Rol:** Researcher  
> **Amaç:** Vercel deploy sonrası canlı URL üzerinden dış araçlarla kapsamlı kalite ölçümü  
> **Ön koşul:** Site Vercel'de yayında olmalı (ör. `soluty-website.vercel.app`)

---

## 7 Denetim Kategorisi

### 1. Performance & Core Web Vitals

| Araç | URL | Ölçüm |
|------|-----|-------|
| **Google PageSpeed Insights** | pagespeed.web.dev | LCP, FID/INP, CLS, FCP, TTFB — mobil + masaüstü |
| **GTmetrix** | gtmetrix.com | Waterfall analizi, toplam sayfa boyutu, istek sayısı |
| **WebPageTest** | webpagetest.org | Filmstrip görünüm, ilk/tekrar yükleme farkı |

**Hedef metrikler:**
- Performance skoru ≥ 90 (Lighthouse)
- LCP < 2.5s, CLS < 0.1, INP < 200ms
- Toplam sayfa boyutu < 1.5 MB

---

### 2. SEO

| Araç | URL | Ölçüm |
|------|-----|-------|
| **Google Lighthouse** (SEO sekmesi) | Chrome DevTools | Meta tags, headings, crawlability |
| **Ahrefs Free Webmaster Tools** | ahrefs.com/webmaster-tools | Backlink profili, teknik SEO hataları |
| **Google Rich Results Test** | search.google.com/test/rich-results | Structured data (Organization, LocalBusiness) |
| **Schema.org Validator** | validator.schema.org | JSON-LD doğrulama |

**Kontrol listesi:**
- [ ] Her sayfa benzersiz `<title>` ve `<meta description>` içeriyor mu?
- [ ] `<h1>` her sayfada bir kez kullanılıyor mu?
- [ ] Open Graph ve Twitter Card meta etiketleri var mı?
- [ ] robots.txt ve sitemap.xml mevcut mu?
- [ ] Canonical URL'ler doğru tanımlı mı?
- [ ] JSON-LD structured data (Organization) eklendi mi?

---

### 3. Çok Dillilik (i18n / hreflang)

| Araç | URL | Ölçüm |
|------|-----|-------|
| **Localizely Hreflang Checker** | localizely.com/hreflang-checker | hreflang etiket doğrulaması |
| **TechnicalSEO.com Hreflang Tool** | technicalseo.com/tools/hreflang | Çift yönlü referans kontrolü |

**Kontrol listesi:**
- [ ] Tüm dil varyantlarında hreflang etiketleri mevcut mu? (`de`, `en`, `tr`)
- [ ] `x-default` tanımlanmış mı?
- [ ] Her dil sayfası karşılıklı referans veriyor mu? (bidirectional)
- [ ] `<html lang="xx">` doğru ayarlanmış mı?
- [ ] `alternate` link etiketleri `<head>` içinde mi?

---

### 4. Erişilebilirlik (Accessibility / WCAG 2.1 AA)

| Araç | URL | Ölçüm |
|------|-----|-------|
| **Google Lighthouse** (Accessibility) | Chrome DevTools | Otomatik a11y denetimi |
| **axe DevTools** (tarayıcı eklentisi) | deque.com/axe | WCAG 2.1 AA ihlalleri |
| **WAVE** | wave.webaim.org | Kontrast, ARIA, yapısal sorunlar |
| **Colour Contrast Checker** | webaim.org/resources/contrastchecker | Metin/arka plan kontrast oranları |

**Hedef:** Accessibility skoru ≥ 95 (Lighthouse)

**Kontrol listesi:**
- [ ] Tüm resimlerde anlamlı `alt` text var mı?
- [ ] Renk kontrastı WCAG AA (4.5:1 normal metin, 3:1 büyük metin) karşılıyor mu?
- [ ] Klavye navigasyonu sorunsuz çalışıyor mu? (Tab sırası, focus göstergesi)
- [ ] Skip-to-content linki var mı ve çalışıyor mu?
- [ ] ARIA rolleri doğru kullanılmış mı?
- [ ] Form elementlerinde `label` eşleşmesi var mı?

---

### 5. Güvenlik & HTTP Headers

| Araç | URL | Ölçüm |
|------|-----|-------|
| **SecurityHeaders.com** | securityheaders.com | HTTP güvenlik başlıkları skoru |
| **SSL Labs** | ssllabs.com/ssltest | SSL/TLS konfigürasyonu |
| **Mozilla Observatory** | observatory.mozilla.org | Kapsamlı güvenlik taraması |

**Kontrol listesi:**
- [ ] HTTPS zorunlu mu? (HTTP → HTTPS yönlendirme)
- [ ] `Strict-Transport-Security` (HSTS) var mı?
- [ ] `Content-Security-Policy` (CSP) tanımlı mı?
- [ ] `X-Content-Type-Options: nosniff` var mı?
- [ ] `X-Frame-Options` veya CSP frame-ancestors var mı?
- [ ] `Referrer-Policy` ayarlanmış mı?

---

### 6. HTML & CSS Validasyon

| Araç | URL | Ölçüm |
|------|-----|-------|
| **W3C HTML Validator** | validator.w3.org | HTML hataları ve uyarıları |
| **W3C CSS Validator** | jigsaw.w3.org/css-validator | CSS syntax hataları |

**Kontrol listesi:**
- [ ] HTML doküman hatasız mı?
- [ ] Duplicated ID yok mu?
- [ ] Kapatılmamış etiket yok mu?
- [ ] Geçersiz attribute kullanımı yok mu?

---

### 7. GDPR & Gizlilik Uyumluluğu

| Araç | URL | Ölçüm |
|------|-----|-------|
| **CookieScript Scanner** | cookie-script.com/cookie-scanner | Kullanılan çerezlerin tespiti |
| **Sovy GDPR Scan** | sovy.com/gdpr-scan | GDPR temel uyumluluk taraması |
| **Blacklight** | themarkup.org/blacklight | Gizli tracker tespiti |

**Kontrol listesi:**
- [ ] Çerez banner'ı gerekiyor mu? (tracker kullanılıyor mu?)
- [ ] Datenschutz (Privacy Policy) sayfası mevcut ve güncel mi?
- [ ] Impressum sayfası Alman yasal gerekliliklerini karşılıyor mu?
- [ ] Üçüncü taraf script/font yüklemesi var mı? (Google Fonts, Analytics vb.)
- [ ] Kontakt formu verisi nasıl işleniyor?

---

## Uygulama Sırası

| Adım | Kategori | Öncelik | Süre |
|------|----------|---------|------|
| 1 | Performance & Core Web Vitals | 🔴 Kritik | ~15 dk |
| 2 | SEO | 🔴 Kritik | ~20 dk |
| 3 | Erişilebilirlik | 🔴 Kritik | ~15 dk |
| 4 | Çok Dillilik | 🟡 Yüksek | ~10 dk |
| 5 | HTML/CSS Validasyon | 🟡 Yüksek | ~10 dk |
| 6 | Güvenlik | 🟡 Yüksek | ~10 dk |
| 7 | GDPR | 🟠 Orta | ~10 dk |

**Toplam tahmini süre:** ~90 dakika (ilk kapsamlı denetim)

---

## Bilinen Eksikler (Kod İncelemesinden)

Henüz canlı test yapılmadan, kod incelemesi sonucu tespit edilen eksikler:

- [ ] `robots.txt` ve `sitemap.xml` mevcut değil
- [ ] JSON-LD structured data (Organization, LocalBusiness) eklenmemiş
- [ ] Open Graph / Twitter Card meta etiketleri tanımlı değil
- [ ] hreflang etiketleri muhtemelen eksik (next-intl otomatik eklemez)
- [ ] Security headers tanımlı değil (`next.config.ts`'de yok)
- [ ] Impressum ve Datenschutz sayfaları henüz implement edilmemiş

---

## Sonraki Adımlar

1. Vercel'e deploy et → canlı URL al
2. Bu plandaki araçları sırayla çalıştır → her aracın raporunu kaydet
3. Bulguları analiz et → düzeltme planı çıkar
4. Düzeltmeleri uygula → tekrar test et

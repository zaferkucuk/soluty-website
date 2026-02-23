# Task: Legal Pages — Impressum & Datenschutz

**Phase:** 2 — SEO & Technical Infrastructure  
**Rol:** Web Developer  
**Öncelik:** 🟡 7  
**Bağımlılık:** i18n routing çalışıyor olmalı (mevcut — zaten var)  
**Spec referansı:** `docs/seo-geo-spec.md` §10

---

## Görev Tanımı

Almanya hukuku gereği zorunlu olan Impressum (§5 DDG) ve Datenschutzerklärung
sayfalarını 3 dilde oluşturmak ve footer'dan erişilebilir kılmak.

---

## ⚠️ Önemli: Eksik Bilgiler

Aşağıdaki bilgiler Zafer tarafından sağlanmalı — bunlar olmadan Impressum tamamlanamaz:

```
❓ Handelsregisternummer:  HRB [numara] — Amtsgericht Berlin-Charlottenburg'dan
❓ Geschäftsführer:        [Ad Soyad] — GmbH yöneticisi
❓ USt-IdNr.:              [KDV no] — varsa (Finanzamt'tan)
```

Bu bilgiler alınmadan Impressum sayfaları deploy edilmemeli.

---

## Kapsam

### 1. URL Yapısı

```
/de/impressum     → Almanca (canonical)
/en/imprint       → İngilizce
/tr/impressum     → Türkçe

/de/datenschutz   → Almanca (canonical)
/en/privacy       → İngilizce
/tr/gizlilik      → Türkçe
```

**Dikkat:** `en/impressum` değil, `en/imprint` — İngilizce standart.

---

### 2. Dosya Yapısı (Next.js App Router)

```
app/
  [locale]/
    impressum/
      page.tsx
    datenschutz/
      page.tsx
```

`/en/imprint` ve `/tr/impressum` için next-intl ile lokalize path'ler kullanılabilir
veya tüm locale'lar `impressum` path'ini kullanabilir (daha basit).
Eğer basit yaklaşım seçilirse `en/impressum` ve `tr/impressum` kabul edilebilir.

---

### 3. messages/*.json — Gerekli Alanlar

Her dil dosyasına eklenmesi gereken alanlar:

```json
"impressum": {
  "title": "Impressum",
  "responsibleHeader": "Angaben gemäß § 5 DDG",
  "companyName": "Soluty GmbH",
  "address": "Chausseestraße 93, 10115 Berlin",
  "phone": "+49 171 8023675",
  "email": "info@soluty.de",
  "registerCourt": "Amtsgericht Charlottenburg",
  "registerNumber": "HRB [NUMARA]",
  "managingDirector": "[AD SOYAD]",
  "vatId": "DE[NUMARA]"
},
"datenschutz": {
  "title": "Datenschutzerklärung",
  "lastUpdated": "[TARİH]"
}
```

İngilizce ve Türkçe için eşdeğer çeviriler.

---

### 4. Impressum Sayfa İçeriği

```tsx
// app/[locale]/impressum/page.tsx

export async function generateMetadata({ params }) {
  return {
    title: 'Impressum | Soluty GmbH',
    robots: 'noindex, follow'  // Legal sayfalar index edilmemeli
  }
}

// Gerekli JSON-LD:
const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Impressum',
  url: `https://soluty.io/${locale}/impressum`,
  breadcrumb: { /* BreadcrumbList */ }
}
```

**Notlar:**
- `robots: 'noindex, follow'` — legal sayfaların search index'e girmesi gerekmez
- Semantic HTML zorunlu: `<address>` tag'i adres bilgisi için
- İletişim bilgileri tıklanabilir olmalı: `<a href="tel:...">` ve `<a href="mailto:...">`

---

### 5. Datenschutz Sayfa İçeriği

Zorunlu bölümler (tam içerik i18n string'leri olarak yazılacak):

```
1. Verantwortlicher
   Soluty GmbH, Chausseestraße 93, 10115 Berlin
   info@soluty.de

2. Erhobene Daten
   a) Kontaktformular: Name, Firma, E-Mail, Telefon (optional), Nachricht
   b) Server-Logs: IP, Datum, Uhrzeit, Browser (automatisch)

3. Rechtsgrundlage
   Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) — Form
   Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) — Logs

4. Drittanbieter
   - Zoho Mail: E-Mail-Versand (Auftragsverarbeitung, EU/DE Server)
   - Hosting: Hostinger (Serverstandort prüfen — EU olmalı)

5. Speicherdauer
   Kontaktdaten: max. 3 Jahre / bis Anfrage erledigt
   Server-Logs: 7 Tage, dann automatisch gelöscht

6. Keine Cookies
   Diese Website verwendet keine Tracking-Cookies.
   Technisch notwendige Verarbeitung nach Art. 6 Abs. 1 lit. f DSGVO.

7. Betroffenenrechte
   Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
   Einschränkung (Art. 18), Widerspruch (Art. 21)
   Kontakt: info@soluty.de

8. Beschwerderecht
   Berliner Beauftragte für Datenschutz und Informationsfreiheit
   https://www.datenschutz-berlin.de
```

---

### 6. Footer Güncellemesi

Footer'da her iki sayfa her locale'da görünmeli. Mevcut footer i18n string'leri
zaten var (`footer.legal.imprint` ve `footer.legal.privacy`). Linklerin
doğru locale path'lerine işaret ettiği doğrulanacak.

```tsx
// Doğru: locale-aware link
<Link href={`/${locale}/impressum`}>
  {t('footer.legal.imprint')}
</Link>
```

---

## Doğrulama

```
✅ /de/impressum — yükleniyor, Handelsregisternummer dahil
✅ /en/impressum (veya /en/imprint) — İngilizce içerik
✅ /tr/impressum — Türkçe içerik
✅ /de/datenschutz — tüm DSGVO bölümleri var
✅ robots: noindex tag'i her legal sayfada mevcut
✅ Footer'daki linkler çalışıyor — tüm localelarda
✅ Telefon ve e-posta tıklanabilir (tel: ve mailto: linkleri)
✅ <address> HTML element'i kullanılmış
✅ Hukuki metin: Handelsregisternummer doldurulmuş ([NUMARA] yok)
✅ Lighthouse Accessibility: legal sayfalar da ≥ 90
```

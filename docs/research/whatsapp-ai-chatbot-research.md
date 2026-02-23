# Araştırma: WhatsApp Entegrasyonu ve AI Chatbot Stratejisi

**Tarih:** 2026-02-12  
**Rol:** Researcher  
**Durum:** Tamamlandı — Karar bekliyor

---

## Özet

Bu doküman, Soluty web sitesi ziyaretçilerinin iletişimini kolaylaştırmak için iki aşamalı bir strateji araştırmasıdır:

- **Kısa vade:** WhatsApp floating chat button
- **Uzun vade:** AI chatbot entegrasyonu (Soluty bilgi tabanıyla eğitilmiş)

---

## Bölüm 1: Kısa Vade — WhatsApp Chat Button

### 1.1 Yaklaşım Seçenekleri

#### Seçenek A: Sade `wa.me` Link Butonu (Önerilen)

Sıfır bağımlılık yaklaşımı. Kendi yazdığımız bir floating button, tıklandığında `https://wa.me/491718023675?text=...` linkini açar.

**Nasıl çalışır:**
- Sayfanın sağ alt köşesinde sabit bir WhatsApp ikonu
- Tıklama → WhatsApp uygulaması veya WhatsApp Web açılır
- Ön tanımlı (pre-filled) mesaj ile konuşma başlar
- Hiçbir üçüncü parti servis kullanılmaz
- Hiçbir kişisel veri site tarafından işlenmez

**Teknik detay:**
```
URL formatı: https://wa.me/491718023675?text=Merhaba%2C%20web%20siteniz%20üzerinden%20iletişime%20geçmek%20istiyorum.
```

**Avantajlar:**
- Sıfır maliyet
- Sıfır üçüncü parti bağımlılık
- DSGVO açısından en güvenli (site veri toplamaz, kullanıcı kendi iradesiyle WhatsApp açar)
- Performans etkisi yok (external script yüklenmez)
- Tam kontrol (tasarım, animasyon, davranış)

**Dezavantajlar:**
- Chat geçmişi sadece WhatsApp'ta kalır (CRM entegrasyonu yok)
- Otomatik mesaj/chatbot özelliği yok
- Analitik yok (kaç kişi tıkladığını bilmek için manual event tracking gerekir)

#### Seçenek B: Üçüncü Parti WhatsApp Widget

Elfsight, GetButton, Callbell gibi SaaS araçlar hazır bir widget sunar.

**Avantajlar:**
- Hızlı kurulum
- Bazılarında analitik dahil
- Bazılarında birden fazla kanal (WhatsApp + Telegram + Email)

**Dezavantajlar:**
- External JavaScript yüklenir (Core Web Vitals etkisi)
- Üçüncü parti cookie/veri toplama riski → DSGVO sorunu
- Aylık maliyet (genelde $5-20/ay)
- Tasarım kontrolü sınırlı
- Vendor bağımlılığı

#### Seçenek C: WhatsApp Business API

Profesyonel çözüm. Chatbot, otomatik yanıt, CRM entegrasyonu mümkün.

**Avantajlar:**
- Otomatik yanıtlar
- CRM entegrasyonu
- Çoklu operatör desteği
- DSGVO uyumlu (EU-BSP kullanıldığında)

**Dezavantajlar:**
- Sertifikalı Business Solution Provider (BSP) gerektirir
- Meta Business hesabı doğrulaması gerekir
- Maliyet: BSP ücretleri + WhatsApp conversation-based pricing
- Kurulum karmaşıklığı yüksek
- Soluty'nin mevcut hacmi için aşırı (overengineering)

### 1.2 DSGVO (GDPR) Değerlendirmesi

**Kritik bilgi:** WhatsApp Business **uygulaması** DSGVO uyumlu değildir. Yalnızca WhatsApp Business **API**, EU sertifikalı BSP üzerinden kullanıldığında DSGVO uyumludur.

Ancak Seçenek A (wa.me link butonu) farklı bir kategoridir:
- Site herhangi bir kişisel veri toplamaz veya işlemez
- Kullanıcı kendi iradesiyle harici bir uygulamayı (WhatsApp) açar
- Bu, web sitesine bir telefon numarası (`tel:` linki) koymakla aynı mantıktır
- Site ile WhatsApp arasında veri alışverişi yoktur

**Sonuç:** wa.me link butonu, site perspektifinden DSGVO açısından sorunsuz. İletişim WhatsApp platformunda gerçekleşir ve WhatsApp'ın kendi gizlilik politikasına tabidir.

**Öneri:** Datenschutz (Privacy Policy) sayfasında WhatsApp iletişim kanalının Meta tarafından işlendiğine dair bir bilgilendirme notu eklenmelidir.

### 1.3 Teknik Uygulama Detayı (Seçenek A)

**Bileşen:** `WhatsAppButton.tsx` (client component)

**Davranış:**
- Sayfanın sağ alt köşesinde sabit (fixed position)
- Scroll-up sırasında görünür, aşağı scroll'da kaybolabilir (opsiyonel)
- Mobile ve desktop'ta çalışır
- WhatsApp ikonu (SVG, Lucide veya custom)
- Hover'da tooltip: "WhatsApp'tan yazın" (çok dilli)
- Tıklama → yeni sekmede wa.me linki açar
- Basit fade-in animasyonu (sayfa yüklendikten 2-3 saniye sonra)

**Pre-filled mesaj (dile göre):**
- DE: "Hallo, ich habe Ihre Website besucht und möchte mehr über Ihre Leistungen erfahren."
- EN: "Hello, I visited your website and would like to learn more about your services."
- TR: "Merhaba, web sitenizi ziyaret ettim ve hizmetleriniz hakkında daha fazla bilgi almak istiyorum."

**Accessibility:**
- `aria-label` zorunlu
- Keyboard accessible (focus-visible)
- Minimum 44x44px touch target

**Performans:**
- Sıfır external script
- SVG ikon (inline veya static import)
- Minimal JavaScript (sadece locale-based URL)

### 1.4 Önerilen Karar: Seçenek A

**Gerekçe:**
1. Soluty erken aşama bir şirket — karmaşık API kurulumu gereksiz
2. DSGVO riski minimum
3. Sıfır maliyet ve sıfır bağımlılık
4. Performans etkisi sıfır
5. Hızlı implementasyon (1-2 saat)
6. Uzun vadede AI chatbot'a geçiş yapılınca WhatsApp butonu ile birlikte çalışabilir

---

## Bölüm 2: Uzun Vade — AI Chatbot Entegrasyonu

### 2.1 Amaç

Web sitesi ziyaretçilerinin Soluty hakkında sorularını yanıtlayabilen, bilgi tabanıyla eğitilmiş bir AI chatbot. Hedefler:

- 7/24 erişilebilir ilk temas noktası
- Sık sorulan soruları otomatik yanıtlama (ERP maliyeti, süre, modüller vb.)
- Lead qualification (ziyaretçi bilgilerini toplama)
- İnsan operatöre yönlendirme kapasitesi

### 2.2 Platform Karşılaştırması

| Kriter | Tidio | Crisp | Botpress | Voiceflow | Chatwoot |
|--------|-------|-------|----------|-----------|----------|
| **AI chatbot** | ✅ Lyro AI | ✅ AI Bot | ✅ Gelişmiş | ✅ Gelişmiş | ❌ (manual bot) |
| **Bilgi tabanı eğitimi** | ✅ URL/doküman | ✅ URL/doküman | ✅ Knowledge base | ✅ Knowledge base | ❌ |
| **WhatsApp entegrasyonu** | ✅ (ücretli) | ✅ (ücretli) | ✅ (API) | ✅ (API) | ✅ (API) |
| **Self-hosted seçenek** | ❌ | ❌ | ✅ (açık kaynak) | ❌ | ✅ (açık kaynak) |
| **DSGVO uyumu** | ⚠️ EU sunucu yok | ✅ EU sunucular | ✅ Self-host ile tam kontrol | ⚠️ US-based | ✅ Self-host ile tam kontrol |
| **Başlangıç fiyatı** | ~$29/ay | ~$25/ay | Ücretsiz (self-host) | ~$50/ay | Ücretsiz (self-host) |
| **Kurulum kolaylığı** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Çok dilli destek** | ✅ | ✅ | ✅ | ✅ | ⚠️ Sınırlı |
| **Widget özelleştirme** | Orta | İyi | Tam | Tam | Tam |
| **Next.js uyumu** | Script embed | Script embed | API + React SDK | API + embed | Self-host + API |

### 2.3 Derinlemesine Analiz: En Uygun 3 Aday

#### A) Crisp (SaaS — Kolay Başlangıç)

**Neden uygun:**
- EU sunucuları mevcut (DSGVO için kritik)
- AI bot özelliği web sitesi içeriğinden otomatik öğrenebilir
- WhatsApp Business entegrasyonu var
- Widget tasarımı özelleştirilebilir
- Çok dilli destek (DE/EN/TR)

**Fiyat:** Pro plan ~$25/ay (4 operatör dahil), AI bot ek ücretli  
**Kurulum:** ~2-4 saat (script embed + bilgi tabanı yükleme)  
**Risk:** Vendor bağımlılığı, external script performans etkisi

#### B) Botpress (Self-hosted — Tam Kontrol)

**Neden uygun:**
- Açık kaynak, self-hosted seçenek → tam DSGVO kontrolü
- Gelişmiş NLU (Natural Language Understanding)
- Knowledge base özelliği ile web sitesi içeriğini öğrenebilir
- WhatsApp Business API entegrasyonu
- React SDK ile Next.js'e native entegrasyon mümkün

**Fiyat:** Self-hosted ücretsiz, Cloud: kullanıma göre değişir  
**Kurulum:** ~1-2 hafta (self-host + knowledge base + widget entegrasyonu)  
**Risk:** Self-hosting bakım yükü, daha fazla teknik bilgi gerektirir

#### C) Özel Çözüm (Anthropic/OpenAI API + Custom Widget)

**Neden uygun:**
- Tam kontrol (tasarım, davranış, veri)
- Soluty'nin kendi bilgi tabanıyla eğitilebilir (FAQ, hizmetler, fiyatlandırma)
- DSGVO tam kontrolü (veri EU sunucularında kalır)
- WhatsApp butonu ile paralel çalışabilir
- Soluty'nin teknik yetkinliğinin gösterimi

**Fiyat:** API maliyetleri (~$5-20/ay kullanıma göre) + geliştirme süresi  
**Kurulum:** ~2-4 hafta  
**Risk:** Geliştirme ve bakım sorumluluğu tamamen Soluty'de

### 2.4 Önerilen Strateji: Aşamalı Geçiş

```
Faz 1 (Şimdi)     → WhatsApp floating button (wa.me link)
Faz 2 (3-6 ay)    → Crisp veya Botpress ile AI chatbot pilot
Faz 3 (6-12 ay)   → Özel AI çözüm (Soluty bilgi tabanı + WhatsApp API)
```

**Faz 1** hemen uygulanabilir ve sıfır maliyetli.  
**Faz 2** için Crisp (hızlı başlangıç, düşük bakım) veya Botpress (tam kontrol) arasında seçim yapılabilir.  
**Faz 3** uzun vadede en güçlü çözüm, ancak geliştirme kaynağı gerektirir.

---

## Bölüm 3: Uygulama Takvimi

### Hemen (Faz 1)

| Görev | Tahmini Süre |
|-------|-------------|
| `WhatsAppButton.tsx` bileşeni oluştur | 1 saat |
| i18n mesajları ekle (DE/EN/TR) | 15 dk |
| Layout'a entegre et | 15 dk |
| Mobile/desktop test | 30 dk |
| **Toplam** | **~2 saat** |

### Uzun Vadede (Faz 2 Hazırlık)

| Görev | Tahmini Süre |
|-------|-------------|
| Platform seçimi ve değerlendirmesi | 1-2 gün |
| WhatsApp Business hesabı kurulumu | 1 gün |
| Meta Business doğrulaması | 1-2 hafta (Meta onay süresi) |
| AI bilgi tabanı hazırlığı (FAQ + hizmet bilgileri) | 2-3 gün |
| Chatbot pilot entegrasyonu ve testi | 3-5 gün |

---

## Bölüm 4: Açık Sorular (Karar Gerektiren)

1. **WhatsApp butonu:** Seçenek A (wa.me link) ile devam edelim mi?
2. **Buton davranışı:** Sürekli görünür mü, yoksa scroll sonrası mı görünsün?
3. **Tooltip/expand:** Sadece ikon mi, yoksa hover'da "WhatsApp'tan yazın" metni mi gösterilsin?
4. **Konum:** Sağ alt köşe standart mı, yoksa farklı bir konum mu?
5. **AI chatbot:** Uzun vadede hangi yaklaşım (Crisp/Botpress/Özel) tercih ediliyor?

---

## Kaynaklar

- [heyData: WhatsApp Business GDPR Guide](https://heydata.eu/en/magazine/how-to-use-whats-app-for-business-while-staying-gdpr-compliant/)
- [WhatsApp wa.me API Documentation](https://faq.whatsapp.com/5913398998672934)
- [Tidio AI Chatbot Pricing](https://www.tidio.com/blog/chatbot-pricing/)
- [Botpress Open Source](https://botpress.com)
- [Crisp Chat Platform](https://crisp.chat)

# BK Drilling Web - Proje Hafızası

## Proje Bilgileri
- **Proje:** BK Drilling - Yedek parça tedarikçi web sitesi
- **Teknoloji:** Next.js 16, React 19, Tailwind CSS v4, TypeScript
- **Sahip:** Berkan (ilk kez web sitesi yapıyor)
- **Canlı:** bkdrilling.com (under construction sayfası aktif)
- **Repo:** https://github.com/berkankalkan-bot/bkdrilling.git
- **Markalar:** Sandvik, Epiroc, Atlas Copco, Tamrock

## Mevcut Durum (Son Kayıt: 2026-02-22)
- Ana sayfa (page.tsx) çalışıyor — premium brand kartları + efektler
- Under Construction overlay KAPALI (layout.tsx'de yoruma alınmış)
- Dev server: `npm run dev` → localhost:3000
- **Son commit:** Machine glow overflow fix + section isolation

## Sayfa Yapısı
### Var olan sayfalar:
- `/` → Ana sayfa (Sandvik/Epiroc kartları + Quick Links + Disclaimer)

### Henüz yapılmamış sayfalar (linkler var ama sayfa yok):
- `/spare-parts/sandvik` - `/spare-parts/sandvik?category=surface` - `/spare-parts/sandvik?category=underground`
- `/spare-parts/epiroc` - `/spare-parts`
- `/machines/epiroc/surface` - `/machines/epiroc/underground`
- `/second-hand-parts` - `/compressors` - `/catalogue`
- `/about` - `/contact`
- `/urun/[id]` (ürün detay)
- `/arama?q=` (arama sonuçları)

## Ana Sayfa Bölümleri (page.tsx)
1. **Sandvik & Epiroc Kartları** - Split hover efekti (üst: surface, alt: underground)
   - 3D tilt efekti (perspective + rotateY/X mouse ile)
   - Hover'da: section glow, machine glow, shine sweep, drop-shadow
   - SANDVIK/EPIROC yazısı: brand-shimmer + brand-glow-bg animasyonu, hover'da fade
   - Divider çizgisi: hover'da kaybolur, iki section ayrılır (±10px translate)
   - Machine container'larda `overflow-hidden` — glow diğer section'a TAŞMAZ
2. **Quick Links** - Second Hand Parts, Compressors, All Parts Catalogue
3. **Trademark Disclaimer** - Siyah arka plan

## Drill Contact Efektleri (Mevcut — Cartoon Puff + Rock)
Her makine hover'da drill temas noktasında efekt gösterir:

### CSS Animasyonları (globals.css):
- **puff-up-1/2/3** — Surface driller için yukarı doğru puff (scale 0.3→1→2.1)
- **puff-right-1/2/3** — Underground driller için sağa doğru puff
- **rock-up-1~6** — Surface için yerçekimli kaya parçacıkları (parabolik ark, uzun mesafe)
- **rock-right-1~6** — Underground için sağa kaya parçacıkları (kısa mesafe, ~50% azaltılmış)
- **machine-glow-pulse** — Scale 0.9→1.1, translate KALDIRILDI (overflow fix)
- CSS class'ları: `.animate-puff-up-1`, `.animate-puff-right-1` vb.
- **Desync class'ları**: `.animate-puff-right-1-d`, `-2-d`, `-3-d` — Boom 2 için +0.45s gecikmeli versiyonlar

### 5 Efekt Bölgesi (page.tsx):
1. **Sandvik Surface** — `top: 81%, left: 31%` — puff-up + rock-up — BÜYÜK taşlar (5px max), 9 adet
2. **Sandvik Underground Boom 1** — `top: 25%, left: 10%` — puff-right + rock-right — KÜÇÜK taşlar (2px max), 9 adet
3. **Sandvik Underground Boom 2** — `top: 33%, left: 5%` — puff-right-**d** + rock-right — Boom 1 ile AYNI boyut, 9 adet, **+0.45s desync**
4. **Epiroc Surface** — `top: 85%, left: 32%` — puff-up + rock-up — BÜYÜK taşlar (5px max), 9 adet
5. **Epiroc Underground** — `top: 28%, left: 2%` — puff-right + rock-right — KÜÇÜK taşlar (2px max), 9 adet

### Taş Boyut Kuralı:
- **Surface** = BÜYÜK taşlar (1-5px), uzun mesafe sıçrama
- **Underground** = KÜÇÜK taşlar (1-2px) ama ÇOK adet (9 per boom), kısa mesafe sıçrama
- Boom 1 ve Boom 2 aynı taş büyüklükleri, farklı zamanlama (desync)

### Puff Elementleri:
- Rounded-full div'ler, radial-gradient background (bej/gri tonları)
- 3 puff per bölge (büyük ~20px, orta ~14px, küçük ~10px)
- className ile animasyon (inline animation çalışmıyor, className zorunlu!)

### Rock Fragment Elementleri:
- 9 küçük div per bölge, inline animation style ile çalışıyor
- Yerçekimli parabolik ark animasyonları
- Underground rock-right mesafeleri yarıya indirildi (max ~20px)

### Machine Glow Sistemi:
- Glow div: `left-[15%]` ile merkezlenmiş (left-1/2 + translate KULLANMA!)
- Direkt hover: %100 opacity + animate-machine-glow (pulsing)
- Diğer section hover (card hover): %40 opacity, statik (karartmayı önler)
- Container'larda `overflow-hidden` — glow komşu section'a TAŞMAZ
- **BUG FIX**: `machine-glow-pulse` animasyonundan `translate(-50%, -50%)` kaldırıldı — bu underground glow'un surface'a taşmasına neden oluyordu

## Önemli Dosyalar
- `app/layout.tsx` - Root layout (Header + Footer, UnderConstruction YORUMDA)
- `app/page.tsx` - Ana sayfa
- `components/Header.tsx` - Siyah header, dropdown menüler, InstantSearch
- `components/Footer.tsx` - Footer (WhatsApp, Instagram, LinkedIn, iletişim)
- `components/InstantSearch.tsx` - Fuse.js fuzzy search
- `components/UnderConstructionOverlay.tsx` - Under construction sayfası
- `lib/data.ts` - Mock ürün verileri (~30+ ürün)
- `lib/sandvik-parts.ts` - Sandvik parça verileri

## Kurulu Kütüphaneler (package.json'da)
- three.js, @types/three (Three.js 3D)
- framer-motion (scroll animasyonları)
- gsap (GreenSock animasyon)
- fuse.js (fuzzy search)
- lucide-react (ikonlar)
- radix-ui (UI primitives)

## Denenip Beğenilmeyen Efektler (TEKRAR YAPMA)
1. **Hover efektleri** (6 farklı deneme) - CSS hover, 3D tilt, maden temalı, sürüş animasyonu, Apple premium glow → HEPSİ REDDEDİLDİ
2. **PartsCloud** - Three.js ile uzayda süzülen parçalar (clouds.html adaptasyonu) → Beyaz arka plan sorunu, sayfa uyumu kötü → REDDEDİLDİ
3. **PartsRings** - Three.js ile dönen halkalarda parçalar (kokomi.js adaptasyonu) → REDDEDİLDİ
4. **SpaceDescent** - Framer Motion scroll ile uzaydan maden ocağına iniş → REDDEDİLDİ
5. **Makine fotoğrafları invert efekti** - CSS filter invert + screen blend → REDDEDİLDİ
6. **Gerçekçi toz bulutu** (box-shadow tekniği) — Çok iterasyon yapıldı, overflow-hidden clipping sorunu, blob'lar birleşmedi → KALDIRILDI, cartoon tarzına geçildi
7. **filter: blur() wrapper** — Wrapper div 0x0 boyut sorunu → ÇALIŞMADI
8. **Inline animation style (puff)** — Tailwind v4'te className ile çalışıyor ama inline `animation: 'puff-up-1...'` çalışmıyor! Rock animation'ları inline çalışıyor ama puff'lar çalışmadı → HER ZAMAN CSS CLASS KULLAN
9. **Machine glow left-1/2 + translate(-50%,-50%)** — Glow animasyonu translate ile komşu section'a taşıyor → left-[15%] + overflow-hidden ile düzeltildi

## Kullanıcı Tercihleri
- Apple kalitesinin altını KABUL ETMİYOR
- Basit efektler istemiyor, premium istiyor
- Gerçekçilik değil, premium his istiyor
- Scroll animasyonları (Framer Motion whileInView) konseptini beğeniyor ama henüz uygulanmadı
- İstediğinde hemen geri alabilmeli
- B2B site - ziyaretçiler yedek parça aramaya geliyor, bekletilmemeli
- Intro/jenerik KOYMAYACAĞIZ - direkt arama erişimi önemli

## Grafik Klasörü
- `C:\Users\berka\Desktop\grafik` - 345+ parça resmi (jpg/png) + 10 HTML animasyon dosyası
- HTML dosyaları: clouds.html, tunnel.html, prism.html, carousel.html, scroll.html, cubes.html, rings.html, balloons.html, logo-tree.html, index.html
- BK Drilling logosu da burada: "BK Drilling logosu, .png"

## Git Durumu
- Git çalışıyor, remote: `origin/main`
- **Önemli commit'ler:**
  - `fc328c8` — Full project state with CLAUDE.md project memory (ilk tam kayıt)
  - `c8f872b` — Cartoon-style dust puff animations
  - `b7e5c29` — Rock fragments fine-tune (surface=big, underground=small+many)
  - `0ee81ad` — Desync Boom 1 & Boom 2 animations
  - Son commit — Machine glow overflow fix + section isolation (mevcut durum)

## Sıradaki İşler
- [ ] Scroll animasyonları ekle (Framer Motion - konsept beğenildi)
- [ ] Arama çubuğunu daha belirgin yap
- [ ] Eksik sayfaları oluştur (spare-parts, about, contact vs.)
- [ ] CLAUDE.md'yi her session sonunda güncelle

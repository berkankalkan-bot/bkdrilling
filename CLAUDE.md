# BK Drilling Web - Proje Hafızası

## Proje Bilgileri
- **Proje:** BK Drilling - Yedek parça tedarikçi web sitesi
- **Teknoloji:** Next.js 16, React 19, Tailwind CSS v4, TypeScript
- **Sahip:** Berkan (ilk kez web sitesi yapıyor)
- **Canlı:** bkdrilling.com (under construction sayfası aktif)
- **Repo:** https://github.com/berkankalkan-bot/bkdrilling.git
- **Markalar:** Sandvik, Epiroc, Atlas Copco, Tamrock

## Mevcut Durum (Son Kayıt: 2026-02-18)
- Ana sayfa (page.tsx) çalışıyor - orijinal hali
- Under Construction overlay KAPALI (layout.tsx'de yoruma alınmış)
- Dev server: `npm run dev` → localhost:3000

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
2. **Quick Links** - Second Hand Parts, Compressors, All Parts Catalogue
3. **Trademark Disclaimer** - Siyah arka plan

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
- `.git` klasörü var ama git komutları çalışmıyor (muhtemelen bozuk repo)
- Workaround: Manuel dosya backup ile çalışıyoruz

## Sıradaki İşler
- [ ] Makine fotoğraflarını iyileştir (şu an siyah-beyaz siluet, daha premium olmalı)
- [ ] Scroll animasyonları ekle (Framer Motion - konsept beğenildi)
- [ ] Arama çubuğunu daha belirgin yap
- [ ] Eksik sayfaları oluştur (spare-parts, about, contact vs.)
- [ ] CLAUDE.md'yi her session sonunda güncelle

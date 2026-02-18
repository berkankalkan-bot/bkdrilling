# BK Drilling Web

> Türkiye'nin en hızlı sondaj ve matkap yedek parçası tedarikçisi

Modern, performans odaklı e-ticaret platformu - Sondaj ekipmanları ve yedek parçaları için Next.js 16 ve React 19 ile geliştirilmiştir.

## Proje Hakkında

BK Drilling Web, sondaj makineleri ve yedek parçalarının satışı için geliştirilmiş bir katalog ve e-ticaret platformudur. Platform, SANDVIK ve EPIROC gibi dünya çapında tanınmış markaların ürünlerini sergiler ve müşterilere hızlı arama ve kategorize edilmiş ürün listeleme imkanı sunar.

### Ana Özellikler

- **Marka Bazlı Kataloglar**: SANDVIK (sarı/altın tema) ve EPIROC (kırmızı tema) için özel renk şemaları
- **Anlık Fuzzy Arama**: Fuse.js ile yazım hatalarına toleranslı, gerçek zamanlı ürün arama
- **Kategorize Ürünler**: Hidrolik parçalar, kaya matkapları, sondaj ekipmanları
- **Responsive Tasarım**: Mobil, tablet ve desktop için optimize edilmiş
- **Modern UI**: Tailwind CSS 4 ve shadcn/ui bileşenleri ile şık arayüz
- **Performans Optimizasyonu**: React Compiler ve Next.js 16 optimizasyonları

## Teknoloji Yığını

### Core Framework
- **Next.js 16.0.10** - App Router ile full-stack React framework
- **React 19.2.1** - React Compiler ile optimize edilmiş
- **TypeScript 5** - Tip güvenliği

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI component library
- **Lucide React 0.561.0** - Modern icon library
- **Class Variance Authority (CVA)** - Component variant management
- **tw-animate-css** - Gelişmiş animasyon utilities

### Search & Utilities
- **Fuse.js 7.1.0** - Fuzzy search engine
- **clsx & tailwind-merge** - CSS class yönetimi

## Proje Yapısı

```
bk_drilling_web/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (Header/Footer)
│   ├── page.tsx                  # Ana sayfa (Marka seçimi)
│   ├── globals.css               # Global styles
│   ├── machines/
│   │   ├── sandvik/page.tsx      # Sandvik ürün kataloğu
│   │   └── epiroc/page.tsx       # Epiroc ürün kataloğu
│   ├── drifters/page.tsx         # Kaya matkapları
│   └── hydraulic/page.tsx        # Hidrolik parçalar
│
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer
│   ├── InstantSearch.tsx         # Fuzzy search component
│   └── ui/                       # shadcn-style UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── input.tsx
│       └── navigation-menu.tsx
│
├── lib/
│   ├── data.ts                   # Mock ürün veritabanı (60+ ürün)
│   └── utils.ts                  # Utility fonksiyonlar
│
├── public/
│   ├── images/                   # Logolar, görseller, videolar
│   │   ├── bk-drilling-logo.png
│   │   ├── hero-video.mp4
│   │   ├── hero-bg.webp
│   │   └── underground-drill.PNG
│   └── *.svg                     # Default Next.js SVG'ler
│
└── Configuration Files
    ├── next.config.ts            # Next.js config
    ├── tsconfig.json             # TypeScript config
    ├── tailwind.config.ts        # Tailwind CSS config
    ├── components.json           # shadcn/ui config
    └── package.json              # Dependencies
```

## Kurulum

### Gereksinimler
- Node.js 18.18 veya üzeri
- npm, yarn, pnpm veya bun

### Adımlar

1. Repository'yi klonlayın:
```bash
git clone <repository-url>
cd bk_drilling_web
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. Development server'ı başlatın:
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

4. Tarayıcınızda açın:
```
http://localhost:3000
```

## Kullanılabilir Komutlar

```bash
npm run dev          # Development server başlat (port 3000)
npm run build        # Production build oluştur
npm start            # Production server başlat
npm run lint         # ESLint kontrolü
```

## Sayfa Yapısı

| Route | Açıklama | Durum |
|-------|----------|-------|
| `/` | Ana sayfa - Marka seçimi (SANDVIK/EPIROC) | ✅ Aktif |
| `/machines/sandvik` | Sandvik ürün kataloğu | ✅ Aktif |
| `/machines/epiroc` | Epiroc ürün kataloğu | ✅ Aktif |
| `/drifters` | Kaya matkapları ve drifter'lar | ✅ Aktif |
| `/hydraulic` | Hidrolik parçalar | ✅ Aktif |
| `/spare-parts` | Tüm yedek parçalar | 🚧 Planlandı |
| `/about` | Hakkımızda | 🚧 Planlandı |
| `/contact` | İletişim | 🚧 Planlandı |

## Özellikler Detayı

### 1. Anlık Arama (Instant Search)
- **Teknoloji**: Fuse.js fuzzy search
- **Özellikler**:
  - Yazım hatalarına toleranslı (~30% hata payı)
  - Ürün adı, marka, model, parça numarası ve kategori bazlı arama
  - Gerçek zamanlı sonuçlar (2 karakter sonrası aktif)
  - En iyi 10 sonuç gösterimi
  - Görsel önizleme kartları

### 2. Marka Katalogları
- **SANDVIK**: Sarı/altın renk teması ile surface ve underground sondaj ekipmanları
- **EPIROC**: Kırmızı renk teması ile Atlas Copco ürün yelpazesi
- Model bazlı gruplama
- Genişletilebilir ürün listeleri
- Fiyat ve parça numarası bilgileri

### 3. Kategorize Ürünler
- **Rock Drills & Drifters**: COP serisi, pistonlar, chuck'lar
- **Hidrolik Parçalar**: Motorlar, pompalar, valfler, silindirler
- **Seal Kits**: Sızdırmazlık setleri
- **Bearing Kits**: Rulman setleri

### 4. Responsive Tasarım
- Mobile-first yaklaşım
- Breakpoint'ler: `md:768px`, `lg:1024px`
- Adaptive navigation menu
- Touch-friendly interface

## Veri Modeli

### Product Interface
```typescript
interface Product {
  id: number;
  name: string;
  brand: string;        // "Sandvik", "Epiroc", "Atlas Copco", etc.
  model: string;        // "DT1130", "ROC L8", etc.
  category: string;     // "Rock Drills", "Hydraulic Parts", etc.
  partNumber: string;   // "12345-67890"
  price: number;        // TRY cinsinden
}
```

### Mevcut Veriler
- **60+ ürün** mock database'de
- **5 marka**: Atlas Copco, Sandvik, Epiroc, Tamrock, Generic
- **8 kategori**: Rock Drills, Surface Rigs, Underground Rigs, Drilling Tools, Hydraulic Parts, Seal Kits, Bearings, Maintenance

## Performans Optimizasyonları

- ✅ React 19 Compiler aktif
- ✅ Next.js Image optimization (AVIF, WebP)
- ✅ Code splitting ve lazy loading
- ✅ Standalone output mode (küçük deployment boyutu)
- ✅ Optimized package imports
- ✅ Font optimization (Google Fonts - Quicksand)
- ✅ Compression enabled

## Tema ve Stil Sistemi

### Renk Paleti
```css
/* SANDVIK */
--sandvik-primary: #E53935;      /* Kırmızı */
--sandvik-accent: #EAB308;       /* Sarı/Altın */

/* EPIROC */
--epiroc-primary: #EAB308;       /* Sarı/Altın */
--epiroc-accent: #E53935;        /* Kırmızı */
```

### CSS Özellikler
- OKLch renk uzayı kullanımı
- CSS custom properties ile theming
- Dark mode desteği hazır
- Radii sistemi: sm (0.25rem) → 4xl (2rem)
- tw-animate-css ile hazır animasyonlar

## Geliştirme Notları

### Kod Standartları
- TypeScript strict mode aktif
- ESLint Next.js core web vitals kuralları
- Prettier formatlaması (önerilir)
- Component-first yaklaşım

### Component Geliştirme
- shadcn/ui pattern'leri takip edilmeli
- CVA (Class Variance Authority) ile variant yönetimi
- Tailwind utility classes tercih edilmeli
- Responsive design zorunlu

### State Management
- Şu anda local state kullanımda
- Büyük ölçekte: Zustand veya Redux Toolkit önerilir

## Gelecek Planlar

### Kısa Vadeli
- [ ] Backend API entegrasyonu
- [ ] Kullanıcı authentication (NextAuth.js)
- [ ] Sepet (Shopping Cart) özelliği
- [ ] Ürün detay sayfaları
- [ ] İletişim formu

### Orta Vadeli
- [ ] Admin paneli
- [ ] Sipariş yönetimi
- [ ] Ödeme entegrasyonu
- [ ] Envanter takibi
- [ ] Müşteri hesapları

### Uzun Vadeli
- [ ] Multi-language support (EN, TR)
- [ ] Advanced filtering ve sorting
- [ ] Ürün karşılaştırma
- [ ] Wishlist özelliği
- [ ] Email notifications

## Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit'leyin (`git commit -m 'feat: Add amazing feature'`)
4. Push'layın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

Bu proje özel bir projedir. Kullanım hakları BK Drilling'e aittir.

## İletişim

**BK Drilling**
📍 Ankara, Türkiye
📧 info@bkdrilling.com
📞 +90 XXX XXX XX XX

---

**Not**: Bu proje aktif geliştirme aşamasındadır. Mock data gerçek API ile değiştirilecektir.

**Son Güncelleme**: 18 Aralık 2025

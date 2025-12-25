# Deployment Rehberi - BK Drilling

## 🚀 Otomatik Deployment

### İlk Kurulum

1. `.env.local` dosyası oluşturun:
```bash
cp .env.local.example .env.local
```

2. FTP şifrenizi `.env.local`'e ekleyin:
```env
FTP_SERVER=ftp.bkdrilling.com
FTP_USERNAME=github-actions@bkdrilling.com
FTP_PASSWORD=BURAYA_FTP_ŞİFRENİZİ_YAZIN
```

### Canlıya Deployment

```bash
npm run deploy
```

Bu komut:
1. ✅ Next.js projesini build eder
2. ✅ Tüm dosyaları FTP ile yükler
3. ✅ İlerlemeyi gösterir
4. ✅ Bitti mesajı verir

---

## 🛠️ Development Workflow

### 1. Lokal Geliştirme

```bash
npm run dev
```

- Tarayıcıda: `http://localhost:3000`
- Değişiklikler anında yansır (Hot Reload)

### 2. Test

```bash
npm run build
```

- Build hataları varsa düzeltin
- Lokal'de `npm run start` ile test edin

### 3. Canlıya Al

```bash
npm run deploy
```

---

## 📋 Deployment Checklist

Canlıya almadan önce kontrol edin:

- [ ] Lokal'de `npm run dev` çalışıyor mu?
- [ ] `npm run build` hatasız tamamlanıyor mu?
- [ ] Tüm sayfalar açılıyor mu?
- [ ] Responsive tasarım düzgün mü?
- [ ] Console'da hata var mı?

---

## 🔧 Sorun Giderme

### FTP Bağlantı Hatası

```
Error: Login incorrect
```

**Çözüm:** `.env.local` dosyasındaki FTP şifresini kontrol edin.

### Build Hatası

```
Error: Failed to compile
```

**Çözüm:** `npm run dev` ile hatayı görün ve düzeltin.

### Dosyalar Yüklenmiyor

**Çözüm:** `.gitignore` dosyasını kontrol edin, gerekli dosyalar ignore edilmiş olabilir.

---

## 🌐 DNS ve Hosts Dosyası

### Hosts Dosyası (Geçici - DNS yayılana kadar)

Windows: `C:\Windows\System32\drivers\etc\hosts`

Ekleyin:
```
5.135.76.128 bkdrilling.com
```

### DNS Yayılınca

DNS yayılınca (24 saat içinde) hosts dosyasından bu satırı silin.

---

## 📊 Site Durumu Kontrol

- **Canlı Site:** http://bkdrilling.com
- **DNS Kontrol:** https://dnschecker.org/#A/bkdrilling.com
- **SSL Status:** Henüz yok (HTTP only)

---

## 🔐 Güvenlik Notları

- ⚠️ `.env.local` dosyasını **ASLA** git'e eklemeyin
- ⚠️ FTP şifrelerini kimseyle paylaşmayın
- ✅ `.env.local.example` dosyası şablondur, güvenlidir

---

## 📞 Yardım

Sorun olursa:
1. Bu dosyayı okuyun
2. GitHub Issues açın
3. Claude Code'a sorun 😊

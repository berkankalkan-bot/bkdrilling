# Deployment Rehberi - BK Drilling

## ⚠️ Önemli Not

Güzelhosting FTP portları lokal ve GitHub Actions'dan bloklu olduğu için **otomatik deployment çalışmıyor**.
Manuel deployment yöntemi kullanılmalıdır.

## 📦 Manuel Deployment (Çalışan Yöntem)

### Adım 1: Build Alın

Terminal'de (VSCode içinde Ctrl+`):

```bash
npm run build
```

Build tamamlanana kadar bekleyin (~10 saniye).

---

### Adım 2: Out Klasörünü Sıkıştırın

**PowerShell** ile (Önerilen):

```powershell
Compress-Archive -Path .\out\* -DestinationPath out.zip -Force
```

**VEYA Windows Explorer** ile:
1. `out` klasörüne sağ tıklayın
2. "Sıkıştırılmış (zipped) klasöre gönder" seçin
3. `out.zip` oluşacak

---

### Adım 3: cPanel File Manager'ı Açın

1. Güzelhosting cPanel'e giriş yapın
2. **"File Manager"** (Dosya Yöneticisi) açın
3. Sol taraftan **`public_html`** klasörüne tıklayın

---

### Adım 4: Eski Dosyaları Temizleyin (İlk Defa İseniz Atlayın)

Güncelleme yapıyorsanız:
1. `public_html` içindeki **eski Next.js dosyalarını** seçin
2. Delete (Sil) butonuna tıklayın
3. **DİKKAT:** `.htaccess`, `cgi-bin` gibi sistem dosyalarını SİLMEYİN!

**Güvenli Yöntem:** Yeni `backup` klasörü oluşturup eski dosyaları oraya taşıyın.

---

### Adım 5: ZIP Dosyasını Yükleyin

File Manager'da:
1. Üst menüde **"Upload"** (Yükle) butonuna tıklayın
2. **"Dosya Seç"** butonuna tıklayın
3. `C:\Users\berka\Desktop\projects\bk_drilling_web\out.zip` dosyasını seçin
4. Yükleme başlayacak (~10-30 saniye, 12MB)
5. Tamamlandığında File Manager'a dönün

---

### Adım 6: ZIP Dosyasını Extract Edin

File Manager'da (`public_html` içinde):
1. `out.zip` dosyasını bulun
2. **Sağ tıklayın** > **"Extract"** (Çıkart) seçin
3. Extract penceresi açılır, **"Extract Files"** butonuna tıklayın
4. İşlem bitince `out` klasörü oluşacak

---

### Adım 7: Dosyaları Taşıyın

1. `out` klasörüne **çift tıklayarak** içine girin
2. **"Select All"** (Tümünü Seç) butonuna tıklayın
   - VEYA **Ctrl+A** tuşlarına basın
3. **"Move"** (Taşı) butonuna tıklayın
4. Açılan pencerede hedef klasör:
   ```
   /home/bkdrilli/public_html/
   ```
5. **"Move Files"** butonuna tıklayın
6. Onaylayın

---

### Adım 8: Temizlik Yapın

File Manager'da `public_html` klasörüne dönün:
1. Boş kalan **`out`** klasörünü silin
2. **`out.zip`** dosyasını silin

---

### Adım 9: Siteyi Test Edin ✅

Tarayıcıda yeni sekme açıp:

```
http://bkdrilling.com
```

**Yeni değişiklikler görünmüyorsa:**
- Tarayıcı cache'ini temizleyin (Ctrl+Shift+Delete)
- Veya gizli sekme (Incognito) açın
- Veya farklı tarayıcı deneyin

Site güncellenmiş olmalı! 🎉

---

## ~~🚀 Otomatik Deployment~~ (Çalışmıyor)

~~### İlk Kurulum~~

**NOT:** Güzelhosting FTP portları bloklu olduğu için bu yöntem çalışmıyor.
Manuel deployment kullanın.

~~```bash
npm run deploy
```~~

**Hata:** `connect: Timeout while connecting to server`

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

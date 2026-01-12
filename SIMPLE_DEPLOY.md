# En Basit VPS Deployment Rehberi

## Adım 1: PuTTY ile Sunucuya Bağlan

1. **PuTTY'yi aç** (Start menüsünden "PuTTY" ara)
2. Host Name: `104.247.173.45`
3. Port: `22`
4. "Open" tıkla
5. İlk bağlantıda "host key" uyarısı gelecek - "Yes" tıkla
6. Login: `root`
7. Password: `bBg1q4G3ak8SK1Q5Vu`

## Adım 2: Sunucuyu Hazırla (Sadece İlk Kez)

PuTTY terminalinde bu komutları sırayla çalıştır:

```bash
# Nginx kur
yum install -y nginx

# Web klasörü oluştur
mkdir -p /var/www/bkdrilling
chown -R nginx:nginx /var/www/bkdrilling

# Nginx ayarla
cat > /etc/nginx/conf.d/bkdrilling.conf << 'EOF'
server {
    listen 80;
    server_name bkdrilling.com www.bkdrilling.com 104.247.173.45;
    root /var/www/bkdrilling;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Nginx'i test et ve başlat
nginx -t
systemctl enable nginx
systemctl restart nginx

# Firewall aç (HTTP)
firewall-cmd --permanent --add-service=http
firewall-cmd --reload
```

Her komut çalıştıktan sonra "OK" veya "success" mesajları göreceksin.

## Adım 3: Build Al (Lokal - VS Code Terminal)

VS Code'da terminal aç (Ctrl+`) ve çalıştır:

```bash
npm run build
```

Build tamamlanana kadar bekle (~10 saniye).

## Adım 4: Dosyaları Yükle

### Yöntem A: WinSCP (Önerilen - Kolay)

1. **WinSCP'yi indir**: https://winscp.net/eng/download.php
2. WinSCP'yi aç
3. Ayarlar:
   - File protocol: `SCP`
   - Host name: `104.247.173.45`
   - Port: `22`
   - User name: `root`
   - Password: `bBg1q4G3ak8SK1Q5Vu`
4. "Login" tıkla (ilk bağlantıda "host key" uyarısı - "Yes" tıkla)
5. Sol tarafta (lokal):
   - `C:\Users\berka\Desktop\projects\bk_drilling_web\out` klasörüne git
   - İçindeki **TÜM DOSYALARI** seç (Ctrl+A)
6. Sağ tarafta (sunucu):
   - `/var/www/bkdrilling` klasörüne git
7. Dosyaları **sağ tarafa sürükle** (drag & drop)
8. Upload tamamlanana kadar bekle (~20 saniye)

### Yöntem B: PSCP Komutu (Hızlı)

VS Code terminalinde:

```powershell
& "C:\Program Files\PuTTY\pscp.exe" -r -pw bBg1q4G3ak8SK1Q5Vu .\out\* root@104.247.173.45:/var/www/bkdrilling/
```

## Adım 5: Test Et

Tarayıcıda aç:

```
http://104.247.173.45
```

Siteniz çalışıyor olmalı! 🎉

## Adım 6: DNS Güncelle (Son Adım)

1. **Güzelnet DNS paneline** git
2. **A kaydını** güncelle:
   - Hostname: `bkdrilling.com`
   - IP Address: `104.247.173.45`
3. **Www A kaydını** da güncelle:
   - Hostname: `www.bkdrilling.com`
   - IP Address: `104.247.173.45`
4. Değişiklikleri kaydet

5-60 dakika içinde DNS yayılacak ve site şu adreste çalışacak:

```
http://bkdrilling.com
```

---

## Gelecekte Güncelleme (Her Seferinde)

1. Kod değişikliklerini yap
2. `npm run build`
3. WinSCP'de dosyaları tekrar yükle (üzerine yazar)
4. Tarayıcıda Ctrl+F5 ile sayfayı yenile

---

## Sorun Giderme

### Site açılmıyor

PuTTY'de kontrol et:

```bash
# Nginx çalışıyor mu?
systemctl status nginx

# Dosyalar var mı?
ls -la /var/www/bkdrilling

# Nginx logları
tail -20 /var/log/nginx/error.log
```

### Nginx yeniden başlat

```bash
systemctl restart nginx
```

### Firewall kontrolü

```bash
firewall-cmd --list-all
```

HTTP servisi listede olmalı.

---

## Hızlı Komutlar

```bash
# Sunucuya bağlan
ssh root@104.247.173.45

# Nginx yeniden başlat
systemctl restart nginx

# Dosyalar listele
ls -lh /var/www/bkdrilling

# Disk kullanımı
df -h

# Nginx durumu
systemctl status nginx
```

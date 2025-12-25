# CI/CD Deployment Kurulum Rehberi

Bu proje GitHub Actions kullanarak otomatik olarak Güzelhosting'e deploy edilmektedir.

## Nasıl Çalışır?

1. `main` branch'e kod push ettiğinizde otomatik olarak:
   - Next.js projesi build edilir
   - Static HTML/CSS/JS dosyaları oluşturulur
   - FTP ile Güzelhosting'e yüklenir

## İlk Kurulum Adımları

### 1. GitHub Repository Oluşturma

```bash
cd c:\Users\berka\Desktop\projects\bk_drilling_web
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git
git push -u origin main
```

### 2. Güzelhosting FTP Bilgilerini Alma

1. Güzelhosting cPanel'e giriş yapın (https://guzelhosting.com)
2. **FTP Accounts** bölümüne gidin
3. Mevcut FTP hesabınızın bilgilerini not edin veya yeni bir FTP hesabı oluşturun:
   - **FTP Server**: genellikle `ftp.siteadiniz.com` veya IP adresi
   - **FTP Username**: FTP kullanıcı adınız
   - **FTP Password**: FTP şifreniz
   - **Server Directory**: genellikle `public_html/` veya `httpdocs/`

### 3. GitHub Secrets Yapılandırması

GitHub repository'nizde secrets (gizli bilgiler) oluşturmanız gerekiyor:

1. GitHub'da repository'nize gidin
2. **Settings** > **Secrets and variables** > **Actions**
3. **New repository secret** butonuna tıklayın
4. Şu 3 secret'ı oluşturun:

| Secret Adı | Değer | Örnek |
|------------|-------|-------|
| `FTP_SERVER` | FTP sunucu adresi | `ftp.siteadiniz.com` veya `185.123.45.67` |
| `FTP_USERNAME` | FTP kullanıcı adı | `kullanici@siteadiniz.com` |
| `FTP_PASSWORD` | FTP şifresi | `GüvenliŞifre123!` |

### 4. Deployment Test Etme

Secrets'ları ekledikten sonra:

1. Kodunuzda küçük bir değişiklik yapın
2. Commit ve push edin:
   ```bash
   git add .
   git commit -m "Test deployment"
   git push
   ```
3. GitHub'da **Actions** sekmesine gidin
4. Workflow'un çalıştığını görmelisiniz

### 5. Manuel Deployment

GitHub'da **Actions** > **Deploy to Güzelhosting** > **Run workflow** butonuyla manuel olarak da deploy edebilirsiniz.

## Önemli Notlar

- **Build Süresi**: Her deployment yaklaşık 2-5 dakika sürer
- **Static Export**: Proje static HTML olarak export edilir (Node.js gerektirmez)
- **FTP Klasörü**: Dosyalar `public_html/` klasörüne yüklenir
- **Cache**: GitHub Actions npm paketlerini cache'ler, ikinci deployment'lar daha hızlıdır

## Sorun Giderme

### FTP Bağlantı Hatası
- FTP bilgilerini kontrol edin
- Güzelhosting'de FTP servisinin açık olduğundan emin olun
- Sunucu IP adresini doğrudan kullanmayı deneyin

### Build Hatası
- Local'de `npm run build` komutunu çalıştırıp hata alıp almadığınızı kontrol edin
- Tüm bağımlılıkların `package.json`'da olduğundan emin olun

### Dosyalar Yüklenmedi
- `server-dir` yolunu kontrol edin (`.github/workflows/deploy.yml` içinde)
- Bazı hostinglerde `public_html/`, bazılarında `httpdocs/` kullanılır

## Workflow Dosyası

Deployment ayarları [.github/workflows/deploy.yml](.github/workflows/deploy.yml) dosyasında bulunur.

## Deployment'ı Devre Dışı Bırakma

Geçici olarak otomatik deployment'ı durdurmak için:
1. `.github/workflows/deploy.yml` dosyasını silin veya
2. Dosya adını `.github/workflows/deploy.yml.disabled` olarak değiştirin

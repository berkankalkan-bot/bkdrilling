@echo off
setlocal enabledelayedexpansion

echo ========================================
echo  BK Drilling - Otomatik VPS Deployment
echo ========================================
echo.

set VPS=104.247.173.45
set USER=root
set PASS=bBg1q4G3ak8SK1Q5Vu
set PLINK="C:\Program Files\PuTTY\plink.exe"
set PSCP="C:\Program Files\PuTTY\pscp.exe"

echo [1/4] VPS baglantisi test ediliyor...
echo.

REM Accept host key first
echo y | %PLINK% -pw %PASS% %USER%@%VPS% exit 2>nul
timeout /t 2 /nobreak >nul

echo [2/4] Nginx kuruluyor...
echo.

%PLINK% -batch -pw %PASS% %USER%@%VPS% "yum install -y nginx"

echo.
echo [3/4] Web sunucu yapilandiriliyor...
echo.

%PLINK% -batch -pw %PASS% %USER%@%VPS% "mkdir -p /var/www/bkdrilling && chown -R nginx:nginx /var/www/bkdrilling"

%PLINK% -batch -pw %PASS% %USER%@%VPS% "cat > /etc/nginx/conf.d/bkdrilling.conf << 'ENDOFNGINX'" & echo server { & echo     listen 80; & echo     server_name bkdrilling.com www.bkdrilling.com 104.247.173.45; & echo     root /var/www/bkdrilling; & echo     index index.html; & echo     location / { & echo         try_files $uri $uri/ $uri.html =404; & echo     } & echo     location ~* \.(jpg^|jpeg^|png^|gif^|ico^|css^|js^|svg^|woff^|woff2)$ { & echo         expires 1y; & echo     } & echo } & echo ENDOFNGINX

%PLINK% -batch -pw %PASS% %USER%@%VPS% "nginx -t && systemctl enable nginx && systemctl restart nginx"

%PLINK% -batch -pw %PASS% %USER%@%VPS% "firewall-cmd --permanent --add-service=http 2>nul & firewall-cmd --reload 2>nul"

echo.
echo [4/4] Website dosyalari yukleniyor...
echo.

if not exist "out\" (
    echo HATA: Build bulunamadi!
    echo Lutfen once: npm run build
    exit /b 1
)

%PSCP% -batch -r -pw %PASS% out\* %USER%@%VPS%:/var/www/bkdrilling/

echo.
echo ========================================
echo  TAMAMLANDI!
echo ========================================
echo.
echo Siteniz hazir: http://104.247.173.45
echo.
echo DNS guncelleme:
echo   bkdrilling.com A kaydi -^> 104.247.173.45
echo.
pause

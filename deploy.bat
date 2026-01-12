@echo off
echo ================================
echo  BK Drilling Deployment
echo ================================
echo.

REM Build
echo [1/3] Building...
call npm run build
if errorlevel 1 (
    echo Build failed!
    pause
    exit /b 1
)

REM Upload
echo.
echo [2/3] Uploading to VPS...
cd out
"C:\Program Files\PuTTY\pscp.exe" -batch -r -pw 3I4Me62m6jgIPqo3BF * root@104.247.173.45:/var/www/www-root/data/www/www.bkdrilling.com/
cd ..

REM Fix permissions
echo.
echo [3/3] Setting permissions...
"C:\Program Files\PuTTY\plink.exe" -batch -pw 3I4Me62m6jgIPqo3BF root@104.247.173.45 "chown -R www-root:www-root /var/www/www-root/data/www/www.bkdrilling.com && chmod -R 755 /var/www/www-root/data/www/www.bkdrilling.com"

echo.
echo ================================
echo  DEPLOYMENT COMPLETE!
echo ================================
echo.
echo Your site: http://104.247.173.45
echo           http://bkdrilling.com
echo.
pause

@echo off
echo Deploying to VPS...

set VPS=104.247.173.45
set USER=root
set PASS=bBg1q4G3ak8SK1Q5Vu
set DIR=/var/www/www-root/data/www/www.bkdrilling.com

REM Build
echo Building...
call npm run build
if errorlevel 1 exit /b 1

REM Create tar.gz
echo Creating archive...
cd out
tar -czf ../site.tar.gz *
cd ..

REM Upload
echo Uploading...
"C:\Program Files\PuTTY\pscp.exe" -batch -pw %PASS% site.tar.gz %USER%@%VPS%:/tmp/

REM Extract on server
echo Extracting on server...
"C:\Program Files\PuTTY\plink.exe" -batch -pw %PASS% %USER%@%VPS% "cd %DIR% && rm -rf * && tar -xzf /tmp/site.tar.gz && rm /tmp/site.tar.gz"

echo Done!
del site.tar.gz
pause

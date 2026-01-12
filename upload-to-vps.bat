@echo off
echo 📤 Uploading files to VPS...

REM Install pscp using winget if not available
where pscp >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing PuTTY tools...
    winget install -e --id PuTTY.PuTTY
)

REM Upload files using pscp
echo y | pscp -r -pw bBg1q4G3ak8SK1Q5Vu .\out\* root@104.247.173.45:/var/www/bkdrilling/

echo ✅ Upload complete!

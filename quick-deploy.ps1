# Simple VPS Deployment Script
# Run in PowerShell

$VPS = "104.247.173.45"
$USER = "root"
$PASS = "bBg1q4G3ak8SK1Q5Vu"
$DIR = "/var/www/bkdrilling"

Write-Host "================================" -ForegroundColor Cyan
Write-Host " BK Drilling Deployment" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check if build exists
if (!(Test-Path ".\out")) {
    Write-Host "Error: Build not found!" -ForegroundColor Red
    Write-Host "Run: npm run build" -ForegroundColor Yellow
    exit 1
}

# Step 1: Setup VPS
Write-Host "[1/2] Setting up VPS server...`n" -ForegroundColor Yellow

$plink = "C:\Program Files\PuTTY\plink.exe"

# Accept host key
Write-Host "Connecting to VPS..." -ForegroundColor Gray
echo y | & $plink -pw $PASS $USER@$VPS "echo Connected" 2>&1 | Out-Null
Start-Sleep -Seconds 2

# Setup commands
$setup = "yum install -y nginx && mkdir -p $DIR && chown -R nginx:nginx $DIR && cat > /etc/nginx/conf.d/bkdrilling.com.conf << 'NGXEOF'
server {
    listen 80;
    server_name bkdrilling.com www.bkdrilling.com $VPS;
    root $DIR;
    index index.html;
    location / { try_files `$uri `$uri/ `$uri.html =404; }
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ { expires 1y; }
}
NGXEOF
nginx -t && systemctl enable nginx && systemctl restart nginx && firewall-cmd --permanent --add-service=http 2>/dev/null; firewall-cmd --reload 2>/dev/null; echo VPS_READY"

Write-Host "Installing Nginx and configuring..." -ForegroundColor Gray
$result = & $plink -batch -pw $PASS $USER@$VPS $setup 2>&1

if ($result -match "VPS_READY") {
    Write-Host "✓ VPS configured!`n" -ForegroundColor Green
}

# Step 2: Upload files
Write-Host "[2/2] Uploading files...`n" -ForegroundColor Yellow

$pscp = "C:\Program Files\PuTTY\pscp.exe"

Write-Host "Transferring website files..." -ForegroundColor Gray
& $pscp -batch -r -pw $PASS ".\out\*" "${USER}@${VPS}:${DIR}/" 2>&1 | Out-Null

Write-Host "✓ Upload complete!`n" -ForegroundColor Green

# Done!
Write-Host "================================" -ForegroundColor Cyan
Write-Host " Deployment Complete!" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Cyan

Write-Host "Test your site now:" -ForegroundColor Yellow
Write-Host "http://$VPS`n" -ForegroundColor Cyan

Write-Host "Update DNS A record to: $VPS" -ForegroundColor Yellow
Write-Host "Then access: http://bkdrilling.com`n" -ForegroundColor Cyan

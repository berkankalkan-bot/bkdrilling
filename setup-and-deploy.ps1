# VPS Setup and Deployment Script
# Run this in PowerShell as Administrator

$VPS_HOST = "104.247.173.45"
$VPS_USER = "root"
$VPS_PASSWORD = "bBg1q4G3ak8SK1Q5Vu"
$REMOTE_DIR = "/var/www/bkdrilling"
$DOMAIN = "bkdrilling.com"

Write-Host "================================" -ForegroundColor Cyan
Write-Host "BK Drilling VPS Setup & Deploy" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Step 1: Setup VPS Server
Write-Host "[1/3] Setting up VPS server..." -ForegroundColor Yellow

$setupCommands = @"
yum update -y && \
yum install -y nginx && \
mkdir -p $REMOTE_DIR && \
chown -R nginx:nginx $REMOTE_DIR && \
cat > /etc/nginx/conf.d/$DOMAIN.conf << 'EOF'
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN 104.247.173.45;
    root $REMOTE_DIR;
    index index.html;

    location / {
        try_files \`$uri \`$uri/ \`$uri.html =404;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF
nginx -t && \
systemctl enable nginx && \
systemctl restart nginx && \
firewall-cmd --permanent --add-service=http 2>/dev/null || ufw allow 'Nginx HTTP' 2>/dev/null || true && \
firewall-cmd --reload 2>/dev/null || true && \
echo 'VPS_SETUP_COMPLETE'
"@

Write-Host "Running setup commands on VPS..." -ForegroundColor Gray

try {
    # Use plink to run setup commands
    $plinkPath = "C:\Program Files\PuTTY\plink.exe"

    # First connection to accept host key
    Write-Host "Accepting SSH host key..." -ForegroundColor Gray
    echo y | & $plinkPath -pw $VPS_PASSWORD $VPS_USER@$VPS_HOST "echo 'Connected'" 2>&1 | Out-Null
    Start-Sleep -Seconds 2

    # Run setup commands
    $result = & $plinkPath -batch -pw $VPS_PASSWORD $VPS_USER@$VPS_HOST $setupCommands 2>&1

    if ($result -match "VPS_SETUP_COMPLETE") {
        Write-Host "✓ VPS setup complete!" -ForegroundColor Green
    } else {
        Write-Host "Setup output:" -ForegroundColor Gray
        Write-Host $result
    }
} catch {
    Write-Host "Error during VPS setup:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host "`nTrying alternative method..." -ForegroundColor Yellow
}

# Step 2: Upload files
Write-Host "`n[2/3] Uploading website files..." -ForegroundColor Yellow

$pscpPath = "C:\Program Files\PuTTY\pscp.exe"
$outDir = ".\out"

if (Test-Path $outDir) {
    Write-Host "Uploading files from $outDir..." -ForegroundColor Gray

    try {
        # Upload all files from out directory
        $uploadCmd = "$pscpPath -batch -r -pw $VPS_PASSWORD $outDir\* ${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/"
        Invoke-Expression "& $uploadCmd 2>&1"
        Write-Host "✓ Files uploaded!" -ForegroundColor Green
    } catch {
        Write-Host "Error uploading files:" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
} else {
    Write-Host "Error: $outDir directory not found!" -ForegroundColor Red
    Write-Host "Please run 'npm run build' first." -ForegroundColor Yellow
    exit 1
}

# Step 3: Verify deployment
Write-Host "`n[3/3] Verifying deployment..." -ForegroundColor Yellow

try {
    $verifyResult = & $plinkPath -batch -pw $VPS_PASSWORD $VPS_USER@$VPS_HOST "ls -la $REMOTE_DIR | head -10 && systemctl status nginx | head -5" 2>&1
    Write-Host $verifyResult -ForegroundColor Gray

    Write-Host "`n✓ Deployment verification complete!" -ForegroundColor Green
} catch {
    Write-Host "Could not verify deployment" -ForegroundColor Yellow
}

# Final instructions
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Cyan

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update DNS A record:" -ForegroundColor White
Write-Host "   $DOMAIN -> $VPS_HOST" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Test your site:" -ForegroundColor White
Write-Host "   http://$VPS_HOST" -ForegroundColor Cyan
Write-Host "   (Will work immediately)" -ForegroundColor Gray
Write-Host ""
Write-Host "3. After DNS propagates (5-60 min):" -ForegroundColor White
Write-Host "   http://$DOMAIN" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. For future updates, just run:" -ForegroundColor White
Write-Host "   npm run build" -ForegroundColor Gray
Write-Host "   .\setup-and-deploy.ps1" -ForegroundColor Gray
Write-Host ""

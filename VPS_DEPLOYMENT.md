# VPS Deployment Guide - BK Drilling

## Automated Deployment Steps

### Step 1: Setup VPS (One-time only)

Open PowerShell and run:

```powershell
# Upload setup script to VPS
pscp -pw bBg1q4G3ak8SK1Q5Vu setup-vps.sh root@104.247.173.45:/root/

# Connect to VPS and run setup
plink -pw bBg1q4G3ak8SK1Q5Vu root@104.247.173.45 "chmod +x /root/setup-vps.sh && /root/setup-vps.sh"
```

### Step 2: Deploy Website

Run this every time you want to update the site:

```bash
npm run deploy:vps
```

Or manually:

```powershell
# Build
npm run build

# Upload
.\upload-to-vps.bat
```

### Step 3: Update DNS

Go to your DNS provider (Güzelnet) and update:

- **A Record**: bkdrilling.com → 104.247.173.45
- **A Record**: www.bkdrilling.com → 104.247.173.45

Wait 5-60 minutes for DNS propagation.

## Manual Deployment (If Scripts Don't Work)

### 1. Install PuTTY

Download and install from: https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html

### 2. Setup VPS

1. Open PuTTY
2. Host: 104.247.173.45
3. Port: 22
4. Click "Open"
5. Login: root
6. Password: bBg1q4G3ak8SK1Q5Vu

Run these commands:

```bash
# Install Nginx
yum install -y nginx

# Create directory
mkdir -p /var/www/bkdrilling

# Start Nginx
systemctl enable nginx
systemctl start nginx

# Configure firewall
firewall-cmd --permanent --add-service=http
firewall-cmd --reload
```

### 3. Upload Files

1. Open WinSCP: https://winscp.net/
2. Protocol: SCP
3. Host: 104.247.173.45
4. Username: root
5. Password: bBg1q4G3ak8SK1Q5Vu
6. Click "Login"
7. Navigate to /var/www/bkdrilling
8. Upload all files from your local `out` folder

### 4. Configure Nginx

In PuTTY, run:

```bash
cat > /etc/nginx/conf.d/bkdrilling.com.conf << 'EOF'
server {
    listen 80;
    server_name bkdrilling.com www.bkdrilling.com;
    root /var/www/bkdrilling;
    index index.html;

    location / {
        try_files \$uri \$uri/ \$uri.html =404;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
    }
}
EOF

nginx -t
systemctl restart nginx
```

## Troubleshooting

### Site Not Loading

1. Check Nginx status: `systemctl status nginx`
2. Check files exist: `ls -la /var/www/bkdrilling`
3. Check DNS: https://dnschecker.org/#A/bkdrilling.com

### Upload Failed

- Install PuTTY/WinSCP manually
- Check VPS password is correct
- Check firewall allows SSH (port 22)

## Quick Commands

```bash
# Rebuild and deploy
npm run build && .\upload-to-vps.bat

# Check Nginx logs
ssh root@104.247.173.45 "tail -f /var/log/nginx/error.log"

# Restart Nginx
ssh root@104.247.173.45 "systemctl restart nginx"
```

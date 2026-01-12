#!/usr/bin/env node

/**
 * VPS Deployment Script for BK Drilling
 *
 * Usage: npm run deploy:vps
 *
 * This script:
 * 1. Builds the Next.js project
 * 2. Uploads files to your VPS via SSH/SCP
 * 3. Configures Nginx web server
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// VPS Configuration
const VPS_HOST = '104.247.173.45';
const VPS_USER = 'root';
const VPS_PASSWORD = 'bBg1q4G3ak8SK1Q5Vu';
const REMOTE_DIR = '/var/www/bkdrilling';
const DOMAIN = 'bkdrilling.com';

console.log('🚀 Starting deployment to VPS...\n');

// Helper function to run commands
function run(command, description) {
  console.log(`📌 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} - Done\n`);
  } catch (error) {
    console.error(`❌ ${description} - Failed`);
    throw error;
  }
}

// Step 1: Build the project
console.log('Step 1/5: Building Next.js project');
run('npm run build', 'Building static site');

// Step 2: Install sshpass for password authentication (Windows)
console.log('Step 2/5: Setting up deployment tools');
console.log('⚠️  Please install PuTTY/PSCP for Windows deployment');
console.log('📥 Download from: https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html\n');

// Step 3: Create upload script for Windows
const uploadScriptPath = path.join(__dirname, 'upload-to-vps.bat');
const uploadScript = `@echo off
echo 📤 Uploading files to VPS...

REM Install pscp using winget if not available
where pscp >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing PuTTY tools...
    winget install -e --id PuTTY.PuTTY
)

REM Upload files using pscp
echo y | pscp -r -pw ${VPS_PASSWORD} .\\out\\* ${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/

echo ✅ Upload complete!
`;

fs.writeFileSync(uploadScriptPath, uploadScript);
console.log('✅ Created upload script: upload-to-vps.bat\n');

// Step 4: Create server setup script
const setupScriptPath = path.join(__dirname, 'setup-vps.sh');
const setupScript = `#!/bin/bash
set -e

echo "🔧 Setting up VPS for Next.js hosting..."

# Update system
echo "📦 Updating system packages..."
yum update -y || apt-get update -y

# Install Nginx
echo "📦 Installing Nginx..."
yum install -y nginx || apt-get install -y nginx

# Create web directory
echo "📁 Creating web directory..."
mkdir -p ${REMOTE_DIR}
chown -R nginx:nginx ${REMOTE_DIR} || chown -R www-data:www-data ${REMOTE_DIR}

# Configure Nginx
echo "⚙️  Configuring Nginx..."
cat > /etc/nginx/conf.d/${DOMAIN}.conf << 'EOF'
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    root ${REMOTE_DIR};
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    location / {
        try_files \\$uri \\$uri/ \\$uri.html =404;
    }

    # Cache static assets
    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
nginx -t

# Start and enable Nginx
echo "🚀 Starting Nginx..."
systemctl enable nginx
systemctl restart nginx

# Configure firewall
echo "🔥 Configuring firewall..."
firewall-cmd --permanent --add-service=http 2>/dev/null || ufw allow 'Nginx HTTP' 2>/dev/null || true
firewall-cmd --reload 2>/dev/null || true

echo "✅ VPS setup complete!"
echo "🌐 Your site will be available at: http://${DOMAIN}"
echo ""
echo "Next steps:"
echo "1. Upload your files to ${REMOTE_DIR}"
echo "2. Update your DNS A record to point to ${VPS_HOST}"
`;

fs.writeFileSync(setupScriptPath, setupScript);
console.log('✅ Created VPS setup script: setup-vps.sh\n');

// Step 5: Create simple deployment guide
const guideContent = `# VPS Deployment Guide - BK Drilling

## Automated Deployment Steps

### Step 1: Setup VPS (One-time only)

Open PowerShell and run:

\`\`\`powershell
# Upload setup script to VPS
pscp -pw ${VPS_PASSWORD} setup-vps.sh ${VPS_USER}@${VPS_HOST}:/root/

# Connect to VPS and run setup
plink -pw ${VPS_PASSWORD} ${VPS_USER}@${VPS_HOST} "chmod +x /root/setup-vps.sh && /root/setup-vps.sh"
\`\`\`

### Step 2: Deploy Website

Run this every time you want to update the site:

\`\`\`bash
npm run deploy:vps
\`\`\`

Or manually:

\`\`\`powershell
# Build
npm run build

# Upload
.\\upload-to-vps.bat
\`\`\`

### Step 3: Update DNS

Go to your DNS provider (Güzelnet) and update:

- **A Record**: ${DOMAIN} → ${VPS_HOST}
- **A Record**: www.${DOMAIN} → ${VPS_HOST}

Wait 5-60 minutes for DNS propagation.

## Manual Deployment (If Scripts Don't Work)

### 1. Install PuTTY

Download and install from: https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html

### 2. Setup VPS

1. Open PuTTY
2. Host: ${VPS_HOST}
3. Port: 22
4. Click "Open"
5. Login: ${VPS_USER}
6. Password: ${VPS_PASSWORD}

Run these commands:

\`\`\`bash
# Install Nginx
yum install -y nginx

# Create directory
mkdir -p ${REMOTE_DIR}

# Start Nginx
systemctl enable nginx
systemctl start nginx

# Configure firewall
firewall-cmd --permanent --add-service=http
firewall-cmd --reload
\`\`\`

### 3. Upload Files

1. Open WinSCP: https://winscp.net/
2. Protocol: SCP
3. Host: ${VPS_HOST}
4. Username: ${VPS_USER}
5. Password: ${VPS_PASSWORD}
6. Click "Login"
7. Navigate to ${REMOTE_DIR}
8. Upload all files from your local \`out\` folder

### 4. Configure Nginx

In PuTTY, run:

\`\`\`bash
cat > /etc/nginx/conf.d/${DOMAIN}.conf << 'EOF'
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    root ${REMOTE_DIR};
    index index.html;

    location / {
        try_files \\$uri \\$uri/ \\$uri.html =404;
    }

    location ~* \\.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
    }
}
EOF

nginx -t
systemctl restart nginx
\`\`\`

## Troubleshooting

### Site Not Loading

1. Check Nginx status: \`systemctl status nginx\`
2. Check files exist: \`ls -la ${REMOTE_DIR}\`
3. Check DNS: https://dnschecker.org/#A/${DOMAIN}

### Upload Failed

- Install PuTTY/WinSCP manually
- Check VPS password is correct
- Check firewall allows SSH (port 22)

## Quick Commands

\`\`\`bash
# Rebuild and deploy
npm run build && .\\upload-to-vps.bat

# Check Nginx logs
ssh ${VPS_USER}@${VPS_HOST} "tail -f /var/log/nginx/error.log"

# Restart Nginx
ssh ${VPS_USER}@${VPS_HOST} "systemctl restart nginx"
\`\`\`
`;

fs.writeFileSync(path.join(__dirname, 'VPS_DEPLOYMENT.md'), guideContent);
console.log('✅ Created deployment guide: VPS_DEPLOYMENT.md\n');

console.log('════════════════════════════════════════════════════════');
console.log('✨ Deployment preparation complete!');
console.log('════════════════════════════════════════════════════════\n');
console.log('📖 Next steps:');
console.log('1. Install PuTTY: winget install -e --id PuTTY.PuTTY');
console.log('2. Run: .\\upload-to-vps.bat (to upload files)');
console.log('3. Read VPS_DEPLOYMENT.md for detailed instructions\n');
console.log('🌐 After deployment, update DNS A record to: ' + VPS_HOST);
console.log('════════════════════════════════════════════════════════\n');

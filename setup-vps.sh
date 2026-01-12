#!/bin/bash
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
mkdir -p /var/www/bkdrilling
chown -R nginx:nginx /var/www/bkdrilling || chown -R www-data:www-data /var/www/bkdrilling

# Configure Nginx
echo "⚙️  Configuring Nginx..."
cat > /etc/nginx/conf.d/bkdrilling.com.conf << 'EOF'
server {
    listen 80;
    server_name bkdrilling.com www.bkdrilling.com;
    root /var/www/bkdrilling;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    location / {
        try_files \$uri \$uri/ \$uri.html =404;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
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
echo "🌐 Your site will be available at: http://bkdrilling.com"
echo ""
echo "Next steps:"
echo "1. Upload your files to /var/www/bkdrilling"
echo "2. Update your DNS A record to point to 104.247.173.45"

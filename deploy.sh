#!/bin/bash

# cPanel Git Deployment Script for Next.js

echo "Starting deployment..."

# Install dependencies
echo "Installing dependencies..."
npm ci --production=false

# Build Next.js
echo "Building Next.js..."
npm run build

# Copy build output to web root
echo "Copying files..."
cp -r out/* /home/bkdrilli/public_html/

echo "Deployment complete!"

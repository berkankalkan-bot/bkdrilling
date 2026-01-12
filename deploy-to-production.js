#!/usr/bin/env node

/**
 * Automated Deployment Script for BK Drilling
 *
 * Usage:
 *   npm run deploy
 *
 * This script:
 * 1. Builds the Next.js project
 * 2. Uploads files to Güzelhosting via FTP
 */

const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();
require('dotenv').config({ path: '.env.local' });

// FTP Configuration
const config = {
  user: process.env.FTP_USERNAME || 'github-actions@bkdrilling.com',
  password: process.env.FTP_PASSWORD || '', // Set via environment variable
  host: process.env.FTP_SERVER || 'ftp.bkdrilling.com',
  port: 21,
  localRoot: './out',
  remoteRoot: '/var/www/www-root/data/www/www.bkdrilling.com/',
  include: ['*', '**/*'],
  exclude: [
    '**/*.map',
    'node_modules/**',
    '.git/**',
    '.github/**',
  ],
  deleteRemote: false,
  forcePasv: true,
  sftp: false,
};

console.log('🚀 Starting deployment to bkdrilling.com...\n');

ftpDeploy
  .deploy(config)
  .then((res) => {
    console.log('\n✅ Deployment completed successfully!');
    console.log('🌐 Your site is live at: http://bkdrilling.com');
  })
  .catch((err) => {
    console.error('\n❌ Deployment failed:');
    console.error(err);
    process.exit(1);
  });

// Event listeners for progress
ftpDeploy.on('uploading', function (data) {
  const percent = ((data.transferredFileCount / data.totalFilesCount) * 100).toFixed(1);
  console.log(`📤 Uploading [${percent}%]: ${data.filename}`);
});

ftpDeploy.on('uploaded', function (data) {
  console.log(`✓ Uploaded: ${data.filename}`);
});

ftpDeploy.on('log', function (data) {
  console.log(data);
});

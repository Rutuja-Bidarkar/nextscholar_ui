# NextScholar Oracle Cloud Deployment Guide

This guide will walk you through deploying NextScholar to an Oracle Cloud VM using Docker.

## Prerequisites

1. An Oracle Cloud account.
2. A Compute Instance (VM) created, ideally running Oracle Linux or Ubuntu/CentOS.
3. Your VCN Security Lists configured to open Ingress TCP ports `80` (HTTP) and `443` (HTTPS).
4. SSH access to the VM.

## Deployment Steps

1. **SSH into your Instance:**
   ```bash
   ssh opc@<YOUR_VM_PUBLIC_IP>
   ```

2. **Clone the repository:**
   If using git:
   ```bash
   git clone <YOUR_REPO_URL>
   cd NEXT-SCHOLAR
   ```

3. **Run the Deployment Script:**
   Make the script executable and run it:
   ```bash
   chmod +x deploy-oracle-cloud.sh
   ./deploy-oracle-cloud.sh
   ```

   This script will automatically:
   - Install Docker and Docker Compose (if missing)
   - Enable Docker on startup
   - Build the NextScholar Docker image
   - Spin up the Nginx container to serve the React app on port 80.

4. **Verify Deployment:**
   - Run `./healthcheck.sh` to ensure it returns `Healthy`
   - Open a browser and visit your VM's Public IP address `http://<YOUR_VM_PUBLIC_IP>`

## Maintenance

- **Updating the site**: After pushing new code, SSH in, `git pull`, and re-run `./deploy-oracle-cloud.sh`.
- **Admin Panel**: Visit `http://<YOUR_VM_PUBLIC_IP>/admin` to access the content management panel. Default password is `admin123`.

*Note: For production, you should set up a Domain Name and SSL using Certbot/Let's Encrypt.*

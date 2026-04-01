#!/bin/bash
# deploy-oracle-cloud.sh
# Script to deploy NextScholar to an Oracle Cloud VM running Docker

# Update packages
sudo dnf update -y

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "Docker not found. Installing docker..."
    sudo dnf install -y dnf-utils zip unzip
    sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
    sudo dnf install -y docker-ce docker-ce-cli containerd.io
    sudo systemctl enable docker
    sudo systemctl start docker
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null
then
    echo "Docker Compose not found. Installing..."
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

echo "Building and starting containers..."
sudo docker-compose down
sudo docker-compose up -d --build

echo "Deployment complete on Oracle Cloud!"

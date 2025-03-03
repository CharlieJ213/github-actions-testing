#!/bin/bash

# Update the system
sudo yum update -y

# Install Docker
sudo amazon-linux-extras install docker -y
sudo systemctl start docker
sudo systemctl enable docker

# Add ec2-user to the docker group to run Docker without sudo
sudo usermod -aG docker ec2-user

# Install Docker Compose
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")')
sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version

# Run the docker-compose.yml file
# Make sure to adjust the path to your docker-compose.yml file as needed
if [ -f "docker-compose.yml" ]; then
    docker-compose up -d
else
    echo "docker-compose.yml file not found in the current directory."
fi

echo "Docker and Docker Compose installation complete."

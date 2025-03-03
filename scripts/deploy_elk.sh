#!/bin/bash

# Update and upgrade the system
sudo apt update && sudo apt upgrade -y

# Install Java
sudo apt install -y openjdk-11-jdk

# Install Elasticsearch
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.10.0-amd64.deb
sudo dpkg -i elasticsearch-7.10.0-amd64.deb
sudo systemctl enable elasticsearch.service
sudo systemctl start elasticsearch.service

# Install Kibana
wget https://artifacts.elastic.co/downloads/kibana/kibana-7.10.0-amd64.deb
sudo dpkg -i kibana-7.10.0-amd64.deb
sudo systemctl enable kibana.service
sudo systemctl start kibana.service

# Install Logstash
wget https://artifacts.elastic.co/downloads/logstash/logstash-7.10.0-amd64.deb
sudo dpkg -i logstash-7.10.0-amd64.deb
sudo systemctl enable logstash.service
sudo systemctl start logstash.service

# Configure Elasticsearch
sudo tee /etc/elasticsearch/elasticsearch.yml > /dev/null <<EOF
network.host: localhost
http.port: 9200
EOF

# Configure Kibana
sudo tee /etc/kibana/kibana.yml > /dev/null <<EOF
server.port: 5601
server.host: "0.0.0.0"
elasticsearch.hosts: ["http://localhost:9200"]
EOF

# Restart services
sudo systemctl restart elasticsearch.service
sudo systemctl restart kibana.service

# Clean up downloaded files
rm elasticsearch-7.10.0-amd64.deb kibana-7.10.0-amd64.deb logstash-7.10.0-amd64.deb

echo "ELK stack setup complete. Access Kibana at http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):5601"

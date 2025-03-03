#!/bin/bash

# Update the system
sudo yum update -y

# Install Java (Amazon Corretto 11)
sudo yum install -y java-11-amazon-corretto

# Add Elastic's GPG key and repository
sudo rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
sudo tee /etc/yum.repos.d/elasticsearch.repo > /dev/null <<EOF
[elasticsearch]
name=Elasticsearch repository for 7.x packages
baseurl=https://artifacts.elastic.co/packages/7.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
EOF

# Install Elasticsearch, Kibana, and Logstash
sudo yum install -y elasticsearch kibana logstash

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

# Enable and start Elasticsearch, Kibana, and Logstash services
sudo systemctl daemon-reload
sudo systemctl enable elasticsearch.service kibana.service logstash.service
sudo systemctl start elasticsearch.service kibana.service logstash.service

# Verify services are running (optional logging)
echo "Checking service statuses..."
sudo systemctl status elasticsearch.service || echo "Elasticsearch failed to start."
sudo systemctl status kibana.service || echo "Kibana failed to start."
sudo systemctl status logstash.service || echo "Logstash failed to start."

# Output Kibana access URL
echo "ELK stack setup complete. Access Kibana at http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):5601"

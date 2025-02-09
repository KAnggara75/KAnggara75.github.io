---
title: K3s/K8s Nginx Ingress Configuration
subtitle: This guide shows how to config ingress k8s/k3s.
tags: [Kubernetes, cluster, linux, DevOps, k8s, k3s]
source: https://docs.k3s.io/installation
author: Kelvin Anggara
---

# Config K8s Nginx Ingress

## Install Helm

```bash
sudo apt install gpg -y
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
sudo apt install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt update
sudo apt install helm
```

## Install Nginx-Ingress

[stackoverflow](https://stackoverflow.com/questions/71181517/cert-manager-remote-error-tls-unrecognized-name-errors)

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx -n ingress --create-namespace --timeout 600s --set controller.publishService.enabled=true --debug
```

```bash
helm pull ingress-nginx/ingress-nginx
tar -zxvf ingress-nginx-*.tgz
cd ingress-nginx
vi values.yaml
```

change `controller.service.externalIPs: [XXX.XXX.XXX.XXX]` with your public IP

```bash
helm upgrade --install ingress-nginx -f values.yaml . -n ingress --create-namespace --timeout 600s --set controller.publishService.enabled=true --debug

helm upgrade --install nginx-ingress -f values.yaml . -n ingress --debug --create-namespace
```

### Test Ingress

```bash
vim service-nginx-ingress.yaml
```

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

Deploy the application in kubernetes using the `kubectl apply` command.

```bash
kubectl apply -f deploy-nginx.yaml
```

### Create a service exposed on Ingress.

```bash
vim nginx-with-ingress.yaml
```

```bash
replicaCount: 1
namespace: sit

image:
  repository: ghcr.io/linuxserver/nginx
  pullPolicy: Always

deployment:

service:
  type: ClusterIP
  port: 80

ingress:
  host: nginx.api.dev.pakaiwa.my.id

hpa:
  maxReplicas: 1
  minReplicas: 1
  targetCPUUtilizationPercentage: 70

resources:
  limits:
    cpu: 500m
    memory: 256Mi
  requests:
    cpu: 250m
    memory: 128Mi
```

```bash
kubectl apply -f nginx-with-ingress.yaml
```

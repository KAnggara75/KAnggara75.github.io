---
title: K3s/K8s Ingress TLS
subtitle: This guide shows how to config ingress k8s/k3s.
tags: [Kubernetes, cluster, linux, DevOps, k8s, k3s]
source: https://docs.k3s.io/installation
author: Kelvin Anggara
---

# Config K3s

- [ ] knln

>

## Install Helm

```bash
sudo apt install gpg -y
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
sudo apt install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt update
sudo apt install helm
```

## Install MetalLb

```bash
helm repo add metallb https://metallb.github.io/metallb
```

with value.yaml

```bash
helm pull metallb/metallb
tar -zxvf metallb-*.tgz
cd metallb
helm install metallb -f values.yaml . -n metallb-system --debug --create-namespace
```

Direcly install

```bash
helm install metallb metallb/metallb --namespace metallb-system --debug  --create-namespace
```

### Defining the IPs to assign to the Load Balancer services

`vi ipaddresspool.yaml`

```yaml
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: default-pool
  namespace: metallb-system
spec:
  addresses:
    - 185.201.9.248/24
    - 2a02:4780:e:5fc7::1/48
```

```bash
kubectl apply -f ipaddresspool.yaml
```

### Limiting the set of nodes where the service can be announced from

`vi L2Advertisement.yaml`

```yaml
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: default
  namespace: metallb-system
spec:
  ipAddressPools:
    - default-pool
```

```bash
kubectl apply -f L2Advertisement.yaml
```

### Test Load Balance

```bash
kubectl run app-demo-1 --image=nginx --port=80
kubectl expose pod app-demo-1 --type=LoadBalancer --target-port=80 --port=80 --name app-demo-1
```

## Install Nginx-Ingress

```bash
helm repo add nginx-stable https://helm.nginx.com/stable
helm repo update
```

```bash
helm pull nginx-stable/nginx-ingress
tar -zxvf nginx-ingress-*.tgz
cd nginx-ingress
vi values.yaml
```

change `setAsDefaultIngress: true`

```bash
helm install nginx-ingress -f values.yaml . -n ingress --debug --create-namespace
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

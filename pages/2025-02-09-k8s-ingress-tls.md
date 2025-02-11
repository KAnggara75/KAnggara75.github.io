---
title: K3s/K8s Ingress TLS
subtitle: Menggunakan Let's Encrypt + Cert-Manager untuk Sertifikat Otomatis di K3s/K8s
tags: [Kubernetes, cluster, linux, DevOps, k8s, k3s]
source: https://cert-manager.io/docs/installation/helm/
author: Kelvin Anggara
---

# Config K3s Ingress TLS

## Installing cert-manager

### 1. Add the Helm repository

```bash
helm repo add jetstack https://charts.jetstack.io --force-update
helm repo update
```

### 2. Install cert-manager

```bash
helm upgrade --install cert-manager jetstack/cert-manager -n cert-manager --create-namespace --set crds.enabled=true --debug
```

### 3. Verify installation

```bash
kubectl get pods -n cert-manager -w
```

## Buat Issuer atau ClusterIssuer (Let's Encrypt ACME)

Issuer adalah konfigurasi yang menentukan bagaimana Cert-Manager mengelola sertifikat.
Buat file `issuer.yaml` untuk Let's Encrypt:

### Nginx Ingress

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: admin@example.com
    server: https://acme-v02.api.letsencrypt.org/directory
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx/traefik # Adjust with your ingress service
```

```sh
kubectl apply -f issuer.yaml
```

```sh
kubectl get clusterissuer
```

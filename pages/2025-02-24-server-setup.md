---
title: Setup Server
subtitle: Linux Server Setup
tags: [linux, vps, debian, ubuntu]
source: https://kanggara.my.id
author: Kelvin Anggara
---

# Setup

## Create Swap File

```sh
/bin/bash -c "$(curl -fsSL https://gist.githubusercontent.com/KAnggara75/78a1211536a8ee2e9cfcf6473f771700/raw/6b2a4ac38ab729a7d59d2610226dc961a660bb52/create_swap.sh)"
```

## Create user

```sh
/bin/bash -c "$(curl -fsSL https://gist.githubusercontent.com/KAnggara75/73ef0aebb570aa6e1331ab8c771a265d/raw/a1239d5c4a9cfb4749af611db7f03431979983f1/user.sh)"
```

## Change SSH Port

```sh
/bin/bash -c "$(curl -fsSL https://gist.githubusercontent.com/KAnggara75/f1f6e6a951680119eef607ee7eecc52f/raw/e2b50daeb18b88dff81552b50218803262dda44f/change_ssh_port.sh)"
```

## Instal dotfile

```sh
sudo apt install zsh -y
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/KAnggara75/dotfile/main/install.sh)"
```

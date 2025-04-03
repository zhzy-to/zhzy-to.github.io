---
title: windows 虚拟化
date: '2023-06-08 15:00:00'
sidebar: 'auto'
categories:
- windows
tags:
- windows
publish: true
---

<a name="I7SCk"></a>

#### VMware 虚拟机无法启用虚拟化问题

使用管理员权限 打开CMD 关闭系统的虚拟化 否则会导致与VMware冲突
```
bcdedit /set hypervisorlaunchtype off
```

但是如果你的docker 是使用的 hyperv 会导致docker无法启动
```
bcdedit /set hypervisorlaunchtype auto
```
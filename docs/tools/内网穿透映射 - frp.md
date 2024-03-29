---
title: 内网穿透映射 - frp
date: '2020-10-07 13:00:00'
sidebar: 'auto'
categories:
 - 工具
tags:
 - 工具 
publish: true
---

<a name="hK1xP"></a>
##### 地址:
https://gofrp.org/docs/examples/vhost-http/


<a name="yipWt"></a>
##### 使用说明:

- 前置条件
```dockerfile
// 需要一台服务器

// 如果想使用域名访问 自己本地的项目 还需要一个域名
```

- 服务器配置
```dockerfile
// 修改frps.ini文件

[common]
# 服务绑定的端口
bind_port = 7901
# 启用的面板访问端口
dashboard_port = 7905
# 面板用户名
dashboard_user = admin
# 面板访问密码
dashboard_pwd = admin
# token 配置了服务端 客户端也需要配置
#token = pigeonfrp
# vhost_http_port 用于接收 HTTP 请求
vhost_http_port = 7902

```

- 启用服务端
```dockerfile
./frps -c frps.ini

# 启动后 假设服务器的ip为xxx

# 访问面板地址 即: xxx:7905
```

- 客户端配置
```dockerfile
[common]
# 服务器的公网IP
server_addr = xxx
# 服务所绑定的端口
server_port = 7901
#authentication_method = token
#token = pigeonfrp
 
[web-lab]
type = http
# 本机地址
local_ip = 127.0.0.1
# 本机的web应用端口
local_port = 9999
# 指向xxxip的域名
custom_domains = www.xxx.xxx
```

- 启用客户端
```dockerfile
frpc -c ./frpc.ini

# 访问www.xxx.xxx:7902 则代理到本机的服务上
```

---
title: rabbitmq
date: '2020-03-08 14:00:00'
categories:
- docker
publish: true
---

<a name="I7SCk"></a>  
- 下载rabbitmq`3.9-management`的docker镜像：
```sh
docker pull rabbitmq:3.9-management
```

-   使用如下命令启动RabbitMQ服务：
```sh
docker run -p 5672:5672 -p 15672:15672 --name my-rabbitmq \
-v /Users/zhaozhenyuan/DockerEnv/rabbitmq/data:/var/lib/rabbitmq \
-d rabbitmq:3.9-management
```

-   [本机 忽略]开启防火墙：
```sh
firewall-cmd --zone=public --add-port=15672/tcp --permanent
firewall-cmd --reload
```

-   访问地址查看是否安装成功：http://127.0.0.1:15672
-   输入账号密码并登录：guest guest

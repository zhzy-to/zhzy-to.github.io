---
title: nginx
date: '2020-03-08 14:00:00'
categories:
- docker
publish: true
---

<a name="I7SCk"></a>
- 下载Nginx`1.22`的docker镜像：
```sh
docker pull nginx:1.22

```

- 先运行一次容器（为了拷贝配置文件）：
```sh
docker run -p 80:80 --name my-nginx \
-v /Users/zhaozhenyuan/DockerEnv/nginx/html:/usr/share/nginx/html \
-v /Users/zhaozhenyuan/DockerEnv/nginx/logs:/var/log/nginx  \
-d nginx:1.22
```

-   将容器内的配置文件拷贝到指定目录：
```sh
docker container cp my-nginx:/etc/nginx /Users/zhaozhenyuan/DockerEnv/nginx/
```

-   修改文件名称：
```sh
mv nginx conf
```

-   终止并删除容器：
```sh
docker stop my-nginx
docker rm my-nginx
```

-   使用如下命令启动Nginx服务：
```sh
docker run -p 8088:80 --name my-nginx \
-v /Users/zhaozhenyuan/DockerEnv/nginx/html:/usr/share/nginx/html \
-v /Users/zhaozhenyuan/DockerEnv/nginx/logs:/var/log/nginx  \
-v /Users/zhaozhenyuan/DockerEnv/nginx/conf:/etc/nginx \
-d nginx:1.22
```


---
title: 镜像构建-dockerfile
date: '2020-03-08 14:00:00'
categories:
- docker
publish: true
---

<a name="I7SCk"></a>
### 编写Dockerfile
<a name="Xe9Ae"></a>
##### dockerfile 简单编写
```dockerfile
mkdir -p mydocker/mynginx

cd mydocker/mynginx

touch Dockerfile

// 以上创建了一个dockerfile 文件
```
```dockerfile
// 编写这个文件

FROM nginx
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
```

- 说明
```dockerfile
FROM 指定基础镜像

# from 是指定一个镜像作为基础， 可以使用docker hub上的镜像来作为基础镜像 
# 例如 mysql redis php 等， 当镜像不满足的时候 还可以使用一些更为基础的操作系统镜像，
# 如 ubuntu、debian、centos、fedora、alpine 等，
# 这些操作系统的软件库为我们提供了更广阔的扩展空间

FROM scratch

# scratch 表示为空白镜像 那么也就是说 你这个镜像不会以任何一个镜像为基础
# 接下来的第一个指令将会作为镜像的 第一层存在

RUN 执行命令

# RUN 指令是用来执行命令行命令的
# 一般分为两种

# shell 格式
# shell 格式就像直接在命令行输出的命令一样
# RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html

# exec 格式：RUN ["可执行文件", "参数1", "参数2"]，这更像是函数调用中的格式
```
<a name="HBG1J"></a>
##### RUN 的错误使用
```dockerfile
FROM debian:stretch

RUN apt-get update
RUN apt-get install -y gcc libc6-dev make wget
RUN wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz"
RUN mkdir -p /usr/src/redis
RUN tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1
RUN make -C /usr/src/redis
RUN make -C /usr/src/redis install
```
Dockerfile 中每一个指令都会建立一层，RUN 也不例外。每一个 RUN 的行为，就和刚才我们手工建立镜像的过程一样：新建立一层，在其上执行这些命令，执行结束后，commit 这一层的修改，构成新的镜像。
而上面的这种写法，创建了 7 层镜像。这是完全没有意义的
<a name="hlSQs"></a>
##### RUN 正确的使用
```dockerfile
FROM debian:stretch

RUN set -x; buildDeps='gcc libc6-dev make wget' \
    && apt-get update \
    && apt-get install -y $buildDeps \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && mkdir -p /usr/src/redis \
    && tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1 \
    && make -C /usr/src/redis \
    && make -C /usr/src/redis install \
    && rm -rf /var/lib/apt/lists/* \
    && rm redis.tar.gz \
    && rm -r /usr/src/redis \
    && apt-get purge -y --auto-remove $buildDeps
```
之前所有的命令只有一个目的，就是编译、安装 redis 可执行文件。因此没有必要建立很多层，这只是一层的事情。因此，这里没有使用很多个 RUN 一一对应不同的命令，而是仅仅使用一个 RUN 指令，并使用 && 将各个所需命令串联起来。
将之前的 7 层，简化为了 1 层。在撰写 Dockerfile 的时候，要经常提醒自己，这并不是在写 Shell 脚本，而是在定义每一层该如何构建。
并且，这里为了格式化还进行了换行。Dockerfile 支持 Shell 类的行尾添加 \ 的命令换行方式，以及行首 # 进行注释的格式。良好的格式，比如换行、缩进、注释等，会让维护、排障更为容易，这是一个比较好的习惯。
还可以看到这一组命令的最后添加了清理工作的命令，删除了为了编译构建所需要的软件，清理了所有下载、展开的文件，并且还清理了 apt 缓存文件。这是很重要的一步，我们之前说过，镜像是多层存储，每一层的东西并不会在下一层被删除，会一直跟随着镜像。因此镜像构建时，一定要确保每一层只添加真正需要添加的东西，任何无关的东西都应该清理掉。

<a name="fEfqm"></a>
### 构建镜像
在 Dockerfile 文件所在目录执行：

- 命令
```dockerfile
docker build [选项] <上下文路径/URL/->

docker build -t nginx:v3 .
// 或者 
docker image build -f dockfile.bad -t nginx:v3 .

-f // 指定build 的指令文件名 
```

- 使用
```dockerfile
$ docker build -t nginx:v3 .
Sending build context to Docker daemon 2.048 kB
Step 1 : FROM nginx
---> e43d811ce2f4
Step 2 : RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
---> Running in 9cdc27646c7b
---> 44aa4490ce2c
Removing intermediate container 9cdc27646c7b
Successfully built 44aa4490ce2c
```

- 查看
```dockerfile
docker image ls

// 此时image list 多了一个nginx。并且它的 TAG 是 v3

// 启动它

docker container run -d -p 8181:80 --name=nginxv3 nginx:v3

// 此时访问宿主机的浏览器地址 localhost:8181 就会得到一个nginx的 的欢迎页面了
```
<a name="MJzsL"></a>
### 上传镜像 到 Docker Hub
```dockerfile
docker login

// 输入用户 and 密码

// 提示登陆成功后

// 需要把镜像 仓库名的格式 改为 [你的用户名]/[镜像名称]
docker image tag nginxv3 zhzyto/nginxv3

// 然后push
docker image push zhzyto/nginxv3
```
<a name="cQJVk"></a>
### 本地示例

- 编写程序文件

简单编写一个go文件 使用标准库 net/http包 启动一个http服务 端口为9090
```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		str := `{"username":"zzy"}`
		_, _ = fmt.Fprintln(w, str)
	})

	err := http.ListenAndServe(":9090", nil)
	if err != nil {
		fmt.Printf("http server failed, err:%v\n", err)
		return
	}
}

```

- 构建Dockerfile文件
```dockerfile
# 指定基于的镜像
FROM golang:alpine3.16
# 指定工作目录
WORKDIR /app
# 复制文件到 app/http/下
COPY main.go http/main.go
```

- cd 到 Dockerfile 目录下 , build

这里我把我的镜像起名为mego , tag为 v1
```dockerfile
docker build -t mego:v1 .
```

- 构建成功后, 运行容器
```dockerfile
# 先查看是否存在刚才打包的镜像
docker image ls

# 运行容器
docker container run -it -p 9090:9090 --name=mego mego:v1 sh
```

- 成功运行后, sh方式进入工作目录启用服务
```dockerfile
ls
cd http/
go run main.go

# 在本机访问 localhost:9090 即可看到响应的json数据
```

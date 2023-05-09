---
title: kibana
date: '2020-03-08 14:00:00'
categories:
- docker
publish: true
---

<a name="I7SCk"></a>

-   下载Kibana`7.17.3`的docker镜像：
```sh
docker pull kibana:7.17.3
```

-   使用如下命令启动Kibana服务：
```sh
docker run --name kibana -p 5601:5601 \
--link elasticsearch:es \
-e "elasticsearch.hosts=http://es:9200" \
-d kibana:7.17.3
```

-   开启防火墙：

```sh
firewall-cmd --zone=public --add-port=5601/tcp --permanent
firewall-cmd --reload
```

-   访问地址进行测试：http://127.0.01:5601

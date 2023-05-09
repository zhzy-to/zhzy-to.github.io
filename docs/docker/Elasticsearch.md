---
title: elasticsearch
date: '2020-03-08 14:00:00'
categories:
- docker
publish: true
---

<a name="I7SCk"></a>
-   下载Elasticsearch`7.17.3`的docker镜像：
```sh
docker pull elasticsearch:7.17.3
```

-   【本机忽略】修改虚拟内存区域大小，否则会因为过小而无法启动:
```sh
sysctl -w vm.max_map_count=262144
```

-   使用如下命令启动Elasticsearch服务，内存小的服务器可以通过`ES_JAVA_OPTS`来设置占用内存大小：
```sh
docker run -p 9200:9200 -p 9300:9300 --name elasticsearch \
-e "discovery.type=single-node" \
-e "cluster.name=elasticsearch" \
-e "ES_JAVA_OPTS=-Xms512m -Xmx1024m" \
-v /Users/zhaozhenyuan/DockerEnv/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
-v /Users/zhaozhenyuan/DockerEnv/elasticsearch/data:/usr/share/elasticsearch/data \
-d elasticsearch:7.17.3
```

-   启动时会发现`/usr/share/elasticsearch/data`目录没有访问权限，只需要修改`/mydata/elasticsearch/data`目录的权限，再重新启动即可；
```sh
chmod 777 /mydata/elasticsearch/data/
```

-   安装中文分词器IKAnalyzer，注意下载与Elasticsearch对应的版本，下载地址：https://github.com/medcl/elasticsearch-analysis-ik/releases

![pic](https://www.macrozheng.com/assets/mall_linux_deploy_new_02.d402f993.png)


-   下载完成后解压到Elasticsearch的`/mydata/elasticsearch/plugins`目录下；

![pic](https://www.macrozheng.com/assets/mall_linux_deploy_new_03.d123512a.png)

-   重新启动服务：
```sh
docker restart elasticsearch
```

-   开启防火墙：
```sh
firewall-cmd --zone=public --add-port=9200/tcp --permanent
firewall-cmd --reload
```

-   访问会返回版本信息：http://127.0.0.1:9200
```json
{
  "name": "708f1d885c16",
  "cluster_name": "elasticsearch",
  "cluster_uuid": "mza51wT-QvaZ5R0NmE183g",
  "version": {
    "number": "7.17.3",
    "build_flavor": "default",
    "build_type": "docker",
    "build_hash": "5ad023604c8d7416c9eb6c0eadb62b14e766caff",
    "build_date": "2022-04-19T08:11:19.070913226Z",
    "build_snapshot": false,
    "lucene_version": "8.11.1",
    "minimum_wire_compatibility_version": "6.8.0",
    "minimum_index_compatibility_version": "6.0.0-beta1"
  },
  "tagline": "You Know, for Search"
}
```

- mac上如果报错。Exception in thread "main" java.nio.file.NotDirectoryException: /usr/share/elasticsearch/plugins/.DS_Store 
- 删除即可
```sh
rm /Users/zhaozhenyuan/DockerEnv/elasticsearch/plugins/.DS_Store
```


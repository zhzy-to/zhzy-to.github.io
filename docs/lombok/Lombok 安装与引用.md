---
title: lombok 安装 与 引用
date: '2022-07-08 15:00:00'
sidebar: 'auto'
categories:
- java
tags:
- lombok
publish: true
---

<a name="`kpfOc`"></a>
### pom.xml
```xml
<dependencies>
	
	<dependency>  
	    <groupId>org.projectlombok</groupId>  
	    <artifactId>lombok</artifactId>  
	    <version>1.18.24</version>  
	</dependency>

</dependencies>
```


### 使用
```java
package domain;  
  
import lombok.Data;  
  
@Data  
public class Student {  
  
    private String name;  
    private int id;  
    private int age;
```

- 生成getter setter 方法 @Data 
- 空参数构造 @NoArgsConstructor
- 有参数构造 @AllArgsConstructor 注意 类中必须有属性

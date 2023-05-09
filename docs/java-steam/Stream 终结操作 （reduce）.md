---
title: Java Steam reduce
date: '2022-07-08 15:00:00'
sidebar: 'auto'
categories:
- java
tags:
- java 函数式
publish: true
---

<a name="`kpfOc`"></a>
### reduce 归并

`map()`和`filter()`都是`Stream`的转换方法，而`Stream.reduce()`则是`Stream`的一个聚合方法，它可以把一个`Stream`的所有元素按照聚合函数聚合成一个结果。

对流中的数据按照你制定的计算方式算出结果

- 示例
```java
// 求和

int[] arr = {1,2,3,4,5,6,7,8,9};  
int sum = 0;  
  
for(int n : arr) {  
    sum = sum + n;  
}  
  
System.out.println(sum);  
  
  
int reduce = Arrays.stream(arr)  
        .reduce(0, new IntBinaryOperator() {  
            @Override  
            public int applyAsInt(int left, int right) {  
                return left + right;  
            }  
        });  
  
System.out.println(reduce);
```

- 示例
```java

// 使用reduce 获取所有作家年龄的和  
  
List<Author> authors = getAuthors();  
  
Integer reduce = authors.stream()  
        .map(Author::getAge)  
        .reduce(0, new BinaryOperator<Integer>() {  
            @Override  
            public Integer apply(Integer integer, Integer integer2) {  
                return integer + integer2;  
            }  
        });  
  
System.out.println(reduce);
```

- 示例
```java
// 使用reduce 求所有作者中年龄的最大值  
  
List<Author> authors = getAuthors();  
  
Integer max = authors.stream()  
        .map(author -> author.getAge())  
        .reduce(Integer.MIN_VALUE, new BinaryOperator<Integer>() {  
            @Override  
            public Integer apply(Integer result, Integer element) {  
                return result > element ? result : element;  
            }  
        });  
  
System.out.println(max);
```

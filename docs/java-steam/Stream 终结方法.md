---
title: Java Steam forEach
date: '2022-07-08 15:00:00'
sidebar: 'auto'
categories:
- java
tags:
- java 函数式
publish: true
---

<a name="`kpfOc`"></a>
##### forEach
对流中的元素进行遍历，通过传入的参数去指定对遍历的元素起到什么作用
```java
// 例如输出所有作家的名称

List<Author> authors = getAuthors();

authors.stream()
		.forEach(author -> System.out.println(author.getName()));
```

##### Count
可以用来获取当前流中的元素个数

```java
// 打印这些作家所出的书籍数量，重复的不算在内

List<Author> authors = getAuthors();  
  
long count = authors.stream()  
        .flatMap((Function<Author, Stream<Book>>) author -> author.getBooks().stream())  
        .distinct()  
        .count();  
  
System.out.println(count);
```


##### Max/Min
可以用来获取流中的 最大/最小 值

```java

// 分别获取作家中书籍的 最高分和最低分 并打印

List<Author> authors = getAuthors();  
  
Optional<Integer> max = authors.stream()  
        .flatMap(new Function<Author, Stream<Book>>() {  
            @Override  
            public Stream<Book> apply(Author author) {  
                return author.getBooks().stream();  
            }  
        })  
        .map(book -> book.getScore())  
        .max(new Comparator<Integer>() {  
            @Override  
            public int compare(Integer o1, Integer o2) {  
                return o1 - o2;  
            }  
        });  
  
System.out.println(max.get());
```

##### Collect

把当前流转为一个集合
- 示例一
```java
// 获取一个存放所有作者名字的集合  
  
List<Author> authors = getAuthors();  
  
List<String> collect = authors.stream()  
        .map(author -> author.getName())  
        .collect(Collectors.toList());  
  
System.out.println(collect);
```

- 示例二
```java
// 获取所有书名的set 集合  

Set<Object> collect1 = authors.stream()  
        .flatMap((Function<Author, Stream<Book>>) author  -> author.getBooks().stream())  
        .map(Book::getName)  
        .collect(Collectors.toSet());  
  
System.out.println(collect1);
```

- 示例三

```java
// 获取一个Map 集合 map的key为作者名 value 为list<Book>  
Map<String, List> collect2 = authors.stream()  
        .collect(Collectors.toMap(new Function<Author, String>() {  
            @Override  
            public String apply(Author author) {  
                return author.getName();  
            }  
        }, new Function<Author, List>() {  
  
            @Override  
            public List apply(Author author) {  
                return author.getBooks();  
            }  
        })); 
  
System.out.println(collect2);


// 表达式
Map<String, List<Book>> collect3 = authors.stream()  
        .distinct()  
        .collect(Collectors.toMap(author -> author.getName(), author -> author.getBooks()));
```


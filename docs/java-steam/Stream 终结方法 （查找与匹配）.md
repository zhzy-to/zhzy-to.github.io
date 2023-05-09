---
title: Java Steam anyMatch
date: '2022-07-08 15:00:00'
sidebar: 'auto'
categories:
- java
tags:
- java 函数式
publish: true
---

<a name="`kpfOc`"></a>
##### anyMatch
可以用来判断是否有任意符合匹配条件的元素，结果为boolean类型
- 示例一
```java
// 判断是否有年龄在29以上的作家  
List<Author> authors = getAuthors();  
boolean b = authors.stream()  
        .anyMatch(new Predicate<Author>() {  
            @Override  
            public boolean test(Author author) {  
                return author.getAge() > 29;  
            }  
        });  
  
System.out.println(b);
```

##### findAny
获取流中的任意一个元素， 该方法没有办法保证获取的一定是流中的第一个元素

```java
// 获取任意一个年龄大于 18的作家 ， 如果存在就输出他的名字  
  
List<Author> authors = getAuthors();  
  
Optional<Author> any = authors.stream()  
        .filter(author -> author.getAge() > 18)  
        .findAny();  
  
// 如果存在值，则使用该值调用指定的使用者，否则不执行任何操作  
any.ifPresent(new Consumer<Author>() {  
    @Override  
    public void accept(Author author) {  
        System.out.println(author);  
    }  
});
```

##### findFirst
获取流中的第一个元素

```java
// 获取一个年龄最小的作家 ， 并输出他的姓名  
  
List<Author> authors = getAuthors();  

// 按年龄最小升序
Optional<Author> first = authors.stream()  
        .sorted(new Comparator<Author>() {  
            @Override  
            public int compare(Author o1, Author o2) {  
                return o2.getAge() - o1.getAge();  
            }  
        })  
        .findFirst();  
  
first.ifPresent(new Consumer<Author>() {  
    @Override  
    public void accept(Author author) {  
        System.out.println(author.getAge());  
    }  
});
```


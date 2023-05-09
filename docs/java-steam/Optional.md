---
title: Java Steam Optional
date: '2022-07-08 15:00:00'
sidebar: 'auto'
categories:
- java
tags:
- java 函数式
publish: true
---

<a name="`kpfOc`"></a>
### 概述
可以使用 Optional 来避免空指针异常，并且在很多函数式编程中的API 也提到了 Optional

### 使用

##### 创建对象

- 示例一 常用方法 Optional.ofNullable
```java

// 判断非空对象
private static Author getAuthor() {  
    Author author = new Author(1L, "蒙多1", 33, "一个从菜刀中明悟哲理的男人", null);  
    return author;  
}

public static void main(String[] args) {  
    Author author = getAuthor();  
  
    if (author != null) {  
       System.out.println(author.getName());    
    }
}
```

使用Optional.ofNullable

```java
public static void main(String[] args) {  
    Author author = getAuthor();  
  
	Optional<Author> authorOptional = Optional.ofNullable(author);  
	authorOptional.ifPresent(new Consumer<Author>() {  
	    @Override  
	    public void accept(Author author) {  
	        System.out.println(author.getName());  
	    }  
	});  
	  
	// lambda  
	authorOptional.ifPresent(author1 -> System.out.println(author1.getName()));
}
```

直接在方法上封装
```java
private static Optional<Author> getAuthorOptional() {  
    Author author = new Author(1L, "蒙多1", 33, "一个从菜刀中明悟哲理的男人", null);  
    return Optional.ofNullable(author);  
}

Optional<Author> authorOptional1 = getAuthorOptional();  
  
authorOptional1.ifPresent(author1 -> System.out.println(author1.getName()));
```


- 示例二  Optional.of()

`of 方法不可以传入null对象， 所有可以确定对象一定不为空的情况下使用`


- 示例三 .empty()
`创建一个空的Optional 对象， 使用 Optional.empty()`

```java
return author==null ? Optional.empty() : Optional.of(author);
```

##### 安全的消费

```java
// 通常使用ifPresent
author.ifPresent(author1 -> System.out.println(author1.getName()));
```

##### 安全的获取值

- orElseGet
当获取的数据为空时， 可以设置一个默认值

```java
// 设置默认值
Author author2 = authorOptional.orElseGet(() -> new Author());
```

- orElseThrow
当数据不存在的时候 ， 可以设置抛出异常

```java
try {  
    Author aNull = authorOptional.orElseThrow(new Supplier<Throwable>() {  
        @Override  
        public Throwable get() {  
            return new RuntimeException("null");  
        }  
    });  
    System.out.println(aNull);  
} catch (Throwable exception) {  
    exception.printStackTrace();  
}
```

##### 过滤
filter
```java

Optional<Author> authorOptional = getAuthorOptional();  
  
authorOptional.filter(new Predicate<Author>() {  
    @Override  
    public boolean test(Author author) {  
        return author.getAge() > 20;  
    }  
}).ifPresent(author1 -> System.out.println(author1.getName()));
```

##### 判断
isPresent

```java
Optional<Author> author = Optional.ofNullable(getAuthor());  
  
if (author.isPresent()) {  
    System.out.println(author.get().getName());  
}  
  
author.ifPresent(value -> System.out.println(value.getName()));
```

##### 数据转换
map
```java
Optional<Author> author = Optional.ofNullable(getAuthor());  
  
Optional<List<Book>> books = author.map(author1 -> author1.getBooks());  
  
books.ifPresent(new Consumer<List<Book>>() {  
    @Override  
    public void accept(List<Book> books) {  
        books.forEach(book -> System.out.println(book.getName()));  
    }  
});
```

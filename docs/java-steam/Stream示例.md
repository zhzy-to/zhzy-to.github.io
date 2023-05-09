---
title: Java Steam 示例
date: '2022-07-08 15:00:00'
sidebar: 'auto'
categories:
- java
tags:
- java 函数式
publish: true
---

<a name="`kpfOc`"></a>
### 需求
创建作家 与 书籍类，并通过一个方法返回作家的集合， 使用stream流进行过滤筛选


### 实现
- 引入 lombok
```xml
<dependencies>

	<dependency>  
	    <groupId>org.projectlombok</groupId>  
	    <artifactId>lombok</artifactId>  
	    <version>1.18.24</version>  
	    <scope>compile</scope>  
	</dependency>

</dependencies>
```
- Book 类
```java
@Data  
@NoArgsConstructor  
@AllArgsConstructor  
@EqualsAndHashCode  
public class Book {  
  
    private Long id;  
  
    private String name;  
  
    private String category;  
  
    private Integer Score;  
  
    private String intro;  
}
```
- Author
```java
@Data  
@NoArgsConstructor  
@AllArgsConstructor  
@EqualsAndHashCode  
public class Author {  
  
    private long id;  
  
    private String name;  
  
    private Integer age;  
  
    private String intro;  
  
    private List<Book> books;  
}
```

- 创建测试类
```java
public static List<Author> getAuthors() {  
    Author author1 = new Author(1L, "蒙多1", 33, "一个从菜刀中明悟哲理的男人", null);  
    Author author2 = new Author(2L,"蒙多2",13,"一个从菜刀中明悟哲理的男人",null);  
    Author author3 = new Author(3L,"蒙多3",33,"一个从菜刀中明悟哲理的男人",null);  
    Author author4 = new Author(4L,"蒙多4",14,"一个从菜刀中明悟哲理的男人",null);  
  
    List<Book> books1 = new ArrayList<>();  
    List<Book> books2 = new ArrayList<>();  
    List<Book> books3 = new ArrayList<>();  
  
    books1.add(new Book(1L,"刀的朗策1","哲学,爱情",88,"一把刀"));  
    books1.add(new Book(2L,"刀的朗策2","哲学,爱情",22,"一把刀"));  
  
    books2.add(new Book(1L,"狼222","哲学,爱情",22,"一把刀"));  
    books2.add(new Book(2L,"狼222","哲学,爱情",22,"一把刀"));  
  
    books3.add(new Book(1L,"兔子22","哲学,爱情",22,"一把刀"));  
    books3.add(new Book(2L,"兔子22","哲学,爱情",22,"一把刀"));  
  
  
    author1.setBooks(books1);  
    author2.setBooks(books2);  
    author3.setBooks(books3);  
    author4.setBooks(books1);  
  
    ArrayList<Author> authors = new ArrayList<>(Arrays.asList(author1, author2, author3, author4));  
  
    return  authors;  
}

public static void main(String[] args) {  
    List<Author> authors = getAuthors();  
  
    // 查询 作家中 年龄 小于 18岁的 去重 并打印姓名  
    authors.stream()  
            .distinct() // 去重  
            .filter(new Predicate<Author>() {  
                @Override  
                public boolean test(Author author) {  
                    return author.getAge() < 18;  
                }  
            })  
            .forEach(new Consumer<Author>() {  
                @Override  
                public void accept(Author author) {  
                    System.out.println("name = " + author.getName());  
                }  
            });  
  
}


// 使用lambda
authors.stream()  
        .distinct() // 去重  
        .filter(author -> author.getAge() < 18)  
        .forEach(author -> System.out.println("name = " + author.getName()));
```

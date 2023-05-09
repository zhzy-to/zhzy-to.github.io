---
title: Java Steam filter
date: '2022-07-08 15:00:00'
sidebar: 'auto'
categories:
- java
tags:
- java 函数式
publish: true
---

<a name="`kpfOc`"></a>
##### filter
过滤流信息
```java

// 只显示数组中大于4的值

Integer[] arr = {1,3,4,5,6,7};  
  
Arrays.stream(arr).filter((v) -> {  
    return v > 4;  
}).forEach(integer -> System.out.println(integer));

```

##### map
可以对流中的元素进行计算或转换
- 例子1

```java

List<Author> authors = getAuthors();  

// 将流中的 Author 对象 转换为 String 类型
// 这里直接获取 Author的姓名

authors.stream()  
        // <Author, Object> 第二个范型表示要进行转换的类型  
        .map(new Function<Author, String>() {  
            @Override  
            public String apply(Author author) {  
                return author.getName();  
            }  
        }).forEach(name -> System.out.println(name));
```
- 例子2
```java
public class Main {
    public static void main(String[] args) {
        List.of("  Apple ", " pear ", " ORANGE", " BaNaNa ")
                .stream()
                .map(String::trim) // 去空格
                .map(String::toLowerCase) // 变小写
                .forEach(System.out::println); // 打印
    }
}
```

##### filter 
所谓`filter()`操作，就是对一个`Stream`的所有元素一一进行测试，不满足条件的就被“滤掉”了，剩下的满足条件的元素就构成了一个新的`Stream`。

例如，我们对1，2，3，4，5这个`Stream`调用`filter()`，传入的测试函数`f(x) = x % 2 != 0`用来判断元素是否是奇数，这样就过滤掉偶数，只剩下奇数，因此我们得到了另一个序列1，3，5：
```java
public class Main {
    public static void main(String[] args) {
        IntStream.of(1, 2, 3, 4, 5, 6, 7, 8, 9)
                .filter(n -> n % 2 != 0)
                .forEach(System.out::println);
    }
}
```

##### distinct
去除流中重复的对象
依赖的是Object 的 equals 方法来判断是否是相同对象， 所以注意重写equals方法

引入lombok后 可以在类上面使用 
```java
@EqualsAndHashCode
```
注解 ， 会自动复写equals 方法

##### sorted
对流中的元素进行排序
```java
  
authors.stream()  
        .distinct()  
        .sorted()  
        .forEach(author -> System.out.println(author.getAge()));
```
直接进行排序使用会出现错误，如下
```java
Exception in thread "main" java.lang.ClassCastException: org.example.func.Author cannot be cast to java.lang.Comparable
```
涉及到类型转换的异常， 实际上使用sorted 需要实现Comparable接口才可以

如果调用空参的sorted 方法， 流中的元素需要实现Comparable接口
```java
package org.example.func;  
  
public class Author implements Comparable<Author>{ 
    private Integer age;  
  
	@Override  
	public int compareTo(Author o) {
		// 当前对象的年龄 - 传入的年龄 如果大于就是正数 小于就是负数 等于则为0 
		 return this.getAge() - o.getAge();
	}
}

// 不用实现接口
// 或者
.sorted(new Comparator<Author>() {  
    @Override  
    public int compare(Author o1, Author o2) {  
        return o2.getAge() - o1.getAge();  
    }  
})

```

##### limit
限制流输出的元素数量 .limit(2) 

##### flatMap
返回一个流对象，

- 示例一
```java
// 打印所有书籍的名字

List<Author> authors = getAuthors();

authors.stream()  
        .flatMap(new Function<Author, Stream<Book>>() {  
            @Override  
            public Stream<Book> apply(Author author) {  
                return author.getBooks().stream();  
            }  
        })  
        .forEach(new Consumer<Book>() {  
  
            @Override  
            public void accept(Book o) {  
                System.out.println(o);  
            }  
        });
```
- 示例二
```java
// 打印现有数据的所有分类，要求对分类进行去重，不能出现这种格式 ：哲学，生活  
List<Author> authors = getAuthors();  
  
authors.stream()  
        .flatMap(new Function<Author, Stream<Book>>() {  
            @Override  
            public Stream<Book> apply(Author author) {  
                return author.getBooks().stream();  
            }  
        })  
        .flatMap(new Function<Book, Stream<String>>() {  
            @Override  
            public Stream<String> apply(Book book) {  
                // 拆分为字符串数组  
                String []arr = book.getCategory().split(",");  
                // 转为流  
                return Arrays.stream(arr);  
            }  
        })  
        .distinct()  
        .forEach(s -> System.out.println(s));
```

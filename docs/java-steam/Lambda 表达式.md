---
title: Lambda 表达式
date: '2022-07-08 15:00:00'
sidebar: 'auto'
categories:
- java
tags:
- java 函数式
publish: true
---

<a name="`kpfOc`"></a>
- 创建线程

```java
// 创建线程时 使用匿名内部类的写法  
Thread hello = new Thread(new Runnable() {  
    @Override  
    public void run() {  
        System.out.println("hello");  
    }  
});

// 示例
new Thread(() -> System.out.println("hello lambda")).start();

```

- 示例2
```java
public interface SumOperator {  
    int sum(int a,int b);  
}

public static int sum(SumOperator sumOperator) {
	int a = 1;
	int b = 0;
    return sumOperator.sum(a,b);  
}

public static void main(String[] args) {
	// 匿名类方式
	sum(new SumOperator() {
		@Override
		public int sum(int a, int b) {
			return a + b;
		}
	});

	// 表达式
	sum((int a,int b) -> return a + b);
}
```

- 示例3
```java
public static void printNum(IntPredicate predicate) {  
    int[] arr = {1,2,3,4,5,6,7,8,9,10};  

    for (int i : arr) {  
        if (predicate.test(i)) {  
            System.out.println(i);  
        }  
    }  
}

printNum((val)-> val % 2 == 0);
```

- 示例4
```java
public static <R> R typeConver(Function<String ,R> function) {  
    String str = "123";  
    return function.apply(str);  
}

Integer integer = typeConver(new Function<String, Integer>() {  
    @Override  
    public Integer apply(String s) {  
        return Integer.valueOf(s);  
    }  
});   
  
typeConver(s -> Integer.valueOf(s));  
  
typeConver(Integer::valueOf);

```

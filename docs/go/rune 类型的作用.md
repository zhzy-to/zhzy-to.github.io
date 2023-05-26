---
title: rune 类型的作用
date: '2019-06-06 11:00:00'
sidebar: 'auto'
categories:
 - golang
tags:
 - go常用操作
publish: true
---


字符串由 字符组成 ，而字符底层由字节组成，一个字符串在底层也是表示字节序列，    在Go语言中，字符可以被分成两种类型处理：对占1个字节的英文类字符，可以使用byte（或者unit8）；对占1~4个字节的其他字符，可以使用rune（或者int32），如中文、特殊符号等

- 统计中文字符串长度
```go
fmt.Println(len("go语言编程"))  // 14

// 转换成 rune 数组后统计字符串长度
fmt.Println(len([]rune("Go语言编程")))  // 输出：6
```

- 截取带中文的字符串
```go
s := "Go语言编程"
// 8=2*1+2*3
fmt.Println(s[0:8])  // 输出：Go语言

// 如果字节数计算错误，就会显示乱码

s := "Go语言编程"
fmt.Println(s[0:7]) // 输出：Go语�

// 解决
s := "Go语言编程"
// 转成 rune 数组，需要几个字符，取几个字符
fmt.Println(string([]rune(s)[:4])) // 输出：Go语言 
```

- 统计字符串长度
```go
// 统计字符串长度
fmt.Println(utf8.RuneCountInString("Go语言编程")) // 输出：6
```

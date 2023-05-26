---
title: go 类型断言
date: '2019-05-08 08:00:00'
sidebar: 'auto'
categories:
- golang

tags:
- go常用操作
publish: true
---

# go中类型断言的写法

```go
x.(T)
```
其中x为 interface 类型 ， T为要断言的类型。

- 经常使用的场景

当某个类型为interface类型的变量时，真实的类型为A 才可以做某些事情的时候，这时候就可以使用类型断言，如下：
```go
package main

import (
    "fmt"
    "math/rand"
    "time"
)

// 只有当 v 为int 类型的时候， 才输出
func main() {
    var v interface{}

    r := rand.New(rand.NewSource(time.Now().UnixNano()))
    for i := 0; i < 10; i++{
        v = i 
        if (r.Intn(100) % 2) == 0 { 
            v = "hello"
        }   

        if _, ok := v.(int); ok {
            fmt.Printf("%d\n", v)
        }   
    }   
}
```

- 函数返回值类型断言， 当函数返回一个接口类型时，示例
```go
// 接口
type IMessage interface {
	GetMsgData() []byte
}

type Message struct {
}

func (m *Message) GetMsgData() []byte {

	return []byte{'h', 'e', 'l', 'l', 'o'}
}

type Message2 struct {
}

func (m *Message2) GetMsgData() []byte {

	return []byte{'w', 'o', 'r', 'l', 'd'}
}

// 返回一个接口类型
func getMessageInterface() IMessage {
	msg := &Message2{}
	return msg
}

func main() {
	msg := getMessageInterface()
	value, ok := msg.(*Message)
	if !ok {
		fmt.Println("失败啦 类型错误")
	}

	fmt.Println(value)
}

// getMessageInterface 方法实际返回的是 *Message2 
// 这时候使用*Message 进行断言 ， ok的值则为false 而 value为 nil
// 如果左边 只保留一个value ，那么在断言失败后将会引发一个painc 

```

- 使用断言判断一个变量类型
```go
container := map[int]string{0: "zero", 1: "one", 2: "two"}
//container := make([]string, 1)
//container[0] = "123"
fmt.Println(container)
//value, ok := interface{}(container).([]string)
value, ok := interface{}(container).(map[int]string)
fmt.Println(value, ok)

```

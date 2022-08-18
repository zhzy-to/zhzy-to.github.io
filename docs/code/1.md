---
title: GO端口扫描 . 单进程 .协程 .work池
date: '2021-02-04 15:30:00'
sidebar: 'auto'
categories:
- golang
tags:
- 代码片段
publish: true
---

<a name="sNLS8"></a>
### 单进程
```go
func main() {
	for i := 10; i < 1024; i ++ {
		conn,err := net.Dial("tcp",fmt.Sprintf("47.242.183.232:%d", i))
		if err != nil {
			continue
		}

		fmt.Println("port open :  \n", i)
		_ = conn.Close()
	}
}
```
只有一个goroutine 进行任务执行,  同步进行 , 需要的时间 emm 很长

<a name="A3J3u"></a>
### 协程处理
```go
func main() {
	var wg sync.WaitGroup
	for i := 10; i < 1024; i ++ {
		wg.Add(1)
		go func(j int) {
			defer wg.Done()
			address := fmt.Sprintf("127.0.0.1:%d", j)
			conn,err := net.Dial("tcp",address)
			if err != nil {
				return
			}
			_ = conn.Close()
			fmt.Println("port open :  \n", i)
		}(i)
	}

	wg.Wait()
	fmt.Println("扫描完毕")
}
```
大概耗时几秒

<a name="mGoaT"></a>
### 协程工作池
```go

func run (workPorts chan int, openPorts chan int, workId int) {
	for p := range workPorts {
		address := fmt.Sprintf("127.0.0.1:%d", p)
		conn,err := net.Dial("tcp",address)
		if err != nil {
			fmt.Printf("我是work %d, 端口 %d 关闭了 \n",workId,p)
			openPorts <- 0
			continue
		}
		_ = conn.Close()
		openPorts <- p
		fmt.Printf("我是work %d, 端口 %d 打开了 \n",workId,p)
	}
}

func main() {

	openPorts := make(chan int)
	workPorts := make(chan int,100)


	var opens []int

	// 启用了100 个 工作池
	for i := 0;i < cap(workPorts) ; i++ {
		go run(workPorts,openPorts,i)
	}

	// 发送任务
	go func() {
		for i := 0; i < 1024 ; i++  {
			workPorts <- i
		}
	}()

	// 阻塞 获得打开的端口 存入切片
	for i := 0; i < 1024 ; i++  {
		port := <- openPorts
		if port != 0 {
			opens = append(opens,port)
		}
	}

	close(workPorts)
	close(openPorts)

	// 排序
	sort.Ints(opens)

	for _, v := range opens {
		fmt.Println("打开的端口为:", v)
	}

	fmt.Println("工作结束")
}
```
写这个最终之前一直有个bug , 就是当所有goroutine 都执行完后, 主go程还是在阻塞状态,  获得打开的端口的for循环一直在阻塞,  原因是openPorts 当时只存入成功的端口 , 失败的是不进入channel的 ,
```go
if err != nil {
    fmt.Printf("我是work %d, 端口 %d 关闭了 \n",workId,p)
    //openPorts <- 0
    continue
}
```
之前没有这个  openPorts <- 0
这就导致 主go程中的 openPorts 一直阻塞 , 因为数量不对 主go中需要返回 1024次,
注意细节xdm

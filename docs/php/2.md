---
title: 创建子进程执行示例
date: '2019-06-07 15:00:00'
sidebar: 'auto'
categories:
  - php 
tags:
  - php 
publish: true
---

<a name="zJVDO"></a>
#### 先介绍几个函数 
- pcntl_fork()	函数创建一个子进程成功时，在父进程执行线程内返回产生的子进程的PID，在子进程执行线程内返回0。失败时，在父进程上下文返回-1，不会创建子进程，并且会引发一个PHP错误
-  pcntl_wait()	 函数挂起当前进程的执行直到一个子进程退出或接收到一个信号要求中断当前进程或调用一个信号处理函数。如果一个子进程在调用此函数时已经退出（俗称僵尸进程），此函数立刻返回。子进程使用的所有系统资源将被释放。
-  posix_getpid() 返回当进程ID
<a name="ctrev"></a>
#### 代码示例：
```php
// 想要创建子进程的数量
$count = 1;
for ($i = 0; $i < $count; $i++) {
  echo "开始创建一个新的子进程...", PHP_EOL;
  $pid = pcntl_fork();
  if ($pid == 0) {
    // 创建子进程成功 执行任务
    echo "执行任务 进程ID：" . posix_getpid(), PHP_EOL;
    sleep(10);
    exit();
  }
}

// 退出一个子进程 减去一个数量
while ($count > 0) {
  $pid = pcntl_wait($status);
  echo "子进程ID 退出了: " . $pid, PHP_EOL;
  $count--;
}

echo "结束", PHP_EOL;
```

- 执行如下

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26919725/1652436617358-3b59491a-3704-4474-801a-52d8c335494f.png#clientId=u9a08bcea-62f1-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=190&id=u63296432&margin=%5Bobject%20Object%5D&name=image.png&originHeight=380&originWidth=1128&originalType=binary&ratio=1&rotation=0&showTitle=false&size=189048&status=done&style=none&taskId=uaaf1740b-ad56-480c-8293-80cbc08f19d&title=&width=564)

- 示例二：
```php
        $timeStart = time();

        // 链接数据库
        $mysqli = new \mysqli('127.0.0.1', 'root', '123123', 'test');
        $result = $mysqli->query('select * from student where status = 2');
        // 解析结果集
        $processNum = 4;
        $child = [];
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            var_dump($row['id'] % $processNum);
            $child[$row['id'] % $processNum][] = $row['id'];
        }

        $mainPid = posix_getpid();
        echo "主进程：" . $mainPid . PHP_EOL;

        for ($i = 0; $i < $processNum; $i++) {
            $pid = pcntl_fork();
            if ($pid == 0) {
                $content = $child[$i];
                $childStart = time();
                $mysqli = new \mysqli('127.0.0.1', 'root', '123123', 'test');
                foreach ($content as $id) {
                    $mysqli->query('update student set status = 1 where id=' . $id);
                }
                $childEnd = time();
                $childDiff = $childEnd - $childStart;
                // 返回当前进程ID
                echo "#" . posix_getpid() . "执行完毕，用时：" . $childDiff . "秒" . PHP_EOL;
                exit();        //子进程执行完后必须退出，否则会循环的创建进程...
            }
        }

        //这里挂起主进程，等待子进程全部退出后再退出主进程
        while ($processNum > 0) {
            if (($pid = pcntl_wait($status)) > 0) {
                $processNum--;
                echo "#" . $pid . "退出" . PHP_EOL;
            }
        }

        $timeEnd = time();
        $diff = $timeEnd - $timeStart;
        echo '共计用时：' . $diff . '秒';
```

- 执行如下

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26919725/1652436730189-742d66c4-1871-4b66-9c48-ac711e26dddc.png#clientId=u9a08bcea-62f1-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=274&id=ua98bb95d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=548&originWidth=1122&originalType=binary&ratio=1&rotation=0&showTitle=false&size=357557&status=done&style=none&taskId=uf40da47e-fe46-465f-a01d-d751a45ccba&title=&width=561)

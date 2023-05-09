---
title: iTerm 2 (Oh My Zsh 自动补全)
date: '2022-06-08 15:00:00'
sidebar: 'auto'
categories:
- mac
tags:
- mac
publish: true
---

<a name="`kpfOc`"></a>
#### 安装步骤

- 在官网下载插件
	[下载](https://mimosa-pudica.net/zsh-incremental.html)

- `cd ~/.oh-my-zsh/plugins`

- 创建一个incr文件夹 方便管理
	`mkdir incr`
	
- 将桌面上已经下载下来的incr-0.2.zsh文件放在~/.oh-my-zsh/plugins/incr文件夹下
```sh
cp ~/Desktop/incr-0.2.zsh ~/.oh-my-zsh/plugins/incr/
```

- 赋予该文件777权限
```sh
chmod 777 ~/.oh-my-zsh/plugins/incr/incr-0.2.zsh
```

- 编辑.zshrc
```sh
vim ~/.zshrc
# 在文件中加入内容 保存退出
source ~/.oh-my-zsh/plugins/incr/incr-0.2.zsh
```
- 更新下配置文件
```sh
source ~/.zshrc
```

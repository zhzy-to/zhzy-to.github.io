---
title: Mac 环境变量
date: '2022-06-07 15:00:00'
sidebar: 'auto'
categories:
- mac
tags:
- mac
publish: true
---

<a name="`kpfOc`"></a>

/etc/profile (建议不修改这个文件) 全局公有配置文件 不管哪个用户登录都会读取该文件

/etc/bashrc (一般在这个文件中添加系统级别环境变量) 全局公有配置 

bash shell 执行时 不管是何种方式 都会读取此文件

  
～/.bash_profile (一般在这个文件中添加用户环境变量) 

注： Linux 中里面是 .bashrc 而 Mac 是 .bash_profile

.bash_profile 和 .zshrc 均在～目录下

.bash_profile，source ~/.bash_profile，只在当前窗口生效

.zshrc ，source ~/.zshrc，永久生效；计算机每次启动自动执行source ~/.zshrc

一般会在~/.zshrc中添加source ~/.bash_profile，以确保.bash_profile中的修改永久生效

我现在都写在 .zshrc 中

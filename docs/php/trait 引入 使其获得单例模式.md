---
title: trait 引入 使其获得单例模式
date: '2019-06-07 15:00:00'
sidebar: 'auto'
categories:
 - 代码片段 
tags:
 - php
publish: true
---

<a name="`kpfOc`"></a>
## 代码
```php
/**
* 引入 使其获得单例
* Trait Singleton
* @package app\common\traits
*/
trait Singleton
{
  private static $instance;
  
  public static function getInstance() {
    if (!(self::$instance instanceof self)) {
      self::$instance = new self;
    }
    return self::$instance;
  }
}
```


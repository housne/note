---
title: 使用 shadowsocks 正确上网
date: 2014-06-12T00:00:00+08:00
path: /usage-of-shadowsocks
tags:
    - proxy
    - shadowsocks
layout: post
cover: /images/cover/react-hooks.png
---

众所周知的原因，每年的5月35号左右，Google 的全线服务会被无情的封锁一段时间，对于程序员来说，少了 Google 就等于要花费更多的时间和精力和寻找资料和文档，所以如何正确上网很重要。<!--more-->

购买 vps 后，在上面安装 nodejs， 如果你装的系统是 ubuntu 或是 debian，直接运行 `apt-get install nodejs` 安装 nodejs，当然你也可以下载 nodejs 安装包，自己手动编译安装。

接下来安装 shadowsocks-nodejs，直接运行 `npm install -g shadowsocks`，在任意的一个目录下创建 config.json，内容如下

```json
{
  "server": "0.0.0.0",
  "server_port": 8388,
  "local_port": 1080,
  "password": "PWD",
  "timeout": 600,
  "method": "aes-256-cfb",
  "local_address": "127.0.0.1"
}
```

在当前目录下运行 nohup ssserver > log & 使其后台自动运行， 当然你也能配置 [Supervisor](https://github.com/clowwindy/shadowsocks-nodejs/wiki/Configure-Shadowsocks-nodejs-with-Supervisor)，让其后台自动运行

然后回到本地(自己的电脑)，同样安装 shadowsocks-nodejs，也是在任意的一个目录下创建 config.json，内容如下

```json
{
  "server": "0.0.0.0", //这里填写你 vps 的ip地址
  "server_port": 8388,
  "local_port": 1080, //这里填写本地的代理端口，如端口被占用的话，可随意更改
  "password": "PWD",
  "timeout": 600,
  "method": "aes-256-cfb",
  "local_address": "127.0.0.1"
}
```

接下来在当前目录运行 `sslocal`。

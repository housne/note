---
title: How to setup shadowsocks
date: 2014-06-12T00:00:00+08:00
tags:
    - proxy
    - shadowsocks
---

For well-known reasons, every year around May 35th, Google’s services will be ruthlessly blocked for a period of time. For programmers, the lack of Google means more time and energy to find information and documents. How to fuck GFW is very important.

After purchasing vps, install nodejs on it first. If your system is ubuntu or debian, run `apt-get install nodejs` directly to install nodejs. Of course, you can also download the nodejs installation package then compile and install it yourself.

Next install shadowsocks-nodejs, run `npm install -g shadowsocks` directly, create config.json in any directory, the content is as follows

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

Run `nohup ssserver> log &` in the current directory to make it run automatically in the background. Of course, you can also configure [Supervisor](https://github.com/clowwindy/shadowsocks-nodejs/wiki/Configure-Shadowsocks-nodejs-with-Supervisor ), let it run automatically in the background

Then go back to the local (your computer), install shadowsocks-nodejs as well, and create config.json in any directory. The content is as follows

```json
{
  "server": "0.0.0.0", // ip of your vps
  "server_port": 8388,
  "local_port": 1080, // local proxy port, if the port is occupied, you can change it
  "password": "PWD",
  "timeout": 600,
  "method": "aes-256-cfb",
  "local_address": "127.0.0.1"
}
```

Now, run `sslocal` in the current directory.

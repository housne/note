---
title: redis docker
date: 2016-04-04T17:25:59+08:00
tags:
  - docker
  - redis
layout: post
cover: /images/cover/redis-docker.jpeg
---

Redis is an open source key-value store that functions as a data structure server.<!--more-->

下载镜像:

```bash
docker pull redis
```

启动 redis 实例:

```bash
docker run --name some-redis -d redis
```

将 redis docker 链接到应用 docker 上

```bash
docker run --name some-app --link some-redis:redis -d application-that-uses-redis
```

这样在应用 docker 中能通过<code>redis</code>变量直接访问 redis 服务.
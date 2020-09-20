---
title: redis docker
date: 2016-04-04T17:25:59+08:00
tags:
  - docker
  - redis
cover: /images/cover/redis-docker.jpeg
---

Redis is an open source key-value store that functions as a data structure server.<!--more-->

Pull:

```bash
docker pull redis
```

Start redis:

```bash
docker run --name some-redis -d redis
```

Link redis service to docker application

```bash
docker run --name some-app --link some-redis:redis -d application-that-uses-redis
```

Now you can access redis service via `redis` variable.
---
title: "Git Revert"
date: 2020-08-06T19:42:34+08:00
draft: false
tags: 
  - git
  - revert
---

```bash
git checkout -b revert_branch
git revert commit_hash
git push
git checkout master
git merge commit_hash
```

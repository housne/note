---
title: CSS dark mode
date: 2019-03-30T02:53:05.000Z
tags: [css]
layout: post
cover: /images/cover/dark-mode.jpg
---

macOS Mojave 引入了深色模式，深色模式使用一种较深的配色方案，这种配色作用于整个系统，包括 Mac 随附的应用。另外，第三方应用也可以适配这一模式。

最新版本 macOS Mojave 10.14.4 自带的 safari 支持了 CSS [草案](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme)中的 `prefers-color-scheme` media query，这样我们可以使网页以深色模式呈现

```css
@media (prefers-color-scheme: dark) {
  body {
    background: #232325;
    color: rgba(229, 225, 216, 0.8);
  }
}
```

如果不使用 safari, 或者不支持深色模式的网站可以试试 [dark reader](https://darkreader.org/) 这款浏览器插件。

---
title: CSS dark mode
date: 2019-03-30T02:53:05.000Z
tags: [css]
layout: post
cover: /images/cover/dark-mode.jpg
---

macOS Mojave introduced dark mode, which uses a darker color scheme, which acts on the entire system, including the apps that come with the Mac. In addition, third-party applications can also adapt to this mode.

The latest version of macOS Mojave 10.14.4 comes with safari that supports CSS [Drafts](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme) `prefers-color-scheme` media query , So that we can render the page in dark mode

```css
@media (prefers-color-scheme: dark) {
  body {
    background: #232325;
    color: rgba(229, 225, 216, 0.8);
  }
}
```

If you do not use safari, or a website that does not support dark mode, you can try [dark reader](https://darkreader.org/) this browser plug-in.

---
layout: post
title: 译文Jekyll的安装
description: Jekyll安装方法的官方说明，学习的使用Jekyll的起点。这篇文章译自Jekyll的官方Wiki，希望能对不熟悉英文的朋友们有所帮助。
keywords: Jekyll,Install,Ruby,Linux,Wiki
category: 翻译
---

`directory_watcher`

{% highlight ruby linenos %}
RB_USER_INSTALL=true gem install jekyll
{% endhighlight %}

或者在OS X中使用HomeBrew

{% highlight ruby linenos %}
brew install python
#export PATH="/usr/local/share/python:$(PATH)"
easy_install pip
pip install --upgrade distribute
pip install pygments
{% endhighlight %}

**注意**：Homebrew并不会为你链接到可执行文件。对于Homebrew默认的Cellar路径和Python2.7来说，确保把`/usr/local/share/python`添加到你的`PATH`中。想要了解更多信息，请查看[这里](https://github.com/mxcl/homebrew/wiki/Homebrew-and-Python)


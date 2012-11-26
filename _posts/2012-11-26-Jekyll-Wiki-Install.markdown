---
layout: post
title: 译文Jekyll的安装
description: Jekyll安装方法的官方说明，学习的使用Jekyll的起点。这篇文章译自Jekyll的官方Wiki，希望能对不熟悉英文的朋友们有所帮助。
keywords: Jekyll,Install,Ruby,Linux,Wiki
category: 翻译
---

> 原文地址:[Install](https://github.com/mojombo/jekyll/wiki/Install,"Install")

##安装##

Jekyll最好的安装法师就是通过RubyGems:

> (RubyGems一个用于对Rails组建进行打包的Ruby打包系统——译者注)

{% highlight ruby linenos %}
gem install jekyll
{% endhighlight %}

Jekyll需要以下的gems:`directory_watcher`,`liquid`,`open4`,`maruku`和`classifier`。这些组件将会在gem的安装命令之后自动安装。

如果你在gem的安装过程中遇到错误，你可能需要安装ruby1.9.1的编译扩展组件的头文件。如果是Debian系统，你可以这样做：

{% highlight ruby linenos %}
sudo apt-get install ruby1.9.1-dev
{% endhighlight %}

如果是Red Hat、CentOS或Fedora系统，你可以这样做：

{% highlight ruby linenos %}
sudo yum install ruby-devel
{% endhighlight %}

在[NearlyFreeSpeech](https://www.nearlyfreespeech.net/,"NearlyFreeSpeech")上，你需要：

{% highlight ruby linenos %}
RB_USER_INSTALL=true gem install jekyll
{% endhighlight %}

如果你在Windows操作系统上遇到像`Faild to build gem native extension`这样的错误，你可能需要安装[RubyInstaller DevKit](https://github.com/oneclick/rubyinstaller/wiki/development-kit,"RubyInstaller DevKit")

在OSX上，你可能需要升级RubyGems:

{% highlight ruby linenos %}
sudo gem update --system 
{% endhighlight %}

如果你见到`missing headers`这样的错误，你可能还需要安装为Xcode安装命令行工具你可以从[这里](https://developer.apple.com/downloads/index.action)下载。


##从LaTex到PNG##

Maruku本身是对从LaTex到PNG的转换是可选的，它是通过blahtex(Version 0.6)完成的。但是，blahtex必须和`dvips`一起在你的`$PATH`中。

（**注意**：[remi's fork of Maruku](http://github.com/remi/maruku/tree/master)并不会固定`dvips`的位置，除非你需要将它固定）


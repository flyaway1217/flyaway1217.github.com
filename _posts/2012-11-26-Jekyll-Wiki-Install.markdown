---
layout: post
title: 【译文】Jekyll的安装
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

##RDiscount##

如果你希望使用[RDiscount](http://github.com/rtomayko/rdiscount/tree/master)来渲染markdown，而不是[Maruku](http://maruku.rubyforge.org/),只要确保RDiscount被正确地安装：

{% highlight ruby linenos %}
sudo gem install rdiscount
{%  endhighlight %}

然后运行Jekyll，并使用以下的参数选项：

{% highlight ruby linenos %}
jekyll --rdiscount
{%  endhighlight %}

或者，如果你不想指定标志的话，你可以在你的`_config.yml`中写入如下代码：

{% highlight ruby linenos %}
markdown: rdiscount
{%  endhighlight %}


##Pygments##

如果你希望在你的文章中通过` highlight `标签实现代码高亮，你需要安装[Pygments](http://pygments.org/)。

###在OS X Leopard和Snow Leopard上###

它和Python2.6已经预装了：

{% highlight ruby linenos %}
sudo easy_install Pygments
{% endhighlight %}

或者在OS X中使用MacPorts:
{% highlight ruby linenos %}
sudo port install python25 py25-pygments
{% endhighlight %}

或者在OS X中使用HomeBrew

{% highlight ruby linenos %}
brew install python
/#export PATH="/usr/local/share/python:$(PATH)"
easy_install pip
pip install --upgrade distribute
pip install pygments
{% endhighlight %}

**注意**：Homebrew并不会为你链接到可执行文件。对于Homebrew默认的Cellar路径和Python2.7来说，确保把`/usr/local/share/python`添加到你的`PATH`中。想要了解更多信息，请查看[这里](https://github.com/mxcl/homebrew/wiki/Homebrew-and-Python)

### 在Archlinux上：###

{% highlight ruby linenos %}
sudo pacman -S python-pygments
{% endhighlight %}

或者使用python2版的pygments:

{% highlight ruby linenos %}
sudo pacman -S python2-pygments
{% endhighlight %}

**注意**:python2版本的pygments创建一个名为`pygmentize2`的可执行文件，然而Jekyll尝试寻找的是`pygmentize`。创建一个执行链接`# ln -s /usr/bin/pygments2 /usr/bin/pygmentize`或者使用python3版的pygments都是可以的。(这条建议似乎已经过时了，因为python2版的pygments现在确实安装pygmentize)

### 在Unbutu和Debian上 ###

{% highlight ruby linenos %}
sudo pat-get install python-pygments
{% endhighlight %}

### 在Fedora和CentOS上 ###

{% highlight ruby linenos %}
sudo yum install python-pygments
{% endhighlight %}

### 在Gentoo上 ###

{% highlight ruby linenos %}
sudo emerge -av dev-python/pygments
{% endhighlight %}



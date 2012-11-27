---
layout: post
titile: 【译文】Jekyll的使用
description: Jekyll使用方法的官方Wiki文档。希望对大家有所帮助
keywords: Jekyll,翻译,Usage,使用方式
category: 翻译
tags: Jekyll,Github
---

> 原文地址[https://github.com/mojombo/jekyll/wiki/usage](https://github.com/mojombo/jekyll/wiki/usage)

## 应用 ##
一旦[安装](http://flyaway1217.github.com/%E7%BF%BB%E8%AF%91/2012/11/26/Jekyll-Wiki-Install.html)好jekyll，建立一个**Jekyll**网站通常有以下几个步骤：

1. 建立网站的基本结构
2. 创建几篇文章，或者从你以前的博客平台[导入](https://github.com/mojombo/jekyll/wiki/Blog-Migrations)
3. 在本地运行并查看你的网站效果
4. 部署你的网站

##基础结构##

Jekyll的核心是一个文本转换引擎。它是基于这样的思路：把用你最喜欢的文本标记语言书写的文本提交给这个系统，在此处，文本标记语言可以是Markdown,Textile或者甚至是纯HTML语言，它将会把文本和一个或多个布局文件合并。通过这个过程，你可以修改你站点的URL路径，决定什么样的数据将会出现在你的博客布局中和完成一些其他事情。这是严格地按照正在编辑的文件中的设置完成的，最终的结果是面向网络的接口，即HTML文件。

一个基本的Jekyll站点结构如下所示：
{% highlight ruby %}
.
|-- _config.yml
|-- _includes
|-- _layouts
|   |-- default.html
|   `-- post.html
|-- _posts
|   |-- 2007-10-29-why-every-programmer-should-play-nethack.textile
|   `-- 2009-04-26-barcamp-boston-4-roundup.textile
|-- _site
`-- index.html

{% endhighlight %}

每个文件的概述如下：

### \_config.yml ###

存储[配置](https://github.com/mojombo/jekyll/wiki/Configuration)文件的数据，其中的大多数选项都能通过命令行中的指令来执行，但是把它们写入配置文件中，你就可以不必去记忆它们了。

### \_includes ###

这个目录存放能够被你的_layouts和_posts合并、匹配的文件，用来提高重用率。liquid 标签`include file.ext`能够用来引入局部模板文件_include/file.ext。

### \_layouts ###
该目录用来存放博库文章将会插入的网页布局模板，页面布局基于类似博客平台的“一个接一个”的原则，通过[YAML](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter)的前置数据来选择模板。liquid标签`{{ content }}`用于在布局页面中插入博客文章内容。




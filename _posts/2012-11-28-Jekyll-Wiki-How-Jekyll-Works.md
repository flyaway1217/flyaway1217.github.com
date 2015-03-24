---
layout: post
title: 【译文】Jekyll是如何工作的
description: Jekyll工作原理的官方Wiki文档，希望对大家有帮助。
category: Translation
keywords: Jekyll,work,Wiki,Jekyll工作原理,翻译
tags: Jekyll,Github
---

> 原文地址:[https://github.com/mojombo/jekyll/wiki/How-Jekyll-works](https://github.com/mojombo/jekyll/wiki/How-Jekyll-works)


# Jekyll的执行 #

命令行参数，默认设置和`_config.yml`(通过`Jekyll::configuration`方法)都能被用来创建一个`options`散列表，然后一个新的站点实例将被建立：

{% highlight ruby linenos %}
# Create the Site
site = Jekyll::Site.new(options)
{% endhighlight %}

在这之后，如果`--auto`选项被打开，**Jekyll**将会开始查看所需要的目录

{% highlight ruby linenos %}
if options['auto']
	require 'directiory_watcher'
	puts "Auto-regenerating enabled: #{source} -> #{destination}"
	# ...
esle
	puts "Building site:#{source} -> #{destination}"
	# ...
end
{% endhighlight %}

在`Jekyll::Site`类中有一个叫做`site.process`的主方法，整个站点就是通过这个主方法来生成的。最后，如果`--server`选项被指定，它就将会运行本地服务。

# 真实的过程 #

将源文件转换成站点文件所需要的全部工作都是由`site.process`这个函数负责完成的。在`lib/jekyll/site.rb`中：

{% highlight ruby linenos %}
def initialize(config)
	self.config=cofig.clone

	# Lots of configuration...

	self.reset
	self.setup
end

def precess
	self.reset
	self.read
	self.generate
	self.render
	self.cleanup
	self.write
end
{% endhighlight %}


`reset`和`setup`方法在站点初始化过程中被调用，用来重置它的内部数据结构，分别独立地载入库函数，插件，生成器和转换器。`process`将这些工作分派给以下6个办法：

- **reset**:初始化布局、分类和标签的哈希表，同时初始化文章、页面和静态文件的数组。
- **read**:从文件系统中获取站点数据，存放到站点的内部数据结构中。载入生成器和转换器。
- **generate**:调用每一个生成器的`generate`方法。
- **render**:为每一篇文章和页面调用`render`方法。
- **cleanup**:将所有页面、文章和静态文件都存储到`Set`中，删除其他所有文件(不使用的文件，空目录)。
- **write**:调用每一篇文章、页面和静态文件的`write`方法，将它们复制到目标目录下。

这使得插件在`generate`和`render`阶段变得更容易插入到Jekyll中，就像在[插件](https://github.com/mojombo/jekyll/wiki/Plugins)中说明的一样，你只需要实现正确的方法。




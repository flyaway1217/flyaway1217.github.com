---
layout: post
title: 【译文】Jekyll插件
description: Jekyll官方对插件的说明，希望对大家有所帮助。
category: 翻译
tags: Jekyll,Plugins
keywords: 翻译,Jekyll,Plugins
---

>原文地址:[https://github.com/mojombo/jekyll/wiki/Plugins](https://github.com/mojombo/jekyll/wiki/Plugins)

Jekyll的插件系统允许你创建自己的定制内容，在不修改jekyll源代码的情况下，你就可以运行你自己的定制代码。

##安装一个插件##
在你的站点根目录下，创建一个`_plugins`目录，你需要将你的插件放置在这个目录下面，插件是具有后缀名为`.rb`的文件，在Jekyll生成网站时，会调用这个目录下的插件文件。（除非在配置选项中，`safe`选项被打开。）

通常来说，你制作的插件是属于以下三种类别：

- **生成器**
- **转换器**
- **标签**

##生成器##

当你需要Jekyll创建基于你自己的规则的额外内容时，你可以自己制作一个生成器。举例来说，一个生成器如下所示：

{% highlight ruby  %}
module Jekyll
class CategoryPage < Page
    def initialize(site, base, dir, category)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'category_index.html')
      self.data['category'] = category

      category_title_prefix = site.config['category_title_prefix'] || 'Category: '
      self.data['title'] = "#{category_title_prefix}#{category}"
    end
  end

  class CategoryPageGenerator < Generator
    safe true
    
    def generate(site)
      if site.layouts.key? 'category_index'
        dir = site.config['category_dir'] || 'categories'
        site.categories.keys.each do |category|
          site.pages << CategoryPage.new(site, site.source, File.join(dir, category), category)
        end
      end
    end
  end

end
{% endhighlight %}

在这个例子中，我们的生成器将会在`categories`目录下为每一个分类创建一系列的文件，用`category_index.html`布局文件展示每个分类下的文章。	

生成器只需要实现一个方法：

`generate`:被生成字符串格式的内容。

##转换器##

如果你想要在你的站点中引入一种新的markdown语法，你可以引入并实现你自己的转换器。markdown和textile标记语法都是使用这个方法实现的。**请注意:Jekyll只会将那些拥有YAML前置数据的文件进行转化**。如果某个文件的首部没有YAML前置数据，Jekyll会忽略它，并不会将它传给转换器。

下面的转换器例子会将所有具有`.upcase`后缀名文章进行大写转换。

{% highlight ruby %}
module Jekyll
  class UpcaseConverter < Converter
    safe true

    priority :low

    def matches(ext)
      ext =~ /upcase/i
    end 

    def output_ext(ext)
      ".html"
    end

    def convert(content)
      content.upcase
    end
  end
end
{% endhighlight %}

一个定制的转化器至少需要实现3个方法：

- 1.`matches`: 被调用用来决定是否启用指定的转换器。
- 2.`output_ext`: 输出文件的后缀名，通常是`.hmtl`。
- 3. `convert`: 真正实现内容转换功能。

在我们的例子中，我们会检查文件名是否是以`upcase`结尾的，如果是，它就会使用选定的渲染器进行转换。它将会调用`UpcaseConvert#convert`来处理文章内容——在我们简单的转换器中，我们只是简单地将文章内容转换为大写，最后，当保存页面时，它也会用同样的方法处理具有`.html`后缀名的文件。

##标签##

如果你想在你的站点中引入自己定制的liquid标签,你可以使用Jekyll的标签系统。Jekyll内置的例子中,引入了`highlight`和	`include`标签。

在这个例子中，我们定制的liquid标签将会输出页面被渲染的时间：

{% highlight ruby %}
module Jekyll
  class RenderTimeTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      "#{@text} #{Time.now}"
    end
  end
end

Liquid::Template.register_tag('render_time', Jekyll::RenderTimeTag)
{% endhighlight %}

至少liquid标签必须被实现：

- 1.`render`:输出标签的内容

同时你必须在Liquid模板系统中注册你自己定制的标签，通过调用这个：

{% highlight ruby %}
Liquid::Template.register_tag('render_time', Jekyll::RenderTimeTag)
{% endhighlight %}

在上面的例子中，我们可以把下面的标签放置在页面文件的任何位置中：

{% highlight ruby %}
{ % render_time page rendered at: % }
{% endhighlight %}

然后我们将会在页面上得到以下内容：

{% highlight ruby %}
page rendered at: Tue June 22 23:38:47 -0500 2010
{% endhighlight %}


##Liquid过滤器##

你可以就像上面添加自己定制的标签一样，在Liquid系统中添加你自己定制的过滤器。过滤器是一个简单的模块，它将会把它的方法输出给liquid。每一个方法必须至少有一个参数，用来表示过滤器的输入，返回值是过滤器的返回值。

{% highlight ruby %}
module Jekyll
  module AssetFilter
    def asset_url(input)      
      "http://www.example.com/#{input}?#{Time.now.to_i}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)
{% endhighlight %}

**高级**：你可以通过`@context.registers`来访问`site`对象。举例来说，你可以像这样:`@context.registers[:site].config['cdn']`来访问全局配置文件(_config.yml)中的数据。

**标志**

当编写一个插件时，你需要知道两个标志：

- 1.`safe`:是一个布尔值变量，用来控制能否在安全模式下启用插件。在_plugins目录下站点指定的自定义插件（相对于Jekyll内核中的插件）永远不会在安全模式下运行，所以在大多数情况，你不需要担心这个设置。
- 2.`priority`:决定插件的载入顺序，合法的参数值：:lowest,:low,:normal,:high,:highest


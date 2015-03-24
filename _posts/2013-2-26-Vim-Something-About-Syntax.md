---
layout: post
title: Vim语法检测那些事
time: 2013-2-26
category: Vim
description: 本文仔细分析了Vim语法高亮的原理，阐述了如何定制一个自己的文件类型，并进行语法高亮。
tags: Vim,Markdown
keywords: Jekyll,Vim,Makrdown,语法高亮,Kramdown
---

自从开始使用[Jekyll](http://jekyllrb.com "Jekyll")写博客，markdown就成为了我的常用工具，我平时使用的编辑器是vim，强大的vim拥有大量的语法文件，这当中当然包括了markdown的语法高亮文件。但是，随着时间的推移，我发现基本的markdown语法高亮已经不太适合我的要求了，因为在[Jekyll](http://jekyllrb.com "Jekyll")里我使用的是[kramdown](http://kramdown.rubyforge.org "Kramdown")这个渲染引擎，它对markdown的语法进行了扩充，有用很多其他的特性(包括支持Latex、输入表格等)。因此，基础的markdown语法已经不能满足我了，因此针对kramdown的扩展了的语法，我想要自己写一个语法文件。在开始写语法文件之前，有必要先了解一下vim是如何对文件类型进行识别的，有助于更好的理解vim的启动过程。网上找了很久，关于vim是如何启动、如何读取配置文件的内容非常少，大多数都是教程都是告诉你该用什么命令，但是却不告诉你为什么要用这个命令。经过一个下午的苦苦搜索，并且加上自己查看vim手册，得出了一些成果，在此记录一下。

#配置文件的搜索路径#
首先需要知道的是，vim是可高度可定制化的编辑器，它在运行过程中都会维护一些内部的变量(或者叫做选项)，如常见的`number`,`incsearch`等，这些选项都会控制vim的一些具体属性，例如`set number`就会告诉vim打开行号，这样vim就会显示出每一行的行号(其实这样的选项vim中有很多，此处不再展开，想要完整了解，可以查看手册)。在这些选项中，有一个选项叫做`runtimepath`，这个选项中记录了vim启动时应该要读取的配置文件的目录(有点类似操作系统中的$PATH环境变量)，可以通过`set runtimepath`命令来查看(修改)。在windows上，默认是:

- ~/vimfiles
- 安装目录/vimfiles
- 安装目录/vim73
- 安装目录/vimfiles/after
- ~/vimfiles/after

在Linux上是:

- ~/.vim
- /var/lib/vim/addons
- /usr/share/vim/vimfiles
- /usr/share/vim/vim73
- /usr/share/vim/vimfiles/after
- /var/lib/addons/after
- ~/.vim/after

这些是vim的默认搜索配置文件的路径，需要注意的是，它是有顺序的，就是从上到下搜索的，以windows为例，最先查看的是~/vimfiles目录，最后查看的是~/vimfiles/after目录。每一个目录都是用逗号隔开的，我们可以在默认的基础上添加自己的配置文件搜索路径。因为关系着配置文件的读取，所以这个路径非常重要，建议不要乱改。

#自动命令#
vim拥有自己的独立脚本语言，是专门用来开发vim插件的，更多的vim脚本命令可以查看手册或上网查询。此处我只想说的是自动命令，一个自动命令是在某个事件发生时会自动执行的命令，可以引发一个自动命令的事件有很多，包括读写文件或缓冲区内容被改变等。vim对文件类型的识别就是依靠这个命令的。完整的命令如下:
{% highlight vim %}
:autocmd [group] {events} {file_pattern} [nested] {command}
{% endhighlight %}
举例:
{% highlight vim %}
:autocmd FileWritePre * call DateInsert()
{% endhighlight %}
上面这个命令的意思是，在事件FileWritePre发生时，调用DataInsert()函数。其中"*"是一个模式字串，用来匹配文件名，此例中要匹配的是所有文件。`autocmd`可以简写为`au`

#语法文件#
vim默认自带了大量的语法高亮文件，它有自己的语法，用来定义高亮的方式。具体的语法规则可以查看我[wiki上的笔记](http://wiki.zhouyichu.com/Vim/2012/12/03/Vim-Develop-Syntax/ "Vim自定义语法高亮")。此处的重点是语法文件是存放在安装目录的syntax目录下面的，所以，如果我们要自己写语法文件，我们就必须把语法文件放置到syntax目录下面。而syntax目录则是在上面的`runtimepath`指定的目录下。

还是以windows为例，打开`安装目录/Vim/vim73`，你会看到一个名为syntax的目录，这目录下面存放的就是所有vim自带的语法高亮文件。需要的注意的是，语法高亮文件的后缀名统一是.vim,文件名就是对应文件类型名，这一点不能弄错。例如，一个c语言的语法高亮文件的文件名就应该是c.vim，只有正确命名的文件才能被vim识别。你可以打开该目录下的任意一个文件，其中就是对应类型的文件的语法高亮规则。

#启动过程中的语法高亮#
vim的启动过程应该是比较复杂的，事实上，我自己都没有完全弄清楚，此处我只是针对语法高亮来简略的说一下vim的启动过程。

当vim启动时，它会首先读取`runtimepath`中指定的路径中的配置文件，当然，vim会读取很多的配置文件，但其中一个名为filetype.vim的配置文件是我们目前所需要的，可以打开这个文件看一下，你会发现这个文件中有很多`au`命令，如图所示。

![autocmd命令](/assets/image/posts/2013-2-26-Vim-Something-About-Syntax.png)

{{ site.tags_path }}

其中的命令是:
{% highlight vim %}
au BufNewFile,BufRead *.css setf css
{% endhighlight %}
这个命令就是之前我们提到的自动命令，它在告诉vim，在事件`BufNewFile`或`BufRead`发生时，对于所有文件名满足`*.css`模式的文件采用css的语法进行语法高亮显示。此时，vim就会到syntax目录下去读取对应的css.vim文件中的语法规则，然后对当前的文件进行语法高亮渲染。其中`BufNewFile`和`BufRead`这两个事件，顾名思义，就是在创建新文件或在读取某个已经存在的文件时所触发的事件。

#添加新的文件类型#
既然决定要自己写语法高亮文件，那就是我们先要自己定义一个新的文件类型(注意不要和原有已知的文件类型发生冲突)。我选择的文件类型是*.md，这个后缀名暂时还没有被使用。根据上文的分析，要使vim能够读取到这个新的文件类型，我们需要做以下几件事:

- 自己创建一个名为md.vim的语法规则文件，其中记录了该如何高亮*.md文件中的内容,并把这个文件放入安装目录下的syntax目录下。
- 修改filetype.vim文件内容，使vim能够正确认识你的文件类型，在其中添加如下的语句:
{% highlight vim %}
augroup filtypedetect
au BufNewFile,BufRead *.md setf md
augroup END
{% endhighlight %}
- 重启vim，一切搞定。

#不同的目录#
最后关于目录设置，还有几点要注意。虽然按照上述的步骤是可以让vim正确识别出新的文件类型，但是最好不要在原来的安装目录下修改，因为安装目录下的文件都是默认写好了的，经过很多人的反复检测，可以说是相当完美的，而如果你不小心修改错了，那可能会引起不小的问题。其实，也没必要非要在安装目录下修改，回头看看`runtimepath`中设置的路径，第一个搜索的路径其实是~/vimfiles(对于windows来说)，我们只要将自己的配置文件放入这个目录就行了，不需要去动安装目录的。

1. 新建~/vimfiles/syntax目录，自己创建一个名为md.vim的语法规则文件，并把这个文件放入这个目录中。
2. 在~/vimfiles目录中新建一个filetype.vim文件，输入上面的代码
3. 重启vim

按照这样的操作，不仅你实现了自己的语法高亮，还不会影响vim原来的文件结构。

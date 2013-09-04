---
layout: post
time: 2013-07-04
title: Vim自动插入文件头部
category: Vim
keywords: Vim,Vim脚本,自动插入
tags: Vim,Vim脚本
description: Vim一向以可高度定制而著称的，平时在写程序的时候，总是需要插入一些文件的头部信息，每次手打都嫌太麻烦，作为一个coder，所有重复的操作都应该用程序来实现。
---

Vim一向以可高度定制而著称的，平时在写程序的时候，总是需要插入一些文件的头部信息，每次手打都嫌太麻烦，作为一个coder，所有重复的操作都应该用程序来实现。比如在用[Jekyll](http://jekyllrb.com "Jekyll")写博客的时候，文章首行必须是YAML格式开头的数据，这些都是必须的但每次手工输入都觉得太麻烦了，此时，我们可以利用Vim的脚本功能来进行自动输入。由于我平时用的是Python，所以下面将以Python程序的头部信息为例。

#效果#

{% highlight python3 %}
#coding:utf-8
"""
Program: 
Description:
Author: Flyaway - flyaway1217@gmail.com
Date: 2013-07-04 21:21:55
Last modified: 2013-07-04 21:22:40
Python release: 3.3.2
"""
{% endhighlight %}

上述代码就是我的每个Python文件都需要的头部信息，其中的时间信息都是Vim自动填写的，这样就省去了每次都手工修改的麻烦，而且在每次保存的时候，Vim都会自动修改`Last modified:`这一项后面的时间，避免了每次手工填写会忘记的尴尬局面。


#Vim代码#

要完成上述自动填写的功能，Vim脚本如下所示

{% highlight vim %}
function! TitleInsert()
call setline(1,"#coding:utf-8")
call append(1,'""""')
call append(2,"Program: ")
call append(3,"Description: ")
call append(4,"Author: Flyaway - flyaway1217@gmail.com")
call append(5,"Date: " . strftime("%Y-%m-%d %H:%M:%S"))
call append(6,"Last modified: " . strftime("%Y-%m-%d %H:%M:%S"))
call append(7,"Python release: 3.3.2")
call append(8,'"""')
endfunction

function! DateInsert()
call cursor(7,1)
if search('Last modified') != 0
	let line = line('.')
	call setline(line,"Last modified: " . strftime("%Y-%m-%d %H:%M:%S"))
endif
endfunction

:map <F2> :call TitleInsert()<CR>ggjjA
:autocmd FileWritePre,BufWritePre *.py ks|call DateInsert()|'s
{% endhighlight %}


#脚本解释#

上述代码中，定义了两个函数，分别是`DateInsert()`和`TitleInsert()`。`DateInsert()`用来在文件保存时插入当前日期和时间，`TitleInsert()`用来插入文件头部信息。

{% highlight vim %}
:map <F2> :call TitleInsert()<CR>ggjjA
{% endhighlight %}

上述代码是一个映射命令，将F2键映射成一系列vim命令，首先是调用`TitleInsert()`函数，`<CR>`表示回车，'ggjjA'表示首先回到第一行，然后下移两行，最后将鼠标定位到行末。具体的命令就不多做解释了，详细解释可以查看参考资料。


{% highlight vim %}
:autocmd FileWritePre,BufWritePre *.py call DateInsert()
{% endhighlight %}

上述代码设置了一个自动命令，每当FileWritePre或BufWritePre事件发生时，vim都是自动调用`DateInsert()`函数。FileWritePre事件表示的是当写入新文件的时触发的事件，BufWritePre事件表示的事将缓冲区写回硬盘时触发的事件。因此，每次当我们保存文件的时候，vim都会自动调用`DateInsert()`函数，以实现自动插入修改时间。

##TitleInsert函数##

`TitleInsert()`函数用来插入文件的头部信息，其中调用了三个vim的内置函数，分别是`setline()`、`append()`和`strftime()`。`setline()`这个函数用来在指定行上插入内容，`append()`函数用来在指定行下一行中插入内容。利用这两个函数就可以在文件头部插入预定义的信息，如上面代码所示。而`strftime()`函数将会返回系统的当前时间，并且以参数给定的格式返回出来。vim中有着很多的内置函数，具体可以查看vim的官方手册。

代码中的`.`在vim中表示连接两个字符串。

##DateInsert函数##

`DateInsert()`是用来在保存文件时，自动修改头部信息中的`Last modified`中的时间。

`normal ms`表示首先调用vim在normal状态下时的命令`ms`，而`ms`表示将当前光标所在位置标识为s。

`call cursor(7,1)`表示将光标移动到第7行第1列的位置，其中`cursor`也是一个内置函数，表示设置光标的位置。

`call search('Last')`表示搜索字符串"Last"，因为在填写`Program`和`Description`这两项时，有可能会占用很多行，因此并不能保证`Last modified`一定在第7行，所以要从第7行开始搜索关键字"Last"，找到`Last modified`所在行的真正位置。`search()`也是vim内置函数。

`let line = line('.')`表示调用`line()`函数返回当前光标所在的行号。

然后调用`setline()`函数，将`Last modified`后面的时间修改为当前时间。

`normal 's`表示调用vim在normal状态下的命令`'s`，表示将光标恢复到之前标识为s的地方。

以上就是对上述vim脚本的说明。

#参考资料#

- vim自动给脚本加注释: [http://linux.chinaunix.net/techdoc/desktop/2007/09/21/968431.shtml](http://linux.chinaunix.net/techdoc/desktop/2007/09/21/968431.shtml)
- vim提供的内置函数: [http://hi.baidu.com/joenali/item/c3291433ae7aeb322f0f811c](http://hi.baidu.com/joenali/item/c3291433ae7aeb322f0f811c)
- IBM的Vim教程的第三部分: [http://www.ibm.com/developerworks/cn/linux/l-tip-vim3/index.html](http://www.ibm.com/developerworks/cn/linux/l-tip-vim3/index.html)

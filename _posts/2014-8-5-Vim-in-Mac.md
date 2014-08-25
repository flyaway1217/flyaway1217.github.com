---
layout: post
time: 2014-08-25
title: Mac中安装Vim7.4
category: vim
keywords: Vim7.4,Mac
tags: Vim
description: 在Mac中安装最新的Vim7.4
---

# Mac上的Vim

Mac本身其实是预装了Vim的，但是目前的系统中都是Vim7.3版本的，而最新的Vim已经是7.4版了，因此为了能够使用最新版的vim，必须要对Mac中的vim要么升级，要么重装。在折腾过程中，遇到了一些问题，这里记录，以鉴后人。

# 可选方案

**升级原生的Vim7.3**

这种方法貌似是最"干净"的，不会引入其他任何多余的东西，对于有洁癖的人这应该是一种比较好的方案。但是，这个方案也有缺点，那就是它会覆盖原生的Vim，会改变系统的默认设置，并且一旦升级过程中出现了问题，那你就再也没有可用的vim了。另外一个问题是，以后当你系统升级的时候，很有可能你自己的vim又会被新系统的vim给覆盖，这样会比较麻烦。

**使用MacVim**

这是一种比较好的方案，Vim官网上也是推荐使用这种方案的，MacVim是针对Mac系统特别定制的Vim版本，安装过程也很简单，网上一搜一大把。它功能上和vim完全一致，不会有任何的问题。要说这种方案其实已经算是一个完美的解决方案了，但是它有一点不太方便的地方，那就是不能直接在终端中使用vim，每次使用MacVim的时候都会单独开启一个窗口，有点类似于windows中的gvim。而我个人是比较习惯在终端中写代码的，因此这个方案还是不能满足我的需求。

**自己编译**

这是一种终极的方案，但是自己编译的时候注意要手动更改默认的安装目录，不然它就会覆盖原生的vim7.3，这样就会变成第一种方案了。将vim7.4安装在其他目录，然后在`.bash_profile`中添加一个`vim`命令的别名，将其指向新安装的vim7.4的目录，而不是原生的vim7.3目录。这个方案就能在终端中直接使用vim7.4了，并且不会对原生的vim7.3又任何影响。这个方案唯一的缺点大概就是会在系统中产生两个不同版本的vim了，这也许对一些有洁癖的人是难以接受的。


我自己最终选择了第三套方案，也就是自己编译新版本的vim.

# 重新编译

好了，现在让我们开始折腾吧。

- 首先上vim的[官网](http://www.vim.org/)下载vim7.4的源文件，地址是:http://www.vim.org/sources.php

- 新建目录`/opt/loacl`，这个目录就是用来存放我们新安装的vim7.4的，你也可以建立其他的目录，这里只是一个示例。

- 进入vim的源文件目录中，在终端中运行命令:
{% highlight bash  %}

./configure --with-features=huge --enable-pythoninterp=yes  --enable-cscope --enable-fontset --enable-perlinterp --enable-rubyinterp --with-python-config-dir=/usr/lib/python2.6/config --prefix=/opt/local

{% endhighlight %}
这个命令是完成对vim的一些配置选项，启用了python和ruby的支持特性，这还是比较重要的，因为vim中有些插件会使用python和ruby的，如果没有开启这些特性，有些插件是无法运行的。在这些配置命令中，最后一个`--prefix=/opt/local`是用来指明安装目录的，你也可以修改成你自己的目录。

在写配置命令的时候，需要注意的是，不能写上`--enable-gui`，这是开启gui特性的，但是我们是在终端环境下安装的，因此不能开启这个特性，否则会出现编译错误。

- 在终端中执行`make`命令.在make过程中，会出现一个错误，如下所示:

{% highlight bash %}
:info:build os_unix.c:830:46: warning: declaration of 'struct sigaltstack' will not be visible outside of this function [-Wvisibility]
:info:build         extern int sigaltstack __ARGS((const struct sigaltstack *ss, struct sigaltstack *oss));
:info:build                                                     ^
:info:build ./os_unix.h:88:21: note: expanded from macro '__ARGS'
:info:build #  define __ARGS(x) x
:info:build                     ^
:info:build os_unix.c:830:13: error: conflicting types for 'sigaltstack'
:info:build         extern int sigaltstack __ARGS((const struct sigaltstack *ss, struct sigaltstack *oss));
:info:build                    ^
:info:build /usr/include/signal.h:89:5: note: previous declaration is here
:info:build int     sigaltstack(const stack_t * __restrict, stack_t * __restrict)  __DARWIN_ALIAS(sigaltstack);
:info:build         ^
:info:build 1 warning and 1 error generated.
:info:build make[1]: *** [objects/os_unix.o] Error 1
:info:build make[1]: *** Waiting for unfinished jobs….)
{% endhighlight %}

解决方案也很简单，只需要在os_unix.h中加上`#include <AvailabilityMacros.h>`就可以了。

- 执行`make install`.执行完成之后，vim7.4就安装完成了。

- 添加`vim`命令的别名，在`.bash_profile`中添加一行`alias vim='/opt/local/bin/vim'`，然后在终端中执行`source ~/.bash_profile`

好了，现在你的Mac系统已经安装好了vim7.4了，现在可以开始愉快的工作了。

# 参考资料

- http://stackoverflow.com/questions/7211820/update-built-in-vim-on-mac-os-x
- http://www.jokerlin.us/2014/04/13/Vim74.html
- http://trac.macports.org/ticket/41774


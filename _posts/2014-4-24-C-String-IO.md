---
layout: post
time: 2014-04-24
title: C语言中的字符串and输入输出
category: Programming Language
keywords: C,strlen(),printf(),scanf()
tags: C,字符串
description: C语言中的有关字符串和输入输出的整理说明。
---

# 字符串

在C语言中，字符串是指一个或多个字符的序列，直接存储的在char数组中。用于存储字符串的数组末尾都会有一个`\0`字符，这个字符称为**空字符(null character)**，C语言用它来指明字符串结束的位置。所以，通常来说，一个字符串的存储空间要比它本身的长度多一个字节。

`\0`是一个非打印字符，它的ASCII码是0.

在C语言中单引号表示一个字符，而双引号表示一个字符串，这两者是不同的，这一点和Python有区别，需要多加注意。

## strlen()函数

`strlen()`函数是定义在`string.h`头文件中的，用于获取字符串的长度，它以**字符**{:.red}为单位给出字符串的长度。而`sizeof`也是用来获取变量所占空间长度的，但是`sizeof`以**字节**{:.red}为单位给出数据的大小。

对于`strlen()`函数来说，它在遇到`\0`时就停止计数了，而`sizeof`则返回的是整个变量所占空间的长度，如下代码所示:

`strlen`返回值的类型是`size_t`，也即是`unsigned int`;`sizeof`返回值的类型是`long unsigned int`


{% highlight c %}
#include<stdio.h>
#include<string.h>
int main()
{
    char c[40]="flyaway";
    printf("%lu\n",strlen(c));
    printf("%lu",sizeof(c));
}
{% endhighlight %}

上述代码输出为7和40，分别表示字符串实际的长度和字符串实际所占空间的长度。

# 预处理

C语言中的`#define`宏定义仅仅是简单的替换过程，它本身不是C语言的语句，因此不需要末尾不需要分号。

C语言在`limits.h`和`float.h`头文件中分别提供了整数类型和浮点类型的大小限制的详细信息。

`limits.h`中的一些符号常量如下图所示:

![](/assets/image/posts/2014-4-24-C-String-IO-0.png)

`float.h`中的符号常量如下图所示:

![](/assets/image/posts/2014-4-24-C-String-IO-1.png)

# printf()函数

`printf()`函数是通过**转换说明符(conversion specification)**来指定输出形式的，具体的转换说明符如下所示:

![](/assets/image/posts/2014-4-24-C-String-IO-2.png)

`printf()`的返回值是打印字符的数目，如果发生错误，就返回一个负值。

# scanf()函数

`scanf()`函数是以空白符(空格、制表符、换行符)来分割输入串的，其转换说明符和`printf()`类似。

`scanf()`主要有两个注意点:

1. 用`scanf()`来读取基本类型的数据时，要在变量之前加上`&`符号，这其实就是取出变量的地址。
2. 用`scanf()`来读取字符串的时候，不需要使用`&`,数组名本身就是地址。

`scanf()`函数返回成功读入的项目的个数，如果它没有读入任何项目，则返回0.

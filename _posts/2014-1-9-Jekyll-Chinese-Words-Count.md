---
layout: post
time: 2014-01-09
title: Jekyll中使用中文计数
category: 网络开发
keywords: Jekyll,中文字计数,中文,number_of_words
tags: Jekyll
description: Jekyll中统计中文字数
---

最近打算重构整个blog的架构，因为博客是运行在[jekyll](http://jekyllbr.com)之上的，所以特意重新阅读了一下jekyll的文档。发现jekyll中有一个比较有趣的`filter`:`number_of_words`，这个`filter`可以用来统计当前post中words个数，但是在测试中文的时候，出现了问题，原始的post文本是这样的:

![](/assets/image/posts/2014-1-9-Jekyll-Chinese-Words-Count-0.png)

经过渲染之后得到的html页面则是:

![](/assets/image/posts/2014-1-9-Jekyll-Chinese-Words-Count-1.png)

可以看到，字数很明显是不对的，觉得这是jekyll的一个bug，于是将这个问题提交到了github，jekyll的几位开发者给予了很多的帮助，原帖可以在[这里](https://github.com/jekyll/jekyll/issues/1921)查看，在几位开发者的帮助下，我知道了问题所在。

原因在于，jekyll中的`number_of_words`是根据空白或标点符号来分割words的，这样的实现方式非常的naive，老外的原文是:

> This filter is language dependent. The implementation is for now very naive. It returns the wrong word number even in English.

所以如果要统计post中的中文字数的话，最好不要使用`number_of_words`。

在几位开发者的帮助下，我找到了一种可以正确统计中文字数的方案，只需使用`liquid`本身自带的过滤器就行了，如下所示:


`{ { content | strip_html | strip_newlines | split: "" | size } }`

由于post中的`content`是经过渲染之后的文本，包含了很多html标签，为了正确统计字数，首先得通过`strip_html`和`strip_newlines`这两个过滤器将html标签过滤掉，然后通过`split`将文本切分成数组，最后通过`size`返回数组的大小。此时返回的结果就是需要统计的中文字数。

上述的几个过滤器都是`liquid`中的标准过滤器，具体说明请查看[这里](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers).

**Problem solved !**


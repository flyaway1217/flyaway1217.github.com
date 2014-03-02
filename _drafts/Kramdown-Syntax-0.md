---
layout: post
time: 2014-03-01
title: 【译文】Kramdown语法中文翻译-0
category: 翻译
keywords: Kramdown Syntex
tags: Kramdown Syntex
description: kramdown语法的中文翻译第一部分
---

> 原文地址:<http://kramdown.gettalong.org/syntax.html> 

说明: 当前文档是基于Kramdown 1.3.2版本

# Kramdown语法

**Kramdown**的语法是基于Markdown的语法的，但是在这基础之上又有所扩充，扩充的这些特点都取自于其他的Markdown的解释器，比如[Markuku][Markuku],[PHP Markuku Extra][PHP]和[Pandoc][Pandoc].然而，**Kramdown**试图提供一种更加确定的严格语法规则，因此它并不一定能和原始的Markdown语法相兼容.话虽如此，但是大多数的Markdown的文档都能被**kramdown**正确的解析.所有**Kramdown**与**Markdown**不一致的地方都会被高亮显示。


## 源文本格式(Source Text Formatting)

**Kramdown**的输入文本可以是任意的编码，比如ASCII,UTF-8或者ISO-8859-1,而输出的文本的将会保持同样的编码方式。

一篇**Kramdown**的文档主要由两种元素组成，分别是**块级元素(block-level)**和**内联元素(span-level)**:

- **块级元素(block-level)**用来定义一篇文档的主要结构，比如哪一部分是段落，哪一部分是列表，哪一部分是引用等。

- **内联元素(span-level)**用来标记一些小的文本部分，比如强调或链接。

**内联元素**只能出现在**块级元素**内部或者是其他**内联元素**的内部[^1]。

在本篇语法说明文档中，你会经常见到"第一列","第一个字符"等说法，这些"第一列"、"第一个字符"都是相对于当前的缩进层级的，因为有些**块级元素**会开辟新的缩进层级(比如:引用).**Kramdown**默认会在文本的第一列开辟一个新的缩进层级。


### 换行(Line Wrapping)

一些轻量级的标记语言在硬包装(hard-wrapped)的环境中不能很好的发挥作用。举例来说，许多邮件程序就是这种情况。因此，**Kramdown**的文档允许像段落和引用这些元素进行硬包装(hard-wrapped)，也就是说能够自动换行[^2]。在有些情况下，这被称为是" 惰性语法(lazy syntax)"。因为文本第一行的缩进或者前缀并不要求连续行。

**块级元素**总是在末尾满足以下条件时才会换行:

[test](#test)

- 一个空白行


[^1]: 也就是说内联元素是可以嵌套的。
[^2]: 原文是broken across lines，我不太确定理解的对不对。

[Markuku]: http://maruku.rubyforge.org/
[PHP]: http://michelf.ca/projects/php-markdown/extra/
[Pandoc]: http://johnmacfarlane.net/pandoc/

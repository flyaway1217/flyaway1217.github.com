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

一些轻量级的标记语言在硬换行(hard-wrapped)的环境中不能很好的发挥作用。举例来说，许多邮件程序就是这种情况。因此，**Kramdown**的文档允许像段落和引用这些元素进行硬换行(hard-wrapped)，也就是说能够自动换行[^2]。在有些情况下，这被称为是" 惰性语法(lazy syntax)"。因为文本第一行的缩进或者前缀并不要求连续行。

**块级元素**总是在末尾满足以下条件时才会换行:

- [一个空白行](#line-wrapping),一个[EOB标记行](#end-of-block-marker),一个[IAL 块](#inline-attribute-lists)或者是文档的末尾(比如一个[块边界](#block-boundaries) )
- 一个[HTML块](#html-blocks)

整篇**kramdown**的文档除了少数几个块级元素以外，都是能够换行的,这些块级元素*不*支持硬换行:

**[标题](#headers)**

: 通常来说标题不存在问题，因为标题总是独自占一行的。如果标题太长的话，那就需要用户使用html标签了.

**[围栏代码块](#fenecd-code-blocks)**

: 围栏代码块的定界符是不能够硬换行的，而定界符之内的内容也是不能硬换行的,因为这些内容是被当做原生代码[^3]。

**[定义列表](#definition list terms)**

: 每一个定义项(`<dt>`)都会单独占有一行，硬换行会引起开辟新的定义项.而定义(`<dd>`)本身是支持硬换行的。

**[表格](#tables)**

: 因为每一行都代表了表格中的一整行，所以在表格中是无法硬换行的。


需要注意的是，Kramdown并**不**{:.red}建议使用惰性语法来书写Kramdown文档，kramdown提供的灵活性影响了文档的灵活性，因此惰性语法不应该被使用。


### 制表符的使用

Kramdown假设制表符是设置成四的倍数，这在用制表符进行列表缩进的时候非常重要。另外，制表符只能用在每行的开头位置，制表符之前不能出现任何的空格符，否则渲染结果将是无法预测的.

### 自动和手动转义

根据输出的格式，经常有许多字符需要特殊对待。举例来说，当将一个Kramdown文档转换为HTML文档时，需要特别处理<,>和&等符号。为了方便的处理这些特殊的字符，它们会自动根据输出的格式正确地进行转义。

这就意味着，举例来说，你可以直接在Kramdown文档里自由的使用<,>和&,而不需要考虑在HTML实体中使用的情况，当你确实在一个HTML实体或HTML标签中使用这些符号的时候，Kramdown依然会得到正确的结果。

因为Kramdown确实使用了一些符号来标记文本，所以必须有一种方式来对这些字符进行转义，以保持它们原来的意义。Kramdown可以通过一个反斜杠来进行转义，比如你可以这样使用反引号:

下面是一些可以被转义的的符号列表:


{% highlight bash %}
This \`is not a code\` span!
{% endhighlight %}


|----+-----------|
| 测试 | 测试 |
|:-----:|:-------:|
| \  | 反斜杠 |
| .  | 句号 |
| $*$  | 星号 |
| _  | 下划线 |
| +  | 加号|
| - | 减号 |
| =  | 等号 |
| $`$  | 反引号 |
| ()[]{}<>  | 左右括号,方括号,中括号,尖括号 |
| #  | 井号 |
| !  |  感叹号 |
| <<  | left guillemet |
| >>  | right guillemet |
| :  | 冒号 |
| $\|$  | 管道符 |
| "  | 双引号 |
| '  | 单引号 |
| $  | 美元符 |
|----+-----------|

## 块级边界

块级元素会在一些称为**块级边界(Block Boundaries)**




[^1]: 也就是说内联元素是可以嵌套的。
[^2]: 原文是broken across lines，我不太确定理解的对不对。
[^3]: 这里的原文是"since everything between the delimiting is taken as is"，这里我想是作者写错了吧，我是按照自己的理解来翻译的。

[Markuku]: http://maruku.rubyforge.org/
[PHP]: http://michelf.ca/projects/php-markdown/extra/
[Pandoc]: http://johnmacfarlane.net/pandoc/

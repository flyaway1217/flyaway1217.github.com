---
layout: post
title: 【译文】Jekyll扩展的Liquid模板
description: Jekyll官方对扩展了的Liquid的说明，希望对大家有所帮助。
category: 翻译
tags: Liquid Extensions,Jekyll
keywords: 翻译,Liquid Extensions,Jekyll
---

> 原文地址:[https://github.com/mojombo/jekyll/wiki/Liquid-Extensions](https://github.com/mojombo/jekyll/wiki/Liquid-Extensions)

Jekyll使用[Liquid](http://liquidmarkup.org/)来处理模板数据。除了[标准的Liquid标签和过滤器](https://github.com/shopify/liquid/wiki/liquid-for-designers),Jekyll还增加一些它自己特有的:

##过滤器##

**日期-XML**

将时间转换成XML格式

`\{\{ site.time | date_to_xmlschema \}\}` => `2008-11-17T13:07:54-08:00`

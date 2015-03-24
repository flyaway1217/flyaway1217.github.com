---
layout: post
title: Jekyll个人博客中添加随机文章功能
time: 2013-3-9
category: Web-Developing
description: 首先声明的是，本人不是专业的前端开发者，这里使用的方法肯定不是最好的，但它完全满足了我的需求。它只使用到了jQuery。
keywords: jQuery,随机文章实现,javascript
tags: jQuery,javascript,前端
---

> 首先声明的是，本人不是专业的前端开发者，这里使用的方法肯定不是最好的，但它完全满足了我的需求。它只使用到了jQuery。

之前在一些[网站](http://linux-wiki.cn/wiki/)的中见到能够随机访问文章的功能，觉得非常cool，就想在自己的博客中引入这个功能。

我的博客是搭建在[github](https://github.com "github")上的，所有的页面都是通过[Jekyll](http://jekyllrb.com "Jekyll")的静态页面，是完全没有后台的，当然也没有数据库。这有点让我犯难，如果是类似[WordPress](http://cn.wordpress.org "wordpress")这种博客平台，只需在数据库中随机选取一篇文章，然后返回给用户。由于全是静态页面，不太可能在和服务器产生交互。

后来想到，其实是可以使用javascript来实现的，既然所有的文章都是静态页面，我只需要从所有的文章中随机选取一篇，然后将当前的链接地址进行替换就行了，让浏览器重新发起请求，只不过不再是原来的页面，而是一个随机选择的页面。

基于这样的想法，那我就需要能够读取到所有文章的信息，这用jQuery中的ajax是非常容易实现的，而且和后台完全无关，不需要后台的支持。获取所有的文章的信息之后，从中随机选取一篇，将其url地址返回出来，将当前页面的地址替换成返回出来的地址，也即让浏览器重新发起请求，这样就能够实现随机文章的访问了。


具体的流程是:

1. 利用[jQuery](http://jquery.com "jQuery")的`$.get`方法取得服务器上的atom.xml文件，这个文件是订阅文件，其中包含了整个博客中所有文章的信息。
2. 利用atom.xml中的信息，取得文章总数n
3. 随机生成一个介于0~n-1中的整数m
4. 从atom.xml中抽取出第m篇文章的url
5. 令`location.href=url`

具体代码如下:

{% highlight javascript %}

$(document).ready(function(){
$("#random").click(function(){
	$.get('/atom.xml',function(data){
	var $xml=$(data);
	entry=$xml.find("entry")
	n = entry.size()
	n = getRandom(n)
	url=entry.get(n)
	url=url.getElementsByTagName("link")[0]
	url=url.getAttribute("href")
	location.href=url

  })
	
})
	//随机数发生器
       function getRandom(n){return Math.floor(Math.random()*(n+1))}
});

{% endhighlight %}

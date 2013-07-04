---
layout: page
title: Flyaway's Blog
description: "Flyaway的博客"
---
<div class="row" id="home-page">
<article class="span8">
  {% for post in site.posts limit:5 %}
  <div class="row home-page-content">
    <aside class="span2">
	<div class="date">{{ post.date | date_to_string }}</div>
	<div class="tags">
	  <label>Tags:</label>{{ post.tags | array_to_sentence_string }}
	</div>
	<div class="category">
	  <label>Category:</label>{{ post.category }}
	</div>
    </aside>
    <article class="span6">
	<div class="title"><a href="{{ BASE_PATH  }}{{ post.url  }}">{{ post.title  }}</a></div>
	<div class="description">{{ post.description  }}</div>
	<div class="more"><a href="{{ BASE_PATH  }}{{ post.url  }} " class="btn">read more...</a></div>
    </article>
{%  if forloop.index != 5 %}
	<div class="post-footer">&nbsp;</div>
{% endif  %}
  </div>
  {% endfor  %}
</article>


<aside class="span4 ">
<div class="side-bar">My Wiki</div>
<a href="http://wiki.zhouyichu.com">
<img class="wiki_img" src="assets/themes/flying/images/wiki_logo.png" title="My Wiki"/>
</a>
  <div class="side-bar">文章分类</div> 
  <div>
	<ul class="tag_box">
	{% assign categories_list = site.categories  %}
	{% include JB/categories_list   %}
	</ul>
  </div>
</aside>
</div>
<div class="home-page-footer"><a href="/archive.html">查看所有{{ site.posts.size  }}篇文章...</a></div>

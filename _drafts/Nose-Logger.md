---
layout: post
time: 2015-08-12
title: Using Nose and Logger in Python
category: programming language
keywords: Nose, Logger, Python
tags: Nose, Logger, Python
description: Summary about using unit test(Nose) and logger in Python
---

# Nose

In the latest week, I am working on coding a parsing system from scratch which is large enough that I have to build a lot of different sub-modules. 
In this case, a unit test is needed to test these modules to ensure that each module is working correctly. 
Because I haven't used any unit test in previous coding experience, I spent some time learning how to make a unit test in Python. 
There are many unit test tools in Python, like PyUnit, pytest etc. 
One of the most widely used tools is [Nose][]. 
In this post, I am going to talk about the recent using experience about [Nose][].

## Usage

Before using Nose, you need to install it first. 
The easiest way to do this is installing Nose through pip:

{% highlight bash %}
pip install nose
{% endhighlight %}

After installing it, you can make your own unit test by using the `nosetests` command coming with Nose:

{% highlight bash %}
nosetests your_test_directory 
{% endhighlight %}

This the simplest example of Nose.

By the above command, any functions, classes, modules in `your_test_directory` that matches the configured regular expression (`(?:^|[\\b_\\.-])[Tt]est` by default) will be run as a test[^1]. 
For example:

{% highlight python3 %}
def  test_sum(a,b):
    assert a + b
{% endhighlight %}

## Nose fixtures

There are several fixtures in Nose[^2]:

- `setup_module/teardown_module`: run before/after anything else in this file. 

    Note: You have to use the exact names to get this work.

- `setup_class/teardown_class` with `@classmethod` decorator: run before/after any other test methods that in the same class.

    Note: You have to use the exact names and decorator to get this work.

- `setup_function/teardown_function` using `@with_setup`: run before/after a test function call.

    Note: You can use any function name you like, but you have to use the exact decorator `@with_setup`.

- `setup/teardown`: run before/after each test method call.

    Note: You have to use the exact name to get this work.

A complete example can be seen from the post [Nose Introduction][]. 
Thanks to Brain, I haven learned a lot from this post.

# Logger

[^1]: In other words, any functions, classes, modules has `test` or `Test` at a word boundary.
[^2]: In my personal view, fixtures in Nose are some special functions that will auto run before or after real test functions/methods.

[Nose]: https://nose.readthedocs.org/en/latest/
[Nose Introduction]: http://pythontesting.net/framework/nose/nose-introduction

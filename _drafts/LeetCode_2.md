---
layout: post
time: 2015-01-30
title: LeetCode解题报告2
category: LeetCode
keywords: LeetCode,解题报告
tags: LeetCode
description: 本篇报告解决4个问题,分别为Factorial Trailing Zeroes, Majority Element, Maximum Gap和Largest Number
---

# Factorial Trailing Zeros

> 题目: Given an integer $n$, return the number of trailing zeroes in $n!$.
>
> Note: Your solution should be in logarithmic time complexity.

**解题思路**:

题目的要求很简单，就是要求出$n!$的末尾有多少个$0$,且需要在$log$时间内完成。

那么我们首先要分析一下，在什么情况下$n!$的末尾会出现$0$呢？简单想一下，只要出现$5$的倍数的时候，就出现一个$0$.($5$乘上任何一个偶数就能得到$0$)

所以一个比较直接的想法是，只需要看一下$1$到$n$的范围内有多少是5的倍数就行。

但是这样真的行了吗？[^1]

有没有考虑过$25,75,125$?

实际上，我们需要计数的不是$5$的倍数，而是有多少$5$这个因子,有很多数含有不止一个$5$,比如$25,75,125$等.

首先，$n\div 5$能告诉我们有多少个$5$的倍数，也即有多少个数是含有一个$5$因子的.

而$n\div 25$能告诉我们有多少个$25$的倍数，也即有多少个数是含有两个$5$因子的.

依次类推，不断除以$5^i$，我们就能知道有多少个数是含有$i$个$5$因子的。

因此，剩下的工作就需要统计一共有多少个$5$因子，这里需要注意的是，$n\div 5$的时候，会把$n\div 25$也统计进去，因此累加时不需要乘上系数的。

具体C++代码如下[^2]:


{% highlight c++%}

int trailingZeroes(int n) 
{
    int result = 0;
    long  i = 5;
    for(i = 5; n / i > 0; i *= 5)
    {
        result += (n/i);
    }
    return result;
}
{% endhighlight %}

# Majority Element

> 题目:Given an array of size n, find the majority element. The majority element is the element that appears more than  $\lfloor n/2 \rfloor$ times.
>
> You may assume that the array is non-empty and the majority element always exist in the array.

这题也是很简单，要你找到一个数组中的众数，并且保证众数是存在的。

基本思想其实和玩「连连看」很相似，只不过现在是不同的元素会被消掉，而不是相同的元素。由于众数的数目大于$\lfloor \frac{n}{2} \rfloor$的，因此所有不同元素都被消掉之后，剩下的就一定是那个「众数」.

具体代码如下:


{% highlight c++ %}

    int majorityElement(vector<int> &num) 
    {
        int temp = num[0];
        int i = 1;
        int count = 1;
        for(i = 1; i < num.size() - 1;++i)
        {
            if(temp != num[i])
            {
                count--;
                if(count <= 0)
                {
                    temp = num[i+1];
                }
            }
            else
            {
                count++;
            }
        }
        return temp;
    }


{% endhighlight %}






[^1]: 第一次做的时候就犯了这个错误....-_-!

[^2]: 原来是用Python，尽管都说语言不重要，算法才重要，但是做算法题还是觉得C++更好一些。



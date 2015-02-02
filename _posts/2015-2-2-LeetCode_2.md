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

# Maximum Gap

> 题目: Given an unsorted array, find the maximum difference between the successive elements in its sorted form.
> 
> Try to solve it in linear time/space.
>
> Return 0 if the array contains less than 2 elements.
>
> You may assume all elements in the array are non-negative integers and fit in the 32-bit signed integer range.


这题相对来说会比较难一点，它给你一个乱序的数组，要求你输出这个数组在排好序的情况下，相邻元素之差的最大值，而且要在线性时间内完成。

由于有线性时间的约束，因此不可能先给数组进行排序，然后找出Maximum Gap.[^3]

那我们就是要在不排序的情况下，找出最大间隔。

这道题可以借鉴桶排序的算法，如果我们能将各个元素放入到不同的桶中，且能够保证产生最大间隔的那两个元素会被分在不同的桶中，那么我们只需要比较相邻桶中的最大值和最小值就可以了。

关键就在于如何进行对元素进行分组(放入不同的桶中),我考虑到的是，可以把这些元素之间的平均间隔作为桶的大小，如此一来的话，最大间隔一定会大于平均间隔，因此产生最大间隔的两个元素必然会落到相邻的两个不同组中。

那么，如何计算平均间隔呢？这个就比较简单了，只需要找出整个输入数组的最大值和最小值，然后除以元素个数。

假设整个数组元素个数为$n$,最大值和最小值为$A$和$B$，那么桶的大小为$step = \lceil \frac{A-B}{n-1} \rceil$.

那么对于任何一个元素$K$来说，它就属于第$\frac{K-B}{step}$个桶。将所有元素都放入相应的桶之后，只需要计算相邻桶之间的间隔就可以了，具体来说就是前一个桶的最大值和后一个桶的最小值之间的差。

具体代码如下:


{% highlight c++%}
    int maximumGap(vector<int> &num) 
    {
        if(num.size() < 2)
        {
            return 0;
        }

        int min = getMin(num) ;
        int max = getMax(num);
        int step =  (max - min) / (num.size() - 1 );

        if(step == 0)
        {
            step = 1;
        }

        vector<vector<int> > temp((max - min) / step + 1);
        vector<vector<int> > table;

        int i,j,index;
        int delta = 0;


        for(i = 0; i < num.size(); ++i)
        {
            index = (num[i] - min) / step;
            temp[index].push_back(num[i]);
        }


        for(i = 0; i < temp.size(); ++i)
        {
            if(temp[i].size() != 0)
            {
                table.push_back(temp[i]);
            }
        }

        for(i = 1; i < table.size(); ++i)
        {
            max = getMax(table[i-1]);
            min = getMin(table[i]);
            if(delta < (min - max) )
            {
                delta = min - max ;
            }
        }
        return delta;
    }



{% endhighlight %}

# Largest Number

> 题目:Given a list of non negative integers, arrange them such that they form the largest number.
>
> For example, given `[3, 30, 34, 5, 9]`, the largest formed number is `9534330`.
>
> Note: The result may be very large, so you need to return a string instead of an integer.]

这题比较简单，其实就是一个字符串的比较，不需要多说什么，就是有些细节需要注意一下。代码如下:


{% highlight c++%}
    string largestNumber(vector<int> &num) 
    {
        vector<string> strnum;
        int i;
        string reval;
        for(i = 0; i < num.size(); ++i)
        {
            strnum.push_back(to_string(num[i]));
        }

        sort(strnum.begin(), strnum.end(), comp);

        if(strnum[strnum.size()-1] == "0")
        {
            return "0";
        }

        for(i = strnum.size() - 1; i >= 0; i--)
        {
            reval += strnum[i];
        }

        return reval;


    }

    static bool comp(string &strA, string &strB)
    {
        if(strA + strB < strB + strA)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

{% endhighlight %}


[^1]: 第一次做的时候就犯了这个错误....-_-!

[^2]: 原来是用Python，尽管都说语言不重要，算法才重要，但是做算法题还是觉得C++更好一些。

[^3]: 基于比较的排序算法的最好结果是$n\log n$



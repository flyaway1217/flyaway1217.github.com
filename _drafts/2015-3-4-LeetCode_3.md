---
layout: post
time: 2015-03-04
title: LeetCode解题报告3
category: LeetCode
keywords: LeetCode,解题报告
tags: LeetCode
description: 
---


# Repeated DNA Sequences

> 题目: All DNA is composed of a series of nucleotides abbreviated as A, C, G, and T, for example: "ACGAATTCCG". 
>
> When studying DNA, it is sometimes useful to identify repeated sequences within the DNA.
>
> Write a function to find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.)
>
> For example,
>
> > Given `s ="AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"`
> >
> >  Output: `["AAAAACCCCC", "CCCCCAAAAA"]`

这题乍一看是字符串比较的题目，第一反应就是穷举所有可能的情况一个一个去比较。但是仔细想想，如果使用字符串比较的方式，一个一个字符去比较代价是比较大的。简单算一下，由于题目中限制字符串长度必须是10，因此，一共可能有的子串数目为$n-10$,其中$n$是给定DNA序列的长度。则，一共需要比较的次数为$10(n-10)^2$，是$O(n^2)$数量级的。

其实还有一种代价更小的方式，由于字符串的组成元素实际上只有4种，那么我们可以对这四个基本字符进行编码，将其映射为一个两位的二进制码。如此的话，长度为10的一个字符串，就可以被映射为一个整数，整数之间的比较总是要比字符串之间的比较来快。

具体来说，我们可以进行如下的映射:`A=00`,`C=01`,`G=10`,`T=11`,则字符串`AAAAACCCCC`就可以表示为`0101010101=341`.

上述就是本题的关键思想，剩下的就是比较一系列整数中是否有重复元素。

具体的代码如下:


{% highlight c++ %}
    vector<string> findRepeatedDnaSequences(string s) 
    {
        vector<string> reval;
        unordered_set<int> tmp;

        if(s.size() <= 10)
            return reval;

        unordered_set<int> container;
        int i,j;
        int num = init(s);
        container.insert(num);

        //bitset<32> mysets(num);
        //cout<<mysets<<endl;
        for(i = 1, j = 10; j < s.size(); ++i,++j)
        {
            num = num << 2;
            num = num | map(s[j]);
            num = num & 1048575;

            //bitset<32> myset(num);
            //cout<<myset<<endl;
            // if already existing
            if(container.find(num) != container.end() && tmp.find(num) == tmp.end())
            {
                reval.push_back(s.substr(i,10));
                tmp.insert(num);
            }
            container.insert(num);
        }

        return reval;
        
    }

    int init(string s)
    {
        int reval = 0;
        for(int i = 0;i < 10; ++i)
        {
            reval = reval << 2;
            reval = reval | map(s[i]);
        }
        return reval;
    }

    int map(char DNA)
    {
        if (DNA == 'A')
            return 0;
        else if(DNA == 'C')
            return 1;
        else if(DNA == 'G')
            return 2;
        else if(DNA == 'T')
            return 3;
        else
            return 0;
    }
{% endhighlight %}



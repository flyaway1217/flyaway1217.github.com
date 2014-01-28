---
layout: post
time: 2013-10-10
title: 全排列算法part2
category: 算法
keywords: 全排列,递归,字典序
tags: 算法,递归
description: 寻找一个序列的所有排列情况是一个非常常见的需求，在很多实际应用中都有这样的需求。本文分析了目前几种常见的求全排列的算法。
---

#Johnson-Trotter算法#

Johnson-Trotter算法的基本思想和[字典序算法]({% post_url 2013-09-28-Permutation-Generation-1 %} "字典序")很相似，在字典序算法中，试图寻找一种所有排列情况中的顺序关系，然后按照这种顺序依次计算排列情况。而在Johnson-Trotter算法中，是寻找一种相邻元素相互**交换**{: style="color:red"}的顺序，根据这种交换的顺序，依次计算排列。

在Johnson-Trotter算法中，每次循环都进行一次满足条件的相邻元素的交换，直到不存在满足条件的可交换的元素，此时说明所有排列的情况均已输出，算法结束。

具体过程如下：

1. 初始化所有元素的移动方向为左，输出序列本身
2. 移动最大的可移动的元素(当元素移动方向上的元素比自己小时，才能移动)
3. 反转所有比移动元素大的所有元素的移动方向
4. 重复2~3步，直到不能移动为止

##具体例子##

上面的算法流程有些抽象，现在举个例子来加深理解。假设现在要计算$\\{0,1,2\\}$所有排列。首先是将所有元素的移动方向为标记为向左，我们可以表示成这样:$\\{\overleftarrow{0},\overleftarrow{1},\overleftarrow{2}\\}$，然后根据算法流程中的步骤2，移动最大的可移动元素。这里的可移动元素是指在其移动方向上的相邻元素比自己小时，例如$\overleftarrow{1},\overleftarrow{2}$都是可移动元素，因为在他们的移动方向上(左移)的相邻元素:$0$,$1$分别比$1$,$2$小，而每次都只移动这些可移动元素中最大的那个项。接着，在每次交换完成之后，寻找所有比当前交换元素大的元素，将他们的移动方向反转一下。

下面列出$\\{1,2,3\\}$在计算过程中所有的情况:

$$
\begin{align}
&\{\overleftarrow{0},\overleftarrow{1},\overleftarrow{2}\}\\
&\{\overleftarrow{0},\overleftarrow{2},\overleftarrow{1}\}\\
&\{\overleftarrow{2},\overleftarrow{0},\overleftarrow{1}\}\\
&\{\overrightarrow{2},\overleftarrow{1},\overleftarrow{0}\}\\
&\{\overleftarrow{1},\overrightarrow{2},\overleftarrow{0}\}\\
&\{\overleftarrow{1},\overleftarrow{0},\overrightarrow{2}\}\\
\end{align}
$$

最后给出代码:

{% highlight cpp %}
//找到最大可移动项
int FindTheBiggest(int *arg,int *direction,int n)
{
    int i,k,j;
    int max = -1;
    k = -1;
    //print(direction,n);
    for(i = 0;i < n;++i)
    {
        j = i+direction[i];
        if(j < 0 || j > n){continue;}
        if(arg[i] > max && arg[j] < arg[i])
        {
            k = i;
            max = arg[i];
        }
    }
    return k;
}


//反转比移动项大的所有项的移动方向
void Reverse(int *arg,int *direction,int n,int k)
{
    int max = arg[k];
    int i;
    for(i = 0; i < n;++i)
    {
        if(arg[i] > max)
        {
            direction[i]*=-1;
        }
    }
}

//Johson-Trotter算法
//用-1表示移动方向是向左，1表示移动方向是向右
void perm3(int *arg,int n)
{
    int direction[n];
    int i;
    int k=0;
    int max;
    //初始化移动方向
    for(i = 0;i < n;++i)
    {
        direction[i] = -1;
    }
    while(k!=-1)
    {
        //print(arg,n);
        //print(direction,n);
        k = FindTheBiggest(arg,direction,n);
        max = arg[k];
        i = direction[k]+k;
        swap(arg[i],arg[k]);
        swap(direction[i],direction[k]);
        Reverse(arg,direction,n,i);
    }

}
{% endhighlight %}

#多进制算法#

其实这个算法也偶然在网上看到，我甚至都不知道这个算法叫什么，只能按照其基本思想，自己起了个名字，如果哪位知道这个算法本名是什么，请联系我。

第一次看到这个算法的时候，真的觉得被这个算法的巧妙技巧给震撼到了，但是后来在写代码实现的时候，发现其效率也不是很高。[^1]

[^1]: 甚至比递归还慢，这就解释了为什么这个算法不太知名。但是这个算法中蕴含的思想却十分巧妙，我觉得有必要记录一下。

这个多进制的算法，其思想和之前讨论过的各种算法都是不一样的。我们首先从最基本的情况开始:假设我们有一个长度为$n$的数列，首先取出第一个数字，然后取出第二个数字，此时第二个数字有两种放置的选择，可以放在第一个数字的左边或右边；接着取第三个数字，它将会有3种选择:左边、中间、右边；依次可以类推下去。多进制算法的精妙之处，是将这些可能的选择情况编码成为了一个数字:从左至右将可能放置的位置进行编号，从0开始。比如取出第三个数字时，它有左边、中间、右边三种选择情况，则着三种选择分别用$0,1,2$来表示。

我们可以设计一个数，比如是xyz，其中z是二进位的，y是三进位的，x是四进位的，分别代表第二个数字、第三个数字、第四个数字可以进行选择的情况，这样设计的话，我们就可以将一种排列的状态转换为一个多进制的数，只要能给定一个这样的多进制数，我们就能计算出其相应的排列情况。

现在先来举个例子:对于$\\{a,b,c\\}$来说，多进制数$10$就表示$\\{a,b,c\\}$的一种排列状态，具体过程是这样的:首先取出第一个字符a，然后取出第二个字符b，此时多进制数$10$中的$0$表示字符b放置在字符a的左侧，接着取出第三个字符c，此时多进制数$10$中的$1$就表示字符c要放置在字符串ba的中间，形成bca。这样，我们就根据一个多进制数生成了一中排列情况。

理解了多进制数的意义之后，现在的问题就是说，如何找出这样特殊的多进制数呢？这不禁让人想起了二进制数到十进制数的转化过程了，我们可以将同样的方法运用到这个多进制数上，将其转化为十进制数:$3 \times x + 2 \times y + 1 \times z$，具体来说，多进制数$10$可以通过$2 \times 1 + 1 \times 0= 2$转化为十进制数2。利用这个过程的逆过程，我们就能将一个十进制数转化为一个多进制数，然后再将这个多进制数转化成为一种排列情况。

下面还是以$\\{a,b,c\\}$为例，我写出了其所有排列情况的多进制数和十进制数:

$$
\begin{align}
&\{a,b,c\}\cdots[21]\cdots2\times2+1\times1=5\\
&\{a,c,b\}\cdots[11]\cdots2\times1+1\times1=3\\
&\{c,a,b\}\cdots[01]\cdots2\times0+1\times1=1\\
&\{c,b,a\}\cdots[00]\cdots2\times0+1\times0=0\\
&\{b,c,a\}\cdots[11]\cdots2\times1+1\times0=2\\
&\{b,a,c\}\cdots[20]\cdots2\times2+1\times0=4\\
\end{align}
$$

其中第一列是排列的情况，第二列是其相应的多进制数，最后一列是将多进制转化为十进制数的计算过程。我们可以惊奇地发现，其十进制数刚好是在$[0,3!)$的范围内！！

这样我们就能够遍历$[0,n!)$中的每一个数，将其转换为多进制数，然后再转化为排列情况，这样就能输出全部的排列情况了。

不得不由衷感叹这种方法的精妙之处！

虽然这种方法的想法是这么的巧妙，但是具体运行的时候还是会很慢，主要原因是需要遍历$n!$个数，这个遍历过程只要$n$稍微大一点，其运行速度就会变得很慢，更何况每次遍历都要进行十进制数到排列情况的映射操作。虽然这个算法的效率不高，但其中包含的思想，我认为值得深入理解。

最后给出代码仅供参考

{% highlight cpp %}
void order(int *arg,int idx,int n)
{
    int i,j,k;
    int myarg[n];
    int myidx = idx;
    myarg[0] = arg[0];
    for(i = 2; i <= n;++i)
    {
        k = myidx % i;
        for(j = i-1;j > k;--j)
        {
            myarg[j] = myarg[j-1];
        }
        myarg[k] = arg[i-1];
        myidx /= i;
    }
    //print(myarg,n);
}


void perm4(int *arg,int n)
{
    int i;
    int s = 1;
    for(i = 1;i <= n;++i)
    {
        s*=i;
    }
    //cout<<s;
    for(i = 0;i < s;++i)
    {
        order(arg,i,n);
    }
}
{% endhighlight %}

#参考资料#

1. [非递归排列算法](http://arieshout.me/2012/04/non-recursive-permutation-generation.html "非递归排列算法") 
2. [维基百科:Steinhaus–Johnson–Trotter algorithm](http://en.wikipedia.org/wiki/Johnson-Trotter "Steinhaus–Johnson–Trotter algorithm")
3. [Johnson-Trotter算法](http://08jibzhanglei.blog.163.com/blog/static/1116192232010325111024283/ "Johnson-Trotter算法")
4. [全排列的递归与非递归](http://www.cnblogs.com/davidluo/articles/1802838.html "全排列的递归与非递归")
5. [一个经典的全排列算法](http://llfclz.itpub.net/post/1160/278490 "一个经典的全排列算法")

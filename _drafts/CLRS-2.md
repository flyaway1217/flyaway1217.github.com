---
layout: post
time: 2014-08-01
title: 算法导论学习笔记2-第四章 分治策略
category: CLRS
keywords: CLRS,算法导论,分治策略
tags: CLRS,
description: 算法导论第四章学习总结——分治策略
---

# 分治策略

在[上一篇笔记]({% post_url 2014-7-31-CLRS-1 %})中，我们提到了一种算法设计策略:**归并排序**,当时没有深入展开，而本章会就这个算法策略展开一系列的分析和说明。

所谓**分治策略**，其基本思想就是将原问题**递归地**划分为一系列的**子问题**，不停地减小问题的规模，直到能够轻易解决，然后将各个子问题的解**合并**起来，还原为原来问题的解。简单来说就是**分而治之**！

其具体的递归步骤主要有以下三步:

- **分解(Divide)**: 将问题划分为一些子问题，子问题的形式与原问题一样，只是规模更小.
- **解决(Conquer)**: 递归地求解出子问题。如果子问题的规模足够小，则停止递归，直接求解.
- **合并(Combine)**: 将子问题的解组合成原问题的解.

但是，需要注意的是并不是所有可以**递归分解**的问题都是可以用**分治策略**来解决的，其中关键的一点是在递归过程中是否存在**overlap**，如果存在的话，那就不应该使用分治策略，在这种情况下，分治的结果会很差，此时我们可以使用另外一种算法策略来解决问题:**动态规划**.关于什么是**overlap**和**动态规划**,书中的后续章节都会有所涉及，这里只是过一个简单的提醒——**分治策略不是万能的**{:.red}。

# 分治算法举例

书中一共有三个使用了**分治策略**的算法，分别是**归并排序**,**最大子数组**以及**Strassen算法**,其中的Strassen算法比较罗嗦，这里就不举例了，大家可以去看书中的论述。

## 归并排序

这可以说是最基本的一个排序算法了，任何一个学习过编程的人都应该知道这个算法，这里为了完整性，简要说明一下。

> 归并算法:
>
> 1. 分解待排序的$n$个元素的序列成各自具有$\frac{n}{2}$个元素的两个子序列。(Divide)
>
> 2. 使用归并排序递归地排序这两个子序列。(Conquer)
>
> 3. 合并两个已经排好序的子序列。(Combine)

Python实现如下:

{% highlight python3 %}

def merge_sort(A):
    if len(A) == 1:
        return A
    else:
        mid = len(A) // 2
        left = merge_sort(A[:mid])
        right = merge_sort(A[mid:])
        result = merge(left,right)
    return result

def merge(left,right):
    i = 0
    j = 0
    result = []
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    else:
        if i < len(left):
            result += left[i:]
        if j < len(right):
            result += right[j:]
    return result

if __name__ == "__main__":
    #A = [1,3,4,5,1,2,3,20,2,345]
    A = [12,100,230,1,3,4,5,1,2,3,20,2,345]
    print(A)
    B = merge_sort(A)
    print(B)

{% endhighlight %}




## 最大子数组

问题描述:给定一个元素值有正有负的数组，从中找出一个子数组，使得其和在所有可能的情况中最大。

- Input: $[13,-3,-25,20,-3,-16,-23,18,20,-7,12,-5,-22,15,-4,7]$
- Output: $[18,20,-7,12]$

因为在所有的子数组中的，$18+20+(-7)+12=43$是最大的。

对于这个问题，我们同样可以使用**分治策略**来解决。如果我们将长度为$n$数组$C$以其中点为分界点，分解成两个长度为$\frac{n}{2}$的子数组$A$和$B$，那么最大子数组$K$必然存在于下面三种情况之一:

1. $K$存在于$A$中
2. $K$存在于$B$中
3. $K$包含$C$的中点，也即$K$横跨$A$和$B$

在这三种情况中，前两种很容易处理，只需要不断递归下去，直到终止状态，而对于第三种情况，我们需要在进行合并的时候，从中点开始向两边扩展，寻找可能的$K$,并将找到的结果和$A,B$中找到的$K$作比较，取其最大者。

终止条件: 不断的向下递归，直到数组中是剩下一个元素，返回该数组。

Python实现如下所示:


{% highlight python3 %}

def merge_maxsubsum(array,start=None,end=None):
    if start == None:
        start = 0
    if end == None:
        end = len(array) - 1
    if end >= len(array):
        raise Exception("The end is larger than the length!")
    if start == end:
        return (start,end,array[start])
    else:
        mid = (start + end ) // 2
        left  = merge_maxsubsum(array,start,mid)
        right = merge_maxsubsum(array,mid+1,end)
        across = merge_across(array,start,mid,end)
        return max([left,right,across],key=lambda x:x[-1])

def merge_across(array,start,mid,end):
    left_sum = mid
    left_max_sum = float("-inf")
    for i in range(mid,start-1,-1):
        left_sum += array[i]
        if left_sum > left_max_sum:
            left_max_sum = left_sum
            left_start = i
    right_sum = mid
    right_max_sum = float("-inf")
    for i in range(mid+1,end+1):
        right_sum += array[i]
        if right_sum > right_max_sum:
            right_max_sum = right_sum
            right_end = i
    return (left_start,right_end,left_max_sum + right_max_sum)

{% endhighlight %}


# 递归式的分析

书中一个讲解了三种解决递归式的方法，分别是:**代入法**,**递归树**和**主方法**.接下来会主要介绍这三种不同的方式

## 代入法

这其实是一种"瞎猜"的方式，基本思想就是猜出一个解，然后用数学归纳法验证。其主要步骤如下所示:

1. 猜测解的形式
2. 用数学归纳法求出解中的常数，并证明解是正确的。

**代入法**主要依靠的是人的经验和直觉，如果看到一个递归式能快速地反应出其解的形式，者无疑是最好的，但是这需要大量的练习才能做到。

## 递归树

这中方式就比较简单了，就是按照其递归过程，将原问题画成一棵递归树，从递归树中猜测解的形式，然后再利用**代入法**来进行验证。

## 主方法

这种方式主要是用来解决形如$T(n)=aT(\frac{n}{b})+f(n)$的递归式，其中$a\ge 1,b>1$是常数，$f(n)$是渐进函数。

这个式子可以做如下的理解: 将规模为$n$的问题分解为$a$个子问题，其中每个子问题的规模为$\frac{n}{b}$,而函数$f(n)$包含了问题分解和子问题合并的代价。

主方法主要由以下的定理构成:

> 主定理:
>
> 令$a\ge 1,b>1$是常数，$f(n)$是一个函数，$T(n)$是定义在非负整数上的递归式:
>
> $$ T(n) = aT(\frac{n}{b}) + f(n) $$
>
> 那么$T(n)$有如下的渐进界:
> 
> 1. 若对某个常数$\epsilon > 0$有$f(n)=O(n^{\log_b^{a-\epsilon}})$,则$T(n)=\Theta(n^{\log_b^a})$
>
> 2. 若$f(n)=\Theta(n^{\log_b^a})$,则$T(n)=\Theta(n^{\log_b^a} \lg n)$
>
> 3. 若对某个常数$\epsilon > 0$，有$f(n)=\Omega(n^{\log_b^{a+\epsilon}})$,且对某个常数$c<1$和所有足够大的$n$有$af(\frac{n}{b})\le cf(n)$,则$T(n)=\Theta(f(n))$

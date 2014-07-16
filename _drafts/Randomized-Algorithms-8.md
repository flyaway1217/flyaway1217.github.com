---
layout: post
time: 2014-05-19
title: 随机算法学习笔记8-Random Recurrence
category: 随机算法
keywords: 随机算法,Random Recurrence
tags: Randomized Algorithm
description: 随机算法学习笔记8,Random Recurrence
---

# Random Quicksort

在排序算法中，最常见的就是快排了，此处我们将介绍快排算法的随机版本，并且对其进行算法分析。

首先，随机版本的快排描述如下:

-----

如果$\vert S \vert > 1$：

1. 均匀地从$S$中选取一个$x$作为中心点
2. 将$S$分成两个子集$S_1,S_2$，其中$S_1$中的元素都要比$x$小，而$S_2$中的元素都要比$x$大.
3. 递归地对$S_1,S_2$进行排序

-------

排序算法的复杂度是用比较次数来进行衡量的，因此我们接下来就是要分析在随机版的快排算法中，元素比较次数的期望是多少。

## 分析

分析的基本思路是，任意两个元素发生比较的概率，然后利用期望的线性可加性来估计整个排序过程的比较次数。

假设输入的待排序的序列为$S$，令$a_i$表示序列中第$i$小的元素，令$X_{ij}\in \\{0,1\\}$来指示$a_i$和$a_j$是否发生比较。根据上述的算法描述，我们可以知道，只有当$a_i$或$a_j$被选为中心点时，它们才会发生比较。对于这样的情况，我们有如下的观测:

**观察1**: 任意一对的$a_i$和$a_j$最多只会比较一次。这是因为第一次比较之后，他们就会被分到不同的子集中了，而不同子集中的元素是绝不会再次比较的。正因为这样，对$X_{ij}$进行累加，我们就能够得到整体比较的次数。而比较次数的期望就是$$E\bigg[\sum\limits_{i=1}^n\sum\limits_{j>i}X_{ij}\bigg]$$,而根据期望的**线性可加性**，我们只需要分析$$E[X_{ij}]$$就行了。

**观察2**: $a_i$和$a_j$会发生比较当且仅当$\\{a_i,a_j \\}$仍然属于同一个子集，且其中之一被选为中心点.

**观察3**: 如果$a_i$和$a_j$仍然属于同一个子集，那么所有的$$\{a_i,a_{i+1},\cdots,a_{j-1},a_{j}\}$$都在同一个子集中。

**观察4**: 在每一次的排序中，如果要使得$a_i$和$a_j$分开在两个不同的子集中，那么中心点一定是在$$\{a_i,a_{i+1},\cdots,a_{j-1},a_{j}\}$$之中的。

**观察5**: $$\{a_i,a_{i+1},\cdots,a_{j-1},a_{j}\}$$中的任意一个元素都是以等概率选取的，这是因为在选取中心点的时候，是均匀的。

根据上述的观察，我们能够得到:

$$
Pr[a_i 和 a_j 发生比较] \le \frac{2}{j-i+1}
$$

所以$E[X_{ij}]=1\cdot Pr[a_i 和 a_j 发生比较]\le\frac{2}{j-i+1}$


利用期望的线性可加性:

$$
\begin{aligned}
E\bigg[\sum\limits_{i=1}^n\sum\limits_{j>i} \bigg] &= \sum\limits_{i=1}^n\sum\limits_{j>i}E[X_{ij}] \\
&\le \sum\limits_{i=1}^n\sum\limits_{j>i} \frac{2}{j-i+1} \\
&= \sum\limits_{i=1}^n\sum\limits_{k=2}^{n-i+1} \frac{2}{k} (Let k=j-i+1) \\
&le \sum\limits_{i=1}^n\sum\limits_{i=1}^n \frac{2}{k} \\
&= 2n\sum\limits_{k=1}^n \frac{1}{k} \\
&= 2nH(n)
\end{aligned}
$$

其中$H(n)$是第$n$个Harmonic number,它满足:

$$
H(n) = \ln n + O(1)
$$

因此，对于任意长度为$n$的输入来说，随机版的快排算法的比较次数的期望是$O(n\log n)$


# Random Recurrence

现在我们来看另外一个问题，在一个给定的集合$S$中，选取第$k$小的元素($1\le k\le n$).这个问题，我们之前已经讨论过了，有确定性的算法也有随机化的算法,受到快排算法的启发，我们可以设计另外的算法，来解决这个问题，该算法称为**RandomQS**.算法描述如下:

-------

**RandomQS(S,k)**

1. 如果$\vert S\vert = 1$，返回$S$;
否则从$S$中随机选择一个$x$,构建两个子集$S_1=\\{y\in S \vert y \le x\\},S_2=\\{y\in S \vert y > x\\}$

2. 如果$\vert S_1 \vert\ge k$，返回RandomQS($S_1$,k);如果$\vert S_1 \vert < k$,返回RandomQS($S_2$,k-$\vert S_1\vert$).

-------

这是一个递归的过程，我们不禁要问，要经过多少次递归才能得到结果？

如果用$T(n)$表示递归调用次数的话，那么显然$T(n)$是一个随机变量，且其满足如下的式子:

$$
T(n) = 
\begin{cases}
1 + T(n-X(n)) \quad n > 1\\
0 \quad n = 1
\end{cases}
$$

其中，$X(n)$也是一个随机变量，用来表示在每一次的递归调用中，被抛弃的元素的数目。具体来说，如果当$\vert S_1\vert \ge k$时，$X(n)=\vert S_2 \vert$;当$\vert S_1 \vert < k$时，$X(n)=\vert S_1\vert$.我们想要寻找$E[T(n)]$的上界。


## Token Game

其实上述递归中抛弃元素的过程，可以建立一种Token Game的模型：

- 初始化的时候我们有$n$个Token
- 在每一轮的运行中，我们独立的选取$0\le X(m)\le m$,而$X(m)$只依赖于当前的Token数目$m$，选取$X(m)$之后抛弃$X(m)$个元素。
- 当没有Token剩下时，游戏结束。

一共进行的轮数用随机变量$T(n)$表示.

这样的模型其实在实际应用中就很常见，比如随机化的数据结构[Skip List],优惠券搜集问题(Coupon Collector)和几何分布。

## Karp-Upfal-Wigderson bound

对于Token Game来说，存在如下的定理来帮助我们确定$T(n)$的上界:

> Theorem
> 
> 假设存在如下的递归过程:
>
> $$
> T(n)=\begin{cases} 
> 1 + T(n-X(n)) \quad n > c\\
> 0 \quad n = c
> \end{cases}
> $$



[Skip List]: http://en.wikipedia.org/wiki/Skip_list

---
layout: post
time: 2014-03-04
title: 随机算法学习笔记2-随机变量&期望
category: 随机算法
keywords: 随机算法,Random Varibles,Expectation
tags: Randomized Algorithm
description: 随机算法学习笔记2,这次的重点是随机变量、几个常见分布的期望以及相应的几个例子。
---

# 随机变量&期望

## 随机变量

> **定义**: 随机变量$X$是定义在样本空间$\Omega$上的一个实值函数$X:\Omega\rightarrow \cal{R}$

需要注意的是，随机变量在这里是一个**函数**{:.red},而不是一个**"变量"**{:.red},在没有特殊说明的情况下，这里的随机变量都是指离散的情况。



> **定义**: 两个随机变量是独立的，当且仅当
>
>   $$ Pr[(X=x) \wedge (Y=y)] = Pr[X=x] \cdot Pr[Y=y]  $$

这和事件独立的定义很相似。

## 期望

> **定义**: 离散随机变量的期望$E[X]$定义如下:
>
>    $$ E[X] = \sum\limits_{x\in X}xPr[X = x] $$


> **定理(期望的线性可加性)**: 对于任意的随机变量$X_1,X_2,\cdots,X_n,$和实数$a_1,a_2,\cdots,a_n$,均有
>
> $$ E[\sum\limits_{i=1}^na_iX_i] = \sum\limits_{i=1}^n a_i\cdot E[X_i] $$

上述定理可以理解成**"和的期望=期望的和"**{:.red}

证明:

要证明上述的定理，我们首先需要证明两个等式:

- $E[X+Y] = E[X] + E[Y]$
- $E[cX] = cE[X]$

上述两个等式的证明非常简单:

第一个等式:

$$
\begin{aligned}
E[X+Y] &= \sum\limits_{x\in X,y\in Y}(x+y)Pr[X=x,Y=y] \\
&= \sum\limits_{x\in X,y\in Y}xPr[X=x,Y=y] + \sum\limits_{x\in X,y\in Y}yPr[X=x,Y=y] \\
&= \sum\limits_{x\in X}xPr[X=x] + \sum\limits_{y\in Y}xPr[Y=y]\\
&= E[X] + E[Y]
\end{aligned}
$$

第二个等式:

$$
\begin{equation}
E[cX] = \sum\limits_{x\in X}cxPr[X=x] = c\sum\limits_{x\in X}xPr[X=x] = cE[X]
\end{equation}
$$

有了上述两个等式之后，我们可以用归纳法来证明这个定理:

$n=2$时:

$$
\begin{aligned}
E[a_1X_1 + a_2X_2] &= E[a_1X_1] + E[a_2X_2] \\
&= a_1P[X_1] + a_2P[X_2]
\end{aligned}
$$

假设$n=k-1$时，$E\big[\sum\limits\_{i=1}^{k-1}a\_ix\_i\big] = \sum\limits_{i=1}^{k-1}a\_iE[x\_i]$成立，则当$n=k$时:

$$
\begin{aligned}
E\big[ \sum\limits_{i=1}^ka_iX_i \big] &= E[\sum\limits_{i-1}^{k-1}a_iX_i + a_kX_kA] \\
&= E\big[ \sum_{i=1}^{k-1} a_iX_i \big] + E[a_kX_k] \\
&=  \sum\limits_{i=1}^k a_iE[X_i]\\
\end{aligned}
$$


$\Box$

----------------------

**期望的线性可加性**这个定理非常有用，因为它没有任何的附加的条件，不管是否独立，这个定理**总是成立**{:.red}的。


> **定义**: 对于随机变量$X$和$Y$来说，**条件期望**定义为:
>
>  $$ E[X\vert Y = y] = \sum\limits_{x\in X}xPr[X=x\vert Y=y] $$


> **定义**: 对于随机变量$X$和$Y$来说，**总期望**定义为:
>
>  $$ E[X] = \sum\limits_{y\in Y}E[X\vert Y=y] \cdot Pr[Y=y] $$

## Union Bound

[Union Bound][Boole's inequality]是指一个不等式，这个不等式在概率论中经常被用到，它的描述如下:对于任何的有限或可数事件集合，至少一个事件发生的概率不大于所有独立事件的概率和。

对于事件集合$A\_1,A\_2,\cdots$,我们有:

$$
\begin{equation}
Pr[\mathop{\cup}_i A_i] \le \sum\limits_i Pr[A_i]
\end{equation}
$$


# 三种常见的分布

## 伯努利分布(Bernoulli Distribution)

[伯努利分布][Bernoulli]描述了单个抛硬币的情况，以$p$的概率出现正面($1$)，而以$1-p$的概率出现反面($0$)。

如果$X$服从与伯努利分布，则:

$$
\begin{equation}
X=
\begin{cases}
1 \quad p\\
0 \quad 1-p
\end{cases}
\end{equation}
$$

可以看到，对于伯努利分布来说，$E[X]=p$

## 几何分布(Geometric Distribution)

重复投掷一个硬币直到第一次出现正面,其中的每一次的投掷都是服从伯努利分布的.

令$X$表示一共投掷了多少次的随机变量，则我们称$X$服从于参数为$p$的[几何分布][Geometric]:
$$
\begin{equation}
Pr[X=k] = (1-p)^{k-1}p
\end{equation}
$$


对于几何分布来说，我们可以直接利用插值法来计算几何分布的期望，但是，其实还有一种更加巧妙的方法来计算其期望。

令$Y\_k$表示一个布尔值，当前$k$次投掷都没有出现正面时，$Y\_k =1$，否则$Y\_k=0$.很显然，我们有$E[Y\_k]=(1-p)^k$,且$X=\sum\limits_{k=0}^{\infty}Y\_k$

则利用期望的线性可加性:

$$
\begin{equation}
E[X] = E\bigg[\sum_{k=0}^{\infty}Y_k\bigg] = \sum_{k=0}^{\infty}E[Y_k] = \sum_{k=0}^{\infty}(1-p)^k = \lim_{k\rightarrow \infty}\frac{1-(1-p)^k}{p} = \frac{1}{p} 
\end{equation}
$$

## 二项分布(Binomial Distribution)

如果我们将硬币投掷$n$次，每一次投掷都是服从伯努利分布的，用$X$表示在这$n$投掷中出现正面的次数，则$Pr[X=k]=\binom{n}{k}(1-p)^{n-k}p^k$

通常来说，我们用$B(n,p)$来表示一个[二项分布][Binomial]。

我们可以利用期望的线性可加性来计算二项分布的期望:

令$X\_i$表示事件"第$i$次投掷为正面"，也即当第$i$次投掷为正面时，$X\_i=1$，否则$X\_i=0$.

显然有$X=\sum\limits_{i=1}^nX\_i$，且$E[X\_i]=p$,所以:

$$
\begin{equation}
E[X] = E\bigg[\sum\limits_{i=1}^nX_i\bigg] = \sum\limits_{i=1}^nE[X_i] = np
\end{equation}
$$
 

# 问题举例

## 优惠券搜集问题(Coupon Collector)

优惠券问题是我小时候常常被坑的一种把戏，某个卖干脆面的商家在每一包的干脆面中都会放置一张小卡片，每一张小卡片都代表一个历史或武侠小说(三国、水浒等)中的人物，如果你能够集齐所有的人物卡片，那么商家会赠送一个大奖给你。这对于小学生来说，是非常具有诱惑力的[^1]。

现在我们可以用数学的方式来看一下这种营销模式，我们首先假设商家的这些卡片人物都是均匀分布的[^2],那么我们将整个问题建模成一个小球投掷的问题: 假设我们有$n$个空箱子(卡片人物)，每次都任意地向其中一个箱子投掷一个小球(买一包干脆面)，每次投掷都是独立的，且是均匀分布的。那么，现在的问题是平均需要投掷多少次小球，才能使所有的箱子都是非空的。

令$X$表示最终投掷小球的数目，这样我们的目标就变成了计算$E[X]$.

令$X\_i$表示有$i-1$个箱子非空时，需要投掷多少个小球才能变成有$i$个箱子非空。根据这样的建模，我们有$X=\sum\limits\_{i=1}^n X\_i$.


其次，很显然，$X\_i$是一个几何分布,且对于每一次的投掷来说，投入到一个空箱子的概率是$p\_i=1-\frac{i-1}{n}$,因此我们有

$$
\begin{equation}
Pr[X_i=k] = (1-p_i)^{k-1}p
\end{equation}
$$

所以$E[X\_i]=\frac{1}{p\_i}=\frac{n}{n-i+1}$

利用期望的可加性，我们有:


$$
\begin{equation}
E[X] = E\bigg[ \sum\limits_{i=1}^n X_i \bigg] = \sum\limits_{i=1}^n E[X_i] = n\sum\limits_{k=1}^n\frac{1}{k} = nH(n)
\end{equation}
$$

上式中的$H(n)$表示第$n$个**调和数**。

又因为$H(n)=\ln n + O(1)$，所以为了能够集齐所有的卡片，我们平均需要购买$n\ln n+O(n)$袋干脆面。

## 负载问题(Occupancy Problem)

我们可以继续来看一下小球投掷的模型，在[优惠券搜集](#coupon_collector)的问题中，我们考虑的关注点在于有多少个箱子是非空的，而在这里，我们考虑的是，每个箱子最多会被投掷多少个小球。

这种模型的一种典型应用就是大型网站的流量分配，对于大型门户网站来说，它的服务器集群都是上百台服务器，如何分配流量请求使得这些服务器不会出现负载过重的现象是非常重要的。要分析类似的负载问题时，我们就可以利用小球投掷来建模。

假设现在有$m$个小球需要投掷到$n$个箱子中，我们首先来看一下**平均情况**下每一个箱子的负载情况:

令$X\_i$表示第$i$个箱子被投掷的小球数，很显然我们有$\sum\limits\_{i=1}^nX\_i=m$，利用**期望的可加性**,我们有:

$$
\sum\limits_{i=1}^nE[X_i] = E\bigg[\sum\limits_{i=1}^nX_i\bigg] = E[m]=m
$$

又因为我们每一次的投掷都是均匀分布的，且是独立的，因此可以得到$E[X\_i]=\frac{m}{n}$

可以看到，在均匀分布且每次投掷都是独立的情况下，每一个箱子的负载$E[X\_i]=\frac{m}{n}$.

----------------------

在实际情况下，除了平均情况以外，我们通常比较关注的是最坏情况，也就是一个箱子在最差情况下它的负载是多少。我们现在就来分析一下这样的最坏情况:

令$M$表示某一个箱子在最坏情况被投掷的小球数目，而我们的任务就是要计算$Pr[\max\limits\_{1\le i\le n} X\_i\ge M]$,首先利用[Union Bound](#union_bound),我们有:

$$
\begin{equation}
Pr[\max\limits_{1\le i\le n} X_i\ge M]=Pr\bigg[\mathop{\cup}_i(X_i\ge M)\bigg] \le\sum_{i=1}^nPr[X_i \ge M] = nPr[X_1\ge M]\label{ref0}
\end{equation}
$$

上式中中间的不等号是因为[Union Bound](#union_bound),最后一个等号是因为$X\_i$是均匀分布且独立的。

现在我们的问题就变成了估算$Pr[X_1\ge M]$,表示第一个箱子至少被投入$M$个小球的概率。很显然，我们有:

$$
Pr[X_1=M] = \binom{n}{M}(\frac{1}{n})^M\Rightarrow Pr[X_i\ge M] \le \binom{n}{M}(\frac{1}{n})^M
$$


对于右侧的不等式，我们可以继续计算:

$$
\begin{aligned}
Pr[X_i\ge M] \le\binom{n}{M}(\frac{1}{n})^M &= \frac{n!}{(n-M)!\cdot M!\cdot n^M}\\ 
&= \frac{n\cdot(n-1)\cdot (n-2)\cdots(n-M+1)}{M!\cdot n^M} \\
&= \frac{1}{M!} \cdot \prod_{i=0}^{M-1}(1-\frac{i}{n})\le\frac{1}{M!}
\end{aligned}
$$

利用[Stirling逼近][Stirling],我们有$M!\approx \sqrt{2\pi M}(\frac{M}{e})^M$,因此:

$$
\begin{equation}
Pr[X_i\ge M] \le \frac{1}{M!} \approx \frac{1}{\sqrt{2\pi M}(\frac{M}{e})^M} \le (\frac{e}{M})^M
\end{equation}
$$

将这个结果代回$\ref{ref0}$中:

$$
\begin{equation}
Pr[\max\limits_{1\le i\le n} X_i\ge M] \le n\bigg(\frac{e}{M}\bigg)^M
\end{equation}
$$

当$M=\frac{3\ln n}{\ln\ln n}$时[^3],我们有:

$$
\begin{aligned}
Pr\bigg[\max\limits_{1\le i\le n} X_i\ge M\bigg] &\le n\big(\frac{e}{M}\big)^M \\
& = n \cdot \bigg(\frac{e\ln\ln n}{3\ln n} \bigg) ^ {\frac{2\ln n}{\ln\ln n}} \\
&< n \cdot \bigg(\frac{\ln\ln n}{\ln n} \bigg) ^ {\frac{2\ln n}{\ln\ln n}} \\
&= n \cdot e^{\frac{3(\ln\ln\ln n-\ln\ln n)\ln n}{\ln\ln n}} \\
&= n \cdot e^{\frac{-3\ln n+3\ln\ln\ln n\ln n}{\ln\ln n}} \\
&\le n\cdot e^{-2\ln n} \\
& = n \cdot \frac{1}{n^2}\\
& = \frac{1}{n}
\end{aligned}
$$

因此，我们可以得出结论:

$$
\begin{equation}
Pr\bigg[\max\limits_{1\le i\le n} X_i\ge \frac{3\ln n}{\ln\ln n}\bigg] \le \frac{1}{n}
\end{equation}
$$


# 总结

随机算法的很多问题在于怎么建模，比如之前的计算几何分布和二项分布的期望的时候，将随机变量设置成一个$\\{0,1\\}$的布尔值，这就在很大程度上简化了计算难度，很容易就能计算其期望。

另外常见的不等式(Union Bound)，分布都要比较熟悉，这样才能在遇到具体问题时灵活应用。


[^1]: 当年被这玩意坑了很多钱。-.-!

[^2]: 事实上，对于商检来说，是不可能做成均匀分布的。

[^3]: 这一步纯粹是靠经验凑出来的结果，为了简化后面的化简过程。这一数值是直接参考老师上课的讲义。


[Bernoulli]: http://en.wikipedia.org/wiki/Bernoulli_distribution

[Geometric]: http://en.wikipedia.org/wiki/Geometric_Distribution

[Binomial]: http://en.wikipedia.org/wiki/Binomial_distribution

[Boole's inequality]: http://en.wikipedia.org/wiki/Union_bound

[Stirling]: http://en.wikipedia.org/wiki/Stirling's_approximation

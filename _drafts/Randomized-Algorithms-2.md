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

> **定义**: 随机变量$X$是定义在样本空间$\Omega$上的一个实值函数$X:\Omega\rightarrow \cal{R}$

需要注意的是，随机变量在这里是一个**函数**{:.red},而不是一个**"变量"**{:.red},在没有特殊说明的情况下，这里的随机变量都是指离散的情况。



> **定义**: 两个随机变量是独立的，当且仅当
>
>   $$ Pr[(X=x) \wedge (Y=y)] = Pr[X=x] \cdot Pr[Y=y]  $$

这和事件独立的定义很相似。

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



[Bernoulli]: http://en.wikipedia.org/wiki/Bernoulli_distribution

[Geometric]: http://en.wikipedia.org/wiki/Geometric_Distribution

[Binomial]: http://en.wikipedia.org/wiki/Binomial_distribution

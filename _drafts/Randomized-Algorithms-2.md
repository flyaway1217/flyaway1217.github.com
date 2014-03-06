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




# 问题举例



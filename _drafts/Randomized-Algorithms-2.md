---
layout: post
time: 2014-03-19
title: 随机算法学习笔记3-矩(Moment)和方差(Deviation)
category: 随机算法
keywords: 随机算法,Moment,Deviation
tags: Randomized Algorithm
description: 随机算法学习笔记2,这次的重点是两个常用的不等式(马尔科夫不等式和切比雪夫不等式)，方差以及相应的几个例子。
---

# 马尔科夫不等式(Markov's Inequity)

> **定理(Markov's Inequity)**:
>
> 假设$X$是一个取值为非负数的随机变量，则对于任何的$t>0$，满足如下不等式:
>
> $$ Pr[X\ge t] =\frac{E[X]}{t}  $$

证明:

令$Y$为一个布尔变量:

$$
Y=\begin{cases}
1 \quad X \ge t \\
0 \quad X < t
\end{cases}
$$

则$Y$很明显满足:$E[Y]=Pr[Y=1]=Pr[X\ge t]$，所以:

$$
\begin{equation}
Pr[X\ge t] = Pr[Y=1] = E[Y] \le E\bigg[\frac{X}{t}\bigg] = \frac{E[X]}{t}
\end{equation}
$$

$\Box$

----------------------------------------

[马尔科夫不等式(Markov's Inequity)][MarkovInequity]是一个非常有用的不等式工具，可以用来证明很多其他的不等式，包括后面将会说明的[切比雪夫不等式(Chebyshev's Inequity)][ChebyshevInequity].

## 应用举例

马尔科夫不等式一个典型应用是可以用来设计一个可以将[Las Vegas算法][LasVegas]转化为一个[Monte Calo算法][MonteCalo][^1]:

假设算法$A(x)$是一个针对某个判定问题的Las Vegas算法，且它运行时间的期望是$T(n)$,则我们可以设计一种方法将$A(x)$转化为具有**单边错误**的Monte Calo的算法$B(x)$:

-------------------------------
$B(x)$:

1. 运行$2T(n)$时长的$A(x)$算法。
2. 如果$A(x)$返回一个结果，则将该结果直接返回;如果$A(x)$没能返回结果，就直接返回1.

---------------------------

可以看到，$B(x)$是一个运行时间确定，但是返回结果不确定的算法，也即是Monte Calo算法。并且，只有当$A(x)$没有返回结果时，才有可能返回错误解。这是**False Postive**的单边错误类型。我们可以来计算一下$B(x)$返回一个错误的解的概率，在这计算过程中，我们就需要用到马尔科夫不等式了。
$$
\begin{equation}
Pr[返回错误解]\le Pr[A(x)的运行时间\ge 2T(n)] \le \frac{E[A(x)的运行时间]}{2T(n)} = \frac{T(n)}{2T(n)} = \frac{1}{2}
\end{equation}
$$


# 方差(Variance)

> **定义**: 一个随机变量$X$的方差定义为:
>
> $Var[X] = E[(X-E[X])^2] = E[X^2] - E[X]^2$ 
>
> 一个随机变量$X$的标准差定义为:
>
> $\delta[X]=\sqrt{Var[X]}$

需要注意的是，**方差**和**期望**不一样，是不满足线性可加性的。

> **定义**: 两个随机变量的协方差定义为:
>
> $Cov(X,Y)=E[(X-E[X])(Y-E[Y])]$

> **定理**: 对于任意的随机变量$$X_1,X_2,\cdots,X_n$$,有:
>
> $$Var\bigg[\sum\limits_{i=1}^n X_i \bigg] = \sum\limits_{i=1}^n Var[X_i] + \sum\limits_{i\neq j}Cov(X_i,X_j)$$

## 二项式分布的方差

## 切比雪夫不等式(Chebyshev's Inequity)

# 矩(Moment)

# 问题举例

## 中位数选择(Median Selection)

## 随机图(Random Graphs)

# 参考资料

- [wiki:Moment][Moment]
- [wiki: Markov's Inequity][MarkovInequity]
- [wiki: Chebyshev's Inequity][ChebyshevInequity]
- [wiki:Monte Calo algorithm][MonteCalo]
- [wiki:Las Vegas algorithm][LasVegas]



[Moment]: http://en.wikipedia.org/wiki/Moment_(mathematics)
[MarkovInequity]: http://en.wikipedia.org/wiki/Markov_inequality
[ChebyshevInequity]: http://en.wikipedia.org/wiki/Chebyshev%27s_inequality
[MonteCalo]: http://en.wikipedia.org/wiki/Monte_Carlo_algorithm "wiki: Monte Carlo algorithm"
[LasVegas]: http://en.wikipedia.org/wiki/Las_Vegas_algorithm  "wiki: Las Vegas algorithm"


[^1]: Las Vegas算法是指运行时间不确定，但是运行结果一定正确的一类随机算法。而Monte Carlo算法是指运行时间确定，但是运行结果不一定正确的一类随机算法。这两个算法的概念我在[随机算法学习笔记0-概率空间&计算模型]({% post_url 2014-2-28-Randomized-Algorithms-0 %})中详细说明了。


---
layout: post
time: 2014-07-03
title: 随机算法学习笔记6-Maringales
category: 随机算法
keywords: 随机算法,Maringales
tags: Randomized Algorithm
description: 随机算法学习笔记6,重点是Maringales模型。
---

# Continoal Expectation

[条件期望][CondtionalExpecation]是指，在给定条件的情况下，随机变量的期望值.条件期望可以表示成:

$$
E[Y\vert X=a]
$$

我们可以将条件期望看成是关于$X$的随即变量$f(X)$

假设$X,Y,Z$是三个任意的随机变量，$f,g$是任意的函数，则对于条件期望有如下的结论:

1. $E[X]=E\big[E[X\vert Y] \big]$.
2. $E[X\vert Z]=E\big[E[X\vert Y,Z]\vert Z \big]$
3. $E\big[E[f(X)g(X,Y)\vert X]\big]=E\big[f(X)\cdot E[g(X,Y)\vert X]\big]$(条件于$X$,因此可以将$f(X)$看成是一个常数，根据期望的线性可加性，就能够把$f(X)$提出来了)

# Martingales

[Martingales]描述的是一系列的随机变量，该序列的当前的随机变量依赖之前所有的历史随机变量[^1]，如果当前的随机变量的期望不发生变化，则这整个随机过程就被称为是[Martingales].

> 定义: Martingale
> 
> 一个随机变量序列$X_0,\cdots,X_{i-1}$是一个Martingale当且仅当对于所有的$i>0$，都有:
> 
> $$E[X_i \vert X_0,\cdots,X_{i-1}] = X_{i-1} $$

## 举例

假设我们投掷一个均匀的硬币，令$Z_j\in \\{-1,1\\}$表示第$j$次投掷的结果，令$X_0=0$和$X_i=\sum\limits_{j\le i}Z_j$，则随机变量$X_0,X_1,\cdots$定义了一个Martingale.

证明:

$$
\begin{aligned}
E[X_i\vert X_0,\cdots,X_{i-1}] &= E[X_i\vert X_{i-1}] \\
&= E[X_{i-1}+Z_i\vert X_{i-1}] \\
&= E[X_{i-1}\vert X_i] + E[Z_i\vert X_{i-1}] \\
&= X_{i-1} + E[Z_i\vert X_{i-1}]\\
&= X_{i-1} + E[Z_i] \\
&= X_{i-1}
\end{aligned}
$$


## Generalizations

Martingale还有更加一般化的定义，它不再只是一个只关于自己的随机序列，而是关于另外一个随机序列。

> 定义 Generalized Martingale
>
> 一个随机变量序列$Z_0,Z_1,\cdots$是一个关于$X_0,X_1,\cdots$的Martingale，当且仅当对于任意的$i>0$，满足下述三个条件:
>
> 1. $Z_i$是$X_0,X_1,\cdots,X_{i}$的函数
> 2. $E[\vert Z_i \vert] = \infty$
> 3. $E[Z_{i+1}\vert X_0,X_1,\cdots,X_i] = Z_i$

因此，如果一个随机变量序列$X_0,X_1,\cdots$是关于自己的Martingale，那么它自身就是一个Martingale.

# Azuma's Inequality

关于Martingale有一个比较重要的不等式，称为[Azuma's inequality],描述如下:

> Azuma's inequality
>
> 假设$X_0,X_1,\cdots$是一个Martingale，且对于所有的$k>1$，都有:
>
> $$\vert X_k - X_{k-1} \vert \le c_k$$
>
> 则
>
> $$Pr[\vert X_n-X_0 \vert \ge t] \le 2exp\bigg(-\frac{t^2}{2\sum\limits_{k=1}^n c_k^2}\bigg)$$.

# The Doob martingales

# Stoppinng Times

# Wald's Equation

# 总结

[^1]: 有点类似于Markov过程，只是依赖于之前所有的状态。

[CondtionalExpecation]: http://en.wikipedia.org/wiki/Conditional_expectation
[Martingales]: http://en.wikipedia.org/wiki/Martingale_(probability_theory)
[Azuma's inequality]: http://en.wikipedia.org/wiki/Azuma%27s_inequality

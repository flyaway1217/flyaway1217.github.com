---
layout: post
time: 2014-05-19
title: 随机算法学习笔记7-Concentraion of Measure
category: 随机算法
keywords: 随机算法,Concentraion of Measure
tags: Randomized Algorithm
description: 随机算法学习笔记7,重点是概率集中现象
---

# The Bounded Difference Method

在上一篇的[笔记]({% post_url 2014-7-8-Randomized-Algorithms-6 %})，我们分别讲到了[Martingales]中的**Doob sequence**和[Azuma's inequality],如果把这两个工具放到一起，会发生什么呢？如果把这两个工具组合起来，我们就能够得到一个称为"the method of averaged bounded differences"的定理.

> **Theorem:Method of averaged bounded differences**
>
> 令$\mathbf{X} = (X_1,\cdots,X_n)$表示任意的随机变量序列，令$f$表示关于$X_1,\cdots,X_n$的函数，并且对于所有的$1\le i\le n$满足:
>
> $$ \big\vert E[f(\mathbf{X})\vert X_1,\cdots,X_i] - E[f(\mathbf{X})\vert X_1,\cdots,X_{i-1}]\big\vert \le c_i $$
>
> 则
>
> $$Pr\big[\vert f(\mathbf{X}) - E[f(\mathbf{X}) ] \vert \ge t\big] \le 2exp\bigg( - \frac{t^2}{2\sum\limits_{i=1}^n c_i^2} \bigg) $$
> 

证明:

证明过程非常简单，需要定义$Y_i=E[f(\mathbf{X})\vert X_1,\cdots,X_i]$为一个[Doob Martingale]，然后直接套用[Azuma's inequality]就行了。

$\Box$

但是，在实际情况中，上述定理的条件是很难验证的，这就大大影响了该定理的使用。因此，这里我们将会介绍另外一个比较好验证的条件，称为[Lipschitz condition].其描述如下:

> Lipschitz condition
>
> 一个函数$f(x_1,\cdots,x_n)$对于任意的$x_1,\cdots,x_n$和$y_i$满足:
>
> $$ \vert f(x_1,\cdots,x_{i-1},x_i,x_{i+1},\cdots,x_n) - f(x_1,\cdots,x_{i-1},y_i,x_{i+1},\cdots,x_n) \vert \le c_i $$
>
> 则称其满足Lipschitz condition.

当随机变量序列满足[Lipschitz condition]时，有如下的定理(**注意:该定理的条件中，随机变量必须是独立的!**)

> Theorem(Method of bounded differnces)
>
> 令$\mathbf{X}=(X_1,\cdots,X_n)$表示$n$个独立的随机变量，令$f$表示一个满足Lipschitz condition的函数，则:
>
> $$ Pr[\vert f(\mathbf{X}) - E[f(\mathbf{X})] \vert \ge t ] \le 2exp\bigg( -\frac{t^2}{2\sum\limits_{i=1}^n c_i^2} \bigg)  $$
>

## Applications

# Dimension Reduction


# 参考资料


[Martingales]: http://en.wikipedia.org/wiki/Martingale_(probability_theory)
[Azuma's inequality]: http://en.wikipedia.org/wiki/Azuma%27s_inequality
[Doob Martingale]: http://en.wikipedia.org/wiki/Doob_martingale
[Lipschitz condition]: http://en.wikipedia.org/wiki/Lipschitz_condition

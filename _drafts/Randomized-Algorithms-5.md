---
layout: post
time: 2014-03-25
title: 随机算法学习笔记5-切尔诺夫界
category: 随机算法
keywords: 随机算法,Chernoff Bound,Packet Rounting
tags: Randomized Algorithm
description: 随机算法学习笔记5,主要说明Chernoff Bound的证明过程，及其相应的应用问题——Packet Routing问题。
---

# Chernoff Bound

[切尔诺夫界(Chernoff Bound)][ChernoffBound]通常是用来描述随机变量的和的取值在其**期望**附近的概率，在大多数情况下，随机变量都具有"集中"现象，也即概率较高的取值都集中在其**期望**附近。比如说抛硬币,抛一次硬币也许无法确定出现正面的概率，但是抛10000次之后呢？出现正反面的概率都稳定在了$\frac{1}{2}$附近，这就是"概率集中"现象，而**切尔诺夫界(Chernoff Bound)**就可以定量的来描述这种现象。

**切尔诺夫界(Chernoff Bound)**的证明主要用到了两个工具，一是[Markov不等式][MarkovInequity],一是[Moment Generating Functions][MomentGeneratingFunction].之前的几篇笔记中已经证明过**Markov不等式**了，所以这里先介绍一下**Moment Generating Function**.

## Moment Generating Functions

> 定义: Moment Generating Functions
>
> 随机变量$X$的Moment Generating Functions定义为:
>
> $$M_X(t)=E[e^{tX}]$$

从定义中可以看到，$$M_X(t)$$是关于$t$的函数，而不是$X$。利用如下的泰勒展开式:

$$
e^{tX} \approx 1 + tX + \frac{t^2}{2!}X^2 + \cdots + \frac{t^k}{k!}X^k = \sum\limits_{k=0}^\infty \frac{t^k}{k!}X^k
$$

我们可以得到:

$$
\begin{aligned}
M_X(t) = E[e^{tX}] &= E\bigg[\sum\limits_{k=0}^\infty \frac{t^k}{k!}X^k\bigg]  \\
&= \sum\limits_{k=0}^\infty E\bigg[\frac{t^k}{k!}X^k\bigg]
\end{aligned}
$$

因此，**Moment Generating Functions**这个函数实际上是包含了$X$的所有阶的信息.

## 证明Chernoff Bound

> 定理(Chernoff Bound)
>
> 假设$$X=\sum\limits_{i=1}^n X_i$$,且$$X_1,X_2,\cdots,X_n$$是独立的泊松实验[^1]，其中$$\mu=E[X]$$.
> 则对于任何的$$\delta > 0$$,有:
>
> $$Pr[X\ge (1+\delta)\mu]\le \bigg(\frac{e^{\delta}}{(1+\delta)^{1+\delta}}\bigg)^\mu$$


证明:

首先根据指数函数的递增性，我们有:

$$
X\ge (1+\delta)\mu \Leftrightarrow e^{tX} \ge e^{t(1+\delta)\mu}
$$

由此将原来的不等式和Moment Generating Functions联系了起来。利用Markov Inequity得到:

$$
Pr\bigg[e^{tX} \ge e^{t(1+\delta)\mu} \bigg] \le \frac{E[e^{tX}]}{e^{t(1+\delta)\mu}}
$$

然后我们计算$E[e^{tX}]$:

$$
\begin{aligned}
E[e^{tX}]&=E\bigg[e^{t\sum\limits_{i=1}^n X_i}\bigg]\\
&= E\bigg[\prod_{i=1}^n e^{tX_i} \bigg] \\
&= \prod_{i=1}^nE[e^{tX_i}]
\end{aligned}
$$

上述化简过程中的最后一个等号是因为$X_i$是相互独立的。

令$p_i = Pr[X_i=1]$,则:

$$
\begin{aligned}
Pr[X_i=0] &= 1-p_i\\
E[X] &= E[\sum\limits_{i=1}^n X_i] \\
&= \sum\limits_{i=1}^n E[X_i] \\
&= \sum\limits_{i=1}^n p_i\\
&=\mu
\end{aligned}
$$

因为$E[X_i]$可以计算为:

$$
\begin{aligned}
E[X_i] &= p_i\cdot e^t + (1-p_i)\cdot e^0 \\
&= p_i(e^t-1) + 1\\
&\le e^{p_i(e^t-1)}
\end{aligned}
$$

上式中的最后一个不等号是因为根据泰勒展开式,当$y>0$时，有$e^y\ge 1+y$.

因此:

$$
\begin{aligned}
E[e^{tX}] &\le \prod_{i=1}^n e^{p_i(e^t-1)}\\
&= e^{(e^t-1)\sum\limits_{i=1}^n p_i} \\
&= e^{(e^t-1)\mu}
\end{aligned}
$$

将其代回原来的Markov Inequity:

$$
\begin{aligned}
Pr\bigg[e^{tX} \ge e^{t(1+\delta)\mu} \bigg] &\le \frac{E[e^{tX}]}{e^{t(1+\delta)\mu}} \\
&\le \frac{e^{(e^t-1)\mu}}{e^{t(1+\delta)\mu}}\\
&= \bigg(\frac{e^{(e^t-1)}}{e^{t(1+\delta)}}\bigg)^\mu
\end{aligned}
$$

令$t=\ln(1+\delta)$,我们就得到:

$$
Pr\bigg[e^{tX} \ge e^{t(1+\delta)\mu} \bigg] \le \bigg(\frac{e^\delta}{(1+\delta)^{(1+\delta)}}\bigg)^\mu
$$

$\Box$

## 小结

从上述证明步骤来看，证明的主要流程有以下几点:

1. 利用Moment Generating Functions和Markov Inequity
2. 计算$E[e^{tX_i}]$，其中需要用的泰勒展开式
3. 选取合适的$t$

另外还有一些Chernoff Bound的变形形式:

> Chernoff Bound其他形式
>
> 假设$$X=\sum\limits_{i=1}^n X_i$$,且$$X_1,X_2,\cdots,X_n$$是独立的泊松实验，其中$$\mu=E[X]$$.
> 则
>
>  1.对于$$0<\delta\le 1$$有:
>
> $$Pr[X\ge (1+\delta)\mu]< exp\bigg(-\frac{\mu\delta^2}{2} \bigg) $$
>
> $$Pr[X\le (1-\delta)\mu]< exp\bigg(-\frac{\mu\delta^2}{2} \bigg) $$
>
>  2.对于$t\ge 2e\mu$，有:
> 
> $$Pr[X\ge t]\le 2^{-t}$$

# Packet Routing


[^1]: 注意，这里的泊松实验并不是指泊松分布，这是两个完全不同的概念。泊松实验是指$X_i$是0-1二值的布尔随机变量，但是$X_1,X_2,\cdots,X_n$之间并不不一定是同分布的，但是必须是独立的。


[ChernoffBound]: http://en.wikipedia.org/wiki/Chernoff_bound
[MarkovInequity]: http://en.wikipedia.org/wiki/Markov_inequality
[MomentGeneratingFunction]: http://en.wikipedia.org/wiki/Moment-generating_function

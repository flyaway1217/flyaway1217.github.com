---
layout: post
time: 2014-7-2
title: 随机算法学习笔记5-Chernoff Bound
category: Randomized-Algorithm
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

因为$E[e^{tX_i}]$可以计算为:

$$
\begin{aligned}
E[e^{tX_i}] &= p_i\cdot e^t + (1-p_i)\cdot e^0 \\
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
Pr\bigg[X \ge (1+\delta)\mu \bigg] \le \bigg(\frac{e^\delta}{(1+\delta)^{(1+\delta)}}\bigg)^\mu
$$

$\Box$

## 小结


Chernoff Bound一共有三个条件:

1. X必须是多个随机变量的和
2. 每一个$X_i$必须是独立的
3. $X_i$是一个0-1取值的随机变量(这不是必须的，但是0-1变量比较容易计算)

从上述证明步骤来看，证明的主要流程有以下几点:

1. 利用了Moment Generating Functions和Markov Inequity
2. 计算$E[e^{tX_i}]$，其中需要用到泰勒展开式
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

这个Packet Routing问题是来自于并行计算领域，描述的是，假如我们有$N$个处理器，这些处理器之间需要进行信息交互，那这些处理器就构成了一个网络，处理器在这个网络中通过发包和收包来进行信息的交互。构成的图有如下的限制:

1. 每一个处理器有且仅有一个独一无二的目的地
2. 信息传递是同步的，每一条边每次最多只能传递一个数据包。

可以试想一下，如果构成的图结构是一个完全图[^2]，那么每次只需要一轮传递，就能把所有的包送达到目的地。但是，在很多的实际情况中，完全图是无法实现的，考虑到成本问题，图结构应该是比较稀疏的(具有很少的边)，因此两个节点进行信息交互的时候，需要经过多条边的传递才能完成一次交互。在这种情况下，当有大量的数据包需要传递的时候，必然会导致网络的堵塞和瓶颈，我们的目的就是要能够设计出一种尽量稀疏的网络结构及其相应的路由算法，使得任意两点间进行信息交互的时候经过尽量少的边。

## Hypercube

现在我们来考虑一个比较特殊的图结构——[Hypercube][Hypercube].所谓的[Hypercube][Hypercube]，是一种特殊的无向图，它有$N$个节点，且$N=2^d$，其中$d$是一个正整数，称为Hypercube的度。Hypercube中的每一个点都用一个二进制串$\\{0,1\\}^d$来表示。节点$u,v$有边当且仅当$u,v$之间仅有一位是不同的，也即是$u$和$v$的[Hamming Distance][HammingDistacne]为1。

下图是度为1-4时，Hypercube的例子:


![](/assets/image/posts/2014-7-1-Randomized-Algorithms-5-0.png)

根据Hypercube的定义，我们可以知道这样一个性质:**对于图中任何一个点对$(u,v)$,它们之间的距离[^3]最多为$d$**.这是因为从一个点到另外一个点最多会有$d$位完全不一致。

这个性质给了我们不小的启发，我们可以轻易地设计如下的路由算法:


-----------------

Bit-Fixing Routing Algorithm

For each packet:

1. Let $u,v\in \\{0,1\\}^d$ be the origin and destination of the packet respectively.
2. For i = 1 to d,do:
    
    if $u_i\neq v_i$ then traverse the edge $$(v_1,\cdots,v_{i-1},u_i,\cdots,u_d) \rightarrow (v_1,\cdots,v_{i-1},v_i,u_{i+1},\cdots,u_d)$$

-------------

在实际情况下，在并行的路由$N$个数据包的时候，很有可能会出现同一条边同时被多个数据包使用，而根据之前的定义，每一条边一次最多只能通过一个数据包，因此我们需要为每一条边设计一个排队策略，可以是FIFO(First In First Out)或者FTG(Furthest To Go).

但是，对于上述的Bit-First Routing Algorithm算法来说，无论设计的是什么样的排队策略，总会有存在一个目的地的排列,使得需要通过$\Omega(\sqrt{N})$轮才能将所有的$N$个数据包路由到起各自的目的地。这是最坏的情况，但是在这里我们将会只分析这个算法的平均情况，分析的过程中就将会使用到之前的证明的Chernoff Bound.

## 平均情况分析

首先，我们将原问题进行一下放松，不再约束每一个处理器必须有独一无二的目的地，而可以是图上的任意一点。对于平均情况来说，任意一个起始点$v$的目标点是$\\{0,1\\}^d$的一个均匀且独立的分布,我们用$P_v$表示点$v$到其随机目的地$r$的路径，$P_v$是一个边的序列。

显然，如果$P_v$和$P_u$有公共的边，那么$u,v$就有可能会发生堵塞现象,我们需要对此进行分析。

令$H_{uv}$为一个指示变量，用来说明$P_u$和$P_v$是否有公共边:

$$
H_{uv} =
\begin{cases}
1\quad if\quad P_u\quad and\quad  P_v\quad share\quad at\quad least\quad one\quad edge\quad \\
0 \quad otherwise
\end{cases}
$$

根据上述的定义，显然我们可以得到$$H_u=\sum\limits_{v\in\{0,1\}^d } H_{uv}$$，$H_u$表示所有经过$P_u$的路径的数目，这是$u$被延迟的次数的一个上界。

由于$u,v$的目的地点都是独立选取的，因此$H_{uv}$之间也是相互独立的，因此我们可以使用Chernoff Bound.

令$e$表示图中的边，$T(e)$表示经过边$e$的路径的数目,则我们可以得到:

$$
H_u \le \sum\limits_{e\in P_u}T(e)
$$

因此：

$$
\begin{equation}
E[H_u] \le \sum\limits_{e\in P_u}E[T(e)]\label{x}
\end{equation}
$$

令$\vert P_v\vert$表示路径$P_v$的长度，这里的长度其实就是起始点与目标点之间的不同的位数，又因为目的地点是均匀分布的，所以$E[\vert P_v \vert] = \frac{d}{2}$，因此我们得到:

$$
\sum\limits_{v\in\{0,1\}^d}E[\vert P_v \vert] = \frac{dN}{2}
$$

又因为"所有的点的路径长度之和"和"每一条边上经过的路径的数目之和"是相等的，因此可以得到:

$$
\sum\limits_{v\in\{0,1\}^d}\vert P_v\vert = \sum\limits_{e}T(e) 
$$

则:

$$
\sum\limits_{e}E[T(e)]  = \sum\limits_{v\in\{0,1\}^d}E[\vert P_v\vert ] = \frac{dN}{2}
$$


又因为$T(e)$是同分布的，因此每一个$E[T(e)]$是相等的，而对于一个Hypercube来说，一共有$\frac{dN}{2}$条边，因此:

$$
E[T(e)] = \frac{2}{dN} \cdot \frac{dN}{2} = 1
$$

而$P_u$的长度最多为$d$，因此根据$\ref{x}$，我们可以得到:

$$
E[H_u] \le \sum\limits_{e\in P_u}E[T(e)] \le d
$$

## 应用Chernoff Bound

我们可以是用Chernoff Bound的第二种变形形式:

当$t\ge 2e\mu$时，$Pr[X\ge t] \le 2^{-t}$

取$t=6d>2eE[H_u]=2ed$,应用Chernoff Bound:

$$
Pr[H_u > 6d] < 2^{-6d}
$$

此时我们只是给定了指定的$H_u$的一个上界，对于整个图的来说，我们需要应用Union Bound:

$$
\begin{aligned}
Pr[maximum\quad delay > 6d] &\le Pr\bigg[\max\limits_{u\in\{0,1\}^d}H_u > 6d\bigg] \\
&\le NPr[H_u>6d] \\
&<N\cdot 2^{-6d}\\
&= 2^{-5d}
\end{aligned}
$$




[^1]: 注意，这里的泊松实验并不是指泊松分布，这是两个完全不同的概念。泊松实验是指$X_i$是0-1二值的布尔随机变量，但是$X_1,X_2,\cdots,X_n$之间并不不一定是同分布的，但是必须是独立的。

[^2]: 任意一个点都与其他所有点都有边相连.

[^3]: 距离用经过的边的数目来衡量.


# 参考资料

- [wiki:Chernoff Bound][ChernoffBound]
- [wiki:Markov Inequity][MarkovInequity]
- [wiki:Moment Generating Function][MomentGeneratingFunction]
- [wiki:Hypercube][Hypercube]
- [wiki:HammingDistacne][HammingDistacne]

[ChernoffBound]: http://en.wikipedia.org/wiki/Chernoff_bound
[MarkovInequity]: http://en.wikipedia.org/wiki/Markov_inequality
[MomentGeneratingFunction]: http://en.wikipedia.org/wiki/Moment-generating_function
[Hypercube]: http://en.wikipedia.org/wiki/Hypercube
[HammingDistacne]: http://en.wikipedia.org/wiki/Hamming_distance

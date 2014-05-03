---
layout: post
time: 2014-03-25
title: 随机算法学习笔记4-二阶矩(Second Moment)
category: 随机算法
keywords: 随机算法,Second Moment,Random Graph
tags: Randomized Algorithm
description: 随机算法学习笔记4,这次重心在二阶矩应用的几个模型。
---

这里所说的二阶矩(Second Moment)其实可以理解成在[上一篇笔记]({% post_url  2014-4-1-Randomized-Algorithms-3 %})中的中所说的的**方差**,**期望**是一阶矩，而**方差**就是二阶矩。本篇笔记中的中模型大多数都是利用二阶矩来进行证明的，最常用的工具就是**Chebyshev不等式**。 # 随机图(Random Graphs) 
一个随机图是按照如下规则生成的一个图结构:

1. 图中一共有$n$个节点,即$\vert V \vert=n$
2. 图中任意两个定点之间以$p$的概率出现边，且这些边之间是相互独立的。

这样生成一个随机图的过程就是随机图模型，用$G(n,p)$来表示。在随机图模型上有很多有趣的性质，接下来我们将分别讨论。


# 图的单调属性(Monotone Properties)

> **定义**:图属性
>
>  令$$\mathcal{G_n}=2^{\binom{n}{2}}$$表示所有具有$n$个点的图所能够生成的所有图结构的集合,**图的属性**是一个布尔函数$$P:\mathcal{G_n}\rightarrow \{0,1\}$$,且这个函数并不依赖的于顶点的顺序。也即是说，如果$G$和$H$是同构的，则$P(G)=P(H)$


> **定义**: 图的单调属性
>
> 图的单调属性是指，假设$G,H$都是有$n$个顶点的图,且满足$G\subseteq H$, 如果$G$有属性$P$则$H$必有属性$P$


图的单调属性有很多，比如:

- 是否存在汉米尔顿路径
- 是否含有和$H$同构的子图

当然也有属性不是单调的，比如:

- 是否存在欧拉路径

图的单调属性和单调函数的概念很相似，可以做一些类比。

对于所有图的单调属性，有如下的定理:

> 定理:
>
> 令$P$是一个图的单调属性,假设$$G_1=G(n,p_1),G_2=G(n,p_2)$$,且$$0\le p_1\le p_2 \le 1$$，则
>
> $$Pr[P(G_1)] \le Pr[P(G_2)] $$

证明:

要证明这个定理，需要用到一个称为**coupling**的技巧，所谓**coupling**是指，要是使得两个问题发生耦合，用某种方法将两个不同的问题捆绑到一起，这样比较利于分析。

在我们这个具体的证明中，假设$$p_1,p_2$$是共享一个随机源的，这强迫使它们发生了联系。对于任意的$$(u,v)\in V$$来说，令$$X_{u,v}$$表示一个$[0,1]$上的分布。

当且仅当$$X_{uv}\in [0,p_1]$$时，$$(u,v)\in G_1$$;当且仅当$$X_{uv}\in [0,p_2]$$时，$$(u,v)\in G_2$$,又因为$$p_1 \le p_2$$，所以$$(u,v)\in G_1 \Rightarrow (u,v)\in G_2$$,也即$G_1\subseteq G_2$.

根据图的单调性的定义，如果$$P(G_1)=1$$，则$$P(G_2)=1$$,也就说说$$Pr[P(G_1)]\le Pr[P(G_2)]$$

$\Box$


# 阈值现象(Threshold Phenomenon)

在随机图上有着一个比较好玩的性质,称为**阈值现象(Threshold Phenomenon)**.它描述的是随机图($$G(n,p)$$)上的某一些属性是随着$p$激增的，当$p$小于某个阈值$p(n)$时，随机图几乎没有对应的属性$P$;而当$p$大于某个阈值$p(n)$时，随机图$G(n,p)$则会有很高的概率有对应的属性$P$。用数学语言来描述是:

- 当$n\ll p(n)$时, 随着$n\rightarrow \infty,Pr[P(G(n,p))]=0$
- 当$n\gg p(n)$时, 随着$n \rightarrow \infty,Pr[P(G(n,p))]=1$

## 4-clique

在图中，4-clique是指如下的子图(子图中有4个顶点，且两两有边):

![](/assets/image/posts/2014-4-28-Randomized-Algorithm-4-0.png)


> 定理:
>
> 一个随机图含有4-clique的阈值是$n^{-\frac{2}{3}}$

证明:

令$S$表示随机图$G(n,p)$中的任意一个由4个顶点组成的子图，$X_S$为一个二值变量:

$$
X_S=\begin{cases}
1, \quad S\ is\ a\ 4-clique\\
0,\quad else
\end{cases}
$$

则$Pr[X_S=1]=p^6$,因为4-clique一共有6条边，而每条出现的概率是$p$.

$X$表示$G(n,p)$中4-clique的个数，也即$X=\sum\limits_{S\in\binom{n}{4}}X_S$.

根据阈值现象的定义，我们只需要证明如下两个引理:

1. 当$p=o(n^{-\frac{2}{3}})$时，随着$n\rightarrow\infty, Pr[X\ge 1]\rightarrow 0$
2. 当$p=w(n^{-\frac{2}{3}})$时，随着$n\rightarrow\infty, Pr[X\ge 1]\rightarrow 1$

首先，我们来证明第一个:

根据Markov不等式，我们有:

$$
\begin{aligned}
Pr[X\ge 1] &\le \frac{E[X]}{1} \\
&=E[X] \\
&= E\bigg[\sum\limits_{S\in \binom{n}{4}}X_S\bigg] \\
&= \sum\limits_{S\in\binom{n}{4}}E[X_S]\\
&= \binom{n}{4}p^6\\
&= O(n^4p^6)
\end{aligned}
$$

又因为$p=o(n^{-\frac{2}{3}})$, 所以:

$$
Pr[X\ge 1] = o(n^4n^{-4}) = o(1)
$$

即$Pr[x\ge 1]\rightarrow 0$

现在我们来证明第二个引理,首先$Pr[x\ge 1]\rightarrow 1$我们可以看成证明$Pr[X=0]\rightarrow 0$[^1],这两者是等价的。 则:

$$
Pr[X=0] \le Pr\bigg[\vert X-E[X] \vert \ge E[X]\bigg] = \frac{Var[X]}{(E[X])^2}
$$

其中，$E[X]=\binom{n}{4}p^6=O(n^4p^6)$

剩下的我们就需要计算$Var[X]$,根据方差的性质:


$$
Var[X] = Var\bigg[\sum\limits_{S\in\binom{n}{4}}X_S\bigg]=\sum\limits_{S\in\binom{n}{4}}Var[X_S] + \sum\limits_{S,T\in \binom{n}{4},S\neq T}Cov(X_S,X_T)
$$

现在我们需要分别计算$$Var[X_S]$$和$$Cov(X_S,X_T)$$


$$
Var[X_S] = E[X_S^2] - (E[X_S])^2 \le E[X_S^2]=E[X_S]=p^6
$$

所以$\sum\limits_{S\in\binom{n}{4}}Var[X_S]=n^4p^6$

接下来我们要计算$Cov(X_S,X_T)$,此时需要分情况讨论:

- $\vert S\cap T\vert \le1$时，$S,T$没有公共边，因此$Cov(S,T)=0$
- $\vert S\cap T \vert =2$时，$S,T$有一条公共边，且一共有11条边，因此

$$
Cov[X_S,X_T] = E[X_SX_T] - E[X_S]E[X_T]\le E[X_SX_T] = Pr[X_S=1\wedge X_T=1] = p^{11}
$$

又因为$\vert S\cup T\vert=6$,因此在这种情况下，$\sum\limits_{S,T\in \binom{n}{4},S\neq T}Cov(X_S,X_T)=O(n^6p^{11})$

- $\vert S\cap T \vert =3$时,$S,T$有3条公共边，且一共有9条边，因此:

$$
Cov[X_S,X_T] = E[X_SX_T] - E[X_S]E[X_T]\le E[X_SX_T] = Pr[X_S=1\wedge X_T=1] = p^{9}
$$

又因为$\vert S\cup T\vert=5$,因此在这种情况下，$\sum\limits_{S,T\in \binom{n}{4},S\neq T}Cov(X_S,X_T)=O(n^5p^{9})$

综合上述所有情况,$Var[X]=O(n^4p^6+n^6p^{11}+n^5p^9)$

所以:

$$
Pr[X=0] \le \frac{Var[X]}{(E[X])^2} = O(n^{-4}p^{-6}+n^{-2}p^{-1}+n^{-3}p^{-3})
$$

因此，当$n=w(n^{-\frac{2}{3}})$时,$Pr[X=0]\rightarrow 0$

$\Box$


[^1]:此处进行变换是因为原式其实并不好处理，但是等价转换之后，我们可以应用Chebyshev不等式。





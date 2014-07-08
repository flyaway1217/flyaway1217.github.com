---
layout: post
time: 2014-07-03
title: 随机算法学习笔记6-Martingales
category: 随机算法
keywords: 随机算法,Martingales
tags: Randomized Algorithm
description: 随机算法学习笔记6,重点是Martingales模型。
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
> 

需要注意的是，在这个不等式中，是**没有独立性**要求的。

其中$\vert X_k - X_{k-1}\vert \le c_k$的条件是整个不等式的核心，称为**bounded difference condition**.

该不等式描述的是，如果将$X_0,X_1,\cdots$看成是随时间变换的状态的话，那么如果每一步的状态转换都没有出现大的跳跃，那么该不等式就保证整个过程一直处于其初始点附近。

其中有一种特殊情况，当$c_k=c$的时候，不等式可以写成:

> 假设$X_0,X_1,\cdots$是一个Martingale，且对于所有的$k>1$，都有:
>
> $$\vert X_k - X_{k-1} \vert \le c$$
>
> 则
>
> $$Pr[\vert X_n-X_0 \vert \ge ct\sqrt{n}] \le 2e^{-\frac{t^2}{2}}$$.
> 

还有一般化的Azuma's Inequality:

> Azuma's inequality(general version)
>
> 假设$Y_0,Y_1,\cdots$是关于$X_0,X_1,\cdots$的一个Martingale，且对于所有的$k>1$，都有:
>
> $$\vert Y_k - Y_{k-1} \vert \le c_k$$
>
> 则
>
> $$Pr[\vert Y_n-Y_0 \vert \ge t] \le 2exp\bigg(-\frac{t^2}{2\sum\limits_{k=1}^n c_k^2}\bigg)$$.
>

## 证明

Azuma's Inequality的证明过程和[笔记5]({%  post_url 2014-7-2-Randomized-Algorithms-5 %})中证明[Chernoff Bound]的方法类似，先在[Moment Generating Function][MomentGeneratingFunction] 上使用[Markov不等式][MarkovInequity],然后确定这个[Moment Generating Function][MomentGeneratingFunction]的上界，最终选取合适的参数。

在正式开始证明之前，我们先要证明一个引理:

> 引理
>
> 令$X$为一个随机变量满足$E[X]=0$且$\vert X\vert \le c$,则对于任何的$\lambda > 0$,有:
>
> $$E[e^{\lambda X}] \le e^{\lambda^2\frac{c^2}{2}}$$

证明:

通过观察，我们可以看到函数$e^{\lambda X}$在定义域$[c,c]$上是一个凸函数，所以如果我们在点$(-c,e^{-\lambda c})$和$(c,e^{\lambda c})$画一条直线，则$e^{\lambda X}$的曲线必然在直线的下方。也即:

$$
e^{\lambda X} \le \frac{e^{\lambda c} + e^{-\lambda c}}{2} + \frac{X}{2c}(e^{\lambda c}-e^{-\lambda c})
$$

因为$E[X]=0$，因此:

$$
\begin{aligned}
E[e^{\lambda X}] &\le E\bigg[\frac{e^{\lambda c} + e^{-\lambda c}}{2} + \frac{X}{2c}(e^{\lambda c}-e^{-\lambda c})\bigg] \\
&= \frac{e^{\lambda c} + e^{-\lambda c}}{2} + \frac{e^{\lambda c}-e^{-\lambda c}}{2c}E[X] \\
&= \frac{e^{\lambda c} + e^{-\lambda c}}{2} \\
&\le e^{\lambda^2\frac{c^2}{2}}
\end{aligned}
$$

上式中的最后一个不等式是根据[泰勒展开式][TaylorSeries]得到的。

$\Box$

现在开始正式证明Azuma's Inequality[^2]:

**偏移之和**

令$Y_i = X_i - X_{i-1}$,则:

$$
\begin{aligned}
E[Y_i\vert X_0,\cdots,X_{i-1}] &= E[X_i-X_{i-1}\vert X_0,\cdots,X_{i-1}] \\
&= E[X_i \vert X_0,\cdots,X_{i-1}] - E[X_{i-1}\vert X_0,\cdots,X_{i-1}] \\
&= X_{i-1} - X_{i-1} \\
&= 0
\end{aligned}
$$

令$Z_n=\sum\limits_{i=1}^n Y_i$,则

$$
Z_n=(X_1-X_0) + (X_2-X_1) + \cdots +(X_n-X_{n-1}) = X_n-X_0
$$

现在我们就需要找出$Z_n$的上界。

**应用Markov不等式**

$$
\begin{aligned}
Pr[Z_n \ge t] &= Pr[e^{\lambda Z_n}\ge e^{\lambda t}]\\
&\le \frac{E[e^{\lambda Z_n}]}{e^{\lambda t}}
\end{aligned}
$$

接下去就要寻找$E[e^{\lambda Z_n}]$的上界。

$$
\begin{aligned}
E[e^{\lambda Z_n}] &= E\big[ E[e^{\lambda Z_n}\vert X_0,\cdots,X_{n-1}] \big] \\
&= E\big[ E[e^{\lambda (Z_{n-1}+Y_n)}\vert X_0,\cdots,X_{n-1}] \big] \\
&= E\big[ E[e^{\lambda Z_{n-1}} \cdot e^{\lambda Y_n}\vert X_0,\cdots,X_{n-1}] \big] \\
&= E\big[ e^{\lambda Z_{n-1}} \cdot E[ e^{\lambda Y_n}\vert X_0,\cdots,X_{n-1}] \big] \\
\end{aligned}
$$

又因为$$E[Y_n\vert X_0,\cdots,X_{n-1}] = 0$$且$$\vert Y_n \vert =\vert (X_n-X_{n-1}) \vert \le c_n$$，所以直接套用之前证明的引理:

$$
E[e^{\lambda Y_n}\vert X_0,\cdots,X_{n-1}] \le e^{\lambda^2 \frac{c_n^2}{2}}
$$

将其代回到$E[e^{\lambda Z_n}]$中:

$$
\begin{aligned}
E[e^{\lambda Z_n}] &= E\big[ e^{\lambda Z_{n-1}} \cdot E[ e^{\lambda Y_n}\vert X_0,\cdots,X_{n-1}] \big] \\
&\le E[e^{\lambda Z_{n-1}} \cdot e^{\lambda^2 \frac{c_n^2}{2}} ] \\
&= e^{\lambda^2 \frac{c_n^2}{2}} \cdot E[e^{\lambda Z_{n-1}}] \\
\end{aligned}
$$

将其递归展开:

$$
\begin{aligned}
E[e^{\lambda}] &\le \prod\limits_{k=1}^n e^{\lambda^2 \frac{c_n^2}{2}} \\
&= \bigg( \lambda^2 \sum\limits_{k=1}^n \frac{c_k^2}{2} \bigg) \\
\end{aligned}
$$

代回到Markov不等式中:

$$
\begin{aligned}
Pr[Z_n \ge t] &= \frac{E[e^\lambda Z_n]}{e^{\lambda t}} \\
&\le exp\bigg(\lambda^2 \sum\limits_{k=1}^n \frac{c_k^2}{2} -\lambda t \bigg)
\end{aligned}
$$

**选取合适的$\lambda$**

令$$\lambda = \frac{t}{\sum\limits_{k=1}^n c_k^2}$$,则

$$
exp\bigg(\lambda^2 \sum\limits_{k=1}^n \frac{c_k^2}{2} -\lambda t \bigg) = exp\bigg(-\frac{t^2}{2\sum\limits_{k=1}^nc_k^2} \bigg)
$$

所以:

$$
\begin{aligned}
Pr[X_n - X_0 \ge t] &= Pr[Z_n \ge t] \\
&\le exp\bigg(\lambda^2\sum\limits_{k=1}^n \frac{c_k^2}{2}-\lambda t \bigg) \\
&= \bigg( -\frac{t^2}{2\sum\limits_{k=1}^n c_k^2}  \bigg)
\end{aligned}
$$

$\Box$

# The Doob martingales

在Martingale中，有一类的Martingale比较重要，称为[Doob Martingale].

首先，我们先定义**Doob Sequence**,其定义如下:

> 定义: **Doob Sequence**
> 
> 函数f关于随机变量$X_1,X_2,\cdots$的Doob Sequence定义如下:
>
> $$Y_i = E[f(X_1,\cdots,X_n) \vert X_1,\cdots,X_i], 0 \le i \le n$$
>
> 特别地，$Y_0=E[f(X_1,\cdots,X_n)]$且$Y_n=f(X_1,\cdots,X_n)$

一个函数的Doob Sequence定义了一个Martingale,也就是说:

$$
E[Y_i\vert X_1,\cdots,X_{i-1}] = Y_{i-1}
$$

证明:

$$
\begin{aligned}
E[Y_i\vert X_1,\cdots,X_{i-1}] &= E\big[ E[f(X_1,\cdots,X_n) \vert X_1,\cdots,X_i] \vert X_1,\cdots,X_{i-1} \big] \\
&= E[f(X_1,\cdots,X_n)\vert X_1,\cdots,X_{i-1}] \\
&= Y_{i-1}
\end{aligned}
$$

$\Box$


Doob Martingale是一个估计函数值的随机过程，对于关于随机变量$X_1,\cdots,X_n$的函数$f(X_1,\cdots,X_n)$，$Y_0,Y_1,\cdots,Y_n$表示对函数值的一个估计，$Y_i$表示，当已知$X_1,\cdots,X_i$时，函数值$f(X_1,\cdots,X_n)$的期望,
即$Y_i=E[f(X_1,\cdots,X_n)\vert X_1,\cdots,X_i]$.因此，$Y_0$表示在$X_1,\cdots,X_n$全都未知的情况下，$f(X_1,\cdots,X_n)$的期望,即$Y_0=E[f(X_1,\cdots,X_n)]$;而$Y_n$表示在$X_1,\cdots,X_n$全部已知的情况下，$f(X_1,\cdots,X_n)$的期望，也就是其在自身的函数值，也即$Y_n=f(X_1,\cdots,X_n)$.

## 举例

### Edge Exposure Martingale

令$G$表示一个有$n$个点的随机图，$f$为一个这个随机图的一个函数，这个函数可以是随机图的任意的性质，比如染色数、包含三角的数目等等。令$e_1,e_2,\cdots,e_m,m=\binom{n}{2}$表示图中所有可能出现的边，令:

$$
X_i=\begin{cases}
1\quad if e_i\in G\\
0\quad otherwise
\end{cases}
$$

定义$Y_i=E[f(G)\vert X_1,X_2,\cdots,X_i]$，则$Y_0,Y_1,\cdots,Y_n$形成了一个Doob Martingale，通常称为**edge exposure martingale**.

### Vertex Exposure Martingale

在edge exposure martingale中我们是不断暴露出边，其实我们也可以不断暴露点，假设随机图的点集为$[n]$，则令$X_i$表示由点集$[i]$组成的子图.令$Y_i=E[f(G)\vert X_1,\cdots,X_i]$.则$Y_0,Y_1,\cdots,Y_n$也定义了一个Doob Martingale,通常称为**vertex exposure martingale**.

### Chromatic number

> 定理
>
> 令$G\sim G(n,p)$，且$\chi(G)$表示图$G$的染色数，则
>
> $$ Pr[\vert \chi(G) - E[\chi(G)] \vert \ge t\sqrt{n}] \le 2e^{-\frac{t^2}{2}} $$


证明:

考虑图G的vertex exposure martingale,$Y_i=E[\chi(G)\vert X_1,\cdots,X_i]$.

可以想像，每当我们暴露出一个点的时候，我们总可以用一种新的颜色去染色，也就是说它满足**bounded difference condition**：

$$
\vert Y_i - Y_{i-1} \vert \le 1
$$

因此，我们对$Y_0,\cdots,Y_n$直接套用Azuma's Inequality，就得到了上述的结论。

$\Box$

### Hoeffding's Inequality

> Hoeffding's Inequality
>
> 令$X=\sum\limits_{i=1}^n X_i$,其中$X_1,\cdots,X_n$是独立的随机变量，且$a_i\le X_i\le b_i$,对于所有的$1\le i\le n$，令$\mu=E[X]$，则:
>
> $$Pr[\vert X-\mu \vert\ge t]\le 2exp\bigg( -\frac{2}{2\sum\limits_{i=1}^n(b_i-a_i)^2}  \bigg)$$


证明:

定义Doob Sequence:$Y_i=E\bigg[ \sum\limits_{j=1}^n X_j\big\vert X_1,\cdots,X_i\bigg]$，很明显我们有$Y_0=\mu$且$Y_n=X$.

同时，$\vert Y_i-Y_{i-1} \vert\le b_i-a_i$，所以，使用一般化的Azuma's Inequality，就能得到上述结论。

$\Box$




# Stoppinng Times

在Martingale中，还有另外一种问题，称为Stoppinng Times，比如在赌博的时候，令$Z_i$表示玩家在第i局之后的赢钱数，很显然$Z_1,Z_2,\cdots$形成了一个Martingale，如果玩家决定在第$k$[^3]局之后就退出赌局，那么这个玩家期望的赢钱数是多少？


首先介绍一个引理:

> 引理
>
> 假设$Z_0,Z_1,\cdots,Z_n$是关于$X_0,X_1,\cdots,X_n$的一个Martingale,则
>
> $$ E[Z_n] = E[Z_0] $$

证明:

根据Martingale的定义，我们有:

$$
E[Z_{i+1}\vert X_0,\cdots,X_i]  = Z_i
$$
两边同时取期望，得到:

$$
E\big[E[Z_{i+1} \vert X_0,\cdots,X_n]\big] = E[Z_{i+1}] = E[Z_i]
$$

不断重复上述过程，就能够得到:

$$
E[Z_n] = E[Z_0]
$$

$\Box$

有了上述的引理，我们就能说，如果在赌局开始之前就确定玩的轮数的话，那么期望的盈利就是0.

当然，一般在真实的场景中，情况要复杂得多，比如停止轮数是由当前的盈利状况来决定的。为了分析这种情况，我们需要引入Stoppinng Time的定义:

> Stoppinng Time
>
> 令$\\{Z_n,n\ge 0\\}$为一个随机变量序列，$T$为一个非负的整数随机变量，如果事件$T=n$只依赖于$Z_0,Z_1,\cdots,Z_n$，则$T$就是$\\{Z_n,n\ge 0\\}$的一个Stoppinng Time.


结合上面关于Martingale的引理，如果赌局是公平的话，那么$E[X_T]=E[X_0]=0$一直成立。但是，如果Stoppinng Time $T$定义成第一次$Z_i>B$,其中$B$是一个固定的常量，则此时期望的盈利应该是大于$0$的，然而此时的Stoppinng Time未必是有限的。

> Martingale Stoppinng Theorem
>
> 如果$Z_0,Z_1,\cdots$是关于$X_0,X_1,\cdots$的Martingale，且$T$是$X_1,X_2,\cdots$的一个Stoppinng Time，则:
>
>当如下三个条件中的任意一个满足时:
>
> 1. $Z_i$是有界的，即存在一个常数$c$，使得对任意的$i$，都有$\vert Z_i\vert\le c$
>
> 2. $T$是有界的
>
> 3. $E[T] < \infty$且存在一个常数$c$使得$E[\vert Z_{i+1}-Z_i\vert \big\vert X_1,\cdots,X_i]<c$
>
> 等式
>
>$$E[Z_T] = E[Z_0]$$
>
> 成立

## 举例

考虑一个独立且公平的赌局，在每一轮的赌局中，玩家分别以$\frac{1}{2}$的概率赢得1元或输掉1元.令$X_i$表示第i轮所赢的数目,$Z_i$表示第i轮之后一共赢得的数目，其中$Z_0=0$,假设玩家第一次输掉$l_1$元或赢得$l_2$元时退出赌局，那么请问玩家在输掉$l_1$元之前赢得$l_2$元的概率是多少?[^4]

分析:

令$T$表示玩家第一次输掉$l_1$元或赢得$l_2$元时的轮数，则$T$是$X_1,X_2,\cdots$的一个Stoppinng Time.而$Z_0,Z_1,\cdots$则是个Martingale.因为$Z_i$是有界的，因此满足Martingale Stoppinng Theorem的条件，因此我们有:

$$
E[Z_T] = E[Z_0] = 0
$$

令$q$表示赢得$l_2$元的概率，则:

$$
E[Z_T] = l_2q - l_1(1-q) = 0
$$

我们可以得到:

$$
q = \frac{l_1}{l_1+l_2}
$$

# Wald's Equation

我们可以看到，在上述的Martingale Stoppinng Theorem中并没有要求随机变量必须是独立的，这体现出了Martingale的强大力量，但是如果随机变量是独立的，会发生什么呢？对于独立的随机变量的序列，我们有如下的定理:

> Theorem: Wald's Equation
>
> 令$X_1,X_2,\cdots$是非负，独立同分布的随机变量序列，且这些随机变量都服从分布$X$.令$T$表示这个序列的一个Stoppinng Time。如果$T$和$X$的期望都是有界的，则:
>
> $$ E\bigg[\sum\limits_{i=1}^T X \bigg]  = E[T]E[X]$$
> 

证明:

对于$i\ge 1$,令$Z_i=\sum\limits_{j=1}^i(X_j-E[X])$,则

$$
\begin{aligned}
E\bigg[Z_{i+1}\vert X_1,X_2,\cdots,X_i\bigg] &= E\bigg[\sum\limits_{j=1}^i(X_j-E[X]) +X_{i+1}-E[X] \bigg \vert X_1,X_2,\cdots,X_i\bigg] \\
&= E\bigg[\sum\limits_{j=1}^i(X_j-E[X])\bigg\vert X_1,X_2,\cdots,X_i\bigg] + E\bigg[X_{i+1}-E[X]\bigg\vert X_1,X_2,\cdots,X_i\bigg] \\
&= \sum\limits_{j=1}^i(X_j-E[X]) + E[X_{i+1}-E[X]] \\
&= \sum\limits_{j=1}^i(X_j-E[X]) \\
&= Z_i
\end{aligned}
$$

所以，$Z_1,Z_2,\cdots$形成了一个关于$X_1,X_2,\cdots$的Martingale.又因为$E[T]<\infty$且:

$$
E[\vert Z_{i+1} - Z_i \vert \big\vert X_1,\cdots,X_i] = E[\vert X_{i+1} - E[X] \vert] \le 2E[X].
$$

因此，我们可以使用Martingale Stoppinng Theorem:

$$
E[Z_T] = E[Z_1] = 0
$$

因为，我们可以做如下计算:

$$
\begin{aligned}
E[Z_T] &= E\bigg[\sum\limits_{j=1}^T(X_j-E[X]) \bigg] \\
&= E\bigg[\bigg(\sum\limits_{j=1}^T X_j\bigg) - TE[X] \bigg] \\
&= E\bigg[\sum\limits_{j=1}^T X_j\bigg] - E[T]E[X] \\
&= 0
\end{aligned}
$$

即得到:

$$
 E\bigg[\sum\limits_{j=1}^T\bigg] = E[T]\cdot E[X]
$$


关于独立随机变量序列，还有另外一种Stoppinng Time的定义：

> 定义:
>
> 令$Z_0,Z_1,\cdots,Z_n$是一个独立的随机变量序列，$T$是一个非负的，整数随机变量，如果事件$T=n$独立于$Z_{n+1},Z_{n+2},\cdots$,则$T$是当前序列的一个Stoppinng Time

##举例

假设一个玩家参加一个赌局，他首先抛掷一个标准的骰子，得到的点数为$X$，则第二次他同时抛掷$X$个标准的骰子，假设这$X$个骰子所有点数之和为$Z$,问$Z$的期望是多少?

分析:

对于$1\le i\le X$，令$Y_i$表示第$i$个骰子得到的点数，则$E[Z]=E\bigg[\sum\limits_{i=1}^X Y_i\bigg]$，根据上述的定义，$X$是一个Stoppinng Time,因此根据Wald's Equation,我们得到:

$$
E[Z] = E[X]\cdot E[Y_i] = \bigg(\frac{7}{2}\bigg) = \frac{49}{2}
$$



# 总结

本片文章主要介绍了有关Martingale的有关内容，首先从[条件期望][CondtionalExpecation]开始，引出了[Martingales]的定义，**Martingales**是一个比较有用工具，主要用来分析一个随机变量的序列.**Martingales**的一个优势就是，它不要求独立性，这就比较强大了。

**Martingales**的定义之后，我们介绍[Azuma's inequality],这里比较重要的是**bounded difference condition**,它保证了**Martingales**的序列不会离开初始状态太"远".

接着说明了一类特殊的**Martingales**——[Doob Martingale],它描述了当序列中的随机变量逐渐被确定时，其函数值期望的变化过程。

最后介绍了**Martingales**中的Stoppinng Time相关的内容，描述了序列停止时的性质。


# 参考资料

- [Condtional Expecation][CondtionalExpecation]
- [Martingales]
- [Azuma's inequality]
- [Chernoff Bound]
- [MarkovInequity]
- [Moment Generating Function][MomentGeneratingFunction]
- [Taylor Series][TaylorSeries] 
- [Doob Martingale] 
- 《Probability and Computing:Randomized Algorithms and Probabilistic Analysis》

[^1]: 有点类似于Markov过程，只是依赖于之前所有的状态。
[^2]: 这里只证明原始的Azuma's Inequality，一般化的证明过程基本类似.
[^3]: 此处的k在赌局开始之前就已经确定了。
[^4]: 《Probability and Computing》这本书的12.2.1节有一个更加复杂的例子，这里只举一个比较简单的例子。

[CondtionalExpecation]: http://en.wikipedia.org/wiki/Conditional_expectation
[Martingales]: http://en.wikipedia.org/wiki/Martingale_(probability_theory)
[Azuma's inequality]: http://en.wikipedia.org/wiki/Azuma%27s_inequality
[Chernoff Bound]: http://en.wikipedia.org/wiki/Chernoff_bound
[MarkovInequity]: http://en.wikipedia.org/wiki/Markov_inequality
[MomentGeneratingFunction]: http://en.wikipedia.org/wiki/Moment-generating_function
[TaylorSeries]: http://en.wikipedia.org/wiki/Taylor_series
[Doob Martingale]: http://en.wikipedia.org/wiki/Doob_martingale

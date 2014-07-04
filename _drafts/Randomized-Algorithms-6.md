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



# The Doob martingales

# Stoppinng Times

# Wald's Equation

# 总结

[^1]: 有点类似于Markov过程，只是依赖于之前所有的状态。
[^2]: 这里只证明原始的Azuma's Inequality，一般化的证明过程基本类似.

[CondtionalExpecation]: http://en.wikipedia.org/wiki/Conditional_expectation
[Martingales]: http://en.wikipedia.org/wiki/Martingale_(probability_theory)
[Azuma's inequality]: http://en.wikipedia.org/wiki/Azuma%27s_inequality
[Chernoff Bound]: http://en.wikipedia.org/wiki/Chernoff_bound
[MarkovInequity]: http://en.wikipedia.org/wiki/Markov_inequality
[MomentGeneratingFunction]: http://en.wikipedia.org/wiki/Moment-generating_function
[TaylorSeries]: http://en.wikipedia.org/wiki/Taylor_series

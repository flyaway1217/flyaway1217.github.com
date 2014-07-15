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
> 令$\mathbf{X}=(X_1,\cdots,X_n)$表示$n$个**独立**的随机变量，令$f$表示一个满足Lipschitz condition的函数，则:
>
> $$ Pr[\vert f(\mathbf{X}) - E[f(\mathbf{X})] \vert \ge t ] \le 2exp\bigg( -\frac{t^2}{2\sum\limits_{i=1}^n c_i^2} \bigg)  $$
>

Method of bounded differnces可以理解成这样的组合:

**独立性条件** $+$ **Lipschitz condition** $\Rightarrow f(X_1,X_2,\cdots,X_n)$集中在它的期望附近。

它最大一个优势就是不需要知道具体的$f$函数是什么形式的，就能得出其概率集中的结论。

# Applications

## 小球问题

假设我们现在有$m$个小球要以独立且均匀的分布投入到$n$个箱子中，我们需要考察小球投掷完成之后，还剩多少个空箱子？根据我们之前期望的线性可加性，我们能比较简单的计算其期望值:

令$X_i$表示第$i$个箱子是否为空，$X_i=1$表示箱子$i$为空;否则为$X_i=0$.则$X=\sum\limits_{i=1}^n$表示一共有多少空个箱子,则:

$$
\begin{aligned}
E[X_i] &= (1-\frac{1}{n})^m \\
E[X] &= \sum\limits_{i=1}^n E[X_i] = n(1-\frac{1}{n})^m\\
\end{aligned}
$$

虽然我们求出了空箱子数目的期望，但是这还不够，我们希望能够得到更加精确的信息来描述随机变量$X$.此时，我们就可以使用**method of bounded differnces**.

**method of bounded differnces**有两个条件:1. 独立 2. [Lipschitz condition]

而此时的$X_i$显然是不独立的，因此我们需要重新假设我们的随机变量。令$Y_j$表示第$j$个球落入到箱子的编号，则$X$可以看成是$(Y_1,\cdots,Y_m)$的函数，即:

$$
X = f(Y_1,\cdots,Y_n)
$$

此时的$Y_i$是**独立**的。

而一个球的投掷，最多只能让一个箱子变得非空，每一次只改变一个变量，引起的变化最多为$1$，即满足[Lipschitz condition].因此，我们直接使用**method of bounded differnces**:

$$
Pr[\vert X-E[X]\vert \ge t\sqrt{m}] = 2e^{-\frac{t^2}{2}}
$$

因此，对于小球投掷问题来说，空箱子的数目主要集中在$n(1-\frac{1}{n})^m$附近。

## 模式匹配问题

令$\mathbf{X}=(X_1,X_2,\cdots,X_n)$均匀且独立地从字符表$\Sigma$中选取的字符序列，其中$\vert \Sigma \vert =m$。令$\pi \in \Sigma^k$是任意一个固定长度的字符串。我们想要考察$\pi$在$\mathbf{X}$中出现的次数。

令$Y$表示$\pi$一共在$\mathbf{X}$中出现的次数, $Z_i=1$表示$X_i$是$\pi$的起始位置，否则$X_i=0$.其中，$0\le i \le n-k+1$.则:

$$
Z_i=\begin{cases}
1 \quad (\frac{1}{m})^k \\
0 \quad 1-(\frac{1}{m})^k \\
\end{cases}
$$

且$Y=\sum\limits_{i=0}^{n-k+1}$，所以$E[Y]=(n-k+1)\cdot (\frac{1}{m})^k$.

同样的，我们还需要知道$Y$是否有概率集中现象。我们可以将$Y$看成是$(X_1,X_2,\cdots,X_n)$的函数，且$(X_1,X_2,\cdots,X_n)$是独立的.

而又因为，$\pi$的长度是$k$，因此$(X_1,X_2,\cdots,X_n)$其中一个字符改变时，带来$Y$的变化最多为$k$，因此满足[Lipschitz condition].所以，直接使用**method of bounded differnces**:

$$
Pr[\vert Y-E[Y] \vert \ge tk\sqrt{n}] \le 2e^{-\frac{t^2}{2}}
$$

# 参考资料

- [Martingales]
- [Azuma's inequality]
- [Doob Martingale] 
- [Lipschitz condition]

[Martingales]: http://en.wikipedia.org/wiki/Martingale_(probability_theory)
[Azuma's inequality]: http://en.wikipedia.org/wiki/Azuma%27s_inequality
[Doob Martingale]: http://en.wikipedia.org/wiki/Doob_martingale
[Lipschitz condition]: http://en.wikipedia.org/wiki/Lipschitz_condition

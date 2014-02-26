---
layout: post
time: 2014-02-20
title: 随机算法学习笔记0-概率空间&计算模型
category: 随机算法
keywords: 随机算法,Probability Space,Monte Carlo,Las Vegas
tags: Randomized Algorithm
description: 随机算法的学习笔记0，主要说明了概率空间、Monte Carlo Algorithm和Las Vegas Algorithm的概念，接着是两个应用随机算法的例子。
---

这学期选修了一门"随机算法"的课程，感觉其中的思想非常有趣和好玩，但是其中的分析过程也是比较复杂和不太好理解的。为了督促自己好好学习这一门课，打算开始记笔记，将自己理解的内容记录下来。


# 概率空间

由于在随机算法的分析过程中，大量使用了概率论中的知识，随机算法很大程度上就是在计算概率，所以首先要给出**概率空间**的定义，下面是**概率空间**形式化的定义.

概率空间是对一个随机过程的建模，可以用一个三元组$(\Omega,\Sigma,Pr)$来表示，其中:

- $\Omega$: **样本空间**，表示随机过程中所有可能的输出结果(**基本事件**)。
- $\Sigma$: **事件集合**，表示所有可能的事件的**集合**，一个事件由0个或多个**基本事件**组成。
- Pr: **概率测度**，表示一个从$\Sigma$到实数域的函数,$Pr: \Sigma \mapsto R$.每一个事件都被此函数赋予一个0和1之间的**概率值**。

一个概率空间有如下的五个约束条件:

1. $\Omega\in\Sigma$且$\emptyset\in\Sigma$(分别表示**确定事件**和**不可能事件**都属于$\Sigma$)
2. 如果$A,B\in \Sigma$，则$A\cap B,A\cup B,A-B\in\Sigma$,(事件的交、并、差运算之后仍然是事件).
3. $Pr(\Omega) = 1$(所有基本事件的概率和为1)
4. 如果$A\cap B = \emptyset$,则$Pr(A\cup B)=Pr(A) + Pr(B)$
5. 对于一个事件序列:$A_1\supset A_2\supset\cdots A_n\cdots$，如果$\cap\_n A\_n = \emptyset$，则$\lim\limits\_{n\rightarrow \infty}Pr(A\_n) = 0$

## 几个结论

1. 令$\bar{A} = \Omega - A$.则$Pr(\bar{A}) = 1 - Pr(A)$
2. 如果$A \subseteq B$，则$Pr(A) \leq Pr(B)$

**定义**: 两个事件$\xi\_1$和$\xi\_1$**独立**当且仅当$Pr(\xi\_1\land \xi\_2) =Pr(\xi\_1)\cdot Pr(\xi\_2)$

**条件概率**

在给定$\xi\_2$的情况下发生$\xi\_1$的概率是:$Pr[\xi\_1\vert\xi\_2] = \frac{Pr[\xi\_1\wedge\xi\_2]}{Pr[\xi\_2]}$

**全概率法则**

令$\xi\_1,\xi\_2,\cdots,\xi\_n$是互不相交的事件，且$\mathop{\vee}\_{i=1}^n\xi\_n = \Omega$(完备事件组),那么，对于任意一个事件$\xi$,有$Pr[\xi]=\sum\limits\_{i=1}^nPr[\xi\vert\xi\_i]\cdot Pr[\xi\_i]$


**链式法则**

令$\xi\_1,\xi\_2,\cdots,\xi\_n$是任意的n个事件，则$Pr[\mathop{\wedge}\_{i=1}^n] = \prod\limits\_{k=1}^nPr[\xi\_k\vert \mathop{\wedge}\_{i<k}\xi\_i]$


上述这些定义和结论，出了**概率空间**的定义比较新以外，其他内容都是概率统计中的基本内容，此处不再深入说明了。


# 随机算法举例

简单介绍完有关概率的内容之后，我们就要来看看神奇的随机算法的例子，下面是两个比较简单的随机算法的例子，刚看完这两个例子的时候，我就觉得随机算法真是神奇。

## 矩阵乘法

首先来看一下一个矩阵乘法的例子，对于三个$n\times n$的矩阵$A,B,C$，我们想要验证$AB$是否等于$C$，这个问题可以表述成:

---------------

**input**: 3个$n\times n$的矩阵$A,B,C$

**output**: 如果$AB==C$则返回`Yes`，否则返回`No`

---------------

面对这样的问题，最朴素的方法就是直接计算两个$n\times n$的矩阵乘法，得到$AB$的具体结果


# 两种计算模型




# 参考资料

- [wiki:Probability Space](http://en.wikipedia.org/wiki/Probability_space)

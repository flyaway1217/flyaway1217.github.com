---
layout: post
time: 2014-02-20
title: 随机算法学习笔记0
category: 随机算法
keywords: 随机算法,Probability Space,Monte Carlo,Las Vegas
tags: Randomized Algorithm
description: 随机算法的学习笔记0，主要说明了概率空间、Monte Carlo Algorithm和Las Vegas Algorithm的概念，接着是两个应用随机算法的例子。
---

# 概率空间

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

定义: 两个事件$\xi\_1$和$\xi\_1$**独立**当且仅当$Pr(\xi\_1\land \xi\_2) =Pr(\xi\_1)\cdot Pr(\xi\_2)$

# 参考资料

- [wiki:Probability Space](http://en.wikipedia.org/wiki/Probability_space)

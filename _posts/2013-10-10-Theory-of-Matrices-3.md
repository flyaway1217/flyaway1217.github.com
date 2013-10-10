---
layout: post
time: 2013-10-10
title: 矩阵论学习笔记3
category: 矩阵论
keywords: 矩阵论,数学
tags: 矩阵论,数学
description: 矩阵论学习课程笔记 
---

#同构算子与线性空间同构#

上一次的笔记中，我们讲到了 **线性算子**，**线性算子**其实就是满足某些条件的从一个线性空间转换到另一个线性空间转换过程，可以说**线性算子**是一种特殊的**转换过程**{: style="color:red"}。而现在要讲的**同构算子**是一种特殊的**线性算子**。

**定义**: 设X,Y是线性空间，T是$X\rightarrow Y$的线性算子，且是"一对一"的，即满足:

1. $T(X)=Y(全映射)$
2. 若$x\_1,x\_2\in X$,当$x\_1\neq x\_2$时，有$T(x\_1)\neq T(x\_2)$

那么，就称T为X与Y间的一个**同构算子**{: style="color:red"}

若X与Y之间存在同构算子，则称X与Y是**同构的线性空间**{: style="color:red"}

同构的线性空间有如下的性质：

1. 传递性，若$V\_1$与$V\_2$同构，$V\_2$与$V\_3$同构，则$V\_1$与$V\_3$也同构
2. 同构的线性空间中的零向量必定是相互对应的[^1]
3. 同构的线性空间中的线性相关向量系对应于线性相关向量系，线性无关向量系对应于线性无关向量系

[^1]: 再次强调，线性空间中必定含有零元素！

根据同构空间的定义，我们很容易得出这样的结论:**同构空间的维数一定是相等的！**

事实上，存在着如下的定理:

**定理1** **数域$F$上的两个有限维线性空间同构的充要条件是两空间的维数相等**

同构空间的概念是非常有用的，可以使得不同的线性空间$V^n$的问题转化到向量空间$F^n$中的问题加以研究。

#线性算子的矩阵表示#

一个线性空间可以用其坐标来表示，那么线性算子能否使用具体的数字来表示呢？为了回答这个问题，我们首先要定义线性算子相等的概念:

**定义2**: 设$T\_1$与$T\_2$是由$V^n$到$V^m$的两个线性算子，如果对于任何$x\in V^n$恒有$T\_1(x)=T\_2(x)\in V^m$，则说线性算子$T\_1$与$T\_2$**相等**{: style="color:red"}

**定义3**: 设$\alpha\_1,\alpha\_2,\cdots,\alpha\_n$是$n$维线性空间$V^n$的一组基，T是由$V^n$到$V^m$的线性算子，则$T(\alpha\_1),T(\alpha\_2),\cdotsT(\alpha\_n)\in V^m$叫做$V^n$在算子T下的**基象**{: style="color:red"}


有了上述两个概念，我有如下的定理：

**定理2** **由$V^n$到$V^m$的线性算子T是由基象$T(\alpha\_1),T(\alpha\_2),\cdots T(\alpha\_n)$唯一确定的**

设$x\in V^n$且$x=\lambda\_1\alpha\_1+\lambda\_2\alpha\_2+\cdots\lambda\_n\alpha\_n$，则

$$
\begin{align}
T(x)&=T(\lambda_1\alpha_1+\lambda_2\alpha_2+\cdots+\lambda_n\alpha_n)\\
&=\lambda_1T(\alpha_1)+\lambda_2T(\alpha_2)+\cdots+\lambda_nT(\alpha_n)
\end{align}
$$

其中$\lambda\_1,\lambda\_2,\cdots,\lambda\_n$是已知的，所以只要知道$T(\alpha\_1),T(\alpha\_2),\cdots T(\alpha\_n)$便确定了$T(x)$

因为$T(x)\in V^m$，所以

$$
\begin{align}
T(\alpha_1)=a_{11}\beta_1&+a_{21}\beta_2+\cdots +a_{m1}\beta_m\\
T(\alpha_2)=a_{12}\beta_1&+a_{22}\beta_2+\cdots +a_{m2}\beta_m\\
 & \cdots \\
T(\alpha_n)=a_{1n}\beta_1&+a_{2n}\beta_2+\cdots +a_{mn}\beta_m\\
\end{align}
$$

其中$\beta_i$是$V^m$中的基。

因此，我们可以得到：

$$
\begin{equation}
T(\alpha_1,\alpha_2,\cdots,\alpha_n)=(\beta_1,\beta_2,\cdots,\beta_n)\left[ 
\begin{array}{ccc}
a_{11} & a_{1,2} &\cdots & a_{1n} \\
a_{21} & a_{2,2} &\cdots &a_{2n} \\
\vdots &  \vdots & &\vdots \\
a_{m1} & a_{m,2} &\cdots &a_{mn} \\
\end{array}
 \right]
=(\beta_1,\beta_2,\cdots,\beta_m)A_{m\times n}
\end{equation}
$$

其中，$a\_{11},a\_{21},\cdots,a\_{m1}$是$\alpha\_1$经过$T$变换后，在象空间的坐标表示。

上式中的$A_{m\times n}$称为线性算子$T$在基底$\\{\alpha\_1,\alpha\_2,\cdots,\alpha\_n\\}$与$\\{\beta\_1,\beta\_2,\cdots,\beta\_m\\}$下的**矩阵表示**{: style="color:red"}


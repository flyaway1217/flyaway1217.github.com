---
layout: post
time: 2013-10-28
title: 矩阵论学习笔记5-特征值与特征向量
category: Matrix-theory
keywords: 矩阵论,数学,特征值,特征向量
tags: 矩阵论,数学
description: 矩阵论学习课程笔记 
---


#特征值和特征向量之间的关系#

[上一篇]({% post_url 2013-10-13-Theory-of-Matrices-4 %} )的矩阵论笔记中，说明了如何计算一个**线性变换**的特征向量和特征值，今天主要是记录特征值和特征向量之间的关系。

首先根据[代数基本定理](http://zh.wikipedia.org/wiki/%E4%BB%A3%E6%95%B0%E5%9F%BA%E6%9C%AC%E5%AE%9A%E7%90%86 ):**n次代数方程在复数域内有且仅有n个根**，因此n阶矩阵A在复数域内有且仅有n个特征值。设$\lambda\_1,\lambda\_2,\cdots,\lambda\_r$是A的相异特征值，他们的重数分别为$m\_1,m\_2,\cdots,m\_r$，则称$m\_i$是$\lambda\_i$的**代数重数**{: style="color:red"}。很显然，对于**代数重数**来说，一定满足$\sum\_{i=1}^r m\_i=n$


对于线性空间$V$上线性变换$T$，属于特征值$\lambda\_i$的全部特征向量再加上零向量所组成的集合，记为$V\_{\lambda\_i}$，即

$$
\begin{equation}
V_{\lambda_i} = \{\alpha \big| T(\alpha) = \lambda_i\alpha, \alpha \in V\}
\end{equation}
$$

对于矩阵$A\in C^{n\times n}$，$\lambda\_i$是$A$的一个特征值，也记为$V\_{\lambda\_i}$:

$$
\begin{equation}
V_{\lambda_i} = \{x \big| Ax = \lambda_ix, x \in C^n \}
\end{equation}
$$


则$V\_{\lambda\_i}$是$C^{n\times n}$的一个子空间，称$V\_{\lambda\_i}$是矩阵$A$[^1]的对应于$\lambda\_i$的**特征子空间**{: style="color:red"}

显然**特征子空间**的维数$dim(V\_{\lambda\_i})$就是对应$\lambda\_i$的线性无关特征向量的最大个数，我们称$dim(V\_{\lambda\_i})$为特征值$\lambda\_i$的**几何重数**{: style="color:red"}

[^1]:也即线性变换$T$

关于$\lambda_i$的**代数重数**和**几何重数**的关系有如下定理:

1. 矩阵$A$的任一特征值的几何重数不大于它的代数重数
2. 如果$\lambda\_0$的代数重数是1，则它的几何重数$dim(V_{\lambda\_0})=1$

#相异特征值对应的特征向量之间的关系#

**定理**: 设$\lambda\_i$,$\lambda\_j$是矩阵$A$的两个互异特征值，$x\_i$,$x\_j$是对应的特征向量，则$x\_i$,$x\_j$是线性无关的。

**证明**: 设有$k\_1 x\_i + k\_2 x\_j = 0$，等式两边同时右乘$(\lambda\_{i}I-A)$,得到[^2]:$k\_2(\lambda\_iI-A)x\_j=0\Rightarrow k\_2(\lambda\_i-\lambda\_j)x\_j=0$[^3].又因为$\lambda\_i\neq\lambda\_j$,$x\_j\neq 0$,所以$k\_2=0$,同理推得$k\_i=0$,所以$x\_i$和$x\_j$是线性无关的。

**推论**: $n$阶矩阵$A$若有$n$个不同特征值，则$A$一定有$n$个线性无关的特征向量

**推论**: $n$阶矩阵$A$的每一个特征值的代数重数等于几何重数，则$A$一定有$n$个线性无关的特征向量

[^2]: 根据特征向量的定义:$(\lambda\_iI-A)x\_i=0$
[^3]: 因为$Ax\_j = \lambda\_jx\_j$,所以$(\lambda\_iI-A)x\_j=(\lambda\_i-\lambda\_j)x\_j$

#对角矩阵与线性变换#

**定义**: 设$T$是数域$F$上的$n$维线性空间$V^{n}$上的一个线性变换，如果$V^{n}$中存在一组基使得$T$在这组基下的矩阵表示是对角矩阵，则称$T$是**可对角化**的。

**定理**: 数域$F$上的$n$维线性空间$V^{n}$的一个线性变换,T可对角化的充要条件是:**T有n个线性无关的特征向量**{: style="color:red"}

**定义**: 如果n阶矩阵A与对角矩阵相似，则称矩阵A是**可对角化**的。

**定理**: n阶矩阵A可对角化的充要条件是:**A有n个线性无关的特征向量**{: style="color:red"}

**定义**: 当n阶矩阵A有n个线性无关的特征向量时，则称矩阵A有**完备的特征向量系**{: style="color:red"},否则就称A为**亏损矩阵**{: style="color:red"}

#不变子空间#

**定义**: 设$V^n$是数域上F上的一个n维线性空间，T是$V^n$上的线性变换，$V\_1\subseteq V^n$的子空间，如果对于任何$\xi\in V\_1$恒有$T(\xi)\in V\_1$，则称$V\_1$是关于T的**不变子空间**{: style="color:red"}

从上面这个定义可以看出，整个线性空间V和零子空间对于每个线性变换T来说都是其**不变子空间**
 

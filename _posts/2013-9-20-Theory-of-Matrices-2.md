---
layout: post
time: 2013-09-20
title: 矩阵论学习笔记2
category: 矩阵论
keywords: 矩阵论,数学
tags: 矩阵论,数学
description: 矩阵论学习课程笔记
---

#线性空间的基底变换与转移矩阵#

之前曾经说过，在一个线性空间中，它有着很多不同的基底，每一组基底都能唯一地刻画整个线性空间，那么，我们就要想，如果这些 **不同**的基底刻画的是**相同**的线性空间，那么这些不同的基底之间是否存在某些转化关系呢？因此，我们就引出了**转移矩阵**的概念：

**定义1**: 设$[\alpha\_1,\alpha\_2,\cdots,\alpha\_n]$和$[\beta\_1,\beta\_2,\cdots,\beta\_n]$是线性空间$V$的两个不同的基底，且满足

$$
\begin{equation}
[\beta_1,\beta_2,\cdots,\beta_n]=[\alpha_1,\alpha_2,\cdots,\alpha_n]P
\end{equation}
$$

其中$P=[p\_1,p\_2,\cdots,p\_n]$，其第i列是$\beta\_i$在$[\alpha\_1,\alpha\_2,\cdots,\alpha\_n]$下的坐标，P是可逆的[^1]，则称P是由基底$[\alpha\_1,\alpha\_2,\cdots,\alpha\_n]$到$[\beta\_1,\beta\_2,\cdots,\beta\_n]$的**转换矩阵**{: style="color:red"}

[^1]: 根据基底和坐标的定义，坐标是唯一的，因此$P$中每一列都是线性无关的，所以$P$是非奇异的，也即是可逆的。

上述 **转移矩阵**表达的是两个不同基底之间的转化关系，那我们不禁又要问：在这两个基底下的坐标表示又有什么联系呢?

我们可以做一下推导：

设$s=[\alpha\_1,\alpha\_2,\cdots,\alpha\_n]x$且$s=[\beta\_1,\beta\_2,\cdots,\beta\_n]y$，其中$x,y$分别表示在向量$s$在$[\alpha\_1,\alpha\_2,\cdots,\alpha\_n]$和$[\beta\_1,\beta\_2,\cdots,\beta\_n]$下的坐标，根据上面对**转移矩阵**的定义，我们可以得到:

$$
\begin{align}
s&=[\beta_1,\beta_2,\cdots,\beta_n]y=[\alpha_1,\alpha_2,\cdots,\alpha_n]x=[\alpha_1,\alpha_2,\cdots,\alpha_n]Py\\
&\Rightarrow [\alpha_1,\alpha_2,\cdots,\alpha_n](x-Py)=0
\end{align}
$$

又因为$[\alpha\_1,\alpha\_2,\cdots,\alpha\_n]$是线性无关的(非奇异)的，所以$x-Py=0\Rightarrow x=Py$，这就是向量$s$在向量空间$V$中两个不同基底下的**坐标转换关系**{: style="color:red"}。

得出了这样的转换关系，同一个线性空间中的元素就能在不同的基下自由转化了，一般来说，在平时使用的时候，我们都默认是在 **自然基底**{: style="color:red"}下的坐标，对于二维空间来说，自然基底是**$[\\{1,0\\},\\{0,1\\}]$**，而三维空间则是**$[\\{1,0,0\\},\\{0,1,0\\},\\{0,0,1\\}]$**

#线性算子#

**定义2**: 设$X$和$Y$都是数域$F$上的线性空间，若映射$T:X\to Y$满足条件：

1. $T(x\_1+x\_2)=Tx\_1+Tx\_2$	$\left(\forall x\_1,x\_2\in X\right)$
2. $T(\lambda x)=\lambda Tx$	$\left(\forall \lambda\in F,x\in X\right)$

则称$T$是从$X$到$Y$的**线性算子**{: style="color:red"}(或者**线性映射**{: style="color:red"})[^3]

对于$Tx=y$来说，x称为**原像**{: style="color:red"},y称为**像**{: style="color:red"}，$X$称为**定义域**{: style="color:red"}，$Y$称为**值域**{: style="color:red"}(事实上值域并没有"充满"$Y$，也就说，$X$中的每一个元素都可以通过映射$T$映射到$Y$中的元素，但是并不是说$Y$中的每一个元素都有一个$X$中的元素与其对应。)

[^3]: 其实**线性算子**就是一个转换过程，将一个元素从一个空间转换到另一个空间。需要注意的是，这样的映射有很多，但只有满足上述两个条件的映射才能被称为是**线性算子**

##特殊的线性算子##

线性空间$X$到自身的线性算子称为$X$上的**线性变换**{: style="color:red"}

线性空间$X$到数域$F$的线性算子称为$X$上的**线性泛函**{: style="color:red"}

##线性算子的性质##

1. $T(0)=0,T(-x)=-T(x) \forall x\in X$
2. $T(\lambda\_1x\_1+\lambda\_2x\_2+\cdots+\lambda\_nx\_n)=\lambda\_1T(x\_1)+\lambda\_2T(x\_2)+\cdots+\lambda\_nT(x\_n)$
3. 若$\\{x\_1,x\_2,\cdots,x\_n\\}$是$X$中的线性相关系，则$\\{T(x\_1),T(x\_2),\cdots,T(x\_n)\\}$是$Y$中的线性相关系
4. 若$\\{x\_1,x\_2,\cdots,x\_n\\}$在$X$中线性**不**{: style="color:red"}相关，则$\\{T(x\_1),T(x\_2),\cdots,T(x\_n)\\}$在$Y$中**不一定**{: style="color:red"}线性相关

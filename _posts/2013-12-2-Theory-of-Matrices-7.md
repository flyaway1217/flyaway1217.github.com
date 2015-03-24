---
layout: post
time: 2013-12-02
title: 矩阵论学习笔记7-SVD奇异值分解
category: Matrix-theory
keywords: 矩阵论,数学
tags: 矩阵论,数学
description: 矩阵论学习课程笔记 
---


#奇异值#

**定义**: 设$A\in C^{m\times n}$，如果存在非负实数$\sigma$和非零向量$u\in C^n,v\in C^m$使得:

$$
\begin{equation}
Au = \sigma v,A^Hv = \sigma u
\end{equation}
$$

则称$\sigma$为$A$的**奇异值**,$u$和$v$分别称为$A$对应于**奇异值**的**右奇异向量**和**左奇异向量**

根据上述定义，可以得到:

$$
\begin{equation}
A^HAu = \sigma A^Hv = \sigma^2u\\
A^HAv = \sigma A^Hu = \sigma^2v
\end{equation}
$$

因此$\sigma^2$就是$A^HA$的特征值，也是$AA^H$的特征值，而$u$和$v$分别是$A^HA$和$AA^H$对应于特征值$\sigma^2$的特征向量。

#实矩阵的奇异值分解(SVD)#

**定理**: 设$A\in R^{m\times n},r = rank(A)$,则一定存在正交矩阵$U\in R^{m\times m},V\in R^{n\times n}$和对角矩阵

$$
\begin{equation}
\Sigma = diag(\sigma_1,\sigma_2,\cdots,\sigma_r,0,\cdots,0)\in R^{m\times n}
\end{equation}
$$

使得$A=U\Sigma V^T$

$A=U\Sigma V^T$称为矩阵$A$的**奇异值分解**，其中$\sigma\_1\ge\sigma\_2\ge\cdots\ge\sigma\_r>0,(i=1,2,\cdots,r)$称为$A$的**奇异值**。


#SVD的性质#

**性质1:** $A$的非零奇异值的个数$r$就是A的秩


**性质2:** 如果$A$是$n$阶方阵，则$\vert det(A)\vert = \prod\_{i=1}^n\sigma\_i$


**性质3:** $\sigma_1\ge\sigma_2\ge\cdots\ge\sigma_r$,是$A^TA$或$AA^T$的特征值的开方


**性质4:** 设$U=[u\_1,u\_2,\cdots,u\_m]$,$V=[v\_1,v\_2,\cdots,v\_n]$，则$u\_1u\_2\cdots u\_m$是$AA^T$的特征向量，$v\_1v\_2\cdots v\_n$是$A^TA$的特征向量


**性质5:** $A$可以表示成$r$个秩为1的矩阵的和。

$$
\begin{equation}
A = U\Sigma V^T = U_r\Sigma_rV_t^T = \sigma_1u_1v_1^T+\sigma_2u_2v_2^T\cdots+\sigma_ru_rv_r^T
\end{equation}
$$

这是A的**奇异值分解的紧凑形式**


#总结#

其实和**SVD**有关的数学内容是非常多的，这里只是简单记录了一下**奇异值分解**在数学上的相关定义，还有很多内容没有这里没有给出。

**奇异值分解**在矩阵论中是一个非常重要的概念，在很多工程问题中都需要用到SVD，以后可能会单独写一些关于**SVD**具体应用的博文。

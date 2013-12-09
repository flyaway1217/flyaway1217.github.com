---
layout: post
time: 2013-10-13
title: 矩阵论学习笔记4-线性变换的特征值
category: 矩阵论
keywords: 矩阵论,数学,线性变换的特征值
tags: 矩阵论,数学
description: 矩阵论学习课程笔记 
---

#线性变换的特征值问题#

**定义1**: 设$T$是数域$F$上线性空间$V^n$的一个线性变换，如果存在$\lambda\in F$以及非零向量$\xi\in V^n$使得

$$
\begin{equation}
T(\xi)=\lambda\xi \label{eigen value}
\end{equation}
$$

则称$\lambda$为$T$的**特征值**{: style="color:red"}，并称$\xi$为$T$对应于特征值$\lambda$的**特征向量**{: style="color:red"}

此处的 **线性变换**是指从线性空间**自己到自己**{: style="color:red"}的线性算子$T:V^n\rightarrow V^n$

这里的 **特征值**和**特征向量**都是非常抽象的概念，联想到之前的几篇笔记中曾经将抽象的线性空间中的元素用具体的坐标来表示，用具体的数字矩阵来表示线性算子，那么，我们不经要问，有没有办法用具体的数来表示线性空间中抽象的**特征值**和**特征向量**概念呢？很显然，答案是肯定的，推导过程如下：

假设$\alpha\_1,\alpha\_2,\cdots,\alpha\_n$是$n$维线性空间$V^n$的一组基，线性变换$T$在该基底下的矩阵表示为$A$，如果$\lambda$是$T$的特征值，$x$是相应的特征向量，则[^1]

$$
\begin{equation}
\xi = (\alpha_1,\alpha_2,\cdots,\alpha_n)\left[
\begin{array}{ccc}
x_1 \\ x_2 \\ \vdots \\ x_n
\end{array}
\right]
\end{equation}
$$

[^1]: 其中，$\xi$表示的是一个抽象的向量，$x\_1,x\_2\cdots x\_n$则是这个抽象向量在$\alpha\_1,\alpha\_2,\cdots,\alpha\_n$基底下的坐标表示。

根据[上一篇笔记](/矩阵论/2013/10/10/Theory-of-Matrices-3.html#section-1)中的线性算子的矩阵表示说明，我们可以得到如下的等式：

$$
\begin{equation}
T[(\alpha_1,\alpha_2,\cdots,\alpha_n)]\left[
\begin{array}{ccc}
x_1 \\ x_2 \\ \vdots \\ x_n
\end{array}
\right]
=(\alpha_1,\alpha_2,\cdots,\alpha_n)A\left[
\begin{array}{ccc}
x_1 \\ x_2 \\ \vdots \\ x_n
\end{array}
\right]
\end{equation}
$$

又根据式子$\ref{eigen value}$，我们可以得到：

$$
\begin{equation}
T[(\alpha_1,\alpha_2,\cdots,\alpha_n)]\left[
\begin{array}{ccc}
x_1 \\ x_2 \\ \vdots \\ x_n
\end{array}
\right]
=(\alpha_1,\alpha_2,\cdots,\alpha_n)\lambda\left[
\begin{array}{ccc}
x_1 \\ x_2 \\ \vdots \\ x_n
\end{array}
\right]
\end{equation}
$$

联合上述两个等式，我们得到：

$$
\begin{equation}
(\alpha_1,\alpha_2,\cdots,\alpha_n)A\left[
\begin{array}{ccc}
x_1 \\ x_2 \\ \vdots \\ x_n
\end{array}
\right]
=
(\alpha_1,\alpha_2,\cdots,\alpha_n)\lambda\left[
\begin{array}{ccc}
x_1 \\ x_2 \\ \vdots \\ x_n
\end{array}
\right]
\end{equation}
$$

因为$\alpha\_1,\alpha\_2,\cdots,\alpha\_n$是$V^n$中的基底，所以$\alpha\_1,\alpha\_2,\cdots,\alpha\_n$是线性无关的，因此最终我们得到:

$$
\begin{equation}
A\left[
\begin{array}{ccc}
x_1 \\ x_2 \\ \vdots \\ x_n
\end{array}
\right]
=
\lambda\left[
\begin{array}{ccc}
x_1 \\ x_2 \\ \vdots \\ x_n
\end{array}
\right]
\end{equation}
$$

而上述的等式，就是矩阵 **特征值**和**特征向量**的定义，所以，我们可以得出这样的结论:**线性变换$T$的特征值$\lambda$也是A的特征值**{: style="color:red"}

仔细想想，根据上面这条结论其实是有些问题的，因为一个线性空间有多个不同的基底，根据不同的基底，线性变换$T$就会有不同的矩阵表示$A$，那就是说线性变换$T$会有多组不同的特征值？其实线性变化$T$的特征值是确定的，不存在多组不同的值，存在以下几个结论，能够保证不会出现上述的情况：

1. **同一线性变换在$V^n$的不同基底下的矩阵表示是相似的**
2. **相似矩阵有相同的特征多项式**
3. **相似矩阵有相同的特征值**

关于$n$阶矩阵及其特征值$\lambda$，还有如下的结论:

1. $n$阶矩阵$\mu A$有特征值$\mu\lambda$,对应的特征向量仍为x($\mu$为任意常数)
2. 矩阵$A^{m}$有特征值$\lambda^{m}$,对应的特征向量仍为$x$($m$为正整数)
3. 矩阵$A^{-1}$有特征值$\lambda^{-1}(\lambda\neq 0)$,对应的特征向量仍为$x$.
4. 矩阵$A^{T}$有特征值$\lambda$

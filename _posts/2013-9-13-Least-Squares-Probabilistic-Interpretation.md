---
layout: post
time: 2013-09-13
title: 最小二乘法的概率解释
category: 机器学习
keywords: Least Squares,机器学习,Normal Distribution,最小二乘法,正态分布
tags: 机器学习,Least Squares
description: 最小二乘法可行性的概率分析，很多时候我们往往直接使用最小二乘法来对拟合函数做评价，而为什么要使用最小二乘法而不是其他的函数，却很少人说得清楚，本文结合斯坦福Andrew Ng教授的《机器学习》公开课，从概率角度给出一个比较合理的解释。
---

#最小二乘法简介#

> **最小二乘法**(又称最小平方法)是一种数学优化技术。它通过最小化误差的平方和寻找数据的最佳函数匹配。利用最小二乘法可以简便地求得未知的数据，并使得这些求得的数据与实际数据之间误差的平方和为最小。

上面的定义是摘自[维基百科](http://zh.wikipedia.org/wiki/%E6%9C%80%E5%B0%8F%E4%BA%8C%E4%B9%98%E6%B3%95, 最小二乘法)，在实际拟合应用中，而我个人直观的理解就是，最小二乘法是一个**评价函数(标准)**，用来评价我们得到的拟合曲线是否是最好的。最小二乘法的函数表示为:

$$
\begin{equation}
\min\sum_i^n(y_m^{(i)}-y^{(i)})^2 \label{least squares}
\end{equation}
$$

其中$y\_m$表示我们拟合函数得到的拟合结果，$y\_i$表示真实值。


#为什么是这个函数#

首先假设我们有这样的数据集:$(\vec{x\_0},y\_0),(\vec{x\_1},y\_1),\cdots (\vec{x\_m},y\_m)$,$\vec{x}$是当前实例的一个特征向量，$y$是对应的输出,m是数据集的大小。拟合问题的目标通常是寻找到一个函数，能够很好的描述这些点的分布情况。最简单的情况就是一条直线，然而在实际应用要复杂得多，数据是高维的。

面对一个高维的拟合问题，我们通常假设一个参数向量$\vec{\theta}$，则预测输出为:

$$
\begin{equation}
y_m^{(i)} = \vec{\theta^T}x^{(i)}
\end{equation}
$$

拟合问题的目标就是寻找一个合适的$\theta$值，使得上面的公式$\ref{least squares}$到达最小。

那么为什么要选择这个函数而不是其他函数呢，为了回答这个问题，我们又要进行假设了，假设输入$\vec{x^{(i)}}$和输出$y^{(i)}$之间的真实关系是这样的:

$$
\begin{equation}
y_m^{(i)} = \vec{\theta^T}x^{(i)} + \epsilon^{(i)}
\end{equation}
$$

其中$\epsilon^{(i)}$称为**错误项(error term)**，表示当前实例所有没有被特征值表达出来的影响因素(也可以理解成噪音)。我们进一步假设$\epsilon^{(i)}$是独立同分布的，因此，根据中心极限定理，这个$\epsilon^{(i)}$应该满足标准的正态分布，即:

$$
\begin{equation}
\epsilon^{(i)}\sim \mathcal{N}(0,\sigma^2)
\end{equation}
$$

所以$\epsilon^{(i)}$的密度函数可以写成:

$$
\begin{equation}
p(\epsilon^{(i)}) = \frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(\epsilon^{(i)})^2}{2\sigma^2}}
\end{equation}
$$

所以我们可以得到：

$$
\begin{equation}
p(y^{(i)}|x^{(i)};\theta) = \frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(y^{(i)}-\theta^Tx^{(i)})^2}{2\sigma^2}}
\end{equation}
$$

此处$p(y^{(i)}\|x^{(i)};\theta)$表示在给定$x^{(i)}$并且参数为$\theta$的情况下，$y^{(i)}$的分布情况[^1]。 注意，此时$\theta$不是一个随机变量，而应该看成一个固定的值(虽然此时我们并不知道$\theta$具体是多少)。

[^1]: 此处的原文是: "$p(y^{(i)}\|x^{(i)};\theta)$ indicates that this is the distribution of $y^{(i)}$ given $x^{(i)}$ and parameterized by $\theta$"

用$X$表示所有数据组成的矩阵($x^{(i)}$是一个向量)，用$\vec{y}$表示所有$y^{(i)}$组成的向量，那么我们就可以得到**似然函数**：

$$
\begin{align}
L(\theta)&=L(\theta;X,\vec{y})=p(\vec{y}|X;\theta)\\
&=\prod_{i=1}^mp(y^{(i)}|x^{(i)};\theta) \\
&=\prod_{i=1}^m\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(y^{(i)}-\theta^Tx^{(i)})^2}{2\sigma^2}} \label{difficulty}
\end{align}
$$

为了最大程度的使拟合符合真实情况，我们尽可能的使$L(\theta)=p(\vec{y}\|X;\theta)$达到最大，也就是说在给定$x^{(i)}$的情况下，使得$y^{(i)}$的概率最大。

但是公式$\ref{difficulty}$太过复杂，不好处理，因此我们可以将求$L(\theta)$的最大值转化为求$logL(\theta)$的最大值[^3]，所以:

[^3]: 此处利用了对数函数$\log\_n xy = \log\_n x + \log\_n y$的性质

$$
\begin{align}
\mathcal{L}(\theta)&=\log L(\theta) \\
&= \log \prod_{i=1}^m\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(y^{(i)}-\theta^Tx^{(i)})^2}{2\sigma^2}}\\
&=\sum_{i=1}^m \log \frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(y^{(i)}-\theta^Tx^{(i)})^2}{2\sigma^2}}\\
&=m\log \frac{1}{\sqrt{2\pi}\sigma}-\frac{1}{\sigma^2}\cdot\frac{1}{2}\sum_{i=1}^m(y^{(i)}-\theta^Tx^{(i)})^2 \label{final}
\end{align}
$$


最终，最大化$\mathcal{L}$就可以转化成为最小化$\frac{1}{2}\sum_{i=1}^m(y^{(i)}-\theta^Tx^{(i)})^2$，这个公式是不是有点眼熟呢？就是上面最开始给出的最小二乘法(公式$\ref{least squares}$)的函数形式!

#总结#

本文是根据斯坦福大学的Andrew Ng教授的《机器学习》的公开课整理而成的，首先从假设误差项符合正态分布[^2]开始，一步一步推导，最终证明最小二乘法的有效性。最小二乘法是一个非常常见的数学优化技术，如果了解其存在的原因，对以后学习和使用都有很大的益处。

[^2]: 正态分布真的是一个非常神奇的东西，生活中很多事情背后都隐含着正态分布的身影，更多内容可以查看[这里](http://zh.wikipedia.org/wiki/%E6%AD%A3%E6%80%81%E5%88%86%E5%B8%83 正态分布)

#参考资料#

- 斯坦福《机器学习》公开课第三集及其配套讲义
- [最小二乘法？为神马不是差的绝对值](http://blog.sciencenet.cn/blog-430956-621997.html )
- [维基百科:正态分布](http://zh.wikipedia.org/wiki/%E6%AD%A3%E6%80%81%E5%88%86%E5%B8%83)


---
layout: post
time: 2013-09-13
title: 局部加权线性回归
category: 机器学习
keywords: Locally Weighted Linear Regression,局部加权线性回归,线性回归
tags: Locally Weighted Linear Regression,局部加权线性回归,线性回归
description: 本文介绍了一种称为局部线性回归的机器学习算法，和传统的线性回归算法相比，它只考虑预测点附近的点，这样能够在一些程度上避免过拟合或欠拟合的情况。
---

#局部加权线性回归#

对于一个数据集合$(x\_0,y\_0),(x\_1,y\_1),\cdots,(x\_m,y\_m)$，我们预测它在$x$点时对应的$y$值时，如果采用的是传统的 **线性回归模型**，那么：

1. Fit $\theta$ to mininize $\sum\_i(y^{(i)}-\theta^Tx^{(i)})^2$
2. Output $\theta^Tx$

简单来说，这个过程其实是在先拟合出一条曲线，然后再用这个曲线去预测需要预测的点。但是如果这个曲线拟合得不好(或者说样本数据含有大量噪音)，那么这个预测结果就会很差。

但是对于 **局部加权线性回归(Locally Weighted Linear Regression)**来说，在一定程度上可以避免上述问题，但是会付出一些计算量的代价。

**局部加权线性回归(Locally Weighted Linear Regression)**的过程是这样的:

1. Fit $\theta$ to mininize $\sum\_iw^{(i)}(y^{(i)}-\theta^Tx^{(i)})^2$
2. Output $\theta^Tx$

其中$w^{(i)}$是一个非负的权值，这个权值是用来控制每一个训练实例对于模型的贡献，假设要预测的点是$x$，则$w^{(i)}$可以定义为:

$$
\begin{equation}
w^{(i)}=e^{-\frac{(x^{(i)}-x)^2}{2\tau^2}}
\end{equation}
$$

#权值的意义#

要理解这个凭空多出来的$w^{(i)}$是什么意思，我们需要首先来看一下这个函数的图像:

![$w^{(i)}$](/assets/image/posts/2013-9-13-Locally-Weighted-Linear-Regression-1.png)

从图像中我们可以看到，越是靠近预测点$x$，其函数值就越接近于1，越是远离预测点$x$，其函数值就越接近于0。将这个函数加入到原始的**线性回归模型**中，就变成了**局部加权线性回归模型**，其直观意义就是越是*靠近*{: style="color:red"}预测点的实例点，它们对预测点的影响就应该*越大*{: style="color:red"}，越是*远离*{: style="color:red"}预测点的实例点，它们对预测点的影响就*越小*{: style="color:red"}，也就是说**局部加权线性回归模型**只关注于预测点*附近*{: style="color:red"}的点(*这就是局部的含义*{: style="color:red"})，而不考虑其他远离预测点的实例点。

#参数学习和非参数学习#

**局部加权线性回归**其实是一个**非参数学习算法(non-parametric learning algorithm)**，而相对的的，**线性回归**则是一个**参数学习算法(parametric learning algorithm)**，因为它的参数是固定不变的，而**局部加权线性回归**的参数是随着预测点的不同而不同。

由于每次预测时都只看预测点附近的实例点，因此每一次预测都要重新运行一遍算法，得出一个组参数值，因此其计算代价是比较高的。

#参考资料#

- 斯坦福《机器学习》公开课第三集及其配套讲义

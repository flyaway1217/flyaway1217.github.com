---
layout: post
time: 2013-09-14
title: Logistic回归
category: Machine-Learning
keywords: Logistic回归,机器学习,分类器,Classification
tags: 机器学习,Logistic回归
description: 本文根据斯坦福公开课《机器学习》的内容，加上一些其他的资料，对Logistic回归进行了总结和归纳。
---

#Logistic回归#

在实际应用中，除了预测问题，其实更多的是 **分类问题**，**回归问题**和**分类问题**其实是非常相似的，主要区别是**分类问题**的输出变量Y是取有限个离散值的，而**回归问题**本质上是一个拟合问题，给定一组已知数据，选择一条函数曲线使其很好地拟合已知数据且很好地预测未知数据。

面对两个相似的问题，我们就要考虑能否用同样的算法来解决？之前学习过[**线性回归模型**]({% post_url 2013-3-19-Gradient-Descent %} "线性回归模型")，其实只要对线性回归模型稍加修改，就能将其应用到 **分类问题**上面了，经过修改过的**线性回归模型**就被称为**Logistic回归**。具体修改方案如下:

假设对应的分类目标只有两类，即$y\in {0,1}$，回顾一下，在[**线性回归模型**]({% post_url 2013-3-19-Gradient-Descent %} "线性回归模型")中，我们的预测函数为$h\_\theta(x)$，在**分类问题**中，我们将其稍加修改:

$$
\begin{equation}
h_\theta(x)=g(\theta^Tx)=\frac{1}{1+e^{-\theta^Tx}}
\end{equation}
$$

其实就是在原来的预测函数上叠加一个$g(z)$函数，而$g(z)$是如此定义的:

$$
\begin{equation}
g(z)=\frac{1}{1+e^{-z}}
\end{equation}
$$

可以来看一下$g(x)$函数的图像:

![logistic函数图像](/assets/image/posts/2013-9-14-Logistic-Regression-1.png)

从图像中可以看出，函数值是永远固定在$[0,1]$之内的，其实这个$g(z)$函数就被称为**Logistic函数**或者**sigmoid函数**。因此，在这个**Logistic函数**的作用下，$h\_\theta(x)$就被固定在$[0,1]$之内，也即$h\_\theta(x)\in [0,1]$。

再次观察**Logistic函数**的图像，我们可以发现，$x$越大，其函数值越接近于$1$，$x$越小，其函数值越接近与$0$，因此我们用$h\_\theta(x)$来估计每个分类的概率值，即：

$$
\begin{equation}
p(y=1|x;\theta)=h_\theta(x)
\end{equation}
$$

又因为我们的假设是一个二元分类问题，所以：

$$
\begin{equation}
p(y=0|x;\theta)=1 - h_\theta(x)
\end{equation}
$$

将上面两个等式合并:

$$
\begin{equation}
p(y|x;\theta) = (h_\theta(x))^y(1-h_\theta(x))^{1-y}
\end{equation}
$$

接着，我们可以写出参数$\theta$的似然函数:

$$
\begin{align}
L(\theta)&=p(y|X;\theta)\\
&=\prod_{i=1}^mp(y^{(i)}|x^{(i)};\theta)\\
&=\prod_{i=1}^m(h_\theta(x^{(i)}))^{y^{(i)}}(1-h_\theta(x^{(i)}))^{1-y^{(i)}}
\end{align}
$$

这时，就可以依照在[**最小二乘法的概率解释**]({% post_url 2013-9-13-Least-Squares-Probabilistic-Interpretation %} "最小二乘法的概率解释")中的推导过程一样，将这个关于$\theta$的复杂似然函数转化为相对简单的对数函数:

$$
\begin{align}
\ell(\theta)&=\log L(\theta)\\
&=\sum_{i=1}^my^{(i)}\log h(x^{(i)})+(1-y^{(i)})\log (1-h(x^{(i)}))
\end{align}
$$

现在的目标就是要使得这个似然函数最大化，可以回想一下我们在[**线性回归模型**]({% post_url 2013-3-19-Gradient-Descent %} "线性回归模型")中所用的算法——**梯度下降法**，在此处我们也可以使用这个算法，使得$\theta = \theta+\alpha\nabla\ell(\theta)$，需要注意的是，**此处我们使用的加号而不是减号，因为我们要求的最大值而不是最小值。**{: style="color:red"}

对$\theta$中的每一个分量进行求偏导(此时为了运算的方便，暂时当做只有一组数据)：

$$
\begin{equation}
\frac{\partial}{\partial\theta_j}\ell(\theta)=\left(y\frac{1}{g(\theta^Tx)}-(1-y)\frac{1}{1-g(\theta^Tx)}\right)\frac{\partial}{\partial\theta_j}g(\theta^Tx)\label{0}
\end{equation}
$$

而又因为$g(z)=\frac{1}{1+e^{-z}}$，所以

$$
\begin{align}
\frac{d}{dz}g(z)&=\frac{1}{(1+e^{-z})^2}\cdot e^{-z}\\
&=\frac{1}{1+e^{-z}}\cdot \left(1-\frac{1}{1+e^{-z}}\right)\\
&=g(z)\left(1-g(z)\right)
\end{align}
$$

因此式子$\ref{0}$可以进行如下的推导：

$$
\begin{align}
\frac{\partial}{\partial_j}\ell(\theta)&=\left(y\frac{1}{g(\theta^Tx)}-(1-y)\frac{1}{1-g(\theta^Tx)}\right)g(\theta^Tx)(1-g(\theta^Tx))\frac{\partial}{\partial_j}\theta x\\
&=\left[y(1-g(\theta x))-(1-y)g(\theta x)\right]\cdot x_j\\
&=(y-g(\theta^Tx))\cdot x\\
&=(y-h_\theta(x))\cdot x
\end{align}
$$

最终，我们得到了**梯度上升法**{: style="color:red"}的递推公式:


$$
\begin{equation}
\theta_j = \theta_j + \alpha(y^{(i)}-h_\theta(x^{(i)}))x_j^{(i)}\label{1}
\end{equation}
$$

到现在为止，我们已经得到了**Logistic回归**模型的学习算法了。

#比较#

这个公式$\ref{1}$和[**线性回归模型**]({% post_url 2013-3-19-Gradient-Descent %} "线性回归模型")中的**梯度下降法**{: style="color:red"}"长得"是一样的，但是其**本质**是完全不同的，在[**线性回归模型**]({% post_url 2013-3-19-Gradient-Descent %} "线性回归模型")中，$h\_\theta(x)$是一个线性函数，而在**Logistic回归**中，$h\_\theta(x)$则不是一个线性函数，而是一个sigmoid函数。

在学习算法中，有三种学习模型是非常相似的，分别是[**线性回归模型**]({% post_url 2013-3-19-Gradient-Descent %} "线性回归模型")、**Logistic回归**和[**感知机模型**]({% post_url 2013-3-2-Statical-Learning-Perceptron %} "感知机模型")，它们不管在模型的建立还是在算法的求解上都非常的相似[^1]，但是它们之间也存在着不同的地方。

首先是[**线性回归模型**]({% post_url 2013-3-19-Gradient-Descent %} "线性回归模型")，它主要使用来对一系列的点进行拟合的，它的输出值($h\_\theta(x)$)是任意的预测值。

而[**感知机模型**]({% post_url 2013-03-02-Statical-Learning-Perceptron %} "感知机模型")则是一种典型的简单分类器，它的输出值($h\_\theta(x)$)只能是固定的有限的几个类别，在二元分类问题中，其输出值($h\_\theta(x)$)只能0或1，即$h\_\theta(x)\in \\{0,1\\}$

最后是本文的主角，**Logistic回归**，某种程度上，我觉得它是介于上面两种模型之间的"中间模型"，它的输出值($h\_\theta(x)$)虽然也是固定在有限的范围内，但是却是连续的，而不像感知机那样，全是离散的值，在二元分类中，其输出值是$h\_\theta(x)\in [0,1]$。

[^1]: 其实之前我自己都一直在困惑，这个三个模型的区别到底在哪里


#参考资料#

- 斯坦福公开课《机器学习》第三集及其配套讲义
- [logistic回归的一些直观理解](http://chen.yi.bo.blog.163.com/blog/static/150621109201010301321654/)

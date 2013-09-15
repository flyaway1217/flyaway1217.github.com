---
layout: post
time: 2013-09-14
title: Logistic回归
category: 机器学习
keywords: Logistic回归,机器学习,分类器,Classification
tags: 机器学习,Logistic回归
description: 本文根据斯坦福公开课《机器学习》的内容，加上一些其他的资料，对Logistic回归进行了总结和归纳。
---

#Logistic回归#

在实际应用中，除了预测问题，其实更多的是 **分类问题**，**回归问题**和**分类问题**其实是非常相似的，主要区别是**分类问题**的输出变量Y是取有限个离散值的，而**回归问题**本质上是一个拟合问题，给定一组已知数据，选择一条函数曲线使其很好地拟合已知数据且很好地预测未知数据。

面对两个相似的问题，我们就要考虑能否用同样的算法来解决？之前学习过[**线性回归模型**](/机器学习/2013/09/05/Gradient-Descent.html "线性回归模型")模型，其实只要对线性回归模型稍加修改，就能将其应用到 **分类问题**上面了，经过修改过的**线性回归模型**就被称为**Logistic回归**。具体修改方案如下:

假设对应的分类目标只有两类，即$y\in {0,1}$，回顾一下，在[**线性回归模型**](/机器学习/2013/09/05/Gradient-Descent.html "线性回归模型")中，我们的预测函数为$h\_\theta(x)$，在**分类问题**中，我们将其稍加修改:

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

从图像中可以看出，函数值是永远固定在$[0,1]$之内的，其实这个$g(z)$函数就被称为**Logistic函数**或者**sigmod函数**。因此，在这个**Logistic函数**的作用下，$h\_\theta(x)$就被固定在$[0,1]$之内，也即$h\_\theta(x)\in [0,1]$。

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

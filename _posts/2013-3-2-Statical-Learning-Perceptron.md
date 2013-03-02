---
published: false
layout: post
time: 2013-3-2
title: 感知机模型
category: 统计学习
keywords: 感知机,perceptron
tags: 统计学习方法,监督学习
description: 感知机(perceptron)是二类分类的线性分类模型，其输入为实例的特征向量，输出为实例的类别，取+1和-1二值。感知机旨在求出将训练数据进行线性划分的分离超平面。为此，导入基于误分类的损失函数，利用梯度下降法对损失函数进行极小化，求得感知机模型。
---

**感知机(perceptron)**是二类分类的线性分类模型，其输入为实例的特征向量，输出为实例的类别，取+1和-1二值。感知机对应于输入空间(特征空间)中将实例划分为正负两类的分离超平面，属于判别模型。感知机旨在求出将训练数据进行线性划分的分离超平面。为此，导入基于误分类的损失函数，利用梯度下降法对损失函数进行极小化，求得感知机模型。

#感知机模型#
**定义1(感知机)** 假设输入空间(特征空间)是$\cal{X}\subseteq\boldsymbol{R}^n$，输出空间是$\cal{Y}=\\{+1,-1\\}$。输入$x\in\cal{X}$表示实例的特征向量，对应于输入空间(特征空间)的点，输出$y\in\cal{Y}$表示实例的类别。由输入空间到输出空间的如下函数

$$
\begin{equation}
f(x)=sign(w * x+b)
\end{equation}
$$

称为感知机。其中，$w$和$b$为感知机模型参数，$w\in\boldsymbol{R}^n$叫做**权值(weight)**或**权值向量(weight vector)**，$b\in\boldsymbol{R}$叫做**偏置(bisa)**[^1]，$w\cdot x$表示$w$和$x$的内积。$sign$是符号函数，即

[^1]:此处的$w$和$b$就是模型后面要学习的参数，一旦$w$和$b$确定了，感知机模型也就学习完成了。

$$
\begin{equation}
sign(x)=
\begin{cases}
+1 & x \geq 0 \\
-1 & x < 0
\end{cases}
\end{equation}
$$

感知机是一种线性分类模型，属于判别模型。感知机模型的假设空间是定义在特征空间中的所有
**线性分类器模型(linear classification model)**或**线性分类器(linear classifier)**，即函数集合$\\{f\|f(x)=w\cdot x+b\\}$[^2]。

[^2]:因为是线性分类器，所以$x$都是一次幂的，高次幂的情况不考虑。

感知机有如下几何解释:线性方程

$$
\begin{equation}
w\cdot x +b=0
\end{equation}
$$

对应于特征空间$\boldsymbol{R}^n$中的一个超平面$S$，其中$w$是超平面的法向量，$b$是超平面的截距。这个超平面将特征空间划分两个部分，位于两部分的点(特征向量)分别被分为正、负两类。因此，超平面$S$称为**分离超平面(separating hyperplane)**。
如图所示

![感知机模型](/assets/image/posts/2013-3-2-Statical-Learning-Perceptron1.png)

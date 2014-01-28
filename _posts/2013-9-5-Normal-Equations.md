---
layout: post
time: 2013-09-05
title: Normal Equations
category: 机器学习
keywords: Normal Equations,矩阵,迹
tags: Normal Equations,矩阵,迹
description: 基于斯坦福《机器学习》公开的内容，计算得到矩阵形式的Normal Equation。
---

本文主要是将上一篇[博文]({% post_url 2013-3-19-Gradient-Descent %})中的得出的梯度下降法的算法用矩阵进行化简，得到一个一般化的公式，最后对这两种方法进行了比较。

#几个结论#

在开始正式推导之前，我将会列出一些推导过程中需要用到的定义和结论，其中有些我会给出证明。

首先是关于矩阵迹的定义:一个$n\times n$的矩阵$A$的迹，是指$A$的主对角线上各个元素的总和。迹是定义在矩阵上的一种运算，它是一个实数。

关于矩阵的迹，它有以下几个结论：

1. $trAB=trBA$	推论:$trABC=trCAB=trBCA$
2. 令$f(A)=trAB$[^1],则$\nabla_AtrAB=B^T$
3. $trA=trA^T$
4. 如果$a\in R$,则$tra=a$
5. $\nabla\_AtrABA^TC=CAB+C^TAB^T$

[^1]:$f(A)$表示一个函数，这个函数将$m\times n$的矩阵$A$作为输入，将一个实数$trAb$作为输出。其实就是从高维到低维的一个映射:$\boldsymbol{R}^{m\times n}\mapsto\boldsymbol{R}$
 
几个结论的简略证明如下：

$trAB=trBA$

根据矩阵乘法的运算法则，如果$C=A\_{m\times n}B\_{n\times m}$，则$C\_{ij}=(AB)\_{ij}=\sum\_{k=1}^nA\_{ik}B\_{kj}$。

所以，$tr(AB)=\sum\_{i=1}^m(AB)\_{ii}=\sum\_{i=1}^m\sum\_{k=1}^nA\_{ik}B\_{ki}=\sum\_{k=1}^n\sum\_{i=1}^mB_{ki}A\_{ik}=\sum\_{k=1}^n(BA)\_{jj}=trBA$

现在证明$\nabla\_AtrAB=B^T$

$trAB=\sum\_{i=1}^n\sum\_{k=1}^mA\_{ik}B\_{ki}=\sum\_{k=1}^mA\_{1k}B\_{k1}+\sum\_{k=1}^mA\_{2k}B\_{k2}\cdots\sum\_{k=1}^mA\_{nk}B\_{kn}$

所以，$\frac{\partial trAB}{\partial A\_{ij}}=B\_{ji}$

即，$\nabla\_AtrAB=B^T$

结论3、4、5此处就不再给出证明了。[^2]

[^2]:3、4几乎不用证明，直接利用迹的定义就能够得出。而5的证明，老实说，我也不会，如果有哪位大神会的，请不吝赐教(-.-)。

#矩阵推导#

有了上述的准备工作，就可以开始我们的推导工作了。我们将训练数据表示成矩阵的形式:

$$
\begin{equation}
X = \left[ \begin{array}{ccc}
\cdots (x^{(1)})^T \cdots \\
\cdots (x^{(2)})^T \cdots \\
\vdots \\
\cdots (x^{(n)})^T \cdots \\
\end{array}
\right]
\end{equation}
$$

参数$\theta$和输出结果$y$表示成向量形式:$\theta = \left[ \begin{array}{ccc} \theta\_1 \\\ \theta\_2 \\\ \vdots \\\ \theta\_n \end{array} \right]$,$y = \left[ \begin{array}{ccc} y^{(1)} \\\ y^{(2)} \\\ \vdots \\\ y^{(m)} \end{array} \right]$

所以$X\theta-y$就可以表示成：

$$
\begin{equation}
X\theta - y = \left[ \begin{array}{ccc}
(x^{(1)})^T\theta - y^{(1)} \\\
(x^{(2)})^T\theta - y^{(2)} \\\
\vdots \\\
(x^{(m)})^T\theta - y^{(m)} \\\
\end{array}
 \right] =
\left[
\begin{array}{ccc}
h_{\theta}(x^{(1)})-y^{(1)} \\\
h_{\theta}(x^{(2)})-y^{(2)} \\\
\vdots \\\
h_{\theta}(x^{(m)})-y^{(m)} \\\
\end{array}
\right]
\end{equation}
$$

根据向量的基本性质:$z^Tz=\sum_{i=1}^nz_i^2$，所以：


$$
\begin{equation}
\frac{1}{2}(X\theta-y)^T(X\theta-y)=\frac{1}{2}\sum_{i=1}^m\left[ h_{\theta}(x^{(i)})-y^{(i)} \right]^2
=J(\theta)
\end{equation}
$$

因此，为了使$J(\theta)$达到最小，只需要求出令$\nabla\_{\theta}J(\theta)=0$时的$\theta$值,这时的$\theta$值就是梯度下降法中最终得到的参数值。


$$
\begin{equation}
\begin{split}
\nabla_{\theta}\frac{1}{2}(X\theta-y)^T(X\theta-y)&=\frac{1}{2}\nabla_{\theta}tr(\theta^TX^TX\theta-\theta^TX^T\overrightarrow y-\overrightarrow yX\theta+\overrightarrow y^T\overrightarrow y)\\
& = \frac{1}{2}\nabla_{\theta}(tr\theta^TX^TX\theta-2tr\overrightarrow y^TX\theta) \\
& = \frac{1}{2}(X^TX\theta+X^TX\theta-2X^T\overrightarrow y)\\
&= X^TX\theta-X^T\overrightarrow y
\end{split}
\end{equation}
$$

最终[^3]，我们得到了最终的Normal Equation:$X^TX\theta=X^T\overrightarrow y$

[^3]:在上面推导过程中，利用第一节中列出的那5个结论。

所以，梯度下降法就转变为一个矩阵计算：$\theta=(X^TX)^{-1}X^T\overrightarrow y$

但是，需要注意的是，不要以为式子变简单了，计算量就减少了，事实上，当X的维数很高时，计算量反而更大，因为大矩阵运算会消耗很多资源。

#参考文献#

- [维基百科:迹](http://zh.wikipedia.org/wiki/%E8%B7%A1)
- [豆丁网:矩阵导数和迹的性质](http://www.docin.com/p-385519319.html)
- 斯坦福《机器学习》公开课第二集及其配套讲义


---
layout: post
time: 2014-02-06
title: 广义线性模型
category: 机器学习
keywords: Generalized Linear Models
tags: Generalized Linear Models
description: 广义线性模型思考与讨论
---

之前的几篇文章中，分别介绍了[线性回归]({% post_url 2013-3-19-Gradient-Descent  %})和[Logistic回归]({% post_url 2013-9-14-Logistic-Regression  %})，分别用来解决回归问题和分类问题。其实，这两种模型是属于一种更加广义的模型:**广义线性模型(Generalized Linear Models)**,本文将会说明其实上述两种模型都是**广义线性模型**的特殊形式。

#指数分布族#

在说明什么是**广义线性模型**之前，首先需要定义什么是**指数分布族**,我们将具有如下形式的分布称为是**指数分布族**：

$$
\begin{equation}
p(y;\eta) = b(y)e^{\eta^T T(y)-a(\eta)}
\end{equation}
$$

其中，$\eta$称为该分布的**自然参数(natural parameter)**,$T(y)$称为**充分统计量**,$a(\eta)$称为**对数区分函数(log partition function)**。当给定$a,b,T$这三个函数时，上述公式就定义了一个概率分布的集合，它以$\eta$为参数，当$\eta$改变时，我们就得到不同的分布。

##贝努力模型(Bernoulli)##

贝努力模型就是指数分布族中的一种分布情况，我们将贝努力分布进行如下的推导:

$$
\begin{aligned}
p(y;\phi) &= \phi^y(1-\phi)^{1-y} \\
&= e^{\log(\phi^y(1-\phi)^{1-y})}\\
&= e^{y\log\phi + (1-y)\log(1-\phi)} \\
&= e^{\log(\frac{\phi}{1-\phi})\dot y + \log(1-\phi)}
\end{aligned}
$$

对照上面指数分布族的定义，我们可以得到:

$$
\begin{aligned}
\eta &= \log\frac{\phi}{1-\phi}\\
T(y) &= y\\
a(\eta) &= -\log(1-\phi) = log(1+e^{\phi}) \\
b(y) &= 1
\end{aligned}
$$

可以看到，贝努力分布确实可以改写成指数分布族的形式，这一点在广义线性模型的推导中很重要。

##高斯分布##

高斯分布同样是指数分布族中的一员，具体的推导过程如下所示[^1]:

$$
\begin{aligned}
p(y;\mu) &= \frac{1}{\sqrt{2\pi}}e^{-\frac{1}{2}(y-\mu)^2} \\
&= \frac{1}{\sqrt{2\pi}}e^{-\frac{1}{2}y^2}\cdot e^{\mu y - \frac{1}{2}\mu^2}
\end{aligned}
$$

我们得到:

$$
\begin{aligned}
\eta &= \mu \\
T(y) &= y\\
a(\eta) &= \frac{\mu^2}{2} = \frac{\eta^2}{2} \\
b(y) &= \frac{1}{\sqrt{2\pi}}e^{\frac{-y^2}{2}}
\end{aligned}
$$

说明高斯分布也是指数分布族中的一种。事实上，还有许多分布都是指数分布族中的成员，比如:

1. 多项式分布(Multinomial): 对有$K$个离散结果的事件建模，多类分类。
2. 泊松分布(Poisson): 对计数过程进行建模。
3. 伽马分布(Gamma)和指数分布(exponential): 对有间隔的正数进行建模。
4. $\beta$分布: 对小数建模。
5. Dirichler分布: 对概率分布进行建模。
6. Wishart分布: 协方差矩阵的分布。

#广义线性模型#

当我们遇到一个分类问题或回归问题的时候，首先需要估计分析的问题是满足什么样的分布的，比如线性回归中的我们假设其满足正态分布;在为银行顾客排队建模时，我们假设其满足Poisson分布;在Logistic回归中假设满足贝努力分布(二元分类)，那么当我们确定问题的分布时，如何才能正确建模呢？这就要引出**广义线性模型(GLM)**了。

在GLM中，给定x对y进行预测时，我们有三个假设，分别是:

1. $p(y\vert x;\theta)$满足指数分布族，也就是说，给定$x$和$\theta$，y的分布情况满足以$\eta$为参数的指数分布族的分布。
2. 给定$x$，我们的目标是预测$T(y)$的期望值，也即$h\_\theta(x)=E[T(y)\vert x]$
3. 自然参数$\eta$和输入$x$是线性关系:$\eta=\theta^T x$

通过GLM我们能够很快就能推导出不同分布下的优化目标，以线性回归模型和Logidtic回归模型为例:

##线性回归模型##

我们假设线性回归模型是满足高斯分布的，因此根据上面我们对高斯分布的推导，我们可以得到:

$$
\begin{aligned}
h_\theta(x) &= E[y\vert x;\theta]\\
&= \mu \\
&= \eta\\
& = \theta^T x
\end{aligned}
$$

上述公式中的第二个等号是因为GLM的第二个假设，并且高斯分布的期望正是$\mu$,第三个等号是因为经过之前高斯分布的推导，对于高斯分布来说，$\eta=\mu$，最后一个等号是因为GLM的第三个假设。

可以看到，我们通过高斯分布直接得到了我们的目标函数，这也就能够解释为什么在[线性回归]({% post_url 2013-3-19-Gradient-Descent  %})中要假设成$h\_\theta(x)=\theta\_0+\theta\_1x\_1+\cdots+\theta\_n x\_n$了。

##Logistic回归##

同样的，在[Logistic回归]({% post_url 2013-9-14-Logistic-Regression  %})中，奇怪的$g(z)$是怎么来的，也能够用GLM来解释:


$$
\begin{aligned}
h_\theta(x) &= E[y\vert x;\theta] \\
&= \phi \\
&= \frac{1}{1+e^{-\eta}} \\
&= \frac{1}{1+e^{-\theta^t x}}
\end{aligned}
$$

从上述的推导中，我们就可以看出，一旦我们确定待分析的问题是满足贝努力分布的，我们就能够自然而然地得出$h\_\theta(x)= \frac{1}{1+e^{-\theta^t x}}$的结论了。

#总结#

可以看到，利用GLM，我们能够很快确定我们的目标函数是什么，当我们选取高斯分布的时候，我们就能够得到线性回归模型;当我们选取贝努力分布时，我们就得到Logistic模型。所以，可以把广义线性模型看成是一个关于分布的分布，不同的参数得到不同的分布模型，从而得到不同的目标函数。

最后在斯坦福的公开课《机器学习》中还有一个比较复杂GLM的例子，是对多项式分布进行建模，由于公式推导比较多，这里就不再给出了，感兴趣的朋友可以去找相应的讲义来看看。

#参考资料#

- [广义线性模型](http://blog.sciencenet.cn/blog-520608-709883.html)
- 斯坦福公开课《机器学习》第四集及其配套讲义
- [牛顿方法、指数分布族、广义线性模型、多项式分布——斯坦福ML公开课笔记4](http://blog.csdn.net/stdcoutzyx/article/details/9207047)



[^1]: 此处为了简化我们的推导过程，我们假设高斯分布中的$\sigma^2=1$。

---
layout: post
time: 2014-02-17
title: 判别模型、生成模型和高斯判别模型
category: Machine-Learning
keywords: Discriminative,Generative,Gaussian Discriminant Analysis
tags: 判别模型,生成模型
description: 本文主要说明了判别式模型和生成式模型的差别，然后介绍了一种生成式模型，高斯判别分析(Gaussian Discriminant Analysis)
---

# 判别式模型和生成式模型

对不同的监督学习的模型来说，它们的最终目标总是在给定测试样例$x$的情况下，预测出其最有可能的类别$y$，也就是说优化目标总是$\arg\max\limits\_{y}p(y\vert x)$。但是，求解这个$\arg\max\limits\_{y}p(y\vert x)$的过程却有着各种各样不同的方法，但是总体来来说，根据求解方法的不同，可以将这些模型分成两种类别。

## 判别式模型

其中一种是直接学习得到$p(y\vert x)$，更加准确来说，是直接学习得到$p(y\vert x;\theta)$,其中$\theta$是模型的参数,这种方法被称为是**判别式模型(Discriminant Model)**{: style="color:red"}。属于这种方法的模型有之前的讲过的:

- [线性回归模型]({% post_url 2013-3-19-Gradient-Descent  %})，其模型参数就是$\theta^T X$中的$\theta$
- [Logistic模型]({% post_url 2013-9-14-Logistic-Regression  %})
- [决策树模型]({%  post_url 2014-1-6-Decision-Tree-0 %}),其模型参数是每个节点的分裂属性及其阈值。

对于判别式模型来说，就是要从训练数据中学习得到$p(y\vert x;\theta)$中的$\theta$，从而在预测时候，能够直接根据$x$计算出$y$。

## 生成式模型

与其相对应的另外一种方法是，利用贝叶斯法则:

$$
\begin{equation}
p(y\vert x) = \frac{p(x\vert y)p(y)}{p(x)}
\end{equation}
$$

将$\arg\max\limits\_{y}p(y\vert x)$进行如下的代换:

$$
\begin{aligned}
\arg\max\limits_{y}p(y\vert x) &= \arg\max\limits_y\frac{p(x\vert y)p(y)}{p(x)} \\
&= \arg\max\limits_y p(x\vert y)p(y)
\end{aligned}
$$

注意，上述第二个等式之所以成立，是因为在给定测试数据$x$的情况下，$p(x)$是一个常量，可以不用考虑。因此，模型的求解目标就变成了$p(x\vert y)$和$p(y)$而不是原来的$p(y\vert x)$，这样的方法被称为**生成式模型(Generative Model)**{: style="color:red"}。属于这种模型的有之前讲过的:

- [朴素贝叶斯模型]({% post_url 2014-1-12-Naive-Bayes %})。在贝叶斯模型中，就是利用贝叶斯法则，直接计算$p(x\vert y)$和$p(y)$.

本文的后半部分还会介绍另外一种生成式模型:**高斯判别分析模型**[^1]。


[^1]: 虽然它名字中有"判别"二字，但它却是地地道道的生成式模型。

## 举例

其实，可以看到，这两种分类仅仅是计算的"路径"不同而已，"终点"却是相同的，都是要计算$\arg\max\limits\_{y}p(y\vert x)$。

举例[^2]来说，假设我们要判别一个动物是大象($y=1$)还是狗($y=0$)，对于**判别式模型**来说，它会考虑这个动物所有的特征，从中学习特征之间模式($p(y\vert x;\theta)$)，从而判定它是大象($y=1$)还是狗($y=0$)。

而对于**生成式模型**来说，它会考察训练数据中所有的大象，学习得到一个模型($p(x\vert y=1)$和$p(y=1)$)，然后接着考察训练数据中所有的狗，学习得到一个模型($p(x\vert y=1)$和$p(y=1)$)。在需要预测时，将待预测的动物分别用这两种模型进行判断，然后选择可能性大的最为最终的预测类别。


[^2]: 这个例子来自于斯坦福公开课《机器学习》第五集

# 高斯判别分析

## 多变量正态分布

**高斯判别分析模型**是假设$p(x\vert y)$服从多变量高斯分布的，因此我们首先需要看一下多变量的高斯分布。

多变量高斯分布$\cal{N}(\mu,\Sigma)$的密度函数是:

$$
\begin{equation}
p(x;\mu,\Sigma) = \frac{1}{(2\pi)^{\frac{n}{2}}\big\vert\Sigma\big\vert^{\frac{1}{2}}}e^{-\frac{1}{2}(x-\mu)^T\Sigma^{-1}(x-\mu)}
\end{equation}
$$

如果$X\sim \cal{N}(\mu,\Sigma)$，则:

$$
\begin{aligned}
E[X] &= \mu \\
Cov(X) &= \Sigma
\end{aligned}
$$

## 高斯判别分析模型

**高斯判别分析模型**假设$p(x\vert y)$服从多变量高斯分布,而$y$本身是服从贝努力分布的，所以我们有:

$$
\begin{aligned}
y &\sim Bernoulli(\phi) \\
x\big\vert y &\sim \cal{N}(\mu_0,\Sigma) \\
x\big\vert y &\sim \cal{N}(\mu_1,\Sigma)
\end{aligned}
$$

将其展开就是:


$$
\begin{aligned}
p(y) &= \phi^y(1-\phi)^{1-y} \\
p(x\vert y = 0) &= \frac{1}{(2\pi)^{\frac{n}{2}}\big\vert\Sigma\big\vert^{\frac{1}{2}}}e^{-\frac{1}{2}(x-\mu_0)^T\Sigma^{-1}(x-\mu_0)} \\
p(x\vert y = 1) &= \frac{1}{(2\pi)^{\frac{n}{2}}\big\vert\Sigma\big\vert^{\frac{1}{2}}}e^{-\frac{1}{2}(x-\mu_1)^T\Sigma^{-1}(x-\mu_1)}
\end{aligned}
$$

其中，模型的参数是$\phi,\Sigma,\mu\_0,\mu\_1$,对应的对数似然函数可以写成:

$$
\begin{aligned}
\ell(\phi,\mu_0,\mu_1,\Sigma) &= \log\prod\limits_{i=1}^mp(x^{(i)},y^{(i)};\phi,\mu_0,\mu_1,\Sigma) \\
&= \log\prod\limits_{i=1}^mp(x^{(i)}\vert y^{(i)};\phi,\mu_0,\mu_1,\Sigma)p(y^{(i)};\phi)
\end{aligned}
$$

通过极大化这个似然函数$\ell$，我们能够求得这个极大似然估计的参数是:

$$
\begin{aligned}
\phi &= \frac{1}{m}1\{y^{(i)}=1\} \\
\mu_0 &= \frac{\sum\limits_{i=1}^m1\{y^{(i)}=0\}x^{(i)}}{\sum\limits_{i=1}^m1\{y^{(i)}=0\}} \\
\mu_1 &= \frac{\sum\limits_{i=1}^m1\{y^{(i)}=1\}x^{(i)}}{\sum\limits_{i=1}^m1\{y^{(i)}=1\}} \\
\Sigma &= \frac{1}{m}\sum\limits_{i-1}^m(x^{(i)} - \mu_{y^{(i)}})(x^{(i)} - \mu_{y^{(i)}})^T
\end{aligned}
$$

上面的公式中，其实$\mu\_0$和$\mu\_1$分别是反例的平均值和正例的平均值。

在计算出上述的这些参数之后，我们就能够求解$\arg\max\limits\_{y}p(y\vert x)$了，只需要分别计算$p(x\vert y=1)p(y=1)$和$p(x\vert y=0)p(y=0)$，取二者中较大的类别作为预测类别。

# 参考资料

- 斯坦福公开课《机器学习》第五集及其配套讲义。
- [生成学习、高斯判别、朴素贝叶斯、Laplace平滑——斯坦福ML公开课笔记5](http://blog.csdn.net/stdcoutzyx/article/details/9285001)
- [判别模型和生成模型 -- ML Step By Step(4)](http://blog.sina.com.cn/s/blog_b09d46020101dfq0.html)

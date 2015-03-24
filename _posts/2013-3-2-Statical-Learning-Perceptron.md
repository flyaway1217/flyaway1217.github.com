---
layout: post
time: 2013-3-2
title: 感知机模型
category: Machine-Learning
keywords: 感知机,perceptron
tags: 统计学习方法,监督学习
description: 感知机(perceptron)是二类分类的线性分类模型，其输入为实例的特征向量，输出为实例的类别，取+1和-1二值。感知机旨在求出将训练数据进行线性划分的分离超平面。为此，导入基于误分类的损失函数，利用梯度下降法对损失函数进行极小化，求得感知机模型。
---

**感知机(perceptron)**是二类分类的线性分类模型，其输入为实例的特征向量，输出为实例的类别，取+1和-1二值。感知机对应于输入空间(特征空间)中将实例划分为正负两类的分离超平面，属于判别模型。感知机旨在求出将训练数据进行线性划分的分离超平面。为此，导入基于误分类的损失函数，利用梯度下降法对损失函数进行极小化，求得感知机模型。

#感知机模型#
**定义1(感知机)** 假设输入空间(特征空间)是$$\cal{X}\subseteq\boldsymbol{R}^n$$，输出空间是$$\cal{Y}=\{+1,-1\}$$。输入$$x\in\cal{X}$$表示实例的特征向量，对应于输入空间(特征空间)的点，输出$$y\in\cal{Y}$$表示实例的类别。由输入空间到输出空间的如下函数

$$
\begin{equation}
f(x)=sign(w \cdot x+b)
\end{equation}
$$

称为感知机。其中，$$w$$和$$b$$为感知机模型参数，$$w\in\boldsymbol{R}^n$$叫做**权值(weight)**或**权值向量(weight vector)**，$$b\in\boldsymbol{R}$$叫做**偏置(bisa)**[^1]，$$w\cdot x$$表示$$w$$和$$x$$的内积。$$sign$$是符号函数，即

[^1]:此处的$$w$$和$$b$$就是模型后面要学习的参数，一旦$$w$$和$$b$$确定了，感知机模型也就学习完成了。

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
**线性分类器模型(linear classification model)**或**线性分类器(linear classifier)**，即函数集合$$\{f|f(x)=w\cdot x+b\}$$[^2]。

[^2]:因为是线性分类器，所以$$x$$都是一次幂的，高次幂的情况不考虑。

感知机有如下几何解释:线性方程

$$
\begin{equation}
w\cdot x +b=0
\end{equation}
$$

对应于特征空间$$\boldsymbol{R}^n$$中的一个超平面$$S$$，其中$$w$$是超平面的法向量，$$b$$是超平面的截距。这个超平面将特征空间划分两个部分，位于两部分的点(特征向量)分别被分为正、负两类。因此，超平面$$S$$称为**分离超平面(separating hyperplane)**。
如图所示

![感知机模型](/assets/image/posts/2013-3-2-Statical-Learning-Perceptron1.png)

#感知机学习策略#

##数据集的线性可分##
**定义(数据集的线性可分性)**给定一个数据集

$$
\begin{equation}
T=\{(x_1,y_1),(x_2,y_2),\cdots,(x_N,y_N)\}
\end{equation}
$$

其中，$$x_i\in\cal{X}=\boldsymbol{R}^n$$,$$y_i\in\cal{Y}=\{+1,-1\},i=1,2,\cdots,N$$,如果存在某个超平面S

$$
\begin{equation}
w\cdot x + b = 0
\end{equation}
$$

能够将数据集的正实例点和负实例点完全正确地划分到超平面的两侧，即对所有$$y_i=+1$$的实例$$i$$，有$$w\cdot x_i + b > 0$$，对所有$$y_i=-1$$的实例$$i$$，有$$w\cdot x_i + < 0$$，则称数据集$$T$$为**线性可分数据集(linearly separable data set)**,否则，称数据集$$T$$线性不可分。

##感知机学习策略##
感知机的学习的目标是找到一个能够将训练正实例点和负实例点完全正确分离的超平面，即确定感知机模型参数$$w$$,$$b$$，我们需要确定一个学习策略，也即定义(经验)损失函数并将损失函数极小化。

感知机所采用的损失函数是误分类点到超平面$$S$$的总距离[^3]。为此，首先写出输入空间$$\boldsymbol{R}^n$$中任一点$$x_0$$到超平面S的距离:


$$
\begin{equation}
\frac{1}{\Vert w \Vert}\vert w \cdot x_0 + b \vert
\end{equation}
$$

这里，$$\Vert w \Vert$$是$$w$$的$$L_2$$[范数](http://zh.wikipedia.org/wiki/%E8%8C%83%E6%95%B0 "范数")[^4]。

[^3]:其实，关于损失函数最直接的想法是误分类点的总数，但是这样的损失函数不是参数$$w$$,$$b$$的连续可导函数，不易优化。
[^4]:$$L_2$$范数其实就是欧几里得距离，$$\Vert x\Vert=\sqrt{x_1^2+x_2^2\cdots+x_n^2}$$。

其次，对于误分类的数据$$(x_i,y_i)$$来说

$$
\begin{equation}
-y_i(w\cdot x_i+b) > 0
\end{equation}
$$

成立，因为对误分点来说，$$y_i$$与$$(w_i\cdot x_i +b)$$是异号。因此，误分类点到超平面$$S$$的距离是:

$$
\begin{equation}
-\frac{1}{\Vert w \Vert}y_i\vert w \cdot x_0 + b \vert
\end{equation}
$$

这样假设超平面S的误分类点集合为$$M$$，那么所有误分类点到超平面$$S$$的总距离为

$$
\begin{equation}
-\frac{1}{\Vert w \Vert}\sum_{x_i\in M}y_i(w\cdot+b)
\end{equation}
$$

不考虑$$\frac{1}{\Vert w \Vert}$$，就得到感知机学习的损失函数。[^5]

[^5]:其实在这里我不太理解的是，为什么可以不考虑$$\frac{1}{\Vert w \Vert}$$，网上查了一圈，暂时没发现什么合理的解释。先在在这里存疑吧，以后知道原因后再补上。

给定训练数据集

$$
\begin{equation}
T=\{(x_1,y_1),(x_2,y_2),\cdots,(x_N,y_N)\}
\end{equation}
$$

其中，$$x_i\in\cal{X}=\boldsymbol{R}^n，y_i\in\cal{Y}=\{+1,-1\},i=1,2,\cdots,N.$$。感知机$$sign(w \cdot x + b)$$学习的损失函数定义为:

$$
\begin{equation}
L(w,b)=-\sum_{x_i\in M}y_i(x\cdot x_i+b)  \label{cost function}
\end{equation}
$$

其中，$$M$$为误分点的集合。这个损失函数就是感知机学习的**经验风险函数**。

显然，损失函数$$L(w,b)$$是非负的。如果没有误分类点，损失函数值是0，而且，误分类点越少，误分类点离超平面越近，损失函数就越小。一个特定的样本点的损失函数:在误分类时是参数$$w,b$$的线性函数，在正确分类时是0.因此，给定训练数据集$$T$$，损失函数$$L(w,b)$$是$$w,b$$的连续可导函数。

感知机学习的策略是在假设空间中选取使损失函数($$\ref{cost function}$$)最小的模型参数$$w,b$$，即感知机模型。

#感知机学习算法#

##感知机学习算法的原始形式##
感知机学习算法是对以下最优化问题的算法，给定一个训练数据集

$$
\begin{equation}
T=\{(x_1,y_1),(x_2,y_2),\cdots,(x_N,y_N)\}
\end{equation}
$$

其中，$$x_i\in\cal{X}=\boldsymbol{R}^n,y\in\cal{Y}=\{-1,+1\},i=1,2,\cdots,N$$,求参数$$w,b$$，使其为以下损失函数极小化问题的解

$$
\begin{equation}
\min_{w,b}L(w,b)=-\sum_{x_i\in M}y_i(w\cdot x_i+b) \label{target function}
\end{equation}
$$

其中$$M$$为误分类点的集合。

感知机的学习算法是误分类驱动的，具体采用[随机梯度下降法(stochastic gradient descent)](http://zh.wikipedia.org/wiki/%E6%9C%80%E9%80%9F%E4%B8%8B%E9%99%8D%E6%B3%95 "梯度下降法")。首先，任意选取一个超平面$$(w_0,b_0)$$,然后利用**梯度下降法**不断地极小化目标函数($$\ref{target function}$$)。极小化过程中不是一次使$$M$$中所有误分类点的梯度下降，而是一次随机选取一个误分类点使其梯度下降。

假设误分类点集合$$M$$是固定的，那么损失函数$$L(w,b)$$的梯度由

$$
\begin{equation}
\nabla_{w}L(w,b)=\frac{\partial{L(w,b)}}{\partial{w}}=-\sum_{x_i\in M}y_ix_i\\
\nabla_{w}L(w,b)=\frac{\partial{L(w,b)}}{\partial{b}}=-\sum_{x_i\in M}y_i
\end{equation}
$$

给出。

随机选取一个误分类点$$(x_i,y_i)$$，对$$w,b$$进行更新:

$$
\begin{equation}
w\leftarrow w+\eta y_ix_i
\end{equation}
$$

$$
\begin{equation}
b\leftarrow b+\eta y_i
\end{equation}
$$

式中$$\eta(0\le\eta\le1)$$是步长，在统计学习中又称为**学习率(learning rate)**。这样，通过迭代可以期待损失函数$$L(w,b)$$不断减小，直到为0.

**算法(感知机学习算法的原始形式)**

**输入**:训练数据集$$T={(x_1,x_2),(x_2,y_2),\cdots,(x_N,y_N)}$$，其中$$x_i\in\cal{X}=\boldsymbol{R}^n,y_i\in\cal{Y}=\{-1,+1\},i=1,2,\cdots,N$$；学习率$$\eta(0<\eta\le1)$$。

**输出**:$$w,b$$；感知机模型$$f(x)=sign(w\cdot x+b)$$。

**(1) 选取初值$$w_0,b_0$$**

**(2) 在训练集中选取数据$$(x_i,y_i)$$**

**(3) 如果$$y_i(w\cdot x_i+b)\le 0$$,则**

$$
\begin{equation}
w\leftarrow w+\eta y_ix_i\\
b\leftarrow b+\eta y_i
\end{equation}
$$

**(4) 转至(2)，直至训练集中没有误分类点。**

这种学习算法直观上有如下解释:当一个实例点被误分类，即位于分离超平面的错误的一侧时，则调整$$w,b$$的值，使分离超平面向该误分类点的一侧移动，以减少该误分类点与超平面的距离，直至超平面越过该误分类点使其被正确分类。

##算法的收敛性##
现在要证明，对于线性可分数据集感知机学习算法原始形式收敛，即经过有限次迭代可以得到一个将训练数据集完全正确划分的分离超平面感知机模型。
为了便于叙述，将偏置$$b$$并入权重向量$$w$$，记作$$\hat{w}=(w^T,b)^T$$，同样也将输入向量加以扩充，加进常数1，记作$$\hat{x}=(x^T,1)^T$$。这样，$$\hat{x}\in\boldsymbol{R}^{n+1},\hat{w}\in\boldsymbol{R}^{n+1}$$，显然，$$\hat{w}\cdot\hat{x}=w\cdot x + b$$。

**定理(Novikoff):**设训练数据集$$T={(x_1,y_1),(x_2,y_2),\cdots,(x_N,y_N)}$$是线性可分的，其中$$x_i\in\cal{X}=\boldsymbol{R}^n,y_i\in\cal{Y}=\{-1,+1\},i=1,2,\cdots,N$$，则

(1) 存在满足条件$$\Vert\hat{w}_{opt}\Vert=1$$的超平面$$\hat{x}_{opt}\cdot\hat{x}=w_{opt}\cdot x + b_{opt}=0$$将训练数据集完全正确分开；且存在$$\gamma>0$$，对所有$$i=1,2,\cdots,N$$

$$
\begin{equation}
y_i(\hat{w}_{opt}\cdot\hat{x}_i)=y_i(w_{opt}\cdot x_i+b_{opt})\ge\gamma\label{2.8}
\end{equation}
$$

(2)令$$R=\max_{1\le i\le N}\Vert\hat{x}_i\Vert$$，则感知机算法在训练数据集上的误分类次数$$k$$满足不等式

$$
\begin{equation}
k\le\left(\frac{R}{\gamma}\right)^2
\end{equation}
$$

**证明**
(1) 由于训练数据集是线性可分的，按照定义，存在超平面可将训练数据集完全分开，取此超平面为$$\hat{w}_{opt}\cdot\hat{x}=w_{opt}\cdot x + b_{opt}=0$$，使$$\Vert\hat{w}_{opt}\Vert=1$$，由于对有限的$$i=1,2,\cdots,N$$，均有[^6]

$$
\begin{equation}
y_i(\hat{x}_{opt}\cdot \hat{x}_i)=y_i(w_{opt}\cdot x_i + b_{opt}) > 0
\end{equation}
$$

[^6]:因为前提是能够将数据完全分开，所以$$y_i$$与$$(\hat{w}_{opt}\cdot \hat{x})$$永远是同号的。

所以存在

$$
\begin{equation}
\gamma=\min_{i}{y_i(w_{opt}\cdot x_i+b_{opt})}
\end{equation}
$$

使

$$
\begin{equation}
y_i(\hat{w}_{opt}\cdot\hat{x})=y_i(w_{opt}\cdot x_i + b_{opt})\ge\gamma
\end{equation}
$$

(2)感知机算法从$$\hat{w}_0=0$$开始，如果实例被误分类，则更新权重。令$$\hat{x}_{k-1}$$是第$$k$$个误分类实例之前的扩充权重向量，即

$$
\begin{equation}
\hat{w}_{k-1}=(w_{k-1}^T,b_{k-1})^T
\end{equation}
$$

则第k个误分类实例的条件是

$$
\begin{equation}
y_i(\hat{w}_{k-1}\cdot\hat{x}_i)=y_i(w_{k-1}\cdot x_i+b_{k-1}) \le  0\label{2.10}
\end{equation}
$$

若$$(x_i,y_i)$$是被$$\hat{w}_{k-1}=(w_{k-1}^T,b_{k-1})^T$$误分类的数据，则$$w$$和$$b$$的更新是

$$
\begin{equation}
w_k\leftarrow w_{k-1}+\gamma y_ix_i\\
b_k\leftarrow b_{k-1}+\gamma y_i
\end{equation}
$$

即

$$
\begin{equation}
\hat{w}_k=\hat{w}_{k-1}+\gamma y_i\hat{x}_i\label{2.11}
\end{equation}
$$

接下来进行两个不等式的推导

(1)

$$
\begin{equation}
\hat{w}_k\cdot\hat{w}_{opt}\ge k\eta\gamma\label{2.12}
\end{equation}
$$

由式($$\ref{2.11}$$)及式($$\ref{2.8}$$)得

$$
\begin{equation}
\hat{w}_k\cdot\hat{w}_{opt}=\hat{w}_{k-1}\cdot\hat{w}_{opt}+\eta y_i\hat{w}_{opt}\cdot\hat{x}_i\ge\hat{w}_{k-1}\cdot\hat{w}_{opt}+\eta\gamma
\end{equation}
$$

由此递推即得不等式($$\ref{2.12}$$)

$$
\begin{equation}
\hat{x}_k\cdot\hat{w}_{opt}\ge\hat{x}_{k-1}\cdot\hat{w}_{opt}+\eta\gamma\ge\hat{x}_{k-2}\cdot\hat{w}_{opt}+2\eta\gamma\ge\cdots\ge k\eta\gamma
\end{equation}
$$

(2)

$$
\begin{equation}
\Vert\hat{w}_{k}\Vert^2\le k\eta^2R^2\label{2.13}
\end{equation}
$$


由式($$\ref{2.11}$$)及式($$\ref{2.10}$$)得

$$
\begin{equation}
\begin{split}
\Vert\hat{x}_k\Vert^2&=\Vert\hat{x}_{k-1}\Vert^2+2\eta y_i\hat{w}_{k-1}\cdot\hat{x}_i+\eta^2\Vert\hat{x}_i\Vert^2\\
                     &\le\Vert\hat{x}_{k-1}\Vert^2+\eta^2\Vert\hat{x}_i\Vert^2\\
                     &\le\Vert\hat{x}_{k-1}\Vert^2+\eta^2R^2\\
                     &\le\Vert\hat{x}_{k-2}\Vert^2+2\eta^2R^2\le\cdots\\
                     &\le k\eta^2R^2
\end{split}
\end{equation}
$$

结合不等式($$\ref{2.12}$$)及不等式($$\ref{2.13}$$)即得

$$
\begin{equation}
k\eta\gamma\le \hat{w}_k\cdot\hat{w}_{opt}\le\Vert\hat{w}_k\Vert\Vert\hat{w}_{opt}\Vert\le\sqrt{k}\eta R\\
k^2\gamma^2\le kR^2
\end{equation}
$$

于是

$$
\begin{equation}
k\le\left(\frac{R}{\gamma}\right)^2
\end{equation}
$$


定理表明，误分类的次数$$k$$是有上界的，经过有限次搜索可以找到将训练数据完全正确分开的分离超平面。也就是说，当训练数据集线性可分时，感知机学习算法原始形式迭代是收敛的。感知机学习算法存在许多解，这些解既依赖于初值的选择，也依赖于迭代过程中误分类点的选择顺序。为了得到唯一的超平面，需要对分离超平面增加约束条件。当训练集线性不可分时，感知机算法不收敛，迭代结果会发生震荡。

##感知机学习算法的对偶形式##
对偶形式的基本思想是，将$$w$$和$$b$$表示为实例$$x_i$$和标记$$y_i$$的线性组合的形式，通过求解其系数而求得$$w$$和$$b$$。不是一般性，在原始算法中，可假设初值$$w_0,b_0$$均为0.对误分类点$$(x_i,y_i)$$通过

$$
\begin{equation}
w\leftarrow w+\eta y_ix_i\\
b\leftarrow b+\eta y_i
\end{equation}
$$

逐步修改$$w,b$$，则$$w,b$$关于$$(x_i,y_i)$$的增量分别是$$\alpha_iy_ix_i$$。这里$$\alpha_i=n_i\eta$$。这样，从学习过程不难看出，最后学习到的$$w,b$$可以分别表示为[^8]

$$
\begin{gather}
w=\sum_{i=1}^N\alpha_iy_ix_i\label{2.14}\\
b=\sum_{i=1}^N\alpha_iy_i\label{2.15}
\end{gather}
$$

[^9]这里$$\alpha_i\ge0,i=1,2,\cdots,N$$,当$$\eta=1$$时，表示第$$i$$个实例点由于误分而进行更新的次数。实例点更新次数越多，意味着它距离超平面越近，也就越难正确分类。

[^8]:误分类点$$(x_i,y_i)$$经过$$n_i$$次修改，最终被正确分类，此时$$\begin{equation}w=w_0+n_i\eta_0y_ix_i=w_0+\alpha_iy_ix_i\\b=b_0+n_i\eta_0y_ix_i=b_0+\alpha_iy_i\end{equation}$$

[^9]:公式($$\ref{2.14}$$)和($$\ref{2.15}$$)中的$$N$$是训练样本的数量

**算法(感知机学习算法的对偶形式)**

**输入:**线性可分的数据集$$T={(x_1,y_1),(x_2,y_2),\cdots,(x_N,y_N)}$$,其中$$x_i\in\boldsymbol{R}^n,y_i\in\{-1,+1\},i=1,2,\cdots,N;$$学习率$$\eta(0<\eta\le 1)$$

**输出:**$$\alpha,b$$；感知机模型$$f(x)=sign\left(\sum_{j=1}^N\alpha_jy_jx_j\cdot x + b\right)$$。其中$$\alpha=(\alpha_1,\alpha_2,\cdots,\alpha_N)^T$$

**(1)$$\alpha\leftarrow 0,b\leftarrow 0$$**

**(2)在训练集中选取数据$$(x_i,y_i)$$**

**(3)如果$$y_i\left(\sum_{j=1}^N\alpha_jy_jx_j\cdot x_i+b\right)\le 0$$**

$$
\begin{equation}
\alpha_i\leftarrow\alpha_i+\eta\\
b\leftarrow b+\eta y_i
\end{equation}
$$

**(4)转至(2)直到没有误分类数据**

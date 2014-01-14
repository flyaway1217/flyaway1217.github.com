---
layout: post
time: 2014-01-12
title: 朴素贝叶斯分类器
category: 机器学习
keywords: Naive Bayes Classifier,Text Classification
tags: Navie Bayes Classifier
description: 本文分析了朴素贝叶斯分类器的基本原理及其实现方式。
---

#朴素贝叶斯#

在经典的分类器模型中，**Naive Bayes Classifier**应该是比较简单的一种了，比之前的[决策树]({% post_url 2014-1-6-Decision-Tree-0 %})要简单得多，但是它虽然简单，但是一点都不简约，在很多情况下它往往能得到比较好的分类效果。

通常的分类问题中，每一个实例都可以用一个特征向量$x\_i$来表示的，其相应的类别用$y\_i$来表示，且$x\_i\in X$,$y\_i\in Y=\\{c\_1,c\_2,\dots,c\_k\\}$。其中$X$表示样本集合，$Y$表示类标记集合。

**朴素贝叶斯模型**的基本思想就是，通过直接从样本中学习得到**条件概率分布**$P(Y\vert X)$,对此，我们可以做如下的推导:

$$
\begin{equation}
P(Y\vert X) = \frac{P(X,Y)}{P(X)} = \frac{P(X\vert Y)\cdot P(Y)}{P(X)}
\end{equation}
$$

当我们需要判断一个未知实例$x$的类别时，利用如下的优化公式:


$$
\begin{equation}
\begin{aligned}
y &= \mathop{\arg\max}\limits_{c_k\in Y}\frac{P(X=x\vert Y=c_k)\cdot P(Y = c_k)}{P(X=x)} \\
&= \mathop{\arg\max}\limits_{c_k\in Y}P(X=x\vert Y=c_k)\cdot P(Y = c_k)
\end{aligned}
\end{equation}
$$

上面的第二个等号之所以成立，是因为$P(X=x)$对于$c\_k$来说是一个常数，因此在这里可以直接省略。

在上面的最后一个等式中，$P(X=x\vert Y=c\_k)$称为**后验概率**，而$P(Y = c_k)$称为**先验概率**，贝叶斯模型的学习过程就是从数据集上获得这两个概率分布的过程。

对于**后验概率**来说，我们可以将其展开:

$$
\begin{equation}
P(X=x\vert Y=c_k) = P(x^{1}=f^{1},\dots,x^{n}=f^{n}\vert Y=c_k)
\end{equation}
$$


上式中的$x^j=f^j$表示，实例$x$的第$j$个属性取值为$f^j$。

上式中的等号是**严格成立**的,但是不幸的是，如果根据上述的公式直接计算**后验概率**，那么空间复杂度是呈指数增长的，真实计算时是完全不可行的。假设$x^j$可能的取值有$S\_j$个，$y$可以取的值有$K$个，那么需要估计的参数总数将会是$K\prod\limits_{j=1}^{n}S\_j$.

为了解决计算复杂度的问题，**朴素贝叶斯模型**对条件概率分布作了**条件独立性的假设**{: style="color:red"},因为这是一个很强的假设，**朴素贝叶斯**也是因此而得名的。条件独立性假设是指:

$$
\begin{equation}
\begin{aligned}
P(X=x\vert Y=c_k) &= P(x^{1}=f^{1},\dots,x^{n}=f^{n}\vert Y=c_k) \\
&= \prod\limits_{j=1}^{n}P(x^j=f^j\vert Y=c_k)
\end{aligned}
\end{equation}
$$

上述公式中的第二个公式是**朴素贝叶斯**中最重要的核心部分，它是指**每个属性在给定分类结果的条件下是相互独立的**{: style="color:red"}

经过**条件独立性的假设**{: style="color:red"}的化简，原来的优化目标就可以写成:

$$
\begin{equation}
y = \mathop{\arg\max}\limits_{c_k\in Y}P(Y=c_k)\prod\limits_jP(x^j=f^j\vert Y=c_k)
\end{equation}
$$

经过这样的化简之后，我们需要学习的参数个数就变成了$K\sum\limits\_{j=1}^nS\_j$，这和原来的$K\prod\limits_{j=1}^{n}S\_j$相比，已经大大化简了。

**朴素贝叶斯法**实际上学习到生成数据的机制，所以属于**生成模型**。**条件独立假设**{: style="color:red"}等于是说用于分类的特征在雷确定的条件下都是条件独立的，这一假设使得**朴素贝叶斯**变得简单，但有时会牺牲一定的分类准确率.


#参数估计#


经过上面的分析，我们现在需要从数据中学习的分布有以下两个:

- $P(Y=c\_k)$ 先验概率分布
- $P(X=x\vert Y=y)=\prod\limits\_{j=1}^nP(x^j=f^j\vert Y=c\_k)$ 后验概率分布

##极大似然估计##

利用**极大似然估计**是比较容易从数据中学习上述两个概率分布的。

先验概率$P(y=c\_k)$的极大似然估计是:

$$
\begin{equation}
P(Y=c_k) = \frac{\sum\limits_{i=1}^{N}I(y_i=c_k)}{N},k = 1,2,\dots,K
\end{equation}
$$

其中$N$表示训练实例的个数，$\sum\limits\_{i=1}^{N}I(y\_i=c\_k)$表示在训练集中标记为$c\_k$的实例的个数.

设$x^j$可能取值的集合为$\\{f\_{j1},f\_{j2},\dots,f\_{jS\_{j}}\\}$，条件概率$P(x^j=f\_{jl}\vert Y=c\_k)$的极大似然估计是:

$$
\begin{equation}
P(x^j=f_{jl}\vert Y=c_k) = \frac{\sum\limits_{i=1}^NI(x_i^j=f_{jl},y=c_k)}{\sum\limits_{i=1}^{N}I(y_i=c_k)} \\
j=1,2,\dots,n;l=1,2,\dots,S_j,k=1,2,\dots,K
\end{equation}
$$

其中，$x\_i^j$是第$i$个样本的第$j$个特征，$f\_{jl}$是第$j$特征可能取的第$l$个值。

##贝叶斯估计##

但是，从上面的估计方法中，我们可以发现，其实**极大似然估计**还是有一些问题的，如果$x\_j^i=f_{jl},y\_i=c_k$的情况在训练数据中完全没有出现的话，那么整个估计就将变为0，这显然是不合理的，因此我们要对**极大似然估计**做出一点修改，修改之后的估计方法称为**贝叶斯估计**，后验概率的贝叶斯估计是:

$$
\begin{equation}
P_\lambda (x^j=f_{jl}\vert Y=c_k) = \frac{\sum\limits_{i=1}^NI(x_i^j=f_{jl},y=c_k)+\lambda}{\sum\limits_{i=1}^{N}I(y_i=c_k)+S_j\lambda}
\end{equation}
$$

上式中的$\lambda \geq 0$，当$\lambda = 0$时，就退化为**极大似然估计**;通常情况下$\lambda=1$，这时称为**拉普拉斯平滑**

同样，先验概率的贝叶斯估计是:

$$
\begin{equation}
P_\lambda(Y=c_k) = \frac{\sum\limits_{i=1}^{N}I(y_i=c_k)+\lambda}{N+K\lambda}
\end{equation}
$$

#具体实现#

朴素贝叶斯算法的Python简单实现如下:

{% highlight python3 %}
#coding:utf-8
"""
Program: Naive Bayes Algorithm
Description: 
Author: Flyaway - flyaway1217@gmail.com
Date: 2014-01-13 20:30:29
Last modified: 2014-01-13 21:58:27
Python release: 3.2.3
"""

from collections import Counter


class NaiveBayes:
    def __init__(self,dataset,labels,lam = 1):
        self.dataset = dataset
        self.labels = labels
        self.instance_num = len(dataset)
        self.lam = lam   #lambda
        self.count = {}
        self.prior = {}

    def getPrior(self,cla):
        '''
        get the prior probability
        '''
        member = self.prior[cla] + self.lam
        denominator = self.instance_num + len(self.prior) * self.lam
        return float(member/denominator)

    def train(self):
        self.prior={}
        m = Counter(self.labels).most_common()
        for item in m:
            self.prior[item[0]] = item[1] 

        for i,vector in enumerate(self.dataset):
            cla = self.labels[i]
            if cla not in self.count:
                self.count[cla] = [{}] * len(vector)
            for j,feat in enumerate(vector):
                self.count[cla][j][feat] = self.count[cla][j].get(feat,0) + 1

    def getPost(self,cla,index,feat):
        '''
        get the post probability
        '''
        member = self.count[cla][index].get(feat,0) + self.lam
        Sj = len(self.count[cla][index])
        denominator = self.prior[cla] + self.lam * Sj
        return float(member / denominator)

        

    def predict(self,testdata):
        result = []
        for vector in testdata:
            mP = 0.0
            mCla = None
            for cla in self.count:
                p = self.getPrior(cla)
                for i,feat in enumerate(vector):
                    p *= self.getPost(cla,i,feat)
                if p > mP:
                    mP = p
                    mCla = cla
            result.append(mCla)
        return result


if __name__ == '__main__':
    import Read
    path = './Data/breast-cancer.data'
    trainset,trainlabels = Read.Open(path)
    index = int(len(trainset)/5)

    testset = trainset[:index]
    testlabels = trainlabels[:index]
    
    trainset = trainset[index:]
    trainlabels = trainlabels[index:]

    nb = NaiveBayes(trainset,trainlabels,1)

    nb.train()
    result = nb.predict(testset)
    print(result)
    print(testlabels)
    right = len([i for i in range(len(result)) if result[i] == testlabels[i]])
    print('Precision = ' + str(right/len(result)))
{% endhighlight %}


#总结#

真是没想到要将**朴素贝叶斯模型**表述出来，竟然会有这么多的公式，但是请读者千万不要被这些公式给吓住了，其实**朴素贝叶斯**的方法是非常简单的，只有一点统计的基础，上述的这些公式都应该看得懂。

其实学习就是这么一回事，在你理解之前觉得是“高端大气上档次”，但是当你真正理解之后，你就会觉得也就是"just so so"，所以，还请静下心来，好好理解一下**朴素贝叶斯模型**.

#参考资料#

1. <统计机器学习>——李航
2. [【朴素贝叶斯】实战朴素贝叶斯_基本原理](http://blog.csdn.net/xceman1997/article/details/7951513)
3. [Wiki:朴素贝叶斯分类器](http://zh.wikipedia.org/wiki/朴素贝叶斯分类器)

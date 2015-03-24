---
layout: post
time: 2014-01-11
title: 决策树2-ID3,C4.5,CART
category: Machine-Learning
keywords: Decision Tree,Machine Learning,ID3,决策树,机器学习
tags: DecisionTree
description: 机器学习中的经典分类方法——决策树的分析与实现。
---

在之前的[决策树0-基本模型]({% post_url 2014-1-6-Decision-Tree-0  %})和[决策树1-建模过程]({% post_url 2014-1-6-Decision-Tree-1  %})中分别分析了什么是**决策树模型**和**决策树的建模过程**，但是这两篇文章都是在比较抽象的层次上介绍**决策树**的，本篇文章聚焦于决策树模型的具体**代码实现**，本篇文章将会主要分析决策树模型的三个经典实现算法，分别是**ID3**,**C4.5**和**CART**(决策树模型的具体算法实现还有很多不同的版本，绝不仅仅这里列出的这三种，这三种算法是最为经典的。)，这三个方法各有利弊，针对不同的问题可以选择不同的算法。



#ID3算法#

##主要过程##

ID3算法是一种比较简单的决策树实现方式，它使用的是**信息增益**作为节点的分裂指标，并且没有剪枝操作。

关于**信息增益**和节点的**分裂标准**的概念已经在[决策树1-建模过程]({% post_url 2014-1-6-Decision-Tree-1  %})中说明了，这里就不再重复了，直接给出**信息增益**的表达式：

$$
\begin{equation}
g(D,A) = H(D) - H(D\big\vert A)
\end{equation}
$$

其中$H(D)$表示当前数据集的**信息熵**,$H(D\big\vert A)$表示$D$在选择特征$A$的情况下的**条件熵**.

**ID3**算法的主要过程如下:

---------------

- **输入**:训练数据集$D$,特征集$A$,阈值$\epsilon$
- **输出**:决策树$T$

1. 若D中的所有实例属于同一类$C\_k$，则$T$为单节点树，并将类$C\_k$作为该节点的类标记，返回T
2. 若$A = \varnothing$，则$T$为单节点数，并将$D$中实例数最大的类$C\_k$作为该节点类标记，返回$T$
3. 否则，逐个计算$A$中的各个特征对$D$的信息增益，选择信息增益最大的特征$A\_g$
4. 如果$A\_g$的信息增益小于阈值$\epsilon$，则置$T$为单节点树，并将$D$中实例数最大的类$C\_k$作为该节点的类标记，返回$T$
5. 否则，对$A\_g$的每一个可能值$a\_i$，依$A\_g=a\_i$将$D$分割为若干非空子集$D\_i$，构建子节点，由当前节点及其子节点构成树$T$，返回$T$
6. 对第$i$个子节点，以$D\_i$为训练集，以$A-\{A\_g\}$为特征集，递归的调用1-5步，得到子树$T\_i$，返回$T\_i$

----------

##细节##

在具体实现ID3的时候，其实并不一定要按照其递归的过程来进行的，个人觉得虽然递归过程非常通俗易懂，但是却很难调试，而且效率也很低。其实在具体实现的时候，可以利用广度遍历代替深度遍历，即使用迭代来代替递归。用迭代代替递归的好处之一就是方便在编码的时候跟踪调试程序，而且当树的层次很深时，可能直接会出现栈溢出的情况。

另外一个需要注意的问题是，不仅仅要给叶子节点设置其标记，还要给每一个非叶节点设置相应的标记，这是因为，在实际的数据中，可能会出现这样的情况:**某个属性值只在测试集中出现，而没有在训练集中出现。**虽然这种情况是非常少见的，但并不是没有可能，如果在预测的时候遇到这种情况，可以直接将当前非叶结点的标记作为最终的类别标记返回。

关键的节点分裂代码如下所示:

{% highlight python3 %}
def split(self):
        if self.isLeaf == True: return None

        index = [i for i in range(self.feat_num) if self.isvisited[i] == False]
        bestFeat = -1
        bestChildren = {}
        bestinforGain = 0.0
        for i in index:
            values = set([vector[i] for vector in self.dataset])
            children = {}
            newEntropy = 0.0
            for value in values:
                subset,sublabels = self.getSubSet(i,value)
                isvisited = self.isvisited[:]
                isvisited[i] = True
                children[value] = ID3Node(subset,sublabels,isvisited)
            for key in children:
                child = children[key]
                prob = float(len(child) / self.instance_num)
                newEntropy += (prob * child.getEntropy())
            inforGain = self.entropy - newEntropy

            #inforGain = inforGain / self.entropy

            if inforGain >= bestinforGain:
                bestinforGain = inforGain
                bestFeat = i
                bestChildren = children

        self.selectFeat = bestFeat
        return bestChildren
{% endhighlight %}

树的非递归生长过程如下:


{% highlight python3 %}
def train(self):
        Q = queue.Queue()
        Q.enqueue(self.root)
        while not Q.isEmpty():
            node = Q.dequeue()
            if node.isLeaf == False:
                children = node.split()
                node.children = children
                for key in children:
                    Q.enqueue(children[key])
{% endhighlight %}

预测过程如下:

{% highlight python3 %}
def predict(self,testdata):
        if self.isLeaf == True:
            return self.classlabel
        else:
            value = testdata[self.selectFeat]
            if value not in self.children:
                return self.classlabel
            return self.children[value].predict(testdata)
{% endhighlight %}

##评价##

从上述的分析中可以看到，其实ID3算法还是有很多的局限性的:

1. 只能处理特征值是离散值的情况
2. 使用**信息增益**作为节点的分裂标准，实际上并不合理，会倾向于选择取值较多的属性。
3. 并没有剪枝操作，容易发生过拟合的现象[^1]。
4. 无法处理缺失值

基于上述的这些缺点，C4.5算法被提出来了，它克服上述ID3算法的部分缺点。

#C4.5算法#

##主要过程##

C.45算法的整体过程是和ID3很相似的，只是在具体细节的地方有少许不同。

首先为了更加合理的分裂节点，C4.5算法中不再使用**信息增益**作为分裂标准，而是使用**信息增益比**作为分裂标准，相关概念也已经在[决策树1-建模过程]({% post_url 2014-1-6-Decision-Tree-1  %})中说明了，此处直接给出计算公式:

$$
\begin{equation}
g_R(D,A) = \frac{g(D,A)}{H(D)}
\end{equation}
$$

其次为了解决只能处理离散值的情况，C4.5算法中增加了对连续数值的处理过程，当一个属性是离散值时，处理方式和ID3一样；当属性值是连续的时候，采用如下的步骤计算其**信息增益比**:

---------------

- **输入**: 连续值的属性A
- **输出**: 该属性的最佳分裂点以及相应的信息增益比

1. 将该节点上的A属性值进行升序排列，得到属性值序列$\{A\_1,A\_2,\dots A_n\}$
2. 计算出$n-1$个分裂点，每一个分裂点$B\_i=A\_{i+1} - A\_i$
3. 遍历上述所有的分裂点$B\_i$，每一个分裂点都将数据分成两个子集，计算每个分裂点分割之后的信息增益比
4. 选择使得信息增益最大的那个$B\_k$作为最终的分裂点，返回$B\_k$及其相应的信息增益比。

---------------

从上述的过程可以看出，其实对于连续值的处理，C4.5算法是进行二分处理的，在二分的前提下寻找最优的分裂点。

最后，C4.5算法中是进行后剪枝操作的，但是这部分剪枝的算法也是一个很复杂的过程，我还没能完全理解，这部分内容只能留待后补了。

##评价##

C4.5算法在一定程度上改进了ID3算法本身固有的一些缺点，事实上，C4.5是决策树实现算法中**最常用**的一种算法.


#CART算法#

**CART**算法的全称是Classification And Regression Tree，从它的名字上我们就可以知道，CART不仅仅可以用来处理分类问题,还能够处理回归问题。这在[决策树1-建模过程]({% post_url 2014-1-6-Decision-Tree-1  %})中也有所提及，决策树不仅仅可以处理分类问题，只需要将分裂标准改成该节点中所有数据的方差最小，并且把节点的标记改成当前节点中所有数据的平均值，而不是类别。

**CART**中采用的是**Gini指数**作为分裂标准,同时它也是包含后剪枝操作的

#参考资料#

1. [Decision Tree：Analysis](http://isilic.iteye.com/blog/1841339)
2. <统计机器学习>——李航
3. [决策树-上-ID3 C4.5 CART及剪枝](http://wenku.baidu.com/view/415c3cc19ec3d5bbfd0a7464.html)
4. [C4.5决策树](http://blog.sina.com/s/blog_68ffc7a40100urn3.html)

[^1]: 其实在算法中设置阈值$\epsilon$就是一种预剪枝的过程，但是此处所说的剪枝过程通常是指后剪枝。

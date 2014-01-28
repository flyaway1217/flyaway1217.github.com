---
layout: post
title: 感知机的Python简单实现(任意维度)
time: 2013-3-14
category: 统计学习
tags: Python,统计学习方法,监督学习
keywords: Python,统计学习方法,监督学习,感知机实现,感知机
description: 之前写过一篇感知机模型原理的文章，这次用Python具体实现出来，加深对模型的理解。
---

之前写过一篇感知机模型原理的文章，这次用Python具体实现出来，加深对模型的理解。

具体的模型描述请参考[这里]({% post_url 2013-03-02-Statical-Learning-Perceptron %} "感知机")，这里不再说明了。唯一要强调的是，感知机模型的前提是，数据必须是**线性可分**的，如果线性不可分，算法是不会**收敛**的，最终体现就是无限的**死循环**，在最后的测试数据中给出一组线性不可分的数据。


{% highlight python3 %}
#coding:utf-8
"""
简单感知机学习算法

感知机模型:f(x)=sign(w*x+b)
算法策略:损失函数:L(w,b)=y(w*x+b)
学习算法:梯度下降法

参考书籍:《统计学习方法》——李航
@author: flyaway
@date: 2013-3-12
@Python: 2.7.3
"""


class Perceptron:
  """
  感知机类，一共七个方法，分别是:
  __init__:构造函数
  isError:判断是不是误分点
  adjust:利用梯度下降法修改参数
  train:开始训练数据

  add:两个向量的加法
  vtimesv:两个向量的乘法
  vtimesi:向量乘实数
  """

  def __init__(self,eta,w0,b0,data):
    """
    eta是学习率，w0是权值向量w的初值，b0是偏置b的初值
    """
    self.eta = eta
    self.w = w0
    self.b = b0
    self.data = data

  def isError(self,x):
    '''
    用来判断是否是误分类点，如果计算结果大于0，则表示被正确分类的，否则是误分类点
    '''
    result=(self.vtimesv(self.w , x[:-1]) + self.b)*x[-1]
    if result > 0:
      return False
    else:
      return True 


  def adjust(self,x):
    '''
    更新权值向量w和偏置b
    '''
    self.w = self.add(self.w , self.vtimesi(x[:-1] , self.eta * x[-1] ))
    self.b = self.b + self.eta * x[-1]
    return
	
  def train(self):
    '''
    开始训练数据
    '''
    #获得数据个数
    n = len(data)
    flag=True
    count=0
    print('-'*30)
    while flag:
      for i in range(0,n):
        if self.isError(data[i]):
          count+=1
          print('No.{0} adjustment...'.format(count))
          print('data:'+str(data[i]))
          print('(w,b)=:'+str(self.w)+' '+str(self.b))
          self.adjust(data[i])
          flag=True
          break
        else:
          flag=False
    #返回训练好的模型参数
    return (self.w,self.b,count)

  @staticmethod
  def add(x,y):
    '''
    计算两个向量相加，返回一个新的向量
    '''
    if len(x)!=len(y):
      raise Exception
    else:
      return [x[t]+y[t] for t in range(len(x))]


  @staticmethod
  def vtimesv(x,y):
    '''
    计算两个向量相乘，返回一个实数
     '''
    if len(x)!=len(y):
      raise Exception
    else:
      z = [x[t]*y[t] for t in range(len(x))]
      return sum(z)
	
  @staticmethod
  def vtimesi(vector,n):
    return [vector[t]*n for t in range(len(vector))]


if __name__=='__main__':
  #书上的原始数据
  #data = [[3,3,1],[4,3,1],[1,1,-1]]
  #线性可分的测试数据
  #data = [[3,3,1],[4,3,1],[1,1,-1],[2,2,-1],[5,4,1],[1,3,-1]]
  #线性不可分，导致死循环
  #data = [[3,3,1],[4,3,1],[1,1,-1],[1,3,-1],[2,2,1],[3,1,-1]]
  data = [[3,3,1],[4,3,1],[1,1,-1],[1,3,-1],[2,2,-1],[3,1,-1]]
  p = Perceptron(0.5,[0,0],0,data)
  answer = p.train()
  print('-'*30)
  print('answer'+str(answer))
{% endhighlight %}


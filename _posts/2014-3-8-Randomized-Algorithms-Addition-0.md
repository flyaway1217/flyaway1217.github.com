---
layout: post
time: 2014-03-08
title: 随机算法学习笔记外传0-Monty Hall问题
category: Randomized-Algorithm
keywords: 随机算法,Monty Hall
tags: 随机算法,Monty Hall
description: 本文从概率角度阐述了Monty Hall问题。
---

[Monty Hall Problem][MontyHall]主要描述了这样一个场景:假设你参加一个电视节目，有三扇门，其中一扇门之后是一台豪华轿车，其他两扇门之后分别是一头山羊，但是你并不知道汽车在哪扇门之后。首先你随机选择一扇门(假设为a)，然后由主持人(知道所有门后的情况)从另外两扇门中打开一扇后面是山羊的门(假设为c)，现在只剩下两扇门了(a和b)，问你的选择是否改变(选择b)？

其实这就是一个概率的问题，我们可以做一下简单的计算:

首先我们需要假设两个基本事件，$A=$"你最终赢得大奖",$B=$"第一次的选择是正确的".

现在分两种情况来计算其概率:

1. 选择不换。那么当初你是从三个门中选择一个的，所以$Pr[A] = \frac{1}{3}$

2. 选择换，在这种情况下，可以利用全概率法则对$Pr[A]$进行展开:

$$
\begin{equation}
Pr[A] = Pr[A\vert B]Pr[B] + Pr[A\vert \bar{B}]Pr[\bar{B}] = 0 + \frac{2}{3} = \frac{2}{3}
\end{equation}
$$

因为在选择交换的情况下，$Pr[A\vert B]=0$，所以上式中的第一项就是$0$，同样的，当初是在两扇门之间进行选择，所以$Pr[\bar{B}]=\frac{2}{3}$，而$Pr[A\vert\bar{B}]=1$,所以第二项为$\frac{2}{3}$


这个结果也许有一些反直觉，但事实就这样，选择换得奖的概率要比不换大，这正是数学的神奇之处～


[MontyHall]: http://en.wikipedia.org/wiki/Monty_Hall_problem



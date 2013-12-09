---
layout: post
time: 2013-11-25
title: 矩阵论学习笔记6-矩阵分解
category: 矩阵论
keywords: 矩阵论,数学,矩阵分解,初等矩阵,满秩分解
tags: 矩阵论,数学
description: 矩阵论学习课程笔记
---


#初等矩阵#

**定义**: 设$u,v\in C^n$,$\sigma$为一复数，形式为$E(u,v,\sigma)=I-\sigma uv^H$的矩阵，称为初等矩阵。

第一次看到这个定义的时候，有点蒙……仔细研究了一下，觉得这里有几点需要强调一下:

- 这的$C$是复数域符号，以前不太接触复数域，所以一上来这个符号有点没反应过来，所以$C^n$是指复数域上的向量
- $H$是复数域上的一种矩阵运算符号，称为[共轭转置](http://zh.wikipedia.org/wiki/%E5%85%B1%E8%BD%AD%E8%BD%AC%E7%BD%AE 共轭转置)，在实数域中就可以被认为是转置操作($T$)

##初等矩阵的性质##

1. $det(E(u,v,\sigma))=1-\sigma v^Hu$
2. 如果$\sigma V^Hu\neq 1$，则$E(u,v,\sigma)$可逆，并且其逆矩阵也是初等矩阵$E(u,v,\sigma)^{-1}=E(u,v,\tau)$，其中$\tau = \frac{\sigma}{\sigma v^Hu-1}$
3. 对任意的非零向量$a,b\in C^n$，可适当选取$u,v$和$\sigma$使得$E(u,v,\sigma)a=b$

##两种比较重要的初等矩阵##

**初等下三角矩阵**

令$u=l\_i=(0,\cdots,0,l\_{i+1,i},\cdots,l\_{ni})$,$v=e\_i$,$\sigma=1$则$L\_i=L\_i(l\_i)=E(l\_i,e\_i,1)$称为**初等下三角矩阵**，即

$$
\begin{equation}
L_i=L_i(l_i)=I-l_ie_i^T=
\begin{bmatrix}
1 & & &  & & & 0 \\
& \ddots & & & \\
& & 1 & \\
& & -l_{i+1,i} & 1 \\
& & \vdots & & \ddots\\
0 & & \vdots & 0 & & \ddots\\
& &  -l_{n,i} & & & & 1
\end{bmatrix}
\end{equation}
$$

其中$e_i=(\underbrace{0,\cdots,1}_\text{i},0,\cdots,0)$

**HouseHolder变换**

在初等矩阵$E(u,v,\sigma)=I-\sigma uv^t$中取$u=v=\omega,\sigma=2$，并且$\omega$是单位向量，即$\Vert\omega\Vert=1$,初等矩阵

$$
\begin{equation}
H(\omega)=E(\omega,\omega,2)=I-2\omega\omega^H
\end{equation}
$$

称为**HouseHolder矩阵**或**初等Hermit矩阵**

**HouseHolder矩阵的性质**

1. HouseHolder矩阵是对称的
2. HouseHolder矩阵是正交矩阵
3. HouseHolder矩阵的保范性，即对向量$x,y$，总有$(Hx,Hy)=(x,y)$(**不改变内积**)

**定理**: 设向量$x$和$y$满足$\Vert x\Vert=\Vert y\Vert$，于是取向量$\omega=y-x$，构造HouseHolder矩阵$H=I-2\omega\omega^T/\omega^T\omega$，就能使得$Hx=y$

**HouseHolder变换的一个基本作用是使被选定的矩阵或向量的某些元素消为零。HouseHolder矩阵能在保持向量二范数和内积不变的情况，将一些元素消成零。**{: style="color:red"}

#矩阵的满秩分解#

**满秩分解定理**: 设$m\times n$矩阵$A$的秩为$r>0$，则存在$m\times r$矩阵$B$和$r\times n$矩阵$C$使得

$$
\begin{equation}
A=BC
\end{equation}
$$

并且$rank(B)=rank(C)=r$

证明：

假设$A\in R^{m\times n}$，且$rank(A)=r\le\min(m,n)$，则总存在$m$阶矩阵$P$和$n$阶矩阵$Q$，使得$A=P\begin{bmatrix}I_r & 0 \\\\ 0 & 0\end{bmatrix}Q$

又因为$\begin{bmatrix}I_r & 0 \\\\ 0 & 0\end{bmatrix}=\begin{bmatrix}I_r \\\\ 0\end{bmatrix}\begin{bmatrix}I_r  0\end{bmatrix}$

所以令$B=P\begin{bmatrix}I_r \\\\ 0\end{bmatrix}$,$C=\begin{bmatrix}I_r  0\end{bmatrix}Q$

即$A=BC$

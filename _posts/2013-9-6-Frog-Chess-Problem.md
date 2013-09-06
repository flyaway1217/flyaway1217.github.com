---
layout: post
time: 2013-09-06
title: Frog Chess问题
category: 算法
keywords: 三只青蛙交换位置,Frog Chess,深度优先搜索,广度优先搜索
tags: 深度优先搜索,广度优先搜索,算法
description: 最初是在OSChina上看到的这个题目，觉得蛮有意思的，用两种搜索算法去实现了一下，现在把过程记录下来。
---

#问题出处#

我最初是在[OSChina](http://www.oschina.net/question/136226_122187)上看到这个问题的，有人在论坛上把这个问题提了出来，寻求算法来解决。最初的问题其实是一个[Flash小游戏](http://s15.photobucket.com/user/hilllynx/media/9242c12c.swf.html)，简单来说，就是一共有6只青蛙，左右各3只，中间还有一个空格，我们的任务是经过有限步的跳跃，将左右青蛙的位置交换。交换的时候会有一些限制条件：

1. 青蛙只能前进，不能后退
2. 每次只能前进1格或2格

当时试玩的时候，玩了好几次才成功……我实在太笨了*-.-*{: style='color:red'}

#用算法求解#

当考虑用算法求解这个问题的时候，首先要将这个题目数字化，就是如何在程序中表达这个游戏过程。如果把注意力集中在青蛙身上，一共有6只青蛙，那就是说需要设置6个变量，并且需要时刻跟踪这6个变量的变化，这样的程序难度太大了，而且如果青蛙数目继续增加的话，程序就更不好处理了，这显然不是一个好方法。我们可以换个角度来看待这个问题，不需要盯着青蛙是如何运动的，只需要盯着当中那个空格是如何运动的。因为所有的格子总会比青蛙多一个，所以我们只需要关注格子的位置就可以了。

因为在每次的移动过程中，空格只有四种情况:往左移动2格、往左移动1格、往右移动2格、往右移动1格。因此我把整个青蛙序列作为一个状态，每一个状态都可以经由4条不同的路径转移到下一个状态(对应于4种移动方案)，这样我就能把原问题转化为一个图搜索问题:**从初始状态开始，找到一条达到目标状态的路径。**

根据问题中的限制条件，空格只能和其左右2格以内的青蛙进行交换，并且空格往右移动的时候只能和原本在右边的青蛙交换，同样，往左移动的时候，只能和原本在左边的青蛙交换。因此我可以将整个青蛙序列用一个数组表示，原来在左侧的青蛙用-1表示，原来在右侧的青蛙用1表示，空格用0表示。同时，我用-2、-1、1、2分别表示空格往左移动2格，往左移动1格，往右移动1格，往右移动2格。注意，这里我使用了一个小技巧:空格能够往左(-1,-2)移动的条件是，左边要交换的位置上有一个原来在左侧(-1)的青蛙，这样的话，我只需要判断往左的代表值和青蛙的代表值是否同号，我就能判断能否进行交换了。

#代码#

{% highlight python3 %}
#深度遍历，其中order参数是用来记录路径的
def deepexplore(table,order):
    index = table.index(0)
    #判断是否是终点状态
    if index == len(table) // 2 and sum(table[:index]) == len(table)//2:
        print('Swap Complete!')
        return True
    #顺序尝试四条路径
    for i in range(-2,3):
        #判断是否越界，是否倒退
        if i == 0 or index + i < 0 or index + i >= len(table) or table[index+i] * i <=0:
            continue
        else:
            table[index+i],table[index] = table[index],table[index+i]
            order.append(table[:])
            if deepexplore(table,order) == True:
                return True
            order.pop(-1)
            table[index+i],table[index] = table[index],table[index+i]


def widthexplore(table):
    stack = []
    stack.append((table[:],False))
    while len(stack)!=0:
        state = stack.pop(0)
        index = state[0].index(0)
        #判断是否是终点
        if index == len(state[0]) // 2 and sum(state[0][:index]) == len(state[0])//2:
            print('Swap Complete!')
            break
        for i in range(-2,3):
            #判断是否越界，是否倒退
            if i == 0 or index + i < 0 or index + i >= len(state[0]) or state[0][index+i] * i <=0:
                continue
            else:
                newstate = (state[0][:],state)
                newstate[0][index+i],newstate[0][index] = newstate[0][index],newstate[0][index+i]
                stack.append(newstate)
    #还原路径
    order = []
    while state[1] != False:
        order.append(state[0])
        state = state[1]
    order.append(state[0])
    order.reverse()
    return order

def frogchess(n):
    table = [-1] * n + [0] + [1] * n
    order=[]
    order.append(table[:])
    deepexplore(table,order)
    order.reverse()
    for item in order:
        print(item)


if __name__ == '__main__':
    frogchess(4)

{% endhighlight %}

程序结果如下图:

3只青蛙的情况:

![3只青蛙](/assets/image/posts/2013-9-6-Frog-Chess-1.png)

4只青蛙的情况:

![4只青蛙](/assets/image/posts/2013-9-6-Frog-Chess-2.png)

上述代码中，我用了两种方法进行搜索，分别是深度优先和广度优先，本来以为广度优先能够找到最少的移动序列，但是程序跑下来，广度优先除了更加耗时间以外，找到的路径和深度优先是一样的。

#总结#

本来想从数学角度来推导得到一个比较美观的公式的，可是数学功底不扎实，实在找不到什么数学原理，只能直接用程序来计算，上面的算法只是利用计算机的高速计算的特点从解空间中寻找答案。 一旦青蛙的数量有所提高，计算量就迅速增大，这样的解法就不再适合了($N>20$)，应该要从数学角度寻求更优的解法。


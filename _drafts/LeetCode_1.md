---
layout: post
time: 2014-09-18
title: Leet Code解题报告1
category: LeetCode
keywords: LeetCode,解题报告
tags: LeetCode
description: 本篇报告解决3个问题,分别为Sort List,Insertion Sort List,LRU Cache 
---

# Sort List

> 题目: Sort a linked list in $O(n\log n)$ time using constant space complexity.
>

**解题思路**:

这一题我做的有点"奸诈"，我先是将链表元素映射成数组元素，然后对数组排序，最后再返回成链表。代码如下:


{% highlight python3 %}

# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    # @param head, a ListNode
    # @return a ListNode
    def sortList(self, head):
        p = head
        v = []
        while p!=None:
            v.append(p.val)
            p = p.next
        v = sorted(v)
        
        if len(v) !=0:
            root = ListNode(v[0])
        else:
            return None
        p = root
        for i,item in enumerate(v):
            if i !=0:
                q = ListNode(item)
                p.next = q
                p=q

        if p!= None:
            p.next = None
        return root

{% endhighlight %}

# Insertion Sort List

> 题目: Sort a linked list using insertion sort.

**解题思路**:

思路很简单，就是简单的插入排序的策略，具体也没啥好说的.但是在具体的实现过程中，总是出现超时的情况，多次修改之后终于通过了，总结了几点需要注意的地方:

1. 比较的时候，遇到相同的数值，直接交换，插入到相同的序列的最前部，这样能避免不必要的重复比较
2. 第一层循环的时候，一开始就需要判断当前元素是否是已排好序的序列中的最大值，如果是，则第二层循环就可以不需要了，避免了多余的比较
3. 由于2中提前比较了最大值，所以第二层循环中不必担心从前往后的扫描会扫到当前的自身，这样可以在最内层的循环中减少判断过程，提高效率

最后贴上代码:

{% highlight python3 %}

#Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    # @param head, a ListNode
    # @return a ListNode
    def insertionSortList(self, head):
        if head == None:
            return None
        tmpHead = ListNode(-1)
        tmpHead.next = head
        p = tmpHead.next
        while( p != None and p.next != None ):
            if p.next.val < p.val:
                q = tmpHead
                while(q.next.val < p.next.val):
                    q = q.next
                t = p.next
                p.next = p.next.next
                t.next = q.next
                q.next = t
            else:
                p = p.next
        return tmpHead.next
 

{% endhighlight %}


# LRU Cache

> 题目: Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: `get` and `set`.
>
>
> `get(key)` - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
>
>
> `set(key,value)` - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.


**解题思路**:

这一题相对来说，也很简单，主要是维护一个LRU列表，其中的值就是key，越是常使用的key越是在列表后部，越是不常用的，越是排在前面。

代码如下:

{% highlight python3 %}

class LRUCache:
    # @param capacity, an integer
    def __init__(self, capacity):
        self.capacity = capacity
        self.values = dict()
        self.LRU = []
        
    # @return an integer
    def get(self, key):
        if key in self.values:
            self.LRU.remove(key)
            self.LRU.append(key)
        return self.values.get(key,-1)

    # @param key, an integer
    # @param value, an integer
    # @return nothing
    def set(self, key, value):
        if key in self.values:
            self.values[key] = value
            self.LRU.remove(key)
            self.LRU.append(key)
        elif len(self.values) < self.capacity:
            self.values[key] = value
            self.LRU.append(key)
        else:
            maxKey = self.LRU.pop(0)
            self.values.pop(maxKey)
            self.values[key] = value
            self.LRU.append(key)

{% endhighlight %}


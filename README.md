# React 实现 FLIP Demo

FLIP 是 First, Last, Inverse, Play 四个单词的英文缩写, 指的是实现动画的四个步骤.  
First: 元素最开始的坐标尺寸
Last: 元素最终的坐标尺寸
Inverse: 计算出最终与开始之间的差值, 用 `transform` 属性将最终状态的元素反转到开始的位置
Play: 设置 `transition`, 并将 `transform` 设置为 `none`. 让浏览器产生动画.

资料:  
https://www.nan.fyi/magic-motion#consolidating-size-with-position  
https://aerotwist.com/blog/flip-your-animations/#the-general-approach   
https://gist.github.com/yinjunok/3c18bdb56554e0b3a1485b2e7268cdf5 


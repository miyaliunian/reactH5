# React 移动端下拉刷新： 

### 前提：

网上有很多针对vue封装的移动端UI组件库，但react的移动端UI组件库貌似只有Google的
material UI和阿里的 ant design mobile。阿里的下拉刷新又不符合项目的风格,只能
自己实现了。
采用better-scroll+react实现。

### 为什么要采用better-scroll

better-scroll 是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件。它的核心
是借鉴的 iscroll 的实现，它的 API 设计基本兼容 iscroll，在 iscroll 的基础上又
扩展了一些 feature 以及做了一些性能优化。 
另外 better-scroll 中已经提供了下拉刷新 上拉加载更多的方法，我要做的也是在其方法
内完善我要的效果



#### 下拉刷新

pullDownRefresh选项，用来配置下拉刷新功能。当设置为 true 或者是一个 Object 的时候，开启下拉刷新，可以配置顶部下拉的距离（threshold）来决定刷新时机，以及回弹停留的距离（stop）

```javascript
options.pullDownRefresh = {
  threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
  stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
}

this.scroll = new BScroll(this.$refs.wrapper, options)
```

监听 pullingDown 事件，刷新数据。并在刷新数据完成之后，调用 finishPullDown() 方法，回弹到顶部边界

```javascript
this.scroll.on('pullingDown', () => {
  // 刷新数据的过程中，回弹停留在距离顶部还有20px的位置
  RefreshData()
    .then((newData) => {
      this.data = newData
      // 在刷新数据完成之后，调用 finishPullDown 方法，回弹到顶部
      this.scroll.finishPullDown()
  })
})
```



## 上拉加载更多

pullUpLoad选项，用来配置上拉加载功能。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机

```javascript
options.pullUpLoad = {
  threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
}
this.scroll = new BScroll(this.$refs.wrapper, options)
```

监听 pullingUp 事件，加载新数据。

```javascript
this.scroll.on('pullingUp', () => {
  loadData()
    .then((newData) => {
      this.data.push(newData)
  })
})
```

详细代码在src/baseUI/ScrollView

Page({
  ontap: function() {
    //wx.navigateTo指的是父级跳转到子级，层次不能超过五层，onHide函数能监听
    //wx.redirectTo是平行跳转，不存在关系可言，跳转过后关闭当前页面，onUnload函数能监听
    //bind绑定的事件可能会出现冒泡，catch不会可以阻止冒泡
    wx.switchTab({
      url: '../News/new'
    })
  }
})
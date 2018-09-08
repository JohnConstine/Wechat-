var acceptData = require("../../data/New_data.js") //必须用相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive: false
  },
  tapName: function(e) {
    this.setData({
      isActive: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      date_key: acceptData.sendData
    });

  },

  openDetail: function(event) {
    var NewId = event.currentTarget.dataset.newid; //拿到当前模板页面的属性NewId的索引值
    wx.navigateTo({
      url: 'News_details/new_details?id=' + NewId
    })
  },
  // onTagertDetail: function (event) {
  //   var NewId = event.currentTarget.dataset.newid; //拿到当前模板页面的属性NewId的索引值
  //   wx.navigateTo({
  //     url: 'News_details/new_details?id=' + NewId
  //   })
  // },
  onSwiperDetail:function(e){
    var NewId = e.target.dataset.newid;//这里只能用target去取id值，因为target是捕获组件的当前状态，currentTarget是事件捕获的组件，而id值写在组件里面的
    wx.navigateTo({
       url: 'News_details/new_details?id=' + NewId
     });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
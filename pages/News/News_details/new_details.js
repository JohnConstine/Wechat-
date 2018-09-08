var acceptData = require("../../../data/New_data.js");//接受的是一个JavaScript对象，需要调用里面的数组元素
var util = require("../../../utils/util.js");
var app = getApp();
Page({

  data: {
    actionSheetHidden: true,
    isPlayingMusic: false //初始化控制器状态
  },
  onLoad: function(options) {
    // var NewUrl = "http://route.showapi.com/1079-1";
    var NewContent = "https://news-at.zhihu.com/api/4/news/9694158";
    //app.globalData.g_NewsDB + "?type=top&key=APPKEY";
    util.httpMoviesDB(NewContent,this.callback);
    var Newid = options.id;
    this.data.currentNewId = Newid;
    var NewData = acceptData.sendData[Newid];
    this.setData(NewData);
    console.log(Newid + "    " + this.data.currentNewId)
    var getNewsvalue = wx.getStorageSync("News_local");

    console.log(this.data)
    if (getNewsvalue) {
      var new_value = getNewsvalue[Newid];
      if (new_value) {
        this.setData({
          isActive: new_value
        });
      }
    } else {
      var getNewsvalue = {};
      getNewsvalue[Newid] = false;
      wx.setStorageSync("News_local", getNewsvalue);
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_PlayingMusicId === Newid){
         this.setData({
           isPlayingMusic:true
         });    
    }
    //监听小程序自带的播放器，做到同步实现播放暂停操作
    var that = this;//保存一个全局this环境
    wx.onBackgroundAudioPlay(function(){
       that.setData({
         isPlayingMusic:true
       });
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_PlayingMusicId = that.data.currentNewId;
    });
    wx.onBackgroundAudioPause(function(){
      that.setData({
        isPlayingMusic:false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_PlayingMusicId = that.data.currentNewId;
    });
    wx.onBackgroundAudioStop(function(){
      that.setData({
        isPlayingMusic: false
      });
    });
  },
  callback:function(data){
    console.log(data)
  },
  OnCollection: function(event) {
    var getNewsvalue = wx.getStorageSync("News_local");
    var new_value = getNewsvalue[this.data.currentNewId];
    //console.log(new_value)
    new_value = !new_value;
    getNewsvalue[this.data.currentNewId] = new_value;
    this.showCollection(getNewsvalue, new_value);
  },
  showCollection: function(getNewsvalue, new_value) {
    // console.log(this == window)
   // var that = this; //this指向的不是全局的环境所以将全局的this保存到that里面
    wx.setStorageSync("News_local", getNewsvalue)
    this.setData({
      isActive: new_value
    });
    wx.showToast({
      title: new_value ? "收藏成功" : "取消成功",
      duration: 1000
    })
  },
  OnShare: function(event) {
    var itemList = [
      "分享给微信好友", "分享给QQ好友", "分享到朋友圈", "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#8F8F8F",
      success: function(res) {

      }
    });
  },
  listenerButton: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  listenerActionSheet: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  OnAudio: function(e) {
    var MusicId = this.data.currentNewId;
    var MusicData = acceptData.sendData[MusicId].music;
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
    } else {

      wx.playBackgroundAudio({
        dataUrl: MusicData.dataUrl,
        title: MusicData.title,
        coverImgUrl: MusicData.coverImgUrl
      });
      this.setData({
        isPlayingMusic: true
      });
    }

  }
})
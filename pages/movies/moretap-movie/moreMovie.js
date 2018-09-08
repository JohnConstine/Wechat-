// pages/movies/moretap-movie/moreMovie.js
var app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    moviesdata: {},
    requestUrl:"",
    nextNum:0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var tapmovie = options.tapmovie;
    var dataUrl = "";
    switch (tapmovie) {
      case "正在上映电影":
        dataUrl = app.globalData.g_doubanDB + "/v2/movie/in_theaters";
        break;
      case "即将上映电影":
        dataUrl = app.globalData.g_doubanDB + "/v2/movie/coming_soon";
        break;
      case "豆瓣TOP250":
        dataUrl = app.globalData.g_doubanDB + "/v2/movie/top250";
        break;
      case "豆瓣口碑榜":
        dataUrl = app.globalData.g_doubanDB + "/v2/movie/us_box";
    }
    this.data.requestUrl = dataUrl;
    this.setData({
      navigateTitle: tapmovie
    });
    util.httpMoviesDB(dataUrl, this.callback);
    // this.setData({
    //   moviesDB: moviesDB
    // });
  },
  callback: function(data) {
    //var moviesdata = [];
    //console.log(data)
    var movieData = [];
    for (var index in data.subjects) {
      var subject = data.subjects[index];
      var average = subject.rating.average;
      var doubanImg = subject.images.large;
      var doubanId = subject.id;
      var Moviestar = subject.rating.stars;
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        average: average,
        doubanImg: doubanImg,
        doubanId: doubanId,
        Moviestar: util.onStarshow(Moviestar)
      }
      
      movieData.push(temp);

    }
    //触发滚动获取新数据后，将新数据与老数据进行绑定，中间细节逻辑判断
    var allmoviesDB = {};
    if (!this.data.isEmpty){
      allmoviesDB = this.data.moviesdata.concat(movieData);
    }else{
      allmoviesDB = movieData;
      this.data.isEmpty = false;
    }
    this.setData({
      moviesdata: allmoviesDB
    });
    this.data.nextNum += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
    //console.log(moviesdata)数据获取成功，渲染页面
  },
  //跳转到页面详情
  openMdetail: function (event) {
    var movieId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movieDetail?id=' + movieId,
    })
    console.log(movieId)
  },
  onReachBottom: function(event) {
    //页面滚动加载更多数据
    var nextUrl = this.data.requestUrl + "?start=" + this.data.nextNum + "&count=20";
    util.httpMoviesDB(nextUrl, this.callback);
    wx.showNavigationBarLoading();
    //console.log(nextUrl)
  },
  onPullDownRefresh:function(){
    var RefreshUrl = this.data.requestUrl +"?start=0&count=20";
    this.data.moviesdata={};
    util.httpMoviesDB(RefreshUrl, this.callback);
    this.data.isEmpty = true;
  },
  onReady: function(options) {
    //动态设置导航栏标题，只能在页面渲染完成后生效
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  }
})
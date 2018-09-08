var util = require("../../utils/util.js");
var app = getApp();
Page({
  data: {
    inReceive: {},
    inComing: {},
    inTop250: {},
    inWeekly: {},
    searchUrl: {
      moviesdata:{}
    },
    nextNum:0,
    isEmpty:true,
    requestUrl: "",
    showContainer:true,
    showsearchPenel:false
  },
  onLoad: function(e) {
    var inReceive = app.globalData.g_doubanDB + "/v2/movie/in_theaters" + "?start=0&count=3"; //正在热映
    var inComing = app.globalData.g_doubanDB + "/v2/movie/coming_soon" + "?start=0&count=3"; //即将上映
    var inTop250 = app.globalData.g_doubanDB + "/v2/movie/top250" + "?start=0&count=3"; //top榜250
    var inWeekly = app.globalData.g_doubanDB + "/v2/movie/us_box" + "?start=0&count=3";//口碑榜
    this.onMoviesDB(inReceive, "inReceive","正在上映电影");
    this.onMoviesDB(inComing, "inComing","即将上映电影");
    this.onMoviesDB(inTop250, "inTop250","豆瓣TOP250");
    //this.onMoviesDB(inWeekly, "inWeekly","豆瓣口碑榜");
  },
  onMoviesDB: function(url, MovieKey,classMtitle) {
    var that = this;
    wx.request({
      url: url,
      data: {

      },
      method: "GET",
      header: {
        'content-type': 'json' // 默认值
      },
      success: function(res) {
        that.acceptDoubanDB(res.data, MovieKey, classMtitle);
        //console.log(res.data)
        //console.log(MovieKey)
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  acceptDoubanDB: function (movieDB, MovieKey, classMtitle) {
    var moviedata = [];
    for (var index in movieDB.subjects) {
      var subject = movieDB.subjects[index];
      var average = subject.rating.average;
      var doubanImg = subject.images.large;
      var doubanId = subject.id;
      var Moviestar = subject.rating.stars;
      //console.log(Moviestar)
      //console.log(average + " ," + doubanImg + " ," + doubanId)
      var title = subject.title;
      //console.log(title)
      if (title.length >= 6) {
        title = title.substring(0, 6)+"...";
      }
      var temp = {
        title: title,
        average: average,
        doubanImg: doubanImg,
        doubanId: doubanId,
        Moviestar: util.onStarshow(Moviestar)
      }
      moviedata.push(temp);
    }
    var threeMdata = {};
    threeMdata[MovieKey] = {
      classMtitle: classMtitle,
      moviesdata: moviedata
    };
    this.setData(threeMdata);
    //var b = JSON.parse(JSON.stringify(this.data.searchUrl).replace(/moviesdata/g, "moviesDB"));

    //console.log(this.data.searchUrl);
  },
  //跳转到更多页面函数机制
  onTapMovie:function(event){
    var tapmovie = event.currentTarget.dataset.tapmovie;
    //console.log(tapmovie)
      wx.navigateTo({
        url: 'moretap-movie/moreMovie?tapmovie=' + tapmovie
      })
  },
  //跳转到页面详情
  openMdetail:function(event){
    var movieId = event.currentTarget.dataset.id;
     wx.navigateTo({
       url: 'movie-detail/movieDetail?id=' + movieId,
     })
  },
  searchFocus:function(event){
    this.setData({
      showContainer: false,
      showsearchPenel: true
    });
  },
  clearFocus: function (event){
    this.setData({
      showContainer: true,
      showsearchPenel: false,
      searchUrl:{},
      searchValue:""
    });
    
  },
  crollMovie:function(){
    console.log("asxajsx")
  },
  ScrollMovie:function(event){
    var nextUrl = this.data.requestUrl + "&start=" + this.data.nextNum + "&count=20";
     util.httpMoviesDB(nextUrl, this.callback);
     wx.showNavigationBarLoading();
     //console.log(nextUrl)
   },
  callback: function (data){
    //allmoviesDB = this.data.moviesdata.concat(movieData);
    //console.log(this.data.searchUrl.moviesdata);
    var moviedata = [];
    for (var index in data.subjects) {
      var subject = data.subjects[index];
      var average = subject.rating.average;
      var doubanImg = subject.images.large;
      var doubanId = subject.id;
      var Moviestar = subject.rating.stars;
      //console.log(Moviestar)
      //console.log(average + " ," + doubanImg + " ," + doubanId)
      var title = subject.title;
      //console.log(title)
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
      moviedata.push(temp);
    }
    var allmoviesDB = {};
    if (!this.data.isEmpty) {
      allmoviesDB = this.data.searchUrl.moviesdata.concat(moviedata);
      //console.log(allmoviesDB, this.data.nextNum)
    } else {
      allmoviesDB = moviedata;
      this.data.isEmpty = false;
      //console.log(allmoviesDB, this.data.isEmpty)
    }
    var str = 'searchUrl.moviesdata'
    this.setData({
      [str] : allmoviesDB
    });
    this.data.nextNum += 20;
    wx.hideNavigationBarLoading();
  },
  loseFocus: function (event){
    var searchText = event.detail.value;
    var searchUrl = app.globalData.g_doubanDB + "/v2/movie/search?q=" + searchText;
    this.onMoviesDB(searchUrl,"searchUrl","搜索结果");
    //this.data.requestUrl = searchUrl;
    this.setData({
      requestUrl: searchUrl
    });
    // this.setData({
    //   searchUrl: searchUrl
    // });
    //console.log(this.data.searchUrl);
   //var b = JSON.parse(JSON.stringify(this.data.searchUrl).replace(/moviesdata/g, "moviesDB"));
  }
})
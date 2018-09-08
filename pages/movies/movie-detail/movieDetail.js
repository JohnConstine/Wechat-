// pages/movies/movie-detail/movieDetail.js
var util = require('../../../utils/util.js')
var app = getApp();
import { Movie } from 'class/Movie.js';
Page({
  data: {
    movie: {},
    directorMsg:{}
  },
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.g_doubanDB +
      "/v2/movie/subject/" + movieId;
    var movie = new Movie(url);
    //console.log(movie)
    
    // var movieData = movie.getMovieData();
    // var that = this;
    // movie.getMovieData(function (movie) {
    //   that.setData({
    //     movie: movie
    //   })
    // })
    //C#、Java、Python lambda
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })
    })
  },

  /*查看图片*/
  viewMoviePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
  onDirector: function (event){
    var getDirectorId = event.currentTarget.dataset.id;
    //console.log(getDirectorId)
    wx.navigateTo({
      url: '../actor/movieActor?getDirectorId=' + getDirectorId,
    })
  },
  hideMe: function (event){
    this.setData({
      isRuleTrue: false
    });
    this.setData({
      directorMsg:{}
    });
  }
})
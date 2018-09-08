// pages/movies/actor/movieActor.js
var app = getApp();
var util = require('../../../utils/util.js')
Page({

  data: {
    directorMsg:{}
  },
  onLoad: function (options) {
    var getDirectorId = options.getDirectorId;
    console.log(getDirectorId)
    var directorUrl = app.globalData.g_doubanDB + "/v2/movie/celebrity/" + getDirectorId;
    util.httpMoviesDB(directorUrl, this.callback);
  },
  //点击触发影人信息 
  // onDirector: function (event) {
  //   //console.log("a complete defeat")
  //   var getDirectorId = event.currentTarget.dataset.id;
  //   var directorUrl = app.globalData.g_doubanDB +
  //     "/v2/movie/celebrity/" + getDirectorId;
  //   util.httpMoviesDB(directorUrl, this.callback);
  // },
  callback: function (data) {
    var directorMsg = {
      name: data.name,
      englishName:data.aka_en[0],
      birthday: data.birthday,
      bornPlace: data.born_place,
      constellation: data.constellation,
      gender: data.gender,
      summary: data.summary,
      avatars: data.avatars.large,
      professions: data.professions,
      website:data.website,
      works:data.works,
      // worksImg: data.works[index].subject.images.large,
      // worksName: data.works[index].subject.title
    }
    this.setData({
      directorMsg: directorMsg
    });
    //console.log(worksImg)
  },
  //打开电影详情页面
  openMdetail: function (event) {
    var movieId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movieDetail?id=' + movieId,
    })
  }
})
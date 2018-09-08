//星星插件
function onStarshow(stars) {
      var count = stars.toString().substring(0, 1);
      var h_count = stars.toString();
       h_count = h_count.charAt(1);
     // console.log(h_count)
      var starAry = [];
      for (var i = 1; i <= 5; i++) {
        if (i <= count) {
          starAry.push(1);
        } else if (h_count>i){
          starAry.push(2);
        }else{
          starAry.push(0);
        }
      }
      return starAry;
    }
function httpMoviesDB(url,callback) {
  wx.request({
    url: url,
    data: {

    },
    method: "GET",
    header: {
      'content-type': 'json' // 默认值
    },
    success: function (res) {
      callback(res.data);
      //console.log(res.data)
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}
function returnDirector(casts){
  var castsId = [];
  for (var idx in casts){
    castsId.push(casts[idx].id);
  }
  return castsId;
}
function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  onStarshow: onStarshow,
  httpMoviesDB: httpMoviesDB,
  convertToCastInfos: convertToCastInfos,
  convertToCastString: convertToCastString,
  returnDirector: returnDirector
}
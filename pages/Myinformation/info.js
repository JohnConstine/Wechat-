// pages/Myinformation/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', 
    navigateTitle:"",
    ids:null,
    showUserLogin:true,
    showUser:false,
    registe:false,
    success:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  exit:function(event){
    // wx.showToast({
    //   title: '退出成功',
    //   icon: 'success',
    //   duration: 1000
    // })
    var Bartitle = event.currentTarget.dataset.text;
    this.setData({
      showUserLogin: true,
      showUser: false,
      navigateTitle: Bartitle
    });
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },
  startMywallet: function (event){
    var a = event.currentTarget.dataset.id;
      this.setData({
        ids: a
      });
    console.log(this.data.ids);
  },
  end: function (event){
    this.setData({
      ids:5
    });
    console.log(this.data.ids);
  },
  setLoading: function (e) {
    var Bartitle = e.target.dataset.text;
    this.setData({
      navigateTitle: Bartitle
    });
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
     wx.showToast({
       title: '加载中',
       icon:'loading',
       duration:1800,
       success:()=>{
         setTimeout(()=>{
           this.setData({
             showUser: true,
             showUserLogin: false
           })
         }, 1798);//骚操作
         
       }
     })
  },
  onRegiste:function(e){
    var title = e.target.dataset.text;
    this.setData({
      navigateTitle:title
    });
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
     this.setData({
       registe:true,
       showUserLogin: false
     });
  },
  submit:function(e){
    var title = e.target.dataset.text;
    this.setData({
      navigateTitle: title
    });
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
    this.setData({
      registe: false,
      success: true
    });
  },
  return_home:function(e){
    var title = e.target.dataset.text;
    this.setData({
      navigateTitle: title,
      success: false,
      showUserLogin: true
    });
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  }
})
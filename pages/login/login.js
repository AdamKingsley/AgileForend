var app = getApp()
var util = require("../../utils/util.js")

Page({
  data: {
    icon_url: "../../images/ICON.png",
    userInfo: {}
  },
  checkSession(e) {
    console.log("check session ...")
    // util.showToast("hello", "fail", 2000);
    let that = this;
    //TODO 这里有点小问题,暂不考虑
    if (this.data.userInfo) {
      wx.checkSession({
        success: res => {
          console.log("session尚未失效！");
          // console.log('before switch to index')
          if (wx.getStorageSync("userid")) {
            wx.switchTab({
              url: '/pages/index/index',
            });
          } else {
            wx.navigateTo({
              url: '/pages/init_info/init_info',
            });
          }
        },
        fail: res => {
          console.log("session失效！");
          //util.showToast("对话失效!", "fail", 2000);
        }
      });
    }
  },
  login(e) {
    console.log(e);
    let userinfo = e.detail.userInfo;
    if (userinfo) {
      //设置微信默认获取到的userinfo到全局的globalData的userInfo中
      // app.globalData.userInfo = userinfo;
      console.log("授权点击确认！")
      //点击了授权，然后开始登录
      wx.login({
        success: res => {
          console.log(res);
          if (res.code) {
            //获取code成功，请求后台获取session
            let jsonData = {
              'code': res.code,
              'userInfo': userinfo
            };
            console.log(jsonData);
            let url = "user/login"
            util.postData(url, jsonData).then(res => {
              console.log("登录信息：", res);
              let data = res.data.data;
              //想了想，这里同步,有助于用户信息的获取,确认信息都存到缓存之后再跳我觉得满蛮好的
              wx.setStorageSync("openid", data.openid);
              wx.setStorageSync("userid", data.userid);
              //之前初始化过直接进入index首页
              if (data.userid) {
                //先获取userinf放到app的globaldata中
                util.getData('user/' + data.userid).then(res => {
                  console.log(res);
                  if(res.data.code=='200'){
                    app.globalData.userinfo = res.data.data;
                  }else{
                    util.showToast("获取用户信息失败！","fail",2000);
                  }
                }).catch(e => {
                  util.showToast("获取用户信息失败！", "fail", 2000);
                });
                wx.switchTab({
                  url: '/pages/index/index',
                });
              } else {
                //尚未初始化过，进入init_info界面
                //将微信登陆默认读取到的微信自身的信息设置到globalData中
                app.globalData.userInfo = userinfo;
                console.log(app.globalData.userInfo);
                wx.navigateTo({
                  url: '/pages/init_info/init_info',
                });
              }
            }).catch(e => {
              console.log(e);
              util.showToast("登录失败！", "fail", 2000);
            });
          } else {
            util.showToast("登录失败！", "fail", 2000);
          }
        },
        fail: res => {
          util.showToast("获取用户信息失败！", "fail", 2000);
        }
      });
    } else {
      console.log("授权点击取消！")
    }
  },
  onLoad: function(options) {
    this.checkSession();
  },
  onShow: function(options) {
    this.checkSession();
  },
})
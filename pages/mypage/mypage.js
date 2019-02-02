//mypage.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    ifGetUserInfo: true,
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../mypage/mypage'
    })
  },
  bindPersonalInfoTap: function () {
    wx.navigateTo({
      url: '../personalInfo/personalInfo'
    })
  },
  bindMyTour: function () {
    wx.navigateTo({
      url: '../mytour/mytour'
    })
  },

  onLoad: function () {
    let that = this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              that.setData({
                userInfo: res.userInfo,
                ifGetUserInfo: false
              })
            }
          })
        }
      }
    })
  },
  loginTap: function () {
    wx.navigateTo({
      url: '../mypage/mypage'
    })
  },
  bindHistoryTour: () => {
    wx.navigateTo({
      url: '../historytour/historytour'
    })
  },
  bindMyComment() {
    wx.navigateTo({
      url: '../mycomment/mycomment'
    })
  },
  bindMyClub() {
    wx.navigateTo({
      url: '../myclub/myclub'
    })
  }
})
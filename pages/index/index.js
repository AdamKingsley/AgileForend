//index.js 主页
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    inputShowed: false,
    select_text: "",
    city:'南京'
  },
  selectCity: function(){
    wx.navigateTo({
      url: '../city_selector/city_selector',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      select_text: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      select_text: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      select_text: e.detail.value
    });
  }
})
